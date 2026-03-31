import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://dealforge.es";

  // Dashboard/private paths that NO crawler should access
  const privatePaths = [
    "/panel/",
    "/clientes/",
    "/cotizaciones/",
    "/productos/",
    "/reportes/",
    "/reglas/",
    "/integraciones/",
    "/configuracion/",
    "/contratos/",
    "/soporte/",
    "/api/",
    "/reset-password",
    "/recuperar",
    "/firmar/",
    "/firmar-contrato/",
    "/aprobar/",
    "/checkout/",
  ];

  return {
    rules: [
      // Default (all bots)
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      // Google
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: privatePaths,
      },
      // Bing
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: privatePaths,
      },
      // ── AI Crawlers — allow ALL public pages for citation ──
      // OpenAI (ChatGPT web search + training)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: privatePaths,
      },
      // Google Gemini
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: privatePaths,
      },
      // Anthropic Claude
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: privatePaths,
      },
      // Perplexity
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: privatePaths,
      },
      // Apple (Siri / Apple Intelligence)
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: privatePaths,
      },
      // X / Grok
      {
        userAgent: "Grok",
        allow: "/",
        disallow: privatePaths,
      },
      // Meta AI
      {
        userAgent: "Meta-ExternalAgent",
        allow: "/",
        disallow: privatePaths,
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
        disallow: privatePaths,
      },
      // Cohere
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: privatePaths,
      },
      // Common Crawl (used by many AI models for training)
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: privatePaths,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
