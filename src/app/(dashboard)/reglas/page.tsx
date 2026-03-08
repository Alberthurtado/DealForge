import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { ReglasManager } from "@/components/reglas/reglas-manager";

export const metadata: Metadata = {
  title: "Reglas Comerciales",
  description:
    "Gestiona limites de descuento, productos obligatorios, aprobaciones y promociones.",
};

async function getData() {
  const [reglas, productos, categorias] = await Promise.all([
    prisma.reglaComercial.findMany({
      orderBy: [{ prioridad: "desc" }, { createdAt: "desc" }],
    }),
    prisma.producto.findMany({
      include: { categoria: true },
      where: { activo: true },
      orderBy: { nombre: "asc" },
    }),
    prisma.categoria.findMany({ orderBy: { nombre: "asc" } }),
  ]);
  return { reglas, productos, categorias };
}

export default async function ReglasPage() {
  const data = await getData();

  return (
    <div>
      <PageHeader
        title="Reglas Comerciales"
        description="Limites, productos obligatorios, aprobaciones y promociones"
      />
      <div className="p-6">
        <ReglasManager
          initialReglas={JSON.parse(JSON.stringify(data.reglas))}
          productos={JSON.parse(JSON.stringify(data.productos))}
          categorias={JSON.parse(JSON.stringify(data.categorias))}
        />
      </div>
    </div>
  );
}
