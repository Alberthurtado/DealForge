import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

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

  // Check if already exists
  const existing = await prisma.blogPost.findUnique({
    where: { slug: post.slug },
  });

  if (existing) {
    return NextResponse.json({ message: "Post already exists", slug: post.slug });
  }

  const created = await prisma.blogPost.create({ data: post });

  return NextResponse.json({ success: true, slug: created.slug, id: created.id }, { status: 201 });
}
