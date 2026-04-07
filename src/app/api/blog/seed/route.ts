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

  const post5 = {
    slug: "excel-vs-software-cotizaciones-cuando-hacer-el-cambio",
    titulo: "Excel vs software de cotizaciones: cuándo hacer el cambio",
    extracto:
      "Excel es el punto de partida de casi todo comercial. Pero llega un momento en que te frena más de lo que te ayuda. Aquí está la señal exacta para saber cuándo cambiar a un software especializado.",
    contenido: `<p>Casi todos los negocios empiezan igual: una plantilla de Excel, algo de color corporativo, y a cotizar. Y funciona. Al principio funciona bien.</p>

<p>Pero llega un momento —y casi todos los comerciales lo recuerdan— en que algo falla. Una cotización enviada con el precio del año pasado. Un descuento aplicado a la fila equivocada. Un cliente preguntando por una propuesta que no encuentras entre los veinte archivos con nombres como <code>cotizacion_final_DEFINITIVO_v3.xlsx</code>.</p>

<p>Este artículo no es un ataque a Excel. Es una herramienta brillante para lo que fue diseñada. Pero cotizar no es analizar datos: es vender. Y para eso, Excel tiene límites muy concretos que conviene conocer antes de que te cuesten un deal.</p>

<h2>Por qué todo el mundo empieza con Excel (y tiene lógica)</h2>

<p>Excel es gratuito (o casi), todo el mundo lo conoce, y en los primeros meses de un negocio la prioridad es salir a vender, no montar infraestructura. Con una plantilla decente puedes generar una cotización presentable en veinte minutos.</p>

<p>Además, Excel te da control total. Puedes añadir cualquier columna, cambiar cualquier fórmula, estructurar los descuentos exactamente como quieres. Esa flexibilidad es seductora, especialmente si eres el único que toca el fichero.</p>

<p>El problema es que esa flexibilidad tiene un precio que no ves hasta que el negocio crece. Y para entonces, ya estás enterrado en deuda operativa.</p>

<h2>Las cinco señales de que Excel ya no te sirve</h2>

<h3>1. Pierdes tiempo buscando la última versión</h3>

<p>¿Cuántas veces has buscado una cotización enviada hace tres semanas? ¿Cuántos minutos has gastado abriendo ficheros para encontrar el que tiene los precios correctos?</p>

<p>Con Excel, cada cotización es un fichero independiente. Se guarda en una carpeta, se envía por email, se modifica localmente. El resultado es un sistema de archivos caótico donde la "verdad" sobre el estado de una propuesta está dispersa entre tu disco local, el email del cliente y quizás una carpeta compartida de Google Drive con cinco versiones distintas.</p>

<p>Esto no es un problema de organización personal: es un problema estructural del formato. Excel no fue diseñado para gestionar el ciclo de vida de documentos comerciales.</p>

<h3>2. Los errores de cálculo te cuestan dinero real</h3>

<p>Una fórmula que no se actualiza al añadir una línea nueva. Un precio unitario modificado manualmente que no refleja el catálogo actualizado. Un descuento de cliente VIP aplicado al 15% cuando debería ser el 10%.</p>

<p>En Excel, todos estos errores son posibles —y frecuentes. Un estudio de EuSpRIG (European Spreadsheet Risks Interest Group) estima que más del 90% de las hojas de cálculo corporativas contienen errores. La mayoría son silenciosos: el total parece razonable, nadie lo cuestiona, y la propuesta sale con un margen incorrecto.</p>

<p>En algunos casos el error va en tu contra (cotizas más barato de lo que deberías). En otros va contra el cliente, lo que genera tensión cuando llega la factura. En cualquier caso, el daño ya está hecho.</p>

<h3>3. No sabes en qué estado están tus cotizaciones</h3>

<p>Pregunta rápida: ahora mismo, ¿cuántas cotizaciones tienes enviadas y pendientes de respuesta? ¿Cuántas llevan más de dos semanas sin respuesta? ¿Cuál fue la última vez que hiciste seguimiento con cada cliente?</p>

<p>Si no puedes responder eso en menos de treinta segundos, tienes un problema de visibilidad comercial. Y Excel no puede dártela porque es un documento, no un sistema.</p>

<p>La consecuencia directa: cotizaciones que mueren por falta de seguimiento. El cliente no dijo no, simplemente no respondió. Y tú, con la cabeza en lo siguiente, no volviste a llamar. Ese deal no lo perdiste ante la competencia: lo perdiste ante el silencio.</p>

<h3>4. Tu imagen profesional sufre (aunque no te lo digan)</h3>

<p>La cotización es, en muchos casos, el primer documento formal que el cliente recibe de ti. Es el momento en que deja de hablar con una persona y empieza a evaluar una empresa.</p>

<p>Una plantilla de Excel con la tipografía por defecto, sin tu logo bien colocado, sin numeración de propuesta, sin condiciones de pago claramente formateadas... no transmite la misma confianza que un PDF limpio, con cabecera profesional y firma digital.</p>

<p>Los clientes no te dirán "tu cotización parece amateur". Simplemente irán con quien les generó más confianza desde el primer contacto.</p>

<h3>5. No puedes escalar el equipo sin caos</h3>

<p>Mientras eres solo tú, el sistema Excel puede funcionar a trancas y barrancas. Pero en el momento en que hay dos personas cotizando —un comercial junior, un socio, alguien que cubre las vacaciones— el sistema colapsa.</p>

<p>¿Quién tiene el catálogo actualizado? ¿Qué plantilla se usa? ¿Cómo sé que las condiciones de pago que puso mi compañero son las correctas para ese cliente? ¿Dónde están las cotizaciones que envió mientras yo estaba de viaje?</p>

<p>El caos no llega de golpe. Llega gradualmente, un fichero confuso a la vez, hasta que un día alguien envía una propuesta con precios de hace un año y nadie sabe exactamente cómo pasó.</p>

<h2>Qué ganas realmente al pasarte a un software especializado</h2>

<p>La respuesta fácil es "velocidad". Y es verdad: generar una cotización con un software CPQ es entre tres y cinco veces más rápido que con Excel una vez que tienes el catálogo configurado. Pero la velocidad es solo el beneficio más visible. Los más importantes son otros.</p>

<h3>Control del pipeline: saber qué pasa con cada propuesta</h3>

<p>Un software de cotizaciones te dice, de un vistazo, cuántas propuestas tienes en cada estado: borrador, enviada, vista por el cliente, aceptada, rechazada, vencida. Puedes ver cuánto valor hay en cada etapa del embudo y priorizar el seguimiento donde más impacto tiene.</p>

<p>Eso es lo que diferencia a un comercial reactivo (que responde cuando el cliente llama) de uno proactivo (que contacta en el momento justo, cuando la propuesta lleva X días sin respuesta).</p>

<h3>Precios correctos, siempre</h3>

<p>Con un catálogo de productos centralizado, el precio unitario se actualiza una vez y se refleja en todas las cotizaciones nuevas automáticamente. Los descuentos por cliente, por volumen o por tipo de producto se configuran una vez y se aplican sin intervención manual.</p>

<p>El resultado: cero errores de precio. Y cuando hay que subir tarifas —algo que en el contexto inflacionario actual ocurre con frecuencia— lo haces en un solo lugar, no buscando en veinte ficheros cuál es "el bueno".</p>

<h3>Aspecto profesional sin dedicarle tiempo al diseño</h3>

<p>Los mejores softwares de cotizaciones generan PDFs con aspecto profesional de forma automática: cabecera con tu logo, líneas de producto bien estructuradas, desglose de IVA correcto, condiciones de pago, pie con datos legales. Tú rellenas el contenido; el sistema se ocupa del formato.</p>

<p>El tiempo que antes dedicabas a ajustar columnas y márgenes en Excel lo dedicarás a entender las necesidades del cliente antes de enviar la propuesta.</p>

<h3>Colaboración sin fricción</h3>

<p>Todo el equipo trabaja sobre el mismo sistema. El responsable comercial puede ver las cotizaciones de cada vendedor. Un nuevo empleado puede empezar a cotizar correctamente desde el primer día porque el catálogo, las plantillas y las condiciones ya están configuradas. Nadie depende de preguntarle al compañero "¿me pasas tu plantilla de cotizaciones?".</p>

<h3>Datos para tomar mejores decisiones</h3>

<p>¿Qué productos aparecen más en tus cotizaciones ganadas? ¿En qué rango de precios tienes más tasa de cierre? ¿Qué tipo de descuento acelera la decisión del cliente? Con Excel nunca tendrás esas respuestas porque los datos están fragmentados en cientos de ficheros. Con un software dedicado, esa información está ahí, esperando a que la uses para ajustar tu estrategia de precios.</p>

<h2>El argumento del "Excel personalizado"</h2>

<p>Hay un perfil de usuario que siempre aparece en esta conversación: el que tiene "un Excel muy avanzado". Macros, tablas dinámicas, validaciones de datos, listas desplegables con los productos del catálogo. A veces es impresionante.</p>

<p>El problema no es la complejidad técnica del fichero. El problema es que ese Excel avanzado lo construyó una persona, lo entiende esa persona, y si esa persona se va o se pone enferma, el sistema deja de funcionar. Además, sigue siendo un fichero: no tiene estado, no tiene historial de cambios trazable, no envía recordatorios de seguimiento, y no genera métricas de pipeline.</p>

<p>El Excel avanzado es una señal de que el negocio necesita un sistema real. El esfuerzo invertido en construirlo habría dado más retorno configurando una herramienta diseñada para eso.</p>

<h2>Cuándo NO tiene sentido cambiar</h2>

<p>En honestidad: hay situaciones donde Excel es perfectamente adecuado.</p>

<ul>
<li><strong>Si cotizas menos de dos o tres veces al mes.</strong> El volumen no justifica el coste de adoptar y aprender una nueva herramienta. Una buena plantilla de Excel o Google Sheets es suficiente.</li>
<li><strong>Si todas tus cotizaciones son altamente personalizadas y únicas.</strong> Negocios donde cada propuesta es un proyecto irrepetible (una obra de arquitectura singular, un proyecto de consultoría estratégica muy específico) a veces encajan mejor en documentos libres que en formularios estructurados. Aunque incluso aquí, los buenos softwares permiten suficiente flexibilidad.</li>
<li><strong>Si acabas de empezar y todavía estás validando tu modelo de precios.</strong> No construyas sistemas sobre precios que cambiarán cada semana. Primero valida, luego sistematiza.</li>
</ul>

<p>El cambio tiene sentido cuando el dolor de seguir con Excel supera la fricción de aprender algo nuevo. Y ese punto llega antes de lo que parece.</p>

<h2>El momento ideal para hacer el cambio</h2>

<p>No es cuando ya estás en crisis. No es cuando has perdido el tercer deal por un error de precio. El momento ideal es cuando empiezas a sentir la fricción, antes de que se convierta en problema sistémico.</p>

<p>Algunos indicadores concretos de que ese momento ha llegado:</p>

<ul>
<li>Envías más de diez cotizaciones al mes</li>
<li>Tienes más de una persona involucrada en el proceso comercial</li>
<li>Has tenido al menos un incidente de precio incorrecto en los últimos seis meses</li>
<li>No puedes decir de memoria cuántas propuestas tienes abiertas ahora mismo</li>
<li>El tiempo entre la solicitud del cliente y el envío de la cotización supera las 24 horas</li>
</ul>

<p>Si se cumplen dos o más de estos criterios, el cambio te pagará el tiempo invertido en el primer mes.</p>

<h2>Cómo hacer la transición sin que sea un drama</h2>

<p>El mayor freno para cambiar de herramienta no es el coste: es el miedo a la disrupción. "Ahora mismo no puedo parar a aprender un sistema nuevo." Es comprensible, pero la lógica falla: cuanto más esperas, más cotizaciones tienes en Excel, más historial hay que migrar, y más profundo es el hábito.</p>

<p>La transición es más sencilla de lo que parece si la haces en orden:</p>

<ol>
<li><strong>Exporta tu catálogo de productos a una hoja de cálculo limpia.</strong> Nombre, descripción, precio unitario, tipo de IVA. Eso es todo lo que necesitas para empezar.</li>
<li><strong>Configura una plantilla base</strong> con tu logo, tus condiciones de pago habituales y tu pie de página legal. Treinta minutos de trabajo que no volverás a repetir.</li>
<li><strong>Crea las primeras cinco cotizaciones en el nuevo sistema</strong> en paralelo a como lo harías en Excel. Esto te da confianza sin riesgo.</li>
<li><strong>A partir de la semana dos, solo usas el nuevo sistema.</strong> No "para cotizaciones importantes". Para todas. La consistencia es lo que construye el hábito.</li>
</ol>

<p>Con DealForge, por ejemplo, el proceso de onboarding está diseñado para que en menos de una hora tengas tu catálogo cargado y tu primera cotización lista para enviar. No necesitas formación técnica ni consultor de implementación. Si sabes usar una hoja de cálculo, sabes usar DealForge.</p>

<h2>La pregunta que realmente importa</h2>

<p>Hay una forma muy simple de saber si necesitas un cambio: calcula cuánto tiempo dedicas cada semana a tareas relacionadas con cotizaciones —crear, corregir, buscar, hacer seguimiento, reenviar— y multiplícalo por tu coste por hora.</p>

<p>Para la mayoría de PYMEs, ese número está entre 3 y 8 horas semanales. A un coste de oportunidad de 40 euros/hora, son entre 120 y 320 euros semanales en tiempo comercial que no se está dedicando a generar nuevos leads o a cerrar deals existentes.</p>

<p>Un software de cotizaciones cuesta entre 30 y 100 euros al mes según las funcionalidades. La aritmética no deja mucho espacio a la duda.</p>

<p>El argumento no es tecnológico. Es económico: ¿cuánto vale tu tiempo comercial, y qué es lo mejor que puedes hacer con él?</p>

<h2>Conclusión</h2>

<p>Excel no es el problema. El problema es seguir usando Excel cuando ya has superado el umbral para el que tiene sentido. Y ese umbral llega más rápido de lo que anticipas.</p>

<p>La transición a un software especializado no es un lujo de empresas grandes. Es la decisión operativa correcta en el momento correcto: cuando el proceso comercial empieza a ser un freno en lugar de un motor.</p>

<p>Si reconoces alguna de las señales de este artículo en tu día a día, el mejor momento para hacer el cambio era hace seis meses. El segundo mejor momento es hoy.</p>

<p><strong>&iquest;Quieres ver cómo funciona en la práctica?</strong> <a href="https://dealforge.es">DealForge</a> tiene una prueba gratuita sin tarjeta de crédito. En menos de una hora puedes tener tu catálogo cargado y tu primera cotización enviada.</p>`,
    autor: "DealForge",
    categoria: "herramientas",
    tags: JSON.stringify([
      "Excel",
      "cotizaciones",
      "presupuestos",
      "software cotizaciones",
      "CPQ",
      "productividad",
      "herramientas ventas",
      "pymes",
    ]),
    publicado: true,
    publishedAt: new Date(),
    metaTitulo:
      "Excel vs Software de Cotizaciones: Cuándo Hacer el Cambio — DealForge",
    metaDescripcion:
      "¿Sigues usando Excel para cotizar? Descubre las señales exactas que indican que es hora de cambiar a un software especializado, y cómo hacer la transición sin disrupción.",
    metaKeywords:
      "excel vs software cotizaciones, dejar excel para cotizaciones, programa cotizaciones pymes, cuando cambiar excel cotizaciones, software presupuestos españa, herramienta cotizaciones profesional, CPQ pymes, automatizar cotizaciones excel",
  };

  const post6 = {
    slug: "como-hacer-seguimiento-cotizaciones-sin-ser-pesado",
    titulo: "Cómo hacer seguimiento de cotizaciones sin parecer desesperado",
    extracto:
      "El seguimiento de cotizaciones es donde se gana o se pierde la venta. Aprende cuándo llamar, qué decir y cómo usar la automatización para hacer follow-up sin agobiar al cliente.",
    contenido: `<p>Has enviado la cotización. El cliente dijo que le parecía bien. Han pasado cinco días y no hay noticias. ¿Llamas? ¿Esperas? ¿Mandas un email? ¿Cuántas veces?</p>

<p>Este momento —el silencio post-cotización— es donde se pierden más ventas en PYMEs españolas. No porque el precio fuera malo. No porque el cliente no estuviera interesado. Sino porque el seguimiento se hace mal: demasiado pronto, demasiado tarde, con el mensaje equivocado, o directamente no se hace.</p>

<p>Vamos a resolver esto de una vez.</p>

<h2>Por qué el seguimiento importa más de lo que crees</h2>

<p>Hay un dato que circula mucho en ventas B2B y que, aunque varía según el sector, refleja una realidad que cualquier comercial reconoce: <strong>la mayoría de las ventas se cierran después del quinto contacto</strong>, pero la mayoría de los vendedores se rinden después del segundo.</p>

<p>No se trata de ser insistente. Se trata de estar presente en el momento en que el cliente toma la decisión. Y ese momento rara vez es el día que recibe la cotización.</p>

<p>La realidad del cliente al otro lado es esta: recibió tu cotización, le interesa, pero tiene diez urgencias encima de la mesa. Tu propuesta está en su bandeja de entrada, marcada como "pendiente de revisar", compitiendo con todo lo demás. Si no vuelves a aparecer, simplemente se olvidará. Sin mala intención.</p>

<h2>El error más común: el seguimiento reactivo</h2>

<p>La mayoría de las PYMEs hacen seguimiento reactivo: esperan a que el cliente dé señales de vida y, si no las hay, o no hacen nada o llaman en el peor momento posible —cuando están ellos ansiosos, no cuando el cliente está preparado para decidir.</p>

<p>El seguimiento efectivo es <strong>proactivo y estructurado</strong>. Tienes un plan antes de enviar la cotización, no después de llevar tres días sin noticias.</p>

<h2>El protocolo de seguimiento que funciona</h2>

<p>Aquí va un esquema que funciona para la mayoría de ciclos de venta en PYMEs, con servicios de ticket medio (entre 1.000 y 20.000 euros). Ajústalo a tu sector, pero úsalo como punto de partida:</p>

<h3>Día 0: la cotización y el cierre del primer contacto</h3>

<p>El error empieza aquí. Muchas empresas envían la cotización por email y esperan. <strong>No hagas eso.</strong></p>

<p>Cuando envíes la cotización, cierra ese mismo momento con una pregunta de confirmación:</p>

<ul>
<li>"¿Tienes todo lo que necesitas para tomar la decisión, o hay algo que quieras que aclaremos?"</li>
<li>"¿Cuándo crees que podrías tener una respuesta?"</li>
</ul>

<p>Esa segunda pregunta es la más importante. Si el cliente te dice "a finales de la semana que viene", acabas de eliminar toda la incertidumbre. Sabes exactamente cuándo hacer el siguiente contacto y tienes su permiso implícito para hacerlo.</p>

<h3>Día 1-2: confirmación de recepción</h3>

<p>Si el envío fue por email y no hubo llamada previa, manda un email corto al día siguiente. No para presionar, sino para confirmar que llegó bien:</p>

<blockquote>
<p>"Hola [nombre], te escribo para confirmar que la propuesta llegó correctamente. Quedo a tu disposición si tienes cualquier pregunta. Un saludo."</p>
</blockquote>

<p>Dos líneas. Sin presión. Esto también te da información: si no responde ni a esto, el lead es más frío de lo que parecía.</p>

<h3>Día 3-5: el primer seguimiento real</h3>

<p>Este es el contacto más importante. No mandes otro email genérico. <strong>Llama.</strong></p>

<p>El objetivo de esta llamada no es preguntar "¿qué tal la propuesta?". El objetivo es aportarle algo de valor o resolver una duda que probablemente tenga. Ejemplos:</p>

<ul>
<li>"Llamaba porque hemos tenido un par de clientes del sector [X] con la misma casuística que tú, y quería comentarte cómo lo resolvieron, por si te era útil antes de tomar la decisión."</li>
<li>"Recordaba que me comentaste que el plazo de entrega era un factor importante para vosotros. Quería confirmar que, con vuestra timeline, podemos garantizarlo sin problema."</li>
</ul>

<p>Estás aportando valor, no pidiendo un sí. Eso cambia completamente el tono de la conversación.</p>

<h3>Día 7-10: segundo seguimiento</h3>

<p>Si después de la llamada sigue sin haber respuesta, un email con una pregunta directa pero sin presión:</p>

<blockquote>
<p>"Hola [nombre], sé que estás con muchas cosas encima. Solo quería saber si seguís adelante con el proyecto o si las prioridades han cambiado. No hay ningún problema si es así, solo para tener claro en qué punto estamos. Un saludo."</p>
</blockquote>

<p>Este email tiene un truco: le das permiso para decirte que no. Eso elimina la presión percibida y, paradójicamente, aumenta las probabilidades de que responda. Además, si el proyecto realmente se ha cancelado, es mejor saberlo ya que seguir invirtiendo tiempo en un lead muerto.</p>

<h3>Día 14-21: el seguimiento de largo plazo</h3>

<p>Si a estas alturas no hay respuesta, la venta no está cerrada pero tampoco perdida. Pasa al <strong>modo mantenimiento</strong>: un contacto mensual con contenido útil, sin presión de cierre.</p>

<ul>
<li>Un artículo relevante para su sector</li>
<li>Una novedad de tu empresa que pueda interesarle</li>
<li>Un caso de éxito de un cliente similar</li>
</ul>

<p>El objetivo aquí es seguir siendo relevante hasta que el momento de compra llegue. Y llegará.</p>

<h2>Qué decir (y qué no decir) en el seguimiento</h2>

<p>Hay frases que matan una venta en el seguimiento. Estas son las peores:</p>

<ul>
<li><strong>"Llamaba para ver si habías tomado una decisión."</strong> Suena a presión. El cliente siente que le estás persiguiendo.</li>
<li><strong>"¿Qué tal mi propuesta?"</strong> Pones el foco en ti, no en él.</li>
<li><strong>"Solo quería recordarte que la oferta expira el viernes."</strong> Si es una excusa artificial, el cliente lo nota y pierde confianza.</li>
</ul>

<p>Las frases que funcionan siempre tienen algo en común: <strong>aportan valor o muestran interés genuino por la situación del cliente</strong>, no por tu venta.</p>

<ul>
<li>"Hablando con otro cliente del sector, me acordé de tu caso y quería comentarte algo."</li>
<li>"¿Ha habido algún cambio en el proyecto desde que hablamos?"</li>
<li>"¿Hay algo de la propuesta que no quedó del todo claro o que te genere dudas?"</li>
</ul>

<h2>El canal importa: email vs. llamada vs. WhatsApp</h2>

<p>No hay un canal universalmente mejor, pero sí hay patrones que funcionan:</p>

<h3>Email</h3>
<p>Ideal para el primer envío de la cotización y los seguimientos escritos donde quieres dejar constancia. Malo para hacer seguimiento urgente o cuando el lead lleva días sin responder: los emails se pierden fácilmente.</p>

<h3>Llamada telefónica</h3>
<p>El canal más efectivo para el seguimiento directo. Es más personal, permite detectar objeciones en tiempo real y muestra un nivel de compromiso que el email no transmite. El problema es que muchas personas no cogen el teléfono a números desconocidos. Solución: avisa por email que vas a llamar.</p>

<h3>WhatsApp</h3>
<p>En el contexto español, WhatsApp se ha convertido en un canal de seguimiento perfectamente válido, especialmente en relaciones comerciales donde ya hay confianza previa. Es más informal, pero también más directo. Úsalo cuando el cliente ya lo ha usado contigo o cuando el perfil del cliente lo sugiere.</p>

<p>La regla general: <strong>usa el canal que el cliente ya usa contigo</strong>. Si todas las conversaciones han sido por email, no le mandes un WhatsApp sin avisar. Si ya habéis hablado por teléfono varias veces, la llamada es natural.</p>

<h2>Cómo saber cuándo parar</h2>

<p>Una de las preguntas más frecuentes: ¿cuántos seguimientos son demasiados?</p>

<p>La respuesta honesta: depende del ticket y del ciclo de venta. Para una venta de 2.000 euros con decisión rápida, tres contactos en dos semanas es suficiente. Para una venta de 50.000 euros con múltiples stakeholders, puedes estar seis meses en seguimiento activo sin que sea excesivo.</p>

<p>La señal de parada no es el tiempo, sino la respuesta del cliente. Si te pide explícitamente que pares, paras. Si te dice que el proyecto se ha cancelado, agradeces y cierras. Si simplemente no responde después de cinco o seis intentos bien distribuidos, lo mueves a seguimiento pasivo (un email al mes) y dedicas tu energía a leads más calientes.</p>

<p><strong>No confundas persistencia con acoso.</strong> La persistencia respeta los tiempos del cliente. El acoso los ignora.</p>

<h2>El problema estructural: hacer esto a mano no escala</h2>

<p>Aquí está el problema real de la mayoría de PYMEs: el seguimiento manual no escala.</p>

<p>Cuando tienes cinco cotizaciones abiertas, puedes llevar el seguimiento en tu cabeza. Cuando tienes veinte, necesitas un sistema. Cuando tienes cincuenta, sin sistema pierdes ventas sí o sí.</p>

<p>El caos del seguimiento manual tiene un coste directo: leads que caducan porque nadie los siguió a tiempo, cotizaciones que nunca se cerraron porque el comercial se olvidó de llamar el martes, oportunidades perdidas por no tener visibilidad del estado de cada deal.</p>

<p>La solución no es trabajar más horas. Es tener un sistema que te recuerde cuándo hacer qué, con qué cliente y por qué canal.</p>

<h2>Automatizar el seguimiento sin perder el toque humano</h2>

<p>Automatizar el seguimiento no significa mandar emails robóticos en masa. Significa tener un sistema que:</p>

<ul>
<li>Te avise cuando una cotización lleva X días sin respuesta</li>
<li>Te muestre el historial completo de cada cliente antes de llamar</li>
<li>Registre automáticamente cada contacto para que no pierdas el hilo</li>
<li>Te permita configurar recordatorios de seguimiento personalizados por deal</li>
</ul>

<p>Con DealForge, por ejemplo, cuando envías una cotización puedes configurar recordatorios automáticos: "si no hay respuesta en 3 días, avísame". El sistema te lo recuerda, tú decides qué hacer. La automatización gestiona la logística; tú gestionas la relación.</p>

<p>Además, con el seguimiento de apertura de emails —saber si el cliente abrió o no la cotización—, tienes información que cambia completamente tu estrategia. Si el cliente abrió la propuesta cuatro veces en dos días y no ha respondido, es muy diferente a que no la haya abierto nunca. En el primer caso, hay interés pero hay una duda o un freno. En el segundo, quizás ni llegó a su bandeja de entrada.</p>

<h2>Un ejemplo práctico: empresa de reformas en Madrid</h2>

<p>Imagina una empresa de reformas que envía entre 15 y 25 cotizaciones al mes. El ticket medio es 8.000 euros. Con una tasa de cierre del 20%, cierran 3-5 proyectos mensuales.</p>

<p>El problema: muchas cotizaciones quedan sin seguimiento sistemático porque el gerente lleva también la parte técnica. Resultado: leads que se enfrían, clientes que acaban contratando a la competencia no porque fueran más baratos, sino porque fueron más constantes en el contacto.</p>

<p>Con un protocolo estructurado y recordatorios automáticos, esa misma empresa puede subir su tasa de cierre al 28-30% sin aumentar el número de cotizaciones enviadas. En términos económicos: 1-2 proyectos adicionales al mes, 8.000-16.000 euros más de facturación con el mismo esfuerzo comercial.</p>

<p>El seguimiento no es un extra. Es parte del proceso de venta.</p>

<h2>Resumen: el protocolo en cinco puntos</h2>

<ol>
<li><strong>Cierra el primer contacto con una pregunta de timing</strong>: "¿Cuándo crees que tendrás una respuesta?" Así sabes cuándo hacer el siguiente contacto y tienes permiso implícito para hacerlo.</li>
<li><strong>Confirma la recepción al día siguiente</strong> si el envío fue por email. Dos líneas, sin presión.</li>
<li><strong>El primer seguimiento real, a los 3-5 días, por teléfono y aportando valor</strong>. No preguntes por la decisión: resuelve una duda o comparte algo útil.</li>
<li><strong>El segundo seguimiento, a los 7-10 días, dándole permiso para decir que no</strong>. Esto reduce la presión percibida y aumenta las respuestas.</li>
<li><strong>A partir de las dos semanas sin respuesta, modo mantenimiento</strong>: un contacto al mes con contenido relevante hasta que el momento llegue.</li>
</ol>

<p>El seguimiento de cotizaciones no es una tarea incómoda que hay que hacer a regañadientes. Es una habilidad comercial que, bien ejecutada, puede doblar tu tasa de cierre sin añadir un solo euro al presupuesto de marketing.</p>

<p><strong>Si quieres dejar de hacer seguimiento a mano y tener visibilidad total de tus cotizaciones abiertas</strong>, <a href="https://dealforge.es">DealForge</a> incluye recordatorios automáticos, seguimiento de aperturas y gestión de pipeline desde el primer día. Pruébalo gratis, sin tarjeta de crédito.`,
    autor: "DealForge",
    categoria: "ventas",
    tags: JSON.stringify([
      "seguimiento cotizaciones",
      "follow-up ventas",
      "cerrar ventas",
      "cotizaciones",
      "presupuestos",
      "ventas B2B",
      "pymes",
      "proceso comercial",
    ]),
    publicado: true,
    publishedAt: new Date(),
    metaTitulo:
      "Cómo Hacer Seguimiento de Cotizaciones Sin Parecer Pesado — DealForge",
    metaDescripcion:
      "Protocolo paso a paso para hacer follow-up de cotizaciones: cuándo llamar, qué decir y cómo automatizar el seguimiento sin agobiar al cliente ni perder ventas.",
    metaKeywords:
      "seguimiento cotizaciones, follow-up presupuestos, hacer seguimiento ventas, cómo hacer follow-up cotización, seguimiento comercial pymes, automatizar seguimiento cotizaciones, cerrar más ventas, proceso comercial pymes españa",
  };

  const posts = [post, post2, post3, post4, post5, post6];
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
