import { prisma } from "@/lib/prisma";
import type Anthropic from "@anthropic-ai/sdk";

// Tool definitions for Claude
export const toolDefinitions: Anthropic.Tool[] = [
  {
    name: "buscar_clientes",
    description:
      "Busca clientes en la base de datos. Puede filtrar por nombre, sector o ciudad. Devuelve lista de clientes con sus datos básicos y número de cotizaciones.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: { type: "string", description: "Texto para buscar en nombre, email o ciudad" },
        sector: { type: "string", description: "Filtrar por sector/industria" },
      },
    },
  },
  {
    name: "obtener_cliente",
    description: "Obtiene el detalle completo de un cliente incluyendo contactos, todas sus cotizaciones con estado y totales.",
    input_schema: {
      type: "object" as const,
      properties: { clienteId: { type: "string", description: "ID del cliente" } },
      required: ["clienteId"],
    },
  },
  {
    name: "buscar_productos",
    description: "Busca productos en el catálogo. Puede filtrar por nombre, SKU o categoría. Incluye variantes de cada producto si existen.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: { type: "string", description: "Texto para buscar en nombre, SKU o descripción" },
        categoriaId: { type: "string", description: "Filtrar por categoría" },
      },
    },
  },
  {
    name: "obtener_producto",
    description: "Obtiene el detalle completo de un producto: nombre, SKU, precio, descripción, categoría, variantes y en cuántas cotizaciones aparece.",
    input_schema: {
      type: "object" as const,
      properties: { productoId: { type: "string", description: "ID del producto" } },
      required: ["productoId"],
    },
  },
  {
    name: "editar_producto",
    description: "Edita un producto existente. Puede cambiar nombre, SKU, precio base, descripción, unidad, categoría, o activar/desactivar el producto. Solo se modifican los campos proporcionados.",
    input_schema: {
      type: "object" as const,
      properties: {
        productoId: { type: "string", description: "ID del producto a editar" },
        nombre: { type: "string", description: "Nuevo nombre del producto" },
        sku: { type: "string", description: "Nuevo SKU" },
        precioBase: { type: "number", description: "Nuevo precio base en EUR" },
        descripcion: { type: "string", description: "Nueva descripción" },
        unidad: { type: "string", description: "Nueva unidad de medida" },
        categoriaNombre: { type: "string", description: "Nombre de la categoría. Si no existe, se crea automáticamente." },
        activo: { type: "boolean", description: "Activar o desactivar el producto" },
      },
      required: ["productoId"],
    },
  },
  {
    name: "buscar_cotizaciones",
    description: "Busca cotizaciones. Puede filtrar por estado (BORRADOR, ENVIADA, NEGOCIACION, GANADA, PERDIDA) o por cliente.",
    input_schema: {
      type: "object" as const,
      properties: {
        estado: { type: "string", description: "Filtrar por estado: BORRADOR, ENVIADA, NEGOCIACION, GANADA, PERDIDA" },
        clienteId: { type: "string", description: "Filtrar por cliente" },
      },
    },
  },
  {
    name: "obtener_cotizacion",
    description: "Obtiene el detalle completo de una cotización: cliente, line items con productos, actividades/historial, totales.",
    input_schema: {
      type: "object" as const,
      properties: { cotizacionId: { type: "string", description: "ID de la cotización" } },
      required: ["cotizacionId"],
    },
  },
  {
    name: "obtener_estadisticas",
    description: "Obtiene las métricas generales del negocio: pipeline total, tasa de conversión, ticket promedio, ingresos ganados, total clientes, cotizaciones activas.",
    input_schema: { type: "object" as const, properties: {} },
  },
  {
    name: "cotizaciones_pendientes_followup",
    description: "Encuentra cotizaciones que fueron enviadas o están en negociación hace más de N días y no han sido cerradas.",
    input_schema: {
      type: "object" as const,
      properties: { diasMinimos: { type: "number", description: "Días mínimos desde el envío para considerar que necesita follow-up (default: 7)" } },
    },
  },
  {
    name: "recomendar_productos",
    description: "Recomienda productos para un cliente basándose en su sector, historial de compras y productos más cotizados a clientes similares.",
    input_schema: {
      type: "object" as const,
      properties: { clienteId: { type: "string", description: "ID del cliente" } },
      required: ["clienteId"],
    },
  },
  {
    name: "analizar_cliente",
    description: "Analiza en profundidad un cliente: tasa de conversión, ticket promedio, productos más comprados, tiempo medio de cierre, tendencia.",
    input_schema: {
      type: "object" as const,
      properties: { clienteId: { type: "string", description: "ID del cliente" } },
      required: ["clienteId"],
    },
  },
  // ===== WRITE TOOLS =====
  {
    name: "crear_cliente",
    description: "Crea un nuevo cliente en el sistema. Requiere al menos el nombre.",
    input_schema: {
      type: "object" as const,
      properties: {
        nombre: { type: "string", description: "Nombre o razón social del cliente" },
        email: { type: "string", description: "Email del cliente" },
        telefono: { type: "string", description: "Teléfono del cliente" },
        direccion: { type: "string", description: "Dirección fiscal" },
        ciudad: { type: "string", description: "Ciudad" },
        pais: { type: "string", description: "País (default: España)" },
        sector: { type: "string", description: "Sector o industria" },
        ruc: { type: "string", description: "RUC, NIF o CIF" },
        notas: { type: "string", description: "Notas adicionales" },
        contactoNombre: { type: "string", description: "Nombre del contacto principal" },
        contactoCargo: { type: "string", description: "Cargo del contacto principal" },
        contactoEmail: { type: "string", description: "Email del contacto principal" },
        contactoTelefono: { type: "string", description: "Teléfono del contacto principal" },
      },
      required: ["nombre"],
    },
  },
  {
    name: "agregar_contacto",
    description: "Agrega un nuevo contacto a un cliente existente.",
    input_schema: {
      type: "object" as const,
      properties: {
        clienteId: { type: "string", description: "ID del cliente" },
        nombre: { type: "string", description: "Nombre completo del contacto" },
        cargo: { type: "string", description: "Cargo o posición" },
        email: { type: "string", description: "Email del contacto" },
        telefono: { type: "string", description: "Teléfono del contacto" },
        principal: { type: "boolean", description: "Si es el contacto principal (default: false)" },
      },
      required: ["clienteId", "nombre"],
    },
  },
  {
    name: "crear_producto",
    description: "Crea un nuevo producto en el catálogo. Requiere nombre, SKU y precio base.",
    input_schema: {
      type: "object" as const,
      properties: {
        nombre: { type: "string", description: "Nombre del producto" },
        sku: { type: "string", description: "Código SKU único del producto" },
        precioBase: { type: "number", description: "Precio base en EUR" },
        descripcion: { type: "string", description: "Descripción del producto" },
        unidad: { type: "string", description: "Unidad de medida (default: unidad)" },
        categoriaNombre: { type: "string", description: "Nombre de la categoría. Si no existe, se crea automáticamente." },
        variantes: {
          type: "array", description: "Variantes opcionales del producto.",
          items: {
            type: "object",
            properties: {
              nombre: { type: "string", description: "Nombre de la variante" },
              sku: { type: "string", description: "SKU único de la variante" },
              precioOverride: { type: "number", description: "Precio específico de esta variante" },
              atributos: { type: "object", description: "Pares clave-valor con atributos" },
            },
            required: ["nombre", "sku"],
          },
        },
      },
      required: ["nombre", "sku", "precioBase"],
    },
  },
  {
    name: "crear_cotizacion",
    description: "Crea una nueva cotización para un cliente con líneas de producto. Calcula automáticamente subtotal, impuesto y total.",
    input_schema: {
      type: "object" as const,
      properties: {
        clienteId: { type: "string", description: "ID del cliente" },
        contactoNombre: { type: "string", description: "Nombre del contacto para la cotización" },
        notas: { type: "string", description: "Notas internas" },
        condiciones: { type: "string", description: "Condiciones comerciales" },
        descuentoGlobal: { type: "number", description: "Porcentaje de descuento global (0-100)" },
        incluirIva: { type: "boolean", description: "Si se incluye IVA (por defecto true)" },
        impuesto: { type: "number", description: "Porcentaje de IVA (por defecto 21)" },
        items: {
          type: "array", description: "Líneas de la cotización.",
          items: {
            type: "object",
            properties: {
              productoId: { type: "string", description: "ID del producto del catálogo" },
              varianteId: { type: "string", description: "ID de la variante del producto" },
              descripcion: { type: "string", description: "Descripción manual (si no hay productoId)" },
              cantidad: { type: "number", description: "Cantidad (default: 1)" },
              precioUnitario: { type: "number", description: "Precio unitario override" },
              descuento: { type: "number", description: "Porcentaje descuento línea (0-100)" },
            },
          },
        },
      },
      required: ["clienteId", "items"],
    },
  },
  {
    name: "cambiar_estado_cotizacion",
    description: "Cambia el estado de una cotización. Estados válidos: BORRADOR, ENVIADA, NEGOCIACION, GANADA, PERDIDA, ARCHIVADA.",
    input_schema: {
      type: "object" as const,
      properties: {
        cotizacionId: { type: "string", description: "ID de la cotización" },
        nuevoEstado: { type: "string", description: "Nuevo estado" },
        motivo: { type: "string", description: "Motivo o comentario del cambio" },
      },
      required: ["cotizacionId", "nuevoEstado"],
    },
  },
  {
    name: "registrar_actividad",
    description: "Registra una actividad o nota en una cotización. Tipos: NOTA, LLAMADA, REUNION, EMAIL, SEGUIMIENTO.",
    input_schema: {
      type: "object" as const,
      properties: {
        cotizacionId: { type: "string", description: "ID de la cotización" },
        tipo: { type: "string", description: "Tipo de actividad: NOTA, LLAMADA, REUNION, EMAIL, SEGUIMIENTO" },
        descripcion: { type: "string", description: "Descripción de la actividad" },
      },
      required: ["cotizacionId", "tipo", "descripcion"],
    },
  },
  // ===== REGLAS COMERCIALES TOOLS =====
  {
    name: "listar_reglas",
    description: "Lista todas las reglas comerciales del sistema. Puede filtrar por tipo.",
    input_schema: {
      type: "object" as const,
      properties: { tipo: { type: "string", description: "Filtrar por tipo: LIMITE_DESCUENTO, PRODUCTO_OBLIGATORIO, APROBACION, PROMOCION" } },
    },
  },
  {
    name: "crear_regla",
    description: `Crea una nueva regla comercial. Hay 4 tipos con configuraciones diferentes:
1. LIMITE_DESCUENTO: { tipoLimite: "linea"|"global"|"ambos", maxDescuentoLinea?: number, maxDescuentoGlobal?: number }
2. PRODUCTO_OBLIGATORIO: { condicion: { tipo: "producto"|"categoria", ids: string[] }, productosRequeridos: string[], mensaje?: string }
3. APROBACION: { condiciones: [{ tipo: "descuento_linea"|"descuento_global"|"monto_total", umbral: number, operador: "mayor_que"|"mayor_igual" }], aprobador: { nombre: string, email: string } }
4. PROMOCION: { fechaInicio: "YYYY-MM-DD", fechaFin: "YYYY-MM-DD", productoIds: string[], tipoPromocion: "descuento_porcentaje"|"precio_fijo", valor: number, mensaje?: string }`,
    input_schema: {
      type: "object" as const,
      properties: {
        nombre: { type: "string", description: "Nombre descriptivo de la regla" },
        tipo: { type: "string", description: "Tipo de regla" },
        configuracion: { type: "object", description: "Configuración según el tipo de regla" },
        prioridad: { type: "number", description: "Prioridad (1-100, default: 50)" },
        activa: { type: "boolean", description: "Si la regla está activa (default: true)" },
      },
      required: ["nombre", "tipo", "configuracion"],
    },
  },
  {
    name: "editar_regla",
    description: "Edita una regla comercial existente.",
    input_schema: {
      type: "object" as const,
      properties: {
        reglaId: { type: "string", description: "ID de la regla a editar" },
        nombre: { type: "string", description: "Nuevo nombre" },
        configuracion: { type: "object", description: "Nueva configuración" },
        prioridad: { type: "number", description: "Nueva prioridad" },
        activa: { type: "boolean", description: "Activar o desactivar" },
      },
      required: ["reglaId"],
    },
  },
  {
    name: "eliminar_regla",
    description: "Elimina una regla comercial del sistema.",
    input_schema: {
      type: "object" as const,
      properties: { reglaId: { type: "string", description: "ID de la regla a eliminar" } },
      required: ["reglaId"],
    },
  },
  // ===== EMPRESA CONFIG TOOL =====
  {
    name: "actualizar_empresa",
    description: "Actualiza los datos de configuración de la empresa.",
    input_schema: {
      type: "object" as const,
      properties: {
        nombre: { type: "string" }, cif: { type: "string" }, email: { type: "string" },
        telefono: { type: "string" }, direccion: { type: "string" }, ciudad: { type: "string" },
        pais: { type: "string" }, web: { type: "string" },
        plantillaPdf: { type: "string", description: "moderna, clásica, minimalista" },
        colorPrimario: { type: "string", description: "Color hex (#RRGGBB)" },
        prefijoCotizacion: { type: "string" }, diasVencimiento: { type: "number" },
        condicionesDefecto: { type: "string" },
      },
    },
  },
  {
    name: "obtener_empresa",
    description: "Obtiene los datos actuales de configuración de la empresa.",
    input_schema: { type: "object" as const, properties: {} },
  },
  // ===== MEMORY TOOLS =====
  {
    name: "guardar_memoria",
    description: "Guarda un dato importante sobre el usuario en la memoria persistente de Forge.",
    input_schema: {
      type: "object" as const,
      properties: {
        contenido: { type: "string", description: "Dato a recordar. Debe ser concreto y útil." },
      },
      required: ["contenido"],
    },
  },
  {
    name: "borrar_memoria",
    description: "Borra una memoria específica por su ID.",
    input_schema: {
      type: "object" as const,
      properties: { memoriaId: { type: "string", description: "ID de la memoria a borrar" } },
      required: ["memoriaId"],
    },
  },
];

