import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { generateCotizacionPdf } from "@/lib/pdf-cotizacion";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit";
import { sendEmailSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";
import { sanitizeHtml } from "@/lib/sanitize";

function defaultEmailBody(numero: string) {
  return `<p>Adjuntamos la cotizacion ${numero}.</p>`;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Rate limit: 5 emails per minute per user
  const session = await getSession();
  if (session) {
    const limit = checkRateLimit(`email:${session.userId}`, RATE_LIMITS.email);
    if (!limit.allowed) return rateLimitResponse(limit.resetAt);
  }

  const { id } = await params;
  const body = await request.json();
  const { data, error } = validateBody(sendEmailSchema, body);
  if (error) return error;

  // Sanitize HTML body if provided
  const safeHtmlBody = data.htmlBody ? sanitizeHtml(data.htmlBody) : undefined;

  // Verify cotizacion exists
  const cotizacion = await prisma.cotizacion.findUnique({
    where: { id },
    select: { numero: true },
  });
  if (!cotizacion) {
    return NextResponse.json({ error: "Cotizacion no encontrada" }, { status: 404 });
  }

  try {
    // Generate PDF using the preview page
    const origin = new URL(request.url).origin;
    const pdfBuffer = await generateCotizacionPdf(origin, id);

    // Send the email
    await sendEmail({
      to: data.to,
      subject: data.subject,
      html: safeHtmlBody || defaultEmailBody(cotizacion.numero),
      attachments: [
        {
          filename: `${cotizacion.numero}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    // Log activity
    await prisma.actividad.create({
      data: {
        cotizacionId: id,
        tipo: "EMAIL_ENVIADO",
        descripcion: `Cotizacion enviada por email a ${data.to}`,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al enviar email";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
