import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { reglaCreateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";
import { getSession } from "@/lib/auth";
import { getPlanFeatures, planFeatureResponse } from "@/lib/plan-limits";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  if (!getPlanFeatures(session.plan).reglasComerciales) {
    return planFeatureResponse("reglasComerciales");
  }

  const { searchParams } = new URL(request.url);
  const tipo = searchParams.get("tipo");
  const activa = searchParams.get("activa");

  const ownerFilter = session.empresaId
    ? { OR: [{ equipoId: session.empresaId }, { usuarioId: session.userId, equipoId: null }] }
    : { usuarioId: session.userId };

  const andClauses: Record<string, unknown>[] = [ownerFilter as Record<string, unknown>];
  if (tipo) andClauses.push({ tipo });
  if (activa !== null) andClauses.push({ activa: activa === "true" });
  const where = andClauses.length === 1 ? andClauses[0] : { AND: andClauses };

  const reglas = await prisma.reglaComercial.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    orderBy: [{ prioridad: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(reglas);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  if (!getPlanFeatures(session.plan).reglasComerciales) {
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
      usuarioId: session.userId,
      equipoId: session.empresaId || undefined,
    },
  });

  return NextResponse.json(regla, { status: 201 });
}
