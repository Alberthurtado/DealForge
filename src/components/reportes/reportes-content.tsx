"use client";

import { useState, useEffect, useCallback } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  TrendingUp, TrendingDown, DollarSign, FileText, Trophy, Target,
  BarChart2, PieChart as PieChartIcon, Users, Package,
  SlidersHorizontal, Eye, EyeOff, Loader2, RefreshCw, Minus,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface KpisData {
  totalIngresos: number;
  totalCotizaciones: number;
  totalGanadas: number;
  totalPerdidas: number;
  totalPipeline: number;
  avgDealSize: number;
  tasaConversion: number;
  ingresosTrend: number | null;
  conversionTrend: number | null;
}

interface MonthlyData {
  mes: string;
  ingresos: number;
  ganadas: number;
  perdidas: number;
  cotizaciones: number;
  avgDeal: number;
  tasa: number | null;
}

interface FunnelItem {
  estado: string;
  count: number;
  valor: number;
  pct: number;
  width: number;
}

interface ClienteData { nombre: string; ingresos: number; ganadas: number }
interface ProductoData { nombre: string; veces: number; ingresos: number; categoria: string }
interface CategoriaData { categoria: string; ingresos: number }

interface ReportesData {
  kpis: KpisData;
  monthly: MonthlyData[];
  funnel: FunnelItem[];
  topClientes: ClienteData[];
  topProductos: ProductoData[];
  porCategoria: CategoriaData[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PERIODS = [
  { id: "30d", label: "30 días" },
  { id: "90d", label: "90 días" },
  { id: "180d", label: "6 meses" },
  { id: "365d", label: "1 año" },
  { id: "all", label: "Todo" },
] as const;

type PeriodId = typeof PERIODS[number]["id"];

const PIE_COLORS = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#f97316", "#ef4444", "#ec4899"];

const FUNNEL_COLORS = [
  "bg-slate-400", "bg-blue-500", "bg-indigo-500", "bg-violet-500", "bg-emerald-500",
];

const WIDGETS = [
  { id: "revenue",      label: "Tendencia de Ingresos",   icon: TrendingUp },
  { id: "winloss",      label: "Ganadas vs Perdidas",      icon: BarChart2 },
  { id: "conversion",   label: "Tasa de Conversión",       icon: Target },
  { id: "funnel",       label: "Pipeline por Estado",      icon: BarChart2 },
  { id: "topClientes",  label: "Top Clientes",             icon: Users },
  { id: "topProductos", label: "Top Productos",            icon: Package },
  { id: "categorias",   label: "Ingresos por Categoría",   icon: PieChartIcon },
] as const;

const DEFAULT_VISIBILITY: Record<string, boolean> = {
  revenue: true, winloss: true, conversion: true, funnel: true,
  topClientes: true, topProductos: true, categorias: true,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function TrendBadge({ value, suffix = "%" }: { value: number | null; suffix?: string }) {
  if (value === null) return null;
  const positive = value >= 0;
  return (
    <span className={cn(
      "inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full",
      positive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
    )}>
      {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {positive ? "+" : ""}{value.toFixed(1)}{suffix}
    </span>
  );
}

function EmptyChart({ height = 200 }: { height?: number }) {
  return (
    <div className={`flex flex-col items-center justify-center text-muted-foreground`} style={{ height }}>
      <BarChart2 className="w-8 h-8 mb-2 opacity-20" />
      <p className="text-sm">Sin datos para el período seleccionado</p>
    </div>
  );
}

function CardHeader({ title, icon: Icon }: { title: string; icon: React.ElementType }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className="p-1.5 rounded-lg bg-muted">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CurrencyTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-xl shadow-lg p-3 text-xs min-w-[140px]">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      {payload.map((entry: { name: string; value: number; color: string }, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            {entry.name}
          </span>
          <span className="font-medium text-foreground">{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CountTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-xl shadow-lg p-3 text-xs min-w-[120px]">
      <p className="font-semibold text-foreground mb-2">{label}</p>
      {payload.map((entry: { name: string; value: number; color: string }, i: number) => (
        <div key={i} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            {entry.name}
          </span>
          <span className="font-medium text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

interface KpiCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  trend?: number | null;
  trendSuffix?: string;
  sub?: string;
}

function KpiCard({ label, value, icon: Icon, color, bgColor, trend, trendSuffix, sub }: KpiCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className={cn("p-2.5 rounded-xl", bgColor)}>
          <Icon className={cn("w-5 h-5", color)} />
        </div>
        {trend !== undefined && <TrendBadge value={trend ?? null} suffix={trendSuffix} />}
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground leading-none mb-1">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
        {sub && <p className="text-[11px] text-muted-foreground/70 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse bg-muted rounded-xl", className)} />;
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-28" />)}
      </div>
      <Skeleton className="h-72" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
      <Skeleton className="h-48" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ReportesContent() {
  const [period, setPeriod] = useState<PeriodId>("90d");
  const [data, setData] = useState<ReportesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWidgets, setShowWidgets] = useState(false);
  const [visible, setVisible] = useState<Record<string, boolean>>(DEFAULT_VISIBILITY);

  // Load widget prefs from localStorage (after mount to avoid hydration mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("df-reportes-widgets");
      if (stored) setVisible({ ...DEFAULT_VISIBILITY, ...JSON.parse(stored) });
    } catch { /* noop */ }
  }, []);

  const toggleWidget = useCallback((id: string) => {
    setVisible(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try { localStorage.setItem("df-reportes-widgets", JSON.stringify(next)); } catch { /* noop */ }
      return next;
    });
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reportes?period=${period}`);
      if (res.ok) setData(await res.json());
    } catch { /* noop */ } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const kpis = data?.kpis;

  return (
    <div className="p-6 space-y-6">
      {/* ── Controls ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Period tabs */}
        <div className="flex items-center bg-muted/60 rounded-xl p-1 gap-0.5">
          {PERIODS.map(p => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={cn(
                "px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all",
                period === p.id
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
            Actualizar
          </button>

          <div className="relative">
            <button
              onClick={() => setShowWidgets(!showWidgets)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border rounded-lg transition-colors",
                showWidgets
                  ? "border-primary/40 bg-primary/5 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Personalizar
            </button>

            {showWidgets && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-border rounded-2xl shadow-xl z-50 p-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                  Widgets visibles
                </p>
                <div className="space-y-0.5">
                  {WIDGETS.map(w => (
                    <button
                      key={w.id}
                      onClick={() => toggleWidget(w.id)}
                      className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                    >
                      <span className="flex items-center gap-2 text-foreground">
                        <w.icon className="w-4 h-4 text-muted-foreground" />
                        {w.label}
                      </span>
                      {visible[w.id]
                        ? <Eye className="w-4 h-4 text-primary" />
                        : <EyeOff className="w-4 h-4 text-muted-foreground/40" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && <LoadingSkeleton />}

      {!loading && data && (
        <>
          {/* ── KPI Row ── */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <KpiCard
              label="Ingresos totales"
              value={formatCurrency(kpis!.totalIngresos)}
              icon={DollarSign}
              color="text-indigo-600"
              bgColor="bg-indigo-50"
              trend={kpis!.ingresosTrend}
              trendSuffix="%"
            />
            <KpiCard
              label="Tasa de conversión"
              value={`${kpis!.tasaConversion.toFixed(1)}%`}
              icon={Target}
              color="text-emerald-600"
              bgColor="bg-emerald-50"
              trend={kpis!.conversionTrend}
              trendSuffix=" pp"
            />
            <KpiCard
              label="Deal medio"
              value={formatCurrency(kpis!.avgDealSize)}
              icon={TrendingUp}
              color="text-violet-600"
              bgColor="bg-violet-50"
            />
            <KpiCard
              label="Pipeline activo"
              value={formatCurrency(kpis!.totalPipeline)}
              icon={BarChart2}
              color="text-amber-600"
              bgColor="bg-amber-50"
              sub={`${kpis!.totalCotizaciones - kpis!.totalGanadas - kpis!.totalPerdidas} cotizaciones abiertas`}
            />
            <KpiCard
              label="Cotizaciones ganadas"
              value={String(kpis!.totalGanadas)}
              icon={Trophy}
              color="text-green-600"
              bgColor="bg-green-50"
            />
            <KpiCard
              label="Cotizaciones emitidas"
              value={String(kpis!.totalCotizaciones)}
              icon={FileText}
              color="text-blue-600"
              bgColor="bg-blue-50"
              sub={`${kpis!.totalPerdidas} perdidas`}
            />
          </div>

          {/* ── Revenue Trend ── */}
          {visible.revenue && (
            <div className="bg-white rounded-2xl border border-border p-6">
              <CardHeader title="Tendencia de Ingresos" icon={TrendingUp} />
              {data.monthly.length < 2 ? <EmptyChart /> : (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.monthly} margin={{ top: 5, right: 10, bottom: 0, left: 10 }}>
                      <defs>
                        <linearGradient id="gradIngresos" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gradPipeline" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.12} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false}
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <Tooltip content={<CurrencyTooltip />} />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke="#6366f1" strokeWidth={2.5}
                        fill="url(#gradIngresos)" dot={false} activeDot={{ r: 5, fill: "#6366f1" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          )}

          {/* ── Win/Loss + Conversion ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {visible.winloss && (
              <div className="bg-white rounded-2xl border border-border p-6">
                <CardHeader title="Ganadas vs Perdidas por mes" icon={BarChart2} />
                {data.monthly.length === 0 ? <EmptyChart /> : (
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.monthly} margin={{ top: 5, right: 10, bottom: 0, left: -10 }} barSize={14}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} allowDecimals={false} />
                        <Tooltip content={<CountTooltip />} />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        <Bar dataKey="ganadas" name="Ganadas" fill="#10b981" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="perdidas" name="Perdidas" fill="#f87171" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}

            {visible.conversion && (
              <div className="bg-white rounded-2xl border border-border p-6">
                <CardHeader title="Tasa de conversión mensual" icon={Target} />
                {data.monthly.filter(m => m.tasa !== null).length < 2 ? <EmptyChart /> : (
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.monthly} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false}
                          domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                        <Tooltip
                          content={({ active, payload, label }) =>
                            active && payload?.length ? (
                              <div className="bg-white border border-border rounded-xl shadow-lg p-3 text-xs">
                                <p className="font-semibold mb-1">{label}</p>
                                <p className="text-cyan-600 font-medium">{payload[0].value}% conversión</p>
                              </div>
                            ) : null
                          }
                        />
                        <Line type="monotone" dataKey="tasa" name="Conversión" stroke="#06b6d4" strokeWidth={2.5}
                          dot={{ fill: "#06b6d4", r: 3 }} activeDot={{ r: 5 }} connectNulls={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Pipeline Funnel ── */}
          {visible.funnel && (
            <div className="bg-white rounded-2xl border border-border p-6">
              <CardHeader title="Pipeline por estado" icon={BarChart2} />
              {data.funnel.every(f => f.count === 0) ? <EmptyChart height={160} /> : (
                <div className="space-y-3">
                  {data.funnel.map((item, i) => (
                    <div key={item.estado} className="flex items-center gap-4">
                      <div className="w-28 text-sm text-muted-foreground text-right shrink-0">{item.estado}</div>
                      <div className="flex-1 bg-muted/50 rounded-full h-8 overflow-hidden">
                        <div
                          className={cn("h-full rounded-full flex items-center px-3 transition-all duration-700", FUNNEL_COLORS[i])}
                          style={{ width: `${Math.max(item.width, item.count > 0 ? 3 : 0)}%` }}
                        >
                          {item.count > 0 && (
                            <span className="text-white text-xs font-semibold whitespace-nowrap">
                              {item.count} cot.
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-32 text-right shrink-0">
                        <p className="text-sm font-semibold text-foreground">{formatCurrency(item.valor)}</p>
                        <p className="text-[11px] text-muted-foreground">{item.pct}% del total</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Top Clients + Top Products ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {visible.topClientes && (
              <div className="bg-white rounded-2xl border border-border p-6">
                <CardHeader title="Top clientes por ingresos" icon={Users} />
                {data.topClientes.length === 0 ? <EmptyChart height={160} /> : (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={data.topClientes.slice(0, 6).map(c => ({
                          ...c,
                          nombreCorto: c.nombre.length > 20 ? c.nombre.slice(0, 18) + "…" : c.nombre,
                        }))}
                        margin={{ top: 0, right: 10, bottom: 0, left: 60 }}
                        barSize={16}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false}
                          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                        <YAxis type="category" dataKey="nombreCorto" tick={{ fontSize: 11, fill: "#64748b" }}
                          axisLine={false} tickLine={false} width={60} />
                        <Tooltip content={<CurrencyTooltip />} />
                        <Bar dataKey="ingresos" name="Ingresos" fill="#6366f1" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}

            {visible.topProductos && (
              <div className="bg-white rounded-2xl border border-border p-6">
                <CardHeader title="Top productos por ingresos" icon={Package} />
                {data.topProductos.length === 0 ? <EmptyChart height={160} /> : (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={data.topProductos.slice(0, 6).map(p => ({
                          ...p,
                          nombreCorto: p.nombre.length > 20 ? p.nombre.slice(0, 18) + "…" : p.nombre,
                        }))}
                        margin={{ top: 0, right: 10, bottom: 0, left: 60 }}
                        barSize={16}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                        <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false}
                          tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                        <YAxis type="category" dataKey="nombreCorto" tick={{ fontSize: 11, fill: "#64748b" }}
                          axisLine={false} tickLine={false} width={60} />
                        <Tooltip content={<CurrencyTooltip />} />
                        <Bar dataKey="ingresos" name="Ingresos" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Revenue by Category + Avg Deal trend ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {visible.categorias && (
              <div className="bg-white rounded-2xl border border-border p-6">
                <CardHeader title="Ingresos por categoría" icon={PieChartIcon} />
                {data.porCategoria.length === 0 ? <EmptyChart height={200} /> : (
                  <div className="flex items-center gap-6">
                    <div className="h-52 w-52 shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={data.porCategoria.slice(0, 7)}
                            dataKey="ingresos"
                            nameKey="categoria"
                            cx="50%"
                            cy="50%"
                            innerRadius={52}
                            outerRadius={80}
                            paddingAngle={3}
                          >
                            {data.porCategoria.slice(0, 7).map((_, i) => (
                              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            content={({ active, payload }) =>
                              active && payload?.length ? (
                                <div className="bg-white border border-border rounded-xl shadow-lg p-3 text-xs">
                                  <p className="font-semibold mb-1">{payload[0].name}</p>
                                  <p className="text-indigo-600 font-medium">{formatCurrency(payload[0].value as number)}</p>
                                </div>
                              ) : null
                            }
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex-1 space-y-2 min-w-0">
                      {data.porCategoria.slice(0, 7).map((cat, i) => {
                        const total = data.porCategoria.reduce((s, c) => s + c.ingresos, 0);
                        const pct = total > 0 ? Math.round((cat.ingresos / total) * 100) : 0;
                        return (
                          <div key={cat.categoria} className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                            <span className="text-xs text-muted-foreground truncate flex-1">{cat.categoria}</span>
                            <span className="text-xs font-semibold text-foreground shrink-0">{pct}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Avg deal size trend */}
            <div className="bg-white rounded-2xl border border-border p-6">
              <CardHeader title="Deal medio mensual" icon={TrendingUp} />
              {data.monthly.filter(m => m.avgDeal > 0).length < 2 ? <EmptyChart height={200} /> : (
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.monthly} margin={{ top: 5, right: 10, bottom: 0, left: 10 }}>
                      <defs>
                        <linearGradient id="gradAvgDeal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false}
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                      <Tooltip content={<CurrencyTooltip />} />
                      <Area type="monotone" dataKey="avgDeal" name="Deal medio" stroke="#8b5cf6" strokeWidth={2.5}
                        fill="url(#gradAvgDeal)" dot={false} activeDot={{ r: 5, fill: "#8b5cf6" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>

          {/* ── Bottom summary table ── */}
          {data.monthly.length > 0 && (
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">Resumen mensual</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mes</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Emitidas</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ganadas</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Perdidas</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Conversión</th>
                      <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ingresos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...data.monthly].reverse().map((m, i) => (
                      <tr key={m.mes} className={cn("border-b border-border last:border-0", i === 0 && "bg-indigo-50/30")}>
                        <td className="px-6 py-3 font-medium text-foreground">
                          {m.mes} {i === 0 && <span className="ml-2 text-[10px] font-bold text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-full">Último</span>}
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground">{m.cotizaciones}</td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-emerald-600 font-medium">{m.ganadas}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-red-500">{m.perdidas}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {m.tasa !== null ? (
                            <span className={cn(
                              "font-medium",
                              m.tasa >= 50 ? "text-emerald-600" : m.tasa >= 25 ? "text-amber-600" : "text-red-500"
                            )}>
                              {m.tasa}%
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="px-6 py-3 text-right font-semibold text-foreground">
                          {formatCurrency(m.ingresos)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Close widget panel on outside click */}
      {showWidgets && (
        <div className="fixed inset-0 z-40" onClick={() => setShowWidgets(false)} />
      )}
    </div>
  );
}
