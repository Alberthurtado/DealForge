"use client";

import { useState } from "react";
import { Save, Plus, Trash2, X, FolderPlus, Loader2 } from "lucide-react";

interface VarianteInput {
  id?: string;
  nombre: string;
  sku: string;
  precioOverride: number | null;
  atributos: Record<string, string>;
  activo: boolean;
}

interface ProductoFormData {
  nombre: string;
  descripcion: string;
  sku: string;
  precioBase: number;
  unidad: string;
  tipoFacturacion: string;
  frecuencia: string | null;
  activo: boolean;
  categoriaId: string;
}

interface Props {
  initialData?: Partial<ProductoFormData> & {
    variantes?: Array<{
      id: string;
      nombre: string;
      sku: string;
      precioOverride: number | null;
      atributos: string;
      activo: boolean;
    }>;
  };
  categorias: Array<{ id: string; nombre: string }>;
  onCategoriasChange?: (categorias: Array<{ id: string; nombre: string }>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  saving?: boolean;
}

function parseAtributos(raw: string): Record<string, string> {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function ProductoForm({ initialData, categorias, onCategoriasChange, onSubmit, saving }: Props) {
  const [showNewCategoria, setShowNewCategoria] = useState(false);
  const [newCategoriaName, setNewCategoriaName] = useState("");
  const [creatingCategoria, setCreatingCategoria] = useState(false);
  const [categoriaError, setCategoriaError] = useState("");

  async function handleCreateCategoria() {
    const name = newCategoriaName.trim();
    if (!name) return;

    setCreatingCategoria(true);
    setCategoriaError("");
    try {
      const res = await fetch("/api/categorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: name }),
      });
      if (res.ok) {
        const cat = await res.json();
        onCategoriasChange?.([...categorias, cat].sort((a, b) => a.nombre.localeCompare(b.nombre)));
        setForm((f) => ({ ...f, categoriaId: cat.id }));
        setNewCategoriaName("");
        setShowNewCategoria(false);
      } else {
        const err = await res.json();
        setCategoriaError(err.error || "Error al crear categoría");
      }
    } catch {
      setCategoriaError("Error de conexión");
    } finally {
      setCreatingCategoria(false);
    }
  }

  const [form, setForm] = useState<ProductoFormData>({
    nombre: initialData?.nombre || "",
    descripcion: initialData?.descripcion || "",
    sku: initialData?.sku || "",
    precioBase: initialData?.precioBase || 0,
    unidad: initialData?.unidad || "unidad",
    tipoFacturacion: initialData?.tipoFacturacion || "UNICO",
    frecuencia: initialData?.frecuencia || null,
    activo: initialData?.activo ?? true,
    categoriaId: initialData?.categoriaId || "",
  });

  const [variantes, setVariantes] = useState<VarianteInput[]>(
    initialData?.variantes?.map((v) => ({
      id: v.id,
      nombre: v.nombre,
      sku: v.sku,
      precioOverride: v.precioOverride,
      atributos: parseAtributos(v.atributos),
      activo: v.activo,
    })) || []
  );

  const inputClass =
    "w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring";

  function addVariante() {
    setVariantes((v) => [
      ...v,
      { nombre: "", sku: "", precioOverride: null, atributos: {}, activo: true },
    ]);
  }

  function removeVariante(index: number) {
    setVariantes((v) => v.filter((_, i) => i !== index));
  }

  function updateVariante(index: number, updates: Partial<VarianteInput>) {
    setVariantes((v) => v.map((item, i) => (i === index ? { ...item, ...updates } : item)));
  }

  function addAtributo(index: number) {
    const current = variantes[index].atributos;
    const key = `attr_${Object.keys(current).length + 1}`;
    updateVariante(index, { atributos: { ...current, [key]: "" } });
  }

  function removeAtributo(varIndex: number, key: string) {
    const current = { ...variantes[varIndex].atributos };
    delete current[key];
    updateVariante(varIndex, { atributos: current });
  }

  function updateAtributoKey(varIndex: number, oldKey: string, newKey: string) {
    const current = variantes[varIndex].atributos;
    const entries = Object.entries(current).map(([k, v]) =>
      k === oldKey ? [newKey, v] : [k, v]
    );
    updateVariante(varIndex, { atributos: Object.fromEntries(entries) });
  }

  function updateAtributoValue(varIndex: number, key: string, value: string) {
    updateVariante(varIndex, {
      atributos: { ...variantes[varIndex].atributos, [key]: value },
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      ...form,
      variantes: variantes.map((v) => ({
        id: v.id,
        nombre: v.nombre,
        sku: v.sku,
        precioOverride: v.precioOverride,
        atributos: JSON.stringify(v.atributos),
        activo: v.activo,
      })),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded-xl border border-border p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Nombre del Producto *
          </label>
          <input
            type="text"
            required
            value={form.nombre}
            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
            className={inputClass}
            placeholder="Ej: Licencia ERP Base"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Descripción
          </label>
          <textarea
            value={form.descripcion}
            onChange={(e) =>
              setForm((f) => ({ ...f, descripcion: e.target.value }))
            }
            className={inputClass}
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              SKU *
            </label>
            <input
              type="text"
              required
              value={form.sku}
              onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
              className={inputClass}
              placeholder="SW-ERP-001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Categoría
            </label>
            <div className="flex items-center gap-2">
              <select
                value={form.categoriaId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, categoriaId: e.target.value }))
                }
                className={`${inputClass} flex-1`}
              >
                <option value="">Sin categoría</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowNewCategoria(!showNewCategoria)}
                className="flex-shrink-0 p-2 text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
                title="Crear nueva categoría"
              >
                <FolderPlus className="w-4 h-4" />
              </button>
            </div>
            {showNewCategoria && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-border space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newCategoriaName}
                    onChange={(e) => setNewCategoriaName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleCreateCategoria();
                      }
                    }}
                    className={`${inputClass} flex-1`}
                    placeholder="Nombre de la categoría"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleCreateCategoria}
                    disabled={creatingCategoria || !newCategoriaName.trim()}
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
                  >
                    {creatingCategoria ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                    Crear
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewCategoria(false);
                      setNewCategoriaName("");
                      setCategoriaError("");
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                {categoriaError && (
                  <p className="text-xs text-red-500">{categoriaError}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Precio Base *
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={form.precioBase}
              onChange={(e) =>
                setForm((f) => ({ ...f, precioBase: parseFloat(e.target.value) || 0 }))
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Unidad
            </label>
            <select
              value={form.unidad}
              onChange={(e) =>
                setForm((f) => ({ ...f, unidad: e.target.value }))
              }
              className={inputClass}
            >
              <option value="unidad">Unidad</option>
              <option value="hora">Hora</option>
              <option value="mes">Mes</option>
              <option value="licencia/ano">Licencia/Año</option>
              <option value="kg">Kg</option>
              <option value="m2">m2</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Tipo de facturación
            </label>
            <select
              value={form.tipoFacturacion}
              onChange={(e) => {
                const value = e.target.value;
                setForm((f) => ({
                  ...f,
                  tipoFacturacion: value,
                  frecuencia: value === "UNICO" ? null : f.frecuencia,
                }));
              }}
              className={inputClass}
            >
              <option value="UNICO">Único</option>
              <option value="RECURRENTE">Recurrente</option>
            </select>
          </div>
          {form.tipoFacturacion === "RECURRENTE" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Frecuencia
              </label>
              <select
                value={form.frecuencia || ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, frecuencia: e.target.value || null }))
                }
                className={inputClass}
              >
                <option value="">Seleccionar...</option>
                <option value="MENSUAL">Mensual</option>
                <option value="TRIMESTRAL">Trimestral</option>
                <option value="ANUAL">Anual</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="activo"
            checked={form.activo}
            onChange={(e) =>
              setForm((f) => ({ ...f, activo: e.target.checked }))
            }
            className="rounded"
          />
          <label htmlFor="activo" className="text-sm text-foreground">
            Producto activo
          </label>
        </div>
      </div>

      {/* Variantes Section */}
      <div className="bg-white rounded-xl border border-border p-6 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">
            Variantes
            {variantes.length > 0 && (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                ({variantes.length})
              </span>
            )}
          </h3>
          <button
            type="button"
            onClick={addVariante}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Agregar Variante
          </button>
        </div>

        {variantes.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Sin variantes. Agrega variantes si este producto tiene opciones como color, talla o configuración.
          </p>
        ) : (
          <div className="space-y-4">
            {variantes.map((variante, idx) => (
              <div
                key={idx}
                className="border border-border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground uppercase">
                    Variante {idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeVariante(idx)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      required
                      value={variante.nombre}
                      onChange={(e) => updateVariante(idx, { nombre: e.target.value })}
                      className={inputClass}
                      placeholder="Ej: Rojo / L"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">
                      SKU *
                    </label>
                    <input
                      type="text"
                      required
                      value={variante.sku}
                      onChange={(e) => updateVariante(idx, { sku: e.target.value })}
                      className={inputClass}
                      placeholder="SW-ERP-001-ROJO"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">
                      Precio Override
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={variante.precioOverride ?? ""}
                      onChange={(e) =>
                        updateVariante(idx, {
                          precioOverride: e.target.value ? parseFloat(e.target.value) : null,
                        })
                      }
                      className={inputClass}
                      placeholder={`Usa precio base (${form.precioBase})`}
                    />
                  </div>
                </div>

                {/* Atributos */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-muted-foreground">
                      Atributos
                    </label>
                    <button
                      type="button"
                      onClick={() => addAtributo(idx)}
                      className="text-xs text-primary hover:underline"
                    >
                      + Agregar atributo
                    </button>
                  </div>
                  {Object.entries(variante.atributos).length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">Sin atributos</p>
                  ) : (
                    <div className="space-y-1.5">
                      {Object.entries(variante.atributos).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={key}
                            onChange={(e) => updateAtributoKey(idx, key, e.target.value)}
                            className="w-1/3 px-2 py-1 text-xs border border-border rounded focus:outline-none focus:ring-1 focus:ring-ring"
                            placeholder="Clave"
                          />
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => updateAtributoValue(idx, key, e.target.value)}
                            className="flex-1 px-2 py-1 text-xs border border-border rounded focus:outline-none focus:ring-1 focus:ring-ring"
                            placeholder="Valor"
                          />
                          <button
                            type="button"
                            onClick={() => removeAtributo(idx, key)}
                            className="p-0.5 text-muted-foreground hover:text-red-500 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={variante.activo}
                    onChange={(e) => updateVariante(idx, { activo: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-xs text-muted-foreground">Activa</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? "Guardando..." : "Guardar Producto"}
        </button>
      </div>
    </form>
  );
}
