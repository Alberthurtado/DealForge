import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { UpgradeBanner } from "@/components/layout/upgrade-banner";
import { getSession } from "@/lib/auth";
import { getPlanLimits } from "@/lib/plan-limits";

export const metadata: Metadata = {
  title: "Productos",
  description: "Catálogo de productos y precios.",
};
import { ProductoTable } from "@/components/productos/producto-table";
import Link from "next/link";
import { Plus } from "lucide-react";

async function getData(userId: string) {
  const [productos, categorias] = await Promise.all([
    prisma.producto.findMany({
      where: { usuarioId: userId },
      include: {
        categoria: true,
        variantes: { where: { activo: true }, select: { id: true, nombre: true } },
      },
      orderBy: { createdAt: "asc" },
    }),
    prisma.categoria.findMany({ orderBy: { nombre: "asc" } }),
  ]);
  return { productos, categorias };
}

export default async function ProductosPage() {
  const session = await getSession();
  if (!session) return null;
  const { productos, categorias } = await getData(session.userId);
  const plan = session?.plan || "starter";
  const limits = getPlanLimits(plan);
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);
  const totalProductos = productos.length;
  const limitReached = limits.productos > 0 && totalProductos >= limits.productos;

  return (
    <div>
      <PageHeader
        title="Productos"
        description={`Catálogo de productos y servicios${limits.productos > 0 ? ` (${totalProductos}/${limits.productos})` : ""}`}
        actions={
          limitReached ? (
            <Link
              href="/configuracion"
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
            >
              Mejorar plan
            </Link>
          ) : (
            <Link
              href="/productos/nuevo"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nuevo Producto
            </Link>
          )
        }
      />
      {limitReached && (
        <UpgradeBanner
          resource="productos"
          current={totalProductos}
          limit={limits.productos}
          plan={planLabel}
        />
      )}
      <div className="p-6">
        <ProductoTable
          productos={JSON.parse(JSON.stringify(productos))}
          categorias={JSON.parse(JSON.stringify(categorias))}
          maxVisible={limits.productos > 0 ? limits.productos : undefined}
        />
      </div>
    </div>
  );
}
