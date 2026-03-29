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
} from "lucide-react";

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
}

export function DocumentoPanel({
  contratoId,
  contratoNumero,
  documentoHtml,
  documentoGeneradoAt,
  onRefresh,
}: DocumentoPanelProps) {
  const [loading, setLoading] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showFirmaModal, setShowFirmaModal] = useState(false);
  const [showGenerarModal, setShowGenerarModal] = useState(false);
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

  async function handleSolicitarFirma() {
    setFirmaError("");
    if (!firmaForm.signerName.trim() || !firmaForm.signerEmail.trim()) {
      setFirmaError("Nombre y email son obligatorios");
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
        setFirmaError(data.error || "Error al solicitar firma");
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
          Documento del contrato
        </h3>
        {documentoGeneradoAt && (
          <p className="text-xs text-gray-400">
            Generado el {new Date(documentoGeneradoAt).toLocaleDateString("es-ES")}
          </p>
        )}
      </div>

      <div className="p-5 space-y-4">
        {/* Document generation */}
        {!documentoHtml ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
            <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700 mb-1">Sin documento generado</p>
            <p className="text-xs text-gray-400 mb-4">
              Genera el documento a partir de una plantilla para poder descargarlo y firmarlo
            </p>
            <button
              onClick={() => setShowGenerarModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" /> Generar documento
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
                {showPreview ? "Ocultar" : "Ver documento"}
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
                Descargar PDF
              </button>
              <button
                onClick={() => setShowGenerarModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Volver a generar
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
              Firma electrónica
            </h4>

            {signedFirma ? (
              <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-green-900">Contrato firmado</p>
                  <p className="text-sm text-green-700">{signedFirma.signerName}</p>
                  <p className="text-xs text-green-600">{signedFirma.signerEmail}</p>
                  <p className="text-xs text-green-500 mt-0.5">
                    Firmado el {new Date(signedFirma.signedAt!).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                  {signedFirma.signatureData && (
                    <img
                      src={signedFirma.signatureData}
                      alt="Firma"
                      className="h-12 mt-2 object-contain"
                    />
                  )}
                </div>
              </div>
            ) : pendingFirma ? (
              <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-amber-900">Firma pendiente</p>
                  <p className="text-sm text-amber-700">{pendingFirma.signerName}</p>
                  <p className="text-xs text-amber-600">{pendingFirma.signerEmail}</p>
                  <p className="text-xs text-amber-500 mt-0.5">
                    Solicitada el {new Date(pendingFirma.createdAt).toLocaleDateString("es-ES")}
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { setShowFirmaModal(true); setFirmaSuccess(false); setFirmaError(""); }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <PenLine className="w-3.5 h-3.5" /> Solicitar firma electrónica
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
              <h3 className="text-base font-bold text-gray-900">Generar documento</h3>
              <button onClick={() => setShowGenerarModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {plantillas.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plantilla
                </label>
                <select
                  value={selectedPlantillaId}
                  onChange={(e) => setSelectedPlantillaId(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                >
                  <option value="">Plantilla predeterminada del sistema</option>
                  {plantillas.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}{p.esDefault ? " (predeterminada)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {documentoHtml && (
              <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg p-2 mb-4">
                Esto reemplazará el documento existente.
              </p>
            )}

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowGenerarModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                Cancelar
              </button>
              <button
                onClick={handleGenerar}
                disabled={loading === "generar"}
                className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1.5"
              >
                {loading === "generar" && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Generar
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
              <h3 className="text-base font-bold text-gray-900">Solicitar firma electrónica</h3>
              <button onClick={() => setShowFirmaModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {firmaSuccess ? (
              <div className="text-center py-4">
                <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Solicitud enviada</p>
                <p className="text-xs text-gray-500 mt-1">
                  Se ha enviado un email con el enlace de firma
                </p>
                <button
                  onClick={() => setShowFirmaModal(false)}
                  className="mt-4 px-4 py-2 text-sm bg-primary text-white rounded-lg"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del firmante</label>
                  <input
                    type="text"
                    value={firmaForm.signerName}
                    onChange={(e) => setFirmaForm({ ...firmaForm, signerName: e.target.value })}
                    placeholder="Nombre completo"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email del firmante</label>
                  <input
                    type="email"
                    value={firmaForm.signerEmail}
                    onChange={(e) => setFirmaForm({ ...firmaForm, signerEmail: e.target.value })}
                    placeholder="email@empresa.com"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                </div>

                {firmaError && (
                  <p className="text-sm text-red-600">{firmaError}</p>
                )}

                <div className="flex justify-end gap-2">
                  <button onClick={() => setShowFirmaModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                    Cancelar
                  </button>
                  <button
                    onClick={handleSolicitarFirma}
                    disabled={loading === "firma"}
                    className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {loading === "firma" && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <Send className="w-3.5 h-3.5" />
                    Enviar enlace de firma
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
