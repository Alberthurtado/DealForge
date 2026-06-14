import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { comparacionesEn } from "@/data/comparaciones-en";
import { ArrowRight, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "CPQ Comparisons — DealForge vs alternatives",
  description:
    "Compare DealForge with Holded, HubSpot and Excel. Find out which CPQ tool best fits your sales team's needs.",
  keywords: [
    "CPQ comparison",
    "DealForge vs alternatives",
    "quoting software comparison",
    "best CPQ for small business",
    "DealForge vs HubSpot",
    "DealForge vs Holded",
    "DealForge vs Excel",
  ],
  openGraph: {
    title: "CPQ Comparisons — DealForge vs alternatives",
    description:
      "Compare DealForge with Holded, HubSpot and Excel. Find out which CPQ tool best fits your team.",
    url: "https://dealforge.es/en/compare",
    siteName: "DealForge",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CPQ Comparisons — DealForge vs alternatives",
    description: "Compare DealForge with Holded, HubSpot and Excel.",
  },
  alternates: {
    canonical: "https://dealforge.es/en/compare",
    languages: {
      "es-ES": "https://dealforge.es/comparar",
      en: "https://dealforge.es/en/compare",
      "x-default": "https://dealforge.es/comparar",
    },
  },
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

export default function EnCompareIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "CPQ Comparisons — DealForge vs alternatives",
    description:
      "Compare DealForge with Holded, HubSpot and Excel to find out which CPQ tool best fits your sales team.",
    url: "https://dealforge.es/en/compare",
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "DealForge", url: "https://dealforge.es" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://dealforge.es/en" },
        { "@type": "ListItem", position: 2, name: "Comparisons" },
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
            Start free
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#3a9bb5]/10 text-[#3a9bb5] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Scale className="w-4 h-4" />
            Comparisons
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            DealForge vs alternatives
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Every team has different needs. Compare DealForge with the most-used quoting
            tools and discover which one fits your sales process best.
          </p>
        </div>

        {/* Comparison cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparacionesEn.map((comp) => {
            const accentColor = competitorColors[comp.slug] || "#6B7280";
            return (
              <Link
                key={comp.slug}
                href={`/en/compare/${comp.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5 relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-opacity opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: "#3a9bb5" }}
                />

                {/* VS badge */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-[#3a9bb5]/10 flex items-center justify-center">
                    <Image src="/logo.svg" alt="DealForge" width={20} height={20} className="rounded" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">vs</span>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: accentColor }}
                  >
                    {competitorIcons[comp.slug]}
                  </div>
                </div>

                <h2 className="font-bold text-gray-900 text-lg mb-2">DealForge vs {comp.competidor}</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{comp.descripcion}</p>

                <div className="flex items-center gap-1 text-sm font-semibold text-[#3a9bb5] opacity-0 group-hover:opacity-100 transition-opacity">
                  See full comparison <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Internal links section */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">Learn more about DealForge before comparing:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/en/features" className="text-sm font-medium text-[#3a9bb5] hover:text-[#2d7d94] underline underline-offset-2">Features</Link>
            <span className="text-gray-300">|</span>
            <Link href="/en/pricing" className="text-sm font-medium text-[#3a9bb5] hover:text-[#2d7d94] underline underline-offset-2">Pricing</Link>
            <span className="text-gray-300">|</span>
            <Link href="/registro?lang=en" className="text-sm font-medium text-[#3a9bb5] hover:text-[#2d7d94] underline underline-offset-2">Start free</Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white transform -translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">See for yourself</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Start with the free-forever Starter plan and compare the experience with your
              current tool. No credit card required.
            </p>
            <Link
              href="/registro?lang=en"
              className="inline-flex items-center gap-2 bg-white text-[#3a9bb5] px-8 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-colors"
            >
              Start free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
          </p>
        </div>
      </footer>
    </div>
  );
}
