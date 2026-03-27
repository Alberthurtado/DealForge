import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { cotizacionUpdateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";
import { validarCotizacion, type ProductoCategoriaMap } from "@/lib/reglas-engine";
import { buildApprovalRequestEmail } from "@/lib/approval-email";
import { sendSystemEmail } from "@/lib/system-email";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;
  const cotizacion = await prisma.cotizacion.findFirst({
    where: { id, usuarioId: session.userId },
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
    return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });
  }

  return NextResponse.json(cotizacion);
}

async function evaluateAndCreateApprovals(
  cotizacionId: string,
  userId: string,
  request: NextRequest
) {
  const cotizacion = await prisma.cotizacion.findFirst({
    where: { id: cotizacionId, usuarioId: userId },
    include: { lineItems: true, cliente: { select: { nombre: true } } },
  });
  if (!cotizacion) return [];

  const [reglas, allProducts] = await Promise.all([
    prisma.reglaComercial.findMany({ where: { activa: true, usuarioId: userId } }),
    prisma.producto.findMany({ where: { usuarioId: userId }, select: { id: true, categoriaId: true } }),
  ]);
  if (reglas.length === 0) return [];

  const catMap: ProductoCategoriaMap = {};
  for (const p of allProducts) catMap[p.id] = p.categoriaId;

  const result = validarCotizacion(reglas, {
    lineItems: cotizacion.lineItems.map((li) => ({
      productoId: li.productoId, descripcion: li.descripcion,
      cantidad: li.cantidad, precioUnitario: li.precioUnitario, descuento: li.descuento,
    })),
    descuentoGlobal: cotizacion.descuentoGlobal, subtotal: cotizacion.subtotal, total: cotizacion.total,
  }, catMap);

  if (result.aprobacionesRequeridas.length === 0) return [];

  const existingApprovals = await prisma.aprobacion.findMany({
    where: { cotizacionId }, select: { reglaId: true, aprobadorEmail: true, estado: true },
  });

  const newApprovals = [];
  for (const req of result.aprobacionesRequeridas) {
    const existing = existingApprovals.find(
      (a) => a.reglaId === req.reglaId && a.aprobadorEmail === req.aprobador.email
    );
    if (!existing) {
      const aprobacion = await prisma.aprobacion.create({
        data: { cotizacionId, reglaId: req.reglaId, aprobadorNombre: req.aprobador.nombre, aprobadorEmail: req.aprobador.email },
      });
      newApprovals.push({ ...aprobacion, razon: req.razon });
    } else if (existing.estado === "APROBADA") {
      await prisma.aprobacion.updateMany({
        where: { cotizacionId, reglaId: req.reglaId, aprobadorEmail: req.aprobador.email },
        data: { estado: "PENDIENTE", respondidoAt: null, comentario: null },
      });
    }
  }

  if (newApprovals.length > 0) {
    await prisma.actividad.create({
      data: { cotizacionId, tipo: "APROBACION_REQUERIDA", descripcion: `Aprobación requerida de: ${newApprovals.map((a) => a.aprobadorNombre).join(", ")}` },
    });
    try {
      const origin = request.headers.get("origin") || `http://${request.headers.get("host")}`;
      const empresaData = await prisma.empresa.findUnique({ where: { id: "default" }, select: { nombre: true, colorPrimario: true } });
      for (const aprob of newApprovals) {
        if (!aprob.token) continue;
        try {
          const html = buildApprovalRequestEmail({
            baseUrl: origin, token: aprob.token,
            cotizacion: { numero: cotizacion.numero, total: cotizacion.total, moneda: cotizacion.moneda, fechaEmision: cotizacion.fechaEmision, cliente: cotizacion.cliente.nombre },
            aprobadorNombre: aprob.aprobadorNombre, razon: aprob.razon,
            empresa: { nombre: empresaData?.nombre || "DealForge", colorPrimario: empresaData?.colorPrimario || "#3a9bb5" },
            lineItems: cotizacion.lineItems.map((i) => ({ descripcion: i.descripcion, cantidad: i.cantidad, total: i.total })),
          });
          const emailResult = await sendSystemEmail({ to: aprob.aprobadorEmail, subject: `Aprobación requerida: ${cotizacion.numero}`, html });
          if (emailResult.success) {
            await prisma.aprobacion.update({ where: { id: aprob.id }, data: { emailEnviadoAt: new Date() } });
          }
        } catch { /* Email failure doesn't block */ }
      }
    } catch { /* Non-critical */ }
  }

  return newApprovals;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;
  const owned = await prisma.cotizacion.findFirst({ where: { id, usuarioId: session.userId }, select: { id: true } });
  if (!owned) return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });

  const body = await request.json();
  const { data, error } = validateBody(cotizacionUpdateSchema, body);
  if (error) return error;

  // Only include fields that were explicitly sent — don't overwrite with null for missing fields
  const updateData: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key in body) {
      updateData[key] = value;
    }
  }

  if (updateData.estado) {
    const current = await prisma.cotizacion.findUnique({ where: { id }, select: { estado: true, condiciones: true } });
    if (updateData.estado === "ENVIADA" && !current?.condiciones?.trim()) {
      return NextResponse.json({ error: "No se puede enviar la cotización sin términos y condiciones." }, { status: 400 });
    }
    if (updateData.estado === "ENVIADA" && current?.estado === "BORRADOR") {
      await evaluateAndCreateApprovals(id, session.userId, request);
      const blockingApprovals = await prisma.aprobacion.findMany({
        where: { cotizacionId: id, estado: { in: ["PENDIENTE", "RECHAZADA"] } },
        select: { estado: true, aprobadorNombre: true },
      });
      if (blockingApprovals.length > 0) {
        const pending = blockingApprovals.filter((a) => a.estado === "PENDIENTE");
        const rejected = blockingApprovals.filter((a) => a.estado === "RECHAZADA");
        let msg = "No se puede enviar la cotización.";
        if (rejected.length > 0) msg += ` Rechazada por: ${rejected.map((a) => a.aprobadorNombre).join(", ")}.`;
        if (pending.length > 0) msg += ` Pendiente de aprobación de: ${pending.map((a) => a.aprobadorNombre).join(", ")}.`;
        return NextResponse.json({ error: msg, code: "APPROVAL_REQUIRED" }, { status: 400 });
      }
    }
    if (current && current.estado !== updateData.estado) {
      await prisma.actividad.create({
        data: { cotizacionId: id, tipo: "ESTADO_CAMBIADO", descripcion: `Estado cambiado de ${current.estado} a ${updateData.estado}`, estadoAnterior: current.estado, estadoNuevo: updateData.estado as string },
      });
    }
  }

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
        return { cotizacionId: id, descripcion: item.descripcion as string, productoId: (item.productoId as string) || null, varianteId: (item.varianteId as string) || null, cantidad, precioUnitario, descuento, total: Math.round(itemTotal * 100) / 100, orden: index };
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
    where: { id }, data: updateData,
    include: { cliente: true, lineItems: { orderBy: { orden: "asc" } }, actividades: { orderBy: { createdAt: "desc" } } },
  });

  if (data.lineItems && cotizacion.estado === "BORRADOR") {
    try { await evaluateAndCreateApprovals(id, session.userId, request); } catch { /* Non-critical */ }
  }

  return NextResponse.json(cotizacion);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  const { id } = await params;
  const owned = await prisma.cotizacion.findFirst({ where: { id, usuarioId: session.userId }, select: { id: true } });
  if (!owned) return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });
  await prisma.cotizacion.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
