import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type CardProps = {
  className?: string;
  interactive?: boolean;
  /** Stronger lift + scale for feature cards (e.g. offerings). */
  prominent?: boolean;
  children: ReactNode;
};

/** Elevated surface used for offerings, news, and other grouped content. */
export function Card({
  className,
  interactive = true,
  prominent = false,
  children,
}: CardProps) {
  return (
    <motion.div
      whileHover={
        interactive
          ? prominent
            ? { y: -10, scale: 1.04 }
            : { y: -6, scale: 1.02 }
          : undefined
      }
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={cn(
        "group relative h-full overflow-hidden rounded-3xl border border-line bg-card p-7 shadow-soft",
        interactive &&
          "transition-[border-color,box-shadow] duration-300 hover:border-brand-400/50 hover:shadow-card dark:hover:border-brand-400/40",
        prominent &&
          "hover:shadow-glow dark:hover:border-accent-500/30",
        className
      )}
    >
      {prominent && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/0 via-transparent to-accent-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-brand-500/[0.06] group-hover:to-accent-500/[0.08]"
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
