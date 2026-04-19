import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RECURSOS, getRecurso } from "@/data/recursos";
import { LeadForm } from "./lead-form";

export async function generateStaticParams() {
  return RECURSOS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recurso = getRecurso(slug);
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
      url: `https://dealforge.es/recursos/${slug}`,
      siteName: "DealForge",
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: recurso.descripcion,
    },
    alternates: { canonical: `https://dealforge.es/recursos/${slug}` },
  };
}

export default async function RecursoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recurso = getRecurso(slug);
  if (!recurso) notFound();

  const fullTitle = recurso.tituloResaltado
    ? `${recurso.titulo} ${recurso.tituloResaltado}`
    : recurso.titulo;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: fullTitle,
    description: recurso.descripcion,
    url: `https://dealforge.es/recursos/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "DealForge",
      url: "https://dealforge.es",
      logo: { "@type": "ImageObject", url: "https://dealforge.es/logo.svg" },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://dealforge.es" },
        { "@type": "ListItem", position: 2, name: "Recursos", item: "https://dealforge.es/recursos" },
        { "@type": "ListItem", position: 3, name: fullTitle, item: `https://dealforge.es/recursos/${slug}` },
      ],
    },
  };

  // Otros recursos recomendados (los 3 siguientes)
  const otros = RECURSOS.filter((r) => r.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="DealForge" width={32} height={32} className="rounded-lg" />
            <span className="font-bold text-lg text-gray-900">DealForge</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/recursos" className="text-sm text-gray-600 hover:text-gray-900">
              ← Todos los recursos
            </Link>
            <Link
              href="/registro"
              className="text-sm font-semibold text-[#3a9bb5] hover:text-[#2d7d94]"
            >
              Empieza gratis →
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
                <p className="text-sm font-semibold text-gray-700">Qué incluye:</p>
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
                <LeadForm recursoSlug={recurso.slug} filename={recurso.filename} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Preview secciones */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Qué encontrarás dentro
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Adelanto de los puntos clave. Descarga para acceder al contenido completo.
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
                  {t.fuente && <p className="text-xs text-blue-600">Fuente: {t.fuente}</p>}
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
                href="/registro"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#3a9bb5] font-semibold text-sm px-6 py-3 rounded-xl hover:bg-gray-50"
              >
                Empieza Gratis — Sin tarjeta
              </Link>
              <Link
                href="/recursos"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-medium text-sm px-6 py-3 rounded-xl hover:bg-white/10"
              >
                Ver más recursos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Otros recursos */}
      <section className="py-12 border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Otros recursos gratuitos</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otros.map((r) => (
              <Link
                key={r.slug}
                href={`/recursos/${r.slug}`}
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
        <p>&copy; {new Date().getFullYear()} DealForge. Todos los derechos reservados.</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <Link href="/privacidad" className="hover:text-gray-600">Privacidad</Link>
          <Link href="/terminos" className="hover:text-gray-600">Términos</Link>
          <Link href="/recursos" className="hover:text-gray-600">Recursos</Link>
        </div>
      </footer>
    </div>
  );
}
