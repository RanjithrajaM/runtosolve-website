import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollFade } from "@/components/ui/ScrollFade";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  centered?: boolean;
  children: ReactNode;
};

/**
 * Standard page section with an optional heading block. Every section shares
 * consistent vertical rhythm, an accessible landmark, and a reveal animation.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  className,
  centered = true,
  children,
}: SectionProps) {
  const labelledBy = title && id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("scroll-mt-24 py-20 sm:py-24 lg:py-28", className)}
    >
      <ScrollFade>
        <Container>
          {(eyebrow || title || description) && (
            <Reveal
              className={cn("mb-12 max-w-2xl", centered && "mx-auto text-center")}
            >
              {eyebrow && <span className="eyebrow">{eyebrow}</span>}
              {title && (
                <h2
                  id={labelledBy}
                  className="mt-4 text-3xl font-bold text-balance sm:text-4xl"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  {description}
                </p>
              )}
            </Reveal>
          )}
          {children}
        </Container>
      </ScrollFade>
    </section>
  );
}
