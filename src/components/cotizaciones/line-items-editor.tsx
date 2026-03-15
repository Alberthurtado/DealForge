"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Trash2,
  Search,
  Save,
  X,
  Loader2,
  Package,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface VarianteInfo {
  id: string;
  nombre: string;
  sku: string;
  precioOverride: number | null;
  atributos: string;
}

interface Producto {
  id: string;
  nombre: string;
  sku: string;
  precioBase: number;
  unidad: string;
  variantes?: VarianteInfo[];
}

export interface LineItemInput {
  productoId: string;
  varianteId?: string;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
}

interface Props {
  initialItems: LineItemInput[];
  descuentoGlobal: number;
  impuesto: number;
  moneda: string;
  onSave: (items: LineItemInput[]) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

export function LineItemsEditor({
  initialItems,
  descuentoGlobal,
  impuesto,
  moneda,
  onSave,
  onCancel,
  saving,
}: Props) {
  const [items, setItems] = useState<LineItemInput[]>(initialItems);
  const [showCatalog, setShowCatalog] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoSearch, setProductoSearch] = useState("");
  const [expandedVariantId, setExpandedVariantId] = useState<string | null>(null);
  const [loadingProductos, setLoadingProductos] = useState(false);

  // Load products when catalog opens
  useEffect(() => {
    if (showCatalog && productos.length === 0) {
      setLoadingProductos(true);
      fetch("/api/productos")
        .then((r) => r.json())
        .then(setProductos)
        .catch(() => {})
        .finally(() => setLoadingProductos(false));
    }
  }, [showCatalog, productos.length]);

