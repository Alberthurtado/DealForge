import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import { createHmac } from "crypto";

// Remote chromium binary for Vercel serverless (avoids 50MB bundle limit)
const CHROMIUM_PACK_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.tar";

function generatePreviewSecret(id: string): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET not set");
  return createHmac("sha256", secret).update(id).digest("hex").slice(0, 16);
}

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

    // Use public PDF preview route with HMAC secret (no auth needed)
    const secret = generatePreviewSecret(cotizacionId);
    const previewUrl = `${baseUrl}/api/pdf-preview/${cotizacionId}?secret=${secret}`;
    await page.goto(previewUrl, { waitUntil: "networkidle0", timeout: 15000 });

    // Wait for the PDF root element
    await page.waitForSelector("#pdf-root", { timeout: 10000 });

    // Generate PDF with print media styles
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
