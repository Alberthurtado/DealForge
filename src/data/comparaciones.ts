export interface Comparacion {
  slug: string;
  competidor: string;
  titulo: string;
  descripcion: string;
  heroSubtitle: string;
  ventajasDealForge: { titulo: string; desc: string }[];
  limitacionesCompetidor: { titulo: string; desc: string }[];
  tablaComparativa: {
    feature: string;
    dealforge: boolean | string;
    competidor: boolean | string;
  }[];
  veredicto: string;
  keywords: string[];
}

export const comparaciones: Comparacion[] = [
  {
    slug: "dealforge-vs-holded",
    competidor: "Holded",
    titulo:
      "DealForge vs Holded — Comparativa CPQ y facturación para PYMEs",
    descripcion:
      "Compara DealForge y Holded: dos enfoques distintos para gestionar cotizaciones y ventas en PYMEs. Descubre cuál se adapta mejor a tu proceso comercial.",
    heroSubtitle:
      "Holded es un ERP español sólido para facturación y contabilidad. DealForge es un CPQ especializado en acelerar tu proceso de cotización con IA. Si tu reto principal es crear cotizaciones profesionales de forma rápida, aquí te explicamos las diferencias.",
    ventajasDealForge: [
      {
        titulo: "CPQ nativo con configurador de productos",
        desc: "DealForge está diseñado desde cero como herramienta CPQ. Puedes configurar productos con variantes, reglas comerciales y descuentos escalonados. Holded gestiona bien productos para facturación, pero no incluye un configurador avanzado para presupuestos complejos.",
      },
      {
        titulo: "Asistente de IA para cotizaciones",
        desc: "DealForge incluye un asistente de inteligencia artificial que sugiere productos, detecta márgenes bajos y autocompleta datos del cliente. Holded no ofrece funcionalidad de IA en su módulo de presupuestos.",
      },
      {
        titulo: "Flujos de aprobación de cotizaciones",
        desc: "Configura reglas de aprobación por monto, descuento o tipo de cliente. Los presupuestos que requieren revisión se enrutan automáticamente al responsable. En Holded, la aprobación de presupuestos es un proceso manual.",
      },
      {
        titulo: "Firma electrónica integrada",
        desc: "Tus clientes pueden firmar cotizaciones directamente desde el enlace que reciben, sin necesidad de herramientas externas. Holded requiere integrar un servicio de firma aparte para cerrar presupuestos.",
      },
      {
        titulo: "Pipeline visual de ventas",
        desc: "Visualiza todas tus oportunidades en un embudo de ventas con etapas personalizables. DealForge te muestra la probabilidad de cierre y el valor del pipeline. Holded ofrece un CRM básico pero sin vista de embudo CPQ.",
      },
    ],
    limitacionesCompetidor: [
      {
        titulo: "No es un CPQ especializado",
        desc: "Holded es un ERP generalista que cubre facturación, contabilidad, proyectos e inventario. Su módulo de presupuestos funciona bien para casos simples, pero no está pensado para configuraciones complejas de productos o reglas de precios.",
      },
      {
        titulo: "Sin asistente de inteligencia artificial",
        desc: "Holded no incluye funcionalidades de IA para ayudar en la creación de cotizaciones ni para analizar el rendimiento del equipo comercial.",
      },
      {
        titulo: "Aprobaciones manuales",
        desc: "El proceso de revisión de presupuestos en Holded depende de la coordinación manual entre los miembros del equipo, lo que puede alargar los tiempos de respuesta al cliente.",
      },
      {
        titulo: "Firma electrónica externa",
        desc: "Para obtener la firma del cliente en un presupuesto de Holded necesitas utilizar un servicio externo, lo que añade pasos al proceso de cierre.",
      },
    ],
    tablaComparativa: [
      { feature: "Cotizaciones CPQ", dealforge: true, competidor: "Básico" },
      {
        feature: "Configurador de productos",
        dealforge: true,
        competidor: false,
      },
      {
        feature: "Reglas comerciales y descuentos",
        dealforge: true,
        competidor: "Limitado",
      },
      { feature: "Asistente de IA", dealforge: true, competidor: false },
      {
        feature: "Flujos de aprobación",
        dealforge: true,
        competidor: false,
      },
      {
        feature: "Firma electrónica integrada",
        dealforge: true,
        competidor: false,
      },
      {
        feature: "Pipeline de ventas visual",
        dealforge: true,
        competidor: "Básico",
      },
      { feature: "Facturación", dealforge: "Próximamente", competidor: true },
      { feature: "Contabilidad", dealforge: false, competidor: true },
      {
        feature: "Gestión de inventario",
        dealforge: false,
        competidor: true,
      },
      { feature: "PDFs profesionales personalizables", dealforge: true, competidor: "Limitado" },
      { feature: "Seguimiento de apertura de cotizaciones", dealforge: true, competidor: false },
    ],
    veredicto:
      "Holded es una excelente opción si necesitas un ERP completo para facturación, contabilidad e inventario. Sin embargo, si tu prioridad es crear cotizaciones profesionales de forma rápida, con configuración avanzada de productos, aprobaciones automáticas y firma electrónica, DealForge es la herramienta más adecuada. Muchas PYMEs utilizan ambas: DealForge para el proceso comercial y Holded para la gestión financiera.",
    keywords: [
      "DealForge vs Holded",
      "comparativa CPQ Holded",
      "alternativa a Holded cotizaciones",
      "Holded presupuestos limitaciones",
      "CPQ para PYMEs España",
      "software cotizaciones vs ERP",
    ],
  },
  {
    slug: "dealforge-vs-hubspot",
    competidor: "HubSpot",
    titulo:
      "DealForge vs HubSpot — Comparativa CPQ para PYMEs y equipos de ventas",
    descripcion:
      "Compara DealForge y HubSpot Sales Hub: precio, funcionalidades CPQ y facilidad de uso. Descubre cuál ofrece mejor relación calidad-precio para tu equipo.",
    heroSubtitle:
      "HubSpot es un CRM de referencia mundial con un módulo de cotizaciones incluido en Sales Hub. DealForge es un CPQ diseñado específicamente para PYMEs que buscan velocidad y simplicidad. Si tu equipo necesita cotizar rápido sin pagar por funcionalidades que no usa, esta comparativa te ayudará a decidir.",
    ventajasDealForge: [
      {
        titulo: "Precio hasta 10 veces menor",
        desc: "El módulo de cotizaciones de HubSpot requiere Sales Hub Professional, que cuesta desde 450 USD/mes (5 usuarios). DealForge ofrece funcionalidades CPQ completas desde una fracción de ese precio, ideal para PYMEs con presupuesto ajustado.",
      },
      {
        titulo: "Configuración en minutos, no en semanas",
        desc: "DealForge está listo para usar en menos de 30 minutos. HubSpot Sales Hub Professional requiere configuración avanzada, formación del equipo y, en muchos casos, consultoría externa para aprovechar sus funcionalidades.",
      },
      {
        titulo: "CPQ nativo con IA",
        desc: "DealForge es un CPQ desde su arquitectura. El asistente de IA te sugiere productos, valida márgenes y acelera la creación de cotizaciones. En HubSpot, las cotizaciones son una extensión del CRM, no el foco del producto.",
      },
      {
        titulo: "Diseñado para PYMEs hispanohablantes",
        desc: "Interfaz, soporte y documentación en español. Formatos de moneda, impuestos y estructuras fiscales adaptados al mercado hispanohablante. HubSpot ofrece localización, pero su ecosistema está orientado al mercado anglosajón.",
      },
      {
        titulo: "Sin complejidad innecesaria",
        desc: "DealForge se centra en lo que necesita un equipo comercial de PYME: cotizar, dar seguimiento y cerrar. No tienes que navegar entre decenas de módulos (marketing, servicio, operaciones) para llegar a lo que realmente usas.",
      },
    ],
    limitacionesCompetidor: [
      {
        titulo: "Precio elevado para PYMEs",
        desc: "El plan gratuito de HubSpot incluye cotizaciones muy básicas. Para acceder a funcionalidades CPQ como aprobaciones, automatización y productos con variantes, necesitas Sales Hub Professional (desde 450 USD/mes) o Enterprise (desde 1 500 USD/mes).",
      },
      {
        titulo: "Curva de aprendizaje pronunciada",
        desc: "HubSpot es una plataforma potente pero extensa. Configurar pipelines, workflows de aprobación y personalización de cotizaciones requiere tiempo y, en muchos casos, un administrador dedicado.",
      },
      {
        titulo: "Cotizaciones como función secundaria",
        desc: "En HubSpot, el módulo de cotizaciones es complementario al CRM. Las funcionalidades CPQ avanzadas (reglas de precios, configurador) no están al nivel de una herramienta especializada.",
      },
      {
        titulo: "Costes ocultos por contactos",
        desc: "HubSpot cobra según el número de contactos de marketing. A medida que crece tu base de datos, el precio se incrementa de forma significativa, algo que las PYMEs a menudo no prevén al contratar.",
      },
    ],
    tablaComparativa: [
      { feature: "Cotizaciones CPQ", dealforge: true, competidor: true },
      { feature: "Asistente de IA para cotizar", dealforge: true, competidor: "Limitado" },
      {
        feature: "Configurador de productos",
        dealforge: true,
        competidor: "Solo planes superiores",
      },
      {
        feature: "Flujos de aprobación",
        dealforge: true,
        competidor: "Solo Professional+",
      },
      {
        feature: "Firma electrónica integrada",
        dealforge: true,
        competidor: "Solo Professional+",
      },
      {
        feature: "Precio desde (mes)",
        dealforge: "Desde 29 EUR",
        competidor: "Desde 450 USD",
      },
      {
        feature: "Configuración inicial",
        dealforge: "30 minutos",
        competidor: "Semanas",
      },
      { feature: "CRM completo", dealforge: "Básico", competidor: true },
      {
        feature: "Automatización de marketing",
        dealforge: false,
        competidor: true,
      },
      {
        feature: "Soporte en español nativo",
        dealforge: true,
        competidor: "Limitado",
      },
      { feature: "PDFs profesionales personalizables", dealforge: true, competidor: true },
      { feature: "Seguimiento de apertura de cotizaciones", dealforge: true, competidor: true },
    ],
    veredicto:
      "HubSpot es una plataforma excelente para empresas que necesitan un CRM integral con marketing, ventas y servicio en un solo ecosistema. Si tu empresa ya usa HubSpot y tiene presupuesto para Sales Hub Professional, su módulo de cotizaciones puede ser suficiente. Sin embargo, si eres una PYME que busca una herramienta CPQ potente, fácil de usar y a un precio accesible, DealForge te permite cotizar profesionalmente desde el primer día sin la complejidad ni el coste de una plataforma enterprise.",
    keywords: [
      "DealForge vs HubSpot",
      "alternativa a HubSpot CPQ",
      "HubSpot Sales Hub precio",
      "CPQ barato para PYMEs",
      "HubSpot cotizaciones limitaciones",
      "comparativa HubSpot CRM cotizaciones",
    ],
  },
  {
    slug: "dealforge-vs-excel",
    competidor: "Excel / Hojas de cálculo",
    titulo:
      "DealForge vs Excel — Por qué un CPQ supera a las hojas de cálculo para cotizar",
    descripcion:
      "Compara DealForge con Excel para crear cotizaciones. Descubre cómo un CPQ elimina errores, ahorra tiempo y profesionaliza tu proceso de ventas.",
    heroSubtitle:
      "Excel es la herramienta más utilizada del mundo para crear cotizaciones, y tiene sentido: es flexible, conocida y gratuita si ya tienes Office. Pero cuando tu equipo crece o el volumen de cotizaciones aumenta, las hojas de cálculo se convierten en un cuello de botella. Aquí comparamos ambos enfoques.",
    ventajasDealForge: [
      {
        titulo: "Cero errores en precios y cálculos",
        desc: "En DealForge, los precios, descuentos e impuestos se calculan automáticamente según las reglas que configures. En Excel, una fórmula rota o una celda sobreescrita puede generar un error que nadie detecta hasta que el cliente lo señala.",
      },
      {
        titulo: "Cotizaciones profesionales en segundos",
        desc: "Selecciona cliente, añade productos y genera un PDF profesional con tu logo y colores corporativos en un clic. En Excel, dar formato a cada cotización consume tiempo y el resultado varía según quién la prepare.",
      },
      {
        titulo: "Seguimiento automático",
        desc: "DealForge te avisa cuando el cliente abre la cotización, cuánto tiempo la revisa y qué secciones mira. Con Excel, envías el archivo por email y no sabes nada hasta que el cliente responde (si es que responde).",
      },
      {
        titulo: "Historial y búsqueda instantánea",
        desc: "Encuentra cualquier cotización por cliente, fecha, monto o estado en segundos. Con Excel, dependes de la organización de carpetas de cada vendedor y de que nadie haya renombrado o movido el archivo.",
      },
      {
        titulo: "Firma electrónica integrada",
        desc: "El cliente firma directamente desde el enlace de la cotización. No necesitas imprimir, escanear ni usar herramientas externas. Con Excel, el proceso de firma requiere varios pasos manuales adicionales.",
      },
      {
        titulo: "Colaboración en equipo sin conflictos",
        desc: "Varios vendedores pueden trabajar simultáneamente sin pisar el trabajo del otro. En Excel, los archivos compartidos generan conflictos de versiones y es difícil saber cuál es la cotización más reciente.",
      },
    ],
    limitacionesCompetidor: [
      {
        titulo: "Propenso a errores humanos",
        desc: "Un estudio de referencia estima que el 88 % de las hojas de cálculo contienen al menos un error. En cotizaciones, un error de precio puede significar perder dinero en cada venta o perder la confianza del cliente.",
      },
      {
        titulo: "Sin seguimiento del cliente",
        desc: "Una vez que envías el archivo Excel por email, pierdes toda visibilidad. No sabes si el cliente lo abrió, si lo reenvió a su jefe o si se perdió en su bandeja de entrada.",
      },
      {
        titulo: "Imagen poco profesional",
        desc: "Una cotización en Excel, por bien formateada que esté, no transmite la misma imagen que un PDF diseñado profesionalmente con tu marca. La primera impresión cuenta en las ventas.",
      },
      {
        titulo: "Sin catálogo de productos centralizado",
        desc: "Cada vendedor mantiene su propia lista de productos y precios. Cuando hay un cambio de tarifas, actualizar todos los archivos es un proceso lento y propenso a omisiones.",
      },
      {
        titulo: "Sin automatización ni reglas de negocio",
        desc: "En Excel no puedes configurar reglas como descuentos máximos por vendedor, productos obligatorios o alertas de margen bajo. Todo depende de la disciplina individual de cada persona.",
      },
    ],
    tablaComparativa: [
      {
        feature: "Creación de cotizaciones",
        dealforge: "Guiada con IA",
        competidor: "Manual",
      },
      {
        feature: "Cálculo automático de precios",
        dealforge: true,
        competidor: "Con fórmulas manuales",
      },
      {
        feature: "Catálogo de productos centralizado",
        dealforge: true,
        competidor: false,
      },
      {
        feature: "PDFs profesionales",
        dealforge: "Automático",
        competidor: "Manual",
      },
      {
        feature: "Seguimiento de apertura",
        dealforge: true,
        competidor: false,
      },
      { feature: "Firma electrónica", dealforge: true, competidor: false },
      {
        feature: "Flujos de aprobación",
        dealforge: true,
        competidor: false,
      },
      {
        feature: "Historial de cotizaciones",
        dealforge: "Automático",
        competidor: "Depende del vendedor",
      },
      {
        feature: "Pipeline de ventas",
        dealforge: true,
        competidor: false,
      },
      {
        feature: "Colaboración en equipo",
        dealforge: true,
        competidor: "Conflictos de versiones",
      },
      {
        feature: "Precio",
        dealforge: "Desde 29 EUR/mes",
        competidor: "Incluido en Office",
      },
      {
        feature: "Curva de aprendizaje",
        dealforge: "30 minutos",
        competidor: "Ya lo conoces",
      },
    ],
    veredicto:
      "Excel es una herramienta extraordinaria para muchas tareas, y es lógico que sea el punto de partida para crear cotizaciones. Sin embargo, cuando el volumen de presupuestos crece, cuando necesitas controlar descuentos y márgenes, o cuando quieres dar una imagen más profesional, un CPQ como DealForge marca la diferencia. La inversión se recupera con las primeras cotizaciones que se cierran más rápido y sin errores. Si hoy cotizas con Excel y funciona para ti, genial. Pero si sientes que pierdes tiempo, cometes errores o no puedes dar seguimiento a tus propuestas, es momento de dar el salto.",
    keywords: [
      "DealForge vs Excel",
      "cotizaciones en Excel problemas",
      "software cotizaciones vs Excel",
      "alternativa a Excel para presupuestos",
      "CPQ vs hojas de cálculo",
      "dejar de cotizar con Excel",
    ],
  },
];
