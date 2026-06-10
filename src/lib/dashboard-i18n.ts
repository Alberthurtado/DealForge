// Dashboard (logged-in app) translations. Unlike the marketing site, the
// dashboard keeps the same URLs and switches language based on the company's
// locale (empresa.locale). Default is Spanish so existing users are unaffected.

export type DashboardLang = "es" | "en";

// Maps a BCP 47 locale (es-ES, en-GB, en-US) to the dashboard language.
export function resolveDashboardLang(locale: string | null | undefined): DashboardLang {
  return (locale || "").toLowerCase().startsWith("en") ? "en" : "es";
}

export const DASHBOARD_STRINGS = {
  es: {
    nav: {
      "/panel": "Dashboard",
      "/clientes": "Clientes",
      "/productos": "Productos",
      "/cotizaciones": "Cotizaciones",
      "/contratos": "Contratos",
      "/reglas": "Reglas",
      "/reportes": "Reportes",
      "/integraciones": "Integraciones",
      "/configuracion": "Configuración",
      "/soporte": "Soporte",
    } as Record<string, string>,
    mainMenu: "Menú principal",
    logOut: "Salir",
    logOutAria: "Cerrar sesión",
    expandMenu: "Expandir menú",
    collapseMenu: "Colapsar menú",
  },
  en: {
    nav: {
      "/panel": "Dashboard",
      "/clientes": "Clients",
      "/productos": "Products",
      "/cotizaciones": "Quotes",
      "/contratos": "Contracts",
      "/reglas": "Rules",
      "/reportes": "Reports",
      "/integraciones": "Integrations",
      "/configuracion": "Settings",
      "/soporte": "Support",
    } as Record<string, string>,
    mainMenu: "Main menu",
    logOut: "Log out",
    logOutAria: "Log out",
    expandMenu: "Expand menu",
    collapseMenu: "Collapse menu",
  },
} as const;
