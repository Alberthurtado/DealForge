import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit";
import { sendSystemEmail } from "@/lib/system-email";
import { buildVerificationEmail, resolveEmailLang } from "@/lib/verification-email";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = checkRateLimit(`resend-verify:${ip}`, { maxRequests: 3, windowSeconds: 3600 });
  if (!limit.allowed) return rateLimitResponse(limit.resetAt);

  const body = await request.json();
  const email = body?.email;
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
  const emailLang = resolveEmailLang(body?.lang);
  const { subject, html } = buildVerificationEmail(emailLang, usuario.nombre, verifyUrl);

  await sendSystemEmail({ to: email, subject, html });

  return NextResponse.json({ success: true });
}
