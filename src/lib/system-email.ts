/**
 * System email sender using MailerSend API.
 * Used for approval notifications, password resets, and other system emails.
 * Independent from user's SMTP config (which is for sending quotes to clients).
 *
 * Requires MAILERSEND_API_KEY env var.
 * Sends from soporte@dealforge.es
 */

const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY;
const FROM_EMAIL = "soporte@dealforge.es";
const FROM_NAME = "DealForge";

interface SystemEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendSystemEmail(options: SystemEmailOptions): Promise<{ success: boolean; error?: string }> {
  if (!MAILERSEND_API_KEY) {
    console.warn("[system-email] MAILERSEND_API_KEY not configured, skipping email to:", options.to);
    return { success: false, error: "MAILERSEND_API_KEY not configured" };
  }

  try {
    const res = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MAILERSEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { email: FROM_EMAIL, name: FROM_NAME },
        to: [{ email: options.to }],
        subject: options.subject,
        html: options.html,
        ...(options.replyTo ? { reply_to: { email: options.replyTo } } : {}),
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("[system-email] MailerSend API error:", res.status, data);
      return { success: false, error: data?.message || `MailerSend error ${res.status}` };
    }

    return { success: true };
  } catch (err) {
    console.error("[system-email] Error:", err);
    return { success: false, error: "Error de conexión con el servicio de email" };
  }
}

export function isSystemEmailConfigured(): boolean {
  return !!MAILERSEND_API_KEY;
}
