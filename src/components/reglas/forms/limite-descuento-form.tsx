"use client";

import { useState } from "react";
import { useEmpresaLocale } from "@/lib/use-empresa-locale";
import { REGLAS_STRINGS } from "@/lib/reglas-i18n";

const inputClass =
  "w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-white";

interface Props {
  initial?: { nombre: string; configuracion: Record<string, unknown> };
  onSave: (nombre: string, configuracion: Record<string, unknown>) => void;
  saving: boolean;
}

export function LimiteDescuentoForm({ initial, onSave, saving }: Props) {
  const { lang } = useEmpresaLocale();
  const tf = REGLAS_STRINGS[lang].forms;
  const t = tf.limiteDescuento;
  const config = initial?.configuracion || {};
  const [nombre, setNombre] = useState(initial?.nombre || "");
  const [tipoLimite, setTipoLimite] = useState<string>(
    (config.tipoLimite as string) || "ambos"
  );
  const [maxLinea, setMaxLinea] = useState<number>(
    (config.maxDescuentoLinea as number) ?? 30
  );
  const [maxGlobal, setMaxGlobal] = useState<number>(
    (config.maxDescuentoGlobal as number) ?? 15
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const configuracion: Record<string, unknown> = { tipoLimite };
    if (tipoLimite === "linea" || tipoLimite === "ambos") {
      configuracion.maxDescuentoLinea = maxLinea;
    }
    if (tipoLimite === "global" || tipoLimite === "ambos") {
      configuracion.maxDescuentoGlobal = maxGlobal;
    }
    onSave(nombre, configuracion);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          {tf.ruleName}
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={inputClass}
          placeholder={t.namePlaceholder}
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1">
          {t.appliesTo}
        </label>
        <select
          value={tipoLimite}
          onChange={(e) => setTipoLimite(e.target.value)}
          className={inputClass}
        >
          <option value="ambos">{t.bothLineGlobal}</option>
          <option value="linea">{t.onlyLine}</option>
          <option value="global">{t.onlyGlobal}</option>
        </select>
      </div>
      {(tipoLimite === "linea" || tipoLimite === "ambos") && (
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            {t.maxPerLine}
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={maxLinea}
            onChange={(e) => setMaxLinea(Number(e.target.value))}
            className={inputClass}
          />
        </div>
      )}
      {(tipoLimite === "global" || tipoLimite === "ambos") && (
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            {t.maxGlobal}
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={maxGlobal}
            onChange={(e) => setMaxGlobal(Number(e.target.value))}
            className={inputClass}
          />
        </div>
      )}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={saving || !nombre}
          className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? tf.saving : initial ? tf.update : tf.createRule}
        </button>
      </div>
    </form>
  );
}
