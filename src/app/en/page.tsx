import type { Metadata } from "next";
import Link from "next/link";
import {
  Flame,
  FileText,
  Sparkles,
  PenTool,
  Bell,
  BarChart3,
  Check,
  ArrowRight,
  Clock,
  ShieldCheck,
  Calculator,
} from "lucide-react";
import { Navbar } from "../_landing/navbar";
import { FooterEn } from "../_landing/footer-en";

export const metadata: Metadata = {
  title: "DealForge — AI Quoting Software (CPQ) for Small Businesses",
  description:
    "Create professional quotes in minutes, not hours. DealForge is the AI-powered CPQ software for SMBs and freelancers: automatic VAT & discounts, e-signature, follow-ups and a built-in AI assistant. Free plan, no card required.",
  keywords: [
    "quoting software", "CPQ software", "quote software for small business",
    "proposal software", "AI quoting", "quote generator", "sales quote tool",
    "DealForge",
  ],
  alternates: {
    canonical: "https://dealforge.es/en",
    languages: {
      "es-ES": "https://dealforge.es/",
      en: "https://dealforge.es/en",
      "x-default": "https://dealforge.es/",
    },
  },
  openGraph: {
    title: "DealForge — AI Quoting Software (CPQ) for Small Businesses",
    description:
      "Create professional quotes in minutes. AI-powered CPQ for SMBs. Free plan, no card required.",
    url: "https://dealforge.es/en",
    siteName: "DealForge",
    locale: "en_GB",
    type: "website",
  },
};

const BENEFITS = [
  {
    icon: Clock,
    title: "Quotes in minutes, not hours",
    desc: "Build a polished, branded quote and export it to PDF before your coffee gets cold.",
  },
  {
    icon: Calculator,
    title: "No more spreadsheet errors",
    desc: "VAT, discounts and margins are calculated automatically. Stop losing money to typos.",
  },
  {
    icon: PenTool,
    title: "Legally valid e-signature",
    desc: "Close deals faster with built-in electronic signature (eIDAS) — no extra tools.",
  },
  {
    icon: Bell,
    title: "Never drop a follow-up",
    desc: "Automated reminders and ready-to-send follow-up emails keep every deal moving.",
  },
];

const FEATURES = [
  { title: "Professional PDF quotes", desc: "Branded, clean quotes your clients take seriously." },
  { title: "Client & product catalog", desc: "A lightweight CRM and product catalog with variants and recurring billing." },
  { title: "Commercial rules", desc: "Max-discount limits, approval flows and mandatory products, enforced automatically." },
  { title: "Contracts & renewals", desc: "Turn won quotes into contracts and track renewals and amendments." },
  { title: "Pipeline reports", desc: "See what's open, won and at risk — with the metrics that matter." },
  { title: "API access", desc: "Connect DealForge to the rest of your stack." },
];