  // Calculations
  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + item.cantidad * item.precioUnitario * (1 - item.descuento / 100),
        0
      ),
    [items]
  );
  const subtotalConDescuento = subtotal * (1 - descuentoGlobal / 100);
  const totalConImpuesto = subtotalConDescuento * (1 + impuesto / 100);

  function updateItem(index: number, field: keyof LineItemInput, value: string | number) {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function addCustomLine() {
    setItems((prev) => [
      ...prev,
      { productoId: "", descripcion: "", cantidad: 1, precioUnitario: 0, descuento: 0 },
    ]);
  }

  function addProducto(producto: Producto) {
    if (producto.variantes && producto.variantes.length > 0) {
      setExpandedVariantId(expandedVariantId === producto.id ? null : producto.id);
      return;
    }
    setItems((prev) => [
      ...prev,
      {
        productoId: producto.id,
        descripcion: producto.nombre,
        cantidad: 1,
        precioUnitario: producto.precioBase,
        descuento: 0,
      },
    ]);
  }

  function addProductoConVariante(producto: Producto, variante: VarianteInfo) {
    const precio = variante.precioOverride ?? producto.precioBase;
    setItems((prev) => [
      ...prev,
      {
        productoId: producto.id,
        varianteId: variante.id,
        descripcion: `${producto.nombre} - ${variante.nombre}`,
        cantidad: 1,
        precioUnitario: precio,
        descuento: 0,
      },
    ]);
    setExpandedVariantId(null);
  }

  function addProductoSinVariante(producto: Producto) {
    setItems((prev) => [
      ...prev,
      {
        productoId: producto.id,
        descripcion: producto.nombre,
        cantidad: 1,
        precioUnitario: producto.precioBase,
        descuento: 0,
      },
    ]);
    setExpandedVariantId(null);
  }

  const filteredProductos = productos.filter(
    (p) =>
      !productoSearch ||
      p.nombre.toLowerCase().includes(productoSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productoSearch.toLowerCase())
  );

  const currencySymbol = moneda === "USD" ? "$" : moneda === "GBP" ? "£" : "€";

  return (
    <div className="space-y-4">
      {/* Editable items */}
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          No hay items. Agrega productos del catálogo o líneas personalizadas.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="p-3 border border-border rounded-lg space-y-2 bg-gray-50/50">
              <div className="flex items-start justify-between gap-2">
                <input
                  type="text"
                  value={item.descripcion}
                  onChange={(e) => updateItem(i, "descripcion", e.target.value)}
                  className="text-sm font-medium bg-white border border-border rounded px-2 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Descripción del item"
                />
                <button
                  onClick={() => removeItem(i)}
                  className="p-1.5 text-destructive hover:bg-red-50 rounded transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={item.cantidad}
                    onChange={(e) => updateItem(i, "cantidad", parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-sm border border-border rounded bg-white focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Precio ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.precioUnitario}
                    onChange={(e) => updateItem(i, "precioUnitario", parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-sm border border-border rounded bg-white focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Dto. %
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={item.descuento}
                    onChange={(e) => updateItem(i, "descuento", parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-sm border border-border rounded bg-white focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Subtotal
                  </label>
                  <p className="px-2 py-1 text-sm text-right font-medium text-foreground">
                    {formatCurrency(
                      item.cantidad * item.precioUnitario * (1 - item.descuento / 100)
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowCatalog(!showCatalog)}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2 border border-dashed border-primary/30 rounded-lg text-sm text-primary hover:bg-primary/5 transition-colors"
        >
          <Package className="w-4 h-4" />
          {showCatalog ? "Cerrar catálogo" : "Añadir del catálogo"}
        </button>
        <button
          onClick={addCustomLine}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Línea personalizada
        </button>
      </div>

      {/* Product catalog picker */}
      {showCatalog && (
        <div className="border border-primary/20 rounded-xl p-4 bg-primary/5">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={productoSearch}
              onChange={(e) => setProductoSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {loadingProductos ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredProductos.map((p) => (
                <div key={p.id}>
                  <div className="flex items-center justify-between p-3 bg-white border border-border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">
                        {p.nombre}
                        {p.variantes && p.variantes.length > 0 && (
                          <span className="ml-2 text-xs font-normal px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                            {p.variantes.length} var.
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {p.sku} &middot; {formatCurrency(p.precioBase)}/{p.unidad}
                      </p>
                    </div>
                    <button
                      onClick={() => addProducto(p)}
                      className="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {expandedVariantId === p.id && p.variantes && (
                    <div className="ml-4 mt-1 mb-2 border-l-2 border-primary/20 pl-3 space-y-1.5">
                      {p.variantes.map((v) => {
                        const attrs = (() => {
                          try { return JSON.parse(v.atributos); } catch { return {}; }
                        })();
                        return (
                          <div
                            key={v.id}
                            className="flex items-center justify-between p-2 bg-white rounded-lg"
                          >
                            <div>
                              <p className="text-sm font-medium">{v.nombre}</p>
                              <p className="text-xs text-muted-foreground">
                                {v.sku} &middot; {formatCurrency(v.precioOverride ?? p.precioBase)}
                                {Object.entries(attrs).length > 0 && (
                                  <span className="ml-1">
                                    {Object.entries(attrs).map(([k, val]) => (
                                      <span
                                        key={k}
                                        className="inline-block ml-1 px-1 py-0.5 bg-gray-100 border border-border rounded text-[10px]"
                                      >
                                        {k}: {val as string}
                                      </span>
                                    ))}
                                  </span>
                                )}
                              </p>
                            </div>
                            <button
                              onClick={() => addProductoConVariante(p, v)}
                              className="p-1 text-primary hover:bg-primary/10 rounded transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                      <button
                        onClick={() => addProductoSinVariante(p)}
                        className="w-full py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Agregar sin variante
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {filteredProductos.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No se encontraron productos
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Totals preview */}
      <div className="pt-3 border-t border-border space-y-1.5">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(Math.round(subtotal * 100) / 100)}</span>
        </div>
        {descuentoGlobal > 0 && (
          <div className="flex justify-between text-sm text-red-600">
            <span>Descuento ({descuentoGlobal}%)</span>
            <span>-{formatCurrency(Math.round((subtotal - subtotalConDescuento) * 100) / 100)}</span>
          </div>
        )}
        {impuesto > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">IVA ({impuesto}%)</span>
            <span>{formatCurrency(Math.round((totalConImpuesto - subtotalConDescuento) * 100) / 100)}</span>
          </div>
        )}
        <div className="flex justify-between text-base font-semibold pt-1.5 border-t border-border">
          <span>Total</span>
          <span>{formatCurrency(Math.round(totalConImpuesto * 100) / 100)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          onClick={onCancel}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
        >
          <X className="w-4 h-4" />
          Cancelar
        </button>
        <button
          onClick={() => onSave(items)}
          disabled={saving || items.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Guardando..." : "Guardar Items"}
        </button>
      </div>
    </div>
  );
}
