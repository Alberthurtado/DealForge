import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentacion — DealForge",
  description: "Guia completa de DealForge CPQ. Aprende a gestionar productos, clientes, cotizaciones, reglas comerciales, aprobaciones, plantillas PDF y el asistente Forge IA.",
};

/* ───────── helpers de estilo ───────── */
const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl font-bold text-gray-900 mt-16 mb-6 scroll-mt-24 border-b border-gray-200 pb-3">{children}</h2>
);
const H3 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h3 id={id} className="text-lg font-semibold text-gray-800 mt-8 mb-3 scroll-mt-24">{children}</h3>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-600 leading-relaxed mb-3">{children}</p>
);
const Tip = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[#3a9bb5]/5 border border-[#3a9bb5]/20 rounded-xl p-4 my-4 text-sm text-gray-700">
    <strong className="text-[#3a9bb5]">Consejo:</strong> {children}
  </div>
);
const Warning = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4 text-sm text-amber-900">
    <strong>Importante:</strong> {children}
  </div>
);
const Step = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <div className="flex gap-3 mb-3">
    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3a9bb5] text-white text-xs font-bold flex items-center justify-center mt-0.5">{n}</span>
    <span className="text-gray-600 leading-relaxed">{children}</span>
  </div>
);
const Field = ({ name, desc, required }: { name: string; desc: string; required?: boolean }) => (
  <li className="text-sm text-gray-600">
    <strong className="text-gray-800">{name}</strong>{required && <span className="text-red-500 ml-0.5">*</span>} — {desc}
  </li>
);

const FECHA_ACTUALIZACION = "9 de marzo de 2026";

/* ───────── Indice lateral ───────── */
const TOC = [
  { id: "primeros-pasos", label: "1. Primeros pasos" },
  { id: "panel", label: "2. Panel de control" },
  { id: "clientes", label: "3. Gestion de clientes" },
  { id: "productos", label: "4. Catalogo de productos" },
  { id: "cotizaciones-crear", label: "5. Crear cotizaciones" },
  { id: "cotizaciones-gestionar", label: "6. Gestionar cotizaciones" },
  { id: "pdf", label: "7. Plantillas PDF" },
  { id: "reglas", label: "8. Reglas comerciales" },
  { id: "aprobaciones", label: "9. Flujo de aprobaciones" },
  { id: "reportes", label: "10. Reportes y analitica" },
  { id: "integraciones", label: "11. Integraciones" },
  { id: "forge", label: "12. Forge IA" },
];

