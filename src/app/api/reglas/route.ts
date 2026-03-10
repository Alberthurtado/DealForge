import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { reglaCreateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";
import { getSession } from "@/lib/auth";
import { getPlanFeatures, planFeatureResponse } from "@/lib/plan-limits";

export async function GET(request: NextRequest) {
  // Plan check: reglas require at least Pro
  const session = await getSession();
  if (session && !getPlanFeatures(session.plan).reglasComerciales) {
    return planFeatureResponse("reglasComerciales");
  }

  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get("tipo");
  const activa = searchParams.get("activa");

  const where: Record<string, unknown> = {};
  if (tipo) where.tipo = tipo;
  if (activa !== null) where.activa = activa === "true";

  const reglas = await prisma.reglaComercial.findMany({
    where,
    orderBy: [{ prioridad: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(reglas);
}

export async function POST(request: NextRequest) {
  // Plan check: reglas require at least Pro
  const session = await getSession();
  if (session && !getPlanFeatures(session.plan).reglasComerciales) {
    return planFeatureResponse("reglasComerciales");
  }

  const body = await request.json();
  const { data, error } = validateBody(reglaCreateSchema, body);
  if (error) return error;

  const regla = await prisma.reglaComercial.create({
    data: {
      nombre: data.nombre,
      tipo: data.tipo,
      configuracion: typeof data.configuracion === "string" ? data.configuracion : JSON.stringify(data.configuracion),
      activa: data.activa,
      prioridad: data.prioridad,
    },
  });

  return NextResponse.json(regla, { status: 201 });
}
