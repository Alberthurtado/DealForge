import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Glosario de CPQ y Ventas — Terminología Comercial | DealForge",
  description:
    "Glosario completo de CPQ, ventas y terminología comercial en español. Más de 30 términos explicados de forma clara para equipos comerciales y PYMEs.",
  keywords: [
    "glosario CPQ",
    "glosario ventas",
    "terminología comercial",
    "diccionario ventas",
    "términos CPQ",
    "vocabulario comercial",
    "glosario B2B",
    "DealForge",
  ],
  openGraph: {
    title: "Glosario de CPQ y Ventas — Terminología Comercial",
    description:
      "Más de 30 términos de CPQ, ventas y gestión comercial explicados de forma clara y práctica.",
    url: "https://dealforge.es/glosario",
    siteName: "DealForge",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://dealforge.es/og-glosario.png",
        width: 1200,
        height: 630,
        alt: "Glosario de CPQ y Ventas — DealForge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glosario de CPQ y Ventas — Terminología Comercial",
    description:
      "Más de 30 términos de CPQ, ventas y gestión comercial explicados de forma clara.",
    images: ["https://dealforge.es/og-glosario.png"],
  },
  alternates: { canonical: "https://dealforge.es/glosario" },
};

/* ------------------------------------------------------------------ */
/*  Glossary data                                                      */
/* ------------------------------------------------------------------ */

interface Termino {
  id: string;
  nombre: string;
  definicion: string;
  link?: { href: string; label: string };
}

