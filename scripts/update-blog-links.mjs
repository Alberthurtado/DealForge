import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Add cross-link to article 1 (cotizacion profesional -> CPQ article)
  const post1 = await prisma.blogPost.findUnique({
    where: { slug: "como-hacer-cotizacion-profesional-guia-completa" },
  });

  if (post1) {
    const linkToCpq = `\n\n<p><strong>Lectura recomendada:</strong> Si quieres ir mas alla de las cotizaciones manuales, descubre <a href="/blog/que-es-cpq-software-cotizaciones-automatizado">que es un CPQ y como puede transformar tu proceso de ventas</a>.</p>`;

    if (!post1.contenido.includes("que-es-cpq-software-cotizaciones-automatizado")) {
      // Insert before the Conclusion
      const updated = post1.contenido.replace(
        "<h2>Conclusion</h2>",
        linkToCpq + "\n\n<h2>Conclusion</h2>"
      );
      await prisma.blogPost.update({
        where: { slug: post1.slug },
        data: { contenido: updated },
      });
      console.log("Updated post 1 with cross-link to CPQ article");
    } else {
      console.log("Post 1 already has cross-link");
    }
  }

  // Add cross-link to article 2 (CPQ -> cotizacion profesional article)
  const post2 = await prisma.blogPost.findUnique({
    where: { slug: "que-es-cpq-software-cotizaciones-automatizado" },
  });

  if (post2) {
    const linkToCotizacion = `\n\n<p><strong>Lectura recomendada:</strong> Si necesitas mejorar tus cotizaciones hoy mismo, lee nuestra <a href="/blog/como-hacer-cotizacion-profesional-guia-completa">guia completa para crear cotizaciones profesionales que cierran ventas</a>.</p>`;

    if (!post2.contenido.includes("como-hacer-cotizacion-profesional-guia-completa")) {
      // Insert before the Conclusion
      const updated = post2.contenido.replace(
        "<h2>Conclusion: el CPQ como ventaja competitiva</h2>",
        linkToCotizacion + "\n\n<h2>Conclusion: el CPQ como ventaja competitiva</h2>"
      );
      await prisma.blogPost.update({
        where: { slug: post2.slug },
        data: { contenido: updated },
      });
      console.log("Updated post 2 with cross-link to cotizacion article");
    } else {
      console.log("Post 2 already has cross-link");
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
