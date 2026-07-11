import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { hero, site } from "@/data/site";
import { useScrolled } from "@/hooks/useScrolled";
import { handleAnchorClick } from "@/lib/scrollToSection";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const scrolled = useScrolled(80);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Full-bleed animated background slideshow (Ken Burns + parallax). */}
      <HeroBackground />
      {/* Layered overlays: darken left for text, deepen bottom, add brand tint.
         Overlays are theme-aware — lighter/airier in light mode, deeper in dark
         mode — so toggling the theme is clearly visible even at the very top.
         The left column stays strong in both themes to keep text WCAG-legible. */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-950/90 via-brand-950/55 to-brand-950/10 dark:from-brand-950/97 dark:via-brand-950/78 dark:to-brand-950/32" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-brand-950/85 via-transparent to-brand-950/25 dark:from-brand-950 dark:via-brand-950/15 dark:to-brand-950/45" />

      {/* Decorative animated accent glow (uniqueness). */}
      <div
        aria-hidden="true"
        className="absolute -right-32 top-16 z-0 h-[28rem] w-[28rem] rounded-full bg-accent-500/20 blur-[120px]"
      />

      <Container className="relative z-10 pt-28 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-200 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
            </span>
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-extrabold leading-[1.06] text-white text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] sm:text-5xl lg:text-[3.75rem]"
          >
            We equip you with the{" "}
            <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
              engineering insight
            </span>{" "}
            to perform and grow.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100 drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)] sm:text-xl"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <LinkButton
              href={hero.primaryCta.href}
              size="lg"
              onClick={(e) => handleAnchorClick(e, hero.primaryCta.href)}
            >
              {hero.primaryCta.label}
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </LinkButton>
            <LinkButton
              href={hero.secondaryCta.href}
              target="_blank"
              rel="noreferrer"
              variant="glass"
              size="lg"
            >
              <FileText size={18} />
              {hero.secondaryCta.label}
            </LinkButton>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-8"
          >
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </dd>
                <p className="mt-1 text-xs uppercase tracking-wider text-brand-200">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Floating glass emblem — unique premium accent (desktop only). */}
        <motion.aside
          aria-hidden="true"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="pointer-events-none absolute right-8 top-1/4 hidden -translate-y-1/4 lg:block"
        >
          <div className="animate-float rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <RingGauge />
              <div>
                <p className="font-display text-3xl font-bold text-white">2004</p>
                <p className="text-xs uppercase tracking-widest text-brand-200">
                  Ph.D. thin-walled
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-2.5">
              {[
                { label: "Simulation", w: "92%" },
                { label: "Automation", w: "84%" },
                { label: "Research", w: "97%" },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="mb-1 flex justify-between text-[10px] uppercase tracking-wider text-brand-200">
                    <span>{bar.label}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: bar.w }}
                      transition={{ delay: 1.2, duration: 1.1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-accent-400 to-accent-600"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-center font-display text-sm font-semibold tracking-wide text-white/90">
              {site.tagline}
            </p>
          </div>
        </motion.aside>
      </Container>

      {/* Refined scroll cue — fades out once the user scrolls. */}
      <motion.a
        href="#what-we-offer"
        aria-label="Scroll to content"
        onClick={(e) => handleAnchorClick(e, "#what-we-offer")}
        animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? 10 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors hover:text-white sm:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
          Scroll
        </span>
        <span className="relative flex h-9 w-5 items-start justify-center rounded-full border-2 border-white/60 p-1">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-white"
          />
        </span>
      </motion.a>
    </section>
  );
}

/** Small animated concentric ring gauge for the hero emblem. */
function RingGauge() {
  return (
    <div className="relative grid h-14 w-14 place-items-center">
      <svg viewBox="0 0 48 48" className="h-14 w-14 -rotate-90">
        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="#f97316"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 20}
          initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 20 * 0.12 }}
          transition={{ delay: 1, duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute font-display text-xs font-bold text-white">88</span>
    </div>
  );
}
