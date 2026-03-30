import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { notifyIndexNow } from "@/lib/indexnow";

// One-time seed endpoint for blog posts — requires authentication
export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const post = {
    slug: "como-hacer-cotizacion-profesional-guia-completa",
    titulo: "Cómo hacer una cotización profesional: guía completa para cerrar más ventas",
    extracto: "Aprende a crear cotizaciones y presupuestos profesionales que conviertan. Descubre los elementos clave, errores comunes y cómo un software de cotizaciones puede ahorrarte horas de trabajo.",
    contenido: `<p>Si alguna vez has perdido un cliente porque tu cotización llegó tarde, tenía errores o simplemente no transmitía profesionalidad, este artículo es para ti. <strong>Crear presupuestos y cotizaciones</strong> es una de esas tareas que parece simple, pero que marca la diferencia entre cerrar una venta o perderla.</p>

<p>Vamos a ver, paso a paso, cómo hacer una cotización que realmente funcione. Sin rodeos, con ejemplos prácticos y con ese toque que hará que tu cliente diga &ldquo;sí, quiero trabajar contigo&rdquo;.</p>

<h2>Presupuesto vs. cotización: &iquest;son lo mismo?</h2>

<p>Antes de entrar en materia, aclaremos algo que genera mucha confusión. Un <strong>presupuesto</strong> se refiere a los recursos económicos disponibles para invertir en algo. Una <strong>cotización</strong>, en cambio, es el documento donde le dices a tu cliente cuánto costará lo que necesita.</p>

<p>En la práctica, muchas empresas usan ambos términos de forma intercambiable. Lo importante no es cómo lo llames, sino que el documento sea claro, profesional y que llegue a tiempo.</p>

<h2>Los 7 elementos que toda cotización profesional debe tener</h2>

<p>Una cotización efectiva no es solo una lista de precios. Es tu carta de presentación comercial. Estos son los elementos imprescindibles:</p>

<h3>1. Datos de tu empresa</h3>
<p>Logo, nombre o razón social, CIF/NIF, dirección, teléfono y email. Parece obvio, pero te sorprendería cuántas cotizaciones llegan sin datos de contacto completos. Tu cliente necesita saber exactamente con quién está tratando.</p>

<h3>2. Datos del cliente</h3>
<p>Nombre de la empresa, persona de contacto, email y teléfono. Personalizar la cotización con el nombre del cliente ya genera una impresión mucho más profesional que un &ldquo;Estimado cliente&rdquo; genérico.</p>

<h3>3. Número de referencia</h3>
<p>Un sistema de numeración consecutiva (por ejemplo, COT-2026-0042) te permite llevar un control ordenado y facilita la comunicación. Cuando tu cliente te diga &ldquo;he visto tu propuesta&rdquo;, ambos sabréis exactamente de cuál habla.</p>

<h3>4. Descripción detallada de productos o servicios</h3>
<p>Aquí es donde muchos fallan. No basta con poner &ldquo;Servicio de consultoría: 5.000 EUR&rdquo;. Desglosa cada línea con descripción clara, cantidad, precio unitario y descuentos si los hay. <strong>Cuanto más transparente seas, más confianza generas.</strong></p>

<h3>5. Impuestos y totales</h3>
<p>Indica claramente el subtotal, el IVA (o impuesto aplicable) y el total final. No dejes que tu cliente tenga que hacer cálculos mentales. Facilita las cosas.</p>

<h3>6. Condiciones comerciales</h3>
<p>Forma de pago, plazo de entrega, validez de la cotización y cualquier condición especial. Esto evita malentendidos y protege a ambas partes. Una cotización sin condiciones es una bomba de relojería.</p>

<h3>7. Fecha de vencimiento</h3>
<p>Establece una fecha límite clara. Esto genera urgencia (sin ser agresivo) y te permite gestionar mejor tu pipeline de ventas. Lo habitual son 15 o 30 días, dependiendo del sector.</p>

<h2>Los 5 errores que matan tus cotizaciones</h2>

<p>Ahora que sabes qué incluir, veamos qué errores evitar. Estos son los más comunes y los más dañinos:</p>

<ol>
<li><strong>Tardar demasiado en enviarla.</strong> Si tu competencia envía la cotización el mismo día y tú tardas una semana, ya has perdido. La velocidad importa, y mucho.</li>
<li><strong>Errores en los cálculos.</strong> Nada destruye más la confianza que un presupuesto con números que no cuadran. Revisar los totales debería ser sagrado.</li>
<li><strong>Falta de personalización.</strong> Enviar la misma cotización genérica a todos tus clientes es como enviar un CV sin carta de presentación. Adapta cada propuesta.</li>
<li><strong>Diseño poco profesional.</strong> Tu cotización refleja tu marca. Si parece hecha en 5 minutos con una hoja de cálculo, esa será la percepción de tu servicio.</li>
<li><strong>No hacer seguimiento.</strong> Enviar y olvidar. El 80% de las ventas requieren al menos 5 contactos de seguimiento. No dejes que tu cotización se pierda en la bandeja de entrada.</li>
</ol>

<h2>&iquest;Plantilla de Excel o software de cotizaciones?</h2>

<p>La eterna pregunta. Seamos honestos: <strong>una plantilla de Excel está bien para empezar</strong>, pero tiene límites claros. No escala, es fácil cometer errores al copiar y pegar, no puedes generar PDFs profesionales automáticamente, y el seguimiento es manual.</p>

<p>Un <strong>software de cotizaciones</strong> como DealForge te permite:</p>

<ul>
<li>Crear cotizaciones profesionales en minutos, no en horas</li>
<li>Mantener un catálogo de productos con precios actualizados</li>
<li>Generar PDFs con tu marca (logo, colores, plantilla personalizada)</li>
<li>Enviar por email directamente desde la plataforma</li>
<li>Aplicar reglas comerciales automáticas (límites de descuento, aprobaciones)</li>
<li>Hacer seguimiento del estado de cada cotización</li>
<li>Usar inteligencia artificial para optimizar tus propuestas</li>
</ul>

<p>La diferencia real no está en la herramienta en sí, sino en el tiempo que recuperas. Si dedicas 45 minutos a cada cotización manual y puedes reducirlo a 5 minutos con un software, las cuentas hablan solas.</p>

<h2>Cómo la inteligencia artificial está cambiando el juego</h2>

<p>La IA ya no es ciencia ficción en el mundo de las ventas. Herramientas con <strong>IA integrada</strong> pueden sugerirte productos complementarios, detectar cuándo un descuento es demasiado agresivo, o incluso redactar el texto de acompañamiento de tu cotización.</p>

<p>En DealForge, por ejemplo, Forge IA analiza el contexto de cada cotización y te ayuda con sugerencias inteligentes: desde recomendar el precio óptimo hasta alertarte si una condición comercial podría generar problemas. Todo sin salir de la plataforma.</p>

<h2>Checklist rápido antes de enviar tu cotización</h2>

<p>Antes de pulsar &ldquo;Enviar&rdquo;, repasa esta lista:</p>

<ul>
<li>&iquest;Los datos de tu empresa y del cliente están completos y correctos?</li>
<li>&iquest;La descripción de cada línea es clara y detallada?</li>
<li>&iquest;Los cálculos cuadran (subtotal, descuentos, IVA, total)?</li>
<li>&iquest;Has incluido las condiciones comerciales y la fecha de vencimiento?</li>
<li>&iquest;El diseño refleja la calidad de tu empresa?</li>
<li>&iquest;Has revisado la ortografía?</li>
</ul>

<p>Si has marcado todo, estás listo para enviar una cotización que genera confianza y cierra ventas.</p>

<h2>Conclusión</h2>

<p>Hacer una cotización profesional no es complicado, pero requiere atención al detalle y las herramientas adecuadas. Ya sea que uses una plantilla o un software especializado, lo importante es que cada propuesta que envíes transmita profesionalidad, transparencia y confianza.</p>

<p>Porque al final, una buena cotización no es solo un documento con precios. Es el primer paso de una relación comercial que puede durar años.</p>`,
    autor: "DealForge",
    categoria: "ventas",
    tags: JSON.stringify([
      "cotizaciones",
      "presupuestos",
      "ventas",
      "software cotizaciones",
      "CPQ",
      "guia",
      "pymes",
    ]),
    publicado: true,
    publishedAt: new Date(),
    metaTitulo:
      "Cómo hacer una cotización profesional | Guía completa 2026 — DealForge",
    metaDescripcion:
      "Aprende a crear cotizaciones y presupuestos profesionales que cierren ventas. Elementos clave, errores a evitar y cómo un software de cotizaciones te ahorra horas.",
    metaKeywords:
      "cómo hacer una cotización, crear presupuestos, software de cotizaciones, plantilla cotización, programa para presupuestos, cotización profesional, presupuesto online, CPQ, software presupuestos pymes",
  };

  const post2 = {
    slug: "firma-electronica-cotizaciones-como-cerrar-ventas-mas-rapido",
    titulo: "Firma electrónica en cotizaciones: cómo cerrar ventas más rápido y con validez legal",
    extracto: "Descubre cómo la firma electrónica en tus cotizaciones acelera el cierre de ventas, elimina el papel y tiene plena validez legal en la UE. Guía práctica para PYMEs con ejemplos reales.",
    contenido: `<p>Imagina esta situación: has preparado la cotización perfecta, el cliente dice que sí, pero luego tarda una semana en imprimir, firmar, escanear y devolverte el documento. Para cuando llega, el presupuesto ha caducado o, peor aún, ha elegido a otro proveedor más ágil.</p>

<p>Este problema tiene nombre: <strong>fricción en el cierre de ventas</strong>. Y la solución es más sencilla de lo que piensas: la firma electrónica integrada en tus cotizaciones.</p>

<h2>&iquest;Qué es la firma electrónica y por qué importa en ventas?</h2>

<p>La firma electrónica es un mecanismo que permite a una persona expresar su conformidad con un documento de forma digital, sin necesidad de papel, impresora ni escáner. En el contexto de las cotizaciones, significa que tu cliente puede <strong>aprobar y firmar tu propuesta desde cualquier dispositivo</strong> en cuestión de segundos.</p>

<p>Pero no se trata solo de comodidad. Según el Reglamento eIDAS de la Unión Europea, las firmas electrónicas tienen plena validez legal. Esto significa que una cotización firmada electrónicamente tiene el mismo peso jurídico que una firmada a mano.</p>

<h2>Los 5 beneficios de firmar cotizaciones electrónicamente</h2>

<h3>1. Cierras ventas en minutos, no en días</h3>
<p>El principal beneficio es la velocidad. Cuando eliminas el proceso de imprimir-firmar-escanear-enviar, reduces el tiempo de cierre de días a minutos. Tu cliente recibe un enlace, firma con el dedo o el ratón, y listo. <strong>Sin fricciones, sin excusas, sin esperas.</strong></p>

<h3>2. Reduces la tasa de abandono</h3>
<p>Cada paso adicional en el proceso de aprobación es una oportunidad para que el cliente se distraiga, lo posponga o simplemente se olvide. La firma electrónica elimina todos esos pasos intermedios. El resultado: menos cotizaciones que se quedan en el limbo.</p>

<h3>3. Validez legal completa en la UE</h3>
<p>El Reglamento (UE) 910/2014 (eIDAS) establece tres niveles de firma electrónica: simple, avanzada y cualificada. Para cotizaciones comerciales entre empresas, la firma electrónica simple (como la que ofrecen la mayoría de plataformas CPQ) es perfectamente válida y admisible como prueba en caso de disputa.</p>

<h3>4. Trazabilidad total</h3>
<p>Cada firma queda registrada con la fecha, hora, dirección IP y los datos del firmante. Esto te da una <strong>trazabilidad completa</strong> que el papel nunca podrá ofrecer. &iquest;Cuántas veces has tenido que buscar un documento firmado en un cajón o en un email de hace meses?</p>

<h3>5. Imagen profesional y moderna</h3>
<p>Enviar un enlace para firmar electrónicamente transmite modernidad y profesionalidad. Tu cliente percibe que trabajas con herramientas actuales y que valoras su tiempo. En un mercado competitivo, estos detalles marcan la diferencia.</p>

<h2>Cómo funciona la firma electrónica en una cotización</h2>

<p>El proceso es más simple de lo que parece. Así funciona en una plataforma CPQ moderna:</p>

<ol>
<li><strong>Creas la cotización</strong> con todos los detalles: productos, precios, condiciones y términos.</li>
<li><strong>Solicitas la firma</strong> introduciendo el nombre y email del firmante (puede ser el contacto principal del cliente o cualquier persona autorizada).</li>
<li><strong>El cliente recibe un email</strong> con un enlace único y seguro para firmar.</li>
<li><strong>El cliente revisa y firma</strong> directamente desde el navegador, dibujando su firma con el ratón o el dedo en móvil.</li>
<li><strong>Ambas partes reciben confirmación</strong> y la firma queda integrada en el PDF de la cotización.</li>
</ol>

<p>Todo el proceso puede completarse en menos de 2 minutos desde que envías la solicitud.</p>

<h2>Firma electrónica vs. aprobación: &iquest;cuál necesitas?</h2>

<p>Es importante distinguir entre estos dos conceptos que a veces se confunden:</p>

<p><strong>Aprobación interna:</strong> es el proceso donde alguien de tu propia empresa (un director comercial, un responsable financiero) debe aprobar la cotización antes de enviarla al cliente. Suele activarse por reglas automáticas, por ejemplo, cuando un descuento supera cierto porcentaje.</p>

<p><strong>Firma electrónica:</strong> es la conformidad del cliente con la propuesta. Se solicita después de que la cotización ha sido enviada y el cliente está de acuerdo con los términos.</p>

<p>En un flujo de trabajo completo, el orden sería: <strong>crear cotización → aprobación interna → enviar al cliente → firma electrónica del cliente</strong>. Ambos procesos se complementan y, juntos, garantizan que toda la cadena tiene validez.</p>

<h2>Marco legal de la firma electrónica en España y la UE</h2>

<p>Si te preocupa la validez legal, estos son los puntos clave:</p>

<ul>
<li><strong>Reglamento eIDAS (UE 910/2014):</strong> reconoce la firma electrónica en todos los estados miembros de la UE. No se puede rechazar como prueba en un tribunal solo por ser electrónica.</li>
<li><strong>Ley 6/2020 (España):</strong> regula los servicios electrónicos de confianza y transpone el reglamento eIDAS al ordenamiento jurídico español.</li>
<li><strong>Código Civil español:</strong> admite el consentimiento expresado por medios electrónicos como válido para la perfección de contratos.</li>
</ul>

<p>Para cotizaciones comerciales B2B, no necesitas una firma cualificada con certificado digital. La firma electrónica simple (dibujar la firma + registro de IP y fecha) es suficiente y legalmente válida.</p>

<h2>Errores comunes al implementar firma electrónica</h2>

<p>Aunque la tecnología es sencilla, hay errores que debes evitar:</p>

<ol>
<li><strong>No incluir los términos y condiciones.</strong> La firma solo tiene valor si el firmante ha podido leer claramente qué está aceptando. Asegúrate de que las condiciones comerciales estén visibles antes de la firma.</li>
<li><strong>No guardar la evidencia.</strong> Almacena siempre la fecha, hora, IP y los datos del firmante junto con el documento firmado. Esta evidencia es crucial en caso de disputa.</li>
<li><strong>Usar herramientas no seguras.</strong> Un email con un &ldquo;sí, acepto&rdquo; no es lo mismo que una firma electrónica con trazabilidad. Usa herramientas que generen un registro auditable.</li>
<li><strong>Olvidar el seguimiento.</strong> Que hayas enviado la solicitud de firma no significa que el cliente la complete inmediatamente. Los recordatorios automáticos son esenciales.</li>
</ol>

<h2>Cómo DealForge integra la firma electrónica</h2>

<p>En DealForge, la firma electrónica está integrada directamente en el flujo de cotizaciones. No necesitas herramientas externas ni integraciones complicadas:</p>

<ul>
<li><strong>Solicita la firma</strong> desde la propia página de la cotización con un solo clic.</li>
<li><strong>El cliente firma desde cualquier dispositivo</strong> a través de un enlace seguro y único.</li>
<li><strong>La firma aparece automáticamente en el PDF</strong> de la cotización, junto con el nombre del firmante y la fecha.</li>
<li><strong>Recibes una notificación</strong> cuando el cliente firma, para que puedas avanzar con el siguiente paso.</li>
<li><strong>Todo queda registrado</strong> en el historial de actividad de la cotización con total trazabilidad.</li>
</ul>

<p>Disponible a partir del plan Pro, junto con otras funcionalidades como recordatorios automáticos y versionado de cotizaciones.</p>

<h2>Checklist para implementar firma electrónica en tu empresa</h2>

<ul>
<li>&iquest;Tus cotizaciones incluyen términos y condiciones claros?</li>
<li>&iquest;Tu herramienta de cotizaciones soporta firma electrónica integrada?</li>
<li>&iquest;Guardas registro de la fecha, hora e IP de cada firma?</li>
<li>&iquest;Tienes configurados recordatorios automáticos para firmas pendientes?</li>
<li>&iquest;La firma se integra en el PDF final de la cotización?</li>
<li>&iquest;Has informado a tu equipo comercial sobre el nuevo flujo?</li>
</ul>

<p>Si has marcado todo, estás listo para cerrar ventas más rápido y con total seguridad jurídica.</p>

<h2>Conclusión</h2>

<p>La firma electrónica no es un lujo ni una moda tecnológica. Es una herramienta práctica que <strong>reduce tiempos de cierre, elimina fricción y tiene plena validez legal</strong>. Para las PYMEs que compiten en velocidad y profesionalidad, integrarla en el flujo de cotizaciones es una ventaja competitiva real.</p>

<p>Porque al final del día, la cotización más bonita del mundo no sirve de nada si el cliente tarda una semana en firmarla. Haz que sea cuestión de un clic.</p>`,
    autor: "DealForge",
    categoria: "ventas",
    tags: JSON.stringify([
      "firma electrónica",
      "cotizaciones",
      "eIDAS",
      "ventas",
      "CPQ",
      "pymes",
      "firma digital",
      "cerrar ventas",
    ]),
    publicado: true,
    publishedAt: new Date(),
    metaTitulo:
      "Firma electrónica en cotizaciones: cierra ventas más rápido | DealForge",
    metaDescripcion:
      "Aprende cómo la firma electrónica en cotizaciones acelera el cierre de ventas con validez legal en la UE. Guía práctica para PYMEs con marco legal eIDAS y checklist.",
    metaKeywords:
      "firma electrónica cotizaciones, firma digital presupuestos, firmar cotización online, eIDAS firma electrónica, firma electrónica pymes, cerrar ventas rápido, software cotizaciones firma electrónica, validez legal firma electrónica España",
  };

  const post3 = {
    slug: "software-cotizaciones-pymes-guia-completa",
    titulo: "Software de cotizaciones para PYMEs: qué es, cómo funciona y cómo elegir el mejor",
    extracto: "Descubre qué es un software de cotizaciones (CPQ), cómo puede transformar tu proceso de ventas y qué criterios usar para elegir la herramienta adecuada para tu PYME.",
    contenido: `<p>Si todavía haces cotizaciones en Excel o Word, estás perdiendo tiempo y ventas. Un <strong>software de cotizaciones</strong> automatiza la creación de presupuestos profesionales, elimina errores y te permite cerrar deals más rápido. En esta guía te explicamos todo lo que necesitas saber.</p>

<h2>¿Qué es un software de cotizaciones?</h2>

<p>Un software de cotizaciones, también conocido como <strong>CPQ (Configure, Price, Quote)</strong>, es una herramienta que automatiza el proceso de crear, enviar y gestionar presupuestos comerciales. En lugar de copiar y pegar en hojas de cálculo, el CPQ centraliza tus productos, precios, clientes y condiciones comerciales en un solo lugar.</p>

<p>El resultado: cotizaciones profesionales en minutos, no en horas. Sin errores de cálculo, sin formatos inconsistentes y con seguimiento automático.</p>

<h2>Señales de que necesitas un software de cotizaciones</h2>

<p>Si te identificas con alguna de estas situaciones, es hora de dejar atrás el Excel:</p>

<ul>
<li><strong>Tardas más de 30 minutos</strong> en preparar cada cotización</li>
<li>Has enviado presupuestos con <strong>errores de precio o cálculo</strong></li>
<li>No sabes en qué estado está cada propuesta ni cuándo hacer seguimiento</li>
<li>Cada vendedor usa un <strong>formato diferente</strong> para las cotizaciones</li>
<li>Pierdes deals porque <strong>la competencia responde antes</strong></li>
<li>No tienes visibilidad sobre tu <strong>pipeline de ventas</strong></li>
</ul>

<h2>Funcionalidades clave de un buen CPQ</h2>

<h3>1. Catálogo de productos centralizado</h3>
<p>Todos tus productos, servicios y precios en un solo lugar. Cuando cambias un precio, se actualiza automáticamente en todas las cotizaciones futuras. Adiós a las hojas de cálculo desactualizadas.</p>

<h3>2. Generación automática de cotizaciones</h3>
<p>Selecciona el cliente, añade los productos y el sistema calcula automáticamente subtotales, descuentos e impuestos. Algunos CPQ como DealForge incluyen <strong>inteligencia artificial</strong> que puede generar cotizaciones completas a partir de una descripción.</p>

<h3>3. Plantillas profesionales en PDF</h3>
<p>Una cotización bien diseñada transmite profesionalidad. El software genera PDFs con tu logo, colores corporativos y un diseño limpio que impresiona al cliente.</p>

<h3>4. Firma electrónica integrada</h3>
<p>Envía la cotización y el cliente la firma desde su móvil o ordenador. Sin imprimir, sin escanear. Con validez legal según el Reglamento eIDAS de la UE.</p>

<h3>5. Seguimiento y notificaciones</h3>
<p>Sabe cuándo el cliente abre tu cotización, recibe recordatorios automáticos y nunca pierdas un seguimiento. El pipeline visual te muestra todas tus oportunidades de un vistazo.</p>

<h3>6. Reglas comerciales y aprobaciones</h3>
<p>Define descuentos máximos, márgenes mínimos y flujos de aprobación. Si un vendedor aplica un descuento fuera de política, el sistema requiere aprobación del gerente antes de enviar.</p>

<h2>CPQ vs. Excel vs. ERP: ¿cuál usar?</h2>

<p>Cada herramienta tiene su lugar. La clave es entender cuándo cada una tiene sentido:</p>

<p><strong>Excel/Google Sheets:</strong> Funciona cuando haces pocas cotizaciones al mes y trabajas solo. Pero a medida que creces, los errores se multiplican y la gestión se vuelve caótica.</p>

<p><strong>ERP (SAP, Odoo, etc.):</strong> Potente pero complejo y costoso. Pensado para grandes empresas con equipos de implementación. Para una PYME, suele ser excesivo.</p>

<p><strong>Software CPQ:</strong> El punto intermedio ideal. Especializado en el proceso de cotización, fácil de implementar y asequible. Perfecto para PYMEs que quieren profesionalizar sus ventas sin la complejidad de un ERP.</p>

<h2>Cómo elegir el mejor software de cotizaciones</h2>

<p>No todos los CPQ son iguales. Estos son los criterios que deberías evaluar:</p>

<h3>Facilidad de uso</h3>
<p>Si tu equipo necesita una semana de formación para usar el software, algo falla. La herramienta debe ser intuitiva desde el primer día. Busca interfaces limpias y flujos de trabajo simples.</p>

<h3>Personalización</h3>
<p>¿Puedes adaptar las plantillas a tu marca? ¿Soporta tus condiciones comerciales específicas? ¿Funciona con tu moneda y sistema fiscal?</p>

<h3>Integraciones</h3>
<p>Comprueba que se integra con las herramientas que ya usas: CRM, email, facturación. Una herramienta aislada genera más trabajo, no menos.</p>

<h3>Precio justo</h3>
<p>Muchos CPQ están diseñados para grandes empresas con precios que empiezan en cientos de euros al mes. Para una PYME, busca opciones con plan gratuito o de entrada asequible.</p>

<h3>Soporte en tu idioma</h3>
<p>Cuando tienes un problema, necesitas ayuda rápida y en tu idioma. Prioriza herramientas con soporte en español y documentación clara.</p>

<h2>El impacto real en tu negocio</h2>

<p>Implementar un software de cotizaciones no es solo una mejora operativa. Es una ventaja competitiva. Las empresas que responden rápido con propuestas profesionales ganan más deals. Así de simple.</p>

<p>Piensa en esto: cuando un cliente potencial pide presupuesto a tres proveedores, el primero en responder con una cotización clara y profesional tiene una ventaja enorme. La velocidad y la profesionalidad generan confianza.</p>

<h2>Primeros pasos</h2>

<p>No necesitas migrar todo de golpe. Empieza poco a poco:</p>

<ol>
<li><strong>Carga tu catálogo de productos</strong> con precios actualizados</li>
<li><strong>Importa tus clientes principales</strong> desde tu base de datos actual</li>
<li><strong>Crea tu primera cotización</strong> con el nuevo sistema</li>
<li><strong>Envíala con firma electrónica</strong> y mide el tiempo de respuesta</li>
<li><strong>Revisa y ajusta</strong> según tu flujo de trabajo</li>
</ol>

<p>La curva de aprendizaje es mínima y los resultados son inmediatos. Tu equipo de ventas te lo agradecerá.</p>`,
    autor: "DealForge",
    categoria: "producto",
    tags: JSON.stringify([
      "software cotizaciones",
      "CPQ",
      "presupuestos",
      "pymes",
      "automatización ventas",
      "herramientas ventas",
      "productividad",
    ]),
    publicado: true,
    publishedAt: new Date(),
    metaTitulo:
      "Software de Cotizaciones para PYMEs: Guía Completa 2026 — DealForge",
    metaDescripcion:
      "Qué es un software de cotizaciones (CPQ), cómo funciona y cómo elegir el mejor para tu PYME. Funcionalidades clave, comparativa con Excel y ERP, y criterios de selección.",
    metaKeywords:
      "software de cotizaciones, programa para hacer presupuestos, CPQ para pymes, herramienta cotizaciones, software presupuestos, automatizar cotizaciones, programa cotizaciones gratis, mejor CPQ español",
  };

  const post4 = {
    slug: "iva-en-cotizaciones-guia-practica-autonomos-pymes",
    titulo: "IVA en cotizaciones: guía práctica para autónomos y PYMEs",
    extracto: "Descubre cómo aplicar el IVA correctamente en tus cotizaciones y presupuestos. Tipos de IVA, operaciones intracomunitarias, exenciones y errores comunes que cuestan dinero. Guía práctica para autónomos y PYMEs.",
    contenido: `<p>El IVA es uno de esos temas que todo autónomo y empresario conoce... hasta que tiene que aplicarlo en una cotización real. &iquest;Cuándo se incluye? &iquest;Cuándo se exime? &iquest;Qué pasa si tu cliente es de otro país de la UE? Las dudas son legítimas y las consecuencias de equivocarse pueden ser costosas.</p>

<p>Esta guía resuelve las preguntas más frecuentes sobre el IVA en cotizaciones y presupuestos, con ejemplos concretos y sin tecnicismos innecesarios. Si eres autónomo o tienes una PYME, esto es lo que necesitas saber.</p>

<h2>Qué es el IVA y qué papel juega en tus cotizaciones</h2>

<p>El Impuesto sobre el Valor Añadido (IVA) es un tributo indirecto que grava el consumo de bienes y servicios. Como empresa o autónomo, actúas como recaudador: cobras el IVA a tu cliente en nombre de Hacienda y luego lo ingresas en tu declaración trimestral (modelo 303).</p>

<p>En la práctica, esto significa que en tu cotización debes <strong>mostrar claramente</strong>:</p>
<ul>
<li>El importe neto (base imponible)</li>
<li>El tipo de IVA aplicado (%)</li>
<li>El importe del IVA en euros</li>
<li>El total con IVA incluido</li>
</ul>

<p>Un error muy común: cotizar solo el precio neto sin especificar si incluye IVA o no. Esto genera malentendidos, disputas con clientes y dolores de cabeza innecesarios. La claridad desde el primer presupuesto evita conversaciones incómodas cuando llega la factura.</p>

<h2>Los tipos de IVA vigentes en España</h2>

<p>En España existen cuatro tipos de IVA. Conocerlos es fundamental para cotizar correctamente:</p>

<h3>IVA general: 21%</h3>
<p>Es el tipo que aplica por defecto a la mayoría de bienes y servicios. Si no hay una razón específica para usar otro tipo, aplicas el 21%. Servicios de consultoría, software, publicidad, reparaciones, diseño gráfico, asesoría jurídica, desarrollo web... todo esto va al 21%.</p>

<h3>IVA reducido: 10%</h3>
<p>Se aplica a una lista específica de bienes y servicios. Los más relevantes para quienes hacen cotizaciones: obras de renovación y reparación de viviendas (cumpliendo ciertos requisitos), hostelería y restauración, transporte de viajeros, espectáculos en vivo y actividades culturales. Si cotizas reformas de viviendas para particulares, probablemente apliques el 10% en lugar del 21%.</p>

<h3>IVA superreducido: 4%</h3>
<p>Reservado para bienes de primera necesidad: pan, leche, huevos, frutas y verduras básicas, medicamentos, libros y periódicos en papel, prótesis. Muy poco habitual en cotizaciones B2B ordinarias.</p>

<h3>IVA exento: 0%</h3>
<p>Hay actividades completamente exentas de IVA: servicios médicos y sanitarios, educación reglada, servicios financieros y de seguros, arrendamiento de viviendas habituales. Si tu actividad está exenta, no repercutes IVA en tus cotizaciones, pero tampoco puedes deducirte el IVA de tus gastos profesionales (con algunas excepciones de prorrata).</p>

<h2>&iquest;Cuándo se aplica IVA en una cotización?</h2>

<p>La regla general: si eres autónomo o empresa dado de alta en actividad económica en España y realizas entregas de bienes o prestaciones de servicios <strong>sujetas y no exentas</strong> a clientes en el territorio de aplicación del IVA (España peninsular y Baleares), aplicas IVA.</p>

<p>Hay tres territorios en España con regímenes especiales que conviene tener muy presentes:</p>

<ul>
<li><strong>Canarias:</strong> No aplica IVA español. Se aplica el IGIC (Impuesto General Indirecto Canario), con un tipo general del 7%. Si cotizas a un cliente en Canarias, tu presupuesto debe indicar que la operación no está sujeta a IVA español.</li>
<li><strong>Ceuta:</strong> No aplica IVA. Se aplica el IPSI con tipos distintos.</li>
<li><strong>Melilla:</strong> Igual que Ceuta, aplica el IPSI.</li>
</ul>

<p>Enviar una cotización con IVA al 21% a un cliente en Las Palmas de Gran Canaria es un error clásico que genera confusión y retrasos en el cierre.</p>

<h2>IVA en operaciones B2B dentro de la UE</h2>

<p>Este es uno de los puntos que más confusión genera entre autónomos y PYMEs que empiezan a vender fuera de España. Si tienes un cliente empresa en otro país de la Unión Europea —una empresa francesa, un proveedor alemán, un cliente portugués— la operación puede quedar <strong>exenta de IVA mediante la inversión del sujeto pasivo</strong>.</p>

<p>Para que aplique la exención, deben cumplirse dos condiciones:</p>
<ol>
<li>Tu cliente tiene un <strong>NIF intracomunitario válido</strong> (puedes verificarlo en el sistema VIES de la Comisión Europea).</li>
<li>El servicio se presta efectivamente en el territorio de ese país o las condiciones de localización así lo determinan.</li>
</ol>

<p>En tu cotización (y posterior factura) debes indicar:</p>
<ul>
<li>El NIF intracomunitario de tu cliente (formato: código de país + número, por ejemplo FR12345678901)</li>
<li>Que la operación está exenta de IVA</li>
<li>La referencia legal aplicable (&ldquo;Exento IVA &ndash; Art. 25 LIVA&rdquo; para entregas de bienes o &ldquo;Inversión del sujeto pasivo &ndash; Art. 84.Uno.2&ordm; LIVA&rdquo; para servicios, según el caso)</li>
</ul>

<p>El cliente será quien declare el IVA en su país con el tipo correspondiente. Tú no ingresas nada en España por ese concepto, pero sí debes declarar la operación en el <strong>modelo 349</strong> (declaración recapitulativa de operaciones intracomunitarias) de forma trimestral o mensual, según el volumen.</p>

<h2>Exportaciones fuera de la UE</h2>

<p>Si exportas bienes o prestas servicios a clientes fuera de la Unión Europea, la operación está <strong>exenta de IVA por regla general</strong>. Tu cotización no debe incluir IVA español, y debes conservar prueba documental de que la operación se ha realizado fuera del territorio comunitario (documentos aduaneros, contratos, justificantes de pago desde el extranjero).</p>

<p>En el caso de servicios digitales o prestados a distancia a particulares (B2C) fuera de la UE, el tratamiento puede variar según el país de destino. Algunos países tienen sus propios impuestos sobre servicios digitales que pueden recaer sobre ti como proveedor. Si operas con volumen en mercados no comunitarios, la asesoría fiscal es imprescindible.</p>

<h2>El recargo de equivalencia: qué es y cuándo te afecta</h2>

<p>Si vendes bienes a comerciantes minoristas acogidos al régimen especial de recargo de equivalencia, debes aplicar un recargo adicional sobre el IVA en tus facturas. Este régimen aplica principalmente a minoristas que no transforman los productos que venden (tiendas de ropa, ferreterías, papelerías, etc.).</p>

<p>Los recargos vigentes son:</p>
<ul>
<li>5,2% sobre artículos al 21% de IVA</li>
<li>1,4% sobre artículos al 10% de IVA</li>
<li>0,5% sobre artículos al 4% de IVA</li>
</ul>

<p>Ejemplo: si vendes mercancía por 1.000 EUR a un comerciante en recargo de equivalencia, la cotización mostraría: Base 1.000 EUR + IVA 21% (210 EUR) + Recargo de equivalencia 5,2% (52 EUR) = Total 1.262 EUR.</p>

<p>Si cotizas habitualmente a este tipo de clientes, asegúrate de que tu software de cotizaciones permite configurar este recargo de forma automática. Los cálculos manuales son fuente de errores.</p>

<h2>IVA y autónomos: situaciones específicas</h2>

<p>Los autónomos tienen algunas particularidades que conviene conocer bien:</p>

<h3>Actividades exentas de IVA</h3>
<p>Si tu actividad está exenta (médicos, psicólogos, profesores de clases particulares en materias regladas, ciertas actividades de seguro), no debes repercutir IVA en tus cotizaciones ni facturas. Pero tampoco puedes deducirte el IVA soportado en tus gastos. Es un régimen todo o nada, salvo que apliques la regla de prorrata por tener actividades mixtas.</p>

<h3>Autónomos en módulos (estimación objetiva)</h3>
<p>Si estás en el régimen de módulos, las reglas del IVA siguen siendo las mismas: repercutes y deduces IVA con normalidad. Lo que varía es el IRPF, no el IVA. Un error frecuente es confundir ambos impuestos.</p>

<h3>El criterio de caja</h3>
<p>Los autónomos y PYMEs con facturación inferior a 2 millones de euros anuales pueden acogerse al <strong>régimen especial del criterio de caja</strong>. En lugar de declarar el IVA cuando emites la factura, lo declaras cuando cobras efectivamente. Esto mejora el flujo de caja cuando tienes clientes que pagan tarde, aunque implica mayor carga administrativa.</p>

<p>Si estás acogido al criterio de caja, debes indicarlo expresamente en tus facturas. En las cotizaciones previas también es buena práctica mencionarlo si puede afectar al cliente (que no podrá deducirse el IVA hasta que te pague).</p>

<h2>Cómo mostrar el IVA correctamente en una cotización</h2>

<p>No existe un formato legal obligatorio para las cotizaciones, a diferencia de las facturas. Pero sí es buena práctica incluir toda la información fiscal desde el inicio para evitar sorpresas al facturar. Esto es lo que debería incluir la sección de totales de tu cotización:</p>

<ul>
<li><strong>Base imponible desglosada por tipo de IVA:</strong> Si tienes líneas con diferentes tipos (por ejemplo, 21% para servicios y 10% para obras), separa los subtotales por tipo.</li>
<li><strong>Importe del IVA por tipo:</strong> Muestra el euro exacto que corresponde a cada tramo.</li>
<li><strong>Total con IVA:</strong> La cifra final que pagará el cliente, sin ninguna ambigüedad.</li>
<li><strong>Indicación en precios unitarios:</strong> Cuando muestres precios de línea, marca claramente &ldquo;precio sin IVA&rdquo; o &ldquo;precio neto&rdquo;.</li>
</ul>

<p>Un caso práctico: si cotizas una reforma de oficina con materiales y mano de obra, los materiales de construcción van al 21%, pero la mano de obra de reforma puede ir al 10% si se cumplen los requisitos del artículo 91.Uno.2.10.&ordm; de la LIVA (básicamente que sea una vivienda, que el destinatario sea persona física y que el coste de los materiales no supere el 40% de la base imponible). Tu cotización debería mostrar dos bloques de IVA separados con sus respectivos cálculos.</p>

<h2>Errores de IVA que cuestan dinero real</h2>

<p>Estos son los errores más frecuentes que cometen autónomos y PYMEs al gestionar el IVA en sus cotizaciones:</p>

<ol>
<li><strong>No especificar si el precio incluye o excluye IVA.</strong> El cliente asume que el precio es final y luego hay una discusión desagradable cuando llega la factura con IVA añadido. En mercados B2B, los precios suelen ser sin IVA. En B2C, es recomendable mostrar el precio final.</li>
<li><strong>Aplicar el tipo incorrecto.</strong> Por ejemplo, cobrar el 21% en una actividad que debería ir al 10%, o no aplicar la exención que corresponde. Esto puede generar problemas en la declaración trimestral y tensiones con los clientes.</li>
<li><strong>Ignorar las reglas para clientes extranjeros.</strong> Aplicar IVA español a una empresa de la UE con NIF intracomunitario válido es un error que complica las cosas para ambas partes.</li>
<li><strong>No conservar documentación de exenciones.</strong> Si emites cotizaciones sin IVA (operaciones intracomunitarias, exportaciones), guarda toda la evidencia que justifique la exención. Hacienda puede pedir esa documentación en una inspección.</li>
<li><strong>Mezclar precios con y sin IVA en la misma cotización.</strong> Elige un criterio coherente y mantenlo a lo largo de toda la propuesta. La mezcla genera confusión y hace que los totales no cuadren visualmente.</li>
<li><strong>Redondear mal los decimales.</strong> En cotizaciones con muchas líneas, los errores de redondeo se acumulan. Tu herramienta de cotizaciones debe usar la misma lógica de redondeo que usarás al facturar.</li>
</ol>

<h2>Herramientas que simplifican la gestión del IVA</h2>

<p>Llevar el IVA manualmente en Excel tiene un problema claro: los errores de cálculo son fáciles de cometer, especialmente cuando mezclas líneas con diferentes tipos, aplicas descuentos sobre algunas partidas, o tienes clientes con tratamientos fiscales distintos.</p>

<p>Un <strong>software de cotizaciones</strong> dedicado resuelve esto de forma automática. Con DealForge, por ejemplo, puedes:</p>
<ul>
<li><strong>Configurar el tipo de IVA por defecto</strong> para cada producto o servicio en tu catálogo, de forma que se aplique automáticamente al añadirlo a una cotización.</li>
<li><strong>Desglosar automáticamente</strong> bases imponibles y cuotas de IVA por tipo en la sección de totales.</li>
<li><strong>Marcar clientes como exentos</strong> (intracomunitarios, exportación) para que el sistema gestione automáticamente las indicaciones legales en la cotización.</li>
<li><strong>Configurar el recargo de equivalencia</strong> para los clientes que lo requieran.</li>
<li><strong>Generar PDFs profesionales</strong> donde el IVA aparece claramente desglosado, sin ambigüedad.</li>
</ul>

<p>La ventaja real es que eliminas la posibilidad de error humano en los cálculos y ahorras el tiempo de revisar cada cotización línea por línea antes de enviarla.</p>

<h2>Resumen práctico: IVA por tipo de cliente y operación</h2>

<p>Para cerrar, aquí tienes una referencia rápida que puedes guardar:</p>

<ul>
<li><strong>Cliente en España (B2B y B2C):</strong> Aplica el tipo de IVA correspondiente a tu actividad (21%, 10%, 4% o exento).</li>
<li><strong>Cliente en Canarias:</strong> Sin IVA español. Aplica IGIC o indica no sujeción según corresponda.</li>
<li><strong>Cliente en Ceuta o Melilla:</strong> Sin IVA ni IGIC. Aplica IPSI local o indica no sujeción.</li>
<li><strong>Empresa en la UE con NIF intracomunitario válido:</strong> Exento de IVA por inversión del sujeto pasivo. Declarar en modelo 349.</li>
<li><strong>Empresa o particular fuera de la UE:</strong> Exento de IVA (exportación). Conservar prueba documental.</li>
<li><strong>Actividad exenta:</strong> Sin IVA repercutido. Sin deducción del IVA soportado.</li>
<li><strong>Minorista en recargo de equivalencia:</strong> IVA normal más el recargo correspondiente.</li>
</ul>

<h2>Conclusión</h2>

<p>El IVA no tiene que ser una fuente de estrés. Con el conocimiento adecuado y las herramientas correctas, puedes gestionar el IVA en tus cotizaciones con seguridad y sin errores. La clave está en tres cosas: entender qué tipo aplica a tu actividad, conocer cómo varían las reglas según el país del cliente, y tener un proceso claro para desglosar y mostrar el IVA en cada propuesta.</p>

<p>Si tienes dudas sobre tu situación fiscal concreta, consulta siempre con tu asesor o gestor. Pero para los aspectos operativos del día a día &mdash;calcular, desglosar y mostrar el IVA correctamente en tus cotizaciones&mdash; la automatización es tu mejor aliada. Una cotización con el IVA bien aplicado desde el principio evita discusiones al final.</p>`,
    autor: "DealForge",
    categoria: "fiscal",
    tags: JSON.stringify([
      "IVA",
      "cotizaciones",
      "presupuestos",
      "autónomos",
      "pymes",
      "fiscal",
      "impuestos",
      "facturación",
    ]),
    publicado: true,
    publishedAt: new Date(),
    metaTitulo:
      "IVA en Cotizaciones: Guía Práctica para Autónomos y PYMEs 2026 — DealForge",
    metaDescripcion:
      "Aprende a aplicar el IVA correctamente en tus cotizaciones. Tipos de IVA en España, operaciones intracomunitarias, exenciones y errores comunes. Guía práctica para autónomos y PYMEs.",
    metaKeywords:
      "IVA en cotizaciones, IVA presupuestos autónomos, tipos IVA España, IVA operaciones intracomunitarias, IVA pymes, cómo poner IVA en presupuesto, exención IVA cotizaciones, recargo equivalencia presupuesto",
  };

  const posts = [post, post2, post3, post4];
  const results = [];

  for (const p of posts) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: p.slug },
    });
    if (existing) {
      results.push({ slug: p.slug, status: "already_exists" });
      continue;
    }
    const created = await prisma.blogPost.create({ data: p });
    results.push({ slug: created.slug, id: created.id, status: "created" });
  }

  // Notify search engines about new posts
  const newSlugs = results
    .filter((r) => r.status === "created")
    .map((r) => `/blog/${r.slug}`);
  if (newSlugs.length > 0) {
    notifyIndexNow(newSlugs).catch(() => {});
  }

  return NextResponse.json({ success: true, results }, { status: 201 });
}
