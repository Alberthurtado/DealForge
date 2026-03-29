import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import {
  buildTemplateData,
  fillTemplate,
  DEFAULT_CONTRACT_TEMPLATE,
  buildEnmiendasAnexo,
} from "@/lib/contract-template";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;

  // Get body (optional plantillaId)
  let plantillaId: string | undefined;
  try {
    const body = await request.json();
    plantillaId = body?.plantillaId;
  } catch {
    // body is optional
  }

  const empresaId = session.empresaId || session.userId;

  // Load contract with all relations
  const contrato = await prisma.contrato.findFirst({
    where: {
      id,
      OR: [
        { equipoId: empresaId },
        { usuarioId: session.userId, equipoId: null },
      ],
    },
    include: {
      cliente: {
        select: {
          nombre: true,
          email: true,
          telefono: true,
          ruc: true,
          direccion: true,
        },
      },
      cotizacion: {
        select: { numero: true, total: true, moneda: true },
      },
      lineItems: {
        orderBy: { orden: "asc" },
      },
      enmiendas: {
        where: { estado: "ACEPTADA" },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!contrato) {
    return NextResponse.json({ error: "Contrato no encontrado" }, { status: 404 });
  }

  // Load empresa data
  const empresa = await prisma.empresa.findFirst({
    where: {
      OR: [
        { id: empresaId },
        { id: "default" },
      ],
    },
    select: {
      nombre: true,
      cif: true,
      email: true,
      telefono: true,
      direccion: true,
      web: true,
    },
    orderBy: { createdAt: "asc" },
  });

  // Get template
  let templateContent = DEFAULT_CONTRACT_TEMPLATE;

  // Try plantillaId from body first, then contrato.plantillaId, then empresa default
  const resolvedPlantillaId = plantillaId || contrato.plantillaId;
  if (resolvedPlantillaId) {
    const plantilla = await prisma.plantillaContrato.findFirst({
      where: { id: resolvedPlantillaId, empresaId },
    });
    if (plantilla) templateContent = plantilla.contenido;
  } else {
    // Try empresa default template
    const defaultPlantilla = await prisma.plantillaContrato.findFirst({
      where: { empresaId, esDefault: true },
    });
    if (defaultPlantilla) templateContent = defaultPlantilla.contenido;
  }

  // Build template data
  const templateData = buildTemplateData({
    contrato: {
      numero: contrato.numero,
      fechaInicio: contrato.fechaInicio,
      fechaFin: contrato.fechaFin,
      duracionMeses: contrato.duracionMeses,
      valorMensual: contrato.valorMensual,
      valorTotal: contrato.valorTotal,
      moneda: contrato.moneda,
      condiciones: contrato.condiciones,
      clausulaCancelacion: contrato.clausulaCancelacion,
      periodoPreaviso: contrato.periodoPreaviso,
      lineItems: contrato.lineItems.map((li) => ({
        descripcion: li.descripcion,
        cantidad: li.cantidad,
        precioUnitario: li.precioUnitario,
        frecuencia: li.frecuencia,
        total: li.total,
      })),
    },
    cliente: {
      nombre: contrato.cliente.nombre,
      email: contrato.cliente.email,
      telefono: contrato.cliente.telefono,
      cif: contrato.cliente.ruc,
      direccion: contrato.cliente.direccion,
    },
    empresa: {
      nombre: empresa?.nombre ?? null,
      cif: empresa?.cif ?? null,
      email: empresa?.email ?? null,
      telefono: empresa?.telefono ?? null,
      direccion: empresa?.direccion ?? null,
      web: empresa?.web ?? null,
    },
    cotizacion: {
      numero: contrato.cotizacion.numero,
      total: contrato.cotizacion.total,
      moneda: contrato.cotizacion.moneda,
    },
  });

  const mainHtml = fillTemplate(templateContent, templateData);
  const enmiendasAnexo = buildEnmiendasAnexo(contrato.enmiendas ?? []);
  const documentoHtml = enmiendasAnexo ? `${mainHtml}${enmiendasAnexo}` : mainHtml;

  // Save to contrato
  await prisma.contrato.update({
    where: { id },
    data: {
      documentoHtml,
      documentoGeneradoAt: new Date(),
      plantillaId: resolvedPlantillaId ?? contrato.plantillaId,
    },
  });

  return NextResponse.json({ success: true, documentoHtml });
}
