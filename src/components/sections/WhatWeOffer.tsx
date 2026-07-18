import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { offerings } from "@/data/site";
import type { Offering, OfferingTheme } from "@/data/site";
import { navigateToSection } from "@/lib/scrollToSection";
import { cn } from "@/lib/cn";

const offeringThemes: Record<
  OfferingTheme,
  {
    icon: string;
    iconHover: string;
    bar: string;
    cardGlow: string;
    dialogBar: string;
    dialogGlow: string;
    dialogIcon: string;
    pill: string;
  }
> = {
  software: {
    icon: "border border-brand-500/40 bg-brand-500/10 text-brand-600 ring-1 ring-inset ring-brand-500/15 dark:border-brand-400/45 dark:bg-brand-500/15 dark:text-brand-300",
    iconHover:
      "group-hover:scale-110 group-hover:border-brand-500 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-[0_8px_30px_-8px_rgba(45,93,168,0.55)] group-hover:ring-brand-400/40",
    bar: "group-hover:from-brand-500 group-hover:to-brand-400",
    cardGlow: "dark:group-hover:border-brand-400/35",
    dialogBar: "from-brand-600 via-brand-500 to-brand-400",
    dialogGlow: "bg-brand-500/20",
    dialogIcon: "from-brand-600 to-brand-800",
    pill: "border-brand-500/25 bg-brand-500/10 text-brand-700 dark:text-brand-200",
  },
  simulation: {
    icon: "border border-accent-500/40 bg-accent-500/10 text-accent-600 ring-1 ring-inset ring-accent-500/15 dark:border-accent-400/45 dark:bg-accent-500/15 dark:text-accent-300",
    iconHover:
      "group-hover:scale-110 group-hover:border-accent-500 group-hover:bg-accent-500 group-hover:text-white group-hover:shadow-glow group-hover:ring-accent-400/40",
    bar: "group-hover:from-accent-500 group-hover:to-accent-300",
    cardGlow: "dark:group-hover:border-accent-500/35",
    dialogBar: "from-accent-600 via-accent-500 to-accent-300",
    dialogGlow: "bg-accent-500/20",
    dialogIcon: "from-accent-500 to-accent-700",
    pill: "border-accent-500/25 bg-accent-500/10 text-accent-700 dark:text-accent-200",
  },
  design: {
    icon: "border border-brand-500/35 bg-gradient-to-br from-brand-500/10 to-accent-500/10 text-brand-600 ring-1 ring-inset ring-brand-500/10 dark:border-brand-400/35 dark:text-brand-200",
    iconHover:
      "group-hover:scale-110 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-accent-500 group-hover:text-white group-hover:shadow-glow group-hover:ring-accent-400/30",
    bar: "group-hover:from-brand-500 group-hover:via-brand-400 group-hover:to-accent-500",
    cardGlow: "dark:group-hover:border-brand-400/30",
    dialogBar: "from-brand-600 via-brand-500 to-accent-500",
    dialogGlow: "bg-brand-500/15",
    dialogIcon: "from-brand-600 to-accent-600",
    pill: "border-line bg-surface-2 text-body",
  },
  research: {
    icon: "border border-brand-800/25 bg-brand-900/5 text-brand-800 ring-1 ring-inset ring-brand-900/10 dark:border-white/25 dark:bg-white/10 dark:text-brand-100",
    iconHover:
      "group-hover:scale-110 group-hover:border-brand-900 group-hover:bg-brand-900 group-hover:text-white group-hover:ring-brand-700/40 dark:group-hover:border-brand-500 dark:group-hover:bg-brand-700",
    bar: "group-hover:from-brand-800 group-hover:to-accent-500",
    cardGlow: "dark:group-hover:border-brand-300/25",
    dialogBar: "from-brand-900 via-brand-700 to-accent-500",
    dialogGlow: "bg-brand-700/20",
    dialogIcon: "from-brand-800 to-brand-950",
    pill: "border-brand-800/15 bg-brand-900/5 text-brand-800 dark:border-white/15 dark:bg-white/10 dark:text-brand-100",
  },
};

