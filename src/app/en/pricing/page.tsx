import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { Navbar } from "../../_landing/navbar";
import { FooterEn } from "../../_landing/footer-en";
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

interface FeatureRow {
  name: string;
  starter: boolean | string;
  pro: boolean | string;
  business: boolean | string;
  enterprise: boolean | string;
}

const COMPARISON: { category: string; features: FeatureRow[] }[] = [
  {
    category: "Quotes",
    features: [
      { name: "Quotes/month", starter: "10", pro: "100", business: "Unlimited", enterprise: "Unlimited" },
      { name: "Custom templates", starter: true, pro: true, business: true, enterprise: true },
      { name: "Versioning", starter: false, pro: true, business: true, enterprise: true },
      { name: "E-signature", starter: false, pro: true, business: true, enterprise: true },
    ],
  },
  {
    category: "Clients & products",
    features: [
      { name: "Clients", starter: "5", pro: "50", business: "Unlimited", enterprise: "Unlimited" },
      { name: "Products", starter: "10", pro: "200", business: "Unlimited", enterprise: "Unlimited" },
      { name: "Import / Export", starter: false, pro: true, business: true, enterprise: true },
    ],
  },
  {
    category: "Automation",
    features: [
      { name: "Forge AI", starter: "5 queries", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
      { name: "Email sending", starter: false, pro: true, business: true, enterprise: true },
      { name: "Automated reminders", starter: false, pro: true, business: true, enterprise: true },
      { name: "Advanced commercial rules", starter: false, pro: false, business: true, enterprise: true },
      { name: "Approval flows", starter: false, pro: false, business: true, enterprise: true },
    ],
  },
  {
    category: "Management",
    features: [
      { name: "Contract management", starter: false, pro: false, business: true, enterprise: true },
      { name: "Renewals & alerts", starter: false, pro: false, business: true, enterprise: true },
      { name: "Advanced reports", starter: false, pro: false, business: true, enterprise: true },
    ],
  },
  {
    category: "Company",
    features: [
      { name: "Users", starter: "1", pro: "Up to 5", business: "Up to 20", enterprise: "Unlimited" },
      { name: "API access", starter: false, pro: true, business: true, enterprise: true },
      { name: "SSO / SAML", starter: false, pro: false, business: false, enterprise: true },
      { name: "Dedicated SLA", starter: false, pro: false, business: false, enterprise: true },
      { name: "Priority support", starter: false, pro: false, business: true, enterprise: true },
    ],
  },
];

const FAQS = [
  {
    q: "Can I start free without a credit card?",
    a: "Yes. The Starter plan is 100% free and needs no credit card. Use it for as long as you like and upgrade whenever you need to.",
  },
  {
    q: "What happens if I exceed my plan limits?",
    a: "We'll warn you as you approach the limit. You can upgrade anytime from your account settings — you won't lose any data.",
  },
  {
    q: "Can I change plans anytime?",
    a: "Yes. You can upgrade or downgrade whenever you like. Upgrades apply immediately; downgrades take effect at the end of the billing period.",
  },
  {
    q: "Do you offer an annual discount?",
    a: "Yes. Annual billing saves 20% compared to paying monthly, in every currency (EUR, USD and GBP).",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept credit and debit cards (Visa, Mastercard, American Express) and bank transfer for annual plans. All payments are processed securely.",
  },
];

const jsonLd = [
  {
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

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-4 h-4 text-[#3a9bb5] mx-auto" />;
  if (value === false) return <Minus className="w-4 h-4 text-gray-300 mx-auto" />;
  return <span className="text-sm text-gray-700">{value}</span>;
}

export default async function EnPricingPage() {
  const hdrs = await headers();
  const country = hdrs.get("x-vercel-ip-country");
  const initialCurrency = countryToCurrency(country) === "EUR" ? "GBP" : countryToCurrency(country);

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <Navbar locale="en" altHref="/precios" />

      {/* Hero */}
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

      {/* Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <EnPricingCards initialCurrency={initialCurrency} />
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Full feature comparison
            </h2>
            <p className="text-gray-600">
              See exactly what each plan includes to pick the one that fits your team.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-4 pr-4 text-sm font-semibold text-gray-500 w-1/3">Feature</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900 text-center">Starter</th>
                  <th className="py-4 px-4 text-sm font-semibold text-[#3a9bb5] text-center">Pro</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900 text-center">Business</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-900 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((group) => (
                  <>
                    <tr key={`cat-${group.category}`}>
                      <td colSpan={5} className="pt-8 pb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {group.category}
                      </td>
                    </tr>
                    {group.features.map((feat) => (
                      <tr key={feat.name} className="border-b border-gray-100 hover:bg-gray-100/50 transition-colors">
                        <td className="py-3 pr-4 text-sm text-gray-700">{feat.name}</td>
                        <td className="py-3 px-4 text-center"><CellValue value={feat.starter} /></td>
                        <td className="py-3 px-4 text-center bg-[#3a9bb5]/[0.02]"><CellValue value={feat.pro} /></td>
                        <td className="py-3 px-4 text-center"><CellValue value={feat.business} /></td>
                        <td className="py-3 px-4 text-center"><CellValue value={feat.enterprise} /></td>
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
              Pricing FAQ
            </h2>
            <p className="text-gray-600">
              Can&rsquo;t find your answer? Email us at{" "}
              <Link href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">
                info@dealforge.es
              </Link>
            </p>
          </div>

          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Start free today</h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Create your account in under 2 minutes. No credit card, no commitment. Upgrade when you&rsquo;re ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/registro?lang=en"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-white text-[#3a9bb5] font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Create free account
            </Link>
            <Link
              href="/en/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Talk to sales
            </Link>
          </div>
        </div>
      </section>

      <FooterEn />
    </div>
  );
}
