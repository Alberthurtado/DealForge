import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const aprobaciones = await prisma.aprobacion.findMany({
    where: { cotizacionId: id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(aprobaciones);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  // body can be a single approval or array
  const items = Array.isArray(body) ? body : [body];

  const created = await Promise.all(
    items.map((item: { reglaId: string; aprobadorNombre: string; aprobadorEmail: string }) =>
      prisma.aprobacion.create({
        data: {
          cotizacionId: id,
          reglaId: item.reglaId,
          aprobadorNombre: item.aprobadorNombre,
          aprobadorEmail: item.aprobadorEmail,
        },
      })
    )
  );

  return NextResponse.json(created, { status: 201 });
}
