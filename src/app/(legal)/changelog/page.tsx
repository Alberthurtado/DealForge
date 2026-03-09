import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Changelog — DealForge",
  description:
    "Historial de cambios y actualizaciones de DealForge. Consulta las nuevas funcionalidades, mejoras y correcciones de cada version.",
};

/* ── tipos ── */
type ChangeType = "new" | "improved" | "fix";

interface Change {
  type: ChangeType;
  text: string;
}

interface Release {
  version: string;
  date: string;
  title: string;
  summary: string;
  changes: Change[];
}

/* ── datos ── */
const releases: Release[] = [
  {
    version: "1.0.0",
    date: "9 de marzo de 2026",
    title: "Lanzamiento oficial",
    summary:
      "Primera version publica de DealForge. Incluye todas las funcionalidades principales para la gestion de cotizaciones B2B con inteligencia artificial.",
    changes: [
      /* ── Autenticacion y cuentas ── */
      { type: "new", text: "Registro de usuarios con email y contrasena segura (minimo 8 caracteres)" },
      { type: "new", text: "Inicio de sesion con proteccion contra intentos fallidos" },
      { type: "new", text: "Sistema de sesiones con JWT y renovacion automatica" },

      /* ── Panel de control ── */
      { type: "new", text: "Dashboard con 6 KPIs en tiempo real: pipeline total, tasa de conversion, ticket medio, ingresos, clientes y cotizaciones activas" },
      { type: "new", text: "Grafico de pipeline por estado (Borrador, Enviada, Negociacion, Ganada, Perdida)" },
      { type: "new", text: "Grafico de ingresos de los ultimos 6 meses" },
      { type: "new", text: "Funnel de conversion visual" },
      { type: "new", text: "Acciones rapidas: nueva cotizacion, nuevo cliente, nuevo producto" },
      { type: "new", text: "Timeline de actividad reciente con las ultimas acciones del usuario" },

      /* ── Gestion de clientes ── */
      { type: "new", text: "CRUD completo de clientes con datos de empresa, direccion y notas" },
      { type: "new", text: "Contactos multiples por cliente con roles (nombre, cargo, email, telefono)" },
      { type: "new", text: "Designacion de contacto principal por cliente" },
      { type: "new", text: "Vista 360 del cliente: metricas, cotizaciones relacionadas, contactos e historial" },
      { type: "new", text: "Listado de clientes con busqueda, filtrado por sector y ordenacion por columnas" },

      /* ── Catalogo de productos ── */
      { type: "new", text: "CRUD de productos con nombre, descripcion, SKU, categoria, precio base y unidad" },
      { type: "new", text: "6 tipos de unidad: unidad, hora, mes, licencia/ano, kg, m2" },
      { type: "new", text: "Variantes de producto con SKU propio, precio override y atributos clave-valor" },
      { type: "new", text: "Filtrado por categoria y busqueda por nombre o SKU" },
      { type: "new", text: "Toggle de producto activo/inactivo" },

      /* ── Cotizaciones ── */
      { type: "new", text: "Wizard de creacion en 4 pasos: cliente, productos, condiciones y resumen" },
      { type: "new", text: "Selector de cliente con busqueda y contacto opcional" },
      { type: "new", text: "Selector de productos del catalogo con busqueda y selector de variantes" },
      { type: "new", text: "Lineas personalizadas (items sin producto del catalogo)" },
      { type: "new", text: "Cantidades decimales, precios editables y descuento por linea" },
      { type: "new", text: "Descuento global porcentual, IVA configurable, seleccion de moneda (EUR, USD, GBP)" },
      { type: "new", text: "Fecha de vencimiento, notas internas y condiciones comerciales" },
      { type: "new", text: "Numeracion automatica configurable con prefijo (ej: DF-2026-0001)" },
      { type: "new", text: "Flujo de estados: Borrador → Enviada → Negociacion → Ganada/Perdida + Archivada" },
      { type: "new", text: "Acciones contextuales por estado: enviar, negociar, ganar, perder, duplicar, archivar" },
      { type: "new", text: "Envio de cotizacion por email con PDF adjunto automatico" },
      { type: "new", text: "Duplicar cotizacion con un clic para crear versiones rapidas" },
      { type: "new", text: "Vista detalle completa: info cliente, line items, totales, notas, condiciones y timeline" },

      /* ── Plantillas PDF ── */
      { type: "new", text: "3 plantillas PDF profesionales: Moderna (gradiente), Clasica (formal) y Minimalista" },
      { type: "new", text: "Previsualizacion de PDF en navegador antes de enviar" },
      { type: "new", text: "Impresion y descarga directa desde la previsualizacion" },
      { type: "new", text: "Inclusion automatica de logo, datos empresa, cliente, items, totales y condiciones" },

      /* ── Reglas comerciales ── */
      { type: "new", text: "Limites de descuento: maximo por linea y global, con ambito por producto o categoria" },
      { type: "new", text: "Productos obligatorios: reglas que exigen incluir un producto cuando se anade otro" },
      { type: "new", text: "Reglas de aprobacion automatica por umbral de descuento o importe total" },
      { type: "new", text: "Promociones con rango de fechas, productos seleccionados y tipo descuento o precio fijo" },
      { type: "new", text: "Activacion/desactivacion de reglas con toggle individual" },

      /* ── Aprobaciones ── */
      { type: "new", text: "Flujo de aprobaciones automatico basado en reglas comerciales" },
      { type: "new", text: "Email al aprobador con enlace seguro y unico (token)" },
      { type: "new", text: "Pagina de aprobacion publica (sin necesidad de login) con detalle de la cotizacion" },
      { type: "new", text: "Aprobar o rechazar con comentario opcional" },
      { type: "new", text: "Bloqueo de envio hasta que todas las aprobaciones esten resueltas" },
      { type: "new", text: "Reenvio de email de aprobacion desde el detalle de la cotizacion" },

      /* ── Reportes ── */
      { type: "new", text: "Metricas generales: total cotizaciones, ganadas y perdidas" },
      { type: "new", text: "Grafico mensual de cotizaciones ganadas vs perdidas con valor monetario" },
      { type: "new", text: "Top 10 clientes por ingresos generados" },
      { type: "new", text: "Top 10 productos mas cotizados" },

      /* ── Configuracion ── */
      { type: "new", text: "Configuracion de empresa: nombre, CIF, email, telefono, direccion, logo y color primario" },
      { type: "new", text: "Configuracion SMTP personalizada para envio de emails (Gmail, Outlook, Yahoo)" },
      { type: "new", text: "Prefijo de numeracion de cotizaciones configurable" },
      { type: "new", text: "Dias de vencimiento por defecto y condiciones comerciales predeterminadas" },
      { type: "new", text: "Seleccion de plantilla PDF preferida" },

      /* ── Integraciones ── */
      { type: "new", text: "Exportacion de cotizaciones a CSV" },
      { type: "new", text: "Exportacion de productos a Excel" },
      { type: "new", text: "Importacion de productos desde CSV con mapeo de campos y validacion" },
      { type: "new", text: "Importacion de clientes desde CSV con mapeo de campos y validacion" },
      { type: "new", text: "Conector Zapier via webhook para automatizaciones externas" },

      /* ── Forge IA ── */
      { type: "new", text: "Forge IA: asistente inteligente integrado en panel lateral" },
      { type: "new", text: "Consultas en lenguaje natural: navegacion, creacion de cotizaciones, analisis de pipeline" },
      { type: "new", text: "Modelo Haiku para plan Starter, Sonnet para planes Pro y Business" },
      { type: "new", text: "Sugerencias contextuales basadas en la pagina actual" },

      /* ── Planes y facturacion ── */
      { type: "new", text: "3 planes de suscripcion: Starter (gratis), Pro (29€/mes) y Business (79€/mes)" },
      { type: "new", text: "Facturacion mensual segura con Stripe" },
      { type: "new", text: "Gestion de suscripcion: cambiar plan, cancelar y portal de facturacion" },

      /* ── Seguridad y legal ── */
      { type: "new", text: "Encriptacion TLS 1.3 en transito y AES-256 en reposo" },
      { type: "new", text: "Hashing de contrasenas con bcrypt (12 rounds)" },
      { type: "new", text: "Cabeceras de seguridad HTTP: HSTS, CSP, X-Frame-Options, X-Content-Type-Options" },
      { type: "new", text: "Politica de privacidad, terminos de servicio y pagina de cumplimiento RGPD" },

      /* ── Infraestructura ── */
      { type: "new", text: "Despliegue en Vercel con CDN global y escalado automatico" },
      { type: "new", text: "Base de datos PostgreSQL en Supabase (region EU West)" },
      { type: "new", text: "Arquitectura Next.js 16 con App Router y React 19" },
    ],
  },
];

