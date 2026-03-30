"use client";

import { useState, useEffect } from "react";
import { MessageSquare, BarChart3, Lightbulb, Package, Flame, ArrowRight } from "lucide-react";

interface ChatMessage {
  role: "user" | "forge";
  content: string;
  action?: string;
}

interface Capability {
  id: string;
  icon: typeof MessageSquare;
  title: string;
  subtitle: string;
  messages: ChatMessage[];
}

const CAPABILITIES: Capability[] = [
  {
    id: "crear",
    icon: MessageSquare,
    title: "Crea cotizaciones al instante",
    subtitle: "Pide lo que necesites en lenguaje natural",
    messages: [
      { role: "user", content: "Hazme una cotización para Empresa ABC con 10 licencias Premium y 5 básicas" },
      { role: "forge", content: "He creado la cotización **COT-2026-0142** para Empresa ABC:\n\n- 10x Licencia Premium — 1.500,00 EUR\n- 5x Licencia Básica — 250,00 EUR\n\n**Subtotal:** 1.750,00 EUR\n**IVA (21%):** 367,50 EUR\n**Total:** 2.117,50 EUR\n\nLos términos y condiciones por defecto ya están aplicados.", action: "Ver cotización" },
    ],
  },
  {
    id: "analisis",
    icon: BarChart3,
    title: "Analiza tu pipeline",
    subtitle: "Métricas en tiempo real de tu negocio",
    messages: [
      { role: "user", content: "Dame un resumen del pipeline de ventas" },
      { role: "forge", content: "Tu pipeline actual:\n\n📊 **8 cotizaciones activas** por 24.350 EUR\n✅ **Tasa de conversión:** 67%\n💰 **Ticket promedio:** 3.044 EUR\n📈 **Ingresos este mes:** 12.175 EUR\n\nTienes **3 cotizaciones en negociación** que suman 15.200 EUR. Recomiendo hacer follow-up a las que llevan más de 5 días sin actividad." },
    ],
  },
  {
    id: "followup",
    icon: Lightbulb,
    title: "Recomendaciones inteligentes",
    subtitle: "Forge detecta oportunidades automáticamente",
    messages: [
      { role: "user", content: "¿Qué clientes necesitan follow-up?" },
      { role: "forge", content: "Encontré **3 cotizaciones** que necesitan atención:\n\n1. **COT-2026-0089** — Industrias Metálicas (12.500 EUR)\n   Estado: Negociación · Sin actividad: 8 días\n\n2. **COT-2026-0091** — Tech Solutions (5.800 EUR)\n   Estado: Enviada · Sin abrir: 5 días\n\n3. **COT-2026-0095** — Distribuciones Martínez (3.200 EUR)\n   Estado: Negociación · Vence en 3 días\n\nSugerencia: Empezar por Industrias Metálicas, es la de mayor valor.", action: "Ver cotización" },
    ],
  },
  {
    id: "productos",
    icon: Package,
    title: "Gestiona tu catálogo",
    subtitle: "Crea y modifica productos conversando",
    messages: [
      { role: "user", content: "Crea un producto Consultoría Premium a 175 EUR/hora en la categoría Servicios" },
      { role: "forge", content: "Producto creado:\n\n🏷️ **Consultoría Premium**\nSKU: SRV-CON-001\nPrecio: 175,00 EUR/hora\nCategoría: Servicios\nEstado: Activo\n\nYa puedes incluirlo en tus cotizaciones.", action: "Ver producto" },
    ],
  },
];

function formatMessage(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />');
}

export function ForgeShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  // Start with all messages of tab 0 visible (avoids blank on SSR hydration)
  const [visibleMessages, setVisibleMessages] = useState<number[]>(
    () => CAPABILITIES[0].messages.map((_, i) => i)
  );
  const [hasChangedTab, setHasChangedTab] = useState(false);
  const active = CAPABILITIES[activeTab];

  // Only animate on tab CHANGE (not initial mount)
  useEffect(() => {
    if (!hasChangedTab) return;

    setVisibleMessages([]);

    const timers: ReturnType<typeof setTimeout>[] = [];
    active.messages.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleMessages((prev) => [...prev, i]);
        }, i * 300 + 100)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [activeTab, active.messages, hasChangedTab]);

  function handleTabChange(i: number) {
    if (i === activeTab) return;
    setHasChangedTab(true);
    setActiveTab(i);
  }

  return (
    <section id="forge" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0f9ff] via-white to-white" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3a9bb5]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#3a9bb5]/10 text-[#3a9bb5] text-sm font-semibold rounded-full mb-4">
            <Flame className="w-4 h-4" />
            Inteligencia Artificial
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Conoce a <span className="text-[#3a9bb5]">Forge</span>, tu asistente comercial
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Forge entiende tu negocio, tus productos y tus clientes.
            Pide lo que necesites en lenguaje natural y él se encarga del resto.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Tabs - left */}
          <div className="lg:col-span-2 space-y-3">
            {CAPABILITIES.map((cap, i) => (
              <button
                key={cap.id}
                onClick={() => handleTabChange(i)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
                  activeTab === i
                    ? "border-[#3a9bb5] bg-white shadow-lg shadow-[#3a9bb5]/10"
                    : "border-transparent bg-white/60 hover:bg-white hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      activeTab === i
                        ? "bg-[#3a9bb5] text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <cap.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${activeTab === i ? "text-gray-900" : "text-gray-700"}`}>
                      {cap.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{cap.subtitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Chat mockup - right */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <div className="w-9 h-9 rounded-xl bg-[#3a9bb5] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Forge</p>
                  <p className="text-xs text-gray-500">Asistente IA de DealForge</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-600 font-medium">En línea</span>
                </div>
              </div>

              {/* Messages — state-driven animation */}
              <div className="p-6 space-y-4 min-h-[380px]">
                {active.messages.map((msg, i) => {
                  const isVisible = visibleMessages.includes(i);
                  return (
                    <div
                      key={`${activeTab}-${i}`}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} transition-all duration-300`}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? "translateY(0)" : "translateY(12px)",
                      }}
                    >
                      {msg.role === "forge" && (
                        <div className="w-7 h-7 rounded-lg bg-[#3a9bb5] flex items-center justify-center mr-2 mt-1 shrink-0">
                          <Flame className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-[#3a9bb5] text-white rounded-br-md"
                            : "bg-gray-50 text-gray-800 border border-gray-100 rounded-bl-md"
                        }`}
                      >
                        <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                        {msg.action && (
                          <button className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#3a9bb5] bg-white px-3 py-1.5 rounded-lg border border-[#3a9bb5]/20 hover:bg-[#3a9bb5]/5 transition-colors">
                            {msg.action}
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input mockup */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30">
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5">
                  <span className="text-sm text-gray-400 flex-1">Escribe tu pregunta...</span>
                  <div className="w-8 h-8 rounded-lg bg-[#3a9bb5] flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
