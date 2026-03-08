import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { EmpresaForm } from "@/components/configuracion/empresa-form";
import { PlanSection } from "@/components/configuracion/plan-section";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Configuracion",
  description: "Configura los datos de tu empresa y plantillas de cotizacion.",
};

async function getEmpresa() {
  return prisma.empresa.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  });
}

export default async function ConfiguracionPage() {
  const [empresa, session] = await Promise.all([getEmpresa(), getSession()]);

  // Get fresh user data from DB (includes Stripe subscription fields)
  const usuario = session
    ? await prisma.usuario.findUnique({
        where: { id: session.userId },
        select: {
          nombre: true,
          email: true,
          plan: true,
          planStatus: true,
          currentPeriodEnd: true,
          stripeSubscriptionId: true,
        },
      })
    : null;

  return (
    <div>
      <PageHeader
        title="Configuracion"
        description="Datos de tu empresa y plantillas de cotizacion"
      />
      <div className="p-6">
        {usuario && (
          <PlanSection
            user={{
              nombre: usuario.nombre,
              email: usuario.email,
              plan: usuario.plan,
              planStatus: usuario.planStatus,
              currentPeriodEnd: usuario.currentPeriodEnd?.toISOString() || null,
              hasSubscription: !!usuario.stripeSubscriptionId,
            }}
          />
        )}
        <EmpresaForm initialData={JSON.parse(JSON.stringify(empresa))} />
      </div>
    </div>
  );
}
