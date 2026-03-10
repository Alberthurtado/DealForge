"use client";

import { useState } from "react";

const inputClass =
  "w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white";

interface ProductoOption {
  id: string;
  nombre: string;
  sku: string;
}
interface Props {
  productos: ProductoOption[];
  initial?: { nombre: string; configuracion: Record<string, unknown> };
  onSave: (nombre: string, configuracion: Record<string, unknown>) => void;
  saving: boolean;
}

export function PromocionForm({ productos, initial, onSave, saving }: Props) {
  const config = initial?.configuracion || {};
  const [nombre, setNombre] = useState(initial?.nombre || "");
  const [fechaInicio, setFechaInicio] = useState((config.fechaInicio as string) || "");
  const [fechaFin, setFechaFin] = useState((config.fechaFin as string) || "");
  const [productoIds, setProductoIds] = useState<string[]>(
    (config.productoIds as string[]) || []
  );
  const [tipoPromocion, setTipoPromocion] = useState<string>(
    (config.tipoPromocion as string) || "descuento_porcentaje"
  );
  const [valor, setValor] = useState<number>((config.valor as number) ?? 10);
  const [mensaje, setMensaje] = useState((config.mensaje as string) || "");

  function toggleProducto(id: string) {
    setProductoIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(nombre, {
      fechaInicio,
      fechaFin,
      productoIds,
      tipoPromocion,
      valor,
      mensaje: mensaje || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          Nombre *
        </label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className={inputClass} required placeholder="Promo Verano 2026" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            Fecha inicio *
          </label>
          <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            Fecha fin *
          </label>
          <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} className={inputClass} required />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          Productos en promoción
        </label>
        <div className="max-h-32 overflow-y-auto border border-border rounded-lg p-2 space-y-1">
          {productos.map((p) => (
            <label key={p.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 px-1 rounded">
              <input
                type="checkbox"
                checked={productoIds.includes(p.id)}
                onChange={() => toggleProducto(p.id)}
                className="rounded"
              />
              {p.nombre} <span className="text-xs text-muted-foreground">({p.sku})</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            Tipo de promoción
          </label>
          <select value={tipoPromocion} onChange={(e) => setTipoPromocion(e.target.value)} className={inputClass}>
            <option value="descuento_porcentaje">Descuento %</option>
            <option value="precio_fijo">Precio fijo</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            {tipoPromocion === "descuento_porcentaje" ? "Descuento (%)" : "Precio (EUR)"}
          </label>
          <input type="number" min={0} value={valor} onChange={(e) => setValor(Number(e.target.value))} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          Mensaje (opcional)
        </label>
        <input type="text" value={mensaje} onChange={(e) => setMensaje(e.target.value)} className={inputClass} placeholder="20% de descuento en productos seleccionados" />
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" disabled={saving || !nombre || !fechaInicio || !fechaFin || productoIds.length === 0} className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
          {saving ? "Guardando..." : initial ? "Actualizar" : "Crear Regla"}
        </button>
      </div>
    </form>
  );
}
