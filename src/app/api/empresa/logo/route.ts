import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("logo") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No se recibio archivo" }, { status: 400 });
  }

  // Validate file type
  const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Tipo de archivo no permitido. Usa PNG, JPG, SVG o WebP." },
      { status: 400 }
    );
  }

  // Max 500KB (plenty for a logo)
  if (file.size > 500 * 1024) {
    return NextResponse.json(
      { error: "El archivo es demasiado grande. Maximo 500KB para logos." },
      { status: 400 }
    );
  }

  // Convert to base64 data URL — works on Vercel (no filesystem needed)
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const logoUrl = `data:${file.type};base64,${base64}`;

  await prisma.empresa.upsert({
    where: { id: "default" },
    update: { logoUrl },
    create: { id: "default", logoUrl },
  });

  return NextResponse.json({ logoUrl });
}
