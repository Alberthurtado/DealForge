"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, FileUp, Users, Package, Download, Loader2, CheckCircle, AlertTriangle, X } from "lucide-react";
import Papa from "papaparse";

type ImportType = "clientes" | "productos";

const TEMPLATES: Record<ImportType, { headers: string[]; example: string[][] }> = {
  clientes: {
    headers: ["nombre", "email", "telefono", "direccion", "ciudad", "pais", "sector", "cif", "contacto_principal_nombre", "contacto_principal_email", "contacto_principal_cargo"],
    example: [["Acme Corp", "info@acme.com", "+34 600 123 456", "Calle Mayor 1", "Madrid", "España", "Tecnología", "B12345678", "Juan Pérez", "juan@acme.com", "Director Comercial"]],
  },
  productos: {
    headers: ["nombre", "sku", "descripcion", "precio_base", "unidad", "categoria", "tipo_facturacion", "frecuencia", "activo"],
    example: [["Widget Pro", "WDG-001", "Widget profesional de alta calidad", "99.90", "unidad", "Widgets", "UNICO", "", "si"]],
  },
};

interface ImportResult {
  created: number;
  updated: number;
  errors: string[];
}

export function ImportPanel() {
  const [tipo, setTipo] = useState<ImportType>("clientes");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<Record<string, string>[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [headers, setHeaders] = useState<string[]>([]);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function reset() {
    setFile(null);
    setPreview([]);
    setTotalRows(0);
    setHeaders([]);
    setResult(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  const handleFile = useCallback((f: File) => {
    setResult(null);
    setFile(f);
    Papa.parse(f, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as Record<string, string>[];
        setHeaders(results.meta.fields || []);
        setTotalRows(rows.length);
        setPreview(rows.slice(0, 5));
      },
      error: () => {
        alert("Error al leer el archivo CSV");
        reset();
      },
    });
  }, []);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && (f.name.endsWith(".csv") || f.type === "text/csv")) {
      handleFile(f);
    }
  }

  async function handleImport() {
    if (!file) return;
    setImporting(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tipo", tipo);
      const res = await fetch("/api/integraciones/import", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ created: 0, updated: 0, errors: ["Error de conexión"] });
    } finally {
      setImporting(false);
    }
  }

  function downloadTemplate() {
    const tmpl = TEMPLATES[tipo];
    const csv = Papa.unparse({ fields: tmpl.headers, data: tmpl.example });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `plantilla-${tipo}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      {/* Type selector */}
      <div className="bg-white rounded-xl border border-border p-4">
        <label className="block text-sm font-medium mb-2">Tipo de datos a importar</label>
        <div className="flex gap-2">
          <button
            onClick={() => { setTipo("clientes"); reset(); }}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors ${
              tipo === "clientes"
                ? "border-primary bg-primary/5 text-primary"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            <Users className="w-4 h-4" />
            Clientes
          </button>
          <button
            onClick={() => { setTipo("productos"); reset(); }}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors ${
              tipo === "productos"
                ? "border-primary bg-primary/5 text-primary"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            <Package className="w-4 h-4" />
            Productos
          </button>
        </div>
      </div>

      {/* Template download + dropzone */}
      <div className="bg-white rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Archivo CSV</span>
          <button
            onClick={downloadTemplate}
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Descargar plantilla
          </button>
        </div>

        {!file ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
              dragOver
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
          >
            <FileUp className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">
              Arrastra tu archivo CSV aquí
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              o haz clic para seleccionar
            </p>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Upload className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {totalRows} registros encontrados · {headers.length} columnas
              </p>
            </div>
            <button onClick={reset} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Preview */}
      {preview.length > 0 && !result && (
        <div className="bg-white rounded-xl border border-border p-4">
          <h4 className="text-sm font-medium mb-3">
            Vista previa (primeras {preview.length} de {totalRows} filas)
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  {headers.slice(0, 8).map((h) => (
                    <th key={h} className="text-left px-2 py-1.5 font-medium text-muted-foreground whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                  {headers.length > 8 && (
                    <th className="text-left px-2 py-1.5 font-medium text-muted-foreground">
                      +{headers.length - 8} más
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i} className="border-b border-border">
                    {headers.slice(0, 8).map((h) => (
                      <td key={h} className="px-2 py-1.5 text-foreground whitespace-nowrap max-w-[200px] truncate">
                        {row[h] || <span className="text-muted-foreground italic">vacío</span>}
                      </td>
                    ))}
                    {headers.length > 8 && <td className="px-2 py-1.5 text-muted-foreground">...</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleImport}
              disabled={importing}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {importing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Importando...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Importar {totalRows} registros
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            {result.errors.length === 0 ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-amber-500" />
            )}
            <h4 className="text-base font-semibold">Resultado de la importación</h4>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-700">{result.created}</p>
              <p className="text-xs text-green-600">Creados</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-700">{result.updated}</p>
              <p className="text-xs text-blue-600">Actualizados</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-700">{result.errors.length}</p>
              <p className="text-xs text-red-600">Errores</p>
            </div>
          </div>
          {result.errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 max-h-32 overflow-y-auto">
              {result.errors.map((err, i) => (
                <p key={i} className="text-xs text-red-700">{err}</p>
              ))}
            </div>
          )}
          <div className="mt-4">
            <button
              onClick={reset}
              className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
            >
              Importar otro archivo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
