import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { aprobacionCreateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

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
  const bodyRaw = await request.json();

  // body can be a single approval or array
  const items = Array.isArray(bodyRaw) ? bodyRaw : [bodyRaw];

  // Validate each item individually
  const validatedItems = [];
  for (const item of items) {
    const { data, error } = validateBody(aprobacionCreateSchema, item);
    if (error) return error;
    validatedItems.push(data);
  }

  const created = await Promise.all(
    validatedItems.map((item) =>
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
