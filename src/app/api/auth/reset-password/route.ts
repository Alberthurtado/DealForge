import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit";
import { validateBody } from "@/lib/validate";
import { resetPasswordSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  // Rate limit: 5 per 15 min per IP
  const ip = getClientIp(request);
  const limit = checkRateLimit(`reset-password:${ip}`, { maxRequests: 5, windowSeconds: 15 * 60 });
  if (!limit.allowed) return rateLimitResponse(limit.resetAt);

  const body = await request.json();
  const { data, error } = validateBody(resetPasswordSchema, body);
  if (error) return error;

  // Find user by token
  const usuario = await prisma.usuario.findUnique({
    where: { resetToken: data.token },
  });

  if (!usuario) {
    return NextResponse.json(
      { error: "El enlace no es válido o ya fue utilizado." },
      { status: 400 }
    );
  }

  // Check expiry
  if (!usuario.resetTokenExpiry || usuario.resetTokenExpiry < new Date()) {
    // Clear expired token
    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { resetToken: null, resetTokenExpiry: null },
    });
    return NextResponse.json(
      { error: "El enlace ha expirado. Solicita uno nuevo." },
      { status: 400 }
    );
  }

  // Update password and clear token
  const passwordHash = await hashPassword(data.password);
  await prisma.usuario.update({
    where: { id: usuario.id },
    data: {
      passwordHash,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return NextResponse.json({
    message: "Contraseña actualizada correctamente. Ya puedes iniciar sesión.",
  });
}
