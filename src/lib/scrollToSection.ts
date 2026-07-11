import type { MouseEvent } from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Smoothly scrolls to an in-page section, compensating for the fixed header so
 * the target's heading always lands cleanly below the navbar (never cut off).
 * Falls back to the very top for `#top`/empty hashes.
 */
export function scrollToSection(hash: string) {
  const id = hash.replace(/^#/, "");
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

  if (!id || id === "top") {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  // Measure only the top nav bar (not the whole <header>, which may still
  // contain the collapsing mobile menu) so the offset stays stable.
  const bar =
    document.querySelector("header nav") ?? document.querySelector("header");
  const offset = (bar?.getBoundingClientRect().height ?? 72) + 12;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: Math.max(top, 0), behavior });
}

/**
 * Click handler for in-page anchor links. For hash targets it prevents the
 * native jump, releases any scroll lock (mobile menu), runs an optional
 * callback (e.g. close the menu), then performs an offset-aware smooth scroll.
 * External links keep their default behavior.
 */
export function handleAnchorClick(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate?: () => void
) {
  if (!href.startsWith("#")) return;
  e.preventDefault();
  onNavigate?.();
  // Release the body scroll lock the mobile menu may have applied so the
  // programmatic scroll can actually move the page.
  document.body.style.overflow = "";
  window.history.replaceState(null, "", href);
  // Wait a frame so layout settles (menu collapse / overflow reset) first.
  requestAnimationFrame(() => scrollToSection(href));
}

/** Programmatic in-page navigation — same offset-aware scroll as header links. */
export function navigateToSection(hash: string, onBeforeScroll?: () => void) {
  if (!hash.startsWith("#")) return;
  onBeforeScroll?.();
  document.body.style.overflow = "";
  window.history.replaceState(null, "", hash);
  requestAnimationFrame(() => scrollToSection(hash));
}