const FAQS = [
  {
    q: "What is CPQ and why do I need it?",
    a: "CPQ stands for Configure, Price, Quote. It's software that automates building sales quotes — ensuring correct prices, authorised discounts and professional documents. If you quote in spreadsheets, a CPQ tool saves hours every week and removes errors.",
  },
  {
    q: "What can Forge, the AI assistant, do?",
    a: "Forge can build a complete quote from a plain-English instruction, analyse your sales pipeline, suggest follow-up actions, look up client and product information, and more. It works like a sales assistant that knows all your data in real time.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The Starter plan is free forever (10 quotes/month, no credit card). You can also try the online quote generator without signing up.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Your data is stored securely and encrypted, and we never share it with third parties. The AI processes queries in real time without storing conversations. We comply with GDPR and EU data-protection rules.",
  },
  {
    q: "Can I import my existing data?",
    a: "Yes. You can import clients and products from CSV files in the Integrations section. The system detects duplicates and updates existing records automatically. You can also export all your data at any time.",
  },
  {
    q: "Is there a contract or lock-in?",
    a: "No. All plans are monthly and you can cancel anytime — no penalties, no minimum term. Your data is yours and you can export it before cancelling.",
  },
  {
    q: "Can I brand my quotes?",
    a: "Yes. Set your logo, brand colours and company details, and your PDF quotes are generated automatically with your visual identity. Higher plans add extra templates and advanced customisation.",
  },
  {
    q: "How does sending quotes by email work?",
    a: "From the Pro plan, you can send quotes directly by email from DealForge using your own SMTP and domain. The recipient gets a professional email with the PDF attached, and you can track the status of each send.",
  },
  {
    q: "Does DealForge integrate with my CRM or ERP?",
    a: "Yes. The Business plan includes CRM integrations, and you can use the REST API to connect DealForge to any tool (Zapier, Make, n8n). CSV import/export is available from the Pro plan.",
  },
  {
    q: "How is it different from quoting in a spreadsheet?",
    a: "Spreadsheets need manual calculations, have no version control, don't generate PDFs automatically and don't support real-time collaboration. DealForge automates everything: pricing, discounts, taxes, PDF generation, email sending and status tracking.",
  },
  {
    q: "Which currencies do you support?",
    a: "You can be billed in EUR, USD or GBP. Pricing adapts to your market automatically.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function EnHome() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar locale="en" altHref="/" />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3a9bb5]/10 text-[#3a9bb5] text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI-powered quoting for small businesses
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
            Professional quotes in{" "}
            <span className="text-[#3a9bb5]">minutes</span>, not hours
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            DealForge is the AI quoting software (CPQ) that helps SMBs and freelancers
            send polished, accurate quotes and win more deals. Automatic VAT and
            discounts, e-signature, follow-ups and a built-in AI assistant.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/registro?lang=en"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#3a9bb5] hover:bg-[#2d7d94] px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-[#3a9bb5]/25"
            >
              <Flame className="w-4 h-4" />
              Start free — no card
            </Link>
            <Link
              href="/en/pricing"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 px-7 py-3.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
            >
              See pricing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Free forever plan · No credit card · Set up in minutes
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="w-11 h-11 rounded-xl bg-[#3a9bb5]/10 flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-[#3a9bb5]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">{b.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to quote and close</h2>
            <p className="mt-3 text-gray-600">
              One tool from first quote to signed contract — without the spreadsheet chaos.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-4 h-4 text-[#3a9bb5]" />
                  <h3 className="font-semibold text-gray-900">{f.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forge AI */}
      <section id="forge" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3a9bb5]/10 text-[#3a9bb5] text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Meet Forge, your AI assistant
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Create a quote by just describing it
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed">
            &ldquo;Quote 10 hours of consulting and an annual support plan for Acme Ltd.&rdquo;
            Forge builds the full quote, applies your pricing rules, and gets it ready to send —
            in plain English.
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-left">
            {[
              { icon: FileText, t: "Drafts full quotes", d: "From a one-line instruction." },
              { icon: BarChart3, t: "Answers about your pipeline", d: "&ldquo;What's open this month?&rdquo;" },
              { icon: ShieldCheck, t: "Applies your rules", d: "Discounts and approvals, automatically." },
            ].map((c) => (
              <div key={c.t} className="bg-white rounded-2xl border border-gray-100 p-5">
                <c.icon className="w-5 h-5 text-[#3a9bb5] mb-3" />
                <h3 className="font-semibold text-gray-900 text-sm">{c.t}</h3>
                <p className="text-sm text-gray-500 mt-1" dangerouslySetInnerHTML={{ __html: c.d }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">Simple, transparent pricing</h2>
          <p className="mt-3 text-gray-600">
            Start free. Upgrade when you&rsquo;re ready. Billed in EUR, USD or GBP.
          </p>
          <div className="mt-8">
            <Link
              href="/en/pricing"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#3a9bb5] hover:bg-[#2d7d94] px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-[#3a9bb5]/25"
            >
              View plans
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
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

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white">Send your first quote today</h2>
          <p className="mt-3 text-white/80">
            Join the small businesses replacing spreadsheets with DealForge.
          </p>
          <Link
            href="/registro?lang=en"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#3a9bb5] bg-white hover:bg-gray-50 px-7 py-3.5 rounded-xl transition-colors"
          >
            <Flame className="w-4 h-4" />
            Start free — no card required
          </Link>
        </div>
      </section>

      <FooterEn />
    </div>
  );
}
