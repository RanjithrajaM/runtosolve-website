#!/usr/bin/env node
/**
 * Builds responsive hero images for the web.
 *
 * - AVIF primary (small, excellent quality — not "heavier")
 * - WebP fallback for older browsers (Safari < 16, etc.)
 * - Widths: 768 (mobile), 1280 (tablet/laptop), 1920 (desktop)
 * - No 4K — little gain for a CSS object-cover hero
 *
 * Sources: "RunToSolve website pictures" + "iloveimg-converted"
 * Output:  src/assets/hero/<id>-<width>.avif|.webp
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_MAIN = path.join(ROOT, "RunToSolve website pictures");
const SRC_CONVERTED = path.join(ROOT, "iloveimg-converted");
const OUT = path.join(ROOT, "src", "assets", "hero");

const WIDTHS = [768, 1280, 1920];
const AVIF_QUALITY = 58;
const WEBP_QUALITY = 72;

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => !f.startsWith("."));
}

function baseName(file) {
  return path.parse(file).name;
}

fs.mkdirSync(OUT, { recursive: true });
for (const existing of listFiles(OUT)) {
  fs.unlinkSync(path.join(OUT, existing));
}

/** @type {Map<string, { jpg?: string; jpgDir?: string; png?: string; pngDir?: string }>} */
const byBase = new Map();

function ingest(dir, file) {
  const ext = path.extname(file).toLowerCase();
  const base = baseName(file);
  if (!byBase.has(base)) byBase.set(base, {});
  const entry = byBase.get(base);
  if (ext === ".jpg" || ext === ".jpeg") {
    if (!entry.jpg || dir === SRC_CONVERTED) {
      entry.jpg = file;
      entry.jpgDir = dir;
    }
  } else if (ext === ".png") {
    entry.png = file;
    entry.pngDir = dir;
  }
}

for (const file of listFiles(SRC_MAIN)) ingest(SRC_MAIN, file);
for (const file of listFiles(SRC_CONVERTED)) ingest(SRC_CONVERTED, file);

const manifest = [];
let imageCount = 0;
let totalKb = 0;

console.log(
  `Building responsive AVIF + WebP (${WIDTHS.join("/")}) — images only…`
);

for (const [base, entry] of [...byBase.entries()].sort(([a], [b]) =>
  a.localeCompare(b)
)) {
  try {
    let stillSource;
    if (entry.jpg && entry.jpgDir) {
      stillSource = path.join(entry.jpgDir, entry.jpg);
    } else if (entry.png && entry.pngDir) {
      stillSource = path.join(entry.pngDir, entry.png);
    }
    if (!stillSource) continue;

    const from =
      entry.jpgDir === SRC_CONVERTED ? "iloveimg-converted" : "pictures";
    console.log(`  ${base}  [${from}]`);

    const pipeline = sharp(stillSource).rotate();
    const meta = await pipeline.clone().metadata();
    const variants = { avif: {}, webp: {} };

    for (const width of WIDTHS) {
      const resized = pipeline.clone().resize({
        width,
        withoutEnlargement: true,
        fit: "inside",
      });

      const avifName = `${base}-${width}.avif`;
      const webpName = `${base}-${width}.webp`;
      const avifPath = path.join(OUT, avifName);
      const webpPath = path.join(OUT, webpName);

      await resized
        .clone()
        .avif({ quality: AVIF_QUALITY, effort: 4 })
        .toFile(avifPath);
      await resized
        .clone()
        .webp({ quality: WEBP_QUALITY, effort: 4 })
        .toFile(webpPath);

      const avifKb = Math.round(fs.statSync(avifPath).size / 1024);
      const webpKb = Math.round(fs.statSync(webpPath).size / 1024);
      totalKb += avifKb + webpKb;
      variants.avif[width] = avifName;
      variants.webp[width] = webpName;
      console.log(`    ${width}w  avif ${avifKb}KB  webp ${webpKb}KB`);
    }

    manifest.push({
      id: base,
      width: meta.width,
      height: meta.height,
      variants,
    });
    imageCount += 1;
  } catch (err) {
    console.error(`  FAILED ${base}:`, err.message);
  }
}

fs.writeFileSync(
  path.join(OUT, "manifest.json"),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      policy:
        "responsive AVIF (primary) + WebP (fallback); widths 768/1280/1920",
      widths: WIDTHS,
      totalKb,
      items: manifest,
    },
    null,
    2
  )
);

console.log(
  `\nDone: ${imageCount} images × ${WIDTHS.length} sizes × 2 formats, ~${(totalKb / 1024).toFixed(1)} MB in src/assets/hero/`
);
