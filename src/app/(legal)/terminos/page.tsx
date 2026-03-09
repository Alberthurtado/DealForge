import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terminos de Servicio — DealForge",
  description: "Terminos y condiciones de uso de la plataforma DealForge CPQ. Condiciones de contratacion, planes, pagos y responsabilidades.",
};

const FECHA_ACTUALIZACION = "9 de marzo de 2026";

export default function TerminosPage() {
  return (
    <article className="prose-legal">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Terminos de Servicio</h1>
        <p className="text-sm text-gray-500 bg-gray-50 inline-block px-3 py-1 rounded-lg">
          Ultima actualizacion: {FECHA_ACTUALIZACION}
        </p>
      </div>

      {/* Indice */}
      <nav className="mb-12 p-6 bg-gray-50 rounded-xl border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Indice</h2>
        <ol className="space-y-1.5 text-sm text-[#3a9bb5]">
          <li><a href="#identificacion" className="hover:underline">1. Identificacion del prestador</a></li>
          <li><a href="#objeto" className="hover:underline">2. Objeto y ambito de aplicacion</a></li>
          <li><a href="#aceptacion" className="hover:underline">3. Aceptacion de los terminos</a></li>
          <li><a href="#servicio" className="hover:underline">4. Descripcion del servicio</a></li>
          <li><a href="#registro" className="hover:underline">5. Registro y cuenta de usuario</a></li>
          <li><a href="#planes" className="hover:underline">6. Planes, precios y facturacion</a></li>
          <li><a href="#reembolsos" className="hover:underline">7. Derecho de desistimiento y reembolsos</a></li>
          <li><a href="#obligaciones" className="hover:underline">8. Obligaciones del usuario</a></li>
          <li><a href="#usos-prohibidos" className="hover:underline">9. Usos prohibidos</a></li>
          <li><a href="#ia" className="hover:underline">10. Uso del asistente IA (Forge)</a></li>
          <li><a href="#propiedad" className="hover:underline">11. Propiedad intelectual</a></li>
          <li><a href="#datos-usuario" className="hover:underline">12. Datos y contenido del usuario</a></li>
          <li><a href="#disponibilidad" className="hover:underline">13. Disponibilidad del servicio</a></li>
          <li><a href="#responsabilidad" className="hover:underline">14. Limitacion de responsabilidad</a></li>
          <li><a href="#indemnizacion" className="hover:underline">15. Indemnizacion</a></li>
          <li><a href="#suspension" className="hover:underline">16. Suspension y terminacion</a></li>
          <li><a href="#modificaciones" className="hover:underline">17. Modificaciones de los terminos</a></li>
          <li><a href="#ley" className="hover:underline">18. Ley aplicable y jurisdiccion</a></li>
          <li><a href="#disputas" className="hover:underline">19. Resolucion alternativa de disputas</a></li>
          <li><a href="#contacto" className="hover:underline">20. Contacto</a></li>
        </ol>
      </nav>

      {/* Contenido */}
      <div className="space-y-10 text-gray-600 leading-relaxed">

        <section id="identificacion">
          <h2 className="text-xl font-bold text-gray-900 mb-4">1. Identificacion del prestador</h2>
          <div className="bg-gray-50 rounded-xl p-5 text-sm space-y-1 border border-gray-100">
            <p><strong className="text-gray-900">Prestador:</strong> DealForge</p>
            <p><strong className="text-gray-900">Correo electronico:</strong> <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a></p>
            <p><strong className="text-gray-900">Sitio web:</strong> <a href="https://deal-forge-omega.vercel.app" className="text-[#3a9bb5] hover:underline">deal-forge-omega.vercel.app</a></p>
          </div>
          <p className="mt-3 text-sm">En cumplimiento del articulo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Informacion y de Comercio Electronico (LSSI-CE).</p>
        </section>

        <section id="objeto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">2. Objeto y ambito de aplicacion</h2>
          <p>Los presentes Terminos de Servicio regulan el acceso y uso de la plataforma DealForge, un software como servicio (SaaS) de configuracion, precios y cotizaciones (CPQ) con asistencia de inteligencia artificial, dirigido a empresas y profesionales autonomos.</p>
          <p className="mt-3">Estos terminos constituyen un contrato vinculante entre el usuario (en adelante, &quot;Usuario&quot;) y DealForge (en adelante, &quot;el Prestador&quot;).</p>
        </section>

        <section id="aceptacion">
          <h2 className="text-xl font-bold text-gray-900 mb-4">3. Aceptacion de los terminos</h2>
          <p>Al registrarse en la plataforma, el Usuario declara haber leido, comprendido y aceptado integramente los presentes Terminos de Servicio, asi como la <Link href="/privacidad" className="text-[#3a9bb5] hover:underline">Politica de Privacidad</Link>. Si no estas de acuerdo con estos terminos, no debes utilizar el servicio.</p>
          <p className="mt-3">Si el Usuario actua en nombre de una empresa u organizacion, declara que tiene autoridad para vincular a dicha entidad a estos terminos.</p>
        </section>

        <section id="servicio">
          <h2 className="text-xl font-bold text-gray-900 mb-4">4. Descripcion del servicio</h2>
          <p className="mb-3">DealForge proporciona las siguientes funcionalidades principales:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-800">Gestion de productos:</strong> Catalogo de productos con variantes, categorias y precios configurables.</li>
            <li><strong className="text-gray-800">Gestion de clientes:</strong> Base de datos de clientes y contactos con historial comercial.</li>
            <li><strong className="text-gray-800">Generacion de cotizaciones:</strong> Creacion, envio y seguimiento de propuestas comerciales profesionales en PDF.</li>
            <li><strong className="text-gray-800">Reglas comerciales:</strong> Motor de reglas para descuentos, margenes y aprobaciones automaticas.</li>
            <li><strong className="text-gray-800">Flujo de aprobaciones:</strong> Sistema de aprobacion por email con enlace seguro.</li>
            <li><strong className="text-gray-800">Asistente IA (Forge):</strong> Asistente inteligente integrado que ayuda en la navegacion y operativa de la plataforma.</li>
            <li><strong className="text-gray-800">Panel de analisis:</strong> Metricas de pipeline, conversion e ingresos.</li>
          </ul>
        </section>

        <section id="registro">
          <h2 className="text-xl font-bold text-gray-900 mb-4">5. Registro y cuenta de usuario</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>El registro requiere un nombre, direccion de correo electronico valida y contrasena.</li>
            <li>El Usuario garantiza la veracidad, exactitud y actualizacion de los datos proporcionados.</li>
            <li>El Usuario es el unico responsable de mantener la confidencialidad de sus credenciales de acceso.</li>
            <li>El Usuario debe notificar inmediatamente a DealForge cualquier uso no autorizado de su cuenta a traves de <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a>.</li>
            <li>Cada cuenta es personal e intransferible. El uso compartido de credenciales esta prohibido.</li>
            <li>DealForge se reserva el derecho de suspender cuentas con datos falsos o fraudulentos.</li>
          </ul>
        </section>

        <section id="planes">
          <h2 className="text-xl font-bold text-gray-900 mb-4">6. Planes, precios y facturacion</h2>
          <h3 className="text-base font-semibold text-gray-800 mb-3">6.1. Planes disponibles</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Plan</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Precio</th>
                  <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Caracteristicas principales</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-3 border border-gray-200 font-medium text-gray-800">Starter</td><td className="p-3 border border-gray-200">Gratuito</td><td className="p-3 border border-gray-200">Hasta 50 cotizaciones/mes, 25 productos, Forge IA basico</td></tr>
                <tr className="bg-gray-50"><td className="p-3 border border-gray-200 font-medium text-gray-800">Pro</td><td className="p-3 border border-gray-200">29 EUR/mes</td><td className="p-3 border border-gray-200">Cotizaciones ilimitadas, 500 productos, Forge IA avanzado, aprobaciones, PDF personalizado</td></tr>
                <tr><td className="p-3 border border-gray-200 font-medium text-gray-800">Business</td><td className="p-3 border border-gray-200">79 EUR/mes</td><td className="p-3 border border-gray-200">Todo de Pro + multi-usuario, reportes avanzados, reglas ilimitadas, soporte prioritario</td></tr>
                <tr className="bg-gray-50"><td className="p-3 border border-gray-200 font-medium text-gray-800">Enterprise</td><td className="p-3 border border-gray-200">Personalizado</td><td className="p-3 border border-gray-200">Solucion a medida con integraciones, SLA dedicado y soporte premium</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm mb-4">Los precios indicados no incluyen impuestos aplicables (IVA). DealForge se reserva el derecho de modificar los precios con un preaviso minimo de 30 dias.</p>

          <h3 className="text-base font-semibold text-gray-800 mb-2">6.2. Facturacion y pago</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Los pagos se procesan de forma segura a traves de <strong>Stripe, Inc.</strong>, cumpliendo el estandar PCI DSS Nivel 1.</li>
            <li>La facturacion es mensual, con cargo automatico al inicio de cada periodo.</li>
            <li>El Usuario puede cambiar de plan (upgrade o downgrade) en cualquier momento. Los cambios se aplican al siguiente ciclo de facturacion.</li>
            <li>En caso de impago, DealForge podra restringir el acceso a funcionalidades de pago tras 7 dias de gracia.</li>
          </ul>
        </section>

        <section id="reembolsos">
          <h2 className="text-xl font-bold text-gray-900 mb-4">7. Derecho de desistimiento y reembolsos</h2>
          <p className="mb-3">De conformidad con el articulo 103 del Real Decreto Legislativo 1/2007 (Ley General para la Defensa de los Consumidores y Usuarios):</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-800">Periodo de desistimiento:</strong> El Usuario dispone de 14 dias naturales desde la contratacion del plan de pago para ejercer su derecho de desistimiento sin necesidad de justificacion.</li>
            <li><strong className="text-gray-800">Procedimiento:</strong> Para ejercer el desistimiento, envia un correo a <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a> indicando tu voluntad de desistir del contrato.</li>
            <li><strong className="text-gray-800">Reembolso:</strong> El importe se devolvera en un plazo maximo de 14 dias desde la recepcion de la solicitud, utilizando el mismo medio de pago empleado en la transaccion original.</li>
            <li><strong className="text-gray-800">Exclusion:</strong> El derecho de desistimiento no aplica si el servicio ha sido completamente ejecutado con el consentimiento expreso del Usuario y este reconoce que pierde su derecho una vez el servicio haya sido ejecutado.</li>
          </ul>
          <p className="mt-3">Transcurrido el periodo de desistimiento, no se realizaran reembolsos por el periodo en curso. La cancelacion de la suscripcion sera efectiva al final del periodo de facturacion vigente.</p>
        </section>

        <section id="obligaciones">
          <h2 className="text-xl font-bold text-gray-900 mb-4">8. Obligaciones del usuario</h2>
          <p className="mb-3">El Usuario se compromete a:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Utilizar el servicio de conformidad con la ley, la moral, el orden publico y los presentes terminos.</li>
            <li>Proporcionar informacion veraz y mantenerla actualizada.</li>
            <li>No compartir sus credenciales de acceso con terceros.</li>
            <li>Garantizar que tiene los derechos necesarios sobre los datos y contenidos que introduce en la plataforma.</li>
            <li>Cumplir con la normativa de proteccion de datos respecto a los datos de sus propios clientes introducidos en el sistema.</li>
            <li>No intentar acceder a areas restringidas del sistema o cuentas de otros usuarios.</li>
          </ul>
        </section>

        <section id="usos-prohibidos">
          <h2 className="text-xl font-bold text-gray-900 mb-4">9. Usos prohibidos</h2>
          <p className="mb-3">Queda expresamente prohibido:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Utilizar el servicio para actividades ilicitas, fraudulentas o que infrinjan derechos de terceros.</li>
            <li>Intentar acceder, modificar o destruir datos de otros usuarios.</li>
            <li>Realizar ingenieria inversa, descompilar o desensamblar cualquier parte del software.</li>
            <li>Utilizar bots, scrapers u otros medios automatizados para acceder al servicio sin autorizacion previa.</li>
            <li>Sobrecargar intencionadamente la infraestructura del servicio.</li>
            <li>Revender, sublicenciar o redistribuir el acceso al servicio sin autorizacion escrita.</li>
            <li>Introducir contenido que sea difamatorio, ofensivo, discriminatorio o que incite al odio.</li>
            <li>Utilizar el asistente IA (Forge) para generar contenido enganoso, fraudulento o que viole derechos de terceros.</li>
          </ul>
        </section>

        <section id="ia">
          <h2 className="text-xl font-bold text-gray-900 mb-4">10. Uso del asistente IA (Forge)</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
            <p className="text-sm text-amber-900"><strong>Aviso importante:</strong> El asistente IA Forge es una herramienta de apoyo. Sus respuestas son orientativas y no constituyen asesoramiento profesional de ningun tipo (legal, fiscal, financiero o comercial).</p>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>Forge utiliza modelos de lenguaje de Anthropic (Claude) para procesar las consultas del Usuario dentro del contexto de la plataforma.</li>
            <li>Las respuestas generadas por IA pueden contener imprecisiones. El Usuario es responsable de verificar cualquier informacion antes de tomar decisiones basadas en ella.</li>
            <li>DealForge no garantiza la exactitud, completitud ni idoneidad de las respuestas generadas por Forge.</li>
            <li>Las consultas al asistente IA se procesan a traves de la API de Anthropic. Los datos enviados al modelo no se utilizan para entrenar modelos de IA de terceros.</li>
            <li>El uso del asistente esta sujeto a limites segun el plan contratado.</li>
          </ul>
        </section>

        <section id="propiedad">
          <h2 className="text-xl font-bold text-gray-900 mb-4">11. Propiedad intelectual</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-800">De DealForge:</strong> La plataforma, su codigo fuente, diseno, marca, logotipos, textos y demas elementos son propiedad exclusiva de DealForge y estan protegidos por las leyes de propiedad intelectual e industrial.</li>
            <li><strong className="text-gray-800">Del Usuario:</strong> El Usuario conserva la plena propiedad sobre todos los datos, contenidos y documentos que introduce o genera en la plataforma (productos, clientes, cotizaciones, etc.).</li>
            <li><strong className="text-gray-800">Licencia limitada:</strong> DealForge concede al Usuario una licencia limitada, no exclusiva, no transferible y revocable para acceder y utilizar la plataforma conforme a estos terminos y al plan contratado.</li>
          </ul>
        </section>

        <section id="datos-usuario">
          <h2 className="text-xl font-bold text-gray-900 mb-4">12. Datos y contenido del usuario</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Los datos introducidos por el Usuario son de su exclusiva propiedad.</li>
            <li>DealForge actua como encargado del tratamiento respecto a los datos de clientes del Usuario, conforme al articulo 28 del RGPD.</li>
            <li>El Usuario puede exportar sus datos en cualquier momento a traves de las funcionalidades de la plataforma.</li>
            <li>Tras la terminacion del contrato, DealForge conservara los datos durante un periodo de 30 dias para facilitar la exportacion, transcurrido el cual se eliminaran de forma segura, salvo obligacion legal de conservacion.</li>
          </ul>
        </section>

        <section id="disponibilidad">
          <h2 className="text-xl font-bold text-gray-900 mb-4">13. Disponibilidad del servicio</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>DealForge realiza sus mejores esfuerzos para mantener la plataforma operativa 24/7.</li>
            <li>No se garantiza una disponibilidad especifica (SLA) en los planes Starter, Pro y Business. Los planes Enterprise pueden incluir acuerdos de nivel de servicio personalizados.</li>
            <li>El servicio puede interrumpirse temporalmente por mantenimiento, actualizaciones o causas de fuerza mayor, notificando al Usuario cuando sea posible.</li>
            <li>DealForge no sera responsable de las interrupciones causadas por proveedores de infraestructura de terceros, fallos de red o eventos fuera de nuestro control razonable.</li>
          </ul>
        </section>

        <section id="responsabilidad">
          <h2 className="text-xl font-bold text-gray-900 mb-4">14. Limitacion de responsabilidad</h2>
          <p className="mb-3">En la medida maxima permitida por la legislacion aplicable:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>DealForge proporciona el servicio &quot;tal cual&quot; (as is) y &quot;segun disponibilidad&quot; (as available), sin garantias implicitas de comerciabilidad, idoneidad para un fin particular o no infraccion.</li>
            <li>La responsabilidad total acumulada de DealForge frente al Usuario por cualquier concepto no excedera el importe total pagado por el Usuario durante los 12 meses anteriores al hecho que da lugar a la reclamacion.</li>
            <li>DealForge no sera responsable de danos indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo perdida de beneficios, datos, oportunidades de negocio o fondo de comercio.</li>
            <li>Estas limitaciones no se aplican en caso de dolo o negligencia grave, ni excluyen responsabilidades que no puedan limitarse conforme a la legislacion espanola.</li>
          </ul>
        </section>

        <section id="indemnizacion">
          <h2 className="text-xl font-bold text-gray-900 mb-4">15. Indemnizacion</h2>
          <p>El Usuario se compromete a indemnizar y mantener indemne a DealForge frente a cualquier reclamacion, dano, responsabilidad, coste o gasto (incluidos honorarios de abogados razonables) derivados del incumplimiento de estos terminos por parte del Usuario o del uso indebido de la plataforma.</p>
        </section>

        <section id="suspension">
          <h2 className="text-xl font-bold text-gray-900 mb-4">16. Suspension y terminacion</h2>
          <h3 className="text-base font-semibold text-gray-800 mb-2">16.1. Por el Usuario</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>El Usuario puede cancelar su cuenta en cualquier momento desde la configuracion de la plataforma o contactando a <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a>.</li>
            <li>La cancelacion de un plan de pago sera efectiva al final del periodo de facturacion vigente.</li>
            <li>El Usuario dispondra de 30 dias tras la cancelacion para exportar sus datos.</li>
          </ul>

          <h3 className="text-base font-semibold text-gray-800 mb-2">16.2. Por DealForge</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>DealForge podra suspender o cancelar el acceso al servicio en caso de incumplimiento de estos terminos, uso fraudulento, impago reiterado o por requerimiento de autoridad competente.</li>
            <li>En caso de suspension, se notificara al Usuario por correo electronico con una descripcion del motivo y, cuando sea posible, un plazo razonable para subsanar la situacion.</li>
            <li>La suspension no exime al Usuario de sus obligaciones de pago pendientes.</li>
          </ul>
        </section>

        <section id="modificaciones">
          <h2 className="text-xl font-bold text-gray-900 mb-4">17. Modificaciones de los terminos</h2>
          <p>DealForge se reserva el derecho de modificar estos Terminos de Servicio. Las modificaciones sustanciales se comunicaran con al menos 30 dias de antelacion mediante correo electronico o notificacion en la plataforma. El uso continuado del servicio tras la entrada en vigor de las modificaciones implica la aceptacion de los nuevos terminos. Si el Usuario no esta de acuerdo con los cambios, podra cancelar su cuenta antes de que entren en vigor.</p>
        </section>

        <section id="ley">
          <h2 className="text-xl font-bold text-gray-900 mb-4">18. Ley aplicable y jurisdiccion</h2>
          <p className="mb-3">Los presentes Terminos de Servicio se rigen por la legislacion espanola, en particular:</p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Informacion (LSSI-CE).</li>
            <li>Real Decreto Legislativo 1/2007, de 16 de noviembre, Ley General para la Defensa de los Consumidores y Usuarios.</li>
            <li>Reglamento (UE) 2016/679 (RGPD) y Ley Organica 3/2018 (LOPD-GDD).</li>
            <li>Codigo Civil y Codigo de Comercio espanoles.</li>
          </ul>
          <p>Para cualquier controversia derivada de estos terminos, las partes se someten a los Juzgados y Tribunales competentes conforme a la legislacion procesal aplicable. Si el Usuario tiene la condicion de consumidor, seran competentes los Juzgados de su domicilio.</p>
        </section>

        <section id="disputas">
          <h2 className="text-xl font-bold text-gray-900 mb-4">19. Resolucion alternativa de disputas</h2>
          <p className="mb-3">Antes de iniciar cualquier accion judicial, las partes se comprometen a intentar resolver la disputa de forma amistosa:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-gray-800">Reclamacion previa:</strong> El Usuario podra remitir su reclamacion a <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a>. DealForge respondera en un plazo maximo de 30 dias.</li>
            <li><strong className="text-gray-800">Plataforma ODR:</strong> Conforme al Reglamento (UE) 524/2013, informamos de la existencia de la plataforma de resolucion de litigios en linea de la Comision Europea: <span className="text-[#3a9bb5]">https://ec.europa.eu/consumers/odr</span></li>
            <li><strong className="text-gray-800">Mediacion:</strong> Las partes podran someter la disputa a mediacion conforme a la Ley 5/2012, de 6 de julio, de mediacion en asuntos civiles y mercantiles.</li>
          </ul>
        </section>

        <section id="contacto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">20. Contacto</h2>
          <p>Para cualquier cuestion relacionada con estos Terminos de Servicio, puedes contactarnos en:</p>
          <div className="bg-gray-50 rounded-xl p-5 text-sm space-y-1 border border-gray-100 mt-3">
            <p><strong className="text-gray-900">DealForge</strong></p>
            <p><strong className="text-gray-900">Email:</strong> <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a></p>
          </div>
        </section>

        {/* CTA final */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm mb-2">¿Tienes dudas sobre nuestros terminos?</p>
          <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] font-semibold hover:underline">info@dealforge.es</a>
          <div className="mt-6 flex justify-center gap-4 text-sm text-gray-400">
            <Link href="/privacidad" className="hover:text-gray-600 transition-colors">Politica de privacidad</Link>
            <span>|</span>
            <Link href="/rgpd" className="hover:text-gray-600 transition-colors">Cumplimiento RGPD</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
