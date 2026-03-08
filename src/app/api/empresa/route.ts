import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

  // Only allow known fields
  const allowed = [
    "nombre", "cif", "email", "telefono", "direccion",
    "ciudad", "pais", "web", "logoUrl", "plantillaPdf", "colorPrimario",
    "prefijoCotizacion", "diasVencimiento", "condicionesDefecto",
    "smtpHost", "smtpPort", "smtpUser", "smtpPass", "smtpSecure",
  ];
  const data: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) {
      data[key] = body[key];
    }
  }

  const empresa = await prisma.empresa.upsert({
    where: { id: "default" },
    update: data,
    create: { id: "default", ...data },
  });

  return NextResponse.json(empresa);
}
