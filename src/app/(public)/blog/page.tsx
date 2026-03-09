import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Calendar, Clock, ArrowRight, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — DealForge",
  description:
    "Articulos sobre ventas, CPQ, automatizacion comercial e inteligencia artificial para PYMEs. Aprende a optimizar tu proceso de cotizaciones.",
  keywords: [
    "blog ventas", "CPQ", "cotizaciones", "automatizacion comercial",
    "inteligencia artificial ventas", "PYMEs", "DealForge blog",
  ],
  openGraph: {
    title: "Blog — DealForge",
    description: "Articulos sobre ventas, CPQ e inteligencia artificial para PYMEs.",
    url: "https://dealforge.es/blog",
    siteName: "DealForge",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — DealForge",
    description: "Articulos sobre ventas, CPQ e inteligencia artificial para PYMEs.",
  },
  alternates: {
    canonical: "https://dealforge.es/blog",
  },
};

const CATEGORIAS: Record<string, { label: string; color: string }> = {
  ventas: { label: "Ventas", color: "bg-blue-50 text-blue-700" },
  cpq: { label: "CPQ", color: "bg-teal-50 text-teal-700" },
  ia: { label: "IA", color: "bg-purple-50 text-purple-700" },
  producto: { label: "Producto", color: "bg-amber-50 text-amber-700" },
  guias: { label: "Guias", color: "bg-green-50 text-green-700" },
  general: { label: "General", color: "bg-gray-50 text-gray-700" },
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { publicado: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      {/* JSON-LD Blog structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Blog DealForge",
            description: "Articulos sobre ventas, CPQ e inteligencia artificial para PYMEs",
            url: "https://dealforge.es/blog",
            publisher: {
              "@type": "Organization",
              name: "DealForge",
              url: "https://dealforge.es",
              logo: {
                "@type": "ImageObject",
                url: "https://dealforge.es/logo.svg",
              },
            },
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.titulo,
              description: post.extracto,
              url: `https://dealforge.es/blog/${post.slug}`,
              datePublished: post.publishedAt?.toISOString(),
              dateModified: post.updatedAt.toISOString(),
              author: {
                "@type": "Organization",
                name: post.autor,
              },
              ...(post.imagen && {
                image: post.imagen,
              }),
            })),
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#f0f9ff] via-white to-white">
        {/* Header */}
        <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo.svg" alt="DealForge" width={32} height={32} className="rounded-lg" />
              <span className="font-bold text-lg text-gray-900">DealForge</span>
            </Link>
            <Link
              href="/registro"
              className="text-sm font-semibold text-[#3a9bb5] hover:text-[#2d7d94] transition-colors"
            >
              Empieza gratis &rarr;
            </Link>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#3a9bb5]/10 text-[#3a9bb5] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Flame className="w-3.5 h-3.5" />
              Blog
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Articulos y recursos
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Consejos sobre ventas, automatizacion comercial e inteligencia artificial para hacer crecer tu negocio.
            </p>
          </div>

          {/* Posts grid */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Flame className="w-8 h-8 text-gray-300" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Proximamente
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Estamos preparando articulos increibles sobre ventas, CPQ e inteligencia artificial. Vuelve pronto.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-[#3a9bb5] hover:text-[#2d7d94] transition-colors"
              >
                Volver a la pagina principal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => {
                const cat = CATEGORIAS[post.categoria] || CATEGORIAS.general;
                return (
                  <article
                    key={post.id}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-gray-200/50 transition-all"
                  >
                    {post.imagen && (
                      <div className="aspect-[2/1] overflow-hidden bg-gray-100">
                        <img
                          src={post.imagen}
                          alt={post.titulo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cat.color}`}>
                          {cat.label}
                        </span>
                        {post.publishedAt && (
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.publishedAt)}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          {readingTime(post.contenido)} min
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#3a9bb5] transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.titulo}
                        </Link>
                      </h2>
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                        {post.extracto}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3a9bb5] hover:text-[#2d7d94] transition-colors"
                      >
                        Leer articulo
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} DealForge. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
}
