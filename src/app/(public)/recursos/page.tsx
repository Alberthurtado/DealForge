import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RECURSOS } from "@/data/recursos";

export const metadata: Metadata = {
  title: "Recursos Gratuitos para Cotizaciones y Ventas B2B — DealForge",
  description:
    "20+ recursos gratuitos descargables: guías, plantillas, checklists y kits para mejorar tus cotizaciones, cerrar más ventas y profesionalizar tu PYME.",
  keywords: [
    "recursos ventas gratis", "plantillas cotización", "guía ventas B2B",
    "checklist comercial", "descarga gratis PYME", "DealForge recursos",
  ],
  openGraph: {
    title: "Recursos Gratuitos — DealForge",
    description: "20+ guías, plantillas y checklists gratis para mejorar tus cotizaciones.",
    url: "https://dealforge.es/recursos",
    siteName: "DealForge",
    locale: "es_ES",
    type: "website",
  },
  alternates: { canonical: "https://dealforge.es/recursos" },
};

const TIPOS: Record<string, { nombre: string; color: string }> = {
  guia: { nombre: "Guías", color: "bg-blue-50 text-blue-700 border-blue-200" },
  plantilla: { nombre: "Plantillas", color: "bg-purple-50 text-purple-700 border-purple-200" },
  checklist: { nombre: "Checklists", color: "bg-green-50 text-green-700 border-green-200" },
  kit: { nombre: "Kits", color: "bg-amber-50 text-amber-700 border-amber-200" },
};

export default function RecursosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Recursos gratuitos DealForge",
    description: "Biblioteca de recursos gratuitos sobre cotizaciones y ventas B2B.",
    url: "https://dealforge.es/recursos",
    hasPart: RECURSOS.map((r) => ({
      "@type": "CreativeWork",
      name: `${r.titulo} ${r.tituloResaltado ?? ""}`.trim(),
      url: `https://dealforge.es/recursos/${r.slug}`,
      description: r.descripcion,
    })),
  };

  const porTipo: Record<string, typeof RECURSOS> = {};
  for (const r of RECURSOS) {
    if (!porTipo[r.tipo]) porTipo[r.tipo] = [];
    porTipo[r.tipo].push(r);
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="DealForge" width={32} height={32} className="rounded-lg" />
            <span className="font-bold text-lg text-gray-900">DealForge</span>
          </Link>
          <Link
            href="/registro"
            className="text-sm font-semibold text-[#3a9bb5] hover:text-[#2d7d94]"
          >
            Empieza gratis →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a9bb5]/5 via-white to-amber-50/30" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            📚 Biblioteca de recursos
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Recursos gratuitos para{" "}
            <span className="text-[#3a9bb5]">vender más y mejor</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {RECURSOS.length}+ guías, plantillas, checklists y kits descargables.
            Todo lo que necesitas para profesionalizar tus cotizaciones y cerrar más ventas.
            100% gratis, sin tarjeta.
          </p>
        </div>
      </section>

      {/* Listado por tipo */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {(["guia", "plantilla", "checklist", "kit"] as const).map((tipo) => {
            const items = porTipo[tipo] ?? [];
            if (items.length === 0) return null;
            const meta = TIPOS[tipo];
            return (
              <div key={tipo} className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{meta.nombre}</h2>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${meta.color}`}>
                    {items.length}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/recursos/${r.slug}`}
                      className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-[#3a9bb5]/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-3xl">{r.emoji}</div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${meta.color}`}>
                          {r.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-[#3a9bb5] transition-colors">
                        {r.titulo}{" "}
                        {r.tituloResaltado && (
                          <span className="text-[#3a9bb5]">{r.tituloResaltado}</span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {r.descripcion}
                      </p>
                      <p className="text-sm font-semibold text-[#3a9bb5] mt-4">
                        Descargar gratis →
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-2xl p-8 sm:p-12 text-white text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Todo esto, integrado en DealForge
            </h2>
            <p className="text-white/85 mb-8 max-w-2xl mx-auto">
              Plantillas, seguimiento automático, firma electrónica, pipeline y KPIs.
              Todo lo que ves en nuestros recursos, listo para usar en minutos.
            </p>
            <Link
              href="/registro"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#3a9bb5] font-semibold text-sm px-8 py-3 rounded-xl hover:bg-gray-50"
            >
              Empieza Gratis — Sin tarjeta
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} DealForge. Todos los derechos reservados.</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <Link href="/privacidad" className="hover:text-gray-600">Privacidad</Link>
          <Link href="/terminos" className="hover:text-gray-600">Términos</Link>
          <Link href="/blog" className="hover:text-gray-600">Blog</Link>
        </div>
      </footer>
    </div>
  );
}
