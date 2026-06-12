import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RECURSOS_EN, getRecursoEn } from "@/data/recursos-en";
import { LeadForm } from "@/app/(public)/recursos/[slug]/lead-form";

export async function generateStaticParams() {
  return RECURSOS_EN.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recurso = getRecursoEn(slug);
  if (!recurso) return {};

  const fullTitle = recurso.tituloResaltado
    ? `${recurso.titulo} ${recurso.tituloResaltado}`
    : recurso.titulo;

  return {
    title: `${fullTitle} — DealForge`,
    description: recurso.descripcion,
    keywords: recurso.keywords,
    openGraph: {
      title: fullTitle,
      description: recurso.descripcion,
      url: `https://dealforge.es/en/resources/${slug}`,
      siteName: "DealForge",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: recurso.descripcion,
    },
    alternates: { canonical: `https://dealforge.es/en/resources/${slug}` },
  };
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recurso = getRecursoEn(slug);
  if (!recurso) notFound();

  const fullTitle = recurso.tituloResaltado
    ? `${recurso.titulo} ${recurso.tituloResaltado}`
    : recurso.titulo;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: fullTitle,
    description: recurso.descripcion,
    url: `https://dealforge.es/en/resources/${slug}`,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "DealForge",
      url: "https://dealforge.es",
      logo: { "@type": "ImageObject", url: "https://dealforge.es/logo.svg" },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://dealforge.es/en" },
        { "@type": "ListItem", position: 2, name: "Resources", item: "https://dealforge.es/en/resources" },
        { "@type": "ListItem", position: 3, name: fullTitle, item: `https://dealforge.es/en/resources/${slug}` },
      ],
    },
  };

  // Other recommended resources (next 3)
  const otros = RECURSOS_EN.filter((r) => r.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/en" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="DealForge" width={32} height={32} className="rounded-lg" />
            <span className="font-bold text-lg text-gray-900">DealForge</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/en/resources" className="text-sm text-gray-600 hover:text-gray-900">
              ← All resources
            </Link>
            <Link
              href="/registro?lang=en"
              className="text-sm font-semibold text-[#3a9bb5] hover:text-[#2d7d94]"
            >
              Start free →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a9bb5]/5 via-white to-amber-50/30" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                {recurso.emoji} {recurso.badge}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {recurso.titulo}{" "}
                {recurso.tituloResaltado && (
                  <span className="text-[#3a9bb5]">{recurso.tituloResaltado}</span>
                )}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{recurso.heroDescripcion}</p>

              <div className="space-y-3 mb-8">
                <p className="text-sm font-semibold text-gray-700">What's included:</p>
                {recurso.bullets.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-8">
              <Suspense fallback={<div className="animate-pulse h-64 bg-gray-100 rounded-xl" />}>
                <LeadForm recursoSlug={recurso.slug} filename={recurso.filename} lang="en" />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Section preview */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              What you'll find inside
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A preview of the key points. Download to access the full content.
            </p>
          </div>

          <div className="space-y-4">
            {recurso.secciones.map((s) => (
              <div
                key={s.num}
                className="bg-white rounded-xl border border-gray-100 p-6 flex gap-5 hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#3a9bb5]/10 text-[#3a9bb5] font-bold text-lg flex items-center justify-center">
                  {s.num}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{s.titulo}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips / data */}
      {recurso.tips && recurso.tips.length > 0 && (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {recurso.tips.map((t, i) => (
                <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <p className="text-sm text-blue-900 font-medium mb-2">💡 {t.texto}</p>
                  {t.fuente && <p className="text-xs text-blue-600">Source: {t.fuente}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA DealForge */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-2xl p-8 sm:p-12 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{recurso.ctaTitulo}</h2>
            <p className="text-white/85 mb-8 max-w-2xl">{recurso.ctaDescripcion}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/registro?lang=en"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#3a9bb5] font-semibold text-sm px-6 py-3 rounded-xl hover:bg-gray-50"
              >
                Start free — No card
              </Link>
              <Link
                href="/en/resources"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-medium text-sm px-6 py-3 rounded-xl hover:bg-white/10"
              >
                See more resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other resources */}
      <section className="py-12 border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Other free resources</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otros.map((r) => (
              <Link
                key={r.slug}
                href={`/en/resources/${r.slug}`}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-2">{r.emoji}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">
                  {r.titulo} {r.tituloResaltado}
                </h3>
                <p className="text-xs text-gray-500">{r.badge}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} DealForge. All rights reserved.</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <Link href="/privacidad" className="hover:text-gray-600">Privacy</Link>
          <Link href="/terminos" className="hover:text-gray-600">Terms</Link>
          <Link href="/en/resources" className="hover:text-gray-600">Resources</Link>
        </div>
      </footer>
    </div>
  );
}
