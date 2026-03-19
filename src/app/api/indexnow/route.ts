import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { notifyIndexNow, getAllPublicUrls } from "@/lib/indexnow";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/indexnow — Notify search engines about new/updated URLs
 * Requires authentication. Accepts optional { urls: string[] } body.
 * If no URLs provided, submits all public pages + all blog posts.
 */
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  let urls: string[] = [];

  try {
    const body = await request.json().catch(() => ({}));
    if (body.urls && Array.isArray(body.urls)) {
      urls = body.urls;
    }
  } catch {
    // Empty body — will submit all URLs
  }

  // If no specific URLs, submit everything
  if (urls.length === 0) {
    urls = getAllPublicUrls();

    // Add all blog post URLs
    const posts = await prisma.blogPost.findMany({
      where: { publicado: true },
      select: { slug: true },
    });
    for (const post of posts) {
      urls.push(`/blog/${post.slug}`);
    }
  }

  const result = await notifyIndexNow(urls);

  return NextResponse.json({
    submitted: urls.length,
    urls,
    ...result,
  });
}
