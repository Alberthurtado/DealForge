import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { EmpresaForm } from "@/components/configuracion/empresa-form";
import { PlanSection } from "@/components/configuracion/plan-section";
import { ApiKeySection } from "@/components/configuracion/api-key-section";
import { TeamSection } from "@/components/configuracion/team-section";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Configuración",
  description: "Configura los datos de tu empresa y plantillas de cotización.",
};

export default async function ConfiguracionPage() {
  const session = await getSession();

  // Get fresh empresa data from DB (includes plan + Stripe subscription fields)
  const empresa = session?.empresaId
    ? await prisma.empresa.findUnique({
        where: { id: session.empresaId },
        select: {
          id: true,
          nombre: true,
          cif: true,
          email: true,
          telefono: true,
          direccion: true,
          ciudad: true,
          pais: true,
          web: true,
          logoUrl: true,
          plantillaPdf: true,
          colorPrimario: true,
          prefijoCotizacion: true,
          diasVencimiento: true,
          condicionesDefecto: true,
          condicionesTransaccional: true,
          condicionesContractual: true,
          smtpHost: true,
          smtpPort: true,
          smtpUser: true,
          smtpPass: true,
          smtpSecure: true,
          recordatorioSeguimientoDias: true,
          recordatorioVencimientoDias: true,
          recordatoriosActivos: true,
          plan: true,
          planStatus: true,
          stripeSubscriptionId: true,
          currentPeriodEnd: true,
        },
      })
    : null;

  // Fallback: get usuario data for legacy users
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

  // Determine effective plan info (empresa-level preferred)
  const planInfo = {
    plan: empresa?.plan || usuario?.plan || "starter",
    planStatus: empresa?.planStatus || usuario?.planStatus || "active",
    currentPeriodEnd: empresa?.currentPeriodEnd || usuario?.currentPeriodEnd || null,
    stripeSubscriptionId: empresa?.stripeSubscriptionId || usuario?.stripeSubscriptionId || null,
  };

  return (
    <div>
      <PageHeader
        title="Configuración"
        description="Datos de tu empresa y plantillas de cotización"
      />
      <div className="p-6">
        {usuario && (
          <PlanSection
            user={{
              nombre: usuario.nombre,
              email: usuario.email,
              plan: planInfo.plan,
              planStatus: planInfo.planStatus,
              currentPeriodEnd: planInfo.currentPeriodEnd?.toISOString() || null,
              hasSubscription: !!planInfo.stripeSubscriptionId,
            }}
          />
        )}

        {/* Team management — visible to all, invite only for admins */}
        {session && (
          <TeamSection currentUserRol={session.rol || "ADMIN"} />
        )}

        {usuario && <ApiKeySection plan={planInfo.plan} />}

        <EmpresaForm initialData={JSON.parse(JSON.stringify(empresa || {}))} />
      </div>
    </div>
  );
}
