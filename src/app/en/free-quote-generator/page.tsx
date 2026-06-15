import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../../_landing/navbar";
import { FooterEn } from "../../_landing/footer-en";
import { Generator } from "../../(public)/generador-cotizacion-gratis/generator";

export const metadata: Metadata = {
  title: "Free Quote Generator — Create a PDF Quote Online, No Signup | DealForge",
  description:
    "Create a professional quote in PDF for free, no signup. Add line items, VAT, discounts and terms, then download instantly. Watermark-free version with DealForge.",
  keywords: [
    "free quote generator", "online quote maker", "create quote online",
    "free quote template", "quote generator PDF", "free invoice quote",
    "sales quote generator", "DealForge",
  ],
  alternates: {
    canonical: "https://dealforge.es/en/free-quote-generator",
    languages: {
      "es-ES": "https://dealforge.es/generador-cotizacion-gratis",
      en: "https://dealforge.es/en/free-quote-generator",
      "x-default": "https://dealforge.es/generador-cotizacion-gratis",
    },
  },
  openGraph: {
    title: "Free Quote Generator — Create a PDF Quote Online, No Signup",
    description: "Build a professional PDF quote in under 2 minutes. Free, no signup.",
    url: "https://dealforge.es/en/free-quote-generator",
    siteName: "DealForge",
    locale: "en_GB",
    type: "website",
  },
};

const FAQS = [
  {
    q: "Is the quote generator really free?",
    a: "Yes — 100% free and no signup. You can build and download your quote as a PDF instantly. The watermark-free version requires a free DealForge account.",
  },
  {
    q: "What do I need to create a quote?",
    a: "Your details (name, tax ID, address), the client's details, the line items with quantity and price, the VAT rate, and any commercial terms. It's all in one form.",
  },
  {
    q: "Is the quote saved anywhere?",
    a: "No. This free version stores nothing, to protect your privacy. If you need to save clients, products, templates and history, sign up free with DealForge.",
  },
  {
    q: "Which currencies are supported?",
    a: "You can generate the quote in USD, EUR or GBP — pick your currency in the form.",
  },
  {
    q: "How do I remove the 'DealForge' watermark?",
    a: "Sign up free with DealForge (Starter plan, no card) and generate unlimited watermark-free quotes with your own logo and colours.",
  },
];

const STEPS = [
  { num: "1", title: "Add your details", desc: "Your business and your client's details." },
  { num: "2", title: "Add line items", desc: "Describe what you're quoting, with quantity, price and discount." },
  { num: "3", title: "Set VAT & terms", desc: "Pick your currency, VAT rate and payment terms." },
  { num: "4", title: "Download the PDF", desc: "Generate a professional quote and download it instantly." },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DealForge Free Quote Generator",
    url: "https://dealforge.es/en/free-quote-generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "en",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function EnFreeQuoteGeneratorPage() {
  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Navbar locale="en" altHref="/generador-cotizacion-gratis" />

      {/* Hero */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Free quote generator
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Create a professional PDF quote in under 2 minutes. No signup, no cost.
            Add line items, VAT and terms, then download instantly.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s) => (
            <div key={s.num} className="rounded-xl border border-gray-100 p-4">
              <div className="w-8 h-8 rounded-lg bg-[#3a9bb5] text-white flex items-center justify-center font-bold text-sm mb-2">
                {s.num}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{s.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Generator */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Generator lang="en" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <details key={f.q} className="group bg-white rounded-2xl border border-gray-100 p-5">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900 list-none">
                  {f.q}
                  <span className="text-[#3a9bb5] group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FooterEn />
    </div>
  );
}
