import { prisma } from "@/lib/prisma";
import { sendSystemEmail } from "@/lib/system-email";
import { NextRequest, NextResponse } from "next/server";

function buildContractNotificationEmail({
  tipo,
  contrato,
  empresa,
  vendedorNombre,
}: {
  tipo: "RENOVACION_PROXIMA" | "RENOVADO_AUTO" | "PENDIENTE_RENOVACION" | "EXPIRADO";
  contrato: {
    numero: string;
    clienteNombre: string;
    fechaFin: Date;
    valorMensual: number;
    moneda: string;
  };
  empresa: { nombre: string; colorPrimario: string };
  vendedorNombre: string;
}): string {
  const fechaFinStr = contrato.fechaFin.toISOString().split("T")[0];
  const color = empresa.colorPrimario || "#3a9bb5";

  const titles: Record<string, string> = {
    RENOVACION_PROXIMA: "Contrato próximo a vencer",
    RENOVADO_AUTO: "Contrato renovado automáticamente",
    PENDIENTE_RENOVACION: "Contrato pendiente de renovación",
    EXPIRADO: "Contrato expirado",
  };

  const messages: Record<string, string> = {
    RENOVACION_PROXIMA: `El contrato <strong>${contrato.numero}</strong> con <strong>${contrato.clienteNombre}</strong> vence el <strong>${fechaFinStr}</strong>. Revisa las condiciones y decide si deseas renovarlo.`,
    RENOVADO_AUTO: `El contrato <strong>${contrato.numero}</strong> con <strong>${contrato.clienteNombre}</strong> ha sido renovado automáticamente. La nueva fecha de fin ha sido extendida.`,
    PENDIENTE_RENOVACION: `El contrato <strong>${contrato.numero}</strong> con <strong>${contrato.clienteNombre}</strong> está próximo a vencer el <strong>${fechaFinStr}</strong> y requiere renovación manual.`,
    EXPIRADO: `El contrato <strong>${contrato.numero}</strong> con <strong>${contrato.clienteNombre}</strong> ha expirado el <strong>${fechaFinStr}</strong> sin renovación.`,
  };

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f4f4f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;">
        <tr><td style="background:${color};padding:24px 32px;">
          <h1 style="color:#fff;margin:0;font-size:20px;">${empresa.nombre}</h1>
        </td></tr>
        <tr><td style="padding:32px;">
          <p style="margin:0 0 8px;color:#666;">Hola ${vendedorNombre},</p>
          <h2 style="margin:0 0 16px;color:#333;font-size:18px;">${titles[tipo]}</h2>
          <p style="margin:0 0 24px;color:#555;line-height:1.6;">${messages[tipo]}</p>
          <table width="100%" style="background:#f9f9fb;border-radius:6px;padding:16px;margin-bottom:24px;" cellpadding="8">
            <tr><td style="color:#888;font-size:13px;">Contrato</td><td style="color:#333;font-weight:bold;">${contrato.numero}</td></tr>
            <tr><td style="color:#888;font-size:13px;">Cliente</td><td style="color:#333;">${contrato.clienteNombre}</td></tr>
            <tr><td style="color:#888;font-size:13px;">Valor mensual</td><td style="color:#333;">${contrato.valorMensual.toFixed(2)} ${contrato.moneda}</td></tr>
            <tr><td style="color:#888;font-size:13px;">Fecha fin</td><td style="color:#333;">${fechaFinStr}</td></tr>
          </table>
          <p style="margin:0;color:#999;font-size:12px;">Este es un mensaje automático de ${empresa.nombre}.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  let autoRenewed = 0;
  let pendingRenewal = 0;
  let expired = 0;
  let notificationsSent = 0;

  try {
    // Get empresa info for email branding
    const empresa = await prisma.empresa.findUnique({
      where: { id: "default" },
      select: { nombre: true, colorPrimario: true },
    });
    const empresaInfo = {
      nombre: empresa?.nombre || "DealForge",
      colorPrimario: empresa?.colorPrimario || "#3a9bb5",
    };

    // ─── 1. Auto-renew contracts past fechaFin with renovacionAutomatica ───
    const autoRenewContracts = await prisma.contrato.findMany({
      where: {
        estado: "ACTIVO",
        renovacionAutomatica: true,
        fechaFin: { lt: now },
      },
      include: {
        cliente: { select: { nombre: true } },
        usuario: { select: { id: true, nombre: true, email: true } },
      },
    });

    for (const contrato of autoRenewContracts) {
      const nuevaFechaFin = new Date(contrato.fechaFin);
      nuevaFechaFin.setMonth(nuevaFechaFin.getMonth() + contrato.duracionMeses);

      await prisma.contrato.update({
        where: { id: contrato.id },
        data: {
          fechaFin: nuevaFechaFin,
          valorTotal: Math.round(contrato.valorMensual * contrato.duracionMeses * 100) / 100,
          actividades: {
            create: {
              tipo: "RENOVADO",
              descripcion: `Contrato renovado automáticamente por ${contrato.duracionMeses} meses. Nueva fecha de fin: ${nuevaFechaFin.toISOString().split("T")[0]}`,
            },
          },
        },
      });

      autoRenewed++;

      // Send notification
      try {
        const html = buildContractNotificationEmail({
          tipo: "RENOVADO_AUTO",
          contrato: {
            numero: contrato.numero,
            clienteNombre: contrato.cliente.nombre,
            fechaFin: nuevaFechaFin,
            valorMensual: contrato.valorMensual,
            moneda: contrato.moneda,
          },
          empresa: empresaInfo,
          vendedorNombre: contrato.usuario.nombre,
        });

        const result = await sendSystemEmail({
          to: contrato.usuario.email,
          subject: `Contrato ${contrato.numero} renovado automáticamente`,
          html,
        });

        if (result.success) notificationsSent++;
      } catch {
        // Email failure doesn't block cron
      }
    }

    // ─── 2. Manual contracts approaching fechaFin → PENDIENTE_RENOVACION ───
    const manualContractsApproaching = await prisma.contrato.findMany({
      where: {
        estado: "ACTIVO",
        renovacionAutomatica: false,
        fechaFin: { gt: now },
      },
      include: {
        cliente: { select: { nombre: true } },
        usuario: { select: { id: true, nombre: true, email: true } },
      },
    });

    for (const contrato of manualContractsApproaching) {
      const daysUntilExpiry = Math.ceil(
        (contrato.fechaFin.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)
      );

      if (daysUntilExpiry <= contrato.diasAvisoRenovacion) {
        await prisma.contrato.update({
          where: { id: contrato.id },
          data: {
            estado: "PENDIENTE_RENOVACION",
            actividades: {
              create: {
                tipo: "ESTADO_CAMBIADO",
                descripcion: `Contrato cambiado a PENDIENTE_RENOVACION. Vence en ${daysUntilExpiry} días.`,
              },
            },
          },
        });

        pendingRenewal++;

        try {
          const html = buildContractNotificationEmail({
            tipo: "PENDIENTE_RENOVACION",
            contrato: {
              numero: contrato.numero,
              clienteNombre: contrato.cliente.nombre,
              fechaFin: contrato.fechaFin,
              valorMensual: contrato.valorMensual,
              moneda: contrato.moneda,
            },
            empresa: empresaInfo,
            vendedorNombre: contrato.usuario.nombre,
          });

          const result = await sendSystemEmail({
            to: contrato.usuario.email,
            subject: `Contrato ${contrato.numero} — renovación pendiente (${daysUntilExpiry} días)`,
            html,
          });

          if (result.success) notificationsSent++;
        } catch {
          // Email failure doesn't block cron
        }
      }
    }

    // ─── 3. Expired contracts past fechaFin (not renewed) → EXPIRADO ───
    const expiredContracts = await prisma.contrato.findMany({
      where: {
        estado: { in: ["ACTIVO", "PENDIENTE_RENOVACION"] },
        renovacionAutomatica: false,
        fechaFin: { lt: now },
      },
      include: {
        cliente: { select: { nombre: true } },
        usuario: { select: { id: true, nombre: true, email: true } },
      },
    });

    for (const contrato of expiredContracts) {
      await prisma.contrato.update({
        where: { id: contrato.id },
        data: {
          estado: "EXPIRADO",
          actividades: {
            create: {
              tipo: "ESTADO_CAMBIADO",
              descripcion: `Contrato expirado. Fecha de fin: ${contrato.fechaFin.toISOString().split("T")[0]}`,
            },
          },
        },
      });

      expired++;

      try {
        const html = buildContractNotificationEmail({
          tipo: "EXPIRADO",
          contrato: {
            numero: contrato.numero,
            clienteNombre: contrato.cliente.nombre,
            fechaFin: contrato.fechaFin,
            valorMensual: contrato.valorMensual,
            moneda: contrato.moneda,
          },
          empresa: empresaInfo,
          vendedorNombre: contrato.usuario.nombre,
        });

        const result = await sendSystemEmail({
          to: contrato.usuario.email,
          subject: `Contrato ${contrato.numero} ha expirado`,
          html,
        });

        if (result.success) notificationsSent++;
      } catch {
        // Email failure doesn't block cron
      }
    }

    return NextResponse.json({
      ok: true,
      autoRenewed,
      pendingRenewal,
      expired,
      notificationsSent,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error("[cron/contratos] Error:", error);
    return NextResponse.json(
      { error: "Error procesando contratos" },
      { status: 500 }
    );
  }
}
