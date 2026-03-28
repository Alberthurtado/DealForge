export interface Feature {
  slug: string;
  nombre: string;
  titulo: string;
  descripcion: string;
  icono: string;
  color: string;
  heroSubtitle: string;
  problema: {
    titulo: string;
    puntos: string[];
  };
  solucion: {
    titulo: string;
    puntos: { titulo: string; desc: string }[];
  };
  pasos: { num: string; titulo: string; desc: string }[];
  faqs: { pregunta: string; respuesta: string }[];
  keywords: string[];
  plan: string;
}

export const features: Feature[] = [
  {
    slug: "gestion-clientes",
    nombre: "Gestión de Clientes",
    titulo:
      "Gestión de Clientes para PYMEs | CRM integrado en tu CPQ — DealForge",
    descripcion:
      "Centraliza contactos, empresas e historial de cotizaciones en un solo lugar. Gestiona tu cartera de clientes sin salir de DealForge y cierra más ventas.",
    icono: "Users",
    color: "#3a9bb5",
    heroSubtitle:
      "Deja de buscar datos de clientes entre hojas de cálculo y correos. Toda la información de tus contactos y empresas, conectada directamente con tus cotizaciones.",
    problema: {
      titulo: "¿Por qué necesitas un CRM integrado en tu CPQ?",
      puntos: [
        "Tienes datos de clientes dispersos en Excel, Gmail y notas adhesivas. Cuando un vendedor se va, su cartera desaparece con él.",
        "No puedes ver el historial de cotizaciones de un cliente sin abrir cinco herramientas diferentes, lo que retrasa cada negociación.",
        "Duplicas contactos constantemente porque no hay una fuente única de verdad, y terminas enviando cotizaciones con datos desactualizados.",
      ],
    },
    solucion: {
      titulo: "Cómo DealForge centraliza tu cartera de clientes",
      puntos: [
        {
          titulo: "Ficha de cliente unificada",
          desc: "Cada cliente tiene una ficha con datos de contacto, empresa, dirección fiscal y notas internas. Desde esa misma ficha accedes a todas sus cotizaciones pasadas y activas sin cambiar de pantalla.",
        },
        {
          titulo: "Historial completo de interacciones",
          desc: "Cada cotización enviada, email abierto y documento firmado queda registrado automáticamente en la línea de tiempo del cliente. Cualquier miembro del equipo puede retomar una negociación con contexto completo.",
        },
        {
          titulo: "Importación masiva desde Excel o CSV",
          desc: "Sube tu base de clientes actual en minutos. DealForge detecta duplicados, normaliza nombres de empresa y valida formatos de RFC y correo electrónico automáticamente.",
        },
        {
          titulo: "Segmentación por etiquetas",
          desc: "Clasifica clientes por industria, tamaño, región o cualquier criterio que necesites. Filtra tu cartera en segundos para campañas dirigidas o análisis de concentración de ventas.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Importa o crea tus contactos",
        desc: "Sube un archivo CSV con tu base actual o crea contactos manualmente. El sistema valida RFC, email y teléfono al momento.",
      },
      {
        num: "2",
        titulo: "Asocia contactos a empresas",
        desc: "Vincula personas con sus empresas y define roles (decisor, influenciador, usuario). Al cotizar, selecciona el contacto y los datos fiscales se llenan solos.",
      },
      {
        num: "3",
        titulo: "Consulta el historial desde cualquier cotización",
        desc: "Al abrir o crear una cotización, ve inmediatamente cuánto ha comprado ese cliente, qué descuentos ha recibido y cuáles fueron sus últimas objeciones.",
      },
    ],
    faqs: [
      {
        pregunta: "¿Puedo importar clientes desde mi CRM actual?",
        respuesta:
          "Sí. DealForge acepta archivos CSV y Excel. Si usas HubSpot o Pipedrive, puedes exportar tus contactos desde esas plataformas y subirlos directamente. El mapeador de columnas te permite asignar cada campo sin importar cómo se llamen en tu archivo original.",
      },
      {
        pregunta:
          "¿Qué pasa si tengo el mismo cliente registrado dos veces?",
        respuesta:
          "El detector de duplicados compara RFC, email y nombre de empresa. Cuando encuentra coincidencias, te muestra ambos registros lado a lado para que decidas cuál conservar o si quieres fusionarlos, manteniendo el historial de ambos.",
      },
      {
        pregunta: "¿Puedo restringir qué vendedores ven qué clientes?",
        respuesta:
          "Sí. En el plan Pro puedes asignar clientes a vendedores específicos y activar la visibilidad restringida. Cada vendedor solo ve su cartera asignada, mientras que los gerentes ven toda la base.",
      },
      {
        pregunta: "¿El módulo de clientes sustituye a un CRM completo?",
        respuesta:
          "DealForge no pretende reemplazar un CRM de ventas con pipeline completo. Lo que ofrece es gestión de contactos optimizada para cotizar: datos fiscales, historial de precios, condiciones pactadas y documentos. Si ya usas un CRM, ambos se complementan.",
      },
    ],
    keywords: [
      "gestión de clientes PYMEs",
      "CRM para cotizaciones",
      "base de datos clientes España",
      "ficha de cliente CPQ",
      "historial cotizaciones cliente",
      "importar clientes CSV",
      "directorio clientes empresa",
    ],
    plan: "Starter",
  },
  {
    slug: "catalogo-productos",
    nombre: "Catálogo de Productos",
    titulo:
      "Catálogo de Productos y Servicios | Precios centralizados — DealForge",
    descripcion:
      "Organiza productos, servicios y precios en un catálogo centralizado. Evita errores de precio y agiliza la creación de cotizaciones para tu equipo comercial.",
    icono: "Package",
    color: "#6366f1",
    heroSubtitle:
      "Un catálogo único donde tu equipo siempre encuentra el producto correcto al precio correcto. Sin listas de precios desactualizadas ni errores manuales.",
    problema: {
      titulo: "¿Por qué necesitas un catálogo centralizado?",
      puntos: [
        "Cada vendedor maneja su propia lista de precios en Excel y nadie sabe cuál es la versión vigente. Un descuento mal aplicado puede costarte el margen de toda una operación.",
        "Agregar un producto nuevo a una cotización requiere buscar entre PDFs de proveedores, confirmar precios por WhatsApp y copiar datos manualmente.",
        "No tienes visibilidad de qué productos se cotizan más, cuáles tienen margen bajo o cuáles llevan meses sin moverse.",
      ],
    },
    solucion: {
      titulo: "Cómo DealForge organiza tu catálogo",
      puntos: [
        {
          titulo: "Catálogo jerárquico con categorías",
          desc: "Organiza productos y servicios en categorías y subcategorías. Define SKU, unidad de medida, precio base, costo y margen objetivo. Los vendedores buscan y agregan ítems a cotizaciones en segundos.",
        },
        {
          titulo: "Listas de precios por segmento",
          desc: "Crea listas de precios diferenciadas por tipo de cliente, volumen o región. Al seleccionar un cliente, el sistema aplica automáticamente la lista correspondiente sin intervención manual.",
        },
        {
          titulo: "Productos configurables",
          desc: "Define variantes (tamaño, color, acabado) y opciones adicionales. El vendedor selecciona configuraciones desde un formulario guiado en lugar de escribir descripciones a mano.",
        },
        {
          titulo: "Control de versiones de precios",
          desc: "Cuando actualizas un precio, las cotizaciones existentes conservan el precio original. Solo las nuevas cotizaciones usan el precio actualizado, evitando conflictos con ofertas ya enviadas.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Carga tu catálogo",
        desc: "Importa productos desde Excel o créalos manualmente. Define precio, costo, SKU, descripción y categoría para cada ítem.",
      },
      {
        num: "2",
        titulo: "Configura listas de precios",
        desc: "Crea listas por segmento de cliente (distribuidor, mayorista, público general) con precios y descuentos específicos para cada uno.",
      },
      {
        num: "3",
        titulo: "Cotiza desde el catálogo",
        desc: "Al crear una cotización, busca productos por nombre o SKU, selecciona cantidades y el precio se calcula automáticamente según el cliente y la lista activa.",
      },
    ],
    faqs: [
      {
        pregunta: "¿Cuántos productos puedo cargar?",
        respuesta:
          "No hay límite de productos en ningún plan. Hemos probado catálogos de más de 50,000 SKUs sin problemas de rendimiento. El buscador indexa nombre, SKU y descripción para resultados instantáneos.",
      },
      {
        pregunta: "¿Puedo manejar productos con precio variable?",
        respuesta:
          "Sí. Puedes definir productos con precio abierto donde el vendedor ingresa el monto al cotizar, o usar fórmulas que calculen el precio según variables como metros cuadrados, peso o cantidad de horas.",
      },
      {
        pregunta: "¿Cómo manejo impuestos como IVA o IEPS?",
        respuesta:
          "Cada producto puede tener su propia configuración fiscal: IVA 16%, IVA 0%, exento o IEPS. Al agregar el producto a una cotización, los impuestos se calculan automáticamente según la configuración del ítem y la ubicación del cliente.",
      },
    ],
    keywords: [
      "catálogo productos CPQ",
      "lista precios centralizada",
      "gestión productos servicios",
      "catálogo precios empresa",
      "SKU gestión comercial",
      "productos configurables cotización",
      "lista precios por cliente",
    ],
    plan: "Starter",
  },
  {
    slug: "cotizaciones-pdf",
    nombre: "Cotizaciones PDF",
    titulo:
      "Cotizaciones PDF Profesionales | Genera propuestas en minutos — DealForge",
    descripcion:
      "Crea cotizaciones PDF con tu marca, términos y condiciones en minutos. Plantillas personalizables que proyectan profesionalismo y aceleran el cierre.",
    icono: "FileText",
    color: "#f59e0b",
    heroSubtitle:
      "Genera cotizaciones PDF con tu logotipo, colores corporativos y términos comerciales en un clic. Cada propuesta proyecta la imagen de una empresa grande, sin importar tu tamaño.",
    problema: {
      titulo: "¿Por qué necesitas cotizaciones PDF profesionales?",
      puntos: [
        "Formateas cotizaciones en Word o Excel y cada vendedor usa su propio estilo. Tu marca se ve inconsistente y poco profesional frente al cliente.",
        "Calcular totales con IVA, descuentos por volumen y condiciones especiales a mano provoca errores que descubres cuando el cliente ya recibió el documento.",
        "Generar una sola cotización te lleva 30-45 minutos entre buscar precios, copiar datos del cliente y ajustar el formato. Con 20 cotizaciones al mes, pierdes días enteros.",
      ],
    },
    solucion: {
      titulo: "Cómo DealForge genera tus cotizaciones",
      puntos: [
        {
          titulo: "Plantillas personalizables con tu marca",
          desc: "Sube tu logotipo, define colores y tipografía, y configura encabezados y pies de página. Cada PDF sale con tu identidad corporativa sin tocar un editor de diseño.",
        },
        {
          titulo: "Cálculos automáticos sin errores",
          desc: "Subtotales, descuentos, impuestos y totales se calculan al instante. Si cambias una cantidad o aplicas un descuento, todo se recalcula. Cero errores de dedo en montos.",
        },
        {
          titulo: "Secciones configurables",
          desc: "Incluye o excluye términos y condiciones, garantías, datos bancarios, notas especiales o tabla de entregables. Cada plantilla puede tener secciones diferentes según el tipo de propuesta.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Selecciona cliente y productos",
        desc: "Elige el cliente desde tu base y agrega productos del catálogo. Los datos fiscales, precios y descuentos se aplican automáticamente.",
      },
      {
        num: "2",
        titulo: "Personaliza la propuesta",
        desc: "Agrega notas, ajusta vigencia, selecciona condiciones de pago y elige la plantilla PDF que mejor se adapte a esta oportunidad.",
      },
      {
        num: "3",
        titulo: "Genera y envía el PDF",
        desc: "Con un clic se genera el PDF listo para descargar o enviar directamente por email desde DealForge. El cliente recibe un documento profesional en segundos.",
      },
    ],
    faqs: [
      {
        pregunta: "¿Puedo tener varias plantillas de cotización?",
        respuesta:
          "Sí. Puedes crear plantillas distintas para propuestas formales, cotizaciones rápidas, presupuestos de servicio o cualquier formato que necesites. Cada una con su propio diseño, secciones y textos predeterminados.",
      },
      {
        pregunta: "¿Las cotizaciones incluyen datos fiscales mexicanos?",
        respuesta:
          "Sí. Puedes incluir RFC del emisor y receptor, régimen fiscal, uso de CFDI sugerido y desglose de IVA. No son facturas fiscales, pero contienen la información necesaria para que contabilidad las procese posteriormente.",
      },
      {
        pregunta: "¿Puedo cotizar en dólares u otras monedas?",
        respuesta:
          "Sí. DealForge soporta cotizaciones en MXN, USD y EUR. Puedes fijar el tipo de cambio manualmente o usar una referencia del día. El PDF muestra los montos en la moneda seleccionada con el símbolo correcto.",
      },
      {
        pregunta: "¿Qué pasa si necesito modificar una cotización ya enviada?",
        respuesta:
          "Puedes crear una nueva versión de la cotización. El sistema mantiene el historial de versiones y el cliente siempre ve la más reciente. La versión anterior queda archivada para referencia.",
      },
    ],
    keywords: [
      "cotización PDF profesional",
      "generar cotizaciones automáticas",
      "plantilla cotización empresa",
      "propuesta comercial PDF",
      "cotizaciones con IVA España",
      "software cotizaciones PYMEs",
      "crear cotización rápida",
    ],
    plan: "Starter",
  },
  {
    slug: "reglas-comerciales",
    nombre: "Reglas Comerciales",
    titulo:
      "Reglas Comerciales y Descuentos Automáticos | Control de márgenes — DealForge",
    descripcion:
      "Define reglas de descuento, aprobación y precios mínimos que se aplican automáticamente. Protege tus márgenes sin frenar a tu equipo comercial.",
    icono: "ShieldCheck",
    color: "#ef4444",
    heroSubtitle:
      "Establece las reglas del juego comercial una sola vez y deja que el sistema las aplique. Descuentos máximos, precios mínimos y escalas de volumen que protegen tu rentabilidad en cada cotización.",
    problema: {
      titulo: "¿Por qué necesitas reglas comerciales automatizadas?",
      puntos: [
        "Tus vendedores ofrecen descuentos excesivos para cerrar rápido y descubres el impacto en margen semanas después, cuando ya no puedes hacer nada.",
        "Las políticas de precios existen en un PDF que nadie lee. Cada vendedor las interpreta diferente y los clientes obtienen condiciones inconsistentes según con quién hablen.",
        "Revisar manualmente cada cotización para verificar que los descuentos sean correctos consume horas de gerencia que deberían dedicarse a vender.",
      ],
    },
    solucion: {
      titulo: "Cómo DealForge protege tus márgenes",
      puntos: [
        {
          titulo: "Descuentos máximos por rol",
          desc: "Define el porcentaje máximo de descuento que cada nivel de vendedor puede aplicar. Un ejecutivo junior puede dar hasta 5%, un senior hasta 15%. Si el cliente pide más, la cotización requiere aprobación automática.",
        },
        {
          titulo: "Precios mínimos por producto",
          desc: "Establece un piso de precio para cada producto o categoría. El sistema bloquea cualquier cotización que intente vender por debajo del mínimo, mostrando al vendedor el precio más bajo permitido.",
        },
        {
          titulo: "Escalas de descuento por volumen",
          desc: "Configura tablas de descuento progresivo: 5% por 100 unidades, 10% por 500, 15% por 1,000. El descuento se calcula automáticamente según la cantidad y el vendedor no puede salirse de la escala.",
        },
        {
          titulo: "Reglas de compatibilidad de productos",
          desc: "Define qué productos requieren otros como complemento o cuáles no pueden venderse juntos. El sistema alerta al vendedor si falta un componente necesario o si hay un conflicto en la configuración.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Define tus políticas comerciales",
        desc: "Configura descuentos máximos, precios mínimos, escalas de volumen y reglas de compatibilidad desde el panel de administración.",
      },
      {
        num: "2",
        titulo: "Asigna reglas a productos y vendedores",
        desc: "Vincula cada regla con los productos, categorías o roles de vendedor correspondientes. Las reglas se activan inmediatamente para nuevas cotizaciones.",
      },
      {
        num: "3",
        titulo: "El sistema valida en tiempo real",
        desc: "Cuando un vendedor crea o modifica una cotización, las reglas se evalúan al instante. Si algo viola una política, el sistema bloquea o solicita aprobación antes de continuar.",
      },
    ],
    faqs: [
      {
        pregunta: "¿Qué pasa si un vendedor necesita exceder el descuento máximo?",
        respuesta:
          "La cotización entra en flujo de aprobación automático. El gerente recibe una notificación con el detalle del descuento solicitado, el margen resultante y puede aprobar o rechazar desde su panel o email.",
      },
      {
        pregunta: "¿Puedo tener reglas diferentes para distintos clientes?",
        respuesta:
          "Sí. Puedes crear conjuntos de reglas por segmento de cliente, región o canal de venta. Un distribuidor puede tener escalas de descuento más agresivas que un cliente final, y el sistema aplica las reglas correctas automáticamente.",
      },
      {
        pregunta: "¿Las reglas aplican retroactivamente a cotizaciones existentes?",
        respuesta:
          "No. Las reglas solo se evalúan al crear o editar una cotización. Las cotizaciones ya enviadas conservan las condiciones originales. Esto evita que un cambio de política invalide propuestas en negociación.",
      },
      {
        pregunta: "¿Puedo ver un reporte de cuántas veces se violan las reglas?",
        respuesta:
          "Sí. El dashboard de reglas comerciales muestra intentos de violación por vendedor, producto y tipo de regla. Esto te ayuda a identificar si necesitas ajustar tus políticas o capacitar a tu equipo.",
      },
    ],
    keywords: [
      "reglas comerciales CPQ",
      "descuentos automáticos ventas",
      "control márgenes cotización",
      "política precios empresa",
      "descuento máximo vendedor",
      "precios mínimos productos",
      "reglas descuento volumen",
    ],
    plan: "Pro",
  },
  {
    slug: "reportes-metricas",
    nombre: "Reportes y Métricas",
    titulo:
      "Reportes de Ventas y Métricas CPQ | Dashboard comercial — DealForge",
    descripcion:
      "Visualiza el rendimiento de tu equipo comercial con dashboards en tiempo real. Tasa de cierre, ticket promedio y pipeline de cotizaciones en un vistazo.",
    icono: "BarChart3",
    color: "#8b5cf6",
    heroSubtitle:
      "Deja de adivinar cómo van las ventas. Dashboards en tiempo real que te muestran exactamente qué cotizaciones se cierran, cuáles se pierden y por qué.",
    problema: {
      titulo: "¿Por qué necesitas métricas de tu proceso de cotización?",
      puntos: [
        "No sabes cuántas cotizaciones envía tu equipo al mes ni cuál es tu tasa real de conversión. Tomas decisiones comerciales basándote en intuición, no en datos.",
        "Cuando el director general pregunta cuánto hay en pipeline, tardas horas en consolidar información de cada vendedor porque no hay un lugar centralizado.",
        "No puedes identificar qué productos tienen mejor margen, qué vendedores convierten más o en qué etapa se pierden las oportunidades.",
      ],
    },
    solucion: {
      titulo: "Cómo DealForge te da visibilidad comercial",
      puntos: [
        {
          titulo: "Dashboard de pipeline en tiempo real",
          desc: "Ve el valor total de cotizaciones por etapa: borrador, enviada, en negociación, ganada, perdida. Identifica cuellos de botella y oportunidades estancadas antes de que sea tarde.",
        },
        {
          titulo: "Métricas por vendedor",
          desc: "Compara rendimiento individual: cotizaciones generadas, tasa de cierre, ticket promedio y tiempo de respuesta. Detecta quién necesita apoyo y quién merece reconocimiento con datos objetivos.",
        },
        {
          titulo: "Análisis de productos y márgenes",
          desc: "Identifica qué productos se cotizan más, cuáles tienen mejor conversión y dónde se erosionan los márgenes. Ajusta tu estrategia de catálogo basándote en datos reales de ventas.",
        },
        {
          titulo: "Reportes exportables",
          desc: "Descarga reportes en CSV para juntas directivas, revisiones trimestrales o análisis detallado. Exportación manual disponible para todos los datos desde cualquier vista del dashboard.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Abre tu dashboard",
        desc: "Desde la pantalla principal, accede al dashboard que se actualiza automáticamente con cada cotización creada, enviada o cerrada por tu equipo.",
      },
      {
        num: "2",
        titulo: "Filtra por periodo, vendedor o producto",
        desc: "Usa los filtros para enfocarte en lo que necesitas: ventas del mes, rendimiento de un vendedor específico o demanda de una categoría de producto.",
      },
      {
        num: "3",
        titulo: "Exporta o comparte",
        desc: "Descarga el reporte en CSV cuando lo necesites. Los datos siempre están disponibles para análisis externo.",
      },
    ],
    faqs: [
      {
        pregunta: "¿Los reportes se actualizan en tiempo real?",
        respuesta:
          "Sí. Cada acción en una cotización (creación, envío, cierre, pérdida) se refleja inmediatamente en el dashboard. No necesitas esperar procesos nocturnos ni actualizaciones manuales.",
      },
      {
        pregunta: "¿Puedo crear reportes personalizados?",
        respuesta:
          "En el plan Pro puedes personalizar los widgets del dashboard y elegir qué métricas ver. En el plan Business además puedes crear reportes con filtros avanzados y campos calculados.",
      },
      {
        pregunta: "¿Puedo ver métricas históricas?",
        respuesta:
          "Sí. DealForge conserva todo el historial desde que empezaste a usar la plataforma. Puedes comparar periodos, ver tendencias y analizar estacionalidad en tu proceso de ventas.",
      },
    ],
    keywords: [
      "reportes ventas PYMEs",
      "dashboard comercial",
      "métricas cotizaciones",
      "tasa cierre ventas",
      "pipeline ventas CPQ",
      "análisis rendimiento vendedores",
      "reporte ticket promedio",
    ],
    plan: "Starter",
  },
  {
    slug: "forge-ia",
    nombre: "Forge IA Integrado",
    titulo:
      "Forge IA para Cotizaciones | Inteligencia artificial comercial — DealForge",
    descripcion:
      "Usa IA para generar descripciones de productos, sugerir precios competitivos y redactar emails de seguimiento. Forge IA acelera cada paso de tu proceso comercial.",
    icono: "Flame",
    color: "#f97316",
    heroSubtitle:
      "Forge IA es tu copiloto comercial: genera descripciones de producto, sugiere precios basados en historial y redacta emails de seguimiento en segundos. Tú decides, la IA ejecuta.",
    problema: {
      titulo: "¿Por qué necesitas IA en tu proceso de cotización?",
      puntos: [
        "Tus vendedores pasan más tiempo redactando descripciones y emails que vendiendo. Cada cotización requiere textos personalizados que consumen 15-20 minutos de escritura.",
        "No tienes forma de saber si el precio que ofreces es competitivo comparado con tus cotizaciones históricas para clientes similares. Cada vendedor fija precios a ciegas.",
        "El seguimiento post-cotización es inconsistente: algunos vendedores dan seguimiento puntual, otros olvidan cotizaciones por semanas hasta que el cliente compra con la competencia.",
      ],
    },
    solucion: {
      titulo: "Cómo Forge IA potencia tu equipo comercial",
      puntos: [
        {
          titulo: "Generación de descripciones de producto",
          desc: "Selecciona un producto del catálogo y Forge IA genera una descripción comercial persuasiva basada en las características técnicas. Puedes ajustar el tono entre técnico, ejecutivo o casual según tu audiencia.",
        },
        {
          titulo: "Sugerencia inteligente de precios",
          desc: "Forge IA analiza tu historial de cotizaciones ganadas y perdidas para sugerir rangos de precio óptimos. Te muestra la probabilidad estimada de cierre según el descuento que apliques.",
        },
        {
          titulo: "Emails de seguimiento automáticos",
          desc: "Genera borradores de email personalizados para cada etapa: envío inicial, seguimiento a 3 días, negociación de objeciones y cierre. Cada email usa el contexto real de la cotización.",
        },
        {
          titulo: "Resumen ejecutivo de propuesta",
          desc: "Para cotizaciones complejas, Forge IA genera un resumen ejecutivo de una página que destaca los beneficios clave para el decisor. Ideal para propuestas de alto valor donde el director no leerá 20 páginas.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Activa Forge IA en cualquier cotización",
        desc: "Haz clic en el ícono de Forge IA dentro de la cotización. El asistente aparece en un panel lateral con acceso al contexto completo de la propuesta.",
      },
      {
        num: "2",
        titulo: "Elige qué necesitas generar",
        desc: "Selecciona entre descripción de producto, email de seguimiento, sugerencia de precio o resumen ejecutivo. Forge IA genera el contenido en segundos.",
      },
      {
        num: "3",
        titulo: "Revisa, ajusta y aplica",
        desc: "Lee el contenido generado, edítalo si necesitas y aplícalo directamente a la cotización o email. Tú siempre tienes la última palabra.",
      },
    ],
    faqs: [
      {
        pregunta: "¿Forge IA aprende de mis cotizaciones?",
        respuesta:
          "Forge IA utiliza el historial de tus cotizaciones como contexto para hacer sugerencias más relevantes. No entrena modelos con tus datos: usa tu información solo en el momento de generar contenido y no la comparte con otros clientes.",
      },
      {
        pregunta: "¿Tiene costo adicional usar Forge IA?",
        respuesta:
          "Forge IA está incluido en todos los planes con un número de generaciones mensuales. El plan Starter incluye 50 generaciones/mes, Pro incluye 300 y Business es ilimitado.",
      },
      {
        pregunta: "¿Puedo usar Forge IA en otros idiomas además de español?",
        respuesta:
          "Sí. Forge IA genera contenido en español, inglés y portugués. Es especialmente útil cuando cotizas a clientes internacionales y necesitas propuestas en su idioma sin contratar traducción.",
      },
      {
        pregunta: "¿Qué tan precisas son las sugerencias de precio?",
        respuesta:
          "Las sugerencias se basan en tu propio historial de cotizaciones. Con más de 50 cotizaciones cerradas, la precisión mejora notablemente. Siempre son sugerencias que el vendedor puede aceptar, modificar o ignorar.",
      },
    ],
    keywords: [
      "inteligencia artificial cotizaciones",
      "IA para ventas PYMEs",
      "copiloto comercial IA",
      "generar propuestas con IA",
      "precios sugeridos IA",
      "emails seguimiento automático",
      "IA CPQ español",
    ],
    plan: "Starter",
  },
  {
    slug: "envio-emails",
    nombre: "Envío de Emails",
    titulo:
      "Envío de Cotizaciones por Email | Seguimiento integrado — DealForge",
    descripcion:
      "Envía cotizaciones por email desde DealForge con confirmación de envío y registro de actividad. Cada email queda registrado en la línea de tiempo de la cotización.",
    icono: "Mail",
    color: "#06b6d4",
    heroSubtitle:
      "Envía cotizaciones directamente desde DealForge con tu dominio empresarial. Cada envío queda registrado en la línea de tiempo de la cotización con fecha y destinatario.",
    problema: {
      titulo: "¿Por qué necesitas envío de emails integrado?",
      puntos: [
        "Envías la cotización por Gmail o Outlook y pierdes la trazabilidad. No queda registro centralizado de qué se envió, a quién ni cuándo.",
        "El seguimiento depende de que el vendedor recuerde hacerlo. Sin un registro claro de envíos, no sabes si la cotización ya se mandó o si falta dar seguimiento.",
        "Adjuntar el PDF correcto, escribir el email y copiar al gerente consume tiempo que se multiplica con cada cotización enviada.",
      ],
    },
    solucion: {
      titulo: "Cómo DealForge integra el envío de emails",
      puntos: [
        {
          titulo: "Envío directo con un clic",
          desc: "Desde la cotización, presiona enviar. El email sale con tu dominio configurado, el PDF adjunto y el texto que definiste en la plantilla. Sin abrir otra herramienta ni adjuntar archivos manualmente.",
        },
        {
          titulo: "Confirmación de envío y registro de actividad",
          desc: "Cada email enviado queda registrado en la línea de tiempo de la cotización con fecha y destinatario. Tu equipo siempre sabe qué se envió, a quién y cuándo sin revisar bandejas de correo individuales.",
        },
        {
          titulo: "Plantillas de email personalizables",
          desc: "Crea plantillas para distintas situaciones: envío inicial, recordatorio, seguimiento y agradecimiento. Usa variables dinámicas como nombre del contacto, monto total y fecha de vigencia.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Configura tu dominio de envío",
        desc: "Conecta tu dominio empresarial para que los emails salgan desde tu dirección (@tuempresa.com). La configuración DNS toma 10 minutos y se hace una sola vez.",
      },
      {
        num: "2",
        titulo: "Personaliza plantillas de email",
        desc: "Crea plantillas con tu estilo de comunicación usando el editor visual. Agrega variables dinámicas que se rellenan automáticamente con los datos de cada cotización.",
      },
      {
        num: "3",
        titulo: "Envía y confirma",
        desc: "Envía la cotización desde DealForge y confirma el envío exitoso. Cada envío queda registrado automáticamente en la línea de tiempo de la cotización.",
      },
    ],
    faqs: [
      {
        pregunta: "¿Los emails salen desde mi dominio o desde DealForge?",
        respuesta:
          "Salen desde tu propio dominio. Configuras registros DNS (SPF, DKIM) para que DealForge envíe en tu nombre. El cliente ve tu dirección de correo, no la de DealForge. Esto mejora la entregabilidad y la confianza.",
      },
      {
        pregunta: "¿Puedo saber si el cliente abrió el email?",
        respuesta:
          "Actualmente registramos el envío y la fecha. El seguimiento de aperturas está en nuestro roadmap.",
      },
      {
        pregunta: "¿Puedo enviar cotizaciones a múltiples contactos?",
        respuesta:
          "Sí. Puedes agregar destinatarios en CC o CCO. Cada contacto en CC queda registrado en la cotización para mantener el contexto de quiénes participan en la decisión.",
      },
    ],
    keywords: [
      "envío cotizaciones email",
      "enviar cotización por correo",
      "plantillas email comercial",
      "enviar propuesta por correo",
      "registro envío cotización",
      "email desde CPQ",
      "seguimiento propuestas ventas",
    ],
    plan: "Pro",
  },
  {
    slug: "aprobaciones",
    nombre: "Aprobaciones",
    titulo:
      "Flujo de Aprobaciones de Cotizaciones | Workflow automático — DealForge",
    descripcion:
      "Configura flujos de aprobación por monto, descuento o cliente. Las cotizaciones que requieren autorización llegan al aprobador correcto automáticamente.",
    icono: "CheckCircle",
    color: "#10b981",
    heroSubtitle:
      "Define quién debe aprobar qué y olvídate de perseguir firmas por WhatsApp. Las cotizaciones que exceden tus políticas se enrutan automáticamente al aprobador correcto.",
    problema: {
      titulo: "¿Por qué necesitas un flujo de aprobaciones?",
      puntos: [
        "Las cotizaciones de alto valor o con descuentos agresivos se envían sin supervisión. Te enteras de condiciones riesgosas cuando el cliente ya aceptó y no puedes dar marcha atrás.",
        "El proceso de aprobación es informal: un mensaje de WhatsApp al jefe que se pierde entre 200 conversaciones. No hay registro de quién aprobó qué ni cuándo.",
        "Los vendedores se frustran esperando aprobaciones que tardan días porque el gerente no revisa a tiempo. Mientras tanto, el cliente pierde interés.",
      ],
    },
    solucion: {
      titulo: "Cómo DealForge automatiza las aprobaciones",
      puntos: [
        {
          titulo: "Reglas de escalamiento configurables",
          desc: "Define condiciones de aprobación: cotizaciones mayores a $500,000 requieren aprobación del director, descuentos superiores al 20% necesitan al gerente comercial. Las reglas se combinan y priorizan automáticamente.",
        },
        {
          titulo: "Notificaciones multicanal",
          desc: "El aprobador recibe la solicitud por email con un resumen de la cotización, margen resultante e historial del cliente. Puede aprobar o rechazar con un clic desde el email o desde la app.",
        },
        {
          titulo: "Flujo de aprobación configurable",
          desc: "Define quién debe aprobar según las condiciones de la cotización. Si el aprobador rechaza, la cotización regresa al vendedor con comentarios para que ajuste y reenvíe.",
        },
        {
          titulo: "Auditoría completa",
          desc: "Cada aprobación o rechazo queda registrado con fecha, hora, usuario y comentarios. Ideal para auditorías internas, resolución de conflictos y mejora continua de políticas comerciales.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Configura las reglas de aprobación",
        desc: "Define qué condiciones disparan una aprobación: monto total, porcentaje de descuento, tipo de cliente o combinaciones de criterios.",
      },
      {
        num: "2",
        titulo: "Asigna aprobadores",
        desc: "Designa quién aprueba según las condiciones configuradas. El aprobador recibe la solicitud por email y puede aprobar o rechazar desde ahí.",
      },
      {
        num: "3",
        titulo: "El vendedor cotiza y el flujo se activa",
        desc: "Cuando una cotización cumple las condiciones, el vendedor ve que requiere aprobación y el flujo arranca automáticamente. Todos los involucrados reciben notificaciones de cada cambio de estado.",
      },
    ],
    faqs: [
      {
        pregunta: "¿El vendedor puede enviar la cotización antes de la aprobación?",
        respuesta:
          "No. Mientras la cotización esté pendiente de aprobación, el botón de envío se bloquea. El vendedor puede ver el estado del flujo y quién es el aprobador pendiente. Esto garantiza que nada sale sin la autorización correspondiente.",
      },
      {
        pregunta: "¿Puedo aprobar desde el celular?",
        respuesta:
          "Sí. El email de solicitud incluye botones de aprobar/rechazar que funcionan desde cualquier dispositivo. También puedes acceder al panel de aprobaciones pendientes desde el navegador de tu celular.",
      },
      {
        pregunta:
          "¿Qué pasa si un aprobador se va de vacaciones?",
        respuesta:
          "Puedes reasignar manualmente la aprobación a otro responsable desde el panel de la cotización. También puedes cancelar la solicitud y crear una nueva con otro aprobador.",
      },
    ],
    keywords: [
      "aprobación cotizaciones",
      "flujo aprobación ventas",
      "workflow aprobaciones CPQ",
      "autorización descuentos",
      "aprobación multinivel",
      "control cotizaciones empresa",
      "aprobaciones automáticas ventas",
    ],
    plan: "Business",
  },
  {
    slug: "firma-electronica",
    nombre: "Firma Electrónica",
    titulo:
      "Firma Electrónica de Cotizaciones | Acepta propuestas en línea — DealForge",
    descripcion:
      "Permite que tus clientes firmen cotizaciones electrónicamente. Reduce el tiempo de cierre de semanas a horas con aceptación digital legalmente válida.",
    icono: "PenTool",
    color: "#3a9bb5",
    heroSubtitle:
      "Tu cliente recibe la cotización, revisa los términos y firma con un clic desde cualquier dispositivo. Sin imprimir, escanear ni enviar papeles. Cierra negocios en horas, no en semanas.",
    problema: {
      titulo: "¿Por qué necesitas firma electrónica en tus cotizaciones?",
      puntos: [
        "El cliente acepta verbalmente pero tarda días en devolver el documento firmado. Mientras tanto, puede cambiar de opinión o recibir una oferta mejor.",
        "El proceso de impresión, firma, escaneo y reenvío agrega fricción que mata oportunidades. Algunos clientes abandonan solo por lo engorroso del proceso.",
        "No tienes un registro legal claro de cuándo y cómo el cliente aceptó las condiciones. En caso de disputa, un email de 'ok, va' no tiene mucho peso legal.",
      ],
    },
    solucion: {
      titulo: "Cómo DealForge simplifica la firma",
      puntos: [
        {
          titulo: "Firma con un clic desde el email",
          desc: "El cliente recibe un enlace seguro donde ve la cotización, revisa los términos y firma con un clic o dibujando su firma. No necesita crear cuenta ni descargar software.",
        },
        {
          titulo: "Certificado de firma electrónica simple",
          desc: "Cada firma genera un certificado que incluye timestamp, IP del firmante, email verificado y hash del documento. La firma electrónica de DealForge es una firma electrónica simple según el Reglamento eIDAS (UE 910/2014). Registra la identidad del firmante, fecha, hora e IP. Para contratos que requieran firma electrónica avanzada o cualificada, recomendamos consultar con un asesor legal.",
        },
        {
          titulo: "Notificación instantánea de aceptación",
          desc: "Cuando el cliente firma, el vendedor y el gerente reciben una notificación inmediata. La cotización cambia automáticamente a estado 'Ganada' y se puede disparar la creación del contrato.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Habilita firma electrónica en la cotización",
        desc: "Al enviar la cotización, activa la opción de firma electrónica. Define qué campos requieren firma y quiénes deben firmar (puede ser más de una persona).",
      },
      {
        num: "2",
        titulo: "El cliente revisa y firma",
        desc: "El cliente abre el enlace, revisa el documento completo con zoom y desplazamiento, y firma en los campos marcados. El proceso toma menos de 2 minutos.",
      },
      {
        num: "3",
        titulo: "Descarga el documento firmado",
        desc: "Ambas partes reciben el PDF firmado con el certificado de firma incluido. El documento queda almacenado en DealForge como registro permanente.",
      },
    ],
    faqs: [
      {
        pregunta: "¿La firma electrónica tiene validez legal en España?",
        respuesta:
          "DealForge ofrece firma electrónica simple, reconocida por el Reglamento eIDAS de la Unión Europea y la Ley 6/2020 de servicios electrónicos de confianza en España. El certificado incluye integridad del documento, identificación del firmante y registro de fecha e IP. Para contratos que requieran firma electrónica avanzada o cualificada, recomendamos consultar con un asesor legal sobre los requisitos específicos de tu caso.",
      },
      {
        pregunta: "¿Necesito un certificado digital para firmar?",
        respuesta:
          "No. DealForge usa firma electrónica simple, que no requiere certificado digital cualificado. Para cotizaciones y acuerdos comerciales, la firma simple es suficiente y legalmente válida según el Reglamento eIDAS. Los certificados cualificados son requeridos solo para trámites con la administración pública.",
      },
      {
        pregunta: "¿Pueden firmar varias personas el mismo documento?",
        respuesta:
          "Sí. Puedes definir múltiples firmantes con un orden específico (primero el comprador, luego el director) o permitir firma en paralelo. Cada firmante recibe su propio enlace y el documento avanza conforme se completan las firmas.",
      },
      {
        pregunta: "¿El cliente necesita registrarse para firmar?",
        respuesta:
          "No. El firmante solo necesita acceder al enlace seguro que recibe por email. Se verifica su identidad mediante el email al que fue enviado y opcionalmente mediante un código SMS. No requiere cuenta, contraseña ni software adicional.",
      },
    ],
    keywords: [
      "firma electrónica cotización",
      "firma digital propuesta comercial",
      "aceptar cotización online",
      "firma electrónica España legal",
      "firma propuestas PYMEs",
      "documento firmado digitalmente",
      "cerrar ventas firma electrónica",
    ],
    plan: "Pro",
  },
  {
    slug: "recordatorios",
    nombre: "Recordatorios Automáticos",
    titulo:
      "Recordatorios Automáticos de Cotizaciones | Seguimiento sin esfuerzo — DealForge",
    descripcion:
      "Automatiza el seguimiento de cotizaciones con recordatorios programados. Nunca pierdas una venta por falta de seguimiento oportuno.",
    icono: "Bell",
    color: "#eab308",
    heroSubtitle:
      "El 60% de las ventas se pierden por falta de seguimiento. DealForge envía recordatorios automáticos a tu equipo y a tus clientes para que ninguna cotización se quede sin respuesta.",
    problema: {
      titulo: "¿Por qué necesitas recordatorios automáticos?",
      puntos: [
        "Tus vendedores manejan decenas de cotizaciones simultáneas y es humanamente imposible recordar el seguimiento de cada una. Las que no se persiguen, se pierden.",
        "Las cotizaciones tienen fecha de vigencia, pero nadie avisa al cliente cuando está por vencer. El cliente se entera tarde y pide nueva cotización con precios actualizados.",
        "No hay un sistema que alerte cuando una cotización lleva 5 días sin respuesta. El vendedor la olvida y el cliente asume que no le interesa el negocio.",
      ],
    },
    solucion: {
      titulo: "Cómo DealForge automatiza el seguimiento",
      puntos: [
        {
          titulo: "Secuencias de seguimiento automáticas",
          desc: "Define una secuencia: recordatorio al vendedor a las 48 horas, email al cliente a los 5 días, alerta al gerente a los 7 días. La secuencia se ejecuta sola hasta que la cotización cambia de estado.",
        },
        {
          titulo: "Alertas de vencimiento",
          desc: "Configura alertas que notifiquen al vendedor y opcionalmente al cliente cuando una cotización está por vencer. Dale al vendedor tiempo para renovar la vigencia y al cliente urgencia para decidir.",
        },
        {
          titulo: "Recordatorios internos personalizados",
          desc: "Permite a cada vendedor crear recordatorios manuales para cotizaciones específicas: 'Llamar el viernes después de su junta de presupuesto'. Los recordatorios aparecen como notificaciones en la app.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Configura las secuencias de seguimiento",
        desc: "Define cuántos recordatorios enviar, a quién (vendedor, cliente o ambos) y con qué intervalos. Puedes crear secuencias diferentes por tipo de cotización o monto.",
      },
      {
        num: "2",
        titulo: "Las secuencias se activan al enviar",
        desc: "Cuando un vendedor envía una cotización, la secuencia de seguimiento arranca automáticamente. Si el cliente responde o la cotización se cierra, la secuencia se detiene sola.",
      },
      {
        num: "3",
        titulo: "Monitorea el seguimiento del equipo",
        desc: "Desde el dashboard, ve qué cotizaciones tienen seguimiento pendiente, cuáles están en secuencia activa y cuáles ya agotaron todos los recordatorios sin respuesta.",
      },
    ],
    faqs: [
      {
        pregunta: "¿Puedo personalizar el contenido de los recordatorios?",
        respuesta:
          "Sí. Cada paso de la secuencia tiene su propia plantilla de email editable. Puedes usar variables como el nombre del cliente, monto de la cotización y días restantes de vigencia. Los recordatorios internos al vendedor también son personalizables.",
      },
      {
        pregunta: "¿Qué pasa si el cliente responde antes del siguiente recordatorio?",
        respuesta:
          "Si la cotización cambia de estado (aceptada, rechazada, nueva versión), la secuencia se detiene automáticamente. No queremos que un cliente que ya aceptó reciba un email de 'seguimos esperando tu respuesta'.",
      },
      {
        pregunta:
          "¿Puedo tener secuencias diferentes según el monto de la cotización?",
        respuesta:
          "Sí. Puedes crear reglas como: cotizaciones menores a $50,000 reciben 2 recordatorios en 7 días, mientras que cotizaciones mayores a $500,000 reciben 5 recordatorios en 30 días con escalamiento a gerencia. El sistema aplica la secuencia correcta según los criterios que definas.",
      },
    ],
    keywords: [
      "recordatorios cotizaciones",
      "seguimiento ventas automático",
      "alertas cotización vencimiento",
      "automatizar seguimiento ventas",
      "recordatorio email cliente",
      "secuencia seguimiento comercial",
      "notificaciones vendedores",
    ],
    plan: "Pro",
  },
  {
    slug: "versionado",
    nombre: "Versionado",
    titulo:
      "Versionado de Cotizaciones | Control de cambios en propuestas — DealForge",
    descripcion:
      "Mantén un historial completo de cada versión de tus cotizaciones. Consulta versiones anteriores, restaura propuestas y negocia con total transparencia.",
    icono: "GitBranch",
    color: "#a855f7",
    heroSubtitle:
      "Cada cambio en una cotización genera una nueva versión. Consulta el historial completo de versiones, restaura propuestas anteriores y mantén un registro claro de toda la negociación.",
    problema: {
      titulo: "¿Por qué necesitas versionado en tus cotizaciones?",
      puntos: [
        "El cliente pide cambios tres veces y ya no sabes cuál era el precio original ni qué se modificó en cada ronda. Terminas comparando PDFs manualmente buscando diferencias.",
        "Un vendedor sobreescribe una cotización por error y pierde la versión que el cliente ya había aceptado verbalmente. No hay forma de recuperarla.",
        "En una auditoría interna, necesitas demostrar cómo evolucionó una negociación pero solo tienes la versión final. No puedes justificar por qué se llegó a esas condiciones.",
      ],
    },
    solucion: {
      titulo: "Cómo DealForge versiona tus cotizaciones",
      puntos: [
        {
          titulo: "Versiones automáticas en cada cambio",
          desc: "Cada vez que se modifica y guarda una cotización, se crea una nueva versión con número secuencial (v1, v2, v3). La versión anterior queda inmutable y accesible en cualquier momento.",
        },
        {
          titulo: "Historial de cambios en línea de tiempo",
          desc: "Puedes ver todas las versiones anteriores en la ficha de la cotización y consultar los cambios en la línea de tiempo. Cada versión registra fecha, autor y un resumen de las modificaciones realizadas.",
        },
        {
          titulo: "Restauración con un clic",
          desc: "Si necesitas volver a una versión anterior, puedes restaurarla como nueva versión activa. No se pierde el historial intermedio: la restauración se registra como una nueva versión que es copia de la anterior.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Edita la cotización normalmente",
        desc: "Modifica productos, precios o condiciones como lo harías normalmente. Al guardar, DealForge crea la nueva versión automáticamente. No necesitas hacer nada especial.",
      },
      {
        num: "2",
        titulo: "Revisa el historial de versiones",
        desc: "Desde la cotización, accede al panel de versiones donde ves cada iteración con fecha, autor del cambio y un resumen de las modificaciones.",
      },
      {
        num: "3",
        titulo: "Consulta o restaura según necesites",
        desc: "Revisa versiones anteriores para entender la evolución de la negociación o restaura una versión si el cliente prefiere condiciones anteriores.",
      },
    ],
    faqs: [
      {
        pregunta: "¿Las versiones anteriores son accesibles para el cliente?",
        respuesta:
          "No por defecto. El cliente solo ve la versión más reciente que le envíes. Puedes compartir versiones anteriores manualmente si lo necesitas para la negociación, pero el historial completo es interno.",
      },
      {
        pregunta: "¿Hay un límite de versiones por cotización?",
        respuesta:
          "No. Puedes tener tantas versiones como sean necesarias. Hemos visto negociaciones complejas con más de 15 versiones y el sistema las maneja sin problema.",
      },
      {
        pregunta: "¿Puedo ver qué cambió entre versiones?",
        respuesta:
          "Sí. Cada versión incluye un registro en la línea de tiempo con los cambios realizados. Puedes abrir cualquier versión anterior para revisar los productos, precios y condiciones que tenía en ese momento.",
      },
    ],
    keywords: [
      "versionado cotizaciones",
      "historial versiones propuesta",
      "control cambios cotización",
      "consultar versiones cotización",
      "restaurar cotización anterior",
      "trazabilidad negociaciones",
      "versiones propuesta comercial",
    ],
    plan: "Starter",
  },
  {
    slug: "importar-exportar",
    nombre: "Importar / Exportar",
    titulo:
      "Importar y Exportar Datos | Integración con Excel y CSV — DealForge",
    descripcion:
      "Importa clientes, productos y cotizaciones desde Excel o CSV. Exporta tus datos en cualquier momento. Tu información siempre es tuya y portátil.",
    icono: "Plug",
    color: "#64748b",
    heroSubtitle:
      "Trae toda tu información existente a DealForge en minutos y exporta lo que necesites cuando quieras. Sin lock-in: tus datos siempre son tuyos.",
    problema: {
      titulo: "¿Por qué necesitas importar y exportar datos?",
      puntos: [
        "Tienes años de datos de clientes y productos en Excel que no puedes abandonar. Empezar de cero en una herramienta nueva es inviable cuando manejas miles de registros.",
        "Tu equipo de contabilidad necesita los datos de cotizaciones en Excel para sus reportes. Copiar manualmente cada registro consume horas y genera errores.",
        "Te preocupa el vendor lock-in: si DealForge no funciona para ti, necesitas poder sacar tus datos sin depender del soporte técnico.",
      ],
    },
    solucion: {
      titulo: "Cómo DealForge maneja tus datos",
      puntos: [
        {
          titulo: "Importación guiada con mapeo de columnas",
          desc: "Sube tu archivo Excel o CSV y el asistente de importación te muestra las columnas detectadas. Arrastra y suelta para mapear tus columnas a los campos de DealForge. El sistema valida los datos antes de importar y te muestra errores para corregir.",
        },
        {
          titulo: "Importación de catálogo con precios",
          desc: "Importa tu catálogo completo con precios, categorías, SKU y descripciones en una sola operación. Si ya tienes listas de precios por segmento, puedes importarlas como listas separadas manteniendo la relación con los productos.",
        },
        {
          titulo: "Exportación completa en un clic",
          desc: "Exporta clientes, productos, cotizaciones o cualquier combinación a Excel o CSV. Aplica filtros antes de exportar para obtener solo los datos que necesitas. La exportación incluye todos los campos, incluyendo personalizados.",
        },
        {
          titulo: "Exportación bajo demanda",
          desc: "Exporta los datos que necesites en cualquier momento con filtros aplicados. Ideal para alimentar reportes de contabilidad o BI cuando lo necesites.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Prepara tu archivo",
        desc: "Organiza tus datos en Excel o CSV con encabezados claros. No necesitas un formato específico: el mapeador se adapta a tu estructura.",
      },
      {
        num: "2",
        titulo: "Sube y mapea columnas",
        desc: "Carga el archivo, revisa la previsualización y asigna cada columna al campo correspondiente en DealForge. El sistema valida datos y muestra errores para corregir antes de importar.",
      },
      {
        num: "3",
        titulo: "Verifica y confirma",
        desc: "Revisa el resumen de la importación: registros válidos, duplicados detectados y errores encontrados. Confirma para completar la importación o descarga el reporte de errores para corregir y reintentar.",
      },
    ],
    faqs: [
      {
        pregunta: "¿Qué formatos de archivo acepta la importación?",
        respuesta:
          "DealForge acepta archivos .xlsx (Excel), .xls (Excel legacy) y .csv (valores separados por coma). El tamaño máximo por archivo es de 50 MB, suficiente para más de 500,000 registros. Si tu archivo es más grande, puedes dividirlo e importar en lotes.",
      },
      {
        pregunta: "¿La importación detecta y maneja duplicados?",
        respuesta:
          "Sí. El sistema compara registros por campos clave (RFC para clientes, SKU para productos) y te muestra los duplicados encontrados. Puedes elegir saltar duplicados, sobrescribirlos con los nuevos datos o revisarlos uno por uno.",
      },
      {
        pregunta: "¿Puedo exportar datos de cotizaciones con detalle de líneas?",
        respuesta:
          "Sí. La exportación de cotizaciones incluye tanto el encabezado (cliente, fecha, monto total, estado) como el detalle de cada línea (producto, cantidad, precio, descuento). Puedes exportar solo encabezados o encabezados con líneas según necesites.",
      },
      {
        pregunta: "¿Mis datos están seguros si cancelo el servicio?",
        respuesta:
          "Siempre puedes exportar todos tus datos antes de cancelar. Después de la cancelación, mantenemos tus datos por 90 días durante los cuales puedes solicitar una exportación final. Tu información nunca queda atrapada en DealForge.",
      },
    ],
    keywords: [
      "importar datos CPQ",
      "exportar cotizaciones Excel",
      "migrar datos ventas",
      "importar clientes CSV",
      "exportar productos Excel",
      "portabilidad datos empresa",
      "integración Excel cotizaciones",
    ],
    plan: "Starter",
  },
  {
    slug: "gestion-contratos",
    nombre: "Gestión de Contratos",
    titulo:
      "Gestión de Contratos Post-Venta | De cotización a contrato — DealForge",
    descripcion:
      "Convierte cotizaciones ganadas en contratos automáticamente. Gestiona vigencias, cláusulas y documentos contractuales sin salir de tu CPQ.",
    icono: "ScrollText",
    color: "#059669",
    heroSubtitle:
      "Cuando una cotización se convierte en venta, DealForge genera el contrato automáticamente. Gestiona vigencias, cláusulas y renovaciones desde el mismo lugar donde cotizaste.",
    problema: {
      titulo: "¿Por qué necesitas gestión de contratos integrada?",
      puntos: [
        "La cotización se gana pero el contrato se gestiona en otro sistema (o en carpetas de Word). Pierdes la conexión entre lo cotizado y lo contratado, generando inconsistencias.",
        "Nadie monitorea las vigencias de los contratos activos. Te enteras de que un contrato venció cuando el cliente llama para reclamar o cuando ya firmó con la competencia.",
        "Las cláusulas y condiciones especiales pactadas durante la negociación se pierden entre emails y no se reflejan en el contrato final.",
      ],
    },
    solucion: {
      titulo: "Cómo DealForge conecta cotizaciones con contratos",
      puntos: [
        {
          titulo: "Generación automática desde cotización ganada",
          desc: "Cuando una cotización cambia a estado 'Ganada', DealForge genera un borrador de contrato usando una plantilla predefinida. Los datos del cliente, productos, precios y condiciones se trasladan automáticamente.",
        },
        {
          titulo: "Plantillas de contrato con variables dinámicas",
          desc: "Crea plantillas de contrato con campos que se rellenan automáticamente: razón social, RFC, productos contratados, montos, vigencia y condiciones de pago. Agrega cláusulas opcionales según el tipo de servicio.",
        },
        {
          titulo: "Control de vigencia y estados",
          desc: "Cada contrato tiene fecha de inicio, fin y estado (borrador, activo, por vencer, vencido, cancelado). El dashboard de contratos muestra una vista consolidada de todos los contratos con alertas de vencimiento.",
        },
        {
          titulo: "Repositorio de documentos",
          desc: "Almacena el contrato firmado y documentos relacionados (adendas, anexos, actas de entrega) vinculados tanto al contrato como al cliente. Todo el historial contractual accesible desde la ficha del cliente.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Configura plantillas de contrato",
        desc: "Crea plantillas con el formato legal de tu empresa, incluyendo variables dinámicas para datos del cliente y la cotización. Define cláusulas estándar y opcionales.",
      },
      {
        num: "2",
        titulo: "Genera el contrato al ganar la cotización",
        desc: "Cuando una cotización se marca como ganada, selecciona la plantilla y DealForge genera el contrato con todos los datos prellenados. Revisa, ajusta cláusulas si es necesario y envía para firma.",
      },
      {
        num: "3",
        titulo: "Monitorea vigencias y renovaciones",
        desc: "Desde el dashboard de contratos, monitorea vencimientos próximos, contratos por renovar y estados. Las alertas automáticas avisan con anticipación configurable.",
      },
    ],
    faqs: [
      {
        pregunta: "¿Puedo usar mis propias plantillas legales?",
        respuesta:
          "Sí. Puedes subir tus plantillas de contrato existentes y agregar las variables dinámicas de DealForge. Esto permite que tu departamento legal mantenga el control sobre el texto legal mientras los datos comerciales se llenan automáticamente.",
      },
      {
        pregunta: "¿El contrato generado es editable?",
        respuesta:
          "Sí. El contrato generado es un borrador que puedes editar completamente antes de enviar. Puedes modificar cláusulas, agregar condiciones especiales y ajustar cualquier sección. Una vez firmado, el documento queda bloqueado.",
      },
      {
        pregunta:
          "¿Puedo vincular un contrato a varias cotizaciones?",
        respuesta:
          "Sí. Algunos contratos marco cubren múltiples cotizaciones. Puedes crear un contrato y vincular varias cotizaciones a él, manteniendo la trazabilidad de cada operación bajo el paraguas del contrato principal.",
      },
    ],
    keywords: [
      "gestión contratos PYMEs",
      "contrato desde cotización",
      "control vigencia contratos",
      "plantillas contrato empresa",
      "contratos post-venta",
      "repositorio contratos digital",
      "software contratos comerciales",
      "CPQ contratos integrado",
    ],
    plan: "Business",
  },
  {
    slug: "renovaciones-alertas",
    nombre: "Renovaciones y Alertas",
    titulo:
      "Renovaciones Automáticas y Alertas | Retención de clientes — DealForge",
    descripcion:
      "Automatiza renovaciones de contratos y servicios recurrentes. Alertas proactivas que evitan perder clientes por vencimientos olvidados.",
    icono: "RefreshCw",
    color: "#dc2626",
    heroSubtitle:
      "No pierdas clientes por contratos vencidos que nadie renovó a tiempo. DealForge alerta a tu equipo con semanas de anticipación y genera la cotización de renovación automáticamente.",
    problema: {
      titulo: "¿Por qué necesitas gestión de renovaciones?",
      puntos: [
        "Tus contratos de servicio recurrente vencen sin que nadie lo note. El cliente no renueva porque nadie le contactó y tú pierdes ingresos recurrentes que costaron mucho adquirir.",
        "No tienes visibilidad de cuánto ingreso recurrente está en riesgo de no renovarse este trimestre. La planificación financiera es un ejercicio de adivinanza.",
        "El proceso de renovación es manual: buscar el contrato original, crear nueva cotización, ajustar precios y enviar. Con 50 renovaciones al mes, es un trabajo de tiempo completo.",
      ],
    },
    solucion: {
      titulo: "Cómo DealForge automatiza las renovaciones",
      puntos: [
        {
          titulo: "Alertas de vencimiento escalonadas",
          desc: "Configura alertas a 90, 60 y 30 días antes del vencimiento. Cada alerta va al vendedor asignado y al gerente. Con tiempo suficiente, tu equipo contacta al cliente antes de que busque alternativas.",
        },
        {
          titulo: "Cotización de renovación automática",
          desc: "DealForge genera una cotización de renovación prellenada con los mismos productos, cantidades y condiciones del contrato vigente. El vendedor solo revisa, ajusta el precio si aplica incremento anual y envía.",
        },
        {
          titulo: "Dashboard de renovaciones",
          desc: "Ve en un solo lugar todas las renovaciones pendientes del mes, trimestre o año. Filtra por monto, vendedor o riesgo de pérdida. Identifica rápidamente qué cuentas necesitan atención prioritaria.",
        },
        {
          titulo: "Incremento automático de precios",
          desc: "Configura reglas de incremento anual: porcentaje fijo, basado en INPC o personalizado por cliente. Al generar la renovación, el precio ya refleja el ajuste acordado en el contrato original.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Configura alertas de vencimiento",
        desc: "Define cuántos días antes del vencimiento quieres recibir cada alerta y quién debe recibirla. Puedes crear reglas diferentes por tipo de contrato o monto.",
      },
      {
        num: "2",
        titulo: "Revisa el dashboard de renovaciones",
        desc: "Cada semana, consulta las renovaciones próximas. El sistema prioriza por monto y proximidad al vencimiento para que tu equipo se enfoque en lo más importante.",
      },
      {
        num: "3",
        titulo: "Envía la renovación con un clic",
        desc: "Abre la cotización de renovación pregenerada, verifica los datos, ajusta lo necesario y envía al cliente. El proceso completo toma menos de 5 minutos por renovación.",
      },
    ],
    faqs: [
      {
        pregunta: "¿Puedo automatizar completamente la renovación sin intervención humana?",
        respuesta:
          "Puedes automatizar la generación de la cotización y el envío del primer email al cliente, pero recomendamos que un vendedor revise cada renovación antes de enviarla. Algunas renovaciones requieren ajuste de precio, cambios en alcance o una conversación previa con el cliente.",
      },
      {
        pregunta: "¿Cómo manejo incrementos de precio en renovaciones?",
        respuesta:
          "Puedes configurar reglas de incremento automático: porcentaje fijo anual, basado en el Índice Nacional de Precios al Consumidor (INPC) o un porcentaje personalizado por cliente. La cotización de renovación se genera con el precio ajustado según la regla definida.",
      },
      {
        pregunta: "¿Puedo ver qué ingresos recurrentes están en riesgo?",
        respuesta:
          "Sí. El dashboard muestra el valor total de contratos por vencer en cada periodo, segmentado por estado de renovación (pendiente, en proceso, renovado, perdido). Puedes proyectar el ingreso recurrente esperado y el churn rate de cada trimestre.",
      },
      {
        pregunta: "¿El sistema detecta clientes en riesgo de no renovar?",
        respuesta:
          "El sistema te alerta automáticamente cuando un contrato entra en zona naranja (64-15 días) o roja (menos de 14 días). Estas alertas visuales en el dashboard te permiten priorizar qué cuentas necesitan atención urgente antes de su vencimiento.",
      },
    ],
    keywords: [
      "renovaciones contratos automáticas",
      "alertas vencimiento contrato",
      "retención clientes PYMEs",
      "gestión renovaciones SaaS",
      "ingreso recurrente renovación",
      "automatizar renovación servicio",
      "dashboard renovaciones",
      "churn prevención contratos",
    ],
    plan: "Business",
  },
];
