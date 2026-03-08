import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cliente = await prisma.cliente.findUnique({
    where: { id },
    include: {
      contactos: true,
      cotizaciones: {
        include: { _count: { select: { lineItems: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!cliente) {
    return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
  }

  return NextResponse.json(cliente);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { contactos, ...clienteData } = body;

  const cliente = await prisma.cliente.update({
    where: { id },
    data: clienteData,
    include: { contactos: true },
  });

  return NextResponse.json(cliente);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.cliente.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
