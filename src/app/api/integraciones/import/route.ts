import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const tipo = formData.get("tipo") as string;

  if (!file || !tipo || !["clientes", "productos"].includes(tipo)) {
    return NextResponse.json({ error: "Archivo y tipo requeridos" }, { status: 400 });
  }

  const text = await file.text();
  const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
  const rows = parsed.data as Record<string, string>[];

  if (rows.length === 0) {
    return NextResponse.json({ created: 0, skipped: 0, errors: ["El archivo esta vacio"] });
  }

  let created = 0;
  let updated = 0;
  const errors: string[] = [];

  if (tipo === "clientes") {
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const nombre = row.nombre?.trim();
      if (!nombre) {
        errors.push(`Fila ${i + 2}: campo 'nombre' es obligatorio`);
        continue;
      }

      const data = {
        nombre,
        email: row.email?.trim() || null,
        telefono: row.telefono?.trim() || null,
        direccion: row.direccion?.trim() || null,
        ciudad: row.ciudad?.trim() || null,
        pais: row.pais?.trim() || null,
        sector: row.sector?.trim() || null,
        ruc: row.cif?.trim() || null,
        notas: row.notas?.trim() || null,
      };

      try {
        // Check for existing by name
        const existing = await prisma.cliente.findFirst({ where: { nombre } });
        if (existing) {
          await prisma.cliente.update({ where: { id: existing.id }, data });
          updated++;
        } else {
          const contactoNombre = row.contacto_principal_nombre?.trim();
          await prisma.cliente.create({
            data: {
              ...data,
              contactos: contactoNombre
                ? {
                    create: {
                      nombre: contactoNombre,
                      email: row.contacto_principal_email?.trim() || null,
                      cargo: row.contacto_principal_cargo?.trim() || null,
                      telefono: row.contacto_principal_telefono?.trim() || null,
                      principal: true,
                    },
                  }
                : undefined,
            },
          });
          created++;
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Error desconocido";
        errors.push(`Fila ${i + 2} (${nombre}): ${msg}`);
      }
    }
  } else if (tipo === "productos") {
    // Ensure categories exist
    const categoriaCache = new Map<string, string>();

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const nombre = row.nombre?.trim();
      const sku = row.sku?.trim();
      if (!nombre || !sku) {
        errors.push(`Fila ${i + 2}: campos 'nombre' y 'sku' son obligatorios`);
        continue;
      }

      try {
        // Resolve category
        let categoriaId: string | null = null;
        const catName = row.categoria?.trim();
        if (catName) {
          if (categoriaCache.has(catName)) {
            categoriaId = categoriaCache.get(catName)!;
          } else {
            const cat = await prisma.categoria.upsert({
              where: { nombre: catName },
              update: {},
              create: { nombre: catName },
            });
            categoriaId = cat.id;
            categoriaCache.set(catName, cat.id);
          }
        }

        const data = {
          nombre,
          descripcion: row.descripcion?.trim() || null,
          precioBase: parseFloat(row.precio_base) || 0,
          unidad: row.unidad?.trim() || "unidad",
          categoriaId,
          activo: row.activo?.toLowerCase() !== "no",
        };

        // Check for existing by SKU
        const existing = await prisma.producto.findFirst({ where: { sku } });
        if (existing) {
          await prisma.producto.update({ where: { id: existing.id }, data });
          updated++;
        } else {
          await prisma.producto.create({ data: { ...data, sku } });
          created++;
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Error desconocido";
        errors.push(`Fila ${i + 2} (${nombre}): ${msg}`);
      }
    }
  }

  return NextResponse.json({ created, updated, errors });
}
