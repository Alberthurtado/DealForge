import { prisma } from "@/lib/prisma";
import { sendSystemEmail } from "@/lib/system-email";
import { buildSignatureNotificationEmail } from "@/lib/signature-email";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit";
import { firmaSignSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const limit = checkRateLimit(`firma:${token}`, RATE_LIMITS.approval);
  if (!limit.allowed) return rateLimitResponse(limit.resetAt);

  const firma = await prisma.firma.findUnique({
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

  if (!firma) {
    return NextResponse.json({ error: "Token inválido" }, { status: 404 });
  }

  const empresa = await prisma.empresa.findUnique({
    where: { id: "default" },
    select: { nombre: true, logoUrl: true, colorPrimario: true, condicionesDefecto: true },
  });

  return NextResponse.json({
    firma: {
      id: firma.id,
      signerName: firma.signerName,
      signerEmail: firma.signerEmail,
      signedAt: firma.signedAt,
      createdAt: firma.createdAt,
    },
    cotizacion: {
      id: firma.cotizacion.id,
      numero: firma.cotizacion.numero,
      total: firma.cotizacion.total,
      moneda: firma.cotizacion.moneda,
      fechaEmision: firma.cotizacion.fechaEmision,
      subtotal: firma.cotizacion.subtotal,
      descuentoGlobal: firma.cotizacion.descuentoGlobal,
      impuesto: firma.cotizacion.impuesto,
      notas: firma.cotizacion.notas || null,
      condiciones: firma.cotizacion.condiciones || empresa?.condicionesDefecto || null,
      cliente: firma.cotizacion.cliente.nombre,
      lineItems: firma.cotizacion.lineItems,
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
  const { data, error } = validateBody(firmaSignSchema, body);
  if (error) return error;

  const firma = await prisma.firma.findUnique({
    where: { token },
    include: {
      cotizacion: {
        include: { cliente: { select: { nombre: true } } },
      },
    },
  });

  if (!firma) {
    return NextResponse.json({ error: "Token inválido" }, { status: 404 });
  }

  if (firma.signedAt) {
    return NextResponse.json({ error: "Esta cotización ya fue firmada" }, { status: 400 });
  }

  // Get IP address
  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Update firma
  const updated = await prisma.firma.update({
    where: { token },
    data: {
      signedAt: new Date(),
      signatureData: data.signatureData,
      ipAddress,
    },
  });

  // Log activity
  await prisma.actividad.create({
    data: {
      cotizacionId: firma.cotizacionId,
      tipo: "FIRMA_COMPLETADA",
      descripcion: `Cotización firmada por ${firma.signerName} (${firma.signerEmail})`,
    },
  });

  // Auto-mark quote as GANADA
  if (["ENVIADA", "NEGOCIACION"].includes(firma.cotizacion.estado)) {
    await prisma.cotizacion.update({
      where: { id: firma.cotizacionId },
      data: { estado: "GANADA" },
    });
    await prisma.actividad.create({
      data: {
        cotizacionId: firma.cotizacionId,
        tipo: "CAMBIO_ESTADO",
        descripcion: "Cotización marcada como Ganada automáticamente al recibir firma electrónica",
      },
    });
  }

  // Notify seller
  try {
    const cotizacionWithUser = await prisma.cotizacion.findUnique({
      where: { id: firma.cotizacionId },
      select: { usuarioId: true },
    });
    const seller = cotizacionWithUser
      ? await prisma.usuario.findUnique({
          where: { id: cotizacionWithUser.usuarioId },
          select: { email: true },
        })
      : null;

    if (seller?.email) {
      const empresa = await prisma.empresa.findUnique({
        where: { id: "default" },
        select: { nombre: true, colorPrimario: true },
      });

      const origin = request.headers.get("origin") || `https://${request.headers.get("host")}`;

      const html = buildSignatureNotificationEmail({
        baseUrl: origin,
        cotizacionId: firma.cotizacionId,
        cotizacion: {
          numero: firma.cotizacion.numero,
          total: firma.cotizacion.total,
          cliente: firma.cotizacion.cliente.nombre,
        },
        signerName: firma.signerName,
        signedAt: updated.signedAt!,
        empresa: {
          nombre: empresa?.nombre || "DealForge",
          colorPrimario: empresa?.colorPrimario || "#3a9bb5",
        },
      });

      await sendSystemEmail({
        to: seller.email,
        subject: `Cotización ${firma.cotizacion.numero} firmada por ${firma.signerName}`,
        html,
      });
    }
  } catch {
    // Don't block response if email fails
  }

  return NextResponse.json({
    id: updated.id,
    signedAt: updated.signedAt,
    signerName: updated.signerName,
  });
}
