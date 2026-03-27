"use client";

import { useState, useRef } from "react";
import { Upload, Check, Building2, Hash, Mail, Eye, EyeOff, FileText, Bell } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface EmpresaData {
  nombre: string;
  cif: string | null;
  email: string | null;
  telefono: string | null;
  direccion: string | null;
  ciudad: string | null;
  pais: string | null;
  web: string | null;
  logoUrl: string | null;
  plantillaPdf: string;
  colorPrimario: string;
  prefijoCotizacion: string;
  diasVencimiento: number;
  condicionesDefecto: string | null;
  condicionesTransaccional: string | null;
  condicionesContractual: string | null;
  smtpHost: string | null;
  smtpPort: number | null;
  smtpUser: string | null;
  smtpPass: string | null;
  smtpSecure: boolean;
  recordatorioSeguimientoDias: number;
  recordatorioVencimientoDias: number;
  recordatoriosActivos: boolean;
}

const PLANTILLAS = [
  {
    id: "moderna",
    nombre: "Moderna",
    descripcion: "Gradientes, colores vivos, bordes redondeados",
  },
  {
    id: "clasica",
    nombre: "Clásica",
    descripcion: "Formal con líneas, tabla con bordes, profesional",
  },
  {
    id: "minimalista",
    nombre: "Minimalista",
    descripcion: "Sin color, líneas finas, mucho espacio blanco",
  },
];

const inputClass =
  "w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white";

