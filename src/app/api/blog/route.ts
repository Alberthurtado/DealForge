import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession, isPlatformAdmin } from "@/lib/auth";
import { validateBody } from "@/lib/validate";
import { blogPostCreateSchema } from "@/lib/validations";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  // The blog is global content, not tenant-scoped. Restrict authoring to
  // platform admins — a per-tenant "ADMIN" rol would let any signup publish.
  if (!isPlatformAdmin(session.email)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const body = await request.json();
  const { data, error } = validateBody(blogPostCreateSchema, body);
  if (error) return error;

  // Generate slug from title if not provided
  const slug =
    data.slug ||
    data.titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  // Check slug uniqueness (within the default es-ES locale for now;
  // when admin UI gains a locale picker, this should use the selected locale)
  const existing = await prisma.blogPost.findFirst({ where: { slug, locale: "es-ES" } });
  if (existing) {
    return NextResponse.json(
      { error: "Ya existe un artículo con ese slug" },
      { status: 409 }
    );
  }

  const post = await prisma.blogPost.create({
    data: {
      slug,
      titulo: data.titulo,
      extracto: data.extracto,
      contenido: data.contenido,
      imagen: data.imagen || null,
      autor: data.autor || "DealForge",
      categoria: data.categoria || "general",
      tags: data.tags ? JSON.stringify(data.tags) : "[]",
      publicado: data.publicado ?? false,
      publishedAt: data.publicado ? new Date() : null,
      metaTitulo: data.metaTitulo || null,
      metaDescripcion: data.metaDescripcion || null,
      metaKeywords: data.metaKeywords || null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
