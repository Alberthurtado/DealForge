import { NextRequest, NextResponse } from "next/server";
import { sendSystemEmail } from "@/lib/system-email";
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit";
import { z } from "zod";

const contactSchema = z.object({
  nombre: z.string().min(2, "Nombre requerido").max(100),
  email: z.string().email("Email inválido"),
  asunto: z.enum(["demo", "consulta", "soporte", "enterprise", "otro"]),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(2000),
});

const ASUNTO_LABELS: Record<string, string> = {
  demo: "Solicitud de demo",
  consulta: "Consulta general",
  soporte: "Soporte técnico",
  enterprise: "Plan Enterprise",
  otro: "Otro",
};

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const limit = checkRateLimit(`contact:${ip}`, RATE_LIMITS.approval);
  if (!limit.allowed) return rateLimitResponse(limit.resetAt);

  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Datos inválidos" },
      { status: 400 }
    );
  }

  const { nombre, email, asunto, mensaje } = parsed.data;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #3a9bb5; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; font-size: 20px; margin: 0;">Nuevo mensaje de contacto</h1>
      </div>
      <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 100px;">Nombre:</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${nombre}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px;"><a href="mailto:${email}" style="color: #3a9bb5;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Asunto:</td>
            <td style="padding: 8px 0; color: #111827; font-size: 14px;">${ASUNTO_LABELS[asunto] || asunto}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
        <div style="font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-line;">${mensaje}</div>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
        <p style="font-size: 12px; color: #9ca3af;">IP: ${ip} · ${new Date().toISOString()}</p>
      </div>
    </div>
  `;

  try {
    await sendSystemEmail({
      to: "info@dealforge.es",
      subject: `[Contacto] ${ASUNTO_LABELS[asunto] || asunto} — ${nombre}`,
      html,
      replyTo: email,
    });
  } catch {
    return NextResponse.json(
      { error: "Error al enviar el mensaje. Inténtalo de nuevo." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
