import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { aprobacionCreateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";
import { sendSystemEmail, isSystemEmailConfigured } from "@/lib/system-email";
import { buildApprovalRequestEmail } from "@/lib/approval-email";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;

  // Verify cotizacion belongs to user
  const owned = await prisma.cotizacion.findFirst({ where: { id, usuarioId: session.userId }, select: { id: true } });
  if (!owned) return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });

  const aprobaciones = await prisma.aprobacion.findMany({
    where: { cotizacionId: id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(aprobaciones);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;

  // Verify cotizacion belongs to user and get cotizacion details for email
  const cotizacion = await prisma.cotizacion.findFirst({
    where: { id, usuarioId: session.userId },
    include: {
      cliente: { select: { nombre: true } },
      lineItems: {
        select: { descripcion: true, cantidad: true, precioUnitario: true, total: true },
        orderBy: { orden: "asc" },
        take: 5,
      },
    },
  });
  if (!cotizacion) return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });

  const bodyRaw = await request.json();
  const items = Array.isArray(bodyRaw) ? bodyRaw : [bodyRaw];

  const validatedItems = [];
  for (const item of items) {
    const { data, error } = validateBody(aprobacionCreateSchema, item);
    if (error) return error;
    validatedItems.push(data);
  }

  // Create aprobaciones with tokens
  const created = await Promise.all(
    validatedItems.map((item) =>
      prisma.aprobacion.create({
        data: {
          cotizacionId: id,
          reglaId: item.reglaId,
          aprobadorNombre: item.aprobadorNombre,
          aprobadorEmail: item.aprobadorEmail,
          token: crypto.randomUUID().replace(/-/g, "").slice(0, 25),
        },
      })
    )
  );

  // Auto-send approval emails (non-blocking)
  if (isSystemEmailConfigured()) {
    const empresa = await prisma.empresa.findUnique({
      where: { id: "default" },
      select: { nombre: true, logoUrl: true, colorPrimario: true },
    });

    const origin = request.headers.get("origin") || `https://${request.headers.get("host")}`;

    // Send emails in parallel, don't block the response
    Promise.all(
      created.map(async (aprobacion) => {
        // Get rule name for the email
        const regla = await prisma.reglaComercial.findUnique({
          where: { id: aprobacion.reglaId },
          select: { nombre: true },
        });

        const html = buildApprovalRequestEmail({
          baseUrl: origin,
          token: aprobacion.token!,
          cotizacion: {
            numero: cotizacion.numero,
            total: cotizacion.total,
            moneda: cotizacion.moneda,
            fechaEmision: cotizacion.fechaEmision,
            cliente: cotizacion.cliente.nombre,
          },
          lineItems: cotizacion.lineItems,
          aprobadorNombre: aprobacion.aprobadorNombre,
          razon: regla?.nombre || "Regla comercial",
          empresa: {
            nombre: empresa?.nombre || "DealForge",
            colorPrimario: empresa?.colorPrimario || "#3a9bb5",
          },
        });

        const result = await sendSystemEmail({
          to: aprobacion.aprobadorEmail,
          subject: `Aprobacion requerida: ${cotizacion.numero}`,
          html,
        });

        if (result.success) {
          await prisma.aprobacion.update({
            where: { id: aprobacion.id },
            data: { emailEnviadoAt: new Date() },
          });
        }
      })
    ).catch((err) => {
      console.error("[aprobaciones] Error sending approval emails:", err);
    });
  }

  return NextResponse.json(created, { status: 201 });
}
