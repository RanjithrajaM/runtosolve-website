import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { heroImages } from "@/data/heroImages";

const SLIDE_MS = 7000; // time each background stays before crossfading

/**
 * Full-bleed hero background. Renders every image from `src/assets/hero/` as a
 * crossfading slideshow with a slow Ken Burns zoom/pan (pseudo-3D) and a subtle
 * scroll parallax. Fully decorative and cross-browser; honors reduced-motion.
 */
export function HeroBackground() {
  const reduce = useReducedMotion();
  const images = heroImages;
  const hasMultiple = images.length > 1;

  const [index, setIndex] = useState(0);

  // Auto-advance the slideshow (disabled for a single image or reduced motion).
  useEffect(() => {
    if (reduce || !hasMultiple) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      SLIDE_MS
    );
    return () => window.clearInterval(id);
  }, [reduce, hasMultiple, images.length]);

  // Scroll parallax — background drifts slower than the content for depth.
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 900], [0, 120]);

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-brand-950">
      <motion.div
        className="absolute left-0 top-[-15%] h-[130%] w-full"
        style={reduce ? undefined : { y: parallax }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            aria-hidden="true"
            className={cn(
              "absolute inset-0 transition-opacity duration-[1500ms] ease-in-out",
              i === index ? "opacity-100" : "opacity-0"
            )}
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              className={cn(
                "h-full w-full object-cover object-center",
                !reduce && i === index && "hero-kenburns"
              )}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
