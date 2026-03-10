/**
 * Assistant Router - Predefined responses & topic filter
 *
 * Intercepts messages BEFORE sending to Claude API to:
 * 1. Handle greetings, farewells, thanks with predefined responses (0 tokens)
 * 2. Block off-topic queries (weather, jokes, general knowledge) (0 tokens)
 * 3. Provide quick help/capabilities info (0 tokens)
 * 4. Only forward business-relevant queries to Claude API
 */

interface RouterResult {
  handled: boolean;
  response?: string;
  suggestedActions?: Array<{ label: string; href: string }>;
}

// ===== PATTERN MATCHERS =====

const GREETING_PATTERNS = [
  /^(hola|hey|buenas|buenos dias|buenas tardes|buenas noches|saludos|que tal|hi|hello|ey|eyyy|wena|buenas!|ola)/i,
  /^(como estas|como andas|que onda|que hay)/i,
];

const FAREWELL_PATTERNS = [
  /^(adios|chao|hasta luego|nos vemos|bye|hasta pronto|hasta manana|ciao)/i,
  /^(buen dia|buena tarde|buena noche|que descanses)/i,
];

const THANKS_PATTERNS = [
  /^(gracias|muchas gracias|genial|perfecto|excelente|vale|ok gracias|thank|thanks|thx|grax|te lo agradezco|mil gracias)/i,
  /^(buen trabajo|muy bien|estupendo|fenomenal|guay|mola|fantastico)/i,
];

const HELP_PATTERNS = [
  /^(ayuda|help|que puedes hacer|que sabes hacer|como funciona|para que sirves|que haces|comandos|funciones|capacidades)/i,
  /^(como te uso|como funciona esto|que puedo preguntarte|que puedo hacer)/i,
];

const IDENTITY_PATTERNS = [
  /^(quien eres|como te llamas|que eres|eres una ia|eres un bot|eres humano|eres real)/i,
];

// Off-topic patterns - things that have NOTHING to do with CPQ/business
const OFF_TOPIC_PATTERNS = [
  /\b(clima|tiempo|temperatura|lluvia|sol|nieve|meteorolog)/i,
  /\b(chiste|broma|cuento|historia|adivinanza|poema|cancion|receta|cocina)/i,
  /\b(futbol|basket|deporte|liga|partido|mundial|champions|olympics)/i,
  /\b(pelicula|serie|netflix|youtube|tiktok|instagram|facebook|twitter|juego|videojuego|gaming)/i,
  /\b(politica|gobierno|presidente|elecciones|votacion|partido politico)/i,
  /\b(horoscopo|signo|zodiaco|tarot|astrolog)/i,
  /\b(dieta|ejercicio|gym|fitness|yoga|meditacion|salud personal)/i,
  /\b(capital de|rio mas largo|montaña mas alta|cuantos habitantes|quien invento|en que ano|historia de la|quien fue)/i,
  /\b(traduce|traducir|translation|translate|idioma|language)/i,
  /\b(escribeme un|hazme un poema|crea una historia|genera un texto|escribe un ensayo)/i,
  /\b(codigo|programa|python|javascript|java|html|css|sql|programacion|bug|debug)\b/i,
  /\b(matematica|ecuacion|integral|derivada|algebra|geometria|calcula? \d+ [\+\-\*\/x] \d+)/i,
];

// Business-relevant keywords - if ANY of these appear, forward to Claude
const BUSINESS_KEYWORDS = [
  // Clients
  /\b(cliente|clientes|empresa|compania|contacto|contactos|proveedor|cuenta)\b/i,
  // Products
  /\b(producto|productos|catalogo|precio|precios|sku|categoria|inventario|articulo)\b/i,
  // Quotes
  /\b(cotizacion|cotizaciones|presupuesto|oferta|quote|propuesta|factura)\b/i,
  // Business actions
  /\b(crear|nuevo|nueva|agregar|anadir|añadir|registrar|guardar|modificar|actualizar|cambiar|editar)\b/i,
  // States
  /\b(borrador|enviada|negociacion|ganada|perdida|estado|pipeline|pendiente|activa)\b/i,
  // Business terms
  /\b(venta|ventas|ingreso|revenue|conversion|descuento|iva|impuesto|total|subtotal)\b/i,
  // Follow-up
  /\b(follow.?up|seguimiento|recordatorio|actividad|llamada|reunion|email|nota)\b/i,
  // Analytics
  /\b(estadistica|reporte|analisis|metrica|kpi|rendimiento|dashboard|resumen|resultado)\b/i,
  // Recommendations
  /\b(recomienda|sugerir|sugerencia|recomendacion|mejor|top|ranking|mas vendido)\b/i,
  // Names that could be clients (capitalized words after crear/buscar)
  /\b(buscar|busca|encuentra|muestra|dame|listame|ensenname|dime)\b/i,
];

// ===== PREDEFINED RESPONSES =====

