import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Limpiando datos de test de la base de datos...\n");

  // Delete in FK-safe order
  const counts = {
    aprobaciones: await prisma.aprobacion.deleteMany(),
    actividades: await prisma.actividad.deleteMany(),
    lineItems: await prisma.lineItem.deleteMany(),
    cotizaciones: await prisma.cotizacion.deleteMany(),
    contactos: await prisma.contacto.deleteMany(),
    variantes: await prisma.varianteProducto.deleteMany(),
    productos: await prisma.producto.deleteMany(),
    categorias: await prisma.categoria.deleteMany(),
    clientes: await prisma.cliente.deleteMany(),
    reglas: await prisma.reglaComercial.deleteMany(),
  };

  // Reset empresa to clean defaults
  await prisma.empresa.upsert({
    where: { id: "default" },
    update: {
      nombre: "Mi Empresa",
      cif: null,
      email: null,
      telefono: null,
      direccion: null,
      ciudad: null,
      pais: null,
      web: null,
      logoUrl: null,
    },
    create: { id: "default", nombre: "Mi Empresa" },
  });

  console.log("Registros eliminados:");
  for (const [key, result] of Object.entries(counts)) {
    if (result.count > 0) {
      console.log(`  - ${key}: ${result.count}`);
    }
  }
  console.log("\n✅ Base de datos limpia. Empresa reseteada a valores por defecto.");
}

main()
  .catch((e) => {
    console.error("❌ Error al limpiar:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
