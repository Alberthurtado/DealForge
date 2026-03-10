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
    titulo: "Como hacer una cotizacion profesional: guia completa para cerrar mas ventas",
    extracto: "Aprende a crear cotizaciones y presupuestos profesionales que conviertan. Descubre los elementos clave, errores comunes y como un software de cotizaciones puede ahorrarte horas de trabajo.",
    contenido: `<p>Si alguna vez has perdido un cliente porque tu cotizacion llego tarde, tenia errores o simplemente no transmitia profesionalidad, este articulo es para ti. <strong>Crear presupuestos y cotizaciones</strong> es una de esas tareas que parece simple, pero que marca la diferencia entre cerrar una venta o perderla.</p>

<p>Vamos a ver, paso a paso, como hacer una cotizacion que realmente funcione. Sin rodeos, con ejemplos practicos y con ese toque que hara que tu cliente diga &ldquo;si, quiero trabajar contigo&rdquo;.</p>

<h2>Presupuesto vs. cotizacion: &iquest;son lo mismo?</h2>

<p>Antes de entrar en materia, aclaremos algo que genera mucha confusion. Un <strong>presupuesto</strong> se refiere a los recursos economicos disponibles para invertir en algo. Una <strong>cotizacion</strong>, en cambio, es el documento donde le dices a tu cliente cuanto costara lo que necesita.</p>

<p>En la practica, muchas empresas usan ambos terminos de forma intercambiable. Lo importante no es como lo llames, sino que el documento sea claro, profesional y que llegue a tiempo.</p>

<h2>Los 7 elementos que toda cotizacion profesional debe tener</h2>

<p>Una cotizacion efectiva no es solo una lista de precios. Es tu carta de presentacion comercial. Estos son los elementos imprescindibles:</p>

<h3>1. Datos de tu empresa</h3>
<p>Logo, nombre o razon social, CIF/NIF, direccion, telefono y email. Parece obvio, pero te sorprenderia cuantas cotizaciones llegan sin datos de contacto completos. Tu cliente necesita saber exactamente con quien esta tratando.</p>

<h3>2. Datos del cliente</h3>
<p>Nombre de la empresa, persona de contacto, email y telefono. Personalizar la cotizacion con el nombre del cliente ya genera una impresion mucho mas profesional que un &ldquo;Estimado cliente&rdquo; generico.</p>

<h3>3. Numero de referencia</h3>
<p>Un sistema de numeracion consecutiva (por ejemplo, COT-2026-0042) te permite llevar un control ordenado y facilita la comunicacion. Cuando tu cliente te diga &ldquo;he visto tu propuesta&rdquo;, ambos sabreis exactamente de cual habla.</p>

<h3>4. Descripcion detallada de productos o servicios</h3>
<p>Aqui es donde muchos fallan. No basta con poner &ldquo;Servicio de consultoria: 5.000 EUR&rdquo;. Desglosa cada linea con descripcion clara, cantidad, precio unitario y descuentos si los hay. <strong>Cuanto mas transparente seas, mas confianza generas.</strong></p>

<h3>5. Impuestos y totales</h3>
<p>Indica claramente el subtotal, el IVA (o impuesto aplicable) y el total final. No dejes que tu cliente tenga que hacer calculos mentales. Facilita las cosas.</p>

<h3>6. Condiciones comerciales</h3>
<p>Forma de pago, plazo de entrega, validez de la cotizacion y cualquier condicion especial. Esto evita malentendidos y protege a ambas partes. Una cotizacion sin condiciones es una bomba de relojeria.</p>

<h3>7. Fecha de vencimiento</h3>
<p>Establece una fecha limite clara. Esto genera urgencia (sin ser agresivo) y te permite gestionar mejor tu pipeline de ventas. Lo habitual son 15 o 30 dias, dependiendo del sector.</p>

<h2>Los 5 errores que matan tus cotizaciones</h2>

<p>Ahora que sabes que incluir, veamos que errores evitar. Estos son los mas comunes y los mas daninos:</p>

<ol>
<li><strong>Tardar demasiado en enviarla.</strong> Si tu competencia envia la cotizacion el mismo dia y tu tardas una semana, ya has perdido. La velocidad importa, y mucho.</li>
<li><strong>Errores en los calculos.</strong> Nada destruye mas la confianza que un presupuesto con numeros que no cuadran. Revisar los totales deberia ser sagrado.</li>
<li><strong>Falta de personalizacion.</strong> Enviar la misma cotizacion generica a todos tus clientes es como enviar un CV sin carta de presentacion. Adapta cada propuesta.</li>
<li><strong>Disenio poco profesional.</strong> Tu cotizacion refleja tu marca. Si parece hecha en 5 minutos con una hoja de calculo, esa sera la percepcion de tu servicio.</li>
<li><strong>No hacer seguimiento.</strong> Enviar y olvidar. El 80% de las ventas requieren al menos 5 contactos de seguimiento. No dejes que tu cotizacion se pierda en la bandeja de entrada.</li>
</ol>

<h2>&iquest;Plantilla de Excel o software de cotizaciones?</h2>

<p>La eterna pregunta. Seamos honestos: <strong>una plantilla de Excel esta bien para empezar</strong>, pero tiene limites claros. No escala, es facil cometer errores al copiar y pegar, no puedes generar PDFs profesionales automaticamente, y el seguimiento es manual.</p>

<p>Un <strong>software de cotizaciones</strong> como DealForge te permite:</p>

<ul>
<li>Crear cotizaciones profesionales en minutos, no en horas</li>
<li>Mantener un catalogo de productos con precios actualizados</li>
<li>Generar PDFs con tu marca (logo, colores, plantilla personalizada)</li>
<li>Enviar por email directamente desde la plataforma</li>
<li>Aplicar reglas comerciales automaticas (limites de descuento, aprobaciones)</li>
<li>Hacer seguimiento del estado de cada cotizacion</li>
<li>Usar inteligencia artificial para optimizar tus propuestas</li>
</ul>

<p>La diferencia real no esta en la herramienta en si, sino en el tiempo que recuperas. Si dedicas 45 minutos a cada cotizacion manual y puedes reducirlo a 5 minutos con un software, las cuentas hablan solas.</p>

<h2>Como la inteligencia artificial esta cambiando el juego</h2>

<p>La IA ya no es ciencia ficcion en el mundo de las ventas. Herramientas con <strong>IA integrada</strong> pueden sugerirte productos complementarios, detectar cuando un descuento es demasiado agresivo, o incluso redactar el texto de acompaniamiento de tu cotizacion.</p>

<p>En DealForge, por ejemplo, Forge IA analiza el contexto de cada cotizacion y te ayuda con sugerencias inteligentes: desde recomendar el precio optimo hasta alertarte si una condicion comercial podria generar problemas. Todo sin salir de la plataforma.</p>

<h2>Checklist rapido antes de enviar tu cotizacion</h2>

<p>Antes de pulsar &ldquo;Enviar&rdquo;, repasa esta lista:</p>

<ul>
<li>&iquest;Los datos de tu empresa y del cliente estan completos y correctos?</li>
<li>&iquest;La descripcion de cada linea es clara y detallada?</li>
<li>&iquest;Los calculos cuadran (subtotal, descuentos, IVA, total)?</li>
<li>&iquest;Has incluido las condiciones comerciales y la fecha de vencimiento?</li>
<li>&iquest;El disenio refleja la calidad de tu empresa?</li>
<li>&iquest;Has revisado la ortografia?</li>
</ul>

<p>Si has marcado todo, estas listo para enviar una cotizacion que genera confianza y cierra ventas.</p>

<h2>Conclusion</h2>

<p>Hacer una cotizacion profesional no es complicado, pero requiere atencion al detalle y las herramientas adecuadas. Ya sea que uses una plantilla o un software especializado, lo importante es que cada propuesta que envies transmita profesionalidad, transparencia y confianza.</p>

<p>Porque al final, una buena cotizacion no es solo un documento con precios. Es el primer paso de una relacion comercial que puede durar anios.</p>`,
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
      "Como hacer una cotizacion profesional | Guia completa 2026 — DealForge",
    metaDescripcion:
      "Aprende a crear cotizaciones y presupuestos profesionales que cierren ventas. Elementos clave, errores a evitar y como un software de cotizaciones te ahorra horas.",
    metaKeywords:
      "como hacer una cotizacion, crear presupuestos, software de cotizaciones, plantilla cotizacion, programa para presupuestos, cotizacion profesional, presupuesto online, CPQ, software presupuestos pymes",
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
