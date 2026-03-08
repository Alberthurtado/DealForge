"use client";

import { useState } from "react";
import { Globe, Zap, Cloud, Database, Building2, BarChart3, ShoppingCart, Briefcase, Save, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface Conector {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: "crm" | "erp" | "webhook";
  icon: typeof Globe;
  color: string;
  disponible: boolean;
}

const CONECTORES: Conector[] = [
  // CRMs
  { id: "salesforce", nombre: "Salesforce", descripcion: "Sincroniza clientes, contactos y oportunidades con Salesforce CRM", tipo: "crm", icon: Cloud, color: "text-blue-600 bg-blue-50", disponible: false },
  { id: "hubspot", nombre: "HubSpot", descripcion: "Conecta con HubSpot CRM para gestionar contactos y deals", tipo: "crm", icon: BarChart3, color: "text-orange-600 bg-orange-50", disponible: false },
  { id: "pipedrive", nombre: "Pipedrive", descripcion: "Sincroniza pipeline de ventas y contactos con Pipedrive", tipo: "crm", icon: Briefcase, color: "text-green-600 bg-green-50", disponible: false },
  { id: "zoho", nombre: "Zoho CRM", descripcion: "Integra con Zoho CRM para gestionar leads y cotizaciones", tipo: "crm", icon: Globe, color: "text-red-600 bg-red-50", disponible: false },
  // ERPs
  { id: "sap", nombre: "SAP Business One", descripcion: "Conecta con SAP B1 para sincronizar productos, clientes y pedidos", tipo: "erp", icon: Database, color: "text-indigo-600 bg-indigo-50", disponible: false },
  { id: "odoo", nombre: "Odoo", descripcion: "Integra con Odoo ERP para inventario, facturacion y contabilidad", tipo: "erp", icon: ShoppingCart, color: "text-purple-600 bg-purple-50", disponible: false },
  { id: "holded", nombre: "Holded", descripcion: "Sincroniza facturas, productos y clientes con Holded", tipo: "erp", icon: Building2, color: "text-teal-600 bg-teal-50", disponible: false },
  { id: "a3erp", nombre: "A3ERP", descripcion: "Conecta con A3ERP para contabilidad y gestion empresarial", tipo: "erp", icon: Database, color: "text-cyan-600 bg-cyan-50", disponible: false },
  // Webhook
  { id: "webhook", nombre: "Webhook", descripcion: "Envia notificaciones HTTP cuando se crean o actualizan cotizaciones", tipo: "webhook", icon: Zap, color: "text-amber-600 bg-amber-50", disponible: true },
];

export function ConectoresPanel() {
  const { success, error: showError } = useToast();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookExpanded, setWebhookExpanded] = useState(false);
  const [savingWebhook, setSavingWebhook] = useState(false);
  const [webhookSaved, setWebhookSaved] = useState(false);

  const crms = CONECTORES.filter((c) => c.tipo === "crm");
  const erps = CONECTORES.filter((c) => c.tipo === "erp");
  const webhook = CONECTORES.find((c) => c.tipo === "webhook")!;

  async function saveWebhook() {
    if (!webhookUrl.trim()) return;
    setSavingWebhook(true);
    // Save to empresa config (localStorage for now until we add DB field)
    try {
      localStorage.setItem("dealforge_webhook_url", webhookUrl);
      setWebhookSaved(true);
      success("Webhook configurado correctamente");
      setTimeout(() => setWebhookSaved(false), 3000);
    } catch {
      showError("Error al guardar");
    } finally {
      setSavingWebhook(false);
    }
  }

  function ConectorCard({ conector }: { conector: Conector }) {
    if (conector.tipo === "webhook") {
      return (
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${conector.color}`}>
              <conector.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold">{conector.nombre}</h4>
                <span className="inline-flex px-1.5 py-0.5 text-[10px] font-medium bg-green-100 text-green-700 rounded-full">
                  Disponible
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{conector.descripcion}</p>
            </div>
            <button
              onClick={() => setWebhookExpanded(!webhookExpanded)}
              className="text-xs text-primary font-medium hover:text-primary/80 transition-colors"
            >
              {webhookExpanded ? "Cerrar" : "Configurar"}
            </button>
          </div>
          {webhookExpanded && (
            <div className="mt-4 pt-4 border-t border-border space-y-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  URL del Webhook
                </label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://tu-servidor.com/webhook"
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Recibiremos un POST con los datos de la cotizacion cuando se cree o cambie de estado.
              </p>
              <button
                onClick={saveWebhook}
                disabled={savingWebhook || !webhookUrl.trim()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {savingWebhook ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : webhookSaved ? (
                  <CheckCircle className="w-3.5 h-3.5" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                {webhookSaved ? "Guardado" : "Guardar"}
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${conector.color}`}>
            <conector.icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold">{conector.nombre}</h4>
              <span className="inline-flex px-1.5 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-500 rounded-full">
                Proximamente
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{conector.descripcion}</p>
          </div>
        </div>
        <button
          disabled
          className="mt-3 w-full px-3 py-1.5 text-xs font-medium border border-border rounded-lg text-muted-foreground bg-muted/50 cursor-not-allowed"
        >
          Conectar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Webhook - active */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          Webhook
        </h3>
        <ConectorCard conector={webhook} />
      </div>

      {/* CRMs */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-500" />
          CRMs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crms.map((c) => (
            <ConectorCard key={c.id} conector={c} />
          ))}
        </div>
      </div>

      {/* ERPs */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-500" />
          ERPs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {erps.map((c) => (
            <ConectorCard key={c.id} conector={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
