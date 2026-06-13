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
  {
    slug: "transport",
    nombre: "Transport & Logistics",
    titulo: "Quote Template for Transport & Logistics",
    descripcion: "Quote transport, removals, logistics and distribution services with clear routes, vehicles and rates.",
    emoji: "🚛",
    color: "#795548",
    ejemploLineas: [
      { descripcion: "Long-haul transport (full truck)", cantidad: 1, precio: 850 },
      { descripcion: "Loading and unloading (2 operatives, 4h)", cantidad: 1, precio: 320 },
      { descripcion: "Packing and goods protection", cantidad: 1, precio: 200 },
      { descripcion: "Transport insurance", cantidad: 1, precio: 120 },
      { descripcion: "Temporary storage (1 week)", cantidad: 1, precio: 150 },
    ],
    problemas: [
      "WhatsApp rates with no formal commitment",
      "No breakdown of additional services",
      "Disputes due to a lack of documentation",
      "Competing on price with no added value",
    ],
    beneficios: [
      "Rates by route, weight or volume",
      "Insurance and terms included",
      "Instant acceptance with electronic signature",
      "Service history per client",
    ],
    keywords: ["transport quote", "removals quote", "logistics quote", "freight transport quote"],
    icp: {
      cargo: "Fleet manager or sales lead",
      empresaTipo: "Transport company of 3-25 vehicles",
      dolor: "Sends rates over WhatsApp with no formal record, which causes problems when there are disputes.",
      cita: "The client says I quoted a different price and I have no way to prove it because it was a voice message.",
    },
    casoDeUso: {
      antes: "Replied over WhatsApp with a price per route and a voice message explaining the terms.",
      despues: "Sends a formal quote with the route, vehicle type, additional services, insurance and terms in writing.",
      resultado: "Disputes are resolved with the signed documentation, clients perceive greater professionalism, and agreements are on record.",
    },
    faqs: [
      {
        pregunta: "Can I quote by route, weight or volume depending on the service?",
        respuesta: "Yes, each quote line can have its own unit: per trip, per kg, per m³ or per km. You can combine different units in the same document.",
      },
      {
        pregunta: "How do I include transport insurance in the quote?",
        respuesta: "You can add a specific line for insurance with the cost and the coverage terms in the notes. It's documented and signed by the client.",
      },
      {
        pregunta: "Can it be used for removals with packing and assembly?",
        respuesta: "Yes, you can break it down: transport, packing, loading/unloading, furniture assembly and insurance. Each service as an independent line with its price.",
      },
    ],
    featuresEspecificos: [
      { icono: "Truck", titulo: "Routes and vehicles", desc: "Detail origin, destination, vehicle type and characteristics." },
      { icono: "Shield", titulo: "Documented insurance", desc: "Include insurance terms and coverage in the quote." },
      { icono: "Package", titulo: "Additional services", desc: "Break down packing, loading, unloading and storage." },
      { icono: "FileText", titulo: "Formal record", desc: "Every service is documented with the client's signature." },
    ],
    stats: [
      { valor: "3 min", label: "per transport quote" },
      { valor: "Routes", label: "with a full breakdown" },
      { valor: "Insurance", label: "included and documented" },
    ],
    guia: `<p>Transport and logistics quotes must account for variables that other industries don't handle: distance, weight and volume of the goods, the type of vehicle required, cargo insurance, tolls and waiting times during loading and unloading. The client needs to know exactly what the quoted price covers and which items can incur surcharges, such as night-time deliveries, difficult access or temperature-controlled goods.</p>
<p>For recurring distribution services, the quote should set rates per route, per kilometre or per pallet, with volume-discount tiers. For removals and one-off transport, it's best to detail the packing included, the number of porters, the availability of a tail-lift and the contents insurance coverage. Transparency on these items avoids disputes and builds lasting commercial relationships.</p>
<p>DealForge lets you set up transport quotes with predefined routes, rates per leg and automatic cost calculation. The document includes the goods-insurance terms and is sent with electronic signature, formalising the service before the first item is loaded.</p>`,
    howToSteps: [
      "Open the Transport template and fill in the client details and the origin and destination points.",
      "State the type of cargo, weight, volume and vehicle needed for the service.",
      "Break down the cost by item: transport, insurance, packing, tolls and waiting times.",
      "Set liability terms, delivery times and insurance coverage.",
      "Send the transport quote and receive the electronically signed confirmation.",
    ],
  },
  {
    slug: "training",
    nombre: "Training",
    titulo: "Quote Template for Training & Courses",
    descripcion: "Quote in-company training programmes, courses, workshops and coaching with detailed content, duration and materials.",
    emoji: "📚",
    color: "#3F51B5",
    ejemploLineas: [
      { descripcion: "Training programme design", cantidad: 1, precio: 500 },
      { descripcion: "In-person sessions (8h)", cantidad: 2, precio: 1200 },
      { descripcion: "Custom learning materials", cantidad: 20, precio: 25 },
      { descripcion: "E-learning platform (3 months)", cantidad: 1, precio: 400 },
      { descripcion: "Certification and assessment", cantidad: 20, precio: 30 },
    ],
    problemas: [
      "Generic proposals with no customisation",
      "Difficulty communicating the ROI of training",
      "Slow approvals from the HR department",
      "No follow-up after the proposal",
    ],
    beneficios: [
      "A detailed programme with objectives and content",
      "Clear price per learner or flat rate",
      "Quick approval with electronic signature",
      "Automatic follow-up of pending proposals",
    ],
    keywords: ["training quote", "corporate course quote", "coaching quote", "in-company training quote"],
    icp: {
      cargo: "Freelance trainer or academy director",
      empresaTipo: "Training company of 1-10 trainers",
      dolor: "Proposals pass through several departments (HR, management, procurement) and get lost along the way.",
      cita: "HR told me my proposal was approved, but then finance asked for more details and two months went by.",
    },
    casoDeUso: {
      antes: "Sent a generic PDF with the syllabus and the price, without adapting to the company's specific objectives.",
      despues: "Creates customised proposals with learning objectives, a detailed programme, included materials and a price per learner.",
      resultado: "Companies see a proposal tailored to their needs, approvals are quicker, and there's less back-and-forth with HR.",
    },
    faqs: [
      {
        pregunta: "Can I quote per learner or with a flat rate for groups?",
        respuesta: "Yes, you can use the quantity to state the number of learners and the unit price per person, or create a line with a flat rate for a closed group.",
      },
      {
        pregunta: "How do I include the training programme within the proposal?",
        respuesta: "You can add detailed notes with the objectives, modules, the duration of each session and the methodology. It's all integrated into the same document.",
      },
      {
        pregunta: "Can I offer in-person and online options in the same proposal?",
        respuesta: "Yes, you can create versions or optional lines for in-person, online or hybrid formats, each with its own price and terms.",
      },
    ],
    featuresEspecificos: [
      { icono: "BookOpen", titulo: "Detailed programme", desc: "Include objectives, modules and methodology in the proposal." },
      { icono: "Users", titulo: "Price per learner", desc: "Automatically calculate the total based on the number of participants." },
      { icono: "Layers", titulo: "Flexible formats", desc: "Quote in-person, online or hybrid options in a single document." },
      { icono: "Mail", titulo: "Follow-up with HR", desc: "Know when they open the proposal so you can re-engage." },
    ],
    stats: [
      { valor: "8 min", label: "per training proposal" },
      { valor: "Programme", label: "detailed, with objectives" },
      { valor: "Per learner", label: "or flat rate" },
    ],
    guia: `<p>Training and professional development proposals should go beyond a list of courses with prices. The client — whether an HR department, an educational centre or an independent professional — needs to see the learning objectives, the detailed syllabus, the teaching methodology, the duration of each module and the skills participants will gain on completing the training.</p>
<p>How you quote varies by format: in-company training is usually quoted per day or per full programme, while courses open to the public tend to be quoted per learner with group discounts. Including learning materials, digital tools, completion certificates and post-training support in the proposal raises the perceived value and justifies rates above the competition.</p>
<p>DealForge lets you structure training proposals with modules, objectives and prices per learner or flat rate. You can send the proposal to the training manager with automatic follow-up to know when they review it, and close the deal with electronic signature without bureaucratic delays.</p>`,
    howToSteps: [
      "Select the Training template and enter the details of the requesting client or company.",
      "Structure the proposal by modules with learning objectives, duration and methodology.",
      "Define the pricing model: price per learner, per day or per full programme.",
      "Include materials, certification, post-training support and cancellation terms.",
      "Send the training proposal with electronic signature to formalise the agreement.",
    ],
  },
  {
    slug: "security",
    nombre: "Security",
    titulo: "Quote Template for Security Companies",
    descripcion: "Quote security services: guarding, alarms, CCTV, access control and event security.",
    emoji: "🔒",
    color: "#F44336",
    ejemploLineas: [
      { descripcion: "Alarm system (panel + sensors)", cantidad: 1, precio: 890 },
      { descripcion: "IP CCTV cameras (4 units)", cantidad: 4, precio: 220 },
      { descripcion: "8-channel NVR recorder", cantidad: 1, precio: 350 },
      { descripcion: "Installation and cabling", cantidad: 1, precio: 600 },
      { descripcion: "Annual maintenance", cantidad: 1, precio: 240 },
    ],
    problemas: [
      "Technical quotes that are hard to understand",
      "No comparison of options for the client",
      "Maintenance contracts that aren't formalised",
      "Competing with large firms without a professional image",
    ],
    beneficios: [
      "Equipment broken down with specifications",
      "Basic/mid/premium options in a single PDF",
      "Maintenance contract with electronic signature",
      "A professional image that builds trust",
    ],
    keywords: ["security quote", "alarm quote", "CCTV quote", "guarding quote", "access control quote"],
    icp: {
      cargo: "Security sales manager",
      empresaTipo: "Security and installations company of 5-30 employees",
      dolor: "Technical quotes confuse the client and they end up choosing the company that explains it most clearly.",
      cita: "Our system is better than the competition's, but the client doesn't understand it because my quote looks like a list of components.",
    },
    casoDeUso: {
      antes: "Listed technical components with references the client didn't understand, without explaining what each one did.",
      despues: "Presents equipment with clear descriptions, grouped by zones, with tier options and a maintenance contract.",
      resultado: "Clients understand what they'll receive, choose with more confidence, and sign up for maintenance once they see clear terms.",
    },
    faqs: [
      {
        pregunta: "Can I present tier options (basic, mid, premium) in a single quote?",
        respuesta: "Yes, you can create versions or optional lines for each tier, with different equipment and prices. The client chooses the option they prefer.",
      },
      {
        pregunta: "How do I include the maintenance contract alongside the installation?",
        respuesta: "You can add lines for installation and a recurring annual line for maintenance. The contract terms go in the document notes.",
      },
      {
        pregunta: "Can I quote event security with guards and temporary equipment?",
        respuesta: "Yes, you can create lines for guards (hours × price/hour), temporary equipment and coordination, all broken down for the event organiser.",
      },
    ],
    featuresEspecificos: [
      { icono: "Shield", titulo: "Clear equipment", desc: "Describe each component in language the client understands." },
      { icono: "Layers", titulo: "Tier options", desc: "Present basic, professional and premium packages in one document." },
      { icono: "Settings", titulo: "Technical specs", desc: "Include references and specs without losing clarity." },
      { icono: "FileText", titulo: "Maintenance contract", desc: "Formalise annual maintenance with electronic signature." },
    ],
    stats: [
      { valor: "8 min", label: "per security quote" },
      { valor: "3 tiers", label: "in a single document" },
      { valor: "Contract", label: "maintenance included" },
    ],
    guia: `<p>The quote for a security system — alarms, video surveillance, access control or physical guarding — must be tailored to the specific needs of each site. Protecting a private home is not the same as protecting a logistics warehouse or a retail unit open to the public. The proposal should include a prior security assessment that identifies the vulnerable points and justifies the proposed solution.</p>
<p>It's essential to break down the cost of the equipment (cameras, sensors, alarm panel, smart locks), the installation, the commissioning and the monthly monitoring-centre subscription. Offering different tiers — basic, advanced and premium — in a single quote makes the client's decision easier and increases the average order value by showing the benefits of each level of protection.</p>
<p>DealForge lets security companies create quotes with comparable options, separating equipment from recurring fees and maintenance contracts. The client can approve the installation with electronic signature, and you formalise both the installation contract and the monthly service contract in a single digital flow.</p>`,
    howToSteps: [
      "Open the Security template and enter the client details and the installation address.",
      "Select the equipment needed: cameras, sensors, alarm panel and access control.",
      "Present several tiers (basic, advanced, premium) so the client can compare options.",
      "Separate the installation cost from the monthly monitoring and maintenance fees.",
      "Send the quote with electronic signature to formalise the installation and service contract.",
    ],
  },
  {
    slug: "dental-clinic",
    nombre: "Dental Clinic",
    titulo: "Quote Template for Dental Clinics",
    descripcion: "Generate professional dental quotes: orthodontics, implants, cosmetic dentistry and treatments with a clear breakdown for the patient.",
    emoji: "🦷",
    color: "#00ACC1",
    ejemploLineas: [
      { descripcion: "Assessment and diagnosis (panoramic x-ray)", cantidad: 1, precio: 80 },
      { descripcion: "Professional dental cleaning", cantidad: 1, precio: 60 },
      { descripcion: "Composite filling", cantidad: 3, precio: 75 },
      { descripcion: "Zirconia crown", cantidad: 2, precio: 450 },
      { descripcion: "LED whitening", cantidad: 1, precio: 300 },
    ],
    problemas: [
      "Patients who don't understand the treatments",
      "Paper quotes that get lost",
      "No follow-up of pending quotes",
      "Comparisons with other clinics without context",
    ],
    beneficios: [
      "Treatments explained clearly",
      "Financing options included",
      "Digital acceptance without visiting the clinic",
      "Automatic follow-up of quotes",
    ],
    keywords: ["dental quote", "dental clinic quote", "orthodontics quote", "dental implants quote"],
    icp: {
      cargo: "Clinic director or patient-care lead",
      empresaTipo: "Dental clinic of 2-10 surgeries",
      dolor: "Patients receive the quote, go home to think about it and never call back.",
      cita: "We hand the treatment plan to the patient and never hear anything more. We have no way to follow up without being pushy.",
    },
    casoDeUso: {
      antes: "Printed the quote in the surgery, the patient took it away and in most cases never got back in touch.",
      despues: "Sends the quote by email with a clear explanation of each treatment, financing options and digital acceptance.",
      resultado: "Patients review the quote calmly at home, the clinic knows when they open it and can follow up at the right moment.",
    },
    faqs: [
      {
        pregunta: "Can I include financing or instalment payment options?",
        respuesta: "Yes, you can add notes with the financing terms: monthly instalments, initial deposit and duration. The patient sees clearly how to pay.",
      },
      {
        pregunta: "How do I present alternative treatments for the patient to choose?",
        respuesta: "You can create optional lines or different versions: for example, implant vs. bridge, invisible aligners vs. braces, each option with its price.",
      },
      {
        pregunta: "Can the patient accept the quote without coming to the clinic?",
        respuesta: "Yes, they receive the quote by email and can accept it with an electronic signature from their phone. There's a legal record of acceptance.",
      },
    ],
    featuresEspecificos: [
      { icono: "Heart", titulo: "Clear treatments", desc: "Explain each procedure in language the patient understands." },
      { icono: "Calculator", titulo: "Financing included", desc: "Present instalment payment options within the quote." },
      { icono: "Mail", titulo: "Digital sending", desc: "The patient receives and accepts the quote from their phone." },
      { icono: "BarChart", titulo: "Active follow-up", desc: "Know when the patient opens the quote so you can follow up." },
    ],
    stats: [
      { valor: "3 min", label: "per dental quote" },
      { valor: "Digital", label: "acceptance from the phone" },
      { valor: "Follow-up", label: "automatic for patients" },
    ],
    guia: `<p>A dental quote has particularities that set it apart from any other service quote: it's drawn up after a clinical diagnosis, it can cover multiple treatments across different teeth, and it must be understandable to a patient with no medical training. Detailing each treatment — filling, root canal, crown, implant, orthodontics — with the tooth affected, the number of sessions and the individual cost helps the patient prioritise and plan their investment.</p>
<p>Many clinics lose patients because the quote is handed over on paper during the appointment and the patient doesn't review it until days later, by which point they've already consulted another clinic. Offering financing options, distinguishing between urgent and cosmetic treatments, and including a phased treatment plan make even large quotes easier to accept.</p>
<p>DealForge lets dental clinics generate digital quotes per patient with lines per treatment and tooth, send them to the patient's phone for calm review at home, and receive acceptance with electronic signature. Automatic follow-up alerts you if the patient hasn't responded so you can re-engage the conversation at the right time.</p>`,
    howToSteps: [
      "Select the Dental Clinic template and enter the patient details.",
      "Add each treatment stating the tooth, procedure, sessions and cost.",
      "Organise treatments by priority: urgent, necessary and cosmetic-optional.",
      "Include financing options and phased payment terms if applicable.",
      "Send the quote to the patient's phone for acceptance with electronic signature.",
    ],
  },
  {
    slug: "interior-design",
    nombre: "Interior Design",
    titulo: "Quote Template for Interior Design & Décor",
    descripcion: "Quote interior design projects: space design, furniture selection, materials and decorative renovation work.",
    emoji: "🛋️",
    color: "#AB47BC",
    ejemploLineas: [
      { descripcion: "Initial consultation and briefing", cantidad: 1, precio: 200 },
      { descripcion: "Interior design project (plans + 3D)", cantidad: 1, precio: 2500 },
      { descripcion: "Furniture and materials selection", cantidad: 1, precio: 800 },
      { descripcion: "Purchasing and supplier management", cantidad: 1, precio: 600 },
      { descripcion: "Site supervision (4 visits)", cantidad: 4, precio: 250 },
    ],
    problemas: [
      "Clients who can't picture the final result",
      "Quotes that mix design and execution",
      "Constant changes with no price update",
      "No formalisation of terms and timelines",
    ],
    beneficios: [
      "Design and execution phases kept separate",
      "Versioning for material changes",
      "PDF with renders and moodboards included",
      "Electronic signature to start the project",
    ],
    keywords: ["interior design quote", "décor quote", "interiors design quote", "interior designer quote"],
    icp: {
      cargo: "Interior designer or professional decorator",
      empresaTipo: "Interior design studio of 1-8 professionals",
      dolor: "The client constantly changes their mind about materials and colours and the quote never reflects reality.",
      cita: "Every time the client sees something new on Pinterest they want to change everything, and I don't know how to charge them for the changes.",
    },
    casoDeUso: {
      antes: "Sent a single quote that mixed design fees with the cost of furniture and execution, without separating phases.",
      despues: "Clearly separates design fees, the cost of furniture and materials, and site supervision into distinct sections.",
      resultado: "The client understands what they're paying for at each phase, material changes are handled with updated versions, and design fees aren't disputed.",
    },
    faqs: [
      {
        pregunta: "Can I separate design fees from the cost of furniture and works?",
        respuesta: "Yes, you can create independent sections for design (your fees), furniture (cost of pieces), purchasing management and site supervision.",
      },
      {
        pregunta: "How do I handle the material or furniture changes the client requests?",
        respuesta: "You duplicate the quote, update the affected lines and send a new version. The client approves the changes with electronic signature.",
      },
      {
        pregunta: "Can I include links to moodboards or renders in the quote?",
        respuesta: "Yes, you can add notes with links to your moodboard or include detailed descriptions of the aesthetic proposal alongside the financial breakdown.",
      },
    ],
    featuresEspecificos: [
      { icono: "Home", titulo: "Project by spaces", desc: "Organise the quote by room or zone of the project." },
      { icono: "PenTool", titulo: "Design vs. execution", desc: "Clearly separate design fees from the cost of the works." },
      { icono: "Layers", titulo: "Material versioning", desc: "Each material change generates a new documented version." },
      { icono: "Star", titulo: "Premium presentation", desc: "A professional PDF that reflects the quality of your work." },
    ],
    stats: [
      { valor: "10 min", label: "per interior design quote" },
      { valor: "Phases", label: "of design and execution" },
      { valor: "Versions", label: "for every change" },
    ],
    guia: `<p>An interior design project is quoted very differently depending on its scope: a few hours of décor advice is not the same as a full project that includes space design, furniture selection, site management and trade coordination. The proposal must make clear which phases it covers — concept, technical design, shopping list, execution supervision — and what deliverables the client will receive at each one.</p>
<p>The interior designer who breaks the quote down into design fees and estimated execution cost (furniture, textiles, lighting, renovation) offers total transparency. It's advisable to separate the professional fee from the investment in materials and third-party labour, stating whether purchases are handled on the client's behalf or whether the studio applies a management margin on suppliers.</p>
<p>DealForge lets interior design studios create phased proposals with automatic versioning, ideal for a sector where changes of concept and material selection are constant. The client approves each phase with electronic signature, and you keep a clear record of the decisions made throughout the design process.</p>`,
    howToSteps: [
      "Choose the Interior Design template and record the client details and the project location.",
      "Structure the proposal by phases: concept, technical design, material selection and supervision.",
      "Separate the design fees from the estimated execution and furniture budget.",
      "Detail each phase's deliverables: plans, renders, moodboards, shopping list.",
      "Send the phased proposal with electronic signature to approve the start of the project.",
    ],
  },
  {
    slug: "accounting",
    nombre: "Accounting & Advisory",
    titulo: "Quote Template for Accountants & Advisory Firms",
    descripcion: "Quote accounting, tax, payroll and corporate advisory services with monthly or per-service rates.",
    emoji: "📊",
    color: "#546E7A",
    ejemploLineas: [
      { descripcion: "Monthly bookkeeping (up to 50 invoices)", cantidad: 12, precio: 150 },
      { descripcion: "Quarterly tax returns (VAT)", cantidad: 4, precio: 120 },
      { descripcion: "Annual personal tax return", cantidad: 1, precio: 80 },
      { descripcion: "Corporate tax return", cantidad: 1, precio: 300 },
      { descripcion: "Payroll advisory (up to 5 payslips)", cantidad: 12, precio: 100 },
    ],
    problemas: [
      "Clients who don't understand what the fee includes",
      "No formal service contract",
      "Extra services that weren't quoted",
      "Competing on monthly price alone",
    ],
    beneficios: [
      "Monthly vs. one-off services broken down",
      "Clear terms on what's included and what isn't",
      "Annual renewal with electronic signature",
      "A professional image for the firm",
    ],
    keywords: ["accountant quote", "tax advisory quote", "bookkeeping quote", "accounting firm quote"],
    icp: {
      cargo: "Practice principal or tax adviser",
      empresaTipo: "Accounting or advisory firm of 2-15 professionals",
      dolor: "Clients call with queries that aren't included in the fee and they don't know how to charge for them without creating conflict.",
      cita: "The client thinks that paying £150 a month means they can call me about anything, but that wasn't what we agreed.",
    },
    casoDeUso: {
      antes: "Agreed the fee verbally and sent an email with the monthly price, without detailing exactly which services it included.",
      despues: "Sends a formal proposal with included services, limits (number of invoices, payslips), extra services and the price of each.",
      resultado: "Clients know exactly what their fee includes, extra services are charged without conflict, and renewals are formalised every year.",
    },
    faqs: [
      {
        pregunta: "Can I detail exactly what the monthly fee includes and what it doesn't?",
        respuesta: "Yes, you can list each included service (bookkeeping, returns, payroll) with its limits and add notes on what counts as an extra service.",
      },
      {
        pregunta: "How do I quote one-off services like company formation?",
        respuesta: "You can add lines for one-off services with a unit price. The same document can mix recurring and one-off services.",
      },
      {
        pregunta: "Can it be used for annual renewals of the client base?",
        respuesta: "Yes, you can duplicate the previous year's quote, update prices if needed and send the renewal with electronic signature.",
      },
    ],
    featuresEspecificos: [
      { icono: "Calculator", titulo: "Detailed monthly fee", desc: "Break down what the monthly fee includes and excludes." },
      { icono: "FileText", titulo: "Clear extra services", desc: "Define the price of each additional service outside the fee." },
      { icono: "Briefcase", titulo: "Annual renewal", desc: "Renew contracts each year in one click with electronic signature." },
      { icono: "BarChart", titulo: "Client-base management", desc: "History of proposals and contracts for each client." },
    ],
    stats: [
      { valor: "5 min", label: "per advisory proposal" },
      { valor: "Monthly", label: "with defined limits" },
      { valor: "Renewal", label: "annual, digitised" },
    ],
    guia: `<p>Accounting and advisory firms mostly operate on monthly fees that cover a package of recurring services: bookkeeping, quarterly tax returns, preparation of annual accounts, payroll management and employment advice. The service proposal must specify precisely what the monthly fee includes and which services are billed separately, such as company formation, tax inspections or expert reports.</p>
<p>A common mistake is offering a generic fee without defining limits: number of accounting entries, employees on payroll, returns included or monthly queries. When these limits aren't clear, friction arises when charging for additional services the client thought were covered. Detailing the included filings — VAT, corporate tax, payroll — gives clarity to the freelancer or SME evaluating your offer.</p>
<p>With DealForge you can create tax and accounting advisory proposals with monthly services broken down, automatic calculation of the annual fee and digital contract renewal. The client electronically signs the service agreement, and you have a documentary record of what was agreed that protects both parties against any future discrepancy.</p>`,
    howToSteps: [
      "Open the Accounting template and enter the client details (freelancer or company).",
      "Define the services included in the monthly fee: bookkeeping, tax, payroll, employment.",
      "Set the service limits: entries, employees, returns and queries included.",
      "State the additional services with a per-unit price outside the monthly fee.",
      "Send the advisory proposal with electronic signature to formalise the annual contract.",
    ],
  },
  {
    slug: "veterinary",
    nombre: "Veterinary",
    titulo: "Quote Template for Veterinary Clinics",
    descripcion: "Generate veterinary quotes: surgeries, treatments, vaccinations and pet health plans.",
    emoji: "🐾",
    color: "#66BB6A",
    ejemploLineas: [
      { descripcion: "Consultation and examination", cantidad: 1, precio: 40 },
      { descripcion: "Full blood and urine panel", cantidad: 1, precio: 85 },
      { descripcion: "Abdominal ultrasound", cantidad: 1, precio: 70 },
      { descripcion: "Neutering surgery", cantidad: 1, precio: 250 },
      { descripcion: "Hospitalisation (per day)", cantidad: 2, precio: 45 },
    ],
    problemas: [
      "Owners who need to know the cost before deciding",
      "Verbal quotes that lead to misunderstandings",
      "No follow-up of pending treatments",
      "A lack of options (basic vs. complete)",
    ],
    beneficios: [
      "Treatments broken down and easy to understand",
      "Basic and premium plan options",
      "Digital acceptance of the quote",
      "Treatment history per patient",
    ],
    keywords: ["veterinary quote", "vet clinic quote", "pet surgery quote", "veterinary estimate"],
    icp: {
      cargo: "Lead vet or clinic manager",
      empresaTipo: "Veterinary clinic of 1-5 vets",
      dolor: "Owners need to know the cost before authorising a procedure, and if it isn't clear they go to another clinic.",
      cita: "The owner went away to think about it and never came back. Later I found out they went to another clinic that emailed the quote straight away.",
    },
    casoDeUso: {
      antes: "Explained the treatment plan verbally in the consultation and gave an approximate price the owner sometimes forgot.",
      despues: "Sends the quote by email after the consultation with each procedure detailed, treatment options and digital acceptance.",
      resultado: "Owners review the quote calmly at home, the clinic follows up when they open it, and more patients complete their treatments.",
    },
    faqs: [
      {
        pregunta: "Can I offer basic and complete treatment options?",
        respuesta: "Yes, you can create versions or optional lines with different levels: for example, basic vs. full blood panel, or surgery with or without hospitalisation.",
      },
      {
        pregunta: "How do I present annual health plans with vaccines and check-ups?",
        respuesta: "You can create a quote with all the year's vaccines, deworming and check-ups as individual lines, showing the saving against paying separately.",
      },
      {
        pregunta: "Can the owner authorise surgery without coming to the clinic?",
        respuesta: "Yes, they receive the quote by email and can authorise it with an electronic signature from their phone. There's a legal record of consent.",
      },
    ],
    featuresEspecificos: [
      { icono: "Heart", titulo: "Clear treatments", desc: "Explain each procedure in language the owner understands." },
      { icono: "Layers", titulo: "Treatment options", desc: "Present basic vs. complete alternatives for the owner to choose." },
      { icono: "Mail", titulo: "Instant sending", desc: "Send the quote by email right after the consultation." },
      { icono: "BookOpen", titulo: "Patient history", desc: "Look up each animal's previous quotes." },
    ],
    stats: [
      { valor: "3 min", label: "per veterinary quote" },
      { valor: "Options", label: "clear treatment choices" },
      { valor: "Signature", label: "digital authorisation" },
    ],
    guia: `<p>The veterinary quote has an emotional dimension that sets it apart from other sectors: the pet owner needs to understand which procedures will be carried out, why they are necessary and how much each will cost — all at a moment of worry about their animal's health. A clear quote that distinguishes diagnosis (consultation, lab work, x-ray, ultrasound), treatment (surgery, medication, hospitalisation) and follow-up reduces the client's anxiety and makes decision-making easier.</p>
<p>For surgical procedures, it's best to detail pre-anaesthetic work, anaesthesia, surgical materials, hospitalisation and post-operative check-ups as independent lines. Where therapeutic alternatives exist — conservative vs. surgical treatment, for example — presenting them in the same quote with their respective pros and costs empowers the owner to choose with full information.</p>
<p>DealForge lets veterinary clinics generate quotes per animal patient, sent to the owner's phone for calm review. The electronic signature serves as informed consent, and automatic follow-up notifies you if the owner hasn't responded so you can get in touch and answer their questions.</p>`,
    howToSteps: [
      "Select the Veterinary template and enter the owner's and the animal's details.",
      "Break the quote down by phases: diagnosis, treatment, hospitalisation and follow-up.",
      "If there are therapeutic alternatives, present them as comparable options in the same document.",
      "Include informed consent and the payment terms in the notes.",
      "Send the quote to the owner and collect their authorisation with electronic signature.",
    ],
  },
  {
    slug: "automotive",
    nombre: "Automotive",
    titulo: "Quote Template for Garages & Automotive Repair",
    descripcion: "Create repair, maintenance, inspection and automotive service quotes with a breakdown of parts and labour.",
    emoji: "🚗",
    color: "#D32F2F",
    ejemploLineas: [
      { descripcion: "Electronic diagnostics", cantidad: 1, precio: 45 },
      { descripcion: "Timing belt kit replacement", cantidad: 1, precio: 380 },
      { descripcion: "Front brake pad replacement", cantidad: 1, precio: 120 },
      { descripcion: "Oil + filter change (full service)", cantidad: 1, precio: 95 },
      { descripcion: "Wheel alignment and balancing", cantidad: 1, precio: 60 },
    ],
    problemas: [
      "Verbal quotes the client forgets or misreads",
      "Parts and labour mixed together with no clear breakdown",
      "Clients who compare prices without understanding parts quality",
      "No repair history per vehicle",
    ],
    beneficios: [
      "Separate breakdown of OEM/aftermarket parts and labour",
      "Complete repair history per registration",
      "Client approval before starting the repair",
      "Professional PDF with parts warranty included",
    ],
    keywords: ["garage quote", "car repair quote", "automotive quote", "workshop quote", "vehicle maintenance quote"],
    icp: {
      cargo: "Garage owner",
      empresaTipo: "Independent garage of 2-15 employees",
      dolor: "Wastes time writing quotes by hand at reception while cars wait on the ramp.",
      cita: "The client asks for the quote over WhatsApp, I send it in a message, and then they don't remember what I told them.",
    },
    casoDeUso: {
      antes: "Jotted repairs in a notepad, calculated from memory and told the client the price over the phone.",
      despues: "Selects the parts from the catalogue, the system calculates automatically and sends a professional PDF with warranty included.",
      resultado: "Clients approve the quote from their phone before dropping off the car, avoiding misunderstandings about the cost.",
    },
    faqs: [
      { pregunta: "Can I distinguish between original and compatible parts in the quote?", respuesta: "Yes, you can create separate lines for each type of part and even offer the client two options: one with OEM parts and one with aftermarket, each with its price." },
      { pregunta: "Can the quote be linked to a registration or client?", respuesta: "Each quote is associated with a client in your database. You can add the registration in the notes or description, giving you a complete repair history." },
      { pregunta: "How do I handle extra work that comes up during the repair?", respuesta: "You can create a new version of the quote adding the extra lines and send it to the client for approval with electronic signature before continuing." },
    ],
    featuresEspecificos: [
      { icono: "Wrench", titulo: "Parts catalogue", desc: "Parts with up-to-date prices by make and model" },
      { icono: "Clock", titulo: "Labour times", desc: "Time guides per type of repair" },
      { icono: "FileText", titulo: "Warranty included", desc: "Warranty terms on every quote" },
      { icono: "History", titulo: "History per vehicle", desc: "Every repair for each client" },
    ],
    stats: [
      { valor: "5 min", label: "per repair quote" },
      { valor: "Parts", label: "with up-to-date prices" },
      { valor: "Warranty", label: "included in the PDF" },
    ],
    guia: `<p>In the automotive sector — garages, body shops, inspection centres and dealerships — the repair quote should specify each part with its reference and price, the estimated labour hours according to manufacturer time guides, and ancillary work such as electronic diagnostics, alignment or balancing. The client greatly values knowing whether the parts are original, equivalent or reconditioned, as this affects both the price and the warranty.</p>
<p>For complex repairs after an accident, the quote should be structured so the insurer can validate it: separating bodywork, paint, mechanical work, tyres and glass. Garages that present professional digital quotes close more repairs because they convey trust to the driver, who often doesn't know market prices and fears being overcharged.</p>
<p>DealForge lets automotive garages create repair quotes with parts references, labour times and written warranties. The client receives the quote on their phone, compares it at their convenience and authorises the repair with electronic signature before the garage starts work.</p>`,
    howToSteps: [
      "Open the Automotive template and enter the client and vehicle details (make, model, registration).",
      "Detail the parts needed with reference, type (original/equivalent) and unit price.",
      "State the labour hours per operation according to the manufacturer's time guides.",
      "Include the repair and parts warranty, and storage terms if applicable.",
      "Send the quote to the client and receive their repair authorisation with electronic signature.",
    ],
  },
  {
    slug: "real-estate",
    nombre: "Real Estate",
    titulo: "Quote Template for Real Estate Agencies & Agents",
    descripcion: "Generate real estate service proposals: valuations, management fees, property marketing plans and sale terms.",
    emoji: "🏠",
    color: "#1565C0",
    ejemploLineas: [
      { descripcion: "Professional property valuation", cantidad: 1, precio: 300 },
      { descripcion: "Marketing plan (photos + video + portals)", cantidad: 1, precio: 500 },
      { descripcion: "Basic home staging", cantidad: 1, precio: 400 },
      { descripcion: "Viewings management and negotiation", cantidad: 1, precio: 0 },
      { descripcion: "Sale fee (% of final price)", cantidad: 1, precio: 4500 },
    ],
    problemas: [
      "Owners who don't understand the value of real estate services",
      "Fees presented verbally with no professional backing",
      "Competition from free portals and low-cost agents",
      "No formalisation of the services included in the commission",
    ],
    beneficios: [
      "Service proposal with a breakdown of each included action",
      "A visual marketing plan that justifies the fees",
      "Sale agreement with instant electronic signature",
      "Automatic follow-up of pending proposals",
    ],
    keywords: ["real estate quote", "estate agent proposal", "real estate services quote", "estate agency fees"],
    icp: {
      cargo: "Estate agent",
      empresaTipo: "Independent agency or local franchise",
      dolor: "Loses listings because the owner doesn't see the value of paying a commission versus selling on their own.",
      cita: "When I present my services professionally with everything detailed, the owner understands why it's worth working with me.",
    },
    casoDeUso: {
      antes: "Explained the services out loud during the listing pitch and left a generic brochure. Many owners compared on commission alone.",
      despues: "Sends a tailored proposal with a marketing plan, included services and clear terms. The owner signs the agreement from their phone.",
      resultado: "A higher listing rate because owners clearly see the value of each service before deciding.",
    },
    faqs: [
      { pregunta: "Can I include different fee models in the same proposal?", respuesta: "Yes, you can create several options: fixed fees, a percentage of the sale, or a combination. The owner sees the alternatives and chooses their preferred one." },
      { pregunta: "Can the proposal be adapted to the type of property?", respuesta: "Each proposal is customised with the specific services for that property: whether it's a flat, a commercial unit or a house, the services and marketing plan vary." },
      { pregunta: "How do I handle the sale agreement with electronic signature?", respuesta: "Once the owner accepts your proposal, you can send them the sale agreement to sign electronically with full legal validity." },
    ],
    featuresEspecificos: [
      { icono: "Home", titulo: "Proposals per property", desc: "A marketing plan tailored to each property" },
      { icono: "PenTool", titulo: "Agreement with digital signature", desc: "Listings formalised in minutes" },
      { icono: "Camera", titulo: "Visual services", desc: "Photos, video and home staging detailed" },
      { icono: "Target", titulo: "Listing follow-up", desc: "Know which owners have seen your proposal" },
    ],
    stats: [
      { valor: "10 min", label: "per tailored proposal" },
      { valor: "Agreement", label: "digitally signed" },
      { valor: "Plan", label: "marketing included" },
    ],
    guia: `<p>The real estate service proposal — whether for the sale, rental or management of properties — must stand out from the competition in a market where many agents offer the same thing. The sale or sole-agency agreement needs to detail the services it includes: professional valuation, photo shoot, video or virtual tour, listing on portals, viewings management, negotiation and support through to completion.</p>
<p>For the owner choosing between several agents, seeing a clear breakdown of the marketing plan — the portals where it will be listed, the type of visual material to be produced and the pricing strategy — is far more convincing than a simple sheet with the commission. Including a comparative market analysis with similar properties recently sold reinforces the credibility of the proposed valuation.</p>
<p>DealForge lets real estate agencies create professional service proposals with the marketing plan included, transparent fees and a sale agreement with electronic signature. The owner approves the engagement from their device, and the agency can start marketing the property immediately with documentary backing.</p>`,
    howToSteps: [
      "Select the Real Estate template and enter the owner's and the property's details.",
      "Detail the included services: valuation, photography, portal listing, viewings and negotiation.",
      "Set the agreement terms: type of exclusivity, duration, commission and payment method.",
      "Attach a summary of the marketing plan and the comparative market analysis.",
      "Send the proposal with the integrated sale agreement for the owner's electronic signature.",
    ],
  },
  {
    slug: "catering",
    nombre: "Restaurants & Catering",
    titulo: "Quote Template for Restaurants & Catering",
    descripcion: "Quote catering services, event menus, venue hire and corporate hospitality services.",
    emoji: "🍽️",
    color: "#BF360C",
    ejemploLineas: [
      { descripcion: "Cocktail menu (assorted canapés, 80 pax)", cantidad: 80, precio: 28 },
      { descripcion: "Premium open bar (3 hours)", cantidad: 80, precio: 15 },
      { descripcion: "Service staff (6 waiters)", cantidad: 6, precio: 120 },
      { descripcion: "Tableware and glassware", cantidad: 1, precio: 350 },
      { descripcion: "Setup and breakdown", cantidad: 1, precio: 400 },
    ],
    problemas: [
      "Constant menu changes that alter the quote",
      "Clients who don't confirm guest numbers until the last minute",
      "Email quotes that get lost among conversations",
      "No clear cancellation or amendment terms",
    ],
    beneficios: [
      "Menus with a clearly broken-down price per guest",
      "Quick versioning when the menu or guest count changes",
      "Formal confirmation with electronic signature and terms",
      "Automatic follow-up of pending quotes",
    ],
    keywords: ["catering quote", "restaurant quote", "event menu quote", "corporate catering quote", "banquet quote"],
    icp: {
      cargo: "Executive chef or catering manager",
      empresaTipo: "Catering company or restaurant offering event services",
      dolor: "Gets quote requests over WhatsApp, the menu changes three times, and in the end they can't remember which version the client accepted.",
      cita: "Every event is different and I need to be able to adapt the quote quickly without starting from scratch each time.",
    },
    casoDeUso: {
      antes: "Sent quotes by email with a Word attachment. When the client asked for changes, they duplicated the file and lost track of which version was the latest.",
      despues: "Creates the quote, the client asks for menu changes, generates a new version in one click and the client approves with electronic signature.",
      resultado: "Smoother event management with every version tracked and cancellation terms formally accepted.",
    },
    faqs: [
      { pregunta: "Can I create different menu options in the same quote?", respuesta: "You can create several quotes with different menu proposals for the same event and send them to the client to compare and choose." },
      { pregunta: "How do I show the per-guest price with additional services?", respuesta: "Create separate lines: menu per person, open bar per person, and fixed services like setup or staff. The client clearly sees each component." },
      { pregunta: "Can I include cancellation terms and a confirmation deadline?", respuesta: "Yes, in the quote terms you can specify the cancellation policy, the deadline to confirm guest numbers and the payment terms." },
    ],
    featuresEspecificos: [
      { icono: "Users", titulo: "Price per guest", desc: "Automatic calculation based on the number of people" },
      { icono: "RefreshCw", titulo: "Menu versions", desc: "Change the menu and generate a new version instantly" },
      { icono: "Calendar", titulo: "Deadlines and confirmation", desc: "Confirmation deadline included" },
      { icono: "FileText", titulo: "Clear terms", desc: "Cancellation and payment formalised" },
    ],
    stats: [
      { valor: "Menus", label: "with a price per guest" },
      { valor: "Versions", label: "unlimited per event" },
      { valor: "Signature", label: "from the client before the event" },
    ],
    guia: `<p>Restaurant and catering businesses face a particular challenge when quoting: every event is different in guest numbers, menu type, dietary restrictions, room set-up and complementary services such as an open bar, welcome cocktail or show cooking. The quote should present the price per guest, breaking down each item so the client can adjust their event to their real budget.</p>
<p>In catering for weddings, celebrations or corporate events, it's common to offer several menu options at different price points. Each option should detail the dishes, the drinks included, the waiting staff, the tableware and linen, and the optional extras. Clearly stating the minimum guest numbers, the surcharges for special menus (gluten-free, vegan) and the attendee-confirmation terms avoids last-minute misunderstandings.</p>
<p>DealForge lets restaurants and catering companies build event quotes with different menu options, automatic calculation based on guest numbers and versioning for every change the client requests. The electronic signature formalises the booking and the payment schedule is documented for both parties.</p>`,
    howToSteps: [
      "Choose the Catering template and enter the client details and the event date.",
      "Set up the menu options with a price per guest, detailing dishes and drinks.",
      "Add complementary services: cocktail, open bar, room set-up, décor.",
      "State the minimum guest count, surcharges for special menus and the confirmation deadline.",
      "Send the menu options to the client and collect their choice with electronic signature.",
    ],
  },
  {
    slug: "lawyers",
    nombre: "Lawyers",
    titulo: "Quote Template for Law Firms",
    descripcion: "Generate legal fee quotes: advice, litigation, contracts, corporate services and administrative procedures.",
    emoji: "⚖️",
    color: "#37474F",
    ejemploLineas: [
      { descripcion: "Initial consultation and case review", cantidad: 1, precio: 150 },
      { descripcion: "Commercial contract drafting", cantidad: 1, precio: 600 },
      { descripcion: "Negotiation and review (per hour)", cantidad: 5, precio: 120 },
      { descripcion: "Representation in court proceedings", cantidad: 1, precio: 2500 },
      { descripcion: "Powers of attorney and filings", cantidad: 1, precio: 200 },
    ],
    problemas: [
      "Clients who don't understand the hourly vs. fixed fee structure",
      "Verbal quotes that lead to disputes over the scope of the service",
      "No formalisation of the engagement before starting",
      "Difficulty quoting proceedings of uncertain duration",
    ],
    beneficios: [
      "Fees broken down by service or by hour with caps",
      "Professional engagement letter with electronic signature",
      "Retainer terms included",
      "A professional, modern image for the firm",
    ],
    keywords: ["lawyer quote", "law firm quote", "legal fees", "legal services quote", "legal advice quote"],
    icp: {
      cargo: "Partner or lead solicitor",
      empresaTipo: "Law firm of 1-20 professionals",
      dolor: "Spends time preparing detailed quotes that the client then doesn't reply to, with no way to follow up.",
      cita: "I need the client to understand what's included and what isn't before we start, to avoid fee disputes later.",
    },
    casoDeUso: {
      antes: "Sent an email explaining the fees in free text. The client didn't always understand the scope and disputes arose over un-quoted services.",
      despues: "Sends a quote with each service broken down, retainer terms and an engagement letter the client signs electronically.",
      resultado: "A professional relationship formalised from day one, with clear expectations and fewer fee disputes.",
    },
    faqs: [
      { pregunta: "Can I quote with hourly rates and a cap?", respuesta: "Yes, you can create lines with an hourly rate estimating a number of hours, and in the terms state a maximum amount that won't be exceeded without the client's prior approval." },
      { pregunta: "How do I handle the retainer?", respuesta: "In the quote terms you can specify the retainer amount, payment deadlines and conditions. The client accepts everything with the electronic signature." },
      { pregunta: "Can it be used as a professional engagement letter?", respuesta: "The quote with electronic signature works as a professional engagement agreement. It includes services, fees, terms and the client's formal acceptance." },
    ],
    featuresEspecificos: [
      { icono: "Scale", titulo: "Clear fees", desc: "Hourly, fixed or mixed with caps" },
      { icono: "FileCheck", titulo: "Engagement letter", desc: "Formalise the relationship from day one" },
      { icono: "Banknote", titulo: "Retainer", desc: "Advance-payment terms included" },
      { icono: "Shield", titulo: "Confidentiality", desc: "Client data protected" },
    ],
    stats: [
      { valor: "Engagement", label: "professionally formalised" },
      { valor: "Fees", label: "broken down clearly" },
      { valor: "Signature", label: "electronic, legally valid" },
    ],
    guia: `<p>A law firm's engagement letter serves a dual purpose: it formalises the lawyer-client relationship and details the fees transparently. Professional conduct rules require the lawyer to inform the client about fees in advance, and a well-structured document protects both parties against potential future disputes over the scope of the representation or the cost of the service.</p>
<p>Fees can be agreed in various ways: a fixed price per matter, an hourly rate with an estimate of hours, a retainer with subsequent settlement, or a contingency fee in certain cases. The engagement letter should specify which actions it covers (claim, defence, appeals, hearings), which costs are separate (court fees, experts, agents) and at what points payments will be made. For ongoing advisory services, the monthly fee should define the number of consultations and the type of matters covered.</p>
<p>DealForge lets lawyers and law firms create professional engagement letters with structured fees, send them to the client with a legally valid electronic signature, and keep a digital record of the informed consent that professional rules require.</p>`,
    howToSteps: [
      "Open the Lawyers template and enter the client details and the legal matter.",
      "Detail the actions included in the engagement: advice, drafting, court representation.",
      "Set the fee model: fixed price, hourly rate, retainer or contingency fee.",
      "Separate third-party costs (agents, court fees, experts) from the firm's fees.",
      "Send the professional engagement letter with electronic signature to formalise the relationship.",
    ],
  },
  {
    slug: "nutrition",
    nombre: "Nutrition & Dietetics",
    titulo: "Quote Template for Nutritionists & Dietitians",
    descripcion: "Quote nutrition plans, dietary follow-ups, weight-loss programmes and sports nutrition advice.",
    emoji: "🥗",
    color: "#43A047",
    ejemploLineas: [
      { descripcion: "Initial consultation + body composition assessment", cantidad: 1, precio: 60 },
      { descripcion: "Personalised nutrition plan", cantidad: 1, precio: 80 },
      { descripcion: "Monthly follow-up (4 visits)", cantidad: 4, precio: 40 },
      { descripcion: "Personalised weekly shopping list", cantidad: 4, precio: 15 },
      { descripcion: "Weekly meal plan (4 weeks)", cantidad: 4, precio: 25 },
    ],
    problemas: [
      "Patients who compare only the price of the first consultation",
      "Unformalised follow-up programmes that get abandoned",
      "No clear quote of what each plan includes",
      "Difficulty communicating the value of long-term follow-up",
    ],
    beneficios: [
      "Plans with all sessions and services detailed",
      "Different options: basic, standard and premium",
      "Commitment formalised with electronic signature",
      "Tracking of patients who accept vs. those who don't reply",
    ],
    keywords: ["nutritionist quote", "dietitian quote", "nutrition plan quote", "sports nutrition quote"],
    icp: {
      cargo: "Nutritionist or clinical dietitian",
      empresaTipo: "Private nutrition practice or wellness centre",
      dolor: "Many patients come to the first consultation but don't commit to follow-up because they can't see clearly what it includes.",
      cita: "If the patient sees from the start everything they'll receive over the 3 months, they commit much more to the process.",
    },
    casoDeUso: {
      antes: "Explained prices verbally in the first consultation. Many patients didn't return for follow-up because they didn't understand the value of the full programme.",
      despues: "Presents a quote with the full 3-month programme: consultations, plans, follow-ups. The patient accepts digitally and commits.",
      resultado: "Greater adherence to the nutrition programme because the patient sees the full journey and formally commits from the start.",
    },
    faqs: [
      { pregunta: "Can I offer different nutrition packages?", respuesta: "Yes, you can create several quotes with different levels: a basic plan with consultations and a diet, an intermediate one with weekly follow-up, and a premium one with meal plans and shopping lists." },
      { pregunta: "Can online and in-person sessions be included?", respuesta: "Each quote line can state whether the consultation is in-person or online, with different prices if you wish. The patient clearly sees which format they're booking." },
      { pregunta: "How do I formalise the patient's commitment?", respuesta: "With the electronic signature, the patient accepts the full programme before starting. This increases commitment and reduces drop-outs." },
    ],
    featuresEspecificos: [
      { icono: "Apple", titulo: "Nutrition plans", desc: "Quotes with clear sessions and services" },
      { icono: "Repeat", titulo: "Follow-up included", desc: "Monthly visits detailed in the plan" },
      { icono: "Layers", titulo: "Package options", desc: "Basic, standard and premium to choose from" },
      { icono: "CheckCircle", titulo: "Formal commitment", desc: "Electronic signature that reduces drop-outs" },
    ],
    stats: [
      { valor: "Packages", label: "with detailed services" },
      { valor: "3 months", label: "of follow-up included" },
      { valor: "Signature", label: "of patient commitment" },
    ],
    guia: `<p>Nutrition and dietetics professionals — nutritionists, dietitians and food coaches — work with support programmes that combine consultations, personalised meal plans, weekly follow-up and nutritional education. The quote should reflect this programme structure rather than just a price per single consultation, since sustainable results require a time commitment from the patient.</p>
<p>Offering packages of different durations — 4-, 8- or 12-week programmes — with different levels of support lets the patient choose according to their goal and budget. Each package should specify the number of in-person or online consultations, the meal plans to be delivered, whether it includes body-composition analysis, a personalised shopping list and availability to answer questions between sessions via messaging.</p>
<p>DealForge makes it easy for nutritionists to create proposals with clear service packages, price calculation with a discount for the programme versus a single session, and digital sending to the patient. The electronic signature acts as the patient's formal commitment to the programme, which improves adherence and reduces last-minute cancellations.</p>`,
    howToSteps: [
      "Select the Nutrition template and enter the patient details.",
      "Set up the nutritional support packages with duration, consultations and included services.",
      "State whether it includes body analysis, meal plans, shopping list and between-session support.",
      "Offer several programme options so the patient can choose by goal and budget.",
      "Send the proposal and formalise the patient's commitment with electronic signature.",
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
  transporte: "transport",
  formacion: "training",
  seguridad: "security",
  "clinica-dental": "dental-clinic",
  interiorismo: "interior-design",
  contabilidad: "accounting",
  veterinaria: "veterinary",
  automocion: "automotive",
  inmobiliaria: "real-estate",
  restauracion: "catering",
  abogados: "lawyers",
  nutricion: "nutrition",
};
