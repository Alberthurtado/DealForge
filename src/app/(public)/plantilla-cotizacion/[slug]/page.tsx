import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { industrias, getIndustria } from "@/data/industrias";
import { CheckCircle, ArrowRight, FileText, Zap, Shield, PenTool } from "lucide-react";

export function generateStaticParams() {
  return industrias.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustria(slug);
  if (!ind) return {};

  return {
    title: `${ind.titulo} | DealForge`,
    description: ind.descripcion,
    keywords: ind.keywords,
    openGraph: {
      title: ind.titulo,
      description: ind.descripcion,
      url: `https://dealforge.es/plantilla-cotizacion/${ind.slug}`,
    },
    alternates: { canonical: `https://dealforge.es/plantilla-cotizacion/${ind.slug}` },
  };
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);
}

export default async function PlantillaIndustriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ind = getIndustria(slug);
  if (!ind) notFound();

  const subtotal = ind.ejemploLineas.reduce((s, l) => s + l.cantidad * l.precio, 0);
  const iva = subtotal * 0.21;
  const total = subtotal + iva;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: ind.titulo,
    description: ind.descripcion,
    url: `https://dealforge.es/plantilla-cotizacion/${ind.slug}`,
    isPartOf: { "@type": "WebSite", name: "DealForge", url: "https://dealforge.es" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://dealforge.es" },
        { "@type": "ListItem", position: 2, name: "Plantillas de Cotización", item: "https://dealforge.es/plantilla-cotizacion" },
        { "@type": "ListItem", position: 3, name: ind.nombre },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="DealForge" width={28} height={28} className="rounded-md" />
            <span className="font-bold text-gray-900 text-lg">DealForge</span>
          </Link>
          <Link
            href="/registro"
            className="text-sm font-semibold bg-[#3a9bb5] text-white px-4 py-2 rounded-lg hover:bg-[#2d7d94] transition-colors"
          >
            Crear cotización gratis
          </Link>
        </div>
      </header>

      {/* Breadcrumbs */}
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <ol className="flex items-center gap-2 text-sm text-gray-400">
          <li><Link href="/" className="hover:text-gray-600">Inicio</Link></li>
          <li>/</li>
          <li><Link href="/plantilla-cotizacion" className="hover:text-gray-600">Plantillas</Link></li>
          <li>/</li>
          <li className="text-gray-700 font-medium">{ind.nombre}</li>
        </ol>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        {/* Hero */}
        <div className="text-center py-12">
          <span className="text-5xl mb-4 block">{ind.emoji}</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {ind.titulo}
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            {ind.descripcion}
          </p>
          <Link
            href="/registro"
            className="inline-flex items-center gap-2 bg-[#3a9bb5] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#2d7d94] transition-colors shadow-lg shadow-[#3a9bb5]/25"
          >
            Usar esta plantilla gratis <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Example quote */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Ejemplo de cotización para {ind.nombre.toLowerCase()}
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-w-3xl mx-auto">
            <div className="p-6 border-b border-gray-100" style={{ backgroundColor: "#3a9bb5" }}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/70 text-xs uppercase tracking-wider font-semibold">Cotización</p>
                  <p className="text-white font-bold text-lg">COT-2026-001</p>
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
                    <th className="text-left pb-3 font-semibold">Descripción</th>
                    <th className="text-right pb-3 font-semibold">Cant.</th>
                    <th className="text-right pb-3 font-semibold">Precio</th>
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
                  <span>IVA (21%)</span><span>{formatCurrency(iva)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span><span style={{ color: "#3a9bb5" }}>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problems */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Problemas comunes al cotizar en {ind.nombre.toLowerCase()}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {ind.problemas.map((p, i) => (
              <div key={i} className="flex items-start gap-3 bg-red-50 rounded-xl p-4 border border-red-100">
                <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                <p className="text-sm text-gray-700">{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Cómo DealForge lo soluciona
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

        {/* Features grid */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">
            Incluido en la plantilla de {ind.nombre.toLowerCase()}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: FileText, title: "PDF profesional", desc: "Con tu logo y colores corporativos" },
              { icon: Zap, title: "IA integrada", desc: "Genera cotizaciones en segundos" },
              { icon: PenTool, title: "Firma electrónica", desc: "El cliente firma desde su móvil" },
              { icon: Shield, title: "Seguimiento", desc: "Sabe cuándo abren tu cotización" },
            ].map((f, i) => (
              <div key={i} className="text-center p-5 rounded-xl bg-white border border-gray-100 shadow-sm">
                <f.icon className="w-8 h-8 text-[#3a9bb5] mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Empieza a cotizar en {ind.nombre.toLowerCase()} hoy
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Crea tu primera cotización profesional en menos de 2 minutos. Gratis, sin tarjeta de crédito.
          </p>
          <Link
            href="/registro"
            className="inline-flex items-center gap-2 bg-white text-[#3a9bb5] px-8 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-colors"
          >
            Crear cotización gratis <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Other industries */}
        <section className="mt-16">
          <h2 className="text-lg font-bold text-gray-900 mb-6 text-center">
            Plantillas para otros sectores
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {industrias
              .filter((i) => i.slug !== ind.slug)
              .map((i) => (
                <Link
                  key={i.slug}
                  href={`/plantilla-cotizacion/${i.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#3a9bb5] hover:text-[#3a9bb5] transition-colors"
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