/* ── helpers ── */
function badgeClasses(type: ChangeType): string {
  switch (type) {
    case "new":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/25";
    case "improved":
      return "bg-blue-500/15 text-blue-400 border-blue-500/25";
    case "fix":
      return "bg-amber-500/15 text-amber-400 border-amber-500/25";
  }
}

function badgeLabel(type: ChangeType): string {
  switch (type) {
    case "new":
      return "Nuevo";
    case "improved":
      return "Mejora";
    case "fix":
      return "Correccion";
  }
}

/* ── componente ── */
export default function ChangelogPage() {
  return (
    <article className="prose prose-invert prose-gray max-w-none">
      {/* Cabecera */}
      <div className="mb-12 border-b border-gray-800 pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-3">
          Changelog
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
          Historial de cambios y actualizaciones de DealForge. Aqui encontraras
          todas las nuevas funcionalidades, mejoras y correcciones de cada
          version.
        </p>

        {/* Leyenda */}
        <div className="flex flex-wrap gap-3 mt-6">
          {(["new", "improved", "fix"] as ChangeType[]).map((t) => (
            <span
              key={t}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${badgeClasses(t)}`}
            >
              {badgeLabel(t)}
            </span>
          ))}
        </div>
      </div>

      {/* Releases */}
      <div className="space-y-16">
        {releases.map((release) => (
          <section key={release.version} id={`v${release.version}`}>
            {/* Version header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
              <span className="inline-flex items-center rounded-lg bg-[#3a9bb5]/15 border border-[#3a9bb5]/30 px-3 py-1 text-sm font-mono font-semibold text-[#3a9bb5]">
                v{release.version}
              </span>
              <time className="text-sm text-gray-500">{release.date}</time>
            </div>

            <h2 className="text-xl font-semibold text-white mb-2">
              {release.title}
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {release.summary}
            </p>

            {/* Lista de cambios agrupados */}
            {(["new", "improved", "fix"] as ChangeType[]).map((type) => {
              const items = release.changes.filter((c) => c.type === type);
              if (items.length === 0) return null;

              return (
                <div key={type} className="mb-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    {type === "new" && `✦ Nuevas funcionalidades (${items.length})`}
                    {type === "improved" && `⬆ Mejoras (${items.length})`}
                    {type === "fix" && `✔ Correcciones (${items.length})`}
                  </h3>
                  <ul className="space-y-2">
                    {items.map((change, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 shrink-0 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium leading-none ${badgeClasses(change.type)}`}
                        >
                          {badgeLabel(change.type)}
                        </span>
                        <span className="text-gray-300 text-sm leading-relaxed">
                          {change.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </section>
        ))}
      </div>

      {/* Footer nota */}
      <div className="mt-16 pt-8 border-t border-gray-800">
        <p className="text-gray-500 text-sm">
          ¿Tienes sugerencias o has encontrado un error? Escribenos a{" "}
          <a
            href="mailto:info@dealforge.es"
            className="text-[#3a9bb5] hover:underline"
          >
            info@dealforge.es
          </a>{" "}
          o consulta nuestra{" "}
          <Link href="/documentacion" className="text-[#3a9bb5] hover:underline">
            documentacion
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
