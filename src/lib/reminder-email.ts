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

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seguimiento pendiente</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#f6f9fc;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f9fc;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,${c},${c}dd);padding:32px 40px;border-radius:16px 16px 0 0;">
              <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">${data.empresa.nombre}</p>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.75);letter-spacing:0.3px;text-transform:uppercase;">Recordatorio de seguimiento</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;border-left:1px solid #e8ecf0;border-right:1px solid #e8ecf0;">
              <p style="margin:0 0 24px;font-size:16px;color:#1a1a2e;line-height:1.5;">
                Hola <strong>${data.vendedorNombre}</strong>,
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:#4a5568;line-height:1.6;">
                Han pasado <strong style="color:#1a1a2e;">${data.diasSinActividad} días</strong> sin actividad en esta cotización. Te recomendamos hacer seguimiento para no perder la oportunidad.
              </p>

              <!-- Quote card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:0 0 12px;">
                          <p style="margin:0;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Cotización</p>
                          <p style="margin:4px 0 0;font-size:18px;font-weight:700;color:#1a1a2e;">${data.cotizacion.numero}</p>
                        </td>
                        <td style="padding:0 0 12px;text-align:right;">
                          <span style="display:inline-block;padding:4px 12px;background:${c}18;color:${c};font-size:12px;font-weight:600;border-radius:20px;">${estadoLabel}</span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding:12px 0 0;border-top:1px solid #e2e8f0;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="50%" style="padding:8px 0;">
                                <p style="margin:0;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Cliente</p>
                                <p style="margin:3px 0 0;font-size:14px;color:#334155;font-weight:500;">${data.cotizacion.cliente}</p>
                              </td>
                              <td width="50%" style="padding:8px 0;text-align:right;">
                                <p style="margin:0;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Emitida</p>
                                <p style="margin:3px 0 0;font-size:14px;color:#334155;">${formatDate(data.cotizacion.fechaEmision)}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding:16px 0 0;border-top:1px solid #e2e8f0;">
                          <p style="margin:0;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Importe total</p>
                          <p style="margin:4px 0 0;font-size:28px;font-weight:800;color:${c};letter-spacing:-0.5px;">${formatCurrency(data.cotizacion.total)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Alert -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;">
                <tr>
                  <td style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px 20px;">
                    <p style="margin:0;font-size:13px;color:#92400e;line-height:1.5;">
                      ⏰ Esta cotización lleva <strong>${data.diasSinActividad} días</strong> sin seguimiento. Un contacto rápido puede marcar la diferencia.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0 0;">
                <tr>
                  <td align="center">
                    <a href="${detailUrl}" style="display:inline-block;padding:14px 40px;background:${c};color:#ffffff;text-decoration:none;border-radius:10px;font-weight:700;font-size:15px;letter-spacing:0.2px;box-shadow:0 4px 12px ${c}40;">Ver cotización</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:24px 40px;border-radius:0 0 16px 16px;border:1px solid #e8ecf0;border-top:none;">
              <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
                Enviado automáticamente por <strong style="color:#64748b;">${data.empresa.nombre}</strong> a través de DealForge
              </p>
              <p style="margin:8px 0 0;font-size:11px;color:#cbd5e1;text-align:center;">
                Puedes desactivar estos recordatorios en Configuración → Recordatorios
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
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
  const isUrgent = data.diasRestantes <= 1;
  const urgencyColor = isUrgent ? "#dc2626" : "#f59e0b";
  const urgencyBg = isUrgent ? "#fef2f2" : "#fffbeb";
  const urgencyBorder = isUrgent ? "#fecaca" : "#fde68a";
  const urgencyText = isUrgent ? "#991b1b" : "#92400e";

  const urgencyMessage =
    data.diasRestantes <= 0
      ? "Esta cotización vence <strong>hoy</strong>."
      : data.diasRestantes === 1
      ? "Esta cotización vence <strong>mañana</strong>."
      : `Esta cotización vence en <strong>${data.diasRestantes} días</strong>.`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cotización próxima a vencer</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#f6f9fc;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f9fc;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,${c},${c}dd);padding:32px 40px;border-radius:16px 16px 0 0;">
              <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">${data.empresa.nombre}</p>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.75);letter-spacing:0.3px;text-transform:uppercase;">Aviso de vencimiento</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;border-left:1px solid #e8ecf0;border-right:1px solid #e8ecf0;">
              <p style="margin:0 0 24px;font-size:16px;color:#1a1a2e;line-height:1.5;">
                Estimado/a <strong>${data.contactoNombre}</strong>,
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:#4a5568;line-height:1.6;">
                Le recordamos que la siguiente cotización está próxima a vencer. Si desea proceder, le recomendamos confirmarla antes de la fecha de vencimiento.
              </p>

              <!-- Quote card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:0 0 12px;">
                          <p style="margin:0;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;font-weight:600;">Cotización</p>
                          <p style="margin:4px 0 0;font-size:18px;font-weight:700;color:#1a1a2e;">${data.cotizacion.numero}</p>
                        </td>
                        <td style="padding:0 0 12px;text-align:right;">
                          <span style="display:inline-block;padding:4px 12px;background:${urgencyColor}18;color:${urgencyColor};font-size:12px;font-weight:600;border-radius:20px;">
                            ${data.diasRestantes <= 0 ? "Vence hoy" : data.diasRestantes === 1 ? "Vence mañana" : `${data.diasRestantes} días`}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding:12px 0 0;border-top:1px solid #e2e8f0;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="50%" style="padding:8px 0;">
                                <p style="margin:0;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Importe total</p>
                                <p style="margin:4px 0 0;font-size:24px;font-weight:800;color:${c};letter-spacing:-0.5px;">${formatCurrency(data.cotizacion.total)}</p>
                              </td>
                              <td width="50%" style="padding:8px 0;text-align:right;">
                                <p style="margin:0;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Vencimiento</p>
                                <p style="margin:3px 0 0;font-size:14px;color:${urgencyColor};font-weight:600;">${formatDate(data.cotizacion.fechaVencimiento)}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Urgency alert -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;">
                <tr>
                  <td style="background:${urgencyBg};border:1px solid ${urgencyBorder};border-radius:10px;padding:14px 20px;">
                    <p style="margin:0;font-size:13px;color:${urgencyText};line-height:1.5;">
                      ${isUrgent ? "⚠️" : "⏰"} ${urgencyMessage} Si tiene interés, no dude en contactarnos.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Help text -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
                <tr>
                  <td align="center">
                    <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.5;">
                      Si tiene alguna duda, puede responder directamente a este email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:24px 40px;border-radius:0 0 16px 16px;border:1px solid #e8ecf0;border-top:none;">
              <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
                Enviado por <strong style="color:#64748b;">${data.empresa.nombre}</strong> a través de DealForge
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
