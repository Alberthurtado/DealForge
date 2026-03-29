import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validarCotizacion, type ProductoCategoriaMap } from "@/lib/reglas-engine";
import { buildApprovalRequestEmail } from "@/lib/approval-email";
import { sendSystemEmail } from "@/lib/system-email";
import { getSession } from "@/lib/auth";
import { checkLimit } from "@/lib/plan-limits";
import { cotizacionCreateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const estado = searchParams.get("estado") || "";
  const search = searchParams.get("search") || "";

  const ownerFilter = session.empresaId
    ? { OR: [{ equipoId: session.empresaId }, { usuarioId: session.userId, equipoId: null }] }
    : { usuarioId: session.userId };

  const andClauses: Record<string, unknown>[] = [ownerFilter as Record<string, unknown>];
  if (estado) andClauses.push({ estado });
  if (search) {
    andClauses.push({
      OR: [
        { numero: { contains: search } },
        { cliente: { nombre: { contains: search } } },
      ],
    });
  }
  const where = andClauses.length === 1 ? andClauses[0] : { AND: andClauses };

  const cotizaciones = await prisma.cotizacion.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    include: {
      cliente: { select: { id: true, nombre: true } },
      _count: { select: { lineItems: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(cotizaciones);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  // ── Plan limit check (team-aware) ──
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentCotizacionesMes = await prisma.cotizacion.count({
    where: session.empresaId
      ? { OR: [{ equipoId: session.empresaId }, { usuarioId: session.userId, equipoId: null }], createdAt: { gte: startOfMonth } }
      : { usuarioId: session.userId, createdAt: { gte: startOfMonth } },
  });
  const limit = checkLimit(session.plan, "cotizacionesMes", currentCotizacionesMes);

  if (!limit.allowed) {
    return NextResponse.json(
      {
        error: "PLAN_LIMIT_REACHED",
        message: `Has alcanzado el límite de ${limit.limit} ${limit.resource} de tu plan ${limit.planLabel}. Mejora tu plan para crear más cotizaciones.`,
        current: limit.current,
        limit: limit.limit,
      },
      { status: 403 }
    );
  }

  const body = await request.json();
  const { data, error } = validateBody(cotizacionCreateSchema, body);
  if (error) return error;
  const { lineItems, ...cotizacionData } = data;

  // Verify the client belongs to this user/team
  const clienteOwned = await prisma.cliente.findFirst({
    where: {
      id: cotizacionData.clienteId,
      OR: [
        { equipoId: session.empresaId },
        { usuarioId: session.userId, equipoId: null },
      ],
    },
    select: { id: true },
  });
  if (!clienteOwned) {
    return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
  }

  // Generate quote number with configurable prefix
  const empresa = await prisma.empresa.findUnique({ where: { id: "default" }, select: { prefijoCotizacion: true, diasVencimiento: true, condicionesDefecto: true, condicionesTransaccional: true, condicionesContractual: true } });
  const prefijo = empresa?.prefijoCotizacion || "COT";
  const diasVencimiento = empresa?.diasVencimiento ?? 30;
  const count = await prisma.cotizacion.count({
    where: session.empresaId
      ? { OR: [{ equipoId: session.empresaId }, { usuarioId: session.userId, equipoId: null }] }
      : { usuarioId: session.userId },
  });
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
        frecuencia: (item.frecuencia as string) || null,
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
      usuarioId: session.userId,
      equipoId: session.empresaId || undefined,
      estado: "BORRADOR",
      contactoNombre: cotizacionData.contactoNombre || null,
      subtotal: Math.round(subtotal * 100) / 100,
      descuentoGlobal,
      impuesto,
      total: Math.round(total * 100) / 100,
      moneda: cotizacionData.moneda || "EUR",
      notas: cotizacionData.notas || null,
      condiciones: cotizacionData.condiciones || (() => {
        // Auto-build T&C based on line item types
        const hasRecurring = processedItems.some((li) => li.frecuencia);
        const hasOneTime = processedItems.some((li) => !li.frecuencia);
        const parts: string[] = [];
        if (hasOneTime && empresa?.condicionesTransaccional) parts.push(empresa.condicionesTransaccional);
        if (hasRecurring && empresa?.condicionesContractual) parts.push(empresa.condicionesContractual);
        if (parts.length > 0) return parts.join("\n\n---\n\n");
        return empresa?.condicionesDefecto || null;
      })(),
      fechaVencimiento: cotizacionData.fechaVencimiento
        ? new Date(cotizacionData.fechaVencimiento)
        : new Date(Date.now() + diasVencimiento * 24 * 60 * 60 * 1000),
      lineItems: { create: processedItems },
      actividades: {
        create: {
          tipo: "CREADA",
          descripcion: "Cotización creada",
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
    const teamOwnerFilter = session.empresaId
      ? { OR: [{ equipoId: session.empresaId }, { usuarioId: session.userId, equipoId: null }] }
      : { usuarioId: session.userId };
    const [reglas, allProducts] = await Promise.all([
      prisma.reglaComercial.findMany({ where: { activa: true, ...teamOwnerFilter } }),
      prisma.producto.findMany({ where: teamOwnerFilter, select: { id: true, categoriaId: true } }),
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
          descripcion: `Aprobación requerida de: ${result.aprobacionesRequeridas.map((r) => r.aprobador.nombre).join(", ")}`,
        },
      });

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
          const emailResult = await sendSystemEmail({
            to: aprob.aprobadorEmail,
            subject: `Aprobación requerida: ${numero}`,
            html,
          });
          if (emailResult.success) {
            await prisma.aprobacion.update({
              where: { id: aprob.id },
              data: { emailEnviadoAt: new Date() },
            });
          }
        } catch {
          // Email sending failure doesn't block quote creation
        }
      }
    }
  } catch {
    // Non-critical
  }

  return NextResponse.json(cotizacion, { status: 201 });
}
