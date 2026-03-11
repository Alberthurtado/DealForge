import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { generateCotizacionPdf } from "@/lib/pdf-cotizacion";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit";
import { sendEmailSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";
import { sanitizeHtml } from "@/lib/sanitize";
import { getPlanFeatures, planFeatureResponse } from "@/lib/plan-limits";

function defaultEmailBody(numero: string) {
  return `<p>Adjuntamos la cotización ${numero}.</p>`;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  if (!getPlanFeatures(session.plan).emailEnvio) {
    return planFeatureResponse("emailEnvio");
  }

  const limit = checkRateLimit(`email:${session.userId}`, RATE_LIMITS.email);
  if (!limit.allowed) return rateLimitResponse(limit.resetAt);

  const { id } = await params;
  const body = await request.json();
  const { data, error } = validateBody(sendEmailSchema, body);
  if (error) return error;

  const safeHtmlBody = data.htmlBody ? sanitizeHtml(data.htmlBody) : undefined;

  // Verify cotizacion exists AND belongs to user
  const cotizacion = await prisma.cotizacion.findFirst({
    where: { id, usuarioId: session.userId },
    select: { numero: true, estado: true },
  });
  if (!cotizacion) {
    return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });
  }

  if (cotizacion.estado === "BORRADOR") {
    const blockingApprovals = await prisma.aprobacion.findMany({
      where: { cotizacionId: id, estado: { in: ["PENDIENTE", "RECHAZADA"] } },
      select: { estado: true, aprobadorNombre: true },
    });
    if (blockingApprovals.length > 0) {
      return NextResponse.json(
        { error: "No se puede enviar por email una cotización con aprobaciones pendientes." },
        { status: 400 }
      );
    }
  }

  try {
    const origin = new URL(request.url).origin;
    const pdfBuffer = await generateCotizacionPdf(origin, id);

    await sendEmail({
      to: data.to,
      subject: data.subject,
      html: safeHtmlBody || defaultEmailBody(cotizacion.numero),
      attachments: [{ filename: `${cotizacion.numero}.pdf`, content: pdfBuffer, contentType: "application/pdf" }],
    });

    await prisma.actividad.create({
      data: { cotizacionId: id, tipo: "EMAIL_ENVIADO", descripcion: `Cotización enviada por email a ${data.to}` },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al enviar email";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
