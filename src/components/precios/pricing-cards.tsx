"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

type CtaStyle = "primary" | "secondary" | "outline";

interface Plan {
  nombre: string;
  precioMensual: string;
  precioAnual?: string;
  totalAnual?: string;
  ahorro?: string;
  periodo: string;
  descripcion: string;
  popular?: boolean;
  cta: string;
  ctaHref: string;
  ctaStyle: CtaStyle;
  caracteristicas: string[];
}

const PLANES: Plan[] = [
  {
    nombre: "Starter",
    precioMensual: "0",
    periodo: "para siempre",
    descripcion: "Perfecto para freelancers y autónomos que empiezan.",
    cta: "Empieza gratis",
    ctaHref: "/registro",
    ctaStyle: "outline",
    caracteristicas: [
      "10 cotizaciones/mes",
      "5 clientes",
      "10 productos",
      "5 consultas Forge IA",
      "1 usuario",
    ],
  },
  {
    nombre: "Pro",
    precioMensual: "29",
    precioAnual: "23",
    totalAnual: "276",
    ahorro: "72",
    periodo: "/mes",
    descripcion: "Para equipos comerciales que necesitan velocidad y profesionalidad.",
    popular: true,
    cta: "Empezar con Pro",
    ctaHref: "/registro?plan=pro",
    ctaStyle: "primary",
    caracteristicas: [
      "100 cotizaciones/mes",
      "50 clientes",
      "200 productos",
      "Forge IA ilimitado",
      "Hasta 5 usuarios",
      "Firma electrónica",
      "Envío de emails",
      "Recordatorios automáticos",
      "Versionado de cotizaciones",
      "Importar / Exportar",
      "API access",
    ],
  },
  {
    nombre: "Business",
    precioMensual: "79",
    precioAnual: "63",
    totalAnual: "756",
    ahorro: "192",
    periodo: "/mes",
    descripcion: "Para empresas que necesitan control total sobre su proceso de ventas.",
    cta: "Empezar con Business",
    ctaHref: "/registro?plan=business",
    ctaStyle: "secondary",
    caracteristicas: [
      "Cotizaciones ilimitadas",
      "Clientes ilimitados",
      "Productos ilimitados",
      "Forge IA ilimitado",
      "Hasta 20 usuarios",
      "Reglas comerciales avanzadas",
      "Flujos de aprobación",
      "Gestión de contratos",
      "Renovaciones y alertas",
      "Reportes avanzados",
      "API access",
      "Soporte prioritario",
    ],
  },
  {
    nombre: "Enterprise",
    precioMensual: "Contactar",
    periodo: "",
    descripcion: "Para grandes organizaciones con necesidades personalizadas.",
    cta: "Contactar ventas",
    ctaHref: "/contacto",
    ctaStyle: "outline",
    caracteristicas: [
      "Todo de Business",
      "SSO / SAML",
      "SLA dedicado",
      "Usuarios ilimitados",
      "Personalización a medida",
    ],
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

export function PricingCards() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <>
      {/* Billing toggle */}
      <div className="flex items-center justify-center mb-12">
        <div className="inline-flex items-center p-1 bg-gray-100 rounded-xl gap-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              billing === "monthly"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
              billing === "annual"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Anual
            <span className="text-[11px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded-full leading-none">
              −20%
            </span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
        {PLANES.map((plan) => {
          const isCustom = plan.precioMensual === "Contactar";
          const isFree = plan.precioMensual === "0";
          const price =
            billing === "annual" && plan.precioAnual
              ? plan.precioAnual
              : plan.precioMensual;

          return (
            <div
              key={plan.nombre}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                plan.popular
                  ? "border-[#3a9bb5] shadow-xl shadow-[#3a9bb5]/10 ring-2 ring-[#3a9bb5]"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#3a9bb5] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                    Más popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-1">{plan.nombre}</h2>
                <p className="text-sm text-gray-500 mb-4 min-h-[40px]">{plan.descripcion}</p>

                {/* Price display */}
                {isCustom ? (
                  <div>
                    <span className="text-3xl font-bold text-gray-900">A medida</span>
                  </div>
                ) : isFree ? (
                  <div>
                    <span className="text-3xl font-bold text-gray-900">0€</span>
                    <p className="text-xs text-gray-400 mt-1">para siempre</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">{price}€</span>
                      <span className="text-sm text-gray-500">/mes</span>
                    </div>
                    {billing === "annual" && plan.totalAnual && plan.ahorro ? (
                      <p className="text-xs text-green-600 font-medium mt-1">
                        {plan.totalAnual}€ facturado anualmente · ahorras {plan.ahorro}€/año
                      </p>
                    ) : (
                      plan.precioAnual && (
                        <p className="text-xs text-gray-400 mt-1">
                          o {plan.precioAnual}€/mes con plan anual
                          <span className="text-green-600 font-medium"> (−20%)</span>
                        </p>
                      )
                    )}
                  </div>
                )}
              </div>

              <Link href={plan.ctaHref} className={ctaClasses(plan.ctaStyle)}>
                {plan.cta}
              </Link>

              <ul className="mt-6 space-y-3 flex-1">
                {plan.caracteristicas.map((feat) => (
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
        Sin permanencia · Cancela cuando quieras · Todos los precios en EUR (IVA no incluido)
      </p>
    </>
  );
}
