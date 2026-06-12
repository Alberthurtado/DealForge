import { formatCurrency } from "./utils";

type EmailLang = "es" | "en";

interface SignatureRequestData {
  baseUrl: string;
  token: string;
  cotizacion: {
    numero: string;
    total: number;
    moneda: string;
    cliente: string;
  };
  signerName: string;
  empresa: { nombre: string; colorPrimario: string };
  lang?: EmailLang;
}

export function buildSignatureRequestEmail(data: SignatureRequestData): string {
  const c = data.empresa.colorPrimario || "#3a9bb5";
  const lang: EmailLang = data.lang === "en" ? "en" : "es";
  const numLocale = lang === "en" ? "en-GB" : "es-ES";
  const money = (n: number) => formatCurrency(n, data.cotizacion.moneda || "EUR", numLocale);
  const t = lang === "en"
    ? { subtitle: "Electronic signature required", greeting: "Dear", intro: "Your electronic signature is required for the following quote:", quote: "Quote", client: "Client", total: "Total", sign: "Sign quote", note: "Click the button to securely review and sign the quote." }
    : { subtitle: "Firma electrónica requerida", greeting: "Estimado/a", intro: "Se requiere su firma electrónica para la siguiente cotización:", quote: "Cotización", client: "Cliente", total: "Total", sign: "Firmar cotización", note: "Haga clic en el botón para revisar y firmar la cotización de forma segura." };
  const signUrl = `${data.baseUrl}/firmar/${data.token}`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f4f4f7;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:${c};padding:24px 30px;border-radius:12px 12px 0 0;">
      <h1 style="color:white;margin:0;font-size:18px;">${data.empresa.nombre}</h1>
      <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px;">${t.subtitle}</p>
    </div>
    <div style="background:white;padding:30px;border-radius:0 0 12px 12px;border:1px solid #e5e5e5;border-top:none;">
      <p style="margin:0 0 16px;font-size:15px;color:#333;">${t.greeting} ${data.signerName},</p>
      <p style="margin:0 0 20px;font-size:14px;color:#555;">
        ${t.intro}
      </p>

      <div style="background:#f8f9fa;border-radius:8px;padding:16px;margin:0 0 24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">${t.quote}</td><td style="padding:4px 0;text-align:right;font-weight:bold;font-size:14px;">${data.cotizacion.numero}</td></tr>
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">${t.client}</td><td style="padding:4px 0;text-align:right;font-size:13px;">${data.cotizacion.cliente}</td></tr>
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">${t.total}</td><td style="padding:4px 0;text-align:right;font-weight:bold;font-size:16px;color:${c};">${money(data.cotizacion.total)}</td></tr>
        </table>
      </div>

      <div style="text-align:center;margin:24px 0;">
        <a href="${signUrl}" style="display:inline-block;padding:14px 40px;background:${c};color:white;text-decoration:none;border-radius:8px;font-weight:bold;font-size:15px;">${t.sign}</a>
      </div>

      <p style="margin:20px 0 0;font-size:12px;color:#888;text-align:center;">
        ${t.note}
      </p>
    </div>
    <p style="text-align:center;font-size:11px;color:#aaa;margin:16px 0 0;">${data.empresa.nombre} &bull; DealForge</p>
  </div>
</body>
</html>`;
}

interface SignatureNotificationData {
  baseUrl: string;
  cotizacionId: string;
  cotizacion: { numero: string; total: number; cliente: string; moneda?: string };
  signerName: string;
  signedAt: Date;
  empresa: { nombre: string; colorPrimario: string };
  lang?: EmailLang;
}

export function buildSignatureNotificationEmail(data: SignatureNotificationData): string {
  const c = data.empresa.colorPrimario || "#3a9bb5";
  const lang: EmailLang = data.lang === "en" ? "en" : "es";
  const numLocale = lang === "en" ? "en-GB" : "es-ES";
  const money = (n: number) => formatCurrency(n, data.cotizacion.moneda || "EUR", numLocale);
  const t = lang === "en"
    ? { subtitle: "Quote signed", badge: "Signed", quotePre: "Quote", forWord: "for", signedBy: "has been signed by", viewQuote: "View quote" }
    : { subtitle: "Cotización firmada", badge: "Firmada", quotePre: "La cotización", forWord: "para", signedBy: "ha sido firmada por", viewQuote: "Ver cotización" };
  const detailUrl = `${data.baseUrl}/cotizaciones/${data.cotizacionId}`;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f4f4f7;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:${c};padding:24px 30px;border-radius:12px 12px 0 0;">
      <h1 style="color:white;margin:0;font-size:18px;">${data.empresa.nombre}</h1>
      <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px;">${t.subtitle}</p>
    </div>
    <div style="background:white;padding:30px;border-radius:0 0 12px 12px;border:1px solid #e5e5e5;border-top:none;">
      <div style="text-align:center;margin:0 0 20px;">
        <div style="display:inline-block;background:#16a34a;color:white;padding:8px 24px;border-radius:20px;font-weight:bold;font-size:14px;">${t.badge}</div>
      </div>
      <p style="margin:0 0 16px;font-size:14px;color:#555;text-align:center;">
        ${t.quotePre} <strong>${data.cotizacion.numero}</strong> ${t.forWord} <strong>${data.cotizacion.cliente}</strong>
        (${money(data.cotizacion.total)}) ${t.signedBy} <strong>${data.signerName}</strong>.
      </p>
      <div style="text-align:center;margin:20px 0 0;">
        <a href="${detailUrl}" style="display:inline-block;padding:10px 28px;background:${c};color:white;text-decoration:none;border-radius:8px;font-size:13px;">${t.viewQuote}</a>
      </div>
    </div>
    <p style="text-align:center;font-size:11px;color:#aaa;margin:16px 0 0;">${data.empresa.nombre} &bull; DealForge</p>
  </div>
</body>
</html>`;
}