export default function DocumentacionPage() {
  return (
    <article className="prose-legal">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Documentacion</h1>
        <p className="text-gray-500 text-sm mb-1">Guia completa de la plataforma DealForge CPQ</p>
        <p className="text-sm text-gray-400 bg-gray-50 inline-block px-3 py-1 rounded-lg">
          Ultima actualizacion: {FECHA_ACTUALIZACION}
        </p>
      </div>

      {/* Indice */}
      <nav className="mb-14 p-6 bg-gray-50 rounded-xl border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Indice de contenidos</h2>
        <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm text-[#3a9bb5]">
          {TOC.map((t) => (
            <li key={t.id}><a href={`#${t.id}`} className="hover:underline">{t.label}</a></li>
          ))}
        </ol>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════
          1. PRIMEROS PASOS
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="primeros-pasos">1. Primeros pasos</H2>

      <H3 id="crear-cuenta">1.1. Crear una cuenta</H3>
      <P>Para empezar a usar DealForge, necesitas crear una cuenta gratuita:</P>
      <Step n={1}>Ve a la pagina de registro haciendo clic en <strong>&quot;Prueba Gratis&quot;</strong> o <strong>&quot;Registrate gratis&quot;</strong> desde la landing page.</Step>
      <Step n={2}>Rellena los campos del formulario:</Step>
      <ul className="list-disc pl-12 space-y-1 mb-4 text-sm text-gray-600">
        <Field name="Nombre" desc="Tu nombre completo." required />
        <Field name="Email" desc="Correo electronico valido. Sera tu identificador de acceso." required />
        <Field name="Contrasena" desc="Minimo 8 caracteres. Aparece un check verde cuando cumple el requisito." required />
        <Field name="Confirmar contrasena" desc="Debe coincidir exactamente con la contrasena." required />
      </ul>
      <Step n={3}>Haz clic en <strong>&quot;Crear cuenta&quot;</strong>. Seras redirigido automaticamente al panel de control.</Step>
      <P>Tu cuenta empieza con el <strong>plan Starter (gratuito)</strong>, que incluye hasta 50 cotizaciones/mes, 25 productos y el asistente Forge IA basico.</P>

      <H3 id="configurar-empresa">1.2. Configurar los datos de tu empresa</H3>
      <P>Lo primero que debes hacer tras registrarte es configurar tu empresa. Ve a <strong>Configuracion</strong> desde el menu lateral izquierdo.</P>
      <P>Estos datos se usaran en las cotizaciones PDF, emails y en toda la plataforma:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <Field name="Nombre de empresa" desc="Aparecera en todas las cotizaciones y PDFs." required />
        <Field name="CIF/NIF" desc="Tu numero de identificacion fiscal. Aparece en los documentos." />
        <Field name="Email" desc="Email de contacto de la empresa (puede diferir del email de tu cuenta personal)." />
        <Field name="Telefono" desc="Numero de contacto que aparecera en cotizaciones." />
        <Field name="Direccion, Ciudad, Pais" desc="Direccion fiscal completa." />
        <Field name="Sitio web" desc="URL de tu pagina web (se muestra en el pie de las cotizaciones)." />
      </ul>

      <H3 id="subir-logo">1.3. Subir el logotipo</H3>
      <P>En la seccion de <strong>Logotipo</strong> dentro de Configuracion:</P>
      <Step n={1}>Arrastra tu logotipo al area indicada o haz clic para seleccionar un archivo.</Step>
      <Step n={2}>Formatos admitidos: <strong>PNG, JPG, SVG, WebP</strong> (maximo 2 MB).</Step>
      <Step n={3}>Veras una vista previa inmediata. El logo aparecera en la cabecera de todas tus cotizaciones PDF.</Step>

      <H3 id="color-primario">1.4. Elegir color primario</H3>
      <P>Selecciona un color que represente tu marca. Este color se usara en:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li>La cabecera de las cotizaciones PDF (plantilla Moderna)</li>
        <li>Los emails de aprobacion</li>
        <li>Elementos de acento en la pagina de aprobacion publica</li>
      </ul>
      <P>Haz clic en el selector de color y elige tu tono. El codigo hexadecimal se muestra junto al selector (ej: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">#3a9bb5</code>).</P>

      <H3 id="numeracion">1.5. Configurar numeracion de cotizaciones</H3>
      <P>Define el prefijo para tus cotizaciones en el campo <strong>&quot;Prefijo de cotizacion&quot;</strong>:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li>Solo caracteres alfanumericos, maximo 10 caracteres.</li>
        <li>Formato resultante: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">PREFIJO-AÑO-0001</code></li>
        <li>Ejemplo: Si pones <strong>COT</strong>, la primera cotizacion sera <strong>COT-2026-0001</strong>.</li>
      </ul>

      <H3 id="vencimiento">1.6. Dias de vencimiento por defecto</H3>
      <P>Configura cuantos dias de validez tendran tus cotizaciones (entre 1 y 365 dias). Este valor se aplicara automaticamente al crear nuevas cotizaciones, pero puede modificarse individualmente en cada una.</P>

      <H3 id="condiciones-defecto">1.7. Condiciones por defecto</H3>
      <P>Escribe tus terminos y condiciones comerciales habituales en el campo de texto grande. Este texto se precargara en cada nueva cotizacion. Puedes editarlo individualmente en cada cotizacion.</P>
      <Warning>Una cotizacion no puede enviarse sin condiciones. Asegurate de configurar unas condiciones por defecto para ahorrar tiempo.</Warning>

      <H3 id="smtp">1.8. Configurar email (SMTP)</H3>
      <P>Para enviar cotizaciones y aprobaciones por email directamente desde DealForge, necesitas configurar un servidor SMTP.</P>

      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 my-4 space-y-4 text-sm">
        <div>
          <p className="font-semibold text-gray-800 mb-2">Gmail</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Servidor: <code className="bg-gray-100 px-1 rounded">smtp.gmail.com</code></li>
            <li>Puerto: <code className="bg-gray-100 px-1 rounded">587</code></li>
            <li>SSL/TLS: Activado</li>
            <li>Usuario: tu email de Gmail completo</li>
            <li>Contrasena: debes generar una <strong>Contrasena de aplicacion</strong> en tu cuenta de Google (Seguridad → Verificacion en dos pasos → Contrasenas de aplicacion). No uses tu contrasena normal de Gmail.</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-800 mb-2">Outlook / Microsoft 365</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Servidor: <code className="bg-gray-100 px-1 rounded">smtp.office365.com</code></li>
            <li>Puerto: <code className="bg-gray-100 px-1 rounded">587</code></li>
            <li>SSL/TLS: Activado</li>
            <li>Usuario: tu email de Outlook/365</li>
            <li>Contrasena: genera una contrasena de aplicacion desde portal.azure.com o desde la configuracion de seguridad de tu cuenta Microsoft.</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-800 mb-2">Yahoo Mail</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Servidor: <code className="bg-gray-100 px-1 rounded">smtp.mail.yahoo.com</code></li>
            <li>Puerto: <code className="bg-gray-100 px-1 rounded">587</code></li>
            <li>SSL/TLS: Activado</li>
          </ul>
        </div>
      </div>
      <P>Tras configurarlo, pulsa <strong>&quot;Enviar email de prueba&quot;</strong> para verificar que la conexion funciona. Recibiras un email de confirmacion en la direccion configurada.</P>
      <Tip>Las credenciales SMTP se almacenan cifradas en la base de datos y nunca se exponen al navegador.</Tip>

      {/* ═══════════════════════════════════════════════════════════════
          2. PANEL DE CONTROL
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="panel">2. Panel de control</H2>
      <P>El panel es la primera pantalla que ves al iniciar sesion. Muestra un resumen en tiempo real de tu actividad comercial.</P>

      <H3 id="panel-kpis">2.1. Indicadores clave (KPIs)</H3>
      <P>En la parte superior, seis tarjetas muestran las metricas principales:</P>
      <ul className="list-disc pl-6 space-y-2 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Pipeline total:</strong> Suma del valor de todas las cotizaciones en estado Enviada + Negociacion. Representa el negocio potencial activo.</li>
        <li><strong className="text-gray-800">Tasa de conversion:</strong> Porcentaje de cotizaciones Ganadas respecto al total de cerradas (Ganadas + Perdidas). Ejemplo: 8 ganadas de 12 cerradas = 67%.</li>
        <li><strong className="text-gray-800">Ticket medio:</strong> Valor promedio de las cotizaciones ganadas.</li>
        <li><strong className="text-gray-800">Ingresos totales:</strong> Suma del valor de todas las cotizaciones Ganadas.</li>
        <li><strong className="text-gray-800">Total clientes:</strong> Numero de clientes registrados en el sistema.</li>
        <li><strong className="text-gray-800">Cotizaciones activas:</strong> Numero de cotizaciones en estado Enviada o Negociacion.</li>
      </ul>

      <H3 id="panel-graficos">2.2. Graficos</H3>
      <P><strong>Pipeline por estado:</strong> Grafico de barras que muestra cuantas cotizaciones hay en cada fase (Borrador, Enviada, Negociacion, Ganada, Perdida) y su valor total.</P>
      <P><strong>Ingresos mensuales:</strong> Grafico de barras con los ingresos de los ultimos 6 meses, basado en cotizaciones Ganadas.</P>
      <P><strong>Funnel de conversion:</strong> Visualizacion del embudo comercial desde cotizaciones creadas hasta ganadas.</P>

      <H3 id="panel-acciones">2.3. Acciones rapidas y actividad</H3>
      <P>En la parte inferior encontraras:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Acciones rapidas:</strong> Botones para crear nueva cotizacion, nuevo cliente o nuevo producto sin navegar por el menu.</li>
        <li><strong className="text-gray-800">Actividad reciente:</strong> Timeline con las ultimas 8 acciones del sistema (cambios de estado, emails enviados, aprobaciones, etc.) con fecha, tipo, descripcion y cotizacion asociada.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          3. GESTION DE CLIENTES
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="clientes">3. Gestion de clientes</H2>

      <H3 id="clientes-listado">3.1. Listado de clientes</H3>
      <P>Accede desde el menu lateral <strong>Clientes</strong>. Veras una tabla con todos tus clientes mostrando: nombre, email, telefono, ciudad, sector, contacto principal, numero de cotizaciones y total de ingresos. Haz clic en cualquier fila para ver el detalle del cliente.</P>

      <H3 id="clientes-crear">3.2. Crear un nuevo cliente</H3>
      <P>Haz clic en <strong>&quot;Nuevo cliente&quot;</strong> en la esquina superior derecha. El formulario tiene dos secciones:</P>

      <p className="font-semibold text-gray-800 text-sm mt-4 mb-2">Informacion de la empresa:</p>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <Field name="Nombre" desc="Razon social o nombre comercial del cliente." required />
        <Field name="CIF/NIF" desc="Identificacion fiscal del cliente." />
        <Field name="Sector" desc="Sector de actividad (ej: Tecnologia, Retail, Salud)." />
        <Field name="Email" desc="Correo electronico general de la empresa." />
        <Field name="Telefono" desc="Numero de contacto." />
        <Field name="Direccion" desc="Direccion fiscal." />
        <Field name="Ciudad" desc="Ciudad." />
        <Field name="Pais" desc="Pais (por defecto: Espana)." />
        <Field name="Notas internas" desc="Anotaciones privadas que solo tu equipo vera. No aparecen en cotizaciones." />
      </ul>

      <p className="font-semibold text-gray-800 text-sm mt-4 mb-2">Contactos (uno o mas):</p>
      <P>Cada cliente puede tener multiples personas de contacto. Para cada contacto:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <Field name="Nombre" desc="Nombre completo del contacto." />
        <Field name="Cargo" desc="Posicion en la empresa (ej: Director Comercial)." />
        <Field name="Email" desc="Email del contacto." />
        <Field name="Telefono" desc="Telefono directo del contacto." />
        <Field name="Contacto principal" desc="Marca uno como contacto principal. Es el que aparecera por defecto en las cotizaciones." />
      </ul>
      <P>Usa los botones <strong>&quot;Añadir contacto&quot;</strong> y el icono de papelera para gestionar los contactos.</P>

      <H3 id="clientes-360">3.3. Vista 360 del cliente</H3>
      <P>Al hacer clic en un cliente ves su ficha completa con:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Metricas:</strong> Total cotizaciones, ganadas/perdidas, tasa de conversion, ingresos totales y pipeline activo.</li>
        <li><strong className="text-gray-800">Contactos:</strong> Lista de todos los contactos asociados con sus datos.</li>
        <li><strong className="text-gray-800">Cotizaciones:</strong> Historial completo de todas las cotizaciones para ese cliente, con estado, fecha e importe. Clic para acceder al detalle.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          4. CATALOGO DE PRODUCTOS
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="productos">4. Catalogo de productos</H2>

      <H3 id="productos-crear">4.1. Crear un producto</H3>
      <P>Ve a <strong>Productos → Nuevo producto</strong>. Rellena la informacion basica:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <Field name="Nombre del producto" desc="Nombre descriptivo que aparecera en las cotizaciones." required />
        <Field name="Descripcion" desc="Descripcion detallada del producto o servicio." />
        <Field name="SKU" desc="Codigo unico de referencia (ej: PROD-001, LIC-PRO-ANUAL)." required />
        <Field name="Categoria" desc="Selecciona una categoria existente del desplegable." />
        <Field name="Precio base" desc="Precio unitario por defecto. Se puede modificar individualmente en cada cotizacion." required />
        <Field name="Unidad" desc="Tipo de unidad de venta. Opciones: unidad, hora, mes, licencia/año, kg, m2." />
        <Field name="Activo" desc="Desmarca si quieres ocultar el producto del catalogo temporalmente sin eliminarlo." />
      </ul>

      <H3 id="productos-variantes">4.2. Variantes de producto</H3>
      <P>Las variantes permiten tener diferentes versiones de un mismo producto (ej: tallas, colores, niveles de servicio). Para añadir variantes:</P>
      <Step n={1}>En el formulario de producto, haz clic en <strong>&quot;Añadir variante&quot;</strong>.</Step>
      <Step n={2}>Rellena los datos de la variante:</Step>
      <ul className="list-disc pl-12 space-y-1 mb-4 text-sm text-gray-600">
        <Field name="Nombre de variante" desc="Ej: 'Basica', 'Premium', 'Talla XL'." required />
        <Field name="SKU" desc="Codigo unico para esta variante." required />
        <Field name="Precio override" desc="Si se deja vacio, usa el precio base del producto. Si se rellena, esta variante tendra su propio precio." />
        <Field name="Activo" desc="Permite desactivar variantes individualmente." />
      </ul>
      <Step n={3}>Opcionalmente, añade <strong>atributos</strong> a la variante (pares clave-valor):</Step>
      <ul className="list-disc pl-12 space-y-1 mb-4 text-sm text-gray-600">
        <li>Haz clic en <strong>&quot;Añadir atributo&quot;</strong> dentro de la variante.</li>
        <li>Ejemplo: Clave = &quot;Color&quot;, Valor = &quot;Rojo&quot;.</li>
        <li>Los atributos se muestran como etiquetas en el wizard de cotizaciones para facilitar la seleccion.</li>
      </ul>
      <Tip>Las variantes son ideales para productos con opciones (ej: licencia basica vs premium, camiseta S/M/L/XL, servicio por horas vs mensual).</Tip>

      <H3 id="productos-listado">4.3. Listado y busqueda</H3>
      <P>En la pagina principal de Productos veras una tabla con nombre, SKU, categoria, precio base, estado (activo/inactivo) y numero de variantes. Puedes:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Filtrar por categoria</strong> usando el desplegable superior.</li>
        <li><strong className="text-gray-800">Buscar</strong> por nombre o SKU en la barra de busqueda.</li>
        <li><strong className="text-gray-800">Editar</strong> haciendo clic en el icono de lapiz.</li>
        <li><strong className="text-gray-800">Eliminar</strong> haciendo clic en el icono de papelera (solo si no esta en uso en cotizaciones).</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          5. CREAR COTIZACIONES
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="cotizaciones-crear">5. Crear cotizaciones</H2>
      <P>El wizard de cotizaciones te guia en 4 pasos para crear una propuesta comercial profesional.</P>

      <H3 id="cot-paso0">5.1. Paso 0 — Seleccionar cliente</H3>
      <Step n={1}>Busca el cliente por nombre en el buscador.</Step>
      <Step n={2}>Haz clic en el cliente deseado de la lista.</Step>
      <Step n={3}>Opcionalmente, selecciona o escribe el nombre del contacto.</Step>
      <Step n={4}>Avanza al siguiente paso.</Step>
      <Warning>Si aun no has creado el cliente, abrelo en otra pestana desde Clientes → Nuevo cliente antes de empezar la cotizacion.</Warning>

      <H3 id="cot-paso1">5.2. Paso 1 — Añadir productos</H3>
      <P>La pantalla se divide en dos paneles:</P>
      <p className="font-semibold text-gray-800 text-sm mt-4 mb-2">Panel izquierdo — Catalogo:</p>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li>Busca productos por nombre o SKU.</li>
        <li>Cada producto muestra: nombre, SKU, precio, unidad y numero de variantes.</li>
        <li>Si un producto tiene variantes, haz clic en el icono de desplegar para ver las opciones. Cada variante muestra su nombre, SKU, precio y atributos como etiquetas de colores.</li>
        <li>Haz clic en el boton <strong>&quot;+&quot;</strong> para añadir el producto (o la variante seleccionada) a la cotizacion.</li>
        <li>Tambien puedes usar <strong>&quot;Añadir linea personalizada&quot;</strong> para productos que no estan en el catalogo.</li>
      </ul>
      <p className="font-semibold text-gray-800 text-sm mt-4 mb-2">Panel derecho — Lineas seleccionadas:</p>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Descripcion:</strong> Editable. Se precarga con el nombre del producto/variante.</li>
        <li><strong className="text-gray-800">Cantidad:</strong> Acepta decimales (ej: 2.5 horas).</li>
        <li><strong className="text-gray-800">Precio unitario:</strong> Se precarga con el precio del producto pero es editable para cada cotizacion.</li>
        <li><strong className="text-gray-800">Descuento %:</strong> Descuento individual por linea (0-100%).</li>
        <li><strong className="text-gray-800">Total linea:</strong> Se calcula automaticamente: Cantidad × Precio × (1 - Descuento/100).</li>
        <li>Icono de papelera para eliminar la linea.</li>
      </ul>

      <H3 id="cot-paso2">5.3. Paso 2 — Precios y condiciones</H3>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <Field name="Descuento global %" desc="Se aplica sobre el subtotal completo, ademas de los descuentos por linea." />
        <Field name="IVA/Impuesto %" desc="Por defecto 21% (IVA espanol). Editable para otros tipos impositivos." />
        <Field name="Moneda" desc="EUR (por defecto), USD o GBP." />
        <Field name="Fecha de vencimiento" desc="Se precarga con los dias configurados. Editable." />
        <Field name="Notas" desc="Notas internas o comentarios para el cliente." />
        <Field name="Condiciones" desc="Terminos y condiciones. Se precargan con los configurados por defecto." />
      </ul>
      <P>A la derecha veras el desglose de precios: Subtotal, Descuento, IVA y <strong>Total final</strong>.</P>

      <H3 id="cot-paso3">5.4. Paso 3 — Resumen y creacion</H3>
      <P>Revisa toda la informacion de la cotizacion:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li>Datos del cliente y contacto.</li>
        <li>Tabla completa de productos con cantidades, precios y descuentos.</li>
        <li>Totales con desglose.</li>
        <li><strong className="text-gray-800">Avisos de reglas:</strong> Si alguna regla comercial se viola (descuento excesivo, producto obligatorio faltante), aparecera un aviso amarillo o rojo.</li>
        <li><strong className="text-gray-800">Promociones:</strong> Si hay promociones activas aplicables, se mostraran como sugerencia.</li>
        <li><strong className="text-gray-800">Aprobaciones:</strong> Si la cotizacion requiere aprobacion, el boton mostrara &quot;Crear y solicitar aprobacion&quot;.</li>
      </ul>
      <P>Haz clic en <strong>&quot;Crear cotizacion&quot;</strong>. Se generara automaticamente con un numero unico y estado <strong>Borrador</strong>.</P>

      {/* ═══════════════════════════════════════════════════════════════
          6. GESTIONAR COTIZACIONES
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="cotizaciones-gestionar">6. Gestionar cotizaciones</H2>

      <H3 id="cot-estados">6.1. Flujo de estados</H3>
      <P>Cada cotizacion pasa por un flujo de estados claro:</P>
      <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 my-4 text-sm text-gray-600">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-gray-200 text-gray-700 font-medium">Borrador</span>
          <span className="text-gray-400">→</span>
          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">Enviada</span>
          <span className="text-gray-400">→</span>
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">Negociacion</span>
          <span className="text-gray-400">→</span>
          <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-medium">Ganada</span>
          <span className="text-gray-400">/</span>
          <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-medium">Perdida</span>
        </div>
        <p className="mt-3 text-xs text-gray-500">Ademas, cualquier cotizacion puede <strong>Archivarse</strong> en cualquier momento.</p>
      </div>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Borrador:</strong> Recien creada. Puedes editarla libremente. Acciones: Enviar, Previsualizar.</li>
        <li><strong className="text-gray-800">Enviada:</strong> Se ha enviado al cliente. Acciones: Marcar como Negociacion, Ganada o Perdida.</li>
        <li><strong className="text-gray-800">Negociacion:</strong> El cliente esta considerando la oferta. Puedes editar condiciones, reenviar o duplicar. Acciones: Ganada, Perdida.</li>
        <li><strong className="text-gray-800">Ganada:</strong> Estado final positivo. Cuenta para ingresos y KPIs.</li>
        <li><strong className="text-gray-800">Perdida:</strong> Estado final negativo.</li>
        <li><strong className="text-gray-800">Archivada:</strong> Oculta de la vista principal pero no eliminada.</li>
      </ul>

      <H3 id="cot-email">6.2. Enviar cotizacion por email</H3>
      <Step n={1}>En la vista detalle de la cotizacion, haz clic en el icono de <strong>correo</strong>.</Step>
      <Step n={2}>Se abre un dialogo con los campos:</Step>
      <ul className="list-disc pl-12 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Para:</strong> Email del destinatario.</li>
        <li><strong className="text-gray-800">Asunto:</strong> Se precarga con el numero de cotizacion.</li>
        <li><strong className="text-gray-800">Mensaje:</strong> Cuerpo del email personalizable.</li>
      </ul>
      <Step n={3}>Haz clic en <strong>&quot;Enviar&quot;</strong>. El PDF de la cotizacion se adjunta automaticamente al email.</Step>
      <Warning>Necesitas tener SMTP configurado para enviar emails. Ve a Configuracion si aun no lo has hecho.</Warning>

      <H3 id="cot-duplicar">6.3. Duplicar una cotizacion</H3>
      <P>Haz clic en el icono de <strong>duplicar</strong> (dos hojas) para crear una copia exacta. Util para cotizaciones similares o versiones revisadas. La copia se crea como Borrador con un nuevo numero.</P>

      <H3 id="cot-detalle">6.4. Vista detalle</H3>
      <P>La pagina de detalle muestra toda la informacion de la cotizacion:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Cabecera:</strong> Numero, estado, total, fecha emision, fecha vencimiento, botones de accion.</li>
        <li><strong className="text-gray-800">Alertas:</strong> Si la cotizacion ha vencido, si tiene aprobaciones pendientes, si faltan condiciones, o si viola alguna regla comercial.</li>
        <li><strong className="text-gray-800">Info cliente:</strong> Nombre y contacto.</li>
        <li><strong className="text-gray-800">Tabla de items:</strong> Descripcion, cantidad, precio unitario, descuento %, total por linea. Si es un producto del catalogo muestra el SKU; si tiene variante muestra los atributos.</li>
        <li><strong className="text-gray-800">Totales:</strong> Subtotal, descuento global (si aplica), IVA con porcentaje, total final.</li>
        <li><strong className="text-gray-800">Notas y condiciones:</strong> Con opcion de editar las condiciones en estados Borrador o Negociacion.</li>
        <li><strong className="text-gray-800">Timeline:</strong> Historial de actividad (creacion, envio, cambios de estado, emails).</li>
        <li><strong className="text-gray-800">Panel de aprobaciones:</strong> Si la cotizacion requiere aprobacion, se muestran las pendientes/resueltas.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          7. PLANTILLAS PDF
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="pdf">7. Plantillas PDF</H2>
      <P>DealForge incluye 3 plantillas profesionales para tus cotizaciones en PDF:</P>

      <div className="grid gap-4 my-4">
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <p className="font-semibold text-gray-800 mb-1">Moderna</p>
          <p className="text-sm text-gray-600">Cabecera con gradiente de tu color primario. Tabla con filas alternadas de color. Pie de pagina con fondo tintado. Ideal para empresas tecnologicas y startups.</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <p className="font-semibold text-gray-800 mb-1">Clasica</p>
          <p className="text-sm text-gray-600">Cabecera con linea negra gruesa. Estilo profesional y formal. Tabla con cabecera gris. Ideal para consultoras, despachos y empresas tradicionales.</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <p className="font-semibold text-gray-800 mb-1">Minimalista</p>
          <p className="text-sm text-gray-600">Diseño limpio con mucho espacio en blanco. Acentos grises suaves. Ideal para agencias creativas y empresas de diseño.</p>
        </div>
      </div>

      <P><strong>Para cambiar la plantilla:</strong> Ve a <strong>Configuracion → Plantilla PDF</strong> y selecciona la que prefieras. Todas las nuevas cotizaciones usaran esa plantilla.</P>
      <P><strong>Para previsualizar una cotizacion:</strong> Desde la vista detalle, haz clic en el icono del <strong>ojo</strong>. Se abrira la previsualizacion en una nueva pagina.</P>
      <P><strong>Para guardar como PDF o imprimir:</strong> En la previsualizacion, haz clic en el boton <strong>&quot;Imprimir / PDF&quot;</strong>. Se abrira el dialogo de impresion del navegador donde puedes seleccionar &quot;Guardar como PDF&quot;.</P>

      <P>Todas las plantillas muestran:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li>Logo y datos de tu empresa (nombre, CIF, web, email, telefono, direccion)</li>
        <li>Datos del cliente (nombre, CIF, direccion, contacto)</li>
        <li>Numero de cotizacion y fecha de emision</li>
        <li>Tabla de items con descripcion, cantidad, precio, descuento y total</li>
        <li>Desglose: subtotal, descuento global, IVA, total</li>
        <li>Condiciones y notas</li>
        <li>Periodo de validez</li>
        <li>Numero de version</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          8. REGLAS COMERCIALES
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="reglas">8. Reglas comerciales</H2>
      <P>Las reglas comerciales automatizan tu politica de precios y aprobaciones. Accede desde <strong>Reglas</strong> en el menu lateral.</P>

      <H3 id="reglas-descuento">8.1. Limites de descuento</H3>
      <P>Establece descuentos maximos permitidos:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Descuento maximo por linea:</strong> Porcentaje maximo que se puede aplicar a una linea individual.</li>
        <li><strong className="text-gray-800">Descuento maximo global:</strong> Porcentaje maximo del descuento que se aplica al subtotal.</li>
        <li><strong className="text-gray-800">Ambito:</strong> Aplica a todos los productos, a productos especificos o a categorias concretas.</li>
      </ul>
      <P>Cuando un usuario intenta superar el limite, la cotizacion muestra un aviso y puede bloquearse.</P>

      <H3 id="reglas-obligatorios">8.2. Productos obligatorios</H3>
      <P>Obliga a incluir ciertos productos cuando se cotiza otro:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Producto disparador:</strong> Cuando se añade este producto (o categoria) a la cotizacion...</li>
        <li><strong className="text-gray-800">Producto requerido:</strong> ...se exige que tambien se incluya este otro producto.</li>
        <li><strong className="text-gray-800">Mensaje personalizado:</strong> Texto que se muestra al usuario (ej: &quot;El servicio de instalacion es obligatorio con este equipo&quot;).</li>
      </ul>

      <H3 id="reglas-aprobacion">8.3. Reglas de aprobacion</H3>
      <P>Define cuando una cotizacion requiere aprobacion antes de poder enviarse:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Condicion:</strong> Descuento por linea mayor a X%, descuento global mayor a X%, o total mayor a X EUR.</li>
        <li><strong className="text-gray-800">Operador:</strong> Mayor que (&gt;) o Mayor o igual que (≥).</li>
        <li><strong className="text-gray-800">Aprobador:</strong> Nombre y email de la persona que debe aprobar. Recibira un email con enlace seguro.</li>
      </ul>
      <P>Puedes crear multiples condiciones en la misma regla. Todas deben cumplirse para que se dispare.</P>

      <H3 id="reglas-promocion">8.4. Promociones</H3>
      <P>Crea promociones temporales para tus productos:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Rango de fechas:</strong> Fecha de inicio y fin de la promocion.</li>
        <li><strong className="text-gray-800">Productos:</strong> Selecciona a que productos aplica.</li>
        <li><strong className="text-gray-800">Tipo:</strong> Descuento porcentual o precio fijo.</li>
        <li><strong className="text-gray-800">Valor:</strong> Porcentaje de descuento o precio promocional.</li>
        <li><strong className="text-gray-800">Mensaje:</strong> Texto que se muestra al crear cotizaciones (ej: &quot;Promo de verano: 15% en licencias&quot;).</li>
      </ul>
      <P>Las promociones aparecen como sugerencia en el paso 3 del wizard de cotizaciones cuando hay productos elegibles.</P>

      <H3 id="reglas-gestion">8.5. Gestionar reglas</H3>
      <P>En la pagina de Reglas, cada tipo tiene su seccion colapsable. Puedes:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Activar/desactivar:</strong> Usa el interruptor (toggle) junto a cada regla para activarla o desactivarla sin eliminarla.</li>
        <li><strong className="text-gray-800">Editar:</strong> Haz clic en el icono de lapiz para abrir el formulario de edicion.</li>
        <li><strong className="text-gray-800">Eliminar:</strong> Haz clic en el icono de papelera para borrar la regla permanentemente.</li>
        <li><strong className="text-gray-800">Crear:</strong> Haz clic en el boton &quot;+&quot; dentro de cada seccion para añadir una nueva regla de ese tipo.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          9. FLUJO DE APROBACIONES
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="aprobaciones">9. Flujo de aprobaciones</H2>

      <H3 id="aprob-como">9.1. Como funciona</H3>
      <Step n={1}>Creas una cotizacion que cumple las condiciones de una regla de aprobacion (ej: descuento &gt; 20%).</Step>
      <Step n={2}>Al crear la cotizacion, el sistema detecta automaticamente que necesita aprobacion y envia un email al aprobador designado.</Step>
      <Step n={3}>El aprobador recibe un email con un enlace seguro (no necesita cuenta en DealForge).</Step>
      <Step n={4}>El aprobador hace clic en el enlace y ve la pagina de aprobacion con todos los detalles de la cotizacion: cliente, items, totales y el motivo de la aprobacion.</Step>
      <Step n={5}>El aprobador puede <strong>Aprobar</strong> o <strong>Rechazar</strong>, opcionalmente con un comentario.</Step>
      <Step n={6}>Mientras la aprobacion este pendiente, <strong>no se puede enviar la cotizacion al cliente</strong>. Aparece una alerta en la vista detalle.</Step>

      <H3 id="aprob-reenviar">9.2. Reenviar email de aprobacion</H3>
      <P>Si el aprobador no ha recibido o no encuentra el email, puedes reenviar la solicitud desde la vista detalle de la cotizacion, en el panel lateral de Aprobaciones, haciendo clic en <strong>&quot;Reenviar&quot;</strong>.</P>

      <H3 id="aprob-estados">9.3. Estados de aprobacion</H3>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">Pendiente</span> — Esperando respuesta del aprobador. La cotizacion no puede enviarse.</li>
        <li><span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">Aprobada</span> — El aprobador ha dado el visto bueno. La cotizacion puede enviarse.</li>
        <li><span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">Rechazada</span> — El aprobador ha rechazado. Se muestra el comentario. Puedes modificar la cotizacion y volver a solicitar aprobacion.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          10. REPORTES Y ANALITICA
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="reportes">10. Reportes y analitica</H2>
      <P>Accede desde <strong>Reportes</strong> en el menu lateral. Los datos se calculan en tiempo real a partir de tus cotizaciones.</P>
      <ul className="list-disc pl-6 space-y-2 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Resumen general:</strong> Total de cotizaciones, ganadas y perdidas.</li>
        <li><strong className="text-gray-800">Grafico mensual:</strong> Cotizaciones ganadas y perdidas por mes con su valor asociado. Te permite ver tendencias y estacionalidad.</li>
        <li><strong className="text-gray-800">Top 10 clientes:</strong> Ranking de tus mejores clientes por ingresos totales, con numero de cotizaciones por cliente.</li>
        <li><strong className="text-gray-800">Top 10 productos:</strong> Productos mas incluidos en cotizaciones, con frecuencia de aparicion y valor total cotizado.</li>
      </ul>
      <Tip>Usa los reportes para identificar tus mejores clientes, detectar productos estrella y evaluar el rendimiento de tu equipo comercial.</Tip>

      {/* ═══════════════════════════════════════════════════════════════
          11. INTEGRACIONES
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="integraciones">11. Integraciones</H2>
      <P>Accede desde <strong>Integraciones</strong> en el menu lateral. La pagina tiene tres pestanas:</P>

      <H3 id="int-exportar">11.1. Exportar datos</H3>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Cotizaciones a CSV:</strong> Exporta un archivo CSV con todas tus cotizaciones. Puedes filtrar por estado y rango de fechas.</li>
        <li><strong className="text-gray-800">Productos a Excel:</strong> Exporta tu catalogo de productos completo incluyendo variantes.</li>
      </ul>

      <H3 id="int-importar">11.2. Importar datos</H3>
      <P>Sube archivos CSV para importar datos en masa:</P>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Importar productos:</strong> Sube un CSV con columnas para nombre, SKU, precio, categoria, etc. El sistema valida los datos antes de importar y muestra errores si los hay.</li>
        <li><strong className="text-gray-800">Importar clientes:</strong> Sube un CSV con datos de clientes. Se mapean automaticamente las columnas.</li>
      </ul>
      <Warning>Antes de importar, verifica que el formato del CSV sea correcto. La primera fila debe contener los nombres de las columnas.</Warning>

      <H3 id="int-conectores">11.3. Conectores</H3>
      <P>Conecta DealForge con otras herramientas a traves de webhooks (ej: Zapier). Esta funcionalidad esta disponible en los planes Pro y Business.</P>

      {/* ═══════════════════════════════════════════════════════════════
          12. FORGE IA — ASISTENTE INTELIGENTE
      ═══════════════════════════════════════════════════════════════ */}
      <H2 id="forge">12. Forge IA — Asistente inteligente</H2>

      <H3 id="forge-que">12.1. Que es Forge</H3>
      <P>Forge es el asistente de inteligencia artificial integrado en DealForge. Aparece como un panel lateral en todas las paginas del dashboard. Forge entiende el contexto de la pagina en la que te encuentras y puede ayudarte con tareas relacionadas.</P>

      <H3 id="forge-usar">12.2. Como usarlo</H3>
      <Step n={1}>Haz clic en el icono de chat en la esquina inferior derecha (o en el panel lateral si ya esta abierto).</Step>
      <Step n={2}>Escribe tu pregunta o instruccion en lenguaje natural.</Step>
      <Step n={3}>Forge respondera con informacion contextual, sugerencias o acciones.</Step>
      <P>Forge entiende el contexto de la pagina actual. Si estas en la pagina de un cliente, sabe de que cliente hablas. Si estas en una cotizacion, conoce los detalles.</P>

      <H3 id="forge-ejemplos">12.3. Ejemplos de lo que puedes pedirle</H3>
      <ul className="list-disc pl-6 space-y-2 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Navegacion:</strong> &quot;Llevame a crear una nueva cotizacion&quot;, &quot;¿Donde configuro el SMTP?&quot;</li>
        <li><strong className="text-gray-800">Cotizaciones:</strong> &quot;Hazme una cotizacion para Empresa ABC con 10 licencias Premium&quot;</li>
        <li><strong className="text-gray-800">Analisis:</strong> &quot;¿Como va mi pipeline este mes?&quot;, &quot;¿Cual es mi tasa de conversion?&quot;</li>
        <li><strong className="text-gray-800">Catalogo:</strong> &quot;¿Cuantos productos tengo activos?&quot;, &quot;Muestrame los productos de la categoria Servicios&quot;</li>
        <li><strong className="text-gray-800">Clientes:</strong> &quot;¿Cuantas cotizaciones tiene el cliente X?&quot;, &quot;Resumeme la actividad de este cliente&quot;</li>
        <li><strong className="text-gray-800">Ayuda general:</strong> &quot;¿Como configuro una regla de aprobacion?&quot;, &quot;¿Como envio una cotizacion por email?&quot;</li>
      </ul>
      <P>Forge tambien ofrece <strong>sugerencias contextuales</strong> debajo de cada respuesta — botones rapidos con acciones relevantes segun la pagina actual.</P>

      <H3 id="forge-planes">12.4. Modelos por plan</H3>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li><strong className="text-gray-800">Plan Starter (gratis):</strong> Forge usa Claude Haiku — rapido y eficiente para consultas basicas.</li>
        <li><strong className="text-gray-800">Plan Pro / Business:</strong> Forge usa Claude Sonnet — mas potente, con respuestas mas detalladas y mejor comprension del contexto.</li>
      </ul>

      <H3 id="forge-limitaciones">12.5. Limitaciones importantes</H3>
      <Warning>Las respuestas de Forge son orientativas y no constituyen asesoramiento profesional de ningun tipo (legal, fiscal, financiero o comercial). Verifica siempre la informacion antes de tomar decisiones basadas en ella.</Warning>
      <ul className="list-disc pl-6 space-y-1 mb-4 text-sm text-gray-600">
        <li>Forge puede cometer errores o dar informacion imprecisa.</li>
        <li>Las conversaciones no se almacenan entre sesiones.</li>
        <li>El numero de consultas puede estar limitado segun tu plan.</li>
        <li>Forge no tiene acceso a internet ni a informacion externa — solo conoce tus datos dentro de DealForge.</li>
      </ul>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <div className="mt-16 pt-8 border-t border-gray-200 text-center">
        <p className="text-gray-500 text-sm mb-2">¿No encuentras lo que buscas?</p>
        <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] font-semibold hover:underline">Escribenos a info@dealforge.es</a>
        <div className="mt-6 flex justify-center gap-4 text-sm text-gray-400">
          <Link href="/changelog" className="hover:text-gray-600 transition-colors">Changelog</Link>
          <span>|</span>
          <Link href="/privacidad" className="hover:text-gray-600 transition-colors">Privacidad</Link>
          <span>|</span>
          <Link href="/terminos" className="hover:text-gray-600 transition-colors">Terminos</Link>
        </div>
      </div>
    </article>
  );
}
