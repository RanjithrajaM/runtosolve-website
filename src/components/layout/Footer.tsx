import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navItems, site, socials } from "@/data/site";
import { handleAnchorClick } from "@/lib/scrollToSection";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-900 text-brand-100">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed text-brand-200">
              {site.legalName} — advancing the steel construction industry with
              software, simulation, design, and research since {site.founded}.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="text-brand-200 transition-colors hover:text-white link-underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Connect
            </h3>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-sm text-brand-200 transition-colors hover:text-white link-underline"
            >
              {site.email}
            </a>
            <div className="mt-5 flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-accent-500"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-brand-300 sm:flex-row">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>Advancing Steel Construction Through Innovation</p>
        </div>
      </Container>
    </footer>
  );
}
