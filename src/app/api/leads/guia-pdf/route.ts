import { NextResponse } from "next/server";

export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>5 Errores en tus Cotizaciones que te Están Haciendo Perder Ventas — DealForge</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, sans-serif; color: #1a1a1a; line-height: 1.7; }

    .download-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid #e5e7eb;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .download-bar span {
      font-size: 14px;
      font-weight: 600;
      color: #374151;
    }
    .download-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #3a9bb5;
      color: white;
      font-weight: 600;
      font-size: 13px;
      padding: 8px 20px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: background 0.2s;
    }
    .download-btn:hover { background: #2d7d94; }
    .download-btn svg { width: 16px; height: 16px; }

    @media print {
      .download-bar { display: none !important; }
    }

    .cover {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 60px 40px;
      background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #fff7ed 100%);
      page-break-after: always;
    }
    .cover-badge {
      display: inline-block;
      background: #3a9bb5;
      color: white;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 6px 16px;
      border-radius: 20px;
      margin-bottom: 24px;
    }
    .cover h1 {
      font-size: 42px;
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 20px;
      max-width: 600px;
    }
    .cover h1 span { color: #ef4444; }
    .cover p {
      font-size: 18px;
      color: #6b7280;
      max-width: 480px;
      margin-bottom: 40px;
    }
    .cover-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 18px;
      color: #3a9bb5;
    }
    .cover-logo img { width: 36px; height: 36px; border-radius: 8px; }
    .cover-url { font-size: 13px; color: #9ca3af; margin-top: 8px; }

    .page {
      max-width: 720px;
      margin: 0 auto;
      padding: 60px 40px;
    }

    h2 {
      font-size: 28px;
      font-weight: 800;
      margin-bottom: 12px;
      color: #111;
    }
    h3 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #111;
    }
    p { margin-bottom: 16px; color: #374151; }

    .intro {
      font-size: 17px;
      color: #4b5563;
      border-left: 4px solid #3a9bb5;
      padding-left: 20px;
      margin: 24px 0 40px;
    }

    .error-card {
      background: #fef2f2;
      border: 1px solid #fee2e2;
      border-radius: 16px;
      padding: 28px;
      margin-bottom: 32px;
      page-break-inside: avoid;
    }
    .error-card .num {
      display: inline-block;
      background: #ef4444;
      color: white;
      font-weight: 800;
      font-size: 14px;
      width: 36px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      border-radius: 10px;
      margin-bottom: 12px;
    }
    .error-card h3 { color: #991b1b; margin-bottom: 10px; }
    .error-card p { color: #7f1d1d; margin-bottom: 0; }

    .solution-card {
      background: #f0fdf4;
      border: 1px solid #dcfce7;
      border-radius: 16px;
      padding: 28px;
      margin-bottom: 32px;
      page-break-inside: avoid;
    }
    .solution-card h3 { color: #166534; }
    .solution-card p { color: #15803d; }
    .solution-card .check {
      display: inline-block;
      background: #22c55e;
      color: white;
      font-weight: 800;
      font-size: 14px;
      width: 36px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      border-radius: 10px;
      margin-bottom: 12px;
    }

    .tip-box {
      background: #eff6ff;
      border: 1px solid #dbeafe;
      border-radius: 12px;
      padding: 20px 24px;
      margin: 16px 0 32px;
    }
    .tip-box strong { color: #1e40af; }
    .tip-box p { color: #1e3a5f; margin-bottom: 0; font-size: 14px; }

    .cta-section {
      background: linear-gradient(135deg, #3a9bb5, #2d7d94);
      border-radius: 20px;
      padding: 48px;
      text-align: center;
      color: white;
      margin-top: 48px;
      page-break-inside: avoid;
    }
    .cta-section h2 { color: white; margin-bottom: 16px; }
    .cta-section p { color: rgba(255,255,255,0.85); max-width: 480px; margin: 0 auto 24px; }
    .cta-btn {
      display: inline-block;
      background: white;
      color: #3a9bb5;
      font-weight: 700;
      font-size: 15px;
      padding: 14px 32px;
      border-radius: 12px;
      text-decoration: none;
    }

    .footer {
      text-align: center;
      padding: 40px;
      color: #9ca3af;
      font-size: 13px;
    }

    @media print {
      .cover { min-height: auto; padding: 80px 40px; }
      body { font-size: 14px; }
    }
  </style>
</head>
<body>

<!-- DOWNLOAD BAR -->
<div class="download-bar">
  <span>DealForge — Guía Gratuita</span>
  <button class="download-btn" onclick="window.print()">
    <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
    Descargar PDF
  </button>
</div>
<div style="height: 56px;"></div>

<!-- COVER -->
<div class="cover">
  <div class="cover-badge">Guía Gratuita</div>
  <h1>5 Errores en tus Cotizaciones que te Están Haciendo <span>Perder Ventas</span></h1>
  <p>Descubre qué está fallando en tu proceso comercial y cómo solucionarlo para cerrar más deals.</p>
  <div class="cover-logo">
    <span>DealForge</span>
  </div>
  <p class="cover-url">dealforge.es</p>
</div>

<!-- CONTENT -->
<div class="page">
  <h2>Introducción</h2>
  <p class="intro">
    Si eres director comercial o responsable de ventas en una PYME, sabes que cada cotización es una oportunidad.
    Pero ¿cuántas de esas oportunidades se pierden por errores evitables en el proceso de cotización?
    <br><br>
    Según estudios de Harvard Business Review, <strong>el 35-50% de las ventas las gana quien responde primero</strong>.
    Sin embargo, la mayoría de equipos comerciales tardan entre 2 y 5 días en enviar una propuesta.
    <br><br>
    En esta guía identificamos los 5 errores más comunes y te damos soluciones prácticas para cada uno.
  </p>

  <!-- ERROR 1 -->
  <div class="error-card">
    <div class="num">01</div>
    <h3>Tardar demasiado en enviar la cotización</h3>
    <p>
      El tiempo de respuesta es el factor #1 en conversión de ventas B2B. Cuando un cliente pide una cotización,
      está en modo "compra activa". Cada hora que pasa, su interés disminuye y la probabilidad de que contacte
      a tu competencia aumenta.
    </p>
  </div>
  <div class="solution-card">
    <div class="check">✓</div>
    <h3>Solución: Automatiza la creación de cotizaciones</h3>
    <p>
      Usa plantillas predefinidas con tu catálogo de productos y precios actualizados.
      Un sistema CPQ te permite generar cotizaciones profesionales en minutos, no días.
      El objetivo: responder en menos de 1 hora desde la solicitud del cliente.
    </p>
  </div>
  <div class="tip-box">
    <strong>💡 Dato clave:</strong>
    <p>Las empresas que responden en menos de 5 minutos tienen 21x más probabilidades de cualificar al lead (InsideSales.com).</p>
  </div>

  <!-- ERROR 2 -->
  <div class="error-card">
    <div class="num">02</div>
    <h3>No personalizar la propuesta</h3>
    <p>
      "Estimado cliente" es la forma más rápida de ir a la papelera. Las cotizaciones genéricas transmiten
      que el vendedor no ha invertido tiempo en entender las necesidades del cliente. En B2B, la personalización
      no es un "nice to have" — es lo que diferencia una propuesta ganadora.
    </p>
  </div>
  <div class="solution-card">
    <div class="check">✓</div>
    <h3>Solución: Personaliza automáticamente cada propuesta</h3>
    <p>
      Incluye el nombre del contacto, el nombre de la empresa, y referencia el problema específico que resuelves.
      Un buen CRM/CPQ puede autocompletar estos datos. Añade notas personalizadas en cada cotización
      que demuestren que entiendes su caso.
    </p>
  </div>

  <!-- ERROR 3 -->
  <div class="error-card">
    <div class="num">03</div>
    <h3>Ocultar o complicar los precios</h3>
    <p>
      Estructuras de precios confusas, con costes ocultos y descuentos incomprensibles, generan desconfianza.
      Si un cliente necesita un MBA para entender tu cotización, buscará alternativas más transparentes.
      La claridad en pricing es directamente proporcional a la confianza del cliente.
    </p>
  </div>
  <div class="solution-card">
    <div class="check">✓</div>
    <h3>Solución: Precios claros y desglosados</h3>
    <p>
      Muestra cada línea de producto con cantidad, precio unitario, descuento aplicado y total.
      Incluye subtotal, impuestos y total final de forma visible. Si ofreces descuentos, explica por qué.
      La transparencia genera confianza y acelera la decisión.
    </p>
  </div>
  <div class="tip-box">
    <strong>💡 Dato clave:</strong>
    <p>El 94% de los compradores B2B dicen que la transparencia en precios es crucial en su decisión de compra (Gartner).</p>
  </div>

  <!-- ERROR 4 -->
  <div class="error-card">
    <div class="num">04</div>
    <h3>No incluir términos y condiciones claros</h3>
    <p>
      Sin T&C claros, el cliente tiene preguntas sin respuesta: ¿Qué pasa si quiero cancelar? ¿Cuáles son
      los plazos de entrega? ¿Hay garantía? Estas dudas frenan la firma y alargan innecesariamente
      el ciclo de venta.
    </p>
  </div>
  <div class="solution-card">
    <div class="check">✓</div>
    <h3>Solución: T&C estándar en cada cotización</h3>
    <p>
      Define tus condiciones estándar una vez y que se incluyan automáticamente en cada cotización.
      Cubre validez de la oferta, condiciones de pago, plazos de entrega y política de cancelación.
      Esto transmite profesionalidad y reduce fricciones legales.
    </p>
  </div>

  <!-- ERROR 5 -->
  <div class="error-card">
    <div class="num">05</div>
    <h3>No hacer seguimiento después de enviar</h3>
    <p>
      Envías la cotización y... silencio. El 80% de las ventas requieren al menos 5 contactos de seguimiento,
      pero el 44% de los vendedores abandonan después del primer intento. Sin un sistema de follow-up
      automatizado, los deals se enfrían y mueren silenciosamente.
    </p>
  </div>
  <div class="solution-card">
    <div class="check">✓</div>
    <h3>Solución: Automatiza el seguimiento</h3>
    <p>
      Configura recordatorios automáticos: un email a los 3 días si no hay respuesta,
      otro antes del vencimiento de la cotización. Combina esto con firma electrónica
      para eliminar la fricción del cierre. Cuando el cliente está listo, que pueda firmar con un clic.
    </p>
  </div>
  <div class="tip-box">
    <strong>💡 Dato clave:</strong>
    <p>Las empresas con seguimiento automatizado cierran un 30% más de deals que las que dependen de follow-ups manuales (Salesforce).</p>
  </div>

  <!-- CHECKLIST -->
  <h2 style="margin-top: 48px;">Checklist: ¿Tu proceso de cotizaciones es eficiente?</h2>
  <p>Marca cada punto que cumples actualmente:</p>
  <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin: 16px 0 32px;">
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #374151;">
        ☐ Envías cotizaciones en menos de 1 hora
      </label>
      <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #374151;">
        ☐ Cada propuesta incluye el nombre del contacto y empresa
      </label>
      <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #374151;">
        ☐ Los precios están claros y desglosados
      </label>
      <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #374151;">
        ☐ Incluyes términos y condiciones estándar
      </label>
      <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #374151;">
        ☐ Tienes seguimiento automatizado post-envío
      </label>
      <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #374151;">
        ☐ El cliente puede firmar electrónicamente
      </label>
      <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #374151;">
        ☐ Tienes métricas de tasa de conversión de cotizaciones
      </label>
    </div>
    <p style="font-size: 13px; color: #6b7280; margin-top: 16px; margin-bottom: 0;">
      <strong>Si marcaste menos de 5</strong>, tu proceso tiene margen de mejora significativo.
    </p>
  </div>

  <!-- CTA -->
  <div class="cta-section">
    <h2>Elimina estos 5 errores hoy</h2>
    <p>
      DealForge es el sistema CPQ diseñado para PYMEs que quieren cotizar más rápido,
      con más profesionalidad y cerrar más ventas.
    </p>
    <a href="https://dealforge.es/registro" class="cta-btn">
      Empieza Gratis — dealforge.es
    </a>
  </div>

  <div class="footer">
    <p>&copy; 2026 DealForge. Todos los derechos reservados.</p>
    <p style="margin-top: 4px;">dealforge.es</p>
  </div>
</div>

</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": 'inline; filename="DealForge-Guia-5-Errores-Cotizaciones.html"',
    },
  });
}
