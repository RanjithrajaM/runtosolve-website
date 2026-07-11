/**
 * Team / leadership photos.
 *
 * Drop a photo into `src/assets/team/` named after the person's `imageKey`
 * (e.g. `cris-moen.jpg`) and it is picked up automatically — no code changes.
 * If the file is missing, the UI falls back to a clean initials avatar.
 * Recommended: square (1:1), ~640px, JPEG/WebP.
 */
const modules = import.meta.glob("../assets/team/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

export const teamImages: Record<string, string> = {};
for (const key in modules) {
  const name = key.split("/").pop()!.replace(/\.[^.]+$/, "");
  teamImages[name] = modules[key] as string;
}
