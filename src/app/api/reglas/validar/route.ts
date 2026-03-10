import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { validarCotizacion, type ProductoCategoriaMap } from "@/lib/reglas-engine";
import { reglasValidarSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";
import { getSession } from "@/lib/auth";
import { getPlanFeatures } from "@/lib/plan-limits";

export async function POST(request: NextRequest) {
  // Plan check: rules require at least Pro
  const session = await getSession();
  if (session && !getPlanFeatures(session.plan).reglasComerciales) {
    // Return "valid" result for plans without rules — no rules to check
    return NextResponse.json({ valido: true, violaciones: [], aprobacionesRequeridas: [], promocionesAplicables: [] });
  }

  const body = await request.json();
  const { data, error } = validateBody(reglasValidarSchema, body);
  if (error) return error;

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
    { lineItems: data.lineItems, descuentoGlobal: data.descuentoGlobal, subtotal: data.subtotal, total: data.total },
    catMap
  );

  return NextResponse.json(result);
}
