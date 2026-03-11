import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validarCotizacion, type ProductoCategoriaMap } from "@/lib/reglas-engine";
import { reglasValidarSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";
import { getSession } from "@/lib/auth";
import { getPlanFeatures } from "@/lib/plan-limits";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  if (!getPlanFeatures(session.plan).reglasComerciales) {
    return NextResponse.json({ valido: true, violaciones: [], aprobacionesRequeridas: [], promocionesAplicables: [] });
  }

  const body = await request.json();
  const { data, error } = validateBody(reglasValidarSchema, body);
  if (error) return error;

  const [reglas, productos] = await Promise.all([
    prisma.reglaComercial.findMany({ where: { activa: true, usuarioId: session.userId } }),
    prisma.producto.findMany({ where: { usuarioId: session.userId }, select: { id: true, categoriaId: true } }),
  ]);

  const catMap: ProductoCategoriaMap = {};
  for (const p of productos) catMap[p.id] = p.categoriaId;

  const result = validarCotizacion(
    reglas,
    { lineItems: data.lineItems, descuentoGlobal: data.descuentoGlobal, subtotal: data.subtotal, total: data.total },
    catMap
  );

  return NextResponse.json(result);
}
