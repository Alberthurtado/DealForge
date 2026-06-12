"use client";

import { useState } from "react";
import { X, Check, FileText, Sparkles } from "lucide-react";
import { getTCTemplates, type TCTemplate } from "@/data/tc-templates";
import { CONFIG_STRINGS } from "@/lib/configuracion-i18n";
import { type DashboardLang } from "@/lib/dashboard-i18n";

interface Props {
  tipo: "transaccional" | "contractual";
  onApply: (contenido: string) => void;
  lang?: DashboardLang;
}

export function TCTemplatesModal({ tipo, onApply, lang = "es" }: Props) {
  const tx = CONFIG_STRINGS[lang].tcModal;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<TCTemplate | null>(null);

  // Filter templates by tipo (ambas = aplicable a los dos)
  const templates = getTCTemplates(lang).filter((t) => t.tipo === tipo || t.tipo === "ambas");

  function handleApply() {
    if (!selected) return;
    onApply(selected.contenido);
    setOpen(false);
    setSelected(null);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3a9bb5] hover:text-[#2d7d94] transition-colors"
      >
        <Sparkles className="w-3.5 h-3.5" />
        {tx.useTemplate}
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
                  <FileText className="w-5 h-5 text-[#3a9bb5]" />
                  {tx.galleryTitle}{" "}
                  {tipo === "transaccional" ? tx.transactional : tx.contractual}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {tx.subtitle}
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
            <div className="flex-1 overflow-hidden grid md:grid-cols-2">
              {/* List */}
              <div className="overflow-y-auto border-r border-gray-100 p-4 space-y-2">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelected(t)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selected?.id === t.id
                        ? "border-[#3a9bb5] bg-[#3a9bb5]/5 ring-2 ring-[#3a9bb5]/20"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{t.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-gray-900">{t.nombre}</h3>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                          {t.descripcion}
                        </p>
                      </div>
                      {selected?.id === t.id && (
                        <Check className="w-5 h-5 text-[#3a9bb5] flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Preview */}
              <div className="overflow-y-auto p-6 bg-gray-50">
                {selected ? (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{selected.icon}</span>
                      <h3 className="font-bold text-gray-900">{selected.nombre}</h3>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">{selected.descripcion}</p>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                        {selected.contenido}
                      </pre>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-sm text-gray-400 text-center">
                    <div>
                      <FileText className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                      <p>{tx.emptyTitle}</p>
                      <p className="text-xs mt-1">{tx.emptyHint}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <p className="text-xs text-gray-500">
                💡 {tx.footerTipPre}<code className="bg-gray-100 px-1.5 py-0.5 rounded">{tx.footerCityCode}</code>{tx.footerTipPost}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  {tx.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={!selected}
                  className="px-5 py-2 text-sm font-semibold bg-[#3a9bb5] text-white rounded-lg hover:bg-[#2d7d94] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {tx.apply}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
