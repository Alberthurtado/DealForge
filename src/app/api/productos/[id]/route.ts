import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { productoUpdateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;
  const producto = await prisma.producto.findFirst({
    where: { id, usuarioId: session.userId },
    include: {
      categoria: true,
      variantes: { orderBy: { nombre: "asc" } },
    },
  });

  if (!producto) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

  return NextResponse.json(producto);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;

  // Verify ownership
  const existing = await prisma.producto.findFirst({ where: { id, usuarioId: session.userId }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });

  const body = await request.json();
  const { data, error } = validateBody(productoUpdateSchema, body);
  if (error) return error;
  const { variantes, ...productoData } = data;

  // Update product data
  const producto = await prisma.producto.update({
    where: { id },
    data: productoData,
  });

  // Sync variants if provided
  if (variantes !== undefined) {
    const incomingIds = variantes
      .filter((v) => v.id)
      .map((v) => v.id as string);

    // Delete variants not in the incoming list
    await prisma.varianteProducto.deleteMany({
      where: { productoId: id, id: { notIn: incomingIds } },
    });

    // Upsert each variant
    for (const v of variantes) {
      if (v.id) {
        await prisma.varianteProducto.update({
          where: { id: v.id },
          data: {
            nombre: v.nombre,
            sku: v.sku,
            precioOverride: v.precioOverride ?? null,
            atributos: v.atributos ?? "{}",
            activo: v.activo ?? true,
          },
        });
      } else {
        await prisma.varianteProducto.create({
          data: {
            productoId: id,
            nombre: v.nombre,
            sku: v.sku,
            precioOverride: v.precioOverride ?? null,
            atributos: v.atributos ?? "{}",
            activo: v.activo ?? true,
          },
        });
      }
    }
  }

  // Return updated product with variants
  const updated = await prisma.producto.findUnique({
    where: { id },
    include: {
      categoria: true,
      variantes: { orderBy: { nombre: "asc" } },
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;

  // Verify ownership
  const existing = await prisma.producto.findFirst({ where: { id, usuarioId: session.userId }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });

  await prisma.producto.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
