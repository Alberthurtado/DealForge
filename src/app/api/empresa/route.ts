import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { empresaUpdateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  // Get user's empresa
  const user = await prisma.usuario.findUnique({ where: { id: session.userId }, select: { empresaId: true } });
  const empresaId = user?.empresaId || "default";

  const empresa = await prisma.empresa.upsert({
    where: { id: empresaId },
    update: {},
    create: { id: empresaId },
  });
  return NextResponse.json(empresa);
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const user = await prisma.usuario.findUnique({ where: { id: session.userId }, select: { empresaId: true } });
  const empresaId = user?.empresaId || "default";

  const body = await request.json();
  const { data, error } = validateBody(empresaUpdateSchema, body);
  if (error) return error;

  const empresa = await prisma.empresa.upsert({
    where: { id: empresaId },
    update: data,
    create: { id: empresaId, ...data },
  });

  return NextResponse.json(empresa);
}
