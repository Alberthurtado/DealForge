import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword, createToken, getCookieName } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS, getClientIp, rateLimitResponse } from "@/lib/rate-limit";
import { registroSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";
import { verifyTurnstile } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
  // Rate limit: 3 registrations per hour per IP
  const ip = getClientIp(request);
  const limit = checkRateLimit(`registro:${ip}`, RATE_LIMITS.registro);
  if (!limit.allowed) return rateLimitResponse(limit.resetAt);

  const body = await request.json();
  const { data, error } = validateBody(registroSchema, body);
  if (error) return error;

  // Verify Turnstile (if configured)
  const captcha = await verifyTurnstile(data.turnstileToken);
  if (!captcha.success) {
    return NextResponse.json(
      { error: "Verificacion de seguridad fallida. Intenta de nuevo." },
      { status: 403 }
    );
  }

  // Check if email already exists
  const existing = await prisma.usuario.findUnique({ where: { email: data.email } });
  if (existing) {
    return NextResponse.json(
      { error: "Ya existe una cuenta con este email" },
      { status: 409 }
    );
  }

  // Create empresa (unique per team/company)
  const empresa = await prisma.empresa.create({
    data: {
      nombre: "Mi Empresa",
      plan: "starter",
      planStatus: "active",
    },
  });

  // Create user linked to the new empresa
  const passwordHash = await hashPassword(data.password);
  const usuario = await prisma.usuario.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      passwordHash,
      plan: "starter",
      empresaId: empresa.id,
    },
  });

  // Create EquipoMembro record (user is ADMIN of their own empresa)
  await prisma.equipoMembro.create({
    data: {
      empresaId: empresa.id,
      usuarioId: usuario.id,
      rol: "ADMIN",
    },
  });

  // Create JWT token
  const token = await createToken({
    userId: usuario.id,
    email: usuario.email,
    plan: "starter",
    nombre: usuario.nombre,
    empresaId: empresa.id,
    rol: "ADMIN",
  });

  // Set cookie
  const response = NextResponse.json({
    success: true,
    user: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, plan: "starter" },
  });

  response.cookies.set(getCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
