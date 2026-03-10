import { prisma } from "@/lib/prisma";
import { buildApprovalRequestEmail } from "@/lib/approval-email";
import { sendSystemEmail, isSystemEmailConfigured } from "@/lib/system-email";
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
    return NextResponse.json({ error: "Aprobación no encontrada" }, { status: 404 });
  }

  if (aprobacion.estado !== "PENDIENTE") {
    return NextResponse.json({ error: "Esta aprobación ya fue resuelta" }, { status: 400 });
  }

  if (!isSystemEmailConfigured()) {
    return NextResponse.json({ error: "Servicio de email no configurado (BREVO_API_KEY)." }, { status: 400 });
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

  const emailResult = await sendSystemEmail({
    to: aprobacion.aprobadorEmail,
    subject: `Aprobación requerida: ${aprobacion.cotizacion.numero}`,
    html,
  });

  if (!emailResult.success) {
    return NextResponse.json({ error: emailResult.error || "Error al enviar email" }, { status: 500 });
  }

  await prisma.aprobacion.update({
    where: { id: aprobacionId },
    data: { emailEnviadoAt: new Date() },
  });

  return NextResponse.json({ success: true });
}
