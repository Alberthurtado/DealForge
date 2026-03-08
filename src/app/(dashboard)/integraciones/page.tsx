"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { ExportPanel } from "@/components/integraciones/export-panel";
import { ImportPanel } from "@/components/integraciones/import-panel";
import { ConectoresPanel } from "@/components/integraciones/conectores-panel";
import { Download, Upload, Plug } from "lucide-react";

const tabs = [
  { id: "exportar", label: "Exportar", icon: Download },
  { id: "importar", label: "Importar", icon: Upload },
  { id: "conectores", label: "Conectores", icon: Plug },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function IntegracionesPage() {
  const [activeTab, setActiveTab] = useState<TabId>("exportar");

  return (
    <div>
      <PageHeader
        title="Integraciones"
        description="Importa y exporta datos, conecta con tu CRM y ERP"
      />
      <div className="p-6 space-y-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl border border-border p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "exportar" && <ExportPanel />}
        {activeTab === "importar" && <ImportPanel />}
        {activeTab === "conectores" && <ConectoresPanel />}
      </div>
    </div>
  );
}
