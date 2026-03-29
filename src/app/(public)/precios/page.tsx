import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Precios — DealForge | Planes CPQ desde Gratis",
  description:
    "Conoce los precios de DealForge, el software CPQ para cotizaciones profesionales. Plan gratuito disponible. Planes desde 0 hasta empresa. Ahorra 20% con facturación anual.",
  keywords: [
    "DealForge precios",
    "CPQ precio",
    "software cotizaciones precio",
    "precios software ventas",
    "CPQ gratis",
    "cotizaciones online precios",
    "DealForge planes",
  ],
  openGraph: {
    title: "Precios — DealForge | Planes CPQ desde Gratis",
    description:
      "Planes transparentes para cada etapa de tu negocio. Empieza gratis y escala cuando lo necesites.",
    url: "https://dealforge.es/precios",
    siteName: "DealForge",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://dealforge.es/og-precios.png",
        width: 1200,
        height: 630,
        alt: "DealForge — Precios y Planes CPQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Precios — DealForge | Planes CPQ desde Gratis",
    description:
      "Planes transparentes para cada etapa de tu negocio. Empieza gratis y escala cuando lo necesites.",
    images: ["https://dealforge.es/og-precios.png"],
  },
  alternates: { canonical: "https://dealforge.es/precios" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Precios — DealForge",
    description:
      "Conoce los precios de DealForge, el software CPQ para cotizaciones profesionales. Planes desde gratis hasta empresa.",
    url: "https://dealforge.es/precios",
    publisher: {
      "@type": "Organization",
      name: "DealForge",
      url: "https://dealforge.es",
      logo: { "@type": "ImageObject", url: "https://dealforge.es/logo.svg" },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://dealforge.es",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Precios",
        item: "https://dealforge.es/precios",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DealForge",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Software CPQ para crear cotizaciones profesionales, gestionar clientes y cerrar ventas más rápido.",
    url: "https://dealforge.es",
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        price: "0",
        priceCurrency: "EUR",
        description:
          "Plan gratuito con 10 cotizaciones/mes, 5 clientes y 1 usuario.",
        url: "https://dealforge.es/registro",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "29",
        priceCurrency: "EUR",
        description:
          "100 cotizaciones/mes, firma electrónica, Forge IA ilimitado y 3 usuarios.",
        url: "https://dealforge.es/registro",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "29",
          priceCurrency: "EUR",
          billingDuration: "P1M",
        },
      },
      {
        "@type": "Offer",
        name: "Business",
        price: "79",
        priceCurrency: "EUR",
        description:
          "Todo ilimitado, reglas comerciales avanzadas, contratos, reportes y 10 usuarios.",
        url: "https://dealforge.es/registro",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "79",
          priceCurrency: "EUR",
          billingDuration: "P1M",
        },
      },
      {
        "@type": "Offer",
        name: "Enterprise",
        price: "0",
        priceCurrency: "EUR",
        description:
          "Todo de Business + API, SSO/SAML, SLA dedicado, soporte prioritario y usuarios ilimitados.",
        url: "https://dealforge.es/contacto",
        eligibleTransactionVolume: {
          "@type": "PriceSpecification",
          description: "Precio personalizado — contactar ventas",
        },
      },
    ],
  },
];

/* ── Plan data ── */

interface Plan {
  nombre: string;
  precio: string;
  precioAnual?: string;
  periodo: string;
  descripcion: string;
  popular?: boolean;
  cta: string;
  ctaHref: string;
  ctaStyle: "primary" | "secondary" | "outline";
  caracteristicas: string[];
}

