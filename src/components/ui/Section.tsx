import type { ReactNode } from "react";
import { classNames } from "@/lib/classNames";
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
  ariaLabelledby?: string;
  children: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  className,
  centered = true,
  ariaLabelledby,
  children,
}: SectionProps) {
  const labelledBy =
    ariaLabelledby ?? (title && id ? `${id}-title` : undefined);
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={classNames(
        "scroll-mt-[var(--header-offset)] py-20 sm:py-24 lg:py-28",
        className
      )}
    >
      <ScrollFade>
        <Container>
          {(eyebrow || title || description) && (
            <Reveal
              className={classNames("mb-12 max-w-2xl", centered && "mx-auto text-center")}
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
