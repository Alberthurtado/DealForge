import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { empresaUpdateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const empresaId = session.empresaId;
  const empresa = await prisma.empresa.findUnique({ where: { id: empresaId } });
  if (!empresa) return NextResponse.json({ error: "Empresa no encontrada" }, { status: 404 });

  return NextResponse.json(empresa);
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const body = await request.json();
  const { data, error } = validateBody(empresaUpdateSchema, body);
  if (error) return error;

  const empresa = await prisma.empresa.update({ where: { id: session.empresaId }, data });

  return NextResponse.json(empresa);
}
