import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { checkRateLimit, RATE_LIMITS, getClientIp, rateLimitResponse } from "@/lib/rate-limit";
import { validateBody } from "@/lib/validate";
import { recuperarSchema } from "@/lib/validations";
import { verifyTurnstile } from "@/lib/turnstile";
import { sendSystemEmail } from "@/lib/system-email";
import { getDashboardLang } from "@/lib/dashboard-lang";

export async function POST(request: NextRequest) {
  // Rate limit: 3 per hour per IP
  const ip = getClientIp(request);
  const limit = checkRateLimit(`recuperar:${ip}`, RATE_LIMITS.registro);
  if (!limit.allowed) return rateLimitResponse(limit.resetAt);

  const body = await request.json();
  const { data, error } = validateBody(recuperarSchema, body);
  if (error) return error;

  // Verify Turnstile
  const turnstileResult = await verifyTurnstile(data.turnstileToken ?? null);
  if (!turnstileResult.success) {
    return NextResponse.json(
      { error: "Verificación de seguridad fallida. Recarga la página." },
      { status: 403 }
    );
  }

  // Always return success to prevent email enumeration
  const successResponse = NextResponse.json({
    message: "Si el email existe, recibirás un enlace para restablecer tu contraseña.",
  });

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email: data.email },
    });

    if (!usuario || !usuario.activo) {
      return successResponse;
    }

    // Generate secure token
    const resetToken = randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { resetToken, resetTokenExpiry },
    });

    // Build reset URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://dealforge.es";
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    // Send email via system email service (MailerSend) so the flow works
    // even when the user's company SMTP is not configured.
    const isEn = (await getDashboardLang(usuario.empresaId)) === "en";
    const tr = isEn
      ? { subject: "Reset your password — DealForge", heading: "Reset your password", intro: `Hi <strong>${usuario.nombre}</strong>, click the button to create a new password.`, cta: "Reset password", note: "This link expires in 1 hour. If you didn't request this change, you can ignore this email." }
      : { subject: "Restablecer contraseña — DealForge", heading: "Restablecer contraseña", intro: `Hola <strong>${usuario.nombre}</strong>, haz clic en el botón para crear una nueva contraseña.`, cta: "Restablecer contraseña", note: "Este enlace expira en 1 hora. Si no solicitaste este cambio, puedes ignorar este email." };
    await sendSystemEmail({
      to: usuario.email,
      subject: tr.subject,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <img src="https://dealforge.es/logo.svg" alt="DealForge" width="48" height="48" style="border-radius: 12px;" />
          </div>
          <h1 style="font-size: 22px; font-weight: 700; color: #111827; text-align: center; margin: 0 0 8px;">
            ${tr.heading}
          </h1>
          <p style="color: #4a4a4a; font-size: 14px; line-height: 1.6; text-align: center; margin: 0 0 24px;">
            ${tr.intro}
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}" style="display: inline-block; background: #3a9bb5; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px; padding: 14px 32px; border-radius: 10px;">
              ${tr.cta}
            </a>
          </div>
          <p style="color: #888; font-size: 12px; text-align: center; line-height: 1.6;">
            ${tr.note}
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Error in password reset request:", err);
    // Don't expose errors to the user
  }

  return successResponse;
}
