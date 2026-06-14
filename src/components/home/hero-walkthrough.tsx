"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Play, Pause, ChevronLeft, ChevronRight, Search, Check, Plus,
  FileText, Download, Sparkles, Building2,
} from "lucide-react";

type Lang = "es" | "en";

const STEP_MS = 5200;
const STEP_COUNT = 6;

// ─── Localized copy + mock data ────────────────────────────────────────────
const T = {
  es: {
    chrome: [
      "app.dealforge.es/cotizaciones/nueva",
      "app.dealforge.es/cotizaciones/nueva",
      "app.dealforge.es/cotizaciones/nueva",
      "app.dealforge.es/cotizaciones/preview",
      "app.dealforge.es/cotizaciones/preview",
      "app.dealforge.es/cotizaciones",
    ],
    steps: [
      { title: "Selecciona un cliente", caption: "Empieza con un cliente existente o crea uno nuevo." },
      { title: "Añade productos y servicios", caption: "Construye tu presupuesto en segundos." },
      { title: "Configura precios y descuentos", caption: "Control total sobre precios y márgenes." },
      { title: "Revisa la propuesta", caption: "Comprueba todos los detalles antes de enviarla." },
      { title: "Genera el PDF", caption: "Documentos profesionales listos para compartir." },
      { title: "Envía y realiza seguimiento", caption: "Haz seguimiento de cada oportunidad hasta el cierre." },
    ],
    searchPlaceholder: "Buscar cliente…",
    clients: [
      { name: "Estudio Marenco S.L.", meta: "Barcelona · 8 cotizaciones" },
      { name: "Construcciones Vega", meta: "Madrid · 3 cotizaciones" },
      { name: "Marketing Pulse", meta: "Valencia · cliente nuevo" },
    ],
    th: { desc: "Descripción", qty: "Cant.", price: "Precio", total: "Total" },
    items: [
      { desc: "Consultoría estratégica", qty: "10", price: "90 €", total: "900 €" },
      { desc: "Diseño de marca", qty: "1", price: "1.200 €", total: "1.200 €" },
      { desc: "Plan de contenidos (mensual)", qty: "3", price: "400 €", total: "1.200 €" },
    ],
    addItem: "Añadir línea",
    totals: { subtotal: "Subtotal", discount: "Descuento", tax: "IVA (21%)", total: "Total" },
    money: { subtotal: "3.300 €", discountAmt: "− 330 €", tax: "624,90 €", total: "3.594,90 €" },
    discountChip: "−10 % aplicado",
    review: { heading: "Propuesta lista", number: "COT-2026-0042", checks: ["Datos del cliente", "Precios y descuentos", "Condiciones y vigencia"] },
    generate: "Generar PDF",
    pdfReady: "PDF generado",
    download: "Descargar",
    statuses: ["Borrador", "Enviada", "Negociación", "Ganada"],
    sentToast: "Enviada al cliente",
    controls: { play: "Reproducir", pause: "Pausar", prev: "Anterior", next: "Siguiente", step: "Paso" },
    liveBadge: "Demo en vivo",
  },
  en: {
    chrome: [
      "app.dealforge.es/quotes/new",
      "app.dealforge.es/quotes/new",
      "app.dealforge.es/quotes/new",
      "app.dealforge.es/quotes/preview",
      "app.dealforge.es/quotes/preview",
      "app.dealforge.es/quotes",
    ],
    steps: [
      { title: "Select a customer", caption: "Start with an existing customer or create a new one." },
      { title: "Add products and services", caption: "Build your quote in seconds." },
      { title: "Configure pricing and discounts", caption: "Full control over pricing and margins." },
      { title: "Review the proposal", caption: "Review every detail before sending." },
      { title: "Generate PDF", caption: "Professional documents ready to share." },
      { title: "Send and track", caption: "Track every opportunity until it's won." },
    ],
    searchPlaceholder: "Search customer…",
    clients: [
      { name: "Marenco Studio Ltd", meta: "London · 8 quotes" },
      { name: "Vega Construction", meta: "Manchester · 3 quotes" },
      { name: "Pulse Marketing", meta: "Bristol · new customer" },
    ],
    th: { desc: "Description", qty: "Qty", price: "Price", total: "Total" },
    items: [
      { desc: "Strategy consulting", qty: "10", price: "£80", total: "£800" },
      { desc: "Brand design", qty: "1", price: "£1,050", total: "£1,050" },
      { desc: "Content plan (monthly)", qty: "3", price: "£350", total: "£1,050" },
    ],
    addItem: "Add line",
    totals: { subtotal: "Subtotal", discount: "Discount", tax: "VAT (20%)", total: "Total" },
    money: { subtotal: "£2,900", discountAmt: "− £290", tax: "£522", total: "£3,132" },
    discountChip: "−10% applied",
    review: { heading: "Proposal ready", number: "QUO-2026-0042", checks: ["Customer details", "Pricing and discounts", "Terms and validity"] },
    generate: "Generate PDF",
    pdfReady: "PDF generated",
    download: "Download",
    statuses: ["Draft", "Sent", "Negotiation", "Won"],
    sentToast: "Sent to customer",
    controls: { play: "Play", pause: "Pause", prev: "Previous", next: "Next", step: "Step" },
    liveBadge: "Live demo",
  },
};

