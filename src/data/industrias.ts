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
  },
];

export function getIndustria(slug: string): Industria | undefined {
  return industrias.find((i) => i.slug === slug);
}
