import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  accentBarClassName?: string;
  glowClassName?: string;
  id?: string;
};

/** Accessible modal — closes on backdrop click, Escape, or the top-right button. */
export function Dialog({
  open,
  onClose,
  title,
  subtitle,
  description,
  children,
  className,
  accentBarClassName = "from-brand-500 via-accent-400 to-accent-500",
  glowClassName = "bg-accent-500/15",
  id,
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-brand-950/55 backdrop-blur-sm dark:bg-black/65"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            id={id}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className={cn(
              "relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-line bg-card shadow-card",
              className
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                accentBarClassName
              )}
            />
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl",
                glowClassName
              )}
            />

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-accent-500/40 hover:bg-accent-500/10 hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="relative max-h-[min(80vh,720px)] overflow-y-auto p-7 pt-8 sm:p-8">
              <h2 id={titleId} className="pr-10 font-display text-2xl font-bold text-heading">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-2 text-sm font-medium text-brand-600 dark:text-brand-300">
                  {subtitle}
                </p>
              )}
              {description && (
                <p id={descriptionId} className="sr-only">
                  {description}
                </p>
              )}
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
