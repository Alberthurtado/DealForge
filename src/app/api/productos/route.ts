import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const categoriaId = searchParams.get("categoriaId") || "";

  const where: Record<string, unknown> = {};
  if (search) {
    where.OR = [
      { nombre: { contains: search } },
      { sku: { contains: search } },
      { descripcion: { contains: search } },
    ];
  }
  if (categoriaId) {
    where.categoriaId = categoriaId;
  }

  const productos = await prisma.producto.findMany({
    where,
    include: {
      categoria: true,
      variantes: { where: { activo: true }, orderBy: { nombre: "asc" } },
    },
    orderBy: { nombre: "asc" },
  });

  return NextResponse.json(productos);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { variantes, ...productoData } = body;

  // Clean empty categoriaId to null
  if (!productoData.categoriaId) productoData.categoriaId = null;

  const producto = await prisma.producto.create({
    data: {
      ...productoData,
      variantes: variantes?.length
        ? { create: variantes }
        : undefined,
    },
    include: {
      categoria: true,
      variantes: { orderBy: { nombre: "asc" } },
    },
  });
  return NextResponse.json(producto, { status: 201 });
}
