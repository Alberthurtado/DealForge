import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { reglaUpdateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

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
  const { data, error } = validateBody(reglaUpdateSchema, body);
  if (error) return error;

  const updateData: Record<string, unknown> = {};
  if (data.nombre !== undefined) updateData.nombre = data.nombre;
  if (data.tipo !== undefined) updateData.tipo = data.tipo;
  if (data.activa !== undefined) updateData.activa = data.activa;
  if (data.prioridad !== undefined) updateData.prioridad = data.prioridad;
  if (data.configuracion !== undefined) {
    updateData.configuracion =
      typeof data.configuracion === "string"
        ? data.configuracion
        : JSON.stringify(data.configuracion);
  }

  const regla = await prisma.reglaComercial.update({ where: { id }, data: updateData });
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
