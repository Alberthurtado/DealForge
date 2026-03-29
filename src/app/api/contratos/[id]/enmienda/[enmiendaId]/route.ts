import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; enmiendaId: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id, enmiendaId } = await params;
  const body = await request.json();
  const { estado } = body as { estado: string };

  if (!["ACEPTADA", "RECHAZADA"].includes(estado)) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  }

  // Verify ownership
  const contrato = await prisma.contrato.findFirst({
    where: { id, usuarioId: session.userId },
    select: { id: true, numero: true },
  });
  if (!contrato) return NextResponse.json({ error: "Contrato no encontrado" }, { status: 404 });

  const enmienda = await prisma.enmienda.findFirst({
    where: { id: enmiendaId, contratoId: id },
  });
  if (!enmienda) return NextResponse.json({ error: "Enmienda no encontrada" }, { status: 404 });
  if (enmienda.estado !== "PENDIENTE") {
    return NextResponse.json({ error: "La enmienda ya fue procesada" }, { status: 400 });
  }

  // If accepted: update enmienda + update contract valorMensual + log activity
  if (estado === "ACEPTADA") {
    await prisma.$transaction([
      prisma.enmienda.update({
        where: { id: enmiendaId },
        data: { estado: "ACEPTADA" },
      }),
      prisma.contrato.update({
        where: { id },
        data: { valorMensual: enmienda.valorNuevo },
      }),
      prisma.contratoActividad.create({
        data: {
          contratoId: id,
          tipo: "ACTUALIZACION",
          descripcion: `Enmienda (${enmienda.tipo}) aceptada: ${enmienda.descripcion}. Nuevo valor: €${enmienda.valorNuevo.toFixed(2)}`,
        },
      }),
    ]);
  } else {
    // Rejected: just update status + log
    await prisma.$transaction([
      prisma.enmienda.update({
        where: { id: enmiendaId },
        data: { estado: "RECHAZADA" },
      }),
      prisma.contratoActividad.create({
        data: {
          contratoId: id,
          tipo: "ACTUALIZACION",
          descripcion: `Enmienda (${enmienda.tipo}) rechazada: ${enmienda.descripcion}`,
        },
      }),
    ]);
  }

  return NextResponse.json({ ok: true });
}
