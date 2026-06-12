"use client";

import { useState, useMemo, useRef } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { useEmpresaLocale } from "@/lib/use-empresa-locale";
import { SOPORTE_STRINGS } from "@/lib/soporte-i18n";
import {
  Mail, Search, ChevronRight, LayoutDashboard, Users, Package,
  FileText, ScrollText, ShieldCheck, BarChart3, Plug, Settings,
  UserPlus, Zap, CreditCard, HelpCircle, ExternalLink, X,
} from "lucide-react";

/* ─── Guide structure (icons/colors/hrefs are language-neutral) ─── */

interface GuideSection {
  id: string;
  title: string;
  icon: typeof LayoutDashboard;
  color: string;
  summary: string;
  items: {
    title: string;
    body: string;
    href?: string;
    hrefLabel?: string;
  }[];
}

interface SectionStructure {
  id: string;
  icon: typeof LayoutDashboard;
  color: string;
  hrefs: (string | undefined)[];
}

const SECTION_STRUCTURE: SectionStructure[] = [
  { id: "dashboard", icon: LayoutDashboard, color: "text-gray-600", hrefs: ["/panel", undefined] },
  { id: "clientes", icon: Users, color: "text-blue-600", hrefs: ["/clientes/nuevo", undefined, "/clientes"] },
  { id: "productos", icon: Package, color: "text-green-600", hrefs: ["/productos/nuevo", undefined, "/productos"] },
  { id: "cotizaciones", icon: FileText, color: "text-[#3a9bb5]", hrefs: ["/cotizaciones/nueva", undefined, undefined, undefined, undefined, "/cotizaciones", undefined] },
  { id: "contratos", icon: ScrollText, color: "text-purple-600", hrefs: [undefined, "/contratos/plantillas", undefined, undefined, undefined, undefined, "/configuracion#condiciones", undefined] },
  { id: "reglas", icon: ShieldCheck, color: "text-orange-600", hrefs: ["/reglas", undefined, undefined] },
  { id: "reportes", icon: BarChart3, color: "text-indigo-600", hrefs: ["/reportes", undefined] },
  { id: "integraciones", icon: Plug, color: "text-teal-600", hrefs: ["/integraciones", undefined, "/configuracion"] },
  { id: "equipo", icon: UserPlus, color: "text-pink-600", hrefs: ["/configuracion", undefined, undefined] },
  { id: "configuracion", icon: Settings, color: "text-gray-600", hrefs: ["/configuracion", undefined, undefined, undefined, "/configuracion#condiciones", undefined] },
  { id: "forgeai", icon: Zap, color: "text-violet-600", hrefs: [undefined, undefined, undefined] },
  { id: "facturacion", icon: CreditCard, color: "text-emerald-600", hrefs: ["/configuracion", undefined, undefined, undefined] },
];


/* ─── Component ─────────────────────────────────────────── */

export default function SoportePage() {
  const { lang } = useEmpresaLocale();
  const t = SOPORTE_STRINGS[lang];
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const GUIDE: GuideSection[] = useMemo(
    () =>
      SECTION_STRUCTURE.map((s) => {
        const sec = t.sections[s.id];
        return {
          id: s.id,
          icon: s.icon,
          color: s.color,
          title: sec.title,
          summary: sec.summary,
          items: sec.items.map((item, i) => ({
            title: item.title,
            body: item.body,
            href: s.hrefs[i],
            hrefLabel: item.hrefLabel,
          })),
        };
      }),
    [t]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return GUIDE;
    const q = query.toLowerCase();
    return GUIDE.map((section) => {
      const titleMatch = section.title.toLowerCase().includes(q) || section.summary.toLowerCase().includes(q);
      const matchedItems = section.items.filter(
        (item) => item.title.toLowerCase().includes(q) || item.body.toLowerCase().includes(q)
      );
      if (titleMatch) return section;
      if (matchedItems.length > 0) return { ...section, items: matchedItems };
      return null;
    }).filter(Boolean) as GuideSection[];
  }, [query, GUIDE]);

  function scrollTo(id: string) {
    setActiveSection(id);
    setQuery("");
    setTimeout(() => {
      sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <div>
      <PageHeader
        title={t.pageTitle}
        description={t.pageDescription}
      />

      <div className="p-6 max-w-5xl space-y-8">

        {/* Contact card */}
        <div className="bg-gradient-to-r from-[#3a9bb5]/10 to-blue-50 border border-[#3a9bb5]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#3a9bb5] flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">{t.contactTitle}</h2>
              <p className="text-sm text-gray-600 mt-0.5">{t.contactSubtitle}</p>
              <a
                href="mailto:info@dealforge.es"
                className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-[#3a9bb5] hover:text-[#2d7d94] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                info@dealforge.es
              </a>
            </div>
          </div>
          <a
            href="mailto:info@dealforge.es"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#3a9bb5] text-white text-sm font-semibold rounded-xl hover:bg-[#2d7d94] transition-colors shadow-sm shadow-[#3a9bb5]/25"
          >
            {t.writeEmail}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Search + quick nav */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <HelpCircle className="w-4 h-4 text-[#3a9bb5]" />
            {t.guideHeading}
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3a9bb5]/20 focus:border-[#3a9bb5]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick nav chips — only shown when not searching */}
          {!query && (
            <div className="flex flex-wrap gap-2">
              {GUIDE.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      activeSection === s.id
                        ? "bg-[#3a9bb5] text-white border-[#3a9bb5]"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-[#3a9bb5] hover:text-[#3a9bb5]"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {s.title}
                  </button>
                );
              })}
            </div>
          )}

          {/* Search results count */}
          {query && (
            <p className="text-xs text-gray-400">
              {filtered.length === 0
                ? t.noResults
                : t.resultsCount(filtered.reduce((a, s) => a + s.items.length, 0), filtered.length)}
            </p>
          )}
        </div>

        {/* Guide sections */}
        <div className="space-y-6">
          {filtered.length === 0 && query ? (
            <div className="text-center py-16 text-gray-400">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">{t.noResultsTitlePre} &quot;{query}&quot;</p>
              <p className="text-xs mt-1">{t.noResultsHelpPre}<a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a>{t.noResultsHelpPost}</p>
            </div>
          ) : (
            filtered.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  ref={(el) => { sectionRefs.current[section.id] = el; }}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden scroll-mt-6"
                >
                  {/* Section header */}
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                      <Icon className={`w-5 h-5 ${section.color}`} />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-gray-900">{section.title}</h2>
                      <p className="text-xs text-gray-500 mt-0.5">{section.summary}</p>
                    </div>
                  </div>

                  {/* Section items */}
                  <div className="divide-y divide-gray-50">
                    {section.items.map((item, i) => (
                      <div key={i} className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                            <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                          </div>
                          <p className="text-sm text-gray-500 leading-relaxed ml-5">{item.body}</p>
                        </div>
                        {item.href && (
                          <a
                            href={item.href}
                            className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-[#3a9bb5] hover:text-[#2d7d94] bg-[#3a9bb5]/5 hover:bg-[#3a9bb5]/10 px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                          >
                            {item.hrefLabel || t.goLabel}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom contact CTA */}
        <div className="text-center py-8 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-3">{t.bottomQuestion}</p>
          <a
            href="mailto:info@dealforge.es"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Mail className="w-4 h-4" />
            {t.contactSupport}
          </a>
        </div>

      </div>
    </div>
  );
}
