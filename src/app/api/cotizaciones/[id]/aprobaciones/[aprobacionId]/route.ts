import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; aprobacionId: string }> }
) {
  const { aprobacionId } = await params;
  const body = await request.json();

  const { estado, comentario } = body;

  if (!estado || !["APROBADA", "RECHAZADA"].includes(estado)) {
    return NextResponse.json(
      { error: "Estado debe ser APROBADA o RECHAZADA" },
      { status: 400 }
    );
  }

  const aprobacion = await prisma.aprobacion.update({
    where: { id: aprobacionId },
    data: {
      estado,
      comentario: comentario || null,
      respondidoAt: new Date(),
    },
  });

  return NextResponse.json(aprobacion);
}
