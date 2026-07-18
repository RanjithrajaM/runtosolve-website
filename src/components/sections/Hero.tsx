import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { HeroBackground } from "@/components/sections/HeroBackground";
import { hero, site } from "@/data/site";
import { useScrolled } from "@/hooks/useScrolled";
import { handleAnchorClick } from "@/lib/scrollToSection";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const tagItem = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const scrolled = useScrolled(80);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen min-h-[100svh] items-start overflow-hidden"
      aria-label="Introduction"
    >
      <HeroBackground />
      {/* Balanced scrim — readable on light photos, image still visible */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-brand-950/88 via-brand-950/58 to-brand-950/22 dark:from-brand-950/92 dark:via-brand-950/65 dark:to-brand-950/30" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-brand-950/82 via-brand-950/15 to-brand-950/40" />
      <div className="absolute inset-y-0 left-0 z-0 w-full max-w-5xl bg-gradient-to-r from-brand-950/35 to-transparent" />

      <div
        aria-hidden="true"
        className="absolute -right-32 top-16 z-0 h-[28rem] w-[28rem] rounded-full bg-accent-500/20 blur-[120px]"
      />

      <Container className="relative z-10 w-full pt-[8.75rem] pb-28 sm:pt-40 lg:pt-44 lg:pb-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-[calc(60rem+10px)] xl:max-w-[calc(68rem+10px)]"
        >
          <motion.ul
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.06, delayChildren: 0.05 },
              },
            }}
            className="flex flex-wrap gap-2 sm:gap-2.5"
            aria-label="Markets we serve"
          >
            {hero.tags.map((tag) => (
              <motion.li key={tag} variants={tagItem}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent-100 shadow-[0_1px_12px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-3.5 sm:text-xs sm:tracking-[0.16em]">
                  <span
                    className="relative flex h-1.5 w-1.5 shrink-0"
                    aria-hidden="true"
                  >
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
                  </span>
                  {tag}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.h1
            variants={item}
            className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.05] text-white text-balance drop-shadow-[0_2px_28px_rgba(0,0,0,0.75)] sm:mt-8 sm:text-5xl lg:text-[3.65rem] xl:text-[4rem]"
          >
            We equip you with the{" "}
            <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
              engineering insight
            </span>{" "}
            to perform and grow.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-50 drop-shadow-[0_1px_14px_rgba(0,0,0,0.65)] sm:text-xl"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <LinkButton
              href={hero.primaryCta.href}
              size="lg"
              className="!px-[calc(1.75rem+5px)]"
              onClick={(e) => handleAnchorClick(e, hero.primaryCta.href)}
            >
              {hero.primaryCta.label}
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
                aria-hidden="true"
              />
            </LinkButton>
            <LinkButton
              href={site.apps}
              target="_blank"
              rel="noreferrer"
              variant="light"
              size="lg"
              className="!px-[calc(1.75rem+5px)]"
              aria-label="Explore Apps (opens in a new tab)"
            >
              Explore Apps
              <ArrowUpRight size={18} aria-hidden="true" />
            </LinkButton>
          </motion.div>
        </motion.div>
      </Container>

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
