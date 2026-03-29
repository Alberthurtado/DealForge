// Available variables for contract templates
export const TEMPLATE_VARIABLES = [
  { key: "{{contrato.numero}}", label: "Número de contrato" },
  { key: "{{contrato.fechaInicio}}", label: "Fecha de inicio" },
  { key: "{{contrato.fechaFin}}", label: "Fecha de fin" },
  { key: "{{contrato.duracionMeses}}", label: "Duración (meses)" },
  { key: "{{contrato.valorMensual}}", label: "Valor mensual" },
  { key: "{{contrato.valorTotal}}", label: "Valor total" },
  { key: "{{contrato.moneda}}", label: "Moneda" },
  { key: "{{contrato.condiciones}}", label: "Condiciones generales" },
  { key: "{{contrato.clausulaCancelacion}}", label: "Cláusula de cancelación" },
  { key: "{{contrato.periodoPreaviso}}", label: "Período de preaviso (días)" },
  { key: "{{cliente.nombre}}", label: "Nombre del cliente" },
  { key: "{{cliente.email}}", label: "Email del cliente" },
  { key: "{{cliente.telefono}}", label: "Teléfono del cliente" },
  { key: "{{cliente.cif}}", label: "CIF del cliente" },
  { key: "{{cliente.direccion}}", label: "Dirección del cliente" },
  { key: "{{empresa.nombre}}", label: "Nombre de tu empresa" },
  { key: "{{empresa.cif}}", label: "CIF de tu empresa" },
  { key: "{{empresa.email}}", label: "Email de tu empresa" },
  { key: "{{empresa.telefono}}", label: "Teléfono de tu empresa" },
  { key: "{{empresa.direccion}}", label: "Dirección de tu empresa" },
  { key: "{{empresa.web}}", label: "Web de tu empresa" },
  { key: "{{cotizacion.numero}}", label: "Número de cotización origen" },
  { key: "{{cotizacion.total}}", label: "Total cotización" },
  { key: "{{items}}", label: "Tabla de líneas de contrato" },
  { key: "{{fecha.hoy}}", label: "Fecha de hoy" },
];

