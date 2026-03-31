import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createToken, getCookieName } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token || token.length < 10) {
    return NextResponse.redirect(new URL("/verificar-error", request.url));
  }

  // Find user by verify token
  const usuario = await prisma.usuario.findUnique({
    where: { verifyToken: token },
    include: {
      empresa: { select: { id: true, plan: true } },
    },
  });

  if (!usuario) {
    return NextResponse.redirect(new URL("/verificar-error", request.url));
  }

  if (usuario.emailVerified) {
    // Already verified — just redirect to login
    return NextResponse.redirect(new URL("/login?verified=already", request.url));
  }

  // Check if token is older than 24 hours
  const ageMs = Date.now() - new Date(usuario.createdAt).getTime();
  if (ageMs > 24 * 60 * 60 * 1000) {
    return NextResponse.redirect(new URL("/verificar-error?reason=expired", request.url));
  }

  // Mark as verified and clear the token
  await prisma.usuario.update({
    where: { id: usuario.id },
    data: {
      emailVerified: true,
      verifyToken: null,
    },
  });

  // Get team role
  const membership = await prisma.equipoMembro.findFirst({
    where: { usuarioId: usuario.id, empresaId: usuario.empresaId },
    select: { rol: true },
  });

  // Auto-login: create JWT and set cookie
  const jwt = await createToken({
    userId: usuario.id,
    email: usuario.email,
    plan: usuario.empresa?.plan || usuario.plan,
    nombre: usuario.nombre,
    empresaId: usuario.empresaId,
    rol: membership?.rol || "ADMIN",
  });

  const response = NextResponse.redirect(new URL("/panel?verified=true", request.url));

  response.cookies.set(getCookieName(), jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
