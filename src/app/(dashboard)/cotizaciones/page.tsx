import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { UpgradeBanner } from "@/components/layout/upgrade-banner";
import { getSession } from "@/lib/auth";
import { getPlanLimits } from "@/lib/plan-limits";

export const metadata: Metadata = {
  title: "Cotizaciones",
  description: "Gestión de cotizaciones y pipeline de ventas.",
};
import { CotizacionTable } from "@/components/cotizaciones/cotizacion-table";
import Link from "next/link";
import { Plus } from "lucide-react";

async function getCotizaciones(userId: string) {
  return prisma.cotizacion.findMany({
    where: { usuarioId: userId },
    include: {
      cliente: { select: { id: true, nombre: true } },
      _count: { select: { lineItems: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function CotizacionesPage() {
  const session = await getSession();
  if (!session) return null;
  const cotizaciones = await getCotizaciones(session.userId);
  const plan = session?.plan || "starter";
  const limits = getPlanLimits(plan);
  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  // Count cotizaciones created this month
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const cotizacionesMes = cotizaciones.filter(
    (c) => new Date(c.createdAt) >= startOfMonth
  ).length;
  const limitReached =
    limits.cotizacionesMes > 0 && cotizacionesMes >= limits.cotizacionesMes;

  return (
    <div>
      <PageHeader
        title="Cotizaciones"
        description={`Gestiona todas tus cotizaciones${limits.cotizacionesMes > 0 ? ` (${cotizacionesMes}/${limits.cotizacionesMes} este mes)` : ""}`}
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
              href="/cotizaciones/nueva"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nueva Cotización
            </Link>
          )
        }
      />
      {limitReached && (
        <UpgradeBanner
          resource="cotizaciones este mes"
          current={cotizacionesMes}
          limit={limits.cotizacionesMes}
          plan={planLabel}
        />
      )}
      <div className="p-6">
        <CotizacionTable
          cotizaciones={JSON.parse(JSON.stringify(cotizaciones))}
        />
      </div>
    </div>
  );
}
