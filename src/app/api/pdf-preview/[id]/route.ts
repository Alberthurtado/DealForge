import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";

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

  const cotizacion = await prisma.cotizacion.findUnique({
    where: { id },
    include: {
      cliente: {
        include: {
          contactos: { where: { principal: true }, take: 1 },
        },
      },
      lineItems: {
        include: {
          producto: { select: { nombre: true, sku: true } },
          variante: { select: { id: true, nombre: true, sku: true, atributos: true } },
        },
        orderBy: { createdAt: "asc" },
      },
      firmas: { where: { signedAt: { not: null } }, take: 1 },
    },
  });

  if (!cotizacion) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const empresa = await prisma.empresa.findUnique({ where: { id: "default" } });
  if (!empresa) {
    return NextResponse.json({ error: "Empresa not found" }, { status: 404 });
  }

  const color = empresa.colorPrimario || "#3a9bb5";
  const plantilla = empresa.plantillaPdf || "moderna";
  const primaryContact = cotizacion.cliente.contactos?.[0] || null;
  const firma = cotizacion.firmas?.[0] || null;

  // Fallback to empresa defaults if cotización has no notes/conditions
  const notas = cotizacion.notas || null;
  const condiciones = cotizacion.condiciones || empresa.condicionesDefecto || null;

  const subtotal = cotizacion.subtotal;
  const discountAmount = subtotal * (cotizacion.descuentoGlobal / 100);
  const subtotalAfterDiscount = subtotal - discountAmount;
  const ivaAmount = subtotalAfterDiscount * (cotizacion.impuesto / 100);
  const isExpired = cotizacion.fechaVencimiento && new Date(cotizacion.fechaVencimiento) < new Date();

  // Build line items rows
  const lineItemsHtml = cotizacion.lineItems
    .map((item, i) => {
      const skuText = item.variante?.sku || item.producto?.sku || "";
      const rowBg = plantilla === "clasica" && i % 2 === 1 ? "background:#f9fafb;" : (plantilla !== "clasica" && plantilla !== "minimalista" && i % 2 === 1 ? "background:rgba(249,250,251,0.5);" : "");
      const borderStyle = plantilla === "clasica" ? "border:1px solid #e5e7eb;" : "border-bottom:1px solid #f3f4f6;";
      return `<tr style="${rowBg}">
        <td style="padding:10px 12px;color:#9ca3af;font-size:12px;${borderStyle}">${i + 1}</td>
        <td style="padding:10px 12px;${borderStyle}">
          <div style="font-weight:500;color:#1f2937;">${item.descripcion}</div>
          ${skuText ? `<div style="font-size:10px;color:#9ca3af;margin-top:2px;">SKU: ${skuText}</div>` : ""}
        </td>
        <td style="padding:10px 12px;text-align:right;color:#374151;${borderStyle}">${item.cantidad}</td>
        <td style="padding:10px 12px;text-align:right;color:#374151;${borderStyle}">${formatCurrency(item.precioUnitario)}</td>
        <td style="padding:10px 12px;text-align:right;color:#374151;${borderStyle}">${item.descuento > 0 ? `${item.descuento}%` : "-"}</td>
        <td style="padding:10px 12px;text-align:right;font-weight:500;color:#111827;${borderStyle}">${formatCurrency(item.total)}</td>
      </tr>`;
    })
    .join("");

  // Header HTML based on template
  let headerHtml = "";
  if (plantilla === "moderna") {
    headerHtml = `
      <div style="padding:32px 40px 24px;color:white;background:linear-gradient(135deg,${color},${color}dd);border-radius:8px 8px 0 0;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div style="display:flex;align-items:center;gap:16px;">
            ${empresa.logoUrl
              ? `<img src="${empresa.logoUrl}" alt="${empresa.nombre}" width="52" height="52" style="border-radius:8px;background:rgba(255,255,255,0.2);padding:4px;" />`
              : `<div style="width:52px;height:52px;border-radius:8px;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:bold;color:white;">${empresa.nombre.charAt(0)}</div>`
            }
            <div>
              <h1 style="margin:0;font-size:20px;font-weight:bold;">${empresa.nombre}</h1>
              ${empresa.cif ? `<p style="margin:2px 0 0;font-size:12px;color:rgba(255,255,255,0.7);">CIF: ${empresa.cif}</p>` : ""}
              ${empresa.web ? `<p style="margin:0;font-size:12px;color:rgba(255,255,255,0.7);">${empresa.web}</p>` : ""}
            </div>
          </div>
          <div style="text-align:right;">
            <h2 style="margin:0;font-size:24px;font-weight:bold;letter-spacing:-0.5px;">COTIZACIÓN</h2>
            <p style="margin:4px 0 0;font-size:18px;font-weight:600;">${cotizacion.numero}</p>
            <div style="margin-top:8px;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.7);">Emisión: ${formatDate(cotizacion.fechaEmision)}</p>
              ${cotizacion.fechaVencimiento ? `<p style="margin:2px 0 0;font-size:12px;color:${isExpired ? "#fecaca" : "rgba(255,255,255,0.7)"};">Validez: ${formatDate(cotizacion.fechaVencimiento)}${isExpired ? " (VENCIDA)" : ""}</p>` : ""}
            </div>
          </div>
        </div>
      </div>`;
  } else if (plantilla === "clasica") {
    headerHtml = `
      <div style="padding:40px 40px 24px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div style="display:flex;align-items:center;gap:16px;">
            ${empresa.logoUrl
              ? `<img src="${empresa.logoUrl}" alt="${empresa.nombre}" width="48" height="48" />`
              : `<div style="width:48px;height:48px;background:#e5e7eb;border-radius:2px;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:bold;color:#374151;">${empresa.nombre.charAt(0)}</div>`
            }
            <div>
              <h1 style="margin:0;font-size:20px;font-weight:bold;color:#111827;">${empresa.nombre}</h1>
              ${empresa.cif ? `<p style="margin:2px 0 0;font-size:12px;color:#6b7280;">CIF: ${empresa.cif}</p>` : ""}
              ${empresa.web ? `<p style="margin:0;font-size:12px;color:#9ca3af;">${empresa.web}</p>` : ""}
            </div>
          </div>
          <div style="text-align:right;">
            <h2 style="margin:0;font-size:24px;font-weight:bold;color:#1f2937;letter-spacing:2px;">COTIZACIÓN</h2>
            <p style="margin:4px 0 0;font-size:18px;font-weight:600;color:#1f2937;">${cotizacion.numero}</p>
            <div style="margin-top:8px;">
              <p style="margin:0;font-size:12px;color:#6b7280;">Emisión: ${formatDate(cotizacion.fechaEmision)}</p>
              ${cotizacion.fechaVencimiento ? `<p style="margin:2px 0 0;font-size:12px;color:${isExpired ? "#dc2626" : "#6b7280"};">Validez: ${formatDate(cotizacion.fechaVencimiento)}${isExpired ? " (VENCIDA)" : ""}</p>` : ""}
            </div>
          </div>
        </div>
        <div style="margin-top:24px;height:2px;background:#1f2937;"></div>
      </div>`;
  } else {
    headerHtml = `
      <div style="padding:40px 40px 24px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            ${empresa.logoUrl
              ? `<img src="${empresa.logoUrl}" alt="${empresa.nombre}" width="40" height="40" style="margin-bottom:8px;" />`
              : `<div style="width:40px;height:40px;border-radius:50%;background:#f3f4f6;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:500;color:#6b7280;margin-bottom:8px;">${empresa.nombre.charAt(0)}</div>`
            }
            <h1 style="margin:0;font-size:18px;font-weight:500;color:#374151;">${empresa.nombre}</h1>
            ${empresa.web ? `<p style="margin:0;font-size:12px;color:#9ca3af;font-weight:300;">${empresa.web}</p>` : ""}
          </div>
          <div style="text-align:right;">
            <h2 style="margin:0;font-size:20px;color:#9ca3af;font-weight:300;letter-spacing:4px;">COTIZACIÓN</h2>
            <p style="margin:4px 0 0;font-size:16px;color:#4b5563;">${cotizacion.numero}</p>
            <div style="margin-top:8px;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">${formatDate(cotizacion.fechaEmision)}</p>
              ${cotizacion.fechaVencimiento ? `<p style="margin:2px 0 0;font-size:12px;color:${isExpired ? "#ef4444" : "#9ca3af"};">Válida hasta: ${formatDate(cotizacion.fechaVencimiento)}${isExpired ? " (VENCIDA)" : ""}</p>` : ""}
            </div>
          </div>
        </div>
        <div style="margin-top:24px;height:1px;background:#e5e7eb;"></div>
      </div>`;
  }

  // Table header style based on template
  const thStyle = plantilla === "clasica"
    ? "padding:10px 12px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#4b5563;background:#f3f4f6;border:1px solid #d1d5db;"
    : "padding:10px 12px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#6b7280;" + (plantilla === "minimalista" ? "" : "background:#f9fafb;");

  // Totals style based on template
  let totalRowHtml = "";
  if (plantilla === "moderna") {
    totalRowHtml = `<div style="display:flex;justify-content:space-between;padding:8px 12px;margin-top:8px;border-radius:8px;background:${color};color:white;">
      <span style="font-size:16px;font-weight:bold;">Total</span>
      <span style="font-size:20px;font-weight:bold;">${formatCurrency(cotizacion.total)}</span>
    </div>`;
  } else if (plantilla === "clasica") {
    totalRowHtml = `<div style="display:flex;justify-content:space-between;padding-top:8px;margin-top:8px;border-top:2px solid #1f2937;">
      <span style="font-size:16px;font-weight:bold;color:#111827;">Total</span>
      <span style="font-size:20px;font-weight:bold;color:#111827;">${formatCurrency(cotizacion.total)}</span>
    </div>`;
  } else {
    totalRowHtml = `<div style="display:flex;justify-content:space-between;padding-top:8px;margin-top:8px;border-top:1px solid #e5e7eb;">
      <span style="font-size:16px;font-weight:500;color:#4b5563;">Total</span>
      <span style="font-size:20px;font-weight:500;color:#374151;">${formatCurrency(cotizacion.total)}</span>
    </div>`;
  }

  // Signature HTML
  const signatureHtml = firma?.signatureData ? `
    <div style="padding:0 40px 24px;">
      <div style="height:1px;background:#f3f4f6;margin-bottom:16px;"></div>
      <div>
        <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#9ca3af;margin:0 0 8px;">Firma del Cliente</p>
        <img src="${firma.signatureData}" alt="Firma" style="height:64px;max-width:200px;object-fit:contain;" />
        <div style="height:1px;background:#d1d5db;margin-top:4px;width:192px;"></div>
        <p style="font-size:12px;color:#4b5563;margin:4px 0 0;">${firma.signerName}</p>
        <p style="font-size:10px;color:#9ca3af;margin:0;">Firmado el ${formatDate(firma.signedAt!)}</p>
      </div>
    </div>` : "";

  // Footer
  const footerBg = plantilla === "moderna" ? `${color}10` : "#f9fafb";
  const footerHtml = `
    <div style="padding:24px 40px;background:${footerBg};border-radius:0 0 8px 8px;">
      <div style="display:flex;justify-content:space-between;">
        <p style="margin:0;font-size:10px;color:#9ca3af;">Cotización generada por ${empresa.nombre}${empresa.web ? ` \u2022 ${empresa.web}` : ""}</p>
        <p style="margin:0;font-size:10px;color:#9ca3af;">${cotizacion.fechaVencimiento ? `Válida hasta: ${formatDate(cotizacion.fechaVencimiento)}` : `Emitida: ${formatDate(cotizacion.fechaEmision)}`}</p>
      </div>
    </div>`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cotizacion.numero}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #f3f4f6; -webkit-font-smoothing: antialiased; }
  </style>
</head>
<body>
  <div id="pdf-root" style="max-width:800px;margin:32px auto;background:white;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1);overflow:hidden;">
    ${headerHtml}

    <!-- Client info -->
    <div style="padding:0 40px 24px;">
      <div style="display:flex;gap:32px;">
        <div style="flex:1;">
          <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#9ca3af;margin-bottom:8px;">Cliente</p>
          <p style="font-size:14px;font-weight:600;color:#111827;">${cotizacion.cliente.nombre}</p>
          ${cotizacion.cliente.ruc ? `<p style="font-size:12px;color:#6b7280;margin-top:2px;">CIF/NIF: ${cotizacion.cliente.ruc}</p>` : ""}
          ${cotizacion.cliente.direccion ? `<p style="font-size:12px;color:#6b7280;margin-top:2px;">${cotizacion.cliente.direccion}</p>` : ""}
          ${(cotizacion.cliente.ciudad || cotizacion.cliente.pais) ? `<p style="font-size:12px;color:#6b7280;">${[cotizacion.cliente.ciudad, cotizacion.cliente.pais].filter(Boolean).join(", ")}</p>` : ""}
          ${cotizacion.cliente.email ? `<p style="font-size:12px;color:#6b7280;margin-top:4px;">${cotizacion.cliente.email}</p>` : ""}
          ${cotizacion.cliente.telefono ? `<p style="font-size:12px;color:#6b7280;">${cotizacion.cliente.telefono}</p>` : ""}
        </div>
        <div style="flex:1;">
          <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#9ca3af;margin-bottom:8px;">Contacto</p>
          ${cotizacion.contactoNombre
            ? `<p style="font-size:14px;font-weight:600;color:#111827;">${cotizacion.contactoNombre}</p>
               ${primaryContact?.cargo ? `<p style="font-size:12px;color:#6b7280;margin-top:2px;">${primaryContact.cargo}</p>` : ""}
               ${primaryContact?.email ? `<p style="font-size:12px;color:#6b7280;margin-top:2px;">${primaryContact.email}</p>` : ""}
               ${primaryContact?.telefono ? `<p style="font-size:12px;color:#6b7280;">${primaryContact.telefono}</p>` : ""}`
            : `<p style="font-size:12px;color:#9ca3af;font-style:italic;">No especificado</p>`
          }
        </div>
      </div>
    </div>

    <!-- Empresa details -->
    ${(empresa.email || empresa.telefono || empresa.direccion) ? `
    <div style="padding:0 40px 24px;">
      <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#9ca3af;margin-bottom:8px;">Datos del Emisor</p>
      <div style="font-size:12px;color:#6b7280;">
        ${empresa.direccion ? `<p style="margin:0;">${empresa.direccion}</p>` : ""}
        ${(empresa.ciudad || empresa.pais) ? `<p style="margin:0;">${[empresa.ciudad, empresa.pais].filter(Boolean).join(", ")}</p>` : ""}
        ${empresa.email ? `<p style="margin:0;">${empresa.email}</p>` : ""}
        ${empresa.telefono ? `<p style="margin:0;">${empresa.telefono}</p>` : ""}
      </div>
    </div>` : ""}

    <!-- Line items -->
    <div style="padding:0 40px 24px;">
      <table style="width:100%;font-size:14px;border-collapse:collapse;${plantilla === "clasica" ? "border:1px solid #d1d5db;" : ""}">
        <thead>
          <tr>
            <th style="${thStyle}text-align:left;">#</th>
            <th style="${thStyle}text-align:left;">Descripción</th>
            <th style="${thStyle}text-align:right;">Cant.</th>
            <th style="${thStyle}text-align:right;">Precio Unit.</th>
            <th style="${thStyle}text-align:right;">Dto.</th>
            <th style="${thStyle}text-align:right;">Total</th>
          </tr>
        </thead>
        <tbody>${lineItemsHtml}</tbody>
      </table>
    </div>

    <!-- Totals -->
    <div style="padding:0 40px 32px;">
      <div style="display:flex;justify-content:flex-end;">
        <div style="width:288px;">
          <div style="display:flex;justify-content:space-between;font-size:14px;color:#4b5563;">
            <span>Subtotal</span>
            <span>${formatCurrency(subtotal)}</span>
          </div>
          ${cotizacion.descuentoGlobal > 0 ? `
          <div style="display:flex;justify-content:space-between;font-size:14px;color:#dc2626;margin-top:6px;">
            <span>Descuento (${cotizacion.descuentoGlobal}%)</span>
            <span>-${formatCurrency(discountAmount)}</span>
          </div>` : ""}
          ${cotizacion.impuesto > 0 ? `
          <div style="display:flex;justify-content:space-between;font-size:14px;color:#4b5563;margin-top:6px;">
            <span>IVA (${cotizacion.impuesto}%)</span>
            <span>${formatCurrency(ivaAmount)}</span>
          </div>` : `
          <div style="display:flex;justify-content:space-between;font-size:14px;color:#9ca3af;font-style:italic;margin-top:6px;">
            <span>IVA no incluido</span>
          </div>`}
          ${totalRowHtml}
        </div>
      </div>
    </div>

    <!-- Notes & Conditions -->
    ${(notas || condiciones) ? `
    <div style="padding:0 40px 32px;">
      <div style="height:1px;background:#f3f4f6;margin-bottom:16px;"></div>
      ${notas ? `
      <div style="margin-bottom:16px;">
        <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#9ca3af;margin-bottom:6px;">Notas</p>
        <p style="font-size:12px;color:#4b5563;line-height:1.6;white-space:pre-line;">${notas}</p>
      </div>` : ""}
      ${condiciones ? `
      <div>
        <p style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;color:#9ca3af;margin-bottom:6px;">Términos y Condiciones</p>
        <p style="font-size:12px;color:#4b5563;line-height:1.6;white-space:pre-line;">${condiciones}</p>
      </div>` : ""}
    </div>` : ""}

    ${signatureHtml}
    ${footerHtml}
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
