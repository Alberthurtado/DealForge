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
      { error: "Verificación de seguridad fallida. Intenta de nuevo." },
      { status: 403 }
    );
  }

  // Find user with empresa and membership
  const usuario = await prisma.usuario.findUnique({
    where: { email: data.email },
    include: {
      empresa: { select: { id: true, plan: true, planStatus: true } },
      miembros: {
        select: { rol: true, empresaId: true },
        take: 1,
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!usuario || !usuario.activo) {
    return NextResponse.json(
      { error: "Email o contraseña incorrectos" },
      { status: 401 }
    );
  }

  // Verify password
  const valid = await verifyPassword(data.password, usuario.passwordHash);
  if (!valid) {
    return NextResponse.json(
      { error: "Email o contraseña incorrectos" },
      { status: 401 }
    );
  }

  // Check email verification (new users must verify; legacy users without the field are considered verified)
  if (usuario.emailVerified === false && usuario.verifyToken) {
    return NextResponse.json(
      { error: "Tu email aun no ha sido verificado. Revisa tu bandeja de entrada.", needsVerification: true, email: usuario.email },
      { status: 403 }
    );
  }

  // Determine empresa context
  const membresia = usuario.miembros[0];
  const empresaId = membresia?.empresaId || usuario.empresaId;
  const rol = membresia?.rol || "ADMIN";

  // Plan comes from empresa (team plan)
  const empresa = await prisma.empresa.findUnique({
    where: { id: empresaId },
    select: { plan: true },
  });
  const plan = empresa?.plan || usuario.plan;

  // If user has no EquipoMembro record, create one (legacy users)
  if (!membresia) {
    await prisma.equipoMembro.upsert({
      where: { empresaId_usuarioId: { empresaId: usuario.empresaId, usuarioId: usuario.id } },
      update: {},
      create: { empresaId: usuario.empresaId, usuarioId: usuario.id, rol: "ADMIN" },
    });
  }

  // Create JWT token
  const token = await createToken({
    userId: usuario.id,
    email: usuario.email,
    plan,
    nombre: usuario.nombre,
    empresaId,
    rol,
  });

  // Set cookie
  const response = NextResponse.json({
    success: true,
    user: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, plan },
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
