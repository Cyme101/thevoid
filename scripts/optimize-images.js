// Converts the originals in images-src/ into responsive AVIF + WebP files
// in public/images/ and writes their dimensions to src/images.json.
// Run with `npm run images` after adding or replacing an original.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "images-src");
const outDir = path.join(root, "public", "images");
const manifestPath = path.join(root, "src", "images.json");

const TARGET_WIDTHS = [400, 800, 1200, 1600];
const DEFAULT_MAX_WIDTH = 1200;
// Full-screen backgrounds are the only images shown wider than 1200px.
const MAX_WIDTH = {
  "login-background": 1600,
  "register-background": 1600,
};
const AVIF = { quality: 55, effort: 6 };
const WEBP = { quality: 78, effort: 6 };

// Target widths smaller than the original, plus the original width itself
// (capped at the image's max width) so we never upscale.
const widthsFor = (name, originalWidth) => {
  const largest = Math.min(originalWidth, MAX_WIDTH[name] ?? DEFAULT_MAX_WIDTH);
  const widths = TARGET_WIDTHS.filter((w) => w < largest * 0.9);
  return [...widths, largest];
};

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const manifest = {};
let totalIn = 0;
let totalOut = 0;

const files = fs
  .readdirSync(srcDir)
  .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
  .sort();

for (const file of files) {
  const name = path.parse(file).name;
  const input = path.join(srcDir, file);
  const { width, height } = await sharp(input).metadata();
  const widths = widthsFor(name, width);

  for (const w of widths) {
    const resized = sharp(input).resize({ width: w });
    const avif = await resized.clone().avif(AVIF).toBuffer();
    const webp = await resized.clone().webp(WEBP).toBuffer();
    fs.writeFileSync(path.join(outDir, `${name}-${w}.avif`), avif);
    fs.writeFileSync(path.join(outDir, `${name}-${w}.webp`), webp);
    totalOut += avif.length + webp.length;
  }

  const largest = widths.at(-1);
  manifest[name] = {
    width: largest,
    height: Math.round((height * largest) / width),
    widths,
  };
  totalIn += fs.statSync(input).size;
  console.log(`${name}: ${widths.join(", ")}`);
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;
console.log(
  `\n${files.length} images: originals ${kb(totalIn)} -> all variants ${kb(totalOut)}`
);
