import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { industriasEn, getIndustriaEn } from "@/data/industrias-en";
import { CheckCircle, ArrowRight, ChevronDown, User, Quote } from "lucide-react";
import * as LucideIcons from "lucide-react";

export function generateStaticParams() {
  return industriasEn.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustriaEn(slug);
  if (!ind) return {};

  return {
    title: `${ind.titulo} | DealForge`,
    description: ind.descripcion,
    keywords: ind.keywords,
    openGraph: {
      title: ind.titulo,
      description: ind.descripcion,
      url: `https://dealforge.es/en/quote-template/${ind.slug}`,
      siteName: "DealForge",
      locale: "en_GB",
      type: "website",
    },
    alternates: { canonical: `https://dealforge.es/en/quote-template/${ind.slug}` },
  };
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(n);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getIcon(name: string): any {
  return (LucideIcons as Record<string, unknown>)[name] || LucideIcons.FileText;
}

export default async function QuoteTemplateIndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ind = getIndustriaEn(slug);
  if (!ind) notFound();

  const subtotal = ind.ejemploLineas.reduce((s, l) => s + l.cantidad * l.precio, 0);
  const iva = subtotal * 0.2;
  const total = subtotal + iva;
  const color = ind.color;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: ind.titulo,
      description: ind.descripcion,
      url: `https://dealforge.es/en/quote-template/${ind.slug}`,
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: "DealForge", url: "https://dealforge.es" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://dealforge.es/en" },
          { "@type": "ListItem", position: 2, name: "Quote Templates", item: "https://dealforge.es/en/quote-template" },
          { "@type": "ListItem", position: 3, name: ind.nombre },
        ],
      },
    },
    ...(ind.howToSteps?.length ? [{
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to create a quote for ${ind.nombre.toLowerCase()}`,
      description: `Step-by-step guide to creating a professional quote in the ${ind.nombre.toLowerCase()} industry with DealForge.`,
      step: ind.howToSteps.map((text, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: text.split(":")[0] || text.slice(0, 50),
        text,
      })),
      tool: { "@type": "SoftwareApplication", name: "DealForge", url: "https://dealforge.es" },
    }] : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/en" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="DealForge" width={28} height={28} className="rounded-md" />
            <span className="font-bold text-gray-900 text-lg">DealForge</span>
          </Link>
          <Link
            href="/registro?lang=en"
            className="text-sm font-semibold text-white px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: color }}
          >
            Create a quote free
          </Link>
        </div>
      </header>

      {/* Breadcrumbs */}
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <ol className="flex items-center gap-2 text-sm text-gray-400">
          <li><Link href="/en" className="hover:text-gray-600">Home</Link></li>
          <li>/</li>
          <li><Link href="/en/quote-template" className="hover:text-gray-600">Templates</Link></li>
          <li>/</li>
          <li className="text-gray-700 font-medium">{ind.nombre}</li>
        </ol>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">

        {/* ===== 1. HERO ===== */}
        <section className="rounded-2xl p-8 sm:p-12 mb-16 relative overflow-hidden" style={{ backgroundColor: `${color}08` }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ backgroundColor: color, transform: "translate(30%, -30%)" }} />
          <div className="relative text-center">
            <span className="text-6xl mb-4 block">{ind.emoji}</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {ind.titulo}
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
              {ind.descripcion}
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {ind.stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold" style={{ color }}>{s.valor}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <Link
              href="/registro?lang=en"
              className="inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-lg"
              style={{ backgroundColor: color, boxShadow: `0 10px 25px -5px ${color}40` }}
            >
              Use this template free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ===== 2. ICP ===== */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-1.5" style={{ backgroundColor: color }} />
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                  <User className="w-6 h-6" style={{ color }} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Are you a {ind.icp.cargo.toLowerCase()}?</h2>
                  <p className="text-sm text-gray-500">{ind.icp.empresaTipo}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-5">{ind.icp.dolor}</p>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-start gap-3">
                <Quote className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color }} />
                <p className="text-sm text-gray-700 italic">&ldquo;{ind.icp.cita}&rdquo;</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 3. BEFORE vs AFTER ===== */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">
            From wasting time to closing more sales
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-500 font-bold text-sm">✗</span>
                <h3 className="font-semibold text-gray-900">Before</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{ind.casoDeUso.antes}</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-500 font-bold text-sm">✓</span>
                <h3 className="font-semibold text-gray-900">After</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{ind.casoDeUso.despues}</p>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-4">
            <div className="rounded-xl p-4 text-center border" style={{ backgroundColor: `${color}08`, borderColor: `${color}20` }}>
              <p className="text-sm font-medium" style={{ color }}>Result: {ind.casoDeUso.resultado}</p>
            </div>
          </div>
        </section>

        {/* ===== 4. EXAMPLE QUOTE ===== */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Example quote for {ind.nombre.toLowerCase()}
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-w-3xl mx-auto">
            <div className="p-6 border-b border-gray-100" style={{ backgroundColor: color }}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/70 text-xs uppercase tracking-wider font-semibold">Quote</p>
                  <p className="text-white font-bold text-lg">QUO-2026-001</p>
                </div>
                <div className="text-right">
                  <p className="text-white/70 text-xs uppercase tracking-wider font-semibold">Total</p>
                  <p className="text-white font-bold text-2xl">{formatCurrency(total)}</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase tracking-wider">
                    <th className="text-left pb-3 font-semibold">Description</th>
                    <th className="text-right pb-3 font-semibold">Qty</th>
                    <th className="text-right pb-3 font-semibold">Price</th>
                    <th className="text-right pb-3 font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {ind.ejemploLineas.map((line, i) => (
                    <tr key={i} className="border-t border-gray-50">
                      <td className="py-2.5 text-gray-700">{line.descripcion}</td>
                      <td className="py-2.5 text-right text-gray-500">{line.cantidad}</td>
                      <td className="py-2.5 text-right text-gray-500">{formatCurrency(line.precio)}</td>
                      <td className="py-2.5 text-right font-medium text-gray-900">{formatCurrency(line.cantidad * line.precio)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span><span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>VAT (20%)</span><span>{formatCurrency(iva)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span><span style={{ color }}>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 5. PROBLEMS + SOLUTIONS ===== */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Common problems in {ind.nombre.toLowerCase()}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
            {ind.problemas.map((p, i) => (
              <div key={i} className="flex items-start gap-3 bg-red-50 rounded-xl p-4 border border-red-100">
                <span className="text-red-400 mt-0.5 flex-shrink-0 font-bold">✗</span>
                <p className="text-sm text-gray-700">{p}</p>
              </div>
            ))}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            How DealForge solves it
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {ind.beneficios.map((b, i) => (
              <div key={i} className="flex items-start gap-3 bg-green-50 rounded-xl p-4 border border-green-100">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 6. INDUSTRY FEATURES ===== */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">
            Features for {ind.nombre.toLowerCase()}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {ind.featuresEspecificos.map((f, i) => {
              const Icon = getIcon(f.icono);
              return (
                <div key={i} className="text-center p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${color}12` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{f.titulo}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== 7. FAQ ===== */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">
            Frequently asked questions about {ind.nombre.toLowerCase()} quotes
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {ind.faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <h3 className="text-sm font-semibold text-gray-900 pr-4">{faq.pregunta}</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-5 -mt-1">
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.respuesta}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ===== 8. INDUSTRY GUIDE (SEO) ===== */}
        {ind.guia && (
          <section className="mb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Guide to quoting in {ind.nombre.toLowerCase()}
            </h2>
            <article
              className="max-w-3xl mx-auto prose prose-gray prose-sm prose-p:text-gray-600 prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: ind.guia }}
            />
          </section>
        )}

        {/* ===== 9. CTA ===== */}
        <section className="rounded-2xl p-8 sm:p-12 text-center text-white" style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Start quoting in {ind.nombre.toLowerCase()} today
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Create your first professional quote in under 2 minutes. Free, no credit card.
          </p>
          <Link
            href="/registro?lang=en"
            className="inline-flex items-center gap-2 bg-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-colors"
            style={{ color }}
          >
            Create a quote free <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* ===== 10. OTHER INDUSTRIES ===== */}
        <section className="mt-16">
          <h2 className="text-lg font-bold text-gray-900 mb-6 text-center">
            Templates for other industries
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {industriasEn
              .filter((i) => i.slug !== ind.slug)
              .map((i) => (
                <Link
                  key={i.slug}
                  href={`/en/quote-template/${i.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:shadow-sm transition-all"
                  style={{ ["--hover-color" as string]: i.color }}
                >
                  <span>{i.emoji}</span> {i.nombre}
                </Link>
              ))}
          </div>
        </section>
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
