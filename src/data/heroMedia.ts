export const HERO_WIDTHS = [768, 1280, 1920] as const;
export type HeroWidth = (typeof HERO_WIDTHS)[number];

export type HeroImageSet = {
  id: string;
  /** AVIF srcset: "url 768w, url 1280w, …" */
  avifSrcSet: string;
  /** WebP fallback srcset for older browsers */
  webpSrcSet: string;
  /** Smallest WebP — universal <img src> fallback */
  fallbackSrc: string;
  /** Best desktop AVIF for <link rel="preload"> on the first slide */
  preloadAvif: string;
};

/**
 * Prefer darker / high-contrast construction shots first.
 * Bright / washed-out / off-brand images are excluded from the carousel
 * so hero type stays readable.
 */
const HERO_PRIORITY = [
  "IMG_2510", // light-steel framing building
  "IMG_1107", // construction + sky
  "IMG_20180802_171318", // steel lattice
  "IMG_0881",
  "IMG_4030",
  "IMG_4213",
  "IMG_3324",
  "IMG_2948",
  "IMG_2942",
  "IMG_1776",
  "IMG_1017",
  "IMG_0984",
  "IMG_0935",
  "IMG_0907",
  "IMG_0886",
  "IMG_2520",
  "IMG_2374",
  "IMG_1112",
  "IMG_20190831_100022",
  "IMG_2844",
  "IMG_2064",
  "PXL_20201003_160459004",
  "PXL_20231129_194132064",
  "PXL_20231129_202351252",
] as const;

/** Drop from hero entirely (too bright, lab clutter, or off-brand). */
const HERO_EXCLUDE = new Set([
  "IMG_1145", // bright white canopy — washes text
  "IMG_1531", // ruins — off-brand
  "IMG_2439", // bright solar farm
  "IMG_0351",
  "IMG_0356", // bright rebar close-ups
  "IMG_0313",
  "IMG_0005",
  "IMG_0466",
  "IMG_0487",
  "IMG_0769",
  "IMG_0777",
  "IMG_1348",
  "DSC00268",
  "DSCF0013",
  "DSCF0025",
  "DSCF0034",
  "DSCF0049",
  "DSCF0124",
  "IMG_20200805_160458", // bright lab interior
  "IMG-20240301-WA0007",
  "IMG-20240315-WA0001",
]);

const modules = import.meta.glob("../assets/hero/*-{768,1280,1920}.{avif,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

type Bucket = {
  avif: Partial<Record<HeroWidth, string>>;
  webp: Partial<Record<HeroWidth, string>>;
};

function parseKey(filePath: string): { id: string; width: HeroWidth; format: "avif" | "webp" } | null {
  const name = filePath.split("/").pop() ?? "";
  const match = name.match(/^(.*)-(768|1280|1920)\.(avif|webp)$/i);
  if (!match) return null;
  return {
    id: match[1],
    width: Number(match[2]) as HeroWidth,
    format: match[3].toLowerCase() as "avif" | "webp",
  };
}

function toSrcSet(map: Partial<Record<HeroWidth, string>>): string {
  return HERO_WIDTHS.filter((w) => map[w])
    .map((w) => `${map[w]} ${w}w`)
    .join(", ");
}

function sortHeroIds(ids: string[]): string[] {
  const priority = new Map<string, number>(HERO_PRIORITY.map((id, i) => [id, i]));
  return [...ids]
    .filter((id) => !HERO_EXCLUDE.has(id))
    .sort((a, b) => {
      const pa = priority.has(a) ? priority.get(a)! : 1000;
      const pb = priority.has(b) ? priority.get(b)! : 1000;
      if (pa !== pb) return pa - pb;
      return a.localeCompare(b);
    });
}

const buckets = new Map<string, Bucket>();

for (const [filePath, url] of Object.entries(modules)) {
  const parsed = parseKey(filePath);
  if (!parsed) continue;
  if (!buckets.has(parsed.id)) {
    buckets.set(parsed.id, { avif: {}, webp: {} });
  }
  const bucket = buckets.get(parsed.id)!;
  bucket[parsed.format][parsed.width] = url;
}

/** Responsive company photos for the hero (AVIF + WebP, curated order). */
export const heroImages: HeroImageSet[] = sortHeroIds([...buckets.keys()])
  .map((id) => {
    const { avif, webp } = buckets.get(id)!;
    return {
      id,
      avifSrcSet: toSrcSet(avif),
      webpSrcSet: toSrcSet(webp),
      fallbackSrc: webp[768] ?? webp[1280] ?? webp[1920] ?? "",
      preloadAvif: avif[1920] ?? avif[1280] ?? avif[768] ?? "",
    };
  })
  .filter((img) => img.fallbackSrc && (img.avifSrcSet || img.webpSrcSet));
