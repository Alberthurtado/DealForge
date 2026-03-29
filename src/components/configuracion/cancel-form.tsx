"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Loader2,
  ArrowLeft,
  Flame,
  User,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

interface Props {
  currentPlan: string;
  planStatus: string;
  endDate: string | null;
}

type TargetPlan = "pro" | "starter";

const PLAN_INFO: Record<
  TargetPlan,
  {
    label: string;
    price: string;
    description: string;
    features: string[];
    icon: typeof Flame;
    color: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  pro: {
    label: "Pro",
    price: "29€/mes",
    description: "Mantén las funciones principales con un precio más bajo.",
    features: [
      "100 cotizaciones/mes",
      "50 clientes · 200 productos",
      "Forge IA ilimitado",
      "Firma electrónica y emails",
      "Hasta 5 usuarios",
    ],
    icon: Flame,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  starter: {
    label: "Starter (Gratis)",
    price: "0€",
    description: "Plan gratuito, sin cargo mensual.",
    features: [
      "10 cotizaciones/mes",
      "5 clientes · 10 productos",
      "5 consultas Forge IA",
      "1 usuario",
    ],
    icon: User,
    color: "text-gray-700",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
  },
};

export function CancelForm({ currentPlan, planStatus, endDate }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<TargetPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<TargetPlan | null>(null);

  const isBusiness = currentPlan === "business";
  const alreadyCanceling = planStatus === "canceling";

  const options: TargetPlan[] = isBusiness ? ["pro", "starter"] : ["starter"];

  async function handleDowngrade(target: TargetPlan) {
    setLoading(target);
    setError(null);
    try {
      const res = await fetch("/api/stripe/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetPlan: target }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al procesar el cambio");
        setLoading(null);
        return;
      }
      setDone(target);
      setTimeout(() => {
        router.push("/configuracion");
        router.refresh();
      }, 2500);
    } catch {
      setError("Error de conexión");
      setLoading(null);
    }
  }

  // Success state
  if (done) {
    const target = PLAN_INFO[done];
    return (
      <div className="bg-white rounded-xl border border-border p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <CheckCircle className="w-7 h-7 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {done === "pro" ? "Plan cambiado a Pro" : "Suscripción cancelada"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {done === "pro"
              ? `A partir del próximo ciclo de facturación pasarás al plan Pro (29€/mes).`
              : `Tu suscripción no se renovará${endDate ? ` el ${endDate}` : ""}. Después pasarás al plan Starter gratuito.`}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">Redirigiendo a configuración...</p>
      </div>
    );
  }

  // Already canceling state
  if (alreadyCanceling) {
    return (
      <div className="bg-white rounded-xl border border-border p-6 space-y-4">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm font-medium text-amber-800">
            Tu suscripción ya está programada para cancelarse
            {endDate ? ` el ${endDate}` : ""}. Después pasarás al plan Starter gratuito.
          </p>
        </div>
        <Link
          href="/configuracion"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Configuración
        </Link>
      </div>
    );
  }

  const planLabel =
    currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1);

  return (
    <div className="bg-white rounded-xl border border-border p-6 space-y-6">
      {/* Current plan info */}
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm font-semibold text-red-800">
          Estás a punto de cambiar desde el plan {planLabel}
        </p>
        {endDate && (
          <p className="text-xs text-red-700 mt-1">
            Tu acceso actual continúa hasta el{" "}
            <span className="font-bold">{endDate}</span>.
          </p>
        )}
      </div>

      {/* Downgrade options */}
      <div>
        <p className="text-sm font-semibold text-foreground mb-3">
          ¿A qué plan quieres cambiar?
        </p>
        <div className="space-y-3">
          {options.map((target) => {
            const info = PLAN_INFO[target];
            const Icon = info.icon;
            const isLoading = loading === target;
            const isDisabled = loading !== null;

            return (
              <div
                key={target}
                className={`rounded-xl border-2 p-4 ${info.bgColor} ${info.borderColor}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        target === "pro" ? "bg-blue-100" : "bg-gray-200"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${info.color}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${info.color}`}>
                        Plan {info.label}{" "}
                        <span className="font-normal text-muted-foreground">
                          — {info.price}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {info.description}
                      </p>
                      <ul className="mt-2 space-y-0.5">
                        {info.features.map((f) => (
                          <li
                            key={f}
                            className="text-xs text-muted-foreground flex items-center gap-1"
                          >
                            <span className="text-gray-400">•</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDowngrade(target)}
                    disabled={isDisabled}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 ${
                      target === "pro"
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                        : "bg-red-600 hover:bg-red-700 text-white shadow-sm"
                    }`}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                    {isLoading
                      ? "Procesando..."
                      : target === "pro"
                      ? "Bajar a Pro"
                      : "Cancelar a Starter"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="pt-2 border-t border-border">
        <Link
          href="/configuracion"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Mantener mi plan actual y volver
        </Link>
      </div>
    </div>
  );
}
