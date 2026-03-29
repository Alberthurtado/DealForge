/**
 * Backfill script: migrate existing single-user data to multi-user team structure
 *
 * What this does:
 * 1. For each existing user, ensure they have a proper Empresa (create unique one if on "default")
 * 2. Create EquipoMembro record (ADMIN) for each user → their own empresa
 * 3. Backfill equipoId on all business records (Cliente, Producto, Cotizacion, Contrato, ReglaComercial)
 * 4. Copy plan/Stripe info from Usuario to Empresa
 *
 * Run: npx tsx scripts/backfill-multiuser.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting multi-user backfill...\n");

  const usuarios = await prisma.usuario.findMany({
    include: {
      empresa: true,
      miembros: true,
    },
  });

  console.log(`Found ${usuarios.length} users to migrate\n`);

  for (const usuario of usuarios) {
    console.log(`\n👤 Processing user: ${usuario.email}`);

    let empresaId = usuario.empresaId;

    // If user is on the "default" empresa, create a unique one for them
    if (empresaId === "default" || !empresaId) {
      console.log(`  → Creating new empresa for user ${usuario.email}`);

      // Check if "default" empresa exists
      const defaultEmpresa = await prisma.empresa.findUnique({ where: { id: "default" } });

      // Create new empresa with the user's branding data (if any from default)
      const newEmpresa = await prisma.empresa.create({
        data: {
          nombre: defaultEmpresa?.nombre || "Mi Empresa",
          cif: defaultEmpresa?.cif,
          email: defaultEmpresa?.email,
          telefono: defaultEmpresa?.telefono,
          direccion: defaultEmpresa?.direccion,
          ciudad: defaultEmpresa?.ciudad,
          pais: defaultEmpresa?.pais,
          web: defaultEmpresa?.web,
          logoUrl: defaultEmpresa?.logoUrl,
          plantillaPdf: defaultEmpresa?.plantillaPdf || "moderna",
          colorPrimario: defaultEmpresa?.colorPrimario || "#3a9bb5",
          prefijoCotizacion: defaultEmpresa?.prefijoCotizacion || "COT",
          diasVencimiento: defaultEmpresa?.diasVencimiento || 30,
          condicionesTransaccional: defaultEmpresa?.condicionesTransaccional,
          condicionesContractual: defaultEmpresa?.condicionesContractual,
          smtpHost: defaultEmpresa?.smtpHost,
          smtpPort: defaultEmpresa?.smtpPort,
          smtpUser: defaultEmpresa?.smtpUser,
          smtpPass: defaultEmpresa?.smtpPass,
          smtpSecure: defaultEmpresa?.smtpSecure || false,
          recordatorioSeguimientoDias: defaultEmpresa?.recordatorioSeguimientoDias || 3,
          recordatorioVencimientoDias: defaultEmpresa?.recordatorioVencimientoDias || 3,
          recordatoriosActivos: defaultEmpresa?.recordatoriosActivos ?? true,
          // Copy plan/Stripe from user
          plan: usuario.plan || "starter",
          planStatus: usuario.planStatus || "active",
          stripeCustomerId: usuario.stripeCustomerId || undefined,
          stripeSubscriptionId: usuario.stripeSubscriptionId || undefined,
          stripePriceId: usuario.stripePriceId || undefined,
          currentPeriodEnd: usuario.currentPeriodEnd || undefined,
        },
      });

      empresaId = newEmpresa.id;

      // Update user's empresaId
      await prisma.usuario.update({
        where: { id: usuario.id },
        data: { empresaId },
      });

      console.log(`  ✓ Created empresa ${empresaId}`);
    } else {
      // User already has a custom empresa — sync plan data
      console.log(`  → User already has empresa ${empresaId}`);
      await prisma.empresa.update({
        where: { id: empresaId },
        data: {
          plan: usuario.plan || "starter",
          planStatus: usuario.planStatus || "active",
          stripeCustomerId: usuario.stripeCustomerId || undefined,
          stripeSubscriptionId: usuario.stripeSubscriptionId || undefined,
          stripePriceId: usuario.stripePriceId || undefined,
          currentPeriodEnd: usuario.currentPeriodEnd || undefined,
        },
      });
      console.log(`  ✓ Synced plan data to empresa`);
    }

    // Create EquipoMembro if not exists
    if (usuario.miembros.length === 0) {
      await prisma.equipoMembro.upsert({
        where: { empresaId_usuarioId: { empresaId, usuarioId: usuario.id } },
        update: {},
        create: { empresaId, usuarioId: usuario.id, rol: "ADMIN" },
      });
      console.log(`  ✓ Created EquipoMembro (ADMIN)`);
    } else {
      console.log(`  → Already has ${usuario.miembros.length} EquipoMembro record(s)`);
    }

    // Backfill equipoId on all business records
    const [clientes, productos, cotizaciones, contratos, reglas] = await Promise.all([
      prisma.cliente.updateMany({
        where: { usuarioId: usuario.id, equipoId: null },
        data: { equipoId: empresaId },
      }),
      prisma.producto.updateMany({
        where: { usuarioId: usuario.id, equipoId: null },
        data: { equipoId: empresaId },
      }),
      prisma.cotizacion.updateMany({
        where: { usuarioId: usuario.id, equipoId: null },
        data: { equipoId: empresaId },
      }),
      prisma.contrato.updateMany({
        where: { usuarioId: usuario.id, equipoId: null },
        data: { equipoId: empresaId },
      }),
      prisma.reglaComercial.updateMany({
        where: { usuarioId: usuario.id, equipoId: null },
        data: { equipoId: empresaId },
      }),
    ]);

    console.log(`  ✓ Backfilled: ${clientes.count} clientes, ${productos.count} productos, ${cotizaciones.count} cotizaciones, ${contratos.count} contratos, ${reglas.count} reglas`);
  }

  console.log("\n✅ Backfill complete!\n");
  console.log("Summary:");
  console.log(`  - Processed ${usuarios.length} users`);
  console.log(`  - All existing records now have equipoId set`);
  console.log(`  - All users have EquipoMembro records`);
  console.log(`  - Plan data synced from Usuario to Empresa`);
}

main()
  .catch((e) => {
    console.error("❌ Backfill failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
