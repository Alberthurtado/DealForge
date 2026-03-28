import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Settings,
  DollarSign,
  FileText,
  Clock,
  ShieldCheck,
  TrendingUp,
  Users,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Target,
  Layers,
  ArrowRight,
  ChevronRight,
  BookOpen,
  ListChecks,
  HelpCircle,
  Building2,
  Calculator,
  RefreshCw,
  Globe,
  Award,
  Lightbulb,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  title: "Que es CPQ: Guia Completa para PYMEs | DealForge",
  description:
    "Descubre que es un CPQ (Configure Price Quote), como funciona y por que las PYMEs lo necesitan. Guia completa con comparativas, beneficios y criterios de eleccion.",
  keywords: [
    "que es CPQ",
    "CPQ software",
    "Configure Price Quote",
    "CPQ para PYMEs",
    "sistema CPQ",
    "software cotizaciones",
    "automatizar cotizaciones",
    "CPQ vs CRM",
    "CPQ vs ERP",
    "cotizaciones automaticas",
  ],
  openGraph: {
    title: "Que es CPQ: Guia Completa para PYMEs",
    description:
      "Aprende que es un CPQ, como funciona y como elegir el mejor para tu empresa. Guia educativa completa en espanol.",
    url: "https://dealforge.es/que-es-cpq",
    siteName: "DealForge",
    locale: "es_ES",
    type: "article",
    images: [
      {
        url: "https://dealforge.es/og-que-es-cpq.png",
        width: 1200,
        height: 630,
        alt: "Que es un CPQ - Guia completa para PYMEs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Que es CPQ: Guia Completa para PYMEs",
    description:
      "Descubre que es un CPQ, como funciona y por que tu PYME lo necesita. Guia educativa completa.",
    images: ["https://dealforge.es/og-que-es-cpq.png"],
  },
  alternates: { canonical: "https://dealforge.es/que-es-cpq" },
};

/* ------------------------------------------------------------------ */
/*  JSON-LD Structured Data                                           */
/* ------------------------------------------------------------------ */
const jsonLdArticle = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Que es un CPQ? Guia completa para PYMEs",
  description:
    "Guia educativa sobre que es un sistema CPQ (Configure Price Quote), como funciona, sus beneficios y como elegir el mejor para una PYME.",
  url: "https://dealforge.es/que-es-cpq",
  datePublished: "2025-06-15",
  dateModified: "2026-03-28",
  author: {
    "@type": "Organization",
    name: "DealForge",
    url: "https://dealforge.es",
  },
  publisher: {
    "@type": "Organization",
    name: "DealForge",
    url: "https://dealforge.es",
    logo: { "@type": "ImageObject", url: "https://dealforge.es/logo.svg" },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://dealforge.es/que-es-cpq",
  },
  image: "https://dealforge.es/og-que-es-cpq.png",
  inLanguage: "es",
  keywords: "CPQ, Configure Price Quote, software cotizaciones, PYMEs",
};

