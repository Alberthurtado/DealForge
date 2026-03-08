import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "No autenticado" },
      { status: 401 }
    );
  }

  // Get fresh user data from DB
  const usuario = await prisma.usuario.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      nombre: true,
      email: true,
      plan: true,
      rol: true,
      activo: true,
      createdAt: true,
    },
  });

  if (!usuario || !usuario.activo) {
    return NextResponse.json(
      { error: "Usuario no encontrado o inactivo" },
      { status: 401 }
    );
  }

  return NextResponse.json({ user: usuario });
}
