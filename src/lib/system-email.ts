/**
 * System email sender using Brevo (ex Sendinblue) API.
 * Used for approval notifications, password resets, and other system emails.
 * Independent from user's SMTP config (which is for sending quotes to clients).
 *
 * Requires BREVO_API_KEY env var.
 * Sends from soporte@dealforge.es
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const FROM_EMAIL = "soporte@dealforge.es";
const FROM_NAME = "DealForge";

interface SystemEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendSystemEmail(options: SystemEmailOptions): Promise<{ success: boolean; error?: string }> {
  if (!BREVO_API_KEY) {
    console.warn("[system-email] BREVO_API_KEY not configured, skipping email to:", options.to);
    return { success: false, error: "BREVO_API_KEY not configured" };
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: FROM_NAME, email: FROM_EMAIL },
        to: [{ email: options.to }],
        subject: options.subject,
        htmlContent: options.html,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("[system-email] Brevo API error:", res.status, data);
      return { success: false, error: data?.message || `Brevo error ${res.status}` };
    }

    return { success: true };
  } catch (err) {
    console.error("[system-email] Error:", err);
    return { success: false, error: "Error de conexión con el servicio de email" };
  }
}

export function isSystemEmailConfigured(): boolean {
  return !!BREVO_API_KEY;
}
