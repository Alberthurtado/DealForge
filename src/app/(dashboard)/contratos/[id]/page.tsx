"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DocumentoPanel } from "@/components/contratos/documento-panel";
import {
  CheckCircle, Clock, XCircle, AlertTriangle, TrendingUp,
  RefreshCw, Ban, FileEdit, ScrollText, Loader2, ChevronDown,
  Pencil, Save, X as XIcon, ThumbsUp, ThumbsDown,
} from "lucide-react";

interface ContratoDetail {
  id: string;
  numero: string;
  estado: string;
  fechaInicio: string;
  fechaFin: string;
  duracionMeses: number;
  renovacionAutomatica: boolean;
  diasAvisoRenovacion: number;
  valorMensual: number;
  valorTotal: number;
  moneda: string;
  condiciones: string | null;
  clausulaCancelacion: string | null;
  periodoPreaviso: number;
  canceladoAt: string | null;
  motivoCancelacion: string | null;
  createdAt: string;
  cliente: { id: string; nombre: string; email: string | null };
  cotizacion: { id: string; numero: string };
  lineItems: { id: string; descripcion: string; cantidad: number; precioUnitario: number; frecuencia: string; total: number; orden: number }[];
  enmiendas: { id: string; tipo: string; descripcion: string; valorAnterior: number; valorNuevo: number; estado: string; createdAt: string }[];
  actividades: { id: string; tipo: string; descripcion: string; createdAt: string }[];
  documentoHtml: string | null;
  documentoGeneradoAt: string | null;
}

const ESTADO_CONFIG: Record<string, { label: string; color: string; bgColor: string; icon: typeof CheckCircle }> = {
  ACTIVO: { label: "Activo", color: "text-green-700", bgColor: "bg-green-100", icon: CheckCircle },
  PENDIENTE_RENOVACION: { label: "Pendiente Renovación", color: "text-amber-700", bgColor: "bg-amber-100", icon: Clock },
  RENOVADO: { label: "Renovado", color: "text-blue-700", bgColor: "bg-blue-100", icon: TrendingUp },
  CANCELADO: { label: "Cancelado", color: "text-red-700", bgColor: "bg-red-100", icon: XCircle },
  EXPIRADO: { label: "Expirado", color: "text-gray-600", bgColor: "bg-gray-100", icon: AlertTriangle },
};

const FRECUENCIA_LABELS: Record<string, string> = {
  MENSUAL: "Mensual",
  TRIMESTRAL: "Trimestral",
  ANUAL: "Anual",
  UNICO: "Único",
};

const TIPO_ENMIENDA_LABELS: Record<string, string> = {
  MODIFICACION: "Modificación",
  UPSELL: "Upsell",
  DOWNSELL: "Downsell",
  EXTENSION: "Extensión",
  CANCELACION: "Cancelación",
};

const ACTIVIDAD_ICONS: Record<string, { icon: typeof CheckCircle; color: string }> = {
  CREADO: { icon: ScrollText, color: "text-blue-500" },
  RENOVADO: { icon: RefreshCw, color: "text-green-500" },
  ENMIENDA: { icon: FileEdit, color: "text-purple-500" },
  ACTUALIZACION: { icon: CheckCircle, color: "text-indigo-500" },
  CANCELADO: { icon: XCircle, color: "text-red-500" },
  NOTIFICACION: { icon: Clock, color: "text-amber-500" },
  ESTADO_CAMBIADO: { icon: TrendingUp, color: "text-gray-500" },
};

