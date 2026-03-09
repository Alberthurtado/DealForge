import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { categoriaCreateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

export async function GET() {
  const categorias = await prisma.categoria.findMany({
    include: { _count: { select: { productos: true } } },
    orderBy: { nombre: "asc" },
  });
  return NextResponse.json(categorias);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = validateBody(categoriaCreateSchema, body);
    if (error) return error;

    // Check if category already exists (case-insensitive)
    const existing = await prisma.categoria.findFirst({
      where: { nombre: { equals: data.nombre, mode: "insensitive" } },
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    const categoria = await prisma.categoria.create({
      data: { nombre: data.nombre },
    });

    return NextResponse.json(categoria, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al crear la categoria" },
      { status: 500 }
    );
  }
}
