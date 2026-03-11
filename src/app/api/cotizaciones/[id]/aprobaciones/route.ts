import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { aprobacionCreateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;

  // Verify cotizacion belongs to user
  const owned = await prisma.cotizacion.findFirst({ where: { id, usuarioId: session.userId }, select: { id: true } });
  if (!owned) return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });

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
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;

  // Verify cotizacion belongs to user
  const owned = await prisma.cotizacion.findFirst({ where: { id, usuarioId: session.userId }, select: { id: true } });
  if (!owned) return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });

  const bodyRaw = await request.json();
  const items = Array.isArray(bodyRaw) ? bodyRaw : [bodyRaw];

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
