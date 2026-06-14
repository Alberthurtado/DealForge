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
];

export function getBlogPostEn(slug: string): BlogPostEn | undefined {
  return blogPostsEn.find((p) => p.slug === slug);
}