const TERMINOS: Termino[] = [
  {
    id: "aprobacion",
    nombre: "Aprobación",
    definicion:
      "Proceso mediante el cual un responsable revisa y autoriza una cotización, descuento u oferta antes de enviarla al cliente. Los flujos de aprobación reducen errores y garantizan que las condiciones comerciales cumplan las políticas de la empresa.",
    link: { href: "/funcionalidades/aprobaciones", label: "Flujos de aprobación en DealForge" },
  },
  {
    id: "automatizacion-comercial",
    nombre: "Automatización comercial",
    definicion:
      "Uso de software para ejecutar tareas repetitivas del proceso de ventas sin intervención manual, como el envío de cotizaciones, recordatorios de seguimiento o cálculos de precios. Permite a los equipos comerciales dedicar más tiempo a vender y menos a tareas administrativas.",
  },
  {
    id: "b2b",
    nombre: "B2B (Business to Business)",
    definicion:
      "Modelo de negocio en el que una empresa vende productos o servicios a otra empresa, en lugar de al consumidor final. Las ventas B2B suelen implicar ciclos más largos, múltiples decisores y propuestas personalizadas.",
  },
  {
    id: "backlog",
    nombre: "Backlog",
    definicion:
      "Lista priorizada de tareas, oportunidades o solicitudes pendientes de ser gestionadas por el equipo comercial o de producto. En ventas, puede referirse a las propuestas en cola que aún no se han enviado o a los deals que requieren seguimiento.",
  },
  {
    id: "cartera-de-clientes",
    nombre: "Cartera de clientes",
    definicion:
      "Conjunto de clientes actuales y potenciales que gestiona un vendedor o equipo comercial. Una buena gestión de cartera implica segmentación, seguimiento activo y estrategias de retención para maximizar el valor a largo plazo.",
    link: { href: "/funcionalidades/gestion-clientes", label: "Gestión de clientes en DealForge" },
  },
  {
    id: "ciclo-de-ventas",
    nombre: "Ciclo de ventas",
    definicion:
      "Secuencia completa de etapas que atraviesa una oportunidad comercial desde el primer contacto hasta el cierre del deal. Incluye prospección, calificación, presentación, negociación y cierre. Reducir la duración del ciclo es un objetivo clave de las herramientas CPQ.",
  },
  {
    id: "configurador-de-producto",
    nombre: "Configurador de producto",
    definicion:
      "Herramienta que permite seleccionar y combinar opciones de un producto o servicio según las necesidades del cliente, aplicando automáticamente reglas de compatibilidad y precios. Es la «C» de CPQ (Configure).",
    link: { href: "/funcionalidades/catalogo-productos", label: "Catálogo y configuración en DealForge" },
  },
  {
    id: "cotizacion",
    nombre: "Cotización",
    definicion:
      "Documento formal que detalla los productos o servicios ofrecidos, sus precios, condiciones de pago y validez. En un sistema CPQ, las cotizaciones se generan automáticamente a partir de la configuración seleccionada.",
    link: { href: "/funcionalidades/cotizaciones-pdf", label: "Cotizaciones PDF en DealForge" },
  },
  {
    id: "cpq",
    nombre: "CPQ (Configure, Price, Quote)",
    definicion:
      "Software que automatiza la configuración de productos, el cálculo de precios y la generación de cotizaciones. Elimina errores manuales, acelera el tiempo de respuesta y garantiza que cada propuesta cumpla las reglas comerciales de la empresa.",
  },
  {
    id: "crm",
    nombre: "CRM (Customer Relationship Management)",
    definicion:
      "Sistema para gestionar las relaciones e interacciones con clientes actuales y potenciales. Centraliza datos de contacto, historial de comunicaciones y oportunidades de venta. Un CPQ complementa al CRM automatizando la parte de cotización.",
  },
  {
    id: "cross-selling",
    nombre: "Cross-selling (venta cruzada)",
    definicion:
      "Estrategia de ventas que consiste en ofrecer productos o servicios complementarios al que el cliente ya está comprando. Por ejemplo, sugerir un servicio de soporte premium al vender un software. Aumenta el ticket medio sin necesidad de captar nuevos clientes.",
  },
  {
    id: "deal",
    nombre: "Deal (oportunidad de negocio)",
    definicion:
      "Término que designa una oportunidad comercial concreta con un cliente potencial. Un deal tiene un valor estimado, una etapa dentro del pipeline y una probabilidad de cierre. Es la unidad básica de seguimiento en ventas.",
  },
  {
    id: "descuento",
    nombre: "Descuento",
    definicion:
      "Reducción aplicada sobre el precio base de un producto o servicio para incentivar la compra. Los sistemas CPQ permiten definir reglas de descuento por volumen, tipo de cliente o temporada, evitando descuentos excesivos que erosionen el margen.",
    link: { href: "/funcionalidades/reglas-comerciales", label: "Reglas comerciales en DealForge" },
  },
  {
    id: "embudo-de-ventas",
    nombre: "Embudo de ventas (funnel)",
    definicion:
      "Representación visual del proceso de conversión de prospectos en clientes, desde el primer contacto hasta el cierre. Cada etapa filtra oportunidades: muchos leads entran por arriba, pero solo una fracción se convierte en venta al final.",
  },
  {
    id: "erp",
    nombre: "ERP (Enterprise Resource Planning)",
    definicion:
      "Sistema integrado de gestión empresarial que conecta finanzas, inventario, compras, producción y otros procesos. Cuando un CPQ se integra con el ERP, las cotizaciones aprobadas pueden convertirse automáticamente en pedidos y facturas.",
  },
  {
    id: "firma-electronica",
    nombre: "Firma electrónica",
    definicion:
      "Mecanismo digital que permite a un cliente aceptar y firmar una propuesta o contrato de forma remota, con validez legal. Integrar la firma electrónica en el proceso de cotización elimina las demoras del papel y acelera el cierre de deals.",
    link: { href: "/funcionalidades/firma-electronica", label: "Firma electrónica en DealForge" },
  },
  {
    id: "follow-up",
    nombre: "Follow-up (seguimiento)",
    definicion:
      "Acción de contactar a un prospecto o cliente después de una interacción previa para avanzar la negociación. Un seguimiento oportuno y personalizado es determinante para cerrar ventas: la mayoría de deals requieren múltiples puntos de contacto.",
    link: { href: "/funcionalidades/recordatorios", label: "Recordatorios y seguimiento en DealForge" },
  },
  {
    id: "forecast",
    nombre: "Forecast (pronóstico de ventas)",
    definicion:
      "Estimación de los ingresos que el equipo comercial espera generar en un periodo determinado, basándose en el estado del pipeline y las probabilidades de cierre. Un buen forecast permite planificar recursos, ajustar estrategias y anticipar resultados.",
    link: { href: "/funcionalidades/reportes-metricas", label: "Reportes y métricas en DealForge" },
  },
  {
    id: "gestion-de-contratos",
    nombre: "Gestión de contratos",
    definicion:
      "Proceso de crear, negociar, ejecutar y dar seguimiento a los contratos comerciales a lo largo de su ciclo de vida. Incluye control de fechas de vencimiento, renovaciones automáticas y almacenamiento centralizado de documentos.",
    link: { href: "/funcionalidades/gestion-contratos", label: "Gestión de contratos en DealForge" },
  },
  {
    id: "indicador-clave-kpi",
    nombre: "Indicador clave (KPI)",
    definicion:
      "Métrica cuantificable que mide el rendimiento de un equipo o proceso comercial frente a un objetivo concreto. Ejemplos habituales en ventas: tasa de conversión, ticket medio, ciclo de ventas medio y valor del pipeline.",
    link: { href: "/funcionalidades/reportes-metricas", label: "Métricas y KPIs en DealForge" },
  },
  {
    id: "iva",
    nombre: "IVA (Impuesto al Valor Agregado)",
    definicion:
      "Impuesto indirecto que se aplica al consumo de bienes y servicios. Los sistemas CPQ calculan automáticamente el IVA correspondiente según el tipo de producto, la ubicación del cliente y la legislación vigente, evitando errores en las cotizaciones.",
  },
  {
    id: "lead",
    nombre: "Lead",
    definicion:
      "Persona o empresa que ha mostrado interés en tu producto o servicio, pero aún no ha sido cualificada como oportunidad de venta. Los leads se captan a través de formularios, eventos o contenido, y se nutren hasta que estén listos para comprar.",
  },
  {
    id: "linea-de-cotizacion",
    nombre: "Línea de cotización",
    definicion:
      "Cada ítem individual dentro de una cotización, que incluye el producto o servicio, la cantidad, el precio unitario, los descuentos aplicados y el subtotal. Las líneas de cotización se suman para formar el total de la propuesta.",
  },
  {
    id: "margen",
    nombre: "Margen",
    definicion:
      "Diferencia entre el precio de venta y el coste del producto o servicio, expresada como porcentaje del precio de venta. Controlar los márgenes es esencial para la rentabilidad; las reglas de un CPQ pueden bloquear cotizaciones que caigan por debajo del margen mínimo.",
  },
  {
    id: "mrr",
    nombre: "MRR (Monthly Recurring Revenue)",
    definicion:
      "Ingresos recurrentes mensuales predecibles generados por suscripciones o contratos periódicos. Es la métrica principal de las empresas SaaS y de servicios por suscripción, ya que refleja la salud y estabilidad del negocio.",
  },
  {
    id: "nda",
    nombre: "NDA (Non-Disclosure Agreement)",
    definicion:
      "Acuerdo de confidencialidad que firman las partes antes de compartir información sensible durante una negociación comercial. Es habitual en ventas B2B donde se intercambian datos técnicos, precios especiales o estrategias de negocio.",
  },
  {
    id: "negociacion",
    nombre: "Negociación",
    definicion:
      "Fase del ciclo de ventas en la que vendedor y comprador discuten condiciones, precios, plazos y alcance del acuerdo. Una negociación eficaz se apoya en datos precisos y propuestas claras, exactamente lo que un CPQ facilita.",
  },
  {
    id: "onboarding",
    nombre: "Onboarding",
    definicion:
      "Proceso de incorporación y acompañamiento de un nuevo cliente tras la firma del contrato. Un buen onboarding reduce el churn, acelera el time-to-value y sienta las bases para futuras ventas cruzadas y renovaciones.",
  },
  {
    id: "oportunidad",
    nombre: "Oportunidad",
    definicion:
      "Prospecto cualificado que tiene una necesidad real, presupuesto y autoridad para tomar la decisión de compra. En el CRM, una oportunidad se asocia a un valor estimado, una etapa del pipeline y una fecha de cierre prevista.",
  },
  {
    id: "pipeline",
    nombre: "Pipeline",
    definicion:
      "Vista organizada de todas las oportunidades de venta activas, clasificadas por etapa del proceso comercial. El pipeline permite al equipo priorizar esfuerzos, identificar cuellos de botella y proyectar ingresos futuros con mayor precisión.",
  },
  {
    id: "precio-unitario",
    nombre: "Precio unitario",
    definicion:
      "Coste asignado a una sola unidad de un producto o servicio dentro de una cotización. El precio unitario puede variar según volumen, tipo de cliente o promociones activas, y el CPQ lo calcula automáticamente.",
  },
  {
    id: "presupuesto",
    nombre: "Presupuesto",
    definicion:
      "Documento que estima el coste total de un proyecto o servicio para el cliente. Aunque se usa como sinónimo de cotización en algunos mercados, el presupuesto suele ser más detallado e incluir desglose de fases, materiales y mano de obra.",
    link: { href: "/funcionalidades/cotizaciones-pdf", label: "Generación de presupuestos en DealForge" },
  },
  {
    id: "propuesta-comercial",
    nombre: "Propuesta comercial",
    definicion:
      "Documento integral que presenta la solución al problema del cliente, incluyendo alcance, metodología, cronograma, equipo, precios y condiciones. Va más allá de una simple cotización, ya que argumenta el valor de la oferta.",
  },
  {
    id: "pyme",
    nombre: "PYME (Pequeña y Mediana Empresa)",
    definicion:
      "Empresa con un número limitado de empleados y facturación moderada, según los criterios de cada país. Las PYMEs representan la mayor parte del tejido empresarial y necesitan herramientas comerciales accesibles y fáciles de implementar.",
  },
  {
    id: "recordatorio",
    nombre: "Recordatorio",
    definicion:
      "Notificación automática o manual que avisa al vendedor de que debe realizar una acción, como hacer seguimiento a una cotización enviada, renovar un contrato o contactar a un lead. Los recordatorios evitan que las oportunidades se enfríen.",
    link: { href: "/funcionalidades/recordatorios", label: "Sistema de recordatorios en DealForge" },
  },
  {
    id: "regla-comercial",
    nombre: "Regla comercial",
    definicion:
      "Condición configurada en el sistema CPQ que controla automáticamente aspectos como descuentos máximos, combinaciones de productos válidas, requisitos de aprobación o márgenes mínimos. Las reglas comerciales aseguran consistencia y reducen errores.",
    link: { href: "/funcionalidades/reglas-comerciales", label: "Motor de reglas en DealForge" },
  },
  {
    id: "renovacion",
    nombre: "Renovación",
    definicion:
      "Proceso de extender un contrato o suscripción existente al término de su periodo de vigencia. La gestión proactiva de renovaciones es clave para retener ingresos recurrentes y evitar la pérdida de clientes.",
    link: { href: "/funcionalidades/renovaciones-alertas", label: "Renovaciones y alertas en DealForge" },
  },
  {
    id: "roi",
    nombre: "ROI (Return on Investment)",
    definicion:
      "Indicador que mide la rentabilidad de una inversión comparando el beneficio obtenido con el coste. En ventas, se usa para justificar la adquisición de herramientas como un CPQ: si el software ahorra más de lo que cuesta, el ROI es positivo.",
  },
  {
    id: "saas",
    nombre: "SaaS (Software as a Service)",
    definicion:
      "Modelo de distribución de software en el que la aplicación se aloja en la nube y se accede mediante suscripción, sin necesidad de instalación local. DealForge es un ejemplo de SaaS orientado a la gestión comercial de PYMEs.",
  },
  {
    id: "sla",
    nombre: "SLA (Service Level Agreement)",
    definicion:
      "Acuerdo de nivel de servicio que establece los compromisos de calidad, disponibilidad y tiempos de respuesta entre un proveedor y su cliente. En el contexto de ventas, los SLAs pueden definir plazos máximos para enviar cotizaciones o resolver incidencias.",
  },
  {
    id: "sql-sales-qualified-lead",
    nombre: "SQL (Sales Qualified Lead)",
    definicion:
      "Lead que ha sido evaluado por el equipo de marketing y ventas y cumple los criterios para ser contactado directamente por un vendedor. A diferencia de un MQL (Marketing Qualified Lead), un SQL tiene mayor probabilidad de convertirse en cliente.",
  },
  {
    id: "tasa-de-conversion",
    nombre: "Tasa de conversión",
    definicion:
      "Porcentaje de prospectos u oportunidades que avanzan de una etapa a la siguiente o que se convierten en clientes. Es una de las métricas más importantes del embudo de ventas y permite identificar en qué etapa se pierden más deals.",
    link: { href: "/funcionalidades/reportes-metricas", label: "Análisis de conversión en DealForge" },
  },
  {
    id: "ticket-medio",
    nombre: "Ticket medio",
    definicion:
      "Valor promedio de cada transacción o deal cerrado. Se calcula dividiendo los ingresos totales entre el número de ventas. Incrementar el ticket medio —mediante upselling o cross-selling— es una palanca directa de crecimiento.",
  },
  {
    id: "upselling",
    nombre: "Upselling (venta ascendente)",
    definicion:
      "Estrategia que consiste en ofrecer al cliente una versión superior o más completa del producto o servicio que está considerando comprar. A diferencia del cross-selling, el upselling mejora la misma línea de producto en vez de añadir productos distintos.",
  },
  {
    id: "valor-de-contrato",
    nombre: "Valor de contrato",
    definicion:
      "Monto total que representa un contrato a lo largo de su vigencia. También conocido como TCV (Total Contract Value), incluye pagos recurrentes, cargos únicos y cualquier ajuste pactado. Es clave para el forecast y la valoración del pipeline.",
    link: { href: "/funcionalidades/gestion-contratos", label: "Contratos y valoración en DealForge" },
  },
  {
    id: "versionado",
    nombre: "Versionado",
    definicion:
      "Práctica de mantener un historial de versiones de una cotización o propuesta comercial cada vez que se modifica. El versionado permite comparar cambios, auditar negociaciones y garantizar que el cliente siempre recibe el documento más actualizado.",
    link: { href: "/funcionalidades/versionado", label: "Versionado de cotizaciones en DealForge" },
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function agruparPorLetra(terminos: Termino[]) {
  const mapa: Record<string, Termino[]> = {};
  for (const t of terminos) {
    const letra = t.nombre.charAt(0).toUpperCase();
    if (!mapa[letra]) mapa[letra] = [];
    mapa[letra].push(t);
  }
  return mapa;
}

const terminosOrdenados = [...TERMINOS].sort((a, b) =>
  a.nombre.localeCompare(b.nombre, "es"),
);
const porLetra = agruparPorLetra(terminosOrdenados);
const letrasDisponibles = Object.keys(porLetra).sort((a, b) =>
  a.localeCompare(b, "es"),
);
const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

/* ------------------------------------------------------------------ */
/*  JSON-LD                                                            */
/* ------------------------------------------------------------------ */

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Glosario de CPQ y Ventas",
    description:
      "Más de 30 términos de CPQ, ventas y gestión comercial explicados de forma clara para equipos comerciales.",
    url: "https://dealforge.es/glosario",
    hasDefinedTerm: terminosOrdenados.map((t) => ({
      "@type": "DefinedTerm",
      name: t.nombre,
      description: t.definicion,
      url: `https://dealforge.es/glosario#${t.id}`,
    })),
  },
  {
    "@context": "https://schema.org",
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
        name: "Glosario",
        item: "https://dealforge.es/glosario",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function GlosarioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt="DealForge"
              width={32}
              height={32}
              className="rounded-lg"
            />
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
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-[#3a9bb5]/10 text-[#3a9bb5] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <BookOpen className="w-4 h-4" />
            Glosario
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Glosario de CPQ y Ventas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Consulta la terminología comercial más utilizada en el mundo de las
            ventas B2B, los sistemas CPQ y la gestión de cotizaciones. Definiciones
            claras, prácticas y en español.
          </p>
        </div>
      </section>

      {/* Alphabet navigation */}
      <nav className="sticky top-[65px] z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap gap-1.5 justify-center">
          {ALFABETO.map((letra) => {
            const disponible = letrasDisponibles.includes(letra);
            return disponible ? (
              <a
                key={letra}
                href={`#letra-${letra}`}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold text-[#3a9bb5] hover:bg-[#3a9bb5] hover:text-white transition-colors"
              >
                {letra}
              </a>
            ) : (
              <span
                key={letra}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold text-gray-300 cursor-default"
              >
                {letra}
              </span>
            );
          })}
        </div>
      </nav>

      {/* Terms */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {letrasDisponibles.map((letra) => (
          <div key={letra} id={`letra-${letra}`} className="mb-12 scroll-mt-36">
            <h2 className="text-2xl font-bold text-[#3a9bb5] border-b-2 border-[#3a9bb5]/20 pb-2 mb-6">
              {letra}
            </h2>
            <div className="space-y-8">
              {porLetra[letra].map((t) => (
                <article key={t.id} id={t.id} className="scroll-mt-36">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {t.nombre}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{t.definicion}</p>
                  {t.link && (
                    <Link
                      href={t.link.href}
                      className="inline-flex items-center gap-1 text-sm text-[#3a9bb5] hover:text-[#2d7d94] font-medium mt-2 transition-colors"
                    >
                      {t.link.label} &rarr;
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-2xl p-8 sm:p-12 text-white text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Pon en práctica estos conceptos
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              DealForge es el CPQ diseñado para PYMEs que quieren crear
              cotizaciones profesionales, automatizar sus procesos comerciales y
              cerrar más deals en menos tiempo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/registro"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#3a9bb5] font-semibold text-sm px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Empieza Gratis — Sin tarjeta
              </Link>
              <Link
                href="/funcionalidades"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-medium text-sm px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                Ver funcionalidades
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} DealForge. Todos los derechos
          reservados.
        </p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <Link
            href="/privacidad"
            className="hover:text-gray-600 transition-colors"
          >
            Privacidad
          </Link>
          <Link
            href="/terminos"
            className="hover:text-gray-600 transition-colors"
          >
            Términos
          </Link>
        </div>
      </footer>
    </div>
  );
}
