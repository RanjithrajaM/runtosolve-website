import { Helmet } from "react-helmet-async";

type SEOProps = {
  title?: string;
  description?: string;
  path?: string;
};

const DEFAULTS = {
  title: "RunToSolve - Steel Construction industry solutions",
  description:
    "RunToSolve, LLC is an engineering technology company advancing the steel construction industry with software, simulation, design, and research for cold-formed steel.",
  url: "https://www.runtosolve.com",
};

/** Per-page SEO/meta management on top of the static tags in index.html. */
export function SEO({ title, description, path = "/" }: SEOProps) {
  const fullTitle = title ? `${title} — RunToSolve` : DEFAULTS.title;
  const desc = description ?? DEFAULTS.description;
  const canonical = `${DEFAULTS.url}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}
