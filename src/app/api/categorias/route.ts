import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { categoriaCreateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  // Categories are shared globally but show product count only for user's products
  const categorias = await prisma.categoria.findMany({
    include: { _count: { select: { productos: { where: { usuarioId: session.userId } } } } },
    orderBy: { nombre: "asc" },
  });

  // Only return categories that have products for this user (or all for selection)
  return NextResponse.json(categorias);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  try {
    const body = await req.json();
    const { data, error } = validateBody(categoriaCreateSchema, body);
    if (error) return error;

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
    return NextResponse.json({ error: "Error al crear la categoria" }, { status: 500 });
  }
}
