import { cn } from "@/lib/cn";
import { site } from "@/data/site";
import logoUrl from "@/assets/runtosolve-logo.png";

type LogoProps = {
  className?: string;
  /** Force the white (inverted) logo — e.g. over the dark hero. */
  light?: boolean;
  /** Show the "Get the answer." tagline beneath the wordmark. */
  withTagline?: boolean;
};

/**
 * Brand logo lockup. Uses the official PNG and inverts it to white on dark
 * surfaces (either forced via `light` or automatically in dark theme).
 */
export function Logo({ className, light = false, withTagline = false }: LogoProps) {
  return (
    <span className={cn("inline-flex flex-col", className)}>
      <img
        src={logoUrl}
        alt={`${site.legalName} logo`}
        width={168}
        height={40}
        className={cn(
          "h-10 w-auto select-none sm:h-12",
          light ? "logo-invert" : "dark:logo-invert"
        )}
      />
      {withTagline && (
        <span
          className={cn(
            "mt-1 text-xs font-medium tracking-wide",
            light ? "text-white/70" : "text-muted"
          )}
        >
          {site.tagline}
        </span>
      )}
    </span>
  );
}
