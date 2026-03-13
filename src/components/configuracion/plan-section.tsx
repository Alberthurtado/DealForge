"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  User,
  Crown,
  Flame,
  LogOut,
  Check,
  Sparkles,
  CreditCard,
  Loader2,
  ArrowUpRight,
  XCircle,
} from "lucide-react";

interface PlanUser {
  nombre: string;
  email: string;
  plan: string;
  planStatus?: string;
  currentPeriodEnd?: string | null;
  hasSubscription?: boolean;
}

const PLANS: Record<
  string,
  {
    label: string;
    color: string;
    bgColor: string;
    icon: typeof Crown;
    features: string[];
    iaModel: string;
  }
> = {
  starter: {
    label: "Starter",
    color: "text-gray-700",
    bgColor: "bg-gray-100",
    icon: User,
    features: [
      "10 cotizaciones/mes",
      "5 clientes",
      "10 productos",
      "5 consultas Forge IA (Haiku)",
      "Exportación CSV",
    ],
    iaModel: "Claude Haiku",
  },
  pro: {
    label: "Pro",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    icon: Flame,
    features: [
      "100 cotizaciones/mes",
      "50 clientes",
      "200 productos",
      "Forge IA ilimitado (Sonnet)",
      "Import / Export CSV",
      "Envío de emails",
      "PDF con marca",
      "Reglas básicas",
    ],
    iaModel: "Claude Sonnet",
  },
  business: {
    label: "Business",
    color: "text-purple-700",
    bgColor: "bg-purple-100",
    icon: Crown,
    features: [
      "Cotizaciones ilimitadas",
      "Clientes ilimitados",
      "Productos ilimitados",
      "Forge IA prioridad (Sonnet)",
      "Import / Export CSV",
      "Envío de emails",
      "Aprobaciones",
      "Reglas avanzadas",
      "Integraciones CRM",
    ],
    iaModel: "Claude Sonnet",
  },
  enterprise: {
    label: "Enterprise",
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    icon: Sparkles,
    features: [
      "Todo ilimitado",
      "Forge IA personalizado (Sonnet)",
      "Multi-usuario",
      "API completa",
      "SSO / SAML",
      "Soporte dedicado",
    ],
    iaModel: "Claude Sonnet",
  },
};

export function PlanSection({ user }: { user: PlanUser }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [upgrading, setUpgrading] = useState<string | null>(null);
  const [managingPortal, setManagingPortal] = useState(false);

  const plan = PLANS[user.plan] || PLANS.starter;
  const PlanIcon = plan.icon;
  const isPaid = user.plan !== "starter";

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  }

  async function handleUpgrade(targetPlan: string) {
    setUpgrading(targetPlan);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: targetPlan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Error al iniciar el pago");
        setUpgrading(null);
      }
    } catch {
      alert("Error de conexión");
      setUpgrading(null);
    }
  }

  async function handleManageSubscription() {
    setManagingPortal(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Error al abrir el portal");
        setManagingPortal(false);
      }
    } catch {
      alert("Error de conexión");
      setManagingPortal(false);
    }
  }

  // Format next billing date
  const nextBilling = user.currentPeriodEnd
    ? new Date(user.currentPeriodEnd).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="max-w-3xl mb-6">
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Tu Cuenta y Plan
        </h3>

        {/* User info */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <User className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {user.nombre}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold rounded-full ${plan.bgColor} ${plan.color}`}
                >
                  <PlanIcon className="w-3 h-3" />
                  Plan {plan.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  IA: {plan.iaModel}
                </span>
              </div>
              {/* Subscription status */}
              {isPaid && nextBilling && (
                <p className="text-xs text-muted-foreground mt-1">
                  {user.planStatus === "past_due" ? (
                    <span className="text-red-500 font-medium">
                      Pago pendiente
                    </span>
                  ) : (
                    <>Próximo cobro: {nextBilling}</>
                  )}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            {loggingOut ? "Cerrando..." : "Cerrar Sesión"}
          </button>
        </div>

        {/* Plan features */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Tu plan incluye
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Manage subscription for paid users */}
        {isPaid && user.hasSubscription && (
          <div className="mt-4">
            <button
              onClick={handleManageSubscription}
              disabled={managingPortal}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
            >
              {managingPortal ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CreditCard className="w-4 h-4" />
              )}
              {managingPortal
                ? "Abriendo portal..."
                : "Gestionar Suscripción"}
            </button>
            <p className="text-xs text-muted-foreground mt-1.5">
              Cambia de plan, actualiza tu tarjeta o consulta facturas
            </p>
          </div>
        )}

        {/* Plan cards */}
        <div className="mt-4 space-y-3">
          {/* Pro card */}
          <div className={`p-4 rounded-xl border ${user.plan === "pro" ? "bg-blue-50/50 border-blue-200" : "bg-gradient-to-r from-blue-50 to-[#3a9bb5]/5 border-blue-100"}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Plan Pro — 29 EUR/mes
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Forge IA ilimitado con Sonnet, emails, PDF con marca
                </p>
              </div>
              {user.plan === "pro" ? (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-100 rounded-lg">
                  <Check className="w-4 h-4" />
                  Plan Actual
                </span>
              ) : user.plan === "starter" ? (
                <button
                  onClick={() => handleUpgrade("pro")}
                  disabled={upgrading !== null}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-[#3a9bb5] hover:bg-[#2d7d94] rounded-lg transition-colors disabled:opacity-50 shadow-lg shadow-[#3a9bb5]/25"
                >
                  {upgrading === "pro" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                  {upgrading === "pro" ? "Redirigiendo..." : "Actualizar"}
                </button>
              ) : null}
            </div>
          </div>

          {/* Business card */}
          <div className={`p-4 rounded-xl border ${user.plan === "business" ? "bg-purple-50/50 border-purple-200" : "bg-gradient-to-r from-purple-50 to-[#3a9bb5]/5 border-purple-100"}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  Plan Business — 79 EUR/mes
                  {user.plan !== "business" && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold bg-purple-100 text-purple-700 rounded-full">
                      <Sparkles className="w-2.5 h-2.5" />
                      Popular
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Todo ilimitado, aprobaciones, reglas avanzadas, CRM
                </p>
              </div>
              {user.plan === "business" ? (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-purple-700 bg-purple-100 rounded-lg">
                  <Check className="w-4 h-4" />
                  Plan Actual
                </span>
              ) : (
                <button
                  onClick={() => handleUpgrade("business")}
                  disabled={upgrading !== null}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 shadow-lg shadow-purple-600/25"
                >
                  {upgrading === "business" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Crown className="w-4 h-4" />
                  )}
                  {upgrading === "business" ? "Redirigiendo..." : "Actualizar"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Cancel subscription for paid users */}
        {isPaid && (
          <div className="mt-4 pt-4 border-t border-border">
            {user.planStatus === "canceling" ? (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  Tu suscripción se cancelará{nextBilling ? ` el ${nextBilling}` : ""}. Después pasarás al plan Starter.
                </p>
              </div>
            ) : (
              <Link
                href="/configuracion/cancelar"
                className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" />
                Cancelar suscripción
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
