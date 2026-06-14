import type { Comparacion } from "./comparaciones";

// English comparison pages. Mirrors src/data/comparaciones.ts. Routes:
// /en/compare + /en/compare/[slug]. ES↔EN pairing via ES_TO_EN_COMPARACION.
export const comparacionesEn: Comparacion[] = [
  {
    slug: "dealforge-vs-holded",
    competidor: "Holded",
    titulo: "DealForge vs Holded — CPQ & invoicing comparison for small businesses",
    descripcion:
      "Compare DealForge and Holded: two different approaches to managing quotes and sales. Find out which fits your sales process better.",
    heroSubtitle:
      "Holded is a solid Spanish ERP for invoicing and accounting. DealForge is a CPQ specialised in speeding up your quoting process with AI. If your main challenge is creating professional quotes quickly, here we explain the differences.",
    ventajasDealForge: [
      {
        titulo: "Native CPQ with a product configurator",
        desc: "DealForge is built from the ground up as a CPQ tool. You can configure products with variants, business rules and tiered discounts. Holded handles products well for invoicing, but doesn't include an advanced configurator for complex quotes.",
      },
      {
        titulo: "AI assistant for quoting",
        desc: "DealForge includes an artificial-intelligence assistant that suggests products, detects low margins and auto-fills client data. Holded offers no AI functionality in its quotes module.",
      },
      {
        titulo: "Quote approval flows",
        desc: "Configure approval rules by amount, discount or client type. Quotes that need review are routed automatically to the right person. In Holded, quote approval is a manual process.",
      },
      {
        titulo: "Built-in electronic signature",
        desc: "Your clients can sign quotes directly from the link they receive, with no external tools. Holded requires integrating a separate signature service to close quotes.",
      },
      {
        titulo: "Visual sales pipeline",
        desc: "View all your opportunities in a sales funnel with customisable stages. DealForge shows you the close probability and pipeline value. Holded offers a basic CRM but no CPQ funnel view.",
      },
    ],
    limitacionesCompetidor: [
      {
        titulo: "Not a specialised CPQ",
        desc: "Holded is a generalist ERP covering invoicing, accounting, projects and inventory. Its quotes module works well for simple cases, but isn't designed for complex product configurations or pricing rules.",
      },
      {
        titulo: "No artificial-intelligence assistant",
        desc: "Holded includes no AI features to help create quotes or analyse the sales team's performance.",
      },
      {
        titulo: "Manual approvals",
        desc: "The quote-review process in Holded relies on manual coordination between team members, which can lengthen response times to the client.",
      },
      {
        titulo: "External electronic signature",
        desc: "To get the client's signature on a Holded quote you need to use an external service, which adds steps to the closing process.",
      },
    ],
    tablaComparativa: [
      { feature: "CPQ quotes", dealforge: true, competidor: "Basic" },
      { feature: "Product configurator", dealforge: true, competidor: false },
      { feature: "Business rules and discounts", dealforge: true, competidor: "Limited" },
      { feature: "AI assistant", dealforge: true, competidor: false },
      { feature: "Approval flows", dealforge: true, competidor: false },
      { feature: "Built-in electronic signature", dealforge: true, competidor: false },
      { feature: "Visual sales pipeline", dealforge: true, competidor: "Basic" },
      { feature: "Invoicing", dealforge: "Coming soon", competidor: true },
      { feature: "Accounting", dealforge: false, competidor: true },
      { feature: "Inventory management", dealforge: false, competidor: true },
      { feature: "Customisable professional PDFs", dealforge: true, competidor: "Limited" },
      { feature: "Quote open tracking", dealforge: true, competidor: false },
    ],
    veredicto:
      "Holded is an excellent choice if you need a complete ERP for invoicing, accounting and inventory. However, if your priority is creating professional quotes quickly, with advanced product configuration, automatic approvals and electronic signature, DealForge is the more suitable tool. Many small businesses use both: DealForge for the sales process and Holded for financial management.",
    keywords: [
      "DealForge vs Holded",
      "Holded CPQ comparison",
      "Holded alternative for quotes",
      "Holded quotes limitations",
      "CPQ for small businesses",
      "quoting software vs ERP",
    ],
  },
  {
    slug: "dealforge-vs-hubspot",
    competidor: "HubSpot",
    titulo: "DealForge vs HubSpot — CPQ comparison for small businesses and sales teams",
    descripcion:
      "Compare DealForge and HubSpot Sales Hub: price, CPQ features and ease of use. Find out which offers better value for your team.",
    heroSubtitle:
      "HubSpot is a world-renowned CRM with a quotes module included in Sales Hub. DealForge is a CPQ designed specifically for small businesses that want speed and simplicity. If your team needs to quote fast without paying for features it won't use, this comparison will help you decide.",
    ventajasDealForge: [
      {
        titulo: "Up to 10x lower price",
        desc: "HubSpot's quotes module requires Sales Hub Professional, which starts at USD 450/month (5 users). DealForge offers complete CPQ features from a fraction of that price, ideal for small businesses on a tight budget.",
      },
      {
        titulo: "Set up in minutes, not weeks",
        desc: "DealForge is ready to use in under 30 minutes. HubSpot Sales Hub Professional requires advanced setup, team training and, in many cases, external consulting to make the most of its features.",
      },
      {
        titulo: "Native CPQ with AI",
        desc: "DealForge is a CPQ from its very architecture. The AI assistant suggests products, validates margins and speeds up quote creation. In HubSpot, quotes are an extension of the CRM, not the product's focus.",
      },
      {
        titulo: "Designed for small businesses",
        desc: "Interface, support and documentation focused on the needs of small businesses, with currency, tax and billing formats that adapt to your market. HubSpot offers localisation, but its ecosystem is geared towards large organisations.",
      },
      {
        titulo: "No unnecessary complexity",
        desc: "DealForge focuses on what a small-business sales team needs: quote, follow up and close. You don't have to navigate dozens of modules (marketing, service, operations) to reach what you actually use.",
      },
    ],
    limitacionesCompetidor: [
      {
        titulo: "High price for small businesses",
        desc: "HubSpot's free plan includes very basic quotes. To access CPQ features like approvals, automation and products with variants, you need Sales Hub Professional (from USD 450/month) or Enterprise (from USD 1,500/month).",
      },
      {
        titulo: "Steep learning curve",
        desc: "HubSpot is a powerful but extensive platform. Configuring pipelines, approval workflows and quote customisation takes time and, in many cases, a dedicated administrator.",
      },
      {
        titulo: "Quotes as a secondary function",
        desc: "In HubSpot, the quotes module is complementary to the CRM. The advanced CPQ features (pricing rules, configurator) aren't at the level of a specialised tool.",
      },
      {
        titulo: "Hidden costs by contacts",
        desc: "HubSpot charges based on the number of marketing contacts. As your database grows, the price increases significantly — something small businesses often don't anticipate when signing up.",
      },
    ],
    tablaComparativa: [
      { feature: "CPQ quotes", dealforge: true, competidor: true },
      { feature: "AI quoting assistant", dealforge: true, competidor: "Limited" },
      { feature: "Product configurator", dealforge: true, competidor: "Higher plans only" },
      { feature: "Approval flows", dealforge: true, competidor: "Professional+ only" },
      { feature: "Built-in electronic signature", dealforge: true, competidor: "Professional+ only" },
      { feature: "Price from (month)", dealforge: "From €29", competidor: "From USD 450" },
      { feature: "Initial setup", dealforge: "30 minutes", competidor: "Weeks" },
      { feature: "Full CRM", dealforge: "Basic", competidor: true },
      { feature: "Marketing automation", dealforge: false, competidor: true },
      { feature: "Customisable professional PDFs", dealforge: true, competidor: true },
      { feature: "Quote open tracking", dealforge: true, competidor: true },
    ],
    veredicto:
      "HubSpot is an excellent platform for companies that need an all-in-one CRM with marketing, sales and service in a single ecosystem. If your company already uses HubSpot and has the budget for Sales Hub Professional, its quotes module may be enough. However, if you're a small business looking for a powerful, easy-to-use CPQ at an accessible price, DealForge lets you quote professionally from day one without the complexity or cost of an enterprise platform.",
    keywords: [
      "DealForge vs HubSpot",
      "HubSpot CPQ alternative",
      "HubSpot Sales Hub price",
      "cheap CPQ for small business",
      "HubSpot quotes limitations",
      "HubSpot CRM quotes comparison",
    ],
  },
  {
    slug: "dealforge-vs-excel",
    competidor: "Excel / Spreadsheets",
    titulo: "DealForge vs Excel — Why a CPQ beats spreadsheets for quoting",
    descripcion:
      "Compare DealForge with Excel for creating quotes. Discover how a CPQ eliminates errors, saves time and professionalises your sales process.",
    heroSubtitle:
      "Excel is the world's most-used tool for creating quotes, and it makes sense: it's flexible, familiar and free if you already have Office. But when your team grows or quote volume increases, spreadsheets become a bottleneck. Here we compare both approaches.",
    ventajasDealForge: [
      {
        titulo: "Zero errors in prices and calculations",
        desc: "In DealForge, prices, discounts and taxes are calculated automatically based on the rules you configure. In Excel, a broken formula or an overwritten cell can create an error no one notices until the client points it out.",
      },
      {
        titulo: "Professional quotes in seconds",
        desc: "Select a client, add products and generate a professional PDF with your logo and brand colours in one click. In Excel, formatting each quote takes time and the result varies depending on who prepares it.",
      },
      {
        titulo: "Automatic follow-up",
        desc: "DealForge tells you when the client opens the quote, how long they review it and which sections they look at. With Excel, you send the file by email and know nothing until the client replies (if they reply).",
      },
      {
        titulo: "History and instant search",
        desc: "Find any quote by client, date, amount or status in seconds. With Excel, you depend on each salesperson's folder organisation and on no one renaming or moving the file.",
      },
      {
        titulo: "Built-in electronic signature",
        desc: "The client signs directly from the quote link. No printing, scanning or external tools. With Excel, the signing process requires several extra manual steps.",
      },
      {
        titulo: "Team collaboration without conflicts",
        desc: "Several salespeople can work simultaneously without stepping on each other's work. In Excel, shared files create version conflicts and it's hard to know which is the most recent quote.",
      },
    ],
    limitacionesCompetidor: [
      {
        titulo: "Prone to human error",
        desc: "A widely cited study estimates that 88% of spreadsheets contain at least one error. In quotes, a pricing error can mean losing money on every sale or losing the client's trust.",
      },
      {
        titulo: "No client tracking",
        desc: "Once you send the Excel file by email, you lose all visibility. You don't know whether the client opened it, forwarded it to their boss or lost it in their inbox.",
      },
      {
        titulo: "An unprofessional image",
        desc: "An Excel quote, however well formatted, doesn't convey the same image as a professionally designed PDF with your branding. The first impression counts in sales.",
      },
      {
        titulo: "No centralised product catalogue",
        desc: "Each salesperson keeps their own product and price list. When rates change, updating all the files is a slow process prone to omissions.",
      },
      {
        titulo: "No automation or business rules",
        desc: "In Excel you can't configure rules like maximum discounts per salesperson, mandatory products or low-margin alerts. Everything depends on each person's individual discipline.",
      },
    ],
    tablaComparativa: [
      { feature: "Quote creation", dealforge: "AI-guided", competidor: "Manual" },
      { feature: "Automatic price calculation", dealforge: true, competidor: "With manual formulas" },
      { feature: "Centralised product catalogue", dealforge: true, competidor: false },
      { feature: "Professional PDFs", dealforge: "Automatic", competidor: "Manual" },
      { feature: "Open tracking", dealforge: true, competidor: false },
      { feature: "Electronic signature", dealforge: true, competidor: false },
      { feature: "Approval flows", dealforge: true, competidor: false },
      { feature: "Quote history", dealforge: "Automatic", competidor: "Depends on the salesperson" },
      { feature: "Sales pipeline", dealforge: true, competidor: false },
      { feature: "Team collaboration", dealforge: true, competidor: "Version conflicts" },
      { feature: "Price", dealforge: "From €29/month", competidor: "Included in Office" },
      { feature: "Learning curve", dealforge: "30 minutes", competidor: "You already know it" },
    ],
    veredicto:
      "Excel is an extraordinary tool for many tasks, and it makes sense that it's the starting point for creating quotes. However, when quote volume grows, when you need to control discounts and margins, or when you want a more professional image, a CPQ like DealForge makes the difference. The investment pays off with the first quotes that close faster and error-free. If you quote with Excel today and it works for you, great. But if you feel you're losing time, making mistakes or unable to follow up on your proposals, it's time to make the leap.",
    keywords: [
      "DealForge vs Excel",
      "problems quoting in Excel",
      "quoting software vs Excel",
      "Excel alternative for quotes",
      "CPQ vs spreadsheets",
      "stop quoting with Excel",
    ],
  },
];

export function getComparacionEn(slug: string): Comparacion | undefined {
  return comparacionesEn.find((c) => c.slug === slug);
}

// All three slugs are shared between ES and EN, but keep an explicit map for
// clarity and future-proofing (used for hreflang pairing).
export const ES_TO_EN_COMPARACION: Record<string, string> = {
  "dealforge-vs-holded": "dealforge-vs-holded",
  "dealforge-vs-hubspot": "dealforge-vs-hubspot",
  "dealforge-vs-excel": "dealforge-vs-excel",
};
