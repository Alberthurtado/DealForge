"use client";

import { useState, useEffect, useRef } from "react";
import {
  Users,
  Package,
  Calculator,
  CheckCircle,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Save,
  Search,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ReglasWarnings } from "@/components/reglas/reglas-warnings";
import type { ValidationResult } from "@/lib/reglas-engine";
import { CotizacionTemplatePicker } from "@/components/cotizaciones/cotizacion-template-picker";
import type { CotizacionTemplate } from "@/data/cotizacion-templates";
import { DASHBOARD_STRINGS, resolveDashboardLang, type DashboardLang } from "@/lib/dashboard-i18n";

interface VarianteInfo {
  id: string;
  nombre: string;
  sku: string;
  precioOverride: number | null;
  atributos: string;
}

interface LineItemInput {
  productoId: string;
  varianteId?: string;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
  frecuencia?: string | null;
}

interface WizardData {
  clienteId: string;
  contactoNombre: string;
  lineItems: LineItemInput[];
  descuentoGlobal: number;
  incluirIva: boolean;
  impuesto: number;
  moneda: string;
  notas: string;
  condiciones: string;
  fechaVencimiento: string;
}

interface Props {
  preselectedClienteId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  saving?: boolean;
}

const STEP_ICONS = [Users, Package, Calculator, CheckCircle];

