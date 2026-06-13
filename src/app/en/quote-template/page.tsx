import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { industriasEn } from "@/data/industrias-en";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Quote Templates by Industry — DealForge",
  description:
    "Professional quote templates for multiple industries: construction, consulting, marketing, design, web development and more. Free and customisable.",
  keywords: [
    "quote template", "estimate template", "free quote template",
    "professional quote", "industry quote template",
  ],
  openGraph: {
    title: "Quote Templates by Industry — DealForge",
    description: "Professional quote templates by industry. Free and customisable.",
    url: "https://dealforge.es/en/quote-template",
    siteName: "DealForge",
    locale: "en_GB",
    type: "website",
  },
  alternates: {
    canonical: "https://dealforge.es/en/quote-template",
    languages: {
      "es-ES": "https://dealforge.es/plantilla-cotizacion",
      en: "https://dealforge.es/en/quote-template",
      "x-default": "https://dealforge.es/plantilla-cotizacion",
    },
  },
};

export default function QuoteTemplatesIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Quote Templates by Industry",
    description: "Professional quote templates for multiple industries",
    url: "https://dealforge.es/en/quote-template",
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "DealForge", url: "https://dealforge.es" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://dealforge.es/en" },
        { "@type": "ListItem", position: 2, name: "Quote Templates" },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/en" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="DealForge" width={28} height={28} className="rounded-md" />
            <span className="font-bold text-gray-900 text-lg">DealForge</span>
          </Link>
          <Link
            href="/registro?lang=en"
            className="text-sm font-semibold bg-[#3a9bb5] text-white px-4 py-2 rounded-lg hover:bg-[#2d7d94] transition-colors"
          >
            Create a quote free
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Quote Templates by Industry
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Choose your industry and create professional quotes in minutes. Each template includes real examples, industry-specific fields and is ready to use.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industriasEn.map((ind) => (
            <Link
              key={ind.slug}
              href={`/en/quote-template/${ind.slug}`}
              className="group bg-white rounded-xl border-l-4 border border-gray-200 p-5 hover:shadow-md transition-all"
              style={{ borderLeftColor: ind.color }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{ind.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-gray-900 transition-colors" style={{ ["--c" as string]: ind.color }}>
                    {ind.nombre}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">For {ind.icp.cargo.toLowerCase()}s</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {ind.descripcion}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#3a9bb5] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    View template <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Can&apos;t find your industry?</h2>
          <p className="text-white/80 mb-6">
            DealForge works for any business. Create your own custom template in minutes.
          </p>
          <Link
            href="/registro?lang=en"
            className="inline-flex items-center gap-2 bg-white text-[#3a9bb5] px-8 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            Start free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} DealForge. All rights reserved.
            {" · "}
            <Link href="/en/privacy" className="hover:text-gray-600 underline">Privacy</Link>
            {" · "}
            <Link href="/en/terms" className="hover:text-gray-600 underline">Terms</Link>
            {" · "}
            <Link href="/plantilla-cotizacion" className="hover:text-gray-600 underline">Español 🇪🇸</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
