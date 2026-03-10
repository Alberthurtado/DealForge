/**
 * System email sender using Resend API.
 * Used for approval notifications, password resets, and other system emails.
 * Independent from user's SMTP config (which is for sending quotes to clients).
 *
 * Requires RESEND_API_KEY env var.
 * Sends from soporte@dealforge.es
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_ADDRESS = "DealForge <soporte@dealforge.es>";

interface SystemEmailOptions {
  to: string;
  subject: string;
  html: string;
}

interface ResendResponse {
  id?: string;
  message?: string;
}

export async function sendSystemEmail(options: SystemEmailOptions): Promise<{ success: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    console.warn("[system-email] RESEND_API_KEY not configured, skipping email to:", options.to);
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [options.to],
        subject: options.subject,
        html: options.html,
      }),
    });

    const data: ResendResponse = await res.json();

    if (!res.ok) {
      console.error("[system-email] Resend API error:", data);
      return { success: false, error: data.message || "Error al enviar email" };
    }

    return { success: true };
  } catch (err) {
    console.error("[system-email] Error:", err);
    return { success: false, error: "Error de conexion con el servicio de email" };
  }
}

export function isSystemEmailConfigured(): boolean {
  return !!RESEND_API_KEY;
}
