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
  return nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
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
    throw new Error("SMTP no configurado. Ve a Configuracion para configurar el email.");
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
        <h2 style="color: #3a9bb5;">Configuracion correcta</h2>
        <p>Tu configuracion SMTP funciona correctamente. Ya puedes enviar cotizaciones por email desde DealForge.</p>
        <p style="color: #888; font-size: 12px; margin-top: 20px;">— ${config.nombre}</p>
      </div>
    `,
  });
}
