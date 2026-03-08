import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get("tipo");
  const activa = searchParams.get("activa");

  const where: Record<string, unknown> = {};
  if (tipo) where.tipo = tipo;
  if (activa !== null) where.activa = activa === "true";

  const reglas = await prisma.reglaComercial.findMany({
    where,
    orderBy: [{ prioridad: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(reglas);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { nombre, tipo, configuracion, activa, prioridad } = body;

  if (!nombre || !tipo || !configuracion) {
    return NextResponse.json(
      { error: "Nombre, tipo y configuracion son requeridos" },
      { status: 400 }
    );
  }

  const regla = await prisma.reglaComercial.create({
    data: {
      nombre,
      tipo,
      configuracion: typeof configuracion === "string" ? configuracion : JSON.stringify(configuracion),
      activa: activa ?? true,
      prioridad: prioridad ?? 0,
    },
  });

  return NextResponse.json(regla, { status: 201 });
}
