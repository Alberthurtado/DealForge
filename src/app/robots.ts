import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://dealforge.es";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/panel/",
          "/clientes/",
          "/cotizaciones/",
          "/productos/",
          "/reportes/",
          "/reglas/",
          "/integraciones/",
          "/configuracion/",
          "/api/",
          "/reset-password",
        ],
      },
      // Google
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/panel/", "/api/"],
      },
      // Bing
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/panel/", "/api/"],
      },
      // AI Crawlers — allow public pages for AI search citation
      {
        userAgent: "GPTBot",
        allow: ["/", "/blog/", "/documentacion", "/changelog", "/terminos", "/privacidad", "/rgpd"],
        disallow: ["/panel/", "/api/", "/clientes/", "/cotizaciones/", "/productos/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/blog/", "/documentacion", "/changelog"],
        disallow: ["/panel/", "/api/", "/clientes/", "/cotizaciones/", "/productos/"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/blog/", "/documentacion", "/changelog"],
        disallow: ["/panel/", "/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/blog/", "/documentacion", "/changelog", "/terminos", "/privacidad", "/rgpd"],
        disallow: ["/panel/", "/api/", "/clientes/", "/cotizaciones/", "/productos/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/blog/", "/documentacion", "/changelog"],
        disallow: ["/panel/", "/api/"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: ["/", "/blog/", "/documentacion", "/changelog"],
        disallow: ["/panel/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
