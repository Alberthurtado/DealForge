import { prisma } from "@/lib/prisma";
import { getSmtpConfig, sendEmail } from "@/lib/email";
import { buildApprovalResolvedEmail } from "@/lib/approval-email";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const aprobacion = await prisma.aprobacion.findUnique({
    where: { token },
    include: {
      cotizacion: {
        include: {
          cliente: { select: { nombre: true } },
          lineItems: {
            select: { descripcion: true, cantidad: true, precioUnitario: true, descuento: true, total: true },
            orderBy: { orden: "asc" },
          },
        },
      },
    },
  });

  if (!aprobacion) {
    return NextResponse.json({ error: "Token invalido" }, { status: 404 });
  }

  // Get the rule to show the reason
  const regla = await prisma.reglaComercial.findUnique({
    where: { id: aprobacion.reglaId },
    select: { nombre: true },
  });

  const empresa = await prisma.empresa.findUnique({
    where: { id: "default" },
    select: { nombre: true, logoUrl: true, colorPrimario: true },
  });

  return NextResponse.json({
    aprobacion: {
      id: aprobacion.id,
      estado: aprobacion.estado,
      aprobadorNombre: aprobacion.aprobadorNombre,
      aprobadorEmail: aprobacion.aprobadorEmail,
      comentario: aprobacion.comentario,
      respondidoAt: aprobacion.respondidoAt,
      createdAt: aprobacion.createdAt,
      reglaNombre: regla?.nombre || "Regla comercial",
    },
    cotizacion: {
      id: aprobacion.cotizacion.id,
      numero: aprobacion.cotizacion.numero,
      total: aprobacion.cotizacion.total,
      moneda: aprobacion.cotizacion.moneda,
      fechaEmision: aprobacion.cotizacion.fechaEmision,
      subtotal: aprobacion.cotizacion.subtotal,
      descuentoGlobal: aprobacion.cotizacion.descuentoGlobal,
      impuesto: aprobacion.cotizacion.impuesto,
      cliente: aprobacion.cotizacion.cliente.nombre,
      lineItems: aprobacion.cotizacion.lineItems,
    },
    empresa: {
      nombre: empresa?.nombre || "DealForge",
      logoUrl: empresa?.logoUrl,
      colorPrimario: empresa?.colorPrimario || "#3a9bb5",
    },
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const body = await request.json();
  const { estado, comentario } = body;

  if (!estado || !["APROBADA", "RECHAZADA"].includes(estado)) {
    return NextResponse.json({ error: "Estado invalido" }, { status: 400 });
  }

  const aprobacion = await prisma.aprobacion.findUnique({
    where: { token },
    include: {
      cotizacion: {
        include: { cliente: { select: { nombre: true } } },
      },
    },
  });

  if (!aprobacion) {
    return NextResponse.json({ error: "Token invalido" }, { status: 404 });
  }

  if (aprobacion.estado !== "PENDIENTE") {
    return NextResponse.json({ error: "Esta aprobacion ya fue resuelta" }, { status: 400 });
  }

  // Update approval
  const updated = await prisma.aprobacion.update({
    where: { token },
    data: {
      estado,
      comentario: comentario || null,
      respondidoAt: new Date(),
    },
  });

  // Log activity
  const statusLabel = estado === "APROBADA" ? "aprobada" : "rechazada";
  await prisma.actividad.create({
    data: {
      cotizacionId: aprobacion.cotizacionId,
      tipo: "APROBACION_RESUELTA",
      descripcion: `Cotizacion ${statusLabel} por ${aprobacion.aprobadorNombre}${comentario ? `: ${comentario}` : ""}`,
    },
  });

  // Send notification email to empresa (non-blocking)
  try {
    const smtpConfig = await getSmtpConfig();
    if (smtpConfig) {
      const empresa = await prisma.empresa.findUnique({
        where: { id: "default" },
        select: { nombre: true, colorPrimario: true, email: true },
      });
      const toEmail = empresa?.email || smtpConfig.smtpUser;
      const origin = request.headers.get("origin") || `http://${request.headers.get("host")}`;

      const html = buildApprovalResolvedEmail({
        baseUrl: origin,
        cotizacionId: aprobacion.cotizacionId,
        cotizacion: {
          numero: aprobacion.cotizacion.numero,
          total: aprobacion.cotizacion.total,
          cliente: aprobacion.cotizacion.cliente.nombre,
        },
        aprobadorNombre: aprobacion.aprobadorNombre,
        estado: estado as "APROBADA" | "RECHAZADA",
        comentario: comentario || null,
        empresa: {
          nombre: empresa?.nombre || "DealForge",
          colorPrimario: empresa?.colorPrimario || "#3a9bb5",
        },
      });

      await sendEmail({ to: toEmail, subject: `Cotizacion ${aprobacion.cotizacion.numero} ${statusLabel}`, html });
    }
  } catch {
    // Don't block response if email fails
  }

  return NextResponse.json(updated);
}
