import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import {
  buildTemplateData,
  fillTemplate,
  DEFAULT_CONTRACT_TEMPLATE,
} from "@/lib/contract-template";

function generateSecret(id: string): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not set");
  return createHmac("sha256", secret).update(id).digest("hex").slice(0, 16);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  // Validate HMAC secret
  if (!secret || secret !== generateSecret(id)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const contrato = await prisma.contrato.findUnique({
    where: { id },
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
      firmas: {
        where: { signedAt: { not: null } },
        orderBy: { signedAt: "desc" },
        take: 1,
      },
    },
  });

  if (!contrato) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Get empresa
  const empresa = await prisma.empresa.findFirst({
    where: {
      OR: [
        { id: contrato.equipoId ?? "" },
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

  // Determine documentoHtml - use stored or generate on-the-fly
  let documentoHtml = contrato.documentoHtml;

  if (!documentoHtml) {
    // Auto-generate
    let templateContent = DEFAULT_CONTRACT_TEMPLATE;

    if (contrato.plantillaId && contrato.equipoId) {
      const plantilla = await prisma.plantillaContrato.findFirst({
        where: { id: contrato.plantillaId, empresaId: contrato.equipoId },
      });
      if (plantilla) templateContent = plantilla.contenido;
    } else if (contrato.equipoId) {
      const defaultPlantilla = await prisma.plantillaContrato.findFirst({
        where: { empresaId: contrato.equipoId, esDefault: true },
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

    documentoHtml = fillTemplate(templateContent, templateData);
  }

  // Signature section
  const firma = contrato.firmas?.[0] ?? null;
  const signatureHtml = firma?.signatureData
    ? `
    <div class="signature-section" style="margin-top: 40px; padding: 24px 40px; border-top: 1px solid #e5e7eb;">
      <p style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #9ca3af; margin: 0 0 8px;">Firma Electrónica</p>
      <img src="${firma.signatureData}" alt="Firma" style="height: 64px; max-width: 200px; object-fit: contain;" />
      <div style="height: 1px; background: #d1d5db; margin-top: 4px; width: 192px;"></div>
      <p style="font-size: 12px; color: #4b5563; margin: 4px 0 0;">${firma.signerName}</p>
      <p style="font-size: 11px; color: #9ca3af; margin: 2px 0 0;">${firma.signerEmail}</p>
      <p style="font-size: 10px; color: #9ca3af; margin: 2px 0 0;">Firmado el ${firma.signedAt ? new Date(firma.signedAt).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }) : ""}</p>
      ${firma.ipAddress ? `<p style="font-size: 10px; color: #9ca3af; margin: 2px 0 0;">IP: ${firma.ipAddress}</p>` : ""}
    </div>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contrato ${contrato.numero}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { margin: 20mm; size: A4; }
    body { font-family: Arial, sans-serif; background: #f3f4f6; -webkit-font-smoothing: antialiased; }
    .signature-section { page-break-inside: avoid; }
  </style>
</head>
<body>
  <div id="pdf-root" style="max-width: 800px; margin: 32px auto; background: white; border-radius: 8px; overflow: hidden;">
    ${documentoHtml}
    ${signatureHtml}
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
