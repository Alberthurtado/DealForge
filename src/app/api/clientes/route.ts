import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const sector = searchParams.get("sector") || "";

  const where: Record<string, unknown> = {};
  if (search) {
    where.OR = [
      { nombre: { contains: search } },
      { email: { contains: search } },
      { ciudad: { contains: search } },
    ];
  }
  if (sector) {
    where.sector = sector;
  }

  const clientes = await prisma.cliente.findMany({
    where,
    include: {
      contactos: { where: { principal: true }, take: 1 },
      _count: { select: { cotizaciones: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(clientes);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { contactos, ...clienteData } = body;

  const cliente = await prisma.cliente.create({
    data: {
      ...clienteData,
      contactos: contactos?.length
        ? { create: contactos }
        : undefined,
    },
    include: { contactos: true },
  });

  return NextResponse.json(cliente, { status: 201 });
}
