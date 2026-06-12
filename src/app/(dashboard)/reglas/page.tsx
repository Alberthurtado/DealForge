import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { ReglasManager } from "@/components/reglas/reglas-manager";
import { FeatureGateBanner } from "@/components/layout/feature-gate-banner";
import { getSession } from "@/lib/auth";
import { getPlanFeatures } from "@/lib/plan-limits";
import { getDashboardLang } from "@/lib/dashboard-lang";
import { REGLAS_STRINGS } from "@/lib/reglas-i18n";

export const metadata: Metadata = {
  title: "Reglas Comerciales",
  description:
    "Gestiona límites de descuento, productos obligatorios, aprobaciones y promociones.",
};

async function getData(session: { userId: string; empresaId?: string | null }) {
  const ownerFilter = session.empresaId
    ? {
        OR: [
          { equipoId: session.empresaId },
          { usuarioId: session.userId, equipoId: null },
        ],
      }
    : { usuarioId: session.userId };
  const [reglas, productos, categorias] = await Promise.all([
    prisma.reglaComercial.findMany({
      where: { usuarioId: session.userId },
      orderBy: [{ prioridad: "desc" }, { createdAt: "desc" }],
    }),
    prisma.producto.findMany({
      where: { activo: true, usuarioId: session.userId },
      include: { categoria: true },
      orderBy: { nombre: "asc" },
    }),
    prisma.categoria.findMany({ where: ownerFilter, orderBy: { nombre: "asc" } }),
  ]);
  return { reglas, productos, categorias };
}

export default async function ReglasPage() {
  const session = await getSession();
  if (!session) return null;
  const features = getPlanFeatures(session.plan || "starter");
  const lang = await getDashboardLang(session.empresaId);
  const t = REGLAS_STRINGS[lang].page;

  if (!features.reglasComerciales) {
    return (
      <div>
        <PageHeader
          title={t.title}
          description={t.description}
        />
        <FeatureGateBanner
          feature={t.gateFeature}
          requiredPlan="Pro"
          description={t.gateDescription}
        />
      </div>
    );
  }

  const data = await getData(session);

  return (
    <div>
      <PageHeader
        title={t.title}
        description={t.description}
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
