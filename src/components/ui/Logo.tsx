import { cn } from "@/lib/cn";
import { site } from "@/data/site";
import logoUrl from "@/assets/runtosolve-logo.png";

type LogoProps = {
  className?: string;
  light?: boolean;
  withTagline?: boolean;
};

/** Brand mark — company size: 16.5rem × 3.75rem on desktop. */
export function Logo({ className, light = false, withTagline = false }: LogoProps) {
  return (
    <span className={cn("inline-flex flex-col", className)}>
      <img
        src={logoUrl}
        alt={`${site.legalName} logo`}
        width={264}
        height={60}
        className={cn(
          "h-[2.75rem] w-auto max-w-[12rem] select-none object-contain object-left sm:h-[3.25rem] sm:max-w-[14.5rem] lg:h-[3rem] lg:max-w-[13rem] xl:h-[3.75rem] xl:w-[16.5rem] xl:max-w-none",
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
