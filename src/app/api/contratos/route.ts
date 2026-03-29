import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { z } from "zod";
import { validateBody } from "@/lib/validate";
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit";

const ALLOWED_PLANS = ["business", "enterprise"];

const contratoCreateSchema = z.object({
  cotizacionId: z.string().min(1, "cotizacionId es requerido"),
  fechaInicio: z.string().min(1, "fechaInicio es requerida"),
  duracionMeses: z.number().int().min(1).max(120).default(12),
  renovacionAutomatica: z.boolean().default(false),
  diasAvisoRenovacion: z.number().int().min(1).max(365).default(30),
  condiciones: z.string().optional(),
  clausulaCancelacion: z.string().optional(),
  periodoPreaviso: z.number().int().min(0).max(365).default(30),
  lineItems: z
    .array(
      z.object({
        descripcion: z.string().min(1),
        cantidad: z.number().min(0).default(1),
        precioUnitario: z.number().min(0),
        frecuencia: z.enum(["MENSUAL", "TRIMESTRAL", "ANUAL", "UNICO"]).default("MENSUAL"),
        total: z.number().min(0),
      })
    )
    .optional()
    .default([]),
});

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const estado = searchParams.get("estado") || "";
  const clienteId = searchParams.get("clienteId") || "";
  const proximoVencimiento = searchParams.get("proximoVencimiento") || "";

  const ownerFilter = session.empresaId
    ? { OR: [{ equipoId: session.empresaId }, { usuarioId: session.userId, equipoId: null }] }
    : { usuarioId: session.userId };

  const andClauses: Record<string, unknown>[] = [ownerFilter as Record<string, unknown>];
  if (estado) andClauses.push({ estado });
  if (clienteId) andClauses.push({ clienteId });

  if (proximoVencimiento) {
    const dias = parseInt(proximoVencimiento, 10);
    if (!isNaN(dias) && dias > 0) {
      const now = new Date();
      const futureDate = new Date(now.getTime() + dias * 24 * 60 * 60 * 1000);
      andClauses.push({ fechaFin: { gte: now, lte: futureDate } });
    }
  }

  const where = andClauses.length === 1 ? andClauses[0] : { AND: andClauses };

  const contratos = await prisma.contrato.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    include: {
      cliente: { select: { id: true, nombre: true } },
      _count: { select: { lineItems: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(contratos);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  // Plan gating: only business and enterprise
  if (!ALLOWED_PLANS.includes(session.plan)) {
    return NextResponse.json(
      {
        error: "PLAN_NOT_ALLOWED",
        message:
          "La gestión de contratos está disponible en los planes Business y Enterprise. Mejora tu plan para acceder a esta funcionalidad.",
      },
      { status: 403 }
    );
  }

  // Rate limiting
  const rl = checkRateLimit(`contratos:create:${session.userId}`, RATE_LIMITS.apiWrite);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const body = await request.json();
  const { data, error } = validateBody(contratoCreateSchema, body);
  if (error) return error;

  // Verify cotización belongs to user/team and is GANADA
  const cotizacion = await prisma.cotizacion.findFirst({
    where: {
      id: data.cotizacionId,
      OR: [
        { equipoId: session.empresaId },
        { usuarioId: session.userId, equipoId: null },
      ],
    },
    select: {
      id: true, estado: true, clienteId: true, moneda: true, condiciones: true,
      lineItems: {
        select: { descripcion: true, cantidad: true, precioUnitario: true, frecuencia: true, total: true, orden: true },
        orderBy: { orden: "asc" },
      },
    },
  });

  if (!cotizacion) {
    return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });
  }

  if (cotizacion.estado !== "GANADA") {
    return NextResponse.json(
      { error: "Solo se pueden crear contratos a partir de cotizaciones con estado GANADA" },
      { status: 400 }
    );
  }

  // Auto-populate lineItems from quote if not provided
  if (!data.lineItems || data.lineItems.length === 0) {
    data.lineItems = cotizacion.lineItems.map((li) => ({
      descripcion: li.descripcion,
      cantidad: li.cantidad,
      precioUnitario: li.precioUnitario,
      frecuencia: (li.frecuencia as "MENSUAL" | "TRIMESTRAL" | "ANUAL" | "UNICO") || "UNICO",
      total: li.total,
    }));
  }

  // Auto-populate condiciones: quote → empresa.condicionesContractual → empty
  if (!data.condiciones) {
    if (cotizacion.condiciones) {
      data.condiciones = cotizacion.condiciones;
    } else if (session.empresaId) {
      const empresa = await prisma.empresa.findUnique({
        where: { id: session.empresaId },
        select: { condicionesContractual: true },
      });
      if (empresa?.condicionesContractual) {
        data.condiciones = empresa.condicionesContractual;
      }
    }
  }

  // Generate contract number: CTR-{YEAR}-{SEQUENCE}
  const count = await prisma.contrato.count({
    where: session.empresaId
      ? { OR: [{ equipoId: session.empresaId }, { usuarioId: session.userId, equipoId: null }] }
      : { usuarioId: session.userId },
  });
  const numero = `CTR-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, "0")}`;

  // Calculate values from line items
  let valorMensual = 0;
  let valorTotal = 0;
  const processedItems = data.lineItems.map(
    (item: { descripcion: string; cantidad: number; precioUnitario: number; frecuencia: string; total: number }, index: number) => {
      const lineTotal = item.cantidad * item.precioUnitario;

      // Calculate monthly equivalent based on frequency
      switch (item.frecuencia) {
        case "MENSUAL":
          valorMensual += lineTotal;
          break;
        case "TRIMESTRAL":
          valorMensual += lineTotal / 3;
          break;
        case "ANUAL":
          valorMensual += lineTotal / 12;
          break;
        case "UNICO":
          // One-time items don't contribute to monthly value
          break;
      }

      valorTotal += item.total;

      return {
        descripcion: item.descripcion,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
        frecuencia: item.frecuencia,
        total: Math.round(item.total * 100) / 100,
        orden: index,
      };
    }
  );

  valorMensual = Math.round(valorMensual * 100) / 100;
  valorTotal = Math.round(valorMensual * data.duracionMeses * 100) / 100;

  // Calculate fechaFin
  const fechaInicio = new Date(data.fechaInicio);
  const fechaFin = new Date(fechaInicio);
  fechaFin.setMonth(fechaFin.getMonth() + data.duracionMeses);

  const contrato = await prisma.contrato.create({
    data: {
      numero,
      cotizacionId: data.cotizacionId,
      clienteId: cotizacion.clienteId,
      usuarioId: session.userId,
      equipoId: session.empresaId || undefined,
      estado: "ACTIVO",
      fechaInicio,
      fechaFin,
      duracionMeses: data.duracionMeses,
      renovacionAutomatica: data.renovacionAutomatica,
      diasAvisoRenovacion: data.diasAvisoRenovacion,
      valorMensual,
      valorTotal,
      moneda: cotizacion.moneda,
      condiciones: data.condiciones || null,
      clausulaCancelacion: data.clausulaCancelacion || null,
      periodoPreaviso: data.periodoPreaviso,
      lineItems: { create: processedItems },
      actividades: {
        create: {
          tipo: "CREADO",
          descripcion: `Contrato ${numero} creado a partir de cotización`,
        },
      },
    },
    include: {
      cliente: { select: { id: true, nombre: true } },
      lineItems: { orderBy: { orden: "asc" } },
    },
  });

  return NextResponse.json(contrato, { status: 201 });
}
