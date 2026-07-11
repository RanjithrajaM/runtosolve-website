/**
 * Hero background images.
 *
 * Every image placed in `src/assets/hero/` is picked up automatically and
 * added to the hero slideshow (sorted by filename). To add more backgrounds,
 * just drop files like `hero-2.jpg`, `hero-3.jpg`, … into that folder — no code
 * changes required. Recommended: ~2560px wide, JPEG/WebP, landscape.
 */
const modules = import.meta.glob("../assets/hero/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

export const heroImages: string[] = Object.keys(modules)
  .sort()
  .map((key) => modules[key] as string);
