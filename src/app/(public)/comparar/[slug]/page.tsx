import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { comparaciones } from "@/data/comparaciones";
import { ArrowRight, Check, X, Shield, AlertTriangle, Scale } from "lucide-react";

function getComparacion(slug: string) {
  return comparaciones.find((c) => c.slug === slug);
}

export function generateStaticParams() {
  return comparaciones.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comp = getComparacion(slug);
  if (!comp) return {};

  return {
    title: comp.titulo,
    description: comp.descripcion,
    keywords: comp.keywords,
    openGraph: {
      title: comp.titulo,
      description: comp.descripcion,
      url: `https://dealforge.es/comparar/${comp.slug}`,
      siteName: "DealForge",
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: comp.titulo,
      description: comp.descripcion,
    },
    alternates: { canonical: `https://dealforge.es/comparar/${comp.slug}` },
  };
}

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
        <Check className="w-4 h-4 text-green-600" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100">
        <X className="w-4 h-4 text-red-400" />
      </span>
    );
  }
  return (
    <span className="text-sm font-medium text-gray-700">{value}</span>
  );
}

export default async function ComparacionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comp = getComparacion(slug);
  if (!comp) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: comp.titulo,
      description: comp.descripcion,
      url: `https://dealforge.es/comparar/${comp.slug}`,
      isPartOf: {
        "@type": "WebSite",
        name: "DealForge",
        url: "https://dealforge.es",
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://dealforge.es",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Comparativas",
            item: "https://dealforge.es/comparar",
          },
          { "@type": "ListItem", position: 3, name: `DealForge vs ${comp.competidor}` },
        ],
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt="DealForge"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="font-bold text-gray-900 text-lg">DealForge</span>
          </Link>
          <Link
            href="/registro"
            className="text-sm font-semibold bg-[#3a9bb5] text-white px-4 py-2 rounded-lg hover:bg-[#2d7d94] transition-colors"
          >
            Empieza gratis
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-gray-600">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/comparar" className="hover:text-gray-600">
                Comparativas
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-700 font-medium">
              DealForge vs {comp.competidor}
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-5 h-5 text-[#3a9bb5]" />
            <span className="text-sm font-semibold text-[#3a9bb5] uppercase tracking-wider">
              Comparativa
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            DealForge vs {comp.competidor}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            {comp.heroSubtitle}
          </p>
        </section>

        {/* DealForge Advantages */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#3a9bb5]/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#3a9bb5]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Ventajas de DealForge
            </h2>
          </div>
          <div className="space-y-4">
            {comp.ventajasDealForge.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:border-[#3a9bb5]/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3a9bb5]/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#3a9bb5]" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {v.titulo}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Competitor Limitations */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Limitaciones de {comp.competidor}
            </h2>
          </div>
          <div className="space-y-4">
            {comp.limitacionesCompetidor.map((l, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center mt-0.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {l.titulo}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {l.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Tabla comparativa
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-sm font-semibold text-gray-500 px-5 py-4 w-1/2">
                      Funcionalidad
                    </th>
                    <th className="text-center text-sm font-semibold px-5 py-4 w-1/4" style={{ color: "#3a9bb5" }}>
                      DealForge
                    </th>
                    <th className="text-center text-sm font-semibold text-gray-500 px-5 py-4 w-1/4">
                      {comp.competidor}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comp.tablaComparativa.map((row, i) => (
                    <tr
                      key={i}
                      className={
                        i % 2 === 0
                          ? "bg-gray-50/50"
                          : "bg-white"
                      }
                    >
                      <td className="px-5 py-3.5 text-sm text-gray-700 font-medium">
                        {row.feature}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <CellValue value={row.dealforge} />
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <CellValue value={row.competidor} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Veredicto
          </h2>
          <div className="bg-[#3a9bb5]/5 border border-[#3a9bb5]/20 rounded-2xl p-6 sm:p-8">
            <p className="text-gray-700 leading-relaxed">
              {comp.veredicto}
            </p>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-16">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Conoce m&aacute;s sobre DealForge
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <Link
              href="/funcionalidades"
              className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:border-[#3a9bb5]/30 hover:text-[#3a9bb5] transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              Todas las funcionalidades
            </Link>
            <Link
              href="/precios"
              className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:border-[#3a9bb5]/30 hover:text-[#3a9bb5] transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              Planes y precios
            </Link>
            <Link
              href="/registro"
              className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:border-[#3a9bb5]/30 hover:text-[#3a9bb5] transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              Empezar gratis
            </Link>
          </div>
        </section>

        {/* Other Comparisons */}
        <section className="mb-16">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Otras comparativas
          </h2>
          <div className="flex flex-wrap gap-3">
            {comparaciones
              .filter((c) => c.slug !== comp.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/comparar/${c.slug}`}
                  className="text-sm font-medium text-[#3a9bb5] hover:text-[#2d7d94] bg-[#3a9bb5]/5 hover:bg-[#3a9bb5]/10 px-4 py-2 rounded-lg transition-colors"
                >
                  DealForge vs {c.competidor}
                </Link>
              ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white transform -translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Prueba DealForge gratis
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Plan Starter gratuito para siempre. Sin tarjeta de cr&eacute;dito, sin
              compromiso.
            </p>
            <Link
              href="/registro"
              className="inline-flex items-center gap-2 bg-white text-[#3a9bb5] px-8 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-colors"
            >
              Empezar gratis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} DealForge. Todos los derechos
            reservados.
            {" · "}
            <Link
              href="/privacidad"
              className="hover:text-gray-600 underline"
            >
              Privacidad
            </Link>
            {" · "}
            <Link href="/terminos" className="hover:text-gray-600 underline">
              T&eacute;rminos
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
