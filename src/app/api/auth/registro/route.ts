import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword, createToken, getCookieName } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { nombre, email, password } = body;

  if (!nombre?.trim() || !email?.trim() || !password) {
    return NextResponse.json(
      { error: "Nombre, email y contrasena son obligatorios" },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "La contrasena debe tener al menos 8 caracteres" },
      { status: 400 }
    );
  }

  // Check if email already exists
  const existing = await prisma.usuario.findUnique({ where: { email: email.trim().toLowerCase() } });
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
  const passwordHash = await hashPassword(password);
  const usuario = await prisma.usuario.create({
    data: {
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
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
