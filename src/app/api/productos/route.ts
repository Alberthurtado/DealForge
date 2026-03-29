import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { checkLimit } from "@/lib/plan-limits";
import { productoCreateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const categoriaId = searchParams.get("categoriaId") || "";

  const ownerFilter = session.empresaId
    ? { OR: [{ equipoId: session.empresaId }, { usuarioId: session.userId, equipoId: null }] }
    : { usuarioId: session.userId };

  const andClauses: Record<string, unknown>[] = [ownerFilter as Record<string, unknown>];
  if (search) {
    andClauses.push({
      OR: [
        { nombre: { contains: search } },
        { sku: { contains: search } },
        { descripcion: { contains: search } },
      ],
    });
  }
  if (categoriaId) {
    andClauses.push({ categoriaId });
  }
  const where = andClauses.length === 1 ? andClauses[0] : { AND: andClauses };

  const productos = await prisma.producto.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    include: {
      categoria: true,
      variantes: { where: { activo: true }, orderBy: { nombre: "asc" } },
    },
    orderBy: { nombre: "asc" },
  });

  return NextResponse.json(productos);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  // ── Plan limit check (team-aware) ──
  const currentProductos = await prisma.producto.count({
    where: session.empresaId
      ? { OR: [{ equipoId: session.empresaId }, { usuarioId: session.userId, equipoId: null }] }
      : { usuarioId: session.userId },
  });
  const limit = checkLimit(session.plan, "productos", currentProductos);

  if (!limit.allowed) {
    return NextResponse.json(
      {
        error: "PLAN_LIMIT_REACHED",
        message: `Has alcanzado el límite de ${limit.limit} ${limit.resource} de tu plan ${limit.planLabel}. Mejora tu plan para crear más productos.`,
        current: limit.current,
        limit: limit.limit,
      },
      { status: 403 }
    );
  }

  const body = await request.json();
  const { data, error } = validateBody(productoCreateSchema, body);
  if (error) return error;
  const { variantes, ...productoData } = data;

  const producto = await prisma.producto.create({
    data: {
      ...productoData,
      usuarioId: session.userId,
      equipoId: session.empresaId || undefined,
      variantes: variantes?.length
        ? { create: variantes }
        : undefined,
    },
    include: {
      categoria: true,
      variantes: { orderBy: { nombre: "asc" } },
    },
  });
  return NextResponse.json(producto, { status: 201 });
}
