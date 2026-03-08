import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Productos",
  description: "Catalogo de productos y precios.",
};
import { ProductoTable } from "@/components/productos/producto-table";
import Link from "next/link";
import { Plus } from "lucide-react";

async function getData() {
  const [productos, categorias] = await Promise.all([
    prisma.producto.findMany({
      include: {
        categoria: true,
        variantes: { where: { activo: true }, select: { id: true, nombre: true } },
      },
      orderBy: { nombre: "asc" },
    }),
    prisma.categoria.findMany({ orderBy: { nombre: "asc" } }),
  ]);
  return { productos, categorias };
}

export default async function ProductosPage() {
  const { productos, categorias } = await getData();

  return (
    <div>
      <PageHeader
        title="Productos"
        description="Catalogo de productos y servicios"
        actions={
          <Link
            href="/productos/nuevo"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuevo Producto
          </Link>
        }
      />
      <div className="p-6">
        <ProductoTable
          productos={JSON.parse(JSON.stringify(productos))}
          categorias={JSON.parse(JSON.stringify(categorias))}
        />
      </div>
    </div>
  );
}
