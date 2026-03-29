import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { PageHeader } from "@/components/layout/page-header";
import { CancelForm } from "@/components/configuracion/cancel-form";

export const metadata: Metadata = {
  title: "Gestionar Suscripción",
  description: "Cambia o cancela tu suscripción.",
};

export default async function CancelarPage() {
  const session = await getSession();
  if (!session) return null;

  // Look up subscription from empresa (primary) or usuario (legacy fallback)
  let plan = "starter";
  let planStatus = "active";
  let currentPeriodEnd: Date | null = null;
  let hasSubscription = false;

  if (session.empresaId) {
    const empresa = await prisma.empresa.findUnique({
      where: { id: session.empresaId },
      select: {
        plan: true,
        planStatus: true,
        currentPeriodEnd: true,
        stripeSubscriptionId: true,
      },
    });
    plan = empresa?.plan || "starter";
    planStatus = empresa?.planStatus || "active";
    currentPeriodEnd = empresa?.currentPeriodEnd ?? null;
    hasSubscription = !!empresa?.stripeSubscriptionId;
  }

  // Fallback for legacy users without empresaId
  if (!hasSubscription) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: session.userId },
      select: {
        plan: true,
        planStatus: true,
        currentPeriodEnd: true,
        stripeSubscriptionId: true,
      },
    });
    plan = usuario?.plan || "starter";
    planStatus = usuario?.planStatus || "active";
    currentPeriodEnd = usuario?.currentPeriodEnd ?? null;
    hasSubscription = !!usuario?.stripeSubscriptionId;
  }

  // Nothing to cancel if already on free plan
  if (plan === "starter") {
    redirect("/configuracion");
  }

  const endDate = currentPeriodEnd
    ? new Date(currentPeriodEnd).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div>
      <PageHeader
        title="Gestionar Suscripción"
        description="Cambia tu plan o cancela la renovación automática"
      />
      <div className="p-6">
        <div className="max-w-xl">
          <CancelForm
            currentPlan={plan}
            planStatus={planStatus}
            endDate={endDate}
          />
        </div>
      </div>
    </div>
  );
}
