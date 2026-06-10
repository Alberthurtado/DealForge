// Bilingual verification email used by the registration and resend flows.
// Default language is Spanish; English is used when the signup happened
// through the /en funnel (lang=en propagated from the client).

export type EmailLang = "es" | "en";

export function resolveEmailLang(value: string | null | undefined): EmailLang {
  return value === "en" ? "en" : "es";
}

export function buildVerificationEmail(
  lang: EmailLang,
  nombre: string,
  verifyUrl: string
): { subject: string; html: string } {
  const t =
    lang === "en"
      ? {
          subject: "Verify your account — DealForge",
          heading: `Welcome to DealForge, ${nombre}`,
          sub: "Just one step left: confirm your email to activate your account.",
          button: "Verify my email",
          ignore:
            "If you didn't create a DealForge account, you can ignore this email.",
          expiry: "This link expires in 24 hours.",
          footer: "DealForge — AI quoting software for small businesses",
        }
      : {
          subject: "Verifica tu cuenta — DealForge",
          heading: `Bienvenido a DealForge, ${nombre}`,
          sub: "Solo falta un paso: confirma tu email para activar tu cuenta.",
          button: "Verificar mi email",
          ignore: "Si no has creado una cuenta en DealForge, ignora este email.",
          expiry: "El enlace expira en 24 horas.",
          footer: "DealForge — CPQ Inteligente con IA para PYMEs",
        };

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <img src="https://dealforge.es/logo.svg" alt="DealForge" width="48" height="48" style="border-radius: 12px;" />
      </div>
      <h1 style="font-size: 22px; font-weight: 700; color: #111827; text-align: center; margin: 0 0 8px;">
        ${t.heading}
      </h1>
      <p style="font-size: 14px; color: #6b7280; text-align: center; margin: 0 0 32px; line-height: 1.6;">
        ${t.sub}
      </p>
      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${verifyUrl}" style="display: inline-block; background-color: #3a9bb5; color: white; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 12px;">
          ${t.button}
        </a>
      </div>
      <p style="font-size: 12px; color: #9ca3af; text-align: center; line-height: 1.5;">
        ${t.ignore}<br />
        ${t.expiry}
      </p>
      <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 24px 0;" />
      <p style="font-size: 11px; color: #d1d5db; text-align: center;">
        ${t.footer}
      </p>
    </div>
  `;

  return { subject: t.subject, html };
}
