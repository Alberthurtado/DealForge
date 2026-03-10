"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";

interface ApprovalData {
  aprobacion: {
    id: string;
    estado: string;
    aprobadorNombre: string;
    aprobadorEmail: string;
    comentario: string | null;
    respondidoAt: string | null;
    createdAt: string;
    reglaNombre: string;
  };
  cotizacion: {
    id: string;
    numero: string;
    total: number;
    moneda: string;
    fechaEmision: string;
    subtotal: number;
    descuentoGlobal: number;
    impuesto: number;
    cliente: string;
    lineItems: Array<{
      descripcion: string;
      cantidad: number;
      precioUnitario: number;
      descuento: number;
      total: number;
    }>;
  };
  empresa: {
    nombre: string;
    logoUrl: string | null;
    colorPrimario: string;
  };
}

export default function ApprovalPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [data, setData] = useState<ApprovalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comentario, setComentario] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resolved, setResolved] = useState(false);

  const accion = searchParams.get("accion");

  useEffect(() => {
    fetch(`/api/aprobaciones/${params.token}`)
      .then((r) => {
        if (!r.ok) throw new Error("Token inválido o expirado");
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [params.token]);

  async function handleSubmit(estado: "APROBADA" | "RECHAZADA") {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/aprobaciones/${params.token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado, comentario: comentario || null }),
      });
      if (res.ok) {
        setResolved(true);
        if (data) {
          setData({
            ...data,
            aprobacion: {
              ...data.aprobacion,
              estado,
              comentario: comentario || null,
              respondidoAt: new Date().toISOString(),
            },
          });
        }
      } else {
        const err = await res.json();
        setError(err.error || "Error al procesar la aprobación");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-4 text-center">
          <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Enlace inválido</h1>
          <p className="text-sm text-gray-500">{error || "No se encontró la aprobación solicitada."}</p>
        </div>
      </div>
    );
  }

  const { aprobacion, cotizacion, empresa } = data;
  const color = empresa.colorPrimario;
  const isPending = aprobacion.estado === "PENDIENTE" && !resolved;
  const isApproved = aprobacion.estado === "APROBADA" || (resolved && accion !== "rechazar");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-6 px-4" style={{ backgroundColor: color }}>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-white">{empresa.nombre}</h1>
          <p className="text-white/70 text-sm mt-1">Aprobación de cotización</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Status banner for already resolved */}
        {!isPending && (
          <div
            className={`rounded-xl p-6 mb-6 text-center ${
              aprobacion.estado === "APROBADA"
                ? "bg-green-50 border border-green-200"
                : aprobacion.estado === "RECHAZADA"
                  ? "bg-red-50 border border-red-200"
                  : ""
            }`}
          >
            {aprobacion.estado === "APROBADA" ? (
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            ) : (
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            )}
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Cotización {aprobacion.estado === "APROBADA" ? "aprobada" : "rechazada"}
            </h2>
            <p className="text-sm text-gray-500">
              {resolved ? "Tu respuesta ha sido registrada." : `Resuelta el ${aprobacion.respondidoAt ? formatDate(aprobacion.respondidoAt) : ""}`}
            </p>
            {aprobacion.comentario && (
              <div className="mt-3 bg-white rounded-lg p-3 inline-block">
                <p className="text-sm text-gray-600"><strong>Comentario:</strong> {aprobacion.comentario}</p>
              </div>
            )}
          </div>
        )}

        {/* Quote summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Quote header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Cotización</p>
                <h3 className="text-xl font-bold text-gray-900">{cotizacion.numero}</h3>
                <p className="text-sm text-gray-500 mt-1">{cotizacion.cliente}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Total</p>
                <p className="text-2xl font-bold" style={{ color }}>
                  {formatCurrency(cotizacion.total)}
                </p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(cotizacion.fechaEmision)}</p>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="px-6 py-4 bg-amber-50 border-b border-amber-100">
            <p className="text-sm text-amber-800">
              <strong>Regla:</strong> {aprobacion.reglaNombre}
            </p>
            <p className="text-xs text-amber-600 mt-1">
              Solicitada el {formatDate(aprobacion.createdAt)} a {aprobacion.aprobadorNombre}
            </p>
          </div>

          {/* Line items */}
          <div className="p-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 uppercase tracking-wider">
                  <th className="text-left pb-2 font-semibold">Descripción</th>
                  <th className="text-right pb-2 font-semibold">Cant.</th>
                  <th className="text-right pb-2 font-semibold">Precio</th>
                  <th className="text-right pb-2 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {cotizacion.lineItems.map((item, i) => (
                  <tr key={i} className="border-t border-gray-50">
                    <td className="py-2 text-gray-700">{item.descripcion}</td>
                    <td className="py-2 text-right text-gray-600">{item.cantidad}</td>
                    <td className="py-2 text-right text-gray-600">{formatCurrency(item.precioUnitario)}</td>
                    <td className="py-2 text-right font-medium text-gray-900">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>{formatCurrency(cotizacion.subtotal)}</span>
              </div>
              {cotizacion.descuentoGlobal > 0 && (
                <div className="flex justify-between text-sm text-red-600">
                  <span>Descuento ({cotizacion.descuentoGlobal}%)</span>
                  <span>-{formatCurrency(cotizacion.subtotal * (cotizacion.descuentoGlobal / 100))}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-500">
                <span>IVA ({cotizacion.impuesto}%)</span>
                <span>
                  {formatCurrency(
                    cotizacion.subtotal * (1 - cotizacion.descuentoGlobal / 100) * (cotizacion.impuesto / 100)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span>Total</span>
                <span style={{ color }}>{formatCurrency(cotizacion.total)}</span>
              </div>
            </div>
          </div>

          {/* Action area */}
          {isPending && (
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Comentario (opcional)
                </label>
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white resize-none"
                  placeholder="Añade un comentario..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleSubmit("APROBADA")}
                  disabled={submitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  Aprobar
                </button>
                <button
                  onClick={() => handleSubmit("RECHAZADA")}
                  disabled={submitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                  Rechazar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          {empresa.nombre} &bull; DealForge
        </p>
      </div>
    </div>
  );
}
