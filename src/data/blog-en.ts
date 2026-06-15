// English blog posts. Unlike the Spanish blog (DB-driven via prisma.blogPost),
// the English blog is data-file based — same pattern as recursos-en / industrias-en —
// so it deploys with the code and needs no DB seeding. Routes: /en/blog + /en/blog/[slug].

export interface BlogPostEn {
  slug: string;
  titulo: string;
  extracto: string;
  contenido: string; // full HTML
  categoria: string; // sales, cpq, ia, producto, guias, general
  tags: string[];
  autor: string;
  publishedAt: string; // ISO date
  updatedAt?: string; // ISO date; defaults to publishedAt
  imagen?: string;
  metaTitulo?: string;
  metaDescripcion?: string;
  metaKeywords?: string;
}

export const blogPostsEn: BlogPostEn[] = [
  // ─── 1. What a CPQ is and why your small business needs one ───
  {
    slug: "what-is-cpq-small-business",
    titulo: "What a CPQ is and why your small business needs one",
    extracto:
      "Learn what CPQ (Configure, Price, Quote) means, how it works, and why more and more small businesses are adopting it to sell faster.",
    categoria: "cpq",
    tags: ["cpq", "small business", "sales", "productivity", "quotes"],
    autor: "DealForge",
    publishedAt: "2026-03-16T09:00:00Z",
    metaTitulo: "What a CPQ is and why your small business needs one | DealForge",
    metaDescripcion:
      "Learn what a CPQ (Configure, Price, Quote) is, how it helps small businesses quote faster, and why it's key to scaling your sales.",
    metaKeywords:
      "cpq, what is cpq, cpq for small business, quoting software, configure price quote",
    contenido: `
<p>If you run a small business and spend hours every week preparing quotes by hand in spreadsheets, you've probably felt the frustration of sending out quotes with errors, out-of-date prices or inconsistent formatting. There's a category of software designed to solve exactly this problem: the <strong>CPQ</strong>.</p>

<h2>What CPQ stands for</h2>

<p>CPQ stands for <strong>Configure, Price, Quote</strong>. It's a type of tool that automates the entire process of creating sales quotes, from selecting products or services to generating the final document you send to the client.</p>

<p>Instead of opening an Excel template, looking up prices on another sheet, calculating discounts manually and formatting the PDF by hand, a CPQ lets you do all of that in a single, guided flow. The result: professional, error-free quotes in a fraction of the time.</p>

<h2>The three pillars of a CPQ</h2>

<h3>1. Configure</h3>

<p>The first step is selecting what you're going to offer the client. A good CPQ lets you define your catalogue of products and services with business rules. For example:</p>

<ul>
  <li>If you sell consulting services, you can configure packages with different levels of hours.</li>
  <li>If you sell physical products, you can set valid combinations and compatible accessories.</li>
  <li>If you offer subscriptions, you can define monthly and annual plans with different terms.</li>
</ul>

<p>These rules stop your sales team from sending quotes with impossible combinations or discontinued products.</p>

<h3>2. Price</h3>

<p>Once the offer is configured, the CPQ automatically applies the pricing rules. This includes:</p>

<ul>
  <li><strong>Base prices</strong> kept up to date from your central catalogue.</li>
  <li><strong>Volume discounts</strong> or discounts by client type.</li>
  <li><strong>Minimum margins</strong> to protect your profitability.</li>
  <li><strong>Taxes and surcharges</strong> calculated based on the client's region.</li>
</ul>

<p>Forget broken Excel formulas or discounts someone applied "off the top of their head" without approval. The CPQ guarantees consistency in every quote.</p>

<h3>3. Quote</h3>

<p>The final step is generating the document the client will receive. A professional CPQ produces PDFs with your branding, terms and conditions, a product breakdown, validity dates and everything you need to make a good impression.</p>

<p>On top of that, many tools let you send the quote directly by email and track whether the client has opened it.</p>

<h2>Why a CPQ is especially useful for small businesses</h2>

<p>It's common to think CPQ is only for large companies with sales teams of hundreds of people. The reality is that small businesses benefit the most, for one simple reason: <strong>they have less room for error</strong>.</p>

<p>When you're a company of 5, 10 or 50 people, every sale counts. Losing a client because your quote arrived late, had a pricing error or looked unprofessional has a direct impact on your revenue. Let's look at the concrete benefits:</p>

<h3>Real time savings</h3>

<p>A study by Aberdeen Group found that companies using CPQ reduce quote-creation time by an average of <strong>28%</strong>. In a small business where the sales director (or the founder themselves) is the one preparing the quotes, that can mean getting back several hours a week.</p>

<h3>Fewer errors, more trust</h3>

<p>Errors in quotes don't just cost money; they erode the client's trust. A CPQ eliminates calculation errors, out-of-date prices and formatting inconsistencies. Your client always receives a flawless document.</p>

<h3>Shorter sales cycles</h3>

<p>When you can send a professional quote in minutes instead of days, the client makes decisions faster. Response speed is one of the factors that most influences closing sales, especially in competitive markets.</p>

<h3>Scaling without chaos</h3>

<p>As your business grows and you hire more salespeople, a CPQ ensures everyone follows the same pricing and discount rules. You don't need to rely on the "star salesperson's" memory or risk a new hire sending out incorrect prices.</p>

<h2>CPQ vs. spreadsheets: the inevitable comparison</h2>

<p>Many small businesses start (and stay) with Excel or Google Sheets to manage their quotes. It's understandable: they're familiar and seemingly free tools. But as you grow, the limitations become obvious:</p>

<ul>
  <li><strong>Uncontrolled versions:</strong> "quote_final_v3_DEFINITIVE.xlsx" is a classic for a reason.</li>
  <li><strong>No traceability:</strong> You don't know who changed which price or when.</li>
  <li><strong>Inconsistent formatting:</strong> Every salesperson has their own template (or their own interpretation of the template).</li>
  <li><strong>Impossible to scale:</strong> When you have 5 salespeople sending 20 quotes a day, chaos is inevitable.</li>
</ul>

<p>A CPQ isn't a luxury; it's the natural evolution of spreadsheets for teams that want to sell professionally.</p>

<h2>How to choose a CPQ for your small business</h2>

<p>Not all CPQs are the same. Those designed for large corporations tend to be complex, expensive and have long learning curves. For a small business, the ideal is to look for a solution that meets these criteria:</p>

<ul>
  <li><strong>Ease of use:</strong> If you need a consultant to set it up, it's probably not for you.</li>
  <li><strong>Accessible pricing:</strong> Look for monthly subscription models without large upfront costs.</li>
  <li><strong>Customisation:</strong> It should adapt to your catalogue and your brand, not the other way around.</li>
  <li><strong>Integration:</strong> Ideally, it should connect with the tools you already use (CRM, email, etc.).</li>
  <li><strong>Good support:</strong> It sounds obvious, but responsive support makes a real difference when you're getting started.</li>
</ul>

<p>At <a href="/en/features">DealForge</a> we've designed a CPQ built specifically for small businesses. You can explore in detail <a href="/en/what-is-cpq">what a CPQ is</a> on our dedicated page.</p>

<h2>Case study: from 2 hours to 5 minutes</h2>

<p>Imagine a digital marketing services company with 8 employees. Every week they prepare between 10 and 15 proposals for potential clients. Before using a CPQ, the process looked like this:</p>

<ol>
  <li>The salesperson gathers the client's requirements by phone or email.</li>
  <li>They open the Excel template and look up the price of each service.</li>
  <li>They calculate discounts by hand and adjust the margins.</li>
  <li>They format the document, add the logo and the terms.</li>
  <li>They export to PDF and send it by email.</li>
</ol>

<p>Average time: <strong>1 hour and 45 minutes</strong> per proposal. With a CPQ, steps 2 to 5 are reduced to a few clicks. The salesperson selects the services, the system calculates everything automatically and generates the PDF ready to send. Average time: <strong>5 minutes</strong>.</p>

<p>Multiplied by 15 weekly proposals, that's more than <strong>25 hours recovered</strong> every week. Hours the team can devote to what really matters: talking to clients and closing sales.</p>

<h2>Getting started with a CPQ</h2>

<p>If you've never used a CPQ, the adoption process is simpler than it seems. The basic steps are:</p>

<ol>
  <li><strong>Define your catalogue:</strong> List your products or services with their base prices.</li>
  <li><strong>Set pricing rules:</strong> Volume discounts, minimum margins, prices by client type.</li>
  <li><strong>Customise your template:</strong> Upload your logo, define your brand colours and the terms-and-conditions text.</li>
  <li><strong>Test with a real quote:</strong> Create a quote for a current client and compare the result with your previous method.</li>
</ol>

<p>Most small businesses that try a CPQ are surprised by how quickly they adapt. It's not about learning a complex system, but about letting technology do the repetitive work for you.</p>

<blockquote>
  <p>The time you spend preparing quotes is time you don't spend selling. A CPQ gives that time back.</p>
</blockquote>

<h2>Conclusion</h2>

<p>The CPQ is no longer a tool exclusive to large corporations. The small businesses that adopt it sell faster, with fewer errors and a more professional image. If you still rely on spreadsheets for your quotes, it might be time to make the leap.</p>

<p><strong>Get started today:</strong> <a href="/registro?lang=en">Create your free DealForge account</a> and discover how a CPQ can transform your sales process in a matter of minutes.</p>
`.trim(),
  },

  // ─── 2. How to create a professional quote in 5 minutes ───
  {
    slug: "how-to-create-professional-quote",
    titulo: "How to create a professional quote in 5 minutes",
    extracto:
      "A step-by-step guide to creating professional quotes in minutes. Learn what a good quote should include and how to automate the process.",
    categoria: "guias",
    tags: ["quotes", "estimates", "guide", "sales", "pdf"],
    autor: "DealForge",
    publishedAt: "2026-03-18T10:00:00Z",
    metaTitulo: "How to create a professional quote in 5 minutes",
    metaDescripcion:
      "Learn to create professional quotes in 5 minutes with this practical guide. Includes structure, tips and tools for small businesses.",
    metaKeywords:
      "professional quote, how to make a quote, quote template, quote pdf",
    contenido: `
<p>Sending a professional quote can be the difference between closing a sale or losing it to a competitor who simply responded sooner and better. Yet many small businesses still spend too much time on this process, or worse, send documents that don't inspire confidence.</p>

<p>In this guide we explain exactly what a professional quote should include and how you can create one in under 5 minutes.</p>

<h2>What a quote is and why its quality matters</h2>

<p>A quote (also called an estimate or commercial proposal) is a formal document in which you present a potential client with the products or services you offer, along with their prices and terms. In many cases, it's the first professional impression the client gets of your company.</p>

<p>A poorly made quote can communicate disorganisation, a lack of seriousness or even create doubt about your prices. A clear, well-designed quote with all the necessary information, on the other hand, says: "we're professionals and we take your business seriously".</p>

<h2>The 7 elements every professional quote should include</h2>

<h3>1. Your company details</h3>

<p>Include your trading name, logo, address, phone, email and, where applicable, your tax/VAT number. This adds legitimacy and makes it easy to get in touch.</p>

<h3>2. The client's details</h3>

<p>The company or person's name, contact details and, where applicable, the point of contact within the organisation. Personalising the quote with the client's name shows attention to detail.</p>

<h3>3. Quote number and date</h3>

<p>A unique reference number lets you track the quote and avoid confusion. The date is essential so the client knows when the document was issued.</p>

<h3>4. Breakdown of products or services</h3>

<p>This is the heart of the quote. Each line should include:</p>

<ul>
  <li>A clear description of the product or service.</li>
  <li>Quantity or units.</li>
  <li>Unit price.</li>
  <li>Line subtotal.</li>
</ul>

<p>Avoid generic descriptions like "Consulting services". Instead, be specific: "Technical SEO audit — website of up to 500 pages".</p>

<h3>5. Taxes and total</h3>

<p>Show the subtotal before tax, the percentage and amount of VAT (or applicable tax) and the final total. Transparency on pricing builds trust.</p>

<h3>6. Commercial terms</h3>

<p>Include at least:</p>

<ul>
  <li><strong>Quote validity:</strong> For example, "This quote is valid for 30 days from the date of issue".</li>
  <li><strong>Payment method:</strong> Bank transfer, card, instalments, etc.</li>
  <li><strong>Delivery time:</strong> When the client will receive the product or service.</li>
  <li><strong>Warranties:</strong> Where applicable, what they cover and for how long.</li>
</ul>

<h3>7. Call to action</h3>

<p>Don't leave the client unsure of what to do next. Include clear instructions: "To accept this quote, reply to this email" or "Digitally sign the attached document".</p>

<h2>Step by step: create your quote in 5 minutes</h2>

<p>Now that you know what to include, let's look at how to do it quickly and efficiently.</p>

<h3>Step 1: Prepare your catalogue in advance (first time only)</h3>

<p>Before you can quote in 5 minutes, you need your catalogue of products or services organised with up-to-date prices. This is a one-off investment of time that will save you hours every week.</p>

<h3>Step 2: Select the products or services for the client</h3>

<p>Instead of writing each line manually, select the items from your catalogue. If you use a tool like <a href="/en/free-quote-generator">DealForge's PDF quote generator</a>, it's as simple as clicking the products you need.</p>

<h3>Step 3: Adjust quantities and discounts</h3>

<p>Change the quantities to suit the client's needs and apply discounts where appropriate. A good system will automatically calculate the subtotals and the total.</p>

<h3>Step 4: Review and personalise</h3>

<p>Before sending, check that all the details are correct. Add a personalised note if needed, such as "Following our conversation on Tuesday, here is the proposal...".</p>

<h3>Step 5: Generate the PDF and send</h3>

<p>Export the quote as a PDF. This format is universal, looks the same on every device and can't be accidentally edited by the client. Send it by email with a short, professional message.</p>

<h2>Common mistakes to avoid</h2>

<p>Even with a good structure, there are frequent mistakes that can ruin a quote:</p>

<ul>
  <li><strong>Taking too long to send:</strong> If a client asks for a quote and receives it three days later, they've probably already checked your competition.</li>
  <li><strong>Prices without tax (or with tax unclear):</strong> Always specify whether prices include or exclude tax.</li>
  <li><strong>Calculation errors:</strong> Nothing destroys trust faster than a subtotal that doesn't add up.</li>
  <li><strong>Sloppy formatting:</strong> A document with different fonts, no logo and untidy layout conveys a lack of professionalism.</li>
  <li><strong>No follow-up:</strong> Sending the quote and forgetting about it. Set a reminder to follow up after 2-3 days.</li>
</ul>

<h2>Tools for creating quotes quickly</h2>

<p>There are several options depending on your level of need:</p>

<ul>
  <li><strong>Spreadsheets:</strong> Functional to start with, but hard to scale and prone to errors.</li>
  <li><strong>Word/Docs templates:</strong> Better presentation, but the same problem of manual maintenance.</li>
  <li><strong>CPQ software:</strong> The professional option. It automates the whole process and produces consistent results.</li>
</ul>

<p>If your business sends more than 5 quotes a week, CPQ software pays for itself with the time you save.</p>

<h2>Final tips for quotes that close sales</h2>

<ul>
  <li><strong>Respond quickly:</strong> Response speed is one of the biggest predictors of closing.</li>
  <li><strong>Be transparent:</strong> Break everything down. Clients prefer to know exactly what they're paying for.</li>
  <li><strong>Offer options:</strong> Where possible, present two or three alternatives (basic, standard, premium). This gives the client a sense of control.</li>
  <li><strong>Include testimonials or success stories:</strong> A short line from a satisfied client can make the difference.</li>
</ul>

<blockquote>
  <p>A professional quote isn't just a pricing document; it's your commercial calling card.</p>
</blockquote>

<p><strong>Create professional quotes now:</strong> <a href="/registro?lang=en">Sign up free at DealForge</a> and generate your first PDF quote in under 5 minutes. No hassle, no learning curve.</p>
`.trim(),
  },

  // ─── 3. 5 quoting mistakes that lose you sales ───
  {
    slug: "5-quoting-mistakes-that-lose-sales",
    titulo: "5 quoting mistakes that lose you sales",
    extracto:
      "Discover the 5 most common mistakes small businesses make when creating quotes and how to fix them to close more sales.",
    categoria: "ventas",
    tags: ["sales", "quotes", "mistakes", "small business", "estimates"],
    autor: "DealForge",
    publishedAt: "2026-03-20T08:30:00Z",
    metaTitulo: "5 quoting mistakes that lose you sales",
    metaDescripcion:
      "Avoid the 5 most frequent mistakes in sales quotes. Learn how each one affects your sales and what to do to fix it.",
    metaKeywords:
      "quoting mistakes, losing sales, sales quotes, improve quotes, quote errors",
    contenido: `
<p>Preparing quotes is one of the most important (and most undervalued) activities in any small business. A good quote can be the nudge the client needs to say yes. A bad one can mean they don't even reply.</p>

<p>After analysing hundreds of sales processes in small businesses, we've identified 5 recurring mistakes that directly affect closing sales. The good news is that they all have a fix.</p>

<h2>Mistake 1: Taking too long to send the quote</h2>

<h3>The problem</h3>

<p>A potential client contacts you interested in your services. You tell them you'll send a quote. 24, 48 or even 72 hours go by before they receive it. By then, they've already requested quotes from two competitors and probably made a decision.</p>

<p>According to a Harvard Business Review study, companies that respond to a lead within the first hour are <strong>7 times more likely</strong> to qualify the prospect than those that respond after an hour. Speed matters — a lot.</p>

<h3>The fix</h3>

<p>Automate quote creation so you can send quotes in minutes, not days. Having a digital catalogue with up-to-date prices and predefined templates lets you generate a professional quote while you're still on the call with the client.</p>

<p>Check out our <a href="/en/resources">free resources</a> to learn how to optimise your quoting process step by step.</p>

<h2>Mistake 2: Generic quotes with no personalisation</h2>

<h3>The problem</h3>

<p>Sending the same quote to every client, only changing the name, is a mistake many small businesses make without realising. The client senses you haven't given them attention, that they're "just another one" and that you haven't understood their specific needs.</p>

<p>A generic quote says: "Here are our prices". A personalised quote says: "I've listened to what you need and this is my proposal for your specific situation".</p>

<h3>The fix</h3>

<p>Personalise each quote with:</p>

<ul>
  <li>An <strong>introductory note</strong> that references the previous conversation or meeting.</li>
  <li><strong>Products or services relevant</strong> to the needs the client expressed (not your whole catalogue).</li>
  <li><strong>Package options</strong> adapted to their budget or scale.</li>
  <li>The <strong>client's name</strong> and their company details spelled correctly.</li>
</ul>

<p>Personalisation doesn't have to take more time if you have the right tools. A system with modular templates lets you create personalised quotes in minutes.</p>

<h2>Mistake 3: A lack of clarity on prices and terms</h2>

<h3>The problem</h3>

<p>Have you ever received a quote where it's unclear whether tax is included, what the payment method is or how long the offer is valid? Ambiguity creates distrust, and distrust kills sales.</p>

<p>Clients want to know exactly how much they're going to pay and under what terms. If they have to ask you to clarify something that should be in the document, you've lost points.</p>

<h3>The fix</h3>

<p>Every quote should clearly and visibly include:</p>

<ul>
  <li><strong>Detailed breakdown:</strong> Unit price, quantity, line subtotal.</li>
  <li><strong>Taxes:</strong> VAT or other applicable taxes, clearly separated.</li>
  <li><strong>Final total:</strong> What the client will actually pay, no surprises.</li>
  <li><strong>Validity:</strong> The date until which prices hold (usually 15-30 days).</li>
  <li><strong>Payment terms:</strong> Deadlines, accepted methods, possible early-payment discounts.</li>
  <li><strong>Delivery times:</strong> When they'll receive the product or service.</li>
</ul>

<p>Transparency doesn't just avoid misunderstandings; it also speeds up the client's decision-making.</p>

<h2>Mistake 4: Sloppy, unprofessional presentation</h2>

<h3>The problem</h3>

<p>Your quote is a reflection of your company. If you send a document with different fonts, no logo, inconsistent colours or a format that looks different on every device, you're communicating disorganisation.</p>

<p>No matter how good your product or service is; if the quote doesn't convey professionalism, the client will wonder whether the rest of your work is just as careless. The first visual impression counts more than we think.</p>

<h3>The fix</h3>

<p>Invest time (once) in creating a professional template that includes:</p>

<ul>
  <li><strong>Your logo</strong> in a prominent place.</li>
  <li><strong>Consistent brand colours</strong> throughout the document.</li>
  <li><strong>Legible typography</strong> and a clear visual hierarchy.</li>
  <li><strong>An orderly structure:</strong> Header, body with the breakdown, terms and footer.</li>
  <li><strong>PDF format:</strong> Never send quotes in editable formats like .docx or .xlsx.</li>
</ul>

<p>Once you have the template, every new quote keeps the same visual quality with no extra effort.</p>

<h2>Mistake 5: No follow-up after sending</h2>

<h3>The problem</h3>

<p>This is perhaps the most costly mistake and the easiest to make. You send a perfect quote — well designed, personalised and on time... and then you sit back and wait. Days go by with no reply and you don't contact the client again.</p>

<p>The reality is that clients are busy. They may have seen your quote, found it interesting, but an urgent meeting distracted them and they forgot. Without proactive follow-up on your part, that sale cools off until it disappears.</p>

<h3>The fix</h3>

<p>Set up a systematic follow-up process:</p>

<ol>
  <li><strong>Day 1:</strong> Send the quote with a short, professional message.</li>
  <li><strong>Day 2-3:</strong> If you haven't had a reply, send a follow-up email asking whether they have any questions.</li>
  <li><strong>Day 7:</strong> Make a brief call. Sometimes a 2-minute conversation closes what an email can't.</li>
  <li><strong>Day 14:</strong> Final follow-up before the quote expires. Create urgency naturally: "Just a reminder that this quote is valid until Friday".</li>
</ol>

<p>Modern CPQ tools let you know when the client has opened the quote, which helps you pick the perfect moment to follow up.</p>

<h2>The cumulative impact of these mistakes</h2>

<p>Each of these mistakes, on its own, can cost you the occasional sale. But when they combine, the impact is devastating. Picture this scenario:</p>

<p>An interested client asks you for a quote. You take two days to send it (Mistake 1). When you send it, it's a generic template (Mistake 2) with confusing prices (Mistake 3) and sloppy formatting (Mistake 4). The client, unimpressed, leaves it in their inbox. You never follow up (Mistake 5). Sale lost.</p>

<p>Now picture the opposite: you send the quote in 10 minutes, personalised for the client, with clear prices, professional design, and you follow up the next day. Your chances of closing multiply.</p>

<h2>How DealForge helps you avoid these 5 mistakes</h2>

<p>We designed DealForge with exactly these problems in mind:</p>

<ul>
  <li><strong>Speed:</strong> Generate quotes in minutes, not hours, thanks to your digital catalogue and predefined templates.</li>
  <li><strong>Personalisation:</strong> Each quote adapts to the client with notes, specific products and package options.</li>
  <li><strong>Clarity:</strong> Automatic calculation of prices, taxes and totals. No errors, no ambiguity.</li>
  <li><strong>Professionalism:</strong> PDFs with your branding, consistent formatting and clean design on every document.</li>
  <li><strong>Follow-up:</strong> Notifications when the client opens your quote so you know when to get in touch.</li>
</ul>

<blockquote>
  <p>Don't lose any more sales to avoidable mistakes. The quoting process is far too important to leave to chance.</p>
</blockquote>

<p><strong>Start quoting better today:</strong> <a href="/registro?lang=en">Sign up free at DealForge</a> and remove these 5 mistakes from your sales process from day one.</p>
`.trim(),
  },

  // ─── 4. CPQ vs CRM: differences and when you need each ───
  {
    slug: "cpq-vs-crm-differences",
    titulo: "CPQ vs CRM: differences and when you need each",
    extracto:
      "Understand the key differences between a CPQ and a CRM, how they complement each other, and which one your small business needs as it grows.",
    categoria: "cpq",
    tags: ["cpq", "crm", "comparison", "sales", "tools"],
    autor: "DealForge",
    publishedAt: "2026-03-23T11:00:00Z",
    metaTitulo: "CPQ vs CRM: differences and when you need each",
    metaDescripcion:
      "Compare CPQ and CRM: what each one does, how they differ and how to decide which your small business needs. A complete guide with practical examples.",
    metaKeywords:
      "cpq vs crm, cpq crm differences, crm for small business, cpq or crm, sales tools",
    contenido: `
<p>If you're looking for tools to improve your sales process, you've surely come across two acronyms that appear constantly: <strong>CRM</strong> and <strong>CPQ</strong>. Both are sales tools, both promise to improve your efficiency and both seem to do "something with clients and quotes". But they are very different.</p>

<p>In this article we explain what each one does, how they differ and, most importantly, when you need one, the other or both.</p>

<h2>What a CRM is</h2>

<p>CRM stands for <strong>Customer Relationship Management</strong>. A CRM is a tool that helps you organise and manage your interactions with clients and prospects throughout the entire sales cycle.</p>

<p>The main functions of a CRM include:</p>

<ul>
  <li><strong>Contact management:</strong> A centralised database of clients, prospects and companies.</li>
  <li><strong>Sales pipeline:</strong> A view of the sales funnel with opportunities at each stage.</li>
  <li><strong>Interaction history:</strong> A record of calls, emails, meetings and notes with each contact.</li>
  <li><strong>Task tracking:</strong> Reminders and pending activities for the sales team.</li>
  <li><strong>Reports and metrics:</strong> Data on conversion, sales cycle, team performance, etc.</li>
</ul>

<p>In short, a CRM tells you <strong>who</strong> your client is, <strong>where</strong> they are in the buying process and <strong>what interactions</strong> you've had with them.</p>

<h2>What a CPQ is</h2>

<p>CPQ stands for <strong>Configure, Price, Quote</strong>. As we explain in detail in our article <a href="/en/what-is-cpq">what a CPQ is</a>, it's a tool that automates the creation of quotes and estimates.</p>

<p>The main functions of a CPQ include:</p>

<ul>
  <li><strong>Product catalogue:</strong> A database of products and services with prices, rules and options.</li>
  <li><strong>Guided configuration:</strong> Product selection with business rules that prevent invalid combinations.</li>
  <li><strong>Automatic price calculation:</strong> Discounts, margins, taxes and totals with no manual intervention.</li>
  <li><strong>Document generation:</strong> Professional PDFs with your company branding, ready to send to the client.</li>
  <li><strong>Approvals:</strong> Approval flows for discounts that exceed certain limits.</li>
</ul>

<p>In short, a CPQ tells you <strong>what</strong> you'll offer the client, at <strong>what price</strong>, and generates the <strong>document</strong> that formalises the proposal.</p>

<h2>The fundamental difference</h2>

<p>The simplest way to understand the difference is this:</p>

<ul>
  <li>The <strong>CRM</strong> manages the <strong>relationship</strong> with the client (who they are, what they want, when to talk to them).</li>
  <li>The <strong>CPQ</strong> manages the <strong>offer</strong> for the client (what you offer, at what price, in which document).</li>
</ul>

<p>They are complementary tools, not substitutes. A CRM without a CPQ knows everything about the client but can't quickly generate a professional quote. A CPQ without a CRM generates excellent quotes but has no context about the client's history.</p>

<h2>Detailed comparison</h2>

<p>Let's look at the differences point by point for a clear picture:</p>

<h3>Main focus</h3>
<p>The CRM focuses on people and relationships. It records every touchpoint, every email, every call. Its goal is that you never lose the thread of a sales conversation. The CPQ, on the other hand, focuses on the product and the price. Its goal is that every quote is accurate, consistent and professional.</p>

<h3>Point in the sales cycle</h3>
<p>The CRM covers the whole cycle: from when a lead enters your radar until they become a client and beyond (after-sales, renewals, upselling). The CPQ kicks in at a specific moment: when you need to create a financial proposal for the client.</p>

<h3>Main users</h3>
<p>The CRM is used by the whole sales team, marketing and even support. The CPQ is used mainly by salespeople and, in small businesses, often by the director or founder themselves.</p>

<h3>Key data it handles</h3>
<p>The CRM handles contact data, interactions and history. The CPQ handles product catalogues, pricing rules and document templates.</p>

<h2>When you need a CRM</h2>

<p>A CRM is essential when:</p>

<ul>
  <li>Your sales team has more than 2-3 people and they need to share client information.</li>
  <li>You manage a volume of leads that's impossible to track mentally or with notes.</li>
  <li>You want to measure metrics like conversion rate, sales cycle or performance per salesperson.</li>
  <li>You need to coordinate marketing and sales with a common database.</li>
  <li>Your sales process involves multiple interactions over weeks or months.</li>
</ul>

<h2>When you need a CPQ</h2>

<p>A CPQ becomes necessary when:</p>

<ul>
  <li>You send more than 5-10 quotes a week and the manual process takes up too much time.</li>
  <li>Your catalogue has some complexity: multiple products, price variations or volume discounts.</li>
  <li>You need all your salespeople to send quotes with the same format and the same pricing rules.</li>
  <li>You've lost sales to pricing errors, badly calculated discounts or quotes that took too long.</li>
  <li>You want to project a professional, consistent image in every sales proposal.</li>
</ul>

<h2>When you need both</h2>

<p>The combination of CRM and CPQ is the most powerful. You need it when:</p>

<ul>
  <li>Your sales process is complex: you identify a lead (CRM), qualify it (CRM), prepare a proposal (CPQ), follow up (CRM) and close (both).</li>
  <li>You want your salespeople to have the full client context when creating a quote.</li>
  <li>You need reports that connect sales activity (CRM) with quoting results (CPQ).</li>
</ul>

<p>In an ideal flow, the salesperson sees in their CRM that a lead is ready to receive a proposal, opens the CPQ, generates the quote in minutes with the right products, sends it, and the CRM automatically records that activity.</p>

<h2>The role of artificial intelligence</h2>

<p>Both CRMs and CPQs are incorporating artificial intelligence to be even more useful. In the case of the CPQ, AI can:</p>

<ul>
  <li><strong>Suggest products:</strong> Based on what similar clients bought.</li>
  <li><strong>Optimise prices:</strong> Recommending discounts that maximise the chance of closing without sacrificing margin.</li>
  <li><strong>Detect errors:</strong> Spotting inconsistencies before the quote goes out.</li>
  <li><strong>Write descriptions:</strong> Generating personalised text for each proposal.</li>
</ul>

<p>If you're interested in how AI is changing sales, you can explore the capabilities of <a href="/en/features">Forge AI</a>, our artificial intelligence assistant built into DealForge.</p>

<h2>Which solution to choose by stage</h2>

<p>Not all small businesses need the same thing at the same time. Here's a practical guide based on your situation:</p>

<h3>You're starting out (1-3 people, few clients)</h3>
<p>You can probably manage your contacts with a simple spreadsheet, but a CPQ will already save you time and improve your professional image. Start there.</p>

<h3>You're growing (4-15 people, dozens of active clients)</h3>
<p>You now need a CRM so you don't lose the thread of conversations. And a CPQ is almost essential if you send more than 10 quotes a week. It's time to have both.</p>

<h3>You're established (15+ people, multiple salespeople)</h3>
<p>Integrated CRM and CPQ are the norm. You need information to flow between both systems without friction. Look for solutions that offer native integrations.</p>

<blockquote>
  <p>The CRM tells you who to sell to. The CPQ helps you sell to them well. Together, they're the foundation of an efficient sales process.</p>
</blockquote>

<p><strong>Discover the CPQ designed for small businesses:</strong> <a href="/registro?lang=en">Try DealForge free</a> and complement your CRM with the quoting tool your sales team needs.</p>
`.trim(),
  },

  // ─── 5. How AI is transforming small business sales ───
  {
    slug: "how-ai-is-transforming-small-business-sales",
    titulo: "How AI is transforming small business sales",
    extracto:
      "Explore how artificial intelligence is changing the way small businesses sell: from lead generation to writing proposals.",
    categoria: "ia",
    tags: ["artificial intelligence", "sales", "small business", "automation", "productivity"],
    autor: "DealForge",
    publishedAt: "2026-03-26T09:30:00Z",
    metaTitulo: "How AI is transforming small business sales",
    metaDescripcion:
      "Discover how small businesses are using artificial intelligence to sell faster, automate tasks and compete with large companies.",
    metaKeywords:
      "ai small business sales, artificial intelligence sales, sales automation, ai for small business",
    contenido: `
<p>Artificial intelligence is no longer science fiction or something reserved for tech giants with multi-million budgets. In the last two years, AI has become so democratised that a 5-person small business can access tools that until recently were only within reach of large corporations.</p>

<p>But beyond the hype and exaggerated promises, there are concrete, practical uses of AI that are changing the way small businesses sell. In this article we look at the most relevant ones.</p>

<h2>The current state of AI in sales</h2>

<p>Before getting into practical cases, it's important to understand what AI can (and can't) do in a small-business sales context in 2026.</p>

<p>Today's AI excels in three fundamental areas:</p>

<ul>
  <li><strong>Natural language processing:</strong> Understanding and generating text with near-human quality.</li>
  <li><strong>Pattern analysis:</strong> Identifying trends in large volumes of data.</li>
  <li><strong>Intelligent automation:</strong> Carrying out repetitive tasks with judgement, not just fixed rules.</li>
</ul>

<p>What AI still doesn't do well is replace human relationships, understand a client's emotions or make complex strategic decisions. And that's precisely what makes the human sales team valuable.</p>

<h2>5 practical AI applications in sales for small businesses</h2>

<h3>1. Automatic writing of proposals and quotes</h3>

<p>This is perhaps the most immediate application with the greatest return for a small business. AI can help you write product descriptions, personalised notes for clients and accompanying text for your quotes.</p>

<p>Instead of writing from scratch every time you prepare a proposal, the AI analyses the client context and generates a draft you can review and adjust in seconds. The result is a quote that sounds personalised without requiring 30 minutes of writing.</p>

<p>In <a href="/en/features">Forge AI</a>, our assistant built into DealForge, we've implemented exactly this: the system suggests descriptions, adjusts the tone to the type of client and generates accompanying text you can approve with one click.</p>

<h3>2. Intelligent lead qualification</h3>

<p>Not all leads have the same potential. AI can analyse the available data about a prospect (sector, company size, previous interactions, behaviour on your website) and assign them a close-probability score.</p>

<p>For a small business with limited resources, this is especially valuable. Instead of devoting the same time to every lead, you can concentrate your efforts on those most likely to become clients. It's not about ignoring anyone, but about prioritising intelligently.</p>

<h3>3. Predictive sales analysis</h3>

<p>AI can analyse your sales history and spot patterns the human eye would struggle to see:</p>

<ul>
  <li>Which products sell best at certain times of year.</li>
  <li>How long, on average, a lead takes to convert depending on its source.</li>
  <li>Which type of discount has the greatest impact on closing without overly hurting the margin.</li>
  <li>Which of your quotes are accepted and which are rejected, and why.</li>
</ul>

<p>This information lets you make decisions based on data, not intuition. And in a small-business environment where every pound and every hour counts, that makes a significant difference.</p>

<h3>4. Automation of sales follow-up</h3>

<p>One of the biggest problems in sales is follow-up. You know you should call that client who asked for a quote a week ago, but between meetings, admin tasks and other priorities, you forget.</p>

<p>AI can automate part of this process:</p>

<ul>
  <li><strong>Automatic follow-up emails:</strong> Written in a natural tone, personalised to the context and sent at the optimal time.</li>
  <li><strong>Smart alerts:</strong> Notifications when a client opens your quote or when they've gone X days without replying.</li>
  <li><strong>Next-action suggestions:</strong> Based on the history, the AI suggests whether it's better to call, send an email or wait.</li>
</ul>

<h3>5. Conversational assistant for the sales team</h3>

<p>Imagine being able to ask an assistant: "What are this week's 5 pending quotes with the highest value" or "Which client hasn't bought in the last 3 months" and getting an immediate answer without having to navigate tables and filters.</p>

<p>AI assistants built into sales tools let salespeople interact with their data naturally, saving time and reducing friction with technology. This is especially useful for teams that aren't technical.</p>

<h2>What AI won't replace</h2>

<p>It's important to be honest about the limitations. AI is a tool, not a replacement for the human team. These are the areas where the human factor remains irreplaceable:</p>

<ul>
  <li><strong>Complex negotiation:</strong> Important negotiations require empathy, reading non-verbal language and real-time adaptation that AI can't offer.</li>
  <li><strong>Relationships of trust:</strong> Clients buy from people, not algorithms. The personal relationship is still the main driver of B2B sales.</li>
  <li><strong>Sales strategy:</strong> Deciding which market to enter, which product to launch or how to position yourself requires an understanding of context that goes beyond data analysis.</li>
  <li><strong>Creative problem-solving:</strong> When a client has an atypical need, it's the human who finds the creative solution.</li>
</ul>

<p>The key is to use AI to remove repetitive work and free up time for these high-value activities.</p>

<h2>How to start using AI in your sales process</h2>

<p>If you're a small business wanting to start taking advantage of AI in sales, here are some practical steps:</p>

<h3>Step 1: Identify the repetitive tasks</h3>

<p>Make a list of the activities that consume the most time in your sales process. Usually they'll be: creating quotes, writing follow-up emails, looking up client information and updating the CRM.</p>

<h3>Step 2: Start with a single tool</h3>

<p>Don't try to implement AI in everything at once. Choose the task that consumes the most time and find a tool that automates it. If it's quote creation, a CPQ with built-in AI is the ideal starting point.</p>

<h3>Step 3: Measure the impact</h3>

<p>Before implementing, measure how much time you currently spend on that task. After implementing, measure again. Comparing the before and after is the best way to confirm the value.</p>

<h3>Step 4: Scale gradually</h3>

<p>Once you've confirmed the value of the first tool, add more. Gradual adoption is more sustainable and creates less resistance in the team.</p>

<h2>The near future: what to expect</h2>

<p>AI in sales is evolving rapidly. Some trends we'll see take hold over the coming months:</p>

<ul>
  <li><strong>Multimodal AI:</strong> Tools that understand text, voice and images to offer more complete assistance.</li>
  <li><strong>Personalisation at scale:</strong> Each client will receive communications and offers genuinely tailored to their context, with no manual effort.</li>
  <li><strong>Automation of complete flows:</strong> From detecting a lead to sending the quote, with minimal human intervention.</li>
  <li><strong>Local and private AI:</strong> Models that run on your own infrastructure, without sending client data to third parties.</li>
</ul>

<p>Small businesses that start adopting these tools now will have a significant competitive advantage over those that wait.</p>

<blockquote>
  <p>AI doesn't replace the salesperson; it empowers them. It takes away the boring tasks and gives them more time for what they do best: connecting with people and closing sales.</p>
</blockquote>

<p><strong>Try AI applied to sales:</strong> <a href="/registro?lang=en">Create your free DealForge account</a> and discover how Forge AI can help you quote faster, personalise better and sell more.</p>
`.trim(),
  },
  // ─── 6. How to create a professional quote: complete guide ───
  {
    slug: "how-to-create-professional-quote-complete-guide",
    titulo: "How to create a professional quote: the complete guide to closing more sales",
    extracto:
      "Learn to create professional quotes and estimates that convert. Discover the key elements, common mistakes and how quoting software can save you hours of work.",
    categoria: "ventas",
    tags: ["quotes", "estimates", "sales", "quoting software", "CPQ", "guide", "small business"],
    autor: "DealForge",
    publishedAt: "2026-04-02T09:00:00Z",
    metaTitulo: "How to create a professional quote | Complete guide 2026 — DealForge",
    metaDescripcion:
      "Learn to create professional quotes and estimates that close sales. Key elements, mistakes to avoid and how quoting software saves you hours.",
    metaKeywords:
      "how to create a quote, create estimates, quoting software, quote template, quote professional, online quote, CPQ, quoting software small business",
    contenido: `<p>If you've ever lost a client because your quote arrived late, had errors or simply didn't convey professionalism, this article is for you. <strong>Creating estimates and quotes</strong> is one of those tasks that seems simple, but that marks the difference between closing a sale or losing it.</p>

<p>Let's look, step by step, at how to create a quote that really works. No fluff, with practical examples and the kind of polish that makes your client say &ldquo;yes, I want to work with you&rdquo;.</p>

<h2>Estimate vs. quote: are they the same?</h2>

<p>Before we dive in, let's clear up something that causes a lot of confusion. An <strong>estimate</strong> is an approximation of what something will cost. A <strong>quote</strong>, on the other hand, is the formal document where you tell your client exactly how much what they need will cost.</p>

<p>In practice, many companies use both terms interchangeably. What matters isn't what you call it, but that the document is clear, professional and arrives on time.</p>

<h2>The 7 elements every professional quote must have</h2>

<p>An effective quote isn't just a price list. It's your commercial calling card. These are the essentials:</p>

<h3>1. Your company details</h3>
<p>Logo, business name, tax/VAT number, address, phone and email. It seems obvious, but you'd be surprised how many quotes arrive without complete contact details. Your client needs to know exactly who they're dealing with.</p>

<h3>2. The client's details</h3>
<p>Company name, point of contact, email and phone. Personalising the quote with the client's name already creates a far more professional impression than a generic &ldquo;Dear customer&rdquo;.</p>

<h3>3. Reference number</h3>
<p>A consecutive numbering system (for example, QUO-2026-0042) lets you stay organised and makes communication easier. When your client says &ldquo;I've seen your proposal&rdquo;, you'll both know exactly which one they mean.</p>

<h3>4. Detailed description of products or services</h3>
<p>This is where many fail. It's not enough to put &ldquo;Consulting service: £5,000&rdquo;. Break down each line with a clear description, quantity, unit price and discounts if any. <strong>The more transparent you are, the more trust you build.</strong></p>

<h3>5. Taxes and totals</h3>
<p>Clearly state the subtotal, the VAT (or applicable tax) and the final total. Don't make your client do mental maths. Make things easy.</p>

<h3>6. Commercial terms</h3>
<p>Payment method, delivery time, quote validity and any special conditions. This avoids misunderstandings and protects both parties. A quote with no terms is a ticking time bomb.</p>

<h3>7. Expiry date</h3>
<p>Set a clear deadline. This creates urgency (without being aggressive) and lets you manage your sales pipeline better. The norm is 15 or 30 days, depending on the sector.</p>

<h2>The 5 mistakes that kill your quotes</h2>

<p>Now that you know what to include, let's look at what to avoid. These are the most common and most damaging:</p>

<ol>
<li><strong>Taking too long to send it.</strong> If your competition sends the quote the same day and you take a week, you've already lost. Speed matters — a lot.</li>
<li><strong>Calculation errors.</strong> Nothing destroys trust more than a quote with numbers that don't add up. Checking the totals should be sacred.</li>
<li><strong>Lack of personalisation.</strong> Sending the same generic quote to every client is like sending a CV with no cover letter. Tailor each proposal.</li>
<li><strong>Unprofessional design.</strong> Your quote reflects your brand. If it looks like it was made in 5 minutes in a spreadsheet, that will be the perception of your service.</li>
<li><strong>No follow-up.</strong> Send and forget. 80% of sales require at least 5 follow-up contacts. Don't let your quote get lost in the inbox.</li>
</ol>

<h2>Excel template or quoting software?</h2>

<p>The eternal question. Let's be honest: <strong>an Excel template is fine to start with</strong>, but it has clear limits. It doesn't scale, it's easy to make copy-paste errors, you can't generate professional PDFs automatically, and follow-up is manual.</p>

<p>Quoting software like DealForge lets you:</p>

<ul>
<li>Create professional quotes in minutes, not hours</li>
<li>Keep a product catalogue with up-to-date prices</li>
<li>Generate PDFs with your branding (logo, colours, custom template)</li>
<li>Send by email directly from the platform</li>
<li>Apply automatic business rules (discount limits, approvals)</li>
<li>Track the status of every quote</li>
<li>Use artificial intelligence to optimise your proposals</li>
</ul>

<p>The real difference isn't in the tool itself, but in the time you get back. If you spend 45 minutes on each manual quote and can reduce it to 5 minutes with software, the maths speaks for itself.</p>

<h2>How artificial intelligence is changing the game</h2>

<p>AI is no longer science fiction in the sales world. Tools with <strong>built-in AI</strong> can suggest complementary products, detect when a discount is too aggressive, or even write the accompanying text for your quote.</p>

<p>In DealForge, for example, Forge AI analyses the context of each quote and helps with smart suggestions: from recommending the optimal price to alerting you if a commercial term could cause problems. All without leaving the platform.</p>

<h2>Quick checklist before sending your quote</h2>

<p>Before clicking &ldquo;Send&rdquo;, run through this list:</p>

<ul>
<li>Are your company and client details complete and correct?</li>
<li>Is each line's description clear and detailed?</li>
<li>Do the calculations add up (subtotal, discounts, VAT, total)?</li>
<li>Have you included the commercial terms and the expiry date?</li>
<li>Does the design reflect the quality of your company?</li>
<li>Have you checked the spelling?</li>
</ul>

<p>If you've ticked everything, you're ready to send a quote that builds trust and closes sales.</p>

<h2>Conclusion</h2>

<p>Making a professional quote isn't complicated, but it requires attention to detail and the right tools. Whether you use a template or specialised software, what matters is that every proposal you send conveys professionalism, transparency and trust.</p>

<p>Because in the end, a good quote isn't just a document with prices. It's the first step of a commercial relationship that can last for years.</p>`,
  },

  // ─── 7. Electronic signature on quotes ───
  {
    slug: "electronic-signature-quotes-close-sales-faster",
    titulo: "Electronic signatures on quotes: how to close sales faster and with legal validity",
    extracto:
      "Discover how electronic signatures on your quotes speed up closing, eliminate paper and carry full legal validity. A practical guide for small businesses with real examples.",
    categoria: "ventas",
    tags: ["electronic signature", "quotes", "eIDAS", "sales", "CPQ", "small business", "digital signature", "closing sales"],
    autor: "DealForge",
    publishedAt: "2026-04-06T09:00:00Z",
    metaTitulo: "Electronic signatures on quotes: close sales faster | DealForge",
    metaDescripcion:
      "Learn how electronic signatures on quotes speed up closing with legal validity. A practical guide for small businesses with the eIDAS legal framework and a checklist.",
    metaKeywords:
      "electronic signature quotes, digital signature estimates, sign quote online, eIDAS electronic signature, e-signature small business, close sales fast, quoting software electronic signature, electronic signature legal validity",
    contenido: `<p>Picture this: you've prepared the perfect quote, the client says yes, but then takes a week to print, sign, scan and send the document back. By the time it arrives, the quote has expired or, worse, they've chosen a more agile supplier.</p>

<p>This problem has a name: <strong>friction at the close</strong>. And the solution is simpler than you think: electronic signatures built into your quotes.</p>

<h2>What is an electronic signature and why does it matter in sales?</h2>

<p>An electronic signature is a mechanism that lets a person express their agreement with a document digitally, with no need for paper, printer or scanner. In the context of quotes, it means your client can <strong>approve and sign your proposal from any device</strong> in seconds.</p>

<p>But it's not just about convenience. Under the EU eIDAS Regulation, electronic signatures carry full legal validity. This means a quote signed electronically has the same legal weight as one signed by hand.</p>

<h2>The 5 benefits of signing quotes electronically</h2>

<h3>1. Close sales in minutes, not days</h3>
<p>The main benefit is speed. When you remove the print-sign-scan-send process, you cut the closing time from days to minutes. Your client receives a link, signs with a finger or mouse, and that's it. <strong>No friction, no excuses, no waiting.</strong></p>

<h3>2. Reduce the drop-out rate</h3>
<p>Every extra step in the approval process is a chance for the client to get distracted, postpone it or simply forget. Electronic signatures remove all those intermediate steps. The result: fewer quotes left in limbo.</p>

<h3>3. Full legal validity</h3>
<p>The eIDAS Regulation (EU 910/2014) sets three levels of electronic signature: simple, advanced and qualified. For commercial B2B quotes, the simple electronic signature (like the one most CPQ platforms offer) is perfectly valid and admissible as evidence in a dispute.</p>

<h3>4. Full traceability</h3>
<p>Each signature is recorded with the date, time, IP address and the signer's details. This gives you <strong>complete traceability</strong> that paper can never offer. How many times have you had to hunt for a signed document in a drawer or an email from months ago?</p>

<h3>5. A professional, modern image</h3>
<p>Sending a link to sign electronically conveys modernity and professionalism. Your client perceives that you work with up-to-date tools and that you value their time. In a competitive market, these details make the difference.</p>

<h2>How an electronic signature works on a quote</h2>

<p>The process is simpler than it seems. Here's how it works on a modern CPQ platform:</p>

<ol>
<li><strong>You create the quote</strong> with all the details: products, prices, terms and conditions.</li>
<li><strong>You request the signature</strong> by entering the signer's name and email (it can be the client's main contact or any authorised person).</li>
<li><strong>The client receives an email</strong> with a unique, secure link to sign.</li>
<li><strong>The client reviews and signs</strong> directly from the browser, drawing their signature with the mouse or finger on mobile.</li>
<li><strong>Both parties receive confirmation</strong> and the signature is embedded in the quote PDF.</li>
</ol>

<p>The whole process can be completed in under 2 minutes from when you send the request.</p>

<h2>Electronic signature vs. approval: which do you need?</h2>

<p>It's important to distinguish between these two concepts that are sometimes confused:</p>

<p><strong>Internal approval:</strong> the process where someone from your own company (a sales director, a finance manager) must approve the quote before it's sent to the client. It's usually triggered by automatic rules, for example when a discount exceeds a certain percentage.</p>

<p><strong>Electronic signature:</strong> the client's agreement with the proposal. It's requested after the quote has been sent and the client agrees with the terms.</p>

<p>In a complete workflow, the order would be: <strong>create quote → internal approval → send to client → client's electronic signature</strong>. Both processes complement each other and, together, ensure the whole chain is valid.</p>

<h2>The legal framework for electronic signatures</h2>

<p>If you're worried about legal validity, these are the key points:</p>

<ul>
<li><strong>eIDAS Regulation (EU 910/2014):</strong> recognises electronic signatures across all EU member states. It can't be rejected as evidence in court just for being electronic.</li>
<li><strong>National transposition laws:</strong> each country transposes the eIDAS regulation into its own legal system regulating trusted electronic services.</li>
<li><strong>Contract law:</strong> consent expressed by electronic means is generally accepted as valid for forming contracts.</li>
</ul>

<p>For commercial B2B quotes, you don't need a qualified signature with a digital certificate. The simple electronic signature (drawing the signature + recording IP and date) is sufficient and legally valid.</p>

<h2>Common mistakes when implementing electronic signatures</h2>

<p>Although the technology is simple, there are mistakes to avoid:</p>

<ol>
<li><strong>Not including the terms and conditions.</strong> The signature only has value if the signer has been able to clearly read what they're accepting. Make sure the commercial terms are visible before the signature.</li>
<li><strong>Not keeping the evidence.</strong> Always store the date, time, IP and signer's details alongside the signed document. This evidence is crucial in a dispute.</li>
<li><strong>Using unsecure tools.</strong> An email with a &ldquo;yes, I accept&rdquo; isn't the same as an electronic signature with traceability. Use tools that generate an auditable record.</li>
<li><strong>Forgetting follow-up.</strong> Sending the signature request doesn't mean the client completes it immediately. Automatic reminders are essential.</li>
</ol>

<h2>How DealForge integrates electronic signatures</h2>

<p>In DealForge, the electronic signature is built directly into the quoting flow. You don't need external tools or complicated integrations:</p>

<ul>
<li><strong>Request the signature</strong> from the quote page itself with a single click.</li>
<li><strong>The client signs from any device</strong> via a secure, unique link.</li>
<li><strong>The signature appears automatically in the quote PDF</strong>, along with the signer's name and the date.</li>
<li><strong>You get a notification</strong> when the client signs, so you can move on to the next step.</li>
<li><strong>Everything is recorded</strong> in the quote's activity history with full traceability.</li>
</ul>

<p>Available from the Pro plan, alongside other features like automatic reminders and quote versioning.</p>

<h2>Checklist to implement electronic signatures in your company</h2>

<ul>
<li>Do your quotes include clear terms and conditions?</li>
<li>Does your quoting tool support built-in electronic signatures?</li>
<li>Do you keep a record of the date, time and IP of each signature?</li>
<li>Do you have automatic reminders set up for pending signatures?</li>
<li>Is the signature embedded in the final quote PDF?</li>
<li>Have you briefed your sales team on the new flow?</li>
</ul>

<p>If you've ticked everything, you're ready to close sales faster and with full legal certainty.</p>

<h2>Conclusion</h2>

<p>The electronic signature isn't a luxury or a tech fad. It's a practical tool that <strong>reduces closing times, removes friction and carries full legal validity</strong>. For small businesses competing on speed and professionalism, building it into the quoting flow is a real competitive advantage.</p>

<p>Because at the end of the day, the most beautiful quote in the world is useless if the client takes a week to sign it. Make it a matter of one click.</p>`,
  },

  // ─── 8. Quoting software for small businesses ───
  {
    slug: "quoting-software-small-business-guide",
    titulo: "Quoting software for small businesses: what it is, how it works and how to choose the best",
    extracto:
      "Discover what quoting software (CPQ) is, how it can transform your sales process and what criteria to use to choose the right tool for your business.",
    categoria: "producto",
    tags: ["quoting software", "CPQ", "estimates", "small business", "sales automation", "sales tools", "productivity"],
    autor: "DealForge",
    publishedAt: "2026-04-10T09:00:00Z",
    metaTitulo: "Quoting Software for Small Businesses: Complete Guide 2026 — DealForge",
    metaDescripcion:
      "What quoting software (CPQ) is, how it works and how to choose the best for your business. Key features, comparison with Excel and ERP, and selection criteria.",
    metaKeywords:
      "quoting software, estimate software, CPQ for small business, quoting tool, quote software, automate quotes, free quoting software, best CPQ",
    contenido: `<p>If you still make quotes in Excel or Word, you're losing time and sales. <strong>Quoting software</strong> automates the creation of professional estimates, eliminates errors and lets you close deals faster. In this guide we explain everything you need to know.</p>

<h2>What is quoting software?</h2>

<p>Quoting software, also known as <strong>CPQ (Configure, Price, Quote)</strong>, is a tool that automates the process of creating, sending and managing commercial quotes. Instead of copying and pasting into spreadsheets, the CPQ centralises your products, prices, clients and commercial terms in one place.</p>

<p>The result: professional quotes in minutes, not hours. No calculation errors, no inconsistent formats and with automatic follow-up.</p>

<h2>Signs you need quoting software</h2>

<p>If you recognise yourself in any of these situations, it's time to leave Excel behind:</p>

<ul>
<li>You spend <strong>more than 30 minutes</strong> preparing each quote</li>
<li>You've sent quotes with <strong>pricing or calculation errors</strong></li>
<li>You don't know the status of each proposal or when to follow up</li>
<li>Each salesperson uses a <strong>different format</strong> for quotes</li>
<li>You lose deals because <strong>the competition responds first</strong></li>
<li>You have no visibility over your <strong>sales pipeline</strong></li>
</ul>

<h2>Key features of a good CPQ</h2>

<h3>1. Centralised product catalogue</h3>
<p>All your products, services and prices in one place. When you change a price, it updates automatically in all future quotes. Goodbye to out-of-date spreadsheets.</p>

<h3>2. Automatic quote generation</h3>
<p>Select the client, add the products and the system automatically calculates subtotals, discounts and taxes. Some CPQs like DealForge include <strong>artificial intelligence</strong> that can generate complete quotes from a description.</p>

<h3>3. Professional PDF templates</h3>
<p>A well-designed quote conveys professionalism. The software generates PDFs with your logo, brand colours and a clean design that impresses the client.</p>

<h3>4. Built-in electronic signature</h3>
<p>Send the quote and the client signs from their phone or computer. No printing, no scanning. With legal validity under the EU eIDAS Regulation.</p>

<h3>5. Tracking and notifications</h3>
<p>Know when the client opens your quote, get automatic reminders and never miss a follow-up. The visual pipeline shows all your opportunities at a glance.</p>

<h3>6. Business rules and approvals</h3>
<p>Define maximum discounts, minimum margins and approval flows. If a salesperson applies an out-of-policy discount, the system requires manager approval before sending.</p>

<h2>CPQ vs. Excel vs. ERP: which to use?</h2>

<p>Each tool has its place. The key is understanding when each one makes sense:</p>

<p><strong>Excel/Google Sheets:</strong> Works when you make few quotes a month and work alone. But as you grow, errors multiply and management becomes chaotic.</p>

<p><strong>ERP (SAP, Odoo, etc.):</strong> Powerful but complex and costly. Designed for large companies with implementation teams. For a small business, it's usually overkill.</p>

<p><strong>CPQ software:</strong> The ideal middle ground. Specialised in the quoting process, easy to implement and affordable. Perfect for small businesses that want to professionalise their sales without the complexity of an ERP.</p>

<h2>How to choose the best quoting software</h2>

<p>Not all CPQs are the same. These are the criteria you should evaluate:</p>

<h3>Ease of use</h3>
<p>If your team needs a week of training to use the software, something's wrong. The tool should be intuitive from day one. Look for clean interfaces and simple workflows.</p>

<h3>Customisation</h3>
<p>Can you adapt the templates to your brand? Does it support your specific commercial terms? Does it work with your currency and tax system?</p>

<h3>Integrations</h3>
<p>Check that it integrates with the tools you already use: CRM, email, invoicing. An isolated tool creates more work, not less.</p>

<h3>Fair price</h3>
<p>Many CPQs are designed for large companies with prices starting in the hundreds per month. For a small business, look for options with a free or affordable entry plan.</p>

<h3>Good support</h3>
<p>When you have a problem, you need fast, responsive help. Prioritise tools with responsive support and clear documentation.</p>

<h2>The real impact on your business</h2>

<p>Implementing quoting software isn't just an operational improvement. It's a competitive advantage. Companies that respond quickly with professional proposals win more deals. It's that simple.</p>

<p>Think about it: when a potential client requests a quote from three suppliers, the first to respond with a clear, professional quote has a huge advantage. Speed and professionalism build trust.</p>

<h2>First steps</h2>

<p>You don't need to migrate everything at once. Start small:</p>

<ol>
<li><strong>Load your product catalogue</strong> with up-to-date prices</li>
<li><strong>Import your main clients</strong> from your current database</li>
<li><strong>Create your first quote</strong> with the new system</li>
<li><strong>Send it with an electronic signature</strong> and measure the response time</li>
<li><strong>Review and adjust</strong> to your workflow</li>
</ol>

<p>The learning curve is minimal and the results are immediate. Your sales team will thank you.</p>`,
  },
  // ─── 9. Excel vs quoting software: when to switch ───
  {
    slug: "excel-vs-quoting-software-when-to-switch",
    titulo: "Excel vs quoting software: when to make the switch",
    extracto:
      "Excel is where almost every salesperson starts. But there comes a point where it holds you back more than it helps. Here's the exact signal for knowing when to switch to dedicated software.",
    categoria: "producto",
    tags: ["Excel", "quotes", "estimates", "quoting software", "CPQ", "productivity", "sales tools", "small business"],
    autor: "DealForge",
    publishedAt: "2026-04-14T09:00:00Z",
    metaTitulo: "Excel vs Quoting Software: When to Make the Switch — DealForge",
    metaDescripcion:
      "Still using Excel to quote? Discover the exact signals that it's time to switch to dedicated software, and how to make the transition without disruption.",
    metaKeywords:
      "excel vs quoting software, stop using excel for quotes, quoting software small business, when to switch from excel, quote software, professional quoting tool, CPQ, automate excel quotes",
    contenido: `<p>Almost every business starts the same way: an Excel template, a bit of brand colour, and off you go quoting. And it works. At first, it works well.</p>

<p>But there comes a moment — and almost every salesperson remembers it — when something goes wrong. A quote sent with last year's price. A discount applied to the wrong row. A client asking about a proposal you can't find among the twenty files named things like <code>quote_final_DEFINITIVE_v3.xlsx</code>.</p>

<p>This article isn't an attack on Excel. It's a brilliant tool for what it was designed for. But quoting isn't analysing data: it's selling. And for that, Excel has very specific limits worth knowing before they cost you a deal.</p>

<h2>Why everyone starts with Excel (and it makes sense)</h2>

<p>Excel is free (or nearly), everyone knows it, and in a business's first months the priority is to get out and sell, not to build infrastructure. With a decent template you can produce a presentable quote in twenty minutes.</p>

<p>What's more, Excel gives you total control. You can add any column, change any formula, structure discounts exactly how you want. That flexibility is seductive, especially if you're the only one touching the file.</p>

<p>The problem is that flexibility has a cost you don't see until the business grows. And by then, you're buried in operational debt.</p>

<h2>The five signs Excel is no longer working for you</h2>

<h3>1. You waste time hunting for the latest version</h3>

<p>How many times have you searched for a quote sent three weeks ago? How many minutes have you spent opening files to find the one with the correct prices?</p>

<p>With Excel, each quote is a separate file. It's saved in a folder, sent by email, edited locally. The result is a chaotic file system where the "truth" about a proposal's status is scattered across your local disk, the client's email and maybe a shared Drive folder with five different versions.</p>

<p>This isn't a problem of personal organisation: it's a structural problem with the format. Excel wasn't designed to manage the lifecycle of commercial documents.</p>

<h3>2. Calculation errors cost you real money</h3>

<p>A formula that doesn't update when you add a new line. A unit price changed manually that doesn't reflect the updated catalogue. A VIP client discount applied at 15% when it should be 10%.</p>

<p>In Excel, all these errors are possible — and frequent. A study by EuSpRIG (European Spreadsheet Risks Interest Group) estimates that more than 90% of corporate spreadsheets contain errors. Most are silent: the total looks reasonable, no one questions it, and the proposal goes out with an incorrect margin.</p>

<p>In some cases the error works against you (you quote cheaper than you should). In others it works against the client, which creates tension when the invoice arrives. Either way, the damage is done.</p>

<h3>3. You don't know the status of your quotes</h3>

<p>Quick question: right now, how many quotes have you sent and are awaiting a reply? How many have gone more than two weeks without a response? When did you last follow up with each client?</p>

<p>If you can't answer that in under thirty seconds, you have a sales-visibility problem. And Excel can't give it to you because it's a document, not a system.</p>

<p>The direct consequence: quotes that die from a lack of follow-up. The client didn't say no, they simply didn't reply. And you, with your head in the next thing, didn't call back. You didn't lose that deal to the competition: you lost it to silence.</p>

<h3>4. Your professional image suffers (even if they don't tell you)</h3>

<p>The quote is, in many cases, the first formal document the client receives from you. It's the moment they stop talking to a person and start evaluating a company.</p>

<p>An Excel template with the default font, no logo properly placed, no proposal number, no clearly formatted payment terms... doesn't convey the same trust as a clean PDF with a professional header and a digital signature.</p>

<p>Clients won't tell you "your quote looks amateurish". They'll simply go with whoever inspired more confidence from the first contact.</p>

<h3>5. You can't scale the team without chaos</h3>

<p>While it's just you, the Excel system can limp along. But the moment there are two people quoting — a junior salesperson, a partner, someone covering holidays — the system collapses.</p>

<p>Who has the up-to-date catalogue? Which template do we use? How do I know the payment terms my colleague set are the right ones for that client? Where are the quotes they sent while I was travelling?</p>

<p>Chaos doesn't arrive all at once. It arrives gradually, one confusing file at a time, until one day someone sends a proposal with year-old prices and no one knows exactly how it happened.</p>

<h2>What you really gain by moving to dedicated software</h2>

<p>The easy answer is "speed". And it's true: generating a quote with CPQ software is three to five times faster than with Excel once you have the catalogue set up. But speed is only the most visible benefit. The most important ones are others.</p>

<h3>Pipeline control: knowing what's happening with each proposal</h3>

<p>Quoting software tells you, at a glance, how many proposals you have at each stage: draft, sent, viewed by the client, accepted, rejected, expired. You can see how much value is at each stage of the funnel and prioritise follow-up where it has the most impact.</p>

<p>That's what separates a reactive salesperson (who responds when the client calls) from a proactive one (who gets in touch at the right moment, when the proposal has gone X days without a reply).</p>

<h3>Correct prices, always</h3>

<p>With a centralised product catalogue, the unit price is updated once and reflected in all new quotes automatically. Discounts by client, by volume or by product type are configured once and applied with no manual intervention.</p>

<p>The result: zero pricing errors. And when you need to raise rates — something that happens often in the current inflationary climate — you do it in a single place, not hunting through twenty files for "the good one".</p>

<h3>A professional look without spending time on design</h3>

<p>The best quoting software generates professional-looking PDFs automatically: a header with your logo, well-structured product lines, a correct VAT breakdown, payment terms, a footer with legal details. You fill in the content; the system handles the format.</p>

<p>The time you used to spend adjusting columns and margins in Excel, you'll spend understanding the client's needs before sending the proposal.</p>

<h3>Friction-free collaboration</h3>

<p>The whole team works on the same system. The sales manager can see each salesperson's quotes. A new employee can start quoting correctly from day one because the catalogue, templates and terms are already set up. No one depends on asking a colleague "can you send me your quote template?".</p>

<h3>Data for better decisions</h3>

<p>Which products appear most in your won quotes? In what price range do you have the highest close rate? What kind of discount speeds up the client's decision? With Excel you'll never have those answers because the data is fragmented across hundreds of files. With dedicated software, that information is there, waiting for you to use it to fine-tune your pricing strategy.</p>

<h2>The "advanced Excel" argument</h2>

<p>There's one type of user who always shows up in this conversation: the one with "a very advanced Excel". Macros, pivot tables, data validations, dropdown lists with the catalogue products. Sometimes it's impressive.</p>

<p>The problem isn't the file's technical complexity. The problem is that this advanced Excel was built by one person, is understood by that person, and if that person leaves or falls ill, the system stops working. On top of that, it's still a file: it has no status, no traceable change history, it doesn't send follow-up reminders, and it generates no pipeline metrics.</p>

<p>Advanced Excel is a sign that the business needs a real system. The effort invested in building it would have paid off more by setting up a tool designed for the job.</p>

<h2>When it does NOT make sense to switch</h2>

<p>In all honesty: there are situations where Excel is perfectly adequate.</p>

<ul>
<li><strong>If you quote fewer than two or three times a month.</strong> The volume doesn't justify the cost of adopting and learning a new tool. A good Excel or Google Sheets template is enough.</li>
<li><strong>If all your quotes are highly customised and unique.</strong> Businesses where each proposal is a one-off project (a singular architecture project, a very specific strategic consulting engagement) sometimes fit free-form documents better than structured forms. Although even here, good software allows enough flexibility.</li>
<li><strong>If you've just started and are still validating your pricing model.</strong> Don't build systems on prices that will change every week. First validate, then systematise.</li>
</ul>

<p>The switch makes sense when the pain of staying with Excel outweighs the friction of learning something new. And that point comes sooner than it seems.</p>

<h2>The ideal moment to switch</h2>

<p>It's not when you're already in crisis. It's not when you've lost your third deal to a pricing error. The ideal moment is when you start to feel the friction, before it becomes a systemic problem.</p>

<p>Some concrete indicators that the moment has arrived:</p>

<ul>
<li>You send more than ten quotes a month</li>
<li>You have more than one person involved in the sales process</li>
<li>You've had at least one incorrect-price incident in the last six months</li>
<li>You can't say from memory how many proposals you have open right now</li>
<li>The time between the client's request and sending the quote exceeds 24 hours</li>
</ul>

<p>If two or more of these criteria apply, the switch will pay back the time invested within the first month.</p>

<h2>How to make the transition without drama</h2>

<p>The biggest blocker to switching tools isn't the cost: it's the fear of disruption. "I can't stop to learn a new system right now." It's understandable, but the logic fails: the longer you wait, the more quotes you have in Excel, the more history there is to migrate, and the deeper the habit.</p>

<p>The transition is simpler than it seems if you do it in order:</p>

<ol>
<li><strong>Export your product catalogue to a clean spreadsheet.</strong> Name, description, unit price, VAT rate. That's all you need to start.</li>
<li><strong>Set up a base template</strong> with your logo, your usual payment terms and your legal footer. Thirty minutes of work you won't repeat.</li>
<li><strong>Create the first five quotes in the new system</strong> in parallel to how you'd do them in Excel. This gives you confidence with no risk.</li>
<li><strong>From week two, you only use the new system.</strong> Not "for important quotes". For all of them. Consistency is what builds the habit.</li>
</ol>

<p>With DealForge, for example, the onboarding process is designed so that in under an hour you have your catalogue loaded and your first quote ready to send. You don't need technical training or an implementation consultant. If you can use a spreadsheet, you can use DealForge.</p>

<h2>The question that really matters</h2>

<p>There's a very simple way to know whether you need a change: calculate how much time you spend each week on quote-related tasks — creating, correcting, searching, following up, resending — and multiply it by your hourly cost.</p>

<p>For most small businesses, that number is between 3 and 8 hours a week. At an opportunity cost of £40/hour, that's between £120 and £320 a week in sales time not being spent generating new leads or closing existing deals.</p>

<p>Quoting software costs between £30 and £100 a month depending on the features. The arithmetic doesn't leave much room for doubt.</p>

<p>The argument isn't technological. It's economic: how much is your sales time worth, and what's the best thing you can do with it?</p>

<h2>Conclusion</h2>

<p>Excel isn't the problem. The problem is continuing to use Excel once you've passed the threshold where it makes sense. And that threshold comes faster than you anticipate.</p>

<p>The transition to dedicated software isn't a luxury for big companies. It's the right operational decision at the right moment: when the sales process starts to be a brake rather than an engine.</p>

<p>If you recognise any of the signs in this article in your day-to-day, the best time to switch was six months ago. The second best time is today.</p>

<p><strong>Want to see how it works in practice?</strong> <a href="/registro?lang=en">DealForge</a> has a free trial with no credit card required. In under an hour you can have your catalogue loaded and your first quote sent.</p>`,
  },
  // ─── 10. How to follow up on quotes without being pushy ───
  {
    slug: "how-to-follow-up-on-quotes-without-being-pushy",
    titulo: "How to follow up on quotes without looking desperate",
    extracto:
      "Following up on quotes is where the sale is won or lost. Learn when to call, what to say and how to use automation to follow up without overwhelming the client.",
    categoria: "ventas",
    tags: ["quote follow-up", "sales follow-up", "closing sales", "quotes", "estimates", "B2B sales", "small business", "sales process"],
    autor: "DealForge",
    publishedAt: "2026-04-18T09:00:00Z",
    metaTitulo: "How to Follow Up on Quotes Without Being Pushy — DealForge",
    metaDescripcion:
      "A step-by-step protocol for following up on quotes: when to call, what to say and how to automate follow-up without overwhelming the client or losing sales.",
    metaKeywords:
      "quote follow-up, follow up on estimates, sales follow-up, how to follow up on a quote, sales follow-up small business, automate quote follow-up, close more sales, sales process",
    contenido: `<p>You've sent the quote. The client said it looked good. Five days have passed and there's no news. Do you call? Wait? Send an email? How many times?</p>

<p>This moment — the post-quote silence — is where small businesses lose the most sales. Not because the price was bad. Not because the client wasn't interested. But because the follow-up is done badly: too early, too late, with the wrong message, or simply not done at all.</p>

<p>Let's solve this once and for all.</p>

<h2>Why follow-up matters more than you think</h2>

<p>There's a figure that circulates a lot in B2B sales and that, while it varies by sector, reflects a reality any salesperson recognises: <strong>most sales close after the fifth contact</strong>, but most salespeople give up after the second.</p>

<p>It's not about being pushy. It's about being present at the moment the client makes the decision. And that moment is rarely the day they receive the quote.</p>

<p>The reality on the client's side is this: they received your quote, they're interested, but they have ten urgent things on their desk. Your proposal is in their inbox, marked "to review", competing with everything else. If you don't show up again, they'll simply forget. With no ill intent.</p>

<h2>The most common mistake: reactive follow-up</h2>

<p>Most small businesses do reactive follow-up: they wait for the client to show signs of life and, if there are none, either do nothing or call at the worst possible moment — when they're anxious, not when the client is ready to decide.</p>

<p>Effective follow-up is <strong>proactive and structured</strong>. You have a plan before sending the quote, not after three days of silence.</p>

<h2>The follow-up protocol that works</h2>

<p>Here's a framework that works for most small-business sales cycles, with mid-ticket services (between £1,000 and £20,000). Adjust it to your sector, but use it as a starting point:</p>

<h3>Day 0: the quote and closing the first contact</h3>

<p>The mistake starts here. Many companies send the quote by email and wait. <strong>Don't do that.</strong></p>

<p>When you send the quote, close that very moment with a confirmation question:</p>

<ul>
<li>"Do you have everything you need to make the decision, or is there anything you'd like us to clarify?"</li>
<li>"When do you think you might have an answer?"</li>
</ul>

<p>That second question is the most important. If the client tells you "by the end of next week", you've just removed all the uncertainty. You know exactly when to make the next contact and you have their implicit permission to do so.</p>

<h3>Day 1-2: confirmation of receipt</h3>

<p>If you sent it by email with no prior call, send a short email the next day. Not to pressure, but to confirm it arrived:</p>

<blockquote>
<p>"Hi [name], just writing to confirm the proposal arrived safely. I'm here if you have any questions. Best regards."</p>
</blockquote>

<p>Two lines. No pressure. This also gives you information: if they don't even reply to this, the lead is colder than it seemed.</p>

<h3>Day 3-5: the first real follow-up</h3>

<p>This is the most important contact. Don't send another generic email. <strong>Call.</strong></p>

<p>The goal of this call isn't to ask "how's the proposal?". The goal is to give them something of value or resolve a question they probably have. Examples:</p>

<ul>
<li>"I was calling because we've had a couple of clients in the [X] sector with the same situation as you, and I wanted to share how they solved it, in case it's useful before you decide."</li>
<li>"I remembered you mentioned delivery time was an important factor for you. I wanted to confirm that, with your timeline, we can guarantee it without any problem."</li>
</ul>

<p>You're adding value, not asking for a yes. That completely changes the tone of the conversation.</p>

<h3>Day 7-10: second follow-up</h3>

<p>If after the call there's still no answer, an email with a direct but pressure-free question:</p>

<blockquote>
<p>"Hi [name], I know you've got a lot on. I just wanted to know whether you're going ahead with the project or whether priorities have changed. No problem at all if so — just to be clear on where we stand. Best regards."</p>
</blockquote>

<p>This email has a trick: you give them permission to say no. That removes the perceived pressure and, paradoxically, increases the chances they reply. Also, if the project really has been cancelled, it's better to know now than to keep investing time in a dead lead.</p>

<h3>Day 14-21: long-term follow-up</h3>

<p>If there's no answer by this point, the sale isn't closed but it isn't lost either. Switch to <strong>maintenance mode</strong>: a monthly contact with useful content, no closing pressure.</p>

<ul>
<li>An article relevant to their sector</li>
<li>A piece of company news that might interest them</li>
<li>A success story from a similar client</li>
</ul>

<p>The goal here is to stay relevant until the buying moment arrives. And it will.</p>

<h2>What to say (and what not to say) in follow-up</h2>

<p>There are phrases that kill a sale during follow-up. These are the worst:</p>

<ul>
<li><strong>"I was calling to see if you'd made a decision."</strong> It sounds like pressure. The client feels chased.</li>
<li><strong>"How's my proposal?"</strong> You put the focus on you, not on them.</li>
<li><strong>"Just a reminder that the offer expires on Friday."</strong> If it's an artificial excuse, the client notices and loses trust.</li>
</ul>

<p>The phrases that work always have something in common: <strong>they add value or show genuine interest in the client's situation</strong>, not in your sale.</p>

<ul>
<li>"Talking to another client in the sector, I thought of your case and wanted to share something."</li>
<li>"Has anything changed in the project since we last spoke?"</li>
<li>"Is there anything in the proposal that wasn't quite clear or that you have doubts about?"</li>
</ul>

<h2>The channel matters: email vs. call vs. messaging</h2>

<p>There's no universally best channel, but there are patterns that work:</p>

<h3>Email</h3>
<p>Ideal for the first send of the quote and written follow-ups where you want a record. Bad for urgent follow-up or when the lead has gone days without replying: emails get lost easily.</p>

<h3>Phone call</h3>
<p>The most effective channel for direct follow-up. It's more personal, lets you detect objections in real time and shows a level of commitment that email doesn't convey. The problem is that many people don't pick up calls from unknown numbers. Solution: let them know by email that you'll call.</p>

<h3>Messaging (WhatsApp, etc.)</h3>
<p>Instant messaging has become a perfectly valid follow-up channel, especially in commercial relationships where there's already prior trust. It's more informal, but also more direct. Use it when the client has already used it with you or when their profile suggests it.</p>

<p>The general rule: <strong>use the channel the client already uses with you</strong>. If all the conversations have been by email, don't send a message out of the blue. If you've already spoken by phone several times, a call is natural.</p>

<h2>How to know when to stop</h2>

<p>One of the most frequent questions: how many follow-ups are too many?</p>

<p>The honest answer: it depends on the ticket and the sales cycle. For a £2,000 sale with a quick decision, three contacts over two weeks is enough. For a £50,000 sale with multiple stakeholders, you can spend six months in active follow-up without it being excessive.</p>

<p>The stop signal isn't time, but the client's response. If they explicitly ask you to stop, you stop. If they tell you the project has been cancelled, you thank them and close. If they simply don't respond after five or six well-spaced attempts, you move them to passive follow-up (an email a month) and spend your energy on hotter leads.</p>

<p><strong>Don't confuse persistence with harassment.</strong> Persistence respects the client's timing. Harassment ignores it.</p>

<h2>The structural problem: doing this by hand doesn't scale</h2>

<p>Here's the real problem for most small businesses: manual follow-up doesn't scale.</p>

<p>When you have five open quotes, you can keep the follow-up in your head. When you have twenty, you need a system. When you have fifty, without a system you lose sales for sure.</p>

<p>The chaos of manual follow-up has a direct cost: leads that expire because no one followed them up in time, quotes that never closed because the salesperson forgot to call on Tuesday, opportunities lost from having no visibility of each deal's status.</p>

<p>The solution isn't to work more hours. It's to have a system that reminds you when to do what, with which client and through which channel.</p>

<h2>Automating follow-up without losing the human touch</h2>

<p>Automating follow-up doesn't mean sending robotic emails en masse. It means having a system that:</p>

<ul>
<li>Alerts you when a quote has gone X days without a reply</li>
<li>Shows you the full history of each client before you call</li>
<li>Automatically records every contact so you don't lose the thread</li>
<li>Lets you set up custom follow-up reminders per deal</li>
</ul>

<p>With DealForge, for example, when you send a quote you can set up automatic reminders: "if there's no reply in 3 days, alert me". The system reminds you, you decide what to do. The automation handles the logistics; you handle the relationship.</p>

<p>What's more, with email open tracking — knowing whether the client opened the quote or not — you have information that completely changes your strategy. If the client opened the proposal four times in two days and hasn't replied, it's very different from never having opened it. In the first case, there's interest but a doubt or a blocker. In the second, maybe it never even reached their inbox.</p>

<h2>A practical example: a renovation company</h2>

<p>Imagine a renovation company that sends between 15 and 25 quotes a month. The average ticket is £8,000. With a 20% close rate, they win 3-5 projects a month.</p>

<p>The problem: many quotes go without systematic follow-up because the manager also handles the technical side. Result: leads that cool off, clients who end up hiring the competition not because they were cheaper, but because they were more consistent in their contact.</p>

<p>With a structured protocol and automatic reminders, that same company can raise its close rate to 28-30% without increasing the number of quotes sent. In economic terms: 1-2 additional projects a month, £8,000-£16,000 more revenue with the same sales effort.</p>

<p>Follow-up isn't an extra. It's part of the sales process.</p>

<h2>Summary: the protocol in five points</h2>

<ol>
<li><strong>Close the first contact with a timing question</strong>: "When do you think you'll have an answer?" That way you know when to make the next contact and have implicit permission to do so.</li>
<li><strong>Confirm receipt the next day</strong> if you sent it by email. Two lines, no pressure.</li>
<li><strong>The first real follow-up, at 3-5 days, by phone and adding value</strong>. Don't ask about the decision: resolve a doubt or share something useful.</li>
<li><strong>The second follow-up, at 7-10 days, giving them permission to say no</strong>. This reduces perceived pressure and increases responses.</li>
<li><strong>After two weeks with no answer, maintenance mode</strong>: a contact a month with relevant content until the moment comes.</li>
</ol>

<p>Following up on quotes isn't an awkward chore to be done grudgingly. It's a sales skill that, well executed, can double your close rate without adding a single pound to the marketing budget.</p>

<p><strong>If you want to stop following up by hand and have total visibility of your open quotes</strong>, <a href="/registro?lang=en">DealForge</a> includes automatic reminders, open tracking and pipeline management from day one. Try it free, no credit card required.</p>`,
  },
  // ─── 11. The 7 things every professional quote must include ───
  {
    slug: "7-things-every-professional-quote-must-include",
    titulo: "The 7 things every professional quote must include (and the 3 that ruin your close)",
    extracto:
      "A badly structured quote is money slipping away. We review the 7 essential elements that must appear in any professional quote, why each one matters, and the most common mistakes that stop the client from signing.",
    categoria: "guias",
    tags: ["professional quotes", "estimates", "how to create a quote", "quote structure", "B2B sales", "small business", "freelancers", "closing sales"],
    autor: "DealForge",
    publishedAt: "2026-04-22T09:00:00Z",
    metaTitulo: "The 7 Things Every Professional Quote Must Include — DealForge",
    metaDescripcion:
      "A practical guide to the 7 essential elements in any professional quote: identification, prices with VAT, payment terms, timelines and more. Checklist included.",
    metaKeywords:
      "professional quote details, what a quote must include, professional quote structure, how to create a quote, quote elements, perfect quote, professional quote small business, quote checklist",
    contenido: `<p>You spend hours preparing a proposal. You calculate prices, adjust margins, carefully write the email. You send it. And nothing happens.</p>

<p>In many cases the problem isn't the price. It's that the quote itself doesn't convey professionalism, doesn't resolve the client's doubts before they arise, or simply lacks information they need to make a decision.</p>

<p>A quote isn't just a document with numbers. It's a sales tool. And like any tool, it works badly if pieces are missing.</p>

<p>Here are the 7 things that can't be missing from any professional quote, explained from the perspective of what the client needs to see to say yes.</p>

<h2>1. Complete identification of both parties</h2>

<p>It seems obvious, but the number of quotes that arrive with no letterhead, no tax number, no address or no contact name is surprisingly high.</p>

<p>The minimum that should appear:</p>

<ul>
<li>Your company's name</li>
<li>Tax/VAT number</li>
<li>Registered address</li>
<li>Contact phone and email</li>
<li>The full name of the client or recipient company</li>
<li>The client's tax number (if a company)</li>
</ul>

<p>Why does it matter? Because a quote without these details has no legal validity in a dispute. But beyond the legal side: a client who receives a document with no letterhead perceives they're dealing with someone disorganised. That bias affects the buying decision, even unconsciously.</p>

<p>If your company is small or you're a freelancer, this matters twice as much. A professional presentation makes up for a lack of size.</p>

<h2>2. Quote number and issue date</h2>

<p>Every quote should have a unique number and a date. Without that, you can't track it internally, you can't reference the proposal in later conversations and, if the client accepts weeks later, it's unclear which version they approved.</p>

<p>The quote number serves several functions:</p>

<ul>
<li>Unambiguous identification of the document</li>
<li>A reference for sales follow-up</li>
<li>Traceability if there are revisions or later versions</li>
<li>A basis for numbering the corresponding invoice</li>
</ul>

<p>The issue date, in addition, is directly tied to the next point.</p>

<h2>3. Validity date of the offer</h2>

<p>A quote with no expiry date is an indefinite promise that can cost you dearly.</p>

<p>Costs change. Suppliers update their rates. Your capacity varies. If you sent a quote six months ago with prices from back then and the client now turns up wanting to accept it, you have a problem.</p>

<p>The norm is to include a validity of 15 to 30 days. In sectors with volatile materials (construction, technology, energy), it can be even less. For stable services, you can stretch it to 60 days.</p>

<p>Validity also creates legitimate urgency. It's not artificial pressure: it's real management of your business. And the client understands it perfectly when it's well explained: <em>"This proposal is valid until 30 April; after that date we'll review prices subject to availability."</em></p>

<h2>4. Detailed description of the work or product</h2>

<p>This is the point where most quotes fail, and the one that most influences the close.</p>

<p>A vague quote breeds distrust. If the client doesn't know exactly what they're hiring, the comparison with the competition is made on price alone. And there's always someone cheaper than you.</p>

<p>A good description should include:</p>

<ul>
<li><strong>What's done</strong>: the exact scope of the work or the products included</li>
<li><strong>What's not done</strong>: the exclusions, just as important as the above</li>
<li><strong>How it's done</strong>: methodology or process if relevant</li>
<li><strong>With what materials or tools</strong>: if applicable to the sector</li>
<li><strong>How many revisions or iterations</strong>: key in creative or consulting services</li>
</ul>

<p>The rule of thumb: if the client can misinterpret something, write it explicitly. Post-project disputes almost always originate in an ambiguous quote.</p>

<p>Example of a weak description: <em>"Website design: £1,200"</em></p>

<p>Example of a solid description: <em>"Design and development of a corporate website in WordPress: up to 5 pages (Home, Services, About us, Blog, Contact), contact form, mobile optimisation, Google Analytics integration, 2 rounds of design revisions. Does not include copywriting, photography or web hosting."</em></p>

<p>The second version justifies the price. The first invites you to negotiate it.</p>

<h2>5. Itemised price with VAT shown separately</h2>

<p>The price should appear clearly, itemised and with VAT always visible and separate from the net amount.</p>

<p>The recommended structure:</p>

<ul>
<li>Unit price per item or service</li>
<li>Quantity</li>
<li>Line subtotal</li>
<li>Total net amount</li>
<li>Applicable VAT rate (standard, reduced or zero-rated, with justification)</li>
<li>VAT amount</li>
<li>Total to pay</li>
</ul>

<p>Why itemise instead of just stating the total? For two reasons:</p>

<p>First: the business client needs to see the net amount separately for their accounting. If you only see a total of £1,452 with no breakdown, you have to start calculating. That creates friction.</p>

<p>Second: the breakdown makes the price look more reasonable. Three lines of £300, £400 and £500 are perceived differently from a single block of £1,200, even though they're the same.</p>

<p>If you've applied discounts, show them explicitly too. A visible discount has commercial value. A price quietly cut does not.</p>

<h2>6. Payment terms</h2>

<p>None of this: <em>"Payment to be agreed."</em></p>

<p>Payment terms should be written into the quote. Don't leave this point for later, because later is always more awkward.</p>

<p>What should be clear:</p>

<ul>
<li><strong>Payment method</strong>: bank transfer, direct debit, card...</li>
<li><strong>Schedule</strong>: 50% upfront, 50% on delivery; single payment within 30 days; monthly payment...</li>
<li><strong>Bank details or payment instructions</strong>: account details if by transfer</li>
<li><strong>Late-payment terms</strong> (optional but recommended on large projects): interest or penalties for delay</li>
</ul>

<p>Including this from the start filters out problematic clients before they sign, and avoids awkward conversations at the end of the project when the work is already done.</p>

<p>A serious client has no problem with clear payment terms. On the contrary: they value them, because they show you're running your business professionally.</p>

<h2>7. Delivery or completion time</h2>

<p>When it starts and when it finishes. For services, how many working days it involves. For products, when it's delivered.</p>

<p>This detail is critical for the client because it affects their own planning. If they need the work finished before a specific date, the quote must make clear whether that's possible or not.</p>

<p>Also detail the conditions that affect the timeline:</p>

<ul>
<li><em>"The timeline starts from receipt of the initial payment and the necessary materials."</em></li>
<li><em>"Timelines may be affected if the client's revisions exceed a 48-hour response time."</em></li>
<li><em>"Estimated delivery: 3 weeks from signing the contract."</em></li>
</ul>

<p>This doesn't just manage expectations. It also protects you if the project drags on for reasons beyond your control.</p>

<h2>Bonus: the 3 things that ruin your close even if the rest is perfect</h2>

<p>A quote can have all 7 points above and still fail if it makes any of these mistakes.</p>

<h3>Mistake 1: The formatting is a mess</h3>

<p>A badly laid-out Word document, a PDF with inconsistent fonts, or worse, an email with the prices in the body of the text with no structure. Formatting communicates before content does. If the presentation is careless, the client assumes the work will be too.</p>

<p>You don't need to be a designer. You need consistency: one typeface, brand colours, uniform margins, a logo in the header.</p>

<h3>Mistake 2: Technical language with no translation</h3>

<p>If your client isn't from the sector, every technical term you use without explaining is a barrier. Barriers create doubts. Doubts create silence.</p>

<p>Write for the person who's going to read the document, not for an industry colleague. If the final decision-maker is the general manager and not the technician, the language has to be executive.</p>

<h3>Mistake 3: There's no clear next step</h3>

<p>Many quotes end and the client doesn't know what to do to accept. Reply to the email? Sign something? Make a transfer? Call?</p>

<p>The document should end with a clear instruction: <em>"To accept this proposal, reply to this email with your confirmation or sign the attached document and send it back to us."</em></p>

<p>Friction in the acceptance process kills sales that were already won.</p>

<h2>The quote as a sales tool, not just information</h2>

<p>The difference between a quote that closes and one that ends up in limbo isn't always the price. Often it's the structure, the clarity and the feeling the document conveys.</p>

<p>A client who reads a well-built quote thinks: <em>"This company knows what it's doing."</em> A client who reads an ambiguous or careless quote thinks: <em>"Better get a second opinion."</em></p>

<p>The 7 points in this guide aren't bureaucracy. They're the answers to the questions the client asks themselves while reading your proposal:</p>

<ul>
<li><em>Who am I dealing with?</em> → Identification</li>
<li><em>Which proposal are we talking about?</em> → Number and date</li>
<li><em>How long do I have to decide?</em> → Validity</li>
<li><em>What exactly am I buying?</em> → Detailed description</li>
<li><em>How much will it really cost me?</em> → Itemised price with VAT</li>
<li><em>How and when do I have to pay?</em> → Payment terms</li>
<li><em>When will I have it ready?</em> → Delivery time</li>
</ul>

<p>If your quote answers all these questions before the client asks them, you reduce friction to a minimum and increase the chances of closing.</p>

<h2>How to simplify all this in practice</h2>

<p>Keeping these 7 elements consistent in every quote is easy if you have a template or a system. Hard if you build each quote from scratch in Word or Excel.</p>

<p>In <a href="/registro?lang=en">DealForge</a>, every quote automatically includes all these elements: a sequential number, dates, configurable validity, VAT breakdown, payment terms and a digital acceptance button so the client signs in one click. You don't have to remember what to put: the structure is already there.</p>

<p>The result is that every quote you send goes out with the same level of professionalism, regardless of whether you prepared it in ten minutes or an hour.</p>

<h2>Quick checklist before sending any quote</h2>

<p>Before hitting send, run through this list:</p>

<ol>
<li>Does your company's name, tax number and contact details appear?</li>
<li>Do the client's details appear?</li>
<li>Does it have a quote number and issue date?</li>
<li>Does it state how long the offer is valid?</li>
<li>Is the description of the work specific enough? Does it include what's NOT included?</li>
<li>Is the price itemised with the net amount and VAT shown separately?</li>
<li>Are the payment terms and schedule clear?</li>
<li>Does the delivery or completion time appear?</li>
<li>Is the formatting clean and consistent with your brand image?</li>
<li>Is there a clear next step for the client to accept?</li>
</ol>

<p>If you can tick all the points, you're sending a quote that works for you.</p>

<p><strong>Want your quotes to always have this structure without having to think about it?</strong> <a href="/registro?lang=en">DealForge</a> generates professional quotes in minutes, with all the required fields, automatic VAT and digital signature included. Try it free, no credit card required.</p>`,
  },
  // ─── 12. Why you lose deals by quoting slowly ───
  {
    slug: "why-you-lose-deals-by-quoting-slowly",
    titulo: "Why you lose 60% of deals by quoting slowly (and how to fix it this week)",
    extracto:
      "Every hour you take to send a quote is money slipping away. We analyse why response speed is the most underestimated factor in the sales process and what you can do today to stop losing sales by arriving late.",
    categoria: "ventas",
    tags: ["fast quotes", "sales speed", "closing sales", "sales process", "estimates", "small business", "sales pipeline", "response time"],
    autor: "DealForge",
    publishedAt: "2026-04-26T09:00:00Z",
    metaTitulo: "Why You Lose 60% of Deals by Quoting Slowly — DealForge",
    metaDescripcion:
      "Quote speed is the most underestimated factor in the sales process. Discover why you arrive late to your sales and how to go from quoting in days to quoting in minutes.",
    metaKeywords:
      "quoting slowly losing sales, quote speed, quote response time, quote fast, improve quoting process, losing deals, sales pipeline small business, fast quotes",
    contenido: `<p>There's an unwritten rule in B2B sales that very few companies apply: the first to quote has a disproportionate advantage over the rest.</p>

<p>It's not intuition. There's data behind it. Studies on B2B buyer behaviour consistently show that companies responding to a quote request within the first 60 minutes are 7 to 10 times more likely to close than those responding after 24 hours. And if we're talking about more than 48 hours, many prospects have already made a decision without you.</p>

<p>Yet most small businesses still send quotes days late, convinced that the quality of the quote makes up for the wait. They're wrong.</p>

<p>In this article we'll dismantle that myth, explain why speed matters more than you think, and give you a concrete plan to go from quoting in days to quoting in minutes.</p>

<h2>The real cost of quoting late</h2>

<p>Picture this: a potential client requests a quote from three companies on Monday morning. You reply on Wednesday with an impeccable document. By then, company A has already sent something the same Monday, spoken to them by phone on Tuesday and has a follow-up meeting on Thursday.</p>

<p>Your quote arrives in an inbox where the decision is almost made. You can be better, cheaper and more professional, but you're late to the game.</p>

<p>This isn't an extreme case. It's the daily reality of thousands of small businesses that lose contracts they deserved to win, simply because their quoting process is slow.</p>

<p>The problem has three dimensions:</p>

<ul>
<li><strong>Economic:</strong> Every deal lost to slowness is revenue that doesn't come in. If you have an average ticket of £3,000 and lose two sales a month for this reason, you're leaving £72,000 a year on the table.</li>
<li><strong>Commercial:</strong> The prospect that doesn't close with you doesn't disappear. They close with your competition and build a relationship with them. That client doesn't come back.</li>
<li><strong>Reputational:</strong> In small markets or specific verticals, the perception of being "slow to respond" spreads. Clients talk about these experiences.</li>
</ul>

<h2>Why speed matters psychologically</h2>

<p>Something happens in the buyer's mind when they request a quote that many salespeople ignore: at that moment, their level of interest is at its peak.</p>

<p>When someone requests a quote, they've already gone through the phase of recognising they have a problem, already considered possible solutions, and already decided they want to explore working with someone like you. They're hot. They're motivated. They have the energy to make a decision.</p>

<p>That state doesn't last. The buyer's life goes on: other projects come up, urgencies arise, priorities change. Every hour that passes without a reply, the level of activation drops. At 48 hours, many buyers have mentally moved on to something else. If your quote arrives then, they have to reactivate their interest from scratch. And that's hard.</p>

<p>A fast quote, on the other hand, arrives while the client is still in decision mode. They feel looked after. They perceive you as agile. And that first positive impression colours the entire commercial relationship that follows.</p>

<h2>The 4 reasons small businesses quote slowly</h2>

<p>It's not a lack of willingness. Most businesses that quote late do so for structural reasons that have a solution.</p>

<h3>1. The quoting process is manual and from scratch</h3>

<p>Each quote is built by hand: open Word or Excel, find last time's template, copy the items, look up prices in your email or from memory, calculate the VAT by hand, export to PDF, attach it to the email. A simple quote can take 45 minutes. A complex one, hours.</p>

<p>When the salesperson has three other urgent things in the day, the quote becomes "when I can". And "when I can" arrives on Wednesday.</p>

<h3>2. Prices aren't centralised or up to date</h3>

<p>In many small businesses, prices live in the owner's head, in a spreadsheet no one updates, or scattered across emails with suppliers. Every time you need to quote, you have to research the correct price. That adds time and creates errors.</p>

<p>I've seen businesses where the salesperson needs to ask the boss the price before they can finish the quote. If the boss is in a meeting, the quote waits.</p>

<h3>3. There are too many internal approvers</h3>

<p>In companies with some structure, quotes go through review before going out. The salesperson prepares it, sends it to the boss, the boss reviews it when they can, suggests changes, back to the salesperson... Days lost in an internal ping-pong the client doesn't see but feels.</p>

<h3>4. There's no internal sense of urgency</h3>

<p>If no one measures the response time of quotes, no one feels the pressure to reduce it. Sales teams usually have close metrics, pipeline metrics, activity metrics. But rarely quote-speed metrics.</p>

<p>What isn't measured doesn't improve. And what doesn't improve becomes the norm.</p>

<h2>How much time is too much</h2>

<p>It depends on the sector and the type of sale, but there are useful benchmarks:</p>

<ul>
<li><strong>Under 2 hours:</strong> Optimal for low or mid-ticket services with relatively standardised prices (cleaning, design, entry-level consulting, training).</li>
<li><strong>Same day:</strong> Acceptable for more complex services or projects that require some prior analysis.</li>
<li><strong>24 hours:</strong> The reasonable limit for almost any kind of B2B sale. Going beyond this starts to cost you deals.</li>
<li><strong>More than 48 hours:</strong> High-risk zone. Prospects start to assume that working with you means slowness, and many have already moved forward with another option.</li>
</ul>

<p>If your average right now is 3-5 days, you're not competing on the same terms as someone who responds in 2 hours. Even if your product is better.</p>

<h2>The thought experiment of the three competitors</h2>

<p>Think about the last time a potential client asked you for a quote. They probably also asked two or three competitors.</p>

<p>Now imagine one of those competitors has a process to respond in 90 minutes, with a well-presented document and a personalised message. What cumulative advantage do they have over you if you take 3 days?</p>

<ol>
<li>They already spoke to the client while you were still preparing the quote.</li>
<li>They already resolved initial doubts and built a bit of rapport.</li>
<li>Their proposal is in the client's mind as a reference when yours arrives.</li>
<li>If the client is in a hurry, they may have already decided without waiting to see more options.</li>
</ol>

<p>Speed isn't just one more factor. It's a compounding advantage that multiplies with every hour that passes.</p>

<h2>How to reduce quoting time: a practical plan</h2>

<p>There's no magic here. There's process. These are the concrete changes with the biggest impact.</p>

<h3>Step 1: Build an up-to-date price catalogue</h3>

<p>Centralise all your prices in a single place anyone on the team can consult. Not in the boss's head. Not in five different spreadsheets. In one place, accessible, with up-to-date prices.</p>

<p>This alone removes one of the biggest bottlenecks: the research time before you can put a number in the quote.</p>

<h3>Step 2: Create templates by service or product type</h3>

<p>80% of your quotes probably cover the same 10-15 items with variations. Create base templates for each type of proposal that you can fill in minutes, not hours.</p>

<p>A well-made template isn't a copy-paste with no personalisation. It's a pre-built structure where you only need to adjust quantities, timelines and the client's name. The real personalisation time of a quote should be 10 minutes, not 45.</p>

<h3>Step 3: Remove intermediate approvers for standard quotes</h3>

<p>Clearly define which types of quotes can go out without review (within predefined ranges of price, discount and scope) and which need approval. Most should be able to go out without passing through the boss.</p>

<p>If you trust your team to talk to clients, you can trust them to send a quote within the agreed parameters.</p>

<h3>Step 4: Measure response time</h3>

<p>Start recording when each quote request comes in and when the quote goes out. Just being aware that this number exists already creates positive pressure to improve it.</p>

<p>Set the team a goal: respond in under X hours. Review it in the weekly. Treat the outliers for what they are: process problems, not individual failings.</p>

<h3>Step 5: Use tools that speed up generation</h3>

<p>This is probably the highest-impact change in the short term. If your quoting process is manual, switching to dedicated software can cut generation time from 45 minutes to 5-10 minutes per quote.</p>

<p>Not by magic, but because you already have the prices loaded, the templates built, the VAT configured, and the PDF generates automatically.</p>

<h2>The side effect no one mentions</h2>

<p>When you reduce quoting time, something unexpected happens: you quote more.</p>

<p>When quoting is fast, there's less friction to doing it. Salespeople send quotes they didn't used to send because "it wasn't worth the time". Leads that used to be left to cool off now get worked.</p>

<p>The volume of quotes sent goes up. And even if the close rate stays the same, more quotes means more sales closed in absolute numbers.</p>

<p>It's the same effect online stores get when they simplify the checkout process: fewer steps, more conversions. Not because the customer wants more, but because there's less friction to completing the action.</p>

<h2>Speed vs. quality: the false dilemma</h2>

<p>There's a recurring objection when you talk about quoting faster: "If I rush, I lower the quality."</p>

<p>This objection confuses speed with sloppiness. They're not the same.</p>

<p>A fast, well-made quote is possible when you have the process sorted. Speed is a consequence of having things organised, not of skipping steps.</p>

<p>What is true: if your quality depends on spending 3 hours on each quote because you have to build everything from scratch every time, then you have a process problem, not a virtue of perfectionism. And that problem has a solution.</p>

<p>The goal isn't to quote fast and badly. It's to quote fast and well. They're compatible when you have the right tools and process.</p>

<h2>How to know if you're losing deals to speed</h2>

<p>There are clear signs:</p>

<ul>
<li>Clients who tell you "we've already covered it with another supplier" when you finally send the quote</li>
<li>Prospects who stop replying after requesting a quote (disengagement during the wait)</li>
<li>Deals that close very quickly when you send the quote the same day, but cool off when you take longer</li>
<li>Client feedback mentioning that "you took a while to respond"</li>
<li>Comparisons where you lost despite having a better price or quality (the competitor won for other reasons, and speed is usually one of them)</li>
</ul>

<p>If you recognise any of these situations, quote speed is probably one of your biggest leaks in the pipeline.</p>

<h2>The standard to aim for</h2>

<p>For service businesses with relatively predictable prices, the standard to aim for is this: if a client requests a quote before 5pm, they receive it that same day. If they request it in the evening or at the weekend, they receive it first thing the next day.</p>

<p>That level of response doesn't require working 24 hours. It requires having the process sorted so that generating the quote is a task of minutes, not hours.</p>

<p>In <a href="/registro?lang=en">DealForge</a>, the average time to generate and send a complete quote is 7 minutes. That includes opening the platform, finding the client, selecting the items from the catalogue, adjusting quantities and prices, generating the PDF and sending it with a digital acceptance link. Seven minutes.</p>

<p>With that generation time, responding the same day stops being a heroic effort and becomes the norm.</p>

<h2>In summary: speed is a real competitive advantage</h2>

<p>In a market where everyone offers similar quality, the one who responds first has a real, measurable advantage. Not because clients are impatient or irrational, but because response speed communicates something about how you'll work with them.</p>

<p>A supplier who responds in 90 minutes conveys: organisation, respect for the client's time, ability to execute. One who takes 3 days conveys the opposite, even if it's unfair.</p>

<p>The levers to improve are clear:</p>

<ol>
<li>Centralise your prices</li>
<li>Build reusable templates</li>
<li>Reduce intermediate approvers</li>
<li>Measure response time</li>
<li>Use tools that remove manual work</li>
</ol>

<p>You don't need to change everything at once. Pick one of these points, implement it this week, and measure the impact. In a month you'll probably have cut your quoting time in half.</p>

<p><strong>Want to start today?</strong> <a href="/registro?lang=en">DealForge</a> is designed for exactly this: generating professional quotes in minutes, with an integrated price catalogue, templates by service type and sending with a digital signature. Start free, no credit card, and send your first quote in under 10 minutes.</p>`,
  },
  // ─── 13. Common mistakes when sending quotes by email ───
  {
    slug: "common-mistakes-sending-quotes-by-email",
    titulo: "12 common mistakes when sending quotes by email (and how to avoid them)",
    extracto:
      "Email is still the main channel for sending quotes, but most businesses make the same mistakes that get their quotes ignored, delayed or simply lost. Here are the 12 most frequent ones and how to fix them today.",
    categoria: "ventas",
    tags: ["quotes by email", "sending quotes", "sales mistakes", "sales process", "professional quotes", "small business", "sales email", "sales follow-up"],
    autor: "DealForge",
    publishedAt: "2026-04-30T09:00:00Z",
    metaTitulo: "12 Mistakes When Sending Quotes by Email (and How to Avoid Them) — DealForge",
    metaDescripcion:
      "Email is the main channel for sending quotes, but most businesses make mistakes that get their quotes ignored. Discover the 12 most common slip-ups and how to fix them.",
    metaKeywords:
      "quote email mistakes, send quote by email, how to send a quote, professional quote email, quote follow-up, quote PDF email, quote email template, quotes small business",
    contenido: `<p>Think about it for a moment: you spend time preparing a detailed quote, you take care over the numbers, the presentation, the terms. And then you send it by email with "please find the quote attached, I remain at your disposal". And you never hear back.</p>

<p>The problem isn't always in the price or in what you offer. Often it's in how you send it.</p>

<p>The quote email is one of the most critical moments of the sales process, and also one of the most neglected. In this article we review the 12 most common mistakes small businesses and freelancers make when sending quotes by email, and what you can do to fix them without reinventing anything.</p>

<h2>Mistake 1: Generic subject line with no context</h2>

<p>The subject line is the first thing the client reads. If it says "Quote" or "Requested quote", you're competing with dozens of emails without standing out in the slightest.</p>

<p>An effective subject includes the client or company name, the type of service and sometimes a signal of urgency or relevance. Examples:</p>

<ul>
<li><strong>Bad:</strong> "Quote"</li>
<li><strong>Bad:</strong> "Requested quote"</li>
<li><strong>Good:</strong> "Web design quote for García Construction — valid until 25 April"</li>
<li><strong>Good:</strong> "Your maintenance quote is ready, María"</li>
</ul>

<p>The subject has to answer, in two seconds, the question: "What's in here for me and why should I open it now?"</p>

<h2>Mistake 2: The email body is the quote itself</h2>

<p>Many businesses include all the quote details directly in the email body: items, prices, terms, all pasted in there. The problem is that makes the email very long, hard to read on mobile, and complex for the client to save or print.</p>

<p>The email body should be short: two or three paragraphs of context, a summary of the value you offer, and the quote as an attached document or link. The email is the wrapping; the quote is the gift.</p>

<p>A structure that works:</p>

<ol>
<li>Personalised greeting</li>
<li>A sentence recalling the context ("as we discussed on Thursday...")</li>
<li>The main benefit of your proposal in a single sentence</li>
<li>Link or attachment to the document</li>
<li>A clear next step ("if you have any questions, call me directly on...")</li>
</ol>

<h2>Mistake 3: Not personalising the message</h2>

<p>An email that starts with "Dear customer" or that is clearly an untouched template sends an unmistakable signal: you didn't matter enough for me to write you two lines of my own.</p>

<p>You don't need to write an essay. It's enough to include the name, mention something from the previous conversation ("you mentioned you needed it ready by June") and adapt the tone to the client. Ten minutes of personalisation can make the difference between getting a reply or being ignored.</p>

<h2>Mistake 4: Sending the quote with no prior context</h2>

<p>This is especially common in businesses that get enquiries via the web or social media: someone asks for a price, and the direct response is to send the PDF with the numbers and nothing else.</p>

<p>The problem is the client doesn't yet understand well what you offer or why it's worth that price. A quote with no context is just a list of numbers. Before sending the quote, or in the email itself, you need to anchor the value: what problem you solve, what result the client can expect, why your proposal is right for their situation.</p>

<p>If you haven't had a prior conversation with the client, consider a quick call before sending the quote. You'll raise the close rate considerably.</p>

<h2>Mistake 5: Not stating the validity date</h2>

<p>A quote with no validity date is an invitation to procrastinate. The client has no incentive to decide quickly because the offer will always be there.</p>

<p>Setting a reasonable validity date (10-15 days is usual for services) serves two functions: it creates real urgency and protects you from having to honour a price you may no longer be able to after some time.</p>

<p>Make sure the validity date appears in the document and that you also mention it in the email: "This quote is valid until 30 April. If you have any questions, I'm available this week to talk it through."</p>

<h2>Mistake 6: Not making the next step clear</h2>

<p>What do you want the client to do after reading your quote? If you don't tell them explicitly, they probably won't do anything.</p>

<p>The email should end with a clear, specific call to action. Not "I remain at your disposal" (vague), but something concrete:</p>

<ul>
<li>"If you agree, you can accept the quote by clicking the link."</li>
<li>"Do you have a slot on Wednesday at 11 to discuss it by phone?"</li>
<li>"Reply to this email with any questions and I'll get back to you the same day."</li>
</ul>

<p>The ideal next step is one the client can complete in under two minutes. The easier you make it, the more likely it is to happen.</p>

<h2>Mistake 7: Sending the quote as an editable Word or Excel file</h2>

<p>Sending the quote in .docx or .xlsx format has several problems:</p>

<ul>
<li>The client can modify it accidentally (or intentionally)</li>
<li>The design can break in different versions of Office</li>
<li>It doesn't convey professionalism</li>
<li>If the client prints or forwards it, the numbers can appear wrong</li>
</ul>

<p>The standard is PDF. Always. A PDF has a fixed design, can't be edited without specific tools, and looks the same on any device. If you use quoting software, the PDF is generated automatically in the correct format.</p>

<h2>Mistake 8: Using an unprofessional email address</h2>

<p>It may seem a minor detail, but sending a quote from <em>yourbusiness2009@gmail.com</em> or <em>pete.smith.plumber@hotmail.com</em> sends a signal about how formal your business is.</p>

<p>If you don't have your own domain, get one. An email like <em>quotes@yourbusiness.com</em> or <em>hello@yourbusiness.com</em> costs less than £10 a year and projects a radically different image. It's one of the highest-ROI investments you can make in your professional image.</p>

<h2>Mistake 9: Not following up</h2>

<p>According to B2B sales behaviour data, 80% of deals close after the fifth contact, but most salespeople give up after the first or second. You send the quote, wait for a reply, and if it doesn't come within three days, you assume they weren't interested.</p>

<p>Silence doesn't mean "no". It means "I'm busy", "I left it for later" or "I have a question I don't know how to raise". A well-done follow-up isn't pushy: it's a help.</p>

<p>A simple cadence that works:</p>

<ul>
<li><strong>Day 1:</strong> You send the quote</li>
<li><strong>Day 3:</strong> A short email asking if it arrived OK and whether they have any questions</li>
<li><strong>Day 7:</strong> A call or email reminding them of the validity date and offering a conversation</li>
<li><strong>Day 12-14:</strong> A final contact before the validity expires</li>
</ul>

<p>You don't need more. But you do need to do those steps.</p>

<h2>Mistake 10: Ignoring how it looks on mobile</h2>

<p>More than 60% of emails are opened on mobile devices. If your quote email has huge paragraphs, embedded price tables, or attachments that can't be viewed without downloading, the mobile experience is awful.</p>

<p>Some practical tips:</p>

<ul>
<li>Short paragraphs (3-4 lines maximum)</li>
<li>A single visible, clickable CTA</li>
<li>The attachment as a PDF (it opens on the phone itself with no extra apps)</li>
<li>If you use a link to the online quote, make sure the destination is responsive</li>
</ul>

<h2>Mistake 11: Not including direct contact information</h2>

<p>The client has a question. They want to resolve it quickly so they can make the decision. But your signature only has the company name and a general email. They have to write an email, wait for a reply, and by then they've lost the momentum to decide.</p>

<p>Your signature should always include:</p>

<ul>
<li>Your full name</li>
<li>Your role or title</li>
<li>A direct phone (or mobile) — this is the most important</li>
<li>The company website</li>
</ul>

<p>Reducing the friction to contact you directly is one of the easiest ways to increase the response rate to your quotes.</p>

<h2>Mistake 12: Not knowing whether the client has opened the email</h2>

<p>If you send a quote by email and have no way of knowing whether they opened it, you're making follow-up decisions blind. You call on day three without knowing whether they saw it two hours ago. Or you don't call because "they're surely considering it" when in reality the email never even reached the inbox.</p>

<p>Professional quoting tools like <a href="/registro?lang=en">DealForge</a> show you exactly when the client opened the quote, how many times they've viewed it, and which pages they've reviewed most. With that information, follow-up becomes much smarter: if you see they opened it three times but haven't replied, it's the perfect moment to call. If they haven't opened it, it makes more sense to follow up through another channel.</p>

<h2>The perfect quote email: a base template</h2>

<p>So you have a practical reference, here's an email structure that works well in most contexts:</p>

<p><strong>Subject:</strong> [service] quote for [company name] — valid until [date]</p>

<p><strong>Body:</strong></p>

<p>Hi [name],</p>

<p>As we discussed [reference to the conversation], here's the quote for [brief description of the project or service].</p>

<p>The quote covers [main benefit or expected result] with [key differentiator if any].</p>

<p>You have it attached as a PDF. The price is valid until [date].</p>

<p>If you have any questions or want to adjust anything, write to me or call me directly on [phone]. If you agree, you can confirm by replying to this email or [acceptance link if applicable].</p>

<p>Best regards,<br>[Name]<br>[Role]<br>[Phone]<br>[Website]</p>

<p>Simple. Personalised. With context. With a clear CTA. With direct contact information.</p>

<h2>The underlying problem: email isn't the best way to send quotes</h2>

<p>That said, there's something important to mention: email as a channel for quotes has structural limitations. The quote gets lost among other messages, you don't know when they see it, the client can't comfortably accept it, and you have no visibility of what happens with it.</p>

<p>More and more businesses are moving to sending quotes as web links: the client receives a short email with a link, clicks it, sees the quote on a clean, well-designed page, can ask questions, and if they agree, accepts digitally with one click. Everything is recorded.</p>

<p>In <a href="/registro?lang=en">DealForge</a> it works exactly like this: you generate the quote, send it as a link, and in real time you see when they open it and how many times. The client can accept with a digital signature without downloading or printing anything. The process becomes radically smoother for both parties.</p>

<h2>Conclusion: the email matters more than it seems</h2>

<p>An excellent quote sent badly has far less chance of closing than a good quote sent well. The email is part of the sale, not a mere delivery formality.</p>

<p>The mistakes we've seen aren't hard to fix. Most are changes of habit or process you can apply this very week:</p>

<ul>
<li>A specific subject with name and validity date</li>
<li>A short body with context and a clear CTA</li>
<li>Always in PDF, never in Word</li>
<li>Systematic follow-up at 3, 7 and 12 days</li>
<li>A signature with a direct phone</li>
<li>A professional email with your own domain</li>
</ul>

<p>If you fix even half of these points, you'll notice the difference in the response rate to your quotes. Not because the client wants more from you, but because you're making it much easier for them to say yes.</p>

<p><strong>Want to simplify the whole process?</strong> With <a href="/registro?lang=en">DealForge</a> you can generate professional quotes in minutes, send them as a link or PDF, and see in real time when they're opened. Start free, no credit card required.</p>`,
  },
  // ─── 14. Construction & renovation quotes ───
  {
    slug: "construction-renovation-quotes-guide",
    titulo: "How to create construction and renovation quotes that win jobs",
    extracto:
      "Learn to create professional construction and renovation estimates: chapters, line items, materials, labour, VAT and how to avoid the mistakes that lose jobs.",
    categoria: "guias",
    tags: ["construction quotes", "renovation estimates", "building estimate", "renovations", "construction", "small business", "estimate line items", "VAT"],
    autor: "DealForge",
    publishedAt: "2026-05-04T09:00:00Z",
    metaTitulo: "How to create construction and renovation quotes | Guide 2026 — DealForge",
    metaDescripcion:
      "A complete guide to quoting building works and renovations: chapter structure, VAT, margin calculation and the mistakes that lose jobs. For small businesses in the sector.",
    metaKeywords:
      "construction quotes, renovation estimate, building estimate, how to quote renovations, renovation VAT, construction estimate line items, renovation quoting software, building quote template",
    contenido: `<p>In construction and renovations, <strong>the quote is the sale</strong>. Before a single brick is laid, before you talk about timelines or materials, the client has already made their decision by reading your quote. And if that quote looks confusing, incomplete or unprofessional, they go with the next one.</p>

<p>This article is written for construction firms, renovators, installers and tradespeople who want to quote better, win more jobs and have fewer problems with clients during the works.</p>

<h2>Why construction quotes are different</h2>

<p>A consulting or marketing quote is, by comparison, simple: you describe the service, set the price and you're done. Construction and renovation quotes are a completely different animal for three reasons:</p>

<ul>
<li><strong>The technical complexity is high.</strong> A full home renovation can involve civil works, plumbing, electrics, joinery, painting and even architecture. Each line item has its own pricing logic.</li>
<li><strong>Unforeseen issues are part of the business.</strong> Opening a wall and finding non-compliant installations, or discovering hidden damp, are situations the quote should account for (or at least not ignore).</li>
<li><strong>The client isn't an expert.</strong> Your client doesn't know the difference between a premium porcelain tile and a second-grade one. If you don't explain what you include and what you don't, misunderstandings are guaranteed.</li>
</ul>

<p>A well-made construction quote isn't just a price list. It's a document that manages expectations, protects your margin and drastically reduces conflicts during the works.</p>

<h2>The structure of a professional construction quote</h2>

<p>The industry standard organises quotes by <strong>chapters and line items</strong>. Here's how it works:</p>

<h3>Chapters</h3>
<p>They group line items by type of work. For example:</p>
<ul>
<li>Chapter 01 — Demolition and structural work</li>
<li>Chapter 02 — Electrical installation</li>
<li>Chapter 03 — Plumbing and drainage</li>
<li>Chapter 04 — Finishes and surfaces</li>
<li>Chapter 05 — Interior joinery</li>
<li>Chapter 06 — Painting</li>
</ul>

<p>This structure lets the client see at a glance where the money goes, and lets you control the profitability of each phase of the project.</p>

<h3>Line items</h3>
<p>Each line item describes a specific unit of work. A well-written line item includes:</p>

<ul>
<li><strong>Technical description:</strong> exactly what's done (e.g. "Bathroom tiling with rectified 60x60 cm porcelain, including adhesive, levelling and joint sealing")</li>
<li><strong>Unit of measure:</strong> m², linear m, unit, hour, etc.</li>
<li><strong>Quantity:</strong> the real project measurements</li>
<li><strong>Unit price:</strong> per that unit of measure</li>
<li><strong>Line total:</strong> quantity × unit price</li>
</ul>

<p>The level of detail in the line items is what separates a professional estimator from an amateur. Being vague is expensive: if you put "full bathroom renovation — £3,500" with no breakdown, the client will assume that includes everything, including what you weren't going to do.</p>

<h2>The 8 things that can't be missing from your renovation quote</h2>

<h3>1. Complete details of both parties</h3>
<p>Your company with its tax number, the client's company or name with their tax number, the site address and contact details for both. It sounds basic, but many renovation quotes don't even include the address where the work will be carried out.</p>

<h3>2. Date and quote number</h3>
<p>You need to reference each quote uniquely. When you talk on the phone three weeks later, you both need to know which document you're discussing. Use a system like QUO-2026-0042.</p>

<h3>3. Description of the scope of works</h3>
<p>Before getting into the chapter breakdown, include an introductory paragraph explaining what the quote covers. For example: "This quote comprises the full renovation of the main bathroom at the property located at [address], including demolition, installation, surfaces and finishes per the specifications agreed during the visit on [date]."</p>

<h3>4. Breakdown by chapters and line items</h3>
<p>The core of the quote. The more detailed, the better protected you are. If a job doesn't appear in the quote and the client claims it, you have a problem. If it appears and you can point to it, you don't.</p>

<h3>5. Materials included (and excluded)</h3>
<p>Always specify whether materials are included or are the client's responsibility. If included, state the quality or reference (e.g. "matt porcelain stoneware tile, first quality, price ≤ £30/m²"). If the client wants to swap it for something more expensive, it's an extra.</p>

<h3>6. What is NOT included</h3>
<p>An exclusions section is pure gold. Explicitly include what's out of scope: moving furniture, waste removal if not contemplated, work that depends on third parties, building permits if applicable. This avoids the classic "but wasn't that in the quote?"</p>

<h3>7. Financial terms and payment method</h3>
<p>The payment schedule is critical in construction. The norm is:</p>
<ul>
<li>30-40% on signing the quote or at the start of works</li>
<li>30-40% at an intermediate stage (when a certain progress is reached)</li>
<li>The rest on completion and handover</li>
</ul>
<p>Never start a job without at least the first payment received. And put it in the contract, not just the quote.</p>

<h3>8. Completion time and quote validity</h3>
<p>State the estimated time in working days (not calendar days, unless you work non-stop) and the quote's validity date. Material prices in construction fluctuate. A quote with no expiry date can become a problem if the client accepts it 6 months later with different material prices.</p>

<h2>VAT on renovations: the detail many forget</h2>

<p>Construction and renovation works don't always carry the standard VAT rate. In many countries there's a reduced rate for certain home renovations and improvements, subject to specific conditions (type of property, age of the building, the proportion of materials versus labour, accessibility works, and so on).</p>

<p>Before preparing your quote, confirm the VAT rate that applies in your country and to your specific job. Applying the standard rate where a reduced one applies can lose you the job on price. And applying a reduced rate where the standard one applies can land you in trouble with the tax authority.</p>

<p><em>Practical tip:</em> where a reduced rate depends on the client's circumstances (for example, that the property is their main residence), keep written evidence on file to protect you in case of an inspection. If in doubt, check with your accountant.</p>

<h2>How to calculate the price of a renovation line item</h2>

<p>The most common mistake of novice renovators is to calculate the price as "materials + labour + a bit more". That isn't a margin, that's hoping it works out. The correct formula is:</p>

<h3>Direct cost</h3>
<ul>
<li>Materials (purchase price + transport + estimated 5-10% wastage)</li>
<li>Labour (hours × the real cost of the operative, including employer's contributions)</li>
<li>Subcontractors (if you outsource part of the work)</li>
<li>Ancillary means (scaffolding, specific tools, skip hire)</li>
</ul>

<h3>Indirect costs</h3>
<p>The costs that aren't tied to a specific job but that exist: public liability insurance, vehicle, accountancy, machinery depreciation, the cost of your own quoting time. In renovations, this is usually estimated at 15-20% of the direct costs.</p>

<h3>Commercial margin</h3>
<p>The real profit you want from the job. Remember that the margin is calculated on the selling price, not on the cost. If you want a 20% margin, the multiplier on the cost is 1.25 (not 1.20).</p>

<p>Formula: <strong>Selling price = Total cost / (1 − desired margin)</strong></p>

<p>Example: if the total cost of a line item is £800 and you want a 25% margin, the selling price is 800 / 0.75 = £1,067.</p>

<h2>The most expensive mistakes when quoting renovations</h2>

<h3>Mistake 1: Measuring badly or not measuring</h3>
<p>Don't quote from memory or "by eye". Visit the site, measure personally or with a laser device. A 10% difference in square metres of tiling can mean hundreds of pounds between the real cost and what you quoted.</p>

<h3>Mistake 2: Not allowing for unforeseen issues</h3>
<p>In old buildings, especially those over 30 years old, unforeseen issues are the norm. Include a "contingencies" line of between 5% and 10% of the total, clearly explained to the client. It's better to justify it upfront than to argue over it during the job.</p>

<h3>Mistake 3: Not specifying the quality</h3>
<p>"Aluminium window with double glazing" can be anything from £150 to £800 per unit. If you don't specify the quality and the client expects the most expensive, you have a problem. State the product reference or a maximum material price.</p>

<h3>Mistake 4: Accepting verbal changes with no additional cost</h3>
<p>The client asks for changes during the job. It's inevitable. But every change that isn't documented and doesn't generate a signed additional quote is work you'll do for free. Set out a clear protocol in your quote: any change to the scope is handled via an additional quote before it's carried out.</p>

<h3>Mistake 5: Quoting too late</h3>
<p>In renovations, speed matters. If a client requests three quotes and you take ten days while the others respond in 48 hours, you've already lost, regardless of price. Response speed conveys operational capability.</p>

<h2>Structure template for a renovation quote</h2>

<p>Here's an example structure for a bathroom renovation you can adapt:</p>

<p><strong>CHAPTER 01 — DEMOLITION</strong></p>
<ul>
<li>01.01 Demolition of existing tiling (m²)</li>
<li>01.02 Demolition of existing flooring (m²)</li>
<li>01.03 Removal and transport of rubble (unit)</li>
</ul>

<p><strong>CHAPTER 02 — INSTALLATIONS</strong></p>
<ul>
<li>02.01 Plumbing installation (PEX pipes, connections) (unit)</li>
<li>02.02 Replacement of radiator with electric towel rail (unit)</li>
<li>02.03 Bathroom consumer-unit upgrade (unit)</li>
</ul>

<p><strong>CHAPTER 03 — SURFACES</strong></p>
<ul>
<li>03.01 Wall tiling with rectified 60x120 porcelain (m²)</li>
<li>03.02 Anti-slip 60x60 stoneware flooring (m²)</li>
</ul>

<p><strong>CHAPTER 04 — SANITARYWARE AND FITTINGS</strong></p>
<ul>
<li>04.01 Supply and installation of wall-hung toilet (unit)</li>
<li>04.02 Supply and installation of double basin (unit)</li>
<li>04.03 Supply and installation of walk-in shower (unit)</li>
</ul>

<p><strong>CHAPTER 05 — JOINERY</strong></p>
<ul>
<li>05.01 Supply and installation of white lacquered door (unit)</li>
</ul>

<p><strong>CHAPTER SUMMARY</strong></p>
<ul>
<li>01 Demolition: £XX</li>
<li>02 Installations: £XX</li>
<li>03 Surfaces: £XX</li>
<li>04 Sanitaryware: £XX</li>
<li>05 Joinery: £XX</li>
<li>SUBTOTAL: £XX</li>
<li>VAT: £XX</li>
<li><strong>TOTAL: £XX</strong></li>
</ul>

<h2>How to manage changes during the job</h2>

<p>"Extras" are the main source of conflict in the sector. The client asks for something that wasn't in the quote, you do it assuming they'll pay, and at the end of the project there's an argument. This is avoided with a clear process:</p>

<ol>
<li><strong>Don't carry out any change without a signed document.</strong> However small the extra work, generate a numbered additional quote and get a signature before starting.</li>
<li><strong>Record measurement variations.</strong> If during the works you find there's more surface than expected, communicate it in writing immediately, not at the end of the job.</li>
<li><strong>Document unforeseen issues with photos.</strong> When a surprise appears behind a wall, take photos before acting. That evidence is what will justify the additional cost to the client.</li>
</ol>

<h2>Tools to quote faster</h2>

<p>Most renovators still use Excel or Word templates for their quotes. It works, but it has clear limits:</p>

<ul>
<li>Copying and pasting between projects introduces errors</li>
<li>Keeping an up-to-date price database is tedious</li>
<li>Generating the final PDF and sending it by email are extra manual steps</li>
<li>There's no way to know whether the client opened the quote</li>
</ul>

<p>Quoting software like <strong>DealForge</strong> lets you keep your catalogue of line items with up-to-date prices, build quotes by dragging in items and generating the PDF with your logo in minutes. You can see in real time whether the client has opened the quote, and manage the whole sales process from one platform.</p>

<p>For companies that do more than 10-15 quotes a month, the time saved with a good tool pays for the subscription many times over in the first week.</p>

<h2>Final tips to win more jobs with your quotes</h2>

<p><strong>Present the quote in person whenever you can.</strong> A quote that arrives in a cold email has a much lower conversion rate than one you present, explaining the technical decisions you made. The client pays for your judgement, not just your labour.</p>

<p><strong>Back up the quote with references to similar jobs.</strong> Include a link to your website or two or three photos of similar renovations you've done. Uncertainty is the biggest enemy of the buying decision.</p>

<p><strong>The cheapest doesn't always win.</strong> In renovations, many clients have learned the hard way that the lowest quote is usually the most expensive in the end. If your price is higher, justify it with material quality, warranties, a realistic completion time and the professionalism of the team.</p>

<p><strong>Follow up at 3 and 7 days.</strong> Most jobs are decided in the first week. A calm follow-up call or message ("Have you had a chance to review the quote?") can make the difference between winning or losing the job to a competitor.</p>

<h2>Conclusion</h2>

<p>A well-made construction or renovation quote is much more than a price list. It's the tool with which you manage the client's expectations, protect your margin, reduce conflicts during the works and convey the professionalism that justifies your price.</p>

<p>Apply the chapter-and-line-item structure, always specify qualities and exclusions, apply the correct VAT and establish a clear process for managing scope changes. With those principles well embedded, you'll win more jobs and have far fewer headaches on the ones you carry out.</p>

<p><strong>Want to create renovation quotes in minutes, with the line-item breakdown and a professional PDF included?</strong> Try <a href="/registro?lang=en">DealForge</a> free and start quoting like a big company, even if you're a sole trader or a small business.</p>`,
  },
];

export function getBlogPostEn(slug: string): BlogPostEn | undefined {
  return blogPostsEn.find((p) => p.slug === slug);
}
