import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function generateCotizacionPdf(
  baseUrl: string,
  cotizacionId: string
): Promise<Buffer> {
  // @sparticuz/chromium bundles Chromium for serverless (Vercel, AWS Lambda)
  const executablePath = await chromium.executablePath();

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: { width: 1280, height: 720 },
    executablePath,
    headless: true,
  });

  try {
    const page = await browser.newPage();

    // Navigate to the preview page
    const previewUrl = `${baseUrl}/cotizaciones/${cotizacionId}/preview`;
    await page.goto(previewUrl, { waitUntil: "networkidle0", timeout: 15000 });

    // Wait for the document to fully render (loading state disappears)
    await page.waitForSelector(".bg-white.shadow-lg", { timeout: 10000 });

    // Generate PDF with print media styles (action bar has print:hidden)
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", bottom: "0", left: "0", right: "0" },
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}
