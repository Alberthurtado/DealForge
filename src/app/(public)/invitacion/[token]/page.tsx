"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Users, Crown, Flame, Eye, Loader2, Check, X } from "lucide-react";
import Link from "next/link";

interface InviteInfo {
  email: string;
  rol: "ADMIN" | "SALES" | "VIEWER";
  empresaNombre: string;
  empresaLogoUrl?: string;
  expiresAt: string;
}

const ROL_LABELS: Record<string, { label: string; icon: typeof Crown }> = {
  ADMIN: { label: "Administrador", icon: Crown },
  SALES: { label: "Vendedor", icon: Flame },
  VIEWER: { label: "Observador", icon: Eye },
};

export default function InvitacionPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [info, setInfo] = useState<InviteInfo | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // For new user registration
  const [mode, setMode] = useState<"choose" | "login" | "register">("choose");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    async function loadInvite() {
      try {
        const res = await fetch(`/api/invitaciones/${token}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Invitación inválida");
        } else {
          setInfo(data);
        }
      } catch {
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    }
    loadInvite();
  }, [token]);

  async function handleJoin() {
    setSubmitting(true);
    setFormError("");
    try {
      const res = await fetch(`/api/invitaciones/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "join" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Error al unirte al equipo");
        setSubmitting(false);
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/dashboard"), 2000);
      }
    } catch {
      setFormError("Error de conexión");
      setSubmitting(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      const res = await fetch(`/api/invitaciones/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register", nombre, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Error al crear la cuenta");
        setSubmitting(false);
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/dashboard"), 2000);
      }
    } catch {
      setFormError("Error de conexión");
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-border p-8 max-w-md w-full text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <X className="w-7 h-7 text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">Invitación inválida</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90">
            Ir al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-border p-8 max-w-md w-full text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Check className="w-7 h-7 text-green-600" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">¡Bienvenido al equipo!</h1>
          <p className="text-muted-foreground">Redirigiendo al dashboard...</p>
        </div>
      </div>
    );
  }

  const RolInfo = info ? ROL_LABELS[info.rol] || ROL_LABELS.SALES : null;
  const RolIcon = RolInfo?.icon || Users;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-border p-8 max-w-md w-full shadow-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Invitación de equipo</h1>
          <p className="text-muted-foreground">
            Has sido invitado a unirte a{" "}
            <span className="font-semibold text-foreground">{info?.empresaNombre}</span>
          </p>
        </div>

        {/* Role info */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <RolIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{info?.email}</p>
              <p className="text-xs text-muted-foreground">
                Rol: <span className="font-medium">{RolInfo?.label}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action */}
        {mode === "choose" && (
          <div className="space-y-3">
            <button
              onClick={() => setMode("register")}
              className="w-full px-4 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors"
            >
              Crear nueva cuenta
            </button>
            <button
              onClick={() => setMode("login")}
              className="w-full px-4 py-3 text-sm font-semibold text-foreground border border-border hover:bg-gray-50 rounded-xl transition-colors"
            >
              Ya tengo cuenta en DealForge
            </button>
          </div>
        )}

        {mode === "register" && (
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Nombre completo</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                placeholder="Tu nombre"
                className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input
                type="email"
                value={info?.email}
                disabled
                className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-gray-50 text-muted-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Mínimo 8 caracteres"
                className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {formError && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <X className="w-4 h-4" />{formError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full px-4 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Crear cuenta y unirse"}
            </button>
            <button type="button" onClick={() => setMode("choose")} className="w-full text-sm text-muted-foreground hover:text-foreground">
              ← Volver
            </button>
          </form>
        )}

        {mode === "login" && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              Inicia sesión en DealForge con <strong>{info?.email}</strong> y vuelve a esta página para unirte al equipo.
            </p>
            <Link
              href={`/login?redirect=/invitacion/${token}`}
              className="block w-full px-4 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors text-center"
            >
              Ir a iniciar sesión
            </Link>
            <button
              onClick={handleJoin}
              disabled={submitting}
              className="w-full px-4 py-3 text-sm font-semibold text-foreground border border-border hover:bg-gray-50 rounded-xl transition-colors disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Ya inicié sesión — unirme"}
            </button>
            <button type="button" onClick={() => setMode("choose")} className="w-full text-sm text-muted-foreground hover:text-foreground">
              ← Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
