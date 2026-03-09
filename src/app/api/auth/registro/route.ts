import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword, createToken, getCookieName } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS, getClientIp, rateLimitResponse } from "@/lib/rate-limit";
import { registroSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";
import { verifyRecaptcha } from "@/lib/recaptcha";

export async function POST(request: NextRequest) {
  // Rate limit: 3 registrations per hour per IP
  const ip = getClientIp(request);
  const limit = checkRateLimit(`registro:${ip}`, RATE_LIMITS.registro);
  if (!limit.allowed) return rateLimitResponse(limit.resetAt);

  const body = await request.json();
  const { data, error } = validateBody(registroSchema, body);
  if (error) return error;

  // Verify reCAPTCHA (if configured)
  const captcha = await verifyRecaptcha(data.recaptchaToken, "registro");
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

  // Ensure default empresa exists
  await prisma.empresa.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default", nombre: "Mi Empresa" },
  });

  // Create user
  const passwordHash = await hashPassword(data.password);
  const usuario = await prisma.usuario.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      passwordHash,
      plan: "starter",
      empresaId: "default",
    },
  });

  // Create JWT token
  const token = await createToken({
    userId: usuario.id,
    email: usuario.email,
    plan: usuario.plan,
    nombre: usuario.nombre,
  });

  // Set cookie
  const response = NextResponse.json({
    success: true,
    user: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, plan: usuario.plan },
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