const GREETINGS = [
  "Hola! Soy Forge, tu asistente comercial. ¿En qué puedo ayudarte hoy? Puedo buscar clientes, crear cotizaciones, revisar el pipeline o lo que necesites.",
  "Buenas! ¿Qué necesitas? Estoy listo para ayudarte con clientes, productos o cotizaciones.",
  "Hola! ¿Qué hacemos hoy? Puedo crear registros, buscar información o analizar tus datos comerciales.",
];

const FAREWELLS = [
  "Hasta luego! Aqui estare cuando me necesites. 🔥",
  "Nos vemos! Si necesitas algo, solo abre el panel.",
  "Hasta pronto! Suerte con esos deals. 🔥",
];

const THANKS_RESPONSES = [
  "De nada! Si necesitas algo más, aquí estoy. 🔥",
  "Para eso estoy! ¿Algo más en lo que pueda ayudar?",
  "Un placer! No dudes en preguntarme lo que sea sobre tu negocio.",
];

const IDENTITY_RESPONSES = [
  "Soy **Forge**, el asistente comercial de DealForge. Puedo consultar y crear registros en tu sistema: clientes, productos, cotizaciones. También analizo datos, sugiero follow-ups y te ayudo a cerrar más deals. 🔥",
];

const OFF_TOPIC_RESPONSE = "Lo siento, solo puedo ayudarte con temas relacionados con tu negocio: **clientes, productos, cotizaciones, seguimientos y análisis comercial**. ¿En qué puedo ayudarte con eso?";

const HELP_RESPONSE = `Puedo ayudarte con todo lo relacionado a tu negocio:

📋 **Consultar**
• Buscar clientes, productos y cotizaciones
• Ver estadísticas y métricas del pipeline
• Identificar cotizaciones que necesitan follow-up

✏️ **Crear**
• Crear clientes nuevos con contactos
• Agregar productos al catálogo
• Generar cotizaciones completas con cálculos automáticos

📊 **Analizar**
• Analizar rendimiento de un cliente
• Recomendar productos por sector
• Revisar tasa de conversión y tendencias

🔄 **Gestionar**
• Cambiar estado de cotizaciones
• Registrar actividades (llamadas, reuniones, emails)
• Proponer seguimientos comerciales

Preguntame lo que necesites!`;

// ===== ROUTER =====

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(text));
}

export function routeMessage(message: string): RouterResult {
  const trimmed = message.trim();
  const lower = trimmed.toLowerCase();

  // 1. Very short messages that are just greetings
  if (trimmed.length < 50 && matchesAny(lower, GREETING_PATTERNS)) {
    // But check if it also contains business keywords
    if (!matchesAny(lower, BUSINESS_KEYWORDS)) {
      return {
        handled: true,
        response: randomPick(GREETINGS),
        suggestedActions: [
          { label: "Ver dashboard", href: "/" },
          { label: "Mis clientes", href: "/clientes" },
          { label: "Cotizaciones", href: "/cotizaciones" },
        ],
      };
    }
  }

  // 2. Farewells
  if (trimmed.length < 40 && matchesAny(lower, FAREWELL_PATTERNS)) {
    return { handled: true, response: randomPick(FAREWELLS) };
  }

  // 3. Thanks / positive feedback
  if (trimmed.length < 60 && matchesAny(lower, THANKS_PATTERNS)) {
    if (!matchesAny(lower, BUSINESS_KEYWORDS)) {
      return { handled: true, response: randomPick(THANKS_RESPONSES) };
    }
  }

  // 4. Identity questions
  if (matchesAny(lower, IDENTITY_PATTERNS)) {
    return {
      handled: true,
      response: IDENTITY_RESPONSES[0],
      suggestedActions: [
        { label: "Ver dashboard", href: "/" },
        { label: "Crear cliente", href: "/clientes/nuevo" },
      ],
    };
  }

  // 5. Help / capabilities
  if (matchesAny(lower, HELP_PATTERNS)) {
    if (!matchesAny(lower, BUSINESS_KEYWORDS)) {
      return {
        handled: true,
        response: HELP_RESPONSE,
        suggestedActions: [
          { label: "Ver clientes", href: "/clientes" },
          { label: "Ver productos", href: "/productos" },
          { label: "Ver cotizaciones", href: "/cotizaciones" },
        ],
      };
    }
  }

  // 6. Off-topic detection - ONLY if no business keywords present
  if (matchesAny(lower, OFF_TOPIC_PATTERNS) && !matchesAny(lower, BUSINESS_KEYWORDS)) {
    return {
      handled: true,
      response: OFF_TOPIC_RESPONSE,
      suggestedActions: [
        { label: "Ver dashboard", href: "/" },
        { label: "Mis clientes", href: "/clientes" },
      ],
    };
  }

  // 7. Not handled - forward to Claude API
  return { handled: false };
}
