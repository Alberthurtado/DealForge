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
            select: { descripcion: true, cantidad: true, precioUnitario: true, descuento: true, frecuencia: true, total: true },
            orderBy: { orden: "asc" },
          },
        },
      },
      contrato: {
        include: {
          cliente: { select: { nombre: true } },
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

  // If this is a contract signature, return contract data
  if (firma.contratoId && firma.contrato) {
    return NextResponse.json({
      firma: {
        id: firma.id,
        signerName: firma.signerName,
        signerEmail: firma.signerEmail,
        signedAt: firma.signedAt,
        createdAt: firma.createdAt,
      },
      tipo: "contrato",
      contrato: {
        id: firma.contrato.id,
        numero: firma.contrato.numero,
        valorTotal: firma.contrato.valorTotal,
        moneda: firma.contrato.moneda,
        fechaInicio: firma.contrato.fechaInicio,
        fechaFin: firma.contrato.fechaFin,
        documentoHtml: firma.contrato.documentoHtml,
        cliente: firma.contrato.cliente.nombre,
      },
      empresa: {
        nombre: empresa?.nombre || "DealForge",
        logoUrl: empresa?.logoUrl,
        colorPrimario: empresa?.colorPrimario || "#3a9bb5",
      },
    });
  }

  return NextResponse.json({
    firma: {
      id: firma.id,
      signerName: firma.signerName,
      signerEmail: firma.signerEmail,
      signedAt: firma.signedAt,
      createdAt: firma.createdAt,
    },
    tipo: "cotizacion",
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
      contrato: {
        include: { cliente: { select: { nombre: true } } },
      },
    },
  });

  if (!firma) {
    return NextResponse.json({ error: "Token inválido" }, { status: 404 });
  }

  if (firma.signedAt) {
    return NextResponse.json({ error: "Este documento ya fue firmado" }, { status: 400 });
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

  // Handle contract signature
  if (firma.contratoId && firma.contrato) {
    // Log ContratoActividad FIRMA_COMPLETADA
    await prisma.contratoActividad.create({
      data: {
        contratoId: firma.contratoId,
        tipo: "FIRMA_COMPLETADA",
        descripcion: `Contrato firmado por ${firma.signerName} (${firma.signerEmail})`,
      },
    });

    // Notify seller
    try {
      const contratoWithUser = await prisma.contrato.findUnique({
        where: { id: firma.contratoId },
        select: { usuarioId: true },
      });
      const seller = contratoWithUser
        ? await prisma.usuario.findUnique({
            where: { id: contratoWithUser.usuarioId },
            select: { email: true },
          })
        : null;

      if (seller?.email) {
        const empresa = await prisma.empresa.findUnique({
          where: { id: "default" },
          select: { nombre: true, colorPrimario: true },
        });
        const color = empresa?.colorPrimario || "#3a9bb5";
        const origin = request.headers.get("origin") || `https://${request.headers.get("host")}`;

        await sendSystemEmail({
          to: seller.email,
          subject: `Contrato ${firma.contrato.numero} firmado por ${firma.signerName}`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f4f4f7;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:${color};padding:24px 30px;border-radius:12px 12px 0 0;">
      <h1 style="color:white;margin:0;font-size:18px;">${empresa?.nombre || "DealForge"}</h1>
      <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px;">Contrato firmado</p>
    </div>
    <div style="background:white;padding:30px;border-radius:0 0 12px 12px;border:1px solid #e5e5e5;border-top:none;">
      <div style="text-align:center;margin:0 0 20px;">
        <div style="display:inline-block;background:#16a34a;color:white;padding:8px 24px;border-radius:20px;font-weight:bold;font-size:14px;">Firmado</div>
      </div>
      <p style="margin:0 0 16px;font-size:14px;color:#555;text-align:center;">
        El contrato <strong>${firma.contrato.numero}</strong> para <strong>${firma.contrato.cliente.nombre}</strong>
        ha sido firmado por <strong>${firma.signerName}</strong>.
      </p>
      <div style="text-align:center;margin:20px 0 0;">
        <a href="${origin}/contratos/${firma.contratoId}" style="display:inline-block;padding:10px 28px;background:${color};color:white;text-decoration:none;border-radius:8px;font-size:13px;">Ver contrato</a>
      </div>
    </div>
  </div>
</body>
</html>`,
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

  // Handle quote signature (existing behavior)
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
