import { NextResponse } from "next/server";
import { getRecurso, type Recurso } from "@/data/recursos";

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHTML(recurso: Recurso): string {
  const fullTitle = recurso.tituloResaltado
    ? `${recurso.titulo} <span>${escape(recurso.tituloResaltado)}</span>`
    : escape(recurso.titulo);
  const plainTitle = `${recurso.titulo}${recurso.tituloResaltado ? " " + recurso.tituloResaltado : ""}`;

  const seccionesHTML = recurso.secciones
    .map(
      (s) => `
  <div class="seccion">
    <div class="num">${escape(s.num)}</div>
    <div class="seccion-content">
      <h3>${escape(s.titulo)}</h3>
      <p>${escape(s.desc)}</p>
      ${s.solucion ? `<p class="solucion"><strong>→ Solución:</strong> ${escape(s.solucion)}</p>` : ""}
    </div>
  </div>`
    )
    .join("");

  const tipsHTML = (recurso.tips ?? [])
    .map(
      (t) => `
  <div class="tip">
    <strong>💡</strong> ${escape(t.texto)}
    ${t.fuente ? `<em class="fuente"> — ${escape(t.fuente)}</em>` : ""}
  </div>`
    )
    .join("");

  const checklistHTML = (recurso.checklist ?? [])
    .map((item) => `<label>☐ ${escape(item)}</label>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${escape(plainTitle)} — DealForge</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, sans-serif; color: #1a1a1a; line-height: 1.5; font-size: 11.5px; }

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

    .cover {
      padding: 56px 40px 40px;
      text-align: center;
      background: linear-gradient(135deg, #f0f9ff 0%, #fff 50%, #fff7ed 100%);
      border-bottom: 3px solid #3a9bb5;
    }
    .cover-badge {
      display: inline-block; background: #3a9bb5; color: white;
      font-size: 9px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; padding: 4px 14px; border-radius: 20px;
      margin-bottom: 14px;
    }
    .cover-emoji { font-size: 40px; margin-bottom: 10px; }
    .cover h1 { font-size: 28px; font-weight: 800; line-height: 1.15; margin: 0 auto 12px; max-width: 520px; }
    .cover h1 span { color: #3a9bb5; }
    .cover p { font-size: 13px; color: #6b7280; max-width: 440px; margin: 0 auto 18px; }
    .cover-brand { font-weight: 700; font-size: 13px; color: #3a9bb5; }
    .cover-url { font-size: 10px; color: #9ca3af; margin-top: 2px; }

    .page { max-width: 720px; margin: 0 auto; padding: 28px 40px; }

    h2 { font-size: 16px; font-weight: 800; margin: 20px 0 8px; color: #111; }
    h3 { font-size: 12px; font-weight: 700; margin-bottom: 3px; color: #111; }
    p { margin-bottom: 5px; color: #374151; }

    .intro { font-size: 12px; color: #4b5563; border-left: 3px solid #3a9bb5; padding: 8px 14px; margin: 6px 0 18px; line-height: 1.55; background: #f9fafb; }

    .seccion {
      display: flex; gap: 14px; padding: 14px 0;
      border-bottom: 1px solid #f3f4f6;
      page-break-inside: avoid;
    }
    .seccion:last-child { border-bottom: none; }
    .num {
      flex-shrink: 0; width: 36px; height: 36px;
      background: #3a9bb5; color: white; font-weight: 800; font-size: 12px;
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
    }
    .seccion-content { flex: 1; }
    .seccion p { font-size: 11px; color: #4b5563; line-height: 1.5; margin-bottom: 3px; }
    .solucion { background: #f0fdf4; border-radius: 6px; padding: 6px 10px; margin-top: 5px !important; font-size: 10.5px !important; color: #166534 !important; }
    .solucion strong { color: #15803d; }

    .tip {
      background: #eff6ff; border: 1px solid #dbeafe;
      border-radius: 8px; padding: 10px 14px;
      margin: 6px 0; font-size: 11px; color: #1e3a5f;
      page-break-inside: avoid;
    }
    .tip .fuente { color: #6b7280; font-style: italic; font-size: 10px; }

    .tips-grid { display: grid; grid-template-columns: 1fr; gap: 8px; margin: 8px 0 16px; }

    .checklist { background: #f9fafb; border-radius: 10px; padding: 16px 20px; margin: 6px 0 16px; }
    .checklist-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; }
    .checklist label { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #374151; line-height: 1.4; }

    .cta {
      background: linear-gradient(135deg, #3a9bb5, #2d7d94);
      border-radius: 12px; padding: 24px;
      text-align: center; color: white;
      margin-top: 20px; page-break-inside: avoid;
    }
    .cta h2 { color: white; font-size: 16px; margin-bottom: 6px; }
    .cta p { color: rgba(255,255,255,0.9); max-width: 420px; margin: 0 auto 14px; font-size: 11px; }
    .cta-btn { display: inline-block; background: white; color: #3a9bb5; font-weight: 700; font-size: 12px; padding: 10px 22px; border-radius: 8px; text-decoration: none; }

    .footer { text-align: center; padding: 16px; color: #9ca3af; font-size: 9px; }

    @media print {
      body { font-size: 11px; }
      .cover { padding: 40px 36px 28px; }
      .page { padding: 20px 32px; }
    }
  </style>
</head>
<body>

<div class="download-bar">
  <span>DealForge — ${escape(recurso.badge)}</span>
  <button class="download-btn" onclick="window.print()">
    <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
    Descargar PDF
  </button>
</div>
<div class="spacer" style="height: 42px;"></div>

<div class="cover">
  <div class="cover-emoji">${recurso.emoji}</div>
  <div class="cover-badge">${escape(recurso.badge)} · 2026</div>
  <h1>${fullTitle}</h1>
  <p>${escape(recurso.descripcion)}</p>
  <div class="cover-brand">DealForge</div>
  <p class="cover-url">dealforge.es</p>
</div>

<div class="page">
  <h2>Introducción</h2>
  <p class="intro">${escape(recurso.introduccion)}</p>

  <h2>Contenido principal</h2>
  ${seccionesHTML}

  ${tipsHTML ? `<h2>Datos clave</h2><div class="tips-grid">${tipsHTML}</div>` : ""}

  ${
    checklistHTML
      ? `
  <h2>Checklist rápido</h2>
  <p style="font-size: 11px; color: #6b7280; margin-bottom: 6px;">Marca lo que ya cumples hoy:</p>
  <div class="checklist">
    <div class="checklist-grid">${checklistHTML}</div>
  </div>
  `
      : ""
  }

  <div class="cta">
    <h2>${escape(recurso.ctaTitulo)}</h2>
    <p>${escape(recurso.ctaDescripcion)}</p>
    <a href="https://dealforge.es/registro?utm_source=recurso-pdf&utm_medium=lead-magnet&utm_campaign=${encodeURIComponent(
      recurso.slug
    )}" class="cta-btn">Empieza Gratis — dealforge.es</a>
  </div>

  <div class="footer">
    <p>&copy; 2026 DealForge · dealforge.es · ${escape(recurso.badge)}</p>
  </div>
</div>

</body>
</html>`;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const recurso = getRecurso(slug);
  if (!recurso) {
    return new NextResponse("Recurso no encontrado", { status: 404 });
  }

  const html = renderHTML(recurso);

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="${recurso.filename}"`,
    },
  });
}
