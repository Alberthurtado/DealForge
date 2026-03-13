import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { PageHeader } from "@/components/layout/page-header";
import { CancelForm } from "@/components/configuracion/cancel-form";

export const metadata: Metadata = {
  title: "Cancelar Suscripción",
  description: "Confirma la cancelación de tu suscripción.",
};

export default async function CancelarPage() {
  const session = await getSession();
  if (!session) return null;

  const usuario = await prisma.usuario.findUnique({
    where: { id: session.userId },
    select: {
      plan: true,
      planStatus: true,
      currentPeriodEnd: true,
      stripeSubscriptionId: true,
    },
  });

  // Redirect if no active paid subscription
  if (
    !usuario ||
    usuario.plan === "starter" ||
    !usuario.stripeSubscriptionId
  ) {
    redirect("/configuracion");
  }

  const endDate = usuario.currentPeriodEnd
    ? new Date(usuario.currentPeriodEnd).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const planLabel =
    usuario.plan.charAt(0).toUpperCase() + usuario.plan.slice(1);

  return (
    <div>
      <PageHeader
        title="Cancelar Suscripción"
        description="Revisa los detalles antes de confirmar"
      />
      <div className="p-6">
        <div className="max-w-xl">
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-sm font-semibold text-red-800">
                  ¿Estás seguro de que quieres cancelar tu plan {planLabel}?
                </h3>
                {endDate && (
                  <p className="text-sm text-red-700 mt-2">
                    Tu suscripción permanecerá activa hasta el{" "}
                    <span className="font-bold">{endDate}</span>. Después de esa
                    fecha, tu cuenta pasará automáticamente al plan Starter.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Con el plan Starter tendrás acceso limitado a:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1.5 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>
                      Solo los <strong>5 primeros clientes</strong> que creaste
                      serán accesibles
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>
                      Solo los <strong>20 primeros productos</strong> que creaste
                      serán accesibles
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>Máximo 10 cotizaciones por mes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>
                      El resto de datos no se eliminan, pero aparecerán
                      bloqueados hasta que reactives un plan superior
                    </span>
                  </li>
                </ul>
              </div>

              <CancelForm alreadyCanceling={usuario.planStatus === "canceling"} endDate={endDate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
