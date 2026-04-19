import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Generator } from "./generator";

export const metadata: Metadata = {
  title: "Generador de Cotizaciones Online Gratis — Sin Registro | DealForge",
  description:
    "Genera cotizaciones profesionales en PDF gratis y sin registro. Incluye IVA, descuentos, retenciones y T&C. Versión sin marca de agua con DealForge.",
  keywords: [
    "generador cotización gratis", "hacer cotización online", "crear presupuesto online",
    "cotización PDF gratis", "generador presupuesto", "cotización sin registro",
    "plantilla cotización online", "DealForge",
  ],
  openGraph: {
    title: "Generador de Cotizaciones Gratis — Sin Registro",
    description: "Crea cotizaciones profesionales en PDF en menos de 2 minutos. Gratis, sin registro.",
    url: "https://dealforge.es/generador-cotizacion-gratis",
    siteName: "DealForge",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Generador de Cotizaciones Gratis — Sin Registro",
    description: "Crea cotizaciones profesionales en PDF en menos de 2 minutos.",
  },
  alternates: { canonical: "https://dealforge.es/generador-cotizacion-gratis" },
};

const FAQS = [
  {
    q: "¿Es realmente gratis el generador de cotizaciones?",
    a: "Sí, 100% gratis y sin registro. Puedes generar y descargar tu cotización en PDF al instante. La versión sin marca de agua requiere un registro gratuito en DealForge.",
  },
  {
    q: "¿Qué datos necesito para generar una cotización?",
    a: "Tus datos fiscales (nombre, CIF, dirección), los datos del cliente, los conceptos a cotizar con cantidad y precio, el IVA aplicable y cualquier término comercial. Todo se rellena en un solo formulario.",
  },
  {
    q: "¿La cotización se guarda en algún sitio?",
    a: "No. Esta versión gratuita no guarda nada para proteger tu privacidad. Si necesitas guardar clientes, productos, plantillas e historial, regístrate gratis en DealForge.",
  },
  {
    q: "¿Puedo hacer varias cotizaciones al día?",
    a: "Sí, aunque aplicamos un límite razonable para evitar abuso. Si haces varias cotizaciones al mes, te recomendamos registrarte gratis en DealForge: tendrás todo guardado, seguimiento automático y firma electrónica.",
  },
  {
    q: "¿Es legal esta cotización?",
    a: "Sí, incluye todos los campos obligatorios (datos fiscales, IVA, validez, T&C). Es válida para presentar a tus clientes. Para convertirla en factura, necesitarás un programa de facturación.",
  },
  {
    q: "¿Cómo elimino la marca de agua 'DealForge'?",
    a: "Regístrate gratis en DealForge (plan Starter, sin tarjeta) y genera cotizaciones ilimitadas sin marca de agua, con tu logo y tus colores.",
  },
];

const STEPS = [
  {
    num: "1",
    titulo: "Rellena tus datos y los del cliente",
    desc: "Nombre fiscal, CIF, dirección. Solo lleva unos segundos.",
  },
  {
    num: "2",
    titulo: "Añade los conceptos a cotizar",
    desc: "Descripción, cantidad, precio y descuento por línea. Cálculos automáticos.",
  },
  {
    num: "3",
    titulo: "Ajusta IVA, retenciones y términos",
    desc: "21%, 10%, 4% o 0%. Retención IRPF opcional para servicios profesionales.",
  },
  {
    num: "4",
    titulo: "Descarga tu PDF profesional",
    desc: "Genera el PDF con un clic. Listo para enviar a tu cliente.",
  },
];

