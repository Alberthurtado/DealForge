import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { validateBody } from "@/lib/validate";

const createSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().optional(),
  contenido: z.string().min(1, "El contenido es obligatorio"),
  esDefault: z.boolean().optional().default(false),
});

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const empresaId = session.empresaId || session.userId;

  const plantillas = await prisma.plantillaContrato.findMany({
    where: { empresaId },
    orderBy: [{ esDefault: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      nombre: true,
      descripcion: true,
      esDefault: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(plantillas);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await request.json();
  const { data, error } = validateBody(createSchema, body);
  if (error) return error;

  const empresaId = session.empresaId || session.userId;

  // If setting as default, unset others
  if (data.esDefault) {
    await prisma.plantillaContrato.updateMany({
      where: { empresaId, esDefault: true },
      data: { esDefault: false },
    });
  }

  const plantilla = await prisma.plantillaContrato.create({
    data: {
      empresaId,
      nombre: data.nombre,
      descripcion: data.descripcion,
      contenido: data.contenido,
      esDefault: data.esDefault ?? false,
    },
  });

  return NextResponse.json(plantilla, { status: 201 });
}
