import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { validateBody } from "@/lib/validate";

const updateSchema = z.object({
  nombre: z.string().min(1).optional(),
  descripcion: z.string().optional().nullable(),
  contenido: z.string().min(1).optional(),
  esDefault: z.boolean().optional(),
});

async function getPlantilla(id: string, empresaId: string) {
  return prisma.plantillaContrato.findFirst({
    where: { id, empresaId },
  });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;
  const empresaId = session.empresaId || session.userId;

  const plantilla = await getPlantilla(id, empresaId);
  if (!plantilla) return NextResponse.json({ error: "Plantilla no encontrada" }, { status: 404 });

  return NextResponse.json(plantilla);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;
  const empresaId = session.empresaId || session.userId;

  const plantilla = await getPlantilla(id, empresaId);
  if (!plantilla) return NextResponse.json({ error: "Plantilla no encontrada" }, { status: 404 });

  const body = await request.json();
  const { data, error } = validateBody(updateSchema, body);
  if (error) return error;

  // If setting as default, unset others first
  if (data.esDefault) {
    await prisma.plantillaContrato.updateMany({
      where: { empresaId, esDefault: true, NOT: { id } },
      data: { esDefault: false },
    });
  }

  const updated = await prisma.plantillaContrato.update({
    where: { id },
    data,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;
  const empresaId = session.empresaId || session.userId;

  const plantilla = await getPlantilla(id, empresaId);
  if (!plantilla) return NextResponse.json({ error: "Plantilla no encontrada" }, { status: 404 });

  // Cannot delete the only default template
  if (plantilla.esDefault) {
    const count = await prisma.plantillaContrato.count({ where: { empresaId } });
    if (count <= 1) {
      return NextResponse.json(
        { error: "No se puede eliminar la única plantilla predeterminada" },
        { status: 400 }
      );
    }
  }

  await prisma.plantillaContrato.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
