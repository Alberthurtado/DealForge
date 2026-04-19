"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Trash2, Download, FileText, Sparkles, X, Lock } from "lucide-react";

interface Linea {
  id: string;
  concepto: string;
  cantidad: number;
  precio: number;
  descuento: number;
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function fmt(n: number) {
  return n.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
}

export function Generator() {
  // ─── Estado ───
  const [emisorNombre, setEmisorNombre] = useState("");
  const [emisorCif, setEmisorCif] = useState("");
  const [emisorDireccion, setEmisorDireccion] = useState("");
  const [emisorEmail, setEmisorEmail] = useState("");

  const [clienteNombre, setClienteNombre] = useState("");
  const [clienteCif, setClienteCif] = useState("");
  const [clienteDireccion, setClienteDireccion] = useState("");

  const today = new Date().toISOString().slice(0, 10);
  const [numero, setNumero] = useState(`COT-${new Date().getFullYear()}-001`);
  const [fecha, setFecha] = useState(today);
  const [validez, setValidez] = useState(30);

  const [lineas, setLineas] = useState<Linea[]>([
    { id: uid(), concepto: "", cantidad: 1, precio: 0, descuento: 0 },
  ]);

  const [iva, setIva] = useState(21);
  const [retencion, setRetencion] = useState(0);
  const [notas, setNotas] = useState("");
  const [condiciones, setCondiciones] = useState(
    "Esta oferta tiene una validez de 30 días. Forma de pago: transferencia bancaria a 30 días. Los precios no incluyen IVA."
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showUpsell, setShowUpsell] = useState(false);

  // ─── Cálculos ───
  const totales = useMemo(() => {
    const sublineas = lineas.map((l) => {
      const bruto = l.cantidad * l.precio;
      const dto = bruto * (l.descuento / 100);
      return bruto - dto;
    });
    const subtotal = sublineas.reduce((a, b) => a + b, 0);
    const ivaImporte = subtotal * (iva / 100);
    const retImporte = subtotal * (retencion / 100);
    const total = subtotal + ivaImporte - retImporte;
    return { sublineas, subtotal, ivaImporte, retImporte, total };
  }, [lineas, iva, retencion]);

  // ─── Handlers líneas ───
  function addLinea() {
    setLineas([...lineas, { id: uid(), concepto: "", cantidad: 1, precio: 0, descuento: 0 }]);
  }
  function removeLinea(id: string) {
    if (lineas.length === 1) return;
    setLineas(lineas.filter((l) => l.id !== id));
  }
  function updateLinea(id: string, field: keyof Linea, value: string | number) {
    setLineas(lineas.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  }

  // ─── Generar PDF ───
  async function handleGenerar() {
    setError("");
    if (!emisorNombre || !clienteNombre || lineas.every((l) => !l.concepto)) {
      setError("Completa al menos: tu nombre, nombre del cliente y un concepto.");
      return;
    }

    setLoading(true);
    try {
      // Rate-limit check
      const res = await fetch("/api/generador-gratis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emisorEmail: emisorEmail || null }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "No se pudo generar. Intenta más tarde.");
      }

      // Construir HTML
      const html = buildHTML();
      const w = window.open("", "_blank");
      if (!w) throw new Error("Desbloquea las pop-ups para descargar el PDF.");
      w.document.open();
      w.document.write(html);
      w.document.close();

      // Tras generar, mostramos upsell
      setTimeout(() => setShowUpsell(true), 400);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al generar");
    } finally {
      setLoading(false);
    }
  }

  function esc(s: string) {
    return (s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function buildHTML() {
    const lineasHTML = lineas
      .map((l, i) => {
        const sub = totales.sublineas[i];
        return `<tr>
          <td>${esc(l.concepto || "—")}</td>
          <td class="num">${l.cantidad}</td>
          <td class="num">${fmt(l.precio)}</td>
          <td class="num">${l.descuento}%</td>
          <td class="num bold">${fmt(sub)}</td>
        </tr>`;
      })
      .join("");

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Cotización ${esc(numero)} — ${esc(emisorNombre)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; color: #1a1a1a; font-size: 12px; line-height: 1.5; position: relative; }

    .download-bar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: rgba(255,255,255,0.95); backdrop-filter: blur(8px);
      border-bottom: 1px solid #e5e7eb; padding: 10px 24px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .download-bar span { font-size: 12px; font-weight: 600; color: #374151; }
    .download-btn {
      display: inline-flex; align-items: center; gap: 6px;
      background: #3a9bb5; color: white; font-weight: 600; font-size: 12px;
      padding: 8px 18px; border-radius: 8px; border: none; cursor: pointer;
    }
    .download-btn:hover { background: #2d7d94; }
    @media print { .download-bar, .spacer { display: none !important; } .wm { opacity: 0.08 !important; } }

    .spacer { height: 48px; }

    .sheet { max-width: 800px; margin: 0 auto; padding: 40px 48px; background: white; position: relative; }

    /* Watermark */
    .wm {
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%) rotate(-30deg);
      font-size: 110px; font-weight: 800; color: #3a9bb5;
      opacity: 0.06; pointer-events: none; z-index: 1;
      letter-spacing: -2px; white-space: nowrap;
    }

    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #3a9bb5; padding-bottom: 20px; margin-bottom: 30px; }
    .header-brand h1 { font-size: 28px; font-weight: 800; color: #111; }
    .header-brand p { color: #6b7280; font-size: 11px; }
    .header-meta { text-align: right; font-size: 11px; color: #374151; }
    .header-meta .tag { background: #3a9bb5; color: white; padding: 4px 12px; border-radius: 6px; font-weight: 700; font-size: 11px; display: inline-block; margin-bottom: 8px; }

    .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px; }
    .party h3 { font-size: 10px; text-transform: uppercase; letter-spacing: 1.2px; color: #6b7280; margin-bottom: 8px; }
    .party p { font-size: 12px; color: #111; font-weight: 600; }
    .party p.sub { font-weight: 400; color: #4b5563; font-size: 11px; margin-top: 2px; }

    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; position: relative; z-index: 2; }
    thead { background: #3a9bb5; color: white; }
    th { text-align: left; padding: 10px 12px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700; }
    th.num { text-align: right; }
    td { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; font-size: 11.5px; }
    td.num { text-align: right; font-variant-numeric: tabular-nums; }
    td.bold { font-weight: 700; }

    .totales { margin-left: auto; width: 280px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 16px; }
    .totales .row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 11.5px; color: #374151; }
    .totales .row.total { border-top: 2px solid #3a9bb5; padding-top: 10px; margin-top: 6px; font-size: 16px; font-weight: 800; color: #111; }

    .notas, .terminos { margin-top: 24px; font-size: 11px; color: #4b5563; padding-top: 16px; border-top: 1px dashed #e5e7eb; }
    .notas h4, .terminos h4 { font-size: 10px; text-transform: uppercase; letter-spacing: 1.2px; color: #6b7280; margin-bottom: 6px; }

    .footer {
      margin-top: 40px; padding-top: 16px; border-top: 1px solid #e5e7eb;
      display: flex; justify-content: space-between; align-items: center;
      font-size: 10px; color: #9ca3af;
    }
    .footer a { color: #3a9bb5; text-decoration: none; font-weight: 600; }
    .made-with { background: #f0f9ff; border: 1px solid #dbeafe; padding: 6px 12px; border-radius: 6px; font-size: 10px; color: #1e40af; }
  </style>
</head>
<body>

<div class="download-bar">
  <span>Cotización ${esc(numero)} · DealForge Generator</span>
  <button class="download-btn" onclick="window.print()">📄 Descargar PDF</button>
</div>
<div class="spacer"></div>

<div class="wm">DealForge</div>

<div class="sheet">
  <div class="header">
    <div class="header-brand">
      <h1>${esc(emisorNombre)}</h1>
      ${emisorCif ? `<p>${esc(emisorCif)}</p>` : ""}
      ${emisorDireccion ? `<p>${esc(emisorDireccion)}</p>` : ""}
      ${emisorEmail ? `<p>${esc(emisorEmail)}</p>` : ""}
    </div>
    <div class="header-meta">
      <div class="tag">COTIZACIÓN</div>
      <p><strong>Nº:</strong> ${esc(numero)}</p>
      <p><strong>Fecha:</strong> ${esc(fecha)}</p>
      <p><strong>Válida:</strong> ${validez} días</p>
    </div>
  </div>

  <div class="parties">
    <div class="party">
      <h3>De</h3>
      <p>${esc(emisorNombre)}</p>
      ${emisorCif ? `<p class="sub">${esc(emisorCif)}</p>` : ""}
      ${emisorDireccion ? `<p class="sub">${esc(emisorDireccion)}</p>` : ""}
    </div>
    <div class="party">
      <h3>Para</h3>
      <p>${esc(clienteNombre)}</p>
      ${clienteCif ? `<p class="sub">${esc(clienteCif)}</p>` : ""}
      ${clienteDireccion ? `<p class="sub">${esc(clienteDireccion)}</p>` : ""}
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Concepto</th>
        <th class="num">Cantidad</th>
        <th class="num">Precio</th>
        <th class="num">Dto.</th>
        <th class="num">Total</th>
      </tr>
    </thead>
    <tbody>
      ${lineasHTML}
    </tbody>
  </table>

  <div class="totales">
    <div class="row"><span>Subtotal</span><span>${fmt(totales.subtotal)}</span></div>
    ${iva > 0 ? `<div class="row"><span>IVA (${iva}%)</span><span>${fmt(totales.ivaImporte)}</span></div>` : ""}
    ${retencion > 0 ? `<div class="row"><span>Retención (${retencion}%)</span><span>-${fmt(totales.retImporte)}</span></div>` : ""}
    <div class="row total"><span>TOTAL</span><span>${fmt(totales.total)}</span></div>
  </div>

  ${notas ? `<div class="notas"><h4>Notas</h4><p>${esc(notas)}</p></div>` : ""}
  ${condiciones ? `<div class="terminos"><h4>Términos y condiciones</h4><p>${esc(condiciones)}</p></div>` : ""}

  <div class="footer">
    <span>Generado el ${new Date().toLocaleDateString("es-ES")}</span>
    <span class="made-with">Hecho con DealForge · dealforge.es</span>
  </div>
</div>

</body>
</html>`;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      {/* Aviso */}
      <div className="bg-amber-50 border-b border-amber-100 rounded-t-2xl px-6 py-3 flex items-start gap-3">
        <Lock className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong>Versión gratuita sin registro.</strong> Esta cotización no se guarda.
          Si haces cotizaciones a menudo,{" "}
          <Link href="/registro" className="underline font-semibold">
            registra tu cuenta gratis
          </Link>{" "}
          para guardarlas, hacer seguimiento y firmar electrónicamente.
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Emisor + Cliente */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Tus datos (emisor)</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nombre / Razón social *"
                value={emisorNombre}
                onChange={(e) => setEmisorNombre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="CIF / NIF"
                value={emisorCif}
                onChange={(e) => setEmisorCif(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="Dirección"
                value={emisorDireccion}
                onChange={(e) => setEmisorDireccion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <input
                type="email"
                placeholder="Email (opcional — para recibir consejos)"
                value={emisorEmail}
                onChange={(e) => setEmisorEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Cliente</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nombre / Razón social *"
                value={clienteNombre}
                onChange={(e) => setClienteNombre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="CIF / NIF"
                value={clienteCif}
                onChange={(e) => setClienteCif(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <input
                type="text"
                placeholder="Dirección"
                value={clienteDireccion}
                onChange={(e) => setClienteDireccion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {/* Meta */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600">Nº de cotización</label>
            <input
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Validez (días)</label>
            <input
              type="number"
              value={validez}
              onChange={(e) => setValidez(Number(e.target.value))}
              className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* Líneas */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Conceptos</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100">
                  <th className="text-left py-2 pr-2">Concepto</th>
                  <th className="text-right py-2 px-2 w-20">Cant.</th>
                  <th className="text-right py-2 px-2 w-28">Precio €</th>
                  <th className="text-right py-2 px-2 w-20">Dto. %</th>
                  <th className="text-right py-2 px-2 w-28">Total</th>
                  <th className="w-8"></th>
                </tr>
              </thead>
              <tbody>
                {lineas.map((l, i) => (
                  <tr key={l.id} className="border-b border-gray-50">
                    <td className="py-2 pr-2">
                      <input
                        type="text"
                        placeholder="Descripción"
                        value={l.concepto}
                        onChange={(e) => updateLinea(l.id, "concepto", e.target.value)}
                        className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="number"
                        min={0}
                        value={l.cantidad}
                        onChange={(e) => updateLinea(l.id, "cantidad", Number(e.target.value))}
                        className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm text-right"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        value={l.precio}
                        onChange={(e) => updateLinea(l.id, "precio", Number(e.target.value))}
                        className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm text-right"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={l.descuento}
                        onChange={(e) => updateLinea(l.id, "descuento", Number(e.target.value))}
                        className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm text-right"
                      />
                    </td>
                    <td className="py-2 px-2 text-right font-semibold text-gray-900 tabular-nums">
                      {fmt(totales.sublineas[i] || 0)}
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => removeLinea(l.id)}
                        disabled={lineas.length === 1}
                        className="text-gray-400 hover:text-red-500 disabled:opacity-30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={addLinea}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#3a9bb5] hover:text-[#2d7d94]"
          >
            <Plus className="w-4 h-4" /> Añadir línea
          </button>
        </div>

        {/* Impuestos */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-600">IVA %</label>
            <input
              type="number"
              min={0}
              max={100}
              value={iva}
              onChange={(e) => setIva(Number(e.target.value))}
              className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Retención % (opcional)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={retencion}
              onChange={(e) => setRetencion(Number(e.target.value))}
              className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* Totales preview */}
        <div className="bg-gray-50 rounded-xl p-5">
          <div className="max-w-xs ml-auto space-y-1.5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="tabular-nums">{fmt(totales.subtotal)}</span>
            </div>
            {iva > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>IVA ({iva}%)</span>
                <span className="tabular-nums">{fmt(totales.ivaImporte)}</span>
              </div>
            )}
            {retencion > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Retención ({retencion}%)</span>
                <span className="tabular-nums">-{fmt(totales.retImporte)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t-2 border-[#3a9bb5] font-bold text-lg text-gray-900">
              <span>TOTAL</span>
              <span className="tabular-nums">{fmt(totales.total)}</span>
            </div>
          </div>
        </div>

        {/* Notas + T&C */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-medium text-gray-600">Notas (opcional)</label>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows={3}
              className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              placeholder="Mensaje personalizado para el cliente..."
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Términos y condiciones</label>
            <textarea
              value={condiciones}
              onChange={(e) => setCondiciones(e.target.value)}
              rows={3}
              className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Action */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            🔒 Incluye marca de agua «DealForge». Para versión sin marca de agua,{" "}
            <Link href="/registro" className="underline font-medium">
              regístrate gratis
            </Link>
            .
          </p>
          <button
            onClick={handleGenerar}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-[#3a9bb5] hover:bg-[#2d7d94] text-white font-semibold text-sm px-6 py-3 rounded-xl disabled:opacity-50 shadow-lg shadow-[#3a9bb5]/25"
          >
            <Download className="w-4 h-4" />
            {loading ? "Generando..." : "Generar cotización PDF"}
          </button>
        </div>
      </div>

      {/* Upsell modal */}
      {showUpsell && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowUpsell(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-md w-full relative"
          >
            <button
              onClick={() => setShowUpsell(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 rounded-2xl bg-[#3a9bb5]/10 flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-[#3a9bb5]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">¡Tu cotización está lista!</h3>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              ¿Haces más de una cotización al mes? Con DealForge puedes guardar clientes y productos,
              hacer seguimiento, firmar electrónicamente y generar cotizaciones <strong>sin marca de agua</strong> en segundos.
            </p>
            <div className="space-y-2 mb-6">
              {[
                "Guarda clientes, productos y plantillas",
                "Sin marca de agua en tus PDFs",
                "Seguimiento y firma electrónica",
                "Plan gratuito para siempre — sin tarjeta",
              ].map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-gray-700">
                  <FileText className="w-4 h-4 text-[#3a9bb5]" />
                  {b}
                </div>
              ))}
            </div>
            <Link
              href="/registro"
              className="block w-full text-center bg-[#3a9bb5] hover:bg-[#2d7d94] text-white font-semibold text-sm px-6 py-3 rounded-xl"
            >
              Empezar gratis en DealForge →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
