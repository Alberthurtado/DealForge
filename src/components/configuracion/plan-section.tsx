"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { useEmpresaLocale } from "@/lib/use-empresa-locale";
import { CONFIG_STRINGS } from "@/lib/configuracion-i18n";
import { PRICING, formatMoney, isValidCurrency, type Currency } from "@/lib/pricing";
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
    iaModel: string;
  }
> = {
  starter: {
    label: "Starter",
    color: "text-gray-700",
    bgColor: "bg-gray-100",
    icon: User,
    iaModel: "Claude Haiku",
  },
  pro: {
    label: "Pro",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    icon: Flame,
    iaModel: "Claude Haiku",
  },
  business: {
    label: "Business",
    color: "text-purple-700",
    bgColor: "bg-purple-100",
    icon: Crown,
    iaModel: "Claude Sonnet",
  },
  enterprise: {
    label: "Enterprise",
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    icon: Sparkles,
    iaModel: "Claude Sonnet",
  },
};

export function PlanSection({ user }: { user: PlanUser }) {
  const router = useRouter();
  const { lang, currency: currencyCode, locale: numLocale } = useEmpresaLocale();
  const t = CONFIG_STRINGS[lang].planSection;
  const currency: Currency = isValidCurrency(currencyCode) ? currencyCode : "EUR";
  const [loggingOut, setLoggingOut] = useState(false);
  const [upgrading, setUpgrading] = useState<string | null>(null);
  const [managingPortal, setManagingPortal] = useState(false);

  const [billingInterval, setBillingInterval] = useState<"monthly" | "annual">("monthly");

  const plan = PLANS[user.plan] || PLANS.starter;
  const PlanIcon = plan.icon;
  const isPaid = user.plan !== "starter";

  const proPrice = PRICING.pro[currency];
  const businessPrice = PRICING.business[currency];
  const proMonthly = billingInterval === "annual" ? proPrice.annual : proPrice.monthly;
  const businessMonthly =
    billingInterval === "annual" ? businessPrice.annual : businessPrice.monthly;

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
    track("checkout_started", { plan: targetPlan, interval: billingInterval });
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: targetPlan, interval: billingInterval }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || t.errStartPayment);
        setUpgrading(null);
      }
    } catch {
      alert(t.errConnection);
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
        alert(data.error || t.errOpenPortal);
        setManagingPortal(false);
      }
    } catch {
      alert(t.errConnection);
      setManagingPortal(false);
    }
  }

  // Format next billing date
  const nextBilling = user.currentPeriodEnd
    ? new Date(user.currentPeriodEnd).toLocaleDateString(numLocale, {
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
          {t.title}
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
                  {t.planPrefix} {plan.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {t.aiLabel} {plan.iaModel}
                </span>
              </div>
              {/* Subscription status */}
              {isPaid && nextBilling && (
                <p className="text-xs text-muted-foreground mt-1">
                  {user.planStatus === "past_due" ? (
                    <span className="text-red-500 font-medium">
                      {t.paymentPending}
                    </span>
                  ) : (
                    <>{t.nextBilling(nextBilling)}</>
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
            {loggingOut ? t.loggingOut : t.logout}
          </button>
        </div>

        {/* Plan features */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {t.planIncludes}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {(t.features[user.plan] || t.features.starter).map((feature) => (
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
              {managingPortal ? t.openingPortal : t.manageSubscription}
            </button>
            <p className="text-xs text-muted-foreground mt-1.5">
              {t.manageSubDesc}
            </p>
          </div>
        )}

        {/* Billing interval toggle */}
        {!isPaid && (
          <div className="mt-4 flex items-center justify-center gap-2 p-1 bg-gray-100 rounded-lg w-fit mx-auto">
            <button
              onClick={() => setBillingInterval("monthly")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                billingInterval === "monthly"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.monthly}
            </button>
            <button
              onClick={() => setBillingInterval("annual")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                billingInterval === "annual"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.annual}
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                -20%
              </span>
            </button>
          </div>
        )}

        {/* Plan cards */}
        <div className="mt-4 space-y-3">
          {/* Pro card */}
          <div className={`p-4 rounded-xl border ${user.plan === "pro" ? "bg-blue-50/50 border-blue-200" : "bg-gradient-to-r from-blue-50 to-[#3a9bb5]/5 border-blue-100"}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {t.proName} — {formatMoney(proMonthly, currency)}{t.perMonth}
                  {billingInterval === "annual" && (
                    <span className="ml-1.5 text-xs font-normal text-green-600">{t.perYear(formatMoney(proPrice.annualTotal, currency))}</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t.proDesc}
                </p>
              </div>
              {user.plan === "pro" ? (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-100 rounded-lg">
                  <Check className="w-4 h-4" />
                  {t.currentPlan}
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
                  {upgrading === "pro" ? t.redirecting : t.upgrade}
                </button>
              ) : null}
            </div>
          </div>

          {/* Business card */}
          <div className={`p-4 rounded-xl border ${user.plan === "business" ? "bg-purple-50/50 border-purple-200" : "bg-gradient-to-r from-purple-50 to-[#3a9bb5]/5 border-purple-100"}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  {t.businessName} — {formatMoney(businessMonthly, currency)}{t.perMonth}
                  {billingInterval === "annual" && (
                    <span className="text-xs font-normal text-green-600">{t.perYear(formatMoney(businessPrice.annualTotal, currency))}</span>
                  )}
                  {user.plan !== "business" && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold bg-purple-100 text-purple-700 rounded-full">
                      <Sparkles className="w-2.5 h-2.5" />
                      {t.popular}
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t.businessDesc}
                </p>
              </div>
              {user.plan === "business" ? (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-purple-700 bg-purple-100 rounded-lg">
                  <Check className="w-4 h-4" />
                  {t.currentPlan}
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
                  {upgrading === "business" ? t.redirecting : t.upgrade}
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
                  {t.cancelingPre}{nextBilling ? t.cancelingOn(nextBilling) : ""}{t.cancelingPost}
                </p>
              </div>
            ) : (
              <Link
                href="/configuracion/cancelar"
                className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" />
                {t.cancelSubscription}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
