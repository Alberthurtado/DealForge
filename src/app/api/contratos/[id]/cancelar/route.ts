import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { z } from "zod";
import { validateBody } from "@/lib/validate";
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit";

const cancelarSchema = z.object({
  motivoCancelacion: z.string().min(1, "El motivo de cancelación es requerido"),
  fechaEfectiva: z.string().optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const rl = checkRateLimit(`contratos:cancel:${session.userId}`, RATE_LIMITS.apiWrite);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const { id } = await params;

  const contrato = await prisma.contrato.findFirst({
    where: { id, usuarioId: session.userId },
    select: { id: true, estado: true, numero: true },
  });

  if (!contrato) {
    return NextResponse.json({ error: "Contrato no encontrado" }, { status: 404 });
  }

  if (contrato.estado === "CANCELADO") {
    return NextResponse.json({ error: "El contrato ya está cancelado" }, { status: 400 });
  }

  if (contrato.estado === "EXPIRADO") {
    return NextResponse.json({ error: "No se puede cancelar un contrato expirado" }, { status: 400 });
  }

  const body = await request.json();
  const { data, error } = validateBody(cancelarSchema, body);
  if (error) return error;

  const canceladoAt = data.fechaEfectiva ? new Date(data.fechaEfectiva) : new Date();

  const updated = await prisma.contrato.update({
    where: { id },
    data: {
      estado: "CANCELADO",
      canceladoAt,
      motivoCancelacion: data.motivoCancelacion,
      actividades: {
        create: {
          tipo: "CANCELADO",
          descripcion: `Contrato ${contrato.numero} cancelado. Motivo: ${data.motivoCancelacion}`,
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
