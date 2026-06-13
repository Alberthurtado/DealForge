import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { industrias } from "@/data/industrias";
import { features } from "@/data/features";
import { comparaciones } from "@/data/comparaciones";
import { RECURSOS } from "@/data/recursos";
import { RECURSOS_EN } from "@/data/recursos-en";
import { industriasEn, ES_TO_EN_INDUSTRIA } from "@/data/industrias-en";

// Rebuild sitemap every hour instead of every request
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dealforge.es";

  // Static pages with real lastModified dates (not new Date())
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2026-03-18"),
      alternates: { languages: { "es-ES": baseUrl, "en-US": `${baseUrl}/en` } },
    },
    // English (en) marketing pages — paired with their Spanish counterparts via hreflang
    {
      url: `${baseUrl}/en`,
      lastModified: new Date("2026-06-10"),
      alternates: { languages: { "es-ES": baseUrl, "en-US": `${baseUrl}/en` } },
    },
    {
      url: `${baseUrl}/en/pricing`,
      lastModified: new Date("2026-06-10"),
      alternates: { languages: { "es-ES": `${baseUrl}/precios`, "en-US": `${baseUrl}/en/pricing` } },
    },
    {
      url: `${baseUrl}/en/what-is-cpq`,
      lastModified: new Date("2026-06-10"),
      alternates: { languages: { "es-ES": `${baseUrl}/que-es-cpq`, "en-US": `${baseUrl}/en/what-is-cpq` } },
    },
    {
      url: `${baseUrl}/en/features`,
      lastModified: new Date("2026-06-10"),
      alternates: { languages: { "es-ES": `${baseUrl}/funcionalidades`, "en-US": `${baseUrl}/en/features` } },
    },
    {
      url: `${baseUrl}/en/free-quote-generator`,
      lastModified: new Date("2026-06-10"),
      alternates: { languages: { "es-ES": `${baseUrl}/generador-cotizacion-gratis`, "en-US": `${baseUrl}/en/free-quote-generator` } },
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date("2026-06-10"),
      alternates: { languages: { "es-ES": `${baseUrl}/contacto`, "en-US": `${baseUrl}/en/contact` } },
    },
    {
      url: `${baseUrl}/registro`,
      lastModified: new Date("2026-03-18"),
    },
    {
      url: `${baseUrl}/documentacion`,
      lastModified: new Date("2026-03-15"),
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified: new Date("2026-03-15"),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2026-03-26"),
    },
    {
      url: `${baseUrl}/guia`,
      lastModified: new Date("2026-03-18"),
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: new Date("2026-03-09"),
      alternates: { languages: { "es-ES": `${baseUrl}/privacidad`, "en-US": `${baseUrl}/en/privacy` } },
    },
    {
      url: `${baseUrl}/terminos`,
      lastModified: new Date("2026-03-09"),
      alternates: { languages: { "es-ES": `${baseUrl}/terminos`, "en-US": `${baseUrl}/en/terms` } },
    },
    {
      url: `${baseUrl}/rgpd`,
      lastModified: new Date("2026-03-09"),
      alternates: { languages: { "es-ES": `${baseUrl}/rgpd`, "en-US": `${baseUrl}/en/gdpr` } },
    },
    // English legal pages
    {
      url: `${baseUrl}/en/privacy`,
      lastModified: new Date("2026-03-09"),
      alternates: { languages: { "es-ES": `${baseUrl}/privacidad`, "en-US": `${baseUrl}/en/privacy` } },
    },
    {
      url: `${baseUrl}/en/terms`,
      lastModified: new Date("2026-03-09"),
      alternates: { languages: { "es-ES": `${baseUrl}/terminos`, "en-US": `${baseUrl}/en/terms` } },
    },
    {
      url: `${baseUrl}/en/gdpr`,
      lastModified: new Date("2026-03-09"),
      alternates: { languages: { "es-ES": `${baseUrl}/rgpd`, "en-US": `${baseUrl}/en/gdpr` } },
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date("2026-03-18"),
      alternates: { languages: { "es-ES": `${baseUrl}/contacto`, "en-US": `${baseUrl}/en/contact` } },
    },
    {
      url: `${baseUrl}/precios`,
      lastModified: new Date("2026-03-28"),
      alternates: { languages: { "es-ES": `${baseUrl}/precios`, "en-US": `${baseUrl}/en/pricing` } },
    },
    {
      url: `${baseUrl}/que-es-cpq`,
      lastModified: new Date("2026-03-28"),
      alternates: { languages: { "es-ES": `${baseUrl}/que-es-cpq`, "en-US": `${baseUrl}/en/what-is-cpq` } },
    },
    {
      url: `${baseUrl}/glosario`,
      lastModified: new Date("2026-03-28"),
    },
    {
      url: `${baseUrl}/calculadora-roi`,
      lastModified: new Date("2026-03-28"),
    },
    {
      url: `${baseUrl}/generador-cotizacion-gratis`,
      lastModified: new Date("2026-04-14"),
      alternates: { languages: { "es-ES": `${baseUrl}/generador-cotizacion-gratis`, "en-US": `${baseUrl}/en/free-quote-generator` } },
    },
  ];

  // Dynamic blog posts (lastModified from DB — correct)
  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.blogPost.findMany({
      where: { publicado: true },
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: "desc" },
    });

    blogPosts = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
    }));
  } catch {
    // BlogPost model may not exist yet — skip
  }

  // Programmatic SEO pages — industry templates
  const industryPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/plantilla-cotizacion`,
      lastModified: new Date("2026-03-27"),
      alternates: { languages: { "es-ES": `${baseUrl}/plantilla-cotizacion`, "en-US": `${baseUrl}/en/quote-template` } },
    },
    ...industrias.map((ind) => {
      const enSlug = ES_TO_EN_INDUSTRIA[ind.slug];
      return {
        url: `${baseUrl}/plantilla-cotizacion/${ind.slug}`,
        lastModified: new Date("2026-03-27"),
        ...(enSlug
          ? {
              alternates: {
                languages: {
                  "es-ES": `${baseUrl}/plantilla-cotizacion/${ind.slug}`,
                  "en-US": `${baseUrl}/en/quote-template/${enSlug}`,
                },
              },
            }
          : {}),
      };
    }),
  ];

  // English quote-template pages (first translated batch)
  const industryPagesEn: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en/quote-template`,
      lastModified: new Date("2026-06-13"),
      alternates: { languages: { "es-ES": `${baseUrl}/plantilla-cotizacion`, "en-US": `${baseUrl}/en/quote-template` } },
    },
    ...industriasEn.map((ind) => ({
      url: `${baseUrl}/en/quote-template/${ind.slug}`,
      lastModified: new Date("2026-06-13"),
    })),
  ];

  // Feature landing pages
  const featurePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/funcionalidades`,
      lastModified: new Date("2026-03-27"),
      alternates: { languages: { "es-ES": `${baseUrl}/funcionalidades`, "en-US": `${baseUrl}/en/features` } },
    },
    ...features.map((f) => ({
      url: `${baseUrl}/funcionalidades/${f.slug}`,
      lastModified: new Date("2026-03-27"),
    })),
  ];

  // Comparison pages
  const comparisonPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/comparar`,
      lastModified: new Date("2026-03-28"),
    },
    ...comparaciones.map((c) => ({
      url: `${baseUrl}/comparar/${c.slug}`,
      lastModified: new Date("2026-03-28"),
    })),
  ];

  // Lead magnet resources (ES + EN with hreflang alternates)
  const resourcePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/recursos`,
      lastModified: new Date("2026-04-14"),
      alternates: {
        languages: {
          "es-ES": `${baseUrl}/recursos`,
          "en-US": `${baseUrl}/en/resources`,
        },
      },
    },
    ...RECURSOS.map((r) => ({
      url: `${baseUrl}/recursos/${r.slug}`,
      lastModified: new Date(r.publicadoEn),
    })),
  ];

  const resourcePagesEn: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en/resources`,
      lastModified: new Date("2026-04-14"),
      alternates: {
        languages: {
          "es-ES": `${baseUrl}/recursos`,
          "en-US": `${baseUrl}/en/resources`,
        },
      },
    },
    ...RECURSOS_EN.map((r) => ({
      url: `${baseUrl}/en/resources/${r.slug}`,
      lastModified: new Date(r.publicadoEn),
    })),
  ];

  return [...staticPages, ...blogPosts, ...industryPages, ...industryPagesEn, ...featurePages, ...comparisonPages, ...resourcePages, ...resourcePagesEn];
}
