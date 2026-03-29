import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { generateContratoPdf } from "@/lib/pdf-contrato";
import {
  buildTemplateData,
  fillTemplate,
  DEFAULT_CONTRACT_TEMPLATE,
} from "@/lib/contract-template";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;
  const empresaId = session.empresaId || session.userId;

  // Verify contract belongs to user/empresa
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
      lineItems: { orderBy: { orden: "asc" } },
    },
  });

  if (!contrato) {
    return NextResponse.json({ error: "Contrato no encontrado" }, { status: 404 });
  }

  // Auto-generate documentoHtml if missing
  if (!contrato.documentoHtml) {
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

    let templateContent = DEFAULT_CONTRACT_TEMPLATE;

    if (contrato.plantillaId) {
      const plantilla = await prisma.plantillaContrato.findFirst({
        where: { id: contrato.plantillaId, empresaId },
      });
      if (plantilla) templateContent = plantilla.contenido;
    } else {
      const defaultPlantilla = await prisma.plantillaContrato.findFirst({
        where: { empresaId, esDefault: true },
      });
      if (defaultPlantilla) templateContent = defaultPlantilla.contenido;
    }

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

    const documentoHtml = fillTemplate(templateContent, templateData);

    await prisma.contrato.update({
      where: { id },
      data: {
        documentoHtml,
        documentoGeneradoAt: new Date(),
      },
    });
  }

  const origin = request.headers.get("origin") || `https://${request.headers.get("host")}`;

  const pdfBuffer = await generateContratoPdf(origin, id);

  return new NextResponse(pdfBuffer.buffer as ArrayBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="contrato-${contrato.numero}.pdf"`,
    },
  });
}