// ===== TOOL DISPATCH =====
// userId is REQUIRED for all data-access tools to enforce tenant isolation
export async function executeToolCall(
  toolName: string,
  toolInput: Record<string, unknown>,
  userId?: string
): Promise<string> {
  if (!userId) return JSON.stringify({ error: "Usuario no autenticado" });

  switch (toolName) {
    case "buscar_clientes": return buscarClientes(toolInput, userId);
    case "obtener_cliente": return obtenerCliente(toolInput, userId);
    case "buscar_productos": return buscarProductos(toolInput, userId);
    case "obtener_producto": return obtenerProducto(toolInput, userId);
    case "editar_producto": return editarProducto(toolInput, userId);
    case "buscar_cotizaciones": return buscarCotizaciones(toolInput, userId);
    case "obtener_cotizacion": return obtenerCotizacion(toolInput, userId);
    case "obtener_estadisticas": return obtenerEstadisticas(userId);
    case "cotizaciones_pendientes_followup": return cotizacionesPendientesFollowup(toolInput, userId);
    case "recomendar_productos": return recomendarProductos(toolInput, userId);
    case "analizar_cliente": return analizarCliente(toolInput, userId);
    case "crear_cliente": return crearCliente(toolInput, userId);
    case "agregar_contacto": return agregarContacto(toolInput, userId);
    case "crear_producto": return crearProducto(toolInput, userId);
    case "crear_cotizacion": return crearCotizacion(toolInput, userId);
    case "cambiar_estado_cotizacion": return cambiarEstadoCotizacion(toolInput, userId);
    case "registrar_actividad": return registrarActividad(toolInput, userId);
    case "listar_reglas": return listarReglas(toolInput, userId);
    case "crear_regla": return crearRegla(toolInput, userId);
    case "editar_regla": return editarRegla(toolInput, userId);
    case "eliminar_regla": return eliminarRegla(toolInput, userId);
    case "actualizar_empresa": return actualizarEmpresa(toolInput);
    case "obtener_empresa": return obtenerEmpresa();
    case "guardar_memoria": return guardarMemoria(toolInput, userId);
    case "borrar_memoria": return borrarMemoria(toolInput, userId);
    default: return JSON.stringify({ error: `Tool desconocido: ${toolName}` });
  }
}

