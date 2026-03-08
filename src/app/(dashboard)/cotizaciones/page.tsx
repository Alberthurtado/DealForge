import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Cotizaciones",
  description: "Gestion de cotizaciones y pipeline de ventas.",
};
import { CotizacionTable } from "@/components/cotizaciones/cotizacion-table";
import Link from "next/link";
import { Plus } from "lucide-react";

async function getCotizaciones() {
  return prisma.cotizacion.findMany({
    include: {
      cliente: { select: { id: true, nombre: true } },
      _count: { select: { lineItems: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function CotizacionesPage() {
  const cotizaciones = await getCotizaciones();

  return (
    <div>
      <PageHeader
        title="Cotizaciones"
        description="Gestiona todas tus cotizaciones"
        actions={
          <Link
            href="/cotizaciones/nueva"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nueva Cotizacion
          </Link>
        }
      />
      <div className="p-6">
        <CotizacionTable
          cotizaciones={JSON.parse(JSON.stringify(cotizaciones))}
        />
      </div>
    </div>
  );
}
