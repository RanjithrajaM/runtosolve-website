import type { MouseEvent } from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function headerOffsetPx(): number {
  const bar = document.querySelector("header") as HTMLElement | null;
  return Math.round(bar?.getBoundingClientRect().height ?? 84);
}

export function scrollToSection(hash: string, instant = false) {
  const id = hash.replace(/^#/, "");
  const behavior: ScrollBehavior =
    instant || prefersReducedMotion() ? "auto" : "smooth";

  if (!id || id === "top") {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  const top = Math.max(
    0,
    Math.round(
      el.getBoundingClientRect().top + window.scrollY - headerOffsetPx()
    )
  );
  window.scrollTo({ top, behavior });
}

function scrollAfterLayout(hash: string) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => scrollToSection(hash));
  });
}

export function handleAnchorClick(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate?: () => void
) {
  if (!href.startsWith("#")) return;
  e.preventDefault();
  onNavigate?.();
  window.history.replaceState(null, "", href);
  scrollAfterLayout(href);
}

export function navigateToSection(hash: string, onBeforeScroll?: () => void) {
  if (!hash.startsWith("#")) return;
  onBeforeScroll?.();
  window.history.replaceState(null, "", hash);
  scrollAfterLayout(hash);
}
