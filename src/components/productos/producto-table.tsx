"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Package, Pencil } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency } from "@/lib/utils";

interface Producto {
  id: string;
  nombre: string;
  descripcion: string | null;
  sku: string;
  precioBase: number;
  unidad: string;
  activo: boolean;
  categoria: { id: string; nombre: string } | null;
  variantes?: Array<{ id: string; nombre: string }>;
}

interface Categoria {
  id: string;
  nombre: string;
}

export function ProductoTable({
  productos,
  categorias,
}: {
  productos: Producto[];
  categorias: Categoria[];
}) {
  const [search, setSearch] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("");

  const filtered = productos.filter((p) => {
    const matchSearch =
      !search ||
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = !categoriaFilter || p.categoria?.id === categoriaFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="bg-white rounded-xl border border-border">
      <div className="p-4 border-b border-border flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={categoriaFilter}
          onChange={(e) => setCategoriaFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
        >
          <option value="">Todas las categorias</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-gray-50/50">
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Producto
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                SKU
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Categoria
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Precio Base
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Unidad
              </th>
              <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Estado
              </th>
              <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((producto) => (
              <tr
                key={producto.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {producto.nombre}
                        {producto.variantes && producto.variantes.length > 0 && (
                          <span className="ml-2 text-[10px] font-normal px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                            {producto.variantes.length} var.
                          </span>
                        )}
                      </p>
                      {producto.descripcion && (
                        <p className="text-xs text-muted-foreground truncate max-w-[300px]">
                          {producto.descripcion}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-mono text-muted-foreground">
                  {producto.sku}
                </td>
                <td className="px-4 py-3">
                  {producto.categoria && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
                      {producto.categoria.nombre}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium text-foreground">
                  {formatCurrency(producto.precioBase)}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {producto.unidad}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                      producto.activo
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {producto.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
                    href={`/productos/${producto.id}/editar`}
                    className="inline-flex p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <EmptyState
                    variant="search"
                    title="Sin resultados"
                    description="No se encontraron productos con ese criterio de busqueda."
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
