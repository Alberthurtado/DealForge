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
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
      aria-label="Abrir Forge - Asistente IA"
      title="Abrir Forge - Asistente IA"
    >
      <Flame className="h-6 w-6" />
    </button>
  );
}