export const DEFAULT_CONTRACT_TEMPLATE = `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #1a1a1a;">

  <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #3a9bb5; padding-bottom: 20px;">
    <h1 style="font-size: 28px; font-weight: bold; color: #3a9bb5; margin: 0;">CONTRATO DE SERVICIOS</h1>
    <p style="color: #666; margin: 8px 0 0;">Contrato N.º {{contrato.numero}}</p>
  </div>

  <div style="display: flex; justify-content: space-between; margin-bottom: 32px; gap: 24px;">
    <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 20px;">
      <h3 style="font-size: 13px; font-weight: bold; color: #3a9bb5; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">Proveedor</h3>
      <p style="font-size: 15px; font-weight: bold; margin: 0 0 4px;">{{empresa.nombre}}</p>
      <p style="font-size: 13px; color: #555; margin: 2px 0;">CIF: {{empresa.cif}}</p>
      <p style="font-size: 13px; color: #555; margin: 2px 0;">{{empresa.direccion}}</p>
      <p style="font-size: 13px; color: #555; margin: 2px 0;">{{empresa.email}}</p>
      <p style="font-size: 13px; color: #555; margin: 2px 0;">{{empresa.telefono}}</p>
    </div>
    <div style="flex: 1; background: #f8f9fa; border-radius: 8px; padding: 20px;">
      <h3 style="font-size: 13px; font-weight: bold; color: #3a9bb5; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">Cliente</h3>
      <p style="font-size: 15px; font-weight: bold; margin: 0 0 4px;">{{cliente.nombre}}</p>
      <p style="font-size: 13px; color: #555; margin: 2px 0;">CIF: {{cliente.cif}}</p>
      <p style="font-size: 13px; color: #555; margin: 2px 0;">{{cliente.direccion}}</p>
      <p style="font-size: 13px; color: #555; margin: 2px 0;">{{cliente.email}}</p>
      <p style="font-size: 13px; color: #555; margin: 2px 0;">{{cliente.telefono}}</p>
    </div>
  </div>

  <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 20px; margin-bottom: 32px;">
    <h3 style="font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">Detalles del Contrato</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 16px;">
      <div>
        <p style="font-size: 11px; color: #666; margin: 0 0 2px;">FECHA INICIO</p>
        <p style="font-size: 14px; font-weight: bold; margin: 0;">{{contrato.fechaInicio}}</p>
      </div>
      <div>
        <p style="font-size: 11px; color: #666; margin: 0 0 2px;">FECHA FIN</p>
        <p style="font-size: 14px; font-weight: bold; margin: 0;">{{contrato.fechaFin}}</p>
      </div>
      <div>
        <p style="font-size: 11px; color: #666; margin: 0 0 2px;">DURACIÓN</p>
        <p style="font-size: 14px; font-weight: bold; margin: 0;">{{contrato.duracionMeses}} meses</p>
      </div>
      <div>
        <p style="font-size: 11px; color: #666; margin: 0 0 2px;">VALOR MENSUAL</p>
        <p style="font-size: 14px; font-weight: bold; margin: 0; color: #3a9bb5;">{{contrato.valorMensual}}</p>
      </div>
    </div>
  </div>

  <h3 style="font-size: 15px; font-weight: bold; margin: 0 0 12px;">Servicios Contratados</h3>
  {{items}}

  <div style="margin-top: 16px; text-align: right; padding: 16px; background: #f8f9fa; border-radius: 8px;">
    <p style="font-size: 13px; color: #666; margin: 0 0 4px;">VALOR TOTAL DEL CONTRATO</p>
    <p style="font-size: 24px; font-weight: bold; color: #3a9bb5; margin: 0;">{{contrato.valorTotal}}</p>
    <p style="font-size: 12px; color: #999; margin: 4px 0 0;">Cotización de origen: {{cotizacion.numero}}</p>
  </div>

  <div style="margin-top: 32px;">
    <h3 style="font-size: 15px; font-weight: bold; margin: 0 0 12px;">Condiciones Generales</h3>
    <div style="font-size: 13px; color: #444; line-height: 1.6; background: #f8f9fa; border-radius: 8px; padding: 16px;">
      {{contrato.condiciones}}
    </div>
  </div>

  <div style="margin-top: 24px;">
    <h3 style="font-size: 15px; font-weight: bold; margin: 0 0 12px;">Cláusula de Cancelación</h3>
    <div style="font-size: 13px; color: #444; line-height: 1.6; background: #f8f9fa; border-radius: 8px; padding: 16px;">
      {{contrato.clausulaCancelacion}}
    </div>
  </div>

  <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
    <p style="font-size: 13px; color: #666; margin: 0 0 8px;">Preaviso para cancelación: <strong>{{contrato.periodoPreaviso}} días</strong></p>
    <p style="font-size: 13px; color: #666; margin: 0;">Contrato generado el {{fecha.hoy}} en base a la cotización {{cotizacion.numero}}.</p>
  </div>

  <div style="margin-top: 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">
    <div style="text-align: center;">
      <div style="border-top: 1px solid #1a1a1a; padding-top: 8px; margin-top: 60px;">
        <p style="font-size: 13px; font-weight: bold; margin: 0;">{{empresa.nombre}}</p>
        <p style="font-size: 12px; color: #666; margin: 4px 0 0;">Firma del Proveedor</p>
      </div>
    </div>
    <div style="text-align: center;">
      <div style="border-top: 1px solid #1a1a1a; padding-top: 8px; margin-top: 60px;">
        <p style="font-size: 13px; font-weight: bold; margin: 0;">{{cliente.nombre}}</p>
        <p style="font-size: 12px; color: #666; margin: 4px 0 0;">Firma del Cliente</p>
      </div>
    </div>
  </div>

</div>
`.trim();

export interface ContratoTemplateData {
  contrato: {
    numero: string;
    fechaInicio: string;
    fechaFin: string;
    duracionMeses: number;
    valorMensual: string;
    valorTotal: string;
    moneda: string;
    condiciones: string;
    clausulaCancelacion: string;
    periodoPreaviso: number;
  };
  cliente: {
    nombre: string;
    email: string;
    telefono: string;
    cif: string;
    direccion: string;
  };
  empresa: {
    nombre: string;
    cif: string;
    email: string;
    telefono: string;
    direccion: string;
    web: string;
  };
  cotizacion: {
    numero: string;
    total: string;
  };
  items: string; // HTML table
}

