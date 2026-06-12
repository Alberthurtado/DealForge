"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  UserPlus,
  Crown,
  Flame,
  Shield,
  Eye,
  Trash2,
  ChevronDown,
  Loader2,
  Mail,
  Clock,
  Check,
  X,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { useEmpresaLocale } from "@/lib/use-empresa-locale";
import { CONFIG_STRINGS } from "@/lib/configuracion-i18n";

type Rol = "ADMIN" | "SALES" | "VIEWER";

interface Miembro {
  id: string;
  usuarioId: string;
  nombre: string;
  email: string;
  rol: Rol;
  activo: boolean;
  createdAt: string;
  isCurrentUser: boolean;
}

interface Invitacion {
  id: string;
  email: string;
  rol: Rol;
  expiresAt: string;
  createdAt: string;
}

interface TeamData {
  miembros: Miembro[];
  invitaciones: Invitacion[];
  plan: string;
  maxMiembros: number;
  canInvite: boolean;
  currentUserRol: Rol;
}

const ROL_CONFIG: Record<Rol, { icon: typeof Crown; color: string; bgColor: string }> = {
  ADMIN: { icon: Crown, color: "text-amber-700", bgColor: "bg-amber-100" },
  SALES: { icon: Flame, color: "text-blue-700", bgColor: "bg-blue-100" },
  VIEWER: { icon: Eye, color: "text-gray-700", bgColor: "bg-gray-100" },
};

