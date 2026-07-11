import { forwardRef } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "glass";
type Size = "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 [--tw-ring-offset-color:rgb(var(--surface))]";

const variants: Record<Variant, string> = {
  // Premium amber gradient with soft glow.
  primary:
    "bg-gradient-to-br from-accent-400 to-accent-600 text-white shadow-glow hover:from-accent-500 hover:to-accent-700",
  // Solid brand fill for light/dark surfaces.
  secondary:
    "bg-brand-600 text-white shadow-soft hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400",
  // Outlined, adapts to theme.
  ghost:
    "bg-transparent text-heading ring-1 ring-inset ring-line hover:border-transparent hover:bg-brand-500/10 dark:hover:bg-white/10",
  // Frosted glass for use over imagery (hero).
  glass:
    "bg-white/10 text-white ring-1 ring-inset ring-white/40 backdrop-blur-md hover:bg-white/20",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const motionProps = {
  whileHover: { scale: 1.03, y: -1 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring" as const, stiffness: 400, damping: 22 },
};

type ButtonProps = BaseProps & HTMLMotionProps<"button">;
type LinkButtonProps = BaseProps & HTMLMotionProps<"a">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => (
    <motion.button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  )
);
Button.displayName = "Button";

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => (
    <motion.a
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.a>
  )
);
LinkButton.displayName = "LinkButton";
