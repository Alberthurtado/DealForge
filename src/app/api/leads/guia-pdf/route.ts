import { NextResponse } from "next/server";

export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>5 Errores en tus Cotizaciones que te Hacen Perder Ventas — DealForge</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, sans-serif; color: #1a1a1a; line-height: 1.45; font-size: 11px; }

    .download-bar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: rgba(255,255,255,0.95); backdrop-filter: blur(8px);
      border-bottom: 1px solid #e5e7eb; padding: 8px 24px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .download-bar span { font-size: 12px; font-weight: 600; color: #374151; }
    .download-btn {
      display: inline-flex; align-items: center; gap: 6px;
      background: #3a9bb5; color: white; font-weight: 600; font-size: 12px;
      padding: 7px 16px; border-radius: 7px; border: none; cursor: pointer;
    }
    .download-btn:hover { background: #2d7d94; }
    .download-btn svg { width: 14px; height: 14px; }
    @media print { .download-bar, .spacer { display: none !important; } }

    /* COVER — compact */
    .cover {
      padding: 48px 40px 36px;
      text-align: center;
      background: linear-gradient(135deg, #f0f9ff 0%, #fff 50%, #fff7ed 100%);
      border-bottom: 3px solid #3a9bb5;
    }
    .cover-badge { display: inline-block; background: #3a9bb5; color: white; font-size: 9px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 3px 12px; border-radius: 20px; margin-bottom: 12px; }
    .cover h1 { font-size: 26px; font-weight: 800; line-height: 1.15; margin: 0 auto 10px; max-width: 480px; }
    .cover h1 span { color: #ef4444; }
    .cover p { font-size: 12px; color: #6b7280; max-width: 400px; margin: 0 auto 16px; }
    .cover-brand { font-weight: 700; font-size: 13px; color: #3a9bb5; }
    .cover-url { font-size: 10px; color: #9ca3af; margin-top: 2px; }

    /* PAGE */
    .page { max-width: 680px; margin: 0 auto; padding: 20px 36px; }

    h2 { font-size: 15px; font-weight: 800; margin-bottom: 5px; color: #111; }
    h3 { font-size: 11px; font-weight: 700; margin-bottom: 2px; }
    p { margin-bottom: 4px; color: #374151; }

    .intro { font-size: 11px; color: #4b5563; border-left: 3px solid #3a9bb5; padding-left: 12px; margin: 8px 0 16px; line-height: 1.5; }

    /* ERROR + SOLUTION — side by side, compact */
    .pair { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px; page-break-inside: avoid; }
    .err { background: #fef2f2; border: 1px solid #fee2e2; border-radius: 8px; padding: 10px 12px; }
    .err .num { display: inline-block; background: #ef4444; color: white; font-weight: 800; font-size: 9px; width: 20px; height: 20px; line-height: 20px; text-align: center; border-radius: 5px; margin-bottom: 4px; }
    .err h3 { color: #991b1b; font-size: 11px; }
    .err p { color: #7f1d1d; font-size: 10px; margin-bottom: 0; line-height: 1.4; }
    .sol { background: #f0fdf4; border: 1px solid #dcfce7; border-radius: 8px; padding: 10px 12px; }
    .sol .chk { display: inline-block; background: #22c55e; color: white; font-weight: 800; font-size: 9px; width: 20px; height: 20px; line-height: 20px; text-align: center; border-radius: 5px; margin-bottom: 4px; }
    .sol h3 { color: #166534; font-size: 11px; }
    .sol p { color: #15803d; font-size: 10px; margin-bottom: 0; line-height: 1.4; }

    .tip { background: #eff6ff; border: 1px solid #dbeafe; border-radius: 6px; padding: 5px 10px; margin: 0 0 12px; font-size: 10px; color: #1e3a5f; }
    .tip strong { color: #1e40af; }

    /* CHECKLIST — inline 2 cols */
    .checklist { background: #f9fafb; border-radius: 8px; padding: 12px 16px; margin: 6px 0 14px; }
    .checklist-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px 16px; }
    .checklist label { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #374151; }
    .checklist .note { font-size: 10px; color: #6b7280; margin: 6px 0 0; }

    /* CTA */
    .cta { background: linear-gradient(135deg, #3a9bb5, #2d7d94); border-radius: 10px; padding: 20px; text-align: center; color: white; margin-top: 14px; page-break-inside: avoid; }
    .cta h2 { color: white; font-size: 14px; margin-bottom: 5px; }
    .cta p { color: rgba(255,255,255,0.85); max-width: 380px; margin: 0 auto 12px; font-size: 10px; }
    .cta-btn { display: inline-block; background: white; color: #3a9bb5; font-weight: 700; font-size: 11px; padding: 8px 20px; border-radius: 8px; text-decoration: none; }

    .footer { text-align: center; padding: 12px; color: #9ca3af; font-size: 9px; }

    @media print {
      body { font-size: 10px; }
      .cover { padding: 40px 36px 28px; }
      .page { padding: 16px 32px; }
      .pair { margin-bottom: 6px; }
    }
  </style>
</head>
<body>

<div class="download-bar">
  <span>DealForge — Guía Gratuita</span>
  <button class="download-btn" onclick="window.print()">
    <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
    Descargar PDF
  </button>
</div>
<div class="spacer" style="height: 42px;"></div>

<!-- COVER -->
<div class="cover">
  <div class="cover-badge">Guía Gratuita 2026</div>
  <h1>5 Errores en tus Cotizaciones que te Hacen <span>Perder Ventas</span></h1>
  <p>Descubre qué falla en tu proceso comercial y cómo solucionarlo para cerrar más deals.</p>
  <div class="cover-brand">DealForge</div>
  <p class="cover-url">dealforge.es</p>
</div>

<!-- CONTENT -->
<div class="page">
  <h2>Introducción</h2>
  <p class="intro">
    El <strong>35-50% de las ventas B2B las gana quien responde primero</strong> (Harvard Business Review).
    Sin embargo, la mayoría de equipos tardan 2-5 días en enviar una propuesta.
    Aquí van los 5 errores más comunes y sus soluciones.
  </p>

  <!-- 1 -->
  <div class="pair">
    <div class="err">
      <div class="num">01</div>
      <h3>Tardar demasiado en enviar la cotización</h3>
      <p>El tiempo de respuesta es el factor #1 en conversión B2B. Cada hora que pasa, el interés baja y la competencia gana terreno.</p>
    </div>
    <div class="sol">
      <div class="chk">✓</div>
      <h3>Automatiza la creación</h3>
      <p>Usa plantillas con catálogo y precios actualizados. Un CPQ genera cotizaciones en minutos. Objetivo: responder en &lt;1 hora.</p>
    </div>
  </div>
  <div class="tip"><strong>💡</strong> Empresas que responden en &lt;5 min tienen 21x más probabilidades de cualificar al lead (InsideSales).</div>

  <!-- 2 -->
  <div class="pair">
    <div class="err">
      <div class="num">02</div>
      <h3>No personalizar la propuesta</h3>
      <p>"Estimado cliente" es ir directo a la papelera. Las cotizaciones genéricas transmiten desinterés y pierden frente a la competencia.</p>
    </div>
    <div class="sol">
      <div class="chk">✓</div>
      <h3>Personaliza automáticamente</h3>
      <p>Nombre del contacto, empresa y problema específico. Un CPQ autocompleta estos datos y añade notas personalizadas.</p>
    </div>
  </div>

  <!-- 3 -->
  <div class="pair">
    <div class="err">
      <div class="num">03</div>
      <h3>Ocultar o complicar los precios</h3>
      <p>Precios confusos con costes ocultos generan desconfianza. Si tu cliente necesita un MBA para entenderlo, buscará alternativas.</p>
    </div>
    <div class="sol">
      <div class="chk">✓</div>
      <h3>Precios claros y desglosados</h3>
      <p>Cada línea con cantidad, precio unitario y total. Subtotal, impuestos y total visibles. La transparencia acelera decisiones.</p>
    </div>
  </div>
  <div class="tip"><strong>💡</strong> El 94% de compradores B2B dicen que la transparencia en precios es crucial en su decisión (Gartner).</div>

  <!-- 4 -->
  <div class="pair">
    <div class="err">
      <div class="num">04</div>
      <h3>No incluir T&amp;C claros</h3>
      <p>Sin condiciones claras el cliente duda: ¿cancelación? ¿plazos? ¿garantía? Estas dudas frenan la firma y alargan el ciclo de venta.</p>
    </div>
    <div class="sol">
      <div class="chk">✓</div>
      <h3>T&amp;C estándar automáticos</h3>
      <p>Configura condiciones una vez (validez, pago, entrega). Se incluyen en cada cotización automáticamente. Menos fricción legal.</p>
    </div>
  </div>

  <!-- 5 -->
  <div class="pair">
    <div class="err">
      <div class="num">05</div>
      <h3>No hacer seguimiento post-envío</h3>
      <p>El 80% de ventas necesitan 5+ follow-ups, pero el 44% de vendedores abandonan tras el primero. Sin seguimiento, los deals mueren.</p>
    </div>
    <div class="sol">
      <div class="chk">✓</div>
      <h3>Automatiza el seguimiento</h3>
      <p>Recordatorios a los 3 días, alerta pre-vencimiento, y firma electrónica para cerrar con un clic cuando el cliente esté listo.</p>
    </div>
  </div>
  <div class="tip"><strong>💡</strong> Empresas con seguimiento automatizado cierran un 30% más de deals (Salesforce).</div>

  <!-- CHECKLIST -->
  <h2 style="margin-top: 16px;">Checklist rápido</h2>
  <p style="font-size: 10px; color: #6b7280; margin-bottom: 4px;">¿Tu proceso de cotizaciones es eficiente? Marca lo que cumples:</p>
  <div class="checklist">
    <div class="checklist-grid">
      <label>☐ Cotizaciones en &lt;1 hora</label>
      <label>☐ T&amp;C estándar incluidos</label>
      <label>☐ Propuestas personalizadas</label>
      <label>☐ Seguimiento automatizado</label>
      <label>☐ Precios claros y desglosados</label>
      <label>☐ Firma electrónica disponible</label>
    </div>
    <p class="note"><strong>¿Menos de 4?</strong> Tu proceso tiene margen de mejora significativo.</p>
  </div>

  <!-- CTA -->
  <div class="cta">
    <h2>Elimina estos 5 errores hoy</h2>
    <p>DealForge es el CPQ inteligente para PYMEs: cotiza más rápido, con más profesionalidad y cierra más ventas.</p>
    <a href="https://dealforge.es/registro?utm_source=guia-pdf&utm_medium=lead-magnet&utm_campaign=5-errores" class="cta-btn">Empieza Gratis — dealforge.es</a>
  </div>

  <div class="footer">
    <p>&copy; 2026 DealForge &middot; dealforge.es</p>
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
