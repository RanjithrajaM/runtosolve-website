import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds for sequential reveals. */
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
};

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

/**
 * Scroll-triggered fade/slide-in wrapper. Animates once when it enters the
 * viewport; honors reduced-motion via the global CSS override.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </MotionTag>
  );
}
