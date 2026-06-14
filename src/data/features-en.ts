import type { Feature } from "./features";

// English feature landing pages. Mirrors src/data/features.ts with English SEO
// slugs. Added incrementally; /en/features/[slug] generates pages only for the
// slugs present here. ES↔EN pairing via ES_TO_EN_FEATURE (used for hreflang).
export const featuresEn: Feature[] = [
  {
    slug: "customer-management",
    nombre: "Customer Management",
    titulo: "Customer Management for Small Business | CRM built into your CPQ — DealForge",
    descripcion:
      "Centralise contacts, companies and quote history in one place. Manage your client base without leaving DealForge and close more sales.",
    icono: "Users",
    color: "#3a9bb5",
    heroSubtitle:
      "Stop hunting for client details across spreadsheets and emails. All your contact and company information, connected directly to your quotes.",
    problema: {
      titulo: "Why do you need a CRM built into your CPQ?",
      puntos: [
        "Your client data is scattered across Excel, Gmail and sticky notes. When a salesperson leaves, their book of business disappears with them.",
        "You can't see a client's quote history without opening five different tools, which slows down every negotiation.",
        "You constantly duplicate contacts because there's no single source of truth, and you end up sending quotes with out-of-date details.",
      ],
    },
    solucion: {
      titulo: "How DealForge centralises your client base",
      puntos: [
        {
          titulo: "A unified client record",
          desc: "Each client has a record with contact details, company, billing address and internal notes. From that same record you access all their past and active quotes without changing screens.",
        },
        {
          titulo: "Complete interaction history",
          desc: "Every quote sent, email opened and document signed is automatically recorded on the client's timeline. Any team member can pick up a negotiation with full context.",
        },
        {
          titulo: "Bulk import from Excel or CSV",
          desc: "Upload your current client base in minutes. DealForge detects duplicates, normalises company names and validates tax IDs and email formats automatically.",
        },
        {
          titulo: "Segmentation by tags",
          desc: "Classify clients by industry, size, region or any criteria you need. Filter your base in seconds for targeted campaigns or sales-concentration analysis.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Import or create your contacts",
        desc: "Upload a CSV with your current base or create contacts manually. The system validates tax ID, email and phone on the spot.",
      },
      {
        num: "2",
        titulo: "Link contacts to companies",
        desc: "Connect people to their companies and define roles (decision-maker, influencer, user). When you quote, select the contact and the billing details fill in automatically.",
      },
      {
        num: "3",
        titulo: "Check the history from any quote",
        desc: "When you open or create a quote, immediately see how much that client has bought, what discounts they've received and what their last objections were.",
      },
    ],
    faqs: [
      {
        pregunta: "Can I import clients from my current CRM?",
        respuesta:
          "Yes. DealForge accepts CSV and Excel files. If you use HubSpot or Pipedrive, you can export your contacts from those platforms and upload them directly. The column mapper lets you assign each field regardless of what it's called in your original file.",
      },
      {
        pregunta: "What if I have the same client registered twice?",
        respuesta:
          "The duplicate detector compares tax ID, email and company name. When it finds matches, it shows you both records side by side so you can decide which to keep or whether to merge them, preserving the history of both.",
      },
      {
        pregunta: "Can I restrict which salespeople see which clients?",
        respuesta:
          "Yes. On the Pro plan you can assign clients to specific salespeople and enable restricted visibility. Each salesperson only sees their assigned base, while managers see everything.",
      },
      {
        pregunta: "Does the client module replace a full CRM?",
        respuesta:
          "DealForge doesn't aim to replace a sales CRM with a full pipeline. What it offers is contact management optimised for quoting: billing details, price history, agreed terms and documents. If you already use a CRM, the two complement each other.",
      },
    ],
    keywords: [
      "customer management small business",
      "CRM for quotes",
      "client database",
      "client record CPQ",
      "client quote history",
      "import clients CSV",
      "company client directory",
    ],
    plan: "Starter",
  },
  {
    slug: "product-catalog",
    nombre: "Product Catalogue",
    titulo: "Product & Service Catalogue | Centralised pricing — DealForge",
    descripcion:
      "Organise products, services and prices in a centralised catalogue. Avoid pricing errors and speed up quote creation for your sales team.",
    icono: "Package",
    color: "#6366f1",
    heroSubtitle:
      "A single catalogue where your team always finds the right product at the right price. No out-of-date price lists or manual errors.",
    problema: {
      titulo: "Why do you need a centralised catalogue?",
      puntos: [
        "Each salesperson keeps their own price list in Excel and no one knows which is the current version. A wrongly applied discount can cost you the margin on a whole deal.",
        "Adding a new product to a quote means searching through supplier PDFs, confirming prices over chat and copying data by hand.",
        "You have no visibility into which products are quoted most, which have low margins or which haven't moved in months.",
      ],
    },
    solucion: {
      titulo: "How DealForge organises your catalogue",
      puntos: [
        {
          titulo: "Hierarchical catalogue with categories",
          desc: "Organise products and services into categories and subcategories. Define SKU, unit of measure, base price, cost and target margin. Salespeople search and add items to quotes in seconds.",
        },
        {
          titulo: "Price lists by segment",
          desc: "Create differentiated price lists by client type, volume or region. When you select a client, the system automatically applies the corresponding list with no manual intervention.",
        },
        {
          titulo: "Configurable products",
          desc: "Define variants (size, colour, finish) and add-on options. The salesperson selects configurations from a guided form instead of typing descriptions by hand.",
        },
        {
          titulo: "Price version control",
          desc: "When you update a price, existing quotes keep the original price. Only new quotes use the updated price, avoiding conflicts with offers you've already sent.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Load your catalogue",
        desc: "Import products from Excel or create them manually. Define price, cost, SKU, description and category for each item.",
      },
      {
        num: "2",
        titulo: "Set up price lists",
        desc: "Create lists by client segment (distributor, wholesaler, general public) with specific prices and discounts for each one.",
      },
      {
        num: "3",
        titulo: "Quote from the catalogue",
        desc: "When creating a quote, search products by name or SKU, select quantities and the price is calculated automatically based on the client and the active list.",
      },
    ],
    faqs: [
      {
        pregunta: "How many products can I load?",
        respuesta:
          "There's no product limit on any plan. We've tested catalogues of more than 50,000 SKUs with no performance issues. The search indexes name, SKU and description for instant results.",
      },
      {
        pregunta: "Can I handle products with variable pricing?",
        respuesta:
          "Yes. You can define products with an open price where the salesperson enters the amount when quoting, or use formulas that calculate the price based on variables like square metres, weight or number of hours.",
      },
      {
        pregunta: "How do I handle taxes like VAT?",
        respuesta:
          "Each product can have its own tax configuration: standard VAT, reduced rate, zero-rated or exempt. When you add the product to a quote, taxes are calculated automatically based on the item's configuration and the client's location.",
      },
    ],
    keywords: [
      "product catalogue CPQ",
      "centralised price list",
      "product and service management",
      "company price catalogue",
      "SKU sales management",
      "configurable products quote",
      "price list by client",
    ],
    plan: "Starter",
  },
  {
    slug: "pdf-quotes",
    nombre: "PDF Quotes",
    titulo: "Professional PDF Quotes | Generate proposals in minutes — DealForge",
    descripcion:
      "Create branded PDF quotes with your terms and conditions in minutes. Customisable templates that project professionalism and speed up closing.",
    icono: "FileText",
    color: "#f59e0b",
    heroSubtitle:
      "Generate PDF quotes with your logo, brand colours and commercial terms in one click. Every proposal projects the image of a big company, whatever your size.",
    problema: {
      titulo: "Why do you need professional PDF quotes?",
      puntos: [
        "You format quotes in Word or Excel and each salesperson uses their own style. Your brand looks inconsistent and unprofessional in front of the client.",
        "Calculating totals with tax, volume discounts and special terms by hand causes errors you discover once the client has already received the document.",
        "Generating a single quote takes you 30-45 minutes between looking up prices, copying client details and adjusting the format. With 20 quotes a month, you lose entire days.",
      ],
    },
    solucion: {
      titulo: "How DealForge generates your quotes",
      puntos: [
        {
          titulo: "Customisable templates with your branding",
          desc: "Upload your logo, define colours and typography, and configure headers and footers. Every PDF comes out with your corporate identity without touching a design editor.",
        },
        {
          titulo: "Automatic calculations, no errors",
          desc: "Subtotals, discounts, taxes and totals are calculated instantly. If you change a quantity or apply a discount, everything recalculates. Zero typos in amounts.",
        },
        {
          titulo: "Configurable sections",
          desc: "Include or exclude terms and conditions, warranties, bank details, special notes or a deliverables table. Each template can have different sections depending on the type of proposal.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Select client and products",
        desc: "Choose the client from your base and add products from the catalogue. Billing details, prices and discounts are applied automatically.",
      },
      {
        num: "2",
        titulo: "Personalise the proposal",
        desc: "Add notes, adjust the validity, select payment terms and choose the PDF template that best fits this opportunity.",
      },
      {
        num: "3",
        titulo: "Generate and send the PDF",
        desc: "With one click the PDF is generated, ready to download or send directly by email from DealForge. The client receives a professional document in seconds.",
      },
    ],
    faqs: [
      {
        pregunta: "Can I have several quote templates?",
        respuesta:
          "Yes. You can create different templates for formal proposals, quick quotes, service estimates or any format you need. Each with its own design, sections and default text.",
      },
      {
        pregunta: "Do quotes include billing/tax details?",
        respuesta:
          "Yes. You can include the issuer's and recipient's tax details, tax regime and a VAT breakdown. They aren't tax invoices, but they contain the information accounting needs to process them later.",
      },
      {
        pregunta: "Can I quote in different currencies?",
        respuesta:
          "Yes. DealForge supports quotes in EUR, USD and GBP. You can set the exchange rate manually or use a daily reference. The PDF shows the amounts in the selected currency with the correct symbol.",
      },
      {
        pregunta: "What if I need to change a quote I've already sent?",
        respuesta:
          "You can create a new version of the quote. The system keeps the version history and the client always sees the most recent one. The previous version is archived for reference.",
      },
    ],
    keywords: [
      "professional PDF quote",
      "generate automatic quotes",
      "company quote template",
      "PDF sales proposal",
      "quotes with VAT",
      "quoting software small business",
      "create quick quote",
    ],
    plan: "Starter",
  },
];

export function getFeatureEn(slug: string): Feature | undefined {
  return featuresEn.find((f) => f.slug === slug);
}

// Maps a Spanish feature slug to its English counterpart (only translated ones).
export const ES_TO_EN_FEATURE: Record<string, string> = {
  "gestion-clientes": "customer-management",
  "catalogo-productos": "product-catalog",
  "cotizaciones-pdf": "pdf-quotes",
};
