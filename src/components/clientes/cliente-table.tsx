"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Building2, ArrowUpDown } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency } from "@/lib/utils";

interface ClienteRow {
  id: string;
  nombre: string;
  email: string | null;
  telefono: string | null;
  ciudad: string | null;
  sector: string | null;
  contactoPrincipal: string;
  totalCotizaciones: number;
  totalIngresos: number;
}

export function ClienteTable({ clientes }: { clientes: ClienteRow[] }) {
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");

  const sectores = [...new Set(clientes.map((c) => c.sector).filter(Boolean))];

  const filtered = clientes.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      c.nombre.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.ciudad?.toLowerCase().includes(q) ||
      c.contactoPrincipal?.toLowerCase().includes(q);
    const matchSector = !sectorFilter || c.sector === sectorFilter;
    return matchSearch && matchSector;
  });

  return (
    <div className="bg-white rounded-xl border border-border">
      {/* Filters */}
      <div className="p-4 border-b border-border flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nombre, contacto, email o ciudad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
        >
          <option value="">Todos los sectores</option>
          {sectores.map((s) => (
            <option key={s} value={s!}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-gray-50/50">
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Cliente
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Contacto
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Sector
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Ciudad
              </th>
              <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Cotizaciones
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Ingresos
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((cliente) => (
              <tr
                key={cliente.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/clientes/${cliente.id}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {cliente.nombre}
                      </p>
                      {cliente.email && (
                        <p className="text-xs text-muted-foreground">
                          {cliente.email}
                        </p>
                      )}
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {cliente.contactoPrincipal}
                </td>
                <td className="px-4 py-3">
                  {cliente.sector && (
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
                      {cliente.sector}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {cliente.ciudad || "-"}
                </td>
                <td className="px-4 py-3 text-center text-sm text-foreground">
                  {cliente.totalCotizaciones}
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium text-foreground">
                  {formatCurrency(cliente.totalIngresos)}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <EmptyState
                    variant="search"
                    title="Sin resultados"
                    description="No se encontraron clientes con ese criterio de búsqueda."
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
