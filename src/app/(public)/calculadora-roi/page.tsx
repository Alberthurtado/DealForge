"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Plan thresholds                                                    */
/* ------------------------------------------------------------------ */
function recommendedPlan(quotesPerMonth: number) {
  if (quotesPerMonth <= 30)
    return { name: "Starter", price: 29, href: "/registro?plan=starter" };
  if (quotesPerMonth <= 150)
    return { name: "Professional", price: 79, href: "/registro?plan=professional" };
  return { name: "Enterprise", price: 199, href: "/registro?plan=enterprise" };
}

/* ------------------------------------------------------------------ */
/*  Slider component                                                   */
/* ------------------------------------------------------------------ */
function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-[#3a9bb5] tabular-nums">
          {value.toLocaleString("es-ES")}
          {unit ? ` ${unit}` : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #3a9bb5 ${pct}%, #e5e7eb ${pct}%)`,
        }}
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>{min.toLocaleString("es-ES")}</span>
        <span>{max.toLocaleString("es-ES")}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Result card                                                        */
/* ------------------------------------------------------------------ */
function ResultCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-3xl sm:text-4xl font-extrabold text-[#3a9bb5]">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function CalculadoraRoiPage() {
  const [quotes, setQuotes] = useState(50);
  const [timePerQuote, setTimePerQuote] = useState(45);
  const [avgValue, setAvgValue] = useState(2500);
  const [salesPeople, setSalesPeople] = useState(3);
  const [winRate, setWinRate] = useState(20);

  /* ---------- calculations ---------- */
  const timeSavingsPct = 0.7;
  const winRateUplift = 5; // percentage points
  const hourlyCost = 25;

  const hoursSavedMonth =
    (quotes * timePerQuote * timeSavingsPct) / 60;

  const revenueIncreaseMonth =
    quotes * avgValue * (winRateUplift / 100);

  const plan = recommendedPlan(quotes);

  const annualSavings = hoursSavedMonth * 12 * hourlyCost;
  const annualRevenueIncrease = revenueIncreaseMonth * 12;
  const annualPlanCost = plan.price * 12;

  const roi =
    annualPlanCost > 0
      ? ((annualSavings + annualRevenueIncrease - annualPlanCost) / annualPlanCost) * 100
      : 0;

  /* ---------- formatters ---------- */
  const fmtNum = (n: number) =>
    n.toLocaleString("es-ES", { maximumFractionDigits: 0 });
  const fmtEur = (n: number) =>
    n.toLocaleString("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ---- Header ---- */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt="DealForge"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="font-bold text-gray-900 text-lg">DealForge</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/funcionalidades" className="hover:text-gray-900 transition-colors">
              Funcionalidades
            </Link>
            <Link href="/#precios" className="hover:text-gray-900 transition-colors">
              Precios
            </Link>
            <Link href="/blog" className="hover:text-gray-900 transition-colors">
              Blog
            </Link>
          </nav>
          <Link
            href="/registro"
            className="text-sm font-semibold text-[#3a9bb5] hover:text-[#2d7d94] transition-colors"
          >
            Prueba gratis &rarr;
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* ---- Hero ---- */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#3a9bb5] bg-[#3a9bb5]/10 rounded-full px-3 py-1 mb-4">
            Herramienta gratuita
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Calculadora ROI:{" "}
            <span className="text-[#3a9bb5]">
              ¿Cuánto puedes ahorrar con un CPQ?
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Ajusta los valores de tu equipo comercial y descubre en segundos el
            retorno de inversión de automatizar tus cotizaciones con DealForge.
          </p>
        </div>

        {/* ---- Sliders ---- */}
        <section
          aria-label="Parámetros de cálculo"
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10 mb-12 space-y-8"
        >
          <h2 className="text-lg font-bold text-gray-900">
            Tu equipo comercial
          </h2>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            <Slider
              label="Cotizaciones al mes"
              value={quotes}
              min={10}
              max={500}
              step={5}
              unit=""
              onChange={setQuotes}
            />
            <Slider
              label="Tiempo medio por cotización"
              value={timePerQuote}
              min={15}
              max={120}
              step={5}
              unit="min"
              onChange={setTimePerQuote}
            />
            <Slider
              label="Valor medio por cotización"
              value={avgValue}
              min={500}
              max={50000}
              step={100}
              unit="EUR"
              onChange={setAvgValue}
            />
            <Slider
              label="Vendedores en el equipo"
              value={salesPeople}
              min={1}
              max={20}
              step={1}
              unit=""
              onChange={setSalesPeople}
            />
            <Slider
              label="Tasa de cierre actual"
              value={winRate}
              min={5}
              max={50}
              step={1}
              unit="%"
              onChange={setWinRate}
            />
          </div>
        </section>

        {/* ---- Results ---- */}
        <section
          aria-label="Resultados del cálculo"
          className="rounded-2xl bg-gradient-to-br from-[#3a9bb5]/5 via-white to-[#3a9bb5]/10 border border-[#3a9bb5]/20 p-6 sm:p-10 mb-12"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Tu ROI estimado con DealForge
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ResultCard
              label="Horas ahorradas / mes"
              value={fmtNum(hoursSavedMonth)}
              sub={`${fmtNum(hoursSavedMonth * 12)} horas al año`}
            />
            <ResultCard
              label="Ingresos extra / mes"
              value={fmtEur(revenueIncreaseMonth)}
              sub={`+${winRateUplift} p.p. tasa de cierre`}
            />
            <ResultCard
              label="ROI anual"
              value={`${fmtNum(roi)}%`}
              sub={`Ahorro neto: ${fmtEur(annualSavings + annualRevenueIncrease - annualPlanCost)}/año`}
            />
            <ResultCard
              label="Plan recomendado"
              value={plan.name}
              sub={`${fmtEur(plan.price)}/mes`}
            />
          </div>

          {/* Breakdown */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="bg-white/80 rounded-xl p-4 border border-gray-100">
              <p className="font-semibold text-gray-800 mb-1">Ahorro en tiempo</p>
              <p>
                {fmtNum(hoursSavedMonth)} h/mes &times; {hourlyCost}&nbsp;&euro;/h
                = <strong className="text-gray-900">{fmtEur(annualSavings)}/año</strong>
              </p>
            </div>
            <div className="bg-white/80 rounded-xl p-4 border border-gray-100">
              <p className="font-semibold text-gray-800 mb-1">Ingresos adicionales</p>
              <p>
                {fmtNum(quotes)} cot. &times; {fmtEur(avgValue)} &times; {winRateUplift}%
                = <strong className="text-gray-900">{fmtEur(annualRevenueIncrease)}/año</strong>
              </p>
            </div>
            <div className="bg-white/80 rounded-xl p-4 border border-gray-100">
              <p className="font-semibold text-gray-800 mb-1">Coste del plan</p>
              <p>
                Plan {plan.name}: {fmtEur(plan.price)}/mes
                = <strong className="text-gray-900">{fmtEur(annualPlanCost)}/año</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className="text-center py-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            ¿Listo para multiplicar tu productividad?
          </h2>
          <p className="text-gray-500 mb-6 max-w-xl mx-auto">
            Empieza gratis hoy. Sin tarjeta de crédito, sin compromisos.
          </p>
          <Link
            href={plan.href}
            className="inline-flex items-center justify-center rounded-xl bg-[#3a9bb5] hover:bg-[#2d7d94] text-white font-semibold text-base px-8 py-3.5 shadow-lg shadow-[#3a9bb5]/25 transition-colors"
          >
            Empieza con el plan {plan.name} &rarr;
          </Link>
          <p className="text-xs text-gray-400 mt-3">
            14 días gratis en todos los planes.
          </p>
        </section>

        {/* ---- Methodology note (SEO + trust) ---- */}
        <section className="max-w-3xl mx-auto mt-8 text-sm text-gray-500 space-y-2">
          <h3 className="font-semibold text-gray-700">Metodología del cálculo</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Reducción de tiempo:</strong> 70% de ahorro en la
              elaboración de cotizaciones, según estudios del sector CPQ
              (Configure, Price, Quote).
            </li>
            <li>
              <strong>Mejora de tasa de cierre:</strong> +5 puntos porcentuales
              es la media de mejora reportada por empresas que adoptan un CPQ.
            </li>
            <li>
              <strong>Coste hora:</strong> 25 &euro;/h es una estimación
              conservadora del coste medio de un comercial en España.
            </li>
          </ul>
        </section>
      </main>

      {/* ---- Footer ---- */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} DealForge. Todos los derechos
            reservados.
            {" · "}
            <Link
              href="/privacidad"
              className="hover:text-gray-600 underline"
            >
              Privacidad
            </Link>
            {" · "}
            <Link href="/terminos" className="hover:text-gray-600 underline">
              Términos
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
