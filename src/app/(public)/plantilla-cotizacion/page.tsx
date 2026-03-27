import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { industrias } from "@/data/industrias";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Plantillas de Cotización por Sector — DealForge",
  description:
    "Plantillas de cotización profesionales para más de 20 sectores: construcción, consultoría, marketing, diseño, desarrollo web y más. Gratis y personalizables.",
  keywords: [
    "plantilla cotización", "modelo presupuesto", "plantilla presupuesto gratis",
    "cotización profesional", "presupuesto por sector",
  ],
  openGraph: {
    title: "Plantillas de Cotización por Sector — DealForge",
    description: "Más de 20 plantillas de cotización profesionales. Gratis y personalizables.",
    url: "https://dealforge.es/plantilla-cotizacion",
  },
  alternates: { canonical: "https://dealforge.es/plantilla-cotizacion" },
};

export default function PlantillasIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Plantillas de Cotización por Sector",
    description: "Plantillas de cotización profesionales para más de 20 sectores",
    url: "https://dealforge.es/plantilla-cotizacion",
    isPartOf: { "@type": "WebSite", name: "DealForge", url: "https://dealforge.es" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://dealforge.es" },
        { "@type": "ListItem", position: 2, name: "Plantillas de Cotización" },
      ],
    },
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
            Crear cotización gratis
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Plantillas de Cotización por Sector
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Elige tu sector y crea cotizaciones profesionales en minutos. Cada plantilla incluye ejemplos reales, campos específicos y está lista para usar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industrias.map((ind) => (
            <Link
              key={ind.slug}
              href={`/plantilla-cotizacion/${ind.slug}`}
              className="group bg-white rounded-xl border-l-4 border border-gray-200 p-5 hover:shadow-md transition-all"
              style={{ borderLeftColor: ind.color }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{ind.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-gray-900 transition-colors" style={{ ["--c" as string]: ind.color }}>
                    {ind.nombre}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">Para {ind.icp.cargo.toLowerCase()}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {ind.descripcion}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#3a9bb5] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver plantilla <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">¿No encuentras tu sector?</h2>
          <p className="text-white/80 mb-6">
            DealForge funciona para cualquier negocio. Crea tu propia plantilla personalizada en minutos.
          </p>
          <Link
            href="/registro"
            className="inline-flex items-center gap-2 bg-white text-[#3a9bb5] px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            Empezar gratis <ArrowRight className="w-4 h-4" />
          </Link>
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
