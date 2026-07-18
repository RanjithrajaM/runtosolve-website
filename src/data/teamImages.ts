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
