"use client";

import { useState } from "react";

const inputClass =
  "w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white";

interface ProductoOption {
  id: string;
  nombre: string;
  sku: string;
  categoria: { id: string; nombre: string } | null;
}
interface CategoriaOption {
  id: string;
  nombre: string;
}
interface Props {
  productos: ProductoOption[];
  categorias: CategoriaOption[];
  initial?: { nombre: string; configuracion: Record<string, unknown> };
  onSave: (nombre: string, configuracion: Record<string, unknown>) => void;
  saving: boolean;
}

export function ProductoObligatorioForm({ productos, categorias, initial, onSave, saving }: Props) {
  const config = initial?.configuracion || {};
  const condicion = config.condicion as { tipo?: string; ids?: string[] } | undefined;

  const [nombre, setNombre] = useState(initial?.nombre || "");
  const [condTipo, setCondTipo] = useState<string>(condicion?.tipo || "producto");
  const [condIds, setCondIds] = useState<string[]>(condicion?.ids || []);
  const [requeridos, setRequeridos] = useState<string[]>(
    (config.productosRequeridos as string[]) || []
  );
  const [mensaje, setMensaje] = useState((config.mensaje as string) || "");

  function toggleId(list: string[], setList: (v: string[]) => void, id: string) {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(nombre, {
      condicion: { tipo: condTipo, ids: condIds },
      productosRequeridos: requeridos,
      mensaje: mensaje || undefined,
    });
  }

  const options = condTipo === "producto" ? productos : categorias;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          Nombre *
        </label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className={inputClass} required placeholder="Soporte obligatorio con licencias" />
      </div>

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          Cuando la cotizacion incluye...
        </label>
        <select value={condTipo} onChange={(e) => { setCondTipo(e.target.value); setCondIds([]); }} className={inputClass}>
          <option value="producto">Un producto especifico</option>
          <option value="categoria">Una categoria</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          Seleccionar {condTipo === "producto" ? "productos" : "categorias"} disparadores
        </label>
        <div className="max-h-32 overflow-y-auto border border-border rounded-lg p-2 space-y-1">
          {options.map((opt) => (
            <label key={opt.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 px-1 rounded">
              <input
                type="checkbox"
                checked={condIds.includes(opt.id)}
                onChange={() => toggleId(condIds, setCondIds, opt.id)}
                className="rounded"
              />
              {opt.nombre}
            </label>
          ))}
          {options.length === 0 && <p className="text-xs text-muted-foreground">No hay opciones</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          Productos requeridos (obligatorios)
        </label>
        <div className="max-h-32 overflow-y-auto border border-border rounded-lg p-2 space-y-1">
          {productos.map((p) => (
            <label key={p.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 px-1 rounded">
              <input
                type="checkbox"
                checked={requeridos.includes(p.id)}
                onChange={() => toggleId(requeridos, setRequeridos, p.id)}
                className="rounded"
              />
              {p.nombre} <span className="text-xs text-muted-foreground">({p.sku})</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          Mensaje personalizado (opcional)
        </label>
        <input type="text" value={mensaje} onChange={(e) => setMensaje(e.target.value)} className={inputClass} placeholder="Soporte Basico es obligatorio con licencias" />
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" disabled={saving || !nombre || condIds.length === 0 || requeridos.length === 0} className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
          {saving ? "Guardando..." : initial ? "Actualizar" : "Crear Regla"}
        </button>
      </div>
    </form>
  );
}
