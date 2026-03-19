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

  const posts = [post, post2];
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
