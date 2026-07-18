import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Linkedin,
  ThumbsUp,
  ArrowUpRight,
  Pause,
  Play,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollFade } from "@/components/ui/ScrollFade";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { linkedInPosts, site } from "@/data/site";
import type { LinkedInPost } from "@/data/site";

const AUTOPLAY_MS = 5000;

export function LinkedInCarousel() {
  const posts = linkedInPosts;
  const count = posts.length;

  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );
  const [cardWidth, setCardWidth] = useState(() =>
    typeof window !== "undefined" ? Math.min(360, window.innerWidth - 56) : 300
  );
  const [autoplay, setAutoplay] = useState(true);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      setIsDesktop(vw >= 768);
      setCardWidth(Math.min(360, vw - 56));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const go = useCallback(
    (dir: number) => setActive((prev) => (prev + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (!autoplay || interactionPaused || reduceMotion) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [autoplay, interactionPaused, reduceMotion, go]);

  const spacing = isDesktop ? cardWidth * 0.72 : cardWidth * 1.06;

  return (
    <section
      aria-labelledby="linkedin-title"
      aria-roledescription="carousel"
      className="overflow-hidden bg-surface-2 py-20 sm:py-24"
    >
      <ScrollFade>
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#0a66c2] text-white shadow-soft">
            <Linkedin size={26} aria-hidden="true" />
          </span>
          <h2 id="linkedin-title" className="mt-5 text-3xl font-bold sm:text-4xl">
            Follow us on LinkedIn
          </h2>
          <p className="mt-3 text-lg text-muted">
            Stay updated with our latest news, insights, and company updates.
          </p>
          <div className="mt-6 flex justify-center">
            <LinkButton
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              aria-label={`Follow ${site.legalName} on LinkedIn (opens in a new tab)`}
            >
              <Linkedin size={18} aria-hidden="true" />
              Follow {site.legalName}
            </LinkButton>
          </div>
        </Reveal>
      </Container>

      <div
        className="relative mt-12"
        onMouseEnter={() => setInteractionPaused(true)}
        onMouseLeave={() => setInteractionPaused(false)}
        onFocusCapture={() => setInteractionPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setInteractionPaused(false);
          }
        }}
      >
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{ height: 324 }}
          aria-live={autoplay && !reduceMotion ? "off" : "polite"}
        >
          {posts.map((post, i) => {
            let offset = i - active;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const abs = Math.abs(offset);
            const isCenter = offset === 0;
            const hidden = abs > (isDesktop ? 2 : 1);

            return (
              <motion.div
                key={post.title}
                className="absolute top-0"
                style={{ width: cardWidth }}
                initial={false}
                animate={{
                  x: offset * spacing,
                  scale: isCenter ? 1 : 1 - abs * 0.12,
                  opacity: hidden ? 0 : isCenter ? 1 : 0.55,
                  zIndex: 30 - abs,
                  filter: isCenter ? "blur(0px)" : "blur(1.5px)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                aria-hidden={!isCenter}
              >
                <PostCard post={post} active={isCenter} />
              </motion.div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-between px-2 sm:px-6 lg:px-16">
          <CarouselButton
            label="Previous post"
            onClick={() => {
              setAutoplay(false);
              go(-1);
            }}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </CarouselButton>
          <CarouselButton
            label="Next post"
            onClick={() => {
              setAutoplay(false);
              go(1);
            }}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </CarouselButton>
        </div>
      </div>

      <div
        className="mt-6 flex flex-wrap items-center justify-center gap-1"
        role="group"
        aria-label="Carousel controls"
      >
        {!reduceMotion && (
          <button
            type="button"
            onClick={() => setAutoplay((playing) => !playing)}
            className="mr-2 grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-brand-500/10 hover:text-heading"
            aria-label={autoplay ? "Pause carousel" : "Play carousel"}
            aria-pressed={!autoplay}
          >
            {autoplay ? (
              <Pause size={17} aria-hidden="true" />
            ) : (
              <Play size={17} aria-hidden="true" />
            )}
          </button>
        )}
        {posts.map((post, i) => (
          <button
            key={post.title}
            type="button"
            aria-current={i === active ? "true" : undefined}
            aria-label={`Go to post ${i + 1}: ${post.title}`}
            onClick={() => {
              setAutoplay(false);
              setActive(i);
            }}
            className="grid h-8 w-8 place-items-center rounded-full"
          >
            <span
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                i === active
                  ? "w-6 bg-accent-500"
                  : "w-2.5 bg-line hover:bg-brand-400"
              )}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
      </ScrollFade>
    </section>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/90 text-heading shadow-card backdrop-blur transition-colors hover:bg-accent-500 hover:text-white hover:border-transparent sm:h-12 sm:w-12"
    >
      {children}
    </motion.button>
  );
}

function PostCard({ post, active }: { post: LinkedInPost; active: boolean }) {
  const Icon = post.icon;
  return (
    <a
      href={post.href}
      target="_blank"
      rel="noreferrer"
      tabIndex={active ? 0 : -1}
      aria-label={`${post.title} — read on LinkedIn (opens in a new tab)`}
      className={cn(
        "group flex h-[300px] flex-col rounded-3xl border border-line bg-card p-5 shadow-card transition-shadow sm:p-6",
        active && "hover:shadow-glow"
      )}
    >
      {/* Author row — mirrors a LinkedIn post header. */}
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-line">
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" width={32} height={32} className="h-8 w-8" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-heading">
            RunToSolve, LLC
          </p>
          <p className="truncate text-xs text-muted">242 followers · {post.date}</p>
        </div>
        <Linkedin
          size={20}
          className="shrink-0 text-[#0a66c2]"
          aria-hidden="true"
        />
      </div>

      <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-500/10 px-2.5 py-1 text-[11px] font-semibold text-brand-600 dark:text-brand-300">
        <Icon size={13} aria-hidden="true" />
        {post.category}
      </span>

      <h3 className="mt-2.5 line-clamp-2 text-base font-bold leading-snug text-heading">
        {post.title}
      </h3>
      <p className="mt-1.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
        {post.excerpt}
      </p>

      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <ThumbsUp
            size={14}
            className="text-[#0a66c2]"
            aria-hidden="true"
          />
          {post.reactions}
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-accent-600 transition-transform group-hover:translate-x-0.5 dark:text-accent-400">
          Read on LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