export default function ContratoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [contrato, setContrato] = useState<ContratoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");

  // Modals
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelMotivo, setCancelMotivo] = useState("");
  const [showEnmiendaModal, setShowEnmiendaModal] = useState(false);
  const [enmienda, setEnmienda] = useState({ tipo: "UPSELL", descripcion: "", valorNuevo: 0 });

  // Inline conditions edit
  const [editingCondiciones, setEditingCondiciones] = useState(false);
  const [condicionesForm, setCondicionesForm] = useState({ condiciones: "", clausulaCancelacion: "", periodoPreaviso: 30 });
  const [savingCondiciones, setSavingCondiciones] = useState(false);

  const loadContrato = useCallback(() => {
    fetch(`/api/contratos/${params.id}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then(setContrato)
      .catch(() => router.push("/contratos"))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  useEffect(() => { loadContrato(); }, [loadContrato]);

  async function handleRenovar() {
    setActionLoading("renovar");
    try {
      const res = await fetch(`/api/contratos/${params.id}/renovar`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
      if (res.ok) loadContrato();
    } finally { setActionLoading(""); }
  }

  async function handleCancelar() {
    setActionLoading("cancelar");
    try {
      const res = await fetch(`/api/contratos/${params.id}/cancelar`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ motivoCancelacion: cancelMotivo }) });
      if (res.ok) { setShowCancelModal(false); loadContrato(); }
    } finally { setActionLoading(""); }
  }

  async function handleEnmienda() {
    setActionLoading("enmienda");
    try {
      const res = await fetch(`/api/contratos/${params.id}/enmienda`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...enmienda, cambios: JSON.stringify({ descripcion: enmienda.descripcion }) }),
      });
      if (res.ok) { setShowEnmiendaModal(false); setEnmienda({ tipo: "UPSELL", descripcion: "", valorNuevo: 0 }); loadContrato(); }
    } finally { setActionLoading(""); }
  }

  async function handleEnmiendaEstado(enmiendaId: string, estado: "ACEPTADA" | "RECHAZADA") {
    setActionLoading(`enmienda-${enmiendaId}`);
    try {
      const res = await fetch(`/api/contratos/${params.id}/enmienda/${enmiendaId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),
      });
      if (res.ok) loadContrato();
    } finally { setActionLoading(""); }
  }

  async function handleGuardarCondiciones() {
    setSavingCondiciones(true);
    try {
      const res = await fetch(`/api/contratos/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          condiciones: condicionesForm.condiciones || null,
          clausulaCancelacion: condicionesForm.clausulaCancelacion || null,
          periodoPreaviso: condicionesForm.periodoPreaviso,
        }),
      });
      if (res.ok) { setEditingCondiciones(false); loadContrato(); }
    } finally { setSavingCondiciones(false); }
  }

  if (loading || !contrato) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  const cfg = ESTADO_CONFIG[contrato.estado] || ESTADO_CONFIG.ACTIVO;
  const diasRestantes = Math.ceil((new Date(contrato.fechaFin).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const isActive = contrato.estado === "ACTIVO" || contrato.estado === "PENDIENTE_RENOVACION";

  return (
    <div>
      <PageHeader
        title={contrato.numero}
        description={`Contrato con ${contrato.cliente.nombre}`}
        breadcrumbs={[
          { label: "Contratos", href: "/contratos" },
          { label: contrato.numero },
        ]}
        actions={
          isActive ? (
            <div className="flex items-center gap-2">
              <button onClick={() => setShowEnmiendaModal(true)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FileEdit className="w-3.5 h-3.5" /> Enmienda
              </button>
              <button onClick={handleRenovar} disabled={actionLoading === "renovar"} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50">
                {actionLoading === "renovar" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />} Renovar
              </button>
              <button onClick={() => setShowCancelModal(true)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                <Ban className="w-3.5 h-3.5" /> Cancelar
              </button>
            </div>
          ) : null
        }
      />

      <div className="p-6 space-y-6">
        {/* Status + Value Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Estado</p>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.bgColor} ${cfg.color}`}>
              <cfg.icon className="w-3 h-3" /> {cfg.label}
            </span>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Valor Mensual</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(contrato.valorMensual)}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Valor Total</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(contrato.valorTotal)}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Vencimiento</p>
            <p className="text-sm font-medium text-gray-900">{formatDate(contrato.fechaFin)}</p>
            {diasRestantes > 0 && isActive && (
              <p className={`text-xs mt-0.5 ${diasRestantes <= 30 ? "text-amber-600" : "text-gray-400"}`}>{diasRestantes} días restantes</p>
            )}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">Renovación</p>
            <p className={`text-sm font-medium ${contrato.renovacionAutomatica ? "text-green-600" : "text-gray-600"}`}>
              {contrato.renovacionAutomatica ? "Automática" : "Manual"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Aviso {contrato.diasAvisoRenovacion}d antes</p>
          </div>
        </div>

        {/* Line Items */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm">Servicios Contratados</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 uppercase tracking-wider bg-gray-50">
                <th className="text-left px-5 py-2 font-semibold">Descripción</th>
                <th className="text-right px-5 py-2 font-semibold">Cantidad</th>
                <th className="text-right px-5 py-2 font-semibold">Precio</th>
                <th className="text-left px-5 py-2 font-semibold">Frecuencia</th>
                <th className="text-right px-5 py-2 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {contrato.lineItems.map((li) => (
                <tr key={li.id} className="border-t border-gray-50">
                  <td className="px-5 py-2.5 text-gray-700">{li.descripcion}</td>
                  <td className="px-5 py-2.5 text-right text-gray-500">{li.cantidad}</td>
                  <td className="px-5 py-2.5 text-right text-gray-500">{formatCurrency(li.precioUnitario)}</td>
                  <td className="px-5 py-2.5">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {FRECUENCIA_LABELS[li.frecuencia] || li.frecuencia}
                    </span>
                  </td>
                  <td className="px-5 py-2.5 text-right font-medium text-gray-900">{formatCurrency(li.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Document Panel */}
        <DocumentoPanel
          contratoId={contrato.id}
          contratoNumero={contrato.numero}
          documentoHtml={contrato.documentoHtml}
          documentoGeneradoAt={contrato.documentoGeneradoAt}
          onRefresh={loadContrato}
        />

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Conditions */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-sm">Condiciones del Contrato</h3>
              {isActive && !editingCondiciones && (
                <button
                  onClick={() => {
                    setCondicionesForm({
                      condiciones: contrato.condiciones || "",
                      clausulaCancelacion: contrato.clausulaCancelacion || "",
                      periodoPreaviso: contrato.periodoPreaviso,
                    });
                    setEditingCondiciones(true);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-primary transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" /> Editar
                </button>
              )}
            </div>

            {editingCondiciones ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Condiciones Generales</label>
                  <textarea
                    value={condicionesForm.condiciones}
                    onChange={(e) => setCondicionesForm({ ...condicionesForm, condiciones: e.target.value })}
                    rows={6}
                    placeholder="Escribe las condiciones generales del contrato..."
                    className="w-full text-sm border border-gray-200 rounded-lg p-3 resize-y focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Cláusula de Cancelación</label>
                  <textarea
                    value={condicionesForm.clausulaCancelacion}
                    onChange={(e) => setCondicionesForm({ ...condicionesForm, clausulaCancelacion: e.target.value })}
                    rows={4}
                    placeholder="Condiciones de cancelación anticipada, penalizaciones, etc."
                    className="w-full text-sm border border-gray-200 rounded-lg p-3 resize-y focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Preaviso de cancelación (días)</label>
                  <input
                    type="number"
                    min={0}
                    max={365}
                    value={condicionesForm.periodoPreaviso}
                    onChange={(e) => setCondicionesForm({ ...condicionesForm, periodoPreaviso: Number(e.target.value) })}
                    className="w-32 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleGuardarCondiciones}
                    disabled={savingCondiciones}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
                  >
                    {savingCondiciones ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingCondiciones(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50"
                  >
                    <XIcon className="w-3.5 h-3.5" /> Cancelar
                  </button>
                </div>
                <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg p-2">
                  Tras guardar, vuelve a generar el documento para que los cambios se reflejen en el PDF.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Condiciones Generales</p>
                  {contrato.condiciones ? (
                    <p className="text-sm text-gray-600 whitespace-pre-line">{contrato.condiciones}</p>
                  ) : (
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg p-3">
                      <span className="text-amber-500 mt-0.5 text-base leading-none">⚠</span>
                      <div className="text-xs text-amber-700">
                        Sin condiciones especificadas. Pulsa <strong>Editar</strong> para añadirlas aquí, o configura unas por defecto para todos los contratos en{" "}
                        <a href="/configuracion#condiciones" className="underline font-medium hover:text-amber-900">
                          Configuración → Condiciones por defecto
                        </a>.
                      </div>
                    </div>
                  )}
                </div>
                {contrato.clausulaCancelacion && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Cláusula de Cancelación</p>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{contrato.clausulaCancelacion}</p>
                  </div>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>Preaviso: {contrato.periodoPreaviso} días</span>
                  <span>Duración: {contrato.duracionMeses} meses</span>
                  <span>Desde: {formatDate(contrato.fechaInicio)}</span>
                </div>
              </>
            )}

            {contrato.motivoCancelacion && (
              <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                <p className="text-xs font-medium text-red-700 mb-1">Motivo de cancelación</p>
                <p className="text-sm text-red-600">{contrato.motivoCancelacion}</p>
                {contrato.canceladoAt && <p className="text-xs text-red-400 mt-1">Cancelado el {formatDate(contrato.canceladoAt)}</p>}
              </div>
            )}
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 text-sm mb-4">Actividad</h3>
            <div className="space-y-3">
              {contrato.actividades.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Sin actividad registrada</p>
              ) : (
                contrato.actividades.map((act) => {
                  const actCfg = ACTIVIDAD_ICONS[act.tipo] || ACTIVIDAD_ICONS.ESTADO_CAMBIADO;
                  return (
                    <div key={act.id} className="flex items-start gap-3">
                      <actCfg.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${actCfg.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700">{act.descripcion}</p>
                        <p className="text-xs text-gray-400">{formatDate(act.createdAt)}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Amendments */}
        {contrato.enmiendas.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 text-sm">Enmiendas</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {contrato.enmiendas.map((e) => (
                <div key={e.id} className="px-5 py-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                        {TIPO_ENMIENDA_LABELS[e.tipo] || e.tipo}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        e.estado === "ACEPTADA" ? "bg-green-100 text-green-700" :
                        e.estado === "RECHAZADA" ? "bg-red-100 text-red-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {e.estado === "PENDIENTE" ? "Pendiente" : e.estado === "ACEPTADA" ? "Aceptada" : "Rechazada"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1.5">{e.descripcion}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(e.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 line-through">{formatCurrency(e.valorAnterior)}</p>
                      <p className="text-sm font-semibold text-gray-900">{formatCurrency(e.valorNuevo)}</p>
                    </div>
                    {e.estado === "PENDIENTE" && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleEnmiendaEstado(e.id, "ACEPTADA")}
                          disabled={actionLoading === `enmienda-${e.id}`}
                          title="Aceptar enmienda"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          {actionLoading === `enmienda-${e.id}` ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <ThumbsUp className="w-3 h-3" />
                          )}
                          Aceptar
                        </button>
                        <button
                          onClick={() => handleEnmiendaEstado(e.id, "RECHAZADA")}
                          disabled={actionLoading === `enmienda-${e.id}`}
                          title="Rechazar enmienda"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          <ThumbsDown className="w-3 h-3" />
                          Rechazar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setShowCancelModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Cancelar Contrato</h3>
            <p className="text-sm text-gray-500 mb-4">Esta acción es irreversible. El contrato pasará a estado Cancelado.</p>
            <textarea
              placeholder="Motivo de cancelación..."
              value={cancelMotivo}
              onChange={(e) => setCancelMotivo(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400 outline-none mb-4"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowCancelModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Volver</button>
              <button onClick={handleCancelar} disabled={actionLoading === "cancelar"} className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
                {actionLoading === "cancelar" ? "Cancelando..." : "Confirmar Cancelación"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Amendment Modal */}
      {showEnmiendaModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setShowEnmiendaModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Nueva Enmienda</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select value={enmienda.tipo} onChange={(e) => setEnmienda({ ...enmienda, tipo: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option value="UPSELL">Upsell (añadir servicios)</option>
                  <option value="DOWNSELL">Downsell (reducir servicios)</option>
                  <option value="MODIFICACION">Modificación de condiciones</option>
                  <option value="EXTENSION">Extensión de duración</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea value={enmienda.descripcion} onChange={(e) => setEnmienda({ ...enmienda, descripcion: e.target.value })} rows={3} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Describe los cambios..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nuevo valor mensual (€)</label>
                <input type="number" step="0.01" value={enmienda.valorNuevo} onChange={(e) => setEnmienda({ ...enmienda, valorNuevo: parseFloat(e.target.value) || 0 })} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setShowEnmiendaModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Cancelar</button>
              <button onClick={handleEnmienda} disabled={actionLoading === "enmienda" || !enmienda.descripcion} className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50">
                {actionLoading === "enmienda" ? "Guardando..." : "Crear Enmienda"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
