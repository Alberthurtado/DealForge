"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import type { Termino } from "@/data/glosario";
import { agruparPorLetra } from "@/data/glosario";

const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function normalize(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function GlosarioContent({ terminos }: { terminos: Termino[] }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return terminos;
    const q = normalize(query.trim());
    return terminos.filter(
      (t) =>
        normalize(t.nombre).includes(q) ||
        normalize(t.definicion).includes(q)
    );
  }, [query, terminos]);

  const porLetra = useMemo(() => agruparPorLetra(filtered), [filtered]);
  const letrasDisponibles = Object.keys(porLetra).sort((a, b) => a.localeCompare(b, "es"));

  return (
    <>
      {/* Search bar */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-6 mb-8 relative z-30">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar un termino... (ej: pipeline, CPQ, cotizacion)"
            className="w-full pl-12 pr-10 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 shadow-lg shadow-gray-100/50 focus:outline-none focus:ring-2 focus:ring-[#3a9bb5]/30 focus:border-[#3a9bb5] transition-all"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {query && (
          <p className="text-xs text-gray-400 mt-2 text-center">
            {filtered.length === 0
              ? "No se encontraron resultados"
              : `${filtered.length} termino${filtered.length !== 1 ? "s" : ""} encontrado${filtered.length !== 1 ? "s" : ""}`}
          </p>
        )}
      </div>

      {/* Alphabet navigation */}
      <nav className="sticky top-[65px] z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap gap-1.5 justify-center">
          {ALFABETO.map((letra) => {
            const disponible = letrasDisponibles.includes(letra);
            return disponible ? (
              <a
                key={letra}
                href={`#letra-${letra}`}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold text-[#3a9bb5] hover:bg-[#3a9bb5] hover:text-white transition-colors"
              >
                {letra}
              </a>
            ) : (
              <span
                key={letra}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold text-gray-300 cursor-default"
              >
                {letra}
              </span>
            );
          })}
        </div>
      </nav>

      {/* Terms */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No hay terminos que coincidan con &ldquo;{query}&rdquo;</p>
            <button
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="mt-3 text-sm text-[#3a9bb5] hover:text-[#2d7d94] font-medium"
            >
              Limpiar busqueda
            </button>
          </div>
        )}

        {letrasDisponibles.map((letra) => (
          <div key={letra} id={`letra-${letra}`} className="mb-12 scroll-mt-36">
            <h2 className="text-2xl font-bold text-[#3a9bb5] border-b-2 border-[#3a9bb5]/20 pb-2 mb-6">
              {letra}
            </h2>
            <div className="space-y-8">
              {porLetra[letra].map((t) => (
                <article key={t.id} id={t.id} className="scroll-mt-36">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {t.nombre}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{t.definicion}</p>
                  {t.link && (
                    <Link
                      href={t.link.href}
                      className="inline-flex items-center gap-1 text-sm text-[#3a9bb5] hover:text-[#2d7d94] font-medium mt-2 transition-colors"
                    >
                      {t.link.label} &rarr;
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
