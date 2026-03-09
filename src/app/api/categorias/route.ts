import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const categorias = await prisma.categoria.findMany({
    include: { _count: { select: { productos: true } } },
    orderBy: { nombre: "asc" },
  });
  return NextResponse.json(categorias);
}

export async function POST(req: NextRequest) {
  try {
    const { nombre } = await req.json();

    if (!nombre || typeof nombre !== "string" || nombre.trim().length === 0) {
      return NextResponse.json(
        { error: "El nombre de la categoria es obligatorio" },
        { status: 400 }
      );
    }

    const trimmed = nombre.trim();

    // Check if category already exists (case-insensitive)
    const existing = await prisma.categoria.findFirst({
      where: { nombre: { equals: trimmed, mode: "insensitive" } },
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    const categoria = await prisma.categoria.create({
      data: { nombre: trimmed },
    });

    return NextResponse.json(categoria, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al crear la categoria" },
      { status: 500 }
    );
  }
}
