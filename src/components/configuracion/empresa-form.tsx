"use client";

import { useState, useRef } from "react";
import { Upload, Check, Building2, Hash, Mail, Eye, EyeOff, FileText, Bell, Languages } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { TCTemplatesModal } from "./tc-templates-modal";
import { useEmpresaLocale } from "@/lib/use-empresa-locale";
import { CONFIG_STRINGS } from "@/lib/configuracion-i18n";

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
  locale: string | null;
  currencyCode: string | null;
}

const LOCALE_OPTIONS = [
  { value: "es-ES", label: "Español" },
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
];

const CURRENCY_OPTIONS = [
  { value: "EUR", label: "EUR — €" },
  { value: "USD", label: "USD — $" },
  { value: "GBP", label: "GBP — £" },
];

const PLANTILLAS = ["moderna", "clasica", "minimalista"];

const inputClass =
  "w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white";

export function EmpresaForm({ initialData }: { initialData: EmpresaData }) {
  const { success, error: showError } = useToast();
  const { lang } = useEmpresaLocale();
  const t = CONFIG_STRINGS[lang].empresaForm;
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
        success(t.configSaved);
        // The dashboard language follows empresa.locale, resolved server-side.
        // If it changed, reload so the whole panel re-renders in the new language.
        if ((form.locale || "es-ES") !== (initialData.locale || "es-ES")) {
          setTimeout(() => window.location.reload(), 600);
        }
      } else {
        showError(t.errSave);
      }
    } catch {
      showError(t.errConnection);
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
        success(t.logoUpdated);
      } else {
        showError(data.error || t.errUploadLogo);
      }
    } catch {
      showError(t.errUploadFile);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Section 0: Localization (language + currency) */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
          <Languages className="w-5 h-5 text-primary" />
          {t.localizationTitle}
        </h3>
        <p className="text-xs text-muted-foreground mb-4">{t.localizationDesc}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              {t.languageLabel}
            </label>
            <select
              value={form.locale || "es-ES"}
              onChange={(e) => updateField("locale", e.target.value)}
              className={inputClass}
            >
              {LOCALE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              {t.currencyLabel}
            </label>
            <select
              value={form.currencyCode || "EUR"}
              onChange={(e) => updateField("currencyCode", e.target.value)}
              className={inputClass}
            >
              {CURRENCY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground/70 mt-3">{t.langChangeNote}</p>
      </div>

      {/* Section 1: Company info */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          {t.companyData}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              {t.companyName}
            </label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => updateField("nombre", e.target.value)}
              className={inputClass}
              placeholder={t.companyNamePlaceholder}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              {t.taxId}
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
              {t.email}
            </label>
            <input
              type="email"
              value={form.email || ""}
              onChange={(e) => updateField("email", e.target.value)}
              className={inputClass}
              placeholder={t.emailPlaceholder}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              {t.phone}
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
              {t.address}
            </label>
            <input
              type="text"
              value={form.direccion || ""}
              onChange={(e) => updateField("direccion", e.target.value)}
              className={inputClass}
              placeholder={t.addressPlaceholder}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              {t.city}
            </label>
            <input
              type="text"
              value={form.ciudad || ""}
              onChange={(e) => updateField("ciudad", e.target.value)}
              className={inputClass}
              placeholder={t.cityPlaceholder}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              {t.country}
            </label>
            <input
              type="text"
              value={form.pais || ""}
              onChange={(e) => updateField("pais", e.target.value)}
              className={inputClass}
              placeholder={t.countryPlaceholder}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              {t.website}
            </label>
            <input
              type="text"
              value={form.web || ""}
              onChange={(e) => updateField("web", e.target.value)}
              className={inputClass}
              placeholder={t.websitePlaceholder}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Logo */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-4">
          {t.logoTitle}
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
              {t.logoDesc}
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
              {uploading ? t.uploading : t.uploadLogo}
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: PDF Template */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-1">
          {t.templateTitle}
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          {t.templateDesc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANTILLAS.map((id) => {
            const isSelected = form.plantillaPdf === id;
            const tpl = t.templates[id];
            return (
              <button
                key={id}
                onClick={() => updateField("plantillaPdf", id)}
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
                <PlantillaMockup tipo={id} color={form.colorPrimario} t={t} />

                <p className="text-sm font-semibold mt-3">{tpl.nombre}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {tpl.descripcion}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 4: Primary Color */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-1">
          {t.colorTitle}
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          {t.colorDesc}
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
              {t.colorClickToChange}
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
          {t.numberingTitle}
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          {t.numberingDesc}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-xs">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              {t.prefix}
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
              {t.preview}
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
          {t.expiryTitle}
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          {t.expiryDesc}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-xs">
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              {t.expiryDays}
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
              {t.preview}
            </label>
            <div className="px-3 py-2 text-sm bg-gray-50 border border-border rounded-lg text-muted-foreground">
              {t.expiryPreviewPre}<strong className="text-foreground">{t.expiryPreviewDays(form.diasVencimiento)}</strong>{t.expiryPreviewPost}
            </div>
          </div>
        </div>
      </div>

      {/* Section 7: Terms & Conditions */}
      <div id="condiciones" className="bg-white rounded-xl border border-border p-6 space-y-6">
        <div>
          <h3 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            {t.tcTitle}
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            {t.tcDesc}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-foreground">
              {t.tcTransactional} <span className="text-xs text-muted-foreground font-normal">{t.tcTransactionalHint}</span>
            </label>
            <TCTemplatesModal
              tipo="transaccional"
              lang={lang}
              onApply={(contenido) =>
                setForm((prev) => ({ ...prev, condicionesTransaccional: contenido }))
              }
            />
          </div>
          <textarea
            value={form.condicionesTransaccional || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, condicionesTransaccional: e.target.value || null }))
            }
            className={inputClass}
            rows={4}
            placeholder={t.tcTransactionalPlaceholder}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-foreground">
              {t.tcContractDefault} <span className="text-xs text-muted-foreground font-normal">{t.tcContractHint}</span>
            </label>
            <TCTemplatesModal
              tipo="contractual"
              lang={lang}
              onApply={(contenido) =>
                setForm((prev) => ({ ...prev, condicionesContractual: contenido }))
              }
            />
          </div>
          <textarea
            value={form.condicionesContractual || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, condicionesContractual: e.target.value || null }))
            }
            className={inputClass}
            rows={4}
            placeholder={t.tcContractPlaceholder}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            {t.tcGeneral} <span className="text-xs text-muted-foreground font-normal">{t.tcGeneralHint}</span>
          </label>
          <textarea
            value={form.condicionesDefecto || ""}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, condicionesDefecto: e.target.value || null }))
            }
            className={inputClass}
            rows={3}
            placeholder={t.tcGeneralPlaceholder}
          />
        </div>

        <p className="text-xs text-amber-600 flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
          {t.tcWarning}
        </p>
      </div>

      {/* Section 8: SMTP Email */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          {t.smtpTitle}
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          {t.smtpDesc}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              {t.smtpServer}
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
              {t.smtpPort}
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
              {t.smtpUser}
            </label>
            <input
              type="text"
              value={form.smtpUser || ""}
              onChange={(e) => updateField("smtpUser", e.target.value)}
              className={inputClass}
              placeholder={t.smtpUserPlaceholder}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              {t.smtpPass}
            </label>
            <div className="relative">
              <input
                type={showSmtpPass ? "text" : "password"}
                value={form.smtpPass || ""}
                onChange={(e) => updateField("smtpPass", e.target.value)}
                className={inputClass + " pr-10"}
                placeholder={t.smtpPassPlaceholder}
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
                {t.smtpSecure}
              </span>
            </label>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-xs font-semibold text-blue-800 mb-1.5">Gmail</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              {t.serverColon} <code className="bg-blue-100 px-1 rounded">smtp.gmail.com</code> &middot; {t.portColon} <code className="bg-blue-100 px-1 rounded">587</code> &middot; {t.sslColon} {t.sslOff}
            </p>
            <p className="text-xs text-blue-700 mt-1 leading-relaxed">
              <strong>{t.gmailRequiresApp}</strong>{t.gmailNote}
            </p>
            <ol className="text-xs text-blue-700 mt-1 ml-4 list-decimal space-y-0.5">
              {t.gmailSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
            <p className="text-xs font-semibold text-indigo-800 mb-1.5">Outlook / Microsoft 365</p>
            <p className="text-xs text-indigo-700 leading-relaxed">
              {t.serverColon} <code className="bg-indigo-100 px-1 rounded">smtp-mail.outlook.com</code> &middot; {t.portColon} <code className="bg-indigo-100 px-1 rounded">587</code> &middot; {t.sslColon} {t.sslOff}
            </p>
            <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
              {t.outlookNote}
            </p>
            <ol className="text-xs text-indigo-700 mt-1 ml-4 list-decimal space-y-0.5">
              {t.outlookSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <p className="text-[10px] text-indigo-500 mt-1">
              {t.outlookAdminNote}
            </p>
          </div>
          <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg">
            <p className="text-xs font-semibold text-purple-800 mb-1">Yahoo</p>
            <p className="text-xs text-purple-700 leading-relaxed">
              {t.serverColon} <code className="bg-purple-100 px-1 rounded">smtp.mail.yahoo.com</code> &middot; {t.portColon} <code className="bg-purple-100 px-1 rounded">465</code> &middot; {t.sslColon} <strong>{t.sslOn}</strong>
            </p>
          </div>
          <div className="p-3 bg-green-50 border border-green-100 rounded-lg flex items-start gap-2">
            <svg className="w-4 h-4 text-green-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
            <p className="text-xs text-green-700">
              <strong>{t.securityNoteStrong}</strong>{t.securityNote}
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
                    success(t.testEmailSent(form.smtpUser || form.email || ""));
                  } else {
                    showError(data.error || t.errTestEmail);
                  }
                } catch {
                  showError(t.errConnection);
                } finally {
                  setTestingEmail(false);
                }
              }}
              disabled={testingEmail}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
            >
              <Mail className="w-4 h-4" />
              {testingEmail ? t.testSending : t.sendTestEmail}
            </button>
          </div>
        )}
      </div>

      {/* Section 9: Recordatorios Automáticos */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-1 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          {t.remindersTitle}
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          {t.remindersDesc}
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
              <span className="text-sm font-medium text-foreground">{t.enableReminders}</span>
              <p className="text-xs text-muted-foreground">{t.remindersSchedule}</p>
            </div>
          </label>

          {form.recordatoriosActivos && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 pl-7">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  {t.reminderSellerDays}
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
                  {t.reminderSellerHint}
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  {t.reminderClientDays}
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
                  {t.reminderClientHint}
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
          {saving ? t.saving : t.saveConfig}
        </button>
      </div>
    </div>
  );
}

/* Mini visual mockup for each template */
function PlantillaMockup({
  tipo,
  color,
  t,
}: {
  tipo: string;
  color: string;
  t: { mockupQuote: string; mockupTotal: string; mockupTotalLine: string };
}) {
  if (tipo === "moderna") {
    return (
      <div className="w-full h-28 rounded-lg border border-gray-200 bg-white overflow-hidden text-[6px]">
        <div
          className="h-7 px-2 flex items-center justify-between"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
        >
          <div className="w-4 h-4 bg-white/30 rounded" />
          <div className="text-white font-bold text-[7px]">{t.mockupQuote}</div>
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
              {t.mockupTotal}
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
            {t.mockupQuote}
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
              {t.mockupTotal}
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
          {t.mockupQuote}
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
            {t.mockupTotalLine}
          </div>
        </div>
      </div>
    </div>
  );
}
