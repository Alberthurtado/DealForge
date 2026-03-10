import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createToken, getCookieName } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS, getClientIp, rateLimitResponse } from "@/lib/rate-limit";
import { loginSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";
import { verifyTurnstile } from "@/lib/turnstile";

export async function POST(request: NextRequest) {
  // Rate limit: 5 attempts per 15 minutes per IP
  const ip = getClientIp(request);
  const limit = checkRateLimit(`login:${ip}`, RATE_LIMITS.login);
  if (!limit.allowed) return rateLimitResponse(limit.resetAt);

  const body = await request.json();
  const { data, error } = validateBody(loginSchema, body);
  if (error) return error;

  // Verify Turnstile (if configured)
  const captcha = await verifyTurnstile(data.turnstileToken);
  if (!captcha.success) {
    return NextResponse.json(
      { error: "Verificacion de seguridad fallida. Intenta de nuevo." },
      { status: 403 }
    );
  }

  // Find user
  const usuario = await prisma.usuario.findUnique({
    where: { email: data.email },
  });

  if (!usuario || !usuario.activo) {
    return NextResponse.json(
      { error: "Email o contrasena incorrectos" },
      { status: 401 }
    );
  }

  // Verify password
  const valid = await verifyPassword(data.password, usuario.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { error: "Email o contrasena incorrectos" },
      { status: 401 }
    );
  }

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
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
