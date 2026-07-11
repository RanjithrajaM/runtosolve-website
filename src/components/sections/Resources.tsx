import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowUpRight, Youtube } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { resources, site } from "@/data/site";

export function Resources() {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  // Auto-start (muted) once the player scrolls into view — respects autoplay policy.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: [0, 0.6, 1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const embedSrc =
    `https://www.youtube-nocookie.com/embed/${site.youtubeId}` +
    `?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`;
  const poster = `https://img.youtube.com/vi/${site.youtubeId}/maxresdefault.jpg`;

  return (
    <Section id="resources" className="bg-surface-2">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">Resources</span>
          <h2 id="resources-title" className="mt-4 text-3xl font-bold text-balance sm:text-4xl">
            See how we solve, in motion.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {resources.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href={site.youtube} target="_blank" rel="noreferrer">
              <Youtube size={18} />
              Watch on YouTube
            </LinkButton>
            <LinkButton
              href={resources.cta.href}
              target="_blank"
              rel="noreferrer"
              variant="ghost"
            >
              {resources.cta.label}
              <ArrowUpRight size={18} />
            </LinkButton>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={frameRef}
            className="group relative aspect-video overflow-hidden rounded-3xl bg-brand-950 shadow-card ring-1 ring-line"
          >
            {playing ? (
              <iframe
                className="h-full w-full"
                src={embedSrc}
                title={resources.videoTitle}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play video: ${resources.videoTitle}`}
                className="absolute inset-0 h-full w-full"
              >
                <img
                  src={poster}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${site.youtubeId}/hqdefault.jpg`;
                  }}
                />
                <span className="absolute inset-0 bg-brand-950/30" />
                <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-brand-900 shadow-glow">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
                  <Play size={30} className="ml-1 fill-current" />
                </span>
              </button>
            )}

            {/* Persistent "open on YouTube" affordance. */}
            <motion.a
              href={site.youtube}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-brand-950/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-[#ff0000]"
            >
              <Youtube size={15} />
              YouTube
            </motion.a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
