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
    q: "What is DealForge?",
    a: "DealForge is AI-powered quoting (CPQ) software for small businesses, freelancers and sales teams. It helps you create professional quotes, manage clients and products, sign electronically and follow up automatically.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The Starter plan is free forever (10 quotes/month, no credit card). You can also try the online quote generator without signing up.",
  },
  {
    q: "How is it different from a spreadsheet?",
    a: "DealForge calculates VAT, discounts and margins automatically, generates a professional PDF, supports legally valid e-signature, and follows up with clients — none of which Excel does.",
  },
  {
    q: "Which currencies do you support?",
    a: "You can be billed in EUR, USD or GBP. Pricing adapts to your market automatically.",
  },
];

export default function EnHome() {
  return (
    <div className="min-h-screen bg-white">
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

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">DealForge</span>
            <span>· AI quoting software for SMBs</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/en/pricing" className="hover:text-gray-900">Pricing</Link>
            <Link href="/" className="hover:text-gray-900">Español</Link>
            <Link href="/login?lang=en" className="hover:text-gray-900">Log in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
