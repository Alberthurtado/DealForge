import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// PUT /api/contratos/[id]/documento — save edited document HTML
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { documentoHtml } = body as { documentoHtml: string };

  if (!documentoHtml || typeof documentoHtml !== "string") {
    return NextResponse.json({ error: "documentoHtml es obligatorio" }, { status: 400 });
  }

  const contrato = await prisma.contrato.findFirst({
    where: {
      id,
      ...(session.empresaId
        ? { OR: [{ equipoId: session.empresaId }, { usuarioId: session.userId, equipoId: null }] }
        : { usuarioId: session.userId }),
    },
    select: { id: true, estado: true },
  });

  if (!contrato) return NextResponse.json({ error: "Contrato no encontrado" }, { status: 404 });
  if (contrato.estado === "CANCELADO" || contrato.estado === "EXPIRADO") {
    return NextResponse.json({ error: "No se puede editar un contrato cancelado o expirado" }, { status: 400 });
  }

  await prisma.contrato.update({
    where: { id },
    data: { documentoHtml, documentoGeneradoAt: new Date() },
  });

  return NextResponse.json({ success: true });
}
