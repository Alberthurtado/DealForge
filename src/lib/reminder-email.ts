import { formatCurrency, formatDate } from "./utils";

interface SellerFollowUpData {
  baseUrl: string;
  cotizacionId: string;
  cotizacion: {
    numero: string;
    total: number;
    moneda: string;
    cliente: string;
    fechaEmision: string | Date;
    estado: string;
  };
  vendedorNombre: string;
  diasSinActividad: number;
  empresa: { nombre: string; colorPrimario: string };
}

export function buildSellerFollowUpEmail(data: SellerFollowUpData): string {
  const c = data.empresa.colorPrimario || "#3a9bb5";
  const detailUrl = `${data.baseUrl}/cotizaciones/${data.cotizacionId}`;
  const estadoLabel = data.cotizacion.estado === "NEGOCIACION" ? "En negociación" : "Enviada";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f4f4f7;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:${c};padding:24px 30px;border-radius:12px 12px 0 0;">
      <h1 style="color:white;margin:0;font-size:18px;">${data.empresa.nombre}</h1>
      <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px;">Recordatorio de seguimiento</p>
    </div>
    <div style="background:white;padding:30px;border-radius:0 0 12px 12px;border:1px solid #e5e5e5;border-top:none;">
      <p style="margin:0 0 16px;font-size:15px;color:#333;">Hola ${data.vendedorNombre},</p>
      <p style="margin:0 0 20px;font-size:14px;color:#555;">
        Han pasado <strong>${data.diasSinActividad} días</strong> sin actividad en la siguiente cotización:
      </p>

      <div style="background:#f8f9fa;border-radius:8px;padding:16px;margin:0 0 20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">Cotización</td><td style="padding:4px 0;text-align:right;font-weight:bold;font-size:14px;">${data.cotizacion.numero}</td></tr>
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">Cliente</td><td style="padding:4px 0;text-align:right;font-size:13px;">${data.cotizacion.cliente}</td></tr>
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">Total</td><td style="padding:4px 0;text-align:right;font-weight:bold;font-size:16px;color:${c};">${formatCurrency(data.cotizacion.total)}</td></tr>
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">Estado</td><td style="padding:4px 0;text-align:right;font-size:13px;">${estadoLabel}</td></tr>
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">Fecha emisión</td><td style="padding:4px 0;text-align:right;font-size:13px;">${formatDate(data.cotizacion.fechaEmision)}</td></tr>
        </table>
      </div>

      <div style="background:#fef3c7;border:1px solid #f59e0b;border-radius:8px;padding:12px 16px;margin:0 0 24px;">
        <p style="margin:0;font-size:13px;color:#92400e;">
          Te recomendamos hacer seguimiento con el cliente para avanzar esta oportunidad.
        </p>
      </div>

      <div style="text-align:center;margin:24px 0;">
        <a href="${detailUrl}" style="display:inline-block;padding:12px 32px;background:${c};color:white;text-decoration:none;border-radius:8px;font-weight:bold;font-size:14px;">Ver cotización</a>
      </div>
    </div>
    <p style="text-align:center;font-size:11px;color:#aaa;margin:16px 0 0;">${data.empresa.nombre} &bull; DealForge</p>
  </div>
</body>
</html>`;
}

interface ClientExpiryData {
  baseUrl: string;
  cotizacion: {
    numero: string;
    total: number;
    moneda: string;
    fechaVencimiento: string | Date;
    cliente: string;
  };
  contactoNombre: string;
  contactoEmail: string;
  diasRestantes: number;
  empresa: { nombre: string; colorPrimario: string };
}

export function buildClientExpiryEmail(data: ClientExpiryData): string {
  const c = data.empresa.colorPrimario || "#3a9bb5";
  const urgencyColor = data.diasRestantes <= 1 ? "#dc2626" : "#f59e0b";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f4f4f7;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:${c};padding:24px 30px;border-radius:12px 12px 0 0;">
      <h1 style="color:white;margin:0;font-size:18px;">${data.empresa.nombre}</h1>
      <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px;">Recordatorio de cotización</p>
    </div>
    <div style="background:white;padding:30px;border-radius:0 0 12px 12px;border:1px solid #e5e5e5;border-top:none;">
      <p style="margin:0 0 16px;font-size:15px;color:#333;">Estimado/a ${data.contactoNombre},</p>
      <p style="margin:0 0 20px;font-size:14px;color:#555;">
        Le recordamos que la siguiente cotización vence pronto:
      </p>

      <div style="background:#f8f9fa;border-radius:8px;padding:16px;margin:0 0 20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">Cotización</td><td style="padding:4px 0;text-align:right;font-weight:bold;font-size:14px;">${data.cotizacion.numero}</td></tr>
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">Total</td><td style="padding:4px 0;text-align:right;font-weight:bold;font-size:16px;color:${c};">${formatCurrency(data.cotizacion.total)}</td></tr>
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">Fecha vencimiento</td><td style="padding:4px 0;text-align:right;font-size:13px;font-weight:bold;color:${urgencyColor};">${formatDate(data.cotizacion.fechaVencimiento)}</td></tr>
        </table>
      </div>

      <div style="background:${data.diasRestantes <= 1 ? '#fef2f2' : '#fef3c7'};border:1px solid ${urgencyColor};border-radius:8px;padding:12px 16px;margin:0 0 24px;">
        <p style="margin:0;font-size:13px;color:${data.diasRestantes <= 1 ? '#991b1b' : '#92400e'};">
          ${data.diasRestantes <= 0
            ? "Esta cotización vence <strong>hoy</strong>."
            : data.diasRestantes === 1
            ? "Esta cotización vence <strong>mañana</strong>."
            : `Esta cotización vence en <strong>${data.diasRestantes} días</strong>.`}
          Si tiene interés, no dude en contactarnos.
        </p>
      </div>

      <p style="margin:0;font-size:13px;color:#888;text-align:center;">
        Si tiene alguna duda, responda directamente a este email.
      </p>
    </div>
    <p style="text-align:center;font-size:11px;color:#aaa;margin:16px 0 0;">${data.empresa.nombre} &bull; DealForge</p>
  </div>
</body>
</html>`;
}
