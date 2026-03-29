"use client";

import { useState, useMemo, useRef } from "react";
import { PageHeader } from "@/components/layout/page-header";
import {
  Mail, Search, ChevronRight, LayoutDashboard, Users, Package,
  FileText, ScrollText, ShieldCheck, BarChart3, Plug, Settings,
  PenLine, FileCheck, Send, Download, RefreshCw, UserPlus,
  Zap, CreditCard, HelpCircle, ExternalLink, X,
} from "lucide-react";

/* ─── Guide content ─────────────────────────────────────── */

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

const GUIDE: GuideSection[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    color: "text-gray-600",
    summary: "Vista general de tu actividad: cotizaciones activas, clientes, contratos próximos a vencer y métricas clave.",
    items: [
      {
        title: "¿Qué veo en el Dashboard?",
        body: "Tarjetas con el resumen de cotizaciones (total, enviadas, ganadas, perdidas), clientes activos, valor total de contratos y alertas de vencimiento próximo. Se actualiza en tiempo real.",
        href: "/panel",
        hrefLabel: "Ir al Dashboard",
      },
      {
        title: "Métricas de conversión",
        body: "La tasa de conversión (cotizaciones ganadas / enviadas) aparece en la parte superior. Úsala para medir el rendimiento del equipo de ventas.",
      },
    ],
  },
  {
    id: "clientes",
    title: "Clientes",
    icon: Users,
    color: "text-blue-600",
    summary: "Gestiona tu base de clientes: datos de empresa, contactos, historial de cotizaciones y contratos.",
    items: [
      {
        title: "Crear un cliente nuevo",
        body: "Ve a Clientes → botón 'Nuevo cliente'. Rellena nombre, CIF/NIF, email, teléfono y dirección. Los campos marcados son los que aparecerán en las cotizaciones y contratos PDF.",
        href: "/clientes/nuevo",
        hrefLabel: "Crear cliente",
      },
      {
        title: "Contactos del cliente",
        body: "Dentro de cada cliente puedes añadir múltiples contactos (nombre, email, cargo). Al solicitar una firma electrónica, puedes elegir entre los contactos guardados.",
      },
      {
        title: "Historial de cotizaciones",
        body: "El detalle de cada cliente muestra todas las cotizaciones asociadas, su estado y el importe total contratado. Sirve como CRM básico.",
        href: "/clientes",
        hrefLabel: "Ver clientes",
      },
    ],
  },
  {
    id: "productos",
    title: "Productos y Catálogo",
    icon: Package,
    color: "text-green-600",
    summary: "Tu catálogo de productos y servicios. Se usan como líneas al crear cotizaciones.",
    items: [
      {
        title: "Añadir un producto",
        body: "Ve a Productos → 'Nuevo producto'. Define nombre, SKU (opcional), descripción, precio unitario, unidad y categoría. También puedes marcar un descuento máximo permitido.",
        href: "/productos/nuevo",
        hrefLabel: "Añadir producto",
      },
      {
        title: "Categorías",
        body: "Agrupa productos por categoría para encontrarlos más rápido al añadirlos a una cotización. Las categorías se crean automáticamente al escribirlas.",
      },
      {
        title: "Frecuencia de facturación",
        body: "Cada producto puede tener una frecuencia: Único, Mensual, Trimestral o Anual. Esto determina cómo se calculan los totales en los contratos.",
        href: "/productos",
        hrefLabel: "Ver catálogo",
      },
    ],
  },
  {
    id: "cotizaciones",
    title: "Cotizaciones",
    icon: FileText,
    color: "text-[#3a9bb5]",
    summary: "Crea, envía y gestiona propuestas comerciales profesionales. Incluye IA, firma electrónica y PDF.",
    items: [
      {
        title: "Crear una cotización",
        body: "Cotizaciones → 'Nueva cotización'. Selecciona cliente, añade líneas de productos del catálogo (o crea líneas libres), aplica descuentos y añade notas. Forge IA puede sugerirte el precio óptimo.",
        href: "/cotizaciones/nueva",
        hrefLabel: "Nueva cotización",
      },
      {
        title: "Estados de una cotización",
        body: "BORRADOR → ENVIADA → NEGOCIACIÓN → GANADA o PERDIDA. Solo las cotizaciones en estado GANADA pueden convertirse en contrato. Puedes mover el estado manualmente desde el detalle.",
      },
      {
        title: "Enviar por email",
        body: "Desde el detalle de la cotización, botón 'Enviar'. Se envía al email del cliente con un PDF adjunto y un enlace para que pueda abrirla en el navegador. Requiere plan Pro o superior.",
      },
      {
        title: "Firma electrónica",
        body: "Botón 'Solicitar firma' → introduce nombre y email del firmante. El cliente recibe un enlace, ve la cotización completa y dibuja su firma. Al firmar, la cotización pasa a estado GANADA automáticamente. Válido conforme a eIDAS (UE 910/2014).",
      },
      {
        title: "Descargar PDF",
        body: "Botón 'PDF' en el detalle. Genera un PDF profesional con el diseño de tu empresa (logo, colores, plantilla). Puedes cambiar la plantilla en Configuración.",
      },
      {
        title: "Versiones",
        body: "Cada vez que editas una cotización enviada, se crea una nueva versión. Puedes ver el historial de versiones desde el detalle.",
        href: "/cotizaciones",
        hrefLabel: "Ver cotizaciones",
      },
      {
        title: "Forge IA",
        body: "Asistente de IA integrado. Puedes pedirle que sugiera precios, redacte condiciones, optimice descuentos o explique cláusulas. Disponible en el panel lateral del detalle de cotización.",
      },
    ],
  },
  {
    id: "contratos",
    title: "Contratos",
    icon: ScrollText,
    color: "text-purple-600",
    summary: "Genera contratos a partir de cotizaciones ganadas, personaliza las condiciones, envía a firmar y gestiona renovaciones.",
    items: [
      {
        title: "Crear un contrato",
        body: "Un contrato se crea desde una cotización en estado GANADA. Abre la cotización → botón 'Crear contrato'. Se copian automáticamente las líneas y condiciones. Requiere plan Business.",
      },
      {
        title: "Plantillas de contrato",
        body: "Ve a Contratos → Plantillas. Puedes crear plantillas HTML con variables como {{cliente.nombre}}, {{contrato.valorTotal}}, {{empresa.cif}}, etc. La plantilla por defecto ya está lista para usar.",
        href: "/contratos/plantillas",
        hrefLabel: "Ver plantillas",
      },
      {
        title: "Generar el documento",
        body: "En el detalle del contrato, sección 'Documento del contrato' → 'Generar documento'. Se rellena la plantilla con los datos reales del contrato, cliente y empresa. Puedes editarlo antes de firmar.",
      },
      {
        title: "Editar condiciones antes de firmar",
        body: "En el detalle del contrato, sección 'Condiciones del Contrato' → botón 'Editar' (lápiz). Puedes cambiar las condiciones generales, cláusula de cancelación y días de preaviso. Después regenera el documento.",
      },
      {
        title: "Editar el documento generado",
        body: "Botón 'Editar documento' → se abre un editor HTML con preview en tiempo real. Puedes retocar cualquier texto o formato antes de enviarlo a firmar.",
      },
      {
        title: "Firma electrónica del contrato",
        body: "Una vez generado el documento, botón 'Solicitar firma electrónica'. El cliente recibe un email con enlace a /firmar-contrato/[token], ve el contrato completo y dibuja su firma. Válido conforme a eIDAS.",
      },
      {
        title: "Condiciones por defecto para todos los contratos",
        body: "Ve a Configuración → sección 'Términos y Condiciones' → campo 'Condiciones por defecto para Contratos'. Lo que escribas ahí se aplicará automáticamente a cada nuevo contrato.",
        href: "/configuracion#condiciones",
        hrefLabel: "Configurar condiciones",
      },
      {
        title: "Renovaciones y alertas",
        body: "Configura renovación automática y días de aviso previo al vencimiento en cada contrato. El sistema envía emails de alerta al acercarse la fecha de fin.",
      },
    ],
  },
  {
    id: "reglas",
    title: "Reglas Comerciales",
    icon: ShieldCheck,
    color: "text-orange-600",
    summary: "Define límites de descuento, márgenes mínimos y condiciones que se validan automáticamente al crear cotizaciones.",
    items: [
      {
        title: "¿Para qué sirven las reglas?",
        body: "Evitan que los vendedores ofrezcan descuentos por encima del límite autorizado, o que el margen caiga por debajo del mínimo. Se validan en tiempo real al editar una cotización.",
        href: "/reglas",
        hrefLabel: "Ver reglas",
      },
      {
        title: "Tipos de regla",
        body: "Descuento máximo por línea, descuento máximo total, precio mínimo por producto, margen mínimo porcentual, y condiciones especiales por categoría de cliente.",
      },
      {
        title: "Aprobaciones",
        body: "Si una cotización supera una regla, puede requerir aprobación de un administrador antes de enviarse al cliente. El aprobador recibe un email con el enlace de revisión. Requiere plan Business.",
      },
    ],
  },
  {
    id: "reportes",
    title: "Reportes",
    icon: BarChart3,
    color: "text-indigo-600",
    summary: "Métricas de ventas: ingresos, tasa de conversión, productos más vendidos y rendimiento por cliente.",
    items: [
      {
        title: "¿Qué incluyen los reportes?",
        body: "Volumen de cotizaciones por período, importe total ganado, tasa de conversión, top clientes por valor, top productos, y tiempo medio de cierre.",
        href: "/reportes",
        hrefLabel: "Ver reportes",
      },
      {
        title: "Filtros por período",
        body: "Puedes filtrar por semana, mes, trimestre o año. Los gráficos se actualizan automáticamente.",
      },
    ],
  },
  {
    id: "integraciones",
    title: "Integraciones",
    icon: Plug,
    color: "text-teal-600",
    summary: "Importa y exporta datos, y conecta DealForge con otras herramientas mediante API.",
    items: [
      {
        title: "Importar clientes y productos desde CSV",
        body: "Integraciones → 'Importar'. Sube un fichero CSV con el formato descargable como ejemplo. Puedes importar clientes, productos o ambos en el mismo proceso.",
        href: "/integraciones",
        hrefLabel: "Ir a Integraciones",
      },
      {
        title: "Exportar datos",
        body: "Exporta clientes, productos o cotizaciones a CSV para usar en Excel, Google Sheets u otros sistemas.",
      },
      {
        title: "API Key",
        body: "En Configuración puedes generar una API Key para conectar DealForge con herramientas externas (CRM, ERP, Zapier, Make...). Disponible en plan Pro y superior.",
        href: "/configuracion",
        hrefLabel: "Ver API Key",
      },
    ],
  },
  {
    id: "equipo",
    title: "Equipo y Usuarios",
    icon: UserPlus,
    color: "text-pink-600",
    summary: "Gestiona los miembros de tu equipo, invita nuevos usuarios y asigna roles.",
    items: [
      {
        title: "Invitar a un compañero",
        body: "Configuración → sección 'Equipo' → 'Invitar miembro'. Introduce su email y elige el rol. Recibirá un email con el enlace para unirse. El número máximo de usuarios depende del plan.",
        href: "/configuracion",
        hrefLabel: "Gestionar equipo",
      },
      {
        title: "Roles disponibles",
        body: "Admin: acceso completo, puede invitar y gestionar el equipo. Sales (Vendedor): puede crear y gestionar cotizaciones y contratos. Viewer (Observador): solo lectura.",
      },
      {
        title: "Límites por plan",
        body: "Starter: 1 usuario. Pro: hasta 5. Business: hasta 20. Enterprise: ilimitados. El administrador puede ver el uso actual en la sección Equipo de Configuración.",
      },
    ],
  },
  {
    id: "configuracion",
    title: "Configuración",
    icon: Settings,
    color: "text-gray-600",
    summary: "Datos de empresa, logo, plantilla PDF, colores, SMTP para emails, condiciones y gestión del plan.",
    items: [
      {
        title: "Datos de empresa",
        body: "Nombre, CIF, dirección, email y teléfono. Estos datos aparecen en todos los PDFs (cotizaciones y contratos). Imprescindible rellenarlos antes de enviar documentos a clientes.",
        href: "/configuracion",
        hrefLabel: "Ir a Configuración",
      },
      {
        title: "Logo y colores",
        body: "Sube tu logotipo (PNG/SVG recomendado) y define tu color corporativo. Ambos se aplican automáticamente en todos los PDFs generados.",
      },
      {
        title: "Plantilla PDF",
        body: "Elige entre tres diseños: Moderna (gradiente, colores vivos), Clásica (bordes, tradicional) y Minimalista (líneas finas, elegante).",
      },
      {
        title: "Configurar email SMTP",
        body: "Para enviar cotizaciones y solicitudes de firma directamente desde DealForge, configura tu servidor SMTP (Gmail, Outlook, etc.) en Configuración → Email. Sin SMTP, los emails se envían desde el servidor de DealForge.",
      },
      {
        title: "Condiciones por defecto",
        body: "Tres tipos: Transaccionales (para productos de pago único), Contractuales (para servicios recurrentes y contratos), y Generales (fallback). Se rellenan automáticamente en cada documento.",
        href: "/configuracion#condiciones",
        hrefLabel: "Ver condiciones",
      },
      {
        title: "Cambiar o cancelar plan",
        body: "En la sección 'Tu Cuenta y Plan' puedes ver tu plan actual, subir a Pro o Business, o bajar de plan. Para cancelar la renovación automática, usa el enlace 'Cancelar suscripción'.",
      },
    ],
  },
  {
    id: "forgeai",
    title: "Forge IA",
    icon: Zap,
    color: "text-violet-600",
    summary: "Asistente de inteligencia artificial integrado en cotizaciones y contratos.",
    items: [
      {
        title: "¿Qué puede hacer Forge IA?",
        body: "Sugerir precios competitivos, redactar condiciones generales, optimizar descuentos según el historial del cliente, explicar cláusulas legales, y responder preguntas sobre el proceso de ventas.",
      },
      {
        title: "¿Dónde está disponible?",
        body: "Panel lateral en el detalle de cotizaciones. Puedes escribir libremente o usar los atajos predefinidos (sugiere precio, redacta condiciones, etc.).",
      },
      {
        title: "Límites por plan",
        body: "Starter: 5 consultas/mes. Pro y Business: ilimitado. Enterprise: ilimitado con prioridad. El modelo de IA usado es Claude de Anthropic.",
      },
    ],
  },
  {
    id: "facturacion",
    title: "Plan y Facturación",
    icon: CreditCard,
    color: "text-emerald-600",
    summary: "Todo lo relacionado con tu suscripción, pagos y cambios de plan.",
    items: [
      {
        title: "¿Cómo cambio de plan?",
        body: "Configuración → sección 'Tu Cuenta y Plan' → botón 'Actualizar'. Serás redirigido a Stripe (pasarela de pago segura). El cambio es inmediato.",
        href: "/configuracion",
        hrefLabel: "Ver planes",
      },
      {
        title: "¿Puedo pagar anualmente?",
        body: "Sí. El plan anual tiene un 20% de descuento respecto al mensual. Pro anual: 23€/mes (276€/año). Business anual: 63€/mes (756€/año). Puedes elegir al suscribirte.",
      },
      {
        title: "¿Cómo cancelo?",
        body: "Configuración → 'Cancelar suscripción'. Puedes bajar a Pro o a Starter (gratuito). Tu acceso continúa hasta el fin del período de facturación actual.",
      },
      {
        title: "Gestionar facturas y tarjeta",
        body: "Botón 'Gestionar Suscripción' en Configuración. Te lleva al portal de Stripe donde puedes ver facturas anteriores y actualizar el método de pago.",
      },
    ],
  },
];

