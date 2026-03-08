import { prisma } from "@/lib/prisma";

function defaultEmailBody(numero: string) {
  return `<p>Adjuntamos la cotizacion ${numero}.</p>`;
}
import { sendEmail } from "@/lib/email";
import { generateCotizacionPdf } from "@/lib/pdf-cotizacion";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { to, subject, htmlBody } = body;

  if (!to || !subject) {
    return NextResponse.json(
      { error: "Faltan campos requeridos (to, subject)" },
      { status: 400 }
    );
  }

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
      to,
      subject,
      html: htmlBody || defaultEmailBody(cotizacion.numero),
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
        descripcion: `Cotizacion enviada por email a ${to}`,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al enviar email";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
