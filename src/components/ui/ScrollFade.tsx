import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type ScrollFadeProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollFade({ children, className }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.8, 1],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [0.8, 1], [0, -40]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { opacity, y }}
    >
      {children}
    </motion.div>
  );
}
