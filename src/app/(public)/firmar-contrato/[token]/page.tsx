"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, CheckCircle, XCircle, FileText, PenLine } from "lucide-react";

interface FirmaData {
  firma: {
    id: string;
    signerName: string;
    signerEmail: string;
    signedAt: string | null;
    createdAt: string;
  };
  contrato: {
    id: string;
    numero: string;
    valorTotal: number;
    moneda: string;
    fechaInicio: string;
    fechaFin: string;
    documentoHtml: string | null;
    cliente: string;
  };
  empresa: {
    nombre: string;
    logoUrl?: string;
    colorPrimario: string;
  };
}

export default function FirmarContratoPage() {
  const params = useParams();
  const token = params.token as string;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [firmaData, setFirmaData] = useState<FirmaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [signed, setSigned] = useState(false);
  const [showDocument, setShowDocument] = useState(false);

  useEffect(() => {
    async function loadFirma() {
      try {
        const res = await fetch(`/api/firmas/${token}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Enlace inválido");
        } else if (data.tipo !== "contrato") {
          setError("Este enlace no corresponde a un contrato");
        } else {
          setFirmaData(data);
          if (data.firma.signedAt) setSigned(true);
        }
      } catch {
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    }
    loadFirma();
  }, [token]);

  // Canvas drawing helpers
  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  }

  function stopDraw() {
    setIsDrawing(false);
  }

  function clearSignature() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  }

  async function handleSubmit() {
    if (!hasSignature || !canvasRef.current) return;
    setSubmitting(true);

    try {
      const signatureData = canvasRef.current.toDataURL("image/png");
      const res = await fetch(`/api/firmas/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signatureData }),
      });

      if (res.ok) {
        setSigned(true);
      } else {
        const data = await res.json();
        setError(data.error || "Error al firmar");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setSubmitting(false);
    }
  }

  // Setup canvas styles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [firmaData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#3a9bb5]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-7 h-7 text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Enlace inválido</h1>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (signed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-7 h-7 text-green-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Contrato firmado</h1>
          <p className="text-gray-500">
            El contrato <strong>{firmaData?.contrato.numero}</strong> ha sido firmado correctamente.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Recibirás una confirmación en {firmaData?.firma.signerEmail}.
          </p>
        </div>
      </div>
    );
  }

  const color = firmaData?.empresa.colorPrimario || "#3a9bb5";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div style={{ background: color }} className="py-4 px-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-white font-semibold text-lg">{firmaData?.empresa.nombre}</p>
            <p className="text-white/70 text-sm">Firma electrónica de contrato</p>
          </div>
          <PenLine className="w-6 h-6 text-white/80" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Contract summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
              <FileText className="w-5 h-5" style={{ color }} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Contrato {firmaData?.contrato.numero}</h2>
              <p className="text-sm text-gray-500">{firmaData?.empresa.nombre} → {firmaData?.contrato.cliente}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-500 text-xs mb-1">Firmante</p>
              <p className="font-medium text-gray-900">{firmaData?.firma.signerName}</p>
              <p className="text-gray-500 text-xs">{firmaData?.firma.signerEmail}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-gray-500 text-xs mb-1">Valor total</p>
              <p className="font-bold text-gray-900" style={{ color }}>
                {new Intl.NumberFormat("es-ES", {
                  style: "currency",
                  currency: firmaData?.contrato.moneda || "EUR",
                }).format(firmaData?.contrato.valorTotal || 0)}
              </p>
            </div>
          </div>

          {firmaData?.contrato.documentoHtml && (
            <button
              onClick={() => setShowDocument(!showDocument)}
              className="mt-3 text-sm font-medium flex items-center gap-1.5 hover:opacity-80 transition-opacity"
              style={{ color }}
            >
              <FileText className="w-4 h-4" />
              {showDocument ? "Ocultar documento" : "Ver documento completo"}
            </button>
          )}
        </div>

        {/* Document preview */}
        {showDocument && firmaData?.contrato.documentoHtml && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div
              className="p-4 max-h-[500px] overflow-y-auto text-sm"
              dangerouslySetInnerHTML={{ __html: firmaData.contrato.documentoHtml }}
            />
          </div>
        )}

        {/* Signature canvas */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Tu firma</h3>
            {hasSignature && (
              <button
                onClick={clearSignature}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Limpiar
              </button>
            )}
          </div>
          <div className="border-2 border-dashed border-gray-200 rounded-lg overflow-hidden bg-gray-50">
            <canvas
              ref={canvasRef}
              width={560}
              height={160}
              className="w-full cursor-crosshair touch-none"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
          </div>
          {!hasSignature && (
            <p className="text-xs text-gray-400 mt-2 text-center">Dibuja tu firma en el recuadro</p>
          )}
        </div>

        {/* eIDAS disclaimer */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-xs text-blue-700 leading-relaxed">
            <strong>Firma electrónica conforme al Reglamento eIDAS (UE) 910/2014.</strong>{" "}
            Al firmar, aceptas el contenido del contrato y confirmas que actúas en tu nombre o
            con autorización suficiente. Esta firma tiene valor legal equivalente a una firma manuscrita
            en el ámbito de la Unión Europea. Se registran: fecha, hora e IP de la firma.
          </p>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!hasSignature || submitting}
          className="w-full py-3.5 text-sm font-bold text-white rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: hasSignature ? color : undefined, backgroundColor: !hasSignature ? "#9ca3af" : undefined }}
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Firmando...
            </span>
          ) : (
            "Firmar contrato"
          )}
        </button>

        <p className="text-center text-xs text-gray-400 pb-6">
          Powered by DealForge &mdash; Firma electrónica segura
        </p>
      </div>
    </div>
  );
}
