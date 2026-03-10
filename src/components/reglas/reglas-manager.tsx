"use client";

import { useState } from "react";
import { Percent, Link2, UserCheck, Tag, Plus, Pencil, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { ReglaFormModal } from "./regla-form-modal";
import { LimiteDescuentoForm } from "./forms/limite-descuento-form";
import { ProductoObligatorioForm } from "./forms/producto-obligatorio-form";
import { AprobacionForm } from "./forms/aprobacion-form";
import { PromocionForm } from "./forms/promocion-form";

interface Regla {
  id: string;
  nombre: string;
  tipo: string;
  activa: boolean;
  prioridad: number;
  configuracion: string;
  createdAt: string;
}

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
  initialReglas: Regla[];
  productos: ProductoOption[];
  categorias: CategoriaOption[];
}

const SECTIONS = [
  {
    tipo: "LIMITE_DESCUENTO",
    titulo: "Límites de Descuento",
    descripcion: "Descuento máximo permitido por línea o global",
    Icon: Percent,
  },
  {
    tipo: "PRODUCTO_OBLIGATORIO",
    titulo: "Productos Obligatorios",
    descripcion: "Si se incluye un producto o categoría, debe incluirse otro obligatoriamente",
    Icon: Link2,
  },
  {
    tipo: "APROBACION",
    titulo: "Aprobaciones Requeridas",
    descripcion: "Aprobador necesario cuando se superan ciertos umbrales",
    Icon: UserCheck,
  },
  {
    tipo: "PROMOCION",
    titulo: "Promociones",
    descripcion: "Descuentos temporales por fecha para productos específicos",
    Icon: Tag,
  },
];

