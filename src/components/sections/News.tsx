import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { news } from "@/data/site";

export function News() {
  return (
    <Section
      id="news"
      eyebrow="Recent News & Insight"
      title="Latest achievements and innovations"
      description="Stay updated with what our team is building, presenting, and winning across the steel and AEC technology community."
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {news.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 0.1} className="h-full">
            <Card>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-accent-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  {item.tag}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {item.category}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold leading-snug text-heading">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {item.meta.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-600 dark:text-brand-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
