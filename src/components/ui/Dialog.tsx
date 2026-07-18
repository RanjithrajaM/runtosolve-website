import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { classNames } from "@/lib/classNames";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/bodyScrollLock";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    lockBodyScroll();
    const focusFrame = window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        event.preventDefault();
        dialog.focus();
      } else if (
        event.shiftKey &&
        (document.activeElement === first ||
          !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      unlockBodyScroll();
      document.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-brand-950/55 backdrop-blur-sm dark:bg-black/65"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            ref={dialogRef}
            id={id}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className={classNames(
              "relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-line bg-card shadow-card",
              className
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              aria-hidden="true"
              className={classNames(
                "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                accentBarClassName
              )}
            />
            <div
              aria-hidden="true"
              className={classNames(
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
              <X size={18} aria-hidden="true" />
            </button>

            <div className="relative max-h-[min(80vh,720px)] max-h-[min(80dvh,720px)] overflow-y-auto overscroll-contain p-7 pt-8 sm:p-8">
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
