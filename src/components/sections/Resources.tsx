import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowUpRight, Youtube } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { resources, site } from "@/data/site";

export function Resources() {
  const [playing, setPlaying] = useState(false);

  // Click-to-play only — avoids background googlevideo.com traffic from autoplay.
  const embedSrc =
    `https://www.youtube-nocookie.com/embed/${site.youtubeId}` +
    `?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  const poster = `https://img.youtube.com/vi/${site.youtubeId}/maxresdefault.jpg`;

  return (
    <Section
      id="resources"
      eyebrow="Resources"
      title="See how we solve, in motion."
      description={resources.description}
      className="bg-surface-2"
    >
      <Reveal delay={0.1} className="mx-auto max-w-4xl">
        <div className="relative">
          {/* Soft glow anchors the video and gives the section depth. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-500/15 via-transparent to-accent-500/20 blur-2xl"
          />

          <div className="group relative aspect-video overflow-hidden rounded-3xl bg-brand-950 shadow-card ring-1 ring-line">
            {playing ? (
              <iframe
                className="h-full w-full"
                src={embedSrc}
                title={resources.videoTitle}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
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
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${site.youtubeId}/hqdefault.jpg`;
                  }}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-brand-950/20 to-transparent" />
                <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-brand-900 shadow-glow transition-transform duration-300 group-hover:scale-110">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
                  <Play size={30} className="ml-1 fill-current" aria-hidden="true" />
                </span>
                <span className="absolute bottom-4 left-5 right-5 text-left text-sm font-semibold text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)] sm:text-base">
                  {resources.videoTitle}
                </span>
              </button>
            )}

            <motion.a
              href={site.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="Open on YouTube (opens in a new tab)"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-brand-950/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-[#ff0000]"
            >
              <Youtube size={15} aria-hidden="true" />
              YouTube
            </motion.a>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <LinkButton
            href={site.youtube}
            target="_blank"
            rel="noreferrer"
            aria-label="Watch on YouTube (opens in a new tab)"
          >
            <Youtube size={18} aria-hidden="true" />
            Watch on YouTube
          </LinkButton>
          <LinkButton
            href={resources.cta.href}
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            aria-label={`${resources.cta.label} (opens in a new tab)`}
          >
            {resources.cta.label}
            <ArrowUpRight size={18} aria-hidden="true" />
          </LinkButton>
        </div>
      </Reveal>
    </Section>
  );
}
