// i18n for the Reportes (analytics) page. Month labels and pipeline status names
// come from the API (server-generated) and are translated separately.

interface ReportesStrings {
  pageTitle: string;
  pageDescription: string;
  periods: { "30d": string; "90d": string; "180d": string; "365d": string; all: string };
  refresh: string;
  customize: string;
  visibleWidgets: string;
  widgets: Record<string, string>;
  emptyChart: string;
  kpiTotalRevenue: string;
  kpiConversionRate: string;
  kpiAvgDeal: string;
  kpiPipeline: string;
  kpiOpenQuotes: (n: number) => string;
  kpiWonQuotes: string;
  kpiIssuedQuotes: string;
  kpiLostSub: (n: number) => string;
  chartRevenueTrend: string;
  chartWinLoss: string;
  chartConversionMonthly: string;
  chartFunnel: string;
  chartTopClients: string;
  chartTopProducts: string;
  chartRevByCategory: string;
  chartAvgDealMonthly: string;
  seriesRevenue: string;
  seriesWon: string;
  seriesLost: string;
  seriesConversion: string;
  seriesAvgDeal: string;
  conversionTooltip: (v: number | string) => string;
  funnelCount: (n: number) => string;
  pctOfTotal: (p: number) => string;
  monthlySummary: string;
  thMonth: string;
  thIssued: string;
  thWon: string;
  thLost: string;
  thConversion: string;
  thRevenue: string;
  lastBadge: string;
}

const es: ReportesStrings = {
  pageTitle: "Reportes",
  pageDescription: "Analítica en tiempo real de tu negocio",
  periods: { "30d": "30 días", "90d": "90 días", "180d": "6 meses", "365d": "1 año", all: "Todo" },
  refresh: "Actualizar",
  customize: "Personalizar",
  visibleWidgets: "Widgets visibles",
  widgets: {
    revenue: "Tendencia de Ingresos",
    winloss: "Ganadas vs Perdidas",
    conversion: "Tasa de Conversión",
    funnel: "Pipeline por Estado",
    topClientes: "Top Clientes",
    topProductos: "Top Productos",
    categorias: "Ingresos por Categoría",
  },
  emptyChart: "Sin datos para el período seleccionado",
  kpiTotalRevenue: "Ingresos totales",
  kpiConversionRate: "Tasa de conversión",
  kpiAvgDeal: "Deal medio",
  kpiPipeline: "Pipeline activo",
  kpiOpenQuotes: (n) => `${n} cotizaciones abiertas`,
  kpiWonQuotes: "Cotizaciones ganadas",
  kpiIssuedQuotes: "Cotizaciones emitidas",
  kpiLostSub: (n) => `${n} perdidas`,
  chartRevenueTrend: "Tendencia de Ingresos",
  chartWinLoss: "Ganadas vs Perdidas por mes",
  chartConversionMonthly: "Tasa de conversión mensual",
  chartFunnel: "Pipeline por estado",
  chartTopClients: "Top clientes por ingresos",
  chartTopProducts: "Top productos por ingresos",
  chartRevByCategory: "Ingresos por categoría",
  chartAvgDealMonthly: "Deal medio mensual",
  seriesRevenue: "Ingresos",
  seriesWon: "Ganadas",
  seriesLost: "Perdidas",
  seriesConversion: "Conversión",
  seriesAvgDeal: "Deal medio",
  conversionTooltip: (v) => `${v}% conversión`,
  funnelCount: (n) => `${n} cot.`,
  pctOfTotal: (p) => `${p}% del total`,
  monthlySummary: "Resumen mensual",
  thMonth: "Mes",
  thIssued: "Emitidas",
  thWon: "Ganadas",
  thLost: "Perdidas",
  thConversion: "Conversión",
  thRevenue: "Ingresos",
  lastBadge: "Último",
};

const en: ReportesStrings = {
  pageTitle: "Reports",
  pageDescription: "Real-time analytics for your business",
  periods: { "30d": "30 days", "90d": "90 days", "180d": "6 months", "365d": "1 year", all: "All" },
  refresh: "Refresh",
  customize: "Customize",
  visibleWidgets: "Visible widgets",
  widgets: {
    revenue: "Revenue Trend",
    winloss: "Won vs Lost",
    conversion: "Conversion Rate",
    funnel: "Pipeline by Status",
    topClientes: "Top Clients",
    topProductos: "Top Products",
    categorias: "Revenue by Category",
  },
  emptyChart: "No data for the selected period",
  kpiTotalRevenue: "Total revenue",
  kpiConversionRate: "Conversion rate",
  kpiAvgDeal: "Average deal",
  kpiPipeline: "Active pipeline",
  kpiOpenQuotes: (n) => `${n} open quotes`,
  kpiWonQuotes: "Quotes won",
  kpiIssuedQuotes: "Quotes issued",
  kpiLostSub: (n) => `${n} lost`,
  chartRevenueTrend: "Revenue Trend",
  chartWinLoss: "Won vs Lost by month",
  chartConversionMonthly: "Monthly conversion rate",
  chartFunnel: "Pipeline by status",
  chartTopClients: "Top clients by revenue",
  chartTopProducts: "Top products by revenue",
  chartRevByCategory: "Revenue by category",
  chartAvgDealMonthly: "Monthly average deal",
  seriesRevenue: "Revenue",
  seriesWon: "Won",
  seriesLost: "Lost",
  seriesConversion: "Conversion",
  seriesAvgDeal: "Average deal",
  conversionTooltip: (v) => `${v}% conversion`,
  funnelCount: (n) => `${n} quotes`,
  pctOfTotal: (p) => `${p}% of total`,
  monthlySummary: "Monthly summary",
  thMonth: "Month",
  thIssued: "Issued",
  thWon: "Won",
  thLost: "Lost",
  thConversion: "Conversion",
  thRevenue: "Revenue",
  lastBadge: "Latest",
};

export const REPORTES_STRINGS = { es, en };