// ===== READ TOOL HANDLERS =====

async function buscarClientes(input: Record<string, unknown>, userId: string) {
  const query = (input.query as string) || "";
  const sector = (input.sector as string) || "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { usuarioId: userId };
  if (query) {
    where.OR = [
      { nombre: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
      { ciudad: { contains: query, mode: "insensitive" } },
    ];
  }
  if (sector) where.sector = sector;
  const clientes = await prisma.cliente.findMany({ where, include: { contactos: { where: { principal: true }, take: 1 }, _count: { select: { cotizaciones: true } } }, take: 20 });
  return JSON.stringify(clientes.map((c) => ({ id: c.id, nombre: c.nombre, sector: c.sector, ciudad: c.ciudad, email: c.email, contactoPrincipal: c.contactos[0]?.nombre || null, totalCotizaciones: c._count.cotizaciones })));
}

async function obtenerCliente(input: Record<string, unknown>, userId: string) {
  const cliente = await prisma.cliente.findFirst({
    where: { id: input.clienteId as string, usuarioId: userId },
    include: { contactos: true, cotizaciones: { select: { id: true, numero: true, estado: true, total: true, fechaEmision: true }, orderBy: { createdAt: "desc" } } },
  });
  if (!cliente) return JSON.stringify({ error: "Cliente no encontrado" });
  return JSON.stringify(cliente);
}

async function buscarProductos(input: Record<string, unknown>, userId: string) {
  const query = (input.query as string) || "";
  const categoriaId = (input.categoriaId as string) || "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { usuarioId: userId };
  if (query) {
    where.OR = [
      { nombre: { contains: query, mode: "insensitive" } },
      { sku: { contains: query, mode: "insensitive" } },
      { descripcion: { contains: query, mode: "insensitive" } },
    ];
  }
  if (categoriaId) where.categoriaId = categoriaId;
  const productos = await prisma.producto.findMany({ where, include: { categoria: true, variantes: { where: { activo: true }, orderBy: { nombre: "asc" } } }, orderBy: { nombre: "asc" }, take: 30 });
  return JSON.stringify(productos.map((p) => ({ id: p.id, nombre: p.nombre, sku: p.sku, precioBase: p.precioBase, descripcion: p.descripcion, unidad: p.unidad, categoria: p.categoria?.nombre, activo: p.activo, variantes: p.variantes.map((v) => ({ id: v.id, nombre: v.nombre, sku: v.sku, precioOverride: v.precioOverride, atributos: v.atributos })) })));
}

async function obtenerProducto(input: Record<string, unknown>, userId: string) {
  const producto = await prisma.producto.findFirst({
    where: { id: input.productoId as string, usuarioId: userId },
    include: { categoria: true, variantes: { orderBy: { nombre: "asc" } }, _count: { select: { lineItems: true } } },
  });
  if (!producto) return JSON.stringify({ error: "Producto no encontrado" });
  return JSON.stringify({ id: producto.id, nombre: producto.nombre, sku: producto.sku, precioBase: producto.precioBase, descripcion: producto.descripcion, unidad: producto.unidad, activo: producto.activo, categoria: producto.categoria?.nombre || null, variantes: producto.variantes.map((v) => ({ id: v.id, nombre: v.nombre, sku: v.sku, precioOverride: v.precioOverride, atributos: v.atributos, activo: v.activo })), usadoEnCotizaciones: producto._count.lineItems, createdAt: producto.createdAt, updatedAt: producto.updatedAt });
}

async function editarProducto(input: Record<string, unknown>, userId: string) {
  try {
    const existing = await prisma.producto.findFirst({ where: { id: input.productoId as string, usuarioId: userId }, select: { id: true } });
    if (!existing) return JSON.stringify({ error: "Producto no encontrado" });

    let categoriaId: string | undefined;
    if (input.categoriaNombre) {
      const existingCat = await prisma.categoria.findUnique({ where: { nombre: input.categoriaNombre as string } });
      categoriaId = existingCat ? existingCat.id : (await prisma.categoria.create({ data: { nombre: input.categoriaNombre as string } })).id;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    if (input.nombre !== undefined) updateData.nombre = input.nombre;
    if (input.sku !== undefined) updateData.sku = input.sku;
    if (input.precioBase !== undefined) updateData.precioBase = input.precioBase;
    if (input.descripcion !== undefined) updateData.descripcion = input.descripcion;
    if (input.unidad !== undefined) updateData.unidad = input.unidad;
    if (input.activo !== undefined) updateData.activo = input.activo;
    if (categoriaId !== undefined) updateData.categoriaId = categoriaId;

    const producto = await prisma.producto.update({ where: { id: input.productoId as string }, data: updateData, include: { categoria: true, variantes: { where: { activo: true } } } });
    return JSON.stringify({ success: true, mensaje: `Producto "${producto.nombre}" actualizado correctamente`, producto: { id: producto.id, nombre: producto.nombre, sku: producto.sku, precioBase: producto.precioBase, descripcion: producto.descripcion, unidad: producto.unidad, activo: producto.activo, categoria: producto.categoria?.nombre } });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    if (msg.includes("Unique constraint")) return JSON.stringify({ error: "Ya existe un producto con ese SKU." });
    return JSON.stringify({ error: `Error al editar producto: ${msg}` });
  }
}

async function buscarCotizaciones(input: Record<string, unknown>, userId: string) {
  const where: Record<string, unknown> = { usuarioId: userId };
  if (input.estado) where.estado = input.estado;
  if (input.clienteId) where.clienteId = input.clienteId;
  const cotizaciones = await prisma.cotizacion.findMany({ where, include: { cliente: { select: { nombre: true } }, _count: { select: { lineItems: true } } }, orderBy: { createdAt: "desc" }, take: 20 });
  return JSON.stringify(cotizaciones.map((c) => ({ id: c.id, numero: c.numero, cliente: c.cliente.nombre, estado: c.estado, total: c.total, fechaEmision: c.fechaEmision, items: c._count.lineItems })));
}

async function obtenerCotizacion(input: Record<string, unknown>, userId: string) {
  const cotizacion = await prisma.cotizacion.findFirst({
    where: { id: input.cotizacionId as string, usuarioId: userId },
    include: { cliente: { select: { id: true, nombre: true, sector: true } }, lineItems: { include: { producto: { select: { nombre: true, sku: true } } }, orderBy: { orden: "asc" } }, actividades: { orderBy: { createdAt: "desc" }, take: 10 } },
  });
  if (!cotizacion) return JSON.stringify({ error: "Cotización no encontrada" });
  return JSON.stringify(cotizacion);
}

async function obtenerEstadisticas(userId: string) {
  const [cotizaciones, totalClientes] = await Promise.all([
    prisma.cotizacion.findMany({ where: { usuarioId: userId }, select: { estado: true, total: true } }),
    prisma.cliente.count({ where: { usuarioId: userId } }),
  ]);
  const ganadas = cotizaciones.filter((c) => c.estado === "GANADA");
  const perdidas = cotizaciones.filter((c) => c.estado === "PERDIDA");
  const cerradas = ganadas.length + perdidas.length;
  return JSON.stringify({
    totalPipeline: cotizaciones.filter((c) => ["ENVIADA", "NEGOCIACION", "BORRADOR"].includes(c.estado)).reduce((s, c) => s + c.total, 0),
    tasaConversion: cerradas > 0 ? (ganadas.length / cerradas) * 100 : 0,
    ticketPromedio: ganadas.length > 0 ? ganadas.reduce((s, c) => s + c.total, 0) / ganadas.length : 0,
    ingresoTotal: ganadas.reduce((s, c) => s + c.total, 0),
    totalClientes,
    cotizacionesActivas: cotizaciones.filter((c) => ["ENVIADA", "NEGOCIACION"].includes(c.estado)).length,
    totalCotizaciones: cotizaciones.length, ganadas: ganadas.length, perdidas: perdidas.length,
  });
}

async function cotizacionesPendientesFollowup(input: Record<string, unknown>, userId: string) {
  const diasMinimos = (input.diasMinimos as number) || 7;
  const fechaLimite = new Date();
  fechaLimite.setDate(fechaLimite.getDate() - diasMinimos);
  const cotizaciones = await prisma.cotizacion.findMany({
    where: { usuarioId: userId, estado: { in: ["ENVIADA", "NEGOCIACION"] }, fechaEmision: { lt: fechaLimite } },
    include: { cliente: { select: { id: true, nombre: true } } }, orderBy: { fechaEmision: "asc" },
  });
  return JSON.stringify(cotizaciones.map((c) => ({ id: c.id, numero: c.numero, cliente: c.cliente.nombre, clienteId: c.cliente.id, estado: c.estado, total: c.total, fechaEmision: c.fechaEmision, diasDesdeEnvio: Math.floor((Date.now() - new Date(c.fechaEmision).getTime()) / (1000 * 60 * 60 * 24)) })));
}

async function recomendarProductos(input: Record<string, unknown>, userId: string) {
  const cliente = await prisma.cliente.findFirst({ where: { id: input.clienteId as string, usuarioId: userId }, select: { sector: true, nombre: true } });
  if (!cliente) return JSON.stringify({ error: "Cliente no encontrado" });

  const clientesDelSector = await prisma.cliente.findMany({ where: { sector: cliente.sector, usuarioId: userId }, select: { id: true } });
  const clienteIds = clientesDelSector.map((c) => c.id);
  const lineItems = await prisma.lineItem.findMany({
    where: { cotizacion: { clienteId: { in: clienteIds }, estado: "GANADA", usuarioId: userId }, productoId: { not: null } },
    include: { producto: { select: { id: true, nombre: true, sku: true, precioBase: true, unidad: true } } },
  });

  const productCount: Record<string, { producto: (typeof lineItems)[0]["producto"]; veces: number; valorTotal: number }> = {};
  lineItems.forEach((li) => { if (!li.producto) return; const key = li.producto.id; if (!productCount[key]) productCount[key] = { producto: li.producto, veces: 0, valorTotal: 0 }; productCount[key].veces += 1; productCount[key].valorTotal += li.total; });
  const recomendaciones = Object.values(productCount).sort((a, b) => b.veces - a.veces).slice(0, 5);

  const productosYaCotizados = await prisma.lineItem.findMany({ where: { cotizacion: { clienteId: input.clienteId as string, usuarioId: userId } }, select: { productoId: true }, distinct: ["productoId"] });
  const idsYaCotizados = productosYaCotizados.map((p) => p.productoId).filter(Boolean);
  const productosNuevos = await prisma.producto.findMany({ where: { activo: true, usuarioId: userId, id: { notIn: idsYaCotizados as string[] } }, select: { id: true, nombre: true, sku: true, precioBase: true }, take: 5 });

  return JSON.stringify({ sector: cliente.sector, clienteNombre: cliente.nombre, recomendadosPorSector: recomendaciones.map((r) => ({ ...r.producto, vecesCompradoEnSector: r.veces, valorTotalEnSector: r.valorTotal })), productosNuevosParaCliente: productosNuevos });
}

async function analizarCliente(input: Record<string, unknown>, userId: string) {
  const cliente = await prisma.cliente.findFirst({
    where: { id: input.clienteId as string, usuarioId: userId },
    include: { cotizaciones: { include: { lineItems: { include: { producto: { select: { nombre: true } } } } }, orderBy: { fechaEmision: "asc" } } },
  });
  if (!cliente) return JSON.stringify({ error: "Cliente no encontrado" });

  const ganadas = cliente.cotizaciones.filter((c) => c.estado === "GANADA");
  const perdidas = cliente.cotizaciones.filter((c) => c.estado === "PERDIDA");
  const cerradas = ganadas.length + perdidas.length;

  const productCount: Record<string, { nombre: string; veces: number }> = {};
  ganadas.forEach((c) => c.lineItems.forEach((li) => { const name = li.producto?.nombre || li.descripcion; if (!productCount[name]) productCount[name] = { nombre: name, veces: 0 }; productCount[name].veces += 1; }));

  return JSON.stringify({
    nombre: cliente.nombre, sector: cliente.sector, totalCotizaciones: cliente.cotizaciones.length,
    ganadas: ganadas.length, perdidas: perdidas.length,
    activas: cliente.cotizaciones.filter((c) => ["ENVIADA", "NEGOCIACION", "BORRADOR"].includes(c.estado)).length,
    tasaConversion: cerradas > 0 ? (ganadas.length / cerradas) * 100 : 0,
    ingresoTotal: ganadas.reduce((s, c) => s + c.total, 0),
    ticketPromedio: ganadas.length > 0 ? ganadas.reduce((s, c) => s + c.total, 0) / ganadas.length : 0,
    productosMasComprados: Object.values(productCount).sort((a, b) => b.veces - a.veces).slice(0, 5),
    ultimaCotizacion: cliente.cotizaciones.length > 0 ? { numero: cliente.cotizaciones[cliente.cotizaciones.length - 1].numero, estado: cliente.cotizaciones[cliente.cotizaciones.length - 1].estado, fecha: cliente.cotizaciones[cliente.cotizaciones.length - 1].fechaEmision } : null,
  });
}

// ===== WRITE TOOL HANDLERS =====

async function crearCliente(input: Record<string, unknown>, userId: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = { nombre: input.nombre as string, usuarioId: userId };
    if (input.email) data.email = input.email;
    if (input.telefono) data.telefono = input.telefono;
    if (input.direccion) data.direccion = input.direccion;
    if (input.ciudad) data.ciudad = input.ciudad;
    if (input.pais) data.pais = input.pais;
    if (input.sector) data.sector = input.sector;
    if (input.ruc) data.ruc = input.ruc;
    if (input.notas) data.notas = input.notas;
    if (input.contactoNombre) {
      data.contactos = { create: [{ nombre: input.contactoNombre as string, cargo: (input.contactoCargo as string) || null, email: (input.contactoEmail as string) || null, telefono: (input.contactoTelefono as string) || null, principal: true }] };
    }
    const cliente = await prisma.cliente.create({ data, include: { contactos: true } });
    return JSON.stringify({ success: true, mensaje: `Cliente "${cliente.nombre}" creado correctamente`, cliente: { id: cliente.id, nombre: cliente.nombre, sector: cliente.sector, ciudad: cliente.ciudad, email: cliente.email, contactos: cliente.contactos.map((c) => ({ nombre: c.nombre, cargo: c.cargo, email: c.email })) } });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return JSON.stringify({ error: `Error al crear cliente: ${msg}` });
  }
}

async function agregarContacto(input: Record<string, unknown>, userId: string) {
  try {
    const cliente = await prisma.cliente.findFirst({ where: { id: input.clienteId as string, usuarioId: userId }, select: { nombre: true } });
    if (!cliente) return JSON.stringify({ error: "Cliente no encontrado" });
    if (input.principal) { await prisma.contacto.updateMany({ where: { clienteId: input.clienteId as string, principal: true }, data: { principal: false } }); }
    const contacto = await prisma.contacto.create({ data: { clienteId: input.clienteId as string, nombre: input.nombre as string, cargo: (input.cargo as string) || null, email: (input.email as string) || null, telefono: (input.telefono as string) || null, principal: (input.principal as boolean) || false } });
    return JSON.stringify({ success: true, mensaje: `Contacto "${contacto.nombre}" agregado a ${cliente.nombre}`, contacto: { id: contacto.id, nombre: contacto.nombre, cargo: contacto.cargo, email: contacto.email, principal: contacto.principal } });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return JSON.stringify({ error: `Error al agregar contacto: ${msg}` });
  }
}

async function crearProducto(input: Record<string, unknown>, userId: string) {
  try {
    let categoriaId: string | null = null;
    if (input.categoriaNombre) {
      const existingCat = await prisma.categoria.findUnique({ where: { nombre: input.categoriaNombre as string } });
      categoriaId = existingCat ? existingCat.id : (await prisma.categoria.create({ data: { nombre: input.categoriaNombre as string } })).id;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const variantesInput = (input.variantes as any[]) || [];
    const producto = await prisma.producto.create({
      data: {
        nombre: input.nombre as string, sku: input.sku as string, precioBase: input.precioBase as number,
        descripcion: (input.descripcion as string) || null, unidad: (input.unidad as string) || "unidad",
        categoriaId, usuarioId: userId,
        variantes: variantesInput.length > 0 ? { create: variantesInput.map((v) => ({ nombre: v.nombre as string, sku: v.sku as string, precioOverride: (v.precioOverride as number) ?? null, atributos: v.atributos ? JSON.stringify(v.atributos) : "{}" })) } : undefined,
      },
      include: { categoria: true, variantes: true },
    });
    const varMsg = producto.variantes.length > 0 ? ` con ${producto.variantes.length} variante(s): ${producto.variantes.map((v) => v.nombre).join(", ")}` : "";
    return JSON.stringify({ success: true, mensaje: `Producto "${producto.nombre}" (SKU: ${producto.sku}) creado a ${producto.precioBase} EUR${varMsg}`, producto: { id: producto.id, nombre: producto.nombre, sku: producto.sku, precioBase: producto.precioBase, unidad: producto.unidad, categoria: producto.categoria?.nombre, variantes: producto.variantes.map((v) => ({ id: v.id, nombre: v.nombre, sku: v.sku, precioOverride: v.precioOverride })) } });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    if (msg.includes("Unique constraint")) return JSON.stringify({ error: `Ya existe un producto con ese SKU. Usa un SKU diferente.` });
    return JSON.stringify({ error: `Error al crear producto: ${msg}` });
  }
}

async function crearCotizacion(input: Record<string, unknown>, userId: string) {
  try {
    const cliente = await prisma.cliente.findFirst({ where: { id: input.clienteId as string, usuarioId: userId }, select: { nombre: true } });
    if (!cliente) return JSON.stringify({ error: "Cliente no encontrado" });

    const empresa = await prisma.empresa.findUnique({ where: { id: "default" }, select: { prefijoCotizacion: true, diasVencimiento: true, condicionesDefecto: true } });
    const prefijo = empresa?.prefijoCotizacion || "COT";
    const diasVencimiento = empresa?.diasVencimiento ?? 30;
    const count = await prisma.cotizacion.count({ where: { usuarioId: userId } });
    const numero = `${prefijo}-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, "0")}`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = (input.items as any[]) || [];
    if (items.length === 0) return JSON.stringify({ error: "La cotización necesita al menos un item" });

    const lineItemsData = [];
    let subtotal = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let precio = item.precioUnitario as number;
      let descripcion = item.descripcion as string;
      if (item.productoId) {
        const producto = await prisma.producto.findFirst({ where: { id: item.productoId, usuarioId: userId }, select: { nombre: true, precioBase: true } });
        if (!producto) return JSON.stringify({ error: `Producto con ID ${item.productoId} no encontrado` });
        if (item.varianteId) {
          const variante = await prisma.varianteProducto.findUnique({ where: { id: item.varianteId as string }, select: { nombre: true, precioOverride: true } });
          if (variante) { if (!precio) precio = variante.precioOverride ?? producto.precioBase; if (!descripcion) descripcion = `${producto.nombre} - ${variante.nombre}`; }
        } else { if (!precio) precio = producto.precioBase; if (!descripcion) descripcion = producto.nombre; }
      }
      if (!precio) return JSON.stringify({ error: `Item ${i + 1} necesita un precioUnitario` });
      if (!descripcion) return JSON.stringify({ error: `Item ${i + 1} necesita una descripción o productoId` });
      const cantidad = (item.cantidad as number) || 1;
      const descuento = (item.descuento as number) || 0;
      const lineTotal = cantidad * precio * (1 - descuento / 100);
      subtotal += lineTotal;
      lineItemsData.push({ productoId: (item.productoId as string) || null, varianteId: (item.varianteId as string) || null, descripcion, cantidad, precioUnitario: precio, descuento, total: lineTotal, orden: i });
    }

    const descuentoGlobal = (input.descuentoGlobal as number) || 0;
    const subtotalConDescuento = subtotal * (1 - descuentoGlobal / 100);
    const incluirIva = input.incluirIva !== false;
    const impuestoPct = incluirIva ? ((input.impuesto as number) ?? 21) : 0;
    const total = subtotalConDescuento * (1 + impuestoPct / 100);

    const cotizacion = await prisma.cotizacion.create({
      data: {
        numero, clienteId: input.clienteId as string, usuarioId: userId,
        contactoNombre: (input.contactoNombre as string) || null,
        notas: (input.notas as string) || null,
        condiciones: (input.condiciones as string) || empresa?.condicionesDefecto || null,
        subtotal, descuentoGlobal, impuesto: impuestoPct, total,
        fechaVencimiento: new Date(Date.now() + diasVencimiento * 24 * 60 * 60 * 1000),
        lineItems: { create: lineItemsData },
        actividades: { create: { tipo: "SISTEMA", descripcion: "Cotización creada por Forge (asistente IA)" } },
      },
      include: { cliente: { select: { nombre: true } }, lineItems: { include: { producto: { select: { nombre: true } } }, orderBy: { orden: "asc" } } },
    });

    return JSON.stringify({ success: true, mensaje: `Cotización ${cotizacion.numero} creada para ${cliente.nombre} por ${total.toFixed(2)} EUR`, cotizacion: { id: cotizacion.id, numero: cotizacion.numero, cliente: cotizacion.cliente.nombre, estado: cotizacion.estado, subtotal: cotizacion.subtotal, descuentoGlobal: cotizacion.descuentoGlobal, impuesto: cotizacion.impuesto, total: cotizacion.total, items: cotizacion.lineItems.map((li) => ({ descripcion: li.descripcion, cantidad: li.cantidad, precioUnitario: li.precioUnitario, descuento: li.descuento, total: li.total })) } });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return JSON.stringify({ error: `Error al crear cotización: ${msg}` });
  }
}

async function cambiarEstadoCotizacion(input: Record<string, unknown>, userId: string) {
  try {
    const estadosValidos = ["BORRADOR", "ENVIADA", "NEGOCIACION", "GANADA", "PERDIDA", "ARCHIVADA"];
    const nuevoEstado = (input.nuevoEstado as string).toUpperCase();
    if (!estadosValidos.includes(nuevoEstado)) return JSON.stringify({ error: `Estado inválido "${nuevoEstado}". Estados válidos: ${estadosValidos.join(", ")}` });

    const cotizacion = await prisma.cotizacion.findFirst({ where: { id: input.cotizacionId as string, usuarioId: userId }, select: { numero: true, estado: true, cliente: { select: { nombre: true } } } });
    if (!cotizacion) return JSON.stringify({ error: "Cotización no encontrada" });
    if (cotizacion.estado === nuevoEstado) return JSON.stringify({ error: `La cotización ya está en estado ${nuevoEstado}` });

    const updated = await prisma.cotizacion.update({ where: { id: input.cotizacionId as string }, data: { estado: nuevoEstado, actividades: { create: { tipo: "CAMBIO_ESTADO", descripcion: input.motivo ? `Estado cambiado de ${cotizacion.estado} a ${nuevoEstado}: ${input.motivo}` : `Estado cambiado de ${cotizacion.estado} a ${nuevoEstado}`, estadoAnterior: cotizacion.estado, estadoNuevo: nuevoEstado } } } });
    return JSON.stringify({ success: true, mensaje: `Cotización ${cotizacion.numero} (${cotizacion.cliente.nombre}) cambiada de ${cotizacion.estado} a ${nuevoEstado}`, cotizacion: { id: updated.id, numero: cotizacion.numero, estadoAnterior: cotizacion.estado, estadoNuevo: nuevoEstado } });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return JSON.stringify({ error: `Error al cambiar estado: ${msg}` });
  }
}

async function registrarActividad(input: Record<string, unknown>, userId: string) {
  try {
    const tiposValidos = ["NOTA", "LLAMADA", "REUNION", "EMAIL", "SEGUIMIENTO"];
    const tipo = (input.tipo as string).toUpperCase();
    if (!tiposValidos.includes(tipo)) return JSON.stringify({ error: `Tipo inválido "${tipo}". Tipos válidos: ${tiposValidos.join(", ")}` });

    const cotizacion = await prisma.cotizacion.findFirst({ where: { id: input.cotizacionId as string, usuarioId: userId }, select: { numero: true, cliente: { select: { nombre: true } } } });
    if (!cotizacion) return JSON.stringify({ error: "Cotización no encontrada" });

    const actividad = await prisma.actividad.create({ data: { cotizacionId: input.cotizacionId as string, tipo, descripcion: input.descripcion as string } });
    return JSON.stringify({ success: true, mensaje: `Actividad registrada en ${cotizacion.numero} (${cotizacion.cliente.nombre}): ${tipo} - ${actividad.descripcion}`, actividad: { id: actividad.id, tipo: actividad.tipo, descripcion: actividad.descripcion, cotizacion: cotizacion.numero } });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return JSON.stringify({ error: `Error al registrar actividad: ${msg}` });
  }
}

// ===== REGLAS COMERCIALES HANDLERS =====

async function listarReglas(input: Record<string, unknown>, userId: string) {
  const where: Record<string, unknown> = { usuarioId: userId };
  if (input.tipo) where.tipo = input.tipo;
  const reglas = await prisma.reglaComercial.findMany({ where, orderBy: [{ prioridad: "desc" }, { createdAt: "desc" }] });
  return JSON.stringify(reglas.map((r) => ({ id: r.id, nombre: r.nombre, tipo: r.tipo, activa: r.activa, prioridad: r.prioridad, configuracion: JSON.parse(r.configuracion) })));
}

async function crearRegla(input: Record<string, unknown>, userId: string) {
  try {
    const tiposValidos = ["LIMITE_DESCUENTO", "PRODUCTO_OBLIGATORIO", "APROBACION", "PROMOCION"];
    const tipo = input.tipo as string;
    if (!tiposValidos.includes(tipo)) return JSON.stringify({ error: `Tipo inválido. Tipos válidos: ${tiposValidos.join(", ")}` });
    const regla = await prisma.reglaComercial.create({ data: { nombre: input.nombre as string, tipo, configuracion: JSON.stringify(input.configuracion), prioridad: (input.prioridad as number) || 50, activa: input.activa !== undefined ? (input.activa as boolean) : true, usuarioId: userId } });
    return JSON.stringify({ success: true, mensaje: `Regla "${regla.nombre}" (${regla.tipo}) creada correctamente`, regla: { id: regla.id, nombre: regla.nombre, tipo: regla.tipo, activa: regla.activa, prioridad: regla.prioridad, configuracion: JSON.parse(regla.configuracion) } });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return JSON.stringify({ error: `Error al crear regla: ${msg}` });
  }
}

async function editarRegla(input: Record<string, unknown>, userId: string) {
  try {
    const regla = await prisma.reglaComercial.findFirst({ where: { id: input.reglaId as string, usuarioId: userId } });
    if (!regla) return JSON.stringify({ error: "Regla no encontrada" });
    const data: Record<string, unknown> = {};
    if (input.nombre !== undefined) data.nombre = input.nombre;
    if (input.configuracion !== undefined) data.configuracion = JSON.stringify(input.configuracion);
    if (input.prioridad !== undefined) data.prioridad = input.prioridad;
    if (input.activa !== undefined) data.activa = input.activa;
    const updated = await prisma.reglaComercial.update({ where: { id: input.reglaId as string }, data });
    return JSON.stringify({ success: true, mensaje: `Regla "${updated.nombre}" actualizada correctamente`, regla: { id: updated.id, nombre: updated.nombre, tipo: updated.tipo, activa: updated.activa, prioridad: updated.prioridad, configuracion: JSON.parse(updated.configuracion) } });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return JSON.stringify({ error: `Error al editar regla: ${msg}` });
  }
}

async function eliminarRegla(input: Record<string, unknown>, userId: string) {
  try {
    const regla = await prisma.reglaComercial.findFirst({ where: { id: input.reglaId as string, usuarioId: userId }, select: { nombre: true, tipo: true } });
    if (!regla) return JSON.stringify({ error: "Regla no encontrada" });
    await prisma.reglaComercial.delete({ where: { id: input.reglaId as string } });
    return JSON.stringify({ success: true, mensaje: `Regla "${regla.nombre}" (${regla.tipo}) eliminada correctamente` });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return JSON.stringify({ error: `Error al eliminar regla: ${msg}` });
  }
}

// ===== EMPRESA CONFIG HANDLERS =====

async function actualizarEmpresa(input: Record<string, unknown>) {
  try {
    const data: Record<string, unknown> = {};
    const campos = ["nombre", "cif", "email", "telefono", "direccion", "ciudad", "pais", "web", "plantillaPdf", "colorPrimario", "prefijoCotizacion", "diasVencimiento", "condicionesDefecto"];
    for (const campo of campos) { if (input[campo] !== undefined) data[campo] = input[campo]; }
    if (Object.keys(data).length === 0) return JSON.stringify({ error: "No se proporcionaron campos para actualizar" });
    const empresa = await prisma.empresa.upsert({ where: { id: "default" }, update: data, create: { id: "default", ...data } });
    return JSON.stringify({ success: true, mensaje: `Configuración de empresa actualizada: ${Object.keys(data).join(", ")}`, empresa: { nombre: empresa.nombre, cif: empresa.cif, email: empresa.email, telefono: empresa.telefono, direccion: empresa.direccion, ciudad: empresa.ciudad, pais: empresa.pais, web: empresa.web, plantillaPdf: empresa.plantillaPdf, colorPrimario: empresa.colorPrimario, prefijoCotizacion: empresa.prefijoCotizacion, diasVencimiento: empresa.diasVencimiento, condicionesDefecto: empresa.condicionesDefecto } });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return JSON.stringify({ error: `Error al actualizar empresa: ${msg}` });
  }
}

async function obtenerEmpresa() {
  const empresa = await prisma.empresa.findUnique({ where: { id: "default" } });
  if (!empresa) return JSON.stringify({ error: "Empresa no configurada" });
  return JSON.stringify({ nombre: empresa.nombre, cif: empresa.cif, email: empresa.email, telefono: empresa.telefono, direccion: empresa.direccion, ciudad: empresa.ciudad, pais: empresa.pais, web: empresa.web, logoUrl: empresa.logoUrl, plantillaPdf: empresa.plantillaPdf, colorPrimario: empresa.colorPrimario, prefijoCotizacion: empresa.prefijoCotizacion, diasVencimiento: empresa.diasVencimiento, condicionesDefecto: empresa.condicionesDefecto });
}

// ===== MEMORY HANDLERS =====

export async function obtenerMemorias(userId: string): Promise<string[]> {
  const memorias = await prisma.memoriaForge.findMany({ where: { usuarioId: userId }, orderBy: { createdAt: "asc" }, take: 50 });
  return memorias.map((m) => `[${m.id}] ${m.contenido}`);
}

async function guardarMemoria(input: Record<string, unknown>, userId: string) {
  try {
    const count = await prisma.memoriaForge.count({ where: { usuarioId: userId } });
    if (count >= 50) {
      const oldest = await prisma.memoriaForge.findFirst({ where: { usuarioId: userId }, orderBy: { createdAt: "asc" } });
      if (oldest) await prisma.memoriaForge.delete({ where: { id: oldest.id } });
    }
    const memoria = await prisma.memoriaForge.create({ data: { usuarioId: userId, contenido: input.contenido as string } });
    return JSON.stringify({ success: true, mensaje: `Memoria guardada: "${memoria.contenido}"`, memoriaId: memoria.id });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return JSON.stringify({ error: `Error al guardar memoria: ${msg}` });
  }
}

async function borrarMemoria(input: Record<string, unknown>, userId: string) {
  try {
    const memoria = await prisma.memoriaForge.findFirst({ where: { id: input.memoriaId as string, usuarioId: userId } });
    if (!memoria) return JSON.stringify({ error: "Memoria no encontrada" });
    await prisma.memoriaForge.delete({ where: { id: memoria.id } });
    return JSON.stringify({ success: true, mensaje: `Memoria borrada: "${memoria.contenido}"` });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error desconocido";
    return JSON.stringify({ error: `Error al borrar memoria: ${msg}` });
  }
}
