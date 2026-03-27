"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import Link from "next/link";
import { ScrollText, Clock, AlertTriangle, XCircle, CheckCircle, TrendingUp, Search } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Contrato {
  id: string;
  numero: string;
  estado: string;
  fechaInicio: string;
  fechaFin: string;
  valorMensual: number;
  valorTotal: number;
  moneda: string;
  renovacionAutomatica: boolean;
  cliente: { id: string; nombre: string };
  _count: { lineItems: number; enmiendas: number };
}

const ESTADO_CONFIG: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  ACTIVO: { label: "Activo", color: "bg-green-100 text-green-700", icon: CheckCircle },
  PENDIENTE_RENOVACION: { label: "Pendiente Renovación", color: "bg-amber-100 text-amber-700", icon: Clock },
  RENOVADO: { label: "Renovado", color: "bg-blue-100 text-blue-700", icon: TrendingUp },
  CANCELADO: { label: "Cancelado", color: "bg-red-100 text-red-700", icon: XCircle },
  EXPIRADO: { label: "Expirado", color: "bg-gray-100 text-gray-600", icon: AlertTriangle },
};

function diasRestantes(fechaFin: string): number {
  const diff = new Date(fechaFin).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function diasColor(dias: number): { bg: string; text: string; label: string } {
  if (dias <= 0) return { bg: "bg-gray-100", text: "text-gray-500", label: "Expirado" };
  if (dias <= 14) return { bg: "bg-red-100", text: "text-red-700", label: `${dias}d` };
  if (dias <= 64) return { bg: "bg-amber-100", text: "text-amber-700", label: `${dias}d` };
  return { bg: "bg-green-100", text: "text-green-700", label: `${dias}d` };
}

export default function ContratosPage() {
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (filtroEstado) params.set("estado", filtroEstado);
    fetch(`/api/contratos?${params}`)
      .then((r) => r.json())
      .then(setContratos)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filtroEstado]);

  const filtered = contratos.filter((c) => {
    if (!busqueda) return true;
    const q = busqueda.toLowerCase();
    return c.numero.toLowerCase().includes(q) || c.cliente.nombre.toLowerCase().includes(q);
  });

  // KPIs
  const activos = contratos.filter((c) => c.estado === "ACTIVO" || c.estado === "PENDIENTE_RENOVACION");
  const mrr = activos.reduce((s, c) => s + c.valorMensual, 0);
  const proximosVencer = contratos.filter((c) => c.estado === "ACTIVO" && diasRestantes(c.fechaFin) <= 30).length;
  const cancelados = contratos.filter((c) => c.estado === "CANCELADO").length;

  return (
    <div>
      <PageHeader
        title="Contratos"
        description="Gestión de contratos recurrentes y renovaciones"
      />

      <div className="p-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Contratos Activos", value: activos.length, icon: ScrollText, color: "text-green-600" },
            { label: "MRR", value: formatCurrency(mrr), icon: TrendingUp, color: "text-blue-600" },
            { label: "Próximos a Vencer", value: proximosVencer, icon: AlertTriangle, color: "text-amber-600" },
            { label: "Cancelados", value: cancelados, icon: XCircle, color: "text-red-500" },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-1">
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                <p className="text-xs text-gray-500">{kpi.label}</p>
              </div>
              <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Urgency alerts */}
        {(() => {
          const activos_ = contratos.filter((c) => ["ACTIVO", "PENDIENTE_RENOVACION"].includes(c.estado));
          const critical = activos_.filter((c) => { const d = diasRestantes(c.fechaFin); return d >= 0 && d <= 14; });
          const warning = activos_.filter((c) => { const d = diasRestantes(c.fechaFin); return d >= 15 && d <= 64; });
          return (
            <>
              {critical.length > 0 && (
                <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-800 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">Contratos críticos ({critical.length})</p>
                    <p className="text-xs text-red-600 mt-0.5">
                      {critical.map((c) => `${c.numero} (${c.cliente.nombre}) — ${diasRestantes(c.fechaFin)}d`).join(" · ")}
                    </p>
                  </div>
                </div>
              )}
              {warning.length > 0 && (
                <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 mb-4">
                  <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold">Próximos a vencer ({warning.length})</p>
                    <p className="text-xs text-amber-600 mt-0.5">
                      {warning.map((c) => `${c.numero} (${c.cliente.nombre}) — ${diasRestantes(c.fechaFin)}d`).join(" · ")}
                    </p>
                  </div>
                </div>
              )}
            </>
          );
        })()}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por número o cliente..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            />
          </div>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          >
            <option value="">Todos los estados</option>
            <option value="ACTIVO">Activos</option>
            <option value="PENDIENTE_RENOVACION">Pendiente Renovación</option>
            <option value="CANCELADO">Cancelados</option>
            <option value="EXPIRADO">Expirados</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Cargando contratos...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <ScrollText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No hay contratos</p>
            <p className="text-sm text-gray-400 mt-1">Los contratos se crean desde cotizaciones ganadas</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-semibold">Contrato</th>
                    <th className="text-left px-4 py-3 font-semibold">Cliente</th>
                    <th className="text-left px-4 py-3 font-semibold">Estado</th>
                    <th className="text-center px-4 py-3 font-semibold">Días</th>
                    <th className="text-right px-4 py-3 font-semibold">Valor/mes</th>
                    <th className="text-left px-4 py-3 font-semibold">Vencimiento</th>
                    <th className="text-left px-4 py-3 font-semibold">Renovación</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => {
                    const cfg = ESTADO_CONFIG[c.estado] || ESTADO_CONFIG.ACTIVO;
                    const dias = diasRestantes(c.fechaFin);
                    return (
                      <tr key={c.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3">
                          <Link href={`/contratos/${c.id}`} className="font-medium text-gray-900 hover:text-primary">
                            {c.numero}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{c.cliente.nombre}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color}`}>
                            <cfg.icon className="w-3 h-3" />
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {["ACTIVO", "PENDIENTE_RENOVACION"].includes(c.estado) ? (() => {
                            const dc = diasColor(dias);
                            return (
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${dc.bg} ${dc.text}`}>
                                {dias <= 14 && dias > 0 && <AlertTriangle className="w-3 h-3" />}
                                {dc.label}
                              </span>
                            );
                          })() : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-gray-900">
                          {formatCurrency(c.valorMensual)}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-gray-600">{formatDate(c.fechaFin)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs ${c.renovacionAutomatica ? "text-green-600" : "text-gray-500"}`}>
                            {c.renovacionAutomatica ? "Automática" : "Manual"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
