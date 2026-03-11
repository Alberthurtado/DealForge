"use client";

import { Flame } from "lucide-react";

interface AssistantButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export function AssistantButton({ onClick, isOpen }: AssistantButtonProps) {
  if (isOpen) return null;

  return (
    <button
      onClick={onClick}
      className="forge-fire-btn fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
      aria-label="Abrir Forge - Asistente IA"
      title="Abrir Forge - Asistente IA"
    >
      {/* Animated fire particles */}
      <span className="forge-fire-particle forge-fire-particle-1" />
      <span className="forge-fire-particle forge-fire-particle-2" />
      <span className="forge-fire-particle forge-fire-particle-3" />
      <span className="forge-fire-particle forge-fire-particle-4" />
      <span className="forge-fire-particle forge-fire-particle-5" />
      <span className="forge-fire-particle forge-fire-particle-6" />

      {/* Glow ring */}
      <span className="forge-fire-glow" />

      {/* Icon */}
      <Flame className="relative z-10 h-6 w-6 forge-fire-icon" />
    </button>
  );
}
