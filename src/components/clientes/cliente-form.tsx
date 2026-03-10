"use client";

import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";

interface ContactoInput {
  nombre: string;
  cargo: string;
  email: string;
  telefono: string;
  principal: boolean;
}

interface ClienteFormData {
  nombre: string;
  ruc: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  pais: string;
  sector: string;
  notas: string;
  contactos: ContactoInput[];
}

interface ClienteFormProps {
  initialData?: Partial<ClienteFormData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  saving?: boolean;
}

const emptyContacto: ContactoInput = {
  nombre: "",
  cargo: "",
  email: "",
  telefono: "",
  principal: false,
};

export function ClienteForm({
  initialData,
  onSubmit,
  saving,
}: ClienteFormProps) {
  const [form, setForm] = useState<ClienteFormData>({
    nombre: initialData?.nombre || "",
    ruc: initialData?.ruc || "",
    email: initialData?.email || "",
    telefono: initialData?.telefono || "",
    direccion: initialData?.direccion || "",
    ciudad: initialData?.ciudad || "",
    pais: initialData?.pais || "España",
    sector: initialData?.sector || "",
    notas: initialData?.notas || "",
    contactos: initialData?.contactos || [{ ...emptyContacto, principal: true }],
  });

  function updateField(field: keyof ClienteFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateContacto(index: number, field: keyof ContactoInput, value: string | boolean) {
    setForm((prev) => {
      const contactos = [...prev.contactos];
      contactos[index] = { ...contactos[index], [field]: value };
      if (field === "principal" && value === true) {
        contactos.forEach((c, i) => {
          if (i !== index) c.principal = false;
        });
      }
      return { ...prev, contactos };
    });
  }

  function addContacto() {
    setForm((prev) => ({
      ...prev,
      contactos: [...prev.contactos, { ...emptyContacto }],
    }));
  }

  function removeContacto(index: number) {
    setForm((prev) => ({
      ...prev,
      contactos: prev.contactos.filter((_, i) => i !== index),
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  const inputClass =
    "w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Info */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-4">
          Información de la Empresa
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">
              Nombre de la Empresa *
            </label>
            <input
              type="text"
              required
              value={form.nombre}
              onChange={(e) => updateField("nombre", e.target.value)}
              className={inputClass}
              placeholder="Ej: Distribuciones Martinez S.L."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              CIF / NIF
            </label>
            <input
              type="text"
              value={form.ruc}
              onChange={(e) => updateField("ruc", e.target.value)}
              className={inputClass}
              placeholder="B12345678"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Sector
            </label>
            <input
              type="text"
              value={form.sector}
              onChange={(e) => updateField("sector", e.target.value)}
              className={inputClass}
              placeholder="Ej: Tecnología, Distribución..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={inputClass}
              placeholder="info@empresa.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              value={form.telefono}
              onChange={(e) => updateField("telefono", e.target.value)}
              className={inputClass}
              placeholder="+34 91 234 5678"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">
              Dirección
            </label>
            <input
              type="text"
              value={form.direccion}
              onChange={(e) => updateField("direccion", e.target.value)}
              className={inputClass}
              placeholder="Calle, número, piso"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Ciudad
            </label>
            <input
              type="text"
              value={form.ciudad}
              onChange={(e) => updateField("ciudad", e.target.value)}
              className={inputClass}
              placeholder="Madrid"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              País
            </label>
            <input
              type="text"
              value={form.pais}
              onChange={(e) => updateField("pais", e.target.value)}
              className={inputClass}
              placeholder="España"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1">
              Notas
            </label>
            <textarea
              value={form.notas}
              onChange={(e) => updateField("notas", e.target.value)}
              className={inputClass}
              rows={3}
              placeholder="Notas internas sobre este cliente..."
            />
          </div>
        </div>
      </div>

      {/* Contacts */}
      <div className="bg-white rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-foreground">Contactos</h3>
          <button
            type="button"
            onClick={addContacto}
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium"
          >
            <Plus className="w-4 h-4" /> Agregar Contacto
          </button>
        </div>
        <div className="space-y-4">
          {form.contactos.map((contacto, i) => (
            <div
              key={i}
              className="border border-border rounded-lg p-4 relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={contacto.nombre}
                    onChange={(e) =>
                      updateContacto(i, "nombre", e.target.value)
                    }
                    className={inputClass}
                    placeholder="Nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Cargo
                  </label>
                  <input
                    type="text"
                    value={contacto.cargo}
                    onChange={(e) =>
                      updateContacto(i, "cargo", e.target.value)
                    }
                    className={inputClass}
                    placeholder="Director, Gerente..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={contacto.email}
                    onChange={(e) =>
                      updateContacto(i, "email", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={contacto.telefono}
                    onChange={(e) =>
                      updateContacto(i, "telefono", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="contactoPrincipal"
                    checked={contacto.principal}
                    onChange={() => updateContacto(i, "principal", true)}
                    className="text-primary"
                  />
                  <span className="text-muted-foreground">
                    Contacto principal
                  </span>
                </label>
                {form.contactos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeContacto(i)}
                    className="text-destructive hover:text-destructive/80 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? "Guardando..." : "Guardar Cliente"}
        </button>
      </div>
    </form>
  );
}
