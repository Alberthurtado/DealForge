"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const inputClass =
  "w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white";

interface Condicion {
  tipo: "descuento_linea" | "descuento_global" | "monto_total";
  umbral: number;
  operador: "mayor_que" | "mayor_igual";
}

interface Props {
  initial?: { nombre: string; configuracion: Record<string, unknown> };
  onSave: (nombre: string, configuracion: Record<string, unknown>) => void;
  saving: boolean;
}

export function AprobacionForm({ initial, onSave, saving }: Props) {
  const config = initial?.configuracion || {};
  const aprobador = config.aprobador as { nombre?: string; email?: string } | undefined;

  const [nombre, setNombre] = useState(initial?.nombre || "");
  const [condiciones, setCondiciones] = useState<Condicion[]>(
    (config.condiciones as Condicion[]) || [
      { tipo: "descuento_global", umbral: 20, operador: "mayor_que" },
    ]
  );
  const [aprobNombre, setAprobNombre] = useState(aprobador?.nombre || "");
  const [aprobEmail, setAprobEmail] = useState(aprobador?.email || "");

  function updateCondicion(index: number, field: keyof Condicion, value: unknown) {
    setCondiciones((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  }

  function addCondicion() {
    setCondiciones((prev) => [
      ...prev,
      { tipo: "descuento_global", umbral: 10, operador: "mayor_que" },
    ]);
  }

  function removeCondicion(index: number) {
    setCondiciones((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(nombre, {
      condiciones,
      aprobador: { nombre: aprobNombre, email: aprobEmail },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          Nombre *
        </label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className={inputClass} required placeholder="Aprobación Dir. Comercial" />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-muted-foreground">Condiciones</label>
          <button type="button" onClick={addCondicion} className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80">
            <Plus className="w-3 h-3" /> Agregar
          </button>
        </div>
        <div className="space-y-2">
          {condiciones.map((cond, i) => (
            <div key={i} className="flex items-center gap-2">
              <select
                value={cond.tipo}
                onChange={(e) => updateCondicion(i, "tipo", e.target.value)}
                className="flex-1 px-2 py-1.5 text-sm border border-border rounded-lg bg-white"
              >
                <option value="descuento_linea">Descuento línea</option>
                <option value="descuento_global">Descuento global</option>
                <option value="monto_total">Monto total</option>
              </select>
              <select
                value={cond.operador}
                onChange={(e) => updateCondicion(i, "operador", e.target.value)}
                className="w-16 px-2 py-1.5 text-sm border border-border rounded-lg bg-white"
              >
                <option value="mayor_que">&gt;</option>
                <option value="mayor_igual">&ge;</option>
              </select>
              <input
                type="number"
                value={cond.umbral}
                onChange={(e) => updateCondicion(i, "umbral", Number(e.target.value))}
                className="w-24 px-2 py-1.5 text-sm border border-border rounded-lg bg-white"
                min={0}
              />
              <span className="text-xs text-muted-foreground">
                {cond.tipo === "monto_total" ? "EUR" : "%"}
              </span>
              {condiciones.length > 1 && (
                <button type="button" onClick={() => removeCondicion(i)} className="text-muted-foreground hover:text-red-500">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <label className="block text-xs font-medium text-muted-foreground mb-2">
          Aprobador
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Nombre *</label>
            <input type="text" value={aprobNombre} onChange={(e) => setAprobNombre(e.target.value)} className={inputClass} required placeholder="Ana García" />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">Email *</label>
            <input type="email" value={aprobEmail} onChange={(e) => setAprobEmail(e.target.value)} className={inputClass} required placeholder="ana@empresa.es" />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" disabled={saving || !nombre || !aprobNombre || !aprobEmail} className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50">
          {saving ? "Guardando..." : initial ? "Actualizar" : "Crear Regla"}
        </button>
      </div>
    </form>
  );
}
