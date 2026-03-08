import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validarCotizacion, type ProductoCategoriaMap } from "@/lib/reglas-engine";
import { getSmtpConfig, sendEmail } from "@/lib/email";
import { buildApprovalRequestEmail } from "@/lib/approval-email";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const estado = searchParams.get("estado") || "";
  const search = searchParams.get("search") || "";

  const where: Record<string, unknown> = {};
  if (estado) where.estado = estado;
  if (search) {
    where.OR = [
      { numero: { contains: search } },
      { cliente: { nombre: { contains: search } } },
    ];
  }

  const cotizaciones = await prisma.cotizacion.findMany({
    where,
    include: {
      cliente: { select: { id: true, nombre: true } },
      _count: { select: { lineItems: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(cotizaciones);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { lineItems, ...cotizacionData } = body;

  // Generate quote number with configurable prefix
  const empresa = await prisma.empresa.findUnique({ where: { id: "default" }, select: { prefijoCotizacion: true, diasVencimiento: true, condicionesDefecto: true } });
  const prefijo = empresa?.prefijoCotizacion || "COT";
  const diasVencimiento = empresa?.diasVencimiento ?? 30;
  const count = await prisma.cotizacion.count();
  const numero = `${prefijo}-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, "0")}`;

  // Calculate totals
  let subtotal = 0;
  const processedItems = (lineItems || []).map(
    (item: Record<string, unknown>, index: number) => {
      const cantidad = Number(item.cantidad) || 1;
      const precioUnitario = Number(item.precioUnitario) || 0;
      const descuento = Number(item.descuento) || 0;
      const itemTotal = cantidad * precioUnitario * (1 - descuento / 100);
      subtotal += itemTotal;
      return {
        descripcion: item.descripcion as string,
        productoId: (item.productoId as string) || null,
        varianteId: (item.varianteId as string) || null,
        cantidad,
        precioUnitario,
        descuento,
        total: Math.round(itemTotal * 100) / 100,
        orden: index,
      };
    }
  );

  const descuentoGlobal = Number(cotizacionData.descuentoGlobal) || 0;
  const impuesto = Number(cotizacionData.impuesto) || 21;
  const subtotalConDescuento = subtotal * (1 - descuentoGlobal / 100);
  const total = subtotalConDescuento * (1 + impuesto / 100);

  const cotizacion = await prisma.cotizacion.create({
    data: {
      numero,
      clienteId: cotizacionData.clienteId,
      estado: "BORRADOR",
      contactoNombre: cotizacionData.contactoNombre || null,
      subtotal: Math.round(subtotal * 100) / 100,
      descuentoGlobal,
      impuesto,
      total: Math.round(total * 100) / 100,
      moneda: cotizacionData.moneda || "EUR",
      notas: cotizacionData.notas || null,
      condiciones: cotizacionData.condiciones || empresa?.condicionesDefecto || null,
      fechaVencimiento: cotizacionData.fechaVencimiento
        ? new Date(cotizacionData.fechaVencimiento)
        : new Date(Date.now() + diasVencimiento * 24 * 60 * 60 * 1000),
      lineItems: { create: processedItems },
      actividades: {
        create: {
          tipo: "CREADA",
          descripcion: "Cotizacion creada",
        },
      },
    },
    include: {
      cliente: true,
      lineItems: true,
    },
  });

  // Auto-create approval records if rules require them
  try {
    const [reglas, allProducts] = await Promise.all([
      prisma.reglaComercial.findMany({ where: { activa: true } }),
      prisma.producto.findMany({ select: { id: true, categoriaId: true } }),
    ]);
    const catMap: ProductoCategoriaMap = {};
    for (const p of allProducts) catMap[p.id] = p.categoriaId;

    const result = validarCotizacion(reglas, {
      lineItems: processedItems,
      descuentoGlobal,
      subtotal,
      total,
    }, catMap);

    if (result.aprobacionesRequeridas.length > 0) {
      // Create approval records individually to get tokens
      const createdAprobaciones = [];
      for (const req of result.aprobacionesRequeridas) {
        const aprobacion = await prisma.aprobacion.create({
          data: {
            cotizacionId: cotizacion.id,
            reglaId: req.reglaId,
            aprobadorNombre: req.aprobador.nombre,
            aprobadorEmail: req.aprobador.email,
          },
        });
        createdAprobaciones.push({ ...aprobacion, razon: req.razon });
      }
      await prisma.actividad.create({
        data: {
          cotizacionId: cotizacion.id,
          tipo: "APROBACION_REQUERIDA",
          descripcion: `Aprobacion requerida de: ${result.aprobacionesRequeridas.map((r) => r.aprobador.nombre).join(", ")}`,
        },
      });

      // Send email notifications to approvers (non-blocking)
      const smtpConfig = await getSmtpConfig();
      if (smtpConfig) {
        const origin = request.headers.get("origin") || `http://${request.headers.get("host")}`;
        const empresaData = await prisma.empresa.findUnique({
          where: { id: "default" },
          select: { nombre: true, colorPrimario: true },
        });
        for (const aprob of createdAprobaciones) {
          if (!aprob.token) continue;
          try {
            const html = buildApprovalRequestEmail({
              baseUrl: origin,
              token: aprob.token,
              cotizacion: {
                numero,
                total: Math.round(total * 100) / 100,
                moneda: cotizacionData.moneda || "EUR",
                fechaEmision: new Date(),
                cliente: cotizacion.cliente.nombre,
              },
              aprobadorNombre: aprob.aprobadorNombre,
              razon: aprob.razon,
              empresa: { nombre: empresaData?.nombre || "DealForge", colorPrimario: empresaData?.colorPrimario || "#3a9bb5" },
              lineItems: processedItems.map((i: { descripcion: string; cantidad: number; total: number }) => ({ descripcion: i.descripcion, cantidad: i.cantidad, total: i.total })),
            });
            await sendEmail({
              to: aprob.aprobadorEmail,
              subject: `Aprobacion requerida: ${numero}`,
              html,
            });
            await prisma.aprobacion.update({
              where: { id: aprob.id },
              data: { emailEnviadoAt: new Date() },
            });
          } catch {
            // Email sending failure doesn't block quote creation
          }
        }
      }
    }
  } catch {
    // Non-critical: don't block quote creation if rule evaluation fails
  }

  return NextResponse.json(cotizacion, { status: 201 });
}
