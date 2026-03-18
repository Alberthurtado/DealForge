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
          "/firmar/",
          "/aprobar/",
          "/checkout/",
        ],
      },
      // Google
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/panel/", "/api/", "/firmar/", "/aprobar/", "/checkout/"],
      },
      // Bing
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/panel/", "/api/", "/firmar/", "/aprobar/", "/checkout/"],
      },
      // AI Crawlers — allow public pages for AI search citation
      {
        userAgent: "GPTBot",
        allow: ["/", "/blog/", "/guia", "/documentacion", "/changelog", "/terminos", "/privacidad", "/rgpd"],
        disallow: ["/panel/", "/api/", "/clientes/", "/cotizaciones/", "/productos/", "/firmar/", "/aprobar/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/blog/", "/guia", "/documentacion", "/changelog"],
        disallow: ["/panel/", "/api/", "/clientes/", "/cotizaciones/", "/productos/", "/firmar/", "/aprobar/"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/blog/", "/guia", "/documentacion", "/changelog"],
        disallow: ["/panel/", "/api/", "/firmar/", "/aprobar/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/blog/", "/guia", "/documentacion", "/changelog", "/terminos", "/privacidad", "/rgpd"],
        disallow: ["/panel/", "/api/", "/clientes/", "/cotizaciones/", "/productos/", "/firmar/", "/aprobar/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/blog/", "/guia", "/documentacion", "/changelog"],
        disallow: ["/panel/", "/api/", "/firmar/", "/aprobar/"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: ["/", "/blog/", "/guia", "/documentacion", "/changelog"],
        disallow: ["/panel/", "/api/", "/firmar/", "/aprobar/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
