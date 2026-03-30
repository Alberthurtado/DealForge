import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Package,
  FileText,
  ShieldCheck,
  BarChart3,
  Flame,
  Mail,
  CheckCircle,
  Plug,
  Clock,
  AlertTriangle,
  TrendingDown,
  Settings,
  Trophy,
  ArrowRight,
  Sparkles,
  PenTool,
  Bell,
  GitBranch,
  ScrollText,
  RefreshCw,
} from "lucide-react";
import { Navbar } from "./_landing/navbar";
import { PricingSection } from "@/components/home/pricing-section";
import dynamic from "next/dynamic";

const ForgeShowcase = dynamic(
  () => import("./_landing/forge-showcase").then((m) => ({ default: m.ForgeShowcase })),
  { ssr: true }
);
const FAQAccordion = dynamic(
  () => import("./_landing/faq-accordion").then((m) => ({ default: m.FAQAccordion })),
  { ssr: true }
);

export const metadata: Metadata = {
  title: "DealForge - CPQ Inteligente con IA para PYMEs | Cotizaciones en Minutos",
  description:
    "DealForge es el sistema CPQ con inteligencia artificial que automatiza cotizaciones para PYMEs. Configura productos, calcula precios y genera propuestas profesionales con Forge, tu asistente IA.",
  keywords: [
    "CPQ", "cotizaciones", "PYMEs", "ventas", "asistente IA",
    "Configure Price Quote", "software cotizaciones",
    "automatizar cotizaciones", "DealForge", "Forge IA",
    "propuestas comerciales", "inteligencia artificial ventas",
  ],
  openGraph: {
    title: "DealForge - CPQ Inteligente con IA para PYMEs",
    description:
      "Automatiza tus cotizaciones con inteligencia artificial. Forge, tu asistente IA, crea propuestas en minutos.",
    url: "https://dealforge.es",
    siteName: "DealForge",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DealForge - CPQ Inteligente con IA para PYMEs",
    description: "Automatiza tus cotizaciones con inteligencia artificial.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ─── HERO ────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0f9ff] via-[#f8fffe] to-white" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, #3a9bb5 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#3a9bb5]/10 text-[#3a9bb5] text-sm font-semibold rounded-full mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            CPQ con Inteligencia Artificial
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 animate-fade-in">
            Cotizaciones inteligentes{" "}
            <span className="text-[#3a9bb5]">con IA</span> para PYMEs
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-fade-in">
            Configura productos, calcula precios y genera cotizaciones profesionales
            en minutos — con <strong>Forge</strong>, tu asistente de IA integrado.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in">
            <Link
              href="/registro"
              className="inline-flex items-center gap-2 text-base font-semibold text-white bg-[#3a9bb5] hover:bg-[#2d7d94] px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-[#3a9bb5]/25 hover:shadow-xl hover:shadow-[#3a9bb5]/30"
            >
              <Flame className="w-5 h-5" />
              Empieza Gratis
            </Link>
            <a
              href="#forge"
              className="inline-flex items-center gap-2 text-base font-semibold text-gray-700 border-2 border-gray-200 hover:border-[#3a9bb5] hover:text-[#3a9bb5] px-8 py-3.5 rounded-xl transition-all"
            >
              Ver Demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="max-w-5xl mx-auto animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/60 border border-gray-200 overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white rounded-md px-4 py-1 text-xs text-gray-500 border border-gray-200 max-w-sm mx-auto">
                  app.dealforge.es/panel
                </div>
              </div>
            </div>
            {/* Dashboard preview */}
            <div className="p-6 bg-[#f8fafc]">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Pipeline", value: "24.350 EUR", color: "text-[#3a9bb5]" },
                  { label: "Conversión", value: "67%", color: "text-green-600" },
                  { label: "Ticket medio", value: "3.044 EUR", color: "text-purple-600" },
                  { label: "Ingresos", value: "18.175 EUR", color: "text-amber-600" },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
                    <p className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-white rounded-xl p-4 border border-gray-100 h-32 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-[#3a9bb5]/20 rounded-t-md"
                      style={{ height: `${h}%` }}
                    >
                      <div
                        className="w-full bg-[#3a9bb5] rounded-t-md"
                        style={{ height: `${[85, 70, 92, 65, 78, 88, 72][i]}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-2">
                  {["Borrador", "Enviada", "Negociación", "Ganada"].map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: ["#94a3b8", "#3b82f6", "#f59e0b", "#22c55e"][i] }}
                      />
                      <span className="text-xs text-gray-600 flex-1">{s}</span>
                      <span className="text-xs font-semibold text-gray-900">{[3, 4, 2, 5][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value props */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
          {[
            { value: "Gratis", label: "Para empezar" },
            { value: "IA", label: "Genera cotizaciones" },
            { value: "PDF", label: "Firma electrónica" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-[#3a9bb5]">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROBLEM ─────────────────────────────────────────────────── */
function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      title: "Horas perdidas",
      desc: "Crear una cotización manualmente toma entre 30-60 minutos. Buscar precios, calcular descuentos, formatear el documento...",
      color: "text-red-500 bg-red-50",
    },
    {
      icon: AlertTriangle,
      title: "Errores costosos",
      desc: "Precios desactualizados, descuentos no autorizados, cálculos incorrectos. Un solo error puede costar un cliente.",
      color: "text-orange-500 bg-orange-50",
    },
    {
      icon: TrendingDown,
      title: "Oportunidades perdidas",
      desc: "Mientras preparas la cotización, tu competencia ya envió la suya. La velocidad cierra negocios.",
      color: "text-amber-500 bg-amber-50",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            El proceso de cotizaciones está roto
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Si todavía cotizas con hojas de cálculo, tu equipo pierde horas cada semana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl border border-gray-100 p-8 text-center hover:shadow-lg transition-shadow"
            >
              <div className={`w-14 h-14 rounded-2xl ${p.color} flex items-center justify-center mx-auto mb-5`}>
                <p.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{p.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURES GRID ───────────────────────────────────────────── */
function FeaturesGrid() {
  const features = [
    { icon: Users, title: "Gestión de Clientes", slug: "gestion-clientes", desc: "Base de datos completa con contactos, historial y segmentación por sector." },
    { icon: Package, title: "Catálogo de Productos", slug: "catalogo-productos", desc: "Productos con variantes, categorías y precios configurables." },
    { icon: FileText, title: "Cotizaciones PDF", slug: "cotizaciones-pdf", desc: "Genera PDFs profesionales con tu marca. Envía por email y rastrea el estado." },
    { icon: ShieldCheck, title: "Reglas Comerciales", slug: "reglas-comerciales", desc: "Límites de descuento, productos obligatorios y aprobaciones automáticas." },
    { icon: BarChart3, title: "Reportes y Métricas", slug: "reportes-metricas", desc: "Pipeline visual, ingresos por mes, conversión y más datos en tiempo real." },
    { icon: Flame, title: "Forge IA Integrado", slug: "forge-ia", desc: "Asistente inteligente que crea cotizaciones, analiza datos y recomienda acciones." },
    { icon: Mail, title: "Envío de Emails", slug: "envio-emails", desc: "Envía cotizaciones directamente desde la plataforma con SMTP propio." },
    { icon: CheckCircle, title: "Aprobaciones", slug: "aprobaciones", desc: "Flujos de aprobación con enlaces únicos. Aprueba o rechaza desde cualquier dispositivo." },
    { icon: PenTool, title: "Firma Electrónica", slug: "firma-electronica", desc: "Solicita firmas digitales con enlace único. El cliente firma desde cualquier dispositivo." },
    { icon: Bell, title: "Recordatorios Automáticos", slug: "recordatorios", desc: "Seguimiento automático al vendedor y aviso de vencimiento al cliente por email." },
    { icon: GitBranch, title: "Versionado", slug: "versionado", desc: "Crea nuevas versiones de cotizaciones. Historial completo con trazabilidad." },
    { icon: Plug, title: "Importar / Exportar", slug: "importar-exportar", desc: "Importa clientes y productos desde CSV. Exporta datos cuando necesites." },
    { icon: ScrollText, title: "Gestión de Contratos", slug: "gestion-contratos", desc: "Crea contratos desde cotizaciones ganadas. Líneas recurrentes, condiciones y cláusulas." },
    { icon: RefreshCw, title: "Renovaciones y Alertas", slug: "renovaciones-alertas", desc: "Renovación automática o manual. Avisos por email y alertas de vencimiento con semáforo visual." },
    { icon: Users, title: "Multi-usuario y Equipos", slug: "gestion-clientes", desc: "Hasta 20 usuarios por empresa. Roles Admin, Vendedor y Observador. Invita a tu equipo en segundos." },
  ];

  return (
    <section id="funcionalidades" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Todo lo que necesitas para cotizar mejor
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Un sistema completo que crece contigo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Link
              href={`/funcionalidades/${f.slug}`}
              key={f.title}
              className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-[#3a9bb5]/20 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#3a9bb5]/10 text-[#3a9bb5] flex items-center justify-center mb-4 group-hover:bg-[#3a9bb5] group-hover:text-white transition-colors">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-[#3a9bb5] group-hover:translate-x-1 transition-transform">
                Más información <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ────────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      num: "1",
      icon: Settings,
      title: "Configura",
      desc: "Carga tus productos, clientes y configura tus reglas comerciales. Importa desde CSV si ya tienes datos.",
    },
    {
      num: "2",
      icon: Flame,
      title: "Cotiza",
      desc: "Pide a Forge que cree la cotización o hazla tú mismo con el wizard. En minutos, no horas.",
    },
    {
      num: "3",
      icon: Trophy,
      title: "Cierra",
      desc: "Envía, rastrea y cierra. El pipeline te muestra dónde está cada oportunidad.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Empieza en 3 pasos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line - desktop */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-[#3a9bb5]/20" />

          {steps.map((step) => (
            <div key={step.num} className="text-center relative">
              <div className="w-24 h-24 rounded-3xl bg-[#3a9bb5] text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#3a9bb5]/25 relative z-10">
                <step.icon className="w-10 h-10" />
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#3a9bb5]/10 text-[#3a9bb5] text-sm font-bold mb-3">
                {step.num}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING ─────────────────────────────────────────────────── */
// PricingSection is now a client component imported from @/components/home/pricing-section

/* ─── CTA FINAL ───────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#3a9bb5] to-[#2a7a91]" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Flame className="w-12 h-12 text-white/80 mx-auto mb-6" />
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Empieza a cotizar más rápido hoy
        </h2>
        <p className="text-lg text-white/80 mb-10">
          Configura tu cuenta en 2 minutos. Sin tarjeta de crédito.
        </p>
        <Link
          href="/registro"
          className="inline-flex items-center gap-2 text-base font-semibold bg-white text-[#3a9bb5] hover:bg-gray-50 px-8 py-4 rounded-xl transition-all shadow-xl"
        >
          Crear Cuenta Gratis
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}

/* ─── FOOTER ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.svg" alt="DealForge" width={28} height={28} className="rounded-md brightness-200" />
              <span className="font-bold text-white text-lg">DealForge</span>
            </div>
            <p className="text-sm leading-relaxed">
              CPQ inteligente con IA para PYMEs.
              Cotizaciones profesionales en minutos.
            </p>
          </div>

          {/* Producto */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Producto</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/funcionalidades" className="hover:text-white transition-colors">Funcionalidades</Link></li>
              <li><Link href="/precios" className="hover:text-white transition-colors">Precios</Link></li>
              <li><Link href="/comparar" className="hover:text-white transition-colors">Comparativas</Link></li>
              <li><Link href="/calculadora-roi" className="hover:text-white transition-colors">Calculadora ROI</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Acceder</Link></li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Recursos</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/plantilla-cotizacion" className="hover:text-white transition-colors">Plantillas por sector</Link></li>
              <li><Link href="/que-es-cpq" className="hover:text-white transition-colors">¿Qué es CPQ?</Link></li>
              <li><Link href="/glosario" className="hover:text-white transition-colors">Glosario</Link></li>
              <li><Link href="/guia" className="hover:text-white transition-colors">Guía gratuita</Link></li>
              <li><Link href="/documentacion" className="hover:text-white transition-colors">Documentación</Link></li>
              <li><Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/privacidad" className="hover:text-white transition-colors">Política de privacidad</Link></li>
              <li><Link href="/terminos" className="hover:text-white transition-colors">Términos de servicio</Link></li>
              <li><Link href="/rgpd" className="hover:text-white transition-colors">RGPD</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} DealForge. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── STRUCTURED DATA ─────────────────────────────────────────── */
function StructuredData() {
  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DealForge",
    description:
      "Sistema CPQ (Configure, Price, Quote) inteligente con inteligencia artificial para PYMEs. Automatiza cotizaciones comerciales, gestiona clientes y productos, y genera PDFs profesionales en minutos.",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "CPQ Software",
    operatingSystem: "Web",
    url: "https://dealforge.es",
    downloadUrl: "https://dealforge.es/registro",
    screenshot: "https://dealforge.es/opengraph-image",
    softwareVersion: "1.0",
    releaseNotes: "https://dealforge.es/changelog",
    inLanguage: "es",
    isAccessibleForFree: true,
    creator: {
      "@type": "Organization",
      name: "DealForge",
      url: "https://dealforge.es",
    },
    featureList: [
      "Gestion de clientes CRM",
      "Catalogo de productos con variantes",
      "Cotizaciones PDF profesionales",
      "Asistente IA (Forge) para crear cotizaciones",
      "Reglas comerciales y limites de descuento",
      "Flujos de aprobacion automaticos",
      "Envio de emails integrado",
      "Reportes y metricas de ventas",
      "Importacion y exportacion CSV",
      "API REST para integraciones",
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        price: "0",
        priceCurrency: "EUR",
        description: "10 cotizaciones/mes, 5 clientes, 10 productos, Forge IA basico",
        url: "https://dealforge.es/registro",
      },
      {
        "@type": "Offer",
        name: "Pro",
        price: "29",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "29",
          priceCurrency: "EUR",
          billingDuration: "P1M",
        },
        description: "100 cotizaciones/mes, 50 clientes, 200 productos, Forge IA ilimitado, emails",
        url: "https://dealforge.es/registro",
      },
      {
        "@type": "Offer",
        name: "Business",
        price: "79",
        priceCurrency: "EUR",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "79",
          priceCurrency: "EUR",
          billingDuration: "P1M",
        },
        description: "Todo ilimitado, reglas avanzadas, aprobaciones, integraciones CRM",
        url: "https://dealforge.es/registro",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
    </>
  );
}

/* ─── PAGE ────────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <>
      <StructuredData />
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <ForgeShowcase />
        <FeaturesGrid />
        <HowItWorks />
        <PricingSection />
        <FAQAccordion />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
