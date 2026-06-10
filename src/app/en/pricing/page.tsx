import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { Navbar } from "../../_landing/navbar";
import { EnPricingCards } from "@/components/precios/en-pricing-cards";
import { countryToCurrency } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing — DealForge | Quoting Software Plans from Free",
  description:
    "Simple, transparent pricing for DealForge, the AI quoting (CPQ) software for small businesses. Free plan available. Billed in EUR, USD or GBP. Save 20% with annual billing.",
  keywords: [
    "DealForge pricing", "CPQ pricing", "quoting software price",
    "quote software pricing", "free quoting software", "CPQ plans",
  ],
  alternates: {
    canonical: "https://dealforge.es/en/pricing",
    languages: {
      "es-ES": "https://dealforge.es/precios",
      en: "https://dealforge.es/en/pricing",
      "x-default": "https://dealforge.es/precios",
    },
  },
  openGraph: {
    title: "Pricing — DealForge | Quoting Software Plans from Free",
    description:
      "Transparent plans for every stage of your business. Start free and scale when you need to.",
    url: "https://dealforge.es/en/pricing",
    siteName: "DealForge",
    locale: "en_GB",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Pricing — DealForge",
  description:
    "Pricing for DealForge, the AI quoting software for small businesses. Plans from free to enterprise.",
  url: "https://dealforge.es/en/pricing",
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: "DealForge",
    url: "https://dealforge.es",
    logo: { "@type": "ImageObject", url: "https://dealforge.es/logo.svg" },
  },
};

export default async function EnPricingPage() {
  const hdrs = await headers();
  const country = hdrs.get("x-vercel-ip-country");
  // Default to the visitor's currency; English visitors are most often UK/US.
  const initialCurrency = countryToCurrency(country) === "EUR" ? "GBP" : countryToCurrency(country);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar locale="en" altHref="/precios" />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Start free. Upgrade when you&rsquo;re ready. Billed in EUR, USD or GBP.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <EnPricingCards initialCurrency={initialCurrency} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">DealForge</span>
            <span>· AI quoting software for SMBs</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/en" className="hover:text-gray-900">Home</Link>
            <Link href="/precios" className="hover:text-gray-900">Español</Link>
            <Link href="/login?lang=en" className="hover:text-gray-900">Log in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
