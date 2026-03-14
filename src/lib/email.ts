import nodemailer from "nodemailer";
import { prisma } from "./prisma";

interface SmtpConfig {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  smtpSecure: boolean;
  email: string | null;
  nombre: string;
}

export async function getSmtpConfig(): Promise<SmtpConfig | null> {
  const empresa = await prisma.empresa.findUnique({ where: { id: "default" } });
  if (!empresa?.smtpHost || !empresa?.smtpUser || !empresa?.smtpPass) {
    return null;
  }
  return {
    smtpHost: empresa.smtpHost,
    smtpPort: empresa.smtpPort ?? 587,
    smtpUser: empresa.smtpUser,
    smtpPass: empresa.smtpPass,
    smtpSecure: empresa.smtpSecure,
    email: empresa.email,
    nombre: empresa.nombre,
  };
}

function createTransporter(config: SmtpConfig) {
  const port = config.smtpPort;
  // Port 465 = implicit TLS (secure: true)
  // Port 587/2525/25 = STARTTLS upgrade (secure: false)
  const secure = port === 465;

  return nodemailer.createTransport({
    host: config.smtpHost,
    port,
    secure,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
    // For port 587: force STARTTLS upgrade
    ...(!secure && { requireTLS: true }),
  });
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{ filename: string; content: Buffer; contentType?: string }>;
}) {
  const config = await getSmtpConfig();
  if (!config) {
    throw new Error("SMTP no configurado. Ve a Configuración para configurar el email.");
  }

  const transporter = createTransporter(config);
  const from = config.email
    ? `"${config.nombre}" <${config.email}>`
    : `"${config.nombre}" <${config.smtpUser}>`;

  await transporter.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    attachments: options.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType || "application/pdf",
    })),
  });
}

export async function sendPasswordResetEmail(
  to: string,
  nombre: string,
  resetUrl: string
) {
  const config = await getSmtpConfig();
  if (!config) {
    throw new Error("SMTP no configurado");
  }

  const transporter = createTransporter(config);
  const from = config.email
    ? `"${config.nombre}" <${config.email}>`
    : `"${config.nombre}" <${config.smtpUser}>`;

  await transporter.sendMail({
    from,
    to,
    subject: "DealForge - Restablecer contraseña",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h2 style="color: #1a1a1a; font-size: 22px; margin: 0;">Restablecer contraseña</h2>
        </div>
        <p style="color: #4a4a4a; font-size: 15px; line-height: 1.6;">
          Hola <strong>${nombre}</strong>,
        </p>
        <p style="color: #4a4a4a; font-size: 15px; line-height: 1.6;">
          Recibimos una solicitud para restablecer la contraseña de tu cuenta en DealForge.
          Haz clic en el botón de abajo para crear una nueva contraseña:
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetUrl}"
             style="display: inline-block; background: #3a9bb5; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px; padding: 14px 32px; border-radius: 10px;">
            Restablecer contraseña
          </a>
        </div>
        <p style="color: #888; font-size: 13px; line-height: 1.6;">
          Este enlace expira en <strong>1 hora</strong>. Si no solicitaste este cambio, puedes ignorar este email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #aaa; font-size: 12px; text-align: center;">
          &copy; ${new Date().getFullYear()} ${config.nombre} &mdash; DealForge
        </p>
      </div>
    `,
  });
}

export async function testSmtpConnection() {
  const config = await getSmtpConfig();
  if (!config) {
    throw new Error("SMTP no configurado");
  }

  const transporter = createTransporter(config);
  await transporter.verify();

  // Send test email to self
  const to = config.email || config.smtpUser;
  await transporter.sendMail({
    from: `"${config.nombre}" <${config.email || config.smtpUser}>`,
    to,
    subject: "DealForge - Email de prueba",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #3a9bb5;">Configuración correcta</h2>
        <p>Tu configuración SMTP funciona correctamente. Ya puedes enviar cotizaciones por email desde DealForge.</p>
        <p style="color: #888; font-size: 12px; margin-top: 20px;">— ${config.nombre}</p>
      </div>
    `,
  });
}
