"use client";

import { useState } from "react";
import { AlertTriangle, UserCheck, Tag, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Violacion, AprobacionRequerida, PromocionAplicable } from "@/lib/reglas-engine";

interface ProductoInfo {
  id: string;
  nombre: string;
  precioBase: number;
}

interface AprobacionExistente {
  id: string;
  reglaId: string;
  aprobadorNombre: string;
  aprobadorEmail: string;
  estado: string;
}

interface Props {
  violaciones: Violacion[];
  aprobacionesRequeridas: AprobacionRequerida[];
  promocionesAplicables: PromocionAplicable[];
  aprobacionesExistentes?: AprobacionExistente[];
  productosDisponibles?: ProductoInfo[];
  onAddProducto?: (productoId: string, cantidad: number, precioUnitario: number) => void;
  onApplyPromocion?: (promocion: PromocionAplicable) => void;
}

function AddProductoInline({
  producto,
  onAdd,
}: {
  producto: ProductoInfo;
  onAdd: (cantidad: number, precio: number) => void;
}) {
  const [cantidad, setCantidad] = useState(1);
  const [precio, setPrecio] = useState(producto.precioBase);

  return (
    <div className="flex items-center gap-2 mt-1.5 ml-4">
      <span className="text-xs text-amber-700 font-medium truncate max-w-[140px]" title={producto.nombre}>
        {producto.nombre}
      </span>
      <div className="flex items-center gap-1">
        <label className="text-[10px] text-amber-500">Cant:</label>
        <input
          type="number"
          min="1"
          step="1"
          value={cantidad}
          onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-14 px-1.5 py-0.5 text-xs border border-amber-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
        />
      </div>
      <div className="flex items-center gap-1">
        <label className="text-[10px] text-amber-500">Precio:</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(parseFloat(e.target.value) || 0)}
          className="w-20 px-1.5 py-0.5 text-xs border border-amber-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-amber-400"
        />
      </div>
      <button
        onClick={() => onAdd(cantidad, precio)}
        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
      >
        <Plus className="w-3 h-3" />
        Incluir
      </button>
    </div>
  );
}

export function ReglasWarnings({
  violaciones,
  aprobacionesRequeridas,
  promocionesAplicables,
  aprobacionesExistentes = [],
  productosDisponibles = [],
  onAddProducto,
  onApplyPromocion,
}: Props) {
  if (violaciones.length === 0 && aprobacionesRequeridas.length === 0 && promocionesAplicables.length === 0) {
    return null;
  }

  const productoMap = new Map(productosDisponibles.map((p) => [p.id, p]));

  // Cross-reference required approvals with existing ones
  const allApproved = aprobacionesRequeridas.length > 0 &&
    aprobacionesRequeridas.every((req) =>
      aprobacionesExistentes.some(
        (ex) => ex.reglaId === req.reglaId && ex.estado === "APROBADA"
      )
    );
  const someRejected = aprobacionesExistentes.some((ex) => ex.estado === "RECHAZADA");
  const allPending = aprobacionesRequeridas.length > 0 &&
    !allApproved &&
    !someRejected &&
    aprobacionesExistentes.some((ex) => ex.estado === "PENDIENTE");

  return (
    <div className="space-y-3">
      {/* Violations */}
      {violaciones.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">
              Advertencias de reglas ({violaciones.length})
            </span>
          </div>
          <ul className="space-y-2">
            {violaciones.map((v, i) => (
              <li key={i}>
                <div className="text-xs text-amber-700 flex items-start gap-1.5">
                  <span className="text-amber-400 mt-0.5">&#8226;</span>
                  <span>
                    <strong>{v.reglaNombre}:</strong> {v.mensaje}
                  </span>
                </div>
                {/* Inline add buttons for missing required products */}
                {v.tipo === "PRODUCTO_OBLIGATORIO" &&
                  v.productosFaltantes &&
                  v.productosFaltantes.length > 0 &&
                  onAddProducto && (
                    <div className="space-y-1.5 mt-1">
                      {v.productosFaltantes.map((pid) => {
                        const prod = productoMap.get(pid);
                        if (!prod) return null;
                        return (
                          <AddProductoInline
                            key={pid}
                            producto={prod}
                            onAdd={(cant, precio) => onAddProducto(pid, cant, precio)}
                          />
                        );
                      })}
                    </div>
                  )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Approval requirements */}
      {aprobacionesRequeridas.length > 0 && (
        allApproved ? (
          /* All approvals completed */
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Todas las aprobaciones completadas
              </span>
            </div>
            <ul className="space-y-1 mt-2">
              {aprobacionesRequeridas.map((a, i) => {
                const existing = aprobacionesExistentes.find(
                  (ex) => ex.reglaId === a.reglaId && ex.estado === "APROBADA"
                );
                return (
                  <li key={i} className="text-xs text-green-700 flex items-start gap-1.5">
                    <span className="text-green-500 mt-0.5">&#10003;</span>
                    <span>
                      <strong>{existing?.aprobadorNombre || a.aprobador.nombre}</strong> ha aprobado &mdash; {a.razon}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : someRejected ? (
          /* Some approvals rejected */
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">
                Aprobacion rechazada
              </span>
            </div>
            <ul className="space-y-1">
              {aprobacionesExistentes
                .filter((ex) => ex.estado === "RECHAZADA")
                .map((ex) => (
                  <li key={ex.id} className="text-xs text-red-700 flex items-start gap-1.5">
                    <span className="text-red-400 mt-0.5">&#10007;</span>
                    <span>
                      <strong>{ex.aprobadorNombre}</strong> ({ex.aprobadorEmail}) ha rechazado la cotizacion
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ) : allPending ? (
          /* Approvals sent, waiting for response */
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">
                Pendiente de aprobacion ({aprobacionesRequeridas.length})
              </span>
            </div>
            <ul className="space-y-1">
              {aprobacionesRequeridas.map((a, i) => (
                <li key={i} className="text-xs text-amber-700 flex items-start gap-1.5">
                  <span className="text-amber-400 mt-0.5">&#8226;</span>
                  <span>
                    Esperando respuesta de <strong>{a.aprobador.nombre}</strong> ({a.aprobador.email})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          /* No approvals created yet — show required */
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                Aprobaciones requeridas ({aprobacionesRequeridas.length})
              </span>
            </div>
            <ul className="space-y-1">
              {aprobacionesRequeridas.map((a, i) => (
                <li key={i} className="text-xs text-blue-700 flex items-start gap-1.5">
                  <span className="text-blue-400 mt-0.5">&#8226;</span>
                  <span>
                    <strong>{a.aprobador.nombre}</strong> ({a.aprobador.email}) &mdash; {a.razon}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )
      )}

      {/* Available promotions */}
      {promocionesAplicables.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Promociones disponibles ({promocionesAplicables.length})
            </span>
          </div>
          <ul className="space-y-2">
            {promocionesAplicables.map((p, i) => (
              <li key={i}>
                <div className="text-xs text-green-700 flex items-start gap-1.5">
                  <span className="text-green-400 mt-0.5">&#8226;</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span>
                      <strong>{p.reglaNombre}:</strong> {p.mensaje} ({p.tipoPromocion === "descuento_porcentaje" ? `${p.valor}%` : `${p.valor} EUR`})
                    </span>
                    {onApplyPromocion && (
                      <button
                        onClick={() => onApplyPromocion(p)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        <Tag className="w-3 h-3" />
                        Aplicar
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
