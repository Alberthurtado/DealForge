import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Guard: never run seed in production
  if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
    console.error("ERROR: Seed script must not run in production. Aborting.");
    process.exit(1);
  }

  // Clean existing data (order matters for foreign keys)
  await prisma.aprobacion.deleteMany();
  await prisma.actividad.deleteMany();
  await prisma.lineItem.deleteMany();
  await prisma.cotizacion.deleteMany();
  await prisma.contacto.deleteMany();
  await prisma.varianteProducto.deleteMany();
  await prisma.producto.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.reglaComercial.deleteMany();

  // Create default company (required for app to work)
  await prisma.empresa.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      nombre: "DealForge Demo",
      cif: "B00000000",
      email: "admin@dealforge.app",
      telefono: "+34 900 000 000",
      direccion: "Calle Innovacion 1",
      ciudad: "Madrid",
      pais: "Espana",
      web: "https://dealforge.app",
      plantillaPdf: "moderna",
      colorPrimario: "#3a9bb5",
      prefijoCotizacion: "COT",
      diasVencimiento: 30,
      condicionesDefecto: "Pago a 30 dias. Los precios no incluyen IVA. Presupuesto valido durante el periodo indicado.",
    },
  });

  // Create categories
  const catSoftware = await prisma.categoria.create({
    data: { nombre: "Software" },
  });
  const catServicios = await prisma.categoria.create({
    data: { nombre: "Servicios" },
  });
  const catHardware = await prisma.categoria.create({
    data: { nombre: "Hardware" },
  });
  const catSoporte = await prisma.categoria.create({
    data: { nombre: "Soporte" },
  });

  // Create products
  const products = await Promise.all([
    prisma.producto.create({
      data: {
        nombre: "Licencia ERP Base",
        descripcion: "Licencia anual del sistema ERP base",
        sku: "SW-ERP-001",
        precioBase: 2400,
        unidad: "licencia/ano",
        categoriaId: catSoftware.id,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: "Modulo CRM",
        descripcion: "Modulo adicional de gestion de clientes",
        sku: "SW-CRM-001",
        precioBase: 800,
        unidad: "licencia/ano",
        categoriaId: catSoftware.id,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: "Modulo Contabilidad",
        descripcion: "Modulo de contabilidad y facturacion",
        sku: "SW-ACC-001",
        precioBase: 1200,
        unidad: "licencia/ano",
        categoriaId: catSoftware.id,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: "Consultoria Implementacion",
        descripcion: "Servicio de consultoria para implementacion",
        sku: "SRV-IMP-001",
        precioBase: 150,
        unidad: "hora",
        categoriaId: catServicios.id,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: "Formacion Usuarios",
        descripcion: "Sesiones de formacion para usuarios finales",
        sku: "SRV-TRN-001",
        precioBase: 120,
        unidad: "hora",
        categoriaId: catServicios.id,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: "Desarrollo Personalizado",
        descripcion: "Desarrollo a medida de funcionalidades",
        sku: "SRV-DEV-001",
        precioBase: 175,
        unidad: "hora",
        categoriaId: catServicios.id,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: "Servidor Dedicado",
        descripcion: "Servidor dedicado para hosting on-premise",
        sku: "HW-SRV-001",
        precioBase: 4500,
        unidad: "unidad",
        categoriaId: catHardware.id,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: "Soporte Premium 24/7",
        descripcion: "Contrato de soporte premium con SLA 24/7",
        sku: "SUP-PRM-001",
        precioBase: 350,
        unidad: "mes",
        categoriaId: catSoporte.id,
      },
    }),
    prisma.producto.create({
      data: {
        nombre: "Soporte Basico",
        descripcion: "Contrato de soporte basico en horario laboral",
        sku: "SUP-BAS-001",
        precioBase: 150,
        unidad: "mes",
        categoriaId: catSoporte.id,
      },
    }),
  ]);

  // Create clients
  const cliente1 = await prisma.cliente.create({
    data: {
      nombre: "Distribuciones Martinez S.L.",
      ruc: "B12345678",
      email: "info@martinez-dist.es",
      telefono: "+34 91 234 5678",
      direccion: "Calle Gran Via 45, 3o",
      ciudad: "Madrid",
      pais: "Espana",
      sector: "Distribucion",
      contactos: {
        create: [
          {
            nombre: "Carlos Martinez",
            cargo: "Director General",
            email: "carlos@martinez-dist.es",
            telefono: "+34 600 123 456",
            principal: true,
          },
          {
            nombre: "Laura Garcia",
            cargo: "Directora Financiera",
            email: "laura@martinez-dist.es",
            telefono: "+34 600 234 567",
          },
        ],
      },
    },
  });

  const cliente2 = await prisma.cliente.create({
    data: {
      nombre: "Tecnologias Avanzadas S.A.",
      ruc: "A87654321",
      email: "contacto@tecav.com",
      telefono: "+34 93 876 5432",
      direccion: "Av. Diagonal 120",
      ciudad: "Barcelona",
      pais: "Espana",
      sector: "Tecnologia",
      contactos: {
        create: [
          {
            nombre: "Miguel Torres",
            cargo: "CTO",
            email: "miguel@tecav.com",
            telefono: "+34 600 345 678",
            principal: true,
          },
        ],
      },
    },
  });

  const cliente3 = await prisma.cliente.create({
    data: {
      nombre: "Grupo Alimentario del Sur",
      ruc: "B55443322",
      email: "info@grupoalimentario.es",
      telefono: "+34 95 111 2233",
      direccion: "Poligono Industrial Los Olivos, Nave 12",
      ciudad: "Sevilla",
      pais: "Espana",
      sector: "Alimentacion",
      contactos: {
        create: [
          {
            nombre: "Ana Ruiz",
            cargo: "Gerente de Operaciones",
            email: "ana.ruiz@grupoalimentario.es",
            telefono: "+34 600 456 789",
            principal: true,
          },
          {
            nombre: "Pedro Sanchez",
            cargo: "Director IT",
            email: "pedro.sanchez@grupoalimentario.es",
            telefono: "+34 600 567 890",
          },
        ],
      },
    },
  });

  const cliente4 = await prisma.cliente.create({
    data: {
      nombre: "Construcciones Iberia",
      ruc: "A11223344",
      email: "oficina@construiberia.es",
      telefono: "+34 96 333 4455",
      direccion: "Calle del Puerto 88",
      ciudad: "Valencia",
      pais: "Espana",
      sector: "Construccion",
      contactos: {
        create: [
          {
            nombre: "Roberto Fernandez",
            cargo: "Director de Compras",
            email: "roberto@construiberia.es",
            telefono: "+34 600 678 901",
            principal: true,
          },
        ],
      },
    },
  });

  const cliente5 = await prisma.cliente.create({
    data: {
      nombre: "Farmaceutica Nova S.L.",
      ruc: "B99887766",
      email: "info@farmanoba.com",
      telefono: "+34 94 555 6677",
      direccion: "Parque Tecnologico, Edificio 3",
      ciudad: "Bilbao",
      pais: "Espana",
      sector: "Farmaceutica",
      contactos: {
        create: [
          {
            nombre: "Elena Vega",
            cargo: "Directora de Sistemas",
            email: "elena.vega@farmanoba.com",
            telefono: "+34 600 789 012",
            principal: true,
          },
        ],
      },
    },
  });

  // Create quotes with different states
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  // Quote 1 - GANADA
  const cot1 = await prisma.cotizacion.create({
    data: {
      numero: "COT-2026-0001",
      clienteId: cliente1.id,
      estado: "GANADA",
      fechaEmision: ninetyDaysAgo,
      fechaVencimiento: sixtyDaysAgo,
      contactoNombre: "Carlos Martinez",
      subtotal: 7600,
      descuentoGlobal: 10,
      impuesto: 21,
      total: 8277.96,
      notas: "Implementacion completa con modulos ERP + CRM",
      lineItems: {
        create: [
          {
            descripcion: "Licencia ERP Base",
            productoId: products[0].id,
            cantidad: 1,
            precioUnitario: 2400,
            descuento: 0,
            total: 2400,
            orden: 0,
          },
          {
            descripcion: "Modulo CRM",
            productoId: products[1].id,
            cantidad: 1,
            precioUnitario: 800,
            descuento: 0,
            total: 800,
            orden: 1,
          },
          {
            descripcion: "Consultoria Implementacion (20h)",
            productoId: products[3].id,
            cantidad: 20,
            precioUnitario: 150,
            descuento: 0,
            total: 3000,
            orden: 2,
          },
          {
            descripcion: "Formacion Usuarios (10h)",
            productoId: products[4].id,
            cantidad: 10,
            precioUnitario: 120,
            descuento: 10,
            total: 1080,
            orden: 3,
          },
        ],
      },
      actividades: {
        create: [
          {
            tipo: "CREADA",
            descripcion: "Cotizacion creada",
            createdAt: ninetyDaysAgo,
          },
          {
            tipo: "ESTADO_CAMBIADO",
            descripcion: "Cotizacion enviada al cliente",
            estadoAnterior: "BORRADOR",
            estadoNuevo: "ENVIADA",
            createdAt: new Date(ninetyDaysAgo.getTime() + 2 * 24 * 60 * 60 * 1000),
          },
          {
            tipo: "ESTADO_CAMBIADO",
            descripcion: "Cliente acepto la cotizacion",
            estadoAnterior: "ENVIADA",
            estadoNuevo: "GANADA",
            createdAt: new Date(ninetyDaysAgo.getTime() + 15 * 24 * 60 * 60 * 1000),
          },
        ],
      },
    },
  });

  // Quote 2 - ENVIADA
  const cot2 = await prisma.cotizacion.create({
    data: {
      numero: "COT-2026-0002",
      clienteId: cliente2.id,
      estado: "ENVIADA",
      fechaEmision: thirtyDaysAgo,
      fechaVencimiento: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
      contactoNombre: "Miguel Torres",
      subtotal: 12950,
      descuentoGlobal: 5,
      impuesto: 21,
      total: 14892.53,
      notas: "Propuesta integral con desarrollo personalizado",
      lineItems: {
        create: [
          {
            descripcion: "Licencia ERP Base",
            productoId: products[0].id,
            cantidad: 1,
            precioUnitario: 2400,
            descuento: 0,
            total: 2400,
            orden: 0,
          },
          {
            descripcion: "Modulo CRM",
            productoId: products[1].id,
            cantidad: 1,
            precioUnitario: 800,
            descuento: 0,
            total: 800,
            orden: 1,
          },
          {
            descripcion: "Modulo Contabilidad",
            productoId: products[2].id,
            cantidad: 1,
            precioUnitario: 1200,
            descuento: 0,
            total: 1200,
            orden: 2,
          },
          {
            descripcion: "Desarrollo Personalizado (40h)",
            productoId: products[5].id,
            cantidad: 40,
            precioUnitario: 175,
            descuento: 0,
            total: 7000,
            orden: 3,
          },
          {
            descripcion: "Soporte Premium 24/7 (6 meses)",
            productoId: products[7].id,
            cantidad: 6,
            precioUnitario: 350,
            descuento: 25,
            total: 1575,
            orden: 4,
          },
        ],
      },
      actividades: {
        create: [
          {
            tipo: "CREADA",
            descripcion: "Cotizacion creada",
            createdAt: thirtyDaysAgo,
          },
          {
            tipo: "ESTADO_CAMBIADO",
            descripcion: "Cotizacion enviada al cliente",
            estadoAnterior: "BORRADOR",
            estadoNuevo: "ENVIADA",
            createdAt: new Date(thirtyDaysAgo.getTime() + 1 * 24 * 60 * 60 * 1000),
          },
        ],
      },
    },
  });

  // Quote 3 - PERDIDA
  const cot3 = await prisma.cotizacion.create({
    data: {
      numero: "COT-2026-0003",
      clienteId: cliente3.id,
      estado: "PERDIDA",
      fechaEmision: sixtyDaysAgo,
      fechaVencimiento: thirtyDaysAgo,
      contactoNombre: "Ana Ruiz",
      subtotal: 4500,
      descuentoGlobal: 0,
      impuesto: 21,
      total: 5445,
      notas: "El cliente eligio otra solucion",
      lineItems: {
        create: [
          {
            descripcion: "Servidor Dedicado",
            productoId: products[6].id,
            cantidad: 1,
            precioUnitario: 4500,
            descuento: 0,
            total: 4500,
            orden: 0,
          },
        ],
      },
      actividades: {
        create: [
          {
            tipo: "CREADA",
            descripcion: "Cotizacion creada",
            createdAt: sixtyDaysAgo,
          },
          {
            tipo: "ESTADO_CAMBIADO",
            descripcion: "Cotizacion enviada",
            estadoAnterior: "BORRADOR",
            estadoNuevo: "ENVIADA",
            createdAt: new Date(sixtyDaysAgo.getTime() + 3 * 24 * 60 * 60 * 1000),
          },
          {
            tipo: "ESTADO_CAMBIADO",
            descripcion: "Cliente rechazo - eligio competidor",
            estadoAnterior: "ENVIADA",
            estadoNuevo: "PERDIDA",
            createdAt: new Date(sixtyDaysAgo.getTime() + 20 * 24 * 60 * 60 * 1000),
          },
        ],
      },
    },
  });

  // Quote 4 - BORRADOR
  const cot4 = await prisma.cotizacion.create({
    data: {
      numero: "COT-2026-0004",
      clienteId: cliente4.id,
      estado: "BORRADOR",
      fechaEmision: now,
      contactoNombre: "Roberto Fernandez",
      subtotal: 6200,
      descuentoGlobal: 0,
      impuesto: 21,
      total: 7502,
      lineItems: {
        create: [
          {
            descripcion: "Licencia ERP Base",
            productoId: products[0].id,
            cantidad: 1,
            precioUnitario: 2400,
            descuento: 0,
            total: 2400,
            orden: 0,
          },
          {
            descripcion: "Modulo Contabilidad",
            productoId: products[2].id,
            cantidad: 1,
            precioUnitario: 1200,
            descuento: 0,
            total: 1200,
            orden: 1,
          },
          {
            descripcion: "Consultoria (16h)",
            productoId: products[3].id,
            cantidad: 16,
            precioUnitario: 150,
            descuento: 0,
            total: 2400,
            orden: 2,
          },
        ],
      },
      actividades: {
        create: [
          {
            tipo: "CREADA",
            descripcion: "Cotizacion creada",
            createdAt: now,
          },
        ],
      },
    },
  });

  // Quote 5 - NEGOCIACION
  const cot5 = await prisma.cotizacion.create({
    data: {
      numero: "COT-2026-0005",
      clienteId: cliente5.id,
      estado: "NEGOCIACION",
      fechaEmision: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
      fechaVencimiento: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000),
      contactoNombre: "Elena Vega",
      subtotal: 18550,
      descuentoGlobal: 15,
      impuesto: 21,
      total: 19075.43,
      notas: "Proyecto grande - negociando descuento adicional",
      lineItems: {
        create: [
          {
            descripcion: "Licencia ERP Base",
            productoId: products[0].id,
            cantidad: 3,
            precioUnitario: 2400,
            descuento: 0,
            total: 7200,
            orden: 0,
          },
          {
            descripcion: "Modulo CRM",
            productoId: products[1].id,
            cantidad: 3,
            precioUnitario: 800,
            descuento: 0,
            total: 2400,
            orden: 1,
          },
          {
            descripcion: "Desarrollo Personalizado (30h)",
            productoId: products[5].id,
            cantidad: 30,
            precioUnitario: 175,
            descuento: 0,
            total: 5250,
            orden: 2,
          },
          {
            descripcion: "Soporte Premium (12 meses)",
            productoId: products[7].id,
            cantidad: 12,
            precioUnitario: 350,
            descuento: 15,
            total: 3570,
            orden: 3,
          },
        ],
      },
      actividades: {
        create: [
          {
            tipo: "CREADA",
            descripcion: "Cotizacion creada",
            createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
          },
          {
            tipo: "ESTADO_CAMBIADO",
            descripcion: "Enviada al cliente",
            estadoAnterior: "BORRADOR",
            estadoNuevo: "ENVIADA",
            createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
          },
          {
            tipo: "ESTADO_CAMBIADO",
            descripcion: "Cliente solicita ajustes en precio",
            estadoAnterior: "ENVIADA",
            estadoNuevo: "NEGOCIACION",
            createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
          },
          {
            tipo: "NOTA",
            descripcion: "Reunion programada para discutir descuento por volumen",
            createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
          },
        ],
      },
    },
  });

  // Quote 6 - Another GANADA for analytics
  const cot6 = await prisma.cotizacion.create({
    data: {
      numero: "COT-2026-0006",
      clienteId: cliente1.id,
      estado: "GANADA",
      fechaEmision: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000),
      fechaVencimiento: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
      contactoNombre: "Carlos Martinez",
      subtotal: 3600,
      descuentoGlobal: 5,
      impuesto: 21,
      total: 4138.2,
      notas: "Ampliacion de licencias",
      lineItems: {
        create: [
          {
            descripcion: "Modulo Contabilidad",
            productoId: products[2].id,
            cantidad: 1,
            precioUnitario: 1200,
            descuento: 0,
            total: 1200,
            orden: 0,
          },
          {
            descripcion: "Formacion Usuarios (20h)",
            productoId: products[4].id,
            cantidad: 20,
            precioUnitario: 120,
            descuento: 0,
            total: 2400,
            orden: 1,
          },
        ],
      },
      actividades: {
        create: [
          {
            tipo: "CREADA",
            descripcion: "Cotizacion creada",
            createdAt: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000),
          },
          {
            tipo: "ESTADO_CAMBIADO",
            descripcion: "Ganada - cliente repite",
            estadoAnterior: "ENVIADA",
            estadoNuevo: "GANADA",
            createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
          },
        ],
      },
    },
  });

  console.log("Seed completado:");
  console.log("- 4 categorias");
  console.log("- 9 productos");
  console.log("- 5 clientes con contactos");
  console.log("- 6 cotizaciones (2 ganadas, 1 enviada, 1 negociacion, 1 perdida, 1 borrador)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
