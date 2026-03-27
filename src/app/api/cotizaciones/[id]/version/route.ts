import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;

  // Find the quote and determine the original ID
  const quote = await prisma.cotizacion.findFirst({
    where: { id, usuarioId: session.userId },
    select: { id: true, cotizacionOriginalId: true },
  });

  if (!quote) return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });

  // The "root" is either the originalId or this quote itself
  const originalId = quote.cotizacionOriginalId || quote.id;

  // Get all versions: the original + all that point to it
  const versions = await prisma.cotizacion.findMany({
    where: {
      usuarioId: session.userId,
      OR: [
        { id: originalId },
        { cotizacionOriginalId: originalId },
      ],
    },
    select: {
      id: true,
      numero: true,
      version: true,
      estado: true,
      total: true,
      moneda: true,
      createdAt: true,
    },
    orderBy: { version: "asc" },
  });

  return NextResponse.json(versions);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;

  // Fetch the source quote
  const source = await prisma.cotizacion.findFirst({
    where: { id, usuarioId: session.userId },
    include: {
      lineItems: {
        select: {
          descripcion: true,
          productoId: true,
          varianteId: true,
          cantidad: true,
          precioUnitario: true,
          descuento: true,
          frecuencia: true,
          total: true,
          orden: true,
        },
      },
    },
  });

  if (!source) return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });

  if (!["ENVIADA", "NEGOCIACION", "PERDIDA"].includes(source.estado)) {
    return NextResponse.json(
      { error: "Solo se puede crear una nueva versión de cotizaciones enviadas, en negociación o perdidas" },
      { status: 400 }
    );
  }

  // Determine the original ID (root of the version chain)
  const originalId = source.cotizacionOriginalId || source.id;

  // Count existing versions
  const existingVersions = await prisma.cotizacion.count({
    where: {
      OR: [
        { id: originalId },
        { cotizacionOriginalId: originalId },
      ],
    },
  });

  const newVersion = existingVersions + 1;

  // Get the original quote's numero (without any -v suffix)
  const originalQuote = originalId === source.id
    ? source
    : await prisma.cotizacion.findUnique({ where: { id: originalId }, select: { numero: true } });

  const baseNumero = originalQuote?.numero || source.numero;
  // Remove existing version suffix if any (e.g., COT-2026-0001-v2 -> COT-2026-0001)
  const cleanNumero = baseNumero.replace(/-v\d+$/, "");
  const newNumero = `${cleanNumero}-v${newVersion}`;

  // Calculate new expiry
  const empresa = await prisma.empresa.findUnique({
    where: { id: "default" },
    select: { diasVencimiento: true },
  });
  const diasVencimiento = empresa?.diasVencimiento ?? 30;
  const fechaVencimiento = new Date();
  fechaVencimiento.setDate(fechaVencimiento.getDate() + diasVencimiento);

  // Create new version as BORRADOR
  const newCotizacion = await prisma.cotizacion.create({
    data: {
      numero: newNumero,
      clienteId: source.clienteId,
      usuarioId: session.userId,
      estado: "BORRADOR",
      fechaEmision: new Date(),
      fechaVencimiento,
      contactoNombre: source.contactoNombre,
      subtotal: source.subtotal,
      descuentoGlobal: source.descuentoGlobal,
      impuesto: source.impuesto,
      total: source.total,
      moneda: source.moneda,
      notas: source.notas,
      condiciones: source.condiciones,
      version: newVersion,
      cotizacionOriginalId: originalId,
      lineItems: {
        create: source.lineItems.map((li) => ({
          descripcion: li.descripcion,
          productoId: li.productoId,
          varianteId: li.varianteId,
          cantidad: li.cantidad,
          precioUnitario: li.precioUnitario,
          descuento: li.descuento,
          frecuencia: li.frecuencia,
          total: li.total,
          orden: li.orden,
        })),
      },
      actividades: {
        create: {
          tipo: "CREADA",
          descripcion: `Nueva versión v${newVersion} creada desde ${source.numero}`,
        },
      },
    },
  });

  // Archive the source quote
  await prisma.cotizacion.update({
    where: { id: source.id },
    data: { estado: "ARCHIVADA" },
  });

  await prisma.actividad.create({
    data: {
      cotizacionId: source.id,
      tipo: "ESTADO_CAMBIADO",
      descripcion: `Archivada automáticamente al crear versión v${newVersion}`,
      estadoAnterior: source.estado,
      estadoNuevo: "ARCHIVADA",
    },
  });

  // Log on original if different from source
  if (originalId !== source.id) {
    await prisma.actividad.create({
      data: {
        cotizacionId: originalId,
        tipo: "VERSION_CREADA",
        descripcion: `Nueva versión v${newVersion} creada`,
      },
    });
  }

  return NextResponse.json(newCotizacion, { status: 201 });
}
