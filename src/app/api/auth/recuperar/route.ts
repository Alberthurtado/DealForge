import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { checkRateLimit, RATE_LIMITS, getClientIp, rateLimitResponse } from "@/lib/rate-limit";
import { validateBody } from "@/lib/validate";
import { recuperarSchema } from "@/lib/validations";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  // Rate limit: 3 per hour per IP
  const ip = getClientIp(request);
  const limit = checkRateLimit(`recuperar:${ip}`, RATE_LIMITS.registro);
  if (!limit.allowed) return rateLimitResponse(limit.resetAt);

  const body = await request.json();
  const { data, error } = validateBody(recuperarSchema, body);
  if (error) return error;

  // Verify reCAPTCHA
  const recaptchaResult = await verifyRecaptcha(data.recaptchaToken ?? null, "recuperar");
  if (!recaptchaResult.success) {
    return NextResponse.json(
      { error: "Verificacion de seguridad fallida. Recarga la pagina." },
      { status: 403 }
    );
  }

  // Always return success to prevent email enumeration
  const successResponse = NextResponse.json({
    message: "Si el email existe, recibiras un enlace para restablecer tu contrasena.",
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

    // Send email
    await sendPasswordResetEmail(usuario.email, usuario.nombre, resetUrl);
  } catch (err) {
    console.error("Error in password reset request:", err);
    // Don't expose errors to the user
  }

  return successResponse;
}
