import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { clienteUpdateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;
  const cliente = await prisma.cliente.findFirst({
    where: { id, usuarioId: session.userId },
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
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;

  // Verify ownership
  const existing = await prisma.cliente.findFirst({ where: { id, usuarioId: session.userId }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });

  const body = await request.json();
  const { data, error } = validateBody(clienteUpdateSchema, body);
  if (error) return error;
  const { contactos, ...clienteData } = data;

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
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;

  // Verify ownership
  const existing = await prisma.cliente.findFirst({ where: { id, usuarioId: session.userId }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });

  await prisma.cliente.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
