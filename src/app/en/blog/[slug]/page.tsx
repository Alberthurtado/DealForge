import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPostsEn, getBlogPostEn } from "@/data/blog-en";
import { AUTHOR, authorPersonJsonLd } from "@/data/author";
import { Calendar, Clock, ArrowLeft, Flame } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPostsEn.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostEn(slug);
  if (!post) return { title: "Article not found — DealForge" };

  const title = post.metaTitulo || `${post.titulo} — DealForge Blog`;
  const description = post.metaDescripcion || post.extracto;
  const keywords = post.metaKeywords
    ? post.metaKeywords.split(",").map((k) => k.trim())
    : undefined;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title: post.titulo,
      description: post.extracto,
      url: `https://dealforge.es/en/blog/${post.slug}`,
      siteName: "DealForge",
      locale: "en_GB",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [AUTHOR.name],
      ...(post.imagen && {
        images: [{ url: post.imagen, width: 1200, height: 630, alt: post.titulo }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.titulo,
      description: post.extracto,
      ...(post.imagen && { images: [post.imagen] }),
    },
    alternates: {
      canonical: `https://dealforge.es/en/blog/${post.slug}`,
    },
  };
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

const CATEGORIAS: Record<string, { label: string; color: string }> = {
  ventas: { label: "Sales", color: "bg-blue-50 text-blue-700" },
  cpq: { label: "CPQ", color: "bg-teal-50 text-teal-700" },
  ia: { label: "AI", color: "bg-purple-50 text-purple-700" },
  producto: { label: "Product", color: "bg-amber-50 text-amber-700" },
  guias: { label: "Guides", color: "bg-green-50 text-green-700" },
  general: { label: "General", color: "bg-gray-50 text-gray-700" },
};

export default async function EnBlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostEn(slug);
  if (!post) notFound();

  const cat = CATEGORIAS[post.categoria] || CATEGORIAS.general;
  const tags = post.tags;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.titulo,
    description: post.extracto,
    url: `https://dealforge.es/en/blog/${post.slug}`,
    inLanguage: "en",
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: authorPersonJsonLd,
    publisher: {
      "@type": "Organization",
      name: "DealForge",
      url: "https://dealforge.es",
      logo: { "@type": "ImageObject", url: "https://dealforge.es/logo.svg" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://dealforge.es/en/blog/${post.slug}`,
    },
    ...(post.imagen && { image: { "@type": "ImageObject", url: post.imagen } }),
    ...(tags.length > 0 && { keywords: tags.join(", ") }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dealforge.es/en" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://dealforge.es/en/blog" },
      { "@type": "ListItem", position: 3, name: post.titulo, item: `https://dealforge.es/en/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link href="/en" className="flex items-center gap-2.5">
              <Image src="/logo.svg" alt="DealForge" width={32} height={32} className="rounded-lg" />
              <span className="font-bold text-lg text-gray-900">DealForge</span>
            </Link>
            <Link
              href="/en/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Blog
            </Link>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8" aria-label="Breadcrumb">
            <Link href="/en" className="hover:text-gray-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/en/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-600 truncate max-w-[200px]">{post.titulo}</span>
          </nav>

          <article>
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cat.color}`}>
                  {cat.label}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {readingTime(post.contenido)} min read
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {post.titulo}
              </h1>
              <p className="text-lg text-gray-600">{post.extracto}</p>
              <p className="mt-4 text-sm text-gray-500">
                By{" "}
                <Link href="/about/albert-hurtado" className="font-medium text-gray-700 hover:text-[#3a9bb5]">
                  {AUTHOR.name}
                </Link>
                , {AUTHOR.jobTitle}
              </p>
            </header>

            {post.imagen && (
              <div className="rounded-2xl overflow-hidden mb-10 border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.imagen} alt={post.titulo} className="w-full aspect-[2/1] object-cover" />
              </div>
            )}

            <div
              className="prose prose-gray max-w-none prose-headings:font-bold prose-a:text-[#3a9bb5] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.contenido }}
            />

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
                {tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-br from-[#3a9bb5]/5 to-[#3a9bb5]/10 rounded-2xl border border-[#3a9bb5]/10 text-center">
            <Flame className="w-8 h-8 text-[#3a9bb5] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Automate your quotes with AI
            </h3>
            <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">
              DealForge helps you create professional quotes in minutes. Start free today.
            </p>
            <Link
              href="/registro?lang=en"
              className="inline-flex items-center gap-2 bg-[#3a9bb5] hover:bg-[#2d7d94] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-[#3a9bb5]/25"
            >
              <Flame className="w-4 h-4" />
              Create a free account
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} DealForge. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