export function EmpresaForm({ initialData }: { initialData: EmpresaData }) {
  const { success, error: showError } = useToast();
  const [form, setForm] = useState<EmpresaData>(initialData);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showSmtpPass, setShowSmtpPass] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function updateField(field: keyof EmpresaData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/empresa", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        success("Configuración guardada correctamente");
      } else {
        showError("Error al guardar la configuración");
      }
    } catch {
      showError("Error de conexión");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("logo", file);

      const res = await fetch("/api/empresa/logo", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setForm((prev) => ({ ...prev, logoUrl: data.logoUrl }));
        success("Logo actualizado");
      } else {
        showError(data.error || "Error al subir el logo");
      }
    } catch {
      showError("Error al subir el archivo");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Section 1: Company info */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Datos de la Empresa
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Nombre de la empresa *
            </label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => updateField("nombre", e.target.value)}
              className={inputClass}
              placeholder="Mi Empresa S.L."
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              CIF / NIF
            </label>
            <input
              type="text"
              value={form.cif || ""}
              onChange={(e) => updateField("cif", e.target.value)}
              className={inputClass}
              placeholder="B12345678"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.email || ""}
              onChange={(e) => updateField("email", e.target.value)}
              className={inputClass}
              placeholder="info@miempresa.es"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              value={form.telefono || ""}
              onChange={(e) => updateField("telefono", e.target.value)}
              className={inputClass}
              placeholder="+34 900 000 000"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Dirección
            </label>
            <input
              type="text"
              value={form.direccion || ""}
              onChange={(e) => updateField("direccion", e.target.value)}
              className={inputClass}
              placeholder="Calle Principal 1, Planta 3"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Ciudad
            </label>
            <input
              type="text"
              value={form.ciudad || ""}
              onChange={(e) => updateField("ciudad", e.target.value)}
              className={inputClass}
              placeholder="Madrid"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              País
            </label>
            <input
              type="text"
              value={form.pais || ""}
              onChange={(e) => updateField("pais", e.target.value)}
              className={inputClass}
              placeholder="España"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Sitio Web
            </label>
            <input
              type="text"
              value={form.web || ""}
              onChange={(e) => updateField("web", e.target.value)}
              className={inputClass}
              placeholder="www.miempresa.es"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Logo */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-4">
          Logo de la Empresa
        </h3>
        <div className="flex items-start gap-6">
          {/* Logo preview */}
          <div className="w-24 h-24 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-gray-50 overflow-hidden shrink-0">
            {form.logoUrl ? (
              <img
                src={form.logoUrl}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            ) : (
              <Building2 className="w-8 h-8 text-gray-300" />
            )}
          </div>

          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-3">
              Sube el logo de tu empresa. Se mostrará en las cotizaciones PDF.
              Formatos: PNG, JPG, SVG, WebP. Max 500KB.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {uploading ? "Subiendo..." : "Subir logo"}
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: PDF Template */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-1">
          Plantilla de Cotización
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Selecciona el diseño para tus cotizaciones PDF
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANTILLAS.map((p) => {
            const isSelected = form.plantillaPdf === p.id;
            return (
              <button
                key={p.id}
                onClick={() => updateField("plantillaPdf", p.id)}
                className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border hover:border-gray-300"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}

                {/* Mini mockup */}
                <PlantillaMockup tipo={p.id} color={form.colorPrimario} />

                <p className="text-sm font-semibold mt-3">{p.nombre}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {p.descripcion}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 4: Primary Color */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-1">
          Color Primario
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Se usa en el encabezado y totales de tus cotizaciones
        </p>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={form.colorPrimario}
            onChange={(e) => updateField("colorPrimario", e.target.value)}
            className="w-12 h-12 rounded-lg border border-border cursor-pointer"
          />
          <div>
            <p className="text-sm font-medium">{form.colorPrimario}</p>
            <p className="text-xs text-muted-foreground">
              Haz click para cambiar el color
            </p>
          </div>
          <div
            className="ml-auto h-8 w-32 rounded-lg"
            style={{ backgroundColor: form.colorPrimario }}
          />
        </div>
      </div>

      {/* Section 5: Quote Numbering */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
          <Hash className="w-5 h-5 text-primary" />
          Numeración de Cotizaciones
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Define el prefijo para tus cotizaciones. El formato final será: PREFIJO-AÑO-0001
        </p>
        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-xs">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Prefijo
            </label>
            <input
              type="text"
              value={form.prefijoCotizacion}
              onChange={(e) =>
                updateField(
                  "prefijoCotizacion",
                  e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, "")
                )
              }
              className={inputClass}
              placeholder="COT"
              maxLength={10}
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Vista previa
            </label>
            <div className="px-3 py-2 text-sm bg-gray-50 border border-border rounded-lg text-muted-foreground font-mono">
              {form.prefijoCotizacion || "COT"}-{new Date().getFullYear()}-0001
            </div>
          </div>
        </div>
      </div>

      {/* Section 6: Default Expiry */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
          <Hash className="w-5 h-5 text-primary" />
          Vencimiento por Defecto
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Días de validez que se asignan automáticamente a cada nueva cotización
        </p>
        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-xs">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Días de vencimiento
            </label>
            <input
              type="number"
              min={1}
              max={365}
              value={form.diasVencimiento}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, diasVencimiento: parseInt(e.target.value) || 30 }))
              }
              className={inputClass}
              placeholder="30"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Vista previa
            </label>
            <div className="px-3 py-2 text-sm bg-gray-50 border border-border rounded-lg text-muted-foreground">
              Cada cotización vencerá <strong className="text-foreground">{form.diasVencimiento} días</strong> después de su creación
            </div>
          </div>
        </div>
      </div>

      {/* Section 7: Terms & Conditions */}
      <div className="bg-white rounded-xl border border-border p-6 space-y-6">
        <div>
          <h3 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Términos y Condiciones
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Se aplican automáticamente según el tipo de líneas en la cotización. Si la cotización tiene ambos tipos, se combinan.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            T&C Transaccionales <span className="text-xs text-muted-foreground font-normal">(productos/servicios de pago único)</span>
          </label>
          <textarea
            value={form.condicionesTransaccional || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, condicionesTransaccional: e.target.value || null }))
            }
            className={inputClass}
            rows={4}
            placeholder="Ej: Pago a 30 días. Precios no incluyen transporte. Garantía de 12 meses..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            T&C Contractuales <span className="text-xs text-muted-foreground font-normal">(servicios recurrentes / suscripciones)</span>
          </label>
          <textarea
            value={form.condicionesContractual || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, condicionesContractual: e.target.value || null }))
            }
            className={inputClass}
            rows={4}
            placeholder="Ej: Duración mínima 12 meses. Renovación automática salvo preaviso de 30 días. Cancelación con 30 días de antelación..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            T&C Generales <span className="text-xs text-muted-foreground font-normal">(fallback si no hay específicos)</span>
          </label>
          <textarea
            value={form.condicionesDefecto || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, condicionesDefecto: e.target.value || null }))
            }
            className={inputClass}
            rows={3}
            placeholder="Condiciones generales que aplican a todas las cotizaciones..."
          />
        </div>

        <p className="text-xs text-amber-600 flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
          Las cotizaciones no se pueden enviar sin términos y condiciones
        </p>
      </div>

      {/* Section 8: SMTP Email */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          Configuración de Email (SMTP)
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Configura tu servidor SMTP para enviar cotizaciones por email directamente desde la app
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Servidor SMTP
            </label>
            <input
              type="text"
              value={form.smtpHost || ""}
              onChange={(e) => updateField("smtpHost", e.target.value)}
              className={inputClass}
              placeholder="smtp.gmail.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Puerto
            </label>
            <input
              type="number"
              value={form.smtpPort ?? 587}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, smtpPort: parseInt(e.target.value) || 587 }))
              }
              className={inputClass}
              placeholder="587"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Usuario SMTP
            </label>
            <input
              type="text"
              value={form.smtpUser || ""}
              onChange={(e) => updateField("smtpUser", e.target.value)}
              className={inputClass}
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Contraseña SMTP
            </label>
            <div className="relative">
              <input
                type={showSmtpPass ? "text" : "password"}
                value={form.smtpPass || ""}
                onChange={(e) => updateField("smtpPass", e.target.value)}
                className={inputClass + " pr-10"}
                placeholder="Contraseña o App Password"
              />
              <button
                type="button"
                onClick={() => setShowSmtpPass(!showSmtpPass)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showSmtpPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.smtpSecure}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, smtpSecure: e.target.checked }))
                }
                className="rounded border-border"
              />
              <span className="text-sm text-muted-foreground">
                Usar SSL/TLS (puerto 465). Desactivar para STARTTLS (puerto 587).
              </span>
            </label>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-xs font-semibold text-blue-800 mb-1.5">Gmail</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              Servidor: <code className="bg-blue-100 px-1 rounded">smtp.gmail.com</code> &middot; Puerto: <code className="bg-blue-100 px-1 rounded">587</code> &middot; SSL/TLS: desactivado
            </p>
            <p className="text-xs text-blue-700 mt-1 leading-relaxed">
              <strong>Requiere App Password</strong> (no funciona con tu contraseña normal si tienes 2FA activado):
            </p>
            <ol className="text-xs text-blue-700 mt-1 ml-4 list-decimal space-y-0.5">
              <li>Ve a <span className="font-medium">myaccount.google.com/apppasswords</span></li>
              <li>Pon un nombre (ej: &quot;DealForge&quot;) y pulsa Crear</li>
              <li>Copia la contraseña de 16 caracteres generada y pégala aquí</li>
            </ol>
          </div>
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
            <p className="text-xs font-semibold text-indigo-800 mb-1.5">Outlook / Microsoft 365</p>
            <p className="text-xs text-indigo-700 leading-relaxed">
              Servidor: <code className="bg-indigo-100 px-1 rounded">smtp-mail.outlook.com</code> &middot; Puerto: <code className="bg-indigo-100 px-1 rounded">587</code> &middot; SSL/TLS: desactivado
            </p>
            <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
              Si tienes 2FA activado, necesitas un App Password:
            </p>
            <ol className="text-xs text-indigo-700 mt-1 ml-4 list-decimal space-y-0.5">
              <li>Ve a <span className="font-medium">account.microsoft.com/security</span></li>
              <li>Opciones de seguridad avanzadas &rarr; Contraseñas de aplicaciones</li>
              <li>Crea una nueva y pégala aquí</li>
            </ol>
            <p className="text-[10px] text-indigo-500 mt-1">
              Nota: Algunas cuentas de empresa con Microsoft 365 requieren que el administrador habilite SMTP AUTH.
            </p>
          </div>
          <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg">
            <p className="text-xs font-semibold text-purple-800 mb-1">Yahoo</p>
            <p className="text-xs text-purple-700 leading-relaxed">
              Servidor: <code className="bg-purple-100 px-1 rounded">smtp.mail.yahoo.com</code> &middot; Puerto: <code className="bg-purple-100 px-1 rounded">465</code> &middot; SSL/TLS: <strong>activado</strong>
            </p>
          </div>
          <div className="p-3 bg-green-50 border border-green-100 rounded-lg flex items-start gap-2">
            <svg className="w-4 h-4 text-green-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
            <p className="text-xs text-green-700">
              <strong>Tus credenciales están seguras.</strong> La contraseña se almacena cifrada en la base de datos local de DealForge y nunca se comparte con terceros. Solo se usa para enviar emails desde tu propio servidor SMTP.
            </p>
          </div>
        </div>
        {form.smtpHost && form.smtpUser && (
          <div className="mt-4">
            <button
              type="button"
              onClick={async () => {
                setTestingEmail(true);
                try {
                  // Save first then test
                  await fetch("/api/empresa", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                  });
                  const res = await fetch("/api/email/test", { method: "POST" });
                  const data = await res.json();
                  if (res.ok) {
                    success("Email de prueba enviado a " + (form.smtpUser || form.email));
                  } else {
                    showError(data.error || "Error al enviar email de prueba");
                  }
                } catch {
                  showError("Error de conexión");
                } finally {
                  setTestingEmail(false);
                }
              }}
              disabled={testingEmail}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
            >
              <Mail className="w-4 h-4" />
              {testingEmail ? "Enviando..." : "Enviar Email de Prueba"}
            </button>
          </div>
        )}
      </div>

      {/* Section 9: Recordatorios Automáticos */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Recordatorios Automáticos
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Envía recordatorios automáticos al vendedor y al cliente para mejorar el seguimiento
        </p>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.recordatoriosActivos}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, recordatoriosActivos: e.target.checked }))
              }
              className="rounded border-border w-4 h-4"
            />
            <div>
              <span className="text-sm font-medium text-foreground">Activar recordatorios</span>
              <p className="text-xs text-muted-foreground">Se envían automáticamente cada día a las 8:00 UTC</p>
            </div>
          </label>

          {form.recordatoriosActivos && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 pl-7">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Días sin actividad para recordar al vendedor
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={form.recordatorioSeguimientoDias}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      recordatorioSeguimientoDias: Math.max(1, Math.min(30, parseInt(e.target.value) || 3)),
                    }))
                  }
                  className={inputClass}
                />
                <p className="text-[10px] text-muted-foreground mt-1">
                  Si una cotización enviada no tiene actividad en este número de días, se envía un recordatorio al vendedor.
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  Días antes del vencimiento para avisar al cliente
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={form.recordatorioVencimientoDias}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      recordatorioVencimientoDias: Math.max(1, Math.min(30, parseInt(e.target.value) || 3)),
                    }))
                  }
                  className={inputClass}
                />
                <p className="text-[10px] text-muted-foreground mt-1">
                  Se envía un recordatorio al cliente cuando la cotización está a punto de vencer.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar Configuración"}
        </button>
      </div>
    </div>
  );
}

