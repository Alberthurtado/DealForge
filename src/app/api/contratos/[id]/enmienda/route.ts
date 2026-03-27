import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { z } from "zod";
import { validateBody } from "@/lib/validate";
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit";

const enmiendaCreateSchema = z.object({
  tipo: z.enum(["MODIFICACION", "UPSELL", "DOWNSELL", "EXTENSION", "CANCELACION"]),
  descripcion: z.string().min(1, "La descripción es requerida"),
  cambios: z.string().min(1, "Los cambios son requeridos"),
  valorNuevo: z.number().min(0),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;

  // Verify ownership
  const contrato = await prisma.contrato.findFirst({
    where: { id, usuarioId: session.userId },
    select: { id: true },
  });

  if (!contrato) {
    return NextResponse.json({ error: "Contrato no encontrado" }, { status: 404 });
  }

  const enmiendas = await prisma.enmienda.findMany({
    where: { contratoId: id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(enmiendas);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const rl = checkRateLimit(`contratos:enmienda:${session.userId}`, RATE_LIMITS.apiWrite);
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const { id } = await params;

  const contrato = await prisma.contrato.findFirst({
    where: { id, usuarioId: session.userId },
    select: { id: true, estado: true, numero: true, valorMensual: true },
  });

  if (!contrato) {
    return NextResponse.json({ error: "Contrato no encontrado" }, { status: 404 });
  }

  if (contrato.estado === "CANCELADO" || contrato.estado === "EXPIRADO") {
    return NextResponse.json(
      { error: "No se pueden crear enmiendas en un contrato cancelado o expirado" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { data, error } = validateBody(enmiendaCreateSchema, body);
  if (error) return error;

  // Auto-set valorAnterior from current contract
  const valorAnterior = contrato.valorMensual;

  const [enmienda] = await prisma.$transaction([
    prisma.enmienda.create({
      data: {
        contratoId: id,
        tipo: data.tipo,
        descripcion: data.descripcion,
        cambios: data.cambios,
        valorAnterior,
        valorNuevo: data.valorNuevo,
      },
    }),
    prisma.contratoActividad.create({
      data: {
        contratoId: id,
        tipo: "ENMIENDA",
        descripcion: `Enmienda (${data.tipo}) creada para contrato ${contrato.numero}: ${data.descripcion}`,
      },
    }),
  ]);

  return NextResponse.json(enmienda, { status: 201 });
}
