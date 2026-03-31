import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit";
import { sendSystemEmail } from "@/lib/system-email";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = checkRateLimit(`resend-verify:${ip}`, { maxRequests: 3, windowSeconds: 3600 });
  if (!limit.allowed) return rateLimitResponse(limit.resetAt);

  const { email } = await request.json();
  if (!email) return NextResponse.json({ error: "Email requerido" }, { status: 400 });

  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario || usuario.emailVerified) {
    // Don't reveal whether the email exists
    return NextResponse.json({ success: true });
  }

  // Generate a new token
  const newToken = randomUUID();
  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { verifyToken: newToken },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://dealforge.es";
  const verifyUrl = `${baseUrl}/verificar/${newToken}`;

  await sendSystemEmail({
    to: email,
    subject: "Verifica tu cuenta — DealForge",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <img src="https://dealforge.es/logo.svg" alt="DealForge" width="48" height="48" style="border-radius: 12px;" />
        </div>
        <h1 style="font-size: 22px; font-weight: 700; color: #111827; text-align: center; margin: 0 0 8px;">
          Verifica tu email
        </h1>
        <p style="font-size: 14px; color: #6b7280; text-align: center; margin: 0 0 32px; line-height: 1.6;">
          Haz clic en el boton para activar tu cuenta en DealForge.
        </p>
        <div style="text-align: center; margin-bottom: 32px;">
          <a href="${verifyUrl}" style="display: inline-block; background-color: #3a9bb5; color: white; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 12px;">
            Verificar mi email
          </a>
        </div>
        <p style="font-size: 12px; color: #9ca3af; text-align: center; line-height: 1.5;">
          El enlace expira en 24 horas.
        </p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
