import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { ReglasManager } from "@/components/reglas/reglas-manager";
import { FeatureGateBanner } from "@/components/layout/feature-gate-banner";
import { getSession } from "@/lib/auth";
import { getPlanFeatures } from "@/lib/plan-limits";

export const metadata: Metadata = {
  title: "Reglas Comerciales",
  description:
    "Gestiona límites de descuento, productos obligatorios, aprobaciones y promociones.",
};

async function getData(userId: string) {
  const [reglas, productos, categorias] = await Promise.all([
    prisma.reglaComercial.findMany({
      where: { usuarioId: userId },
      orderBy: [{ prioridad: "desc" }, { createdAt: "desc" }],
    }),
    prisma.producto.findMany({
      where: { activo: true, usuarioId: userId },
      include: { categoria: true },
      orderBy: { nombre: "asc" },
    }),
    prisma.categoria.findMany({ orderBy: { nombre: "asc" } }),
  ]);
  return { reglas, productos, categorias };
}

export default async function ReglasPage() {
  const session = await getSession();
  if (!session) return null;
  const features = getPlanFeatures(session.plan || "starter");

  if (!features.reglasComerciales) {
    return (
      <div>
        <PageHeader
          title="Reglas Comerciales"
          description="Límites, productos obligatorios, aprobaciones y promociones"
        />
        <FeatureGateBanner
          feature="Reglas Comerciales"
          requiredPlan="Pro"
          description="Crea reglas de descuento, productos obligatorios, aprobaciones y promociones para controlar tu proceso de ventas. Disponible desde el plan Pro."
        />
      </div>
    );
  }

  const data = await getData(session.userId);

  return (
    <div>
      <PageHeader
        title="Reglas Comerciales"
        description="Límites, productos obligatorios, aprobaciones y promociones"
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
