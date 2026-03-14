import { prisma } from "@/lib/prisma";
import { sendSystemEmail } from "@/lib/system-email";
import { buildApprovalResolvedEmail } from "@/lib/approval-email";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit";
import { aprobacionResolveSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  // Rate limit: 10 per minute per token
  const limit = checkRateLimit(`approval:${token}`, RATE_LIMITS.approval);
  if (!limit.allowed) return rateLimitResponse(limit.resetAt);

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
    return NextResponse.json({ error: "Token inválido" }, { status: 404 });
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
  const { data, error } = validateBody(aprobacionResolveSchema, body);
  if (error) return error;

  const aprobacion = await prisma.aprobacion.findUnique({
    where: { token },
    include: {
      cotizacion: {
        include: { cliente: { select: { nombre: true } } },
      },
    },
  });

  if (!aprobacion) {
    return NextResponse.json({ error: "Token inválido" }, { status: 404 });
  }

  if (aprobacion.estado !== "PENDIENTE") {
    return NextResponse.json({ error: "Esta aprobación ya fue resuelta" }, { status: 400 });
  }

  // Update approval
  const updated = await prisma.aprobacion.update({
    where: { token },
    data: {
      estado: data.estado,
      comentario: data.comentario || null,
      respondidoAt: new Date(),
    },
  });

  // Log activity
  const statusLabel = data.estado === "APROBADA" ? "aprobada" : "rechazada";
  await prisma.actividad.create({
    data: {
      cotizacionId: aprobacion.cotizacionId,
      tipo: "APROBACION_RESUELTA",
      descripcion: `Cotización ${statusLabel} por ${aprobacion.aprobadorNombre}${data.comentario ? `: ${data.comentario}` : ""}`,
    },
  });

  // Check if ALL approvals for this cotizacion are now resolved
  // Only send notification when fully approved or on rejection
  try {
    const allApprovals = await prisma.aprobacion.findMany({
      where: { cotizacionId: aprobacion.cotizacionId },
      select: { estado: true },
    });

    const allApproved = allApprovals.length > 0 && allApprovals.every((a) => a.estado === "APROBADA");
    const isRejection = data.estado === "RECHAZADA";

    // Only notify the quote creator when fully approved or on rejection
    if (allApproved || isRejection) {
      // Get the quote creator's email
      const cotizacionWithUser = await prisma.cotizacion.findUnique({
        where: { id: aprobacion.cotizacionId },
        select: { usuarioId: true },
      });
      const creator = cotizacionWithUser
        ? await prisma.usuario.findUnique({
            where: { id: cotizacionWithUser.usuarioId },
            select: { email: true, nombre: true },
          })
        : null;

      const empresa = await prisma.empresa.findUnique({
        where: { id: "default" },
        select: { nombre: true, colorPrimario: true },
      });

      const toEmail = creator?.email;
      if (toEmail) {
        const origin = request.headers.get("origin") || `https://${request.headers.get("host")}`;

        const html = buildApprovalResolvedEmail({
          baseUrl: origin,
          cotizacionId: aprobacion.cotizacionId,
          cotizacion: {
            numero: aprobacion.cotizacion.numero,
            total: aprobacion.cotizacion.total,
            cliente: aprobacion.cotizacion.cliente.nombre,
          },
          aprobadorNombre: aprobacion.aprobadorNombre,
          estado: data.estado,
          comentario: data.comentario || null,
          empresa: {
            nombre: empresa?.nombre || "DealForge",
            colorPrimario: empresa?.colorPrimario || "#3a9bb5",
          },
        });

        const subject = allApproved
          ? `Cotizacion ${aprobacion.cotizacion.numero} aprobada — lista para enviar`
          : `Cotizacion ${aprobacion.cotizacion.numero} rechazada por ${aprobacion.aprobadorNombre}`;

        await sendSystemEmail({ to: toEmail, subject, html });
      }
    }
  } catch {
    // Don't block response if email fails
  }

  return NextResponse.json(updated);
}
