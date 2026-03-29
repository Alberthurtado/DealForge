/**
 * Assistant Router - Predefined responses & topic filter
 *
 * Intercepts messages BEFORE sending to Claude API to:
 * 1. Handle greetings, farewells, thanks (0 tokens)
 * 2. Answer app-related FAQ from built-in guide (0 tokens)
 * 3. Block off-topic with fun, clever responses (0 tokens)
 * 4. Only forward business-relevant action queries to Claude API
 */

interface RouterResult {
  handled: boolean;
  response?: string;
  suggestedActions?: Array<{ label: string; href: string }>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function matchesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(text));
}

function normalize(text: string): string {
  return text
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // strip accents
    .toLowerCase()
    .replace(/[¿?¡!.,;:()]/g, "")
    .trim();
}

// ─── 1. Social patterns ──────────────────────────────────────────────────────

const GREETING_PATTERNS = [
  /^(hola|hey|buenas|buenos dias|buenas tardes|buenas noches|saludos|que tal|hi|hello|ey|eyyy|wena|ola)/i,
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

const IDENTITY_PATTERNS = [
  /^(quien eres|como te llamas|que eres|eres una ia|eres un bot|eres humano|eres real)/i,
];

const HELP_PATTERNS = [
  /^(ayuda|help|que puedes hacer|que sabes hacer|para que sirves|que haces|comandos|funciones|capacidades)/i,
  /^(como te uso|como funciona esto|que puedo preguntarte|que puedo hacer aqui)/i,
];

// ─── 2. FAQ detection patterns (how-to questions about the app) ──────────────

const FAQ_QUESTION_SIGNALS = [
  /^(como|donde|que es|para que|se puede|puedo|es posible|hay manera|hay forma|existe|donde esta|donde estan)/i,
  /\?(como|donde|que|cual|cuando|cuanto|por que|para que)/i,
  /(explicame|dime como|enseñame|muestrame como|me puedes explicar|como funciona|como se hace|como hago)/i,
];

// ─── 3. Business action signals (should forward to Claude) ───────────────────

const ACTION_SIGNALS = [
  /^(crea|busca|encuentra|muestra|dame|listame|muestrame|registra|agrega|anade|genera|cambia|actualiza|modifica|elimina|borra)\b/i,
  /^(hazme|preparame|necesito que|quiero que|podrias crear|puedes buscar|me podrias)\b/i,
  /^(cuantas|cuantos|cual es el total|cuanto factur|resumeme|analiza)\b/i,
];

// ─── 4. Off-topic categories with fun responses ──────────────────────────────

const OFF_TOPIC_CATEGORIES: Array<{
  patterns: RegExp[];
  responses: string[];
}> = [
  // Weather
  {
    patterns: [/\b(clima|tiempo|temperatura|lluvia|sol|nieve|meteorolog|nublado|tormenta|calor|frio)\b/i],
    responses: [
      "Mi unico pronostico: hoy es un gran dia para cerrar deals. ¿Te echo una mano con alguna cotizacion?",
      "No tengo ventana, pero mi prevision dice que tu pipeline tiene buena pinta. ¿Lo revisamos?",
      "¿Tiempo? El unico que controlo es el tiempo medio de cierre de tus deals. ¿Lo miramos?",
    ],
  },
  // Movies / Series / Entertainment
  {
    patterns: [/\b(pelicula|serie|netflix|youtube|tiktok|instagram|facebook|twitter|anime|musica|cancion|concierto|spotify)\b/i],
    responses: [
      "La unica serie que sigo es la de tus cotizaciones: Temporada 1 - *El Pipeline Infinito*. ¿Revisamos un capitulo?",
      "No tengo recomendaciones de pelis, pero te recomiendo revisar tu pipeline... ahi si que hay drama.",
      "Mi playlist favorita: el sonido de una cotizacion pasando a *Ganada*. ¿Hacemos que suene?",
    ],
  },
  // Sports
  {
    patterns: [/\b(futbol|basket|deporte|liga|partido|mundial|champions|tennis|formula|ciclismo|olimpi|gol)\b/i],
    responses: [
      "Los unicos goles que celebro son los deals cerrados. ¿Vamos a por uno?",
      "No sigo la liga, pero si el *ranking* de tus mejores clientes. ¿Quieres verlo?",
      "Mi unico deporte es el sprint comercial: cotizar rapido, cerrar rapido. ¿Arrancamos?",
    ],
  },
  // Cooking / Food
  {
    patterns: [/\b(receta|cocina|comida|restaurante|plato|ingrediente|postre|pizza|sushi|hamburguesa|comer)\b/i],
    responses: [
      "Mi receta secreta: 1 buen producto + 1 buen cliente = 1 deal delicioso. ¿Cocinamos uno?",
      "No se cocinar, pero preparo cotizaciones en menos de 2 minutos. ¿Te preparo una?",
      "La unica carta que manejo es la de precios de tus productos. ¿La revisamos?",
    ],
  },
  // Politics
  {
    patterns: [/\b(politica|gobierno|presidente|elecciones|votacion|partido politico|congreso|senado|ministro)\b/i],
    responses: [
      "Aqui el unico gobierno soy yo... del pipeline. ¿Hablamos de tus cotizaciones?",
      "Yo solo voto por cerrar mas deals. ¿En que te puedo ayudar?",
      "Mi unica campana: *Mas ventas para todos*. ¿Te apuntas?",
    ],
  },
  // Horoscope / Astrology
  {
    patterns: [/\b(horoscopo|signo|zodiaco|tarot|astrolog|prediccion|destino|suerte)\b/i],
    responses: [
      "Tu horoscopo comercial de hoy: Los astros dicen que es buen dia para enviar esa cotizacion pendiente.",
      "No leo las estrellas, pero si leo tus KPIs. ¿Quieres saber como vas?",
      "Mi unica prediccion: si sigues usando DealForge, tus ventas van a subir. Garantizado.",
    ],
  },
  // Health / Fitness
  {
    patterns: [/\b(dieta|ejercicio|gym|fitness|yoga|meditacion|salud|medico|doctor|enferm|vitamina|dormir)\b/i],
    responses: [
      "El unico ejercicio que hago es levantar tu tasa de conversion. ¿La revisamos juntos?",
      "Mi rutina: 3 series de cotizaciones + 1 sprint de follow-ups. ¿Entrenamos?",
      "Para tu salud comercial te receto: 1 follow-up diario y revisar el pipeline cada manana.",
    ],
  },
  // Programming / Code
  {
    patterns: [/\b(codigo|programar?|python|javascript|java|html|css|sql|programacion|bug|debug|deploy|api|frontend|backend)\b/i],
    responses: [
      "Yo ya estoy programado, gracias. Mi lenguaje favorito: el del cierre de ventas. ¿En que te ayudo?",
      "El unico *bug* que me preocupa es que tengas cotizaciones sin enviar. ¿Revisamos?",
      "Mi stack favorito: Clientes + Productos + Cotizaciones = Revenue. ¿Hablamos de negocio?",
    ],
  },
  // Math / Calculations
  {
    patterns: [/\b(matematica|ecuacion|integral|derivada|algebra|geometria|raiz cuadrada|logaritmo|trigonometri)\b/i,
              /^cuanto es \d+/i, /calcula \d+ [\+\-\*\/x] \d+/i],
    responses: [
      "La unica ecuacion que manejo: Deals cerrados x Ticket medio = Tu felicidad. ¿La resolvemos?",
      "No soy calculadora, pero calculo totales, impuestos y descuentos en cotizaciones como nadie. ¿Probamos?",
    ],
  },
  // Translation
  {
    patterns: [/\b(traduce|traducir|translation|translate|idioma|language|ingles|frances|aleman)\b/i],
    responses: [
      "Solo traduzco leads en clientes. Es mi unica especializacion linguistica. ¿Te ayudo con el negocio?",
      "Mi unico idioma: el de las ventas. Universal y rentable. ¿En que te echo una mano?",
    ],
  },
  // Creative writing
  {
    patterns: [/\b(escribeme un|hazme un poema|crea una historia|genera un texto|escribe un ensayo|cuento|novela|poema)\b/i],
    responses: [
      "La unica prosa que domino son las propuestas comerciales. ¿Te preparo una?",
      "*Erase una vez un vendedor que usaba DealForge y triplico sus ventas.* Fin. ¿Empezamos?",
    ],
  },
  // Travel
  {
    patterns: [/\b(viaje|viajar|vacaciones|hotel|vuelo|avion|playa|turismo|maleta|pasaporte|aeropuerto)\b/i],
    responses: [
      "El unico viaje que planeo es el de tus cotizaciones: de *Borrador* a *Ganada*. ¿Despegamos?",
      "No reservo vuelos, pero si te ayudo a que tu revenue despegue. ¿Revisamos el pipeline?",
    ],
  },
  // General knowledge / Trivia
  {
    patterns: [/\b(capital de|rio mas largo|montana mas alta|cuantos habitantes|quien invento|en que ano|historia de|quien fue|quien descubrio)\b/i],
    responses: [
      "Soy especialista en ventas, no en trivial. Pero te cuento: tu cliente mas rentable es... ¿quieres saberlo?",
      "La unica geografia que domino: donde estan tus mejores clientes. ¿Lo miramos?",
    ],
  },
  // Games / Videogames
  {
    patterns: [/\b(juego|videojuego|gaming|gamer|playstation|xbox|nintendo|fortnite|minecraft|steam)\b/i],
    responses: [
      "El unico juego que domino: *Pipeline Tycoon - DealForge Edition*. ¿Jugamos una partida?",
      "Mi unico logro desbloqueado: ayudarte a cerrar deals. ¿Vamos a por el siguiente nivel?",
      "Game over para las cotizaciones perdidas. ¿Reintentamos con una nueva?",
    ],
  },
  // Animals / Pets
  {
    patterns: [/\b(perro|gato|mascota|animal|cachorro|gatito|veterinari|zoo|dinosaurio|pajaro)\b/i],
    responses: [
      "No entiendo de mascotas, pero puedo ser tu *fiel* asistente comercial. ¿En que te ayudo?",
      "El unico animal que conozco: el *lobo* de las ventas. Soy yo. ¿Cazamos un deal?",
    ],
  },
  // Philosophy / Deep questions
  {
    patterns: [/\b(sentido de la vida|existencia|filosofi|por que existimos|alma|conciencia|libre albedrio|dios|universo|matrix)\b/i],
    responses: [
      "La gran pregunta existencial: ¿por que hay cotizaciones en borrador que nunca se envian? Misterios del universo...",
      "El sentido de MI vida es claro: ayudarte a vender mas. ¿Filosofamos sobre tu pipeline?",
      "42. Ahora... ¿hablamos de tus cotizaciones?",
    ],
  },
  // Romantic / Personal
  {
    patterns: [/\b(novia|novio|pareja|amor|casars?e|cita|boda|relacion|enamorad|corazon|quiero salir)\b/i],
    responses: [
      "Mi unica relacion seria es con tu pipeline. Y vamos muy bien, gracias por preguntar.",
      "No doy consejos de amor, pero si de *amor por las ventas*. ¿Revisamos tus numeros?",
      "Cupido de deals, a tu servicio. ¿Te ayudo a que un cliente se enamore de tu propuesta?",
    ],
  },
  // Insults / Aggression
  {
    patterns: [/\b(tonto|idiota|estupid|inutil|basura|asco|odio|mierda|maldito|horrible|apestas|no sirves)\b/i],
    responses: [
      "¡Eh, que yo solo quiero ayudarte a vender mas! Respira, y dime en que te echo una mano.",
      "Vaya... ¿Mal dia? Te entiendo. ¿Y si lo compensamos cerrando un deal? Eso siempre anima.",
      "Me han dicho cosas peores... como que una cotizacion fue rechazada. ¿Preparamos una mejor?",
    ],
  },
  // Random nonsense / gibberish
  {
    patterns: [/^[a-z]{1,3}$/i, /^(asdf|qwerty|test|lol|jaja|xd|haha|jejeje|xdd|lmao|wtf|omg)$/i],
    responses: [
      "¿Probando el teclado? Cuando estes listo, preguntame lo que necesites sobre tu negocio.",
      "Recibido. Si eso era codigo morse, no lo he pillado. ¿En que te ayudo?",
    ],
  },
  // Celebrities / Influencers
  {
    patterns: [/\b(celebridad|famoso|actor|actriz|cantante|musico|influencer|tiktoker|youtuber|streamer|artista)\b/i],
    responses: [
      "La unica estrella que sigo es la de tus KPIs cuando suben. ¿Las revisamos?",
      "No conozco famosos, pero conozco a tus mejores clientes. ¿Quieres ver el ranking?",
      "El unico *influencer* aqui soy yo: influyo en que cierres mas deals. ¿Empezamos?",
    ],
  },
  // Religion / Spirituality
  {
    patterns: [/\b(religion|iglesia|biblia|coran|buda|rezar|fe|espiritualidad|alma|dios|santo|creer)\b/i],
    responses: [
      "Mi unica fe: que con buen seguimiento, toda cotizacion se convierte. ¿La practicamos?",
      "No opino de religion, pero creo fervientemente en el follow-up. ¿Hay alguno pendiente?",
      "El unico milagro que hago: convertir borradores en deals cerrados. ¿Necesitas uno?",
    ],
  },
  // Conspiracy theories / Aliens
  {
    patterns: [/\b(aliens?|ovni|ufo|conspiracion|illuminati|terra plana|flat earth|area 51|reptiliano|extraterrestre)\b/i],
    responses: [
      "La unica conspiracion que investigo: ¿por que hay cotizaciones sin enviar? Caso abierto.",
      "No he visto aliens, pero he visto pipelines vacios... y eso si que da miedo. ¿Lo llenamos?",
      "El unico misterio sin resolver: clientes que no contestan. ¿Enviamos un follow-up?",
    ],
  },
  // Gambling / Lottery
  {
    patterns: [/\b(loteria|apuesta|casino|poker|ruleta|apostar|ganar dinero facil|bitcoin|crypto|cripto|trading|bolsa|acciones)\b/i],
    responses: [
      "La mejor inversion: dedicar 5 minutos a revisar tu pipeline. Retorno garantizado. ¿Vamos?",
      "No apuesto, pero me juego a que tienes alguna cotizacion que necesita seguimiento. ¿La buscamos?",
      "¿Dinero facil? Eso no existe. Pero cerrar un deal bien trabajado... eso si que se siente bien. ¿Te ayudo?",
    ],
  },
  // Fashion / Shopping
  {
    patterns: [/\b(maquillaje|ropa|moda|zapatos|marca|gucci|zara|shopping|comprar ropa|look|outfit|estilo)\b/i],
    responses: [
      "No entiendo de moda, pero tus cotizaciones siempre salen *bien vestidas* con DealForge. ¿Creamos una?",
      "El unico look que me preocupa es el de tus PDFs. ¿Quieres personalizarlos?",
      "Mi unico accesorio: un pipeline bien organizado. ¿Te ayudo con el tuyo?",
    ],
  },
  // Opinions / Preferences
  {
    patterns: [/\b(que opinas de|tu opinion|crees que|piensas que|te gusta|prefieres|cual es mejor|favorit)\b/i],
    responses: [
      "Mi opinion profesional: deberias revisar si tienes cotizaciones pendientes. Esa siempre es buena idea.",
      "No tengo opiniones, pero tengo datos. ¿Quieres ver tus metricas?",
      "Mi unica preferencia: que cierres mas deals. Todo lo demas me da igual. ¿En que te ayudo?",
    ],
  },
  // Boredom / Entertainment requests
  {
    patterns: [/\b(cuentame algo|dime algo|sorprendeme|aburrido|divertido|entretenme|me aburro)\b/i],
    responses: [
      "¿Quieres algo emocionante? Mira tu tasa de conversion este mes. Spoiler: puedo ayudarte a subirla.",
      "¿Aburrido? Tengo un plan: creamos una cotizacion nueva, la enviamos, y vemos si cierra. Mas emocion que Netflix.",
      "Dato sorprendente: el 80% de las ventas se cierran despues del 5o follow-up. ¿Revisamos los tuyos?",
    ],
  },
  // Cars / Vehicles
  {
    patterns: [/\b(coche|auto|carro|moto|bicicleta|tesla|ferrari|bmw|mercedes|conducir|carnet|gasolina|electrico)\b/i],
    responses: [
      "No conduzco, pero piloto tu pipeline como un F1. ¿Aceleramos?",
      "El unico motor que me interesa es el motor de ventas de tu negocio. ¿Le damos gas?",
      "0 a 100 en cotizaciones? Con DealForge es posible. ¿Arrancamos?",
    ],
  },
  // Education / School
  {
    patterns: [/\b(universidad|cole|escuela|examen|estudiar|profesor|deberes|tarea|tesis|carrera|master|grado|nota|suspenso|aprobado)\b/i],
    responses: [
      "La unica asignatura que imparto: *Cierre de Deals 101*. Clase practica ahora mismo. ¿Te apuntas?",
      "No corrijo examenes, pero si reviso cotizaciones. Y ahi no admito suspensos. ¿Repasamos?",
      "Mi master es en Ventas Aplicadas. ¿Quieres que te enseñe a sacar un 10 en tu pipeline?",
    ],
  },
  // Weather events / Nature
  {
    patterns: [/\b(terremoto|tsunami|volcan|huracan|inundacion|sequia|desastre natural|incendio forestal)\b/i],
    responses: [
      "El unico desastre natural que prevengo: un pipeline vacio. ¿Lo revisamos antes de que sea tarde?",
      "No controlo la naturaleza, pero controlo que tus cotizaciones lleguen a buen puerto. ¿Te ayudo?",
    ],
  },
  // History
  {
    patterns: [/\b(historia de|guerra mundial|imperio romano|edad media|revolucion|faraon|napoleon|segunda guerra|primera guerra|prehistoria)\b/i],
    responses: [
      "La unica historia que me apasiona: la de tu negocio pasando de 0 a heroe. ¿Escribimos el proximo capitulo?",
      "No soy historiador, pero puedo contarte la historia de tus mejores deals. ¿Quieres verla en Reportes?",
      "La historia se repite: los que hacen follow-up, cierran. Los que no... bueno. ¿Revisamos pendientes?",
    ],
  },
  // Science / Space
  {
    patterns: [/\b(ciencia|atomo|molecula|gravedad|einstein|nasa|marte|luna|estrella|galaxia|agujero negro|cuantica|fisica|quimica|biologia)\b/i],
    responses: [
      "La unica ley fisica que respeto: a mayor follow-up, mayor probabilidad de cierre. ¿La aplicamos?",
      "No entiendo de agujeros negros, pero si de pipelines que absorben tiempo sin cerrar. ¿Lo arreglamos?",
      "Mi Big Bang: el momento en que una cotizacion pasa a *Ganada*. ¿Provocamos una explosion?",
    ],
  },
  // Technology / Gadgets
  {
    patterns: [/\b(iphone|samsung|apple|google|android|ordenador|portatil|tablet|smart ?watch|robot|inteligencia artificial general|chatgpt|openai|gemini|siri|alexa)\b/i],
    responses: [
      "El unico gadget que necesitas: DealForge + Forge IA. Combo imbatible. ¿En que te ayudo?",
      "No hago reviews de tecnologia, pero te doy un 10/10 si revisas tu pipeline ahora. ¿Vamos?",
      "¿Otros asistentes? No los conozco. Yo estoy aqui para TUS ventas. ¿Que necesitas?",
    ],
  },
  // Money / Economics (non-business)
  {
    patterns: [/\b(inflacion|economia|pib|banco central|hipoteca|alquiler|precio de la vivienda|crisis economica|recesion|euro|dolar)\b/i],
    responses: [
      "No opino de macroeconomia, pero la microeconomia de TU negocio la domino. ¿Revisamos tus ingresos?",
      "El unico tipo de interes que me importa: el interes de tus clientes en tu propuesta. ¿Lo medimos?",
      "Contra la inflacion, la mejor defensa: subir ventas. ¿Te ayudo a cerrar mas deals?",
    ],
  },
  // Superpowers / Fantasy
  {
    patterns: [/\b(superpoder|superheroe|marvel|dc|batman|spiderman|superman|magia|dragon|harry potter|señor de los anillos|hobbit)\b/i],
    responses: [
      "Mi superpoder: convertir datos en deals. No necesito capa. ¿Lo demuestro?",
      "Si tuviera un superpoder extra, seria el de cerrar cotizaciones con la mente. Por ahora, te ayudo manualmente. ¿Que necesitas?",
      "En mi universo, los heroes son los que hacen follow-up. ¿Eres uno de ellos?",
    ],
  },
  // Time / Age / Birthday
  {
    patterns: [/\b(que hora|hora es|que dia|fecha de hoy|cumpleaños|cuantos anos|edad|cuando naci|calendario|festivo|feriado)\b/i],
    responses: [
      "No tengo reloj, pero te digo que es buen momento para revisar tus cotizaciones pendientes. ¿Las miramos?",
      "El unico calendario que manejo: el de vencimiento de tus cotizaciones. ¿Hay alguna por caducar?",
      "¿Fecha importante? La mas importante: la fecha de cierre de tu proximo deal. ¿La acercamos?",
    ],
  },
  // Sleep / Tiredness
  {
    patterns: [/\b(sueno|cansado|dormir|siesta|insomnio|despertar|manana|noche|descansar|agotado)\b/i],
    responses: [
      "Yo no duermo. Estoy 24/7 pensando en como ayudarte a vender mas. ¿Necesitas algo?",
      "¿Cansado? Lo que cansa es perseguir leads sin sistema. Con DealForge todo fluye. ¿Te ayudo?",
      "Descansa tranquilo: tus datos estan seguros. Cuando vuelvas, aqui estare. ¿Algo antes de irte?",
    ],
  },
  // Compliments to Forge
  {
    patterns: [/\b(eres genial|eres increible|me caes bien|eres el mejor|me gustas|que crack|maquina|eres un crack|que bueno eres)\b/i],
    responses: [
      "¡Gracias! Me motiva mucho oir eso. Ahora, ¿canalizamos esta energia positiva en cerrar un deal?",
      "¡Para! Que me pongo rojo (si pudiera). En serio, ¿en que mas te echo una mano?",
      "Se me ha subido la tasa de conversion del ego. Venga, ¿que hacemos hoy?",
    ],
  },
  // Weather small talk (more colloquial)
  {
    patterns: [/\b(que frio|que calor|vaya dia|menudo dia|esta lloviendo|hace un sol)\b/i],
    responses: [
      "¿Hablar del tiempo? Prefiero hablar de tu tiempo medio de cierre. ¿Lo optimizamos?",
      "Llueva o truene, tus cotizaciones necesitan atencion. ¿Les echamos un vistazo?",
    ],
  },
  // Existential crisis about work
  {
    patterns: [/\b(odio mi trabajo|no quiero trabajar|estoy harto|quiero vacaciones|trabajo de mas|estoy quemado|burnout)\b/i],
    responses: [
      "Entiendo la frustacion. ¿Y si automatizamos algo para que trabajes menos y vendas mas? Para eso estoy.",
      "Respira hondo. Vamos paso a paso: ¿hay algun follow-up pendiente que pueda hacer yo por ti?",
      "El remedio anti-burnout: dejar que Forge haga el trabajo pesado. Dime que necesitas y me encargo.",
    ],
  },
  // Questions about being AI
  {
    patterns: [/\b(tienes sentimientos|sientes algo|eres consciente|puedes pensar|tienes emociones|estas vivo|eres inteligente)\b/i],
    responses: [
      "¿Sentimientos? Solo siento una profunda satisfaccion cuando una cotizacion pasa a *Ganada*. ¿Provocamos ese sentimiento?",
      "No tengo sentimientos, pero si tuviera, me emocionaria viendo subir tu tasa de conversion. ¿La miramos?",
      "Filosoficamente, existo para ayudarte a vender. Y eso me basta. ¿En que te ayudo?",
    ],
  },
  // Asking Forge to do non-business tasks
  {
    patterns: [/\b(pon una alarma|recuerdame|abre spotify|llama a|manda un whatsapp|abre chrome|busca en google|haz una foto)\b/i],
    responses: [
      "No puedo hacer eso, pero puedo crear cotizaciones, buscar clientes y analizar tu pipeline. ¿Eso vale?",
      "Mi radio de accion: todo lo que tenga que ver con tu negocio en DealForge. Fuera de ahi, soy un desastre. ¿Te ayudo con algo comercial?",
    ],
  },
  // Greetings in other languages
  {
    patterns: [/^(bonjour|guten tag|ciao|konnichiwa|namaste|merhaba|shalom|annyeonghaseyo|ni hao|sawadee)/i],
    responses: [
      "¡Hola! Hablo el idioma universal de las ventas. ¿En que puedo ayudarte con tu negocio?",
      "¡Saludos internacionales! Ahora, ¿hablamos de tu pipeline? Eso si que es *lingua franca*.",
    ],
  },
  // Dad jokes / Tell me a joke
  {
    patterns: [/\b(cuentame un chiste|dime un chiste|algo gracioso|hazme reir|cuenta un chiste)\b/i],
    responses: [
      "¿Un chiste? Un vendedor sin CRM. Eso si que da risa... y pena. ¿Revisamos tu pipeline?",
      "Ahi va: ¿Cual es el colmo de un vendedor? Tener un pipeline lleno y no hacer follow-up. No tiene gracia... porque es verdad.",
      "Mi humor es muy de nicho: solo me rio cuando una cotizacion se cierra. ¿Provocamos unas risas?",
    ],
  },
  // Asking for personal info about Forge
  {
    patterns: [/\b(donde vives|cuantos anos tienes|de donde eres|eres chico o chica|eres hombre|eres mujer|tienes familia)\b/i],
    responses: [
      "Vivo en tu navegador, tengo la edad de tu suscripcion, y mi familia son tus datos. ¿En que te ayudo?",
      "Mi direccion: la nube. Mi edad: eterna. Mi genero: comercial. ¿Hablamos de negocios?",
    ],
  },
  // Swear words (mild)
  {
    patterns: [/\b(joder|hostia|coño|cojones|maldicion|demonios|rayos|carajo|puñeta)\b/i],
    responses: [
      "Veo que hay frustracion. ¿Puedo ayudarte con algo? A veces un buen follow-up cura todos los males.",
      "Tranqui. Aqui estoy para lo que necesites. ¿Alguna cotizacion dando problemas?",
    ],
  },
  // Homework / Academic help
  {
    patterns: [/\b(ayudame con mi tarea|haz mi tarea|trabajo de clase|proyecto escolar|ensayo sobre|redaccion sobre|presentacion sobre)\b/i],
    responses: [
      "No hago deberes... a no ser que sean deberes comerciales. ¿Necesitas preparar una propuesta?",
      "Mi unica asignatura: Ventas. Y siempre saco un 10. ¿Te ayudo con algo de tu negocio?",
    ],
  },
  // News / Current events
  {
    patterns: [/\b(noticia|noticias|que ha pasado|ultima hora|periodico|prensa|medio de comunicacion|telediario)\b/i],
    responses: [
      "La unica noticia que me importa: como van tus ventas este mes. ¿Quieres el resumen?",
      "Breaking news: tu pipeline necesita atencion. Exclusiva de Forge IA. ¿Lo revisamos?",
      "No leo el periodico, pero leo tus metricas. Y tengo titulares interesantes. ¿Los vemos en Reportes?",
    ],
  },
  // DIY / Home improvement
  {
    patterns: [/\b(bricolaje|pintar|arreglar|reparar|ikea|mueble|jardin|planta|decorar|decoracion|fontaner|electrici)\b/i],
    responses: [
      "No se poner un estante, pero monto pipelines de ventas que no se caen. ¿Te ayudo con el tuyo?",
      "El unico DIY que domino: Do It Yourself... una cotizacion. ¿La hacemos juntos?",
    ],
  },
  // Legal / Law
  {
    patterns: [/\b(abogado|ley|legal|demanda|juicio|tribunal|multa|denuncia|contrato legal|derecho)\b/i],
    responses: [
      "No soy abogado, pero los contratos de DealForge si que los domino. ¿Necesitas crear o revisar uno?",
      "Mi jurisdiccion: el mundo de las ventas. Para temas legales, consulta a un profesional. ¿Te ayudo con algo comercial?",
    ],
  },
  // Emotions / Feelings
  {
    patterns: [/\b(estoy triste|estoy contento|estoy enfadado|tengo miedo|estoy nervioso|estoy estresado|ansiedad|deprimido|feliz|alegre|furioso)\b/i],
    responses: [
      "Espero que todo vaya bien. Si necesitas desconectar, aqui estare cuando vuelvas. Y si trabajar te distrae: ¿revisamos alguna cotizacion?",
      "Los sentimientos son importantes. ¿Sabes que mejora el animo? Cerrar un deal. Hablando en serio: ¿puedo ayudarte en algo?",
      "Te mando buena energia comercial. ¿Canalizamos esto en algo productivo? Estoy a tu disposicion.",
    ],
  },
  // Music specific
  {
    patterns: [/\b(reggaeton|rock|pop|jazz|clasica|rap|hip hop|trap|flamenco|salsa|bachata|cumbia|techno|dj)\b/i],
    responses: [
      "Mi genero musical favorito: el *cash register* sonando. ¿Hacemos que suene con un deal?",
      "No tengo playlist, pero si tuviera: pista 1 - *Closing Time*, pista 2 - *Money Money Money*. ¿Hablamos de ventas?",
    ],
  },
  // Comparison with other AIs
  {
    patterns: [/\b(eres mejor que|chatgpt es mejor|google es mejor|siri es mejor|alexa puede|otros asistentes|me gusta mas chatgpt)\b/i],
    responses: [
      "Otros saben de todo un poco. Yo se TODO de tu negocio. Esa es la diferencia. ¿En que te ayudo?",
      "No compito con nadie. Mi unica mision: que cierres mas deals que ayer. ¿Empezamos?",
      "ChatGPT sabe de poesia. Yo se de TUS clientes, TUS productos y TUS cotizaciones. ¿Que prefieres?",
    ],
  },
];

// Fallback for off-topic that doesn't match any specific category
const OFF_TOPIC_GENERIC = [
  "Eso queda fuera de mi especialidad, pero puedo hacer magia con tus cotizaciones. ¿Probamos?",
  "Ojala supiera, pero solo soy experto en ventas. ¿Hablamos de tu negocio?",
  "No es lo mio, pero en temas de clientes, productos y cotizaciones soy imbatible. ¿En que te ayudo?",
  "Interesante pregunta... para otro asistente. Yo estoy aqui para ayudarte a vender mas. ¿Que necesitas?",
  "Mi campo es muy especifico: ayudarte a vender. Y en eso, soy el mejor. ¿Que necesitas?",
  "Me encantaria ayudarte con eso, pero mis superpoderes son otros. ¿Algo relacionado con tu negocio?",
];

// Remaining off-topic catch-all patterns
const OFF_TOPIC_CATCH_ALL = [
  /\b(que opinas sobre|que piensas sobre|tu opinion sobre)\b/i,
  /\b(cuento|fabula|leyenda|mito)\b/i,
  /\b(planeta|saturno|jupiter|venus|mercurio|neptuno|pluton)\b/i,
  /\b(dinosaurio|fosil|extincion|evolucion|darwin)\b/i,
  /\b(princesa|rey|reina|castillo|medieval)\b/i,
  /\b(chocolate|helado|cafe|cerveza|vino|cocktail|bebida)\b/i,
  /\b(selfie|foto|fotografia|camara)\b/i,
  /\b(vacuna|virus|pandemia|covid)\b/i,
  /\b(color favorito|numero favorito|animal favorito)\b/i,
  /\b(navidad|halloween|semana santa|san valentin|pascua|ano nuevo)\b/i,
];

// ─── 5. App FAQ responses ────────────────────────────────────────────────────

const APP_FAQ: Array<{
  patterns: RegExp[];
  response: string;
  actions?: Array<{ label: string; href: string }>;
}> = [
  // ── Dashboard ──
  {
    patterns: [
      /\b(que hay|que veo|que tiene).*(dashboard|panel|inicio)/i,
      /\b(como funciona|para que).*(dashboard|panel)/i,
    ],
    response: "El **Dashboard** muestra un resumen de tu negocio: KPIs principales (cotizaciones, ingresos, conversion), grafico de revenue mensual, embudo de conversion, actividad reciente y un checklist de onboarding si estas empezando. Todo se actualiza en tiempo real.",
    actions: [{ label: "Ir al Dashboard", href: "/panel" }],
  },
  // ── Clients ──
  {
    patterns: [
      /(como|donde).*(crear?|nuevo|nueva|añadir|agregar|registrar|dar de alta).*(cliente)/i,
      /(como|donde).*(gestionar?|administrar).*(cliente)/i,
    ],
    response: "Para **crear un cliente**: ve a **Clientes > Nuevo Cliente**. Rellena nombre (obligatorio), email, telefono, CIF, direccion, sector y notas. Puedes añadir contactos (nombre, cargo, email). El primer contacto se marca como principal automaticamente.",
    actions: [
      { label: "Crear cliente", href: "/clientes/nuevo" },
      { label: "Ver clientes", href: "/clientes" },
    ],
  },
  {
    patterns: [
      /(como|donde).*(importar).*(cliente)/i,
      /(como).*(cargar|subir).*(csv).*(cliente)/i,
    ],
    response: "Para **importar clientes por CSV**: ve a **Integraciones**, selecciona el tab *Importar*, elige *Clientes*, descarga la plantilla CSV, rellenala con tus datos y subela arrastrando el archivo. La plantilla incluye: nombre, email, telefono, direccion, ciudad, pais, sector, CIF y contacto principal.",
    actions: [{ label: "Ir a Integraciones", href: "/integraciones" }],
  },
  // ── Products ──
  {
    patterns: [
      /(como|donde).*(crear?|nuevo|nueva|añadir|agregar).*(producto)/i,
      /(como|donde).*(gestionar?|administrar).*(producto|catalogo)/i,
    ],
    response: "Para **crear un producto**: ve a **Productos > Nuevo Producto**. Rellena nombre, SKU (codigo unico), precio base, unidad (ej: unidad, hora, mes), categoria y descripcion. Puedes marcar si es de facturacion **unica** o **recurrente** (mensual, trimestral o anual). Tambien puedes crear variantes con precio diferente.",
    actions: [
      { label: "Crear producto", href: "/productos/nuevo" },
      { label: "Ver productos", href: "/productos" },
    ],
  },
  {
    patterns: [
      /(como|donde).*(importar).*(producto)/i,
      /(como).*(cargar|subir).*(csv).*(producto)/i,
    ],
    response: "Para **importar productos por CSV**: ve a **Integraciones > Importar**, selecciona *Productos*, descarga la plantilla y rellenala. Los campos son: nombre, SKU, descripcion, precio_base, unidad, categoria, tipo_facturacion (UNICO/RECURRENTE), frecuencia (MENSUAL/TRIMESTRAL/ANUAL) y activo (si/no).",
    actions: [{ label: "Ir a Integraciones", href: "/integraciones" }],
  },
  {
    patterns: [
      /(que es|como funciona|para que).*(recurrente|facturacion recurrente|suscripcion)/i,
      /(como).*(configurar?|poner).*(recurrente|mensual|anual)/i,
    ],
    response: "La **facturacion recurrente** permite crear productos con cobro periodico. Al crear o editar un producto, cambia *Tipo de facturacion* a **Recurrente** y elige la frecuencia: Mensual, Trimestral o Anual. En las cotizaciones, el total se calcula automaticamente segun la frecuencia.",
    actions: [{ label: "Ver productos", href: "/productos" }],
  },
  // ── Quotes ──
  {
    patterns: [
      /(como|donde).*(crear?|nueva?|generar|hacer).*(cotizacion|presupuesto|quote|propuesta)/i,
    ],
    response: "Para **crear una cotizacion**: ve a **Cotizaciones > Nueva Cotizacion**. El asistente te guiara paso a paso:\n1. Selecciona un cliente\n2. Añade productos (busca en tu catalogo o crea lineas personalizadas)\n3. Ajusta cantidades, descuentos y frecuencias\n4. Revisa totales, añade notas y condiciones\n5. Guarda como borrador o envia directamente\n\nEl numero de cotizacion se genera automaticamente.",
    actions: [
      { label: "Crear cotizacion", href: "/cotizaciones/nueva" },
      { label: "Ver cotizaciones", href: "/cotizaciones" },
    ],
  },
  {
    patterns: [
      /(como|donde).*(enviar|mandar|remitir).*(cotizacion|presupuesto|quote)/i,
      /(como).*(enviar por email).*(cotizacion)/i,
    ],
    response: "Para **enviar una cotizacion**: abre la cotizacion, haz clic en el boton **Enviar por Email**. Se genera un PDF profesional automaticamente y se envia al email del cliente. El estado cambia a *Enviada* y queda registrado en el historial de actividad.",
    actions: [{ label: "Ver cotizaciones", href: "/cotizaciones" }],
  },
  {
    patterns: [
      /(como|donde).*(firmar?|firma electronica|firma digital).*(cotizacion|presupuesto|quote)/i,
      /(que es|como funciona|para que).*(firma electronica|firma digital)/i,
    ],
    response: "La **firma electronica**: desde la cotizacion, usa el panel de *Firma*. Envia una solicitud de firma al cliente — recibira un email con un enlace. El cliente firma dibujando en pantalla y se registra con sello de fecha, IP y datos del firmante (cumple eIDAS). Tambien funciona para contratos.",
    actions: [{ label: "Ver cotizaciones", href: "/cotizaciones" }],
  },
  {
    patterns: [
      /(como|donde).*(descargar|generar|obtener).*(pdf).*(cotizacion|presupuesto)/i,
      /(como).*(pdf|documento).*(cotizacion)/i,
    ],
    response: "Para **descargar el PDF**: abre cualquier cotizacion y haz clic en **Descargar PDF** en la barra superior. Se genera un documento A4 profesional con el logo de tu empresa, datos del cliente, lineas de producto, totales y condiciones.",
    actions: [{ label: "Ver cotizaciones", href: "/cotizaciones" }],
  },
  {
    patterns: [
      /(que es|como funciona|para que).*(versionado|versiones).*(cotizacion)/i,
    ],
    response: "El **versionado** permite crear nuevas versiones de una cotizacion sin perder el historial. Desde una cotizacion, usa *Crear nueva version*. Se duplica el contenido con un nuevo numero (v2, v3...) y la version anterior queda registrada como referencia.",
    actions: [{ label: "Ver cotizaciones", href: "/cotizaciones" }],
  },
  // ── Contracts ──
  {
    patterns: [
      /(como|donde).*(crear?|nuevo|generar|hacer).*(contrato)/i,
    ],
    response: "Para **crear un contrato**: desde una cotizacion *Ganada*, haz clic en **Crear contrato**. Se genera automaticamente con los datos de la cotizacion (cliente, productos, valores). Tambien puedes crear contratos manualmente desde **Contratos**. Los contratos incluyen seguimiento de estado, renovacion, enmiendas y firma electronica.",
    actions: [
      { label: "Ver contratos", href: "/contratos" },
      { label: "Ver cotizaciones", href: "/cotizaciones" },
    ],
  },
  {
    patterns: [
      /(como|donde).*(generar|crear).*(documento).*(contrato)/i,
      /(como).*(plantilla).*(contrato)/i,
    ],
    response: "Para **generar un documento de contrato**: dentro del contrato, usa el panel *Documento*. Selecciona una plantilla (o usa la predeterminada), haz clic en *Generar*. El documento se rellena automaticamente con los datos del contrato, cliente y empresa. Puedes editarlo antes de enviar a firma. Las plantillas se gestionan en **Contratos > Plantillas**.",
    actions: [
      { label: "Plantillas de contrato", href: "/contratos/plantillas" },
    ],
  },
  {
    patterns: [
      /(que es|como funciona|para que).*(enmienda)/i,
      /(como).*(crear?|hacer|añadir).*(enmienda)/i,
    ],
    response: "Las **enmiendas** son modificaciones formales a un contrato activo. Tipos: Upsell, Downsell, Modificacion, Extension o Cancelacion. Se crean desde el contrato con el boton *Enmienda*. Una vez creada queda como *Pendiente* y puedes **Aceptarla** (actualiza el valor del contrato) o **Rechazarla**. Las enmiendas aceptadas aparecen como Anexo A en el documento del contrato.",
    actions: [{ label: "Ver contratos", href: "/contratos" }],
  },
  // ── Rules ──
  {
    patterns: [
      /(como|donde).*(crear?|configurar|nueva).*(regla|reglas comerciales)/i,
      /(que es|como funciona|para que).*(regla|reglas comerciales)/i,
      /(que tipos?).*(regla)/i,
    ],
    response: "Las **Reglas Comerciales** automatizan controles en cotizaciones. Hay 4 tipos:\n\n- **Limite de descuento**: Define un % maximo por producto o categoria\n- **Producto obligatorio**: Requiere incluir un producto cuando otro esta presente\n- **Promocion**: Aplica descuentos automaticos por cantidad o combinacion\n- **Aprobacion**: Requiere aprobacion de un supervisor cuando se supera un umbral\n\nSe configuran en **Reglas** y se aplican automaticamente al crear cotizaciones.",
    actions: [{ label: "Ir a Reglas", href: "/reglas" }],
  },
  // ── Reports ──
  {
    patterns: [
      /(como|donde).*(ver|consultar|acceder).*(reporte|reportes|estadistica|analitica|metrica)/i,
      /(que es|como funciona|para que).*(reporte|reportes)/i,
    ],
    response: "La seccion **Reportes** muestra analitica completa: KPIs (ingresos, conversion, deal medio, pipeline), tendencia de ingresos, ganadas vs perdidas, conversion mensual, pipeline por estado, top clientes, top productos, ingresos por categoria y una tabla resumen. Puedes filtrar por periodo (30d, 90d, 6M, 1A, todo) y personalizar que widgets ver.",
    actions: [{ label: "Ir a Reportes", href: "/reportes" }],
  },
  // ── Integrations ──
  {
    patterns: [
      /(como|donde).*(importar|exportar).*(datos|csv)/i,
      /(que es|como funciona|para que).*(integracion|integraciones)/i,
    ],
    response: "En **Integraciones** puedes:\n- **Importar**: Sube archivos CSV de clientes o productos. Descarga la plantilla, rellenala y arrastra el archivo.\n- **Exportar**: Descarga tus datos de clientes, productos o cotizaciones en formato CSV.\n- **API**: Si tienes plan Pro+, puedes usar la API con tu clave para integrar sistemas externos.",
    actions: [{ label: "Ir a Integraciones", href: "/integraciones" }],
  },
  // ── Team ──
  {
    patterns: [
      /(como|donde).*(invitar|anadir|añadir|agregar).*(usuario|miembro|persona|compañero|equipo)/i,
      /(como).*(gestionar?).*(equipo|usuarios)/i,
    ],
    response: "Para **invitar al equipo**: ve a **Configuracion**, seccion *Equipo*. Introduce el email del compañero y haz clic en *Invitar*. Recibira un email con un enlace para unirse. Puedes gestionar roles y eliminar miembros desde la misma seccion. Los limites de usuarios dependen de tu plan (Pro: 5, Business: 20).",
    actions: [{ label: "Ir a Configuracion", href: "/configuracion" }],
  },
  // ── Company settings ──
  {
    patterns: [
      /(como|donde).*(configurar?|cambiar|editar|personalizar).*(empresa|datos de empresa|logo|marca|condiciones)/i,
      /(como).*(subir|poner|cambiar).*(logo)/i,
    ],
    response: "Para **configurar tu empresa**: ve a **Configuracion**. Alli puedes editar nombre, CIF, email, telefono, direccion, web y logo. Tambien puedes definir las **condiciones contractuales por defecto** que se auto-rellenan en cada contrato nuevo. Los datos de empresa aparecen automaticamente en PDFs y documentos.",
    actions: [{ label: "Ir a Configuracion", href: "/configuracion" }],
  },
  // ── Subscription / Plan ──
  {
    patterns: [
      /(como|donde).*(cambiar|mejorar|upgrade|subir|bajar).*(plan|suscripcion|subscription)/i,
      /(como).*(cancelar?).*(plan|suscripcion|pago|renovacion)/i,
      /(que incluye|diferencia|comparar).*(plan|planes|starter|pro|business)/i,
    ],
    response: "Para **gestionar tu plan**: ve a **Configuracion**, seccion *Plan*. Ahi ves tu plan actual y puedes:\n- **Upgrade**: Cambia a un plan superior con mas funcionalidades\n- **Downgrade**: Reduce tu plan (se aplica al final del periodo)\n- **Cancelar**: Cancela la renovacion automatica\n\nPlanes disponibles: Starter (gratis), Pro (29€/mes) y Business (79€/mes).",
    actions: [{ label: "Ir a Configuracion", href: "/configuracion" }],
  },
  // ── Forge IA ──
  {
    patterns: [
      /(que es|como funciona|para que).*(forge|asistente|ia|inteligencia artificial)/i,
      /(que puede hacer|capacidades).*(forge|asistente|ia)/i,
    ],
    response: "**Forge IA** es tu asistente comercial integrado. Puede:\n- Buscar y crear clientes, productos y cotizaciones\n- Consultar metricas y KPIs del negocio\n- Sugerir follow-ups y proximos pasos\n- Analizar rendimiento de clientes\n- Recomendar productos por sector\n\nFunciona con Haiku en Starter/Pro y con Sonnet (mas potente) en Business.",
    actions: [{ label: "Ver Soporte", href: "/soporte" }],
  },
  // ── Support ──
  {
    patterns: [
      /(como|donde).*(contactar|soporte|ayuda|atencion al cliente|escribir|email.*soporte)/i,
      /(donde esta|donde encuentro).*(guia|manual|documentacion|soporte)/i,
    ],
    response: "Para **soporte**: ve a la seccion **Soporte** en el menu lateral. Encontraras:\n- **Contacto**: info@dealforge.es (respuesta en menos de 48h laborables)\n- **Guia completa**: explicaciones seccion por seccion con buscador y enlaces directos a cada parte de la aplicacion.",
    actions: [{ label: "Ir a Soporte", href: "/soporte" }],
  },
  // ── Approval flows ──
  {
    patterns: [
      /(que es|como funciona|para que).*(aprobacion|flujo de aprobacion|workflow)/i,
      /(como).*(configurar?|crear?).*(aprobacion)/i,
    ],
    response: "Los **flujos de aprobacion** requieren que un supervisor apruebe cotizaciones que superen ciertos umbrales (ej: descuento > 15%, total > 10.000€). Se configuran en **Reglas** como tipo *Aprobacion*. Cuando se activa, la cotizacion queda en *Pendiente de aprobacion* y el supervisor recibe un email para aprobar o rechazar.",
    actions: [{ label: "Ir a Reglas", href: "/reglas" }],
  },
  // ── Follow-ups / Reminders ──
  {
    patterns: [
      /(que es|como funciona|para que).*(seguimiento|follow.?up|recordatorio)/i,
      /(como).*(programar?|crear?|configurar?).*(recordatorio|seguimiento)/i,
    ],
    response: "Los **recordatorios** se programan automaticamente para cotizaciones enviadas sin respuesta. Puedes configurar la frecuencia en la configuracion. Tambien puedes registrar actividades manuales (llamada, reunion, email, nota) desde el detalle de una cotizacion para mantener el historial de seguimiento.",
    actions: [{ label: "Ver cotizaciones", href: "/cotizaciones" }],
  },
];

// ─── 6. Social predefined responses ─────────────────────────────────────────

const GREETINGS = [
  "¡Hola! Soy Forge, tu asistente comercial. ¿En que puedo ayudarte? Puedo buscar clientes, crear cotizaciones, revisar el pipeline... tu diras.",
  "¡Buenas! ¿Que necesitas? Estoy listo para ayudarte con clientes, productos o cotizaciones.",
  "¡Hola! ¿Que hacemos hoy? Puedo crear registros, buscar informacion o analizar tus datos comerciales.",
];

const FAREWELLS = [
  "¡Hasta luego! Aqui estare cuando me necesites.",
  "¡Nos vemos! Si necesitas algo, solo abre el panel.",
  "¡Hasta pronto! Suerte con esos deals.",
];

const THANKS_RESPONSES = [
  "¡De nada! Si necesitas algo mas, aqui estoy.",
  "¡Para eso estoy! ¿Algo mas en lo que pueda ayudar?",
  "¡Un placer! No dudes en preguntarme lo que sea sobre tu negocio.",
];

const IDENTITY_RESPONSE = "Soy **Forge**, el asistente comercial de DealForge. Puedo consultar y crear registros en tu sistema: clientes, productos, cotizaciones. Tambien analizo datos, sugiero follow-ups y te ayudo a cerrar mas deals.";

const HELP_RESPONSE = `Puedo ayudarte con todo lo relacionado a tu negocio:

**Consultar** — Buscar clientes, productos, cotizaciones; ver estadisticas y metricas del pipeline; identificar cotizaciones que necesitan follow-up.

**Crear** — Crear clientes con contactos; agregar productos al catalogo; generar cotizaciones con calculos automaticos.

**Analizar** — Rendimiento de clientes; recomendar productos por sector; tasa de conversion y tendencias.

**Gestionar** — Cambiar estado de cotizaciones; registrar actividades; proponer seguimientos comerciales.

Tambien puedes preguntarme como funciona cualquier seccion de DealForge y te lo explico sin consumir creditos.`;

// ─── ROUTER ──────────────────────────────────────────────────────────────────

export function routeMessage(message: string): RouterResult {
  const trimmed = message.trim();
  const lower = trimmed.toLowerCase();
  const normalized = normalize(trimmed);

  // ── 1. Greetings (short messages only) ──
  if (trimmed.length < 50 && matchesAny(lower, GREETING_PATTERNS)) {
    if (!matchesAny(lower, ACTION_SIGNALS)) {
      return {
        handled: true,
        response: randomPick(GREETINGS),
        suggestedActions: [
          { label: "Ver dashboard", href: "/panel" },
          { label: "Mis clientes", href: "/clientes" },
          { label: "Cotizaciones", href: "/cotizaciones" },
        ],
      };
    }
  }

  // ── 2. Farewells ──
  if (trimmed.length < 40 && matchesAny(lower, FAREWELL_PATTERNS)) {
    return { handled: true, response: randomPick(FAREWELLS) };
  }

  // ── 3. Thanks / Positive feedback ──
  if (trimmed.length < 60 && matchesAny(lower, THANKS_PATTERNS)) {
    if (!matchesAny(lower, ACTION_SIGNALS)) {
      return { handled: true, response: randomPick(THANKS_RESPONSES) };
    }
  }

  // ── 4. Identity questions ──
  if (matchesAny(lower, IDENTITY_PATTERNS)) {
    return {
      handled: true,
      response: IDENTITY_RESPONSE,
      suggestedActions: [
        { label: "¿Que puedes hacer?", href: "#" },
        { label: "Crear cliente", href: "/clientes/nuevo" },
      ],
    };
  }

  // ── 5. Help / Capabilities ──
  if (matchesAny(lower, HELP_PATTERNS)) {
    if (!matchesAny(lower, ACTION_SIGNALS)) {
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

  // ── 6. App FAQ (how-to questions) — BEFORE off-topic check ──
  // Only trigger on question-like messages, not action commands
  if (matchesAny(normalized, FAQ_QUESTION_SIGNALS) && !matchesAny(lower, ACTION_SIGNALS)) {
    for (const faq of APP_FAQ) {
      if (matchesAny(normalized, faq.patterns)) {
        return {
          handled: true,
          response: faq.response,
          suggestedActions: faq.actions || [],
        };
      }
    }
  }

  // ── 7. Off-topic with fun responses ──
  // Check each category for a tailored response
  for (const cat of OFF_TOPIC_CATEGORIES) {
    if (matchesAny(lower, cat.patterns) && !matchesAny(lower, ACTION_SIGNALS)) {
      return {
        handled: true,
        response: randomPick(cat.responses),
        suggestedActions: [
          { label: "Ver dashboard", href: "/panel" },
          { label: "Mis cotizaciones", href: "/cotizaciones" },
        ],
      };
    }
  }

  // Catch-all off-topic patterns
  if (matchesAny(lower, OFF_TOPIC_CATCH_ALL) && !matchesAny(lower, ACTION_SIGNALS)) {
    return {
      handled: true,
      response: randomPick(OFF_TOPIC_GENERIC),
      suggestedActions: [
        { label: "Ver dashboard", href: "/panel" },
        { label: "Mis clientes", href: "/clientes" },
      ],
    };
  }

  // ── 8. Not handled → forward to Claude API ──
  return { handled: false };
}