function formatCurrency(value: number, moneda: string): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: moneda || "EUR",
  }).format(value);
}

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function buildItemsTable(lineItems: Array<{
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  frecuencia: string;
  total: number;
}>): string {
  const FRECUENCIA_LABEL: Record<string, string> = {
    MENSUAL: "Mensual",
    TRIMESTRAL: "Trimestral",
    ANUAL: "Anual",
    UNICO: "Único",
  };

  const rows = lineItems.map(item => `
    <tr>
      <td style="padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #e5e7eb;">${item.descripcion}</td>
      <td style="padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.cantidad}</td>
      <td style="padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatCurrency(item.precioUnitario, "EUR")}</td>
      <td style="padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #e5e7eb; text-align: center;">
        <span style="background: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: bold; padding: 2px 8px; border-radius: 100px;">${FRECUENCIA_LABEL[item.frecuencia] || item.frecuencia}</span>
      </td>
      <td style="padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: bold;">${formatCurrency(item.total, "EUR")}</td>
    </tr>
  `).join("");

  return `
    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
      <thead>
        <tr style="background: #f1f5f9;">
          <th style="padding: 10px 12px; text-align: left; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #e2e8f0;">Descripción</th>
          <th style="padding: 10px 12px; text-align: center; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #e2e8f0;">Cant.</th>
          <th style="padding: 10px 12px; text-align: right; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #e2e8f0;">P. Unit.</th>
          <th style="padding: 10px 12px; text-align: center; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #e2e8f0;">Frecuencia</th>
          <th style="padding: 10px 12px; text-align: right; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #e2e8f0;">Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

export function fillTemplate(template: string, data: ContratoTemplateData): string {
  let html = template;

  const replacements: Record<string, string> = {
    "{{contrato.numero}}": data.contrato.numero,
    "{{contrato.fechaInicio}}": data.contrato.fechaInicio,
    "{{contrato.fechaFin}}": data.contrato.fechaFin,
    "{{contrato.duracionMeses}}": String(data.contrato.duracionMeses),
    "{{contrato.valorMensual}}": data.contrato.valorMensual,
    "{{contrato.valorTotal}}": data.contrato.valorTotal,
    "{{contrato.moneda}}": data.contrato.moneda,
    "{{contrato.condiciones}}": data.contrato.condiciones || "Sin condiciones especificadas.",
    "{{contrato.clausulaCancelacion}}": data.contrato.clausulaCancelacion || "Sin cláusula de cancelación especificada.",
    "{{contrato.periodoPreaviso}}": String(data.contrato.periodoPreaviso),
    "{{cliente.nombre}}": data.cliente.nombre || "",
    "{{cliente.email}}": data.cliente.email || "",
    "{{cliente.telefono}}": data.cliente.telefono || "",
    "{{cliente.cif}}": data.cliente.cif || "",
    "{{cliente.direccion}}": data.cliente.direccion || "",
    "{{empresa.nombre}}": data.empresa.nombre || "",
    "{{empresa.cif}}": data.empresa.cif || "",
    "{{empresa.email}}": data.empresa.email || "",
    "{{empresa.telefono}}": data.empresa.telefono || "",
    "{{empresa.direccion}}": data.empresa.direccion || "",
    "{{empresa.web}}": data.empresa.web || "",
    "{{cotizacion.numero}}": data.cotizacion.numero || "",
    "{{cotizacion.total}}": data.cotizacion.total || "",
    "{{items}}": data.items,
    "{{fecha.hoy}}": new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }),
  };

  for (const [key, value] of Object.entries(replacements)) {
    html = html.split(key).join(value);
  }

  return html;
}

export function buildTemplateData(params: {
  contrato: {
    numero: string;
    fechaInicio: Date;
    fechaFin: Date;
    duracionMeses: number;
    valorMensual: number;
    valorTotal: number;
    moneda: string;
    condiciones: string | null;
    clausulaCancelacion: string | null;
    periodoPreaviso: number;
    lineItems: Array<{ descripcion: string; cantidad: number; precioUnitario: number; frecuencia: string; total: number }>;
  };
  cliente: {
    nombre: string;
    email: string | null;
    telefono: string | null;
    cif: string | null;
    direccion: string | null;
  };
  empresa: {
    nombre: string | null;
    cif: string | null;
    email: string | null;
    telefono: string | null;
    direccion: string | null;
    web: string | null;
  };
  cotizacion: {
    numero: string;
    total: number;
    moneda?: string;
  };
}): ContratoTemplateData {
  const { contrato, cliente, empresa, cotizacion } = params;

  return {
    contrato: {
      numero: contrato.numero,
      fechaInicio: formatDate(contrato.fechaInicio),
      fechaFin: formatDate(contrato.fechaFin),
      duracionMeses: contrato.duracionMeses,
      valorMensual: formatCurrency(contrato.valorMensual, contrato.moneda),
      valorTotal: formatCurrency(contrato.valorTotal, contrato.moneda),
      moneda: contrato.moneda,
      condiciones: contrato.condiciones || "",
      clausulaCancelacion: contrato.clausulaCancelacion || "",
      periodoPreaviso: contrato.periodoPreaviso,
    },
    cliente: {
      nombre: cliente.nombre,
      email: cliente.email || "",
      telefono: cliente.telefono || "",
      cif: cliente.cif || "",
      direccion: cliente.direccion || "",
    },
    empresa: {
      nombre: empresa.nombre || "",
      cif: empresa.cif || "",
      email: empresa.email || "",
      telefono: empresa.telefono || "",
      direccion: empresa.direccion || "",
      web: empresa.web || "",
    },
    cotizacion: {
      numero: cotizacion.numero,
      total: formatCurrency(cotizacion.total, cotizacion.moneda || "EUR"),
    },
    items: buildItemsTable(contrato.lineItems),
  };
}

// ─── Amendments annex ─────────────────────────────────────────────────────────

const TIPO_ENMIENDA_LABELS: Record<string, string> = {
  MODIFICACION: "Modificación de condiciones",
  UPSELL: "Ampliación de servicios (Upsell)",
  DOWNSELL: "Reducción de servicios (Downsell)",
  EXTENSION: "Extensión de plazo",
  CANCELACION: "Cancelación anticipada",
};

export function buildEnmiendasAnexo(enmiendas: Array<{
  tipo: string;
  descripcion: string;
  valorAnterior: number;
  valorNuevo: number;
  createdAt: Date | string;
}>): string {
  if (!enmiendas.length) return "";

  const rows = enmiendas.map((e, i) => {
    const fecha = new Date(e.createdAt).toLocaleDateString("es-ES", {
      day: "numeric", month: "long", year: "numeric",
    });
    const tipoLabel = TIPO_ENMIENDA_LABELS[e.tipo] || e.tipo;
    const valorAnterior = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(e.valorAnterior);
    const valorNuevo = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(e.valorNuevo);
    const mismoValor = e.valorAnterior === e.valorNuevo;

    return `
      <div style="margin-bottom:16px;padding:16px;background:#f8faff;border-left:3px solid #6366f1;border-radius:4px;page-break-inside:avoid;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:8px;">
          <div>
            <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;color:#6366f1;">Enmienda ${i + 1} — ${tipoLabel}</span>
            <span style="margin-left:12px;font-size:10px;color:#9ca3af;">${fecha}</span>
          </div>
          <span style="font-size:10px;font-weight:600;color:#059669;background:#ecfdf5;padding:2px 8px;border-radius:999px;white-space:nowrap;">Aceptada</span>
        </div>
        <p style="font-size:12px;color:#374151;margin:0 0 10px;line-height:1.5;">${e.descripcion}</p>
        ${mismoValor ? "" : `
        <div style="display:flex;gap:24px;font-size:11px;color:#6b7280;border-top:1px solid #e5e7eb;padding-top:8px;">
          <span>Valor anterior: <strong style="color:#374151;text-decoration:line-through;">${valorAnterior}/mes</strong></span>
          <span>Nuevo valor: <strong style="color:#059669;">${valorNuevo}/mes</strong></span>
        </div>`}
      </div>`;
  }).join("");

  return `
    <div class="enmiendas-anexo" style="margin-top:48px;padding:32px 40px;border-top:2px solid #e5e7eb;page-break-before:auto;">
      <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px;">Anexo A — Enmiendas al Contrato</h2>
      <p style="font-size:11px;color:#6b7280;margin:0 0 24px;">
        Las siguientes modificaciones han sido formalmente aceptadas y forman parte integrante del presente contrato.
      </p>
      ${rows}
      <p style="font-size:10px;color:#9ca3af;margin-top:16px;font-style:italic;">
        Este anexo fue generado automáticamente e incluye todas las enmiendas aceptadas a la fecha de emisión del documento.
      </p>
    </div>`;
}