const jsonLdBreadcrumb = {
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
      name: "Que es CPQ",
      item: "https://dealforge.es/que-es-cpq",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Data constants                                                    */
/* ------------------------------------------------------------------ */
const TOC_ITEMS = [
  { id: "que-significa", label: "Que significa CPQ" },
  { id: "por-que-pymes", label: "Por que las PYMEs lo necesitan" },
  { id: "como-funciona", label: "Como funciona un CPQ" },
  { id: "cpq-vs-crm-erp", label: "CPQ vs CRM vs ERP" },
  { id: "beneficios", label: "Beneficios de implementar un CPQ" },
  { id: "cuando-necesitas", label: "Cuando necesita tu empresa un CPQ" },
  { id: "como-elegir", label: "Como elegir el mejor CPQ" },
  { id: "preguntas-frecuentes", label: "Preguntas frecuentes" },
];

const RAZONES_PYMES = [
  {
    icon: Clock,
    titulo: "Ahorro de tiempo radical",
    texto:
      "Las PYMEs dedican entre 3 y 8 horas semanales a preparar cotizaciones de forma manual. Un CPQ reduce ese tiempo a minutos, liberando a tu equipo comercial para que se concentre en vender, no en rellenar plantillas.",
  },
  {
    icon: ShieldCheck,
    titulo: "Eliminacion de errores costosos",
    texto:
      "Un precio mal calculado, un descuento no autorizado o un producto descatalogado en una propuesta puede costarte un cliente o margen. El CPQ aplica reglas automaticas que garantizan exactitud en cada cotizacion.",
  },
  {
    icon: TrendingUp,
    titulo: "Mayor tasa de cierre",
    texto:
      "Responder rapido transmite profesionalidad. Los estudios indican que el equipo que envia primero la propuesta gana el negocio en la mayoria de los casos. Con un CPQ puedes responder al cliente el mismo dia.",
  },
  {
    icon: Users,
    titulo: "Imagen profesional unificada",
    texto:
      "Cada vendedor usa su propia plantilla de Excel? Con un CPQ, todas las cotizaciones siguen el mismo formato corporativo, con tu logotipo, tus terminos y una presentacion impecable.",
  },
  {
    icon: BarChart3,
    titulo: "Visibilidad sobre el pipeline comercial",
    texto:
      "El CPQ registra cada cotizacion creada, su estado y su historial de cambios. Esto te da datos reales sobre tu embudo de ventas: cuantas propuestas envias, cuantas se aceptan y donde se pierden.",
  },
];

const PASOS_CPQ = [
  {
    num: "01",
    titulo: "Configurar (Configure)",
    desc: "El vendedor selecciona los productos o servicios que el cliente necesita. El sistema muestra solo las combinaciones validas: si un producto requiere un complemento obligatorio, el CPQ lo anade automaticamente. Si dos opciones son incompatibles, el sistema lo advierte antes de continuar.",
  },
  {
    num: "02",
    titulo: "Precio (Price)",
    desc: "Una vez configurada la seleccion, el CPQ calcula el precio final aplicando las reglas de negocio: descuentos por volumen, tarifas especiales por cliente, promociones vigentes, impuestos locales y margenes minimos. El vendedor no tiene que buscar en tablas de precios ni hacer calculos manuales.",
  },
  {
    num: "03",
    titulo: "Cotizar (Quote)",
    desc: "El sistema genera un documento de cotizacion profesional en PDF o formato digital interactivo, listo para enviar al cliente. Incluye el detalle de productos, precios, terminos y condiciones, y en muchos casos ofrece la posibilidad de firma electronica integrada para cerrar el acuerdo sin fricciones.",
  },
];

const COMPARATIVA = [
  {
    criterio: "Funcion principal",
    cpq: "Configurar productos, calcular precios y generar cotizaciones",
    crm: "Gestionar relaciones con clientes y oportunidades de venta",
    erp: "Administrar operaciones internas: finanzas, inventario, RRHH",
  },
  {
    criterio: "Usuarios tipicos",
    cpq: "Equipo comercial, preventa",
    crm: "Ventas, marketing, atencion al cliente",
    erp: "Finanzas, operaciones, direccion general",
  },
  {
    criterio: "Datos clave",
    cpq: "Catalogo de productos, reglas de precios, plantillas de propuesta",
    crm: "Contactos, oportunidades, historial de interacciones",
    erp: "Ordenes de compra, inventario, contabilidad, nominas",
  },
  {
    criterio: "Momento del ciclo de venta",
    cpq: "Desde la consulta del cliente hasta la propuesta firmada",
    crm: "Desde el primer contacto hasta el seguimiento postventa",
    erp: "Desde la orden confirmada hasta la facturacion y entrega",
  },
  {
    criterio: "Resultado principal",
    cpq: "Cotizacion precisa y profesional en minutos",
    crm: "Pipeline de ventas organizado y medible",
    erp: "Operaciones internas eficientes y trazables",
  },
];

const BENEFICIOS = [
  {
    icon: Zap,
    titulo: "Velocidad de respuesta",
    texto:
      "Las empresas que responden en menos de una hora tienen 7 veces mas probabilidades de tener una conversacion significativa con el decisor de compra.",
    stat: "7x",
  },
  {
    icon: Target,
    titulo: "Precision en los precios",
    texto:
      "La eliminacion de errores manuales en el calculo de precios puede reducir las disputas comerciales y las revisiones de facturas de forma significativa.",
    stat: "-95%",
  },
  {
    icon: TrendingUp,
    titulo: "Incremento del ticket medio",
    texto:
      "Las sugerencias automaticas de venta cruzada y upselling ayudan a que los vendedores ofrezcan complementos relevantes que el cliente valora, incrementando el valor de cada operacion.",
    stat: "+25%",
  },
  {
    icon: RefreshCw,
    titulo: "Ciclo de venta mas corto",
    texto:
      "Al eliminar idas y vueltas con propuestas incorrectas, el tiempo medio desde la consulta hasta la firma se reduce considerablemente.",
    stat: "-30%",
  },
  {
    icon: Users,
    titulo: "Onboarding mas rapido de vendedores",
    texto:
      "Los nuevos comerciales no necesitan memorizar catalogos ni politicas de descuento. El CPQ les guia paso a paso para configurar propuestas correctas desde el primer dia.",
    stat: "50%",
  },
  {
    icon: ShieldCheck,
    titulo: "Control de margenes",
    texto:
      "Las reglas de descuento maximo y margen minimo evitan que los vendedores ofrezcan precios que comprometan la rentabilidad del negocio, sin necesidad de aprobaciones manuales constantes.",
    stat: "100%",
  },
  {
    icon: Globe,
    titulo: "Escalabilidad internacional",
    texto:
      "Si tu empresa trabaja con distintas divisas, impuestos o regulaciones, el CPQ adapta automaticamente cada cotizacion al mercado de destino sin duplicar trabajo.",
    stat: "Multi",
  },
  {
    icon: BarChart3,
    titulo: "Datos para decisiones estrategicas",
    texto:
      "Cada cotizacion generada alimenta un repositorio de datos: que productos se cotizan mas, que descuentos se aplican, que clientes aceptan y cuales no. Esa informacion es oro para planificar.",
    stat: "360",
  },
];

const SENALES_CPQ = [
  "Tu equipo comercial tarda mas de un dia en enviar una cotizacion",
  "Usas hojas de calculo o documentos de texto para crear propuestas",
  "Los vendedores aplican descuentos sin un criterio uniforme",
  "Has perdido negocios porque la propuesta llego tarde",
  "Los errores en precios o configuraciones son frecuentes",
  "No tienes visibilidad sobre cuantas cotizaciones se envian al mes",
  "Cada vendedor formatea las propuestas de forma diferente",
  "No puedes medir tu tasa de conversion de cotizacion a venta",
  "Tu catalogo de productos tiene reglas de combinacion complejas",
  "Quieres crecer pero tu proceso comercial no escala",
];

const CRITERIOS_ELECCION = [
  {
    icon: Building2,
    titulo: "Tamano de tu empresa y equipo comercial",
    desc: "No necesitas la misma herramienta si tienes 3 vendedores que si tienes 50. Busca un CPQ que se adapte a tu realidad actual pero que pueda crecer contigo. Las soluciones pensadas para grandes corporaciones suelen ser excesivas y costosas para una PYME.",
  },
  {
    icon: Layers,
    titulo: "Complejidad de tu catalogo de productos",
    desc: "Si vendes servicios simples, un CPQ basico puede ser suficiente. Pero si tu catalogo incluye opciones configurables, paquetes, complementos obligatorios o reglas de incompatibilidad, necesitas un sistema que maneje esa logica de forma nativa.",
  },
  {
    icon: Calculator,
    titulo: "Reglas de precios y descuentos",
    desc: "Evalua si el CPQ permite definir tus estructuras de precios: descuentos por volumen, precios escalonados, tarifas por cliente, margenes minimos, promociones temporales. Cuanto mas flexible sea el motor de precios, mejor se adaptara a tu negocio.",
  },
  {
    icon: RefreshCw,
    titulo: "Integraciones con tu stack actual",
    desc: "El CPQ debe conectarse con tu CRM, tu sistema de facturacion y tu herramienta de firma electronica. Las integraciones nativas o via API abierta reducen la friccion y evitan la doble entrada de datos.",
  },
  {
    icon: Lightbulb,
    titulo: "Facilidad de uso y adopcion",
    desc: "La mejor herramienta es la que tu equipo realmente usa. Prioriza interfaces intuitivas, flujos guiados y un proceso de onboarding sencillo. Si los vendedores necesitan semanas de formacion, la adopcion sera baja.",
  },
  {
    icon: Award,
    titulo: "Soporte y evolucion del producto",
    desc: "Elige un proveedor que ofrezca soporte en tu idioma, documentacion clara y un roadmap de producto activo. Un CPQ que no evoluciona se quedara obsoleto rapidamente, especialmente con la irrupcion de la inteligencia artificial en el ambito comercial.",
  },
];

const FAQS = [
  {
    pregunta: "Que significa CPQ exactamente?",
    respuesta:
      "CPQ son las siglas en ingles de Configure, Price, Quote. En espanol: Configurar, Precio, Cotizar. Se refiere a un tipo de software que automatiza el proceso de crear cotizaciones comerciales: desde la seleccion de productos hasta el calculo de precios y la generacion del documento final de propuesta.",
  },
  {
    pregunta: "Un CPQ es lo mismo que un CRM?",
    respuesta:
      "No. Un CRM gestiona la relacion con los clientes y el pipeline de ventas. Un CPQ se centra exclusivamente en el proceso de cotizacion: configurar productos, calcular precios con reglas de negocio y generar propuestas profesionales. Ambos son complementarios: el CRM gestiona la relacion y el CPQ automatiza la propuesta.",
  },
  {
    pregunta: "Cuanto cuesta implementar un CPQ en una PYME?",
    respuesta:
      "El coste varia enormemente segun la solucion. Los CPQ empresariales (Salesforce CPQ, Oracle CPQ) pueden costar miles de euros al mes. Sin embargo, existen soluciones modernas disenadas para PYMEs con planes asequibles o incluso gratuitos para empezar. Lo importante es calcular el retorno: si un CPQ te ahorra 10 horas semanales y mejora tu tasa de cierre, la inversion se recupera rapidamente.",
  },
  {
    pregunta: "Necesito conocimientos tecnicos para usar un CPQ?",
    respuesta:
      "Los CPQ modernos estan disenados para que los use el equipo comercial sin conocimientos tecnicos. La configuracion inicial puede requerir ayuda del proveedor para importar tu catalogo de productos y definir reglas de precios, pero el uso diario es tan sencillo como rellenar un formulario guiado.",
  },
  {
    pregunta: "Cuanto tiempo lleva implementar un CPQ?",
    respuesta:
      "Depende de la complejidad de tu catalogo y reglas de precios. Para una PYME con un catalogo moderado, la implementacion puede completarse en dias o pocas semanas. Las soluciones en la nube con asistentes de configuracion aceleran mucho el proceso comparado con los sistemas tradicionales que requerian meses.",
  },
  {
    pregunta: "Un CPQ funciona para empresas de servicios o solo de productos?",
    respuesta:
      "Funciona para ambos. De hecho, las empresas de servicios profesionales (consultorias, agencias, empresas de IT) son uno de los segmentos que mas beneficio obtienen de un CPQ, porque suelen tener tarifas variables, paquetes personalizables y necesidad de propuestas muy detalladas.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                    */
/* ------------------------------------------------------------------ */
export default function QueEsCPQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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
            Empieza gratis &rarr;
          </Link>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a9bb5]/5 via-white to-cyan-50/30" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-800 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            Guia educativa
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 max-w-3xl mx-auto">
            Que es un CPQ? Guia completa para PYMEs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Todo lo que necesitas saber sobre los sistemas{" "}
            <strong>Configure, Price, Quote</strong>: que son, como funcionan,
            por que las pequenas y medianas empresas los necesitan y como elegir
            el adecuado para tu negocio.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* ── Breadcrumb ─────────────────────────────────────── */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-sm text-gray-500 mb-12"
        >
          <Link href="/" className="hover:text-[#3a9bb5] transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">Que es CPQ</span>
        </nav>

        {/* ── Table of Contents ──────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-16">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
            <ListChecks className="w-5 h-5 text-[#3a9bb5]" />
            Contenido de esta guia
          </h2>
          <ol className="grid sm:grid-cols-2 gap-2">
            {TOC_ITEMS.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-[#3a9bb5] transition-colors py-1"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3a9bb5]/10 text-[#3a9bb5] text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* ────────────────────────────────────────────────────── */}
        {/*  Section 1: Que significa CPQ                         */}
        {/* ────────────────────────────────────────────────────── */}
        <section id="que-significa" className="mb-20 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Que significa CPQ?
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            CPQ es el acronimo de <strong>Configure, Price, Quote</strong>, que
            en espanol se traduce como{" "}
            <strong>Configurar, Precio, Cotizar</strong>. Es una categoria de
            software disenado para automatizar y optimizar el proceso comercial
            de crear cotizaciones o propuestas para clientes.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            En lugar de que un vendedor abra un documento en blanco, busque
            precios en una hoja de calculo, aplique descuentos manualmente y
            formatee la propuesta a mano, un sistema CPQ guia ese proceso de
            forma inteligente: garantiza que la configuracion del producto sea
            valida, que el precio sea correcto segun las reglas de negocio, y que
            el documento final sea profesional y coherente con la marca de la
            empresa.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: Settings,
                letra: "C",
                palabra: "Configure",
                desc: "Selecciona y combina productos o servicios segun las necesidades del cliente, respetando reglas de compatibilidad y dependencias.",
              },
              {
                icon: DollarSign,
                letra: "P",
                palabra: "Price",
                desc: "Calcula el precio final aplicando descuentos, margenes, impuestos y tarifas especiales de forma automatica y sin errores.",
              },
              {
                icon: FileText,
                letra: "Q",
                palabra: "Quote",
                desc: "Genera un documento de cotizacion profesional, personalizado y listo para enviar o firmar electronicamente.",
              },
            ].map((item) => (
              <div
                key={item.letra}
                className="bg-white rounded-xl border border-gray-200 p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-[#3a9bb5]/10 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-[#3a9bb5]" />
                </div>
                <p className="text-2xl font-bold text-[#3a9bb5] mb-1">
                  {item.letra}
                </p>
                <p className="font-semibold text-gray-900 mb-2">
                  {item.palabra}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed">
            El concepto de CPQ nacio en el entorno de grandes empresas
            tecnologicas y manufactureras con catalogos complejos. Sin embargo,
            en los ultimos anos ha evolucionado enormemente. Hoy existen
            soluciones CPQ accesibles, en la nube y disenadas especificamente
            para PYMEs, que no requieren meses de implementacion ni presupuestos
            de seis cifras. Si tu empresa crea cotizaciones comerciales de forma
            regular, un CPQ puede transformar tu productividad.
          </p>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/*  Section 2: Por que las PYMEs necesitan un CPQ        */}
        {/* ────────────────────────────────────────────────────── */}
        <section id="por-que-pymes" className="mb-20 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Por que las PYMEs necesitan un CPQ?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Muchas PYMEs creen que el CPQ es solo para grandes corporaciones.
            La realidad es que las empresas pequenas y medianas son las que
            mas sufren los problemas que un CPQ resuelve: procesos manuales,
            falta de estandarizacion, errores en precios y lentitud en las
            respuestas comerciales. Estas son las cinco razones fundamentales
            por las que una PYME deberia considerar un CPQ.
          </p>

          <div className="space-y-5">
            {RAZONES_PYMES.map((razon, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-6 flex gap-5"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#3a9bb5]/10 flex items-center justify-center">
                  <razon.icon className="w-6 h-6 text-[#3a9bb5]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {i + 1}. {razon.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {razon.texto}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed mt-8">
            Estos beneficios no son teoricos. Cualquier PYME que haya pasado de
            crear cotizaciones en Excel a usar un{" "}
            <Link
              href="/funcionalidades"
              className="text-[#3a9bb5] font-medium hover:underline"
            >
              sistema de cotizaciones profesional
            </Link>{" "}
            puede confirmar la diferencia en productividad y resultados
            comerciales.
          </p>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/*  Section 3: Como funciona un sistema CPQ              */}
        {/* ────────────────────────────────────────────────────── */}
        <section id="como-funciona" className="mb-20 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Como funciona un sistema CPQ?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            El flujo de trabajo de un CPQ sigue tres pasos bien definidos que
            reflejan el propio nombre del software. Veamos cada uno en detalle
            para entender como se traduce en el dia a dia de un equipo
            comercial.
          </p>

          <div className="space-y-6 mb-8">
            {PASOS_CPQ.map((paso) => (
              <div key={paso.num} className="flex gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] text-white font-bold text-lg flex items-center justify-center">
                  {paso.num}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-gray-900 mb-2">
                    {paso.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {paso.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">
              Un ejemplo practico
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Imagina que diriges una agencia de marketing digital. Un cliente
              potencial te pide una propuesta para gestion de redes sociales,
              publicidad en Google Ads y diseno de landing pages. Con un CPQ,
              seleccionas esos tres servicios, el sistema aplica
              automaticamente el descuento del 10% que ofreces por contratar
              tres servicios a la vez, calcula el IVA y genera un PDF con tu
              marca corporativa, el desglose de precios, los entregables y los
              terminos del servicio. En lugar de dedicar una hora a montar la
              propuesta en un documento, la tienes lista en cinco minutos. Eso
              es exactamente lo que puedes lograr con herramientas como{" "}
              <Link
                href="/funcionalidades"
                className="text-[#3a9bb5] font-medium hover:underline"
              >
                las funcionalidades de DealForge
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/*  Section 4: CPQ vs CRM vs ERP                        */}
        {/* ────────────────────────────────────────────────────── */}
        <section id="cpq-vs-crm-erp" className="mb-20 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            CPQ vs CRM vs ERP: Cual es la diferencia?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Una de las confusiones mas habituales es mezclar estos tres tipos de
            software. Aunque pueden integrarse entre si y de hecho funcionan
            mejor juntos, cada uno cumple una mision distinta dentro de la
            empresa. Esta tabla resume las diferencias clave.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-4 font-semibold text-gray-900">
                    Criterio
                  </th>
                  <th className="text-left p-4 font-semibold text-[#3a9bb5]">
                    CPQ
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-900">
                    CRM
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-900">
                    ERP
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIVA.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-4 font-medium text-gray-900">
                      {row.criterio}
                    </td>
                    <td className="p-4 text-gray-600">{row.cpq}</td>
                    <td className="p-4 text-gray-600">{row.crm}</td>
                    <td className="p-4 text-gray-600">{row.erp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-600 leading-relaxed">
            La clave esta en entender que estos sistemas no compiten entre si,
            sino que se complementan. Un CRM te ayuda a gestionar la relacion
            con el cliente. Cuando llega el momento de hacer una propuesta
            formal, el CPQ se encarga de crear esa cotizacion de forma rapida y
            precisa. Y una vez que el cliente acepta, el ERP toma el relevo para
            gestionar la orden, la facturacion y la entrega. Para muchas PYMEs,
            un CPQ integrado con un CRM basico cubre el 90% de sus necesidades
            comerciales sin la complejidad de un ERP.
          </p>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/*  Section 5: Beneficios de implementar un CPQ          */}
        {/* ────────────────────────────────────────────────────── */}
        <section id="beneficios" className="mb-20 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Beneficios de implementar un CPQ
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Los beneficios de un sistema CPQ van mas alla de la velocidad.
            Impactan en la rentabilidad, la experiencia del cliente y la
            capacidad de escalar tu operacion comercial. Estos son los ocho
            beneficios mas relevantes para una PYME.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {BENEFICIOS.map((b, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#3a9bb5]/10 flex items-center justify-center">
                    <b.icon className="w-5 h-5 text-[#3a9bb5]" />
                  </div>
                  <span className="text-xl font-bold text-[#3a9bb5]">
                    {b.stat}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{b.titulo}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {b.texto}
                </p>
              </div>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed mt-8">
            Si quieres profundizar en como estos beneficios se aplican en la
            practica, puedes visitar nuestro{" "}
            <Link
              href="/blog"
              className="text-[#3a9bb5] font-medium hover:underline"
            >
              blog con casos y articulos
            </Link>{" "}
            sobre productividad comercial para equipos de ventas.
          </p>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/*  Section 6: Cuando necesita tu empresa un CPQ         */}
        {/* ────────────────────────────────────────────────────── */}
        <section id="cuando-necesitas" className="mb-20 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Cuando necesita tu empresa un CPQ?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            No todas las empresas necesitan un CPQ desde el primer dia. Pero hay
            senales claras que indican que tu proceso comercial se beneficiaria
            de una automatizacion. Si reconoces tres o mas de las siguientes
            situaciones, es buen momento para evaluarlo.
          </p>

          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <div className="space-y-3">
              {SENALES_CPQ.map((senal, i) => (
                <label
                  key={i}
                  className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#3a9bb5] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{senal}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-gray-900 mb-1">
                Senal de alerta comun
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Si tu equipo comercial dedica mas tiempo a tareas
                administrativas (crear propuestas, revisar precios, formatear
                documentos) que a hablar con clientes potenciales, tienes un
                problema de productividad que un CPQ puede resolver de
                inmediato. El tiempo de tu equipo de ventas es tu recurso mas
                valioso: no deberia gastarse en tareas repetitivas.
              </p>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/*  Section 7: Como elegir el mejor CPQ                  */}
        {/* ────────────────────────────────────────────────────── */}
        <section id="como-elegir" className="mb-20 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Como elegir el mejor CPQ para tu PYME
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            El mercado de CPQ ha crecido mucho en los ultimos anos, y elegir la
            solucion correcta puede ser abrumador. Estos son los seis criterios
            mas importantes que debes evaluar antes de tomar una decision.
          </p>

          <div className="space-y-5">
            {CRITERIOS_ELECCION.map((criterio, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-6 flex gap-5"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#3a9bb5]/10 flex items-center justify-center">
                  <criterio.icon className="w-6 h-6 text-[#3a9bb5]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {criterio.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {criterio.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed mt-8">
            Si quieres explorar una solucion CPQ pensada para PYMEs
            hispanohablantes, puedes{" "}
            <Link
              href="/contacto"
              className="text-[#3a9bb5] font-medium hover:underline"
            >
              contactar con nuestro equipo
            </Link>{" "}
            para una demostracion personalizada sin compromiso.
          </p>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/*  Section 8: Preguntas frecuentes                      */}
        {/* ────────────────────────────────────────────────────── */}
        <section id="preguntas-frecuentes" className="mb-20 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Preguntas frecuentes sobre CPQ
          </h2>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <summary className="flex items-center gap-3 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <HelpCircle className="w-5 h-5 text-[#3a9bb5] flex-shrink-0" />
                  <span className="font-semibold text-gray-900 flex-1">
                    {faq.pregunta}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-5 pl-13">
                  <p className="text-sm text-gray-600 leading-relaxed ml-8">
                    {faq.respuesta}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────────────────── */}
        {/*  CTA Final                                            */}
        {/* ────────────────────────────────────────────────────── */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-[#3a9bb5] to-[#2d7d94] rounded-2xl p-8 sm:p-12 text-white text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Prueba DealForge gratis
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              DealForge es un CPQ moderno disenado para PYMEs. Crea
              cotizaciones profesionales en minutos, con calculo automatico de
              precios, firma electronica y seguimiento inteligente. Sin tarjeta
              de credito, sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/registro"
                className="inline-flex items-center gap-2 bg-white text-[#3a9bb5] font-semibold text-sm px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Crear cuenta gratis
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-medium text-sm px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                Solicitar demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
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
            Terminos
          </Link>
          <Link
            href="/blog"
            className="hover:text-gray-600 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contacto"
            className="hover:text-gray-600 transition-colors"
          >
            Contacto
          </Link>
        </div>
      </footer>
    </div>
  );
}
