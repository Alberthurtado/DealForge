"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Minus, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    priceMonthly: "0",
    priceAnnual: "0",
    period: "gratis",
    desc: "Para probar DealForge",
    popular: false,
    cta: "Empezar Gratis",
    href: "/registro",
    features: [
      { text: "10 cotizaciones/mes", included: true },
      { text: "5 clientes", included: true },
      { text: "10 productos", included: true },
      { text: "5 consultas Forge IA", included: true },
      { text: "Exportación CSV", included: true },
      { text: "Versionado de cotizaciones", included: true },
      { text: "Envío de emails", included: false },
      { text: "Firma electrónica", included: false },
      { text: "Recordatorios automáticos", included: false },
      { text: "Aprobaciones", included: false },
      { text: "Reglas comerciales", included: false },
      { text: "Gestión de contratos", included: false },
    ],
  },
  {
    name: "Pro",
    priceMonthly: "29",
    priceAnnual: "23",
    annualTotal: "276",
    period: "/mes",
    desc: "Para equipos en crecimiento",
    popular: false,
    cta: "Empezar con Pro",
    href: "/registro?plan=pro",
    features: [
      { text: "100 cotizaciones/mes", included: true },
      { text: "50 clientes", included: true },
      { text: "200 productos", included: true },
      { text: "Forge IA ilimitado", included: true },
      { text: "Hasta 5 usuarios", included: true },
      { text: "Import / Export CSV", included: true },
      { text: "Envío de emails", included: true },
      { text: "PDF con marca", included: true },
      { text: "Firma electrónica", included: true },
      { text: "Recordatorios automáticos", included: true },
      { text: "Reglas básicas", included: true },
      { text: "Gestión de contratos", included: false },
    ],
  },
  {
    name: "Business",
    priceMonthly: "79",
    priceAnnual: "63",
    annualTotal: "756",
    period: "/mes",
    desc: "Para empresas que necesitan todo",
    popular: true,
    cta: "Empezar con Business",
    href: "/registro?plan=business",
    features: [
      { text: "Cotizaciones ilimitadas", included: true },
      { text: "Clientes ilimitados", included: true },
      { text: "Productos ilimitados", included: true },
      { text: "Forge IA prioridad", included: true },
      { text: "Hasta 20 usuarios", included: true },
      { text: "Import / Export CSV", included: true },
      { text: "Envío de emails", included: true },
      { text: "Aprobaciones", included: true },
      { text: "Firma electrónica", included: true },
      { text: "Recordatorios automáticos", included: true },
      { text: "Reglas avanzadas", included: true },
      { text: "Gestión de contratos", included: true },
    ],
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    priceAnnual: "Custom",
    period: "",
    desc: "Para grandes organizaciones",
    popular: false,
    cta: "Contactar",
    href: "/contacto",
    features: [
      { text: "Todo ilimitado", included: true },
      { text: "Forge IA personalizado", included: true },
      { text: "Usuarios ilimitados", included: true },
      { text: "API completa", included: true },
      { text: "SSO / SAML", included: true },
      { text: "SLA garantizado", included: true },
      { text: "Soporte dedicado", included: true },
      { text: "Onboarding personalizado", included: true },
    ],
  },
];

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <section id="precios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Planes pensados para PYMEs
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Empieza gratis. Escala cuando crezcas.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-xl gap-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${
                billing === "monthly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Mensual
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                billing === "annual"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Anual
              <span className="text-[11px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full leading-none">
                −20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const price = billing === "annual" ? plan.priceAnnual : plan.priceMonthly;
            const isCustom = price === "Custom";
            const isFree = price === "0";

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border-2 p-6 flex flex-col ${
                  plan.popular
                    ? "border-[#3a9bb5] shadow-xl shadow-[#3a9bb5]/10 scale-[1.02]"
                    : "border-gray-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#3a9bb5] text-white text-xs font-bold rounded-full">
                      <Sparkles className="w-3 h-3" />
                      Más popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{plan.desc}</p>

                  <div className="mt-4">
                    {isCustom ? (
                      <span className="text-3xl font-bold text-gray-900">A medida</span>
                    ) : isFree ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-gray-900">0€</span>
                        <span className="text-gray-500 text-sm">gratis</span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold text-gray-900">{price}€</span>
                          <span className="text-gray-500 text-sm">/mes</span>
                        </div>
                        {billing === "annual" && plan.annualTotal && (
                          <p className="text-xs text-green-600 font-medium mt-0.5">
                            {plan.annualTotal}€/año · ahorras {(Number(plan.priceMonthly) - Number(price)) * 12}€
                          </p>
                        )}
                        {billing === "monthly" && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            o {plan.priceAnnual}€/mes facturado anualmente
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-2.5">
                      {f.included ? (
                        <Check className="w-4 h-4 text-[#3a9bb5] shrink-0" />
                      ) : (
                        <Minus className="w-4 h-4 text-gray-300 shrink-0" />
                      )}
                      <span className={`text-sm ${f.included ? "text-gray-700" : "text-gray-400"}`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block text-center py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-[#3a9bb5] text-white hover:bg-[#2d7d94] shadow-lg shadow-[#3a9bb5]/25"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Sin permanencia · Cancela cuando quieras ·{" "}
          <Link href="/precios" className="text-[#3a9bb5] hover:underline">
            Ver comparativa completa →
          </Link>
        </p>
      </div>
    </section>
  );
}