export function ReglasManager({ initialReglas, productos, categorias }: Props) {
  const { success, error: showError } = useToast();
  const [reglas, setReglas] = useState<Regla[]>(initialReglas);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState<string | null>(null); // tipo for new, or "edit-{id}" for edit
  const [editingRegla, setEditingRegla] = useState<Regla | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    LIMITE_DESCUENTO: true,
    PRODUCTO_OBLIGATORIO: true,
    APROBACION: true,
    PROMOCION: true,
  });

  function toggleExpanded(tipo: string) {
    setExpanded((prev) => ({ ...prev, [tipo]: !prev[tipo] }));
  }

  async function handleSave(tipo: string, nombre: string, configuracion: Record<string, unknown>) {
    setSaving(true);
    try {
      if (editingRegla) {
        const res = await fetch(`/api/reglas/${editingRegla.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, configuracion }),
        });
        if (res.ok) {
          const updated = await res.json();
          setReglas((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
          success("Regla actualizada");
        } else {
          showError("Error al actualizar");
        }
      } else {
        const res = await fetch("/api/reglas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, tipo, configuracion }),
        });
        if (res.ok) {
          const created = await res.json();
          setReglas((prev) => [created, ...prev]);
          success("Regla creada");
        } else {
          showError("Error al crear");
        }
      }
    } catch {
      showError("Error de conexión");
    } finally {
      setSaving(false);
      setModalOpen(null);
      setEditingRegla(null);
    }
  }

  async function handleToggle(regla: Regla) {
    try {
      const res = await fetch(`/api/reglas/${regla.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activa: !regla.activa }),
      });
      if (res.ok) {
        const updated = await res.json();
        setReglas((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      }
    } catch {
      showError("Error al cambiar estado");
    }
  }

  async function handleDelete(regla: Regla) {
    try {
      const res = await fetch(`/api/reglas/${regla.id}`, { method: "DELETE" });
      if (res.ok) {
        setReglas((prev) => prev.filter((r) => r.id !== regla.id));
        success("Regla eliminada");
      }
    } catch {
      showError("Error al eliminar");
    }
  }

  function openEdit(regla: Regla) {
    setEditingRegla(regla);
    setModalOpen(`edit-${regla.id}`);
  }

  function openNew(tipo: string) {
    setEditingRegla(null);
    setModalOpen(tipo);
  }

  function closeModal() {
    setModalOpen(null);
    setEditingRegla(null);
  }

  function getModalTipo(): string {
    if (editingRegla) return editingRegla.tipo;
    return modalOpen || "";
  }

  function renderForm(tipo: string) {
    const initial = editingRegla
      ? { nombre: editingRegla.nombre, configuracion: JSON.parse(editingRegla.configuracion) }
      : undefined;

    switch (tipo) {
      case "LIMITE_DESCUENTO":
        return <LimiteDescuentoForm initial={initial} onSave={(n, c) => handleSave(tipo, n, c)} saving={saving} />;
      case "PRODUCTO_OBLIGATORIO":
        return <ProductoObligatorioForm productos={productos} categorias={categorias} initial={initial} onSave={(n, c) => handleSave(tipo, n, c)} saving={saving} />;
      case "APROBACION":
        return <AprobacionForm initial={initial} onSave={(n, c) => handleSave(tipo, n, c)} saving={saving} />;
      case "PROMOCION":
        return <PromocionForm productos={productos} initial={initial} onSave={(n, c) => handleSave(tipo, n, c)} saving={saving} />;
      default:
        return null;
    }
  }

  function renderReglaSummary(regla: Regla) {
    let config: Record<string, unknown> = {};
    try { config = JSON.parse(regla.configuracion); } catch { /* noop */ }

    switch (regla.tipo) {
      case "LIMITE_DESCUENTO": {
        const parts: string[] = [];
        if (config.maxDescuentoLinea !== undefined) parts.push(`Línea max: ${config.maxDescuentoLinea}%`);
        if (config.maxDescuentoGlobal !== undefined) parts.push(`Global max: ${config.maxDescuentoGlobal}%`);
        return parts.join(" | ") || "Sin configurar";
      }
      case "PRODUCTO_OBLIGATORIO": {
        const cond = config.condicion as { tipo?: string; ids?: string[] } | undefined;
        const reqs = (config.productosRequeridos as string[]) || [];
        const triggerCount = cond?.ids?.length || 0;
        return `${triggerCount} disparador(es) → ${reqs.length} producto(s) obligatorio(s)`;
      }
      case "APROBACION": {
        const aprobador = config.aprobador as { nombre?: string } | undefined;
        const conds = (config.condiciones as Array<{ tipo: string; umbral: number }>) || [];
        const condText = conds.map((c) => {
          const label = c.tipo === "descuento_linea" ? "Dto. línea" : c.tipo === "descuento_global" ? "Dto. global" : "Monto";
          const unit = c.tipo === "monto_total" ? " EUR" : "%";
          return `${label} > ${c.umbral}${unit}`;
        }).join(", ");
        return `${condText} → ${aprobador?.nombre || "?"}`;
      }
      case "PROMOCION": {
        const prods = (config.productoIds as string[]) || [];
        const tipo = config.tipoPromocion as string;
        const valor = config.valor as number;
        const fi = config.fechaInicio as string;
        const ff = config.fechaFin as string;
        const valorText = tipo === "descuento_porcentaje" ? `${valor}%` : `${valor} EUR`;
        return `${valorText} en ${prods.length} producto(s) | ${fi || "?"} a ${ff || "?"}`;
      }
      default:
        return "";
    }
  }

  return (
    <div className="max-w-3xl space-y-4">
      {SECTIONS.map((section) => {
        const sectionReglas = reglas.filter((r) => r.tipo === section.tipo);
        const isExpanded = expanded[section.tipo];

        return (
          <div key={section.tipo} className="bg-white rounded-xl border border-border">
            <div
              className="flex items-center gap-3 px-6 py-4 cursor-pointer select-none"
              onClick={() => toggleExpanded(section.tipo)}
            >
              <section.Icon className="w-5 h-5 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{section.titulo}</h3>
                  {sectionReglas.length > 0 && (
                    <span className="text-[10px] bg-gray-100 text-muted-foreground px-1.5 py-0.5 rounded-full">
                      {sectionReglas.length}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{section.descripcion}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); openNew(section.tipo); }}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors shrink-0"
              >
                <Plus className="w-3 h-3" /> Agregar
              </button>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
            </div>

            {isExpanded && (
              <div className="px-6 pb-4">
                {sectionReglas.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic py-2">
                    No hay reglas de este tipo. Haz click en &quot;Agregar&quot; para crear una.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {sectionReglas.map((regla) => (
                      <div
                        key={regla.id}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors ${
                          regla.activa
                            ? "border-border bg-gray-50/50"
                            : "border-border/50 bg-gray-50/30 opacity-60"
                        }`}
                      >
                        <button
                          onClick={() => handleToggle(regla)}
                          className={`w-8 h-5 rounded-full relative transition-colors shrink-0 ${
                            regla.activa ? "bg-primary" : "bg-gray-300"
                          }`}
                          title={regla.activa ? "Desactivar" : "Activar"}
                        >
                          <div
                            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                              regla.activa ? "translate-x-3.5" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {regla.nombre}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {renderReglaSummary(regla)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => openEdit(regla)}
                            className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-gray-100 transition-colors"
                            title="Editar"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(regla)}
                            className="p-1.5 text-muted-foreground hover:text-red-500 rounded-md hover:bg-red-50 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Modal for creating/editing rules */}
      <ReglaFormModal
        title={editingRegla ? `Editar: ${editingRegla.nombre}` : `Nueva Regla`}
        open={modalOpen !== null}
        onClose={closeModal}
      >
        {modalOpen && renderForm(getModalTipo())}
      </ReglaFormModal>
    </div>
  );
}
