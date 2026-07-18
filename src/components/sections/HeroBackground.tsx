import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { heroImages } from "@/data/heroMedia";
import type { HeroImageSet } from "@/data/heroMedia";

const SLIDE_MS = 7000;
const SIZES = "100vw";

function HeroPicture({
  image,
  priority,
  animate,
}: {
  image: HeroImageSet;
  priority: boolean;
  animate: boolean;
}) {
  return (
    <picture>
      {image.avifSrcSet && (
        <source type="image/avif" srcSet={image.avifSrcSet} sizes={SIZES} />
      )}
      {image.webpSrcSet && (
        <source type="image/webp" srcSet={image.webpSrcSet} sizes={SIZES} />
      )}
      <img
        src={image.fallbackSrc}
        alt=""
        aria-hidden="true"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        sizes={SIZES}
        draggable={false}
        className={cn(
          "h-full w-full object-cover object-center will-change-transform",
          animate && "hero-kenburns"
        )}
      />
    </picture>
  );
}

/**
 * Full-bleed hero carousel — AVIF/WebP responsive sources.
 * Mounts only the active + next slide (GPU opacity crossfade).
 */
export function HeroBackground() {
  const reduce = useReducedMotion();
  const images = heroImages;
  const hasMultiple = images.length > 1;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || !hasMultiple) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      SLIDE_MS
    );
    return () => window.clearInterval(id);
  }, [reduce, hasMultiple, images.length]);

  // Preload first hero AVIF so LCP paints quickly.
  useEffect(() => {
    const href = images[0]?.preloadAvif;
    if (!href) return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    link.type = "image/avif";
    link.setAttribute("fetchpriority", "high");
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [images]);

  // Warm the browser cache for the slide after next (sequential prefetch).
  useEffect(() => {
    if (reduce || images.length < 3) return;
    const warm = images[(index + 2) % images.length];
    if (!warm?.preloadAvif) return;
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = warm.preloadAvif;
    link.type = "image/avif";
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [index, images, reduce]);

  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 900], [0, 120]);

  if (images.length === 0) return null;

  const nextIndex = hasMultiple ? (index + 1) % images.length : index;
  const visibleIndexes = hasMultiple
    ? Array.from(new Set([index, nextIndex]))
    : [0];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-brand-950">
      <motion.div
        className="absolute left-0 top-[-15%] h-[130%] w-full"
        style={reduce ? undefined : { y: parallax }}
      >
        {visibleIndexes.map((i) => {
          const image = images[i];
          const isActive = i === index;
          return (
            <div
              key={image.id}
              aria-hidden="true"
              className={cn(
                "absolute inset-0 transition-opacity duration-[1500ms] ease-in-out",
                isActive ? "opacity-100" : "opacity-0"
              )}
            >
              <HeroPicture
                image={image}
                priority={i === 0}
                animate={Boolean(!reduce && isActive)}
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
