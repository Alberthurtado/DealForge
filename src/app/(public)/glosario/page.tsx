import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { terminosOrdenados } from "@/data/glosario";
import { GlosarioContent } from "@/components/glosario/glosario-content";

export const metadata: Metadata = {
  title: "Glosario de CPQ y Ventas — Terminología Comercial | DealForge",
  description:
    "Glosario completo de CPQ, ventas y terminología comercial en español. Más de 30 términos explicados de forma clara para equipos comerciales y PYMEs.",
  keywords: [
    "glosario CPQ",
    "glosario ventas",
    "terminología comercial",
    "diccionario ventas",
    "términos CPQ",
    "vocabulario comercial",
    "glosario B2B",
    "DealForge",
  ],
  openGraph: {
    title: "Glosario de CPQ y Ventas — Terminología Comercial",
    description:
      "Más de 30 términos de CPQ, ventas y gestión comercial explicados de forma clara y práctica.",
    url: "https://dealforge.es/glosario",
    siteName: "DealForge",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://dealforge.es/og-glosario.png",
        width: 1200,
        height: 630,
        alt: "Glosario de CPQ y Ventas — DealForge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glosario de CPQ y Ventas — Terminología Comercial",
    description:
      "Más de 30 términos de CPQ, ventas y gestión comercial explicados de forma clara.",
    images: ["https://dealforge.es/og-glosario.png"],
  },
  alternates: { canonical: "https://dealforge.es/glosario" },
};

/* ─── JSON-LD ──────────────────────────────────────────────────────── */

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Glosario de CPQ y Ventas",
    description:
      "Más de 30 términos de CPQ, ventas y gestión comercial explicados de forma clara para equipos comerciales.",
    url: "https://dealforge.es/glosario",
    hasDefinedTerm: terminosOrdenados.map((t) => ({
      "@type": "DefinedTerm",
      name: t.nombre,
      description: t.definicion,
      url: `https://dealforge.es/glosario#${t.id}`,
    })),
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
        name: "Glosario",
        item: "https://dealforge.es/glosario",
      },
    ],
  },
];

/* ─── Page ─────────────────────────────────────────────────────────── */

export default function GlosarioPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a9bb5]/5 via-white to-amber-50/30" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-[#3a9bb5]/10 text-[#3a9bb5] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <BookOpen className="w-4 h-4" />
            Glosario
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Glosario de CPQ y Ventas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Consulta la terminología comercial más utilizada en el mundo de las
            ventas B2B, los sistemas CPQ y la gestión de cotizaciones. Definiciones
            claras, prácticas y en español.
          </p>
        </div>
      </section>

      {/* Client-side content with search */}
      <GlosarioContent terminos={terminosOrdenados} />

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-2xl p-8 sm:p-12 text-white text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Pon en práctica estos conceptos
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              DealForge es el CPQ diseñado para PYMEs que quieren crear
              cotizaciones profesionales, automatizar sus procesos comerciales y
              cerrar más deals en menos tiempo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/registro"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#3a9bb5] font-semibold text-sm px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Empieza Gratis — Sin tarjeta
              </Link>
              <Link
                href="/funcionalidades"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-medium text-sm px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                Ver funcionalidades
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} DealForge. Todos los derechos
          reservados.
        </p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <Link href="/privacidad" className="hover:text-gray-600 transition-colors">
            Privacidad
          </Link>
          <Link href="/terminos" className="hover:text-gray-600 transition-colors">
            Términos
          </Link>
        </div>
      </footer>
    </div>
  );
}
