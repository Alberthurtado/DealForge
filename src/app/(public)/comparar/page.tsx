import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { comparaciones } from "@/data/comparaciones";
import { ArrowRight, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Comparativas CPQ — DealForge vs alternativas",
  description:
    "Compara DealForge con Holded, HubSpot y Excel. Descubre qué herramienta CPQ se adapta mejor a las necesidades de tu equipo de ventas.",
  keywords: [
    "comparativa CPQ",
    "DealForge vs alternativas",
    "software cotizaciones comparativa",
    "mejor CPQ para PYMEs",
    "DealForge vs HubSpot",
    "DealForge vs Holded",
    "DealForge vs Excel",
  ],
  openGraph: {
    title: "Comparativas CPQ — DealForge vs alternativas",
    description:
      "Compara DealForge con Holded, HubSpot y Excel. Descubre qué herramienta CPQ se adapta mejor a tu equipo.",
    url: "https://dealforge.es/comparar",
    siteName: "DealForge",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comparativas CPQ — DealForge vs alternativas",
    description:
      "Compara DealForge con Holded, HubSpot y Excel. Descubre la mejor opción CPQ para tu equipo.",
  },
  alternates: { canonical: "https://dealforge.es/comparar" },
};

const competitorIcons: Record<string, string> = {
  "dealforge-vs-holded": "H",
  "dealforge-vs-hubspot": "HS",
  "dealforge-vs-excel": "Ex",
};

const competitorColors: Record<string, string> = {
  "dealforge-vs-holded": "#4F46E5",
  "dealforge-vs-hubspot": "#FF7A59",
  "dealforge-vs-excel": "#217346",
};

export default function CompararIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Comparativas CPQ — DealForge vs alternativas",
    description:
      "Compara DealForge con Holded, HubSpot y Excel para descubrir qué herramienta CPQ se adapta mejor a tu equipo de ventas.",
    url: "https://dealforge.es/comparar",
    isPartOf: {
      "@type": "WebSite",
      name: "DealForge",
      url: "https://dealforge.es",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: "https://dealforge.es",
        },
        { "@type": "ListItem", position: 2, name: "Comparativas" },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt="DealForge"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="font-bold text-gray-900 text-lg">DealForge</span>
          </Link>
          <Link
            href="/registro"
            className="text-sm font-semibold bg-[#3a9bb5] text-white px-4 py-2 rounded-lg hover:bg-[#2d7d94] transition-colors"
          >
            Empieza gratis
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#3a9bb5]/10 text-[#3a9bb5] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Scale className="w-4 h-4" />
            Comparativas
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            DealForge vs alternativas
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Cada equipo tiene necesidades distintas. Compara DealForge con las
            herramientas m&aacute;s utilizadas para cotizar y descubre cu&aacute;l encaja
            mejor en tu proceso comercial.
          </p>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparaciones.map((comp) => {
            const accentColor =
              competitorColors[comp.slug] || "#6B7280";
            return (
              <Link
                key={comp.slug}
                href={`/comparar/${comp.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-opacity opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: "#3a9bb5" }}
                />

                {/* VS badge */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-[#3a9bb5]/10 flex items-center justify-center">
                    <Image
                      src="/logo.svg"
                      alt="DealForge"
                      width={20}
                      height={20}
                      className="rounded"
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    vs
                  </span>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: accentColor }}
                  >
                    {competitorIcons[comp.slug]}
                  </div>
                </div>

                <h2 className="font-bold text-gray-900 text-lg mb-2">
                  DealForge vs {comp.competidor}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                  {comp.descripcion}
                </p>

                <div className="flex items-center gap-1 text-sm font-semibold text-[#3a9bb5] opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver comparativa completa{" "}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Internal links section */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Conoce m&aacute;s sobre DealForge antes de comparar:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/funcionalidades"
              className="text-sm font-medium text-[#3a9bb5] hover:text-[#2d7d94] underline underline-offset-2"
            >
              Funcionalidades
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/precios"
              className="text-sm font-medium text-[#3a9bb5] hover:text-[#2d7d94] underline underline-offset-2"
            >
              Precios
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/registro"
              className="text-sm font-medium text-[#3a9bb5] hover:text-[#2d7d94] underline underline-offset-2"
            >
              Prueba gratis
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white transform -translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Compru&eacute;balo t&uacute; mismo
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Empieza con el plan Starter gratuito para siempre y compara la experiencia con
              tu herramienta actual. Sin tarjeta de cr&eacute;dito.
            </p>
            <Link
              href="/registro"
              className="inline-flex items-center gap-2 bg-white text-[#3a9bb5] px-8 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-colors"
            >
              Empezar gratis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} DealForge. Todos los derechos
            reservados.
            {" · "}
            <Link
              href="/privacidad"
              className="hover:text-gray-600 underline"
            >
              Privacidad
            </Link>
            {" · "}
            <Link href="/terminos" className="hover:text-gray-600 underline">
              T&eacute;rminos
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