export default function GeneradorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Generador de Cotizaciones DealForge",
    description:
      "Herramienta online gratuita para generar cotizaciones profesionales en PDF sin registro.",
    url: "https://dealforge.es/generador-cotizacion-gratis",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    publisher: { "@type": "Organization", name: "DealForge", url: "https://dealforge.es" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo generar una cotización profesional gratis",
    step: STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.titulo,
      text: s.desc,
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, faqJsonLd, howToJsonLd]) }} />

      <header className="border-b border-gray-100 bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="DealForge" width={32} height={32} className="rounded-lg" />
            <span className="font-bold text-lg text-gray-900">DealForge</span>
          </Link>
          <Link
            href="/registro"
            className="text-sm font-semibold text-[#3a9bb5] hover:text-[#2d7d94]"
          >
            Registro gratis →
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            🆓 Gratis · Sin registro · Sin tarjeta
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5">
            Generador de Cotizaciones{" "}
            <span className="text-[#3a9bb5]">Online Gratis</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Crea una cotización profesional en PDF en menos de 2 minutos.
            Sin registro, sin instalar nada. Rellena, descarga y envía.
          </p>
        </div>
      </section>

      {/* Generator */}
      <section className="py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Generator />
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Cómo funciona
            </h2>
            <p className="text-gray-600">4 pasos. 2 minutos. Listo para enviar.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s) => (
              <div key={s.num} className="bg-gray-50 rounded-xl p-5">
                <div className="w-10 h-10 rounded-xl bg-[#3a9bb5] text-white font-bold text-lg flex items-center justify-center mb-3">
                  {s.num}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{s.titulo}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparativa — Gratis vs DealForge */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              ¿Esta versión gratis o DealForge completo?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              El generador gratis es perfecto para cotizaciones puntuales.
              Si vendes habitualmente, DealForge te ahorra horas cada semana.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Generador gratis</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✅ Sin registro</li>
                <li>✅ PDF profesional</li>
                <li>✅ Cálculos automáticos</li>
                <li className="text-gray-400">⚠️ 1 cotización cada vez (no se guarda)</li>
                <li className="text-gray-400">⚠️ Marca de agua «DealForge»</li>
                <li className="text-gray-400">❌ Sin seguimiento</li>
                <li className="text-gray-400">❌ Sin firma electrónica</li>
                <li className="text-gray-400">❌ Sin clientes/productos guardados</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-2xl p-6 text-white relative">
              <div className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-1 rounded-full">
                RECOMENDADO
              </div>
              <h3 className="font-bold mb-4">DealForge Starter (Gratis)</h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li>✅ Cotizaciones ilimitadas</li>
                <li>✅ Sin marca de agua</li>
                <li>✅ Con tu logo y colores</li>
                <li>✅ Clientes y productos guardados</li>
                <li>✅ Seguimiento automático</li>
                <li>✅ Firma electrónica incluida</li>
                <li>✅ IA Forge para redactar por ti</li>
                <li>✅ Gratis para siempre — sin tarjeta</li>
              </ul>
              <Link
                href="/registro"
                className="mt-5 block text-center bg-white text-[#3a9bb5] font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-gray-50"
              >
                Empezar gratis →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Preguntas frecuentes
          </h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group bg-gray-50 rounded-xl border border-gray-100 px-5 py-4 cursor-pointer"
              >
                <summary className="font-semibold text-gray-900 text-sm list-none flex items-center justify-between">
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

      {/* Recursos relacionados */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5 text-center">
            Recursos gratuitos relacionados
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { href: "/recursos/15-campos-obligatorios-cotizacion", emoji: "✅", title: "15 campos obligatorios en toda cotización" },
              { href: "/recursos/terminos-condiciones-cotizaciones", emoji: "⚖️", title: "Plantilla de términos y condiciones" },
              { href: "/recursos/7-emails-seguimiento-cotizacion", emoji: "✉️", title: "7 emails de seguimiento post-cotización" },
            ].map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-2">{r.emoji}</div>
                <h3 className="font-semibold text-gray-900 text-sm">{r.title}</h3>
                <p className="text-xs text-[#3a9bb5] mt-3 font-semibold">Descargar gratis →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400 bg-white">
        <p>&copy; {new Date().getFullYear()} DealForge. Todos los derechos reservados.</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <Link href="/privacidad" className="hover:text-gray-600">Privacidad</Link>
          <Link href="/terminos" className="hover:text-gray-600">Términos</Link>
          <Link href="/recursos" className="hover:text-gray-600">Recursos</Link>
          <Link href="/blog" className="hover:text-gray-600">Blog</Link>
        </div>
      </footer>
    </div>
  );
}
