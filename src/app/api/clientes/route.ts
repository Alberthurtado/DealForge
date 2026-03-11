import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { checkLimit } from "@/lib/plan-limits";
import { clienteCreateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const sector = searchParams.get("sector") || "";

  const where: Record<string, unknown> = { usuarioId: session.userId };
  if (search) {
    where.OR = [
      { nombre: { contains: search } },
      { email: { contains: search } },
      { ciudad: { contains: search } },
    ];
  }
  if (sector) {
    where.sector = sector;
  }

  const clientes = await prisma.cliente.findMany({
    where,
    include: {
      contactos: { where: { principal: true }, take: 1 },
      _count: { select: { cotizaciones: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(clientes);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  // ── Plan limit check (per-user) ──
  const currentClientes = await prisma.cliente.count({ where: { usuarioId: session.userId } });
  const limit = checkLimit(session.plan, "clientes", currentClientes);

  if (!limit.allowed) {
    return NextResponse.json(
      {
        error: "PLAN_LIMIT_REACHED",
        message: `Has alcanzado el límite de ${limit.limit} ${limit.resource} de tu plan ${limit.planLabel}. Mejora tu plan para crear más clientes.`,
        current: limit.current,
        limit: limit.limit,
      },
      { status: 403 }
    );
  }

  const body = await request.json();
  const { data, error } = validateBody(clienteCreateSchema, body);
  if (error) return error;
  const { contactos, ...clienteData } = data;

  const cliente = await prisma.cliente.create({
    data: {
      ...clienteData,
      usuarioId: session.userId,
      contactos: contactos?.length
        ? { create: contactos }
        : undefined,
    },
    include: { contactos: true },
  });

  return NextResponse.json(cliente, { status: 201 });
}
