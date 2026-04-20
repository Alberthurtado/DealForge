"use client";

import { useState, useMemo } from "react";
import {
  X,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Gauge,
  Sparkles,
} from "lucide-react";
import {
  computeScorecard,
  type ScorecardCotizacion,
  type ScorecardResult,
} from "@/lib/cotizacion-scorecard";

interface Props {
  cotizacion: ScorecardCotizacion;
}

const COLOR_MAP: Record<
  string,
  { bg: string; text: string; ring: string; bar: string }
> = {
  green: {
    bg: "bg-green-50",
    text: "text-green-700",
    ring: "ring-green-200",
    bar: "bg-green-500",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    ring: "ring-blue-200",
    bar: "bg-blue-500",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-200",
    bar: "bg-amber-500",
  },
  red: {
    bg: "bg-red-50",
    text: "text-red-700",
    ring: "ring-red-200",
    bar: "bg-red-500",
  },
};

export function CotizacionScorecardModal({ cotizacion }: Props) {
  const [open, setOpen] = useState(false);

  const result: ScorecardResult = useMemo(
    () => computeScorecard(cotizacion),
    [cotizacion]
  );

  // Trigger button badge color
  const triggerColor = COLOR_MAP[result.color];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-xs font-semibold transition-colors ${triggerColor.bg} ${triggerColor.text} border-transparent hover:brightness-95`}
        title="Revisa la calidad antes de enviar"
      >
        <Gauge className="w-3.5 h-3.5" />
        Scorecard
        <span className="ml-1 px-1.5 py-0.5 bg-white/80 rounded-full text-[10px] font-bold tabular-nums">
          {result.score}/100
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#3a9bb5]" />
                  Scorecard de calidad — pre-envío
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Revisa estos {result.total} puntos antes de enviar la cotización. Ajustarlos
                  aumenta tu tasa de aceptación.
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score banner */}
            <div
              className={`px-6 py-5 border-b border-gray-100 ${COLOR_MAP[result.color].bg}`}
            >
              <div className="flex items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span
                      className={`text-5xl font-black tabular-nums ${COLOR_MAP[result.color].text}`}
                    >
                      {result.score}
                    </span>
                    <span className="text-lg text-gray-500">/ 100</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${COLOR_MAP[result.color].text} bg-white/70`}
                    >
                      {result.grade}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {result.passed} de {result.total} puntos superados
                    {result.blockers > 0 && (
                      <>
                        {" · "}
                        <span className="text-red-700 font-semibold">
                          {result.blockers} bloqueante{result.blockers > 1 ? "s" : ""}
                        </span>
                      </>
                    )}
                  </p>
                  {/* Progress bar */}
                  <div className="mt-3 h-2 w-full bg-white/60 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${COLOR_MAP[result.color].bar} transition-all`}
                      style={{ width: `${result.score}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Checks list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-2">
              {result.checks.map((c) => {
                const icon = c.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : c.severity === "error" ? (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                );
                const rowStyle = c.passed
                  ? "border-green-100 bg-green-50/40"
                  : c.severity === "error"
                  ? "border-red-200 bg-red-50/60"
                  : "border-amber-200 bg-amber-50/60";
                return (
                  <div
                    key={c.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${rowStyle}`}
                  >
                    <div className="mt-0.5">{icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`text-sm font-semibold ${
                            c.passed ? "text-gray-700" : "text-gray-900"
                          }`}
                        >
                          {c.label}
                        </p>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                            c.passed
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {c.passed ? `+${c.points} pts` : `0/${c.points} pts`}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{c.description}</p>
                      {!c.passed && c.hint && (
                        <p
                          className={`text-xs mt-1.5 font-medium ${
                            c.severity === "error" ? "text-red-700" : "text-amber-700"
                          }`}
                        >
                          → {c.hint}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <p className="text-xs text-gray-500">
                💡 Las cotizaciones con score &gt; 85 tienen el doble de tasa de aceptación.
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-5 py-2 text-sm font-semibold bg-[#3a9bb5] text-white rounded-lg hover:bg-[#2d7d94]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
