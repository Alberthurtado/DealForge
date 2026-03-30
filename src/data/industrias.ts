export interface Industria {
  slug: string;
  nombre: string;
  titulo: string;
  descripcion: string;
  emoji: string;
  color: string;
  ejemploLineas: { descripcion: string; cantidad: number; precio: number }[];
  problemas: string[];
  beneficios: string[];
  keywords: string[];
  icp: {
    cargo: string;
    empresaTipo: string;
    dolor: string;
    cita: string;
  };
  casoDeUso: {
    antes: string;
    despues: string;
    resultado: string;
  };
  faqs: { pregunta: string; respuesta: string }[];
  featuresEspecificos: { icono: string; titulo: string; desc: string }[];
  stats: { valor: string; label: string }[];
  /** Unique long-form guide content (HTML) for SEO differentiation */
  guia?: string;
  /** How-to steps for HowTo schema markup */
  howToSteps?: string[];
}

export const industrias: Industria[] = [
  {
    slug: "construccion",
    nombre: "Construcción",
    titulo: "Plantilla de Cotización para Construcción y Reformas",
    descripcion: "Crea cotizaciones profesionales para obras, reformas y proyectos de construcción. Incluye partidas, materiales, mano de obra y plazos.",
    emoji: "🏗️",
    color: "#E67E22",
    ejemploLineas: [
      { descripcion: "Demolición y desescombro", cantidad: 1, precio: 2500 },
      { descripcion: "Albañilería y tabiquería", cantidad: 1, precio: 4800 },
      { descripcion: "Instalación eléctrica completa", cantidad: 1, precio: 3200 },
      { descripcion: "Fontanería y saneamiento", cantidad: 1, precio: 2800 },
      { descripcion: "Pintura y acabados", cantidad: 1, precio: 1500 },
    ],
    problemas: [
      "Presupuestos en papel o Excel que se pierden",
      "Errores de cálculo en partidas y materiales",
      "Falta de seguimiento después de enviar el presupuesto",
      "Imagen poco profesional frente a competidores",
    ],
    beneficios: [
      "Plantillas con partidas predefinidas para obra",
      "Cálculo automático de materiales + mano de obra + IVA",
      "PDF profesional con tu logo y colores",
      "Seguimiento automático y firma electrónica",
    ],
    keywords: ["cotización construcción", "presupuesto obra", "presupuesto reforma", "plantilla presupuesto construcción", "cotización reforma"],
    icp: {
      cargo: "Jefe de obra",
      empresaTipo: "Constructora de 5-50 empleados",
      dolor: "Pierde horas cada semana preparando presupuestos en Excel que luego tienen errores de cálculo en las partidas.",
      cita: "Necesito mandar el presupuesto hoy mismo porque si tardo, el cliente llama a otra constructora.",
    },
    casoDeUso: {
      antes: "Preparaba cada presupuesto en Excel copiando de anteriores, recalculando materiales a mano y enviando un PDF genérico sin imagen de marca.",
      despues: "Usa plantillas con partidas predefinidas de obra, rellena cantidades y el sistema calcula automáticamente materiales, mano de obra e IVA.",
      resultado: "Presupuestos enviados el mismo día de la visita a obra, con menos errores de cálculo y una imagen profesional que genera confianza en el cliente.",
    },
    faqs: [
      {
        pregunta: "¿Puedo separar partidas de materiales y mano de obra en el presupuesto?",
        respuesta: "Sí, puedes crear líneas independientes para materiales y mano de obra dentro de cada partida, o agruparlas. El cliente verá el desglose que tú decidas mostrar.",
      },
      {
        pregunta: "¿Cómo gestiono los cambios de obra que surgen durante la ejecución?",
        respuesta: "Puedes duplicar la cotización original y crear una versión actualizada con las nuevas partidas. El cliente recibe el documento actualizado y puede aprobar los cambios con firma electrónica.",
      },
      {
        pregunta: "¿Puedo incluir plazos de ejecución por partida?",
        respuesta: "Sí, cada línea del presupuesto permite añadir notas donde puedes indicar plazos estimados, condiciones o especificaciones técnicas de la partida.",
      },
    ],
    featuresEspecificos: [
      { icono: "Layers", titulo: "Partidas organizadas", desc: "Agrupa por categorías: demolición, albañilería, instalaciones, acabados." },
      { icono: "Calculator", titulo: "Cálculo de materiales", desc: "Calcula automáticamente el coste total con materiales y mano de obra." },
      { icono: "FileText", titulo: "Condiciones de obra", desc: "Incluye plazos, garantías y condiciones específicas de construcción." },
      { icono: "Clock", titulo: "Presupuesto en obra", desc: "Crea y envía presupuestos desde el móvil directamente en la visita." },
    ],
    stats: [
      { valor: "15 min", label: "por presupuesto de obra" },
      { valor: "100%", label: "desglose profesional" },
      { valor: "24h", label: "respuesta al cliente" },
    ],
    guia: `<p>Elaborar un presupuesto de construcción exige desglosar cada partida con precisión: demoliciones, cimentaciones, estructura, albañilería, instalaciones y acabados deben figurar por separado para que el cliente comprenda a dónde va cada euro. Un error habitual es entregar un precio cerrado sin detallar materiales, mano de obra y maquinaria, lo que genera desconfianza y dificulta la comparación con otros contratistas.</p>
<p>En el sector de reformas y obra nueva, los sobrecostes surgen cuando el alcance inicial no queda documentado. Por eso conviene especificar unidades de medición (m², m³, unidades, partidas alzadas), precios unitarios y condiciones de revisión ante imprevistos como cambios de proyecto o hallazgos ocultos en la demolición. Incluir plazos de ejecución por capítulo y un calendario de pagos vinculado a hitos de obra transmite seriedad y protege a ambas partes.</p>
<p>Con DealForge puedes crear presupuestos de obra en minutos, organizados por capítulos, con cálculo automático de totales e IVA, y enviarlos como PDF profesional con tu marca. El cliente firma electrónicamente y tú recibes notificación instantánea para arrancar la obra sin demoras administrativas.</p>`,
    howToSteps: [
      "Selecciona la plantilla de Construcción y completa los datos del cliente y la dirección de la obra.",
      "Añade las partidas organizadas por capítulos: demolición, estructura, instalaciones, acabados, etc.",
      "Indica cantidades, unidades de medida y precios unitarios para que el sistema calcule los totales automáticamente.",
      "Incluye condiciones de pago, plazos de ejecución y garantías en las notas del presupuesto.",
      "Envía el presupuesto al cliente por enlace o PDF y recibe su aprobación con firma electrónica.",
    ],
  },
  {
    slug: "consultoria",
    nombre: "Consultoría",
    titulo: "Plantilla de Cotización para Consultoría y Servicios Profesionales",
    descripcion: "Genera propuestas de consultoría claras y profesionales. Define alcance, fases, entregables y honorarios de forma estructurada.",
    emoji: "💼",
    color: "#2C3E50",
    ejemploLineas: [
      { descripcion: "Diagnóstico inicial (2 sesiones)", cantidad: 2, precio: 450 },
      { descripcion: "Análisis de procesos AS-IS", cantidad: 1, precio: 1200 },
      { descripcion: "Diseño de procesos TO-BE", cantidad: 1, precio: 1800 },
      { descripcion: "Plan de implementación", cantidad: 1, precio: 900 },
      { descripcion: "Seguimiento mensual (3 meses)", cantidad: 3, precio: 500 },
    ],
    problemas: [
      "Propuestas genéricas que no transmiten valor",
      "Dificultad para definir alcance y entregables",
      "Clientes que no responden después del envío",
      "Tiempo excesivo preparando cada propuesta",
    ],
    beneficios: [
      "Propuestas con fases y entregables claros",
      "Honorarios desglosados por servicio",
      "Firma electrónica para aceptación inmediata",
      "IA que sugiere estructura según el proyecto",
    ],
    keywords: ["cotización consultoría", "propuesta consultoría", "presupuesto servicios profesionales", "plantilla propuesta consultoría"],
    icp: {
      cargo: "Director de consultoría",
      empresaTipo: "Consultora boutique de 3-20 profesionales",
      dolor: "Invierte demasiado tiempo escribiendo propuestas desde cero para cada proyecto, y muchas quedan sin respuesta.",
      cita: "Cada propuesta me lleva medio día de trabajo y luego el cliente desaparece sin dar feedback.",
    },
    casoDeUso: {
      antes: "Redactaba cada propuesta en Word desde cero, copiando secciones de propuestas anteriores y adaptando honorarios manualmente.",
      despues: "Selecciona plantilla de consultoría, define fases y entregables con campos estructurados, y envía con seguimiento automático.",
      resultado: "Propuestas enviadas en una fracción del tiempo, con seguimiento que permite saber cuándo el cliente abre el documento y reactivar la conversación.",
    },
    faqs: [
      {
        pregunta: "¿Puedo estructurar la propuesta por fases con entregables específicos?",
        respuesta: "Sí, puedes crear secciones por fase del proyecto, cada una con sus propios entregables, plazos y honorarios. El cliente ve claramente qué recibe en cada etapa.",
      },
      {
        pregunta: "¿Cómo presento opciones de alcance diferente al cliente?",
        respuesta: "Puedes crear varias versiones de la propuesta con diferentes niveles de servicio, o incluir líneas opcionales que el cliente puede aceptar o rechazar.",
      },
      {
        pregunta: "¿Se puede incluir un resumen ejecutivo antes del desglose de honorarios?",
        respuesta: "Sí, puedes personalizar las notas y secciones del documento para incluir contexto del proyecto, objetivos y metodología antes del desglose económico.",
      },
    ],
    featuresEspecificos: [
      { icono: "Target", titulo: "Alcance definido", desc: "Define claramente qué incluye y qué no incluye cada proyecto." },
      { icono: "Users", titulo: "Equipo asignado", desc: "Detalla los perfiles profesionales y las horas de cada uno." },
      { icono: "BarChart", titulo: "Seguimiento de propuestas", desc: "Sabe cuándo el cliente abre la propuesta y cuánto tiempo la revisa." },
      { icono: "Briefcase", titulo: "Librería de servicios", desc: "Reutiliza servicios y tarifas entre propuestas sin empezar de cero." },
    ],
    stats: [
      { valor: "10 min", label: "por propuesta profesional" },
      { valor: "Fases", label: "con entregables claros" },
      { valor: "Firma", label: "electrónica incluida" },
    ],
    guia: `<p>Una propuesta de consultoría efectiva va mucho más allá de listar honorarios: debe comunicar metodología, definir entregables tangibles y establecer un marco temporal que genere confianza. El error más frecuente en el sector es presentar documentos genéricos que no conectan el diagnóstico del problema con la solución propuesta, lo que dificulta que el cliente perciba el retorno de la inversión.</p>
<p>Estructurar la cotización por fases —descubrimiento, análisis, diseño de solución, implementación y seguimiento— permite al cliente visualizar el proceso y entender por qué cada etapa tiene un coste asociado. Detallar los perfiles del equipo asignado, las horas estimadas y los entregables concretos de cada fase elimina la ambigüedad que suele retrasar la aprobación de proyectos de consultoría.</p>
<p>DealForge te permite montar propuestas de consultoría con secciones modulares, reutilizar bloques de servicios entre proyectos y activar el seguimiento automático para saber exactamente cuándo el decisor revisa tu propuesta. Así puedes hacer follow-up en el momento justo y cerrar más proyectos sin perseguir clientes.</p>`,
    howToSteps: [
      "Elige la plantilla de Consultoría e introduce los datos del cliente y el contexto del proyecto.",
      "Define las fases del proyecto (diagnóstico, análisis, implementación, seguimiento) con sus entregables.",
      "Asigna honorarios por fase o por hora, indicando los perfiles profesionales involucrados.",
      "Personaliza las condiciones de pago, confidencialidad y alcance en las notas del documento.",
      "Envía la propuesta con seguimiento activo y firma electrónica para aceptación inmediata.",
    ],
  },
  {
    slug: "marketing-digital",
    nombre: "Marketing Digital",
    titulo: "Plantilla de Cotización para Agencias de Marketing Digital",
    descripcion: "Cotiza servicios de marketing digital: SEO, SEM, redes sociales, diseño web y campañas publicitarias con desglose claro de servicios.",
    emoji: "📱",
    color: "#E91E63",
    ejemploLineas: [
      { descripcion: "Gestión de redes sociales (mensual)", cantidad: 1, precio: 800 },
      { descripcion: "Campaña Google Ads (setup + gestión)", cantidad: 1, precio: 600 },
      { descripcion: "SEO on-page + contenidos (mensual)", cantidad: 1, precio: 950 },
      { descripcion: "Diseño de landing page", cantidad: 2, precio: 450 },
      { descripcion: "Email marketing (setup + 4 envíos)", cantidad: 1, precio: 400 },
    ],
    problemas: [
      "Clientes que no entienden qué incluye cada servicio",
      "Comparaciones de precio sin contexto de valor",
      "Propuestas que tardan días en preparar",
      "Sin seguimiento después del envío",
    ],
    beneficios: [
      "Servicios desglosados con descripción clara",
      "Packs mensuales vs. proyectos puntuales",
      "Envío directo con firma electrónica",
      "Plantillas reutilizables por tipo de servicio",
    ],
    keywords: ["cotización marketing digital", "presupuesto agencia marketing", "propuesta SEO", "cotización redes sociales", "presupuesto diseño web"],
    icp: {
      cargo: "Director de cuentas",
      empresaTipo: "Agencia de marketing digital de 3-15 personas",
      dolor: "Prepara propuestas diferentes para cada cliente y pierde tiempo explicando qué incluye cada servicio.",
      cita: "El cliente nos compara con otra agencia que cobra la mitad, pero no sabe que nosotros incluimos el triple de servicios.",
    },
    casoDeUso: {
      antes: "Creaba propuestas en Google Slides con capturas de pantalla, métricas genéricas y descripciones largas que nadie leía.",
      despues: "Genera propuestas con packs de servicios predefinidos, descripción clara de cada uno y precios desglosados que el cliente entiende.",
      resultado: "Propuestas que el cliente entiende a la primera, con menos rondas de preguntas y aceptación más rápida al ver claramente el valor.",
    },
    faqs: [
      {
        pregunta: "¿Puedo crear packs de servicios mensuales recurrentes?",
        respuesta: "Sí, puedes definir servicios con periodicidad mensual y el sistema calcula el total anual. Ideal para packs de gestión de redes, SEO o mantenimiento web.",
      },
      {
        pregunta: "¿Cómo cotizo servicios de publicidad donde el presupuesto de ads es variable?",
        respuesta: "Puedes separar los honorarios de gestión (tu fee) del presupuesto publicitario del cliente, dejando claro qué es inversión en medios y qué es tu servicio.",
      },
      {
        pregunta: "¿Puedo mostrar opciones de packs diferentes en la misma propuesta?",
        respuesta: "Sí, puedes crear líneas opcionales o versiones del presupuesto con packs básico, profesional y premium para que el cliente elija.",
      },
    ],
    featuresEspecificos: [
      { icono: "Package", titulo: "Packs de servicios", desc: "Crea packs mensuales predefinidos combinando SEO, redes y ads." },
      { icono: "BarChart", titulo: "Separar fee vs. inversión", desc: "Distingue claramente honorarios de gestión del presupuesto publicitario." },
      { icono: "Mail", titulo: "Envío con seguimiento", desc: "Sabe cuándo el cliente abre la propuesta para hacer follow-up." },
      { icono: "Layers", titulo: "Servicios modulares", desc: "El cliente puede aceptar o rechazar servicios individuales." },
    ],
    stats: [
      { valor: "5 min", label: "por propuesta de agencia" },
      { valor: "Packs", label: "mensuales reutilizables" },
      { valor: "PDF", label: "profesional con tu marca" },
    ],
    guia: `<p>Cotizar servicios de marketing digital presenta un reto particular: el cliente necesita entender qué incluye cada servicio —SEO, SEM, gestión de redes sociales, email marketing— sin perderse en tecnicismos. La clave está en separar claramente los honorarios de gestión del presupuesto destinado a inversión publicitaria, evitando la confusión habitual entre lo que cobra la agencia y lo que se invierte en plataformas como Google Ads o Meta Ads.</p>
<p>Las agencias que estructuran sus propuestas en packs mensuales recurrentes —básico, profesional y premium— consiguen que el cliente compare opciones de valor en lugar de regatear precios. Cada pack debe detallar los entregables mensuales: número de publicaciones, informes de rendimiento, campañas activas y horas de dedicación. Esto transforma una negociación de precio en una conversación sobre alcance y resultados esperados.</p>
<p>Con DealForge puedes crear propuestas modulares donde el cliente activa o desactiva servicios individuales, ver en tiempo real cuándo abre tu propuesta y cerrar la venta con firma electrónica sin intercambiar decenas de emails. Ideal para agencias que gestionan múltiples cuentas y necesitan enviar cotizaciones de forma ágil.</p>`,
    howToSteps: [
      "Selecciona la plantilla de Marketing Digital y rellena los datos de la empresa cliente.",
      "Configura los packs de servicios mensuales o añade servicios individuales según las necesidades del cliente.",
      "Separa los honorarios de gestión del presupuesto publicitario para total transparencia.",
      "Añade condiciones de permanencia, métricas de seguimiento y periodicidad de informes.",
      "Envía la propuesta al cliente con opciones seleccionables y recoge su firma electrónica.",
    ],
  },
  {
    slug: "diseno-grafico",
    nombre: "Diseño Gráfico",
    titulo: "Plantilla de Cotización para Diseño Gráfico y Branding",
    descripcion: "Presupuesta proyectos de diseño gráfico, identidad corporativa, packaging y material impreso de forma profesional.",
    emoji: "🎨",
    color: "#9C27B0",
    ejemploLineas: [
      { descripcion: "Diseño de logotipo (3 propuestas)", cantidad: 1, precio: 800 },
      { descripcion: "Manual de identidad corporativa", cantidad: 1, precio: 1200 },
      { descripcion: "Diseño de tarjetas de visita", cantidad: 1, precio: 150 },
      { descripcion: "Papelería corporativa completa", cantidad: 1, precio: 450 },
      { descripcion: "Adaptaciones para redes sociales", cantidad: 1, precio: 300 },
    ],
    problemas: [
      "Clientes que no valoran el trabajo creativo",
      "Presupuestos que no detallan revisiones incluidas",
      "Falta de profesionalidad en la presentación",
      "Cambios de alcance sin actualizar el precio",
    ],
    beneficios: [
      "Desglose claro de entregables y revisiones",
      "PDF con vista previa de tu estilo de diseño",
      "Condiciones de pago y plazos definidos",
      "Versionado para cambios de alcance",
    ],
    keywords: ["cotización diseño gráfico", "presupuesto branding", "presupuesto logotipo", "cotización identidad corporativa"],
    icp: {
      cargo: "Diseñador freelance o director creativo",
      empresaTipo: "Estudio de diseño de 1-10 creativos",
      dolor: "Los clientes no valoran el trabajo creativo porque el presupuesto no refleja el proceso ni los entregables.",
      cita: "Me piden rebajas porque no ven la diferencia entre mi trabajo y un logo de 20 euros de internet.",
    },
    casoDeUso: {
      antes: "Enviaba un email con el precio final sin desglosar fases, revisiones ni entregables, y el cliente solo veía un número.",
      despues: "Presenta presupuestos con fases del proceso creativo, número de revisiones incluidas y lista detallada de entregables finales.",
      resultado: "Los clientes entienden el valor del proceso creativo, hay menos discusiones sobre revisiones extra y el trabajo se percibe como profesional.",
    },
    faqs: [
      {
        pregunta: "¿Puedo especificar el número de revisiones incluidas en el presupuesto?",
        respuesta: "Sí, puedes detallar en cada línea cuántas rondas de revisiones incluye el precio. Las revisiones adicionales se pueden cotizar como línea aparte.",
      },
      {
        pregunta: "¿Cómo cobro revisiones extra o cambios fuera del alcance?",
        respuesta: "Puedes duplicar la cotización y añadir las nuevas líneas de trabajo. El cliente aprueba el cambio con firma electrónica antes de que lo ejecutes.",
      },
      {
        pregunta: "¿Puedo adjuntar mi portfolio o ejemplos de trabajos anteriores?",
        respuesta: "El PDF que genera la cotización lleva tu logo y colores de marca. Puedes añadir notas con enlaces a tu portfolio o incluir referencias en la descripción.",
      },
    ],
    featuresEspecificos: [
      { icono: "PenTool", titulo: "Fases creativas", desc: "Estructura el presupuesto por briefing, conceptualización, diseño y entrega." },
      { icono: "Layers", titulo: "Revisiones controladas", desc: "Define cuántas rondas de revisiones incluye cada entregable." },
      { icono: "FileText", titulo: "Derechos de uso", desc: "Incluye condiciones de cesión de derechos y propiedad intelectual." },
      { icono: "Star", titulo: "Entregables detallados", desc: "Lista formatos, resoluciones y archivos que recibirá el cliente." },
    ],
    stats: [
      { valor: "8 min", label: "por presupuesto creativo" },
      { valor: "Revisiones", label: "claramente definidas" },
      { valor: "PDF", label: "con tu identidad de marca" },
    ],
    guia: `<p>El presupuesto de un proyecto de diseño gráfico debe reflejar el valor del proceso creativo, no solo el entregable final. Muchos diseñadores cometen el error de enviar un precio global sin detallar las fases de trabajo: briefing, investigación, conceptualización, desarrollo de propuestas, rondas de revisión y entrega de archivos finales. Sin ese desglose, el cliente percibe el diseño como un commodity y negocia exclusivamente por precio.</p>
<p>Especificar el número de propuestas iniciales, las rondas de correcciones incluidas y el coste de revisiones adicionales protege al diseñador del temido "scope creep". Igualmente importante es definir los formatos de entrega (AI, PSD, PNG, SVG), las condiciones de cesión de derechos de uso y si el precio incluye adaptaciones a distintos soportes o tamaños.</p>
<p>DealForge permite a estudios de diseño y freelances crear presupuestos que educan al cliente sobre el proceso creativo, con líneas claras por cada fase y entregable. El documento PDF lleva tu identidad visual, reforzando la coherencia de marca desde el primer contacto comercial. Además, el versionado facilita gestionar cambios de alcance sin perder el historial de lo aprobado.</p>`,
    howToSteps: [
      "Abre la plantilla de Diseño Gráfico e introduce los datos del cliente y el tipo de proyecto.",
      "Desglosa el presupuesto por fases creativas: briefing, conceptualización, diseño y entrega final.",
      "Especifica el número de propuestas iniciales, rondas de revisión incluidas y formatos de entrega.",
      "Añade condiciones sobre derechos de uso, propiedad intelectual y revisiones extra.",
      "Genera el PDF con tu marca y envíalo para aprobación con firma electrónica.",
    ],
  },
  {
    slug: "desarrollo-web",
    nombre: "Desarrollo Web",
    titulo: "Plantilla de Cotización para Desarrollo Web y Apps",
    descripcion: "Cotiza proyectos de desarrollo web, e-commerce, aplicaciones móviles y software a medida con fases y entregables claros.",
    emoji: "💻",
    color: "#00BCD4",
    ejemploLineas: [
      { descripcion: "Diseño UX/UI (wireframes + mockups)", cantidad: 1, precio: 2000 },
      { descripcion: "Desarrollo frontend (React/Next.js)", cantidad: 1, precio: 4500 },
      { descripcion: "Desarrollo backend + API", cantidad: 1, precio: 3500 },
      { descripcion: "Testing y QA", cantidad: 1, precio: 800 },
      { descripcion: "Despliegue y configuración servidor", cantidad: 1, precio: 500 },
    ],
    problemas: [
      "Presupuestos vagos que generan conflictos",
      "Alcance que crece sin control (scope creep)",
      "Clientes que comparan con freelancers baratos",
      "Falta de estructura en fases y entregables",
    ],
    beneficios: [
      "Fases de proyecto con milestones claros",
      "Desglose técnico comprensible para el cliente",
      "Condiciones de cambios de alcance definidas",
      "Firma electrónica para inicio inmediato",
    ],
    keywords: ["cotización desarrollo web", "presupuesto página web", "cotización app móvil", "presupuesto e-commerce", "propuesta desarrollo software"],
    icp: {
      cargo: "CTO o responsable técnico",
      empresaTipo: "Estudio de desarrollo web de 2-20 desarrolladores",
      dolor: "Los cambios de alcance constantes hacen que los proyectos terminen costando más de lo presupuestado.",
      cita: "Empezamos con una web sencilla y acabamos desarrollando una plataforma completa por el mismo precio.",
    },
    casoDeUso: {
      antes: "Enviaba un PDF con un precio global y una lista de funcionalidades, sin separar fases ni definir qué pasa con los cambios.",
      despues: "Estructura el proyecto en fases con milestones, define el alcance exacto y las condiciones para gestionar cambios.",
      resultado: "Los clientes aceptan más rápido al entender las fases, hay menos conflictos por scope creep y los cambios se gestionan con versiones actualizadas.",
    },
    faqs: [
      {
        pregunta: "¿Puedo estructurar el presupuesto por sprints o fases de desarrollo?",
        respuesta: "Sí, puedes crear secciones para cada fase (diseño, frontend, backend, testing, despliegue) con sus propios entregables y costes.",
      },
      {
        pregunta: "¿Cómo gestiono el scope creep cuando el cliente pide funcionalidades nuevas?",
        respuesta: "Duplicas la cotización, añades las nuevas funcionalidades como líneas adicionales y envías la versión actualizada para aprobación con firma electrónica.",
      },
      {
        pregunta: "¿Puedo incluir mantenimiento mensual post-lanzamiento en la propuesta?",
        respuesta: "Sí, puedes añadir líneas recurrentes para mantenimiento, hosting y soporte técnico con periodicidad mensual o anual.",
      },
    ],
    featuresEspecificos: [
      { icono: "Layers", titulo: "Fases y milestones", desc: "Organiza el proyecto en sprints o fases con entregables medibles." },
      { icono: "Shield", titulo: "Control de alcance", desc: "Define claramente qué incluye cada fase para evitar scope creep." },
      { icono: "Settings", titulo: "Stack técnico", desc: "Detalla tecnologías, frameworks y herramientas utilizadas." },
      { icono: "Zap", titulo: "Inicio inmediato", desc: "Firma electrónica para arrancar el proyecto sin demoras." },
    ],
    stats: [
      { valor: "12 min", label: "por propuesta técnica" },
      { valor: "Fases", label: "con milestones claros" },
      { valor: "Alcance", label: "controlado y definido" },
    ],
    guia: `<p>Presupuestar un proyecto de desarrollo web requiere traducir la complejidad técnica en un documento que el cliente —generalmente no técnico— pueda evaluar con confianza. La cotización debe estructurarse por fases: diseño UX/UI, desarrollo frontend, desarrollo backend, integraciones, testing y despliegue. Cada fase necesita hitos de entrega claros que permitan validar avances antes de continuar.</p>
<p>Un punto crítico es definir qué tecnologías se utilizarán, cuántas revisiones de diseño se incluyen, el número de plantillas o pantallas, y si el hosting, dominio o mantenimiento posterior forman parte del presupuesto. Los cambios de requisitos durante el desarrollo son inevitables, por lo que conviene establecer un mecanismo de gestión de cambios con tarifas por hora adicional claramente indicadas.</p>
<p>DealForge te ayuda a generar propuestas de desarrollo web con bloques reutilizables para cada tipo de proyecto —web corporativa, e-commerce, app móvil, SaaS— calculando automáticamente los totales. El cliente puede aprobar la propuesta con firma electrónica, y tú mantienes un registro claro del alcance acordado para evitar disputas sobre funcionalidades no contempladas.</p>`,
    howToSteps: [
      "Elige la plantilla de Desarrollo Web e identifica el tipo de proyecto: web, app o e-commerce.",
      "Estructura el presupuesto por fases técnicas: UX/UI, frontend, backend, testing y despliegue.",
      "Detalla las tecnologías, número de pantallas, integraciones y revisiones incluidas en cada fase.",
      "Establece hitos de entrega, condiciones de cambio de alcance y plazos estimados.",
      "Envía la propuesta técnica al cliente y obtén su aprobación con firma electrónica.",
    ],
  },
  {
    slug: "fotografia",
    nombre: "Fotografía",
    titulo: "Plantilla de Cotización para Fotógrafos y Videógrafos",
    descripcion: "Crea presupuestos profesionales para sesiones fotográficas, bodas, eventos corporativos y producción audiovisual.",
    emoji: "📸",
    color: "#FF5722",
    ejemploLineas: [
      { descripcion: "Sesión fotográfica (4 horas)", cantidad: 1, precio: 600 },
      { descripcion: "Edición y retoque (50 fotos)", cantidad: 50, precio: 8 },
      { descripcion: "Galería online privada", cantidad: 1, precio: 50 },
      { descripcion: "Álbum digital premium", cantidad: 1, precio: 200 },
      { descripcion: "Desplazamiento", cantidad: 1, precio: 80 },
    ],
    problemas: [
      "Clientes que regatean sin entender el valor",
      "Presupuestos informales por WhatsApp",
      "Sin contrato ni condiciones claras",
      "Cobros parciales sin seguimiento",
    ],
    beneficios: [
      "Packs fotográficos con servicios detallados",
      "Condiciones de cancelación y derechos incluidos",
      "Aceptación formal con firma electrónica",
      "Imagen profesional que justifica el precio",
    ],
    keywords: ["cotización fotógrafo", "presupuesto sesión fotográfica", "cotización boda fotógrafo", "presupuesto producción audiovisual"],
    icp: {
      cargo: "Fotógrafo profesional",
      empresaTipo: "Fotógrafo freelance o estudio de 1-5 personas",
      dolor: "Envía presupuestos por WhatsApp sin formalidad y luego surgen malentendidos sobre lo que incluía el precio.",
      cita: "Me pasé al Pack Premium pero el cliente dice que le prometí las fotos extra gratis por WhatsApp.",
    },
    casoDeUso: {
      antes: "Respondía por WhatsApp con un precio y una lista de lo incluido, sin documento formal ni condiciones de cancelación.",
      despues: "Envía un presupuesto profesional con packs, derechos de imagen, condiciones de cancelación y aceptación con firma.",
      resultado: "Menos malentendidos con los clientes, las condiciones quedan claras desde el principio y la imagen profesional justifica mejor los precios.",
    },
    faqs: [
      {
        pregunta: "¿Puedo crear diferentes packs fotográficos para que el cliente elija?",
        respuesta: "Sí, puedes crear líneas opcionales o varias versiones del presupuesto con packs básico, estándar y premium con diferentes horas y entregables.",
      },
      {
        pregunta: "¿Cómo incluyo condiciones sobre derechos de imagen y uso de las fotos?",
        respuesta: "Puedes añadir notas legales y condiciones al documento con la cesión de derechos, uso comercial permitido y cualquier restricción.",
      },
      {
        pregunta: "¿Puedo cobrar un anticipo y el resto a la entrega?",
        respuesta: "Sí, puedes definir condiciones de pago parciales en el presupuesto: por ejemplo, 50% a la aceptación y 50% a la entrega de las fotos editadas.",
      },
    ],
    featuresEspecificos: [
      { icono: "Camera", titulo: "Packs fotográficos", desc: "Define packs con horas, fotos entregadas, edición y extras." },
      { icono: "FileText", titulo: "Derechos de imagen", desc: "Incluye condiciones de cesión de derechos y uso comercial." },
      { icono: "Clock", titulo: "Horas y extras", desc: "Detalla las horas incluidas y el coste de horas adicionales." },
      { icono: "Star", titulo: "Imagen premium", desc: "PDF profesional que refuerza tu marca como fotógrafo." },
    ],
    stats: [
      { valor: "5 min", label: "por presupuesto fotográfico" },
      { valor: "Packs", label: "personalizados por servicio" },
      { valor: "Firma", label: "digital de aceptación" },
    ],
    guia: `<p>Cotizar servicios fotográficos implica mucho más que poner precio a una sesión de fotos. El presupuesto debe especificar la duración de la sesión, el número de fotografías editadas que se entregarán, el nivel de retoque (básico, medio o artístico), los derechos de uso de las imágenes y si incluye desplazamiento al lugar del evento o reportaje. Sin esta información, el cliente compara únicamente por precio y no por el valor real del servicio.</p>
<p>Para bodas, eventos corporativos o sesiones de producto, es fundamental definir si el fotógrafo trabaja solo o con asistente, si se incluyen álbumes impresos, archivos en alta resolución o licencias para uso comercial. Los packs fotográficos —por ejemplo, sesión básica, reportaje completo y cobertura premium— ayudan al cliente a elegir según sus necesidades y presupuesto sin sentirse presionado.</p>
<p>DealForge permite crear presupuestos fotográficos con packs predefinidos, detallando entregables, plazos de edición y condiciones de cancelación. El cliente puede aceptar el presupuesto con firma electrónica desde su móvil, confirmando la reserva de fecha al instante sin necesidad de intercambiar correos.</p>`,
    howToSteps: [
      "Selecciona la plantilla de Fotografía e introduce los datos del cliente y el tipo de sesión.",
      "Configura un pack fotográfico indicando horas de sesión, fotos entregadas y nivel de edición.",
      "Especifica los derechos de uso de las imágenes y si incluye desplazamiento o asistente.",
      "Añade condiciones de reserva, cancelación y plazos de entrega de las fotografías editadas.",
      "Envía el presupuesto y recibe la confirmación del cliente con firma electrónica.",
    ],
  },
  {
    slug: "arquitectura",
    nombre: "Arquitectura",
    titulo: "Plantilla de Cotización para Estudios de Arquitectura",
    descripcion: "Presupuesta proyectos de arquitectura: anteproyectos, proyectos ejecutivos, dirección de obra y licencias.",
    emoji: "📐",
    color: "#607D8B",
    ejemploLineas: [
      { descripcion: "Estudio de viabilidad", cantidad: 1, precio: 1500 },
      { descripcion: "Anteproyecto y diseño conceptual", cantidad: 1, precio: 3000 },
      { descripcion: "Proyecto básico", cantidad: 1, precio: 5000 },
      { descripcion: "Proyecto ejecutivo", cantidad: 1, precio: 7000 },
      { descripcion: "Dirección de obra (6 meses)", cantidad: 6, precio: 1200 },
    ],
    problemas: [
      "Honorarios difíciles de justificar sin desglose",
      "Fases del proyecto poco claras para el cliente",
      "Documentación dispersa en múltiples formatos",
      "Retrasos en aprobaciones y firmas",
    ],
    beneficios: [
      "Fases de proyecto según normativa (LOE)",
      "Honorarios desglosados por fase",
      "Firma electrónica para agilizar aprobaciones",
      "Versionado cuando cambia el alcance",
    ],
    keywords: ["cotización arquitecto", "presupuesto proyecto arquitectura", "honorarios arquitecto", "cotización estudio arquitectura"],
    icp: {
      cargo: "Arquitecto titular del estudio",
      empresaTipo: "Estudio de arquitectura de 2-15 profesionales",
      dolor: "Los clientes no entienden por qué los honorarios son los que son al no ver el desglose de fases y trabajo implicado.",
      cita: "El cliente me dice que otro arquitecto le cobra menos, pero no sabe que ese precio no incluye dirección de obra.",
    },
    casoDeUso: {
      antes: "Enviaba un documento Word con honorarios globales y una descripción genérica de las fases del proyecto.",
      despues: "Presenta honorarios desglosados por cada fase (viabilidad, anteproyecto, básico, ejecutivo, dirección) con entregables específicos.",
      resultado: "Los clientes entienden el valor de cada fase, las comparaciones con otros estudios son más justas y las aprobaciones se agilizan con firma electrónica.",
    },
    faqs: [
      {
        pregunta: "¿Puedo estructurar los honorarios según las fases de la LOE?",
        respuesta: "Sí, puedes crear secciones para cada fase del proyecto según la Ley de Ordenación de la Edificación: estudio previo, anteproyecto, básico, ejecutivo y dirección.",
      },
      {
        pregunta: "¿Cómo presento la dirección de obra como servicio mensual?",
        respuesta: "Puedes añadir la dirección de obra como línea con cantidad igual a los meses estimados y precio mensual, para que el cliente vea el coste total.",
      },
      {
        pregunta: "¿Se pueden incluir tasas y licencias como conceptos separados?",
        respuesta: "Sí, puedes añadir líneas para tasas municipales, visados colegiales y otros gastos que no son honorarios pero sí forman parte del coste total del proyecto.",
      },
    ],
    featuresEspecificos: [
      { icono: "Home", titulo: "Fases normativas", desc: "Estructura según LOE: viabilidad, anteproyecto, básico, ejecutivo." },
      { icono: "FileText", titulo: "Honorarios claros", desc: "Desglose detallado que justifica el valor de cada fase." },
      { icono: "Clock", titulo: "Plazos por fase", desc: "Indica duración estimada de cada etapa del proyecto." },
      { icono: "Layers", titulo: "Documentación integrada", desc: "Centraliza presupuesto, fases y condiciones en un solo documento." },
    ],
    stats: [
      { valor: "10 min", label: "por propuesta de honorarios" },
      { valor: "Fases", label: "según normativa LOE" },
      { valor: "Firma", label: "electrónica de aprobación" },
    ],
    guia: `<p>La propuesta de honorarios de un estudio de arquitectura debe transmitir rigor técnico y profesionalidad desde la primera página. A diferencia de otros sectores, los honorarios del arquitecto se estructuran conforme a las fases del proyecto establecidas por la Ley de Ordenación de la Edificación (LOE): estudios previos, anteproyecto, proyecto básico, proyecto de ejecución y dirección de obra. Cada fase tiene entregables y responsabilidades diferentes que el cliente necesita comprender.</p>
<p>Es habitual cotizar los honorarios como porcentaje del Presupuesto de Ejecución Material (PEM) o como precio fijo por fase. En cualquier caso, conviene detallar qué incluye cada etapa: planos, memorias técnicas, gestiones con el Colegio de Arquitectos, coordinación con ingenieros y dirección facultativa. Los gastos de visado, tasas municipales y honorarios de otros técnicos deben indicarse por separado para evitar malentendidos.</p>
<p>Con DealForge puedes crear propuestas de honorarios profesionales con la estructura por fases que exige la normativa, cálculo automático de totales y envío con firma electrónica. El cliente aprueba el encargo de forma digital, agilizando el inicio del proyecto sin burocracia innecesaria.</p>`,
    howToSteps: [
      "Abre la plantilla de Arquitectura y registra los datos del cliente y la ubicación del proyecto.",
      "Estructura los honorarios por fases LOE: estudios previos, anteproyecto, básico, ejecución y dirección.",
      "Indica el método de cálculo (porcentaje sobre PEM o tarifa fija) y los entregables de cada fase.",
      "Separa los gastos de visado, tasas y honorarios de otros técnicos del coste del estudio.",
      "Envía la propuesta de honorarios con firma electrónica para formalizar el encargo profesional.",
    ],
  },
  {
    slug: "limpieza",
    nombre: "Limpieza",
    titulo: "Plantilla de Cotización para Empresas de Limpieza",
    descripcion: "Cotiza servicios de limpieza profesional: oficinas, comunidades, cristales, limpieza industrial y mantenimiento.",
    emoji: "🧹",
    color: "#4CAF50",
    ejemploLineas: [
      { descripcion: "Limpieza general oficinas (500m²)", cantidad: 20, precio: 45 },
      { descripcion: "Limpieza de cristales exteriores", cantidad: 4, precio: 120 },
      { descripcion: "Tratamiento y abrillantado de suelos", cantidad: 2, precio: 350 },
      { descripcion: "Desinfección completa", cantidad: 4, precio: 80 },
      { descripcion: "Productos y materiales", cantidad: 1, precio: 200 },
    ],
    problemas: [
      "Presupuestos que no detallan frecuencia ni alcance",
      "Competir solo por precio sin mostrar valor",
      "Sin seguimiento ni renovación automática",
      "Imagen poco profesional del negocio",
    ],
    beneficios: [
      "Servicios con frecuencia y m² detallados",
      "Cálculo automático mensual/trimestral/anual",
      "Renovación con firma electrónica",
      "Recordatorios automáticos de renovación",
    ],
    keywords: ["cotización limpieza", "presupuesto empresa limpieza", "cotización limpieza oficinas", "presupuesto limpieza comunidad"],
    icp: {
      cargo: "Gerente de empresa de limpieza",
      empresaTipo: "Empresa de limpieza de 5-30 empleados",
      dolor: "Los contratos de mantenimiento se renuevan de palabra y pierde clientes sin saber por qué.",
      cita: "El administrador de la comunidad me dijo que contrató a otra empresa porque les mandaron un presupuesto más claro.",
    },
    casoDeUso: {
      antes: "Entregaba un folio impreso con el precio mensual sin desglosar qué incluía la limpieza ni con qué frecuencia.",
      despues: "Envía presupuestos con servicios detallados por frecuencia (diaria, semanal, mensual), m² cubiertos y productos incluidos.",
      resultado: "Los clientes valoran la transparencia del desglose, las renovaciones se formalizan con firma y hay menos rotación de contratos.",
    },
    faqs: [
      {
        pregunta: "¿Puedo cotizar servicios con diferentes frecuencias (diaria, semanal, mensual)?",
        respuesta: "Sí, cada línea puede tener su propia frecuencia y el sistema calcula el coste mensual o anual automáticamente según las repeticiones.",
      },
      {
        pregunta: "¿Cómo presupuesto servicios extras puntuales como cristales o abrillantado?",
        respuesta: "Puedes añadir líneas específicas para servicios trimestrales o puntuales con su frecuencia propia, separadas del mantenimiento regular.",
      },
      {
        pregunta: "¿Se puede usar para contratos de comunidades de propietarios?",
        respuesta: "Sí, puedes detallar zonas comunes, frecuencia por zona, productos incluidos y condiciones de renovación anual del contrato.",
      },
    ],
    featuresEspecificos: [
      { icono: "Clock", titulo: "Frecuencias detalladas", desc: "Define servicios diarios, semanales, mensuales y trimestrales." },
      { icono: "Calculator", titulo: "Cálculo automático", desc: "Calcula coste mensual y anual según frecuencia de cada servicio." },
      { icono: "FileText", titulo: "Contratos formales", desc: "Genera documentos con condiciones de renovación y cancelación." },
      { icono: "Zap", titulo: "Renovación rápida", desc: "Renueva contratos anuales con un clic y firma electrónica." },
    ],
    stats: [
      { valor: "5 min", label: "por cotización de limpieza" },
      { valor: "Mensual", label: "cálculo automático" },
      { valor: "Contratos", label: "con renovación digital" },
    ],
    guia: `<p>Las empresas de limpieza profesional necesitan presupuestos que detallen con exactitud las superficies a limpiar, la frecuencia del servicio, los productos y equipos utilizados y el número de operarios asignados. Un presupuesto vago genera desconfianza en el cliente y abre la puerta a reclamaciones futuras sobre lo que estaba o no incluido en el contrato.</p>
<p>Para servicios recurrentes —oficinas, comunidades de vecinos, locales comerciales— la cotización debe calcular el coste mensual desglosando metros cuadrados, frecuencia semanal y tipo de limpieza (mantenimiento, cristales, desinfección, tratamiento de suelos). Los servicios puntuales como limpiezas de fin de obra o limpiezas profundas requieren una valoración específica por horas y complejidad del trabajo.</p>
<p>DealForge permite generar cotizaciones de limpieza con cálculo automático de tarifas mensuales, anuales y por servicio puntual. Puedes enviar el presupuesto al administrador de fincas o al responsable de la empresa con firma electrónica, formalizando el contrato de servicio sin papeleos y con renovación digital cuando llegue el momento.</p>`,
    howToSteps: [
      "Elige la plantilla de Limpieza y completa los datos del cliente y la dirección del inmueble.",
      "Indica las superficies en metros cuadrados, tipo de limpieza y frecuencia del servicio.",
      "Calcula el coste mensual o por servicio puntual, incluyendo productos y número de operarios.",
      "Añade condiciones contractuales: duración, renovación, penalizaciones y preaviso de cancelación.",
      "Envía el presupuesto con firma electrónica para formalizar el contrato de limpieza.",
    ],
  },
  {
    slug: "eventos",
    nombre: "Eventos",
    titulo: "Plantilla de Cotización para Organización de Eventos",
    descripcion: "Presupuesta eventos corporativos, bodas, ferias y congresos con desglose de servicios, catering, logística y decoración.",
    emoji: "🎪",
    color: "#FF9800",
    ejemploLineas: [
      { descripcion: "Coordinación y planificación", cantidad: 1, precio: 2000 },
      { descripcion: "Catering (100 personas)", cantidad: 100, precio: 35 },
      { descripcion: "Decoración y ambientación", cantidad: 1, precio: 1500 },
      { descripcion: "Equipo audiovisual + DJ", cantidad: 1, precio: 1200 },
      { descripcion: "Fotografía + vídeo resumen", cantidad: 1, precio: 800 },
    ],
    problemas: [
      "Presupuestos complejos con muchos proveedores",
      "Cambios de última hora sin control de costes",
      "Falta de claridad en qué incluye y qué no",
      "Aprobaciones lentas que retrasan la planificación",
    ],
    beneficios: [
      "Desglose por categoría (catering, deco, AV...)",
      "Versionado para cambios de menú o servicios",
      "Aprobación rápida con firma electrónica",
      "PDF profesional que impresiona al cliente",
    ],
    keywords: ["cotización eventos", "presupuesto boda", "cotización catering", "presupuesto evento corporativo", "cotización organización eventos"],
    icp: {
      cargo: "Wedding planner o coordinador de eventos",
      empresaTipo: "Agencia de eventos de 2-10 personas",
      dolor: "Los cambios constantes del cliente (menú, invitados, decoración) hacen que el presupuesto quede desactualizado cada semana.",
      cita: "La novia cambió el menú tres veces y ahora no sé ni cuál es el presupuesto vigente.",
    },
    casoDeUso: {
      antes: "Mantenía un Excel con pestañas para cada proveedor y enviaba un PDF resumen que quedaba desactualizado con cada cambio.",
      despues: "Crea un presupuesto unificado con categorías, actualiza líneas cuando hay cambios y envía la versión actualizada con un clic.",
      resultado: "Cada cambio queda documentado en una nueva versión, el cliente siempre ve el presupuesto actualizado y no hay confusión sobre lo acordado.",
    },
    faqs: [
      {
        pregunta: "¿Puedo organizar el presupuesto por categorías (catering, decoración, audiovisual)?",
        respuesta: "Sí, puedes crear secciones para cada categoría del evento. El cliente ve el desglose por área y el total general del evento.",
      },
      {
        pregunta: "¿Cómo gestiono los cambios de menú o número de invitados?",
        respuesta: "Duplicas la cotización, ajustas las líneas afectadas y envías una nueva versión. El historial mantiene todas las versiones anteriores.",
      },
      {
        pregunta: "¿Puedo calcular el coste por persona del evento?",
        respuesta: "Sí, puedes usar la cantidad para indicar número de personas en líneas como catering, bebidas o regalos, y el sistema calcula el total.",
      },
    ],
    featuresEspecificos: [
      { icono: "Layers", titulo: "Categorías del evento", desc: "Organiza por catering, decoración, audiovisual, logística y más." },
      { icono: "Users", titulo: "Coste por invitado", desc: "Calcula el precio total basado en el número de asistentes." },
      { icono: "FileText", titulo: "Versionado de cambios", desc: "Cada modificación genera una nueva versión con historial." },
      { icono: "Zap", titulo: "Aprobación inmediata", desc: "El cliente aprueba el presupuesto final con firma electrónica." },
    ],
    stats: [
      { valor: "10 min", label: "por presupuesto de evento" },
      { valor: "Versiones", label: "para cada cambio" },
      { valor: "Categorías", label: "organizadas por servicio" },
    ],
    guia: `<p>Presupuestar un evento requiere coordinar múltiples proveedores y servicios en un solo documento coherente: catering, audiovisual, decoración, fotografía, entretenimiento, personal de sala y logística. El reto está en presentar todo de forma clara para que el cliente pueda aprobar, modificar o descartar servicios sin perder la visión global del coste total del evento.</p>
<p>Cada tipo de evento —boda, congreso, lanzamiento de producto, cena de gala— tiene partidas específicas. Para bodas, por ejemplo, es clave desglosar el precio por comensal separando aperitivo, banquete, barra libre y tarta. En eventos corporativos, el cliente necesita ver el coste del espacio, la producción técnica, el catering y la señalización como partidas independientes que puede escalar según el número de asistentes.</p>
<p>DealForge te permite organizar el presupuesto por categorías de servicio, crear versiones para distintas opciones (menú A vs. menú B, 100 vs. 200 invitados) y enviar todo en un documento profesional que el cliente aprueba con firma electrónica. Cada modificación genera una nueva versión, manteniendo el historial completo de lo acordado.</p>`,
    howToSteps: [
      "Selecciona la plantilla de Eventos e introduce los datos del cliente y la fecha del evento.",
      "Organiza el presupuesto por categorías: catering, audiovisual, decoración, entretenimiento, logística.",
      "Crea opciones o versiones para distintos menús, configuraciones o número de invitados.",
      "Incluye condiciones de reserva, cancelación y calendario de pagos vinculado a hitos.",
      "Envía el presupuesto completo y obtén la aprobación del cliente con firma electrónica.",
    ],
  },
  {
    slug: "electricidad",
    nombre: "Electricidad",
    titulo: "Plantilla de Cotización para Electricistas e Instaladores",
    descripcion: "Crea presupuestos para instalaciones eléctricas, cuadros, canalizaciones, iluminación y certificados de instalación.",
    emoji: "⚡",
    color: "#FFC107",
    ejemploLineas: [
      { descripcion: "Cuadro eléctrico general", cantidad: 1, precio: 850 },
      { descripcion: "Canalización y cableado (metros)", cantidad: 120, precio: 12 },
      { descripcion: "Puntos de luz LED", cantidad: 25, precio: 45 },
      { descripcion: "Enchufes e interruptores", cantidad: 30, precio: 18 },
      { descripcion: "Certificado de instalación (REBT)", cantidad: 1, precio: 250 },
    ],
    problemas: [
      "Presupuestos a mano que no detallan materiales",
      "Errores de cálculo en cantidades y precios",
      "Sin registro de trabajos realizados",
      "Imagen informal frente a empresas grandes",
    ],
    beneficios: [
      "Desglose de materiales + mano de obra",
      "Catálogo de productos eléctricos actualizado",
      "PDF con certificación y normativa incluida",
      "Historial de cotizaciones por cliente",
    ],
    keywords: ["cotización electricista", "presupuesto instalación eléctrica", "cotización electricidad", "presupuesto cuadro eléctrico"],
    icp: {
      cargo: "Electricista autónomo o jefe de equipo",
      empresaTipo: "Empresa de instalaciones eléctricas de 1-15 empleados",
      dolor: "Hace presupuestos a mano en la furgoneta y se olvida de incluir materiales o calcula mal las cantidades.",
      cita: "Le dije al cliente un precio de cabeza y cuando compré los materiales me di cuenta de que iba a perder dinero.",
    },
    casoDeUso: {
      antes: "Apuntaba el presupuesto en un papel o lo mandaba por WhatsApp con un precio aproximado sin desglosar materiales.",
      despues: "Crea el presupuesto desde el móvil con líneas para cada material, mano de obra y certificado, con cálculo automático.",
      resultado: "Presupuestos sin errores de cálculo, imagen profesional frente al cliente y un registro de todos los trabajos realizados.",
    },
    faqs: [
      {
        pregunta: "¿Puedo separar el coste de materiales del de mano de obra?",
        respuesta: "Sí, puedes crear líneas independientes para materiales (cable, mecanismos, cuadro) y para mano de obra (horas de instalación), cada una con su precio.",
      },
      {
        pregunta: "¿Cómo incluyo el certificado de instalación en el presupuesto?",
        respuesta: "Añade una línea para el certificado REBT o el boletín eléctrico como servicio independiente. Puedes incluir notas sobre la normativa aplicable.",
      },
      {
        pregunta: "¿Puedo reutilizar líneas de materiales habituales entre presupuestos?",
        respuesta: "Sí, puedes duplicar presupuestos anteriores como base y ajustar cantidades. Los materiales que usas frecuentemente quedan guardados.",
      },
    ],
    featuresEspecificos: [
      { icono: "Zap", titulo: "Materiales desglosados", desc: "Lista cada material con cantidad, precio unitario y total." },
      { icono: "Calculator", titulo: "Cálculo automático", desc: "Suma materiales, mano de obra e IVA sin errores." },
      { icono: "Shield", titulo: "Normativa incluida", desc: "Añade referencias REBT y certificaciones al documento." },
      { icono: "Clock", titulo: "Presupuesto en campo", desc: "Crea y envía desde el móvil en la propia instalación." },
    ],
    stats: [
      { valor: "5 min", label: "por presupuesto eléctrico" },
      { valor: "0 errores", label: "de cálculo en materiales" },
      { valor: "PDF", label: "profesional con normativa" },
    ],
    guia: `<p>Un presupuesto eléctrico profesional debe separar claramente los materiales (cableado, mecanismos, cuadros eléctricos, luminarias) de la mano de obra y los costes de certificación. El instalador electricista que detalla cada partida —puntos de luz, tomas de corriente, circuitos especiales para aire acondicionado o cocina de inducción— genera confianza y reduce las discusiones posteriores sobre qué estaba incluido.</p>
<p>La normativa del Reglamento Electrotécnico de Baja Tensión (REBT) exige que las instalaciones cumplan requisitos técnicos específicos. Reflejar en el presupuesto que la instalación incluye boletín eléctrico, certificado de instalación y tramitación ante la comunidad autónoma correspondiente añade valor percibido y diferencia al profesional serio del electricista que trabaja sin documentación.</p>
<p>Con DealForge puedes crear presupuestos eléctricos con líneas predefinidas para cada tipo de instalación, cálculo automático del total de materiales más mano de obra e IVA, y generar un PDF profesional que incluya las referencias normativas pertinentes. El cliente aprueba desde su móvil y tú puedes empezar la instalación con el respaldo de un documento firmado.</p>`,
    howToSteps: [
      "Abre la plantilla de Electricidad e introduce los datos del cliente y la dirección de la instalación.",
      "Desglosa los materiales (cables, mecanismos, cuadros) y la mano de obra por cada circuito o zona.",
      "Añade partidas de certificación: boletín eléctrico, proyecto técnico si aplica, y tramitaciones.",
      "Indica plazos de ejecución, garantías y referencias normativas REBT aplicables.",
      "Envía el presupuesto profesional y recibe la aceptación firmada electrónicamente.",
    ],
  },
  {
    slug: "fontaneria",
    nombre: "Fontanería",
    titulo: "Plantilla de Cotización para Fontaneros",
    descripcion: "Presupuesta trabajos de fontanería: instalaciones, reparaciones, calefacción, saneamiento y reformas de baños.",
    emoji: "🔧",
    color: "#2196F3",
    ejemploLineas: [
      { descripcion: "Instalación grifo monomando", cantidad: 3, precio: 85 },
      { descripcion: "Cambio de calentador (suministro + instalación)", cantidad: 1, precio: 650 },
      { descripcion: "Reforma completa baño (fontanería)", cantidad: 1, precio: 2200 },
      { descripcion: "Desatasco con cámara inspección", cantidad: 1, precio: 180 },
      { descripcion: "Desplazamiento y diagnóstico", cantidad: 1, precio: 50 },
    ],
    problemas: [
      "Presupuestos verbales que generan malentendidos",
      "Materiales no especificados que causan disputas",
      "Sin registro de garantías ni trabajos anteriores",
      "Competir con el boca a boca sin imagen profesional",
    ],
    beneficios: [
      "Materiales y mano de obra desglosados",
      "Garantía y condiciones por escrito",
      "Firma del cliente antes de empezar",
      "Historial completo por vivienda/cliente",
    ],
    keywords: ["cotización fontanero", "presupuesto fontanería", "cotización reforma baño", "presupuesto instalación calefacción"],
    icp: {
      cargo: "Fontanero autónomo o gerente de empresa",
      empresaTipo: "Empresa de fontanería de 1-10 operarios",
      dolor: "Da precios de palabra y luego el cliente reclama porque no especificó qué materiales iba a usar.",
      cita: "El cliente me dice que le prometí grifería Roca pero yo le dije un precio genérico, no quedó nada por escrito.",
    },
    casoDeUso: {
      antes: "Daba el precio en la propia visita de palabra, sin detallar materiales, marca ni condiciones de garantía.",
      despues: "Envía el presupuesto desde el móvil después de la visita con cada material especificado, marca incluida, y garantía por escrito.",
      resultado: "No hay disputas sobre materiales, el cliente firma antes de empezar la obra y queda un registro de cada trabajo para futuras consultas.",
    },
    faqs: [
      {
        pregunta: "¿Puedo especificar marcas y modelos de materiales en el presupuesto?",
        respuesta: "Sí, en la descripción de cada línea puedes incluir marca, modelo y referencia del material. Así no hay confusión sobre lo que se va a instalar.",
      },
      {
        pregunta: "¿Cómo incluyo la garantía del trabajo en el documento?",
        respuesta: "Puedes añadir notas con las condiciones de garantía: duración, qué cubre y qué no. Queda formalmente incluido en el documento firmado.",
      },
      {
        pregunta: "¿Se puede usar para reformas de baño donde hay varias fases?",
        respuesta: "Sí, puedes separar líneas de fontanería por fases: desmontaje, nueva instalación, griferías y sanitarios, cada una con su coste.",
      },
    ],
    featuresEspecificos: [
      { icono: "FileText", titulo: "Materiales detallados", desc: "Especifica marca, modelo y referencia de cada material." },
      { icono: "Shield", titulo: "Garantía incluida", desc: "Documenta condiciones de garantía en el presupuesto firmado." },
      { icono: "Clock", titulo: "Desde la visita", desc: "Crea el presupuesto en el móvil tras inspeccionar la avería." },
      { icono: "Users", titulo: "Historial por cliente", desc: "Consulta todos los trabajos anteriores en cada vivienda." },
    ],
    stats: [
      { valor: "3 min", label: "por presupuesto de fontanería" },
      { valor: "Marca", label: "y modelo especificados" },
      { valor: "Garantía", label: "por escrito incluida" },
    ],
    guia: `<p>El fontanero que entrega un presupuesto detallado marca la diferencia frente a quien da un precio "a ojo" por teléfono. Una cotización profesional de fontanería debe indicar la marca y modelo de los materiales (grifería, sanitarios, calentadores, tuberías), diferenciar entre suministro e instalación, y especificar si incluye la retirada del material antiguo y los trabajos de albañilería menor necesarios.</p>
<p>En reparaciones de urgencia, el cliente agradece un presupuesto rápido pero transparente que distinga el coste del desplazamiento, la mano de obra por hora y los materiales empleados. Para instalaciones nuevas o reformas de baños y cocinas, conviene estructurar el presupuesto por zonas y detallar cada punto de agua, desagüe y conexión de electrodomésticos para que no haya sorpresas al finalizar la obra.</p>
<p>DealForge permite al fontanero crear presupuestos desde el móvil durante la visita, con líneas predefinidas para los trabajos más habituales y cálculo automático del total. El documento incluye la garantía por escrito sobre materiales e instalación, y el cliente puede aceptarlo firmando desde su teléfono en el acto, sin esperas ni papeleo.</p>`,
    howToSteps: [
      "Selecciona la plantilla de Fontanería y registra los datos del cliente y la dirección del trabajo.",
      "Detalla cada trabajo: reparación, sustitución o nueva instalación, indicando marca y modelo de materiales.",
      "Separa el coste de materiales, mano de obra, desplazamiento y retirada de elementos antiguos.",
      "Incluye la garantía de instalación y materiales con su duración en las condiciones.",
      "Envía el presupuesto al instante desde el móvil y recoge la firma digital del cliente.",
    ],
  },
  {
    slug: "jardineria",
    nombre: "Jardinería",
    titulo: "Plantilla de Cotización para Jardinería y Paisajismo",
    descripcion: "Cotiza servicios de jardinería, mantenimiento de zonas verdes, diseño de jardines y paisajismo profesional.",
    emoji: "🌿",
    color: "#8BC34A",
    ejemploLineas: [
      { descripcion: "Mantenimiento mensual jardín (500m²)", cantidad: 12, precio: 180 },
      { descripcion: "Poda de árboles y setos", cantidad: 4, precio: 250 },
      { descripcion: "Instalación riego automático", cantidad: 1, precio: 1200 },
      { descripcion: "Plantación y suministro de plantas", cantidad: 1, precio: 800 },
      { descripcion: "Diseño paisajístico", cantidad: 1, precio: 600 },
    ],
    problemas: [
      "Contratos de mantenimiento sin formalizar",
      "Sin desglose de servicios incluidos",
      "Renovaciones anuales que se olvidan",
      "Presupuestos por WhatsApp sin seguimiento",
    ],
    beneficios: [
      "Servicios con frecuencia detallada",
      "Contratos anuales con renovación automática",
      "Desglose de plantas, materiales y mano de obra",
      "Firma electrónica para contratos de mantenimiento",
    ],
    keywords: ["cotización jardinería", "presupuesto mantenimiento jardín", "cotización paisajismo", "presupuesto jardinero"],
    icp: {
      cargo: "Jardinero profesional o paisajista",
      empresaTipo: "Empresa de jardinería de 2-15 operarios",
      dolor: "Los contratos de mantenimiento se renuevan de palabra cada año y a veces pierde clientes sin previo aviso.",
      cita: "Llevaba tres años con la comunidad y un día me llamaron para decir que habían contratado a otro porque les mandó un presupuesto más detallado.",
    },
    casoDeUso: {
      antes: "Acordaba el mantenimiento de palabra, sin documentar qué incluía, con qué frecuencia ni cuándo se renovaba.",
      despues: "Envía contratos de mantenimiento con frecuencias, servicios incluidos y renovación anual con firma electrónica.",
      resultado: "Los clientes renuevan de forma más predecible, queda claro qué incluye el servicio y hay menos cancelaciones inesperadas.",
    },
    faqs: [
      {
        pregunta: "¿Puedo cotizar mantenimiento mensual con servicios estacionales diferentes?",
        respuesta: "Sí, puedes crear líneas con diferentes frecuencias: siega semanal en verano, poda trimestral, tratamiento fitosanitario semestral, cada una con su periodicidad.",
      },
      {
        pregunta: "¿Cómo presupuesto un proyecto de paisajismo con plantas y materiales?",
        respuesta: "Puedes desglosar líneas para diseño, suministro de plantas (con especies y cantidades), materiales de obra (tierra, grava) y mano de obra de plantación.",
      },
      {
        pregunta: "¿Se puede usar para contratos con comunidades de propietarios?",
        respuesta: "Sí, puedes detallar zonas de la comunidad, servicios por zona, frecuencia de cada tarea y precio total mensual o anual del contrato.",
      },
    ],
    featuresEspecificos: [
      { icono: "Clock", titulo: "Frecuencias estacionales", desc: "Define tareas con frecuencia semanal, mensual, trimestral o anual." },
      { icono: "FileText", titulo: "Contratos de mantenimiento", desc: "Formaliza contratos anuales con condiciones de renovación." },
      { icono: "Package", titulo: "Suministro de plantas", desc: "Detalla especies, cantidades y coste de cada planta." },
      { icono: "Calculator", titulo: "Coste anual automático", desc: "Calcula el total anual a partir de servicios con distintas frecuencias." },
    ],
    stats: [
      { valor: "5 min", label: "por presupuesto de jardinería" },
      { valor: "Anual", label: "cálculo de mantenimiento" },
      { valor: "Contrato", label: "formal con firma digital" },
    ],
    guia: `<p>Las empresas de jardinería y paisajismo deben cotizar de forma diferente según se trate de un proyecto de diseño de jardín, una instalación de riego o un contrato de mantenimiento periódico. En proyectos de creación, el presupuesto necesita detallar las especies vegetales con nombre común y científico, el sustrato, los sistemas de riego, la iluminación exterior y los elementos de hardscape como caminos, pérgolas o muros de contención.</p>
<p>Para contratos de mantenimiento recurrente —comunidades de propietarios, empresas, jardines privados— la clave está en especificar qué incluye cada visita: siega, poda, desbroce, tratamientos fitosanitarios, abonado y limpieza de zonas comunes. El precio mensual debe reflejar la estacionalidad, ya que las tareas y la frecuencia varían considerablemente entre primavera-verano y otoño-invierno.</p>
<p>DealForge facilita la creación de presupuestos de jardinería con cálculo automático de tarifas mensuales y anuales. Puedes enviar contratos de mantenimiento con renovación digital, o presupuestos de proyecto con desglose de materiales vegetales, mano de obra y maquinaria. El cliente firma electrónicamente y ambas partes conservan un registro claro de lo acordado.</p>`,
    howToSteps: [
      "Elige la plantilla de Jardinería e introduce los datos del cliente y la ubicación del jardín.",
      "Para mantenimiento: indica frecuencia, tareas incluidas por visita y superficie a mantener.",
      "Para proyectos: desglosa especies vegetales, materiales de hardscape, riego e iluminación.",
      "Calcula la tarifa mensual o el precio del proyecto e incluye condiciones de temporalidad.",
      "Envía el presupuesto o contrato de mantenimiento con firma electrónica para su aceptación.",
    ],
  },
  {
    slug: "transporte",
    nombre: "Transporte y Logística",
    titulo: "Plantilla de Cotización para Transporte y Logística",
    descripcion: "Presupuesta servicios de transporte, mudanzas, logística y distribución con rutas, vehículos y tarifas claras.",
    emoji: "🚛",
    color: "#795548",
    ejemploLineas: [
      { descripcion: "Transporte Madrid-Barcelona (camión completo)", cantidad: 1, precio: 850 },
      { descripcion: "Carga y descarga (2 operarios, 4h)", cantidad: 1, precio: 320 },
      { descripcion: "Embalaje y protección de mercancía", cantidad: 1, precio: 200 },
      { descripcion: "Seguro de transporte", cantidad: 1, precio: 120 },
      { descripcion: "Almacenamiento temporal (1 semana)", cantidad: 1, precio: 150 },
    ],
    problemas: [
      "Tarifas por WhatsApp sin compromiso formal",
      "Sin desglose de servicios adicionales",
      "Reclamaciones por falta de documentación",
      "Competencia por precio sin valor añadido",
    ],
    beneficios: [
      "Tarifas por ruta, peso o volumen",
      "Seguro y condiciones incluidos",
      "Aceptación inmediata con firma electrónica",
      "Historial de servicios por cliente",
    ],
    keywords: ["cotización transporte", "presupuesto mudanza", "cotización logística", "presupuesto transporte mercancías"],
    icp: {
      cargo: "Gerente de flota o responsable comercial",
      empresaTipo: "Empresa de transporte de 3-25 vehículos",
      dolor: "Envía tarifas por WhatsApp y no queda registro formal, lo que causa problemas cuando hay reclamaciones.",
      cita: "El cliente dice que le dije un precio diferente y no tengo forma de demostrarlo porque fue por mensaje de voz.",
    },
    casoDeUso: {
      antes: "Respondía por WhatsApp con un precio por ruta y un mensaje de voz explicando las condiciones.",
      despues: "Envía cotización formal con ruta, tipo de vehículo, servicios adicionales, seguro y condiciones por escrito.",
      resultado: "Las reclamaciones se resuelven con la documentación firmada, los clientes perciben mayor profesionalidad y los acuerdos quedan registrados.",
    },
    faqs: [
      {
        pregunta: "¿Puedo cotizar por ruta, peso o volumen según el servicio?",
        respuesta: "Sí, cada línea del presupuesto puede tener su propia unidad: por viaje, por kg, por m³ o por km. Puedes combinar diferentes unidades en el mismo documento.",
      },
      {
        pregunta: "¿Cómo incluyo el seguro de transporte en la cotización?",
        respuesta: "Puedes añadir una línea específica para el seguro con el coste y las condiciones de cobertura en las notas. Queda documentado y firmado por el cliente.",
      },
      {
        pregunta: "¿Se puede usar para servicios de mudanzas con embalaje y montaje?",
        respuesta: "Sí, puedes desglosar: transporte, embalaje, carga/descarga, montaje de muebles y seguro. Cada servicio como línea independiente con su precio.",
      },
    ],
    featuresEspecificos: [
      { icono: "Truck", titulo: "Rutas y vehículos", desc: "Detalla origen, destino, tipo de vehículo y características." },
      { icono: "Shield", titulo: "Seguro documentado", desc: "Incluye condiciones de seguro y cobertura en el presupuesto." },
      { icono: "Package", titulo: "Servicios adicionales", desc: "Desglosa embalaje, carga, descarga y almacenamiento." },
      { icono: "FileText", titulo: "Registro formal", desc: "Cada servicio queda documentado con firma del cliente." },
    ],
    stats: [
      { valor: "3 min", label: "por cotización de transporte" },
      { valor: "Rutas", label: "con desglose completo" },
      { valor: "Seguro", label: "incluido y documentado" },
    ],
    guia: `<p>Las cotizaciones de transporte y logística deben contemplar variables que otras industrias no manejan: distancia, peso y volumen de la mercancía, tipo de vehículo requerido, seguros de carga, peajes y tiempos de espera en carga y descarga. El cliente necesita saber exactamente qué cubre el precio ofertado y qué conceptos pueden generar recargos, como entregas en horario nocturno, accesos difíciles o mercancía que requiere temperatura controlada.</p>
<p>Para servicios recurrentes de distribución, la cotización debe establecer tarifas por ruta, por kilómetro o por palé, con escalas de descuento por volumen. En mudanzas y transportes puntuales, conviene detallar el embalaje incluido, el número de porteadores, la disponibilidad de montacargas y la cobertura del seguro de contenido. La transparencia en estos conceptos evita reclamaciones y genera relaciones comerciales duraderas.</p>
<p>DealForge te permite configurar cotizaciones de transporte con rutas predefinidas, tarifas por tramo y cálculo automático de costes. El documento incluye las condiciones del seguro de mercancía y se envía con firma electrónica, formalizando el servicio antes de cargar el primer bulto.</p>`,
    howToSteps: [
      "Abre la plantilla de Transporte y completa los datos del cliente y los puntos de origen y destino.",
      "Indica el tipo de carga, peso, volumen y vehículo necesario para el servicio.",
      "Desglosa el coste por conceptos: transporte, seguro, embalaje, peajes y tiempos de espera.",
      "Establece condiciones de responsabilidad, plazos de entrega y cobertura del seguro.",
      "Envía la cotización de transporte y recibe la confirmación firmada electrónicamente.",
    ],
  },
  {
    slug: "formacion",
    nombre: "Formación",
    titulo: "Plantilla de Cotización para Formación y Cursos",
    descripcion: "Cotiza programas de formación in-company, cursos, talleres y coaching con contenidos, duración y materiales detallados.",
    emoji: "📚",
    color: "#3F51B5",
    ejemploLineas: [
      { descripcion: "Diseño del programa formativo", cantidad: 1, precio: 500 },
      { descripcion: "Sesiones presenciales (8h)", cantidad: 2, precio: 1200 },
      { descripcion: "Material didáctico personalizado", cantidad: 20, precio: 25 },
      { descripcion: "Plataforma e-learning (3 meses)", cantidad: 1, precio: 400 },
      { descripcion: "Certificación y evaluación", cantidad: 20, precio: 30 },
    ],
    problemas: [
      "Propuestas genéricas sin personalización",
      "Dificultad para comunicar el ROI de la formación",
      "Aprobaciones lentas del departamento de RRHH",
      "Sin seguimiento post-propuesta",
    ],
    beneficios: [
      "Programa detallado con objetivos y contenidos",
      "Precio por alumno o tarifa plana clara",
      "Aprobación rápida con firma electrónica",
      "Seguimiento automático de propuestas pendientes",
    ],
    keywords: ["cotización formación", "presupuesto curso empresa", "cotización coaching", "presupuesto formación in-company"],
    icp: {
      cargo: "Formador freelance o director de academia",
      empresaTipo: "Empresa de formación de 1-10 formadores",
      dolor: "Las propuestas pasan por varios departamentos (RRHH, dirección, compras) y se pierden en el camino.",
      cita: "RRHH me dijo que mi propuesta estaba aprobada pero luego financiero pidió más detalles y pasaron dos meses.",
    },
    casoDeUso: {
      antes: "Enviaba un PDF genérico con el temario y el precio, sin adaptar a los objetivos específicos de la empresa.",
      despues: "Crea propuestas personalizadas con objetivos de aprendizaje, programa detallado, materiales incluidos y precio por alumno.",
      resultado: "Las empresas ven una propuesta adaptada a sus necesidades, las aprobaciones son más ágiles y hay menos idas y vueltas con RRHH.",
    },
    faqs: [
      {
        pregunta: "¿Puedo cotizar por alumno o con tarifa plana para grupos?",
        respuesta: "Sí, puedes usar la cantidad para indicar el número de alumnos y el precio unitario por persona, o crear una línea con tarifa plana para un grupo cerrado.",
      },
      {
        pregunta: "¿Cómo incluyo el programa formativo dentro de la propuesta?",
        respuesta: "Puedes añadir notas detalladas con los objetivos, módulos, duración de cada sesión y metodología. Todo queda integrado en el mismo documento.",
      },
      {
        pregunta: "¿Puedo ofrecer opciones presencial y online en la misma propuesta?",
        respuesta: "Sí, puedes crear versiones o líneas opcionales para formato presencial, online o híbrido, cada uno con su precio y condiciones.",
      },
    ],
    featuresEspecificos: [
      { icono: "BookOpen", titulo: "Programa detallado", desc: "Incluye objetivos, módulos y metodología en la propuesta." },
      { icono: "Users", titulo: "Precio por alumno", desc: "Calcula automáticamente el total según número de participantes." },
      { icono: "Layers", titulo: "Formatos flexibles", desc: "Cotiza opciones presencial, online o híbrido en un mismo documento." },
      { icono: "Mail", titulo: "Seguimiento a RRHH", desc: "Sabe cuándo abren la propuesta para reactivar la conversación." },
    ],
    stats: [
      { valor: "8 min", label: "por propuesta formativa" },
      { valor: "Programa", label: "detallado con objetivos" },
      { valor: "Por alumno", label: "o tarifa plana" },
    ],
    guia: `<p>Las propuestas de formación y capacitación profesional deben ir más allá de un listado de cursos con precios. El cliente —ya sea un departamento de recursos humanos, un centro educativo o un profesional independiente— necesita ver los objetivos de aprendizaje, el temario detallado, la metodología pedagógica, la duración de cada módulo y las competencias que adquirirán los participantes al finalizar la formación.</p>
<p>La forma de cotizar varía según el formato: formaciones in-company se presupuestan habitualmente por jornada o por programa completo, mientras que los cursos abiertos al público suelen cotizarse por alumno con descuentos por grupo. Incluir en la propuesta los materiales didácticos, las herramientas digitales, los certificados de aprovechamiento y el soporte post-formación eleva el valor percibido y justifica tarifas superiores a la competencia.</p>
<p>DealForge permite estructurar propuestas formativas con módulos, objetivos y precios por alumno o tarifa plana. Puedes enviar la propuesta al responsable de formación con seguimiento automático para saber cuándo la revisa, y cerrar el acuerdo con firma electrónica sin dilaciones burocráticas.</p>`,
    howToSteps: [
      "Selecciona la plantilla de Formación e introduce los datos del cliente o empresa solicitante.",
      "Estructura la propuesta por módulos con objetivos de aprendizaje, duración y metodología.",
      "Define el modelo de tarifa: precio por alumno, por jornada o por programa completo.",
      "Incluye materiales, certificación, soporte post-formación y condiciones de cancelación.",
      "Envía la propuesta formativa con firma electrónica para formalizar el acuerdo.",
    ],
  },
  {
    slug: "seguridad",
    nombre: "Seguridad",
    titulo: "Plantilla de Cotización para Empresas de Seguridad",
    descripcion: "Presupuesta servicios de seguridad: vigilancia, alarmas, CCTV, control de accesos y seguridad para eventos.",
    emoji: "🔒",
    color: "#F44336",
    ejemploLineas: [
      { descripcion: "Sistema de alarma (central + sensores)", cantidad: 1, precio: 890 },
      { descripcion: "Cámaras CCTV IP (4 unidades)", cantidad: 4, precio: 220 },
      { descripcion: "Grabador NVR 8 canales", cantidad: 1, precio: 350 },
      { descripcion: "Instalación y cableado", cantidad: 1, precio: 600 },
      { descripcion: "Mantenimiento anual", cantidad: 1, precio: 240 },
    ],
    problemas: [
      "Presupuestos técnicos difíciles de entender",
      "Sin comparativa de opciones para el cliente",
      "Contratos de mantenimiento sin formalizar",
      "Competir con grandes empresas sin imagen profesional",
    ],
    beneficios: [
      "Equipamiento desglosado con especificaciones",
      "Opciones básica/media/premium en un mismo PDF",
      "Contrato de mantenimiento con firma electrónica",
      "Imagen profesional que genera confianza",
    ],
    keywords: ["cotización seguridad", "presupuesto alarma", "cotización CCTV", "presupuesto vigilancia", "cotización control accesos"],
    icp: {
      cargo: "Responsable comercial de seguridad",
      empresaTipo: "Empresa de seguridad e instalaciones de 5-30 empleados",
      dolor: "Los presupuestos técnicos confunden al cliente y terminan eligiendo a la empresa que lo explica más claro.",
      cita: "Nuestro sistema es mejor que el de la competencia, pero el cliente no lo entiende porque mi presupuesto parece una lista de componentes.",
    },
    casoDeUso: {
      antes: "Listaba componentes técnicos con referencias que el cliente no entendía, sin explicar qué hacía cada uno.",
      despues: "Presenta equipamiento con descripciones claras, agrupado por zonas, con opciones de gama y contrato de mantenimiento.",
      resultado: "Los clientes entienden lo que van a recibir, eligen con más confianza y contratan el mantenimiento al ver las condiciones claras.",
    },
    faqs: [
      {
        pregunta: "¿Puedo presentar opciones de gama (básico, medio, premium) en un mismo presupuesto?",
        respuesta: "Sí, puedes crear versiones o líneas opcionales para cada gama, con diferentes equipos y precios. El cliente elige la opción que prefiere.",
      },
      {
        pregunta: "¿Cómo incluyo el contrato de mantenimiento junto con la instalación?",
        respuesta: "Puedes añadir líneas para instalación y una línea recurrente anual para el mantenimiento. Las condiciones del contrato van en las notas del documento.",
      },
      {
        pregunta: "¿Puedo cotizar seguridad para eventos con vigilantes y equipo temporal?",
        respuesta: "Sí, puedes crear líneas para vigilantes (horas x precio/hora), equipamiento temporal y coordinación, todo desglosado para el organizador del evento.",
      },
    ],
    featuresEspecificos: [
      { icono: "Shield", titulo: "Equipamiento claro", desc: "Describe cada componente en lenguaje que el cliente entiende." },
      { icono: "Layers", titulo: "Opciones por gama", desc: "Presenta packs básico, profesional y premium en un documento." },
      { icono: "Settings", titulo: "Especificaciones técnicas", desc: "Incluye referencias y specs sin perder la claridad." },
      { icono: "FileText", titulo: "Contrato de mantenimiento", desc: "Formaliza el mantenimiento anual con firma electrónica." },
    ],
    stats: [
      { valor: "8 min", label: "por presupuesto de seguridad" },
      { valor: "3 gamas", label: "en un mismo documento" },
      { valor: "Contrato", label: "de mantenimiento incluido" },
    ],
    guia: `<p>El presupuesto de un sistema de seguridad —alarmas, videovigilancia, control de accesos o vigilancia física— debe adaptarse a las necesidades específicas de cada instalación. No es lo mismo proteger un domicilio particular que un almacén logístico o un local comercial con horario de atención al público. La propuesta debe incluir un estudio de seguridad previo que identifique los puntos vulnerables y justifique la solución propuesta.</p>
<p>Es fundamental desglosar el coste del equipamiento (cámaras, sensores, central de alarmas, cerraduras inteligentes), la instalación, la puesta en marcha y la cuota mensual de conexión a Central Receptora de Alarmas (CRA). Ofrecer distintas gamas —básica, avanzada y premium— en un mismo presupuesto facilita la decisión del cliente y aumenta el ticket medio al mostrar las ventajas de cada nivel de protección.</p>
<p>DealForge permite a las empresas de seguridad crear presupuestos con opciones comparables, separando equipamiento de cuotas recurrentes y contratos de mantenimiento. El cliente puede aprobar la instalación con firma electrónica, y tú formalizas tanto el contrato de instalación como el de servicio mensual en un solo flujo digital.</p>`,
    howToSteps: [
      "Abre la plantilla de Seguridad e introduce los datos del cliente y la dirección de la instalación.",
      "Selecciona los equipos necesarios: cámaras, sensores, central de alarmas y control de accesos.",
      "Presenta varias gamas (básica, avanzada, premium) para que el cliente compare opciones.",
      "Separa el coste de instalación de las cuotas mensuales de CRA y mantenimiento.",
      "Envía el presupuesto con firma electrónica para formalizar instalación y contrato de servicio.",
    ],
  },
  {
    slug: "clinica-dental",
    nombre: "Clínica Dental",
    titulo: "Plantilla de Cotización para Clínicas Dentales",
    descripcion: "Genera presupuestos dentales profesionales: ortodoncia, implantes, estética dental y tratamientos con desglose claro para el paciente.",
    emoji: "🦷",
    color: "#00ACC1",
    ejemploLineas: [
      { descripcion: "Estudio y diagnóstico (radiografía panorámica)", cantidad: 1, precio: 80 },
      { descripcion: "Limpieza dental profesional", cantidad: 1, precio: 60 },
      { descripcion: "Empaste composite", cantidad: 3, precio: 75 },
      { descripcion: "Corona de zirconio", cantidad: 2, precio: 450 },
      { descripcion: "Blanqueamiento LED", cantidad: 1, precio: 300 },
    ],
    problemas: [
      "Pacientes que no entienden los tratamientos",
      "Presupuestos en papel que se pierden",
      "Falta de seguimiento de presupuestos pendientes",
      "Comparaciones con otras clínicas sin contexto",
    ],
    beneficios: [
      "Tratamientos explicados con claridad",
      "Opciones de financiación incluidas",
      "Aceptación digital sin ir a la clínica",
      "Seguimiento automático de presupuestos",
    ],
    keywords: ["presupuesto dental", "cotización clínica dental", "presupuesto ortodoncia", "presupuesto implantes dentales"],
    icp: {
      cargo: "Director de clínica o responsable de atención al paciente",
      empresaTipo: "Clínica dental de 2-10 gabinetes",
      dolor: "Los pacientes reciben el presupuesto, se van a casa a pensarlo y nunca vuelven a llamar.",
      cita: "Le entregamos el plan de tratamiento al paciente y no sabemos nada más. No tenemos forma de hacer seguimiento sin ser pesados.",
    },
    casoDeUso: {
      antes: "Imprimía el presupuesto en la consulta, el paciente se lo llevaba y en la mayoría de los casos no volvía a dar señales.",
      despues: "Envía el presupuesto por email con explicación clara de cada tratamiento, opciones de financiación y aceptación digital.",
      resultado: "Los pacientes revisan el presupuesto con calma en casa, la clínica sabe cuándo lo abren y puede hacer seguimiento en el momento adecuado.",
    },
    faqs: [
      {
        pregunta: "¿Puedo incluir opciones de financiación o pago fraccionado?",
        respuesta: "Sí, puedes añadir notas con las condiciones de financiación: cuotas mensuales, entrada inicial y duración. El paciente ve claramente cómo pagar.",
      },
      {
        pregunta: "¿Cómo presento tratamientos alternativos para que el paciente elija?",
        respuesta: "Puedes crear líneas opcionales o versiones diferentes: por ejemplo, implante vs. puente, ortodoncia invisible vs. brackets, cada opción con su precio.",
      },
      {
        pregunta: "¿El paciente puede aceptar el presupuesto sin venir a la clínica?",
        respuesta: "Sí, recibe el presupuesto por email y puede aceptarlo con firma electrónica desde su móvil. Queda constancia legal de la aceptación.",
      },
    ],
    featuresEspecificos: [
      { icono: "Heart", titulo: "Tratamientos claros", desc: "Explica cada procedimiento en lenguaje que el paciente entiende." },
      { icono: "Calculator", titulo: "Financiación incluida", desc: "Presenta opciones de pago fraccionado dentro del presupuesto." },
      { icono: "Mail", titulo: "Envío digital", desc: "El paciente recibe y acepta el presupuesto desde su móvil." },
      { icono: "BarChart", titulo: "Seguimiento activo", desc: "Sabe cuándo el paciente abre el presupuesto para hacer seguimiento." },
    ],
    stats: [
      { valor: "3 min", label: "por presupuesto dental" },
      { valor: "Digital", label: "aceptación desde el móvil" },
      { valor: "Seguimiento", label: "automático de pacientes" },
    ],
    guia: `<p>El presupuesto odontológico tiene particularidades que lo distinguen de cualquier otra cotización de servicios: se elabora tras un diagnóstico clínico, puede abarcar múltiples tratamientos en distintas piezas dentales y debe ser comprensible para un paciente sin formación sanitaria. Detallar cada tratamiento —empaste, endodoncia, corona, implante, ortodoncia— con la pieza dental afectada, el número de sesiones y el coste individual ayuda al paciente a priorizar y planificar su inversión.</p>
<p>Muchas clínicas pierden pacientes porque el presupuesto se entrega en papel durante la consulta y el paciente no lo revisa hasta días después, cuando ya ha consultado con otra clínica. Ofrecer opciones de financiación, distinguir entre tratamientos urgentes y estéticos, e incluir un plan de tratamiento por fases facilita la aceptación incluso de presupuestos elevados.</p>
<p>DealForge permite a clínicas dentales generar presupuestos digitales por paciente con líneas por tratamiento y pieza, enviarlos al móvil del paciente para su revisión tranquila en casa y recibir la aceptación con firma electrónica. El seguimiento automático te avisa si el paciente no ha respondido para que puedas reactivar la conversación en el momento oportuno.</p>`,
    howToSteps: [
      "Selecciona la plantilla de Clínica Dental e introduce los datos del paciente.",
      "Añade cada tratamiento indicando la pieza dental, procedimiento, sesiones y coste.",
      "Organiza los tratamientos por prioridad: urgente, necesario y estético-opcional.",
      "Incluye opciones de financiación y condiciones de pago por fases si aplica.",
      "Envía el presupuesto al móvil del paciente para su aceptación con firma electrónica.",
    ],
  },
  {
    slug: "interiorismo",
    nombre: "Interiorismo",
    titulo: "Plantilla de Cotización para Interiorismo y Decoración",
    descripcion: "Presupuesta proyectos de interiorismo: diseño de espacios, selección de mobiliario, materiales y ejecución de reformas decorativas.",
    emoji: "🛋️",
    color: "#AB47BC",
    ejemploLineas: [
      { descripcion: "Consultoría inicial y briefing", cantidad: 1, precio: 200 },
      { descripcion: "Proyecto de diseño interior (planos + 3D)", cantidad: 1, precio: 2500 },
      { descripcion: "Selección de mobiliario y materiales", cantidad: 1, precio: 800 },
      { descripcion: "Gestión de compras y proveedores", cantidad: 1, precio: 600 },
      { descripcion: "Supervisión de obra (4 visitas)", cantidad: 4, precio: 250 },
    ],
    problemas: [
      "Clientes que no visualizan el resultado final",
      "Presupuestos que mezclan diseño y ejecución",
      "Cambios constantes sin actualización de precio",
      "Sin formalización de condiciones y plazos",
    ],
    beneficios: [
      "Fases de diseño y ejecución separadas",
      "Versionado para cambios de materiales",
      "PDF con renders y moodboards incluidos",
      "Firma electrónica para inicio de proyecto",
    ],
    keywords: ["cotización interiorismo", "presupuesto decoración", "cotización diseño interiores", "presupuesto interiorista"],
    icp: {
      cargo: "Interiorista o decorador profesional",
      empresaTipo: "Estudio de interiorismo de 1-8 profesionales",
      dolor: "El cliente cambia de opinión sobre materiales y colores constantemente y el presupuesto nunca refleja la realidad.",
      cita: "Cada vez que el cliente ve algo nuevo en Pinterest quiere cambiarlo todo, y yo no sé cómo cobrarle los cambios.",
    },
    casoDeUso: {
      antes: "Enviaba un presupuesto único que mezclaba honorarios de diseño con coste de mobiliario y ejecución, sin separar fases.",
      despues: "Separa claramente honorarios de diseño, coste de mobiliario y materiales, y supervisión de obra en secciones diferenciadas.",
      resultado: "El cliente entiende qué está pagando en cada fase, los cambios de materiales se gestionan con versiones actualizadas y los honorarios de diseño no se discuten.",
    },
    faqs: [
      {
        pregunta: "¿Puedo separar los honorarios de diseño del coste de mobiliario y obra?",
        respuesta: "Sí, puedes crear secciones independientes para diseño (tus honorarios), mobiliario (coste de piezas), gestión de compras y supervisión de obra.",
      },
      {
        pregunta: "¿Cómo gestiono los cambios de materiales o mobiliario que pide el cliente?",
        respuesta: "Duplicas la cotización, actualizas las líneas afectadas y envías una nueva versión. El cliente aprueba los cambios con firma electrónica.",
      },
      {
        pregunta: "¿Puedo incluir enlaces a moodboards o renders en el presupuesto?",
        respuesta: "Sí, puedes añadir notas con enlaces a tu moodboard o incluir descripciones detalladas de la propuesta estética junto al desglose económico.",
      },
    ],
    featuresEspecificos: [
      { icono: "Home", titulo: "Proyecto por espacios", desc: "Organiza el presupuesto por habitación o zona del proyecto." },
      { icono: "PenTool", titulo: "Diseño vs. ejecución", desc: "Separa claramente honorarios de diseño del coste de obra." },
      { icono: "Layers", titulo: "Versionado de materiales", desc: "Cada cambio de material genera una nueva versión documentada." },
      { icono: "Star", titulo: "Presentación premium", desc: "PDF profesional que refleja la calidad de tu trabajo." },
    ],
    stats: [
      { valor: "10 min", label: "por presupuesto de interiorismo" },
      { valor: "Fases", label: "de diseño y ejecución" },
      { valor: "Versiones", label: "para cada cambio" },
    ],
    guia: `<p>Un proyecto de interiorismo se cotiza de forma muy diferente según su alcance: no es lo mismo un asesoramiento decorativo de unas horas que un proyecto integral que incluye diseño de espacios, selección de mobiliario, dirección de obra y coordinación de gremios. La propuesta debe dejar claro qué fases comprende —concepto, proyecto técnico, shopping list, supervisión de ejecución— y qué entregables recibirá el cliente en cada una.</p>
<p>El interiorista que desglosa su presupuesto en honorarios de diseño y coste estimado de ejecución (mobiliario, textiles, iluminación, reforma) ofrece transparencia total. Es recomendable separar lo que es fee profesional de lo que es inversión en materiales y mano de obra de terceros, indicando si se gestionan las compras por cuenta del cliente o si el estudio aplica un margen de gestión sobre los proveedores.</p>
<p>DealForge permite a estudios de interiorismo crear propuestas por fases con versionado automático, ideal para un sector donde los cambios de concepto y selección de materiales son constantes. El cliente aprueba cada fase con firma electrónica, y tú mantienes un registro claro de las decisiones tomadas durante todo el proceso de diseño.</p>`,
    howToSteps: [
      "Elige la plantilla de Interiorismo y registra los datos del cliente y la ubicación del proyecto.",
      "Estructura la propuesta por fases: concepto, proyecto técnico, selección de materiales y supervisión.",
      "Separa los honorarios de diseño del presupuesto estimado de ejecución y mobiliario.",
      "Detalla los entregables de cada fase: planos, renders, moodboards, shopping list.",
      "Envía la propuesta por fases con firma electrónica para aprobar el inicio del proyecto.",
    ],
  },
  {
    slug: "contabilidad",
    nombre: "Contabilidad y Asesoría",
    titulo: "Plantilla de Cotización para Gestorías y Asesorías",
    descripcion: "Cotiza servicios de contabilidad, asesoría fiscal, laboral y mercantil con tarifas mensuales o por servicio.",
    emoji: "📊",
    color: "#546E7A",
    ejemploLineas: [
      { descripcion: "Contabilidad mensual (hasta 50 facturas)", cantidad: 12, precio: 150 },
      { descripcion: "Declaraciones trimestrales (IVA, IRPF)", cantidad: 4, precio: 120 },
      { descripcion: "Declaración Renta anual", cantidad: 1, precio: 80 },
      { descripcion: "Impuesto de Sociedades", cantidad: 1, precio: 300 },
      { descripcion: "Asesoría laboral (hasta 5 nóminas)", cantidad: 12, precio: 100 },
    ],
    problemas: [
      "Clientes que no entienden qué incluye la tarifa",
      "Sin contrato formal de servicios",
      "Servicios extra no presupuestados",
      "Competir solo por precio mensual",
    ],
    beneficios: [
      "Servicios mensuales vs. puntuales desglosados",
      "Condiciones claras de lo que incluye y no",
      "Renovación anual con firma electrónica",
      "Imagen profesional de la gestoría",
    ],
    keywords: ["cotización gestoría", "presupuesto asesoría fiscal", "cotización contabilidad", "presupuesto gestoría pymes"],
    icp: {
      cargo: "Titular de gestoría o asesor fiscal",
      empresaTipo: "Gestoría o asesoría de 2-15 profesionales",
      dolor: "Los clientes llaman para consultas que no están incluidas en la tarifa y no sabe cómo cobrarlas sin generar conflicto.",
      cita: "El cliente cree que por pagar 150 al mes puede llamarme para cualquier consulta, pero eso no era lo acordado.",
    },
    casoDeUso: {
      antes: "Acordaba la tarifa de palabra y enviaba un email con el precio mensual, sin detallar qué servicios incluía exactamente.",
      despues: "Envía una propuesta formal con servicios incluidos, límites (número de facturas, nóminas), servicios extra y precio de cada uno.",
      resultado: "Los clientes saben exactamente qué incluye su tarifa, los servicios extra se cobran sin conflicto y las renovaciones se formalizan cada año.",
    },
    faqs: [
      {
        pregunta: "¿Puedo detallar exactamente qué incluye la tarifa mensual y qué no?",
        respuesta: "Sí, puedes listar cada servicio incluido (contabilidad, declaraciones, nóminas) con sus límites y añadir notas sobre qué se considera servicio extra.",
      },
      {
        pregunta: "¿Cómo cotizo servicios puntuales como constitución de sociedades?",
        respuesta: "Puedes añadir líneas para servicios puntuales con precio unitario. El mismo documento puede mezclar servicios recurrentes y puntuales.",
      },
      {
        pregunta: "¿Se puede usar para renovaciones anuales de la cartera de clientes?",
        respuesta: "Sí, puedes duplicar la cotización del año anterior, actualizar precios si es necesario y enviar la renovación con firma electrónica.",
      },
    ],
    featuresEspecificos: [
      { icono: "Calculator", titulo: "Tarifa mensual detallada", desc: "Desglosa qué incluye y qué no incluye la cuota mensual." },
      { icono: "FileText", titulo: "Servicios extras claros", desc: "Define el precio de cada servicio adicional fuera de tarifa." },
      { icono: "Briefcase", titulo: "Renovación anual", desc: "Renueva contratos cada año con un clic y firma electrónica." },
      { icono: "BarChart", titulo: "Gestión de cartera", desc: "Historial de propuestas y contratos por cada cliente." },
    ],
    stats: [
      { valor: "5 min", label: "por propuesta de asesoría" },
      { valor: "Mensual", label: "con límites definidos" },
      { valor: "Renovación", label: "anual digitalizada" },
    ],
    guia: `<p>Las asesorías y despachos de contabilidad operan mayoritariamente con cuotas mensuales que cubren un paquete de servicios recurrentes: contabilidad, declaraciones fiscales trimestrales, confección de cuentas anuales, gestión de nóminas y asesoramiento laboral. La propuesta de servicios debe especificar con precisión qué incluye la cuota mensual y qué servicios se facturan aparte, como constitución de sociedades, inspecciones tributarias o informes periciales.</p>
<p>Un error frecuente es ofrecer una cuota genérica sin definir límites: número de asientos contables, empleados en nómina, declaraciones incluidas o consultas mensuales. Cuando estos límites no están claros, surgen fricciones al cobrar servicios adicionales que el cliente creía cubiertos. Detallar los servicios bonificados con un IRPF, IVA, Impuesto de Sociedades y Modelo 347 da claridad al autónomo o PYME que evalúa tu oferta.</p>
<p>Con DealForge puedes crear propuestas de asesoría fiscal y contable con servicios mensuales desglosados, cálculo automático de la cuota anual y renovación digital del contrato. El cliente firma electrónicamente el acuerdo de servicios, y tú tienes un registro documental de lo pactado que protege a ambas partes ante cualquier discrepancia futura.</p>`,
    howToSteps: [
      "Abre la plantilla de Contabilidad e introduce los datos del cliente (autónomo o sociedad).",
      "Define los servicios incluidos en la cuota mensual: contabilidad, fiscalidad, nóminas, laboral.",
      "Establece los límites del servicio: asientos, empleados, declaraciones y consultas incluidas.",
      "Indica los servicios adicionales con precio por unidad fuera de la cuota mensual.",
      "Envía la propuesta de asesoría con firma electrónica para formalizar el contrato anual.",
    ],
  },
  {
    slug: "veterinaria",
    nombre: "Veterinaria",
    titulo: "Plantilla de Cotización para Clínicas Veterinarias",
    descripcion: "Genera presupuestos veterinarios: cirugías, tratamientos, vacunaciones y planes de salud para mascotas.",
    emoji: "🐾",
    color: "#66BB6A",
    ejemploLineas: [
      { descripcion: "Consulta y exploración", cantidad: 1, precio: 40 },
      { descripcion: "Analítica completa (sangre + orina)", cantidad: 1, precio: 85 },
      { descripcion: "Ecografía abdominal", cantidad: 1, precio: 70 },
      { descripcion: "Cirugía esterilización", cantidad: 1, precio: 250 },
      { descripcion: "Hospitalización (por día)", cantidad: 2, precio: 45 },
    ],
    problemas: [
      "Dueños que necesitan conocer el coste antes de decidir",
      "Presupuestos verbales que generan malentendidos",
      "Sin seguimiento de tratamientos pendientes",
      "Falta de opciones (básico vs. completo)",
    ],
    beneficios: [
      "Tratamientos desglosados y comprensibles",
      "Opciones de plan básico y premium",
      "Aceptación digital del presupuesto",
      "Historial de tratamientos por paciente",
    ],
    keywords: ["presupuesto veterinario", "cotización clínica veterinaria", "presupuesto cirugía mascota", "cotización veterinaria"],
    icp: {
      cargo: "Veterinario titular o responsable de clínica",
      empresaTipo: "Clínica veterinaria de 1-5 veterinarios",
      dolor: "Los propietarios necesitan saber el coste antes de autorizar un procedimiento y si no lo ven claro, se van a otra clínica.",
      cita: "El dueño se fue a pensarlo y no volvió. Después me enteré de que fue a otra clínica que le mandó el presupuesto por email al momento.",
    },
    casoDeUso: {
      antes: "Explicaba el plan de tratamiento de palabra en la consulta y daba un precio aproximado que el propietario a veces olvidaba.",
      despues: "Envía el presupuesto por email después de la consulta con cada procedimiento detallado, opciones de tratamiento y aceptación digital.",
      resultado: "Los propietarios revisan el presupuesto en casa con calma, la clínica hace seguimiento cuando lo abren y más pacientes completan sus tratamientos.",
    },
    faqs: [
      {
        pregunta: "¿Puedo ofrecer opciones de tratamiento básico y completo?",
        respuesta: "Sí, puedes crear versiones o líneas opcionales con diferentes niveles: por ejemplo, analítica básica vs. completa, o cirugía con o sin hospitalización.",
      },
      {
        pregunta: "¿Cómo presento planes de salud anuales con vacunas y revisiones?",
        respuesta: "Puedes crear un presupuesto con todas las vacunas, desparasitaciones y revisiones del año como líneas individuales, mostrando el ahorro frente al precio suelto.",
      },
      {
        pregunta: "¿El propietario puede autorizar la cirugía sin venir a la clínica?",
        respuesta: "Sí, recibe el presupuesto por email y puede autorizarlo con firma electrónica desde su móvil. Queda constancia legal del consentimiento.",
      },
    ],
    featuresEspecificos: [
      { icono: "Heart", titulo: "Tratamientos claros", desc: "Explica cada procedimiento en lenguaje comprensible para el propietario." },
      { icono: "Layers", titulo: "Opciones de tratamiento", desc: "Presenta alternativas básico vs. completo para que el dueño elija." },
      { icono: "Mail", titulo: "Envío inmediato", desc: "Envía el presupuesto por email justo después de la consulta." },
      { icono: "BookOpen", titulo: "Historial del paciente", desc: "Consulta presupuestos anteriores de cada animal." },
    ],
    stats: [
      { valor: "3 min", label: "por presupuesto veterinario" },
      { valor: "Opciones", label: "de tratamiento claras" },
      { valor: "Firma", label: "de autorización digital" },
    ],
    guia: `<p>El presupuesto veterinario tiene una dimensión emocional que lo diferencia de otros sectores: el propietario de la mascota necesita entender qué procedimientos se realizarán, por qué son necesarios y cuánto costará cada uno, todo en un momento de preocupación por la salud de su animal. Un presupuesto claro que distinga entre diagnóstico (consulta, analítica, radiografía, ecografía), tratamiento (cirugía, medicación, hospitalización) y seguimiento reduce la ansiedad del cliente y facilita la toma de decisiones.</p>
<p>Para intervenciones quirúrgicas, conviene detallar preanestesia, anestesia, material quirúrgico, hospitalización y revisiones postoperatorias como líneas independientes. Si existen alternativas terapéuticas —tratamiento conservador vs. quirúrgico, por ejemplo— presentarlas en el mismo presupuesto con sus pros y costes respectivos empodera al propietario para elegir con información completa.</p>
<p>DealForge permite a clínicas veterinarias generar presupuestos por paciente animal, enviados al móvil del propietario para que los revise con calma. La firma electrónica sirve como consentimiento informado, y el seguimiento automático te notifica si el propietario no ha respondido para poder contactarle y resolver sus dudas.</p>`,
    howToSteps: [
      "Selecciona la plantilla de Veterinaria e introduce los datos del propietario y del animal.",
      "Desglosa el presupuesto por fases: diagnóstico, tratamiento, hospitalización y seguimiento.",
      "Si hay alternativas terapéuticas, preséntalas como opciones comparables en el mismo documento.",
      "Incluye el consentimiento informado y las condiciones de pago en las notas.",
      "Envía el presupuesto al propietario y recoge su autorización con firma electrónica.",
    ],
  },
  {
    slug: "automocion",
    nombre: "Automoción",
    titulo: "Plantilla de Cotización para Talleres Mecánicos y Automoción",
    descripcion: "Crea presupuestos de reparación, mantenimiento, ITV y servicios de automoción con desglose de piezas y mano de obra.",
    emoji: "🚗",
    color: "#D32F2F",
    ejemploLineas: [
      { descripcion: "Diagnóstico electrónico", cantidad: 1, precio: 45 },
      { descripcion: "Cambio kit distribución", cantidad: 1, precio: 380 },
      { descripcion: "Sustitución pastillas freno delanteras", cantidad: 1, precio: 120 },
      { descripcion: "Cambio aceite + filtros (revisión completa)", cantidad: 1, precio: 95 },
      { descripcion: "Alineación y equilibrado", cantidad: 1, precio: 60 },
    ],
    problemas: [
      "Presupuestos verbales que el cliente olvida o malinterpreta",
      "Piezas y mano de obra mezcladas sin desglose claro",
      "Clientes que comparan precios sin entender la calidad de las piezas",
      "Sin registro histórico de reparaciones por vehículo",
    ],
    beneficios: [
      "Desglose separado de piezas OEM/aftermarket y mano de obra",
      "Historial completo de reparaciones por matrícula",
      "Aprobación del cliente antes de iniciar la reparación",
      "PDF profesional con garantía de piezas incluida",
    ],
    keywords: ["presupuesto taller mecánico", "cotización reparación coche", "presupuesto automoción", "cotización taller", "presupuesto mantenimiento vehículo"],
    icp: {
      cargo: "Propietario de taller mecánico",
      empresaTipo: "Taller mecánico independiente de 2-15 empleados",
      dolor: "Pierde tiempo haciendo presupuestos a mano en la recepción mientras los coches esperan en el elevador.",
      cita: "El cliente me pide el presupuesto por WhatsApp, se lo mando en un mensaje y luego no recuerda lo que le dije.",
    },
    casoDeUso: {
      antes: "Apuntaba las reparaciones en un bloc de notas, calculaba de memoria y le decía el precio al cliente por teléfono.",
      despues: "Selecciona las piezas del catálogo, el sistema calcula automáticamente y envía un PDF profesional con garantía incluida.",
      resultado: "Los clientes aprueban el presupuesto desde el móvil antes de dejar el coche, evitando malentendidos sobre el coste.",
    },
    faqs: [
      { pregunta: "¿Puedo diferenciar entre piezas originales y compatibles en el presupuesto?", respuesta: "Sí, puedes crear líneas separadas para cada tipo de pieza e incluso ofrecer dos opciones al cliente: una con piezas OEM y otra con aftermarket, cada una con su precio." },
      { pregunta: "¿Se puede vincular el presupuesto a una matrícula o cliente?", respuesta: "Cada cotización se asocia a un cliente en tu base de datos. Puedes añadir la matrícula en las notas o en la descripción, y así tendrás un historial completo de reparaciones." },
      { pregunta: "¿Cómo gestiono los trabajos adicionales que surgen durante la reparación?", respuesta: "Puedes crear una nueva versión del presupuesto añadiendo las líneas extra y enviársela al cliente para aprobación con firma electrónica antes de continuar." },
    ],
    featuresEspecificos: [
      { icono: "Wrench", titulo: "Catálogo de piezas", desc: "Piezas con precios actualizados por marca y modelo" },
      { icono: "Clock", titulo: "Tiempos de mano de obra", desc: "Baremos de tiempo por tipo de reparación" },
      { icono: "FileText", titulo: "Garantía incluida", desc: "Condiciones de garantía en cada presupuesto" },
      { icono: "History", titulo: "Historial por vehículo", desc: "Todas las reparaciones de cada cliente" },
    ],
    stats: [
      { valor: "5 min", label: "por presupuesto de reparación" },
      { valor: "Piezas", label: "con precios actualizados" },
      { valor: "Garantía", label: "incluida en el PDF" },
    ],
    guia: `<p>En el sector de automoción —talleres mecánicos, carrocerías, centros de ITV y concesionarios— el presupuesto de reparación debe especificar cada pieza con su referencia y precio, las horas de mano de obra estimadas según baremos del fabricante y los trabajos auxiliares como diagnóstico electrónico, alineado o equilibrado. El cliente valora enormemente saber si las piezas son originales, equivalentes o reconstruidas, ya que esto afecta tanto al precio como a la garantía.</p>
<p>Para reparaciones complejas tras un siniestro, el presupuesto debe estar estructurado de forma que la compañía aseguradora pueda validarlo: separando chapa, pintura, mecánica, neumáticos y cristales. Los talleres que presentan presupuestos digitales profesionales cierran más reparaciones porque transmiten confianza al conductor, que a menudo desconoce los precios de mercado y teme que le cobren de más.</p>
<p>DealForge permite a talleres de automoción crear presupuestos de reparación con referencias de piezas, tiempos de mano de obra y garantías por escrito. El cliente recibe el presupuesto en su móvil, lo compara cómodamente y autoriza la reparación con firma electrónica antes de que el taller empiece a trabajar.</p>`,
    howToSteps: [
      "Abre la plantilla de Automoción e introduce los datos del cliente y del vehículo (marca, modelo, matrícula).",
      "Detalla las piezas necesarias con referencia, tipo (original/equivalente) y precio unitario.",
      "Indica las horas de mano de obra por operación según los baremos del fabricante.",
      "Incluye la garantía de reparación y piezas, y las condiciones de almacenaje si aplica.",
      "Envía el presupuesto al cliente y recibe su autorización de reparación con firma electrónica.",
    ],
  },
  {
    slug: "inmobiliaria",
    nombre: "Inmobiliaria",
    titulo: "Plantilla de Cotización para Inmobiliarias y Agentes",
    descripcion: "Genera propuestas de servicios inmobiliarios: valoraciones, honorarios de gestión, planes de marketing de propiedades y condiciones de venta.",
    emoji: "🏠",
    color: "#1565C0",
    ejemploLineas: [
      { descripcion: "Valoración profesional del inmueble", cantidad: 1, precio: 300 },
      { descripcion: "Plan de marketing (fotos + vídeo + portales)", cantidad: 1, precio: 500 },
      { descripcion: "Home staging básico", cantidad: 1, precio: 400 },
      { descripcion: "Gestión de visitas y negociación", cantidad: 1, precio: 0 },
      { descripcion: "Honorarios de venta (% sobre precio final)", cantidad: 1, precio: 4500 },
    ],
    problemas: [
      "Propietarios que no entienden el valor de los servicios inmobiliarios",
      "Honorarios presentados verbalmente sin respaldo profesional",
      "Competencia con portales gratuitos y agentes low-cost",
      "Sin formalización de los servicios incluidos en la comisión",
    ],
    beneficios: [
      "Propuesta de servicios con desglose de cada acción incluida",
      "Plan de marketing visual que justifica los honorarios",
      "Mandato de venta con firma electrónica inmediata",
      "Seguimiento automático de propuestas pendientes",
    ],
    keywords: ["cotización inmobiliaria", "propuesta agente inmobiliario", "presupuesto servicios inmobiliarios", "honorarios inmobiliaria"],
    icp: {
      cargo: "Agente inmobiliario",
      empresaTipo: "Agencia inmobiliaria independiente o franquicia local",
      dolor: "Pierde captaciones porque el propietario no percibe el valor de pagar una comisión frente a vender por su cuenta.",
      cita: "Cuando le presento mis servicios de forma profesional con todo detallado, el propietario entiende por qué merece la pena trabajar conmigo.",
    },
    casoDeUso: {
      antes: "Explicaba los servicios de viva voz en la captación y dejaba un folleto genérico. Muchos propietarios comparaban solo por comisión.",
      despues: "Envía una propuesta personalizada con plan de marketing, servicios incluidos y condiciones claras. El propietario firma el mandato desde su móvil.",
      resultado: "Mayor tasa de captación porque los propietarios ven claramente el valor de cada servicio antes de decidir.",
    },
    faqs: [
      { pregunta: "¿Puedo incluir diferentes modalidades de honorarios en la misma propuesta?", respuesta: "Sí, puedes crear varias opciones: honorarios fijos, porcentaje sobre venta, o combinación. El propietario ve las alternativas y elige la que prefiere." },
      { pregunta: "¿Se puede adaptar la propuesta según el tipo de propiedad?", respuesta: "Cada propuesta se personaliza con los servicios específicos para esa propiedad: si es un piso, local comercial, o chalet, los servicios y el plan de marketing varían." },
      { pregunta: "¿Cómo gestiono el mandato de venta con firma electrónica?", respuesta: "Una vez que el propietario acepta tu propuesta, puedes enviarle el mandato de venta para que lo firme electrónicamente con validez legal según eIDAS." },
    ],
    featuresEspecificos: [
      { icono: "Home", titulo: "Propuestas por propiedad", desc: "Plan de marketing adaptado a cada inmueble" },
      { icono: "PenTool", titulo: "Mandato con firma digital", desc: "Captación formalizada en minutos" },
      { icono: "Camera", titulo: "Servicios visuales", desc: "Fotos, vídeo y home staging detallados" },
      { icono: "Target", titulo: "Seguimiento de captación", desc: "Sabe qué propietarios han visto tu propuesta" },
    ],
    stats: [
      { valor: "10 min", label: "por propuesta personalizada" },
      { valor: "Mandato", label: "firmado digitalmente" },
      { valor: "Plan", label: "de marketing incluido" },
    ],
    guia: `<p>La propuesta de servicios inmobiliarios —ya sea para la venta, alquiler o gestión de propiedades— debe diferenciarse de la competencia en un mercado donde muchos agentes ofrecen lo mismo. El mandato de venta o exclusiva necesita detallar los servicios que incluye: valoración profesional, sesión fotográfica, vídeo o tour virtual, publicación en portales, gestión de visitas, negociación y acompañamiento hasta la firma en notaría.</p>
<p>Para el propietario que evalúa entre varios agentes, ver un desglose claro del plan de comercialización con los portales donde se publicará, el tipo de material visual que se producirá y la estrategia de precios resulta mucho más convincente que una simple hoja con la comisión. Incluir un análisis comparativo de mercado (ACM) con propiedades similares vendidas recientemente refuerza la credibilidad de la valoración propuesta.</p>
<p>DealForge permite a agencias inmobiliarias crear propuestas de servicio profesionales con el plan de marketing incluido, honorarios transparentes y mandato de venta con firma electrónica. El propietario aprueba el encargo desde su dispositivo, y la agencia puede empezar a comercializar el inmueble de inmediato con respaldo documental.</p>`,
    howToSteps: [
      "Selecciona la plantilla Inmobiliaria e introduce los datos del propietario y del inmueble.",
      "Detalla los servicios incluidos: valoración, fotografía, publicación en portales, visitas y negociación.",
      "Establece las condiciones del mandato: tipo de exclusiva, duración, comisión y forma de pago.",
      "Adjunta un resumen del plan de comercialización y el análisis comparativo de mercado.",
      "Envía la propuesta con mandato de venta integrado para firma electrónica del propietario.",
    ],
  },
  {
    slug: "restauracion",
    nombre: "Restauración",
    titulo: "Plantilla de Cotización para Restaurantes y Catering",
    descripcion: "Presupuesta servicios de catering, menús para eventos, alquiler de espacio y servicios de restauración a empresas.",
    emoji: "🍽️",
    color: "#BF360C",
    ejemploLineas: [
      { descripcion: "Menú cocktail (canapés variados, 80 pax)", cantidad: 80, precio: 28 },
      { descripcion: "Barra libre premium (3 horas)", cantidad: 80, precio: 15 },
      { descripcion: "Personal de servicio (6 camareros)", cantidad: 6, precio: 120 },
      { descripcion: "Menaje y cristalería", cantidad: 1, precio: 350 },
      { descripcion: "Montaje y desmontaje", cantidad: 1, precio: 400 },
    ],
    problemas: [
      "Cambios de menú constantes que modifican el presupuesto",
      "Clientes que no confirman número de comensales hasta el último momento",
      "Presupuestos por email que se pierden entre conversaciones",
      "Sin condiciones claras de cancelación o modificaciones",
    ],
    beneficios: [
      "Menús con precio por comensal claramente desglosado",
      "Versionado rápido cuando cambian menú o número de personas",
      "Confirmación formal con firma electrónica y condiciones",
      "Seguimiento automático de presupuestos pendientes",
    ],
    keywords: ["presupuesto catering", "cotización restaurante", "presupuesto menú evento", "cotización catering empresa", "presupuesto banquete"],
    icp: {
      cargo: "Chef ejecutivo o director de catering",
      empresaTipo: "Empresa de catering o restaurante con servicio a eventos",
      dolor: "Recibe peticiones de presupuesto por WhatsApp, cambian el menú tres veces y al final no recuerda qué versión aceptó el cliente.",
      cita: "Cada evento es diferente y necesito poder adaptar el presupuesto rápido sin empezar de cero cada vez.",
    },
    casoDeUso: {
      antes: "Enviaba presupuestos por email con un Word adjunto. Cuando el cliente pedía cambios, duplicaba el archivo y perdía la pista de qué versión era la última.",
      despues: "Crea el presupuesto, el cliente pide cambios de menú, genera una nueva versión en un clic y el cliente aprueba con firma electrónica.",
      resultado: "Gestión de eventos más ágil con todas las versiones trazadas y condiciones de cancelación aceptadas formalmente.",
    },
    faqs: [
      { pregunta: "¿Puedo crear diferentes opciones de menú en el mismo presupuesto?", respuesta: "Puedes crear varias cotizaciones con diferentes propuestas de menú para el mismo evento y enviarlas al cliente para que compare y elija." },
      { pregunta: "¿Cómo reflejo el precio por comensal con servicios adicionales?", respuesta: "Crea líneas separadas: menú por persona, barra libre por persona, y servicios fijos como montaje o personal. El cliente ve claramente cada componente." },
      { pregunta: "¿Puedo incluir condiciones de cancelación y fecha límite de confirmación?", respuesta: "Sí, en las condiciones de la cotización puedes especificar política de cancelación, fecha límite para confirmar el número de comensales y condiciones de pago." },
    ],
    featuresEspecificos: [
      { icono: "Users", titulo: "Precio por comensal", desc: "Cálculo automático según número de personas" },
      { icono: "RefreshCw", titulo: "Versiones de menú", desc: "Cambia el menú y genera nueva versión al instante" },
      { icono: "Calendar", titulo: "Plazos y confirmación", desc: "Fecha límite de confirmación incluida" },
      { icono: "FileText", titulo: "Condiciones claras", desc: "Cancelación y pago formalizados" },
    ],
    stats: [
      { valor: "Menús", label: "con precio por comensal" },
      { valor: "Versiones", label: "ilimitadas por evento" },
      { valor: "Firma", label: "del cliente antes del evento" },
    ],
    guia: `<p>Los negocios de restauración y catering afrontan un reto particular al presupuestar: cada evento es diferente en número de comensales, tipo de menú, restricciones alimentarias, montaje de sala y servicios complementarios como barra libre, cocktail de bienvenida o show cooking. La cotización debe presentar el precio por comensal desglosando cada concepto para que el cliente pueda ajustar su evento a su presupuesto real.</p>
<p>En catering para bodas, comuniones o eventos corporativos, es habitual ofrecer varias opciones de menú con distintos niveles de precio. Cada opción debe detallar los platos, las bebidas incluidas, el servicio de camareros, la vajilla y mantelería, y los extras opcionales. Indicar claramente los mínimos de comensales, los recargos por menús especiales (celiacos, veganos) y las condiciones de confirmación de asistentes evita malentendidos de última hora.</p>
<p>DealForge permite a restaurantes y empresas de catering montar presupuestos por evento con distintas opciones de menú, cálculo automático según número de comensales y versionado para cada modificación que pida el cliente. La firma electrónica formaliza el encargo y el calendario de pagos queda documentado para ambas partes.</p>`,
    howToSteps: [
      "Elige la plantilla de Restauración e introduce los datos del cliente y la fecha del evento.",
      "Configura las opciones de menú con precio por comensal, detallando platos y bebidas.",
      "Añade servicios complementarios: cocktail, barra libre, montaje de sala, decoración.",
      "Indica el mínimo de comensales, recargos por menús especiales y fecha límite de confirmación.",
      "Envía las opciones de menú al cliente y recoge su elección con firma electrónica.",
    ],
  },
  {
    slug: "abogados",
    nombre: "Abogados",
    titulo: "Plantilla de Cotización para Despachos de Abogados",
    descripcion: "Genera presupuestos de honorarios legales: asesoramiento, litigios, contratos, servicios corporativos y trámites administrativos.",
    emoji: "⚖️",
    color: "#37474F",
    ejemploLineas: [
      { descripcion: "Consulta inicial y estudio del caso", cantidad: 1, precio: 150 },
      { descripcion: "Redacción de contrato mercantil", cantidad: 1, precio: 600 },
      { descripcion: "Negociación y revisión (por hora)", cantidad: 5, precio: 120 },
      { descripcion: "Representación en procedimiento judicial", cantidad: 1, precio: 2500 },
      { descripcion: "Gestión de poderes y trámites", cantidad: 1, precio: 200 },
    ],
    problemas: [
      "Clientes que no entienden la estructura de honorarios por horas vs. fijo",
      "Presupuestos verbales que generan disputas sobre el alcance del servicio",
      "Falta de formalización del encargo profesional antes de empezar",
      "Dificultad para presupuestar procedimientos con duración incierta",
    ],
    beneficios: [
      "Honorarios desglosados por servicio o por hora con máximos",
      "Hoja de encargo profesional con firma electrónica",
      "Condiciones de provisión de fondos incluidas",
      "Imagen de despacho profesional y moderno",
    ],
    keywords: ["presupuesto abogado", "cotización despacho abogados", "honorarios abogado", "presupuesto servicios legales", "cotización asesoría jurídica"],
    icp: {
      cargo: "Socio o abogado titular",
      empresaTipo: "Despacho de abogados de 1-20 profesionales",
      dolor: "Dedica tiempo a preparar presupuestos detallados que luego el cliente no responde, y no tiene forma de hacer seguimiento.",
      cita: "Necesito que el cliente entienda qué incluye y qué no antes de empezar, para evitar conflictos sobre los honorarios después.",
    },
    casoDeUso: {
      antes: "Enviaba un email explicando los honorarios en texto libre. El cliente no siempre entendía el alcance y surgían disputas sobre servicios no presupuestados.",
      despues: "Envía un presupuesto con cada servicio desglosado, condiciones de provisión de fondos y hoja de encargo que el cliente firma electrónicamente.",
      resultado: "Relación profesional formalizada desde el primer día, con expectativas claras y menos disputas sobre honorarios.",
    },
    faqs: [
      { pregunta: "¿Puedo presupuestar con tarifas por hora y con un máximo?", respuesta: "Sí, puedes crear líneas con tarifa horaria estimando un número de horas, y en las condiciones indicar un importe máximo que no se superará sin aprobación previa del cliente." },
      { pregunta: "¿Cómo gestiono la provisión de fondos?", respuesta: "En las condiciones de la cotización puedes especificar el importe de provisión de fondos, plazos de pago y condiciones. El cliente acepta todo con la firma electrónica." },
      { pregunta: "¿Se puede usar como hoja de encargo profesional?", respuesta: "La cotización con firma electrónica funciona como acuerdo de encargo profesional. Incluye servicios, honorarios, condiciones y la aceptación formal del cliente." },
    ],
    featuresEspecificos: [
      { icono: "Scale", titulo: "Honorarios claros", desc: "Por hora, fijo o mixto con máximos" },
      { icono: "FileCheck", titulo: "Hoja de encargo", desc: "Formaliza la relación desde el primer día" },
      { icono: "Banknote", titulo: "Provisión de fondos", desc: "Condiciones de pago anticipado incluidas" },
      { icono: "Shield", titulo: "Confidencialidad", desc: "Datos del cliente protegidos" },
    ],
    stats: [
      { valor: "Encargo", label: "profesional formalizado" },
      { valor: "Honorarios", label: "desglosados con claridad" },
      { valor: "Firma", label: "electrónica con validez legal" },
    ],
    guia: `<p>La hoja de encargo profesional de un despacho de abogados cumple una doble función: formaliza la relación abogado-cliente y detalla los honorarios de forma transparente. La normativa del Estatuto General de la Abogacía exige que el letrado informe previamente al cliente sobre los honorarios, y un documento bien estructurado protege a ambas partes ante posibles discrepancias futuras sobre el alcance de la representación o el coste del servicio.</p>
<p>Los honorarios pueden pactarse de distintas formas: precio fijo por asunto, tarifa horaria con estimación de horas, provisión de fondos con liquidación posterior o cuota litis en determinados casos. La hoja de encargo debe especificar qué actuaciones cubre (demanda, contestación, recursos, vistas), qué gastos van aparte (procurador, tasas judiciales, peritos) y en qué momentos se realizarán los pagos. Para servicios de asesoría continuada, la cuota mensual debe delimitar el número de consultas y el tipo de materias cubiertas.</p>
<p>DealForge permite a abogados y despachos jurídicos crear hojas de encargo profesionales con honorarios estructurados, enviarlas al cliente con firma electrónica de plena validez legal y mantener un registro digital del consentimiento informado que exige la normativa deontológica.</p>`,
    howToSteps: [
      "Abre la plantilla de Abogados e introduce los datos del cliente y el asunto jurídico.",
      "Detalla las actuaciones incluidas en el encargo: asesoramiento, redacción, representación procesal.",
      "Establece la modalidad de honorarios: precio fijo, tarifa horaria, provisión de fondos o cuota litis.",
      "Separa los gastos de terceros (procurador, tasas, peritos) de los honorarios del despacho.",
      "Envía la hoja de encargo profesional con firma electrónica para formalizar la relación.",
    ],
  },
  {
    slug: "nutricion",
    nombre: "Nutrición y Dietética",
    titulo: "Plantilla de Cotización para Nutricionistas y Dietistas",
    descripcion: "Presupuesta planes nutricionales, seguimientos dietéticos, programas de pérdida de peso y asesoramiento deportivo.",
    emoji: "🥗",
    color: "#43A047",
    ejemploLineas: [
      { descripcion: "Consulta inicial + valoración antropométrica", cantidad: 1, precio: 60 },
      { descripcion: "Plan nutricional personalizado", cantidad: 1, precio: 80 },
      { descripcion: "Seguimiento mensual (4 visitas)", cantidad: 4, precio: 40 },
      { descripcion: "Lista de la compra semanal personalizada", cantidad: 4, precio: 15 },
      { descripcion: "Plan de menús semanal (4 semanas)", cantidad: 4, precio: 25 },
    ],
    problemas: [
      "Pacientes que comparan solo el precio de la primera consulta",
      "Programas de seguimiento sin formalizar que se abandonan",
      "Sin presupuesto claro de lo que incluye cada plan",
      "Dificultad para comunicar el valor del seguimiento a largo plazo",
    ],
    beneficios: [
      "Planes con todas las sesiones y servicios detallados",
      "Diferentes opciones: básico, estándar y premium",
      "Compromiso formalizado con firma electrónica",
      "Seguimiento de pacientes que aceptan vs. los que no responden",
    ],
    keywords: ["presupuesto nutricionista", "cotización dietista", "presupuesto plan nutricional", "cotización nutrición deportiva"],
    icp: {
      cargo: "Nutricionista o dietista clínico",
      empresaTipo: "Consulta de nutrición privada o centro de bienestar",
      dolor: "Muchos pacientes vienen a la primera consulta pero no se comprometen con el seguimiento porque no ven claro qué incluye.",
      cita: "Si el paciente ve desde el principio todo lo que va a recibir durante los 3 meses, se compromete mucho más con el proceso.",
    },
    casoDeUso: {
      antes: "Explicaba los precios verbalmente en la primera consulta. Muchos pacientes no volvían al seguimiento porque no entendían el valor del programa completo.",
      despues: "Presenta un presupuesto con el programa completo de 3 meses: consultas, planes, seguimientos. El paciente acepta digitalmente y se compromete.",
      resultado: "Mayor adherencia al programa nutricional porque el paciente ve el recorrido completo y se compromete formalmente desde el inicio.",
    },
    faqs: [
      { pregunta: "¿Puedo ofrecer diferentes packs nutricionales?", respuesta: "Sí, puedes crear varias cotizaciones con diferentes niveles: un plan básico con consultas y dieta, uno intermedio con seguimiento semanal, y uno premium con menús y lista de compra." },
      { pregunta: "¿Se pueden incluir sesiones online y presenciales?", respuesta: "Cada línea del presupuesto puede indicar si la consulta es presencial u online, con precios diferentes si lo deseas. El paciente ve claramente qué modalidad contrata." },
      { pregunta: "¿Cómo formalizo el compromiso del paciente?", respuesta: "Con la firma electrónica, el paciente acepta el programa completo antes de empezar. Esto aumenta el compromiso y reduce los abandonos." },
    ],
    featuresEspecificos: [
      { icono: "Apple", titulo: "Planes nutricionales", desc: "Presupuestos con sesiones y servicios claros" },
      { icono: "Repeat", titulo: "Seguimiento incluido", desc: "Visitas mensuales detalladas en el plan" },
      { icono: "Layers", titulo: "Opciones de pack", desc: "Básico, estándar y premium para elegir" },
      { icono: "CheckCircle", titulo: "Compromiso formal", desc: "Firma electrónica que reduce abandonos" },
    ],
    stats: [
      { valor: "Packs", label: "con servicios detallados" },
      { valor: "3 meses", label: "de seguimiento incluido" },
      { valor: "Firma", label: "de compromiso del paciente" },
    ],
    guia: `<p>Los profesionales de la nutrición y la dietética —nutricionistas, dietistas y coaches de alimentación— trabajan con programas de acompañamiento que combinan consultas, planes alimentarios personalizados, seguimiento semanal y educación nutricional. El presupuesto debe reflejar esta estructura por programas en lugar de limitarse a un precio por consulta suelta, ya que los resultados sostenibles requieren compromiso temporal por parte del paciente.</p>
<p>Ofrecer packs de diferente duración —programa de 4, 8 o 12 semanas— con distintos niveles de acompañamiento permite al paciente elegir según su objetivo y su capacidad económica. Cada pack debe especificar el número de consultas presenciales u online, los planes de alimentación que se entregarán, si incluye análisis de composición corporal (bioimpedancia), lista de la compra personalizada y disponibilidad para resolver dudas entre sesiones vía mensajería.</p>
<p>DealForge facilita a nutricionistas la creación de propuestas con packs de servicios claros, cálculo de precios con descuento por programa frente a sesión individual y envío digital al paciente. La firma electrónica actúa como compromiso formal del paciente con el programa, lo que mejora la adherencia y reduce las cancelaciones de última hora.</p>`,
    howToSteps: [
      "Selecciona la plantilla de Nutrición e introduce los datos del paciente.",
      "Configura los packs de acompañamiento nutricional con duración, consultas y servicios incluidos.",
      "Indica si incluye análisis corporal, planes alimentarios, lista de la compra y soporte entre sesiones.",
      "Ofrece varias opciones de programa para que el paciente elija según su objetivo y presupuesto.",
      "Envía la propuesta y formaliza el compromiso del paciente con firma electrónica.",
    ],
  },
  {
    slug: "ecommerce",
    nombre: "E-commerce",
    titulo: "Plantilla de Cotización para Tiendas Online y E-commerce",
    descripcion: "Cotiza proyectos de tienda online: diseño, desarrollo, integración de pasarelas de pago, logística y mantenimiento de e-commerce.",
    emoji: "🛒",
    color: "#7B1FA2",
    ejemploLineas: [
      { descripcion: "Diseño UX/UI tienda online", cantidad: 1, precio: 2500 },
      { descripcion: "Desarrollo Shopify/WooCommerce", cantidad: 1, precio: 3500 },
      { descripcion: "Integración pasarela de pago (Stripe/Redsys)", cantidad: 1, precio: 500 },
      { descripcion: "Carga de catálogo (hasta 200 productos)", cantidad: 200, precio: 5 },
      { descripcion: "Configuración de envíos y logística", cantidad: 1, precio: 400 },
    ],
    problemas: [
      "Clientes que no entienden la diferencia entre plataformas (Shopify vs WooCommerce vs custom)",
      "Presupuestos que no incluyen costes recurrentes (hosting, mantenimiento, comisiones)",
      "Alcance del proyecto difuso que genera scope creep",
      "Sin desglose de integraciones y sus costes",
    ],
    beneficios: [
      "Comparativa de plataformas con pros/contras en la propuesta",
      "Costes iniciales vs. recurrentes separados claramente",
      "Fases de proyecto con milestones y pagos asociados",
      "Condiciones de mantenimiento post-lanzamiento definidas",
    ],
    keywords: ["presupuesto tienda online", "cotización e-commerce", "presupuesto Shopify", "cotización WooCommerce", "presupuesto desarrollo ecommerce"],
    icp: {
      cargo: "Emprendedor o director de marca",
      empresaTipo: "Marca o negocio que quiere vender online por primera vez",
      dolor: "No sabe qué plataforma elegir ni cuánto debería costar realmente una tienda online profesional.",
      cita: "Quiero entender exactamente qué estoy pagando y qué costes tendré después del lanzamiento, no solo el desarrollo.",
    },
    casoDeUso: {
      antes: "Pedía presupuestos a varias agencias y recibía cifras dispares sin entender qué incluía cada una. Elegía la más barata y luego venían los extras.",
      despues: "Recibe una propuesta con fases claras, costes de desarrollo vs. recurrentes, y comparativa de plataformas para tomar una decisión informada.",
      resultado: "El cliente elige con conocimiento de causa, no hay sorpresas de costes y el proyecto se entrega según lo presupuestado.",
    },
    faqs: [
      { pregunta: "¿Puedo presupuestar costes de desarrollo y mantenimiento por separado?", respuesta: "Sí, puedes crear secciones diferenciadas: una para el desarrollo inicial del proyecto y otra para el mantenimiento mensual post-lanzamiento con hosting, actualizaciones y soporte." },
      { pregunta: "¿Cómo reflejo las comisiones de las pasarelas de pago?", respuesta: "En las notas o condiciones puedes indicar las comisiones de cada pasarela (Stripe, Redsys, PayPal) para que el cliente las tenga en cuenta como coste operativo." },
      { pregunta: "¿Se pueden presupuestar integraciones con ERP o marketplace?", respuesta: "Cada integración se añade como línea independiente con su precio. Si hay integraciones opcionales, puedes marcarlas como tales para que el cliente decida cuáles incluir." },
    ],
    featuresEspecificos: [
      { icono: "ShoppingCart", titulo: "Catálogo de productos", desc: "Carga masiva de productos incluida" },
      { icono: "CreditCard", titulo: "Pasarelas de pago", desc: "Integración y comisiones detalladas" },
      { icono: "Truck", titulo: "Logística incluida", desc: "Configuración de envíos y costes" },
      { icono: "Settings", titulo: "Mantenimiento", desc: "Soporte post-lanzamiento presupuestado" },
    ],
    stats: [
      { valor: "Fases", label: "de proyecto con milestones" },
      { valor: "Costes", label: "iniciales vs. recurrentes" },
      { valor: "Plataformas", label: "comparadas en la propuesta" },
    ],
    guia: `<p>Cotizar un proyecto de e-commerce implica distinguir entre los costes de puesta en marcha y los costes recurrentes de operación. El cliente necesita entender cuánto cuesta montar la tienda online —diseño, desarrollo, catálogo, pasarela de pago, configuración logística— y cuánto le costará mantenerla mensualmente: hosting, mantenimiento, actualizaciones de seguridad, soporte técnico y posibles comisiones por transacción de la plataforma elegida.</p>
<p>La elección de plataforma (Shopify, WooCommerce, PrestaShop, Magento) condiciona tanto el presupuesto inicial como los costes operativos. Una propuesta profesional debería comparar las opciones viables para el negocio del cliente, indicando las ventajas y limitaciones de cada una en función del volumen de productos, mercados objetivo y capacidad técnica del equipo. Detallar las integraciones necesarias —ERP, CRM, marketplaces, email marketing— evita sorpresas presupuestarias durante el desarrollo.</p>
<p>DealForge permite a agencias y freelances de e-commerce crear propuestas con fases de proyecto (diseño, desarrollo, carga de catálogo, testing, lanzamiento), hitos de entrega y separación clara de costes iniciales vs. recurrentes. El cliente aprueba la propuesta con firma electrónica y ambos tienen un documento de referencia con el alcance exacto del proyecto.</p>`,
    howToSteps: [
      "Elige la plantilla de E-commerce y registra los datos del cliente y el tipo de tienda online.",
      "Estructura el presupuesto por fases: diseño, desarrollo, catálogo, integraciones, testing y lanzamiento.",
      "Separa los costes de puesta en marcha de los costes recurrentes mensuales (hosting, mantenimiento).",
      "Detalla las integraciones necesarias y la plataforma recomendada con su justificación.",
      "Envía la propuesta con hitos de entrega y recibe la aprobación con firma electrónica.",
    ],
  },
  {
    slug: "psicologia",
    nombre: "Psicología",
    titulo: "Plantilla de Cotización para Psicólogos y Terapeutas",
    descripcion: "Presupuesta servicios de psicología: terapia individual, de pareja, evaluaciones psicológicas y programas de bienestar empresarial.",
    emoji: "🧠",
    color: "#6A1B9A",
    ejemploLineas: [
      { descripcion: "Primera consulta y evaluación", cantidad: 1, precio: 70 },
      { descripcion: "Sesión de terapia individual (50 min)", cantidad: 8, precio: 60 },
      { descripcion: "Informe psicológico", cantidad: 1, precio: 120 },
      { descripcion: "Sesión de terapia online", cantidad: 4, precio: 55 },
      { descripcion: "Sesión de terapia de pareja (75 min)", cantidad: 4, precio: 80 },
    ],
    problemas: [
      "Pacientes que no se comprometen con el proceso terapéutico a largo plazo",
      "Tarifas comunicadas verbalmente sin estructura clara",
      "Dificultad para vender programas de bienestar a empresas",
      "Sin seguimiento de pacientes que solicitan información pero no vuelven",
    ],
    beneficios: [
      "Programas terapéuticos con sesiones y duración definidos",
      "Bonos de sesiones con ahorro detallado",
      "Propuestas de bienestar empresarial profesionales",
      "Compromiso del paciente formalizado con firma electrónica",
    ],
    keywords: ["presupuesto psicólogo", "cotización terapia", "presupuesto sesiones psicología", "cotización bienestar empresarial"],
    icp: {
      cargo: "Psicólogo clínico o psicoterapeuta",
      empresaTipo: "Consulta privada de psicología o centro de bienestar",
      dolor: "Los pacientes preguntan el precio por sesión pero no visualizan el proceso completo, lo que lleva a abandonos prematuros.",
      cita: "Cuando presento un programa de 8-12 sesiones con objetivos claros, el paciente entiende que es un proceso y se compromete más.",
    },
    casoDeUso: {
      antes: "Decía el precio por sesión en la primera consulta y el paciente iba viniendo 'cuando podía'. Muchos dejaban la terapia sin completar el proceso.",
      despues: "Presenta un programa terapéutico con número de sesiones recomendadas, objetivos y precio del programa completo o bono de sesiones.",
      resultado: "Mayor adherencia al tratamiento porque el paciente ve el recorrido completo y se compromete formalmente con el proceso.",
    },
    faqs: [
      { pregunta: "¿Puedo ofrecer bonos de sesiones con descuento?", respuesta: "Sí, puedes crear líneas con bonos de 5, 8 o 12 sesiones a precio reducido. El paciente ve el ahorro comparado con sesiones sueltas y se compromete con el proceso." },
      { pregunta: "¿Cómo presupuesto servicios de bienestar para empresas?", respuesta: "Crea una propuesta profesional con talleres, sesiones grupales y programas de asistencia al empleado. Las empresas necesitan un presupuesto formal para aprobarlo internamente." },
      { pregunta: "¿La firma electrónica sirve como consentimiento informado?", respuesta: "La firma electrónica valida la aceptación del presupuesto. El consentimiento informado clínico es un documento aparte, pero puedes incluir las condiciones generales del servicio en la cotización." },
    ],
    featuresEspecificos: [
      { icono: "Heart", titulo: "Programas terapéuticos", desc: "Sesiones con objetivos y duración definidos" },
      { icono: "Gift", titulo: "Bonos de sesiones", desc: "Packs con descuento para fidelizar" },
      { icono: "Building", titulo: "Propuestas B2B", desc: "Bienestar empresarial profesionalizado" },
      { icono: "Lock", titulo: "Confidencialidad", desc: "Datos del paciente protegidos" },
    ],
    stats: [
      { valor: "Programas", label: "con objetivos definidos" },
      { valor: "Bonos", label: "de sesiones con ahorro" },
      { valor: "B2B", label: "propuestas para empresas" },
    ],
    guia: `<p>Los psicólogos y centros de psicología necesitan presupuestos que equilibren la sensibilidad del servicio con la transparencia económica. A diferencia de una compra convencional, el paciente que busca terapia está en un momento de vulnerabilidad y necesita información clara sin sentirse presionado. La propuesta debe presentar las modalidades de servicio —terapia individual, de pareja, familiar, infantil o grupal— con la frecuencia recomendada y las tarifas por sesión o por programa.</p>
<p>Los bonos de sesiones con descuento fomentan el compromiso terapéutico y reducen el abandono prematuro. Para el segmento B2B —programas de bienestar emocional para empresas, talleres de gestión del estrés, evaluaciones psicotécnicas para selección de personal— la propuesta debe adaptarse al lenguaje corporativo, con objetivos medibles, número de empleados cubiertos y reporting de utilización del servicio sin comprometer la confidencialidad de los participantes.</p>
<p>DealForge permite a psicólogos crear presupuestos tanto para pacientes individuales como para programas corporativos, con bonos de sesiones, tarifas diferenciadas y envío digital discreto. La firma electrónica formaliza el acuerdo terapéutico o el contrato empresarial, y el seguimiento automático facilita la gestión de pacientes pendientes de respuesta.</p>`,
    howToSteps: [
      "Selecciona la plantilla de Psicología e introduce los datos del paciente o la empresa.",
      "Define la modalidad terapéutica y la frecuencia recomendada de sesiones.",
      "Ofrece opciones de pago: sesión individual, bono de sesiones con descuento o programa cerrado.",
      "Para empresas: detalla objetivos del programa, número de empleados y condiciones de confidencialidad.",
      "Envía la propuesta de forma discreta y recoge la aceptación con firma electrónica.",
    ],
  },
  {
    slug: "mudanzas",
    nombre: "Mudanzas",
    titulo: "Plantilla de Cotización para Empresas de Mudanzas",
    descripcion: "Presupuesta mudanzas nacionales e internacionales: embalaje, transporte, montaje de muebles y servicios de guardamuebles.",
    emoji: "📦",
    color: "#5D4037",
    ejemploLineas: [
      { descripcion: "Mudanza piso 80m² (2 operarios, camión)", cantidad: 1, precio: 650 },
      { descripcion: "Embalaje completo (cajas + protección)", cantidad: 1, precio: 250 },
      { descripcion: "Desmontaje y montaje de muebles", cantidad: 1, precio: 180 },
      { descripcion: "Servicio de elevador (piso 4º sin ascensor)", cantidad: 1, precio: 200 },
      { descripcion: "Seguro de contenido (cobertura total)", cantidad: 1, precio: 80 },
    ],
    problemas: [
      "Presupuestos que no detallan qué incluye y qué cuesta extra",
      "Clientes que comparan precios sin considerar servicios incluidos",
      "Disputas por conceptos no presupuestados (escaleras, muebles grandes)",
      "Presupuestos por teléfono sin compromiso formal",
    ],
    beneficios: [
      "Servicios detallados: embalaje, transporte, montaje por separado",
      "Extras claros desde el principio (elevador, guardamuebles, seguro)",
      "Aceptación formal antes de reservar la fecha",
      "Condiciones de cancelación y modificación incluidas",
    ],
    keywords: ["presupuesto mudanza", "cotización empresa mudanzas", "presupuesto mudanza Madrid", "cotización mudanza Barcelona", "presupuesto mudanza nacional"],
    icp: {
      cargo: "Gerente de empresa de mudanzas",
      empresaTipo: "Empresa de mudanzas local o nacional de 5-30 empleados",
      dolor: "Pierde encargos porque el cliente elige al más barato sin saber que luego le cobrarán extras no incluidos.",
      cita: "Cuando el cliente ve todo desglosado, entiende que mi precio es justo y que no va a tener sorpresas el día de la mudanza.",
    },
    casoDeUso: {
      antes: "Daba presupuestos por teléfono después de que el cliente describiera la mudanza. Al llegar, había muebles no mencionados y el precio cambiaba.",
      despues: "Envía un presupuesto detallado con cada servicio, extras opcionales y condiciones claras. El cliente acepta con firma electrónica antes de reservar fecha.",
      resultado: "Menos conflictos el día de la mudanza, clientes más satisfechos y menos cancelaciones de última hora.",
    },
    faqs: [
      { pregunta: "¿Puedo presupuestar servicios opcionales que el cliente pueda añadir?", respuesta: "Sí, puedes incluir servicios opcionales como embalaje, desmontaje de muebles, servicio de elevador o guardamuebles. El cliente ve el precio base y decide qué extras añadir." },
      { pregunta: "¿Cómo calculo el precio según el volumen o los metros cuadrados?", respuesta: "Puedes crear líneas por tipo de servicio con unidades basadas en m², volumen m³ o número de bultos. El sistema calcula el total automáticamente." },
      { pregunta: "¿Se puede incluir el seguro en el presupuesto?", respuesta: "Sí, añade el seguro como una línea con la cobertura detallada en la descripción. El cliente ve claramente que su contenido está asegurado." },
    ],
    featuresEspecificos: [
      { icono: "Package", titulo: "Servicios desglosados", desc: "Embalaje, transporte y montaje separados" },
      { icono: "Shield", titulo: "Seguro incluido", desc: "Cobertura detallada en el presupuesto" },
      { icono: "Calendar", titulo: "Reserva con firma", desc: "Fecha confirmada con aceptación formal" },
      { icono: "Plus", titulo: "Extras opcionales", desc: "Elevador, guardamuebles, embalaje especial" },
    ],
    stats: [
      { valor: "Todo", label: "desglosado sin sorpresas" },
      { valor: "Seguro", label: "de contenido incluido" },
      { valor: "Reserva", label: "confirmada con firma" },
    ],
    guia: `<p>El presupuesto de una mudanza debe anticipar todas las variables que pueden encarecer el servicio para evitar sorpresas el día del traslado. El volumen de la carga (medido en metros cúbicos), la distancia entre origen y destino, el número de porteadores, la disponibilidad de ascensor o montamuebles, el piso de origen y destino, y las dificultades de acceso (calles peatonales, restricciones de circulación) son factores determinantes que deben figurar en la cotización.</p>
<p>El cliente de mudanzas teme dos cosas: que le cobren más de lo presupuestado y que sus pertenencias sufran daños. Por eso, el presupuesto debe indicar con claridad si incluye embalaje de objetos frágiles, desmontaje y montaje de muebles, materiales de protección y, sobre todo, la cobertura del seguro de contenido con los límites de indemnización por pieza y por siniestro. Ofrecer servicios opcionales como guardamuebles o limpieza del piso de origen añade valor y aumenta el ticket medio.</p>
<p>DealForge permite a empresas de mudanzas generar presupuestos detallados con todos los conceptos desglosados, seguro de contenido documentado y reserva de fecha confirmada con firma electrónica. El cliente sabe exactamente lo que paga y la empresa tiene un compromiso firmado que evita cancelaciones de última hora.</p>`,
    howToSteps: [
      "Abre la plantilla de Mudanzas e introduce los datos del cliente, origen y destino del traslado.",
      "Estima el volumen de carga e indica número de porteadores, tipo de vehículo y dificultades de acceso.",
      "Desglosa los servicios: embalaje, desmontaje/montaje, materiales de protección y guardamuebles.",
      "Incluye la cobertura del seguro de contenido con sus límites y condiciones.",
      "Envía el presupuesto y confirma la reserva de fecha con firma electrónica del cliente.",
    ],
  },
  {
    slug: "energia-solar",
    nombre: "Energía Solar",
    titulo: "Plantilla de Cotización para Instaladores de Energía Solar",
    descripcion: "Presupuesta instalaciones fotovoltaicas: paneles, inversores, baterías, trámites administrativos y mantenimiento de sistemas solares.",
    emoji: "☀️",
    color: "#F9A825",
    ejemploLineas: [
      { descripcion: "Paneles solares 450W (10 unidades)", cantidad: 10, precio: 280 },
      { descripcion: "Inversor híbrido 5kW", cantidad: 1, precio: 1200 },
      { descripcion: "Estructura de montaje en tejado", cantidad: 1, precio: 600 },
      { descripcion: "Instalación eléctrica + legalización", cantidad: 1, precio: 1500 },
      { descripcion: "Tramitación subvención y compensación", cantidad: 1, precio: 300 },
    ],
    problemas: [
      "Clientes que no entienden la diferencia entre kWp, kWh y rendimiento real",
      "Presupuestos técnicos que asustan en vez de convencer",
      "Competidores que presupuestan sin incluir trámites ni legalización",
      "Falta de claridad sobre retorno de inversión y ahorro",
    ],
    beneficios: [
      "Equipamiento detallado con especificaciones comprensibles",
      "Trámites y legalización incluidos en el presupuesto",
      "Estimación de ahorro y periodo de amortización",
      "Garantías de cada componente claramente indicadas",
    ],
    keywords: ["presupuesto instalación solar", "cotización paneles solares", "presupuesto fotovoltaica", "cotización energía solar", "presupuesto autoconsumo"],
    icp: {
      cargo: "Gerente de empresa de instalaciones solares",
      empresaTipo: "Empresa instaladora de energía solar de 3-20 empleados",
      dolor: "Pierde tiempo explicando conceptos técnicos que el cliente no entiende, y al final elige al competidor que le da un precio sin detallar.",
      cita: "Si el presupuesto es claro y el cliente entiende lo que va a ahorrar, se decide más rápido. El problema es que muchos competidores ocultan costes.",
    },
    casoDeUso: {
      antes: "Hacía presupuestos técnicos en Excel con especificaciones que el cliente no entendía. Tardaba horas y luego el cliente elegía al más barato.",
      despues: "Genera un presupuesto profesional con equipos detallados, trámites incluidos, estimación de ahorro y garantías. El cliente firma digitalmente.",
      resultado: "Clientes mejor informados que valoran la transparencia, menos tiempo dedicado a explicaciones y mayor tasa de cierre de proyectos.",
    },
    faqs: [
      { pregunta: "¿Puedo incluir la estimación de ahorro en el presupuesto?", respuesta: "En las notas puedes añadir una estimación de producción anual en kWh, el ahorro estimado en euros y el periodo de amortización de la inversión." },
      { pregunta: "¿Cómo reflejo las subvenciones disponibles?", respuesta: "Puedes indicar el precio total y en las condiciones detallar las subvenciones aplicables (Next Generation, autonómicas) con su descuento estimado. El coste del trámite va como línea aparte." },
      { pregunta: "¿Se pueden presupuestar opciones con y sin batería?", respuesta: "Crea dos cotizaciones: una instalación básica sin batería y otra con almacenamiento. El cliente compara ambas opciones y sus periodos de amortización." },
    ],
    featuresEspecificos: [
      { icono: "Sun", titulo: "Equipos detallados", desc: "Paneles, inversor y batería con especificaciones" },
      { icono: "FileCheck", titulo: "Trámites incluidos", desc: "Legalización y subvenciones presupuestadas" },
      { icono: "TrendingDown", titulo: "Ahorro estimado", desc: "Amortización y producción anual" },
      { icono: "Shield", titulo: "Garantías claras", desc: "25 años paneles, 10 años inversor" },
    ],
    stats: [
      { valor: "Ahorro", label: "estimado incluido" },
      { valor: "Trámites", label: "y legalización incluidos" },
      { valor: "Garantías", label: "de cada componente" },
    ],
    guia: `<p>La cotización de una instalación de energía solar fotovoltaica es una de las más técnicas del mercado y, al mismo tiempo, la que más necesita traducir datos de ingeniería en beneficios económicos comprensibles para el propietario. El presupuesto debe incluir el dimensionamiento de la instalación (kWp), el número y modelo de paneles, el tipo de inversor, la estructura de montaje, el cableado y las protecciones eléctricas, todo con las fichas técnicas de referencia.</p>
<p>Lo que realmente convence al cliente es la simulación de ahorro: producción anual estimada en kWh, porcentaje de autoconsumo, ahorro en la factura eléctrica, periodo de amortización y rentabilidad a 25 años. Incluir el desglose de trámites administrativos —licencia de obra, boletín eléctrico, inscripción en el registro de autoconsumo y solicitud de compensación de excedentes— demuestra que la empresa gestiona el proyecto de principio a fin.</p>
<p>DealForge permite a instaladoras de energía solar crear presupuestos completos con equipamiento detallado, simulación de ahorro energético, trámites incluidos y garantías de cada componente (paneles, inversor, instalación). El cliente aprueba la instalación con firma electrónica y ambas partes tienen un documento profesional que respalda la inversión.</p>`,
    howToSteps: [
      "Selecciona la plantilla de Energía Solar e introduce los datos del cliente y la ubicación de la instalación.",
      "Dimensiona la instalación: número de paneles, potencia pico, inversor y estructura de montaje.",
      "Incluye la simulación de ahorro: producción estimada, autoconsumo, amortización y rentabilidad.",
      "Detalla los trámites administrativos y las garantías de cada componente del sistema.",
      "Envía el presupuesto con toda la documentación técnica y recoge la firma electrónica del cliente.",
    ],
  },
  {
    slug: "fitness",
    nombre: "Fitness y Entrenamiento",
    titulo: "Plantilla de Cotización para Entrenadores Personales y Gimnasios",
    descripcion: "Presupuesta servicios de entrenamiento personal, programas fitness, planes deportivos y servicios de gimnasio para particulares y empresas.",
    emoji: "💪",
    color: "#E53935",
    ejemploLineas: [
      { descripcion: "Evaluación física inicial", cantidad: 1, precio: 50 },
      { descripcion: "Plan de entrenamiento personalizado", cantidad: 1, precio: 80 },
      { descripcion: "Sesiones de entrenamiento personal (1h)", cantidad: 12, precio: 45 },
      { descripcion: "Seguimiento nutricional básico", cantidad: 1, precio: 60 },
      { descripcion: "Revisión mensual y ajuste de plan", cantidad: 3, precio: 30 },
    ],
    problemas: [
      "Clientes que compran sesiones sueltas sin compromiso a largo plazo",
      "Sin formalización del programa de entrenamiento ni objetivos",
      "Dificultad para vender packs de sesiones vs. la sesión suelta",
      "Competencia con apps de fitness y entrenadores online baratos",
    ],
    beneficios: [
      "Programas de 1-3 meses con objetivos claros y medibles",
      "Bonos de sesiones con ahorro visible para el cliente",
      "Compromiso formal con firma electrónica",
      "Diferenciación profesional frente a la competencia",
    ],
    keywords: ["presupuesto entrenador personal", "cotización gym", "presupuesto fitness empresas", "cotización programa entrenamiento"],
    icp: {
      cargo: "Entrenador personal o director de gimnasio",
      empresaTipo: "Estudio de entrenamiento personal o gimnasio boutique",
      dolor: "Sus clientes compran sesiones sueltas, no se comprometen con un programa y abandonan antes de ver resultados.",
      cita: "Cuando les presento un programa completo con objetivos y seguimiento, entienden que no es solo ir al gym, es un proceso con resultados.",
    },
    casoDeUso: {
      antes: "Cobraba por sesión y el cliente venía cuando le apetecía. Sin plan ni compromiso, los resultados eran lentos y abandonaban.",
      despues: "Presenta programas de 8 o 12 semanas con evaluación, sesiones, seguimiento nutricional y revisiones mensuales. El cliente acepta con firma electrónica.",
      resultado: "Clientes más comprometidos con el programa, mejores resultados visibles y mayor fidelización a largo plazo.",
    },
    faqs: [
      { pregunta: "¿Puedo crear diferentes niveles de programa?", respuesta: "Sí, puedes ofrecer un programa básico (plan + revisiones), uno intermedio (plan + sesiones + revisiones) y uno premium (todo + nutrición). El cliente elige según su presupuesto." },
      { pregunta: "¿Cómo presupuesto servicios de fitness para empresas?", respuesta: "Crea una propuesta con sesiones grupales, frecuencia semanal, número de participantes y precio por empleado o tarifa plana. Las empresas necesitan un presupuesto formal." },
      { pregunta: "¿Se pueden incluir sesiones online y presenciales?", respuesta: "Cada línea puede especificar la modalidad y el precio. Puedes mezclar sesiones presenciales con seguimiento online en el mismo programa." },
    ],
    featuresEspecificos: [
      { icono: "Target", titulo: "Objetivos medibles", desc: "Programa con metas claras de inicio a fin" },
      { icono: "Repeat", titulo: "Seguimiento incluido", desc: "Revisiones mensuales de progreso" },
      { icono: "Gift", titulo: "Bonos de sesiones", desc: "Packs con descuento que fidelizan" },
      { icono: "Building", titulo: "Fitness empresarial", desc: "Propuestas profesionales para empresas" },
    ],
    stats: [
      { valor: "Programas", label: "con objetivos medibles" },
      { valor: "Bonos", label: "que fidelizan clientes" },
      { valor: "B2B", label: "fitness para empresas" },
    ],
    guia: `<p>El sector del fitness y el entrenamiento personal ha evolucionado enormemente en sus modelos de negocio: entrenamiento individual, grupos reducidos, programas online, preparación física para deportes específicos y bienestar corporativo conviven en la oferta de muchos profesionales. La cotización debe reflejar esta diversidad presentando programas con objetivos claros y medibles —pérdida de grasa, ganancia muscular, rehabilitación, rendimiento deportivo— en lugar de vender sesiones sueltas sin contexto.</p>
<p>Los bonos de sesiones son la herramienta de fidelización por excelencia en este sector: un bono de 10 o 20 sesiones con descuento progresivo incentiva la constancia del cliente y estabiliza los ingresos del entrenador. Para propuestas B2B —programas de fitness para empleados, clases colectivas en oficinas o centros deportivos corporativos— el presupuesto debe incluir frecuencia semanal, aforo máximo, material necesario y métricas de seguimiento del programa.</p>
<p>DealForge permite a entrenadores personales y centros fitness crear presupuestos con programas de entrenamiento, bonos con descuento y propuestas corporativas, todo en un documento profesional que se envía digitalmente. El cliente firma su compromiso con el programa y tú gestionas las renovaciones de bonos sin papeleo.</p>`,
    howToSteps: [
      "Elige la plantilla de Fitness e introduce los datos del cliente o empresa.",
      "Define el programa de entrenamiento con objetivos, frecuencia semanal y duración total.",
      "Ofrece opciones: sesión individual, bono de sesiones con descuento o programa completo.",
      "Para empresas: detalla aforo, material necesario, horarios y métricas de seguimiento.",
      "Envía la propuesta y formaliza el compromiso del cliente con firma electrónica.",
    ],
  },
];

export function getIndustria(slug: string): Industria | undefined {
  return industrias.find((i) => i.slug === slug);
}
