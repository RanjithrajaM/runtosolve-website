import { useEffect, useRef, useState } from "react";
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
import { handleAnchorClick } from "@/lib/scrollToSection";

const sectionIds = navItems
  .filter((item) => !item.external && item.href.startsWith("#"))
  .map((item) => item.href.replace("#", ""));

export function Navbar() {
  const scrolled = useScrolled(24);
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const onDark = !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-surface/85 shadow-soft backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="container-px flex h-16 items-center justify-between lg:h-20"
      >
        <a
          href="#top"
          aria-label={`${site.name} — back to top`}
          onClick={(e) => handleAnchorClick(e, "#top")}
          className="rounded-lg"
        >
          <Logo light={onDark} />
        </a>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-0.5 xl:flex">
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
          <div className="hidden xl:block">
            <LinkButton
              href={hero.primaryCta.href}
              size="md"
              onClick={(e) => handleAnchorClick(e, hero.primaryCta.href)}
            >
              {hero.primaryCta.label}
            </LinkButton>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full transition-colors xl:hidden",
              onDark ? "text-white hover:bg-white/10" : "text-heading hover:bg-brand-500/10"
            )}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
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
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-line bg-surface shadow-card xl:hidden"
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
                    onClick={(e) =>
                      handleAnchorClick(e, item.href, () => setMenuOpen(false))
                    }
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-body hover:bg-brand-500/10 hover:text-brand-600 dark:hover:text-brand-300"
                  >
                    {item.label}
                    {item.external && <ExternalLink size={16} className="opacity-60" />}
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

/* ---------------- Desktop nav item (with optional dropdown) ---------------- */

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

  const isActive = !item.external && active === item.href.replace("#", "");

  const linkClasses = cn(
    "relative flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300",
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
          aria-current={isActive ? "true" : undefined}
          onClick={(e) => handleAnchorClick(e, item.href)}
          className={linkClasses}
        >
          {item.label}
          {item.external && <ExternalLink size={13} className="opacity-70" />}
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
    <li className="relative" onMouseEnter={open3} onMouseLeave={close}>
      <a
        href={item.href}
        aria-haspopup="true"
        aria-expanded={open}
        onFocus={open3}
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
