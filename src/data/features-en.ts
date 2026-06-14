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
  {
    slug: "business-rules",
    nombre: "Business Rules",
    titulo: "Business Rules & Automatic Discounts | Margin control — DealForge",
    descripcion:
      "Define discount, approval and minimum-price rules that apply automatically. Protect your margins without slowing down your sales team.",
    icono: "ShieldCheck",
    color: "#ef4444",
    heroSubtitle:
      "Set the commercial rules of the game once and let the system enforce them. Maximum discounts, minimum prices and volume tiers that protect your profitability on every quote.",
    problema: {
      titulo: "Why do you need automated business rules?",
      puntos: [
        "Your salespeople offer excessive discounts to close quickly and you discover the margin impact weeks later, when there's nothing you can do.",
        "Pricing policies live in a PDF no one reads. Each salesperson interprets them differently and clients get inconsistent terms depending on who they talk to.",
        "Manually reviewing every quote to check the discounts are correct consumes hours of management time that should be spent selling.",
      ],
    },
    solucion: {
      titulo: "How DealForge protects your margins",
      puntos: [
        {
          titulo: "Maximum discounts by role",
          desc: "Define the maximum discount percentage each level of salesperson can apply. A junior rep can give up to 5%, a senior up to 15%. If the client asks for more, the quote requires automatic approval.",
        },
        {
          titulo: "Minimum prices by product",
          desc: "Set a price floor for each product or category. The system blocks any quote that tries to sell below the minimum, showing the salesperson the lowest allowed price.",
        },
        {
          titulo: "Volume discount tiers",
          desc: "Configure progressive discount tables: 5% for 100 units, 10% for 500, 15% for 1,000. The discount is calculated automatically by quantity and the salesperson can't step outside the tier.",
        },
        {
          titulo: "Product compatibility rules",
          desc: "Define which products require others as a complement or which can't be sold together. The system alerts the salesperson if a required component is missing or there's a configuration conflict.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Define your commercial policies",
        desc: "Configure maximum discounts, minimum prices, volume tiers and compatibility rules from the admin panel.",
      },
      {
        num: "2",
        titulo: "Assign rules to products and salespeople",
        desc: "Link each rule to the relevant products, categories or sales roles. Rules take effect immediately for new quotes.",
      },
      {
        num: "3",
        titulo: "The system validates in real time",
        desc: "When a salesperson creates or edits a quote, the rules are evaluated instantly. If something violates a policy, the system blocks it or requests approval before continuing.",
      },
    ],
    faqs: [
      {
        pregunta: "What if a salesperson needs to exceed the maximum discount?",
        respuesta:
          "The quote enters an automatic approval flow. The manager gets a notification with the requested discount, the resulting margin and can approve or reject from their panel or email.",
      },
      {
        pregunta: "Can I have different rules for different clients?",
        respuesta:
          "Yes. You can create rule sets by client segment, region or sales channel. A distributor can have more aggressive discount tiers than an end client, and the system applies the right rules automatically.",
      },
      {
        pregunta: "Do rules apply retroactively to existing quotes?",
        respuesta:
          "No. Rules are only evaluated when creating or editing a quote. Quotes already sent keep their original terms. This stops a policy change from invalidating proposals under negotiation.",
      },
      {
        pregunta: "Can I see a report of how often rules are broken?",
        respuesta:
          "Yes. The business-rules dashboard shows violation attempts by salesperson, product and rule type. This helps you spot whether you need to adjust your policies or train your team.",
      },
    ],
    keywords: [
      "business rules CPQ",
      "automatic sales discounts",
      "quote margin control",
      "company pricing policy",
      "maximum salesperson discount",
      "minimum product prices",
      "volume discount rules",
    ],
    plan: "Pro",
  },
  {
    slug: "reports-metrics",
    nombre: "Reports & Metrics",
    titulo: "Sales Reports & CPQ Metrics | Sales dashboard — DealForge",
    descripcion:
      "Visualise your sales team's performance with real-time dashboards. Close rate, average deal size and quote pipeline at a glance.",
    icono: "BarChart3",
    color: "#8b5cf6",
    heroSubtitle:
      "Stop guessing how sales are going. Real-time dashboards that show you exactly which quotes close, which are lost and why.",
    problema: {
      titulo: "Why do you need metrics for your quoting process?",
      puntos: [
        "You don't know how many quotes your team sends a month or what your real conversion rate is. You make sales decisions on intuition, not data.",
        "When the CEO asks how much is in the pipeline, it takes you hours to consolidate information from each salesperson because there's no central place.",
        "You can't identify which products have the best margin, which salespeople convert most or at what stage opportunities are lost.",
      ],
    },
    solucion: {
      titulo: "How DealForge gives you sales visibility",
      puntos: [
        {
          titulo: "Real-time pipeline dashboard",
          desc: "See the total value of quotes by stage: draft, sent, in negotiation, won, lost. Spot bottlenecks and stalled opportunities before it's too late.",
        },
        {
          titulo: "Metrics by salesperson",
          desc: "Compare individual performance: quotes generated, close rate, average deal size and response time. Detect who needs support and who deserves recognition with objective data.",
        },
        {
          titulo: "Product and margin analysis",
          desc: "Identify which products are quoted most, which convert best and where margins erode. Adjust your catalogue strategy based on real sales data.",
        },
        {
          titulo: "Exportable reports",
          desc: "Download reports in CSV for board meetings, quarterly reviews or detailed analysis. Manual export is available for all data from any dashboard view.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Open your dashboard",
        desc: "From the main screen, access the dashboard that updates automatically with every quote created, sent or closed by your team.",
      },
      {
        num: "2",
        titulo: "Filter by period, salesperson or product",
        desc: "Use the filters to focus on what you need: the month's sales, a specific salesperson's performance or demand for a product category.",
      },
      {
        num: "3",
        titulo: "Export or share",
        desc: "Download the report in CSV whenever you need it. The data is always available for external analysis.",
      },
    ],
    faqs: [
      {
        pregunta: "Do reports update in real time?",
        respuesta:
          "Yes. Every action on a quote (creation, sending, closing, loss) is reflected immediately in the dashboard. You don't need to wait for overnight processes or manual updates.",
      },
      {
        pregunta: "Can I create custom reports?",
        respuesta:
          "On the Pro plan you can customise the dashboard widgets and choose which metrics to see. On the Business plan you can also create reports with advanced filters and calculated fields.",
      },
      {
        pregunta: "Can I see historical metrics?",
        respuesta:
          "Yes. DealForge keeps all the history from when you started using the platform. You can compare periods, see trends and analyse seasonality in your sales process.",
      },
    ],
    keywords: [
      "sales reports small business",
      "sales dashboard",
      "quote metrics",
      "sales close rate",
      "sales pipeline CPQ",
      "salesperson performance analysis",
      "average deal size report",
    ],
    plan: "Starter",
  },
  {
    slug: "forge-ai",
    nombre: "Forge AI Built In",
    titulo: "Forge AI for Quotes | Commercial artificial intelligence — DealForge",
    descripcion:
      "Use AI to generate product descriptions, suggest competitive prices and write follow-up emails. Forge AI speeds up every step of your sales process.",
    icono: "Flame",
    color: "#f97316",
    heroSubtitle:
      "Forge AI is your sales copilot: it generates product descriptions, suggests prices based on history and writes follow-up emails in seconds. You decide, the AI executes.",
    problema: {
      titulo: "Why do you need AI in your quoting process?",
      puntos: [
        "Your salespeople spend more time writing descriptions and emails than selling. Each quote needs personalised text that eats up 15-20 minutes of writing.",
        "You have no way to know whether the price you offer is competitive compared to your historical quotes for similar clients. Each salesperson sets prices blind.",
        "Post-quote follow-up is inconsistent: some salespeople follow up promptly, others forget quotes for weeks until the client buys from a competitor.",
      ],
    },
    solucion: {
      titulo: "How Forge AI empowers your sales team",
      puntos: [
        {
          titulo: "Product description generation",
          desc: "Select a product from the catalogue and Forge AI generates a persuasive sales description based on the technical specs. You can adjust the tone between technical, executive or casual depending on your audience.",
        },
        {
          titulo: "Smart price suggestions",
          desc: "Forge AI analyses your history of won and lost quotes to suggest optimal price ranges. It shows you the estimated probability of closing based on the discount you apply.",
        },
        {
          titulo: "Automatic follow-up emails",
          desc: "Generate personalised email drafts for each stage: initial send, 3-day follow-up, objection handling and closing. Each email uses the real context of the quote.",
        },
        {
          titulo: "Executive proposal summary",
          desc: "For complex quotes, Forge AI generates a one-page executive summary that highlights the key benefits for the decision-maker. Ideal for high-value proposals where the director won't read 20 pages.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Activate Forge AI on any quote",
        desc: "Click the Forge AI icon inside the quote. The assistant appears in a side panel with access to the full context of the proposal.",
      },
      {
        num: "2",
        titulo: "Choose what you need to generate",
        desc: "Select from product description, follow-up email, price suggestion or executive summary. Forge AI generates the content in seconds.",
      },
      {
        num: "3",
        titulo: "Review, adjust and apply",
        desc: "Read the generated content, edit it if you need to and apply it directly to the quote or email. You always have the final word.",
      },
    ],
    faqs: [
      {
        pregunta: "Does Forge AI learn from my quotes?",
        respuesta:
          "Forge AI uses your quote history as context to make more relevant suggestions. It doesn't train models on your data: it uses your information only at the moment of generating content and doesn't share it with other clients.",
      },
      {
        pregunta: "Is there an extra cost to use Forge AI?",
        respuesta:
          "Forge AI is included in every plan with a number of monthly generations. The Starter plan includes 50 generations/month, Pro includes 300 and Business is unlimited.",
      },
      {
        pregunta: "Can I use Forge AI in languages other than English?",
        respuesta:
          "Yes. Forge AI generates content in English, Spanish and Portuguese. It's especially useful when you quote international clients and need proposals in their language without hiring translation.",
      },
      {
        pregunta: "How accurate are the price suggestions?",
        respuesta:
          "The suggestions are based on your own quote history. With more than 50 closed quotes, accuracy improves noticeably. They're always suggestions the salesperson can accept, modify or ignore.",
      },
    ],
    keywords: [
      "artificial intelligence quotes",
      "AI for small business sales",
      "AI sales copilot",
      "generate proposals with AI",
      "AI suggested prices",
      "automatic follow-up emails",
      "AI CPQ",
    ],
    plan: "Starter",
  },
  {
    slug: "email-sending",
    nombre: "Email Sending",
    titulo: "Send Quotes by Email | Built-in tracking — DealForge",
    descripcion:
      "Send quotes by email from DealForge with send confirmation and activity logging. Every email is recorded on the quote's timeline.",
    icono: "Mail",
    color: "#06b6d4",
    heroSubtitle:
      "Send quotes directly from DealForge with your company domain. Every send is recorded on the quote's timeline with date and recipient.",
    problema: {
      titulo: "Why do you need built-in email sending?",
      puntos: [
        "You send the quote via Gmail or Outlook and lose traceability. There's no central record of what was sent, to whom or when.",
        "Follow-up depends on the salesperson remembering to do it. Without a clear record of sends, you don't know whether the quote has gone out or still needs following up.",
        "Attaching the right PDF, writing the email and copying the manager takes time that multiplies with every quote sent.",
      ],
    },
    solucion: {
      titulo: "How DealForge integrates email sending",
      puntos: [
        {
          titulo: "Direct sending in one click",
          desc: "From the quote, press send. The email goes out with your configured domain, the PDF attached and the text you defined in the template. No opening another tool or attaching files manually.",
        },
        {
          titulo: "Send confirmation and activity log",
          desc: "Every email sent is recorded on the quote's timeline with date and recipient. Your team always knows what was sent, to whom and when, without checking individual inboxes.",
        },
        {
          titulo: "Customisable email templates",
          desc: "Create templates for different situations: initial send, reminder, follow-up and thank-you. Use dynamic variables like contact name, total amount and validity date.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Set up your sending domain",
        desc: "Connect your company domain so emails go out from your address (@yourcompany.com). The DNS setup takes 10 minutes and is done once.",
      },
      {
        num: "2",
        titulo: "Personalise email templates",
        desc: "Create templates in your communication style using the visual editor. Add dynamic variables that fill in automatically with each quote's data.",
      },
      {
        num: "3",
        titulo: "Send and confirm",
        desc: "Send the quote from DealForge and confirm the successful send. Every send is automatically recorded on the quote's timeline.",
      },
    ],
    faqs: [
      {
        pregunta: "Do emails go out from my domain or from DealForge?",
        respuesta:
          "They go out from your own domain. You configure DNS records (SPF, DKIM) so DealForge sends on your behalf. The client sees your email address, not DealForge's. This improves deliverability and trust.",
      },
      {
        pregunta: "Can I tell if the client opened the email?",
        respuesta:
          "We currently record the send and the date. Open tracking is on our roadmap.",
      },
      {
        pregunta: "Can I send quotes to multiple contacts?",
        respuesta:
          "Yes. You can add recipients in CC or BCC. Each CC contact is recorded on the quote to keep the context of who's involved in the decision.",
      },
    ],
    keywords: [
      "send quotes by email",
      "email a quote",
      "sales email templates",
      "send proposal by email",
      "quote send log",
      "email from CPQ",
      "sales proposal tracking",
    ],
    plan: "Pro",
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
  "reglas-comerciales": "business-rules",
  "reportes-metricas": "reports-metrics",
  "forge-ia": "forge-ai",
  "envio-emails": "email-sending",
};
