import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const regla = await prisma.reglaComercial.findUnique({ where: { id } });
  if (!regla) {
    return NextResponse.json({ error: "Regla no encontrada" }, { status: 404 });
  }
  return NextResponse.json(regla);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const data: Record<string, unknown> = {};
  if ("nombre" in body) data.nombre = body.nombre;
  if ("tipo" in body) data.tipo = body.tipo;
  if ("activa" in body) data.activa = body.activa;
  if ("prioridad" in body) data.prioridad = body.prioridad;
  if ("configuracion" in body) {
    data.configuracion =
      typeof body.configuracion === "string"
        ? body.configuracion
        : JSON.stringify(body.configuracion);
  }

  const regla = await prisma.reglaComercial.update({ where: { id }, data });
  return NextResponse.json(regla);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.reglaComercial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
