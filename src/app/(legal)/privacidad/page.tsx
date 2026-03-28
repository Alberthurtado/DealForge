import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad — DealForge",
  description: "Política de privacidad de DealForge. Información sobre cómo recopilamos, usamos y protegemos tus datos personales conforme al RGPD y la LOPD-GDD.",
  alternates: { canonical: "https://dealforge.es/privacidad" },
};

const FECHA_ACTUALIZACION = "9 de marzo de 2026";

export default function PrivacidadPage() {
  return (
    <article className="prose-legal">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Política de Privacidad</h1>
        <p className="text-sm text-gray-500 bg-gray-50 inline-block px-3 py-1 rounded-lg">
          Última actualización: {FECHA_ACTUALIZACION}
        </p>
      </div>

      {/* Indice */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-xl border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Índice</h2>
        <ol className="space-y-1.5 text-sm text-[#3a9bb5]">
          <li><a href="#responsable" className="hover:underline">1. Responsable del tratamiento</a></li>
          <li><a href="#datos" className="hover:underline">2. Datos que recopilamos</a></li>
          <li><a href="#finalidades" className="hover:underline">3. Finalidades del tratamiento</a></li>
          <li><a href="#base-juridica" className="hover:underline">4. Base jurídica</a></li>
          <li><a href="#destinatarios" className="hover:underline">5. Destinatarios y encargados del tratamiento</a></li>
          <li><a href="#transferencias" className="hover:underline">6. Transferencias internacionales</a></li>
          <li><a href="#conservacion" className="hover:underline">7. Plazos de conservación</a></li>
          <li><a href="#derechos" className="hover:underline">8. Derechos del interesado</a></li>
          <li><a href="#cookies" className="hover:underline">9. Cookies</a></li>
          <li><a href="#menores" className="hover:underline">10. Menores de edad</a></li>
          <li><a href="#seguridad" className="hover:underline">11. Medidas de seguridad</a></li>
          <li><a href="#modificaciones" className="hover:underline">12. Modificaciones</a></li>
          <li><a href="#autoridad" className="hover:underline">13. Autoridad de control</a></li>
        </ol>
      </nav>

      {/* Contenido */}
      <div className="space-y-10 text-gray-600 leading-relaxed">

        <section id="responsable">
          <h2 className="text-xl font-bold text-gray-900 mb-4">1. Responsable del tratamiento</h2>
          <div className="bg-gray-50 rounded-xl p-5 text-sm space-y-1 border border-gray-100">
            <p><strong className="text-gray-900">Responsable:</strong> Albert Hurtado Sanz</p>
            <p><strong className="text-gray-900">NIF:</strong> 38844142V</p>
            <p><strong className="text-gray-900">Domicilio:</strong> Carrer Granollers 45, 08173 Sant Cugat del Vallès, Barcelona</p>
            <p><strong className="text-gray-900">Correo electrónico:</strong> <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a></p>
            <p><strong className="text-gray-900">Sitio web:</strong> <a href="https://dealforge.es" className="text-[#3a9bb5] hover:underline">dealforge.es</a></p>
            <p><strong className="text-gray-900">Delegado de Protección de Datos (DPD):</strong> <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a></p>
          </div>
        </section>

        <section id="datos">
          <h2 className="text-xl font-bold text-gray-900 mb-4">2. Datos que recopilamos</h2>
          <p className="mb-4">Recopilamos únicamente los datos necesarios para prestar nuestro servicio. Los datos se obtienen directamente del usuario al registrarse y utilizar la plataforma:</p>

          <h3 className="text-base font-semibold text-gray-800 mb-2">2.1. Datos de registro y cuenta</h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Nombre completo</li>
            <li>Dirección de correo electrónico</li>
            <li>Contraseña (almacenada con hash bcrypt, nunca en texto plano)</li>
          </ul>

          <h3 className="text-base font-semibold text-gray-800 mb-2">2.2. Datos de la empresa</h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Nombre de la empresa, CIF/NIF</li>
            <li>Dirección fiscal, ciudad, país</li>
            <li>Teléfono, email de contacto, sitio web</li>
            <li>Logotipo (si se sube voluntariamente)</li>
          </ul>

          <h3 className="text-base font-semibold text-gray-800 mb-2">2.3. Datos comerciales</h3>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Información de clientes y contactos que el usuario introduce en la plataforma</li>
            <li>Productos, precios y cotizaciones generadas</li>
            <li>Historial de actividad dentro de la plataforma</li>
          </ul>

          <h3 className="text-base font-semibold text-gray-800 mb-2">2.4. Datos de pago</h3>
          <p>Los datos de pago (tarjeta de crédito, datos bancarios) son gestionados directamente por <strong>Stripe, Inc.</strong> conforme al estándar PCI DSS Nivel 1. DealForge no almacena, procesa ni tiene acceso a los datos completos de tarjeta.</p>

          <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">2.5. Datos técnicos</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Dirección IP (en logs del servidor, no vinculada al perfil del usuario)</li>
            <li>Tipo de navegador y sistema operativo (cabeceras HTTP estándar)</li>
          </ul>
        </section>

        <section id="finalidades">
          <h2 className="text-xl font-bold text-gray-900 mb-4">3. Finalidades del tratamiento</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-800">Prestación del servicio:</strong> Permitir el acceso, configuración de productos, generación de cotizaciones y uso del asistente IA (Forge).</li>
            <li><strong className="text-gray-800">Gestión de la cuenta:</strong> Autenticación, recuperación de contraseña, gestión del perfil.</li>
            <li><strong className="text-gray-800">Facturación y pagos:</strong> Procesamiento de suscripciones, emisión de facturas a través de Stripe.</li>
            <li><strong className="text-gray-800">Comunicaciones del servicio:</strong> Notificaciones transaccionales (confirmación de cuenta, cambio de plan, aprobación de cotizaciones, alertas de seguridad).</li>
            <li><strong className="text-gray-800">Mejora del producto:</strong> Análisis agregado y anonimizado del uso de la plataforma para mejorar funcionalidades.</li>
            <li><strong className="text-gray-800">Cumplimiento legal:</strong> Conservación de datos conforme a obligaciones fiscales y legales aplicables.</li>
          </ul>
        </section>

        <section id="base-juridica">
          <h2 className="text-xl font-bold text-gray-900 mb-4">4. Base jurídica del tratamiento</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Tratamiento</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Base jurídica (Art. 6 RGPD)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-3 border border-gray-200">Prestación del servicio CPQ</td><td className="p-3 border border-gray-200">Ejecución contractual (Art. 6.1.b)</td></tr>
                <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Gestión de pagos y facturación</td><td className="p-3 border border-gray-200">Ejecución contractual (Art. 6.1.b)</td></tr>
                <tr><td className="p-3 border border-gray-200">Envío de notificaciones del servicio</td><td className="p-3 border border-gray-200">Ejecución contractual (Art. 6.1.b)</td></tr>
                <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Conservación de datos fiscales</td><td className="p-3 border border-gray-200">Obligación legal (Art. 6.1.c)</td></tr>
                <tr><td className="p-3 border border-gray-200">Mejora del producto (analytics anonimizados)</td><td className="p-3 border border-gray-200">Interés legítimo (Art. 6.1.f)</td></tr>
                <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Comunicaciones comerciales</td><td className="p-3 border border-gray-200">Consentimiento (Art. 6.1.a)</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="destinatarios">
          <h2 className="text-xl font-bold text-gray-900 mb-4">5. Destinatarios y encargados del tratamiento</h2>
          <p className="mb-4">No vendemos, alquilamos ni compartimos tus datos personales con terceros con fines comerciales. Los datos se comparten únicamente con los siguientes encargados del tratamiento, necesarios para la prestación del servicio:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Proveedor</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Finalidad</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Ubicación</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Garantías</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-3 border border-gray-200 font-medium text-gray-800">Supabase (AWS)</td><td className="p-3 border border-gray-200">Base de datos PostgreSQL</td><td className="p-3 border border-gray-200">UE (eu-west-1, Irlanda)</td><td className="p-3 border border-gray-200">Datos en la UE, cifrado en reposo</td></tr>
                <tr className="bg-gray-50"><td className="p-3 border border-gray-200 font-medium text-gray-800">Vercel, Inc.</td><td className="p-3 border border-gray-200">Alojamiento y despliegue de la aplicación</td><td className="p-3 border border-gray-200">EE.UU. / UE (Edge)</td><td className="p-3 border border-gray-200">EU-US Data Privacy Framework, SCCs</td></tr>
                <tr><td className="p-3 border border-gray-200 font-medium text-gray-800">Stripe, Inc.</td><td className="p-3 border border-gray-200">Procesamiento de pagos</td><td className="p-3 border border-gray-200">EE.UU. / UE</td><td className="p-3 border border-gray-200">PCI DSS Nivel 1, EU-US DPF, SCCs</td></tr>
                <tr className="bg-gray-50"><td className="p-3 border border-gray-200 font-medium text-gray-800">Anthropic, PBC</td><td className="p-3 border border-gray-200">Asistente IA (Forge) — procesamiento de consultas</td><td className="p-3 border border-gray-200">EE.UU.</td><td className="p-3 border border-gray-200">SCCs, datos no usados para entrenamiento</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm">Todos los encargados del tratamiento han suscrito contratos que garantizan el cumplimiento del RGPD conforme al artículo 28.</p>
        </section>

        <section id="transferencias">
          <h2 className="text-xl font-bold text-gray-900 mb-4">6. Transferencias internacionales de datos</h2>
          <p className="mb-3">Algunos de nuestros proveedores tienen sede en Estados Unidos. Estas transferencias se realizan con las siguientes garantías adecuadas conforme al artículo 46 del RGPD:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-800">EU-US Data Privacy Framework (DPF):</strong> Stripe y Vercel están adheridos al Marco de Privacidad de Datos UE-EE.UU., reconocido como adecuado por la Comisión Europea (Decisión de Adecuación de 10 de julio de 2023).</li>
            <li><strong className="text-gray-800">Cláusulas Contractuales Tipo (SCCs):</strong> Todos los proveedores estadounidenses han suscrito las Cláusulas Contractuales Tipo aprobadas por la Comisión Europea (Decisión 2021/914).</li>
            <li><strong className="text-gray-800">Medidas suplementarias:</strong> Cifrado en tránsito (TLS 1.2+) y en reposo para todos los datos transferidos.</li>
          </ul>
        </section>

        <section id="conservacion">
          <h2 className="text-xl font-bold text-gray-900 mb-4">7. Plazos de conservación</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-800">Datos de cuenta:</strong> Mientras se mantenga la relación contractual. Tras la baja, se conservan bloqueados durante los plazos legales aplicables.</li>
            <li><strong className="text-gray-800">Datos fiscales y de facturación:</strong> 5 años conforme al artículo 70 de la Ley General Tributaria (Ley 58/2003).</li>
            <li><strong className="text-gray-800">Datos comerciales (cotizaciones, clientes):</strong> 6 años conforme al artículo 30 del Código de Comercio.</li>
            <li><strong className="text-gray-800">Logs técnicos:</strong> Máximo 12 meses conforme a la Ley 25/2007 de conservación de datos.</li>
            <li><strong className="text-gray-800">Consentimientos:</strong> Mientras dure el tratamiento y durante los plazos de prescripción de posibles acciones legales (3 años, artículo 72 LOPD-GDD).</li>
          </ul>
          <p className="mt-3">Transcurridos los plazos indicados, los datos se eliminan de forma segura e irreversible.</p>
        </section>

        <section id="derechos">
          <h2 className="text-xl font-bold text-gray-900 mb-4">8. Derechos del interesado (ARSULIPO)</h2>
          <p className="mb-4">De conformidad con el RGPD y la LOPD-GDD, puedes ejercer los siguientes derechos en cualquier momento:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong className="text-gray-800">Acceso (Art. 15 RGPD):</strong> Obtener confirmación de si tratamos tus datos y acceder a una copia.</li>
            <li><strong className="text-gray-800">Rectificación (Art. 16 RGPD):</strong> Solicitar la corrección de datos inexactos o incompletos.</li>
            <li><strong className="text-gray-800">Supresión (Art. 17 RGPD):</strong> Solicitar la eliminación de tus datos cuando ya no sean necesarios, retires el consentimiento o te opongas al tratamiento.</li>
            <li><strong className="text-gray-800">Limitación (Art. 18 RGPD):</strong> Solicitar la limitación del tratamiento en determinadas circunstancias.</li>
            <li><strong className="text-gray-800">Portabilidad (Art. 20 RGPD):</strong> Recibir tus datos en formato estructurado, de uso común y lectura mecánica (JSON/CSV).</li>
            <li><strong className="text-gray-800">Oposición (Art. 21 RGPD):</strong> Oponerte al tratamiento basado en interés legítimo o para fines de marketing directo.</li>
          </ul>
          <div className="bg-[#3a9bb5]/5 border border-[#3a9bb5]/20 rounded-xl p-5">
            <p className="text-sm"><strong className="text-gray-900">Cómo ejercer tus derechos:</strong> Envía un correo a <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline font-medium">info@dealforge.es</a> indicando tu nombre, email asociado a la cuenta y el derecho que deseas ejercer. Responderemos en un plazo máximo de 30 días. La solicitud es gratuita, salvo peticiones manifiestamente infundadas o excesivas.</p>
          </div>
        </section>

        <section id="cookies">
          <h2 className="text-xl font-bold text-gray-900 mb-4">9. Cookies</h2>
          <p className="mb-3">DealForge utiliza exclusivamente <strong>cookies técnicas y esenciales</strong> necesarias para el funcionamiento de la plataforma:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong className="text-gray-800">Cookie de sesión (JWT):</strong> Autenticación del usuario. Se almacena como cookie HttpOnly, Secure, SameSite=Lax. Expira al cerrar sesión o a los 7 días.</li>
          </ul>
          <p><strong>No utilizamos cookies de terceros, cookies de seguimiento, cookies analíticas ni cookies publicitarias.</strong> Al no utilizar cookies no esenciales, no es necesario mostrar un banner de consentimiento de cookies conforme a la Directiva ePrivacy y la guía de la AEPD.</p>
        </section>

        <section id="menores">
          <h2 className="text-xl font-bold text-gray-900 mb-4">10. Menores de edad</h2>
          <p>DealForge es un servicio B2B dirigido a empresas y profesionales. No está destinado a menores de 18 años. No recopilamos conscientemente datos personales de menores. Si detectamos que un menor se ha registrado, procederemos a eliminar su cuenta y datos personales de inmediato. Si eres padre, madre o tutor legal y crees que un menor ha proporcionado datos personales, contáctanos en <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a>.</p>
        </section>

        <section id="seguridad">
          <h2 className="text-xl font-bold text-gray-900 mb-4">11. Medidas de seguridad</h2>
          <p className="mb-3">Implementamos medidas técnicas y organizativas adecuadas conforme al artículo 32 del RGPD:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-800">Cifrado en tránsito:</strong> Todas las comunicaciones se realizan sobre HTTPS con TLS 1.2 o superior.</li>
            <li><strong className="text-gray-800">Cifrado en reposo:</strong> La base de datos utiliza cifrado AES-256 en reposo (Supabase/AWS).</li>
            <li><strong className="text-gray-800">Hashing de contraseñas:</strong> Las contraseñas se almacenan con hash bcrypt con salt, imposibilitando su recuperación.</li>
            <li><strong className="text-gray-800">Tokens de sesión:</strong> JWT firmados con clave secreta, con expiración temporal.</li>
            <li><strong className="text-gray-800">Cabeceras de seguridad:</strong> HSTS, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy.</li>
            <li><strong className="text-gray-800">Principio de mínimo privilegio:</strong> Cada componente del sistema accede únicamente a los datos estrictamente necesarios.</li>
          </ul>
        </section>

        <section id="modificaciones">
          <h2 className="text-xl font-bold text-gray-900 mb-4">12. Modificaciones de esta política</h2>
          <p>Nos reservamos el derecho de actualizar esta Política de Privacidad para reflejar cambios en nuestras prácticas o por motivos legales. En caso de modificaciones sustanciales, te notificaremos con al menos 30 días de antelación mediante correo electrónico o aviso dentro de la plataforma. La fecha de la última actualización se indica al principio de este documento.</p>
        </section>

        <section id="autoridad">
          <h2 className="text-xl font-bold text-gray-900 mb-4">13. Autoridad de control</h2>
          <p className="mb-3">Si consideras que el tratamiento de tus datos personales vulnera la normativa vigente, tienes derecho a presentar una reclamación ante la autoridad de control competente:</p>
          <div className="bg-gray-50 rounded-xl p-5 text-sm space-y-1 border border-gray-100">
            <p><strong className="text-gray-900">Agencia Española de Protección de Datos (AEPD)</strong></p>
            <p>C/ Jorge Juan, 6 — 28001 Madrid</p>
            <p>Web: <span className="text-[#3a9bb5]">www.aepd.es</span></p>
            <p>Teléfono: 901 100 099</p>
          </div>
          <p className="mt-3">No obstante, te rogamos que antes de acudir a la autoridad de control contactes con nosotros en <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a> para intentar resolver cualquier cuestión de forma amistosa.</p>
        </section>

        {/* CTA final */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm mb-2">¿Tienes dudas sobre nuestra política de privacidad?</p>
          <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] font-semibold hover:underline">info@dealforge.es</a>
          <div className="mt-6 flex justify-center gap-4 text-sm text-gray-400">
            <Link href="/terminos" className="hover:text-gray-600 transition-colors">Términos de servicio</Link>
            <span>|</span>
            <Link href="/rgpd" className="hover:text-gray-600 transition-colors">Cumplimiento RGPD</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