const STATUS_COLORS = ["#94a3b8", "#3b82f6", "#f59e0b", "#22c55e"];

export function HeroWalkthrough({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((n: number) => setStep(((n % STEP_COUNT) + STEP_COUNT) % STEP_COUNT), []);

  // Autoplay
  useEffect(() => {
    if (!playing) return;
    timer.current = setTimeout(() => setStep((s) => (s + 1) % STEP_COUNT), STEP_MS);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [step, playing]);

  // Pause when tab hidden
  useEffect(() => {
    const onVis = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const manual = (n: number) => { setPlaying(false); go(n); };

  return (
    <div className="hw-root w-full">
      <style>{HW_CSS}</style>

      {/* Frame */}
      <div className="hw-frame relative rounded-2xl bg-white border border-gray-200/80 shadow-2xl shadow-[#3a9bb5]/10 overflow-hidden">
        {/* glow */}
        <div className="hw-glow" aria-hidden />

        {/* Browser chrome */}
        <div className="relative flex items-center gap-2 px-4 py-3 bg-gray-50/90 border-b border-gray-200">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-3">
            <div className="bg-white rounded-md px-3 py-1 text-[11px] text-gray-500 border border-gray-200 max-w-xs mx-auto truncate text-center">
              {t.chrome[step]}
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-[#3a9bb5] bg-[#3a9bb5]/10 px-2 py-0.5 rounded-full">
            <span className="hw-pulse-dot" /> {t.liveBadge}
          </span>
        </div>

        {/* Screen */}
        <div className="relative h-[330px] sm:h-[360px] bg-[#f7fafc] overflow-hidden">
          <div key={step} className="hw-screen absolute inset-0 p-5">
            <Screen step={step} t={t} />
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            key={`p-${step}-${playing}`}
            className="h-full bg-gradient-to-r from-[#3a9bb5] to-[#2d7d94]"
            style={{ animation: playing ? `hw-progress ${STEP_MS}ms linear forwards` : "none", width: playing ? undefined : "100%" }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-t border-gray-100">
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? t.controls.pause : t.controls.play}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-[#3a9bb5] text-white flex items-center justify-center hover:bg-[#2d7d94] transition-colors shadow-sm"
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-gray-900 truncate">
              <span className="text-[#3a9bb5]">{step + 1}.</span> {t.steps[step].title}
            </p>
            <p className="text-[11px] text-gray-500 truncate">{t.steps[step].caption}</p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            {Array.from({ length: STEP_COUNT }).map((_, i) => (
              <button
                key={i}
                onClick={() => manual(i)}
                aria-label={`${t.controls.step} ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === step ? "w-5 bg-[#3a9bb5]" : "w-1.5 bg-gray-300 hover:bg-gray-400"}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => manual(step - 1)} aria-label={t.controls.prev} className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 flex items-center justify-center transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => manual(step + 1)} aria-label={t.controls.next} className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 flex items-center justify-center transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screens ────────────────────────────────────────────────────────────────
function Screen({ step, t }: { step: number; t: (typeof T)["es"] }) {
  if (step === 0) return <ScreenClient t={t} />;
  if (step === 1) return <ScreenItems t={t} />;
  if (step === 2) return <ScreenPricing t={t} />;
  if (step === 3) return <ScreenReview t={t} />;
  if (step === 4) return <ScreenPdf t={t} />;
  return <ScreenTrack t={t} />;
}

function ScreenClient({ t }: { t: (typeof T)["es"] }) {
  return (
    <div>
      <div className="hw-up flex items-center gap-2 rounded-xl border border-[#3a9bb5]/40 bg-white px-3 py-2.5 shadow-sm ring-4 ring-[#3a9bb5]/10" style={{ animationDelay: "40ms" }}>
        <Search className="w-4 h-4 text-[#3a9bb5]" />
        <span className="text-sm text-gray-700">{t.clients[0].name.slice(0, 7)}</span>
        <span className="hw-caret" />
        <span className="ml-auto text-[11px] text-gray-400">{t.searchPlaceholder}</span>
      </div>
      <div className="mt-2 rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden">
        {t.clients.map((c, i) => (
          <div
            key={c.name}
            className={`hw-up flex items-center gap-3 px-3 py-2.5 ${i === 0 ? "bg-[#3a9bb5]/5" : ""} ${i < t.clients.length - 1 ? "border-b border-gray-50" : ""}`}
            style={{ animationDelay: `${160 + i * 90}ms` }}
          >
            <div className="w-8 h-8 rounded-lg bg-[#3a9bb5]/10 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-4 h-4 text-[#3a9bb5]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{c.name}</p>
              <p className="text-[11px] text-gray-400 truncate">{c.meta}</p>
            </div>
            {i === 0 && (
              <span className="hw-pop ml-auto w-6 h-6 rounded-full bg-[#3a9bb5] text-white flex items-center justify-center flex-shrink-0" style={{ animationDelay: "520ms" }}>
                <Check className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenItems({ t }: { t: (typeof T)["es"] }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 px-3 py-2 bg-gray-50 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
        <span>{t.th.desc}</span><span className="text-right w-8">{t.th.qty}</span><span className="text-right w-16">{t.th.price}</span><span className="text-right w-16">{t.th.total}</span>
      </div>
      {t.items.map((it, i) => (
        <div key={it.desc} className="hw-slide grid grid-cols-[1fr_auto_auto_auto] gap-3 px-3 py-2.5 border-b border-gray-50 items-center" style={{ animationDelay: `${120 + i * 220}ms` }}>
          <span className="text-sm text-gray-800 truncate">{it.desc}</span>
          <span className="text-sm text-gray-500 text-right w-8">{it.qty}</span>
          <span className="text-sm text-gray-500 text-right w-16">{it.price}</span>
          <span className="text-sm font-semibold text-gray-900 text-right w-16">{it.total}</span>
        </div>
      ))}
      <div className="hw-up flex items-center gap-1.5 px-3 py-2.5 text-[#3a9bb5] text-sm font-medium" style={{ animationDelay: "820ms" }}>
        <Plus className="w-4 h-4" /> {t.addItem}
      </div>
    </div>
  );
}

function ScreenPricing({ t }: { t: (typeof T)["es"] }) {
  return (
    <div className="flex flex-col h-full">
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm px-3 py-2.5 space-y-1.5">
        {t.items.map((it) => (
          <div key={it.desc} className="flex items-center justify-between text-[13px]">
            <span className="text-gray-500 truncate pr-2">{it.desc}</span>
            <span className="text-gray-700 flex-shrink-0">{it.total}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-[#3a9bb5]/30 bg-white shadow-sm px-4 py-3 space-y-2">
        <Row label={t.totals.subtotal} value={t.money.subtotal} />
        <div className="flex items-center justify-between text-sm text-red-500">
          <span className="flex items-center gap-2">
            {t.totals.discount}
            <span className="hw-pop text-[10px] font-bold bg-red-50 text-red-500 px-1.5 py-0.5 rounded-full" style={{ animationDelay: "300ms" }}>{t.discountChip}</span>
          </span>
          <span className="hw-fade" style={{ animationDelay: "300ms" }}>{t.money.discountAmt}</span>
        </div>
        <Row label={t.totals.tax} value={t.money.tax} muted />
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">{t.totals.total}</span>
          <span className="hw-pop text-xl font-bold text-[#3a9bb5]" style={{ animationDelay: "520ms" }}>{t.money.total}</span>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className={muted ? "text-gray-500" : "text-gray-800"}>{value}</span>
    </div>
  );
}

function ScreenReview({ t }: { t: (typeof T)["es"] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1.1fr_1fr] gap-4 h-full">
      <div className="hw-up rounded-xl border border-gray-100 bg-white shadow-md p-4" style={{ animationDelay: "60ms" }}>
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#3a9bb5] flex items-center justify-center"><FileText className="w-3.5 h-3.5 text-white" /></div>
            <div className="h-2 w-16 rounded bg-gray-200" />
          </div>
          <span className="text-[11px] font-semibold text-gray-400">{t.review.number}</span>
        </div>
        <div className="space-y-1.5">
          <div className="h-2 w-24 rounded bg-gray-100" />
          <div className="h-2 w-32 rounded bg-gray-100" />
        </div>
        <div className="mt-3 space-y-1.5">
          {t.items.map((it) => (
            <div key={it.desc} className="flex justify-between"><span className="h-2 w-28 rounded bg-gray-100" /><span className="text-[11px] text-gray-400">{it.total}</span></div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs font-semibold text-gray-700">{t.totals.total}</span>
          <span className="text-sm font-bold text-[#3a9bb5]">{t.money.total}</span>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-2.5">
        <p className="text-sm font-semibold text-gray-900">{t.review.heading}</p>
        {t.review.checks.map((c, i) => (
          <div key={c} className="hw-up flex items-center gap-2.5" style={{ animationDelay: `${260 + i * 260}ms` }}>
            <span className="hw-pop w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0" style={{ animationDelay: `${320 + i * 260}ms` }}>
              <Check className="w-3.5 h-3.5" />
            </span>
            <span className="text-[13px] text-gray-600">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenPdf({ t }: { t: (typeof T)["es"] }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <button className="hw-press inline-flex items-center gap-2 bg-[#3a9bb5] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-[#3a9bb5]/30">
        <FileText className="w-4 h-4" /> {t.generate}
      </button>
      <div className="hw-rise relative w-40 rounded-lg border border-gray-200 bg-white shadow-xl p-3" style={{ animationDelay: "700ms" }}>
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-5 h-5 rounded bg-red-500/90 text-white text-[8px] font-bold flex items-center justify-center">PDF</span>
          <div className="h-1.5 w-12 rounded bg-gray-200" />
        </div>
        <div className="space-y-1">
          {[16, 24, 20, 14, 22].map((w, i) => (<div key={i} className="h-1 rounded bg-gray-100" style={{ width: `${w * 4}px` }} />))}
        </div>
        <div className="mt-2 pt-2 border-t border-gray-100 flex justify-end">
          <span className="text-[10px] font-bold text-[#3a9bb5]">{t.money.total}</span>
        </div>
        <span className="hw-pop absolute -bottom-2 -right-2 inline-flex items-center gap-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow" style={{ animationDelay: "1100ms" }}>
          <Download className="w-3 h-3" /> {t.download}
        </span>
      </div>
      <span className="hw-fade text-[11px] text-gray-400" style={{ animationDelay: "1000ms" }}>{t.pdfReady}</span>
    </div>
  );
}

function ScreenTrack({ t }: { t: (typeof T)["es"] }) {
  return (
    <div className="flex flex-col justify-center h-full gap-5">
      <div className="hw-pop self-start inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ animationDelay: "120ms" }}>
        <Sparkles className="w-3.5 h-3.5" /> {t.sentToast}
      </div>
      <div className="relative flex items-center justify-between px-1">
        <div className="absolute left-4 right-4 top-3 h-0.5 bg-gray-200">
          <div className="hw-line h-full bg-[#3a9bb5]" />
        </div>
        {t.statuses.map((s, i) => (
          <div key={s} className="relative flex flex-col items-center gap-2 z-10" style={{ flex: "0 0 auto" }}>
            <span
              className="hw-pop w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow"
              style={{ backgroundColor: STATUS_COLORS[i], animationDelay: `${300 + i * 360}ms` }}
            >
              {i === t.statuses.length - 1 ? <Check className="w-3.5 h-3.5 text-white" /> : <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            </span>
            <span className="text-[11px] font-medium text-gray-600 whitespace-nowrap">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Scoped CSS ──────────────────────────────────────────────────────────────
const HW_CSS = `
.hw-glow{position:absolute;inset:-40%;background:radial-gradient(circle at 70% 0%, rgba(58,155,181,.18), transparent 55%);pointer-events:none}
@keyframes hw-progress{from{width:0%}to{width:100%}}
@keyframes hw-screen-in{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:translateX(0)}}
.hw-screen{animation:hw-screen-in .45s cubic-bezier(.22,.61,.36,1) both}
@keyframes hw-up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.hw-up{animation:hw-up .5s cubic-bezier(.22,.61,.36,1) both}
@keyframes hw-slide{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
.hw-slide{animation:hw-slide .5s cubic-bezier(.22,.61,.36,1) both}
@keyframes hw-pop{0%{opacity:0;transform:scale(.5)}60%{transform:scale(1.12)}100%{opacity:1;transform:scale(1)}}
.hw-pop{animation:hw-pop .45s cubic-bezier(.34,1.56,.64,1) both}
@keyframes hw-fade{from{opacity:0}to{opacity:1}}
.hw-fade{animation:hw-fade .6s ease both}
@keyframes hw-rise{from{opacity:0;transform:translateY(26px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
.hw-rise{animation:hw-rise .6s cubic-bezier(.22,.61,.36,1) both}
@keyframes hw-press{0%,100%{transform:scale(1)}45%{transform:scale(.94)}}
.hw-press{animation:hw-press .9s ease both}
@keyframes hw-line{from{width:0%}to{width:100%}}
.hw-line{animation:hw-line 1.9s cubic-bezier(.4,0,.2,1) .3s both}
@keyframes hw-caret{0%,100%{opacity:0}50%{opacity:1}}
.hw-caret{display:inline-block;width:1.5px;height:14px;background:#3a9bb5;animation:hw-caret 1s steps(1) infinite}
.hw-pulse-dot{display:inline-block;width:6px;height:6px;border-radius:9999px;background:#3a9bb5;animation:hw-fade 1.2s ease-in-out infinite alternate}
@media (prefers-reduced-motion: reduce){
  .hw-screen,.hw-up,.hw-slide,.hw-pop,.hw-fade,.hw-rise,.hw-press,.hw-line{animation-duration:.001ms!important;animation-delay:0ms!important}
  .hw-caret,.hw-pulse-dot{animation:none}
}
`;
