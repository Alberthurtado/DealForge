"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Download,
  RefreshCw,
  PenLine,
  Send,
  CheckCircle,
  Clock,
  Loader2,
  X,
  Pencil,
  Save,
} from "lucide-react";
import { CONTRATOS_STRINGS } from "@/lib/contratos-i18n";
import { type DashboardLang } from "@/lib/dashboard-i18n";

interface Firma {
  id: string;
  signerName: string;
  signerEmail: string;
  signedAt: string | null;
  signatureData: string | null;
  createdAt: string;
}

interface PlantillaOption {
  id: string;
  nombre: string;
  esDefault: boolean;
}

interface DocumentoPanelProps {
  contratoId: string;
  contratoNumero: string;
  documentoHtml: string | null;
  documentoGeneradoAt: string | null;
  onRefresh: () => void;
  lang?: DashboardLang;
}

export function DocumentoPanel({
  contratoId,
  contratoNumero,
  documentoHtml,
  documentoGeneradoAt,
  onRefresh,
  lang = "es",
}: DocumentoPanelProps) {
  const t = CONTRATOS_STRINGS[lang].documentoPanel;
  const numLocale = lang === "en" ? "en-GB" : "es-ES";
  const [loading, setLoading] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showFirmaModal, setShowFirmaModal] = useState(false);
  const [showGenerarModal, setShowGenerarModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedHtml, setEditedHtml] = useState(documentoHtml || "");
  const [firmas, setFirmas] = useState<Firma[]>([]);
  const [plantillas, setPlantillas] = useState<PlantillaOption[]>([]);
  const [selectedPlantillaId, setSelectedPlantillaId] = useState("");
  const [firmaForm, setFirmaForm] = useState({ signerName: "", signerEmail: "" });
  const [firmaError, setFirmaError] = useState("");
  const [firmaSuccess, setFirmaSuccess] = useState(false);

  useEffect(() => {
    loadFirmas();
    loadPlantillas();
  }, [contratoId]); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadFirmas() {
    try {
      const res = await fetch(`/api/contratos/${contratoId}/firma`);
      if (res.ok) {
        const data = await res.json();
        setFirmas(data);
      }
    } catch {
      // ignore
    }
  }

  async function loadPlantillas() {
    try {
      const res = await fetch("/api/plantillas-contrato");
      if (res.ok) {
        const data = await res.json();
        setPlantillas(data);
        const def = data.find((p: PlantillaOption) => p.esDefault);
        if (def) setSelectedPlantillaId(def.id);
      }
    } catch {
      // ignore
    }
  }

  async function handleGenerar() {
    setLoading("generar");
    try {
      const res = await fetch(`/api/contratos/${contratoId}/generar-documento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plantillaId: selectedPlantillaId || undefined }),
      });
      if (res.ok) {
        setShowGenerarModal(false);
        onRefresh();
      }
    } finally {
      setLoading("");
    }
  }

  async function handleDescargarPdf() {
    setLoading("pdf");
    try {
      const res = await fetch(`/api/contratos/${contratoId}/pdf`);
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `contrato-${contratoNumero}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } finally {
      setLoading("");
    }
  }

  async function handleGuardarEdicion() {
    setLoading("edit");
    try {
      const res = await fetch(`/api/contratos/${contratoId}/documento`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentoHtml: editedHtml }),
      });
      if (res.ok) {
        setShowEditModal(false);
        onRefresh();
      }
    } finally {
      setLoading("");
    }
  }

  async function handleSolicitarFirma() {
    setFirmaError("");
    if (!firmaForm.signerName.trim() || !firmaForm.signerEmail.trim()) {
      setFirmaError(t.errNameEmailRequired);
      return;
    }
    setLoading("firma");
    try {
      const res = await fetch(`/api/contratos/${contratoId}/firma`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(firmaForm),
      });
      if (res.ok) {
        setFirmaSuccess(true);
        loadFirmas();
        onRefresh();
      } else {
        const data = await res.json();
        setFirmaError(data.error || t.errRequestSignature);
      }
    } finally {
      setLoading("");
    }
  }

  const pendingFirma = firmas.find((f) => !f.signedAt);
  const signedFirma = firmas.find((f) => f.signedAt);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-400" />
          {t.title}
        </h3>
        {documentoGeneradoAt && (
          <p className="text-xs text-gray-400">
            {t.generatedOn(new Date(documentoGeneradoAt).toLocaleDateString(numLocale))}
          </p>
        )}
      </div>

      <div className="p-5 space-y-4">
        {/* Document generation */}
        {!documentoHtml ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
            <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700 mb-1">{t.noDocTitle}</p>
            <p className="text-xs text-gray-400 mb-4">
              {t.noDocDesc}
            </p>
            <button
              onClick={() => setShowGenerarModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" /> {t.generateDocument}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                {showPreview ? t.hide : t.viewDocument}
              </button>
              <button
                onClick={handleDescargarPdf}
                disabled={loading === "pdf"}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {loading === "pdf" ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                {t.downloadPdf}
              </button>
              <button
                onClick={() => { setEditedHtml(documentoHtml || ""); setShowEditModal(true); }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
              >
                <Pencil className="w-3.5 h-3.5" /> {t.editDocument}
              </button>
              <button
                onClick={() => setShowGenerarModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
              >
                <RefreshCw className="w-3.5 h-3.5" /> {t.regenerate}
              </button>
            </div>

            {showPreview && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div
                  className="p-4 max-h-[500px] overflow-y-auto text-sm bg-white"
                  dangerouslySetInnerHTML={{ __html: documentoHtml }}
                />
              </div>
            )}
          </div>
        )}

        {/* Signature section */}
        {documentoHtml && (
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {t.electronicSignature}
            </h4>

            {signedFirma ? (
              <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-green-900">{t.contractSigned}</p>
                  <p className="text-sm text-green-700">{signedFirma.signerName}</p>
                  <p className="text-xs text-green-600">{signedFirma.signerEmail}</p>
                  <p className="text-xs text-green-500 mt-0.5">
                    {t.signedOn(new Date(signedFirma.signedAt!).toLocaleDateString(numLocale, { day: "numeric", month: "long", year: "numeric" }))}
                  </p>
                  {signedFirma.signatureData && (
                    <img
                      src={signedFirma.signatureData}
                      alt={t.electronicSignature}
                      className="h-12 mt-2 object-contain"
                    />
                  )}
                </div>
              </div>
            ) : pendingFirma ? (
              <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-amber-900">{t.signaturePending}</p>
                  <p className="text-sm text-amber-700">{pendingFirma.signerName}</p>
                  <p className="text-xs text-amber-600">{pendingFirma.signerEmail}</p>
                  <p className="text-xs text-amber-500 mt-0.5">
                    {t.requestedOn(new Date(pendingFirma.createdAt).toLocaleDateString(numLocale))}
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { setShowFirmaModal(true); setFirmaSuccess(false); setFirmaError(""); }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <PenLine className="w-3.5 h-3.5" /> {t.requestSignature}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Generate modal */}
      {showGenerarModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setShowGenerarModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">{t.generateDocument}</h3>
              <button onClick={() => setShowGenerarModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {plantillas.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.templateLabel}
                </label>
                <select
                  value={selectedPlantillaId}
                  onChange={(e) => setSelectedPlantillaId(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                >
                  <option value="">{t.systemDefaultTemplate}</option>
                  {plantillas.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}{p.esDefault ? t.defaultSuffix : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {documentoHtml && (
              <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg p-2 mb-4">
                {t.willReplace}
              </p>
            )}

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowGenerarModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                {t.cancel}
              </button>
              <button
                onClick={handleGenerar}
                disabled={loading === "generar"}
                className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1.5"
              >
                {loading === "generar" && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {t.generate}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit document modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">{t.editDocument}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{t.editDocDesc}</p>
              </div>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-1 overflow-hidden gap-0 min-h-0">
              {/* Editor */}
              <div className="flex-1 flex flex-col p-4 border-r border-gray-100">
                <p className="text-xs font-medium text-gray-500 mb-2">{t.documentHtml}</p>
                <textarea
                  value={editedHtml}
                  onChange={(e) => setEditedHtml(e.target.value)}
                  className="flex-1 w-full font-mono text-xs border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  spellCheck={false}
                />
              </div>
              {/* Preview */}
              <div className="flex-1 flex flex-col p-4 overflow-hidden">
                <p className="text-xs font-medium text-gray-500 mb-2">{t.preview}</p>
                <div
                  className="flex-1 border border-gray-200 rounded-lg p-4 overflow-y-auto bg-white text-sm"
                  dangerouslySetInnerHTML={{ __html: editedHtml }}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                {t.cancel}
              </button>
              <button
                onClick={handleGuardarEdicion}
                disabled={loading === "edit"}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
              >
                {loading === "edit" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                {t.saveChanges}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Firma modal */}
      {showFirmaModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setShowFirmaModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">{t.requestSignature}</h3>
              <button onClick={() => setShowFirmaModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {firmaSuccess ? (
              <div className="text-center py-4">
                <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">{t.requestSent}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {t.emailSentNote}
                </p>
                <button
                  onClick={() => setShowFirmaModal(false)}
                  className="mt-4 px-4 py-2 text-sm bg-primary text-white rounded-lg"
                >
                  {t.close}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.signerName}</label>
                  <input
                    type="text"
                    value={firmaForm.signerName}
                    onChange={(e) => setFirmaForm({ ...firmaForm, signerName: e.target.value })}
                    placeholder={t.signerNamePlaceholder}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.signerEmail}</label>
                  <input
                    type="email"
                    value={firmaForm.signerEmail}
                    onChange={(e) => setFirmaForm({ ...firmaForm, signerEmail: e.target.value })}
                    placeholder={t.signerEmailPlaceholder}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>

                {firmaError && (
                  <p className="text-sm text-red-600">{firmaError}</p>
                )}

                <div className="flex justify-end gap-2">
                  <button onClick={() => setShowFirmaModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                    {t.cancel}
                  </button>
                  <button
                    onClick={handleSolicitarFirma}
                    disabled={loading === "firma"}
                    className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {loading === "firma" && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <Send className="w-3.5 h-3.5" />
                    {t.sendSignLink}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
