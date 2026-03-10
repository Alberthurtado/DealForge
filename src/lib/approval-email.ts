import { formatCurrency, formatDate } from "./utils";

interface ApprovalRequestData {
  baseUrl: string;
  token: string;
  cotizacion: {
    numero: string;
    total: number;
    moneda: string;
    fechaEmision: string | Date;
    cliente: string;
  };
  aprobadorNombre: string;
  razon: string;
  empresa: { nombre: string; colorPrimario: string };
  lineItems: Array<{ descripcion: string; cantidad: number; total: number }>;
}

export function buildApprovalRequestEmail(data: ApprovalRequestData): string {
  const c = data.empresa.colorPrimario || "#3a9bb5";
  const approveUrl = `${data.baseUrl}/aprobar/${data.token}?accion=aprobar`;
  const rejectUrl = `${data.baseUrl}/aprobar/${data.token}?accion=rechazar`;
  const reviewUrl = `${data.baseUrl}/aprobar/${data.token}`;

  const itemRows = data.lineItems
    .slice(0, 5)
    .map(
      (item) =>
        `<tr><td style="padding:6px 8px;border-bottom:1px solid #eee;">${item.descripcion}</td><td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right;">${item.cantidad}</td><td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(item.total)}</td></tr>`
    )
    .join("");

  const moreItems =
    data.lineItems.length > 5
      ? `<tr><td colspan="3" style="padding:6px 8px;color:#888;font-style:italic;">...y ${data.lineItems.length - 5} items más</td></tr>`
      : "";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f4f4f7;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:${c};padding:24px 30px;border-radius:12px 12px 0 0;">
      <h1 style="color:white;margin:0;font-size:18px;">${data.empresa.nombre}</h1>
      <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px;">Aprobación requerida</p>
    </div>
    <div style="background:white;padding:30px;border-radius:0 0 12px 12px;border:1px solid #e5e5e5;border-top:none;">
      <p style="margin:0 0 16px;font-size:15px;color:#333;">Hola ${data.aprobadorNombre},</p>
      <p style="margin:0 0 20px;font-size:14px;color:#555;">Se requiere tu aprobación para la siguiente cotización:</p>

      <div style="background:#f8f9fa;border-radius:8px;padding:16px;margin:0 0 20px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">Cotización</td><td style="padding:4px 0;text-align:right;font-weight:bold;font-size:14px;">${data.cotizacion.numero}</td></tr>
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">Cliente</td><td style="padding:4px 0;text-align:right;font-size:13px;">${data.cotizacion.cliente}</td></tr>
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">Total</td><td style="padding:4px 0;text-align:right;font-weight:bold;font-size:16px;color:${c};">${formatCurrency(data.cotizacion.total)}</td></tr>
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">Fecha</td><td style="padding:4px 0;text-align:right;font-size:13px;">${formatDate(data.cotizacion.fechaEmision)}</td></tr>
        </table>
      </div>

      <div style="background:#fff3cd;border:1px solid #ffc107;border-radius:8px;padding:12px 16px;margin:0 0 20px;">
        <p style="margin:0;font-size:13px;color:#856404;"><strong>Motivo:</strong> ${data.razon}</p>
      </div>

      ${
        data.lineItems.length > 0
          ? `<table style="width:100%;border-collapse:collapse;font-size:13px;margin:0 0 24px;">
        <thead><tr style="background:#f8f9fa;"><th style="padding:8px;text-align:left;font-size:11px;text-transform:uppercase;color:#888;">Descripción</th><th style="padding:8px;text-align:right;font-size:11px;text-transform:uppercase;color:#888;">Cant.</th><th style="padding:8px;text-align:right;font-size:11px;text-transform:uppercase;color:#888;">Total</th></tr></thead>
        <tbody>${itemRows}${moreItems}</tbody>
      </table>`
          : ""
      }

      <div style="text-align:center;margin:24px 0;">
        <a href="${approveUrl}" style="display:inline-block;padding:12px 32px;background:#16a34a;color:white;text-decoration:none;border-radius:8px;font-weight:bold;font-size:14px;margin:0 8px;">Aprobar</a>
        <a href="${rejectUrl}" style="display:inline-block;padding:12px 32px;background:#dc2626;color:white;text-decoration:none;border-radius:8px;font-weight:bold;font-size:14px;margin:0 8px;">Rechazar</a>
      </div>

      <p style="margin:20px 0 0;font-size:12px;color:#888;text-align:center;">
        O revisa los detalles completos: <a href="${reviewUrl}" style="color:${c};">ver cotización</a>
      </p>
    </div>
    <p style="text-align:center;font-size:11px;color:#aaa;margin:16px 0 0;">${data.empresa.nombre} &bull; DealForge</p>
  </div>
</body>
</html>`;
}

interface ApprovalResolvedData {
  baseUrl: string;
  cotizacionId: string;
  cotizacion: { numero: string; total: number; cliente: string };
  aprobadorNombre: string;
  estado: "APROBADA" | "RECHAZADA";
  comentario: string | null;
  empresa: { nombre: string; colorPrimario: string };
}

export function buildApprovalResolvedEmail(data: ApprovalResolvedData): string {
  const c = data.empresa.colorPrimario || "#3a9bb5";
  const isApproved = data.estado === "APROBADA";
  const statusColor = isApproved ? "#16a34a" : "#dc2626";
  const statusLabel = isApproved ? "Aprobada" : "Rechazada";
  const detailUrl = `${data.baseUrl}/cotizaciones/${data.cotizacionId}`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f4f4f7;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:${c};padding:24px 30px;border-radius:12px 12px 0 0;">
      <h1 style="color:white;margin:0;font-size:18px;">${data.empresa.nombre}</h1>
      <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px;">Aprobación resuelta</p>
    </div>
    <div style="background:white;padding:30px;border-radius:0 0 12px 12px;border:1px solid #e5e5e5;border-top:none;">
      <div style="text-align:center;margin:0 0 20px;">
        <div style="display:inline-block;background:${statusColor};color:white;padding:8px 24px;border-radius:20px;font-weight:bold;font-size:14px;">${statusLabel}</div>
      </div>
      <p style="margin:0 0 16px;font-size:14px;color:#555;text-align:center;">
        La cotización <strong>${data.cotizacion.numero}</strong> para <strong>${data.cotizacion.cliente}</strong>
        (${formatCurrency(data.cotizacion.total)}) ha sido <strong style="color:${statusColor};">${statusLabel.toLowerCase()}</strong>
        por <strong>${data.aprobadorNombre}</strong>.
      </p>
      ${data.comentario ? `<div style="background:#f8f9fa;border-radius:8px;padding:12px 16px;margin:0 0 20px;"><p style="margin:0;font-size:13px;color:#555;"><strong>Comentario:</strong> ${data.comentario}</p></div>` : ""}
      <div style="text-align:center;margin:20px 0 0;">
        <a href="${detailUrl}" style="display:inline-block;padding:10px 28px;background:${c};color:white;text-decoration:none;border-radius:8px;font-size:13px;">Ver cotización</a>
      </div>
    </div>
    <p style="text-align:center;font-size:11px;color:#aaa;margin:16px 0 0;">${data.empresa.nombre} &bull; DealForge</p>
  </div>
</body>
</html>`;
}
