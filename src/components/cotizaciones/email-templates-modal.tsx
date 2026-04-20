"use client";

import { useState } from "react";
import { X, Mail, Copy, Check, Send } from "lucide-react";
import {
  EMAIL_TEMPLATES,
  renderEmailTemplate,
  type EmailTemplate,
  type EmailVariables,
} from "@/data/email-templates";

interface Props {
  variables: EmailVariables;
  clienteEmail?: string | null;
}

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-green-50 text-green-700 border-green-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  purple: "bg-purple-50 text-purple-700 border-purple-200",
  red: "bg-red-50 text-red-700 border-red-200",
  gray: "bg-gray-50 text-gray-700 border-gray-200",
};

export function EmailTemplatesModal({ variables, clienteEmail }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<EmailTemplate | null>(null);
  const [copiedField, setCopiedField] = useState<"asunto" | "cuerpo" | null>(null);

  const rendered = selected ? renderEmailTemplate(selected, variables) : null;

  async function copyToClipboard(text: string, field: "asunto" | "cuerpo") {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1500);
    } catch {
      // ignore
    }
  }

  function openMailto() {
    if (!rendered) return;
    const to = clienteEmail || "";
    const params = new URLSearchParams({
      subject: rendered.asunto,
      body: rendered.cuerpo,
    });
    window.location.href = `mailto:${to}?${params.toString()}`;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#3a9bb5]/30 bg-[#3a9bb5]/5 text-[#3a9bb5] rounded-lg text-xs font-medium hover:bg-[#3a9bb5]/10 transition-colors"
      >
        <Mail className="w-3.5 h-3.5" />
        Email de seguimiento
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setOpen(false);
            setSelected(null);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#3a9bb5]" />
                  Plantillas de email de seguimiento
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  7 emails probados con cadencia de 21 días. Copia o envía directamente.
                </p>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  setSelected(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden grid md:grid-cols-[320px_1fr]">
              {/* List */}
              <div className="overflow-y-auto border-r border-gray-100 p-3 space-y-2 bg-gray-50">
                {EMAIL_TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelected(t)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selected?.id === t.id
                        ? "border-[#3a9bb5] bg-white ring-2 ring-[#3a9bb5]/20"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xl">{t.icon}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          COLOR_MAP[t.color] || COLOR_MAP.gray
                        }`}
                      >
                        {t.dia}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900">{t.nombre}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{t.descripcion}</p>
                  </button>
                ))}
              </div>

              {/* Preview */}
              <div className="overflow-y-auto p-6">
                {selected && rendered ? (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">{selected.icon}</span>
                      <div>
                        <h3 className="font-bold text-gray-900">{selected.nombre}</h3>
                        <p className="text-xs text-gray-500">{selected.descripcion}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Asunto */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Asunto
                          </label>
                          <button
                            onClick={() => copyToClipboard(rendered.asunto, "asunto")}
                            className="text-xs font-medium text-[#3a9bb5] hover:text-[#2d7d94] inline-flex items-center gap-1"
                          >
                            {copiedField === "asunto" ? (
                              <>
                                <Check className="w-3 h-3" /> Copiado
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" /> Copiar
                              </>
                            )}
                          </button>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 font-medium">
                          {rendered.asunto}
                        </div>
                      </div>

                      {/* Cuerpo */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Cuerpo del email
                          </label>
                          <button
                            onClick={() => copyToClipboard(rendered.cuerpo, "cuerpo")}
                            className="text-xs font-medium text-[#3a9bb5] hover:text-[#2d7d94] inline-flex items-center gap-1"
                          >
                            {copiedField === "cuerpo" ? (
                              <>
                                <Check className="w-3 h-3" /> Copiado
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" /> Copiar
                              </>
                            )}
                          </button>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                          {rendered.cuerpo}
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-900">
                        💡 <strong>Tip:</strong> personaliza el contenido entre corchetes antes de enviarlo para que suene natural.
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-sm text-gray-400 text-center">
                    <div>
                      <Mail className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                      <p>Selecciona una plantilla</p>
                      <p className="text-xs mt-1">para previsualizarla y copiarla</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
              <p className="text-xs text-gray-500">
                Variables: <code className="bg-gray-100 px-1 rounded">{"{{cliente}}"}</code>{" "}
                <code className="bg-gray-100 px-1 rounded">{"{{empresa}}"}</code>{" "}
                <code className="bg-gray-100 px-1 rounded">{"{{numero}}"}</code> — se reemplazan automáticamente.
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setSelected(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={openMailto}
                  disabled={!selected}
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-[#3a9bb5] text-white rounded-lg hover:bg-[#2d7d94] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Abrir en email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
