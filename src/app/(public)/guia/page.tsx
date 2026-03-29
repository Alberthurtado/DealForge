import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { LeadForm } from "./lead-form";

export const metadata: Metadata = {
  title: "Guía Gratis: 5 Errores en tus Cotizaciones que te Hacen Perder Ventas — DealForge",
  description:
    "Descarga gratis la guía con los 5 errores más comunes en cotizaciones comerciales y aprende cómo solucionarlos para cerrar más ventas.",
  keywords: [
    "cotizaciones comerciales", "errores ventas", "cerrar ventas", "CPQ",
    "propuestas comerciales", "guía ventas gratis", "DealForge",
  ],
  openGraph: {
    title: "5 Errores en tus Cotizaciones que te Hacen Perder Ventas",
    description: "Descarga gratis la guía y aprende cómo solucionarlos para cerrar más ventas.",
    url: "https://dealforge.es/guia",
    siteName: "DealForge",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://dealforge.es/og-guia.png",
        width: 1200,
        height: 630,
        alt: "Guía: 5 Errores en tus Cotizaciones que te Hacen Perder Ventas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "5 Errores en tus Cotizaciones que te Hacen Perder Ventas",
    description: "Descarga gratis la guía y aprende cómo cerrar más ventas.",
    images: ["https://dealforge.es/og-guia.png"],
  },
  alternates: { canonical: "https://dealforge.es/guia" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Guía: 5 Errores en tus Cotizaciones que te Hacen Perder Ventas",
  description: "Descarga gratis la guía con los 5 errores más comunes en cotizaciones comerciales y aprende cómo solucionarlos para cerrar más ventas.",
  url: "https://dealforge.es/guia",
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
      { "@type": "ListItem", position: 2, name: "Guía Gratuita", item: "https://dealforge.es/guia" },
    ],
  },
};

const ERRORES = [
  {
    num: "01",
    titulo: "Tardar demasiado en enviar la cotización",
    desc: "El 50% de los deals se los lleva quien responde primero. Si tardas días en preparar una propuesta, tu competencia ya ha cerrado.",
  },
  {
    num: "02",
    titulo: "No personalizar la propuesta",
    desc: "Enviar cotizaciones genéricas con 'Estimado cliente' transmite desinterés. El cliente necesita sentir que entiendes su problema específico.",
  },
  {
    num: "03",
    titulo: "Ocultar o complicar los precios",
    desc: "Estructuras de precios confusas generan desconfianza. Si el cliente no entiende qué está pagando, no firmará.",
  },
  {
    num: "04",
    titulo: "No incluir términos y condiciones claros",
    desc: "Sin T&C claros, el cliente tiene dudas. Con ellos, transmites profesionalidad y reduces fricciones en la negociación.",
  },
  {
    num: "05",
    titulo: "No hacer seguimiento después de enviar",
    desc: "El 80% de las ventas requieren al menos 5 follow-ups. Sin seguimiento automatizado, los deals se enfrían y mueren.",
  },
];

const BENEFICIOS = [
  "Envía cotizaciones profesionales en minutos, no días",
  "Personalización automática con datos del cliente",
  "Precios claros con cálculos automáticos de descuentos e impuestos",
  "Firma electrónica integrada para cerrar deals al instante",
  "Seguimiento automático — nunca pierdas un deal por falta de follow-up",
];

export default function GuiaPage() {
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
          <Link
            href="/registro"
            className="text-sm font-semibold text-[#3a9bb5] hover:text-[#2d7d94] transition-colors"
          >
            Empieza gratis &rarr;
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a9bb5]/5 via-white to-amber-50/30" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                📘 Guía Gratuita
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                5 Errores en tus Cotizaciones que te Están Haciendo{" "}
                <span className="text-red-500">Perder Ventas</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Descubre los errores más comunes que cometen los equipos comerciales
                al crear cotizaciones — y aprende exactamente cómo solucionarlos
                para <strong>cerrar más deals, más rápido</strong>.
              </p>

              <div className="space-y-3 mb-8">
                <p className="text-sm font-semibold text-gray-700">En esta guía aprenderás:</p>
                {["Por qué pierdes deals antes de llegar a negociar", "Cómo reducir tu tiempo de respuesta un 80%", "Técnicas para cotizaciones que generan confianza", "El secreto del seguimiento automatizado"].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:pl-8">
              <Suspense fallback={<div className="animate-pulse h-64 bg-gray-100 rounded-xl" />}>
                <LeadForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Errors Preview */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Los 5 errores que están matando tus ventas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Adelanto de lo que encontrarás en la guía. Descárgala para ver las soluciones detalladas.
            </p>
          </div>

          <div className="space-y-4">
            {ERRORES.map((error) => (
              <div
                key={error.num}
                className="bg-white rounded-xl border border-gray-100 p-6 flex gap-5 hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-50 text-red-500 font-bold text-lg flex items-center justify-center">
                  {error.num}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{error.titulo}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{error.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution — DealForge CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-2xl p-8 sm:p-12 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              La solución: automatiza tu proceso de cotizaciones
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl">
              DealForge elimina estos 5 errores con un sistema CPQ inteligente
              diseñado para equipos comerciales de PYMEs.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {BENEFICIOS.map((b) => (
                <div key={b} className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <span className="text-sm text-white/90">{b}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/registro"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#3a9bb5] font-semibold text-sm px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Empieza Gratis — Sin tarjeta
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-medium text-sm px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                Leer más artículos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof / stats */}
      <section className="py-12 border-t border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#3a9bb5]">Minutos</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">en vez de horas cotizando</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#3a9bb5]">IA</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">genera propuestas automáticamente</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#3a9bb5]">Gratis</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">para empezar sin compromiso</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} DealForge. Todos los derechos reservados.</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <Link href="/privacidad" className="hover:text-gray-600 transition-colors">Privacidad</Link>
          <Link href="/terminos" className="hover:text-gray-600 transition-colors">Términos</Link>
        </div>
      </footer>
    </div>
  );
}