const PLANES: Plan[] = [
  {
    nombre: "Starter",
    precio: "Gratis",
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
    precio: "29",
    precioAnual: "23",
    periodo: "/mes",
    descripcion:
      "Para equipos comerciales que necesitan velocidad y profesionalidad.",
    popular: true,
    cta: "Probar Pro gratis",
    ctaHref: "/registro?plan=pro",
    ctaStyle: "primary",
    caracteristicas: [
      "100 cotizaciones/mes",
      "50 clientes",
      "200 productos",
      "Forge IA ilimitado",
      "Firma electrónica",
      "Envío de emails",
      "Recordatorios automáticos",
      "Versionado de cotizaciones",
      "Importar / Exportar",
      "API access",
      "Hasta 5 usuarios",
    ],
  },
  {
    nombre: "Business",
    precio: "79",
    precioAnual: "63",
    periodo: "/mes",
    descripcion:
      "Para empresas que necesitan control total sobre su proceso de ventas.",
    cta: "Probar Business gratis",
    ctaHref: "/registro?plan=business",
    ctaStyle: "secondary",
    caracteristicas: [
      "Cotizaciones ilimitadas",
      "Clientes ilimitados",
      "Productos ilimitados",
      "Forge IA ilimitado",
      "Reglas comerciales avanzadas",
      "Flujos de aprobación",
      "Gestión de contratos",
      "Renovaciones y alertas",
      "Reportes avanzados",
      "API access",
      "Soporte prioritario",
      "Hasta 20 usuarios",
    ],
  },
  {
    nombre: "Enterprise",
    precio: "Contactar",
    periodo: "",
    descripcion:
      "Para grandes organizaciones con necesidades personalizadas.",
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

/* ── Feature comparison ── */

interface FeatureRow {
  nombre: string;
  starter: boolean | string;
  pro: boolean | string;
  business: boolean | string;
  enterprise: boolean | string;
}

const COMPARACION: { categoria: string; features: FeatureRow[] }[] = [
  {
    categoria: "Cotizaciones",
    features: [
      {
        nombre: "Cotizaciones/mes",
        starter: "10",
        pro: "100",
        business: "Ilimitadas",
        enterprise: "Ilimitadas",
      },
      {
        nombre: "Plantillas personalizadas",
        starter: true,
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        nombre: "Versionado",
        starter: false,
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        nombre: "Firma electrónica",
        starter: false,
        pro: true,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    categoria: "Clientes y productos",
    features: [
      {
        nombre: "Clientes",
        starter: "5",
        pro: "50",
        business: "Ilimitados",
        enterprise: "Ilimitados",
      },
      {
        nombre: "Productos",
        starter: "10",
        pro: "200",
        business: "Ilimitados",
        enterprise: "Ilimitados",
      },
      {
        nombre: "Importar / Exportar",
        starter: false,
        pro: true,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    categoria: "Automatización",
    features: [
      {
        nombre: "Forge IA",
        starter: "5 consultas",
        pro: "Ilimitado",
        business: "Ilimitado",
        enterprise: "Ilimitado",
      },
      {
        nombre: "Envío de emails",
        starter: false,
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        nombre: "Recordatorios automáticos",
        starter: false,
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        nombre: "Reglas comerciales avanzadas",
        starter: false,
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        nombre: "Flujos de aprobación",
        starter: false,
        pro: false,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    categoria: "Gestión",
    features: [
      {
        nombre: "Gestión de contratos",
        starter: false,
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        nombre: "Renovaciones y alertas",
        starter: false,
        pro: false,
        business: true,
        enterprise: true,
      },
      {
        nombre: "Reportes avanzados",
        starter: false,
        pro: false,
        business: true,
        enterprise: true,
      },
    ],
  },
  {
    categoria: "Empresa",
    features: [
      {
        nombre: "Usuarios",
        starter: "1",
        pro: "Hasta 5",
        business: "Hasta 20",
        enterprise: "Ilimitados",
      },
      {
        nombre: "API access",
        starter: false,
        pro: true,
        business: true,
        enterprise: true,
      },
      {
        nombre: "SSO / SAML",
        starter: false,
        pro: false,
        business: false,
        enterprise: true,
      },
      {
        nombre: "SLA dedicado",
        starter: false,
        pro: false,
        business: false,
        enterprise: true,
      },
      {
        nombre: "Soporte prioritario",
        starter: false,
        pro: false,
        business: true,
        enterprise: true,
      },
    ],
  },
];

/* ── FAQ ── */

const FAQS = [
  {
    pregunta: "¿Puedo empezar gratis sin tarjeta de crédito?",
    respuesta:
      "Sí. El plan Starter es 100% gratuito y no requiere tarjeta de crédito. Puedes usarlo el tiempo que quieras y actualizar a un plan superior cuando lo necesites.",
  },
  {
    pregunta: "¿Qué pasa si supero los límites de mi plan?",
    respuesta:
      "Te avisaremos cuando estés cerca del límite. Puedes actualizar tu plan en cualquier momento desde la configuración de tu cuenta. No perderás ningún dato.",
  },
  {
    pregunta: "¿Puedo cambiar de plan en cualquier momento?",
    respuesta:
      "Sí. Puedes subir o bajar de plan cuando quieras. Al subir de plan se aplica de inmediato. Al bajar, el cambio se aplica al final del periodo de facturación.",
  },
  {
    pregunta: "¿Ofrecen descuento por facturación anual?",
    respuesta:
      "Sí. Con la facturación anual ahorras un 20% respecto al precio mensual. El plan Pro pasa de 29 a 23 euros al mes y el Business de 79 a 63 euros al mes.",
  },
  {
    pregunta: "¿Qué métodos de pago aceptan?",
    respuesta:
      "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), así como transferencia bancaria para planes anuales. Todos los pagos se procesan de forma segura.",
  },
];

/* ── Helpers ── */

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm font-medium text-gray-900">{value}</span>;
  }
  return value ? (
    <Check className="w-5 h-5 text-[#3a9bb5] mx-auto" aria-label="Incluido" />
  ) : (
    <X className="w-5 h-5 text-gray-300 mx-auto" aria-label="No incluido" />
  );
}

function ctaClasses(style: Plan["ctaStyle"]) {
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

/* ── Page ── */

export default function PreciosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD */}
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt="DealForge"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-bold text-lg text-gray-900">DealForge</span>
          </Link>
          <Link
            href="/registro"
            className="text-sm font-semibold text-[#3a9bb5] hover:text-[#2d7d94] transition-colors"
          >
            Empieza gratis &rarr;
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a9bb5]/5 via-white to-blue-50/30" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-[#3a9bb5]/10 text-[#3a9bb5] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            Precios simples y transparentes
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 max-w-3xl mx-auto">
            Precios transparentes para cada etapa de tu negocio
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed">
            Empieza gratis y escala cuando lo necesites. Sin sorpresas, sin
            contratos de permanencia, sin letra pequeña.
          </p>
          <p className="text-sm font-medium text-[#3a9bb5]">
            Ahorra un 20% con el plan anual
          </p>
        </div>
      </section>

      {/* Pricing Toggle Note */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className="text-sm font-medium text-gray-900">Mensual</span>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-medium text-gray-500">
            Anual{" "}
            <span className="inline-flex items-center bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full ml-1">
              -20%
            </span>
          </span>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {PLANES.map((plan) => (
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
                    Mas popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  {plan.nombre}
                </h2>
                <p className="text-sm text-gray-500 mb-4 min-h-[40px]">
                  {plan.descripcion}
                </p>
                <div className="flex items-baseline gap-1">
                  {plan.precio === "Gratis" || plan.precio === "Contactar" ? (
                    <span className="text-3xl font-bold text-gray-900">
                      {plan.precio}
                    </span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-gray-900">
                        {plan.precio}&euro;
                      </span>
                      <span className="text-sm text-gray-500">
                        {plan.periodo}
                      </span>
                    </>
                  )}
                </div>
                {plan.precioAnual && (
                  <p className="text-xs text-green-600 mt-1">
                    o {plan.precioAnual}&euro;/mes con plan anual (ahorra 20%)
                  </p>
                )}
                {plan.precio === "Gratis" && (
                  <p className="text-xs text-gray-400 mt-1">
                    {plan.periodo}
                  </p>
                )}
              </div>

              <Link href={plan.ctaHref} className={ctaClasses(plan.ctaStyle)}>
                {plan.cta}
              </Link>

              <ul className="mt-6 space-y-3 flex-1">
                {plan.caracteristicas.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2.5 text-sm text-gray-600"
                  >
                    <Check className="w-4 h-4 text-[#3a9bb5] mt-0.5 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Comparativa completa de funcionalidades
            </h2>
            <p className="text-gray-600">
              Revisa en detalle lo que incluye cada plan para elegir el que mejor
              se adapta a tu equipo.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-4 pr-4 text-sm font-semibold text-gray-500 w-1/3">
                    Funcionalidad
                  </th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900 text-center">
                    Starter
                  </th>
                  <th className="py-4 px-4 text-sm font-semibold text-[#3a9bb5] text-center">
                    Pro
                  </th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900 text-center">
                    Business
                  </th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900 text-center">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARACION.map((grupo) => (
                  <>
                    <tr key={`cat-${grupo.categoria}`}>
                      <td
                        colSpan={5}
                        className="pt-8 pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider"
                      >
                        {grupo.categoria}
                      </td>
                    </tr>
                    {grupo.features.map((feat) => (
                      <tr
                        key={feat.nombre}
                        className="border-b border-gray-100 hover:bg-gray-100/50 transition-colors"
                      >
                        <td className="py-3 pr-4 text-sm text-gray-700">
                          {feat.nombre}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <CellValue value={feat.starter} />
                        </td>
                        <td className="py-3 px-4 text-center bg-[#3a9bb5]/[0.02]">
                          <CellValue value={feat.pro} />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <CellValue value={feat.business} />
                        </td>
                        <td className="py-3 px-4 text-center">
                          <CellValue value={feat.enterprise} />
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Preguntas frecuentes sobre precios
            </h2>
            <p className="text-gray-600">
              Si no encuentras tu respuesta, escríbenos a{" "}
              <Link
                href="mailto:hola@dealforge.es"
                className="text-[#3a9bb5] hover:underline"
              >
                hola@dealforge.es
              </Link>
            </p>
          </div>

          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div
                key={faq.pregunta}
                className="border border-gray-200 rounded-xl p-6"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {faq.pregunta}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {faq.respuesta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Empieza gratis hoy
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Crea tu cuenta en menos de 2 minutos. Sin tarjeta de crédito, sin
            compromisos. Actualiza cuando estés listo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/registro"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-white text-[#3a9bb5] font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Crear cuenta gratis
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Hablar con ventas
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.svg"
                alt="DealForge"
                width={28}
                height={28}
                className="rounded-lg"
              />
              <span className="font-bold text-gray-900">DealForge</span>
            </Link>
            <nav className="flex flex-wrap gap-6 text-sm text-gray-500">
              <Link
                href="/funcionalidades"
                className="hover:text-[#3a9bb5] transition-colors"
              >
                Funcionalidades
              </Link>
              <Link
                href="/precios"
                className="hover:text-[#3a9bb5] transition-colors font-medium text-gray-900"
              >
                Precios
              </Link>
              <Link
                href="/blog"
                className="hover:text-[#3a9bb5] transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contacto"
                className="hover:text-[#3a9bb5] transition-colors"
              >
                Contacto
              </Link>
            </nav>
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} DealForge. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
