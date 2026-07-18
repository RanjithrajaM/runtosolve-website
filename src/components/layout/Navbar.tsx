import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { navItems, hero, site } from "@/data/site";
import type { NavItem } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { LinkButton } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useScrolled } from "@/hooks/useScrolled";
import { useActiveSection } from "@/hooks/useActiveSection";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/bodyScrollLock";
import { handleAnchorClick } from "@/lib/scrollToSection";

const sectionIds = navItems
  .filter((item) => !item.external && item.href.startsWith("#"))
  .map((item) => item.href.replace("#", ""));

function externalLabel(label: string) {
  return `${label} (opens in a new tab)`;
}

export function Navbar() {
  const scrolled = useScrolled(24);
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    lockBodyScroll();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const closeOnWideViewport = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnWideViewport);

    return () => {
      unlockBodyScroll();
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnWideViewport);
    };
  }, [menuOpen]);

  const onDark = !scrolled;

  return (
    <header
      onBlur={(event) => {
        if (
          menuOpen &&
          !event.currentTarget.contains(event.relatedTarget)
        ) {
          setMenuOpen(false);
        }
      }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-surface/85 shadow-soft backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="container-px flex h-[4.75rem] items-center justify-between sm:h-[5.25rem] lg:h-24"
      >
        <a
          href="#top"
          aria-label={`${site.name} — back to top`}
          onClick={(e) => handleAnchorClick(e, "#top")}
          className="rounded-lg"
        >
          <Logo light={onDark} />
        </a>

        {/* Desktop / tablet navigation — visible from lg (1024px) up */}
        <ul className="hidden items-center gap-0 lg:flex xl:gap-0.5">
          {navItems.map((item) => (
            <DesktopNavItem
              key={item.label}
              item={item}
              onDark={onDark}
              active={active}
            />
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <ThemeToggle onDark={onDark} />
          <div className="hidden lg:block">
            <LinkButton
              href={hero.primaryCta.href}
              size="md"
              onClick={(e) => handleAnchorClick(e, hero.primaryCta.href)}
            >
              {hero.primaryCta.label}
            </LinkButton>
          </div>

          {/* Mobile toggle — phones / small tablets only */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden",
              onDark ? "text-white hover:bg-white/10" : "text-heading hover:bg-brand-500/10"
            )}
          >
            {menuOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="max-h-[calc(100vh-var(--header-offset))] max-h-[calc(100dvh-var(--header-offset))] overflow-y-auto overscroll-contain border-t border-line bg-surface shadow-card lg:hidden"
          >
            <ul className="container-px flex flex-col gap-1 py-4">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    aria-label={
                      item.external ? externalLabel(item.label) : undefined
                    }
                    onClick={(e) =>
                      handleAnchorClick(e, item.href, () => setMenuOpen(false))
                    }
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-body hover:bg-brand-500/10 hover:text-brand-600 dark:hover:text-brand-300"
                  >
                    {item.label}
                    {item.external && (
                      <ExternalLink
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </motion.li>
              ))}
              <li className="px-1 pt-3">
                <LinkButton
                  href={hero.primaryCta.href}
                  className="w-full"
                  onClick={(e) =>
                    handleAnchorClick(e, hero.primaryCta.href, () =>
                      setMenuOpen(false)
                    )
                  }
                >
                  {hero.primaryCta.label}
                </LinkButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


function DesktopNavItem({
  item,
  onDark,
  active,
}: {
  item: NavItem;
  onDark: boolean;
  active: string;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number>();
  const popupId = useId();

  const isActive = !item.external && active === item.href.replace("#", "");

  const linkClasses = cn(
    "relative flex items-center gap-1 rounded-full px-2.5 py-2 text-sm font-medium transition-colors duration-300 xl:px-3.5",
    onDark
      ? "text-white/85 hover:text-white"
      : "text-body hover:text-brand-600 dark:hover:text-brand-300"
  );

  if (!item.children) {
    return (
      <li>
        <a
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
          aria-label={item.external ? externalLabel(item.label) : undefined}
          aria-current={isActive ? "location" : undefined}
          onClick={(e) => handleAnchorClick(e, item.href)}
          className={linkClasses}
        >
          {item.label}
          {item.external && (
            <ExternalLink
              size={13}
              className="opacity-70"
              aria-hidden="true"
            />
          )}
          {isActive && (
            <motion.span
              layoutId="nav-active"
              className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent-500"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </a>
      </li>
    );
  }

  const open3 = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const close = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <li
      className="relative"
      onMouseEnter={open3}
      onMouseLeave={close}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <a
        href={item.href}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={popupId}
        onFocus={open3}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            setOpen(false);
            event.currentTarget.focus();
          }
        }}
        onClick={(e) => handleAnchorClick(e, item.href, () => setOpen(false))}
        className={linkClasses}
      >
        {item.label}
        <ChevronDown
          size={15}
          className={cn("transition-transform duration-300", open && "rotate-180")}
        />
        {isActive && (
          <motion.span
            layoutId="nav-active"
            className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent-500"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </a>

      <AnimatePresence>
        {open && (
          <motion.div
            id={popupId}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 top-full w-72 pt-3"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-card p-2 shadow-card ring-1 ring-black/5 dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.75)] dark:ring-white/10">
              {item.children.map((child) => (
                <a
                  key={child.label}
                  href={child.href}
                  onClick={(e) => handleAnchorClick(e, child.href, () => setOpen(false))}
                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-brand-500/10"
                >
                  {child.icon && (
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-600 transition-colors group-hover:bg-accent-500 group-hover:text-white dark:text-brand-300">
                      <child.icon size={18} />
                    </span>
                  )}
                  <span>
                    <span className="block text-sm font-semibold text-heading">
                      {child.label}
                    </span>
                    {child.description && (
                      <span className="mt-0.5 block text-xs text-muted">
                        {child.description}
                      </span>
                    )}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
