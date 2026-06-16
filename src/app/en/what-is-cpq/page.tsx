import type { Metadata } from "next";
import Link from "next/link";
import { Settings, Calculator, FileText, ArrowRight, Check } from "lucide-react";
import { Navbar } from "../../_landing/navbar";
import { FooterEn } from "../../_landing/footer-en";

export const metadata: Metadata = {
  title: "What is CPQ? Configure, Price, Quote explained (2026 guide) — DealForge",
  description:
    "CPQ stands for Configure, Price, Quote — software that automates how businesses build quotes. Learn what CPQ is, how it works, who needs it, and how it compares to spreadsheets.",
  keywords: [
    "what is CPQ", "CPQ meaning", "configure price quote", "CPQ software",
    "CPQ explained", "CPQ for small business", "quoting software",
  ],
  alternates: {
    canonical: "https://dealforge.es/en/what-is-cpq",
    languages: {
      "es-ES": "https://dealforge.es/que-es-cpq",
      en: "https://dealforge.es/en/what-is-cpq",
      "x-default": "https://dealforge.es/que-es-cpq",
    },
  },
  openGraph: {
    title: "What is CPQ? Configure, Price, Quote explained",
    description:
      "CPQ (Configure, Price, Quote) automates how businesses build and send quotes. A plain-English guide.",
    url: "https://dealforge.es/en/what-is-cpq",
    siteName: "DealForge",
    locale: "en_GB",
    type: "article",
  },
};

const STEPS = [
  {
    icon: Settings,
    letter: "C",
    title: "Configure",
    desc: "Select and combine the right products or services for the customer, with compatibility rules applied automatically so you never quote an invalid combination.",
  },
  {
    icon: Calculator,
    letter: "P",
    title: "Price",
    desc: "Calculate prices with discounts, taxes (VAT), margins and commercial rules automatically — no spreadsheet formulas, no manual errors.",
  },
  {
    icon: FileText,
    letter: "Q",
    title: "Quote",
    desc: "Generate a professional quote document (PDF) ready to send to the customer in minutes, not hours.",
  },
];

const FAQS = [
  {
    q: "What does CPQ stand for?",
    a: "CPQ stands for Configure, Price, Quote. It refers to software that automates the three steps of building a sales quote: configuring the product or service, pricing it correctly, and generating the quote document.",
  },
  {
    q: "Who needs CPQ software?",
    a: "Any business that sends quotes or proposals — freelancers, agencies, consultancies, installers, and SMBs with sales teams. If you currently quote in Excel or Word, a CPQ tool saves time and removes errors.",
  },
  {
    q: "How is CPQ different from a spreadsheet?",
    a: "A spreadsheet doesn't enforce pricing rules, calculate VAT reliably, produce a branded PDF, capture e-signatures, or follow up with the client. CPQ software does all of this in one place, which means faster, more accurate, more professional quotes.",
  },
  {
    q: "Is CPQ only for large enterprises?",
    a: "No. Traditional CPQ tools were built for big companies, but modern tools like DealForge are designed for small and medium businesses, with simple interfaces and a free plan to start.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is CPQ? Configure, Price, Quote explained",
    description:
      "CPQ stands for Configure, Price, Quote — software that automates how businesses build quotes.",
    inLanguage: "en",
    author: { "@type": "Organization", name: "DealForge" },
    publisher: {
      "@type": "Organization",
      name: "DealForge",
      logo: { "@type": "ImageObject", url: "https://dealforge.es/logo.svg" },
    },
    mainEntityOfPage: "https://dealforge.es/en/what-is-cpq",
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

export default function EnWhatIsCpqPage() {
  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Navbar locale="en" altHref="/que-es-cpq" />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[#3a9bb5] uppercase tracking-wide mb-3">Guide</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            What is CPQ?
          </h1>
          <p className="mt-5 text-lg text-gray-600 leading-relaxed">
            <strong>CPQ stands for Configure, Price, Quote.</strong> It&rsquo;s software that
            automates how a business builds and sends quotes — from picking the right products
            to calculating the price to generating a professional document, all in minutes.
          </p>
        </div>
      </section>

      {/* The three steps */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <div key={s.title} className="rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#3a9bb5] text-white flex items-center justify-center font-bold text-lg">
                    {s.letter}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{s.title}</h2>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why businesses move to CPQ</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Most small businesses start out quoting in Excel or Word. It works — until it doesn&rsquo;t.
            Formulas break, the wrong price slips through, the PDF looks amateur, and follow-ups get
            forgotten. Every one of those costs you deals. CPQ software fixes the whole process:
          </p>
          <ul className="space-y-3">
            {[
              "Send a polished, branded quote in minutes instead of hours",
              "Never make a pricing or VAT calculation error again",
              "Apply discount limits and approval rules automatically",
              "Capture a legally valid e-signature to close faster",
              "Follow up automatically so no quote goes cold",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-gray-700">
                <Check className="w-5 h-5 text-[#3a9bb5] mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
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

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white">Try CPQ built for small businesses</h2>
          <p className="mt-3 text-white/80">
            DealForge is modern CPQ software with a free plan. Send your first quote today.
          </p>
          <Link
            href="/registro?lang=en"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#3a9bb5] bg-white hover:bg-gray-50 px-7 py-3.5 rounded-xl transition-colors"
          >
            Start free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <FooterEn />
    </div>
  );
}
