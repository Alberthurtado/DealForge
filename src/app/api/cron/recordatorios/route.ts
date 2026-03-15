import { prisma } from "@/lib/prisma";
import { sendSystemEmail } from "@/lib/system-email";
import { buildSellerFollowUpEmail, buildClientExpiryEmail } from "@/lib/reminder-email";
import { NextRequest, NextResponse } from "next/server";

const ELIGIBLE_PLANS = ["pro", "business", "enterprise"];
const ELIGIBLE_ESTADOS = ["ENVIADA", "NEGOCIACION"];

export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel sends this automatically)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  let sellerReminders = 0;
  let clientReminders = 0;

  try {
    // Get all empresas with reminders enabled
    const empresas = await prisma.empresa.findMany({
      where: { recordatoriosActivos: true },
      select: {
        id: true,
        nombre: true,
        colorPrimario: true,
        recordatorioSeguimientoDias: true,
        recordatorioVencimientoDias: true,
        usuarios: {
          where: { plan: { in: ELIGIBLE_PLANS }, activo: true },
          select: { id: true, nombre: true, email: true },
        },
      },
    });

    for (const empresa of empresas) {
      for (const usuario of empresa.usuarios) {
        // ─── Seller follow-up reminders ────────────────
        const seguimientoDias = empresa.recordatorioSeguimientoDias;
        const cutoffDate = new Date(now.getTime() - seguimientoDias * 24 * 60 * 60 * 1000);

        // Find quotes with no activity in X days
        const quotesNeedingFollowUp = await prisma.cotizacion.findMany({
          where: {
            usuarioId: usuario.id,
            estado: { in: ELIGIBLE_ESTADOS },
            // Last activity older than cutoff
            actividades: {
              every: { createdAt: { lt: cutoffDate } },
            },
            // No seller reminder sent in the last X days
            NOT: {
              recordatorios: {
                some: {
                  tipo: "SEGUIMIENTO_VENDEDOR",
                  enviadoAt: { gt: cutoffDate },
                },
              },
            },
          },
          include: {
            cliente: { select: { nombre: true } },
            actividades: { orderBy: { createdAt: "desc" }, take: 1 },
          },
        });

        const origin = process.env.NEXT_PUBLIC_APP_URL || "https://app.dealforge.es";

        for (const cot of quotesNeedingFollowUp) {
          const lastActivity = cot.actividades[0];
          const diasSinActividad = lastActivity
            ? Math.floor((now.getTime() - new Date(lastActivity.createdAt).getTime()) / (24 * 60 * 60 * 1000))
            : seguimientoDias;

          const html = buildSellerFollowUpEmail({
            baseUrl: origin,
            cotizacionId: cot.id,
            cotizacion: {
              numero: cot.numero,
              total: cot.total,
              moneda: cot.moneda,
              cliente: cot.cliente.nombre,
              fechaEmision: cot.fechaEmision,
              estado: cot.estado,
            },
            vendedorNombre: usuario.nombre,
            diasSinActividad,
            empresa: { nombre: empresa.nombre, colorPrimario: empresa.colorPrimario },
          });

          const result = await sendSystemEmail({
            to: usuario.email,
            subject: `Seguimiento pendiente: ${cot.numero} — ${cot.cliente.nombre}`,
            html,
          });

          if (result.success) {
            await prisma.recordatorio.create({
              data: {
                cotizacionId: cot.id,
                tipo: "SEGUIMIENTO_VENDEDOR",
                destinatario: usuario.email,
              },
            });

            await prisma.actividad.create({
              data: {
                cotizacionId: cot.id,
                tipo: "RECORDATORIO_ENVIADO",
                descripcion: `Recordatorio de seguimiento enviado al vendedor (${diasSinActividad} días sin actividad)`,
              },
            });

            sellerReminders++;
          }
        }

        // ─── Client expiry reminders ────────────────────
        const vencimientoDias = empresa.recordatorioVencimientoDias;
        const expiryWindowEnd = new Date(now.getTime() + vencimientoDias * 24 * 60 * 60 * 1000);

        const quotesAboutToExpire = await prisma.cotizacion.findMany({
          where: {
            usuarioId: usuario.id,
            estado: { in: ELIGIBLE_ESTADOS },
            fechaVencimiento: {
              gte: now,
              lte: expiryWindowEnd,
            },
            NOT: {
              recordatorios: {
                some: {
                  tipo: "VENCIMIENTO_CLIENTE",
                  enviadoAt: { gt: cutoffDate },
                },
              },
            },
          },
          include: {
            cliente: {
              select: {
                nombre: true,
                email: true,
                contactos: {
                  where: { principal: true },
                  select: { nombre: true, email: true },
                  take: 1,
                },
              },
            },
          },
        });

        for (const cot of quotesAboutToExpire) {
          const contacto = cot.cliente.contactos[0];
          const recipientEmail = contacto?.email || cot.cliente.email;
          const recipientName = contacto?.nombre || cot.contactoNombre || cot.cliente.nombre;

          if (!recipientEmail) continue;

          const diasRestantes = Math.ceil(
            (new Date(cot.fechaVencimiento!).getTime() - now.getTime()) / (24 * 60 * 60 * 1000)
          );

          const html = buildClientExpiryEmail({
            baseUrl: origin,
            cotizacion: {
              numero: cot.numero,
              total: cot.total,
              moneda: cot.moneda,
              fechaVencimiento: cot.fechaVencimiento!,
              cliente: cot.cliente.nombre,
            },
            contactoNombre: recipientName,
            contactoEmail: recipientEmail,
            diasRestantes,
            empresa: { nombre: empresa.nombre, colorPrimario: empresa.colorPrimario },
          });

          const result = await sendSystemEmail({
            to: recipientEmail,
            subject: `Cotización ${cot.numero} — vence ${diasRestantes <= 0 ? "hoy" : diasRestantes === 1 ? "mañana" : `en ${diasRestantes} días`}`,
            html,
          });

          if (result.success) {
            await prisma.recordatorio.create({
              data: {
                cotizacionId: cot.id,
                tipo: "VENCIMIENTO_CLIENTE",
                destinatario: recipientEmail,
              },
            });

            await prisma.actividad.create({
              data: {
                cotizacionId: cot.id,
                tipo: "RECORDATORIO_ENVIADO",
                descripcion: `Recordatorio de vencimiento enviado al cliente (${diasRestantes} días restantes)`,
              },
            });

            clientReminders++;
          }
        }
      }
    }

    return NextResponse.json({
      ok: true,
      sellerReminders,
      clientReminders,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error("[cron/recordatorios] Error:", error);
    return NextResponse.json(
      { error: "Error procesando recordatorios" },
      { status: 500 }
    );
  }
}
