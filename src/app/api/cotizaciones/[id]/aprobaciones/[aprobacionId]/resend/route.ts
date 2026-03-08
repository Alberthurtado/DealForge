import { prisma } from "@/lib/prisma";
import { getSmtpConfig, sendEmail } from "@/lib/email";
import { buildApprovalRequestEmail } from "@/lib/approval-email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; aprobacionId: string }> }
) {
  const { id, aprobacionId } = await params;

  const aprobacion = await prisma.aprobacion.findUnique({
    where: { id: aprobacionId, cotizacionId: id },
    include: {
      cotizacion: {
        include: {
          cliente: { select: { nombre: true } },
          lineItems: {
            select: { descripcion: true, cantidad: true, precioUnitario: true, total: true },
            orderBy: { orden: "asc" },
            take: 5,
          },
        },
      },
    },
  });

  if (!aprobacion) {
    return NextResponse.json({ error: "Aprobacion no encontrada" }, { status: 404 });
  }

  if (aprobacion.estado !== "PENDIENTE") {
    return NextResponse.json({ error: "Esta aprobacion ya fue resuelta" }, { status: 400 });
  }

  const smtpConfig = await getSmtpConfig();
  if (!smtpConfig) {
    return NextResponse.json({ error: "SMTP no configurado. Configura el email en Ajustes." }, { status: 400 });
  }

  // Get rule name
  const regla = await prisma.reglaComercial.findUnique({
    where: { id: aprobacion.reglaId },
    select: { nombre: true },
  });

  const empresa = await prisma.empresa.findUnique({
    where: { id: "default" },
    select: { nombre: true, logoUrl: true, colorPrimario: true },
  });

  // Ensure token exists
  let token = aprobacion.token;
  if (!token) {
    const updated = await prisma.aprobacion.update({
      where: { id: aprobacionId },
      data: { token: crypto.randomUUID().replace(/-/g, "").slice(0, 25) },
    });
    token = updated.token;
  }

  const origin = request.headers.get("origin") || `http://${request.headers.get("host")}`;

  const html = buildApprovalRequestEmail({
    baseUrl: origin,
    token: token!,
    cotizacion: {
      numero: aprobacion.cotizacion.numero,
      total: aprobacion.cotizacion.total,
      moneda: aprobacion.cotizacion.moneda,
      fechaEmision: aprobacion.cotizacion.fechaEmision,
      cliente: aprobacion.cotizacion.cliente.nombre,
    },
    lineItems: aprobacion.cotizacion.lineItems,
    aprobadorNombre: aprobacion.aprobadorNombre,
    razon: regla?.nombre || "Regla comercial",
    empresa: {
      nombre: empresa?.nombre || "DealForge",
      colorPrimario: empresa?.colorPrimario || "#3a9bb5",
    },
  });

  try {
    await sendEmail({
      to: aprobacion.aprobadorEmail,
      subject: `Aprobacion requerida: ${aprobacion.cotizacion.numero}`,
      html,
    });

    await prisma.aprobacion.update({
      where: { id: aprobacionId },
      data: { emailEnviadoAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al enviar email";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
