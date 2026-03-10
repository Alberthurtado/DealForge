"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, FileText, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CotizacionStatusBadge } from "./cotizacion-status-badge";

interface CotizacionRow {
  id: string;
  numero: string;
  estado: string;
  total: number;
  fechaEmision: string;
  fechaVencimiento: string | null;
  contactoNombre: string | null;
  cliente: { id: string; nombre: string };
  _count: { lineItems: number };
}

const ESTADOS = [
  { value: "", label: "Todos" },
  { value: "BORRADOR", label: "Borrador" },
  { value: "ENVIADA", label: "Enviada" },
  { value: "NEGOCIACION", label: "Negociación" },
  { value: "GANADA", label: "Ganada" },
  { value: "PERDIDA", label: "Perdida" },
  { value: "ARCHIVADA", label: "Archivada" },
];

type SortKey = "fecha" | "cliente" | "total" | "numero";
type SortDir = "asc" | "desc";

export function CotizacionTable({
  cotizaciones,
}: {
  cotizaciones: CotizacionRow[];
}) {
  const [search, setSearch] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [clienteFilter, setClienteFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("fecha");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Unique clients for filter dropdown
  const clientes = useMemo(() => {
    const map = new Map<string, string>();
    cotizaciones.forEach((c) => map.set(c.cliente.id, c.cliente.nombre));
    return Array.from(map.entries())
      .map(([id, nombre]) => ({ id, nombre }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }, [cotizaciones]);

  const filtered = useMemo(() => {
    let result = cotizaciones.filter((c) => {
      const matchSearch =
        !search ||
        c.numero.toLowerCase().includes(search.toLowerCase()) ||
        c.cliente.nombre.toLowerCase().includes(search.toLowerCase());
      const matchEstado = estadoFilter
        ? c.estado === estadoFilter
        : c.estado !== "ARCHIVADA";
      const matchCliente = !clienteFilter || c.cliente.id === clienteFilter;
      return matchSearch && matchEstado && matchCliente;
    });

    // Sort
    result = [...result].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "fecha":
          cmp = new Date(a.fechaEmision).getTime() - new Date(b.fechaEmision).getTime();
          break;
        case "cliente":
          cmp = a.cliente.nombre.localeCompare(b.cliente.nombre);
          break;
        case "total":
          cmp = a.total - b.total;
          break;
        case "numero":
          cmp = a.numero.localeCompare(b.numero);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [cotizaciones, search, estadoFilter, clienteFilter, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "fecha" ? "desc" : "asc");
    }
  }

  function SortIcon({ column }: { column: SortKey }) {
    if (sortKey !== column) return <ArrowUpDown className="w-3 h-3 opacity-40" />;
    return sortDir === "asc" ? (
      <ArrowUp className="w-3 h-3 text-primary" />
    ) : (
      <ArrowDown className="w-3 h-3 text-primary" />
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border">
      <div className="p-4 border-b border-border flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por número o cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Client filter */}
        <select
          value={clienteFilter}
          onChange={(e) => setClienteFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white text-foreground"
        >
          <option value="">Todos los clientes</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>

        <div className="flex gap-1">
          {ESTADOS.map((e) => (
            <button
              key={e.value}
              onClick={() => setEstadoFilter(e.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                estadoFilter === e.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-gray-50/50">
              <th
                className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors select-none"
                onClick={() => toggleSort("numero")}
              >
                <span className="inline-flex items-center gap-1">
                  Cotización <SortIcon column="numero" />
                </span>
              </th>
              <th
                className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors select-none"
                onClick={() => toggleSort("cliente")}
              >
                <span className="inline-flex items-center gap-1">
                  Cliente <SortIcon column="cliente" />
                </span>
              </th>
              <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Estado
              </th>
              <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Items
              </th>
              <th
                className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors select-none"
                onClick={() => toggleSort("total")}
              >
                <span className="inline-flex items-center gap-1 justify-end">
                  Total <SortIcon column="total" />
                </span>
              </th>
              <th
                className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors select-none"
                onClick={() => toggleSort("fecha")}
              >
                <span className="inline-flex items-center gap-1">
                  Fecha <SortIcon column="fecha" />
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((cot) => (
              <tr
                key={cot.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/cotizaciones/${cot.id}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {cot.numero}
                      </p>
                      {cot.contactoNombre && (
                        <p className="text-xs text-muted-foreground">
                          {cot.contactoNombre}
                        </p>
                      )}
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/clientes/${cot.cliente.id}`}
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    {cot.cliente.nombre}
                  </Link>
                </td>
                <td className="px-4 py-3 text-center">
                  <CotizacionStatusBadge estado={cot.estado} />
                </td>
                <td className="px-4 py-3 text-center text-sm text-muted-foreground">
                  {cot._count.lineItems}
                </td>
                <td className="px-4 py-3 text-right text-sm font-semibold text-foreground">
                  {formatCurrency(cot.total)}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {formatDate(cot.fechaEmision)}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <EmptyState
                    variant="search"
                    title="Sin resultados"
                    description="No se encontraron cotizaciones con ese criterio de búsqueda."
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
