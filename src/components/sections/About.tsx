import { CheckCircle2, Linkedin, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { about, leadership } from "@/data/site";
import { teamImages } from "@/data/teamImages";
import { cn } from "@/lib/cn";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const cardHover = {
  whileHover: { y: -8, scale: 1.02 },
  transition: { type: "spring" as const, stiffness: 300, damping: 22 },
};

export function About() {
  const photo = teamImages[leadership.imageKey];

  return (
    <Section
      id="about"
      eyebrow={about.eyebrow}
      title={about.title}
      description={about.intro}
      className="bg-surface-2"
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-stretch">
        {/* What we do + capabilities */}
        <Reveal className="h-full">
          <motion.div
            {...cardHover}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card p-7 shadow-soft transition-[border-color,box-shadow] duration-300 hover:border-brand-400/50 hover:shadow-card sm:p-8"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-500/10 blur-3xl transition-all duration-500 group-hover:bg-accent-500/15"
            />

            <span className="relative mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 transition-colors duration-300 group-hover:border-accent-500/30 group-hover:text-accent-600 dark:text-brand-300 dark:group-hover:text-accent-300">
              <Sparkles size={14} aria-hidden="true" />
              What we do
            </span>

            <ul className="relative space-y-3">
              {about.points.map((point, index) => (
                <motion.li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-body transition-transform duration-300 group-hover:translate-x-0.5 sm:text-base"
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-accent-500 transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span className="transition-colors duration-300 group-hover:text-heading">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>

            <p className="relative mt-7 text-xs font-semibold uppercase tracking-wider text-muted">
              Core capabilities
            </p>
            <ul className="relative mt-3 flex flex-wrap gap-2">
              {about.capabilities.map((cap) => (
                <li
                  key={cap}
                  className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-xs font-medium text-body transition-all duration-300 group-hover:border-brand-400/40 group-hover:bg-brand-500/10 group-hover:text-brand-700 dark:group-hover:text-brand-200"
                >
                  {cap}
                </li>
              ))}
            </ul>

            <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-7">
              {about.availability.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-600 transition-all duration-300 group-hover:bg-accent-500/20 dark:text-accent-300"
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-500" />
                  {item}
                </span>
              ))}
              {about.servicesProvided.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted transition-colors duration-300 group-hover:border-line group-hover:text-body"
                >
                  {service}
                </span>
              ))}
            </div>
          </motion.div>
        </Reveal>

        {/* Leadership card */}
        <Reveal delay={0.1} className="h-full">
          <motion.figure
            {...cardHover}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-900 to-brand-950 p-7 text-white shadow-card transition-shadow duration-300 hover:shadow-glow sm:p-8"
          >
            <span
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-accent-500/20 blur-3xl transition-all duration-500 group-hover:scale-110 group-hover:bg-accent-400/30"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-brand-400/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            />

            <span className="relative inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-200 transition-all duration-300 group-hover:border-accent-400/40 group-hover:bg-white/15">
              Leadership
            </span>

            <div className="relative mt-6 flex items-center gap-5">
              {photo ? (
                <img
                  src={photo}
                  alt={`${leadership.name}, ${leadership.role} at ${leadership.org}`}
                  width={112}
                  height={112}
                  loading="lazy"
                  className={cn(
                    "h-24 w-24 rounded-2xl object-cover ring-2 ring-white/20 transition-all duration-300 sm:h-28 sm:w-28",
                    "group-hover:ring-accent-400/60 group-hover:shadow-glow"
                  )}
                />
              ) : (
                <span
                  className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-white/10 font-display text-3xl font-bold text-white ring-2 ring-white/20 transition-all duration-300 group-hover:scale-105 group-hover:ring-accent-400/60 sm:h-28 sm:w-28"
                  aria-hidden="true"
                >
                  {initials(leadership.name)}
                </span>
              )}
              <figcaption>
                <p className="font-display text-2xl font-bold transition-colors duration-300 group-hover:text-white">
                  {leadership.name}
                </p>
                <p className="mt-0.5 text-sm text-brand-100 transition-colors duration-300 group-hover:text-brand-50">
                  {leadership.role} · {leadership.org}
                </p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-brand-200">
                  <MapPin size={13} aria-hidden="true" />
                  {leadership.location}
                </p>
              </figcaption>
            </div>

            <div className="relative mt-6 space-y-3">
              {leadership.bio.map((line) => (
                <p
                  key={line}
                  className="text-sm leading-relaxed text-brand-100 transition-colors duration-300 group-hover:text-white/90"
                >
                  {line}
                </p>
              ))}
            </div>

            <p className="relative mt-6 border-t border-white/10 pt-5 text-sm italic text-brand-100 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white">
              “{about.closing}”
            </p>

            <div className="relative mt-6">
              <LinkButton
                href={leadership.linkedin}
                target="_blank"
                rel="noreferrer"
                variant="glass"
                className="transition-all duration-300 group-hover:bg-white/25 group-hover:shadow-glow"
              >
                <Linkedin size={18} />
                Connect on LinkedIn
              </LinkButton>
            </div>
          </motion.figure>
        </Reveal>
      </div>
    </Section>
  );
}
