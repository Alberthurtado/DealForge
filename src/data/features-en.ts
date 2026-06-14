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
  {
    slug: "approvals",
    nombre: "Approvals",
    titulo: "Quote Approval Flow | Automatic workflow — DealForge",
    descripcion:
      "Configure approval flows by amount, discount or client. Quotes that need authorisation reach the right approver automatically.",
    icono: "CheckCircle",
    color: "#10b981",
    heroSubtitle:
      "Define who must approve what and forget about chasing sign-offs over chat. Quotes that exceed your policies are routed automatically to the right approver.",
    problema: {
      titulo: "Why do you need an approval flow?",
      puntos: [
        "High-value quotes or those with aggressive discounts go out unsupervised. You learn about risky terms once the client has already accepted and you can't go back.",
        "The approval process is informal: a chat message to the boss that gets lost among 200 conversations. There's no record of who approved what or when.",
        "Salespeople get frustrated waiting days for approvals because the manager doesn't review in time. Meanwhile, the client loses interest.",
      ],
    },
    solucion: {
      titulo: "How DealForge automates approvals",
      puntos: [
        {
          titulo: "Configurable escalation rules",
          desc: "Define approval conditions: quotes over a set amount require director approval, discounts above 20% need the sales manager. Rules combine and prioritise automatically.",
        },
        {
          titulo: "Multi-channel notifications",
          desc: "The approver receives the request by email with a quote summary, resulting margin and client history. They can approve or reject in one click from the email or the app.",
        },
        {
          titulo: "Configurable approval flow",
          desc: "Define who must approve based on the quote's conditions. If the approver rejects, the quote returns to the salesperson with comments so they can adjust and resubmit.",
        },
        {
          titulo: "Full audit trail",
          desc: "Every approval or rejection is recorded with date, time, user and comments. Ideal for internal audits, dispute resolution and continuous improvement of commercial policies.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Configure the approval rules",
        desc: "Define which conditions trigger an approval: total amount, discount percentage, client type or combinations of criteria.",
      },
      {
        num: "2",
        titulo: "Assign approvers",
        desc: "Designate who approves based on the configured conditions. The approver receives the request by email and can approve or reject from there.",
      },
      {
        num: "3",
        titulo: "The salesperson quotes and the flow activates",
        desc: "When a quote meets the conditions, the salesperson sees that it needs approval and the flow starts automatically. Everyone involved gets notifications on each status change.",
      },
    ],
    faqs: [
      {
        pregunta: "Can the salesperson send the quote before approval?",
        respuesta:
          "No. While the quote is pending approval, the send button is locked. The salesperson can see the flow status and who the pending approver is. This guarantees nothing goes out without the corresponding authorisation.",
      },
      {
        pregunta: "Can I approve from my phone?",
        respuesta:
          "Yes. The request email includes approve/reject buttons that work from any device. You can also access the pending-approvals panel from your phone's browser.",
      },
      {
        pregunta: "What happens if an approver goes on holiday?",
        respuesta:
          "You can manually reassign the approval to someone else from the quote panel. You can also cancel the request and create a new one with another approver.",
      },
    ],
    keywords: [
      "quote approval",
      "sales approval flow",
      "approval workflow CPQ",
      "discount authorisation",
      "multi-level approval",
      "company quote control",
      "automatic sales approvals",
    ],
    plan: "Business",
  },
  {
    slug: "electronic-signature",
    nombre: "Electronic Signature",
    titulo: "Electronic Quote Signing | Accept proposals online — DealForge",
    descripcion:
      "Let your clients sign quotes electronically. Cut closing time from weeks to hours with legally valid digital acceptance.",
    icono: "PenTool",
    color: "#3a9bb5",
    heroSubtitle:
      "Your client receives the quote, reviews the terms and signs with one click from any device. No printing, scanning or posting paper. Close deals in hours, not weeks.",
    problema: {
      titulo: "Why do you need electronic signatures on your quotes?",
      puntos: [
        "The client accepts verbally but takes days to return the signed document. Meanwhile, they may change their mind or receive a better offer.",
        "The print-sign-scan-resend process adds friction that kills opportunities. Some clients drop out just because the process is so cumbersome.",
        "You have no clear legal record of when and how the client accepted the terms. In a dispute, an 'ok, go ahead' email doesn't carry much legal weight.",
      ],
    },
    solucion: {
      titulo: "How DealForge simplifies signing",
      puntos: [
        {
          titulo: "One-click signing from the email",
          desc: "The client receives a secure link where they see the quote, review the terms and sign with one click or by drawing their signature. No need to create an account or download software.",
        },
        {
          titulo: "Simple electronic signature certificate",
          desc: "Each signature generates a certificate including timestamp, signer's IP, verified email and document hash. DealForge's signature is a simple electronic signature under the eIDAS Regulation (EU 910/2014). It records the signer's identity, date, time and IP. For contracts requiring an advanced or qualified electronic signature, we recommend consulting a legal advisor.",
        },
        {
          titulo: "Instant acceptance notification",
          desc: "When the client signs, the salesperson and manager get an immediate notification. The quote automatically moves to 'Won' status and contract creation can be triggered.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Enable electronic signature on the quote",
        desc: "When sending the quote, turn on the electronic signature option. Define which fields require a signature and who must sign (it can be more than one person).",
      },
      {
        num: "2",
        titulo: "The client reviews and signs",
        desc: "The client opens the link, reviews the full document with zoom and scroll, and signs in the marked fields. The process takes under 2 minutes.",
      },
      {
        num: "3",
        titulo: "Download the signed document",
        desc: "Both parties receive the signed PDF with the signature certificate included. The document is stored in DealForge as a permanent record.",
      },
    ],
    faqs: [
      {
        pregunta: "Is the electronic signature legally valid?",
        respuesta:
          "DealForge offers a simple electronic signature, recognised by the EU eIDAS Regulation. The certificate includes document integrity, signer identification and a record of date and IP. For contracts requiring an advanced or qualified electronic signature, we recommend consulting a legal advisor about the specific requirements of your case.",
      },
      {
        pregunta: "Do I need a digital certificate to sign?",
        respuesta:
          "No. DealForge uses a simple electronic signature, which doesn't require a qualified digital certificate. For quotes and commercial agreements, the simple signature is sufficient and legally valid under eIDAS. Qualified certificates are only required for dealings with public administration.",
      },
      {
        pregunta: "Can several people sign the same document?",
        respuesta:
          "Yes. You can define multiple signers in a specific order (first the buyer, then the director) or allow parallel signing. Each signer gets their own link and the document progresses as signatures are completed.",
      },
      {
        pregunta: "Does the client need to register to sign?",
        respuesta:
          "No. The signer only needs to access the secure link they receive by email. Their identity is verified through the email it was sent to and optionally via an SMS code. No account, password or extra software required.",
      },
    ],
    keywords: [
      "electronic quote signature",
      "digital signature sales proposal",
      "accept quote online",
      "legal electronic signature",
      "sign proposals small business",
      "digitally signed document",
      "close sales electronic signature",
    ],
    plan: "Pro",
  },
  {
    slug: "automatic-reminders",
    nombre: "Automatic Reminders",
    titulo: "Automatic Quote Reminders | Effortless follow-up — DealForge",
    descripcion:
      "Automate quote follow-up with scheduled reminders. Never lose a sale for lack of timely follow-up again.",
    icono: "Bell",
    color: "#eab308",
    heroSubtitle:
      "60% of sales are lost for lack of follow-up. DealForge sends automatic reminders to your team and your clients so no quote goes unanswered.",
    problema: {
      titulo: "Why do you need automatic reminders?",
      puntos: [
        "Your salespeople handle dozens of quotes at once and it's humanly impossible to remember to follow up on each one. The ones not chased are lost.",
        "Quotes have a validity date, but no one warns the client when it's about to expire. The client finds out late and asks for a new quote with updated prices.",
        "There's no system to flag when a quote has gone 5 days without a reply. The salesperson forgets it and the client assumes you're not interested in the deal.",
      ],
    },
    solucion: {
      titulo: "How DealForge automates follow-up",
      puntos: [
        {
          titulo: "Automatic follow-up sequences",
          desc: "Define a sequence: reminder to the salesperson at 48 hours, email to the client at 5 days, alert to the manager at 7 days. The sequence runs by itself until the quote changes status.",
        },
        {
          titulo: "Expiry alerts",
          desc: "Configure alerts that notify the salesperson and optionally the client when a quote is about to expire. Give the salesperson time to renew the validity and the client urgency to decide.",
        },
        {
          titulo: "Custom internal reminders",
          desc: "Let each salesperson create manual reminders for specific quotes: 'Call on Friday after their budget meeting'. Reminders appear as notifications in the app.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Configure the follow-up sequences",
        desc: "Define how many reminders to send, to whom (salesperson, client or both) and at what intervals. You can create different sequences by quote type or amount.",
      },
      {
        num: "2",
        titulo: "Sequences activate on send",
        desc: "When a salesperson sends a quote, the follow-up sequence starts automatically. If the client replies or the quote closes, the sequence stops on its own.",
      },
      {
        num: "3",
        titulo: "Monitor the team's follow-up",
        desc: "From the dashboard, see which quotes have pending follow-up, which are in an active sequence and which have exhausted all reminders without a reply.",
      },
    ],
    faqs: [
      {
        pregunta: "Can I customise the content of the reminders?",
        respuesta:
          "Yes. Each step of the sequence has its own editable email template. You can use variables like the client's name, the quote amount and remaining validity days. Internal reminders to the salesperson are also customisable.",
      },
      {
        pregunta: "What if the client replies before the next reminder?",
        respuesta:
          "If the quote changes status (accepted, rejected, new version), the sequence stops automatically. We don't want a client who has already accepted to receive a 'still waiting for your reply' email.",
      },
      {
        pregunta: "Can I have different sequences depending on the quote amount?",
        respuesta:
          "Yes. You can create rules like: quotes under a set amount get 2 reminders over 7 days, while larger quotes get 5 reminders over 30 days with escalation to management. The system applies the right sequence based on the criteria you define.",
      },
    ],
    keywords: [
      "quote reminders",
      "automatic sales follow-up",
      "quote expiry alerts",
      "automate sales follow-up",
      "client reminder email",
      "sales follow-up sequence",
      "salesperson notifications",
    ],
    plan: "Pro",
  },
  {
    slug: "versioning",
    nombre: "Versioning",
    titulo: "Quote Versioning | Change control on proposals — DealForge",
    descripcion:
      "Keep a complete history of every version of your quotes. Review previous versions, restore proposals and negotiate with full transparency.",
    icono: "GitBranch",
    color: "#a855f7",
    heroSubtitle:
      "Every change to a quote generates a new version. Review the full version history, restore previous proposals and keep a clear record of the whole negotiation.",
    problema: {
      titulo: "Why do you need versioning on your quotes?",
      puntos: [
        "The client asks for changes three times and you no longer know what the original price was or what changed in each round. You end up comparing PDFs by hand looking for differences.",
        "A salesperson overwrites a quote by mistake and loses the version the client had already verbally accepted. There's no way to recover it.",
        "In an internal audit, you need to show how a negotiation evolved but you only have the final version. You can't justify why those terms were reached.",
      ],
    },
    solucion: {
      titulo: "How DealForge versions your quotes",
      puntos: [
        {
          titulo: "Automatic versions on every change",
          desc: "Every time a quote is modified and saved, a new version is created with a sequential number (v1, v2, v3). The previous version stays immutable and accessible at any time.",
        },
        {
          titulo: "Change history on a timeline",
          desc: "You can see all previous versions on the quote record and review the changes on the timeline. Each version records date, author and a summary of the modifications made.",
        },
        {
          titulo: "One-click restore",
          desc: "If you need to go back to a previous version, you can restore it as the new active version. The intermediate history isn't lost: the restore is recorded as a new version that's a copy of the previous one.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Edit the quote as normal",
        desc: "Change products, prices or terms as you normally would. On save, DealForge creates the new version automatically. You don't need to do anything special.",
      },
      {
        num: "2",
        titulo: "Review the version history",
        desc: "From the quote, access the versions panel where you see each iteration with date, change author and a summary of the modifications.",
      },
      {
        num: "3",
        titulo: "Review or restore as needed",
        desc: "Review previous versions to understand how the negotiation evolved, or restore a version if the client prefers earlier terms.",
      },
    ],
    faqs: [
      {
        pregunta: "Are previous versions accessible to the client?",
        respuesta:
          "Not by default. The client only sees the most recent version you send them. You can share previous versions manually if you need to for the negotiation, but the full history is internal.",
      },
      {
        pregunta: "Is there a limit on versions per quote?",
        respuesta:
          "No. You can have as many versions as needed. We've seen complex negotiations with more than 15 versions and the system handles them without issue.",
      },
      {
        pregunta: "Can I see what changed between versions?",
        respuesta:
          "Yes. Each version includes a record on the timeline with the changes made. You can open any previous version to review the products, prices and terms it had at that moment.",
      },
    ],
    keywords: [
      "quote versioning",
      "proposal version history",
      "quote change control",
      "review quote versions",
      "restore previous quote",
      "negotiation traceability",
      "sales proposal versions",
    ],
    plan: "Starter",
  },
  {
    slug: "import-export",
    nombre: "Import / Export",
    titulo: "Import & Export Data | Excel and CSV integration — DealForge",
    descripcion:
      "Import clients, products and quotes from Excel or CSV. Export your data anytime. Your information is always yours and portable.",
    icono: "Plug",
    color: "#64748b",
    heroSubtitle:
      "Bring all your existing information into DealForge in minutes and export whatever you need whenever you want. No lock-in: your data is always yours.",
    problema: {
      titulo: "Why do you need to import and export data?",
      puntos: [
        "You have years of client and product data in Excel that you can't abandon. Starting from scratch in a new tool is unviable when you handle thousands of records.",
        "Your accounting team needs the quote data in Excel for their reports. Copying each record by hand consumes hours and creates errors.",
        "You worry about vendor lock-in: if DealForge doesn't work for you, you need to be able to get your data out without relying on tech support.",
      ],
    },
    solucion: {
      titulo: "How DealForge handles your data",
      puntos: [
        {
          titulo: "Guided import with column mapping",
          desc: "Upload your Excel or CSV file and the import wizard shows you the detected columns. Drag and drop to map your columns to DealForge's fields. The system validates the data before importing and shows you errors to fix.",
        },
        {
          titulo: "Catalogue import with prices",
          desc: "Import your full catalogue with prices, categories, SKU and descriptions in a single operation. If you already have segment price lists, you can import them as separate lists keeping their relationship to the products.",
        },
        {
          titulo: "Full export in one click",
          desc: "Export clients, products, quotes or any combination to Excel or CSV. Apply filters before exporting to get only the data you need. The export includes all fields, including custom ones.",
        },
        {
          titulo: "On-demand export",
          desc: "Export the data you need at any time with filters applied. Ideal for feeding accounting or BI reports whenever you need it.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Prepare your file",
        desc: "Organise your data in Excel or CSV with clear headers. You don't need a specific format: the mapper adapts to your structure.",
      },
      {
        num: "2",
        titulo: "Upload and map columns",
        desc: "Load the file, review the preview and assign each column to the corresponding field in DealForge. The system validates data and shows errors to fix before importing.",
      },
      {
        num: "3",
        titulo: "Verify and confirm",
        desc: "Review the import summary: valid records, duplicates detected and errors found. Confirm to complete the import or download the error report to fix and retry.",
      },
    ],
    faqs: [
      {
        pregunta: "What file formats does the import accept?",
        respuesta:
          "DealForge accepts .xlsx (Excel), .xls (legacy Excel) and .csv (comma-separated values) files. The maximum size per file is 50 MB, enough for over 500,000 records. If your file is larger, you can split it and import in batches.",
      },
      {
        pregunta: "Does the import detect and handle duplicates?",
        respuesta:
          "Yes. The system compares records by key fields (tax ID for clients, SKU for products) and shows you the duplicates found. You can choose to skip duplicates, overwrite them with the new data or review them one by one.",
      },
      {
        pregunta: "Can I export quote data with line detail?",
        respuesta:
          "Yes. The quote export includes both the header (client, date, total amount, status) and the detail of each line (product, quantity, price, discount). You can export headers only or headers with lines as needed.",
      },
      {
        pregunta: "Is my data safe if I cancel the service?",
        respuesta:
          "You can always export all your data before cancelling. After cancellation, we keep your data for 90 days during which you can request a final export. Your information is never trapped in DealForge.",
      },
    ],
    keywords: [
      "import data CPQ",
      "export quotes Excel",
      "migrate sales data",
      "import clients CSV",
      "export products Excel",
      "company data portability",
      "Excel quotes integration",
    ],
    plan: "Starter",
  },
  {
    slug: "contract-management",
    nombre: "Contract Management",
    titulo: "Post-Sale Contract Management | From quote to contract — DealForge",
    descripcion:
      "Turn won quotes into contracts automatically. Manage validity, clauses and contract documents without leaving your CPQ.",
    icono: "ScrollText",
    color: "#059669",
    heroSubtitle:
      "When a quote becomes a sale, DealForge generates the contract automatically. Manage validity, clauses and renewals from the same place you quoted.",
    problema: {
      titulo: "Why do you need integrated contract management?",
      puntos: [
        "The quote is won but the contract is managed in another system (or in Word folders). You lose the connection between what was quoted and what was contracted, creating inconsistencies.",
        "No one monitors the validity of active contracts. You find out a contract expired when the client calls to complain or once they've already signed with a competitor.",
        "Special clauses and terms agreed during the negotiation get lost among emails and aren't reflected in the final contract.",
      ],
    },
    solucion: {
      titulo: "How DealForge connects quotes with contracts",
      puntos: [
        {
          titulo: "Automatic generation from a won quote",
          desc: "When a quote moves to 'Won' status, DealForge generates a draft contract using a predefined template. Client data, products, prices and terms are carried over automatically.",
        },
        {
          titulo: "Contract templates with dynamic variables",
          desc: "Create contract templates with fields that fill in automatically: company name, tax ID, contracted products, amounts, validity and payment terms. Add optional clauses by type of service.",
        },
        {
          titulo: "Validity and status control",
          desc: "Each contract has a start date, end date and status (draft, active, expiring, expired, cancelled). The contracts dashboard shows a consolidated view of all contracts with expiry alerts.",
        },
        {
          titulo: "Document repository",
          desc: "Store the signed contract and related documents (addenda, annexes, delivery notes) linked to both the contract and the client. The full contract history is accessible from the client record.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Configure contract templates",
        desc: "Create templates with your company's legal format, including dynamic variables for client and quote data. Define standard and optional clauses.",
      },
      {
        num: "2",
        titulo: "Generate the contract when the quote is won",
        desc: "When a quote is marked as won, select the template and DealForge generates the contract with all the data pre-filled. Review, adjust clauses if needed and send for signature.",
      },
      {
        num: "3",
        titulo: "Monitor validity and renewals",
        desc: "From the contracts dashboard, monitor upcoming expiries, contracts due for renewal and statuses. Automatic alerts warn you with configurable lead time.",
      },
    ],
    faqs: [
      {
        pregunta: "Can I use my own legal templates?",
        respuesta:
          "Yes. You can upload your existing contract templates and add DealForge's dynamic variables. This lets your legal department keep control over the legal text while the commercial data fills in automatically.",
      },
      {
        pregunta: "Is the generated contract editable?",
        respuesta:
          "Yes. The generated contract is a draft you can fully edit before sending. You can modify clauses, add special terms and adjust any section. Once signed, the document is locked.",
      },
      {
        pregunta: "Can I link a contract to several quotes?",
        respuesta:
          "Yes. Some master contracts cover multiple quotes. You can create one contract and link several quotes to it, keeping the traceability of each deal under the umbrella of the main contract.",
      },
    ],
    keywords: [
      "contract management small business",
      "contract from quote",
      "contract validity control",
      "company contract templates",
      "post-sale contracts",
      "digital contract repository",
      "commercial contract software",
      "integrated CPQ contracts",
    ],
    plan: "Business",
  },
  {
    slug: "renewals-alerts",
    nombre: "Renewals & Alerts",
    titulo: "Automatic Renewals & Alerts | Client retention — DealForge",
    descripcion:
      "Automate renewals of contracts and recurring services. Proactive alerts that stop you losing clients to forgotten expiries.",
    icono: "RefreshCw",
    color: "#dc2626",
    heroSubtitle:
      "Don't lose clients to expired contracts no one renewed in time. DealForge alerts your team weeks in advance and generates the renewal quote automatically.",
    problema: {
      titulo: "Why do you need renewal management?",
      puntos: [
        "Your recurring-service contracts expire without anyone noticing. The client doesn't renew because no one contacted them and you lose recurring revenue that cost a lot to acquire.",
        "You have no visibility into how much recurring revenue is at risk of not renewing this quarter. Financial planning is a guessing game.",
        "The renewal process is manual: find the original contract, create a new quote, adjust prices and send. With 50 renewals a month, it's a full-time job.",
      ],
    },
    solucion: {
      titulo: "How DealForge automates renewals",
      puntos: [
        {
          titulo: "Staggered expiry alerts",
          desc: "Configure alerts at 90, 60 and 30 days before expiry. Each alert goes to the assigned salesperson and the manager. With enough time, your team contacts the client before they look for alternatives.",
        },
        {
          titulo: "Automatic renewal quote",
          desc: "DealForge generates a renewal quote pre-filled with the same products, quantities and terms of the current contract. The salesperson just reviews, adjusts the price if an annual increase applies and sends.",
        },
        {
          titulo: "Renewals dashboard",
          desc: "See in one place all the pending renewals for the month, quarter or year. Filter by amount, salesperson or loss risk. Quickly identify which accounts need priority attention.",
        },
        {
          titulo: "Automatic price increase",
          desc: "Configure annual increase rules: fixed percentage, inflation-index based or customised per client. When generating the renewal, the price already reflects the adjustment agreed in the original contract.",
        },
      ],
    },
    pasos: [
      {
        num: "1",
        titulo: "Configure expiry alerts",
        desc: "Define how many days before expiry you want to receive each alert and who should receive it. You can create different rules by contract type or amount.",
      },
      {
        num: "2",
        titulo: "Review the renewals dashboard",
        desc: "Each week, check the upcoming renewals. The system prioritises by amount and proximity to expiry so your team focuses on what matters most.",
      },
      {
        num: "3",
        titulo: "Send the renewal in one click",
        desc: "Open the pre-generated renewal quote, verify the data, adjust what's needed and send it to the client. The whole process takes under 5 minutes per renewal.",
      },
    ],
    faqs: [
      {
        pregunta: "Can I fully automate the renewal with no human intervention?",
        respuesta:
          "You can automate generating the quote and sending the first email to the client, but we recommend a salesperson reviews each renewal before sending. Some renewals need a price adjustment, scope changes or a conversation with the client first.",
      },
      {
        pregunta: "How do I handle price increases on renewals?",
        respuesta:
          "You can configure automatic increase rules: a fixed annual percentage, based on an inflation index (e.g. CPI) or a custom percentage per client. The renewal quote is generated with the price adjusted according to the defined rule.",
      },
      {
        pregunta: "Can I see which recurring revenue is at risk?",
        respuesta:
          "Yes. The dashboard shows the total value of contracts expiring in each period, segmented by renewal status (pending, in progress, renewed, lost). You can project the expected recurring revenue and the churn rate for each quarter.",
      },
      {
        pregunta: "Does the system flag clients at risk of not renewing?",
        respuesta:
          "The system automatically alerts you when a contract enters the amber zone (64-15 days) or red zone (under 14 days). These visual alerts on the dashboard let you prioritise which accounts need urgent attention before they expire.",
      },
    ],
    keywords: [
      "automatic contract renewals",
      "contract expiry alerts",
      "client retention small business",
      "SaaS renewal management",
      "recurring revenue renewal",
      "automate service renewal",
      "renewals dashboard",
      "contract churn prevention",
    ],
    plan: "Business",
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
  "aprobaciones": "approvals",
  "firma-electronica": "electronic-signature",
  "recordatorios": "automatic-reminders",
  "versionado": "versioning",
  "importar-exportar": "import-export",
  "gestion-contratos": "contract-management",
  "renovaciones-alertas": "renewals-alerts",
};