/* Mini visual mockup for each template */
function PlantillaMockup({ tipo, color }: { tipo: string; color: string }) {
  if (tipo === "moderna") {
    return (
      <div className="w-full h-28 rounded-lg border border-gray-200 bg-white overflow-hidden text-[6px]">
        <div
          className="h-7 px-2 flex items-center justify-between"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
        >
          <div className="w-4 h-4 bg-white/30 rounded" />
          <div className="text-white font-bold text-[7px]">COTIZACIÓN</div>
        </div>
        <div className="px-2 py-1.5 space-y-1">
          <div className="flex gap-2">
            <div className="w-1/2 h-2 bg-gray-100 rounded" />
            <div className="w-1/2 h-2 bg-gray-100 rounded" />
          </div>
          <div className="h-px bg-gray-100" />
          <div className="space-y-0.5">
            <div className="h-1.5 bg-gray-50 rounded w-full" />
            <div className="h-1.5 bg-gray-100 rounded w-full" />
            <div className="h-1.5 bg-gray-50 rounded w-full" />
          </div>
          <div className="flex justify-end">
            <div
              className="h-3 w-12 rounded text-white flex items-center justify-center font-bold"
              style={{ backgroundColor: color }}
            >
              TOTAL
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tipo === "clasica") {
    return (
      <div className="w-full h-28 rounded-lg border border-gray-200 bg-white overflow-hidden text-[6px]">
        <div className="h-7 px-2 flex items-center justify-between border-b-2 border-gray-800">
          <div className="w-4 h-4 bg-gray-200 rounded-sm" />
          <div className="font-bold text-gray-800 text-[7px] tracking-wider">
            COTIZACIÓN
          </div>
        </div>
        <div className="px-2 py-1.5 space-y-1">
          <div className="flex gap-2">
            <div className="w-1/2 h-2 bg-gray-50 rounded-sm" />
            <div className="w-1/2 h-2 bg-gray-50 rounded-sm" />
          </div>
          <div className="border border-gray-300 rounded-sm">
            <div className="h-1.5 bg-gray-200 w-full" />
            <div className="h-1.5 bg-white w-full border-t border-gray-200" />
            <div className="h-1.5 bg-gray-50 w-full border-t border-gray-200" />
          </div>
          <div className="flex justify-end pt-0.5">
            <div className="h-3 w-12 border-t-2 border-gray-800 text-gray-800 flex items-center justify-center font-bold">
              TOTAL
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Minimalista
  return (
    <div className="w-full h-28 rounded-lg border border-gray-200 bg-white overflow-hidden text-[6px]">
      <div className="h-7 px-2 flex items-center justify-between">
        <div className="w-4 h-4 bg-gray-100 rounded-full" />
        <div className="text-gray-400 text-[7px] font-light tracking-widest">
          COTIZACIÓN
        </div>
      </div>
      <div className="px-2 py-1.5 space-y-1.5">
        <div className="flex gap-2">
          <div className="w-1/2 h-2 bg-gray-50 rounded" />
          <div className="w-1/2 h-2 bg-gray-50 rounded" />
        </div>
        <div className="h-px bg-gray-100" />
        <div className="space-y-1">
          <div className="h-1 bg-gray-50 rounded w-full" />
          <div className="h-1 bg-gray-50 rounded w-full" />
          <div className="h-1 bg-gray-50 rounded w-3/4" />
        </div>
        <div className="h-px bg-gray-100" />
        <div className="flex justify-end">
          <div className="text-gray-500 font-medium text-[7px]">
            Total: 0,00 EUR
          </div>
        </div>
      </div>
    </div>
  );
}
