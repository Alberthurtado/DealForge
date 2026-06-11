"use client";

import { useState } from "react";
import { X, Check, Sparkles, Layers } from "lucide-react";
import {
  getCotizacionTemplates,
  type CotizacionTemplate,
} from "@/data/cotizacion-templates";
import { formatCurrency } from "@/lib/utils";
import { DASHBOARD_STRINGS, type DashboardLang } from "@/lib/dashboard-i18n";

interface Props {
  onApply: (template: CotizacionTemplate) => void;
  lang?: DashboardLang;
  moneda?: string;
  numLocale?: string;
}

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  pink: "bg-pink-50 text-pink-700 border-pink-200",
  green: "bg-green-50 text-green-700 border-green-200",
};

export function CotizacionTemplatePicker({
  onApply,
  lang = "es",
  moneda = "EUR",
  numLocale = "es-ES",
}: Props) {
  const t = DASHBOARD_STRINGS[lang].templatePicker;
  const templates = getCotizacionTemplates(lang);
  const money = (n: number) => formatCurrency(n, moneda, numLocale);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<CotizacionTemplate | null>(null);

  function handleApply() {
    if (!selected) return;
    onApply(selected);
    setOpen(false);
    setSelected(null);
  }

  const totalEstimado = selected
    ? selected.lineItems.reduce(
        (s, li) => s + li.cantidad * li.precioUnitario * (1 - (li.descuento || 0) / 100),
        0
      )
    : 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#3a9bb5]/30 bg-[#3a9bb5]/5 text-[#3a9bb5] rounded-lg text-xs font-semibold hover:bg-[#3a9bb5]/10 transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5" />
        {t.triggerButton}
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#3a9bb5]" />
                  {t.modalTitle}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {t.modalSubtitle}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-hidden grid md:grid-cols-[340px_1fr]">
              {/* List */}
              <div className="overflow-y-auto border-r border-gray-100 p-3 space-y-2 bg-gray-50">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setSelected(tpl)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selected?.id === tpl.id
                        ? "border-[#3a9bb5] bg-white ring-2 ring-[#3a9bb5]/20"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{tpl.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-gray-900">{tpl.nombre}</h3>
                        <span
                          className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                            COLOR_MAP[tpl.color] || COLOR_MAP.blue
                          }`}
                        >
                          {tpl.sector}
                        </span>
                        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">
                          {tpl.descripcion}
                        </p>
                      </div>
                      {selected?.id === tpl.id && (
                        <Check className="w-5 h-5 text-[#3a9bb5] flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Preview */}
              <div className="overflow-y-auto p-6">
                {selected ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{selected.icon}</span>
                      <div>
                        <h3 className="font-bold text-gray-900">{selected.nombre}</h3>
                        <p className="text-xs text-gray-500">{selected.descripcion}</p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      {/* Líneas */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                          {t.linesToAdd(selected.lineItems.length)}
                        </h4>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <table className="w-full text-xs">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="text-left px-3 py-2 font-semibold text-gray-600">
                                  {t.concept}
                                </th>
                                <th className="text-right px-3 py-2 font-semibold text-gray-600 w-14">
                                  {t.qty}
                                </th>
                                <th className="text-right px-3 py-2 font-semibold text-gray-600 w-24">
                                  {t.price}
                                </th>
                                <th className="text-right px-3 py-2 font-semibold text-gray-600 w-20">
                                  {t.freq}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {selected.lineItems.map((li, i) => (
                                <tr
                                  key={i}
                                  className="border-t border-gray-100 align-top"
                                >
                                  <td className="px-3 py-2 text-gray-800">{li.descripcion}</td>
                                  <td className="px-3 py-2 text-right text-gray-700">
                                    {li.cantidad}
                                  </td>
                                  <td className="px-3 py-2 text-right text-gray-700">
                                    {money(li.precioUnitario)}
                                  </td>
                                  <td className="px-3 py-2 text-right text-gray-500">
                                    {li.frecuencia === "MENSUAL"
                                      ? t.freqMonthly
                                      : li.frecuencia === "ANUAL"
                                      ? t.freqAnnual
                                      : "—"}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr className="border-t border-gray-200 bg-gray-50">
                                <td
                                  colSpan={3}
                                  className="px-3 py-2 text-right font-semibold text-gray-700"
                                >
                                  {t.estimatedTotal}
                                </td>
                                <td className="px-3 py-2 text-right font-bold text-[#3a9bb5]">
                                  {money(totalEstimado)}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>

                      {/* Notas */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          {t.notes}
                        </h4>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-700 whitespace-pre-wrap">
                          {selected.notas}
                        </div>
                      </div>

                      {/* Condiciones */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                          {t.terms}
                        </h4>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-700 whitespace-pre-wrap max-h-48 overflow-y-auto">
                          {selected.condiciones}
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-900">
                        ⚠️ {t.warningPre}
                        <strong>{t.warningStrong}</strong>{t.warningPost}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-sm text-gray-400 text-center">
                    <div>
                      <Layers className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                      <p>{t.emptyTitle}</p>
                      <p className="text-xs mt-1">{t.emptyHint}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <p className="text-xs text-gray-500">
                💡 {t.footerTip}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  {t.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={!selected}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-[#3a9bb5] text-white rounded-lg hover:bg-[#2d7d94] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Check className="w-4 h-4" />
                  {t.apply}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
