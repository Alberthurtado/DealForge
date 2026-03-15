"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CheckCircle, XCircle, Loader2, Eraser, PenTool } from "lucide-react";

interface SignatureData {
  firma: {
    id: string;
    signerName: string;
    signerEmail: string;
    signedAt: string | null;
    createdAt: string;
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
    condiciones: string | null;
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

export default function SignaturePage() {
  const params = useParams();
  const [data, setData] = useState<SignatureData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [signed, setSigned] = useState(false);

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const hasDrawn = useRef(false);

  useEffect(() => {
    fetch(`/api/firmas/${params.token}`)
      .then((r) => {
        if (!r.ok) throw new Error("Token inválido o expirado");
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [params.token]);

  // Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data || data.firma.signedAt) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas resolution
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#1a1a1a";
  }, [data]);

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const startDraw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDrawing.current = true;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }, [getPos]);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    hasDrawn.current = true;
  }, [getPos]);

  const stopDraw = useCallback(() => {
    isDrawing.current = false;
  }, []);

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawn.current = false;
  }

  async function handleSign() {
    if (!hasDrawn.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    setSubmitting(true);
    try {
      const signatureData = canvas.toDataURL("image/png");

      const res = await fetch(`/api/firmas/${params.token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signatureData }),
      });

      if (res.ok) {
        setSigned(true);
        const result = await res.json();
        if (data) {
          setData({
            ...data,
            firma: {
              ...data.firma,
              signedAt: result.signedAt,
            },
          });
        }
      } else {
        const err = await res.json();
        setError(err.error || "Error al firmar");
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
          <p className="text-sm text-gray-500">{error || "No se encontró la firma solicitada."}</p>
        </div>
      </div>
    );
  }

  const { firma, cotizacion, empresa } = data;
  const color = empresa.colorPrimario;
  const isSigned = !!firma.signedAt || signed;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-6 px-4" style={{ backgroundColor: color }}>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-white">{empresa.nombre}</h1>
          <p className="text-white/70 text-sm mt-1">Firma electrónica de cotización</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Signed banner */}
        {isSigned && (
          <div className="rounded-xl p-6 mb-6 text-center bg-green-50 border border-green-200">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-gray-900 mb-1">Cotización firmada</h2>
            <p className="text-sm text-gray-500">
              {signed
                ? "Su firma ha sido registrada correctamente."
                : `Firmada el ${firma.signedAt ? formatDate(firma.signedAt) : ""}`}
            </p>
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
              {cotizacion.impuesto > 0 && (
                <div className="flex justify-between text-sm text-gray-500">
                  <span>IVA ({cotizacion.impuesto}%)</span>
                  <span>
                    {formatCurrency(
                      cotizacion.subtotal * (1 - cotizacion.descuentoGlobal / 100) * (cotizacion.impuesto / 100)
                    )}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span>Total</span>
                <span style={{ color }}>{formatCurrency(cotizacion.total)}</span>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          {cotizacion.condiciones && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Términos y Condiciones</p>
              <p className="text-xs text-gray-600 whitespace-pre-line">{cotizacion.condiciones}</p>
            </div>
          )}

          {/* Signature area */}
          {!isSigned && (
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <PenTool className="w-4 h-4" />
                  Firma de {firma.signerName}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Dibuje su firma en el recuadro a continuación
                </p>

                <div className="relative bg-white border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    className="w-full touch-none cursor-crosshair"
                    style={{ height: "160px" }}
                    onMouseDown={startDraw}
                    onMouseMove={draw}
                    onMouseUp={stopDraw}
                    onMouseLeave={stopDraw}
                    onTouchStart={startDraw}
                    onTouchMove={draw}
                    onTouchEnd={stopDraw}
                  />
                  <button
                    onClick={clearCanvas}
                    className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-500 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                  >
                    <Eraser className="w-3 h-3" />
                    Limpiar
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 mb-4">
                Al firmar, acepto los términos de la cotización {cotizacion.numero} y confirmo que la información proporcionada es correcta.
              </p>

              <button
                onClick={handleSign}
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                style={{ backgroundColor: color }}
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <PenTool className="w-4 h-4" />
                )}
                {submitting ? "Firmando..." : "Firmar cotización"}
              </button>
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
