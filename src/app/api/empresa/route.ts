import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { empresaUpdateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

export async function GET() {
  const empresa = await prisma.empresa.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  });
  return NextResponse.json(empresa);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { data, error } = validateBody(empresaUpdateSchema, body);
  if (error) return error;

  const empresa = await prisma.empresa.upsert({
    where: { id: "default" },
    update: data,
    create: { id: "default", ...data },
  });

  return NextResponse.json(empresa);
}
