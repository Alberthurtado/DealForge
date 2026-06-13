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
  {
    slug: "architecture",
    nombre: "Architecture",
    titulo: "Quote Template for Architecture Studios",
    descripcion: "Quote architecture projects: feasibility studies, concept and technical design, site supervision and permits.",
    emoji: "📐",
    color: "#607D8B",
    ejemploLineas: [
      { descripcion: "Feasibility study", cantidad: 1, precio: 1500 },
      { descripcion: "Concept design", cantidad: 1, precio: 3000 },
      { descripcion: "Planning drawings", cantidad: 1, precio: 5000 },
      { descripcion: "Technical design package", cantidad: 1, precio: 7000 },
      { descripcion: "Site supervision (6 months)", cantidad: 6, precio: 1200 },
    ],
    problemas: [
      "Fees that are hard to justify without a breakdown",
      "Project phases that aren't clear to the client",
      "Documentation scattered across multiple formats",
      "Delays in approvals and signatures",
    ],
    beneficios: [
      "Project phases aligned with standard work stages",
      "Fees broken down by phase",
      "Electronic signature to speed up approvals",
      "Versioning when the scope changes",
    ],
    keywords: ["architect quote", "architecture project quote", "architect fees", "architecture studio quote"],
    icp: {
      cargo: "Principal architect",
      empresaTipo: "Architecture studio of 2-15 professionals",
      dolor: "Clients don't understand why fees are what they are because they can't see the breakdown of phases and work involved.",
      cita: "The client tells me another architect charges less, but doesn't realise that price doesn't include site supervision.",
    },
    casoDeUso: {
      antes: "Sent a Word document with overall fees and a generic description of the project phases.",
      despues: "Presents fees broken down by each phase (feasibility, concept, planning, technical, supervision) with specific deliverables.",
      resultado: "Clients understand the value of each phase, comparisons with other studios are fairer, and approvals speed up with electronic signature.",
    },
    faqs: [
      {
        pregunta: "Can I structure fees according to the project work stages?",
        respuesta: "Yes, you can create sections for each project stage: feasibility study, concept design, planning, technical design and site supervision.",
      },
      {
        pregunta: "How do I present site supervision as a monthly service?",
        respuesta: "You can add site supervision as a line with the quantity equal to the estimated months and a monthly price, so the client sees the total cost.",
      },
      {
        pregunta: "Can I include fees and permits as separate items?",
        respuesta: "Yes, you can add lines for council fees, planning permits and other costs that aren't fees but are part of the project's total cost.",
      },
    ],
    featuresEspecificos: [
      { icono: "Home", titulo: "Work-stage phases", desc: "Structure by feasibility, concept, planning and technical design." },
      { icono: "FileText", titulo: "Clear fees", desc: "A detailed breakdown that justifies the value of each phase." },
      { icono: "Clock", titulo: "Timelines per phase", desc: "State the estimated duration of each stage of the project." },
      { icono: "Layers", titulo: "Integrated documentation", desc: "Centralise the quote, phases and terms in a single document." },
    ],
    stats: [
      { valor: "10 min", label: "per fee proposal" },
      { valor: "Phases", label: "by work stage" },
      { valor: "Signature", label: "electronic approval" },
    ],
    guia: `<p>An architecture studio's fee proposal must convey technical rigour and professionalism from the very first page. Unlike other sectors, architects' fees are structured around the project work stages: feasibility studies, concept design, planning application, technical design and site supervision. Each stage has different deliverables and responsibilities that the client needs to understand.</p>
<p>It's common to quote fees as a percentage of the construction cost or as a fixed price per stage. Either way, it pays to detail what each stage includes: drawings, technical reports, dealings with the relevant authorities, coordination with engineers and on-site supervision. Permit fees, planning charges and other consultants' fees should be listed separately to avoid misunderstandings.</p>
<p>With DealForge you can create professional fee proposals with the phase structure the discipline requires, automatic calculation of totals, and sending with electronic signature. The client approves the commission digitally, speeding up the start of the project with no unnecessary bureaucracy.</p>`,
    howToSteps: [
      "Open the Architecture template and record the client details and the project location.",
      "Structure fees by work stage: feasibility, concept, planning, technical design and supervision.",
      "State the calculation method (percentage of construction cost or fixed fee) and each phase's deliverables.",
      "Separate permit fees, planning charges and other consultants' fees from the studio's fee.",
      "Send the fee proposal with electronic signature to formalise the professional commission.",
    ],
  },
  {
    slug: "cleaning",
    nombre: "Cleaning",
    titulo: "Quote Template for Cleaning Companies",
    descripcion: "Quote professional cleaning services: offices, communal areas, windows, industrial cleaning and maintenance.",
    emoji: "🧹",
    color: "#4CAF50",
    ejemploLineas: [
      { descripcion: "General office cleaning (500m²)", cantidad: 20, precio: 45 },
      { descripcion: "Exterior window cleaning", cantidad: 4, precio: 120 },
      { descripcion: "Floor treatment and polishing", cantidad: 2, precio: 350 },
      { descripcion: "Full disinfection", cantidad: 4, precio: 80 },
      { descripcion: "Products and materials", cantidad: 1, precio: 200 },
    ],
    problemas: [
      "Quotes that don't detail frequency or scope",
      "Competing on price alone without showing value",
      "No follow-up or automatic renewal",
      "An unprofessional image for the business",
    ],
    beneficios: [
      "Services with detailed frequency and m²",
      "Automatic monthly/quarterly/annual calculation",
      "Renewal with electronic signature",
      "Automatic renewal reminders",
    ],
    keywords: ["cleaning quote", "cleaning company quote", "office cleaning quote", "communal cleaning quote"],
    icp: {
      cargo: "Cleaning company manager",
      empresaTipo: "Cleaning company of 5-30 employees",
      dolor: "Maintenance contracts are renewed verbally and they lose clients without knowing why.",
      cita: "The building manager told me they hired another company because they sent a clearer quote.",
    },
    casoDeUso: {
      antes: "Handed over a printed sheet with the monthly price without breaking down what the cleaning included or how often.",
      despues: "Sends quotes with services detailed by frequency (daily, weekly, monthly), m² covered and products included.",
      resultado: "Clients value the transparency of the breakdown, renewals are formalised with a signature, and there's less contract churn.",
    },
    faqs: [
      {
        pregunta: "Can I quote services with different frequencies (daily, weekly, monthly)?",
        respuesta: "Yes, each line can have its own frequency and the system calculates the monthly or annual cost automatically based on the repetitions.",
      },
      {
        pregunta: "How do I quote one-off extra services like windows or polishing?",
        respuesta: "You can add specific lines for quarterly or one-off services with their own frequency, separate from the regular maintenance.",
      },
      {
        pregunta: "Can it be used for residential management contracts?",
        respuesta: "Yes, you can detail communal areas, frequency per area, products included and annual renewal terms for the contract.",
      },
    ],
    featuresEspecificos: [
      { icono: "Clock", titulo: "Detailed frequencies", desc: "Define daily, weekly, monthly and quarterly services." },
      { icono: "Calculator", titulo: "Automatic calculation", desc: "Calculate monthly and annual cost based on each service's frequency." },
      { icono: "FileText", titulo: "Formal contracts", desc: "Generate documents with renewal and cancellation terms." },
      { icono: "Zap", titulo: "Quick renewal", desc: "Renew annual contracts in one click with electronic signature." },
    ],
    stats: [
      { valor: "5 min", label: "per cleaning quote" },
      { valor: "Monthly", label: "automatic calculation" },
      { valor: "Contracts", label: "with digital renewal" },
    ],
    guia: `<p>Professional cleaning companies need quotes that precisely detail the surfaces to be cleaned, the service frequency, the products and equipment used, and the number of operatives assigned. A vague quote breeds distrust in the client and opens the door to future disputes over what was or wasn't included in the contract.</p>
<p>For recurring services — offices, communal areas, retail units — the quote should calculate the monthly cost, breaking down square metres, weekly frequency and type of cleaning (maintenance, windows, disinfection, floor treatment). One-off services such as post-construction or deep cleans require a specific valuation based on hours and the complexity of the work.</p>
<p>DealForge lets you generate cleaning quotes with automatic calculation of monthly, annual and one-off service rates. You can send the quote to the building manager or company contact with electronic signature, formalising the service contract without paperwork and with digital renewal when the time comes.</p>`,
    howToSteps: [
      "Choose the Cleaning template and fill in the client details and the property address.",
      "State the surfaces in square metres, type of cleaning and service frequency.",
      "Calculate the monthly or one-off service cost, including products and number of operatives.",
      "Add contract terms: duration, renewal, penalties and cancellation notice.",
      "Send the quote with electronic signature to formalise the cleaning contract.",
    ],
  },
  {
    slug: "events",
    nombre: "Events",
    titulo: "Quote Template for Event Planning",
    descripcion: "Quote corporate events, weddings, fairs and conferences with a breakdown of services, catering, logistics and décor.",
    emoji: "🎪",
    color: "#FF9800",
    ejemploLineas: [
      { descripcion: "Coordination and planning", cantidad: 1, precio: 2000 },
      { descripcion: "Catering (100 people)", cantidad: 100, precio: 35 },
      { descripcion: "Décor and styling", cantidad: 1, precio: 1500 },
      { descripcion: "AV equipment + DJ", cantidad: 1, precio: 1200 },
      { descripcion: "Photography + highlights video", cantidad: 1, precio: 800 },
    ],
    problemas: [
      "Complex quotes with many suppliers",
      "Last-minute changes with no cost control",
      "A lack of clarity on what's included and what isn't",
      "Slow approvals that delay planning",
    ],
    beneficios: [
      "Breakdown by category (catering, décor, AV...)",
      "Versioning for menu or service changes",
      "Quick approval with electronic signature",
      "A professional PDF that impresses the client",
    ],
    keywords: ["event quote", "wedding quote", "catering quote", "corporate event quote", "event planning quote"],
    icp: {
      cargo: "Wedding planner or event coordinator",
      empresaTipo: "Events agency of 2-10 people",
      dolor: "The client's constant changes (menu, guests, décor) leave the quote out of date every week.",
      cita: "The bride changed the menu three times and now I don't even know which quote is the current one.",
    },
    casoDeUso: {
      antes: "Kept an Excel file with tabs for each supplier and sent a summary PDF that went out of date with every change.",
      despues: "Creates a unified quote with categories, updates lines when there are changes, and sends the updated version in one click.",
      resultado: "Every change is documented in a new version, the client always sees the current quote, and there's no confusion about what was agreed.",
    },
    faqs: [
      {
        pregunta: "Can I organise the quote by categories (catering, décor, AV)?",
        respuesta: "Yes, you can create sections for each event category. The client sees the breakdown by area and the overall event total.",
      },
      {
        pregunta: "How do I handle menu changes or guest-count changes?",
        respuesta: "You duplicate the quote, adjust the affected lines and send a new version. The history keeps all previous versions.",
      },
      {
        pregunta: "Can I calculate the per-person cost of the event?",
        respuesta: "Yes, you can use the quantity to state the number of people on lines like catering, drinks or gifts, and the system calculates the total.",
      },
    ],
    featuresEspecificos: [
      { icono: "Layers", titulo: "Event categories", desc: "Organise by catering, décor, AV, logistics and more." },
      { icono: "Users", titulo: "Cost per guest", desc: "Calculate the total price based on the number of attendees." },
      { icono: "FileText", titulo: "Change versioning", desc: "Each change generates a new version with history." },
      { icono: "Zap", titulo: "Instant approval", desc: "The client approves the final quote with electronic signature." },
    ],
    stats: [
      { valor: "10 min", label: "per event quote" },
      { valor: "Versions", label: "for every change" },
      { valor: "Categories", label: "organised by service" },
    ],
    guia: `<p>Quoting an event means coordinating multiple suppliers and services into a single coherent document: catering, AV, décor, photography, entertainment, front-of-house staff and logistics. The challenge is to present everything clearly so the client can approve, change or drop services without losing sight of the event's total cost.</p>
<p>Each type of event — wedding, conference, product launch, gala dinner — has specific line items. For weddings, for example, it's key to break down the price per head, separating the reception drinks, the banquet, the open bar and the cake. For corporate events, the client needs to see the cost of the venue, the technical production, the catering and the signage as independent items they can scale according to the number of attendees.</p>
<p>DealForge lets you organise the quote by service category, create versions for different options (menu A vs. menu B, 100 vs. 200 guests) and send everything in a professional document the client approves with electronic signature. Each change generates a new version, keeping the full history of what was agreed.</p>`,
    howToSteps: [
      "Select the Events template and enter the client details and the event date.",
      "Organise the quote by categories: catering, AV, décor, entertainment, logistics.",
      "Create options or versions for different menus, set-ups or guest counts.",
      "Include booking and cancellation terms and a payment schedule tied to milestones.",
      "Send the complete quote and get the client's approval with electronic signature.",
    ],
  },
  {
    slug: "electrical",
    nombre: "Electrical",
    titulo: "Quote Template for Electricians & Installers",
    descripcion: "Create quotes for electrical installations, consumer units, wiring, lighting and installation certificates.",
    emoji: "⚡",
    color: "#FFC107",
    ejemploLineas: [
      { descripcion: "Main consumer unit", cantidad: 1, precio: 850 },
      { descripcion: "Conduit and wiring (metres)", cantidad: 120, precio: 12 },
      { descripcion: "LED light points", cantidad: 25, precio: 45 },
      { descripcion: "Sockets and switches", cantidad: 30, precio: 18 },
      { descripcion: "Electrical installation certificate", cantidad: 1, precio: 250 },
    ],
    problemas: [
      "Handwritten quotes that don't detail materials",
      "Calculation errors in quantities and prices",
      "No record of completed jobs",
      "An informal image next to larger firms",
    ],
    beneficios: [
      "Breakdown of materials + labour",
      "An up-to-date electrical product catalogue",
      "PDF with certification and regulations included",
      "Quote history per client",
    ],
    keywords: ["electrician quote", "electrical installation quote", "electrical quote", "consumer unit quote"],
    icp: {
      cargo: "Self-employed electrician or team lead",
      empresaTipo: "Electrical installation company of 1-15 employees",
      dolor: "Writes quotes by hand in the van and forgets to include materials or miscalculates the quantities.",
      cita: "I told the client a price off the top of my head, and when I bought the materials I realised I was going to lose money.",
    },
    casoDeUso: {
      antes: "Jotted the quote on paper or sent it over WhatsApp with an approximate price and no materials breakdown.",
      despues: "Creates the quote from their phone with lines for each material, labour and certificate, with automatic calculation.",
      resultado: "Quotes with no calculation errors, a professional image in front of the client, and a record of every job done.",
    },
    faqs: [
      {
        pregunta: "Can I separate the cost of materials from labour?",
        respuesta: "Yes, you can create independent lines for materials (cable, fittings, consumer unit) and for labour (installation hours), each with its own price.",
      },
      {
        pregunta: "How do I include the installation certificate in the quote?",
        respuesta: "Add a line for the electrical installation certificate as a separate service. You can include notes about the applicable wiring regulations.",
      },
      {
        pregunta: "Can I reuse common material lines across quotes?",
        respuesta: "Yes, you can duplicate previous quotes as a base and adjust quantities. The materials you use frequently are saved.",
      },
    ],
    featuresEspecificos: [
      { icono: "Zap", titulo: "Itemised materials", desc: "List each material with quantity, unit price and total." },
      { icono: "Calculator", titulo: "Automatic calculation", desc: "Adds up materials, labour and tax with no errors." },
      { icono: "Shield", titulo: "Regulations included", desc: "Add wiring-regulation references and certifications to the document." },
      { icono: "Clock", titulo: "On-site quoting", desc: "Create and send from your phone right at the installation." },
    ],
    stats: [
      { valor: "5 min", label: "per electrical quote" },
      { valor: "0 errors", label: "in materials calculation" },
      { valor: "PDF", label: "professional, with regulations" },
    ],
    guia: `<p>A professional electrical quote should clearly separate the materials (wiring, fittings, consumer units, light fixtures) from the labour and certification costs. The electrician who itemises each element — light points, socket outlets, dedicated circuits for air conditioning or an induction hob — builds trust and reduces later arguments about what was included.</p>
<p>Wiring regulations require installations to meet specific technical standards. Showing in the quote that the installation includes the electrical installation certificate, testing and any required notification adds perceived value and sets the serious professional apart from the electrician who works without documentation.</p>
<p>With DealForge you can create electrical quotes with predefined lines for each type of installation, automatic calculation of the total of materials plus labour and tax, and generate a professional PDF that includes the relevant regulatory references. The client approves from their phone and you can start the installation backed by a signed document.</p>`,
    howToSteps: [
      "Open the Electrical template and enter the client details and the installation address.",
      "Break down the materials (cable, fittings, consumer units) and the labour for each circuit or zone.",
      "Add certification items: installation certificate, technical design if applicable, and notifications.",
      "State delivery timelines, warranties and applicable wiring-regulation references.",
      "Send the professional quote and receive the electronically signed acceptance.",
    ],
  },
  {
    slug: "plumbing",
    nombre: "Plumbing",
    titulo: "Quote Template for Plumbers",
    descripcion: "Quote plumbing work: installations, repairs, heating, drainage and bathroom renovations.",
    emoji: "🔧",
    color: "#2196F3",
    ejemploLineas: [
      { descripcion: "Single-lever tap installation", cantidad: 3, precio: 85 },
      { descripcion: "Boiler replacement (supply + install)", cantidad: 1, precio: 650 },
      { descripcion: "Full bathroom renovation (plumbing)", cantidad: 1, precio: 2200 },
      { descripcion: "Drain clearing with camera inspection", cantidad: 1, precio: 180 },
      { descripcion: "Call-out and diagnosis", cantidad: 1, precio: 50 },
    ],
    problemas: [
      "Verbal quotes that lead to misunderstandings",
      "Unspecified materials that cause disputes",
      "No record of warranties or previous jobs",
      "Competing on word-of-mouth without a professional image",
    ],
    beneficios: [
      "Materials and labour broken down",
      "Warranty and terms in writing",
      "Client signature before starting",
      "Complete history per property/client",
    ],
    keywords: ["plumber quote", "plumbing quote", "bathroom renovation quote", "heating installation quote"],
    icp: {
      cargo: "Self-employed plumber or company manager",
      empresaTipo: "Plumbing company of 1-10 operatives",
      dolor: "Gives prices verbally and then the client complains because they didn't specify which materials they'd use.",
      cita: "The client says I promised them premium taps, but I quoted a generic price — nothing was put in writing.",
    },
    casoDeUso: {
      antes: "Gave the price verbally during the visit, without detailing materials, brand or warranty terms.",
      despues: "Sends the quote from their phone after the visit with each material specified, brand included, and the warranty in writing.",
      resultado: "No disputes over materials, the client signs before the work starts, and there's a record of every job for future reference.",
    },
    faqs: [
      {
        pregunta: "Can I specify brands and models of materials in the quote?",
        respuesta: "Yes, in each line's description you can include the brand, model and reference of the material. That way there's no confusion about what will be installed.",
      },
      {
        pregunta: "How do I include the workmanship warranty in the document?",
        respuesta: "You can add notes with the warranty terms: duration, what it covers and what it doesn't. It's formally included in the signed document.",
      },
      {
        pregunta: "Can it be used for bathroom renovations with several phases?",
        respuesta: "Yes, you can separate plumbing lines by phase: strip-out, new installation, taps and sanitaryware, each with its own cost.",
      },
    ],
    featuresEspecificos: [
      { icono: "FileText", titulo: "Detailed materials", desc: "Specify the brand, model and reference of each material." },
      { icono: "Shield", titulo: "Warranty included", desc: "Document the warranty terms in the signed quote." },
      { icono: "Clock", titulo: "From the visit", desc: "Create the quote on your phone after inspecting the fault." },
      { icono: "Users", titulo: "History per client", desc: "Look up all previous jobs at each property." },
    ],
    stats: [
      { valor: "3 min", label: "per plumbing quote" },
      { valor: "Brand", label: "and model specified" },
      { valor: "Warranty", label: "included in writing" },
    ],
    guia: `<p>The plumber who delivers a detailed quote stands out from the one who gives a price "off the cuff" over the phone. A professional plumbing quote should state the brand and model of the materials (taps, sanitaryware, boilers, pipework), distinguish between supply and installation, and specify whether it includes removing the old materials and any minor building work required.</p>
<p>For emergency repairs, the client appreciates a quick but transparent quote that separates the call-out charge, the labour per hour and the materials used. For new installations or bathroom and kitchen renovations, it's best to structure the quote by zone and detail each water point, drain and appliance connection so there are no surprises when the work is finished.</p>
<p>DealForge lets the plumber create quotes from their phone during the visit, with predefined lines for the most common jobs and automatic calculation of the total. The document includes the warranty in writing for materials and workmanship, and the client can accept it by signing from their phone on the spot, with no waiting and no paperwork.</p>`,
    howToSteps: [
      "Select the Plumbing template and record the client details and the job address.",
      "Detail each job: repair, replacement or new installation, stating the brand and model of materials.",
      "Separate the cost of materials, labour, call-out and removal of old fittings.",
      "Include the installation and materials warranty with its duration in the terms.",
      "Send the quote instantly from your phone and collect the client's digital signature.",
    ],
  },
  {
    slug: "gardening",
    nombre: "Gardening",
    titulo: "Quote Template for Gardening & Landscaping",
    descripcion: "Quote gardening services, green-space maintenance, garden design and professional landscaping.",
    emoji: "🌿",
    color: "#8BC34A",
    ejemploLineas: [
      { descripcion: "Monthly garden maintenance (500m²)", cantidad: 12, precio: 180 },
      { descripcion: "Tree and hedge pruning", cantidad: 4, precio: 250 },
      { descripcion: "Automatic irrigation installation", cantidad: 1, precio: 1200 },
      { descripcion: "Planting and plant supply", cantidad: 1, precio: 800 },
      { descripcion: "Landscape design", cantidad: 1, precio: 600 },
    ],
    problemas: [
      "Maintenance contracts that are never formalised",
      "No breakdown of included services",
      "Annual renewals that get forgotten",
      "WhatsApp quotes with no follow-up",
    ],
    beneficios: [
      "Services with detailed frequency",
      "Annual contracts with automatic renewal",
      "Breakdown of plants, materials and labour",
      "Electronic signature for maintenance contracts",
    ],
    keywords: ["gardening quote", "garden maintenance quote", "landscaping quote", "gardener quote"],
    icp: {
      cargo: "Professional gardener or landscaper",
      empresaTipo: "Gardening company of 2-15 operatives",
      dolor: "Maintenance contracts are renewed verbally each year and sometimes they lose clients without notice.",
      cita: "I'd been with the residents' association for three years and one day they called to say they'd hired someone else who sent a more detailed quote.",
    },
    casoDeUso: {
      antes: "Agreed maintenance verbally, without documenting what it included, how often or when it renewed.",
      despues: "Sends maintenance contracts with frequencies, included services and annual renewal with electronic signature.",
      resultado: "Clients renew more predictably, it's clear what the service includes, and there are fewer unexpected cancellations.",
    },
    faqs: [
      {
        pregunta: "Can I quote monthly maintenance with different seasonal services?",
        respuesta: "Yes, you can create lines with different frequencies: weekly mowing in summer, quarterly pruning, biannual pest treatment, each with its own schedule.",
      },
      {
        pregunta: "How do I quote a landscaping project with plants and materials?",
        respuesta: "You can break down lines for design, plant supply (with species and quantities), hard-landscaping materials (soil, gravel) and planting labour.",
      },
      {
        pregunta: "Can it be used for residents' association contracts?",
        respuesta: "Yes, you can detail areas of the property, services per area, frequency of each task and the total monthly or annual contract price.",
      },
    ],
    featuresEspecificos: [
      { icono: "Clock", titulo: "Seasonal frequencies", desc: "Define tasks with weekly, monthly, quarterly or annual frequency." },
      { icono: "FileText", titulo: "Maintenance contracts", desc: "Formalise annual contracts with renewal terms." },
      { icono: "Package", titulo: "Plant supply", desc: "Detail species, quantities and the cost of each plant." },
      { icono: "Calculator", titulo: "Automatic annual cost", desc: "Calculate the annual total from services with different frequencies." },
    ],
    stats: [
      { valor: "5 min", label: "per gardening quote" },
      { valor: "Annual", label: "maintenance calculation" },
      { valor: "Contract", label: "formal, with digital signature" },
    ],
    guia: `<p>Gardening and landscaping companies need to quote differently depending on whether it's a garden design project, an irrigation installation or a recurring maintenance contract. For creation projects, the quote needs to detail the plant species by common and botanical name, the substrate, the irrigation systems, the outdoor lighting and the hardscape elements such as paths, pergolas or retaining walls.</p>
<p>For recurring maintenance contracts — residents' associations, businesses, private gardens — the key is to specify what each visit includes: mowing, pruning, clearing, pest treatments, feeding and tidying of communal areas. The monthly price should reflect seasonality, since the tasks and frequency vary considerably between spring-summer and autumn-winter.</p>
<p>DealForge makes it easy to create gardening quotes with automatic calculation of monthly and annual rates. You can send maintenance contracts with digital renewal, or project quotes with a breakdown of plant materials, labour and machinery. The client signs electronically and both parties keep a clear record of what was agreed.</p>`,
    howToSteps: [
      "Choose the Gardening template and enter the client details and the garden location.",
      "For maintenance: state the frequency, tasks included per visit and the area to maintain.",
      "For projects: break down plant species, hardscape materials, irrigation and lighting.",
      "Calculate the monthly rate or the project price and include seasonality terms.",
      "Send the quote or maintenance contract with electronic signature for acceptance.",
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
  arquitectura: "architecture",
  limpieza: "cleaning",
  eventos: "events",
  electricidad: "electrical",
  fontaneria: "plumbing",
  jardineria: "gardening",
};
