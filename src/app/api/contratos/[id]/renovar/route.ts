import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { z } from "zod";
import { validateBody } from "@/lib/validate";
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit";

const renovarSchema = z.object({
  duracionMeses: z.number().int().min(1).max(120).optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const rl = checkRateLimit(`contratos:renew:${session.userId}`, RATE_LIMITS.apiWrite);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const { id } = await params;

  const contrato = await prisma.contrato.findFirst({
    where: { id, usuarioId: session.userId },
    select: { id: true, estado: true, numero: true, fechaFin: true, duracionMeses: true, valorMensual: true },
  });

  if (!contrato) {
    return NextResponse.json({ error: "Contrato no encontrado" }, { status: 404 });
  }

  if (contrato.estado === "CANCELADO" || contrato.estado === "EXPIRADO") {
    return NextResponse.json(
      { error: "No se puede renovar un contrato cancelado o expirado" },
      { status: 400 }
    );
  }

  if (contrato.estado !== "ACTIVO" && contrato.estado !== "PENDIENTE_RENOVACION") {
    return NextResponse.json(
      { error: "Solo se pueden renovar contratos activos o pendientes de renovación" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { data, error } = validateBody(renovarSchema, body);
  if (error) return error;

  const duracion = data.duracionMeses || contrato.duracionMeses;

  // Extend fechaFin by duracionMeses months from current fechaFin
  const nuevaFechaFin = new Date(contrato.fechaFin);
  nuevaFechaFin.setMonth(nuevaFechaFin.getMonth() + duracion);

  const nuevoValorTotal = Math.round(contrato.valorMensual * duracion * 100) / 100;

  const updated = await prisma.contrato.update({
    where: { id },
    data: {
      estado: "ACTIVO",
      fechaFin: nuevaFechaFin,
      duracionMeses: duracion,
      valorTotal: nuevoValorTotal,
      actividades: {
        create: {
          tipo: "RENOVADO",
          descripcion: `Contrato ${contrato.numero} renovado por ${duracion} meses. Nueva fecha de fin: ${nuevaFechaFin.toISOString().split("T")[0]}`,
        },
      },
    },
    include: {
      cliente: { select: { id: true, nombre: true } },
      actividades: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  return NextResponse.json(updated);
}
