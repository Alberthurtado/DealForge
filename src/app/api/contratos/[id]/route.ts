import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { z } from "zod";
import { validateBody } from "@/lib/validate";
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit";

const contratoUpdateSchema = z.object({
  condiciones: z.string().optional(),
  clausulaCancelacion: z.string().optional(),
  renovacionAutomatica: z.boolean().optional(),
  diasAvisoRenovacion: z.number().int().min(1).max(365).optional(),
  periodoPreaviso: z.number().int().min(0).max(365).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;

  const contrato = await prisma.contrato.findFirst({
    where: { id, usuarioId: session.userId },
    include: {
      cliente: { select: { id: true, nombre: true, email: true } },
      cotizacion: { select: { id: true, numero: true, total: true, moneda: true } },
      lineItems: { orderBy: { orden: "asc" } },
      enmiendas: { orderBy: { createdAt: "desc" } },
      actividades: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!contrato) {
    return NextResponse.json({ error: "Contrato no encontrado" }, { status: 404 });
  }

  return NextResponse.json(contrato);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const rl = checkRateLimit(`contratos:update:${session.userId}`, RATE_LIMITS.apiWrite);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const { id } = await params;

  const contrato = await prisma.contrato.findFirst({
    where: { id, usuarioId: session.userId },
    select: { id: true, estado: true },
  });

  if (!contrato) {
    return NextResponse.json({ error: "Contrato no encontrado" }, { status: 404 });
  }

  if (contrato.estado === "CANCELADO" || contrato.estado === "EXPIRADO") {
    return NextResponse.json(
      { error: "No se puede editar un contrato cancelado o expirado" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { data, error } = validateBody(contratoUpdateSchema, body);
  if (error) return error;

  const updated = await prisma.contrato.update({
    where: { id },
    data,
    include: {
      cliente: { select: { id: true, nombre: true, email: true } },
      cotizacion: { select: { id: true, numero: true, total: true, moneda: true } },
      lineItems: { orderBy: { orden: "asc" } },
      enmiendas: { orderBy: { createdAt: "desc" } },
      actividades: { orderBy: { createdAt: "desc" } },
    },
  });

  return NextResponse.json(updated);
}
