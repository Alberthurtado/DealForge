"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import {
  CURRENCIES,
  CURRENCY_LABEL,
  PRICING,
  formatMoney,
  isValidCurrency,
  type Currency,
  type PaidPlan,
} from "@/lib/pricing";

type CtaStyle = "primary" | "secondary" | "outline";

interface Plan {
  name: string;
  planKey?: PaidPlan;
  freeOrCustom?: "free" | "custom";
  description: string;
  popular?: boolean;
  cta: string;
  ctaHref: string;
  ctaStyle: CtaStyle;
  features: string[];
}

const PLANS: Plan[] = [
  {
    name: "Starter",
    freeOrCustom: "free",
    description: "Perfect for freelancers and solopreneurs getting started.",
    cta: "Start free",
    ctaHref: "/registro",
    ctaStyle: "outline",
    features: ["10 quotes/month", "5 clients", "10 products", "5 Forge AI queries", "1 user"],
  },
  {
    name: "Pro",
    planKey: "pro",
    description: "For sales teams that need speed and a professional edge.",
    popular: true,
    cta: "Get started with Pro",
    ctaHref: "/registro?plan=pro",
    ctaStyle: "primary",
    features: [
      "100 quotes/month",
      "50 clients",
      "200 products",
      "Unlimited Forge AI (Haiku)",
      "Up to 5 users",
      "E-signature",
      "Email sending",
      "Automated reminders",
      "Quote versioning",
      "Import / Export",
      "API access",
    ],
  },
  {
    name: "Business",
    planKey: "business",
    description: "For companies that want full control over their sales process.",
    cta: "Get started with Business",
    ctaHref: "/registro?plan=business",
    ctaStyle: "secondary",
    features: [
      "Unlimited quotes",
      "Unlimited clients",
      "Unlimited products",
      "Advanced Forge AI (Sonnet)",
      "Up to 20 users",
      "Advanced commercial rules",
      "Approval flows",
      "Contract management",
      "Renewals & alerts",
      "Advanced reports",
      "API access",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    freeOrCustom: "custom",
    description: "For large organizations with custom needs.",
    cta: "Contact sales",
    ctaHref: "/contacto",
    ctaStyle: "outline",
    features: ["Everything in Business", "SSO / SAML", "Dedicated SLA", "Unlimited users", "Custom development"],
  },
];

function ctaClasses(style: CtaStyle) {
  const base =
    "block w-full text-center py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200";
  switch (style) {
    case "primary":
      return `${base} bg-[#3a9bb5] text-white hover:bg-[#2d7d94] shadow-lg shadow-[#3a9bb5]/25`;
    case "secondary":
      return `${base} bg-[#3a9bb5]/10 text-[#3a9bb5] hover:bg-[#3a9bb5]/20`;
    case "outline":
      return `${base} border-2 border-gray-200 text-gray-700 hover:border-[#3a9bb5] hover:text-[#3a9bb5]`;
  }
}

interface Props {
  initialCurrency?: Currency;
}

export function EnPricingCards({ initialCurrency = "GBP" }: Props) {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [currency, setCurrency] = useState<Currency>(
    isValidCurrency(initialCurrency) ? initialCurrency : "GBP"
  );

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col items-center gap-4 mb-12">
        <div className="inline-flex items-center p-1 bg-gray-100 rounded-xl gap-1">
          {CURRENCIES.map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                currency === c ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {CURRENCY_LABEL[c]}
            </button>
          ))}
        </div>

        <div className="inline-flex items-center p-1 bg-gray-100 rounded-xl gap-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              billing === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              billing === "annual" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Annual
            <span className="text-[11px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full leading-none">
              −20%
            </span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
        {PLANS.map((plan) => {
          const pricePoint = plan.planKey ? PRICING[plan.planKey][currency] : null;
          const displayAmount = pricePoint
            ? billing === "annual"
              ? pricePoint.annual
              : pricePoint.monthly
            : 0;

          return (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                plan.popular
                  ? "border-[#3a9bb5] shadow-xl shadow-[#3a9bb5]/10 ring-2 ring-[#3a9bb5]"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#3a9bb5] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h2>
                <p className="text-sm text-gray-500 mb-4 min-h-[40px]">{plan.description}</p>

                {plan.freeOrCustom === "custom" ? (
                  <div>
                    <span className="text-3xl font-bold text-gray-900">Custom</span>
                  </div>
                ) : plan.freeOrCustom === "free" ? (
                  <div>
                    <span className="text-3xl font-bold text-gray-900">{formatMoney(0, currency)}</span>
                    <p className="text-xs text-gray-400 mt-1">forever</p>
                  </div>
                ) : pricePoint ? (
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">
                        {formatMoney(displayAmount, currency)}
                      </span>
                      <span className="text-sm text-gray-500">/mo</span>
                    </div>
                    {billing === "annual" ? (
                      <p className="text-xs text-green-600 font-medium mt-1">
                        {formatMoney(pricePoint.annualTotal, currency)} billed annually · save{" "}
                        {formatMoney(pricePoint.save, currency)}/yr
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400 mt-1">
                        or {formatMoney(pricePoint.annual, currency)}/mo billed annually
                        <span className="text-green-600 font-medium"> (−20%)</span>
                      </p>
                    )}
                  </div>
                ) : null}
              </div>

              <Link href={plan.ctaHref} className={ctaClasses(plan.ctaStyle)}>
                {plan.cta}
              </Link>

              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-[#3a9bb5] mt-0.5 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        No lock-in · Cancel anytime · Prices in {currency}, taxes not included
      </p>
    </>
  );
}
