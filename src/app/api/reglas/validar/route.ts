import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validarCotizacion, type ProductoCategoriaMap } from "@/lib/reglas-engine";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { lineItems, descuentoGlobal, subtotal, total } = body;

  if (!lineItems) {
    return NextResponse.json({ error: "lineItems requerido" }, { status: 400 });
  }

  const [reglas, productos] = await Promise.all([
    prisma.reglaComercial.findMany({ where: { activa: true } }),
    prisma.producto.findMany({ select: { id: true, categoriaId: true } }),
  ]);

  const catMap: ProductoCategoriaMap = {};
  for (const p of productos) {
    catMap[p.id] = p.categoriaId;
  }

  const result = validarCotizacion(
    reglas,
    { lineItems, descuentoGlobal: descuentoGlobal ?? 0, subtotal: subtotal ?? 0, total: total ?? 0 },
    catMap
  );

  return NextResponse.json(result);
}
