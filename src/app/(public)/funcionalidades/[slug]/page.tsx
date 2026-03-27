import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { features } from "@/data/features";
import { ArrowRight, ChevronDown, X, CheckCircle } from "lucide-react";
import * as LucideIcons from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getIcon(name: string): any {
  return (LucideIcons as Record<string, unknown>)[name] || LucideIcons.HelpCircle;
}

function getFeature(slug: string) {
  return features.find((f) => f.slug === slug);
}

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const feat = getFeature(slug);
  if (!feat) return {};

  return {
    title: `${feat.titulo} | DealForge`,
    description: feat.descripcion,
    keywords: feat.keywords,
    openGraph: {
      title: feat.titulo,
      description: feat.descripcion,
      url: `https://dealforge.es/funcionalidades/${feat.slug}`,
      siteName: "DealForge",
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: feat.titulo,
      description: feat.descripcion,
    },
    alternates: { canonical: `https://dealforge.es/funcionalidades/${feat.slug}` },
  };
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feat = getFeature(slug);
  if (!feat) notFound();

  const color = feat.color;
  const Icon = getIcon(feat.icono);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: feat.titulo,
      description: feat.descripcion,
      url: `https://dealforge.es/funcionalidades/${feat.slug}`,
      isPartOf: { "@type": "WebSite", name: "DealForge", url: "https://dealforge.es" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://dealforge.es" },
          { "@type": "ListItem", position: 2, name: "Funcionalidades", item: "https://dealforge.es/funcionalidades" },
          { "@type": "ListItem", position: 3, name: feat.nombre },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: feat.faqs.map((f) => ({
        "@type": "Question",
        name: f.pregunta,
        acceptedAnswer: { "@type": "Answer", text: f.respuesta },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="DealForge" width={28} height={28} className="rounded-md" />
            <span className="font-bold text-gray-900 text-lg">DealForge</span>
          </Link>
          <Link
            href="/registro"
            className="text-sm font-semibold text-white px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: color }}
          >
            Empieza gratis
          </Link>
        </div>
      </header>

      {/* Breadcrumbs */}
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <ol className="flex items-center gap-2 text-sm text-gray-400">
          <li><Link href="/" className="hover:text-gray-600">Inicio</Link></li>
          <li>/</li>
          <li><Link href="/funcionalidades" className="hover:text-gray-600">Funcionalidades</Link></li>
          <li>/</li>
          <li className="text-gray-700 font-medium">{feat.nombre}</li>
        </ol>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">

        {/* ===== HERO ===== */}
        <section className="rounded-2xl p-8 sm:p-12 mb-16 relative overflow-hidden" style={{ backgroundColor: `${color}08` }}>
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10" style={{ backgroundColor: color, transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-5" style={{ backgroundColor: color, transform: "translate(-30%, 30%)" }} />
          <div className="relative text-center">
            <div
              className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg"
              style={{ backgroundColor: `${color}15`, boxShadow: `0 10px 40px -10px ${color}30` }}
            >
              <Icon className="w-10 h-10" style={{ color }} />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: `${color}15`, color }}>
              Disponible desde plan {feat.plan}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {feat.titulo}
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
              {feat.heroSubtitle}
            </p>
            <Link
              href="/registro"
              className="inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              style={{ backgroundColor: color, boxShadow: `0 10px 25px -5px ${color}40` }}
            >
              Empieza gratis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ===== PROBLEM SECTION ===== */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {feat.problema.titulo}
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {feat.problema.puntos.map((punto, i) => (
              <div key={i} className="bg-red-50 rounded-2xl p-6 border border-red-100 text-center">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{punto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SOLUTION SECTION ===== */}
        <section className="mb-16">
          <div className="rounded-2xl p-8 sm:p-12" style={{ background: `linear-gradient(135deg, ${color}08, ${color}15)` }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
              {feat.solucion.titulo}
            </h2>
            <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {feat.solucion.puntos.map((punto, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                    <CheckCircle className="w-5 h-5" style={{ color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{punto.titulo}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{punto.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            Cómo funciona
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {feat.pasos.map((paso, i) => (
              <div key={i} className="text-center relative">
                {i < feat.pasos.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-200" />
                )}
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold relative z-10 shadow-lg"
                  style={{ backgroundColor: color, boxShadow: `0 8px 25px -5px ${color}40` }}
                >
                  {paso.num}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{paso.titulo}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{paso.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            Preguntas frecuentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {feat.faqs.map((faq, i) => (
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

        {/* ===== CTA ===== */}
        <section className="rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white transform -translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Empieza a usar {feat.nombre} hoy
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Configura {feat.nombre.toLowerCase()} en minutos y transforma tu proceso de ventas. Sin tarjeta de crédito.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/registro"
                className="inline-flex items-center gap-2 bg-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                style={{ color }}
              >
                Empieza gratis <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/funcionalidades"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                Ver todas las funcionalidades
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} DealForge. Todos los derechos reservados.
            {" · "}
            <Link href="/privacidad" className="hover:text-gray-600 underline">Privacidad</Link>
            {" · "}
            <Link href="/terminos" className="hover:text-gray-600 underline">Términos</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