function RolBadge({ rol, label }: { rol: Rol; label: string }) {
  const config = ROL_CONFIG[rol];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full ${config.bgColor} ${config.color}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

export function TeamSection({ currentUserRol }: { currentUserRol: string }) {
  const { lang, locale: numLocale } = useEmpresaLocale();
  const t = CONFIG_STRINGS[lang].teamSection;
  const [data, setData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRol, setInviteRol] = useState<Rol>("SALES");
  const [inviting, setInviting] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [compartirDatos, setCompartirDatos] = useState<string[]>([]);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [updatingRol, setUpdatingRol] = useState<string | null>(null);
  const [showRolMenu, setShowRolMenu] = useState<string | null>(null);

  const loadTeam = useCallback(async () => {
    try {
      const res = await fetch("/api/equipo");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTeam(); }, [loadTeam]);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setInviting(true);
    setInviteError("");
    setInviteSuccess(false);

    try {
      const res = await fetch("/api/equipo/invitar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, rol: inviteRol, compartirDatos: compartirDatos.length > 0 ? compartirDatos : undefined }),
      });
      const json = await res.json();

      if (!res.ok) {
        setInviteError(json.error || t.errInvite);
      } else {
        setInviteSuccess(true);
        setInviteEmail("");
        setCompartirDatos([]);
        await loadTeam();
      }
    } catch {
      setInviteError(t.errConnection);
    } finally {
      setInviting(false);
    }
  }

  async function handleRemoveMember(userId: string) {
    if (!confirm(t.confirmRemove)) return;
    setRemovingId(userId);
    try {
      await fetch(`/api/equipo/${userId}`, { method: "DELETE" });
      await loadTeam();
    } finally {
      setRemovingId(null);
    }
  }

  async function handleChangeRol(userId: string, newRol: Rol) {
    setUpdatingRol(userId);
    setShowRolMenu(null);
    try {
      await fetch(`/api/equipo/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rol: newRol }),
      });
      await loadTeam();
    } finally {
      setUpdatingRol(null);
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mb-6">
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold">{t.title}</h3>
          </div>
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const isAdmin = currentUserRol === "ADMIN";
  const planLabel = data.plan.charAt(0).toUpperCase() + data.plan.slice(1);
  const slotsLeft = data.maxMiembros === 0 ? null : data.maxMiembros - data.miembros.length;

  return (
    <div className="max-w-3xl mb-6">
      <div className="bg-white rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            {t.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              {t.membersLabel(data.miembros.length)}
              {data.maxMiembros > 0 && ` / ${data.maxMiembros}`}
            </span>
            <span className="px-2 py-0.5 text-xs font-semibold bg-primary/10 text-primary rounded-full">
              {t.planPrefix} {planLabel}
            </span>
          </div>
        </div>

        {/* Members list */}
        <div className="space-y-2 mb-5">
          {data.miembros.map((miembro) => {
            const RolIcon = ROL_CONFIG[miembro.rol]?.icon || Shield;
            return (
              <div
                key={miembro.usuarioId}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">
                    {miembro.nombre.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">{miembro.nombre}</p>
                    {miembro.isCurrentUser && (
                      <span className="text-xs text-muted-foreground">{t.you}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{miembro.email}</p>
                </div>

                {/* Role badge / dropdown */}
                <div className="relative">
                  {isAdmin && !miembro.isCurrentUser ? (
                    <button
                      onClick={() => setShowRolMenu(showRolMenu === miembro.usuarioId ? null : miembro.usuarioId)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full transition-opacity ${ROL_CONFIG[miembro.rol]?.bgColor} ${ROL_CONFIG[miembro.rol]?.color} hover:opacity-80`}
                    >
                      <RolIcon className="w-3 h-3" />
                      {t.roles[miembro.rol]?.label}
                      {updatingRol === miembro.usuarioId ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                  ) : (
                    <RolBadge rol={miembro.rol} label={t.roles[miembro.rol]?.label ?? miembro.rol} />
                  )}

                  {/* Role dropdown */}
                  {showRolMenu === miembro.usuarioId && (
                    <div className="absolute right-0 top-7 z-10 w-56 bg-white border border-border rounded-xl shadow-lg p-1">
                      {(["ADMIN", "SALES", "VIEWER"] as Rol[]).map((rol) => {
                        const config = ROL_CONFIG[rol];
                        const RIcon = config.icon;
                        return (
                          <button
                            key={rol}
                            onClick={() => handleChangeRol(miembro.usuarioId, rol)}
                            className="w-full flex items-start gap-2 px-3 py-2 text-left rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <RIcon className={`w-4 h-4 mt-0.5 shrink-0 ${config.color}`} />
                            <div>
                              <p className="text-sm font-medium">{t.roles[rol].label}</p>
                              <p className="text-xs text-muted-foreground">{t.roles[rol].description}</p>
                            </div>
                            {miembro.rol === rol && <Check className="w-4 h-4 ml-auto mt-0.5 text-primary" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Remove button */}
                {isAdmin && !miembro.isCurrentUser && (
                  <button
                    onClick={() => handleRemoveMember(miembro.usuarioId)}
                    disabled={removingId === miembro.usuarioId}
                    className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title={t.removeMember}
                  >
                    {removingId === miembro.usuarioId ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Pending invitations */}
        {data.invitaciones.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {t.pendingInvites}
            </p>
            <div className="space-y-2">
              {data.invitaciones.map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100"
                >
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{inv.email}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <RolBadge rol={inv.rol as Rol} label={t.roles[inv.rol as Rol]?.label ?? inv.rol} />
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {t.expires(new Date(inv.expiresAt).toLocaleDateString(numLocale))}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Invite form — only for admins */}
        {isAdmin && (
          <div className="border-t border-border pt-5">
            {data.canInvite ? (
              <>
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-primary" />
                  {t.inviteMember}
                  {slotsLeft !== null && (
                    <span className="text-xs text-muted-foreground font-normal">
                      {t.slotsAvailable(slotsLeft)}
                    </span>
                  )}
                </p>

                <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    required
                    className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <select
                    value={inviteRol}
                    onChange={(e) => setInviteRol(e.target.value as Rol)}
                    className="px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  >
                    <option value="ADMIN">{t.roles.ADMIN.label}</option>
                    <option value="SALES">{t.roles.SALES.label}</option>
                    <option value="VIEWER">{t.roles.VIEWER.label}</option>
                  </select>
                  <button
                    type="submit"
                    disabled={inviting || !inviteEmail}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {inviting ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                    {inviting ? t.sending : t.invite}
                  </button>
                </form>

                {/* Data sharing checkboxes */}
                <div className="mt-3 p-3 bg-muted/50 rounded-xl border border-border">
                  <p className="text-xs font-semibold text-foreground mb-1">{t.shareExistingTitle}</p>
                  <p className="text-[11px] text-muted-foreground mb-3">{t.shareExistingDesc}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: "clientes", label: t.shareItems.clientes },
                      { key: "productos", label: t.shareItems.productos },
                      { key: "cotizaciones", label: t.shareItems.cotizaciones },
                      { key: "contratos", label: t.shareItems.contratos },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
                        <input
                          type="checkbox"
                          checked={compartirDatos.includes(key)}
                          onChange={() =>
                            setCompartirDatos(prev =>
                              prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
                            )
                          }
                          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                {inviteSuccess && (
                  <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    {t.inviteSuccess}
                  </p>
                )}
                {inviteError && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <X className="w-4 h-4" />
                    {inviteError}
                  </p>
                )}

                <p className="mt-2 text-xs text-muted-foreground">
                  {t.inviteLinkNote}
                </p>
              </>
            ) : (
              <div className="p-4 bg-gradient-to-r from-purple-50 to-primary/5 border border-purple-100 rounded-xl">
                <p className="text-sm font-medium text-foreground mb-1">
                  {t.limitReached(data.maxMiembros, planLabel)}
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  {t.upgradeToAdd(data.plan === "pro" ? "Business" : "Pro")}
                </p>
                <Link
                  href="/configuracion#plan"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {t.viewPlans}
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Role descriptions */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {t.availableRoles}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {(Object.entries(ROL_CONFIG) as [Rol, typeof ROL_CONFIG.ADMIN][]).map(([rol, config]) => {
              const Icon = config.icon;
              return (
                <div key={rol} className={`p-2.5 rounded-lg ${config.bgColor}`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                    <span className={`text-xs font-semibold ${config.color}`}>{t.roles[rol].label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.roles[rol].description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
