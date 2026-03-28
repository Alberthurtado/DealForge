import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { industrias } from "@/data/industrias";
import { features } from "@/data/features";

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
    },
    ...industrias.map((ind) => ({
      url: `${baseUrl}/plantilla-cotizacion/${ind.slug}`,
      lastModified: new Date("2026-03-27"),
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

  return [...staticPages, ...blogPosts, ...industryPages, ...featurePages];
}
