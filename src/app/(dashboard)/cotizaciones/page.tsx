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
import { DASHBOARD_STRINGS, resolveDashboardLang } from "@/lib/dashboard-i18n";

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

  // Company language/currency for display
  const empresa = session.empresaId
    ? await prisma.empresa.findUnique({
        where: { id: session.empresaId },
        select: { locale: true, currencyCode: true },
      })
    : null;
  const lang = resolveDashboardLang(empresa?.locale);
  const currency = empresa?.currencyCode || "EUR";
  const locale = empresa?.locale || "es-ES";
  const t = DASHBOARD_STRINGS[lang].quotes;

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
        title={t.title}
        description={`${t.description}${limits.cotizacionesMes > 0 ? ` (${cotizacionesMes}/${limits.cotizacionesMes} ${t.thisMonthSuffix})` : ""}`}
        actions={
          limitReached ? (
            <Link
              href="/configuracion"
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
            >
              {t.upgradePlan}
            </Link>
          ) : (
            <Link
              href="/cotizaciones/nueva"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              {t.newQuote}
            </Link>
          )
        }
      />
      {limitReached && (
        <UpgradeBanner
          resource={t.upgradeResource}
          current={cotizacionesMes}
          limit={limits.cotizacionesMes}
          plan={planLabel}
        />
      )}
      <div className="p-6">
        <CotizacionTable
          cotizaciones={JSON.parse(JSON.stringify(cotizaciones))}
          lang={lang}
          currency={currency}
          locale={locale}
        />
      </div>
    </div>
  );
}
