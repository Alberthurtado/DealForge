import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { reglaUpdateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";
import { getSession } from "@/lib/auth";
import { getPlanFeatures, planFeatureResponse } from "@/lib/plan-limits";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (!getPlanFeatures(session.plan).reglasComerciales) return planFeatureResponse("reglasComerciales");

  const { id } = await params;
  const regla = await prisma.reglaComercial.findFirst({
    where: {
      id,
      OR: [
        { equipoId: session.empresaId },
        { usuarioId: session.userId, equipoId: null },
      ],
    },
  });
  if (!regla) return NextResponse.json({ error: "Regla no encontrada" }, { status: 404 });
  return NextResponse.json(regla);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (!getPlanFeatures(session.plan).reglasComerciales) return planFeatureResponse("reglasComerciales");

  const { id } = await params;
  const existing = await prisma.reglaComercial.findFirst({
    where: {
      id,
      OR: [
        { equipoId: session.empresaId },
        { usuarioId: session.userId, equipoId: null },
      ],
    },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: "Regla no encontrada" }, { status: 404 });

  const body = await request.json();
  const { data, error } = validateBody(reglaUpdateSchema, body);
  if (error) return error;

  const updateData: Record<string, unknown> = {};
  if (data.nombre !== undefined) updateData.nombre = data.nombre;
  if (data.tipo !== undefined) updateData.tipo = data.tipo;
  if (data.activa !== undefined) updateData.activa = data.activa;
  if (data.prioridad !== undefined) updateData.prioridad = data.prioridad;
  if (data.configuracion !== undefined) {
    updateData.configuracion = typeof data.configuracion === "string" ? data.configuracion : JSON.stringify(data.configuracion);
  }

  const regla = await prisma.reglaComercial.update({ where: { id }, data: updateData });
  return NextResponse.json(regla);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (!getPlanFeatures(session.plan).reglasComerciales) return planFeatureResponse("reglasComerciales");

  const { id } = await params;
  const existing = await prisma.reglaComercial.findFirst({
    where: {
      id,
      OR: [
        { equipoId: session.empresaId },
        { usuarioId: session.userId, equipoId: null },
      ],
    },
    select: { id: true },
  });
  if (!existing) return NextResponse.json({ error: "Regla no encontrada" }, { status: 404 });

  await prisma.reglaComercial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
