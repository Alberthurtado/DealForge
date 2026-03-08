import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createToken, getCookieName } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  if (!email?.trim() || !password) {
    return NextResponse.json(
      { error: "Email y contrasena son obligatorios" },
      { status: 400 }
    );
  }

  // Find user
  const usuario = await prisma.usuario.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (!usuario || !usuario.activo) {
    return NextResponse.json(
      { error: "Email o contrasena incorrectos" },
      { status: 401 }
    );
  }

  // Verify password
  const valid = await verifyPassword(password, usuario.passwordHash);
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
