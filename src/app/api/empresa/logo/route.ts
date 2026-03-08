import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

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

  // Max 2MB
  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json(
      { error: "El archivo es demasiado grande. Maximo 2MB." },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.name.split(".").pop() || "png";
  const filename = `logo-${Date.now()}.${ext}`;
  const uploadPath = path.join(process.cwd(), "public", "uploads", filename);

  await writeFile(uploadPath, buffer);

  const logoUrl = `/uploads/${filename}`;

  await prisma.empresa.upsert({
    where: { id: "default" },
    update: { logoUrl },
    create: { id: "default", logoUrl },
  });

  return NextResponse.json({ logoUrl });
}
