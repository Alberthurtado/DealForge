import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Users,
  Package,
  PenTool,
  ShieldCheck,
  Bell,
  GitBranch,
  ScrollText,
  BarChart3,
  Sparkles,
  Plug,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "../../_landing/navbar";

export const metadata: Metadata = {
  title: "Features — DealForge | AI Quoting Software for Small Businesses",
  description:
    "Everything DealForge does: professional PDF quotes, a built-in AI assistant, e-signature, commercial rules, contracts, reminders, reports and API access. One tool from first quote to signed deal.",
  keywords: [
    "quoting software features", "CPQ features", "quote software",
    "e-signature", "proposal software", "sales quoting tool",
  ],
  alternates: {
    canonical: "https://dealforge.es/en/features",
    languages: {
      "es-ES": "https://dealforge.es/funcionalidades",
      en: "https://dealforge.es/en/features",
      "x-default": "https://dealforge.es/funcionalidades",
    },
  },
  openGraph: {
    title: "Features — DealForge | AI Quoting Software",
    description:
      "Professional quotes, AI assistant, e-signature, rules, contracts, reports and more.",
    url: "https://dealforge.es/en/features",
    siteName: "DealForge",
    locale: "en_GB",
    type: "website",
  },
};

const FEATURES = [
  {
    icon: FileText,
    title: "Professional PDF quotes",
    desc: "Build branded, clean quotes with automatic subtotals, discounts, VAT and totals. Export to PDF and send by email in minutes. Versioning keeps a full history of every change.",
  },
  {
    icon: Sparkles,
    title: "Forge — AI assistant",
    desc: "Create a complete quote from a plain-English instruction, search clients and products, analyse your pipeline, and get follow-up suggestions — all in natural language.",
  },
  {
    icon: Users,
    title: "Client management (CRM)",
    desc: "A centralised client database with multiple contacts, quote history, sector and notes. Import and export by CSV.",
  },
  {
    icon: Package,
    title: "Product catalog",
    desc: "Manage products with SKUs, base prices, categories and variants. Supports one-off and recurring (monthly, quarterly, annual) billing.",
  },
  {
    icon: PenTool,
    title: "Electronic signature",
    desc: "Capture a legally valid e-signature (eIDAS) on quotes and contracts — close deals without juggling separate tools.",
  },
  {
    icon: ShieldCheck,
    title: "Commercial rules",
    desc: "Enforce maximum-discount limits, mandatory products and approval flows automatically, so nothing leaves the door mispriced.",
  },
  {
    icon: GitBranch,
    title: "Approval flows",
    desc: "Route quotes for approval by amount, discount or client before they're sent. Approvers get notified by email.",
  },
  {
    icon: ScrollText,
    title: "Contract management",
    desc: "Turn won quotes into contracts and manage the full lifecycle — amendments, renewals and alerts.",
  },
  {
    icon: Bell,
    title: "Automated reminders",
    desc: "Follow-up reminders and ready-to-send email templates keep every deal moving without manual chasing.",
  },
  {
    icon: BarChart3,
    title: "Reports & metrics",
    desc: "An analytics dashboard with KPIs, trends and interactive charts — see what's open, won and at risk.",
  },
  {
    icon: Plug,
    title: "API access",
    desc: "Connect DealForge to the rest of your stack with a clean API.",
  },
];

export default function EnFeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar locale="en" altHref="/funcionalidades" />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Everything you need to quote and close
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            DealForge replaces the spreadsheet chaos with one tool — from the first quote
            to the signed contract.
          </p>
        </div>
      </section>

      {/* Features grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-gray-100 p-6">
              <div className="w-11 h-11 rounded-xl bg-[#3a9bb5]/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-[#3a9bb5]" />
              </div>
              <h2 className="font-semibold text-gray-900 mb-1.5">{f.title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white">See it on your own quotes</h2>
          <p className="mt-3 text-white/80">Free forever plan. No credit card required.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/registro?lang=en"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#3a9bb5] bg-white hover:bg-gray-50 px-7 py-3.5 rounded-xl transition-colors"
            >
              Start free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/en/pricing"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/40 hover:bg-white/10 px-7 py-3.5 rounded-xl transition-colors"
            >
              See pricing
            </Link>
          </div>
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
            <Link href="/en/pricing" className="hover:text-gray-900">Pricing</Link>
            <Link href="/en/contact" className="hover:text-gray-900">Contact</Link>
            <Link href="/funcionalidades" className="hover:text-gray-900">Español</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
