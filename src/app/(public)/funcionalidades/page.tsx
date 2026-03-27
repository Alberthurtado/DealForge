import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { features } from "@/data/features";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getIcon(name: string): any {
  return (LucideIcons as Record<string, unknown>)[name] || LucideIcons.HelpCircle;
}

export const metadata: Metadata = {
  title: "Funcionalidades — DealForge",
  description:
    "Descubre todas las funcionalidades de DealForge: cotizaciones CPQ, catálogo de productos, aprobaciones, firma electrónica, analítica y más. Todo lo que necesitas para cerrar ventas más rápido.",
  keywords: [
    "funcionalidades CPQ", "software cotizaciones", "DealForge funcionalidades",
    "configurador precios", "firma electrónica cotizaciones", "analítica ventas",
  ],
  openGraph: {
    title: "Funcionalidades — DealForge",
    description: "Todas las funcionalidades CPQ que necesitas para cerrar ventas más rápido.",
    url: "https://dealforge.es/funcionalidades",
    siteName: "DealForge",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Funcionalidades — DealForge",
    description: "Todas las funcionalidades CPQ que necesitas para cerrar ventas más rápido.",
  },
  alternates: { canonical: "https://dealforge.es/funcionalidades" },
};

export default function FuncionalidadesIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Funcionalidades de DealForge",
    description: "Todas las funcionalidades CPQ de DealForge para equipos de ventas",
    url: "https://dealforge.es/funcionalidades",
    isPartOf: { "@type": "WebSite", name: "DealForge", url: "https://dealforge.es" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://dealforge.es" },
        { "@type": "ListItem", position: 2, name: "Funcionalidades" },
      ],
    },
  };

  const planColors: Record<string, string> = {
    Starter: "#6B7280",
    Professional: "#3a9bb5",
    "Business+": "#7C3AED",
    Business: "#7C3AED",
    Enterprise: "#DC2626",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="DealForge" width={28} height={28} className="rounded-md" />
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Todas las funcionalidades de DealForge
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Desde la creación de cotizaciones hasta la firma y analítica. Todo lo que tu equipo de ventas necesita para cerrar más deals, más rápido.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat) => {
            const Icon = getIcon(feat.icono);
            return (
              <Link
                key={feat.slug}
                href={`/funcionalidades/${feat.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 transition-opacity opacity-0 group-hover:opacity-100" style={{ backgroundColor: feat.color }} />
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: `${feat.color}12` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: feat.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-bold text-gray-900 text-sm">{feat.nombre}</h2>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
                      {feat.descripcion}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{
                          backgroundColor: `${planColors[feat.plan] || "#6B7280"}15`,
                          color: planColors[feat.plan] || "#6B7280",
                        }}
                      >
                        {feat.plan}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: feat.color }}>
                        Ver más <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white transform -translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Transforma tu proceso de ventas hoy
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Prueba todas las funcionalidades gratis durante 14 días. Sin tarjeta de crédito, sin compromiso.
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
            &copy; {new Date().getFullYear()} DealForge. Todos los derechos reservados.
            {" · "}
            <Link href="/privacidad" className="hover:text-gray-600 underline">Privacidad</Link>
            {" · "}
            <Link href="/terminos" className="hover:text-gray-600 underline">Términos</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
