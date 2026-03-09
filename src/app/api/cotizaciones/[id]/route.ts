import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cotizacionUpdateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cotizacion = await prisma.cotizacion.findUnique({
    where: { id },
    include: {
      cliente: { include: { contactos: true } },
      lineItems: {
        include: {
          producto: true,
          variante: { select: { id: true, nombre: true, sku: true, atributos: true } },
        },
        orderBy: { orden: "asc" },
      },
      actividades: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!cotizacion) {
    return NextResponse.json({ error: "Cotizacion no encontrada" }, { status: 404 });
  }

  return NextResponse.json(cotizacion);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { data, error } = validateBody(cotizacionUpdateSchema, body);
  if (error) return error;

  // Use a mutable copy for the update logic
  const updateData: Record<string, unknown> = { ...data };

  // Handle status change
  if (updateData.estado) {
    const current = await prisma.cotizacion.findUnique({
      where: { id },
      select: { estado: true, condiciones: true },
    });

    // Block BORRADOR → ENVIADA if no terms & conditions
    if (updateData.estado === "ENVIADA" && !current?.condiciones?.trim()) {
      return NextResponse.json(
        { error: "No se puede enviar la cotizacion sin terminos y condiciones." },
        { status: 400 }
      );
    }

    // Block BORRADOR → ENVIADA if approvals are pending or rejected
    if (updateData.estado === "ENVIADA" && current?.estado === "BORRADOR") {
      const blockingApprovals = await prisma.aprobacion.findMany({
        where: { cotizacionId: id, estado: { in: ["PENDIENTE", "RECHAZADA"] } },
        select: { estado: true, aprobadorNombre: true },
      });
      if (blockingApprovals.length > 0) {
        const pending = blockingApprovals.filter((a) => a.estado === "PENDIENTE");
        const rejected = blockingApprovals.filter((a) => a.estado === "RECHAZADA");
        let msg = "No se puede enviar la cotizacion.";
        if (rejected.length > 0) {
          msg += ` Rechazada por: ${rejected.map((a) => a.aprobadorNombre).join(", ")}.`;
        }
        if (pending.length > 0) {
          msg += ` Pendiente de aprobacion de: ${pending.map((a) => a.aprobadorNombre).join(", ")}.`;
        }
        return NextResponse.json({ error: msg }, { status: 400 });
      }
    }

    if (current && current.estado !== updateData.estado) {
      await prisma.actividad.create({
        data: {
          cotizacionId: id,
          tipo: "ESTADO_CAMBIADO",
          descripcion: `Estado cambiado de ${current.estado} a ${updateData.estado}`,
          estadoAnterior: current.estado,
          estadoNuevo: updateData.estado as string,
        },
      });
    }
  }

  // Handle line items update
  if (updateData.lineItems) {
    await prisma.lineItem.deleteMany({ where: { cotizacionId: id } });

    let subtotal = 0;
    const items = (updateData.lineItems as Record<string, unknown>[]).map(
      (item: Record<string, unknown>, index: number) => {
        const cantidad = Number(item.cantidad) || 1;
        const precioUnitario = Number(item.precioUnitario) || 0;
        const descuento = Number(item.descuento) || 0;
        const itemTotal = cantidad * precioUnitario * (1 - descuento / 100);
        subtotal += itemTotal;
        return {
          cotizacionId: id,
          descripcion: item.descripcion as string,
          productoId: (item.productoId as string) || null,
          varianteId: (item.varianteId as string) || null,
          cantidad,
          precioUnitario,
          descuento,
          total: Math.round(itemTotal * 100) / 100,
          orden: index,
        };
      }
    );

    await prisma.lineItem.createMany({ data: items });

    const descuentoGlobal = Number(updateData.descuentoGlobal) ?? 0;
    const impuesto = Number(updateData.impuesto) ?? 21;
    const subtotalConDescuento = subtotal * (1 - descuentoGlobal / 100);
    const total = subtotalConDescuento * (1 + impuesto / 100);

    updateData.subtotal = Math.round(subtotal * 100) / 100;
    updateData.total = Math.round(total * 100) / 100;
    delete updateData.lineItems;
  }

  const cotizacion = await prisma.cotizacion.update({
    where: { id },
    data: updateData,
    include: {
      cliente: true,
      lineItems: { orderBy: { orden: "asc" } },
      actividades: { orderBy: { createdAt: "desc" } },
    },
  });

  return NextResponse.json(cotizacion);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.cotizacion.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
