import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

// Remote chromium binary for Vercel serverless (avoids 50MB bundle limit)
const CHROMIUM_PACK_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.tar";

export async function generateCotizacionPdf(
  baseUrl: string,
  cotizacionId: string
): Promise<Buffer> {
  const executablePath = await chromium.executablePath(CHROMIUM_PACK_URL);

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
