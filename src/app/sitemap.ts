import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { industrias } from "@/data/industrias";
import { features } from "@/data/features";
import { comparaciones } from "@/data/comparaciones";
import { RECURSOS } from "@/data/recursos";
import { RECURSOS_EN } from "@/data/recursos-en";
import { industriasEn } from "@/data/industrias-en";
import { blogPostsEn } from "@/data/blog-en";
import { featuresEn } from "@/data/features-en";
import { comparacionesEn } from "@/data/comparaciones-en";

// Rebuild sitemap every hour instead of every request
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dealforge.es";

  // Static pages with real lastModified dates (not new Date())
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2026-03-18"),
    },
    // English (en) marketing pages
    {
      url: `${baseUrl}/en`,
      lastModified: new Date("2026-06-10"),
    },
    {
      url: `${baseUrl}/en/pricing`,
      lastModified: new Date("2026-06-10"),
    },
    {
      url: `${baseUrl}/en/what-is-cpq`,
      lastModified: new Date("2026-06-10"),
    },
    {
      url: `${baseUrl}/en/features`,
      lastModified: new Date("2026-06-10"),
    },
    {
      url: `${baseUrl}/en/free-quote-generator`,
      lastModified: new Date("2026-06-10"),
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date("2026-06-10"),
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
    },
    {
      url: `${baseUrl}/terminos`,
      lastModified: new Date("2026-03-09"),
    },
    {
      url: `${baseUrl}/rgpd`,
      lastModified: new Date("2026-03-09"),
    },
    // English legal pages
    {
      url: `${baseUrl}/en/privacy`,
      lastModified: new Date("2026-03-09"),
    },
    {
      url: `${baseUrl}/en/terms`,
      lastModified: new Date("2026-03-09"),
    },
    {
      url: `${baseUrl}/en/gdpr`,
      lastModified: new Date("2026-03-09"),
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date("2026-03-18"),
    },
    {
      url: `${baseUrl}/precios`,
      lastModified: new Date("2026-03-28"),
    },
    {
      url: `${baseUrl}/que-es-cpq`,
      lastModified: new Date("2026-03-28"),
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
    },
    // Author / profile page
    {
      url: `${baseUrl}/about/albert-hurtado`,
      lastModified: new Date("2026-06-15"),
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

  // English blog (data-file based)
  const blogPagesEn: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date("2026-06-14"),
    },
    ...blogPostsEn.map((post) => ({
      url: `${baseUrl}/en/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
    })),
  ];

  // Programmatic SEO pages — industry templates
  const industryPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/plantilla-cotizacion`,
      lastModified: new Date("2026-03-27"),
    },
    ...industrias.map((ind) => ({
      url: `${baseUrl}/plantilla-cotizacion/${ind.slug}`,
      lastModified: new Date("2026-03-27"),
    })),
  ];

  // English quote-template pages
  const industryPagesEn: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en/quote-template`,
      lastModified: new Date("2026-06-13"),
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
    },
    ...features.map((f) => ({
      url: `${baseUrl}/funcionalidades/${f.slug}`,
      lastModified: new Date("2026-03-27"),
    })),
  ];

  // English feature pages (the /en/features hub is in staticPages)
  const featurePagesEn: MetadataRoute.Sitemap = featuresEn.map((f) => ({
    url: `${baseUrl}/en/features/${f.slug}`,
    lastModified: new Date("2026-06-14"),
  }));

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

  // English comparison pages
  const comparisonPagesEn: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en/compare`,
      lastModified: new Date("2026-06-14"),
    },
    ...comparacionesEn.map((c) => ({
      url: `${baseUrl}/en/compare/${c.slug}`,
      lastModified: new Date("2026-06-14"),
    })),
  ];

  // Lead magnet resources (ES + EN)
  const resourcePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/recursos`,
      lastModified: new Date("2026-04-14"),
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
    },
    ...RECURSOS_EN.map((r) => ({
      url: `${baseUrl}/en/resources/${r.slug}`,
      lastModified: new Date(r.publicadoEn),
    })),
  ];

  return [...staticPages, ...blogPosts, ...blogPagesEn, ...industryPages, ...industryPagesEn, ...featurePages, ...featurePagesEn, ...comparisonPages, ...comparisonPagesEn, ...resourcePages, ...resourcePagesEn];
}