export function WhatWeOffer() {
  const [activeOffering, setActiveOffering] = useState<Offering | null>(null);

  return (
    <>
      <Section
        id="what-we-offer"
        eyebrow="What We Offer"
        title="Dedicated engineering solutions"
        description="Software, simulation, design, and research — the four pillars we bring to every steel construction challenge."
      >
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {offerings.map((offering, i) => {
            const theme = offeringThemes[offering.theme];
            const Icon = offering.icon;
            const dialogId = `offering-dialog-${offering.theme}`;

            return (
              <Reveal as="li" key={offering.title} delay={i * 0.08} className="h-full">
                <article className="h-full" aria-labelledby={`offering-${offering.theme}-title`}>
                  <Card prominent className={cn("flex h-full flex-col p-6 sm:p-7", theme.cardGlow)}>
                    <span
                      className={cn(
                        "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300",
                        theme.icon,
                        theme.iconHover
                      )}
                    >
                      <Icon size={24} aria-hidden="true" focusable="false" />
                    </span>

                    <p className="mt-5 text-[11px] font-semibold uppercase leading-snug tracking-[0.12em] text-muted transition-colors duration-300 group-hover:text-accent-600 dark:group-hover:text-accent-300">
                      {offering.tagline}
                    </p>

                    <h3
                      id={`offering-${offering.theme}-title`}
                      className="mt-2 text-lg font-semibold text-heading transition-colors duration-300 group-hover:text-brand-600 sm:text-xl dark:group-hover:text-brand-200"
                    >
                      {offering.title}
                    </h3>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-body">
                      {offering.description}
                    </p>

                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-5 block h-1 w-10 rounded-full bg-line transition-all duration-300 group-hover:w-full group-hover:bg-gradient-to-r",
                        theme.bar
                      )}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="md"
                      className="mt-5 w-full justify-between px-4 opacity-90 transition-all duration-300 group-hover:border-accent-500/30 group-hover:bg-accent-500/10 group-hover:text-accent-600 group-hover:opacity-100 dark:group-hover:text-accent-300"
                      aria-haspopup="dialog"
                      aria-expanded={activeOffering?.theme === offering.theme}
                      aria-controls={dialogId}
                      aria-label={`Learn more about ${offering.title}`}
                      onClick={() => setActiveOffering(offering)}
                    >
                      <span>Explore {offering.title.toLowerCase()}</span>
                      <ArrowRight
                        size={16}
                        aria-hidden="true"
                        className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </Button>
                  </Card>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      {activeOffering && (
        <OfferingDialog
          offering={activeOffering}
          dialogId={`offering-dialog-${activeOffering.theme}`}
          onClose={() => setActiveOffering(null)}
        />
      )}
    </>
  );
}

function OfferingDialog({
  offering,
  dialogId,
  onClose,
}: {
  offering: Offering;
  dialogId: string;
  onClose: () => void;
}) {
  const theme = offeringThemes[offering.theme];
  const Icon = offering.icon;

  const handleGetInTouch = () => {
    navigateToSection("#contact", onClose);
  };

  return (
    <Dialog
      open
      onClose={onClose}
      title={offering.title}
      subtitle={offering.tagline}
      description={offering.description}
      accentBarClassName={theme.dialogBar}
      glowClassName={theme.dialogGlow}
      className="max-w-xl"
      id={dialogId}
    >
      <div
        aria-hidden="true"
        className={cn(
          "mt-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br text-white shadow-glow",
          theme.dialogIcon
        )}
      >
        <Icon size={28} aria-hidden="true" focusable="false" />
      </div>

      <p className="mt-5 text-base leading-relaxed text-body">{offering.details}</p>

      <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted">
        Example work
      </h3>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${offering.title} examples`}>
        {offering.examples.map((example) => (
          <li
            key={example}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium",
              theme.pill
            )}
          >
            {example}
          </li>
        ))}
      </ul>

      <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted">
        What we deliver
      </h3>
      <ul className="mt-3 space-y-2.5">
        {offering.highlights.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-body">
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-accent-500"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button type="button" variant="primary" onClick={handleGetInTouch}>
          Get in touch
        </Button>
        <Button type="button" variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>
    </Dialog>
  );
}
