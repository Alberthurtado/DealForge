"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Settings,
  UserPlus,
  Package,
  FileText,
  Flame,
  Check,
  X,
  Rocket,
  ChevronRight,
} from "lucide-react";

interface OnboardingChecklistProps {
  steps: {
    empresaConfigured: boolean;
    hasClientes: boolean;
    hasProductos: boolean;
    hasCotizaciones: boolean;
  };
}

const DISMISS_KEY = "dealforge_onboarding_dismissed";
const FORGE_USED_KEY = "dealforge_onboarding_forge_used";

export function OnboardingChecklist({ steps }: OnboardingChecklistProps) {
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid hydration flash
  const [forgeUsed, setForgeUsed] = useState(false);

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISS_KEY) === "true");
    setForgeUsed(localStorage.getItem(FORGE_USED_KEY) === "true");
  }, []);

  const stepList = [
    {
      key: "empresa",
      label: "Configura tu empresa",
      desc: "Agrega el nombre, logo y datos de contacto",
      href: "/configuracion",
      icon: Settings,
      done: steps.empresaConfigured,
    },
    {
      key: "cliente",
      label: "Agrega tu primer cliente",
      desc: "Registra un cliente para empezar a cotizar",
      href: "/clientes/nuevo",
      icon: UserPlus,
      done: steps.hasClientes,
    },
    {
      key: "producto",
      label: "Agrega un producto al catálogo",
      desc: "Crea productos o servicios con precios",
      href: "/productos/nuevo",
      icon: Package,
      done: steps.hasProductos,
    },
    {
      key: "cotizacion",
      label: "Crea tu primera cotización",
      desc: "Genera una propuesta comercial profesional",
      href: "/cotizaciones/nueva",
      icon: FileText,
      done: steps.hasCotizaciones,
    },
    {
      key: "forge",
      label: "Prueba Forge IA",
      desc: "Tu asistente inteligente — haz clic en el botón de Forge abajo a la derecha",
      href: null,
      icon: Flame,
      done: forgeUsed,
    },
  ];

  const completedCount = stepList.filter((s) => s.done).length;
  const allDone = completedCount === stepList.length;

  if (dismissed || allDone) return null;

  const progress = (completedCount / stepList.length) * 100;

  function handleDismiss() {
    localStorage.setItem(DISMISS_KEY, "true");
    setDismissed(true);
  }

  function handleForgeClick() {
    localStorage.setItem(FORGE_USED_KEY, "true");
    setForgeUsed(true);
  }

  return (
    <div className="bg-white rounded-xl border border-border p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#3a9bb5]/10">
            <Rocket className="w-5 h-5 text-[#3a9bb5]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Guía de inicio rápido
            </h3>
            <p className="text-sm text-gray-500">
              Completa estos pasos para configurar DealForge
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          title="Ocultar guía"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
          <span>
            {completedCount} de {stepList.length} completados
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#3a9bb5] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {stepList.map((step, idx) => {
          const StepIcon = step.icon;

          const content = (
            <div
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                step.done
                  ? "border-transparent bg-gray-50"
                  : "border-gray-200 hover:border-[#3a9bb5]/30 hover:bg-[#3a9bb5]/5 cursor-pointer"
              }`}
            >
              {/* Circle */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  step.done
                    ? "bg-[#3a9bb5] text-white"
                    : "border-2 border-gray-300 text-gray-400"
                }`}
              >
                {step.done ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-semibold">{idx + 1}</span>
                )}
              </div>

              {/* Icon */}
              <div
                className={`flex-shrink-0 p-1.5 rounded-lg ${
                  step.done ? "bg-gray-100" : "bg-gray-50"
                }`}
              >
                <StepIcon
                  className={`w-4 h-4 ${
                    step.done ? "text-gray-400" : "text-gray-600"
                  }`}
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    step.done
                      ? "line-through text-gray-400"
                      : "text-gray-900"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
              </div>

              {/* Arrow */}
              {!step.done && (
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
            </div>
          );

          if (step.done) {
            return <div key={step.key}>{content}</div>;
          }

          if (step.key === "forge") {
            return (
              <button
                key={step.key}
                onClick={handleForgeClick}
                className="w-full text-left"
              >
                {content}
              </button>
            );
          }

          return (
            <Link key={step.key} href={step.href!}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