export function CotizacionWizard({
  preselectedClienteId,
  onSubmit,
  saving,
}: Props) {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState<DashboardLang>("es");
  const [numLocale, setNumLocale] = useState("es-ES");
  const t = DASHBOARD_STRINGS[lang].wizard;
  const money = (n: number) => formatCurrency(n, form.moneda, numLocale);
  const steps = [
    { id: 0, title: t.stepClient, icon: STEP_ICONS[0] },
    { id: 1, title: t.stepProducts, icon: STEP_ICONS[1] },
    { id: 2, title: t.stepPricing, icon: STEP_ICONS[2] },
    { id: 3, title: t.stepSummary, icon: STEP_ICONS[3] },
  ];
  const [clientes, setClientes] = useState<
    Array<{
      id: string;
      nombre: string;
      contactos?: Array<{ nombre: string; principal: boolean }>;
    }>
  >([]);
  const [productos, setProductos] = useState<
    Array<{
      id: string;
      nombre: string;
      sku: string;
      precioBase: number;
      unidad: string;
      tipoFacturacion?: string;
      frecuencia?: string | null;
      categoria: { nombre: string } | null;
      variantes?: VarianteInfo[];
    }>
  >([]);
  const [expandedVariantId, setExpandedVariantId] = useState<string | null>(null);
  const [clienteContacts, setClienteContacts] = useState<
    Array<{ id: string; nombre: string; cargo: string | null; email: string | null; telefono: string | null; principal: boolean }>
  >([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [clienteSearch, setClienteSearch] = useState("");
  const [productoSearch, setProductoSearch] = useState("");
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const empresaRef = useRef<any>(null);
  const [form, setForm] = useState<WizardData>({
    clienteId: preselectedClienteId || "",
    contactoNombre: "",
    lineItems: [],
    descuentoGlobal: 0,
    incluirIva: true,
    impuesto: 21,
    moneda: "EUR",
    notas: "",
    condiciones: "",
    fechaVencimiento: "",
  });

  useEffect(() => {
    fetch("/api/clientes").then((r) => r.json()).then(setClientes);
    fetch("/api/productos").then((r) => r.json()).then(setProductos);
    fetch("/api/empresa").then((r) => r.json()).then((empresa) => {
      empresaRef.current = empresa;
      // Localize wizard + default currency/VAT from the company.
      const empLang = resolveDashboardLang(empresa?.locale);
      setLang(empLang);
      setNumLocale(empresa?.locale || "es-ES");
      const country = (empresa?.country || "ES").toUpperCase();
      const defaultVat = country === "GB" ? 20 : country === "IE" ? 23 : country === "DE" ? 19 : country === "US" ? 0 : 21;
      setForm((f) => ({
        ...f,
        moneda: empresa?.currencyCode || f.moneda,
        impuesto: defaultVat,
        incluirIva: defaultVat > 0,
      }));
    }).catch(() => {});
  }, []);

  // Update T&C when entering Precios step based on line item types
  const userEditedCondiciones = useRef(false);
  useEffect(() => {
    if (step !== 2 || !empresaRef.current || userEditedCondiciones.current) return;
    const empresa = empresaRef.current;
    setForm((f) => {
      const hasRecurring = f.lineItems.some((li) => li.frecuencia);
      const hasOneTime = f.lineItems.some((li) => !li.frecuencia);
      const parts: string[] = [];
      if (hasOneTime && empresa.condicionesTransaccional) parts.push(empresa.condicionesTransaccional);
      if (hasRecurring && empresa.condicionesContractual) parts.push(empresa.condicionesContractual);
      if (parts.length > 0) return { ...f, condiciones: parts.join("\n\n---\n\n") };
      return { ...f, condiciones: empresa.condicionesDefecto || "" };
    });
  }, [step]);

  // Fetch contacts when client changes
  useEffect(() => {
    if (!form.clienteId) {
      setClienteContacts([]);
      return;
    }
    setLoadingContacts(true);
    fetch(`/api/clientes/${form.clienteId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.contactos) {
          setClienteContacts(data.contactos);
          // Auto-select principal contact if no contact is set yet
          if (!form.contactoNombre) {
            const principal = data.contactos.find((c: { principal: boolean }) => c.principal);
            if (principal) {
              setForm((f) => ({ ...f, contactoNombre: principal.nombre }));
            }
          }
        }
      })
      .catch(() => setClienteContacts([]))
      .finally(() => setLoadingContacts(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.clienteId]);

  // Validate rules on step 3
  useEffect(() => {
    if (step !== 3 || form.lineItems.length === 0) return;
    const sub = form.lineItems.reduce((s, i) => s + i.cantidad * i.precioUnitario * (1 - i.descuento / 100), 0);
    const subDesc = sub * (1 - form.descuentoGlobal / 100);
    const ivaEff = form.incluirIva ? form.impuesto : 0;
    const tot = subDesc + subDesc * (ivaEff / 100);
    fetch("/api/reglas/validar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lineItems: form.lineItems,
        descuentoGlobal: form.descuentoGlobal,
        subtotal: sub,
        total: tot,
      }),
    })
      .then((r) => r.json())
      .then(setValidationResult)
      .catch(() => {});
  }, [step, form.lineItems, form.descuentoGlobal, form.impuesto, form.incluirIva]);

  const selectedCliente = clientes.find((c) => c.id === form.clienteId);

  function addProducto(producto: (typeof productos)[0]) {
    // If product has variants, expand the picker instead
    if (producto.variantes && producto.variantes.length > 0) {
      setExpandedVariantId(expandedVariantId === producto.id ? null : producto.id);
      return;
    }
    setForm((f) => ({
      ...f,
      lineItems: [
        ...f.lineItems,
        {
          productoId: producto.id,
          descripcion: producto.nombre,
          cantidad: 1,
          precioUnitario: producto.precioBase,
          descuento: 0,
          frecuencia: producto.tipoFacturacion === "RECURRENTE" ? producto.frecuencia : null,
        },
      ],
    }));
  }

  function addProductoConVariante(
    producto: (typeof productos)[0],
    variante: VarianteInfo
  ) {
    const precio = variante.precioOverride ?? producto.precioBase;
    setForm((f) => ({
      ...f,
      lineItems: [
        ...f.lineItems,
        {
          productoId: producto.id,
          varianteId: variante.id,
          descripcion: `${producto.nombre} - ${variante.nombre}`,
          cantidad: 1,
          precioUnitario: precio,
          descuento: 0,
          frecuencia: producto.tipoFacturacion === "RECURRENTE" ? producto.frecuencia : null,
        },
      ],
    }));
    setExpandedVariantId(null);
  }

  function addProductoSinVariante(producto: (typeof productos)[0]) {
    setForm((f) => ({
      ...f,
      lineItems: [
        ...f.lineItems,
        {
          productoId: producto.id,
          descripcion: producto.nombre,
          cantidad: 1,
          precioUnitario: producto.precioBase,
          descuento: 0,
          frecuencia: producto.tipoFacturacion === "RECURRENTE" ? producto.frecuencia : null,
        },
      ],
    }));
    setExpandedVariantId(null);
  }

  function updateLineItem(
    index: number,
    field: keyof LineItemInput,
    value: string | number
  ) {
    setForm((f) => {
      const items = [...f.lineItems];
      items[index] = { ...items[index], [field]: value };
      return { ...f, lineItems: items };
    });
  }

  function removeLineItem(index: number) {
    setForm((f) => ({
      ...f,
      lineItems: f.lineItems.filter((_, i) => i !== index),
    }));
  }

  function addCustomLine() {
    setForm((f) => ({
      ...f,
      lineItems: [
        ...f.lineItems,
        {
          productoId: "",
          descripcion: "",
          cantidad: 1,
          precioUnitario: 0,
          descuento: 0,
        },
      ],
    }));
  }

  function applyTemplate(template: CotizacionTemplate) {
    userEditedCondiciones.current = true;
    setForm((f) => ({
      ...f,
      lineItems: template.lineItems.map((li) => ({
        productoId: "",
        descripcion: li.descripcion,
        cantidad: li.cantidad,
        precioUnitario: li.precioUnitario,
        descuento: li.descuento || 0,
        frecuencia: li.frecuencia || null,
      })),
      notas: template.notas,
      condiciones: template.condiciones,
    }));
  }

  // Calculations
  const subtotal = form.lineItems.reduce((sum, item) => {
    return sum + item.cantidad * item.precioUnitario * (1 - item.descuento / 100);
  }, 0);
  const subtotalConDescuento = subtotal * (1 - form.descuentoGlobal / 100);
  const impuestoEfectivo = form.incluirIva ? form.impuesto : 0;
  const impuestoMonto = subtotalConDescuento * (impuestoEfectivo / 100);
  const total = subtotalConDescuento + impuestoMonto;

  const canProceed = () => {
    if (step === 0) return !!form.clienteId;
    if (step === 1) return form.lineItems.length > 0;
    return true;
  };

  const inputClass =
    "w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div>
      {/* Steps indicator */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <button
              onClick={() => i <= step && setStep(i)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                step === i
                  ? "bg-primary text-primary-foreground"
                  : i < step
                  ? "bg-green-100 text-green-700"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <s.icon className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">
                {s.title}
              </span>
            </button>
            {i < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Select Client */}
      {step === 0 && (
        <div className="bg-white rounded-xl border border-border p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {t.selectClient}
          </h3>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t.searchClient}
              value={clienteSearch}
              onChange={(e) => setClienteSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {clientes
              .filter(
                (c) =>
                  !clienteSearch ||
                  c.nombre.toLowerCase().includes(clienteSearch.toLowerCase())
              )
              .map((cliente) => (
                <button
                  key={cliente.id}
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      clienteId: cliente.id,
                      contactoNombre: f.clienteId !== cliente.id ? "" : f.contactoNombre,
                    }))
                  }
                  onDoubleClick={() => {
                    setForm((f) => ({
                      ...f,
                      clienteId: cliente.id,
                      contactoNombre: f.clienteId !== cliente.id ? "" : f.contactoNombre,
                    }));
                    setStep(1);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg border transition-colors",
                    form.clienteId === cliente.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  )}
                >
                  <p className="text-sm font-medium text-foreground">
                    {cliente.nombre}
                  </p>
                </button>
              ))}
          </div>
          {selectedCliente && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-1">
                {t.contact}
              </label>
              {loadingContacts ? (
                <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  {t.loadingContacts}
                </div>
              ) : clienteContacts.length > 0 ? (
                <div className="space-y-2">
                  <select
                    value={
                      clienteContacts.some((c) => c.nombre === form.contactoNombre)
                        ? form.contactoNombre
                        : form.contactoNombre
                          ? "__custom__"
                          : ""
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "__custom__") {
                        setForm((f) => ({ ...f, contactoNombre: "" }));
                      } else {
                        setForm((f) => ({ ...f, contactoNombre: val }));
                      }
                    }}
                    className={inputClass}
                  >
                    <option value="">{t.selectContact}</option>
                    {clienteContacts.map((c) => (
                      <option key={c.id} value={c.nombre}>
                        {c.nombre}
                        {c.cargo ? ` — ${c.cargo}` : ""}
                        {c.principal ? t.primary : ""}
                      </option>
                    ))}
                    <option value="__custom__">{t.writeOther}</option>
                  </select>
                  {/* Show contact details when one is selected */}
                  {form.contactoNombre &&
                    clienteContacts.some((c) => c.nombre === form.contactoNombre) && (
                      <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 space-y-0.5">
                        {clienteContacts
                          .filter((c) => c.nombre === form.contactoNombre)
                          .map((c) => (
                            <div key={c.id}>
                              {c.cargo && <p>{t.role}: {c.cargo}</p>}
                              {c.email && <p>{t.email}: {c.email}</p>}
                              {c.telefono && <p>{t.phone}: {c.telefono}</p>}
                            </div>
                          ))}
                      </div>
                    )}
                  {/* Show text input for custom name */}
                  {form.contactoNombre !== "" &&
                    !clienteContacts.some((c) => c.nombre === form.contactoNombre) && (
                      <input
                        type="text"
                        value={form.contactoNombre}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, contactoNombre: e.target.value }))
                        }
                        className={inputClass}
                        placeholder={t.contactName}
                        autoFocus
                      />
                    )}
                </div>
              ) : (
                <input
                  type="text"
                  value={form.contactoNombre}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, contactoNombre: e.target.value }))
                  }
                  className={inputClass}
                  placeholder={t.contactName}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* Step 1: Add Products */}
      {step === 1 && (
        <div className="space-y-4">
          {/* Template picker banner */}
          <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-[#3a9bb5]/5 to-[#3a9bb5]/10 border border-[#3a9bb5]/20 rounded-xl px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {t.templateBannerTitle}
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                {t.templateBannerSub}
              </p>
            </div>
            <CotizacionTemplatePicker
              onApply={applyTemplate}
              lang={lang}
              moneda={form.moneda}
              numLocale={numLocale}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product catalog */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="text-base font-semibold text-foreground mb-3">
              {t.productCatalog}
            </h3>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t.searchProduct}
                value={productoSearch}
                onChange={(e) => setProductoSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {productos
                .filter(
                  (p) =>
                    !productoSearch ||
                    p.nombre
                      .toLowerCase()
                      .includes(productoSearch.toLowerCase()) ||
                    p.sku.toLowerCase().includes(productoSearch.toLowerCase())
                )
                .map((p) => (
                  <div key={p.id}>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
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
                          {p.sku} &middot; {money(p.precioBase)}/{p.unidad}
                        </p>
                      </div>
                      <button
                        onClick={() => addProducto(p)}
                        className="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Variant picker */}
                    {expandedVariantId === p.id && p.variantes && (
                      <div className="ml-4 mt-1 mb-2 border-l-2 border-primary/20 pl-3 space-y-1.5">
                        {p.variantes.map((v) => {
                          const attrs = (() => { try { return JSON.parse(v.atributos); } catch { return {}; } })();
                          return (
                            <div
                              key={v.id}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                            >
                              <div>
                                <p className="text-sm font-medium">{v.nombre}</p>
                                <p className="text-xs text-muted-foreground">
                                  {v.sku} &middot; {money(v.precioOverride ?? p.precioBase)}
                                  {Object.entries(attrs).length > 0 && (
                                    <span className="ml-1">
                                      {Object.entries(attrs).map(([k, val]) => (
                                        <span key={k} className="inline-block ml-1 px-1 py-0.5 bg-white border border-border rounded text-[10px]">
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
                          {t.addWithoutVariant}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <button
              onClick={addCustomLine}
              className="mt-3 w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              {t.addCustomLine}
            </button>
          </div>

          {/* Selected items */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="text-base font-semibold text-foreground mb-3">
              {t.selectedItems} ({form.lineItems.length})
            </h3>
            {form.lineItems.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                {t.addFromCatalog}
              </p>
            ) : (
              <div className="space-y-3">
                {form.lineItems.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 border border-border rounded-lg space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <input
                        type="text"
                        value={item.descripcion}
                        onChange={(e) =>
                          updateLineItem(i, "descripcion", e.target.value)
                        }
                        className="text-sm font-medium bg-transparent focus:outline-none flex-1"
                        placeholder={t.description}
                      />
                      <button
                        onClick={() => removeLineItem(i)}
                        className="p-1 text-destructive hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs text-muted-foreground">
                          {t.quantity}
                        </label>
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={item.cantidad}
                          onChange={(e) =>
                            updateLineItem(
                              i,
                              "cantidad",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full px-2 py-1 text-sm border border-border rounded"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">
                          {t.unitPrice}
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.precioUnitario}
                          onChange={(e) =>
                            updateLineItem(
                              i,
                              "precioUnitario",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full px-2 py-1 text-sm border border-border rounded"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">
                          {t.discountPct}
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={item.descuento}
                          onChange={(e) =>
                            updateLineItem(
                              i,
                              "descuento",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full px-2 py-1 text-sm border border-border rounded"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-right text-muted-foreground">
                      {t.subtotal}:{" "}
                      {money(
                        item.cantidad *
                          item.precioUnitario *
                          (1 - item.descuento / 100)
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          </div>
        </div>
      )}

      {/* Step 2: Pricing */}
      {step === 2 && (
        <div className="bg-white rounded-xl border border-border p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {t.pricingConditions}
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t.globalDiscount}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={form.descuentoGlobal}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    descuentoGlobal: parseFloat(e.target.value) || 0,
                  }))
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t.vat}
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={form.incluirIva}
                    onClick={() =>
                      setForm((f) => ({ ...f, incluirIva: !f.incluirIva }))
                    }
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      form.incluirIva ? "bg-primary" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
                        form.incluirIva ? "translate-x-[18px]" : "translate-x-[3px]"
                      }`}
                    />
                  </button>
                  <span className="text-sm text-foreground">
                    {form.incluirIva ? t.includeVat : t.noVat}
                  </span>
                </label>
                {form.incluirIva && (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.5"
                      value={form.impuesto}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          impuesto: parseFloat(e.target.value) || 0,
                        }))
                      }
                      className={`${inputClass} w-24`}
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t.currency}
              </label>
              <select
                value={form.moneda}
                onChange={(e) =>
                  setForm((f) => ({ ...f, moneda: e.target.value }))
                }
                className={inputClass}
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                {t.dueDate}
              </label>
              <input
                type="date"
                value={form.fechaVencimiento}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    fechaVencimiento: e.target.value,
                  }))
                }
                className={inputClass}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-1">
              {t.notes}
            </label>
            <textarea
              value={form.notas}
              onChange={(e) =>
                setForm((f) => ({ ...f, notas: e.target.value }))
              }
              className={inputClass}
              rows={2}
              placeholder={t.notesPlaceholder}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {t.terms}
            </label>
            <textarea
              value={form.condiciones}
              onChange={(e) => {
                userEditedCondiciones.current = true;
                setForm((f) => ({ ...f, condiciones: e.target.value }));
              }}
              className={inputClass}
              rows={3}
              placeholder={t.termsPlaceholder}
            />
          </div>

          {/* Price summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t.subtotal}</span>
              <span>{money(subtotal)}</span>
            </div>
            {form.descuentoGlobal > 0 && (
              <div className="flex justify-between text-sm text-red-600">
                <span>{t.discount} ({form.descuentoGlobal}%)</span>
                <span>
                  -{money(subtotal * (form.descuentoGlobal / 100))}
                </span>
              </div>
            )}
            {form.incluirIva ? (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {t.vat} ({form.impuesto}%)
                </span>
                <span>{money(impuestoMonto)}</span>
              </div>
            ) : (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground italic">{t.vatNotIncluded}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold border-t border-border pt-2">
              <span>{t.total}</span>
              <span>{money(total)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Summary */}
      {step === 3 && (
        <div className="bg-white rounded-xl border border-border p-6 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {t.summaryTitle}
          </h3>
          {validationResult && (
            <div className="mb-4">
              <ReglasWarnings
                violaciones={validationResult.violaciones}
                aprobacionesRequeridas={validationResult.aprobacionesRequeridas}
                promocionesAplicables={validationResult.promocionesAplicables}
                productosDisponibles={productos.map((p) => ({
                  id: p.id,
                  nombre: p.nombre,
                  precioBase: p.precioBase,
                }))}
                onAddProducto={(productoId, cantidad, precioUnitario) => {
                  const prod = productos.find((p) => p.id === productoId);
                  if (!prod) return;
                  setForm((f) => ({
                    ...f,
                    lineItems: [
                      ...f.lineItems,
                      {
                        productoId,
                        descripcion: prod.nombre,
                        cantidad,
                        precioUnitario,
                        descuento: 0,
                      },
                    ],
                  }));
                }}
                onApplyPromocion={(promo) => {
                  setForm((f) => ({
                    ...f,
                    lineItems: f.lineItems.map((item) => {
                      if (!promo.productoIds.includes(item.productoId)) return item;
                      if (promo.tipoPromocion === "descuento_porcentaje") {
                        return { ...item, descuento: Math.max(item.descuento, promo.valor) };
                      }
                      return { ...item, precioUnitario: promo.valor };
                    }),
                  }));
                }}
              />
            </div>
          )}
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-muted-foreground">{t.client}</p>
              <p className="text-base font-semibold">
                {selectedCliente?.nombre}
              </p>
              {form.contactoNombre && (
                <p className="text-sm text-muted-foreground">
                  {t.contactColon}: {form.contactoNombre}
                </p>
              )}
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2">{t.colDescription}</th>
                  <th className="text-right py-2">{t.colQty}</th>
                  <th className="text-right py-2">{t.colPrice}</th>
                  <th className="text-right py-2">{t.colDiscount}</th>
                  <th className="text-right py-2">{t.colTotal}</th>
                </tr>
              </thead>
              <tbody>
                {form.lineItems.map((item, i) => {
                  const lineTotal =
                    item.cantidad *
                    item.precioUnitario *
                    (1 - item.descuento / 100);
                  return (
                    <tr key={i} className="border-b border-border">
                      <td className="py-2">{item.descripcion}</td>
                      <td className="text-right py-2">{item.cantidad}</td>
                      <td className="text-right py-2">
                        {money(item.precioUnitario)}
                      </td>
                      <td className="text-right py-2">
                        {item.descuento > 0 ? `${item.descuento}%` : "-"}
                      </td>
                      <td className="text-right py-2 font-medium">
                        {money(lineTotal)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="p-4 bg-gray-50 rounded-lg space-y-1">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              {form.descuentoGlobal > 0 && (
                <div className="flex justify-between text-sm text-red-600">
                  <span>{t.discount} ({form.descuentoGlobal}%)</span>
                  <span>
                    -{money(subtotal * (form.descuentoGlobal / 100))}
                  </span>
                </div>
              )}
              {form.incluirIva ? (
                <div className="flex justify-between text-sm">
                  <span>{t.vat} ({form.impuesto}%)</span>
                  <span>{money(impuestoMonto)}</span>
                </div>
              ) : (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground italic">{t.vatNotIncluded}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t border-border pt-2 mt-2">
                <span>{t.total}</span>
                <span>{money(total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6 max-w-3xl mx-auto">
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          {t.previous}
        </button>

        {step < 3 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canProceed()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-30 transition-colors"
          >
            {t.next}
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => onSubmit({ ...form, impuesto: impuestoEfectivo })}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving
              ? t.creating
              : validationResult?.aprobacionesRequeridas?.length
                ? t.createQuoteApproval
                : t.createQuote}
          </button>
        )}
      </div>
    </div>
  );
}
