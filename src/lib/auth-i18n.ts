// Bilingual strings for the shared auth pages (registro, login).
// The pages stay at /registro and /login; English is requested via ?lang=en.
// Default is Spanish so existing behavior is unchanged for current users.

export type AuthLang = "es" | "en";

export function resolveAuthLang(value: string | null | undefined): AuthLang {
  return value === "en" ? "en" : "es";
}

export const AUTH_STRINGS = {
  es: {
    // Registro
    registerTitle: "Crea tu cuenta",
    registerSubtitle: "Empieza a cotizar con inteligencia artificial",
    name: "Nombre",
    namePlaceholder: "Tu nombre",
    email: "Email",
    password: "Contraseña",
    passwordPlaceholder: "Mínimo 8 caracteres",
    min8: "Mínimo 8 caracteres",
    confirmPassword: "Confirmar contraseña",
    confirmPlaceholder: "Repite la contraseña",
    passwordsDontMatch: "Las contraseñas no coinciden",
    passwordTooShort: "La contraseña debe tener al menos 8 caracteres",
    termsPrefix: "Al crear tu cuenta aceptas nuestros",
    terms: "Términos de servicio",
    and: "y",
    privacy: "Política de privacidad",
    createAccount: "Crear Cuenta Gratis",
    creatingAccount: "Creando cuenta...",
    planInfo: "Plan Starter gratuito: 10 cotizaciones/mes, 5 clientes, Forge IA incluido",
    haveAccount: "¿Ya tienes cuenta?",
    login: "Iniciar Sesión",
    genericRegisterError: "Error al crear la cuenta",
    connError: "Error de conexión. Intenta de nuevo.",
    // Login
    loginTitle: "Bienvenido",
    loginSubtitle: "Inicia sesión para acceder a tu cuenta",
    forgotPassword: "¿Olvidaste tu contraseña?",
    rememberMe: "Recordarme",
    loginPasswordPlaceholder: "Tu contraseña",
    signIn: "Iniciar Sesión",
    signingIn: "Iniciando sesión...",
    loginTermsPrefix: "Al iniciar sesión aceptas nuestros",
    noAccount: "¿No tienes cuenta?",
    registerFree: "Regístrate gratis",
    genericLoginError: "Error al iniciar sesión",
  },
  en: {
    // Register
    registerTitle: "Create your account",
    registerSubtitle: "Start quoting with AI",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    password: "Password",
    passwordPlaceholder: "At least 8 characters",
    min8: "At least 8 characters",
    confirmPassword: "Confirm password",
    confirmPlaceholder: "Repeat your password",
    passwordsDontMatch: "Passwords don't match",
    passwordTooShort: "Password must be at least 8 characters",
    termsPrefix: "By creating an account you agree to our",
    terms: "Terms of Service",
    and: "and",
    privacy: "Privacy Policy",
    createAccount: "Create Free Account",
    creatingAccount: "Creating account...",
    planInfo: "Free Starter plan: 10 quotes/month, 5 clients, Forge AI included",
    haveAccount: "Already have an account?",
    login: "Log in",
    genericRegisterError: "Couldn't create your account",
    connError: "Connection error. Please try again.",
    // Login
    loginTitle: "Welcome back",
    loginSubtitle: "Sign in to access your account",
    forgotPassword: "Forgot your password?",
    rememberMe: "Remember me",
    loginPasswordPlaceholder: "Your password",
    signIn: "Sign in",
    signingIn: "Signing in...",
    loginTermsPrefix: "By signing in you agree to our",
    noAccount: "Don't have an account?",
    registerFree: "Sign up free",
    genericLoginError: "Couldn't sign in",
  },
} as const;

// Appends ?lang=en (or merges into existing query) so links keep the language.
export function withLang(href: string, lang: AuthLang): string {
  if (lang === "es") return href;
  const [path, query = ""] = href.split("?");
  const params = new URLSearchParams(query);
  params.set("lang", "en");
  return `${path}?${params.toString()}`;
}
