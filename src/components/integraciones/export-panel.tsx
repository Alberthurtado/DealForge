"use client";

import { useState, useEffect } from "react";
import { Users, Package, FileText, Download, Loader2 } from "lucide-react";

interface ExportOption {
  tipo: string;
  label: string;
  description: string;
  icon: typeof Users;
  count: number | null;
}

export function ExportPanel() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [exporting, setExporting] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/clientes").then((r) => r.json()),
      fetch("/api/productos").then((r) => r.json()),
      fetch("/api/cotizaciones").then((r) => r.json()),
    ]).then(([clientes, productos, cotizaciones]) => {
      setCounts({
        clientes: Array.isArray(clientes) ? clientes.length : 0,
        productos: Array.isArray(productos) ? productos.length : 0,
        cotizaciones: Array.isArray(cotizaciones) ? cotizaciones.length : 0,
      });
    });
  }, []);

  const options: ExportOption[] = [
    {
      tipo: "clientes",
      label: "Clientes",
      description: "Exporta todos tus clientes con datos de contacto principal. Compatible con Salesforce, HubSpot, Zoho.",
      icon: Users,
      count: counts.clientes ?? null,
    },
    {
      tipo: "productos",
      label: "Productos",
      description: "Exporta el catalogo de productos con SKU, precios y categorias. Compatible con SAP, Odoo, Holded.",
      icon: Package,
      count: counts.productos ?? null,
    },
    {
      tipo: "cotizaciones",
      label: "Cotizaciones",
      description: "Exporta todas las cotizaciones con estado, cliente, totales y fechas. Ideal para analisis en Excel.",
      icon: FileText,
      count: counts.cotizaciones ?? null,
    },
  ];

  async function handleExport(tipo: string) {
    setExporting(tipo);
    try {
      const res = await fetch(`/api/integraciones/export?tipo=${tipo}`);
      if (!res.ok) throw new Error("Error al exportar");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dealforge-${tipo}-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("Error al exportar los datos");
    } finally {
      setExporting(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
        <p className="text-sm text-blue-800">
          <strong>Formato CSV</strong> — Los archivos exportados usan formato CSV (separado por comas) compatible con Excel, Google Sheets, y la mayoria de CRMs y ERPs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((opt) => (
          <div
            key={opt.tipo}
            className="bg-white rounded-xl border border-border p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <opt.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{opt.label}</h3>
                {opt.count !== null && (
                  <p className="text-xs text-muted-foreground">
                    {opt.count} registros
                  </p>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-4 flex-1">
              {opt.description}
            </p>
            <button
              onClick={() => handleExport(opt.tipo)}
              disabled={exporting === opt.tipo || opt.count === 0}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exporting === opt.tipo ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Exportando...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Exportar CSV
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
