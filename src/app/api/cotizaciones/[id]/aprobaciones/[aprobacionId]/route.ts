import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; aprobacionId: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id, aprobacionId } = await params;
  const body = await request.json();

  // Verify the cotizacion belongs to this user
  const cotizacion = await prisma.cotizacion.findFirst({
    where: { id, usuarioId: session.userId },
    select: { id: true },
  });
  if (!cotizacion) {
    return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });
  }

  const { estado, comentario } = body;

  if (!estado || !["APROBADA", "RECHAZADA"].includes(estado)) {
    return NextResponse.json(
      { error: "Estado debe ser APROBADA o RECHAZADA" },
      { status: 400 }
    );
  }

  const aprobacion = await prisma.aprobacion.update({
    where: { id: aprobacionId, cotizacionId: id },
    data: {
      estado,
      comentario: comentario || null,
      respondidoAt: new Date(),
    },
  });

  return NextResponse.json(aprobacion);
}
