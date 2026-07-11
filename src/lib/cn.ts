/**
 * Tiny class-name combiner. Filters out falsy values and joins with a space.
 * Keeps components dependency-free while allowing conditional classes.
 */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}
