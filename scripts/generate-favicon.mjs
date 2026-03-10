import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const svgBuffer = readFileSync(join(root, "public", "logo.svg"));

// Generate PNG at multiple sizes for best quality
const sizes = [16, 32, 48, 64, 128, 180, 192, 512];

async function generateFavicons() {
  // Generate individual PNGs
  for (const size of sizes) {
    const png = await sharp(svgBuffer, { density: 300 })
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    writeFileSync(join(root, "public", `icon-${size}.png`), png);
    console.log(`Generated icon-${size}.png`);
  }

  // Generate apple-touch-icon (180x180)
  const appleIcon = await sharp(svgBuffer, { density: 300 })
    .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  writeFileSync(join(root, "public", "apple-touch-icon.png"), appleIcon);
  console.log("Generated apple-touch-icon.png");

  // Generate favicon.ico (multi-size ICO)
  // ICO format: we'll create a simple ICO with 16, 32, and 48px images
  const ico16 = await sharp(svgBuffer, { density: 300 })
    .resize(16, 16, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const ico32 = await sharp(svgBuffer, { density: 300 })
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const ico48 = await sharp(svgBuffer, { density: 300 })
    .resize(48, 48, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const ico64 = await sharp(svgBuffer, { density: 300 })
    .resize(64, 64, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Build ICO file manually (PNG-inside-ICO format)
  const images = [ico16, ico32, ico48, ico64];
  const imageSizes = [16, 32, 48, 64];

  // ICO header: 6 bytes
  const headerSize = 6;
  const entrySize = 16; // 16 bytes per directory entry
  const dirSize = entrySize * images.length;
  const dataOffset = headerSize + dirSize;

  let totalSize = dataOffset;
  for (const img of images) totalSize += img.length;

  const ico = Buffer.alloc(totalSize);

  // Header
  ico.writeUInt16LE(0, 0);      // Reserved
  ico.writeUInt16LE(1, 2);      // Type: 1 = ICO
  ico.writeUInt16LE(images.length, 4); // Number of images

  // Directory entries
  let offset = dataOffset;
  for (let i = 0; i < images.length; i++) {
    const entryOffset = headerSize + i * entrySize;
    const size = imageSizes[i];

    ico.writeUInt8(size < 256 ? size : 0, entryOffset);      // Width
    ico.writeUInt8(size < 256 ? size : 0, entryOffset + 1);  // Height
    ico.writeUInt8(0, entryOffset + 2);                        // Color palette
    ico.writeUInt8(0, entryOffset + 3);                        // Reserved
    ico.writeUInt16LE(1, entryOffset + 4);                     // Color planes
    ico.writeUInt16LE(32, entryOffset + 6);                    // Bits per pixel
    ico.writeUInt32LE(images[i].length, entryOffset + 8);      // Image size
    ico.writeUInt32LE(offset, entryOffset + 12);               // Offset to image data

    offset += images[i].length;
  }

  // Image data
  offset = dataOffset;
  for (const img of images) {
    img.copy(ico, offset);
    offset += img.length;
  }

  writeFileSync(join(root, "public", "favicon.ico"), ico);
  console.log("Generated favicon.ico (16, 32, 48, 64px)");

  console.log("\nAll favicons generated successfully!");
}

generateFavicons().catch(console.error);
