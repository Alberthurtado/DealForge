import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { checkLimit } from "@/lib/plan-limits";
import { productoCreateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const categoriaId = searchParams.get("categoriaId") || "";

  const where: Record<string, unknown> = {};
  if (search) {
    where.OR = [
      { nombre: { contains: search } },
      { sku: { contains: search } },
      { descripcion: { contains: search } },
    ];
  }
  if (categoriaId) {
    where.categoriaId = categoriaId;
  }

  const productos = await prisma.producto.findMany({
    where,
    include: {
      categoria: true,
      variantes: { where: { activo: true }, orderBy: { nombre: "asc" } },
    },
    orderBy: { nombre: "asc" },
  });

  return NextResponse.json(productos);
}

export async function POST(request: NextRequest) {
  // ── Plan limit check ──
  const session = await getSession();
  const plan = session?.plan || "starter";
  const currentProductos = await prisma.producto.count();
  const limit = checkLimit(plan, "productos", currentProductos);

  if (!limit.allowed) {
    return NextResponse.json(
      {
        error: "PLAN_LIMIT_REACHED",
        message: `Has alcanzado el limite de ${limit.limit} ${limit.resource} de tu plan ${limit.planLabel}. Mejora tu plan para crear mas productos.`,
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