/* ─── Component ─────────────────────────────────────────── */

export default function SoportePage() {
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
  }, [query]);

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
        title="Soporte"
        description="Centro de ayuda y documentación de DealForge"
      />

      <div className="p-6 max-w-5xl space-y-8">

        {/* Contact card */}
        <div className="bg-gradient-to-r from-[#3a9bb5]/10 to-blue-50 border border-[#3a9bb5]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#3a9bb5] flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">¿Necesitas ayuda personalizada?</h2>
              <p className="text-sm text-gray-600 mt-0.5">Nuestro equipo responde en menos de 48 horas en días laborables.</p>
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
            Escribir email
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Search + quick nav */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <HelpCircle className="w-4 h-4 text-[#3a9bb5]" />
            Guía de uso — busca cualquier concepto
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca: firma electrónica, importar CSV, reglas de descuento..."
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
                ? "Sin resultados. Prueba con otro término o escríbenos."
                : `${filtered.reduce((a, s) => a + s.items.length, 0)} resultado${filtered.reduce((a, s) => a + s.items.length, 0) !== 1 ? "s" : ""} en ${filtered.length} sección${filtered.length !== 1 ? "es" : ""}`}
            </p>
          )}
        </div>

        {/* Guide sections */}
        <div className="space-y-6">
          {filtered.length === 0 && query ? (
            <div className="text-center py-16 text-gray-400">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">No encontramos resultados para &quot;{query}&quot;</p>
              <p className="text-xs mt-1">Escríbenos a <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a> y te ayudamos.</p>
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
                            {item.hrefLabel || "Ir"}
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
          <p className="text-sm text-gray-500 mb-3">¿No encuentras lo que buscas?</p>
          <a
            href="mailto:info@dealforge.es"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Contactar con soporte
          </a>
        </div>

      </div>
    </div>
  );
}
