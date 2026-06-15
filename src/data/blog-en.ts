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
  // ─── 15. Quotes for marketing agencies ───
  {
    slug: "marketing-agency-quotes-guide",
    titulo: "Quotes for marketing agencies: a practical guide to charging what you're worth",
    extracto:
      "Learn to structure and present quotes at your marketing agency that justify your price, reduce haggling and close more contracts. With real examples and a practical template.",
    categoria: "guias",
    tags: ["marketing quotes", "marketing agencies", "service quotes", "agency retainer", "selling digital services", "small business", "freelance marketing"],
    autor: "DealForge",
    publishedAt: "2026-05-08T09:00:00Z",
    metaTitulo: "Quotes for marketing agencies: a practical guide 2026 — DealForge",
    metaDescripcion:
      "How to structure and present quotes at your marketing agency: pricing models, service breakdown, how to avoid haggling and an example template.",
    metaKeywords:
      "marketing agency quote, marketing services quote, quote digital services, marketing agency retainer, how to charge for marketing services, marketing quote template, agency quoting software",
    contenido: `<p>If you run a marketing agency — or work as a freelancer in the sector — you know perfectly well that <strong>quoting is one of the most uncomfortable parts of the business</strong>. The services are intangible, the scope can be blurry, and the client always has a cousin who does it cheaper. The result: many agencies end up charging less than they should, or waste time on proposals that never close.</p>

<p>This guide is for that. Let's look at how to structure quotes that communicate value, protect your margin and speed up the client's decision. No fluff.</p>

<h2>Why quoting marketing services is different from other sectors</h2>

<p>In construction, you quote square metres and materials. In logistics, you quote tonnes and kilometres. In marketing, you quote <strong>results you can't 100% guarantee</strong>, delivered by people whose time is hard to measure, with tools that change every six months.</p>

<p>That combination makes marketing quotes especially hard to defend in front of a sceptical client. The most common problems:</p>

<ul>
<li>"My client doesn't understand why I charge so much if it's 'only' a post a day"</li>
<li>"I lose the contract because someone else does it cheaper, even though I know it'll fail"</li>
<li>"The client constantly asks for changes and I had quoted something specific"</li>
<li>"I don't know whether to charge by the hour, by results or by monthly retainer"</li>
</ul>

<p>All these problems have their root in the same place: <strong>a quote that doesn't communicate the work, the process or the value well</strong>. Let's fix it.</p>

<h2>The three quoting models for marketing agencies</h2>

<p>Before talking about structure, you have to decide how you charge. In marketing there are basically three models, and each has its ideal context.</p>

<h3>1. Monthly flat fee (retainer)</h3>

<p>The model preferred by most established agencies. The client pays a fixed monthly fee in exchange for a defined set of services: social media management, a weekly newsletter, monthly reports and X hours of consulting.</p>

<p><strong>Advantages:</strong> predictable income, an ongoing relationship with the client, the chance to specialise in their sector over time.</p>

<p><strong>Downside:</strong> if you don't define the scope well, the client pushes to fit more and more work into the retainer. The key is a contract with a very precise scope.</p>

<p><strong>When to use it:</strong> when the client needs an ongoing presence (social, content, SEO, email marketing). It works especially well when the relationship is long-term and trust is established.</p>

<h3>2. Per project</h3>

<p>A fixed price for a specific deliverable: a campaign launch, a rebrand, a new website, a six-month content strategy.</p>

<p><strong>Advantages:</strong> easy for the client to understand, no commitment to continuity, allows large projects with high budgets.</p>

<p><strong>Downside:</strong> scope creep (when the project grows out of control) can eat your margin if you don't clearly define what's included and what isn't.</p>

<p><strong>When to use it:</strong> for new clients who want to "test" before committing, or for defined projects like a launch, a seasonal campaign or an audit.</p>

<h3>3. By hours or days</h3>

<p>The most flexible model but the one that scales worst. You charge a price per hour of work. Some senior consultants work this way for one-off strategic projects.</p>

<p><strong>Advantages:</strong> protects your time, transparent for the client, easy to adjust.</p>

<p><strong>Downside:</strong> it penalises efficiency (the better you are, the less you charge), hard to sell to clients who aren't used to it, creates friction on every invoice.</p>

<p><strong>When to use it:</strong> for one-off consulting, training, audits or when there's a lot of uncertainty about the real scope.</p>

<h2>How to structure a marketing agency quote that converts</h2>

<p>Whatever model you choose, the structure of the quote matters a lot. Here's the one that works best for marketing agencies:</p>

<h3>1. Executive summary (the part that gets read most)</h3>

<p>In one or two pages, explain what problem the client has and how you're going to solve it. Before talking about prices. This positions the conversation on the right ground: not "how much does it cost?" but "what result am I going to get?".</p>

<p>Include: the client's current situation (as you understood it in the meeting), the main objective, your general approach and why your agency is the right one for this.</p>

<h3>2. Service breakdown</h3>

<p>This is where most agencies fall short. Instead of writing "social media management: £1,000/month", detail:</p>

<ul>
<li>Which networks (Instagram, LinkedIn, TikTok…)</li>
<li>How many posts per week and of what type (carousel, short video, story, reels…)</li>
<li>Who creates the assets (you, the client, an external designer)</li>
<li>Whether it includes community management (replying to comments, DMs…)</li>
<li>How often and in what format they'll receive reports</li>
</ul>

<p>This level of detail removes ambiguity, justifies the price and drastically reduces later arguments about "but I thought this included...".</p>

<h3>3. What the proposal does NOT include</h3>

<p>This section is pure gold and almost no agency includes it. Write explicitly what's out of scope: paid advertising spend (if you only charge for management), product photography, web design, translations, travel, etc.</p>

<p>For example: <em>"This proposal doesn't include the spend on Meta Ads or Google Ads. The media budget is managed by the client directly or can be quoted separately."</em></p>

<p>This protects both parties and stops the client assuming everything is covered.</p>

<h3>4. Deliverables and timelines</h3>

<p>What exactly will the client receive and when? A deliverables schedule, even an approximate one, gives a lot of reassurance. For launch campaigns it's especially important: week 1 strategy, weeks 2-3 asset production, week 4 activation and first results.</p>

<h3>5. Price and terms</h3>

<p>Present the price clearly. If there are options (for example, three packages), make them easy to compare. Always include:</p>

<ul>
<li>Monthly or total project price (with VAT broken down)</li>
<li>Payment method (50% upfront, 50% on delivery is usual for projects; monthly in advance for retainers)</li>
<li>Minimum contract duration (for retainers, 3 or 6 months is usual)</li>
<li>Cancellation policy (what happens if the client cancels before the term)</li>
<li>Quote validity (15-30 days)</li>
</ul>

<h3>6. Next steps</h3>

<p>Don't end the quote with "I remain at your disposal for any questions". Close with a concrete action step: <em>"To confirm the start, we need the signed contract and the first payment before [date]. If you have questions, we can do a 20-minute call this week."</em></p>

<p>A clear CTA reduces the client's paralysis.</p>

<h2>How to calculate your rates without leaving money on the table</h2>

<p>The most expensive mistake small agencies make is calculating the price based solely on direct working hours. They forget factors that erode the real margin:</p>

<ul>
<li><strong>Client communication time:</strong> meetings, emails, revisions, briefings. On many projects this adds up to 20-30% of the total time.</li>
<li><strong>Internal management time:</strong> team coordination, training, tools.</li>
<li><strong>Revisions and changes:</strong> if not limited in the contract, they can multiply the time invested.</li>
<li><strong>Tool costs:</strong> design licences, scheduling platforms, analytics tools, stock images.</li>
<li><strong>Margin for error:</strong> there are always surprises. A 10-15% buffer is healthy.</li>
</ul>

<p>A basic formula to calculate a retainer price:</p>

<p><strong>Estimated hours × real hourly rate × 1.25 (overhead) = base price</strong></p>

<p>What's your real hourly rate? Take the annual salary you want to earn (or your team's cost), add taxes, tools and margin, and divide it by the billable hours per year (normally 1,200-1,400 hours for a full-time person). That number often surprises agencies that have spent years charging "by eye".</p>

<h2>The haggling problem: how to respond without lowering the price</h2>

<p>The client says "it's too expensive". Typical agency response: lower the price. The correct response: <strong>reduce the scope, not the price</strong>.</p>

<p>When you lower the price without changing the scope, you're implicitly saying you were overcharging before. Instead, if you say "I can adjust the proposal to that budget, but then we'd do X instead of X+Y+Z", the message is different: your prices are fair, and the client decides what level of service they want.</p>

<p>Prepare two or three versions of the proposal in advance: a full one, a mid one and a basic one. That way, when the client asks for a discount, the conversation shifts from "how much will you knock off?" to "which package fits your budget best right now?".</p>

<h2>When and how to follow up on a marketing quote</h2>

<p>Most agencies send the quote by email and wait. A costly mistake.</p>

<p>What works:</p>

<ol>
<li><strong>Send the quote and call or write the next day</strong> to confirm it arrived OK and whether they have any initial questions. Not to pressure, but to open a conversation.</li>
<li><strong>At 3-4 days,</strong> a specific follow-up: "Have you had a chance to review it? If you like, we can do a 15-minute call to clear up questions."</li>
<li><strong>At 7-10 days,</strong> if there's no reply: "The proposal expires on [date]. Do you want us to extend it or is there something we can adjust?"</li>
</ol>

<p>Three contacts are enough for most decisions in marketing services. If after that there's no reply, it's the client's decision, not a lack of persistence on your part.</p>

<p>Managing these follow-ups manually with a spreadsheet is exhausting when you have several proposals open at once. With a tool like <strong>DealForge</strong> you can see at a glance the status of each quote — sent, viewed, awaiting reply — and schedule reminders without relying on memory.</p>

<h2>Typical mistakes in marketing agency quotes</h2>

<h3>Mixing price and justification</h3>
<p>Presenting the price before explaining the value is the most expensive mistake. The client sees the number before understanding what's behind it, and the mental anchor is "expensive". First the problem, then the solution, then the price.</p>

<h3>Using industry jargon without explaining it</h3>
<p>"We'll do an inbound strategy with lead nurturing in the TOFU and MOFU." The client may nod politely and have no idea what it means. Speak the client's language: more sales, more visibility, more repeat customers.</p>

<h3>Not including success stories or references in the proposal</h3>
<p>In marketing, your previous work is your best sales argument. A concrete success story ("we helped a B2B software company triple its organic leads in 9 months with this methodology") does more than three pages of service descriptions.</p>

<h3>Proposals that are too long</h3>
<p>More isn't more. A 40-page proposal for a £2,000/month retainer scares more than it convinces. The client doesn't have time to read it. Keep the core to 5-8 well-structured pages, with the technical details in optional appendices.</p>

<h3>Not keeping previous versions</h3>
<p>When a client comes back six months later and says "what did that proposal you sent me say?", you can't have the quotes lost among emails. Keep an organised record of all your proposals, with the versions and statuses. This also gives you data to analyse which types of proposals have the best close rate.</p>

<h2>VAT and tax aspects in marketing quotes</h2>

<p>Most marketing services carry the standard VAT rate; there are no specific reduced rates for the sector in most countries (unless the activity is exempt, such as accredited training or certain cultural services, which isn't usually the case for commercial agencies).</p>

<p>If you work with clients in other countries, the rules for cross-border B2B services vary (in the EU, for example, the reverse-charge mechanism often applies: you invoice without VAT and the client accounts for it in their country). Check the rules that apply to your situation.</p>

<p>For consumer clients (B2C), remember the price you show in the quote should include VAT broken down. For businesses (B2B), the standard is to show the net price + VAT separately.</p>

<h2>How to scale the quoting process in your agency</h2>

<p>When you start, every proposal is hand-crafted. When you have 10 or 20 potential clients a month, you need a process.</p>

<p>What agencies that scale well do:</p>

<ul>
<li><strong>They have base templates by service type</strong> (social retainer, launch project, SEO audit…) that they customise, not create from scratch every time.</li>
<li><strong>They keep their service catalogue with up-to-date prices</strong>, so calculating a proposal is combining modules, not doing mental arithmetic.</li>
<li><strong>They have an internal approval process</strong> for discounts: if someone on the team wants to offer a special price, they need approval. This stops the "softer" salespeople from eroding the whole agency's margin.</li>
<li><strong>They measure the close rate by proposal type</strong> to know which services sell best and where they're wasting time on proposals that never close.</li>
</ul>

<p>A platform like <strong>DealForge</strong> is designed for exactly this: keeping a service catalogue with prices, building proposals quickly by combining modules, applying automatic discount rules and tracking the pipeline. For an agency handling more than 15-20 proposals a month, the time recovered is significant.</p>

<h2>Example quote for a marketing agency</h2>

<p>To make this concrete, here's a simplified example of how to present a social media + newsletter retainer:</p>

<hr/>

<p><strong>DIGITAL SERVICES PROPOSAL — [AGENCY NAME]</strong><br/>
Client: XYZ Ltd | Date: April 2026 | Ref: QUO-2026-0047 | Valid until: 15/05/2026</p>

<p><strong>Current situation:</strong> XYZ has a presence on Instagram and LinkedIn but posts irregularly, with no content strategy or metrics tracking. The stated objective is to increase brand visibility to support the sales team.</p>

<p><strong>Our proposal: Monthly digital management retainer</strong></p>

<table>
<thead><tr><th>Service</th><th>Detail</th><th>Price/month</th></tr></thead>
<tbody>
<tr><td>Instagram + LinkedIn management</td><td>4 posts/week (mix of carousel, static, short reels). Monthly editorial calendar. Community management Mon-Fri (reply within 24h).</td><td>£1,050</td></tr>
<tr><td>Monthly newsletter</td><td>1 monthly email to the client's database. Copy, design and sending via Mailchimp. Open and click report.</td><td>£350</td></tr>
<tr><td>Monthly reporting</td><td>Dashboard with key KPIs: reach, engagement, follower growth, email opens.</td><td>Included</td></tr>
</tbody>
<tfoot>
<tr><td colspan="2"><strong>Monthly subtotal</strong></td><td><strong>£1,400</strong></td></tr>
<tr><td colspan="2">VAT (20%)</td><td>£280</td></tr>
<tr><td colspan="2"><strong>Monthly total</strong></td><td><strong>£1,680</strong></td></tr>
</tfoot>
</table>

<p><strong>Does not include:</strong> paid advertising spend (Meta Ads, LinkedIn Ads), product photography/video, landing page design, translations.</p>

<p><strong>Terms:</strong> minimum duration 3 months, monthly payment in advance, cancellation with 30 days' notice.</p>

<p><strong>Next steps:</strong> To confirm the start in May, we need the signed contract and the first payment before 5 May. Shall we do a call this week to clear up any questions?</p>

<hr/>

<p>See the difference with a simple "social management: £1,050/month"? The level of detail justifies the price, reduces doubts and protects both parties.</p>

<h2>Conclusion: your quote is your first deliverable</h2>

<p>In the marketing sector, where everyone promises incredible results, <strong>a clear, detailed and professional quote already sets you apart before you've done any work</strong>. It's the first sample of how you work.</p>

<p>If your proposal arrives quickly, is well structured, speaks the client's language and has a justified price, you've already won half the battle. The other half is executing what you promised.</p>

<p>Apply the structure in this guide, define your business model well (retainer, project or hours) and set up a process so you don't create every quote from scratch. Your time is the agency's scarcest resource — don't spend it on ad hoc proposals when there's a more efficient way to do it.</p>

<p><strong>Want to create marketing quotes in minutes, with your service catalogue and a professional PDF included?</strong> Try <a href="/registro?lang=en">DealForge</a> free and start closing more contracts with less time spent on sales admin.</p>`,
  },
  {
    slug: "graphic-design-quotes-charge-what-youre-worth",
    titulo: "Graphic design quotes: how to charge what you're worth (and get a yes)",
    extracto: "Most graphic designers charge less than they should. This practical guide shows you how to structure design quotes that justify your price, reduce haggling and protect your margin.",
    contenido: `<p>There's a scene that plays out constantly in the graphic design world. The client asks for a quote. You spend two days working out hours, materials and margin. You send a figure that feels fair. The client replies: <em>&ldquo;That's a lot, can't you do it for half?&rdquo;</em>. And you, afraid of losing the project, accept.</p>

<p>If this sounds familiar, the problem isn't your price. It's how you're presenting and justifying it. A <strong>well-structured graphic design quote</strong> doesn't just state a cost — it sells the value of what you offer before the client sees any work.</p>

<p>In this guide we'll look at exactly how to do that.</p>

<h2>Why do designers charge less than they should?</h2>

<p>It's not a lack of talent or experience. It's pricing psychology mixed with fear of rejection. The most common reasons:</p>

<ul>
<li><strong>They miscalculate their real costs.</strong> Many designers only count visible working hours (designing the piece), ignoring time spent on briefing, revisions, meetings, file exports and client management. If you spend 8 hours on a project but 12 in total, you're giving away 33% of your time.</li>
<li><strong>They're afraid of losing the client.</strong> A scarcity mindset leads you to accept any price for fear the client will go to someone cheaper. The result: you end up working for clients who don't value your work and who will always want more for less.</li>
<li><strong>They don't know how to present the price.</strong> Sending a number with no context is the easiest way to invite haggling. A price with no justification is just a number the client will try to reduce.</li>
</ul>

<p>The solution to all three problems is the same: a <strong>well-structured professional quote</strong>.</p>

<h2>The 4 pricing models in graphic design</h2>

<p>Before talking about how to structure the quote, you need to be clear on which pricing model you're working with. Not all of them work the same in every situation.</p>

<h3>1. Hourly rate</h3>

<p>The most traditional and the one that causes the most problems. You charge an hourly rate (for example, £60/hour) and bill according to time spent. The problem: the faster and more efficient you are, the less you earn. You punish your own productivity.</p>

<p><strong>When it makes sense:</strong> on projects with very uncertain scope, brand consultancy, audits or maintenance work where it's impossible to estimate time in advance.</p>

<h3>2. Fixed price per project</h3>

<p>You define a fixed price for a specific deliverable. For example: &ldquo;Logo design with 3 concepts and 2 rounds of revisions: £800&rdquo;. The client knows exactly what they're paying. You know exactly what you're delivering.</p>

<p><strong>When it makes sense:</strong> on most design projects with a defined scope (logos, branding, marketing materials, packaging, etc.). It's the model I most recommend for designers starting to professionalise their process.</p>

<h3>3. Monthly retainer</h3>

<p>The client pays a fixed amount per month in exchange for a guaranteed number of hours or deliverables. For example: &ldquo;10 social media design pieces per month: £600/month&rdquo;.</p>

<p><strong>When it makes sense:</strong> with recurring clients who have ongoing design needs. It's the most predictable model and ideal for the financial stability of your studio or freelance business.</p>

<h3>4. Value-based pricing</h3>

<p>The most advanced and the one that generates the most money. Instead of calculating how long you take, you calculate how much the result is worth to the client. If you redesign the packaging of a product that sells £500,000 a year and the new design improves sales by 10%, your work is worth far more than 50 hours at £60/hour.</p>

<p><strong>When it makes sense:</strong> when you have demonstrable experience, can measure the impact of your work and work with companies that understand the ROI of design. Don't try to apply it from day one — it requires credibility and case studies.</p>

<h2>How to calculate your base rate (without selling yourself short)</h2>

<p>If you use hourly or project pricing, you need a base rate that covers all your costs and leaves you a real margin. Here's the honest calculation many people avoid doing:</p>

<ol>
<li><strong>Fixed monthly costs:</strong> rent (or a proportional share if you work from home), software (Adobe CC, Figma, etc.), amortised hardware, insurance, accountant, marketing and training. Add it all up.</li>
<li><strong>Real billable hours:</strong> of the 8 hours you work a day, how many are actually billable? Subtract meetings, admin tasks, training, your own marketing and unproductive time. The reality for most freelancers is between 4 and 6 billable hours a day.</li>
<li><strong>Desired profit:</strong> how much do you want to earn per month net, after paying all your costs and taxes? Be realistic and ambitious at the same time.</li>
</ol>

<p>With those three numbers you can calculate your minimum hourly rate. If your fixed costs are £1,500/month, you want to earn £3,000/month and you have 100 billable hours a month, your minimum rate is £45/hour. And that's the <em>minimum</em>, not the price you should charge.</p>

<h2>What a professional graphic design quote must include</h2>

<p>A well-made design quote has several layers. Each one serves a specific purpose:</p>

<h3>Identification details</h3>
<p>Your name or business name, company/VAT number, contact details, your studio logo. And the client's full details. It sounds basic, but there are designers who send quotes as if they were informal emails. A quote is a legal document — treat it like one.</p>

<h3>Reference number and date</h3>
<p>A consecutive numbering system (DG-2026-047) and the issue date. This makes tracking easier and positions you as someone organised. The expiry date is just as important — a quote with no expiry is an invitation for the client to call you six months later expecting the same price.</p>

<h3>Project description (the summarised brief)</h3>
<p>Before the prices, include a paragraph summarising your understanding of the project. &ldquo;Complete visual identity design for an organic food startup, including logo, colour palette, typography, brand guidelines and applications on business cards and corporate stationery.&rdquo;</p>

<p>This section has two functions: it confirms you've understood what the client needs and it establishes the scope. Anything not here isn't included in the price.</p>

<h3>Breakdown of deliverables with line-by-line pricing</h3>
<p>This is the heart of the quote. Don't put a single overall price. Break down each deliverable with its description and individual price:</p>

<ul>
<li>Logo design (3 concepts + 2 rounds of revisions)</li>
<li>Colour system and corporate typography</li>
<li>Visual identity guidelines (PDF, 20 pages)</li>
<li>Business card application (design, not printing)</li>
<li>Email signature templates</li>
</ul>

<p>The breakdown serves several key functions. First, it justifies the total price — when the client sees 8 lines of deliverables, the final number seems reasonable. Second, it protects your scope: if the client wants to add something not on the list, you have a contractual basis to charge separately. Third, if the client has a limited budget, they can prioritise which deliverables they need first.</p>

<h3>Included revisions and additional changes policy</h3>
<p>This is the point most designers ignore and the one that costs them the most money. Clearly define how many rounds of revisions each deliverable includes and what happens when the client exceeds that limit.</p>

<p>A typical wording: <em>&ldquo;The price includes 2 rounds of revisions per deliverable. Additional revisions will be billed at £45/hour. A revision is a consolidated list of changes per round, not successive individual changes.&rdquo;</em></p>

<p>This paragraph, clear and unambiguous, eliminates the most expensive misunderstandings in graphic design.</p>

<h3>Delivery timelines</h3>
<p>State when you'll deliver each milestone. Don't use absolute dates if you haven't agreed the start date. Use relative timelines: &ldquo;First logo concept: 7 working days after brief approval and the 50% upfront payment.&rdquo;</p>

<h3>Payment terms</h3>
<p>Clearly define: deposit percentage, when the rest is paid, accepted payment method. The most common in design is 50% upfront and 50% on delivery of the final files. For large or long-running projects, consider intermediate payment milestones.</p>

<p><strong>Also include:</strong> that the final files (fonts, editable vectors, PSD, etc.) are delivered once full payment is received. This is your guarantee of getting paid.</p>

<h3>Intellectual property</h3>
<p>Specify what you hand over and what you don't. The norm is to transfer commercial usage rights to the final result, but not the editable source files (which can be offered as an add-on service). Consult your accountant or a lawyer specialising in intellectual property to word this correctly.</p>

<h3>Quote validity date</h3>
<p>30 days is the standard. After that, the price may be revised. This creates urgency without pressure and protects you from price commitments that stretch on indefinitely.</p>

<h2>Revisions: the black hole of design margin</h2>

<p>It's worth pausing here because it's the most expensive mistake designers make. The dynamic is always the same: the client approves the concept, then starts &ldquo;polishing details&rdquo; that turn into complete changes, that turn into new iterations, that turn into weeks of unbilled work.</p>

<p>The solution isn't to be rigid. It's to be clear from the start:</p>

<ul>
<li>Define in writing what a revision is (a consolidated list of changes, not individual changes sent one by one over WhatsApp).</li>
<li>Limit the number of rounds included in the price.</li>
<li>Set a price per additional revision before you start, not when the problem comes up.</li>
<li>When the client is on their third extra round, don't do it silently — flag it and send an addendum to the original quote.</li>
</ul>

<p>Designers who implement a clear revisions policy see their margins improve without raising their rates. They simply stop giving work away.</p>

<h2>How to present the price (the order matters)</h2>

<p>There's a sales psychology rule that designers tend to ignore: <strong>never start with the price</strong>. The human brain needs to perceive value before processing a number.</p>

<p>The correct presentation structure is:</p>

<ol>
<li><strong>Understanding the problem:</strong> show that you understand what the client needs and why.</li>
<li><strong>Your proposal and approach:</strong> how you're going to solve it, what makes your process special.</li>
<li><strong>The concrete deliverables:</strong> what they're going to receive exactly.</li>
<li><strong>The timelines:</strong> when they'll have it.</li>
<li><strong>The price:</strong> now, when the client already understands the value, the number has context.</li>
</ol>

<p>If you send the quote by email, consider including an opening paragraph that briefly recalls the project context. Don't let your client open the PDF straight to the pricing page.</p>

<h2>How to handle haggling without losing the sale</h2>

<p>Haggling is inevitable in some sectors and business cultures. The key isn't to give in on price — it's to redesign the proposal.</p>

<p>When a client says &ldquo;that's a lot&rdquo;, you have three options:</p>

<ol>
<li><strong>Hold the price and justify the value.</strong> Ask which part of the quote seems expensive. Sometimes the client hasn't understood what's included. Explain, don't justify.</li>
<li><strong>Reduce the scope, not the price.</strong> &ldquo;We can start with just the logo and colour system. The additional materials we do in a second phase.&rdquo; You lower the total figure without touching your implied rate.</li>
<li><strong>Offer a payment plan.</strong> Sometimes the problem isn't the total price but cash flow at that moment. Payment in three instalments can be the difference between closing and not closing.</li>
</ol>

<p>What you should never do: lower the price without removing anything from the scope. That teaches the client your initial price wasn't serious, and invites them to start haggling even earlier on the next project.</p>

<h2>Real example: complete branding quote</h2>

<p>To make all of the above concrete, here's an example quote for a visual identity project for a services company:</p>

<table>
<thead>
<tr><th>Deliverable</th><th>Description</th><th>Price</th></tr>
</thead>
<tbody>
<tr><td>Brand strategy</td><td>Briefing session + competitor analysis + positioning definition (5-page document)</td><td>£350</td></tr>
<tr><td>Logo design</td><td>3 concepts + 2 rounds of revisions + delivery in all formats (AI, EPS, SVG, PNG, JPG)</td><td>£750</td></tr>
<tr><td>Identity system</td><td>Primary and secondary colour palette, corporate typography, usage rules, positive/negative versions</td><td>£400</td></tr>
<tr><td>Brand guidelines</td><td>20-25 page PDF with all visual identity usage guidelines</td><td>£500</td></tr>
<tr><td>Corporate stationery</td><td>Business card design (both sides), A4 letterhead, email signature</td><td>£300</td></tr>
</tbody>
<tfoot>
<tr><td colspan="2"><strong>Subtotal</strong></td><td><strong>£2,300</strong></td></tr>
<tr><td colspan="2">VAT (20%)</td><td>£460</td></tr>
<tr><td colspan="2"><strong>Total</strong></td><td><strong>£2,760</strong></td></tr>
</tfoot>
</table>

<p><strong>Terms:</strong> 50% (£1,150 + VAT) upfront, remaining 50% on delivery of the final files. Editable source files (AI, Figma) available as an add-on service (£300). Timeline: 21 working days from brief approval and the upfront payment. Quote validity: 30 days.</p>

<p>See the difference with a simple &ldquo;Logo design: £800&rdquo;? The breakdown turns the price into an investment decision, not an expense.</p>

<h2>Tools to create design quotes faster</h2>

<p>The designer's biggest enemy isn't the difficult client — it's the time wasted creating quotes. Many designers spend between 1 and 3 hours on each proposal: finding the template, updating the prices, calculating totals, generating the PDF, emailing it, following up&hellip;</p>

<p>There's a better way. <strong>Quoting software</strong> like DealForge lets you have a service catalogue with predefined prices you insert with one click, apply discounts while seeing the margin in real time, generate branded PDFs automatically, and know when the client has opened your proposal so you can follow up at exactly the right moment.</p>

<p>If you create 5 quotes a month and reduce the time on each from 90 minutes to 15 minutes, you recover 6 hours a month. At £60/hour, that's £360 of productive capacity you can devote to billable work or, quite simply, to not working Saturdays.</p>

<h2>The quote as a positioning tool</h2>

<p>Here's the insight that changes the perspective: your quote isn't just an administrative formality. It's the first sample of how you work.</p>

<p>A generic quote, in unformatted Word, with a single overall price and no breakdown, communicates that you're just another supplier. A structured quote, with your visual identity, a detailed project description, a clear revisions policy and transparent terms, communicates that you're a serious professional who knows what they're doing.</p>

<p>Many designers win projects — and sometimes better clients than the competition's — simply because their proposal looks and reads more professionally. The work comes afterwards.</p>

<h2>Checklist before sending your design quote</h2>

<ul>
<li>Have you included all your details and the client's?</li>
<li>Does the project summary reflect exactly what the client asked for?</li>
<li>Is each deliverable described in enough detail to avoid misunderstandings?</li>
<li>Have you specified how many revisions each line includes?</li>
<li>Are the calculations (subtotal, VAT, total) correct?</li>
<li>Have you stated the delivery timelines and payment terms?</li>
<li>Have you set an expiry date on the quote?</li>
<li>Does the PDF have your branding (logo, colours, typography)?</li>
</ul>

<p>If you can tick all these boxes, you have a quote that works for you even before you start designing.</p>

<h2>Conclusion: charge what you're worth, in writing</h2>

<p>Most pricing problems in graphic design aren't pricing problems. They're communication and presentation problems. A good quote justifies your rate, defines the scope, protects your margin and positions your work as an investment, not an expense.</p>

<p>Choose the pricing model that fits each project. Break down the deliverables in detail. Define your revisions policy from day one. And stop accepting the first &ldquo;that's a lot&rdquo; as a verdict — learn to respond with value, not discounts.</p>

<p>Your work has value. Your quote should reflect it.</p>

<p><strong>Want to create professional design quotes in minutes, with your branding and a PDF ready to send?</strong> Try <a href="/registro?lang=en">DealForge</a> free and stop wasting time on admin so you can spend it on what you actually do best.</p>`,
    autor: "DealForge",
    categoria: "guias",
    tags: ["graphic design", "design quotes", "freelance", "how to charge", "branding", "design rates", "small business"],
    publishedAt: "2026-06-15T10:00:00.000Z",
    metaTitulo: "Graphic design quotes: how to charge what you're worth — DealForge",
    metaDescripcion: "Practical guide for graphic designers: pricing models, what to include in every quote, how to manage revisions and avoid haggling. With a real branding example.",
    metaKeywords: "graphic design quote, how to charge for design, graphic designer rate, design quote, logo price, branding quote, freelance graphic design, design quote template",
  },
  {
    slug: "professional-cleaning-service-quotes-guide",
    titulo: "Professional cleaning service quotes: a guide to winning more contracts",
    extracto: "Learn to create professional cleaning quotes that justify your price, avoid misunderstandings and close more contracts. With real examples by service type and a pricing template.",
    contenido: `<p>If you've been in the professional cleaning sector for a while, you know the problem usually isn't the quality of the work. The problem is <strong>winning the contract before you start</strong>. And that begins with a quote that inspires confidence, is clear and arrives before your competition's.</p>

<p>In this article we'll look at how to make cleaning quotes that win contracts, not just state prices. From the most common service types to how to calculate your rates without selling yourself short, with real examples and no fluff.</p>

<h2>Why cleaning quotes fail (and you lose clients)</h2>

<p>Before looking at what to do, it helps to understand what's done wrong. There are three mistakes that come up again and again in the sector:</p>

<h3>Quotes that are too vague</h3>
<p>&ldquo;Office cleaning: £800/month.&rdquo; How many times a month? What exactly does it include? The bathrooms? The windows? With what products? An ambiguous quote is an invitation to dispute. The client assumes the maximum possible, you charge the minimum possible and conflict is inevitable.</p>

<h3>Prices with no justification</h3>
<p>When a client receives three cleaning quotes and yours is the most expensive, they won't stay just because. If you don't explain why your service is worth what it costs (quality materials, trained staff, public liability insurance, eco-friendly products), the price wins and you lose the contract.</p>

<h3>Slow response</h3>
<p>A client asking for three cleaning quotes won't wait a week. The first to respond with a decent proposal usually keeps the contract. Speed is a competitive advantage as important as price.</p>

<h2>Types of cleaning service and how to quote each one</h2>

<p>Not all cleaning is the same, and your quote should reflect that. These are the most common types with their particularities:</p>

<h3>Office and commercial premises cleaning</h3>

<p>It's the bread and butter for most companies in the sector. Contracts are usually recurring (daily, weekly or fortnightly) and the client looks for reliability above all.</p>

<p>What needs to be specified in the quote?</p>
<ul>
<li>Total area to be cleaned (m²)</li>
<li>Exact frequency (e.g. Monday, Wednesday and Friday, 6pm to 8pm)</li>
<li>Included tasks: floors, bins, bathrooms, kitchen, internal windows, furniture...</li>
<li>Excluded tasks (to avoid the &ldquo;I thought it included...&rdquo;)</li>
<li>Number of people assigned</li>
<li>Products included in the price or billed separately</li>
</ul>

<p><strong>Example quote line:</strong> &ldquo;General office cleaning service (450 m²) — 3 days/week (Mon/Wed/Fri), 2 hours/day, 1 operative. Includes: floors, bathrooms, kitchen, emptying bins and surface dusting of furniture. Does not include: external windows, server room cleaning.&rdquo;</p>

<h3>Communal building cleaning</h3>

<p>Residential blocks are a very common but also very demanding client. The price is decided by a residents' committee, so your proposal will be compared in detail.</p>

<p>Key points for this type of quote:</p>
<ul>
<li>Areas included: staircase, lift, entrance hall, car park, external common areas</li>
<li>Frequency of each area (the staircase may be daily; the car park, weekly)</li>
<li>Incident management: what happens if a resident makes a mess outside hours?</li>
<li>Replenishment of consumables (toilet paper, soap) included or not</li>
<li>Minimum contract duration and renewal terms</li>
</ul>

<p>For communal buildings, it's advisable to present a breakdown by area with its individual price. The committee can negotiate removing an area instead of haggling over the overall price, and you keep your margin.</p>

<h3>End-of-build cleaning (post-construction)</h3>

<p>This service is one-off, more intensive and involves far more work than maintenance cleaning. It's common in renovations, new builds and premises about to open to the public.</p>

<p>Factors that determine the price:</p>
<ul>
<li>Type of work (partial renovation vs. complete new build)</li>
<li>Predominant materials (plaster, paint, tile grout...)</li>
<li>Floor area and ceiling height</li>
<li>Access and parking for your team and vehicle</li>
<li>Waste management (is it included or does the builder handle it?)</li>
</ul>

<p>End-of-build cleaning shouldn't be quoted at a fixed price per m² without a site visit. The state of the build varies enormously. A blind quote of this kind usually ends in losses or work done &ldquo;half-way&rdquo;.</p>

<h3>Window cleaning</h3>

<p>A specialist service with its own pricing structure. The key factors are height, access (ladder, scaffold, cradle) and frequency.</p>

<ul>
<li>Specify whether the price is per side (interior/exterior) or per complete window</li>
<li>State the access method and whether it requires special equipment</li>
<li>Clarify whether it includes frames and sills or just the glass</li>
</ul>

<h3>Specialist cleaning and disinfection</h3>

<p>Disinfections, biohazard cleaning, pest removal, anti-damp treatments... are services that require specific staff and equipment, and whose quote must reflect the risk and specialisation.</p>

<p>For these services, always include:</p>
<ul>
<li>The protocol you're going to apply</li>
<li>The approved products you use</li>
<li>Your company's or staff's certifications</li>
<li>The treatment certificate you provide on completion</li>
</ul>

<h2>How to calculate the price of your cleaning service</h2>

<p>This is where many cleaning companies fall short. They miscalculate their costs, set a &ldquo;market&rdquo; price and then wonder why they're not making money. Let's do the maths properly.</p>

<h3>Step 1: Calculate your cost per hour of work</h3>

<p>The cost of a cleaning operative includes:</p>
<ul>
<li>Gross wage (varies by region and contract type)</li>
<li>Employer's National Insurance and pension contributions on top of the gross wage</li>
<li>Uniforms, PPE and training</li>
<li>Absence and cover (set aside 5-8%)</li>
</ul>

<p>Example: if you pay £12/hour gross and add employer contributions, your real cost might be around £14/hour. With a 6% absence allowance, it rises to ~£14.80/hour. On top of that you have to add materials.</p>

<h3>Step 2: Calculate the cost of materials and products</h3>

<p>Cleaning products represent between 5% and 10% of the total cost in maintenance services, but can rise to 15-20% in intensive or specialist cleaning.</p>

<p>Make an estimate by service type:</p>
<ul>
<li>Standard office cleaning: £0.30-0.60/m² per month</li>
<li>End-of-build cleaning: £1.50-3/m² (depending on condition)</li>
<li>Window cleaning: minimum call-out + cost per m²</li>
</ul>

<h3>Step 3: Add overheads</h3>

<p>Many sole traders and small cleaning businesses forget to include their own costs in the price:</p>
<ul>
<li>Public liability insurance (essential)</li>
<li>Fuel and vehicle depreciation</li>
<li>Machinery (scrubber dryers, industrial vacuums, etc.)</li>
<li>Phone, accountant, management software</li>
<li>Your own management time (visits, quotes, coordination)</li>
</ul>

<p>A practical rule: overheads usually represent between 15% and 25% of your turnover. If you turn over £10,000 a month, between £1,500 and £2,500 goes on overheads before you see a penny of profit.</p>

<h3>Step 4: Apply your margin</h3>

<p>Once you have the real total cost, apply your target margin. For cleaning services, a net margin of 10-20% is reasonable. Some specialist services can reach 30-40%.</p>

<p><strong>Simple formula:</strong><br>
Sale price = (Total cost × 100) / (100 &minus; desired margin %)</p>

<p>If your cost is £800 and you want a 20% net margin: 800 × 100 / 80 = <strong>£1,000</strong>.</p>

<p>Don't confuse margin with markup. A 25% markup on cost isn't the same as a 25% margin on the sale price.</p>

<h2>What a professional cleaning quote must include</h2>

<p>Now that you know how to calculate the price, let's see how to present it. A professional cleaning quote should have, as a minimum:</p>

<h3>1. Your details and the client's</h3>
<p>Your company name, registration/VAT number, contact, logo. Client details: company, registration number, service address and contact person. It sounds basic, but many cleaning quotes are anonymous or incomplete.</p>

<h3>2. Detailed service description</h3>
<p>Not &ldquo;office cleaning&rdquo;. Instead: &ldquo;Maintenance cleaning service in [Company]'s offices at [address], floors 2 and 3, approximate area 320 m². Frequency: Tuesday and Thursday, 7pm to 9pm. Staff assigned: 2 operatives.&rdquo;</p>

<h3>3. Task breakdown</h3>
<p>A list of what's done on each visit and how often. Distinguish between daily, weekly and monthly tasks. This protects both parties and avoids the classic &ldquo;I thought it included cleaning the storeroom&rdquo;.</p>

<h3>4. What it does NOT include</h3>
<p>This section is as important as the previous one. Expressly specify what isn't included: external windows, restricted areas, emergency cleaning, special treatments. That way you eliminate expectations you can't meet.</p>

<h3>5. Materials and products</h3>
<p>Do you provide them or the client? If you provide them, are they included in the price or billed separately? Do you use eco-friendly or conventional products? More and more clients value cleaning with sustainable products and are willing to pay more for it.</p>

<h3>6. Price and payment terms</h3>
<p>Monthly price (or per service), payment method (transfer, direct debit), billing date. In recurring contracts, state whether the price includes or excludes VAT and what happens if the client cancels a visit.</p>

<h3>7. Contract duration and termination terms</h3>
<p>Is the contract monthly, quarterly or annual? How much notice is needed to cancel? Is there a penalty for early termination? This is especially important when you've had to buy equipment or assign staff specifically for that client.</p>

<h3>8. Insurance and liability</h3>
<p>Expressly mention that you have public liability insurance and what its minimum cover is. For corporate clients or those with high-value premises, this can be a decisive factor. It's your differentiator against smaller companies working without insurance.</p>

<h3>9. Quote validity</h3>
<p>State how long the proposal is valid for (usually 30 days). Staff and material costs change, and you can't commit to a price indefinitely.</p>

<h2>Pricing strategy: when to compete on price and when not to</h2>

<p>The cleaning sector has fierce competition. There's always someone willing to do the job cheaper. The question is: do you want to compete on price or on value?</p>

<h3>When lowering the price makes sense</h3>
<ul>
<li>To win a new high-volume client that can scale</li>
<li>To fill the routes of staff already assigned (low marginal cost)</li>
<li>For long-term contracts that give you stability</li>
</ul>

<h3>When to defend your price</h3>
<ul>
<li>When you offer something differential: higher insurance, certified eco-friendly products, permanent staff with specific training</li>
<li>When the client has already had problems with cheap suppliers</li>
<li>When the cost of acquiring that client is very high (many visits, a lot of time)</li>
</ul>

<p>A useful trick: before lowering the price, offer to <strong>reduce the scope</strong>. &ldquo;If the budget is tight, we can start with 2 weekly visits instead of 3 and adjust the frequency of bathroom cleaning.&rdquo; That way you don't devalue your hourly rate and the client understands that quality has a cost.</p>

<h2>The &ldquo;fixed&rdquo; quote mistake on variable services</h2>

<p>One of the typical problems in cleaning is that the client asks for cleaning &ldquo;of whatever's needed&rdquo; but expects to pay a fixed price. This is a trap.</p>

<p>For services where volume can vary (post-event cleaning, emergency cleaning, special treatments), there are two solutions:</p>

<ul>
<li><strong>Base rate + extras:</strong> fixed price for the standard service, with clear rates for additional services</li>
<li><strong>Price per hour or m²:</strong> more transparent for one-off or variable-volume services</li>
</ul>

<p>Including a rate sheet attached to your quote is very useful. That way the client knows in advance how much an extra clean or a special treatment will cost, and there are no surprises on the invoice.</p>

<h2>How to follow up on your cleaning quotes</h2>

<p>Many cleaning companies send the quote and wait. Mistake. Follow-up is where contracts are won or lost.</p>

<p>An effective follow-up sequence:</p>

<ol>
<li><strong>The day after sending:</strong> email or call to confirm they've received the proposal and resolve immediate questions</li>
<li><strong>After 5 days:</strong> a gentle follow-up. &ldquo;Hi [name], I wanted to know whether you've had a chance to review the proposal. If you need any adjustment or clarification, we're available.&rdquo;</li>
<li><strong>After 12-15 days:</strong> last contact before the proposal expires. Mention the expiry date naturally.</li>
</ol>

<p>No more than three contacts without a reply. If at that point there are no signs of life, the client isn't interested or has already chosen someone else. Close the loop and move on.</p>

<h2>Quoting software for cleaning companies: what to look for</h2>

<p>Up to a certain volume, a Word or Excel template works. But when you handle more than 10-15 quotes a month, manual management becomes a bottleneck.</p>

<p>Quoting software designed for the services sector like <a href="/registro?lang=en">DealForge</a> lets you:</p>

<ul>
<li>Keep a service catalogue with up-to-date rates (price/hour, price/m², price by surface type)</li>
<li>Create quotes in minutes by reusing standard services and terms</li>
<li>Generate professional PDFs with your branding, logo and consistent design</li>
<li>Send quotes directly by email and track their status (sent, viewed, accepted)</li>
<li>Apply automatic discount rules (by volume, by contract duration)</li>
<li>Request the client's electronic signature to formalise the contract</li>
</ul>

<p>The time you recover on admin you can spend on more sales visits, which is where the business is really won.</p>

<h2>Real example of an office cleaning quote</h2>

<p>To ground all of the above, here's an example of how a detailed line should look in an office cleaning quote:</p>

<p><strong>Service:</strong> Maintenance cleaning — Floor 3 offices (380 m²)<br>
<strong>Frequency:</strong> Monday, Wednesday and Friday / 2 hours per visit<br>
<strong>Staff:</strong> 1 permanent operative assigned<br>
<strong>Included tasks:</strong></p>
<ul>
<li>Sweeping and mopping floors across the whole floor</li>
<li>Cleaning 4 toilets (includes sanitaryware, basins, floors, replenishing consumables)</li>
<li>Emptying and cleaning bins</li>
<li>Surface cleaning of furniture and screens</li>
<li>Kitchen cleaning (worktop, microwave exterior, sink)</li>
<li>Internal windows (monthly)</li>
</ul>
<p><strong>Does not include:</strong> External windows, server room cleaning, archive area, out-of-hours emergency cleaning.<br>
<strong>Materials:</strong> Included in the price. Certified professional cleaning products. Does not include toilet consumables (paper, soap) unless expressly agreed.<br>
<strong>Monthly price:</strong> £780 + VAT<br>
<strong>Payment terms:</strong> Direct debit, invoiced on the 1st of each month<br>
<strong>Duration:</strong> Annual contract, automatic renewal. Termination with 30 days' notice.</p>

<p>That's what you call an unambiguous quote. When the client reads it, they know exactly what they receive and what they don't. No surprises.</p>

<h2>Checklist before sending your cleaning quote</h2>

<ul>
<li>Have you specified the exact service address and the areas included?</li>
<li>Are the frequency and schedule clearly detailed?</li>
<li>Have you listed the included and excluded tasks?</li>
<li>Does it state who provides the materials and what type of products are used?</li>
<li>Does the price include or exclude VAT?</li>
<li>Have you stated the contract duration and termination terms?</li>
<li>Do you mention your public liability insurance?</li>
<li>Does the quote have an expiry date?</li>
<li>Does the PDF have your logo and complete contact details?</li>
</ul>

<h2>Conclusion: quote in detail, win with confidence</h2>

<p>In the cleaning sector, the difference between winning and losing a contract is rarely the price. It's the confidence your proposal generates. A detailed, clear quote sent quickly says more about the quality of your work than any marketing words.</p>

<p>Spend time building a good quote template, define your cost structure well and establish a follow-up process. Those three changes can double your close rate without dropping your rates by a penny.</p>

<p>Because the client who only buys on price will never be your best client. The client who chooses your proposal because it conveys professionalism and clarity — that's the one who stays loyal.</p>

<p><strong>Want to create professional cleaning quotes in minutes, with your branding and sent directly by email?</strong> Try <a href="/registro?lang=en">DealForge</a> free and stop wasting time on quotes so you can spend it on winning more clients.</p>`,
    autor: "DealForge",
    categoria: "guias",
    tags: ["professional cleaning", "cleaning quotes", "cleaning quote", "cleaning company", "cleaning services", "small business", "sales"],
    publishedAt: "2026-06-15T10:30:00.000Z",
    metaTitulo: "Professional cleaning service quotes: complete guide — DealForge",
    metaDescripcion: "How to create professional cleaning quotes that win contracts: what to include, how to calculate the price, mistakes to avoid and a real example by service type.",
    metaKeywords: "professional cleaning quote, cleaning company quote, how to quote cleaning services, office cleaning price, cleaning quote template, communal cleaning rate, cleaning quoting software",
  },
  {
    slug: "web-app-development-quotes-definitive-guide",
    titulo: "Web and app development quotes: the definitive guide for agencies and freelancers",
    extracto: "How to create web and app development quotes that are clear, fair and close more projects. With pricing models, what to include, how to calculate scope and the mistakes costing you clients.",
    contenido: `<p>You build websites and apps that work. Your clients are happy with the result. But before starting the project, you go through the same ordeal as always: how much do I charge for this?</p>

<p>The web development quote is one of the hardest documents to put together in the world of digital services. The scope is fuzzy, the client doesn't know exactly what they want, timelines stretch out and there's always &ldquo;one more thing&rdquo; at the end. If you don't have a clear system, every project becomes a box of surprises — usually unpleasant ones.</p>

<p>This guide is for web development agencies, freelancers and digital studios who want to quote better: faster, with more clarity and with a higher chance of closing the project at a good price.</p>

<h2>The fundamental problem with web development quotes</h2>

<p>Unlike selling a physical product, quoting a web development project means selling something that doesn't exist yet. The client has an idea — sometimes vague — and you have to estimate how much time and resources are needed to make it real without having done the full technical analysis.</p>

<p>This mismatch produces three common problems:</p>

<ul>
<li><strong>Scope creep:</strong> the original project grows endlessly because the client keeps adding features that are &ldquo;no big deal&rdquo;</li>
<li><strong>Quotes that are too low:</strong> to win the project you estimate tight and then work at a loss</li>
<li><strong>Expectation mismatches:</strong> the client expected one thing and you delivered another (both valid, but different)</li>
</ul>

<p>The solution isn't to be more expensive or cheaper. It's to quote better.</p>

<h2>The four pricing models in web development</h2>

<p>Before putting together any quote, you must decide which pricing model you're going to apply. Not all projects are the same, and the model you choose will determine how you calculate the price and how you present it.</p>

<h3>Fixed price</h3>

<p>The client pays a fixed amount for a defined scope. It's the model most clients ask for because it gives them certainty over the total cost. It's also the riskiest for the developer if the scope isn't perfectly defined.</p>

<p><strong>When to use it:</strong> projects with very clear, closed requirements. A five-page corporate website with a predefined design. A landing page. A specific module of concrete functionality.</p>

<p><strong>The most common mistake:</strong> accepting a fixed price when the scope is ambiguous. If the client says &ldquo;I want a customer portal with custom features&rdquo;, that's not a scope. It's an idea. Don't quote a fixed price until you have the concrete requirements.</p>

<h3>Time &amp; materials</h3>

<p>The client pays for the actual hours worked at an agreed rate. The risk is shared: if the project grows, the cost grows proportionally.</p>

<p><strong>When to use it:</strong> maintenance and evolution of existing systems. Projects with changing requirements. Initial technical exploration phases.</p>

<p><strong>The problem:</strong> many clients are afraid of the hourly model because they feel they lose control of the cost. The solution: set an estimated maximum budget and track it transparently. &ldquo;We work by the hour with a cap of £20,000. If we see we're getting close, we'll let you know before continuing.&rdquo;</p>

<h3>Monthly retainer</h3>

<p>The client pays a fixed monthly fee for a reserved bank of hours. Ideal for clients who need continuous evolution of their digital product.</p>

<p><strong>When to use it:</strong> clients with a digital product in production who need constant improvements, technical support and new features on a recurring basis.</p>

<p><strong>Advantage:</strong> recurring, predictable income for your agency or freelance business. One of the healthiest metrics you can have in a digital services business.</p>

<h3>By sprint or phase</h3>

<p>The project is divided into phases or sprints of two to four weeks, each with a concrete deliverable and a closed price. At the end of each sprint the client decides whether to continue.</p>

<p><strong>When to use it:</strong> medium or large projects where the client wants visibility and control. It's the most balanced model for complex projects.</p>

<p><strong>Advantage:</strong> you reduce your risk because you bill by phase, the client sees real progress and the project can be adjusted based on the learnings of each iteration.</p>

<h2>How to calculate the price of a web project</h2>

<p>Whether you use fixed price or by sprint, you need to estimate the effort as accurately as possible. This is the process that works.</p>

<h3>Step 1: break the project down into tasks</h3>

<p>Don't quote the project as a whole. Break it down into functional modules and concrete tasks. For a corporate website with a blog and contact form, the list might be:</p>

<ul>
<li>Requirements analysis and wireframing — 4 hours</li>
<li>UI design in Figma: home + interior pages — 12 hours</li>
<li>Frontend build and development: home — 6 hours</li>
<li>Build: interior pages (×4) — 8 hours</li>
<li>Blog integration with CMS — 8 hours</li>
<li>Contact form with email notification — 3 hours</li>
<li>Basic on-page SEO: robots.txt, sitemap, metas — 3 hours</li>
<li>Deploy and hosting configuration — 2 hours</li>
<li>Client training — 2 hours</li>
<li>Revisions and QA — 4 hours</li>
</ul>

<p>Estimated total: 52 hours. At a rate of £60/hour, the base price would be £3,120.</p>

<h3>Step 2: apply a contingency factor</h3>

<p>Projects always take longer than estimated. Unforeseen meetings, last-minute changes, unexpected bugs, the extra training that wasn't in the plan. The contingency factor covers all that.</p>

<ul>
<li>Well-defined projects: add 15&ndash;20% on top of your base estimate</li>
<li>Projects with less clear requirements: add 25&ndash;35%</li>
<li>Projects with technology new to you: add up to 40&ndash;50%</li>
</ul>

<p>In the previous example: 52h × 1.20 = 62.4 hours → £3,744. It's more honest than selling yourself short and then having to ask for more money or work at a loss.</p>

<h3>Step 3: add external costs</h3>

<p>Development quotes frequently forget the costs that aren't working hours:</p>

<ul>
<li>Licences for commercial plugins, themes or libraries</li>
<li>Design tools (Figma, Adobe CC)</li>
<li>Third-party services: Stripe, SendGrid, payment APIs</li>
<li>First-year hosting and domain</li>
<li>Stock images and graphic resources</li>
</ul>

<p>These costs should appear broken down in your quote, not mixed in with your hours. The client has to understand what they're paying and to whom.</p>

<h3>Step 4: consider the cost of acquiring the client</h3>

<p>How many meetings have you had to reach this quote? Have you put together a prior technical proposal? Have you travelled for an in-person meeting? That time has value too. If you invested six hours in the sales process for a £3,000 project, your real margin is no longer what you calculated.</p>

<p>Some freelancers and agencies charge for a paid &ldquo;analysis and proposal&rdquo; phase before presenting the final quote. If the project is complex — above £15,000 — this makes complete sense.</p>

<h2>What a web development quote must include</h2>

<p>A good quote isn't just a number. It's a document that manages expectations, sets the framework for the relationship and protects both parties.</p>

<h3>1. Project description and context</h3>

<p>Show that you've listened to and understood what the client needs. Don't copy and paste what they told you: synthesise it in your own words and include the business goal behind the project.</p>

<p><em>&ldquo;The goal of this project is to replace the manual client registration process with a web platform that automates onboarding and document submission, reducing onboarding time from three days to under two hours.&rdquo;</em></p>

<p>That shows you're not a task executor. You're a strategic partner.</p>

<h3>2. Detailed scope: what's included and what's not</h3>

<p>List all the concrete deliverables: screens, modules, features, integrations. And add an explicit &ldquo;out of scope&rdquo; section.</p>

<p>This section is your best defence against scope creep. If a new request comes up, you can point to the contract: &ldquo;That wasn't in the original scope. We can add it with an additional change quote.&rdquo;</p>

<h3>3. Technology and stack</h3>

<p>State the main language, framework and tools you'll use. This isn't just for the technical client: it reassures them that you've thought about the solution, not just the price.</p>

<h3>4. Phases and timeline</h3>

<p>Divide the project into phases with approximate dates. If the project has dependencies on the client — providing you with text, images or access — include them explicitly in the timeline. If the client is late, the deadline moves.</p>

<h3>5. Itemised price</h3>

<p>Present the price by phase or by functional module, not as a single block. This has several advantages: the client understands where the price comes from and perceives it as fairer; if they need to adjust the budget, they can negotiate by removing modules instead of pressuring you to lower the overall rate; and on large projects, it makes internal approvals easier.</p>

<h3>6. Payment terms</h3>

<p>For web development projects, the industry standard is:</p>

<ul>
<li>30&ndash;50% at the start of the project (deposit)</li>
<li>30&ndash;40% at an intermediate milestone (design delivery or first working version)</li>
<li>20&ndash;30% on final delivery</li>
</ul>

<p>Don't start any project without a deposit. It doesn't matter how big the client is or how convincing the relationship seems. The deposit is the proof that the project is real.</p>

<h3>7. Intellectual property</h3>

<p>Specify when ownership of the code transfers to the client. The norm: on receiving the final payment. While there are outstanding invoices, the code remains yours.</p>

<h3>8. Post-delivery maintenance and support</h3>

<p>State what happens after delivery: is there a warranty period? What does it cover (bugs in the delivered code, yes; new features, no)? Do you offer a monthly maintenance plan? If so, include it as an option in the quote. Maintenance is one of the most profitable and predictable revenue lines for any agency or freelancer.</p>

<h3>9. Number of revisions included</h3>

<p>Define how many rounds of revisions are included in the price and what happens if the client requests more. Without this clause, a project can turn into an infinite loop of &ldquo;one more thing.&rdquo;</p>

<h3>10. Quote validity</h3>

<p>State how long the offer is valid for. Thirty days is standard. After that, prices may change.</p>

<h2>Scope creep: how to prevent it from the quote</h2>

<p>Scope creep — the unplanned growth of the scope — is the number one cause of negative profitability in web development projects. And it starts before writing a line of code: it starts in the quote.</p>

<p>These are the clauses you should always include:</p>

<ul>
<li><strong>Explicit change order:</strong> any feature not included in the original scope requires a written change order with an agreed price before being executed</li>
<li><strong>Definition of bug vs. new feature:</strong> a bug is something that doesn't work as agreed; a change to how something already implemented works is a new feature and is billed separately</li>
<li><strong>Limit on included meetings:</strong> in fixed-price projects, define how many meeting hours are included; meetings cost money and should be in the price</li>
</ul>

<p>You don't have to be inflexible. You have to be clear. A client who understands the rules of the game from the start respects them. A client you never told the rules to will keep asking for &ldquo;small things&rdquo; indefinitely.</p>

<h2>How to present the quote to win more projects</h2>

<h3>Always present three options</h3>

<p>Instead of a single proposal, present three versions of the project:</p>

<ul>
<li><strong>Basic option:</strong> the essential features for the project to meet its minimum goal</li>
<li><strong>Standard option:</strong> the one you actually recommend (usually the middle one)</li>
<li><strong>Premium option:</strong> all of the above plus additional features or a higher level of finish</li>
</ul>

<p>This has two effects: the client goes from deciding whether to hire to deciding which to hire. And the middle option — the one you most want to sell — is perceived as the most reasonable through the psychological anchoring effect.</p>

<h3>Add the ROI when possible</h3>

<p>A £15,000 quote can seem expensive until the client understands that the system you're going to build will save them £3,000 a month in manual work. In five months it's paid off. Put the figures on the table when you have them.</p>

<h3>Send a professional PDF, not an email with prices</h3>

<p>The way you present your proposal communicates your level of professionalism before the client has read a single line. A well-designed PDF with your brand identity, clear structure and careful language conveys trust. An email saying &ldquo;the price would be about £8,000, more or less&rdquo; does exactly the opposite.</p>

<p>Tools like <a href="/registro?lang=en">DealForge</a> let you generate proposals in PDF format with your branding, a phased pricing structure and legal terms, ready to send directly to the client from the platform — with status tracking included so you know when they've opened it and when to follow up.</p>

<h2>Common mistakes when quoting web development projects</h2>

<h3>Quoting without clear requirements</h3>

<p>If the client doesn't know exactly what they want, you can't know how much it will cost. In that case, the solution is to charge for the analysis phase before giving the final quote. Many agencies offer a one-week &ldquo;discovery sprint&rdquo; at a fixed price that includes interviews, wireframes and technical specification. At the end of that sprint, the quote is much more precise and the client understands the scope better.</p>

<h3>Not charging for management time</h3>

<p>Meetings, clarification emails, change management, coordination with external suppliers... all of that is billable work. If you don't include it in the price, you're giving it away. A project with weekly meetings over three months has more than twenty hours of management that someone has to pay for.</p>

<h3>Lowering the price to win the project</h3>

<p>Reducing your rate to compete with cheaper proposals is a trap. You attract the most price-sensitive client in the market, work with a lower margin and have less budget to do a good job. Price competition in development services is a race to the bottom that no one wins. Better to lose that project and devote that time to clients who value what you offer.</p>

<h3>Not defining payment milestones</h3>

<p>If you charge everything at the end, your cash flow suffers and you increase the risk of the client haggling over the last invoice or disappearing. Payment milestones distribute the risk across the project.</p>

<h3>Forgetting licences and external tools</h3>

<p>A £200 plugin can seem irrelevant on a large project, but if you have five projects like that a month, that's £1,000 coming out of your pocket. Every external cost should be in the quote, with its real or estimated amount.</p>

<h2>Structure of a web development quote</h2>

<p>So you don't start from scratch on every proposal, this is the structure you should use as a base:</p>

<ol>
<li><strong>Cover:</strong> your logo, project name, date, client details</li>
<li><strong>Executive summary:</strong> project goal and proposed approach in two or three paragraphs</li>
<li><strong>Proposed solution:</strong> technical description, tech stack, architecture decisions</li>
<li><strong>Project scope:</strong> included modules and features, broken down</li>
<li><strong>Out of scope:</strong> what the quote explicitly does not include</li>
<li><strong>Work plan and timeline:</strong> phases, milestones and delivery dates</li>
<li><strong>Investment:</strong> price broken down by phase or module, VAT, payment terms and deposit</li>
<li><strong>Maintenance and support:</strong> what happens after delivery and maintenance contract options</li>
<li><strong>About us:</strong> a brief description of your agency or profile, relevant projects, technologies mastered</li>
<li><strong>Next steps:</strong> what to do to get started (signature, deposit, kick-off meeting)</li>
</ol>

<p>With <a href="/registro?lang=en">DealForge</a> you can save this structure as a template and reuse it on every new proposal, customising only the content specific to each client. What used to take you three hours you have in thirty minutes, with a more professional result.</p>

<h2>How to follow up without being a pain</h2>

<p>You sent the quote. The client said &ldquo;I'll look at it and get back to you.&rdquo; Four days have passed. What do you do?</p>

<p>A reasonable follow-up sequence for web development proposals:</p>

<ul>
<li><strong>Day 1&ndash;2 after sending:</strong> a brief email to confirm receipt and ask if they have questions</li>
<li><strong>Day 5&ndash;7:</strong> a value-added follow-up: a relevant insight for the project, a question about their priorities, something that shows you're still thinking about their case</li>
<li><strong>Day 12&ndash;15:</strong> last contact before the proposal expires; mention the expiry date naturally, without pressure</li>
</ul>

<p>If after fifteen days there's no reply, the client isn't ready or has already chosen someone else. Close the loop and move on. There's no worse investment of time than chasing someone who doesn't want to buy.</p>

<h2>Conclusion: quote like a partner, not a supplier</h2>

<p>The difference between a quote that wins the project and one that doesn't is usually in the details: in how you understand the client's problem, in how you define the scope, in how you protect your time and in how you present the value of what you offer.</p>

<p>A good web development quote isn't just a pricing document. It's the project's first real delivery: it demonstrates your analytical capacity, your mental order and your professionalism. If the quote already impresses, the project is off to a great start.</p>

<p>Work on your template, define your rates clearly, always apply the contingency factor and be explicit with the scope. Those four things alone will improve your close rate and your profitability more than any price cut.</p>

<p><strong>Want to create web development proposals in a professional format, with your branding and sent directly to the client?</strong> Try <a href="/registro?lang=en">DealForge</a> and stop wasting hours on Word documents so you can spend them on what really matters: building projects that work.</p>`,
    autor: "DealForge",
    categoria: "guias",
    tags: ["web development", "web development quote", "app quote", "digital agencies", "freelance", "pricing", "small business"],
    publishedAt: "2026-06-15T11:00:00.000Z",
    metaTitulo: "Web and app development quotes: the definitive guide for agencies and freelancers — DealForge",
    metaDescripcion: "How to create web development quotes that close projects: pricing models, what to include, how to calculate real scope and avoid scope creep. With a structure template.",
    metaKeywords: "web development quote, web project quote, how to quote web development, mobile app price, app quote, freelance developer quote, web quote template, web development agency price",
  },
  {
    slug: "how-to-quote-consulting-services-practical-guide",
    titulo: "How to quote consulting services: a practical guide for consultants and advisers",
    extracto: "Learn to set rates, choose the right pricing model and create proposals that win projects. A practical guide for independent consultants and consulting firms.",
    contenido: `<p>Quoting consulting services is, probably, one of the hardest parts of the business. It's not like selling a product with a list price. Every project is different, every client has a different perception of value, and if you get the price wrong, you either leave money on the table or lose the project. Neither option is good.</p>

<p>In this article we'll look, without beating around the bush, at how to structure your consulting quotes so they're competitive, profitable and professional. From how to calculate your real rate to how to present the price to the client without sending them running.</p>

<h2>Why quoting consulting is different from quoting products</h2>

<p>When you sell a product, the price is relatively easy: cost of manufacture plus margin. When you sell consulting, the price depends on far more subjective factors:</p>

<ul>
<li><strong>The value you generate for the client</strong>, which can be enormous and hard to quantify</li>
<li><strong>Your experience and reputation</strong>, which are hard to compare directly</li>
<li><strong>The scope of the project</strong>, which almost always changes over time</li>
<li><strong>The risk you take on</strong>, especially if you work on results</li>
</ul>

<p>All of this means many consultants either undervalue themselves (to be competitive) or present proposals so high they scare clients off. The solution lies in understanding the available pricing models and choosing the one that best fits each situation.</p>

<h2>The four pricing models in consulting</h2>

<p>There's no single correct way to charge for consulting. These are the four main models, with their honest advantages and disadvantages:</p>

<h3>1. Hourly rate</h3>

<p>The simplest and most common among consultants starting out. You define an hourly rate and charge based on the time spent.</p>

<p><strong>Advantages:</strong> easy to explain, transparent, protects your time if the project drags on.<br>
<strong>Disadvantages:</strong> it penalises efficiency (the better you work, the less you earn), makes it harder for the client to approve the budget because they don't know the final cost, and creates friction in the relationship when the client feels "the meter is running".</p>

<p><strong>When to use it:</strong> for exploratory or open-ended work, for clients you already trust, or when you genuinely can't estimate the time needed.</p>

<h3>2. Fixed price per project</h3>

<p>You define a total price for the delivered result, regardless of the hours invested.</p>

<p><strong>Advantages:</strong> the client knows exactly what they'll pay, it makes budget approval easier, and if you're efficient, your margin grows.<br>
<strong>Disadvantages:</strong> you take on the risk of the project dragging on, and a bad initial estimate can ruin the project's profitability.</p>

<p><strong>When to use it:</strong> for well-defined projects with a clear scope. Never use it when the client doesn't know exactly what they want; you'll end up working for free.</p>

<h3>3. Monthly retainer (fixed fee)</h3>

<p>The client pays a fixed amount per month in exchange for availability, a set number of hours or a bundle of recurring services.</p>

<p><strong>Advantages:</strong> predictable income, a more stable relationship with the client, lower acquisition cost per client.<br>
<strong>Disadvantages:</strong> it can become comfortable for the client (who'll use more hours than agreed) and for you (who stops innovating and settles).</p>

<p><strong>When to use it:</strong> for ongoing consulting relationships where the client needs regular support: strategic consulting, legal advice, marketing, outsourced HR.</p>

<h3>4. Value-based pricing</h3>

<p>The price doesn't reflect time or costs, but the economic value the project generates for the client. If you help a company generate £500,000 in additional revenue, charging £50,000 isn't expensive even if you "only" spent 40 hours.</p>

<p><strong>Advantages:</strong> it frees you from the trap of selling time, aligns your incentives with the client's, and can multiply your income per hour worked.<br>
<strong>Disadvantages:</strong> it requires a lot of trust and credentials, the client needs to understand and accept the value logic, and it's not always easy to quantify the value in advance.</p>

<p><strong>When to use it:</strong> when you can clearly quantify the impact of your work on business results. Sales consulting, process optimisation, digital transformation with measurable ROI.</p>

<h2>How to calculate your real rate as a consultant</h2>

<p>Before setting a price, you need to know what it costs you to work. Many consultants get this wrong because they only calculate the time they spend "on the project" and forget everything else.</p>

<p>A practical formula to calculate your minimum hourly rate:</p>

<ol>
<li><strong>Calculate your total annual costs:</strong> the income you need to live + National Insurance or contributions + tools + office + marketing + training + taxes</li>
<li><strong>Estimate the real billable hours:</strong> it's not 8 hours a day. Between internal meetings, prospecting, admin, training and holidays, a consultant usually bills between 1,000 and 1,400 hours a year. Be conservative: use 1,000 hours.</li>
<li><strong>Add your target margin:</strong> if you want to earn 30% on costs, multiply.</li>
</ol>

<p>A real example:</p>
<ul>
<li>Total annual costs: £60,000</li>
<li>Estimated billable hours: 1,000 hours</li>
<li>Minimum rate: £60/hour</li>
<li>With a 40% margin: <strong>£84/hour</strong></li>
</ul>

<p>If your current rate is below that number, you're losing money, even if you don't see it directly. You're subsidising your clients with your time.</p>

<p>An extra tip: review your rate at least once a year. Inflation, the growth of your experience and the evolution of the market are legitimate reasons to raise prices.</p>

<h2>What a professional consulting proposal must include</h2>

<p>A consulting quote isn't just a number. It's a sales document. These are the sections that can't be missing:</p>

<h3>Executive summary</h3>
<p>One or two pages that show you understand the client's problem better than anyone. Don't talk about yourself yet, talk about the client: their situation, their challenges, the consequences of not acting. If the client reads the executive summary and thinks "exactly, this is what's happening to me", you've already won 50%.</p>

<h3>Project scope</h3>
<p>Define precisely what the project includes and, just as importantly, what it does <em>not</em> include. Scope creep (when the project grows without the price growing) is the silent killer of profitability in consulting. Be explicit: "This project includes X. It does not include Y or Z, which would be quoted separately if needed."</p>

<h3>Methodology and phases</h3>
<p>Explain how you're going to work. It doesn't need to be a treatise, but the client needs to understand the process: what phases there are, what's delivered in each, who does what. This builds trust and reduces the perception of risk.</p>

<h3>Concrete deliverables</h3>
<p>What is the client going to receive at the end? List the deliverables tangibly: diagnostic report, prioritised action plan, working sessions, team training, process documentation. Intangibles scare clients; concrete deliverables don't.</p>

<h3>Timeline</h3>
<p>Key dates, delivery milestones, estimated duration. A project with no dates is a project with no end.</p>

<h3>Team and credentials</h3>
<p>Who's going to work on the project and why they're the right people. Briefly, but with data: relevant experience, similar clients, previous results. Credentials aren't ego, they're social proof that reduces the client's perceived risk.</p>

<h3>Pricing proposal</h3>
<p>The price. Here there's a golden rule: <strong>never present a single price if you can present options</strong>. Options (basic, standard, premium) shift the conversation from "do I buy it?" to "which do I buy?". Plus, the middle option usually wins, and you can design it to be the most profitable for you.</p>

<h3>Terms and next steps</h3>
<p>Payment terms (a deposit of 30-50% at the start is standard in consulting), proposal validity, what you need from the client to get started, and how to accept the proposal. Make signing easy: the simpler it is to say "yes", the more you sell.</p>

<h2>How to present the price without losing the client</h2>

<p>The price is the moment of tension in every quote. Here are the techniques that really work:</p>

<h3>Anchor before revealing the price</h3>
<p>Before giving your price, help the client visualise the value. If your analysis can identify inefficiencies costing £200,000 a year, that number is the anchor. Your fee of £30,000 no longer sounds like a lot, it sounds like an investment with a 566% ROI.</p>

<h3>Break the price down into investment per day or result</h3>
<p>A £15,000 project over three months is £167 a day. Presented that way, it seems much more accessible. Or calculate the price per result: if the project lasts three months and saves the team 8 hours a week, how much is that worth in salaries? Make that calculation explicit in the proposal.</p>

<h3>Don't apologise for your price</h3>
<p>One of the most common mistakes: using defensive language when presenting the price. "Although it may seem high…", "I know it's a significant investment…", "if the price is a problem we can negotiate…". All of that communicates insecurity and opens the door to negotiation before the client has asked for it.</p>

<p>Present the price with confidence. If the client wants to negotiate, let them ask. Don't hand them the weapons.</p>

<h3>Tie the price to scope, not to time</h3>
<p>Never say "I charge X hours at Y per hour". Say "the project costs Z and includes these deliverables". When the price is tied to time, the client always feels they can negotiate more hours. When it's tied to the result, the conversation is different.</p>

<h2>Common mistakes in consulting quotes</h2>

<p>After talking to hundreds of consultants, these are the mistakes that come up most:</p>

<ul>
<li><strong>Quoting without a prior diagnosis.</strong> If you don't understand the client's problem well, your proposal will be generic. A discovery meeting before quoting isn't wasted time; it's the investment that wins projects.</li>
<li><strong>Underestimating management time.</strong> Meetings, emails, revisions, coordination with the client's team... all of that is time that must be in the price or in the project scope.</li>
<li><strong>Not including a contingency buffer.</strong> Projects almost always get complicated. Add between 15% and 25% of contingency to the price or the timeline, and be transparent about why it exists.</li>
<li><strong>Giving prices verbally before the written proposal.</strong> If you say a number in a meeting and then the written proposal has nuances or conditions, you've created unnecessary friction. Numbers, always in writing and always with context.</li>
<li><strong>Proposals that are too long.</strong> More pages don't mean more value. A 40-page proposal nobody reads is worse than a 10-page one that convinces. Prioritise clarity over exhaustiveness.</li>
<li><strong>Not setting an expiry date.</strong> A proposal with no expiry is a proposal that never closes. Always set a validity: 15 or 30 days is usual.</li>
</ul>

<h2>Consulting quote structure: a practical example</h2>

<p>So all of the above is clear, here's an example structure for a strategic consulting proposal:</p>

<p><strong>Client:</strong> Industrial distribution company, 50 employees, margin problems in the direct sales channel.</p>

<p><strong>Proposal:</strong></p>

<ul>
<li><em>Executive summary (1 page):</em> "Your sales team closes projects in 45% of cases, compared with 65% in the sector. The problem isn't the team, it's the quoting process and the sales cycle. This project will attack those two root causes."</li>
<li><em>Scope:</em> diagnosis of the sales process, redesign of the quoting flow, implementation of a CPQ tool, training of the sales team (5 people).</li>
<li><em>Does not include:</em> ERP integration, changes to the commission structure, post-implementation support beyond 90 days.</li>
<li><em>Phases:</em> Phase 1 – Diagnosis (3 weeks). Phase 2 – Design and implementation (6 weeks). Phase 3 – Training and launch (2 weeks).</li>
<li><em>Deliverables:</em> diagnostic report, new documented process, tool configuration, 3 training sessions, 30 days of post-launch support.</li>
<li><em>Price:</em> £18,500 + VAT. 40% on signing, 30% at the start of Phase 2, 30% on final delivery.</li>
<li><em>Validity:</em> 30 days from the date sent.</li>
</ul>

<p>This proposal is concrete, has tangible deliverables, defines the scope and what it doesn't include, and presents the price tied to results. It's exactly what builds trust and makes the "yes" easier.</p>

<h2>Tools to create professional consulting proposals</h2>

<p>The reality of the independent consultant or small consulting firm is that they spend too much time with Word, PDF and spreadsheets trying to make everything add up and look good. That's time that isn't billed and that's exhausting.</p>

<p><strong>Quoting software</strong> designed for professional services can make a real difference:</p>

<ul>
<li>Proposal templates with your branding, ready to customise in minutes</li>
<li>A service catalogue with prices, which you can combine to create proposals quickly</li>
<li>Automatic calculation of totals, VAT and discounts</li>
<li>Email sending with tracking (you know when the client has opened the proposal)</li>
<li>Status control for each proposal: sent, viewed, approved, rejected</li>
</ul>

<p>In DealForge, for example, you can create your consulting service catalogue with unit prices, define proposal templates for different types of projects, and send PDF proposals with your logo directly to the client. The tracking module alerts you when the client opens the proposal, which is the ideal moment to follow up by phone.</p>

<p>It's not a tool just for large companies. It's designed specifically for small businesses and sole traders who want to professionalise their sales process without setting up a complex technology infrastructure.</p>

<h2>Conclusion</h2>

<p>Quoting well in consulting isn't an exact science, but it isn't magic either. It's a process you learn, refine with experience and systematise with the right tools.</p>

<p>The key points to take away from this article:</p>

<ul>
<li>Choose the pricing model that best fits each project, not the most comfortable one by default</li>
<li>Calculate your real rate including all costs, not just the time on the project</li>
<li>A proposal is a sales document, not just a quote: work on it as such</li>
<li>Define the scope precisely, explicitly including what isn't included</li>
<li>Present the price with confidence and tied to value, not to time</li>
<li>Systematise the process so creating a good proposal doesn't take you half a day</li>
</ul>

<p>The consultant who wins more projects isn't always the cheapest or the most technically brilliant. It's the one who presents their value most clearly and professionally. That starts with the quote.</p>

<p><strong>Want to create professional-looking consulting proposals, in minutes and without technical hassle?</strong> Try <a href="/registro?lang=en">DealForge</a> and spend that time on what really generates value: your clients.</p>`,
    autor: "DealForge",
    categoria: "guias",
    tags: ["consulting", "consulting quote", "consulting proposal", "consultant rates", "sales proposal", "sole traders", "small business"],
    publishedAt: "2026-06-15T11:30:00.000Z",
    metaTitulo: "How to quote consulting services: a practical guide — DealForge",
    metaDescripcion: "Learn to set rates, choose the right pricing model and create consulting proposals that win projects. With practical examples and a quote structure.",
    metaKeywords: "how to quote consulting, consulting quote, consultant rate, consulting pricing proposal, consulting services price, how to charge for consulting, professional services quote, consulting retainer",
  },
  {
    slug: "professional-photography-quotes-complete-guide",
    titulo: "Professional photography quotes: a complete guide for photographers",
    extracto: "How to calculate your real rate, what to include in every quote and how to defend your price without losing clients. A practical guide for professional photographers and photography studios.",
    contenido: `<p>One of the topics that causes the most discomfort among professional photographers isn't the technique or the gear: it's the price. How much do I charge for a session? How do I respond when the client tells me another photographer does it cheaper? Am I undervaluing my work?</p>

<p>If you recognise yourself in any of those questions, this article is for you. We'll look, without beating around the bush, at how to structure your photography quotes so they're profitable, professional and easy to defend to any client.</p>

<h2>Why photography is especially hard to quote</h2>

<p>Photography has a value-perception problem that few sectors have to the same degree. The client sees the final result — some photos — and doesn't see the invisible work behind it: the equipment worth thousands, the hours of editing, the years of training, the travel time, the admin, the insurance and the licences.</p>

<p>On top of this, we live in a world where everyone carries a reasonably good camera in their pocket. The client knows they can take photos. What they often don't understand is why yours are worth what they're worth.</p>

<p>The result is that many professional photographers end up charging less than they need to be sustainable, or lose clients because they don't know how to present and defend their price. Neither situation is acceptable if you want to make a living from this in the long term.</p>

<h2>Pricing models in professional photography</h2>

<p>There's no single correct way to charge. These are the most common models, with their real advantages and disadvantages:</p>

<h3>Price per session (fixed price)</h3>

<p>You define a closed price per type of session: a wedding, a product session, a corporate shoot. The client knows exactly what they'll pay from the start.</p>

<p><strong>When it works well:</strong> when the type of work is highly standardised and the execution time is predictable. Portrait sessions, studio product photos or company shoots fit well here.</p>

<p><strong>Risk:</strong> if the project runs longer than planned or the client asks for more than agreed, you're working for free during that extra time. The key is to define very well what the price includes.</p>

<h3>Hourly rate</h3>

<p>You charge an hourly rate for the time you spend on the job, including travel and editing if agreed.</p>

<p><strong>When it works well:</strong> on event coverage where the duration is uncertain, on corporate video sessions with multiple scenes, or when the client wants total flexibility.</p>

<p><strong>Risk:</strong> the client starts timing what you do. If you use an hourly rate, be very explicit about which hours are included and which are billed separately.</p>

<h3>Price per deliverable</h3>

<p>The price doesn't depend on time but on the number of edited photos delivered. Twenty retouched photos cost X; forty cost Y.</p>

<p><strong>When it works well:</strong> in product photography for e-commerce, where the client has a catalogue with a concrete number of items to photograph. Also in corporate portraits where a number of images per person is agreed.</p>

<p><strong>Risk:</strong> the client may try to renegotiate by asking for more deliverables at the end of the project. Always put in writing what happens if the agreed deliverables are exceeded: an additional price per extra unit.</p>

<h3>Price packages</h3>

<p>You offer three or four closed packages with different service levels. The client chooses the one that suits them best.</p>

<p><strong>When it works well:</strong> in wedding photography, newborn sessions, property shoots. Any type of photography where the client arrives without knowing exactly what they want.</p>

<p><strong>Key advantage:</strong> instead of deciding whether to hire, the client decides which package. That completely changes the dynamic of the sales conversation.</p>

<h2>How to calculate your real rate</h2>

<p>This is where most photographers go wrong. They calculate how much they want to charge per hour of shooting, but forget everything else.</p>

<p>Your real rate has to cover:</p>

<ul>
<li><strong>Your cost of living:</strong> what you need to earn per month to pay your personal bills. Not what you want to earn: the minimum you need.</li>
<li><strong>The business costs:</strong> equipment (depreciation of camera, lenses, flashes, computer), storage, editing software, insurance, tax management, website, lead-generation platforms...</li>
<li><strong>Non-billable time:</strong> quotes that don't close, client management, training, editing, travel, admin. Only part of your working time generates direct billing; the rest also has to be in your rate.</li>
<li><strong>The profit margin:</strong> to grow, invest in better equipment and have reserves for the bad months.</li>
</ul>

<p>A practical way to calculate it: add all your monthly costs (personal and business), divide by the number of projects you can realistically do per month, and that's your minimum price per project. If you're charging less than that, you're losing money on every job.</p>

<p>Example: if your total costs are £3,500/month and you can do 8 projects a month, your minimum price is £437 per project. To that you add your desired profit margin and you reach the market price you should charge.</p>

<h2>What a photography quote must include</h2>

<p>A good photography quote isn't just a figure. It's a document that explains what the client will receive, under what conditions and with what guarantees. These are the elements that can't be missing:</p>

<h3>Detailed service description</h3>

<p>Type of session, date and place, estimated duration, number of locations if applicable. The more concrete you are, the fewer disputes there'll be afterwards.</p>

<h3>Exact deliverables</h3>

<p>Number of retouched photos that will be delivered, format (JPEG, TIFF, RAW), resolution, delivery method (online gallery, download, USB) and delivery time. If you include a selection gallery for the client to choose from, state how many photos they'll have available to choose and how many they'll receive edited at the end.</p>

<h3>What the quote does NOT include</h3>

<p>Just as important as the above. Does it include travel? Extra hours if the session runs over? Advanced retouching or just basic editing? Usage rights for advertising or only for personal use? Be explicit about what's outside the price to avoid misunderstandings.</p>

<h3>Payment terms</h3>

<p>The most common in professional photography is:</p>

<ul>
<li>50% on confirming the booking (non-refundable deposit)</li>
<li>The remaining 50% on the day of the session or before delivery of the photos</li>
</ul>

<p>The deposit is fundamental. You reserve time in your diary, perhaps coordinate locations, models or additional equipment. If the client cancels at the last minute with no deposit, you lose that availability and the preparation work. The deposit isn't greed: it's your legitimate protection.</p>

<h3>Cancellation and rescheduling policy</h3>

<p>Clearly define what happens if the client cancels, wants to change the date or if there's a force majeure event. The clearer this is in writing from the start, the fewer conflicts you'll have if something goes wrong.</p>

<h3>Usage rights</h3>

<p>The photos you take have copyright that belongs to you. The client pays to use those photos under certain conditions. Can they use them for social media? For paid advertising? For billboards? For how long and in which territories?</p>

<p>In commercial and advertising photography, usage rights are an important part of the price. A photo for a national advertising campaign is worth far more than the same photo for the client's personal Instagram. Knowing how to identify the final use lets you set the right price.</p>

<h3>Quote validity</h3>

<p>State how long it's valid for. Thirty days is standard. After that, prices may change.</p>

<h2>How much to charge by type of photography</h2>

<p>Price ranges vary a lot depending on the speciality, location and experience level. These are typical market ranges, as an indicative reference:</p>

<h3>Wedding photography</h3>

<p>Weddings are probably the most in-demand and most competitive speciality. The price range goes from around £700 for a photographer just starting out to £4,000-6,000 or more for professionals with an established portfolio.</p>

<p>The most common mistake is competing on price with the cheapest photographers in the market. If your niche is elegant weddings with a luxury album, you're in a different market from someone doing budget shoots. Don't compete with people who aren't your direct competition.</p>

<h3>Corporate and business photography</h3>

<p>Corporate portrait sessions, photos for websites and communications, team and office shoots. The usual range: between £450 and £2,500 per session, depending on the scope, the number of people and the locations.</p>

<p>In this segment, clients usually have a budget, but they need to clearly see the ROI: these photos go on their website, on LinkedIn, in marketing materials. When you frame them in that context — "these photos will be the first thing a potential client sees when they visit your website" — the price justifies itself.</p>

<h3>Product photography for e-commerce</h3>

<p>The most common pricing is structured by number of items and by type of image (product only, with model, lifestyle). Usual ranges: £12-45 per item for basic studio product photography; £70-180 or more for lifestyle photography with model and props.</p>

<p>In this segment, batch pricing works very well: a progressive discount above a certain volume of items. A client with 200 items a year is much more valuable than one with 20, and deserves a different price.</p>

<h3>Property photography</h3>

<p>Between £130 and £450 per property, depending on the size, the area and whether it includes video or aerial drone photography. Typical clients are estate agencies and developers with a constant volume of work, which makes the price per project lower but the commercial relationship more stable.</p>

<h3>Event photography</h3>

<p>From company presentations to trade shows and conferences. The range goes from £280 for a short event to £1,500-3,000 for full-day or multi-day events. Including travel and clearly defining the coverage hours is essential in this type of work.</p>

<h3>Fashion and advertising photography</h3>

<p>This is where prices vary the most. An advertising production can go from £450 for a small local brand to tens of thousands for a national campaign. Here, usage rights carry enormous weight in the final price.</p>

<h2>How to present and defend your price</h2>

<p>Knowing how much to charge is half the job. The other half is knowing how to present it.</p>

<h3>Present the value before the price</h3>

<p>Before mentioning any figure, make sure the client understands what problem you solve. If you photograph corporate websites, you don't sell photos: you sell the first impression their company gives every visitor. If you photograph e-commerce products, you don't sell images: you sell conversions.</p>

<p>When the value is clear in the client's mind, the price that comes after is evaluated in that context. Not as "expensive or cheap", but as "worth it or not".</p>

<h3>Use price anchoring</h3>

<p>Always present three options instead of just one. When you have a basic package, a standard one and a premium one, the client doesn't decide whether to hire: they decide which level to hire. And the middle option — the one you most want to sell — is perceived as the most reasonable by contrast with the other two.</p>

<h3>Respond to "it's too expensive" without lowering the price</h3>

<p>When a client says it's expensive, in most cases they're not telling you they can't pay it: they're telling you they don't understand why it's worth that.</p>

<p>The answer isn't to lower the price. It's to explain the value better: "I understand it may seem like a lot. Can I explain what's included and why the price is structured this way?"</p>

<p>And if after the explanation the client still says it's expensive because another photographer does it cheaper, the honest answer is: "There are photographers for every budget. What I offer includes [X, Y, Z]. If price is the deciding factor, perhaps that other photographer fits better with what you're looking for."</p>

<p>You don't have to win every quote. You have to win the right ones.</p>

<h3>Never give the price verbally first</h3>

<p>If a client asks how much you charge over the phone or by message, don't reply with a loose figure. First you need to understand the project, and then you present the quote in writing, professionally, with all the detail.</p>

<p>A price given without context always seems more expensive. A price within a proposal that explains what's included and what value it generates seems more reasonable, even if it's the same number.</p>

<h2>Common mistakes when quoting photography</h2>

<h3>Not including editing time in the price</h3>

<p>Shooting time is only part of the work. A two-hour session can take four or six hours of editing afterwards. If you don't factor that time into your rate, you're charging much less than you think.</p>

<h3>Giving discounts to win the client</h3>

<p>Giving discounts to close a first project has a serious problem: the client learns you can lower the price and will always try. The discount you gave to win them becomes the price they'll expect on every subsequent project.</p>

<p>If you want to offer something special to a new client, do it as added value (more edited photos, faster delivery, an extra service), not as a price reduction.</p>

<h3>Not charging for extras</h3>

<p>The client arrives half an hour late. They ask for one more location that wasn't in the plan. They want ten additional edited photos. All of that has a cost and you have the right to charge for it.</p>

<p>If you haven't defined in writing from the start what happens in those situations, it'll be very awkward to claim that money later. Define the extras protocol in the initial quote and that way you won't have to have that difficult conversation.</p>

<h3>Not requesting a deposit</h3>

<p>Working without a deposit means taking on all the risk. The client cancels the day before and you lose that diary reservation with no compensation. Always ask for a deposit, no exceptions. If the client doesn't want to pay it, that fact tells you a lot about how the commercial relationship will go.</p>

<h3>Delivering the work before getting paid</h3>

<p>Once the client has the photos, they've lost any incentive to pay you quickly. Agree and collect the outstanding payment before final delivery. It's not distrust: it's a standard commercial practice in all creative sectors.</p>

<h2>Automate and professionalise your quotes</h2>

<p>If every time you have to send a quote you spend an hour building the document in Word or in an email, you're wasting time you could spend photographing. And the result is probably not as professional as it could be.</p>

<p>Quote management tools like <a href="/registro?lang=en">DealForge</a> let you create templates for your most common session types, generate proposals with your branding in minutes and track which clients have opened your quote and when. For photographers handling several projects at once, the difference in time and presentation is notable.</p>

<p>A quote that reaches the client the same day they ask, looking professional and with all the information clear, has a much higher chance of closing than one that arrives three days later in an email with loose prices.</p>

<h2>The conversation about price: a practical example</h2>

<p>To make all this more concrete, imagine this situation: a tech company contacts you to take photos of the team (fifteen people) for their website and LinkedIn profiles.</p>

<p>Before giving any price, you ask the right questions:</p>

<ul>
<li>Where do they want to take the photos? (at their office, a neutral location, outdoors)</li>
<li>What use will they make of the photos? (website and LinkedIn only, or also advertising)</li>
<li>Do they have a style preference? (neutral background, work environment, casual)</li>
<li>When do they need it? (urgency, available dates)</li>
<li>Is there anything special to consider? (people who don't speak English, scheduling difficulties, accessibility)</li>
</ul>

<p>With that information, you prepare a proposal with three options:</p>

<ul>
<li><strong>Basic:</strong> session at their offices, a neutral background, two edited photos per person. £850.</li>
<li><strong>Standard:</strong> session at their offices, two different backgrounds (formal and informal), three edited photos per person, a selection gallery of five options per person. £1,250.</li>
<li><strong>Premium:</strong> all of the above plus a group session and work-environment photos, five edited photos per person, delivery in five working days. £1,700.</li>
</ul>

<p>You present the three options with a description of what each includes, payment terms (50% deposit, 50% before delivery), cancellation policy and a 30-day validity.</p>

<p>The client has all the information to decide without needing more back-and-forth emails. And you've presented your work professionally from the first contact.</p>

<h2>Conclusion: quote your work like the professional you are</h2>

<p>Professional photography is a business. And like any business, it needs prices that are sustainable, processes that are efficient and a way of presenting the work that builds trust.</p>

<p>The key points of this article:</p>

<ul>
<li>Calculate your real rate including all costs, not just shooting time</li>
<li>Choose the most suitable pricing model for each type of work</li>
<li>Always define in writing what the quote includes and doesn't include</li>
<li>Charge a deposit without exceptions and deliver after the final payment</li>
<li>Present three options instead of one to improve your close rate</li>
<li>Defend your price with the value you offer, not with arguments about time spent</li>
</ul>

<p>The photographer who wins more profitable projects isn't the cheapest in the market: it's the one who best communicates their value and presents their work most professionally. Start with the quote.</p>

<p><strong>Want to create professional photography quotes in minutes, with your branding and status tracking included?</strong> Try <a href="/registro?lang=en">DealForge</a> and stop wasting time on documents that don't close projects.</p>`,
    autor: "DealForge",
    categoria: "guias",
    tags: ["professional photography", "photography quote", "photographer quote", "how much to charge for photography", "photographer rates", "sole traders", "small business"],
    publishedAt: "2026-06-15T12:00:00.000Z",
    metaTitulo: "Professional photography quotes: a complete guide for photographers — DealForge",
    metaDescripcion: "How to calculate your real rate, what to include in every quote and how to defend your price without losing clients. A practical guide for professional photographers.",
    metaKeywords: "professional photography quote, photographer quote, how much to charge for photography, professional photographer rates, photo session price, how to quote photography, photo session quote, photographer rate",
  },
  {
    slug: "accounting-bookkeeping-service-quotes-guide",
    titulo: "Accounting and advisory service quotes: a practical guide for firms and advisers",
    extracto: "How to structure and present your accounting, tax, payroll and legal advisory quotes to win more clients and charge what your services are really worth.",
    contenido: `<p>If you run an accounting practice or handle companies' books as a sole trader, you know first-hand how hard it is to answer the question "how much do you charge?". The problem isn't that you don't know what your work is worth. The problem is that this value is invisible to the client until they need it, and by then you've already had to give a figure with no context.</p>

<p>This article is a practical guide to structuring, presenting and defending your quotes for accounting and advisory services. No fluff, with real market examples.</p>

<h2>Why advisory services are especially hard to quote</h2>

<p>There's a reason many advisers end up charging less than they should: the client doesn't see the work. They see the result — the VAT return filed, the payslip generated, the contract reviewed — but not the hours of keeping up with regulation, the years of training, or the response time to urgent queries nobody explicitly asked for but everyone expects.</p>

<p>On top of this, advisory is a service built on trust and the long term. The client who arrives asking about price almost never buys "a tax return": they're buying peace of mind, legal certainty and someone who'll warn them when the rules affecting their business change. That value is very hard to put into a number without first explaining it well.</p>

<p>The usual result: advisers who give a price over the phone before understanding the case, clients who compare that number with a competitor's without understanding what each includes, and a client base where the ones who give the most work are the ones who pay the least.</p>

<h2>Pricing models in accounting and advisory</h2>

<p>There's no single correct model. What there is are models more or less suited to the type of service and the client profile.</p>

<h3>Fixed monthly fee</h3>

<p>It's the most common model in business and sole-trader advisory. The client pays a fixed amount per month and in return receives a defined set of services: bookkeeping, periodic returns, payroll, queries included within a certain volume.</p>

<p><strong>Why it works:</strong> it gives predictability to both parties. The client knows what they pay. You know what you bring in. And when the relationship is well structured, client loyalty is very high because changing advisers has a real cost (handover of documentation, a new process of getting to know the business).</p>

<p><strong>The risk:</strong> the fixed fee tends to stagnate. You set a price for a sole trader with three invoices a month and three years later that same client has a limited company with five employees and twenty suppliers, but still pays the same. Review fees annually and adjust them to the client's reality.</p>

<h3>Price per service or project</h3>

<p>You charge for specific actions: filing the personal tax return, incorporating a company, drafting a lease, processing a grant. Each service has its fixed price or range.</p>

<p><strong>Why it works:</strong> it's very clear for the client. They know exactly what they're paying for. And you can capture value on high-value services like incorporations, restructurings or special tax procedures.</p>

<p><strong>The risk:</strong> complex projects are hard to close at a fixed price if you haven't done the prior analysis well. A tax enquiry that looked simple can get complicated. Define the scope well before giving a closed price.</p>

<h3>Hourly rate</h3>

<p>You charge an hourly rate for the time spent. Common in legal services, high-level consultancy and one-off actions outside the scope of the monthly fee.</p>

<p><strong>Why it works:</strong> it protects you on projects of uncertain scope. If the client wants you to accompany them in a negotiation with the tax authority that could last two hours or ten, the hourly rate is the reasonable option.</p>

<p><strong>The risk:</strong> the client perceives a meter running when they call you. Some clients hold back from making queries they should make for fear you'll "charge them". That's bad for everyone: the client doesn't get the service they need and you don't find out about problems you could solve before they become urgent.</p>

<h3>Value-based pricing</h3>

<p>The most sophisticated and most profitable when applied well. Instead of charging for time or service, you charge based on the economic value you generate for the client: the tax saving you achieve, the penalty you avoid, the financing you facilitate, the sale you structure tax-efficiently.</p>

<p><strong>Why it works:</strong> it decouples the price from the time spent. If you structure a business sale so the client pays £40,000 less in tax, charging £5,000 for that work is reasonable even if it took you twenty hours, not a hundred.</p>

<p><strong>The risk:</strong> it requires a high level of trust with the client and the ability to quantify the value with data. It's not the model for acquiring new clients; it's the model for billing well to high-value clients who already trust you.</p>

<h2>What to include in an advisory quote</h2>

<p>A poorly structured advisory quote generates more confusion than clarity. The client doesn't know what they're buying and ends up comparing prices on the wrong criteria. A good advisory quote has to answer five questions before the client asks them:</p>

<h3>1. What exactly does it include?</h3>

<p>A specific list of services. Not "tax and payroll advice": name each return, each report, each task included. If you include unlimited queries, say so. If queries have a monthly hour limit, also say so.</p>

<p>Example of a clear description: "Quarterly VAT returns, annual accounts and Corporation Tax filing, monthly bookkeeping up to 50 entries, payroll for two employees (joiners, leavers, monthly payslips and PAYE submissions), and email query support within 24 working hours."</p>

<h3>2. What does it NOT include?</h3>

<p>Equally important. Are dealings with the tax authority beyond the routine included? And representation in the event of an enquiry? And year-end statutory filings beyond the standard set?</p>

<p>Being explicit about what isn't included doesn't make the quote look worse: it makes it look professional. And it protects the commercial relationship long-term because the client knows what to expect without nasty surprises.</p>

<h3>3. How much does it cost and how is it billed?</h3>

<p>Monthly, annual or per-action price. Payment method (direct debit, transfer). Cancellation notice. Terms in the event of late delivery of documentation by the client, which delays your work and creates extra cost.</p>

<h3>4. What do you need from the client to deliver the service?</h3>

<p>Many advisers don't include this in the quote and then have chronic problems: the client hands over invoices at the end of the quarter with two days to spare, or doesn't provide access to the payroll portal, or changes bank without telling you. Define what you need from the client to meet deadlines and what happens if that information doesn't arrive on time.</p>

<h3>5. What response time can you guarantee?</h3>

<p>The service level is a pricing variable, although it's rarely mentioned explicitly. An adviser who responds within 24 hours and another who responds within a week aren't offering the same service even if the list of tasks is identical. If you have a differential response time, put it in writing: it's a real value argument.</p>

<h2>How much to charge: typical market ranges</h2>

<p>Prices vary significantly depending on the type of firm, the specialisation, the geographic area and the client profile. These ranges are indicative:</p>

<h3>Accounting and tax for sole traders</h3>

<p>The most competitive segment. Monthly fee prices go from around £30-50/month for online firms with a standardised model to £150-300/month for firms with personalised attention and sector specialisation.</p>

<p>The most common mistake here is competing on price with low-cost online firms. That's a game you can't win if you have real overhead costs. The alternative is to differentiate on specialisation (sole traders in the tech sector, international freelancers, content creators with foreign-currency income) or on service level (same-day response, proactive advice, quarterly review of the tax position).</p>

<h3>Accounting and tax for SMEs (limited companies with up to 10 employees)</h3>

<p>The usual range for a complete monthly fee (bookkeeping, VAT, Corporation Tax, payroll) is between £200 and £600/month depending on the volume of transactions, the number of employees and the complexity of the activity.</p>

<p>An SME with five employees, twenty suppliers and a hundred invoices a month requires substantially more work than a sole trader with simple activity. The quote has to reflect that reality.</p>

<h3>Company incorporation</h3>

<p>Between £300 and £800 for the advisory service of incorporating a company, not including registration fees which are the client's costs. The variation depends on whether you include drafting bespoke articles, initial tax planning and the first registrations with the tax and payroll authorities.</p>

<h3>Personal tax return (Self Assessment)</h3>

<p>From £60-80 for simple returns (an employee with no complications) to £200-500 or more for complex returns (self-employment income, rental property, capital gains, crypto-assets, benefits in kind, income from multiple sources).</p>

<h3>Procedures with the tax authority (enquiries, investigations)</h3>

<p>Here the hourly rate is more common. Rates go from £80-120/hour for firms with no specific specialisation to £200-400/hour for specialists in tax procedures or international taxation.</p>

<h3>Payroll and employment advice</h3>

<p>The cost per employee per month is usually between £10 and £25 per employee, depending on the total number (more employees, lower unit cost) and the complexity of the contracts. Special processes (redundancies, collective dismissals) are quoted separately.</p>

<h2>How to present the price without losing the client</h2>

<h3>Never give the price before understanding the case</h3>

<p>When someone calls asking "how much do you charge to do my company's accounts?", the correct answer isn't to give a price range. The correct answer is to ask the questions you need to give a real price: type of company? activity? number of employees? approximate volume of invoices a month? are they up to date with the tax authority?</p>

<p>A price given without context always seems too high or too low. A price given after understanding the case has a natural justification.</p>

<h3>Present the price within a proposal, not in a loose email</h3>

<p>A professional advisory services proposal, with your logo, with the breakdown of included services, with the terms of the relationship and with the price presented clearly, conveys trust before the client has read a single line. The same price in an informal email saying "it would be £X a month" seems arbitrary.</p>

<p>Tools like <a href="/registro?lang=en">DealForge</a> let you create those proposals quickly with custom templates, including the option for the client to accept them with an electronic signature from the document itself. For firms sending ten or fifteen proposals a month, the time saving and the improvement in presentation are immediate.</p>

<h3>Offer options, not a single price</h3>

<p>Presenting a single option puts the client in "accept it or reject it" mode. Presenting three options puts them in "which of these fits me best?" mode. The psychology of choice works in your favour when you have several well-differentiated service levels.</p>

<p>Example structure for an SME:</p>

<ul>
<li><strong>Basic (£320/month):</strong> monthly bookkeeping, quarterly VAT returns, annual accounts and Corporation Tax filing, online document portal.</li>
<li><strong>Standard (£480/month):</strong> all of the above plus payroll for up to five employees, the director's personal tax return, query support within 24 hours.</li>
<li><strong>Premium (£680/month):</strong> all of the above plus quarterly tax planning, review of supplier and client contracts, a monthly report on the business's financial position, direct phone access to the responsible adviser.</li>
</ul>

<p>With this structure, the client doesn't evaluate whether your price is expensive or cheap. They evaluate which service level they need.</p>

<h3>Talk about what you prevent, not just what you do</h3>

<p>The value of a good adviser isn't only in filing returns: it's in the penalties that never arrive, the bookkeeping errors that aren't made, the tax opportunities seized before it's too late. When you present your proposal, include concrete examples of situations you manage for the client: "we warn you before each quarter-end so you can adjust deductible expenses", "we check each month that payroll submissions are up to date to avoid surcharges".</p>

<p>That turns the monthly price from an "advisory fee" into "an investment in peace of mind and money saved".</p>

<h2>Common mistakes when quoting advisory services</h2>

<h3>Setting prices without calculating the real time you spend</h3>

<p>Many advisers set the monthly fee "by eye" or by comparing with what the competition charges, without calculating how many hours they actually devote to that client. When you do the maths, you discover that some "cheap" clients are actually the most costly in time per pound billed.</p>

<p>Do the exercise once: log the time you spend on each client over a full quarter (including calls, emails, one-off tasks and time keeping up with regulation that affects them). Divide that client's billing by the hours spent. If the result is below your minimum hourly rate, you have a pricing problem to fix.</p>

<h3>Not updating long-standing clients' fees</h3>

<p>The client you've had for five years who started as a sole trader now has a company with three employees and has tripled their turnover. But their fee is still what it was when you signed up. Reviewing and updating prices isn't a lack of consideration towards the loyal client: it's a healthy commercial practice both of you understand if the relationship is good.</p>

<p>Establish a clear policy: fee review every twelve months, with written communication and justification for the adjustment. A client who's been with you for years and values the service won't leave over a reasonable update. The one who leaves purely over price was a client who would have been a problem at some point.</p>

<h3>Accepting all the work that comes in without filtering the client</h3>

<p>Not all clients are good clients. The one who always hands over documentation late, the one who calls every day with urgencies that aren't urgencies, the one who questions every invoice and constantly asks for discounts: these clients consume more resources than they generate.</p>

<p>A well-structured quote is also a filter. When you present a professional proposal with clear collaboration terms, clients looking for cheap advice with no commitment tend to rule themselves out. And that, in the medium term, improves the profitability and quality of life of your firm.</p>

<h3>Not documenting agreements in writing</h3>

<p>Advisory is a long-term relationship with a lot of verbal and informal communication. But when there's a misunderstanding about what was included in the fee, you only have two options: absorb the cost or have a conflict with the client. The third option — the correct one — is to have the agreement documented from the start.</p>

<p>Always send a formal proposal before starting any relationship. Have the client accept it in writing. And keep that documentation. With <a href="/registro?lang=en">DealForge</a> you can manage acceptance with an electronic signature and have a centralised history of proposals sent and accepted, which hugely simplifies things when you need to review what was agreed with whom and when.</p>

<h2>The first meeting with a prospective client: how to turn it into a won quote</h2>

<p>Most advisory clients don't decide on price: they decide on trust. And trust is built (or destroyed) in the first meeting.</p>

<p>These are the points that make the difference in that first conversation:</p>

<ul>
<li><strong>Listen more than you talk:</strong> the client wants to feel you understand their specific situation, not that you're giving them a generic pitch. Ask about their activity, their concerns, the problems they've had with previous advisers.</li>
<li><strong>Identify the specific pain:</strong> are they worried about an investigation? do they have doubts about how to tax a specific transaction? are they growing and don't know how to structure the business? The price you defend afterwards has to resonate with that specific pain.</li>
<li><strong>Show you know their sector:</strong> if you handle several clients in the same sector, say so. If you know the tax casuistry of their activity, say so. Specialisation justifies higher prices without having to argue them.</li>
<li><strong>Don't commit to a price in the meeting:</strong> "I'll send you a detailed proposal in 24 hours" is more professional than giving a number on the spot and then having to backtrack. The written proposal gives time to think, to structure the service well and to present it professionally.</li>
</ul>

<h2>What to do when the client says it's expensive</h2>

<p>It's going to happen. And the correct response isn't to justify yourself or automatically lower the price.</p>

<p>The first thing is to understand what "it's expensive" means. In most cases it means one of these three things:</p>

<ol>
<li><strong>They don't understand what the price includes.</strong> Solution: explain the scope of the service and what it prevents in more detail. "For that £400 a month you get X annual tasks that, if you did them yourself or they were urgencies with another firm, would cost you much more."</li>
<li><strong>They've seen a lower price elsewhere.</strong> Solution: ask what that other proposal includes. In 80% of cases it includes less. If it includes the same, then there genuinely is a price difference you have to defend with quality or specialisation arguments, not by matching the price.</li>
<li><strong>They don't have a real budget for this.</strong> Solution: propose a more basic version of the service or be honest: "what you describe needs a service level with a minimum cost of £X. If that budget doesn't fit right now, I can recommend more economical options for this phase."</li>
</ol>

<p>What you must not do is lower the price without changing the scope of the service. Every time you do that, the client learns your prices are negotiable and will use that information at every renewal. If you lower the price, reduce the service proportionally and make it clear that's the case.</p>

<h2>Automate quote management without losing personalisation</h2>

<p>An advisory firm can handle dozens of active proposals at the same time: renewals for existing clients, quotes for new clients, proposals for additional services. Managing all that manually in Word or email is slow and leads to lost follow-ups.</p>

<p>Having a system that lets you create proposals from standardised templates, customise them for each client and track which proposals are pending a reply changes the efficiency of the process. <a href="/registro?lang=en">DealForge</a> is designed specifically for this kind of flow: you create the proposal in minutes, send it with an electronic signature link and get notified when the client has opened it and when they accept. Nothing gets lost in a forgotten email thread.</p>

<h2>Conclusion: quote like the professional you are</h2>

<p>Advisory and accounting are services where the price is the first indicator of quality the client has. A firm charging £80 a month conveys a very different message from one charging £400, even before the client has seen what each includes.</p>

<p>The key points of this article:</p>

<ul>
<li>Choose the most suitable pricing model for each type of client and service</li>
<li>Always define in writing what your service includes and doesn't include</li>
<li>Present formal proposals, not verbal prices or informal emails</li>
<li>Offer options (basic, standard, premium) instead of a single figure</li>
<li>Review existing clients' fees at least once a year</li>
<li>Defend your price with the value you bring, not by lowering it automatically</li>
<li>Log the time you spend on each client to spot unprofitable relationships</li>
</ul>

<p>The adviser or firm that wins the best clients isn't the cheapest: it's the one who best communicates what they do, presents their services clearly and builds trust from the first contact. The quote is the first step of that trust.</p>

<p><strong>Want to send advisory service proposals professionally, with electronic signature and tracking included?</strong> Try <a href="/registro?lang=en">DealForge</a> free and stop losing clients over how you present your price, not over what you charge.</p>`,
    autor: "DealForge",
    categoria: "guias",
    tags: ["advisory quotes", "accounting quote", "accounting firm", "tax adviser rates", "how much to charge for advisory", "sole traders", "small business"],
    publishedAt: "2026-06-15T12:30:00.000Z",
    metaTitulo: "Accounting and advisory service quotes: a practical guide — DealForge",
    metaDescripcion: "How to structure and present your accounting, tax, payroll and legal advisory quotes to win more clients and charge what your services are really worth.",
    metaKeywords: "advisory quotes, accounting quote, tax adviser rates, how much to charge for accounting advisory, advisory price SMEs, accounting services quote, bookkeeping quote, tax advisory",
  },
  {
    slug: "security-company-quotes-guide",
    titulo: "Security company quotes: how to price and win contracts",
    extracto: "Everything you need to structure private security service quotes: manned guarding, alarms, CCTV and access control. With real market price ranges.",
    contenido: `<p>If you run a private security company or install protection systems, you know that winning a new contract rarely depends only on having the best service. It depends on how you present your proposal, on whether the client understands what they're buying and on whether your price reflects the real value of what you offer.</p>

<p>The private security market is large and serves everyone from residential blocks to major retail complexes. Competition is high, margins are tight and the client — often — compares proposals without knowing exactly what sets one company apart from another. Your quote has to do that differentiation work before you even get to the meeting.</p>

<p>This guide is for security companies of all sizes: from sole-trader alarm installers to companies with their own in-house guarding staff. No unnecessary theory, with real examples.</p>

<h2>The main problem with quotes in the security sector</h2>

<p>Most security companies make the same mistake: they send a quote that's basically a list of services with a price next to each. No explanation of value, no clear breakdown, no differentiation from the competition.</p>

<p>The result is predictable: the client compares that number with a competitor's, chooses the cheapest (even if it's not the most suitable) and then complains that the service wasn't what they expected.</p>

<p>A well-made security quote doesn't compete on price. It competes on trust. And trust is built before the signature, with documentation that shows you understand the client's risk and have the capacity to manage it.</p>

<h2>Types of security service and their pricing models</h2>

<p>The private security sector has several subsectors with very different pricing logic. Before talking about how to quote, it's important to understand which one you operate in or which services you combine.</p>

<h3>Manned guarding and security officers</h3>

<p>It's the most labour-intensive service. The price is heavily determined by wage costs (which set minimum labour costs by role and shift). The room for manoeuvre is in operational efficiency, staff rotation and the complementary services you add.</p>

<p>The usual pricing model is <strong>billing per hour of service</strong>: the client pays a price per officer-hour (or post), which includes the worker's cost plus the company's margin. Contracts are usually monthly with a guaranteed minimum number of hours.</p>

<p>Indicative market price ranges:</p>
<ul>
<li>Security officer (daytime, weekdays): £14-20/hour</li>
<li>Security officer (night shift or weekend): £18-26/hour</li>
<li>Officer with specialist training (close protection, cash transport): £22-35/hour</li>
<li>Supervisor or security manager: £28-45/hour</li>
</ul>

<p>These rates vary significantly by region (large cities have higher labour costs), the size of the contract (more hours, lower unit price) and the specific licensing of the staff.</p>

<h3>Alarm system installation</h3>

<p>Here the pricing model has two components: the installation cost (one-off payment) and the maintenance and monitoring fee (recurring monthly).</p>

<p>The most common mistake is focusing only on the installation price and using monitoring as a secondary argument, when in reality it's the higher-value component long-term: it's what turns your company into a recurring security provider, not a one-off installer.</p>

<p>Usual ranges:</p>
<ul>
<li>Basic installation for a home or small premises (panel + 4-6 detectors + keypad): £400-900</li>
<li>Medium installation for an SME or commercial premises (panel + 8-15 detectors + dual communicator): £900-2,500</li>
<li>Complex installation (industrial unit, multi-zone, integration with access control): £2,500-8,000 or more</li>
<li>Basic monitoring fee: £15-35/month</li>
<li>Monitoring with keyholding/guard response: £35-80/month</li>
<li>Annual maintenance (equipment inspection, updates): £80-200/year depending on the installation</li>
</ul>

<h3>CCTV and video surveillance</h3>

<p>The price depends fundamentally on three factors: number of cameras, resolution and storage capacity, and whether the installation includes remote management or cloud access.</p>

<p>With the proliferation of low-cost IP cameras, the client tends to undervalue the professional installation service. Your proposal has to make clear what differentiates a well-installed system (with structured cabling, optimal angles, secure storage and GDPR compliance) from a camera anyone can buy online.</p>

<p>Indicative ranges:</p>
<ul>
<li>Domestic or small premises system (4 HD cameras, local NVR): £600-1,500 installed</li>
<li>SME system (8-16 4K IP cameras, NVR with disk, remote access): £1,500-5,000 installed</li>
<li>Enterprise system (more than 16 cameras, centralised management, integration with other systems): from £5,000</li>
<li>Cloud storage: £10-30/camera/month depending on video retention</li>
</ul>

<h3>Access control</h3>

<p>It's one of the fastest-growing segments in the sector, driven by the digitalisation of businesses and security requirements in industrial facilities. The price combines hardware (readers, turnstiles, barriers, electronic locks) with management software and the installation.</p>

<p>Typical ranges:</p>
<ul>
<li>Basic access control for one door (card reader + magnetic lock + basic software): £500-1,200</li>
<li>System for an office building (5-10 doors, centralised management, HR integration): £3,000-12,000</li>
<li>Industrial system (perimeter access, turnstiles, video integration): from £10,000</li>
<li>Maintenance and software licence: £200-500/year for small installations, more for large ones</li>
</ul>

<h3>Event security</h3>

<p>A special segment with its own logic: the service is one-off, the risk is high and the staff's licensing is critical (regulation is strict about the training required for event stewards and officers).</p>

<p>The price is usually calculated per officer/hour with a minimum number of hours, plus a surcharge for event complexity (capacity, alcohol sales, incident history). Ranges run from £18 to £40/hour depending on the staff profile and the type of event.</p>

<h2>What a professional security quote must include</h2>

<p>A security quote that loses business looks like this: "Security officer, daytime shift: £X/hour. VAT not included." The client doesn't know what they're buying, and can only compare that number with a competitor's.</p>

<p>A security quote that wins contracts has seven components that go beyond the price:</p>

<h3>1. A diagnosis of the client's risk</h3>

<p>Before giving a price, show you've analysed the client's situation. What type of facility is it? What are the assets to protect? What's the incident history in the area? Do they have specific legal security obligations (regulated activities, storage of hazardous substances, access by minors)?</p>

<p>A paragraph analysing the situation at the start of the proposal shows you're not sending a generic quote: you're proposing a specific solution. That justifies the price before the client sees it.</p>

<h3>2. Detailed service description</h3>

<p>Not "perimeter guarding". Specify: number of patrols per shift, incident protocol, response times of the Alarm Receiving Centre (ARC), staff insurance cover, the assigned officer's specific training, the communication system with the client.</p>

<p>The more specific you are, the harder a direct comparison with a competitor who just puts "security officer" becomes. And the more the client perceives they're buying quality.</p>

<h3>3. Explicit regulatory compliance</h3>

<p>Security regulation sets very concrete requirements on staff licensing, company authorisation, insurance cover and other aspects. Many clients don't know this regulation exists, nor do they know whether their current provider complies with it.</p>

<p>Including in your quote a section on your company's regulatory compliance (SIA licensing of officers, company approval/accreditation, public liability insurance, staff training) isn't bureaucracy: it's a real competitive advantage. If the client doesn't see it in your proposal, they assume all providers are the same. If they see it, they understand they're not.</p>

<h3>4. A transparent price breakdown</h3>

<p>For guarding services, show the breakdown: estimated labour cost of the post, coordination and supervision cost, insurance, company margin. You don't have to give all the internal detail, but you should show the price has a logic.</p>

<p>For installations, always break down equipment and labour separately. The client who understands that 40% of the price is equipment and 60% is installation and configuration has far more context to evaluate the proposal than the one who only sees a total.</p>

<h3>5. Service options (not just one option)</h3>

<p>Presenting a single proposal puts the client in "accept or reject" mode. Presenting two or three options puts them in "which is most suitable for me?" mode.</p>

<p>Example for an alarm installation at an SME:</p>
<ul>
<li><strong>Basic:</strong> panel with GSM communicator, six motion detectors, external sounder, no monitoring. Ideal for clients who already have insurance and just need deterrence.</li>
<li><strong>Standard:</strong> all of the above plus ARC connection with a 20-minute guard response. Low monthly price but with the reassurance of professional response.</li>
<li><strong>Premium:</strong> complete system with CCTV integration, remote access from a smartphone, annual maintenance included and a guaranteed 15-minute response time.</li>
</ul>

<p>With this structure, the client doesn't evaluate whether your price is expensive. They evaluate what level of protection they actually need.</p>

<h3>6. Contract terms made visible</h3>

<p>Minimum contract duration, cancellation terms, billing frequency, price-review clauses, responsibilities in the event of service failure. The client who discovers these terms after signing feels misled. The client who knows them before signing trusts you because you're transparent.</p>

<h3>7. References or similar cases</h3>

<p>If you've protected similar facilities, mentioning it (without breaching the previous client's confidentiality) is a powerful sales argument. "We manage security for three logistics warehouses in the same industrial estate" or "we installed equivalent systems in twelve premises in the same sector" conveys specialisation without embellishment.</p>

<h2>How to calculate the price of a guarding contract without losing money</h2>

<p>The most common mistake in security companies starting out — and also in some with years of experience — is calculating the price of the guarding service without including all the real costs.</p>

<p>These are the components that must go into the calculation:</p>

<h3>Direct labour costs</h3>

<p>The officer's wage. Add: employer's National Insurance and pension contributions on top of the gross wage, holidays and rest days (the officer doesn't work 365 days a year, but the post must be covered), night or bank-holiday premiums depending on the shift, and the cost of covering absences.</p>

<p>A 24-hours/day, 7-days/week post doesn't need one officer: it needs between 4.5 and 5 full-time-equivalent officers when shifts, rest periods and cover are calculated correctly.</p>

<h3>Coordination and supervision costs</h3>

<p>The supervisor's time visiting the post, the cost of the coordination centre, the electronic patrol system, the contract manager. These costs are invisible in the proposal but very real in operations.</p>

<h3>Equipment and uniform costs</h3>

<p>The officer's uniform, communication equipment, torch, defensive equipment if applicable. On posts with a patrol vehicle, the cost of the vehicle and fuel.</p>

<h3>Public liability insurance</h3>

<p>Essential. The cost varies depending on the type of service and the sum insured, but it should be included in the service price, not treated as a separate expense.</p>

<h3>Company margin</h3>

<p>After covering all the above costs, the net margin on guarding contracts for medium-sized companies is usually between 10% and 20%. On system installations the margin can be higher (25-40%) given there's more of a technical-knowledge component and less mass labour.</p>

<p>A quoting tool that automatically calculates these costs and applies the right margin can prevent costly mistakes. With <a href="/registro?lang=en">DealForge</a> you can create quote templates specific to each type of security service, with the parametric costs already configured, so every new proposal is quick and doesn't require recalculating from scratch.</p>

<h2>Common mistakes when quoting private security</h2>

<h3>Lowering the price to win the contract without recalculating costs</h3>

<p>It's the most common trap. The client asks for a discount, you grant it without checking whether it's still profitable, and you end up running a contract that loses money. In security, where labour costs are fixed and don't forgive, a badly calculated price isn't offset by efficiency: it eats your margin directly.</p>

<p>Before granting any discount, calculate what margin you have left. If the price the client wants doesn't cover the real costs, better not to sign than to sign at a loss.</p>

<h3>Not updating contracts when wages rise</h3>

<p>Sector wages rise practically every year. If you have contracts signed at a fixed price with no review clause linked to inflation or wage agreements, you're taking on the risk of a cost increase you can't pass on to the client.</p>

<p>Always include in the contract an annual price-review clause linked to inflation or sector wage rises. It's a standard clause in the sector and the client who knows the market accepts it without a problem.</p>

<h3>Quoting installations without a site visit</h3>

<p>Giving a price for a CCTV, alarm or access-control installation without physically seeing the site is a mistake that ends up costing dearly. Surprises in the installation phase — complicated cabling, the need for building work, longer distances than expected, incompatibilities with existing systems — can double or triple the estimated work time.</p>

<p>Always do a prior technical site visit. If the client won't see you before having the quote, give an estimated range and make clear the final price requires a visit. A client who won't invest half an hour in a technical visit probably won't be easy during the installation either.</p>

<h3>Not including maintenance in the initial proposal</h3>

<p>Security systems need maintenance. Regulation requires periodic inspections of installations connected to an ARC. If you don't include maintenance in your initial proposal, the client sees it as an unexpected expense when it arises, and that creates friction.</p>

<p>Always include the maintenance contract option from the first proposal. It's a source of recurring revenue and builds client loyalty because you become the technical point of reference for their installation.</p>

<h3>Sending the quote by email with no follow-up</h3>

<p>A quote sent by email and forgotten is a lost quote. The client receives it, leaves it for later, compares it with others and makes the decision without you having had the chance to resolve their doubts.</p>

<p>Establish a follow-up protocol: three days after sending the proposal, call or write to confirm they've received it and whether they have questions. Seven days later, if there's no reply, a second brief contact. Beyond that, the client has made their decision.</p>

<p>With tools like <a href="/registro?lang=en">DealForge</a> you can see in real time when the client has opened your proposal, which gives you the exact moment to follow up: not blindly three days later, but when the client has just read it and has it fresh in mind.</p>

<h2>How to differentiate in a market with a lot of price competition</h2>

<p>The private security market has many companies competing on price. If you enter that war, you'll win some contracts at margins that won't sustain your business long-term.</p>

<p>These are the differentiation levers that justify a higher price:</p>

<h3>Sector specialisation</h3>

<p>Protecting a school isn't the same as protecting a jeweller, a hazardous-materials warehouse or a data centre. Each sector has specific risks, its own regulatory requirements and different officer-profile needs. A company that says "we specialise in security for the hospitality sector" or "we've been in industrial security for fifteen years" conveys much more trust than a generalist company.</p>

<p>If you have experience in a sector, communicate it actively. In your proposal, on your website, in your references. Specialisation is the most powerful argument against price pressure.</p>

<h3>Verifiable response time</h3>

<p>Any company can promise "rapid response". Few can show real data on the average response time of their ARC. If you have that data and it's good, include it in your proposals. "Our ARC's average response time: 8 minutes" is a sales argument the competitor who doesn't measure can't rebut.</p>

<h3>Technology and integration</h3>

<p>The client who wants an officer sitting in a hut has a last-century security mindset. The client who understands security as an integrated system — intelligent video surveillance, digital access control, real-time alerts to their smartphone — is willing to pay more for a more complete solution.</p>

<p>If you offer system integration (alarm + CCTV + access control managed from a single platform), that proposal has a clear differential value over someone who only installs components separately.</p>

<h3>Transparency and compliance</h3>

<p>The client who has had a problem with an unlicensed security company or unlicensed staff knows what that mistake costs. Proactively showing your company accreditation, your SIA-licensed staff, your insurance cover and your staff's certifications is a real differentiation, not a bureaucratic one.</p>

<h2>GDPR and security: a consideration that affects your proposals</h2>

<p>Any video surveillance or access-control service that involves processing personal data (images, access logs) is subject to the UK GDPR and the Data Protection Act. This has direct implications for your quotes.</p>

<p>As installer or service provider, you are in many cases a processor of the data your system captures. The contract with the client should include the data-processing clauses the GDPR requires, and the client must meet their obligations as data controller: informing employees or visitors about the surveillance, registering the system in their record of processing activities, and limiting image retention to the legal period.</p>

<p>Including in your proposal a section on the GDPR compliance of the system you're going to install isn't just a legal matter: it's another element of differentiation. Many installers don't mention it. Clients who have had problems with the ICO know what it costs to ignore this part.</p>

<h2>The proposal that closes contracts: a five-part structure</h2>

<p>After seeing all the components above, this is the structure that works for security proposals that get accepted:</p>

<ol>
<li><strong>Analysis of the client's situation</strong> (half a page): what you've observed, what risks their facility has, what regulation applies to them. Show you've done your homework before sending the price.</li>
<li><strong>Proposed solution</strong> (one or two pages): a detailed description of the service, equipment or staff included, protocols, response times, integrations. Specific, not generic.</li>
<li><strong>Service options</strong> (if applicable): basic, standard, premium. Lets the client choose rather than reject.</li>
<li><strong>Price and terms</strong>: a clear breakdown, contract duration, review terms, payment method. No small print appearing later.</li>
<li><strong>About the company</strong> (half a page): accreditation, years of experience, sector references, staff certifications. It's not the most important part, but it seals the trust.</li>
</ol>

<p>This structure can be created in minutes with custom templates. If you send ten or twenty proposals a month, having that template set up in a tool like <a href="/registro?lang=en">DealForge</a> and being able to generate each proposal in five minutes by ticking the services that apply to the specific client completely changes the efficiency of your sales process.</p>

<h2>What to do when the client just wants the lowest price</h2>

<p>It's going to happen. The client who calls with "give me the cheapest price for a guard" isn't looking for security: they're looking to tick a box. That client is free to do that, but they don't have to be your client if they don't fit your value proposition.</p>

<p>Before entering that price war, try to reframe the conversation:</p>

<ul>
<li>"What exactly are you worried about protecting?" — if the answer is specific, there's room for a real value proposition.</li>
<li>"Have you had incidents in the past?" — a client who has already suffered a break-in understands the value of security much better.</li>
<li>"Do you have any legal or insurance requirement?" — many sectors have security obligations that aren't optional.</li>
</ul>

<p>If after those questions the client still focuses only on the lowest price, you can give them your most basic option with its limitations clearly explained, or tell them directly that you're not the most suitable company for what they're looking for. Losing that client isn't a loss: it's a saving of time and problems.</p>

<h2>Conclusion: quote like the security company you want to be</h2>

<p>The security companies that grow sustainably aren't necessarily the cheapest. They're the ones that get the client to understand what they're buying, trust they'll deliver what they promise and feel the price is justified by the value received.</p>

<p>The key points to put into practice:</p>

<ul>
<li>Always calculate the real costs before giving a price, including all labour and structure components</li>
<li>Include in your proposals an analysis of the client's risk, not just the service price</li>
<li>Proactively show your regulatory compliance: licensing, insurance, staff training</li>
<li>Always present at least two service options so the client chooses, rather than rejects</li>
<li>Include an annual price-review clause in all guarding contracts</li>
<li>Actively follow up on the proposals you send: the one who doesn't chase, loses</li>
<li>Differentiate on sector specialisation and verifiable response time, not on price</li>
</ul>

<p>The client who understands the value of security — and there are many — is willing to pay for a company that conveys trust from the first document they receive. Your pricing proposal is that first document.</p>

<p><strong>Want to create professional security proposals in minutes, with electronic signature and open-tracking included?</strong> Try <a href="/registro?lang=en">DealForge</a> free and stop losing contracts over how you present your price, not over what you charge.</p>`,
    autor: "DealForge",
    categoria: "guias",
    tags: ["security quotes", "security company quote", "manned guarding prices", "alarm installation quote", "private security", "small business", "security contracts"],
    publishedAt: "2026-06-15T13:00:00.000Z",
    metaTitulo: "Security company quotes: how to price and win contracts — DealForge",
    metaDescripcion: "How to structure security service quotes: manned guarding, alarms, CCTV and access control. With real market price ranges and mistakes to avoid.",
    metaKeywords: "security company quotes, manned guarding quote, how to quote private security, security officer price, alarm installation price, CCTV quote, access control quote, private security price",
  },
];

export function getBlogPostEn(slug: string): BlogPostEn | undefined {
  return blogPostsEn.find((p) => p.slug === slug);
}
