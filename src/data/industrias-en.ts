import type { Industria } from "./industrias";

// English industry quote-template data. Mirrors src/data/industrias.ts with
// English SEO slugs. First batch of high-traffic verticals; more are added
// incrementally. Pages are generated only for the slugs present here.
export const industriasEn: Industria[] = [
  {
    slug: "construction",
    nombre: "Construction",
    titulo: "Quote Template for Construction & Renovations",
    descripcion: "Create professional quotes for building works, renovations and construction projects. Includes line items, materials, labour and timelines.",
    emoji: "🏗️",
    color: "#E67E22",
    ejemploLineas: [
      { descripcion: "Demolition and waste removal", cantidad: 1, precio: 2500 },
      { descripcion: "Masonry and partition walls", cantidad: 1, precio: 4800 },
      { descripcion: "Complete electrical installation", cantidad: 1, precio: 3200 },
      { descripcion: "Plumbing and drainage", cantidad: 1, precio: 2800 },
      { descripcion: "Painting and finishes", cantidad: 1, precio: 1500 },
    ],
    problemas: [
      "Paper or Excel estimates that get lost",
      "Calculation errors in line items and materials",
      "No follow-up after sending the estimate",
      "An unprofessional image next to competitors",
    ],
    beneficios: [
      "Templates with predefined line items for building work",
      "Automatic calculation of materials + labour + tax",
      "Professional PDF with your logo and colours",
      "Automatic follow-up and electronic signature",
    ],
    keywords: ["construction quote", "building estimate", "renovation estimate", "construction quote template", "renovation quote"],
    icp: {
      cargo: "Site manager",
      empresaTipo: "Construction firm with 5-50 employees",
      dolor: "Loses hours every week preparing estimates in Excel that later have calculation errors in the line items.",
      cita: "I need to send the estimate today, because if I'm slow the client calls another builder.",
    },
    casoDeUso: {
      antes: "Prepared each estimate in Excel by copying from previous ones, recalculating materials by hand and sending a generic PDF with no brand identity.",
      despues: "Uses templates with predefined building line items, fills in quantities and the system automatically calculates materials, labour and tax.",
      resultado: "Estimates sent the same day as the site visit, with fewer calculation errors and a professional image that builds client trust.",
    },
    faqs: [
      {
        pregunta: "Can I separate materials and labour line items in the estimate?",
        respuesta: "Yes, you can create independent lines for materials and labour within each item, or group them. The client sees the breakdown you choose to show.",
      },
      {
        pregunta: "How do I handle change orders that come up during the works?",
        respuesta: "You can duplicate the original quote and create an updated version with the new line items. The client receives the updated document and can approve the changes with an electronic signature.",
      },
      {
        pregunta: "Can I include delivery timelines per line item?",
        respuesta: "Yes, each line of the estimate lets you add notes where you can state estimated timelines, conditions or technical specifications for the item.",
      },
    ],
    featuresEspecificos: [
      { icono: "Layers", titulo: "Organised line items", desc: "Group by category: demolition, masonry, installations, finishes." },
      { icono: "Calculator", titulo: "Materials calculation", desc: "Automatically calculate the total cost with materials and labour." },
      { icono: "FileText", titulo: "Works conditions", desc: "Include timelines, warranties and construction-specific conditions." },
      { icono: "Clock", titulo: "On-site estimates", desc: "Create and send estimates from your phone right at the site visit." },
    ],
    stats: [
      { valor: "15 min", label: "per building estimate" },
      { valor: "100%", label: "professional breakdown" },
      { valor: "24h", label: "client response" },
    ],
    guia: `<p>Putting together a construction estimate requires breaking down every line item precisely: demolition, foundations, structure, masonry, installations and finishes must appear separately so the client understands where every pound goes. A common mistake is handing over a fixed price without detailing materials, labour and machinery, which breeds distrust and makes it hard to compare against other contractors.</p>
<p>In the renovation and new-build sector, cost overruns arise when the initial scope is not documented. That's why it pays to specify units of measurement (m², m³, units, lump-sum items), unit prices and revision conditions for unforeseen events such as design changes or hidden findings during demolition. Including delivery timelines per chapter and a payment schedule tied to project milestones conveys seriousness and protects both parties.</p>
<p>With DealForge you can create building estimates in minutes, organised by chapters, with automatic calculation of totals and tax, and send them as a professional, branded PDF. The client signs electronically and you get an instant notification so you can start the works with no administrative delays.</p>`,
    howToSteps: [
      "Select the Construction template and fill in the client details and the site address.",
      "Add the line items organised by chapters: demolition, structure, installations, finishes, etc.",
      "Enter quantities, units of measurement and unit prices so the system calculates totals automatically.",
      "Include payment terms, delivery timelines and warranties in the estimate notes.",
      "Send the estimate to the client by link or PDF and get their approval with an electronic signature.",
    ],
  },
  {
    slug: "consulting",
    nombre: "Consulting",
    titulo: "Quote Template for Consulting & Professional Services",
    descripcion: "Generate clear, professional consulting proposals. Define scope, phases, deliverables and fees in a structured way.",
    emoji: "💼",
    color: "#2C3E50",
    ejemploLineas: [
      { descripcion: "Initial assessment (2 sessions)", cantidad: 2, precio: 450 },
      { descripcion: "AS-IS process analysis", cantidad: 1, precio: 1200 },
      { descripcion: "TO-BE process design", cantidad: 1, precio: 1800 },
      { descripcion: "Implementation plan", cantidad: 1, precio: 900 },
      { descripcion: "Monthly follow-up (3 months)", cantidad: 3, precio: 500 },
    ],
    problemas: [
      "Generic proposals that fail to convey value",
      "Difficulty defining scope and deliverables",
      "Clients who don't reply after you send the proposal",
      "Excessive time spent preparing each proposal",
    ],
    beneficios: [
      "Proposals with clear phases and deliverables",
      "Fees broken down by service",
      "Electronic signature for instant acceptance",
      "AI that suggests a structure based on the project",
    ],
    keywords: ["consulting quote", "consulting proposal", "professional services quote", "consulting proposal template"],
    icp: {
      cargo: "Consulting director",
      empresaTipo: "Boutique consultancy of 3-20 professionals",
      dolor: "Spends too much time writing proposals from scratch for every project, and many go unanswered.",
      cita: "Each proposal takes me half a day, and then the client disappears without giving any feedback.",
    },
    casoDeUso: {
      antes: "Wrote each proposal in Word from scratch, copying sections from previous proposals and adjusting fees manually.",
      despues: "Selects the consulting template, defines phases and deliverables with structured fields, and sends it with automatic follow-up.",
      resultado: "Proposals sent in a fraction of the time, with tracking that shows when the client opens the document so you can re-engage the conversation.",
    },
    faqs: [
      {
        pregunta: "Can I structure the proposal by phases with specific deliverables?",
        respuesta: "Yes, you can create sections per project phase, each with its own deliverables, timelines and fees. The client clearly sees what they get at each stage.",
      },
      {
        pregunta: "How do I present different scope options to the client?",
        respuesta: "You can create several versions of the proposal with different service levels, or include optional lines the client can accept or decline.",
      },
      {
        pregunta: "Can I include an executive summary before the fee breakdown?",
        respuesta: "Yes, you can customise the notes and sections of the document to include project context, objectives and methodology before the financial breakdown.",
      },
    ],
    featuresEspecificos: [
      { icono: "Target", titulo: "Defined scope", desc: "Clearly define what each project includes and excludes." },
      { icono: "Users", titulo: "Assigned team", desc: "Detail the professional profiles and the hours for each one." },
      { icono: "BarChart", titulo: "Proposal tracking", desc: "Know when the client opens the proposal and how long they review it." },
      { icono: "Briefcase", titulo: "Service library", desc: "Reuse services and rates across proposals without starting from scratch." },
    ],
    stats: [
      { valor: "10 min", label: "per professional proposal" },
      { valor: "Phases", label: "with clear deliverables" },
      { valor: "Signature", label: "electronic, included" },
    ],
    guia: `<p>An effective consulting proposal goes far beyond listing fees: it must communicate methodology, define tangible deliverables and set a timeframe that builds trust. The most common mistake in the sector is presenting generic documents that fail to connect the diagnosis of the problem with the proposed solution, making it hard for the client to perceive the return on investment.</p>
<p>Structuring the quote by phases — discovery, analysis, solution design, implementation and follow-up — lets the client visualise the process and understand why each stage has an associated cost. Detailing the profiles of the assigned team, the estimated hours and the concrete deliverables of each phase removes the ambiguity that usually delays the approval of consulting projects.</p>
<p>DealForge lets you build consulting proposals with modular sections, reuse service blocks across projects and turn on automatic tracking to know exactly when the decision-maker reviews your proposal. That way you can follow up at the right moment and close more projects without chasing clients.</p>`,
    howToSteps: [
      "Choose the Consulting template and enter the client details and project context.",
      "Define the project phases (assessment, analysis, implementation, follow-up) with their deliverables.",
      "Assign fees per phase or per hour, stating the professional profiles involved.",
      "Customise the payment terms, confidentiality and scope in the document notes.",
      "Send the proposal with active tracking and an electronic signature for instant acceptance.",
    ],
  },
  {
    slug: "digital-marketing",
    nombre: "Digital Marketing",
    titulo: "Quote Template for Digital Marketing Agencies",
    descripcion: "Quote digital marketing services: SEO, SEM, social media, web design and ad campaigns with a clear service breakdown.",
    emoji: "📱",
    color: "#E91E63",
    ejemploLineas: [
      { descripcion: "Social media management (monthly)", cantidad: 1, precio: 800 },
      { descripcion: "Google Ads campaign (setup + management)", cantidad: 1, precio: 600 },
      { descripcion: "On-page SEO + content (monthly)", cantidad: 1, precio: 950 },
      { descripcion: "Landing page design", cantidad: 2, precio: 450 },
      { descripcion: "Email marketing (setup + 4 sends)", cantidad: 1, precio: 400 },
    ],
    problemas: [
      "Clients who don't understand what each service includes",
      "Price comparisons with no context of value",
      "Proposals that take days to prepare",
      "No follow-up after sending",
    ],
    beneficios: [
      "Services broken down with a clear description",
      "Monthly packages vs. one-off projects",
      "Direct sending with electronic signature",
      "Reusable templates by service type",
    ],
    keywords: ["digital marketing quote", "marketing agency quote", "SEO proposal", "social media quote", "web design estimate"],
    icp: {
      cargo: "Account director",
      empresaTipo: "Digital marketing agency of 3-15 people",
      dolor: "Prepares a different proposal for each client and wastes time explaining what each service includes.",
      cita: "The client compares us with another agency that charges half, but doesn't know we include three times the services.",
    },
    casoDeUso: {
      antes: "Created proposals in Google Slides with screenshots, generic metrics and long descriptions that no one read.",
      despues: "Generates proposals with predefined service packages, a clear description of each one and broken-down prices the client understands.",
      resultado: "Proposals the client understands at first glance, with fewer rounds of questions and faster acceptance once they clearly see the value.",
    },
    faqs: [
      {
        pregunta: "Can I create recurring monthly service packages?",
        respuesta: "Yes, you can define services with monthly recurrence and the system calculates the annual total. Ideal for social media, SEO or web maintenance packages.",
      },
      {
        pregunta: "How do I quote advertising services where the ad budget is variable?",
        respuesta: "You can separate the management fee (your fee) from the client's ad budget, making it clear what is media spend and what is your service.",
      },
      {
        pregunta: "Can I show different package options in the same proposal?",
        respuesta: "Yes, you can create optional lines or quote versions with basic, professional and premium packages for the client to choose from.",
      },
    ],
    featuresEspecificos: [
      { icono: "Package", titulo: "Service packages", desc: "Create predefined monthly packages combining SEO, social and ads." },
      { icono: "BarChart", titulo: "Separate fee vs. spend", desc: "Clearly distinguish the management fee from the advertising budget." },
      { icono: "Mail", titulo: "Sending with tracking", desc: "Know when the client opens the proposal so you can follow up." },
      { icono: "Layers", titulo: "Modular services", desc: "The client can accept or decline individual services." },
    ],
    stats: [
      { valor: "5 min", label: "per agency proposal" },
      { valor: "Packages", label: "monthly and reusable" },
      { valor: "PDF", label: "professional, with your brand" },
    ],
    guia: `<p>Quoting digital marketing services presents a particular challenge: the client needs to understand what each service includes — SEO, SEM, social media management, email marketing — without getting lost in jargon. The key is to clearly separate management fees from the budget allocated to advertising spend, avoiding the usual confusion between what the agency charges and what is invested in platforms like Google Ads or Meta Ads.</p>
<p>Agencies that structure their proposals into recurring monthly packages — basic, professional and premium — get the client to compare options by value rather than haggle over price. Each package should detail the monthly deliverables: number of posts, performance reports, active campaigns and hours of dedication. This turns a price negotiation into a conversation about scope and expected results.</p>
<p>With DealForge you can create modular proposals where the client switches individual services on or off, see in real time when they open your proposal, and close the sale with an electronic signature without exchanging dozens of emails. Ideal for agencies managing multiple accounts that need to send quotes quickly.</p>`,
    howToSteps: [
      "Select the Digital Marketing template and fill in the client company details.",
      "Set up the monthly service packages or add individual services based on the client's needs.",
      "Separate the management fee from the advertising budget for full transparency.",
      "Add commitment terms, tracking metrics and reporting frequency.",
      "Send the proposal to the client with selectable options and collect their electronic signature.",
    ],
  },
  {
    slug: "graphic-design",
    nombre: "Graphic Design",
    titulo: "Quote Template for Graphic Design & Branding",
    descripcion: "Quote graphic design, corporate identity, packaging and print projects professionally.",
    emoji: "🎨",
    color: "#9C27B0",
    ejemploLineas: [
      { descripcion: "Logo design (3 concepts)", cantidad: 1, precio: 800 },
      { descripcion: "Brand identity guidelines", cantidad: 1, precio: 1200 },
      { descripcion: "Business card design", cantidad: 1, precio: 150 },
      { descripcion: "Complete corporate stationery", cantidad: 1, precio: 450 },
      { descripcion: "Social media adaptations", cantidad: 1, precio: 300 },
    ],
    problemas: [
      "Clients who don't value creative work",
      "Estimates that don't detail included revisions",
      "A lack of professionalism in the presentation",
      "Scope changes without updating the price",
    ],
    beneficios: [
      "Clear breakdown of deliverables and revisions",
      "PDF with a preview of your design style",
      "Defined payment terms and timelines",
      "Versioning for scope changes",
    ],
    keywords: ["graphic design quote", "branding quote", "logo design quote", "corporate identity quote"],
    icp: {
      cargo: "Freelance designer or creative director",
      empresaTipo: "Design studio of 1-10 creatives",
      dolor: "Clients don't value creative work because the estimate doesn't reflect the process or the deliverables.",
      cita: "They ask for discounts because they don't see the difference between my work and a €20 logo off the internet.",
    },
    casoDeUso: {
      antes: "Sent an email with the final price without breaking down phases, revisions or deliverables, and the client only saw a number.",
      despues: "Presents estimates with creative process phases, the number of revisions included and a detailed list of final deliverables.",
      resultado: "Clients understand the value of the creative process, there are fewer arguments about extra revisions and the work is perceived as professional.",
    },
    faqs: [
      {
        pregunta: "Can I specify the number of revisions included in the estimate?",
        respuesta: "Yes, you can detail in each line how many rounds of revisions the price includes. Additional revisions can be quoted as a separate line.",
      },
      {
        pregunta: "How do I charge for extra revisions or out-of-scope changes?",
        respuesta: "You can duplicate the quote and add the new lines of work. The client approves the change with an electronic signature before you carry it out.",
      },
      {
        pregunta: "Can I attach my portfolio or examples of previous work?",
        respuesta: "The PDF the quote generates carries your logo and brand colours. You can add notes with links to your portfolio or include references in the description.",
      },
    ],
    featuresEspecificos: [
      { icono: "PenTool", titulo: "Creative phases", desc: "Structure the estimate by briefing, concept, design and delivery." },
      { icono: "Layers", titulo: "Controlled revisions", desc: "Define how many revision rounds each deliverable includes." },
      { icono: "FileText", titulo: "Usage rights", desc: "Include terms on rights assignment and intellectual property." },
      { icono: "Star", titulo: "Detailed deliverables", desc: "List the formats, resolutions and files the client will receive." },
    ],
    stats: [
      { valor: "8 min", label: "per creative estimate" },
      { valor: "Revisions", label: "clearly defined" },
      { valor: "PDF", label: "with your brand identity" },
    ],
    guia: `<p>A graphic design estimate should reflect the value of the creative process, not just the final deliverable. Many designers make the mistake of sending an overall price without detailing the stages of work: briefing, research, concept, development of proposals, revision rounds and delivery of final files. Without that breakdown, the client perceives design as a commodity and negotiates purely on price.</p>
<p>Specifying the number of initial concepts, the rounds of revisions included and the cost of additional revisions protects the designer from the dreaded "scope creep". Equally important is defining the delivery formats (AI, PSD, PNG, SVG), the terms for assignment of usage rights and whether the price includes adaptations to different media or sizes.</p>
<p>DealForge lets design studios and freelancers create estimates that educate the client about the creative process, with clear lines for each phase and deliverable. The PDF document carries your visual identity, reinforcing brand consistency from the very first commercial contact. Versioning also makes it easy to manage scope changes without losing the history of what was approved.</p>`,
    howToSteps: [
      "Open the Graphic Design template and enter the client details and the type of project.",
      "Break down the estimate by creative phases: briefing, concept, design and final delivery.",
      "Specify the number of initial concepts, included revision rounds and delivery formats.",
      "Add terms on usage rights, intellectual property and extra revisions.",
      "Generate the PDF with your brand and send it for approval with an electronic signature.",
    ],
  },
  {
    slug: "web-development",
    nombre: "Web Development",
    titulo: "Quote Template for Web Development & Apps",
    descripcion: "Quote web development, e-commerce, mobile app and custom software projects with clear phases and deliverables.",
    emoji: "💻",
    color: "#00BCD4",
    ejemploLineas: [
      { descripcion: "UX/UI design (wireframes + mockups)", cantidad: 1, precio: 2000 },
      { descripcion: "Frontend development (React/Next.js)", cantidad: 1, precio: 4500 },
      { descripcion: "Backend development + API", cantidad: 1, precio: 3500 },
      { descripcion: "Testing and QA", cantidad: 1, precio: 800 },
      { descripcion: "Deployment and server setup", cantidad: 1, precio: 500 },
    ],
    problemas: [
      "Vague estimates that lead to conflict",
      "Scope that grows out of control (scope creep)",
      "Clients who compare you with cheap freelancers",
      "A lack of structure in phases and deliverables",
    ],
    beneficios: [
      "Project phases with clear milestones",
      "Technical breakdown the client can understand",
      "Defined scope-change conditions",
      "Electronic signature for an immediate start",
    ],
    keywords: ["web development quote", "website estimate", "mobile app quote", "e-commerce estimate", "software development proposal"],
    icp: {
      cargo: "CTO or technical lead",
      empresaTipo: "Web development studio of 2-20 developers",
      dolor: "Constant scope changes mean projects end up costing more than budgeted.",
      cita: "We started with a simple website and ended up building a full platform for the same price.",
    },
    casoDeUso: {
      antes: "Sent a PDF with an overall price and a list of features, without separating phases or defining what happens with changes.",
      despues: "Structures the project into phases with milestones, defines the exact scope and the conditions for managing changes.",
      resultado: "Clients accept faster once they understand the phases, there are fewer conflicts over scope creep and changes are handled with updated versions.",
    },
    faqs: [
      {
        pregunta: "Can I structure the estimate by sprints or development phases?",
        respuesta: "Yes, you can create sections for each phase (design, frontend, backend, testing, deployment) with their own deliverables and costs.",
      },
      {
        pregunta: "How do I manage scope creep when the client asks for new features?",
        respuesta: "You duplicate the quote, add the new features as additional lines and send the updated version for approval with an electronic signature.",
      },
      {
        pregunta: "Can I include monthly post-launch maintenance in the proposal?",
        respuesta: "Yes, you can add recurring lines for maintenance, hosting and technical support on a monthly or annual basis.",
      },
    ],
    featuresEspecificos: [
      { icono: "Layers", titulo: "Phases and milestones", desc: "Organise the project into sprints or phases with measurable deliverables." },
      { icono: "Shield", titulo: "Scope control", desc: "Clearly define what each phase includes to avoid scope creep." },
      { icono: "Settings", titulo: "Tech stack", desc: "Detail the technologies, frameworks and tools used." },
      { icono: "Zap", titulo: "Immediate start", desc: "Electronic signature to kick off the project with no delays." },
    ],
    stats: [
      { valor: "12 min", label: "per technical proposal" },
      { valor: "Phases", label: "with clear milestones" },
      { valor: "Scope", label: "controlled and defined" },
    ],
    guia: `<p>Quoting a web development project means translating technical complexity into a document that the client — usually non-technical — can evaluate with confidence. The quote should be structured by phases: UX/UI design, frontend development, backend development, integrations, testing and deployment. Each phase needs clear delivery milestones that let you validate progress before continuing.</p>
<p>A critical point is defining which technologies will be used, how many design revisions are included, the number of templates or screens, and whether hosting, domain or subsequent maintenance are part of the quote. Requirement changes during development are inevitable, so it's worth establishing a change-management mechanism with clearly stated additional hourly rates.</p>
<p>DealForge helps you generate web development proposals with reusable blocks for each type of project — corporate website, e-commerce, mobile app, SaaS — automatically calculating the totals. The client can approve the proposal with an electronic signature, and you keep a clear record of the agreed scope to avoid disputes over features that weren't included.</p>`,
    howToSteps: [
      "Choose the Web Development template and identify the project type: website, app or e-commerce.",
      "Structure the estimate by technical phases: UX/UI, frontend, backend, testing and deployment.",
      "Detail the technologies, number of screens, integrations and revisions included in each phase.",
      "Set delivery milestones, scope-change conditions and estimated timelines.",
      "Send the technical proposal to the client and obtain their approval with an electronic signature.",
    ],
  },
  {
    slug: "photography",
    nombre: "Photography",
    titulo: "Quote Template for Photographers & Videographers",
    descripcion: "Create professional quotes for photo shoots, weddings, corporate events and video production.",
    emoji: "📸",
    color: "#FF5722",
    ejemploLineas: [
      { descripcion: "Photo shoot (4 hours)", cantidad: 1, precio: 600 },
      { descripcion: "Editing and retouching (50 photos)", cantidad: 50, precio: 8 },
      { descripcion: "Private online gallery", cantidad: 1, precio: 50 },
      { descripcion: "Premium digital album", cantidad: 1, precio: 200 },
      { descripcion: "Travel", cantidad: 1, precio: 80 },
    ],
    problemas: [
      "Clients who haggle without understanding the value",
      "Informal quotes over WhatsApp",
      "No contract or clear terms",
      "Partial payments with no tracking",
    ],
    beneficios: [
      "Photography packages with detailed services",
      "Cancellation terms and image rights included",
      "Formal acceptance with electronic signature",
      "A professional image that justifies the price",
    ],
    keywords: ["photographer quote", "photo shoot quote", "wedding photography quote", "video production estimate"],
    icp: {
      cargo: "Professional photographer",
      empresaTipo: "Freelance photographer or studio of 1-5 people",
      dolor: "Sends quotes over WhatsApp with no formality, and then misunderstandings arise about what the price included.",
      cita: "I upgraded them to the Premium package, but the client says I promised the extra photos for free over WhatsApp.",
    },
    casoDeUso: {
      antes: "Replied over WhatsApp with a price and a list of what was included, with no formal document or cancellation terms.",
      despues: "Sends a professional quote with packages, image rights, cancellation terms and acceptance by signature.",
      resultado: "Fewer misunderstandings with clients, the terms are clear from the start, and the professional image better justifies the prices.",
    },
    faqs: [
      {
        pregunta: "Can I create different photography packages for the client to choose from?",
        respuesta: "Yes, you can create optional lines or several quote versions with basic, standard and premium packages with different hours and deliverables.",
      },
      {
        pregunta: "How do I include terms on image rights and use of the photos?",
        respuesta: "You can add legal notes and terms to the document with the rights assignment, permitted commercial use and any restrictions.",
      },
      {
        pregunta: "Can I charge a deposit and the rest on delivery?",
        respuesta: "Yes, you can define partial payment terms in the quote: for example, 50% on acceptance and 50% on delivery of the edited photos.",
      },
    ],
    featuresEspecificos: [
      { icono: "Camera", titulo: "Photography packages", desc: "Define packages with hours, delivered photos, editing and extras." },
      { icono: "FileText", titulo: "Image rights", desc: "Include terms on rights assignment and commercial use." },
      { icono: "Clock", titulo: "Hours and extras", desc: "Detail the hours included and the cost of additional hours." },
      { icono: "Star", titulo: "Premium image", desc: "A professional PDF that reinforces your brand as a photographer." },
    ],
    stats: [
      { valor: "5 min", label: "per photography quote" },
      { valor: "Packages", label: "customised by service" },
      { valor: "Signature", label: "digital acceptance" },
    ],
    guia: `<p>Quoting photography services involves much more than putting a price on a photo session. The quote should specify the duration of the session, the number of edited photographs to be delivered, the level of retouching (basic, medium or artistic), the usage rights to the images and whether it includes travel to the location of the event or shoot. Without this information, the client compares purely on price rather than on the real value of the service.</p>
<p>For weddings, corporate events or product shoots, it's essential to define whether the photographer works alone or with an assistant, and whether printed albums, high-resolution files or commercial-use licences are included. Photography packages — for example, basic session, full coverage and premium coverage — help the client choose according to their needs and budget without feeling pressured.</p>
<p>DealForge lets you create photography quotes with predefined packages, detailing deliverables, editing timelines and cancellation terms. The client can accept the quote with an electronic signature from their phone, confirming the date booking instantly without exchanging emails.</p>`,
    howToSteps: [
      "Select the Photography template and enter the client details and the type of session.",
      "Set up a photography package stating session hours, photos delivered and editing level.",
      "Specify the usage rights to the images and whether it includes travel or an assistant.",
      "Add booking, cancellation and delivery-timeline terms for the edited photographs.",
      "Send the quote and receive the client's confirmation with an electronic signature.",
    ],
  },
];

export function getIndustriaEn(slug: string): Industria | undefined {
  return industriasEn.find((i) => i.slug === slug);
}

// Maps a Spanish industria slug to its English counterpart. Only translated
// industries appear here — used for hreflang pairing and the sitemap.
export const ES_TO_EN_INDUSTRIA: Record<string, string> = {
  construccion: "construction",
  consultoria: "consulting",
  "marketing-digital": "digital-marketing",
  "diseno-grafico": "graphic-design",
  "desarrollo-web": "web-development",
  fotografia: "photography",
};
