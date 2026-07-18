import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Cpu,
  DraftingCompass,
  FlaskConical,
  Mail,
  Linkedin,
  Github,
  Award,
  Mic,
  Calendar,
  Boxes,
} from "lucide-react";

type NavChild = {
  label: string;
  description?: string;
  href: string;
  icon?: LucideIcon;
};

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  children?: NavChild[];
};

export type OfferingTheme = "software" | "simulation" | "design" | "research";

export type Offering = {
  icon: LucideIcon;
  title: string;
  theme: OfferingTheme;
  tagline: string;
  description: string;
  details: string;
  highlights: string[];
  examples: string[];
};

type NewsItem = {
  tag: string;
  category: string;
  title: string;
  description: string;
  meta: string[];
};

export type LinkedInPost = {
  category: string;
  icon: LucideIcon;
  title: string;
  excerpt: string;
  date: string;
  reactions: number;
  href: string;
};

type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const site = {
  name: "RunToSolve",
  legalName: "RunToSolve",
  tagline: "Get the answer.",
  email: "contact@runtosolve.com",
  founded: 2019,
  linkedin: "https://www.linkedin.com/company/runtosolve/posts/?feedView=all",
  github: "https://github.com/runtosolve",
  apps: "https://apps.runtosolve.com/login",
  youtube: "https://www.youtube.com/watch?v=mV3uEi1iIXo",
  youtubeId: "mV3uEi1iIXo",
};

export const navItems: NavItem[] = [
  {
    label: "Services",
    href: "#what-we-offer",
    children: [
      {
        label: "Software",
        description: "Design automation & digital tools",
        href: "#what-we-offer",
        icon: Code2,
      },
      {
        label: "Simulation",
        description: "Thin-walled structural analysis",
        href: "#what-we-offer",
        icon: Cpu,
      },
      {
        label: "Design",
        description: "Cold-formed steel design",
        href: "#what-we-offer",
        icon: DraftingCompass,
      },
      {
        label: "Research",
        description: "Open-source codes & standards",
        href: "#what-we-offer",
        icon: FlaskConical,
      },
    ],
  },
  { label: "About", href: "#about" },
  { label: "Resources", href: "#resources" },
  { label: "Apps", href: site.apps, external: true },
  { label: "GitHub", href: site.github, external: true },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  tags: [
    "Metal Buildings",
    "Light Steel Framing",
    "Storage Rack Systems",
    "Composite Decks",
    "Cold-formed Steel",
  ],
  title: "We equip you with the engineering insight to perform and grow.",
  subtitle:
    "RunToSolve is an engineering technology company advancing industries with software, simulation, design and research.",
  primaryCta: { label: "Get Started", href: "#contact" },
};

export const offerings: Offering[] = [
  {
    icon: Code2,
    title: "Software",
    theme: "software",
    tagline: "Code provisions → production-ready tools",
    description:
      "We develop custom structural design tools that automate calculations and optimize engineering workflows.",
    details:
      "From AISI S100 libraries to browser-based design apps, we turn code provisions into fast, auditable software that engineers can trust on every project.",
    highlights: [
      "Custom calculators and design automation",
      "Web apps, APIs, and .NET / Julia packages",
      "ICC-ES compliant workflows",
      "Integration with BIM and fabrication tools",
    ],
    examples: ["AISIS100.cs", "RunToSolve Apps", "Design automation APIs"],
  },
  {
    icon: Cpu,
    title: "Simulation",
    theme: "simulation",
    tagline: "FEA & fire models you can validate",
    description:
      "Our simulations model real-world loading and fire conditions to predict structural behavior with precision.",
    details:
      "We build and run finite-element models for thin-walled and cold-formed steel — buckling, fire exposure, and real-world load paths validated against industry benchmarks.",
    highlights: [
      "Elastic & inelastic buckling analysis",
      "Fire resistance per ACI/TMS 216",
      "Shell and beam finite elements",
      "Benchmarked against commercial FEA",
    ],
    examples: ["TriShellFiniteElement.jl", "ACI216.jl", "Elastic buckling solvers"],
  },
  {
    icon: DraftingCompass,
    title: "Design",
    theme: "design",
    tagline: "Optimized members, buildable details",
    description:
      "We combine engineering principles and computation to deliver efficient, practical, and safe structural designs.",
    details:
      "Our design work pairs structural judgment with computational optimization — delivering member selections, connection details, and documentation that fabricators and erectors can act on.",
    highlights: [
      "Cold-formed steel member design",
      "Profile and system-level optimization",
      "Connection and anchorage design",
      "Code-compliant calculation packages",
    ],
    examples: ["CFS member optimization", "Purlin line analysis", "ICC-ES packages"],
  },
  {
    icon: FlaskConical,
    title: "Research",
    theme: "research",
    tagline: "Open science that moves the industry",
    description:
      "We explore emerging materials, design methods, and computational tools to advance structural engineering innovation.",
    details:
      "We publish open-source tools, contribute to standards development, and partner with manufacturers and universities to push steel construction technology forward.",
    highlights: [
      "Open-source R&D on GitHub",
      "Conference papers and industry collaboration",
      "New materials and design methods",
      "AI-assisted engineering workflows",
    ],
    examples: ["JuliaCon minisymposia", "CFSEI & NASCC talks", "MCP + AI agents"],
  },
];

export const about = {
  eyebrow: "About RunToSolve",
  title: "Engineering expertise, meet modern software.",
  intro:
    "RunToSolve advances the steel construction industry by pairing structural engineering depth with modern software development.",
  points: [
    "Research & optimization tools for steel manufacturers, fabricators, engineers, and developers.",
    "Code-compliant engineering solutions and automated design workflows.",
    "Custom web & software applications backed by open-source R&D.",
  ],
  capabilities: [
    "Finite Element Analysis (FEA)",
    "Structural optimization",
    "ICC-ES code compliance",
    "Automated engineering workflows",
    "AI-powered data solutions",
    "Web & software applications",
  ],
  servicesProvided: ["Application Development", "Web Development", "Technical Support"],
  availability: ["Available", "Remote"],
  closing:
    "From profile-level analysis to full-structure performance — get answers you can trust.",
};

export const leadership = {
  name: "Cris Moen",
  role: "President & CEO",
  org: "RunToSolve, LLC",
  location: "Baltimore, Maryland, United States",
  imageKey: "cris-moen",
  bio: [
    "Structural engineer and software builder specializing in cold-formed steel, thin-walled structures, and computational design.",
    "Leads RunToSolve's mission to turn engineering standards into fast, reliable, open software.",
  ],
  linkedin: "https://www.linkedin.com/in/cris-moen-3b42a34/",
};

export const news: NewsItem[] = [
  {
    tag: "Podcast",
    category: "Feature",
    title: "Cris Moen Discusses Digital CFS Tools and Automation",
    description:
      "RunToSolve founder Dr. Cristopher D. Moen shares insights on cold-formed steel engineering, software automation, and the future of digital design tools in a podcast hosted by Scottsdale Construction Systems.",
    meta: ["Podcast Feature", "CFS Innovation", "Digital Tools"],
  },
  {
    tag: "Award",
    category: "Recognition",
    title: "AEC Tech Hackathon — Most Impactful Hack Award",
    description:
      "Our team was recognized in NYC for a contract-analysis tool powered by a locally runnable LLM that drafts B101 agreements, extracts scope-of-work details, and cross-validates against Revit models.",
    meta: ["New York City", "Most Impactful", "AI + BIM"],
  },
];

export const resources = {
  description:
    "Watch our latest video to learn how we bring simulation, software, and design research to the steel construction industry.",
  videoTitle: "Metal building purlin line strength by computation",
  cta: { label: "View Resources", href: site.github },
};

export const linkedInPosts: LinkedInPost[] = [
  {
    category: "Event",
    icon: Calendar,
    title: "Heading to JuliaCon 2026",
    excerpt:
      "Cris Moen will lead the “Engineering with Julia” minisymposium in Mainz, Germany. Julia is at the core of how we build our tools.",
    date: "2d",
    reactions: 34,
    href: "https://juliacon.org/2026/",
  },
  {
    category: "AI + Open Source",
    icon: Cpu,
    title: "Elastic Buckling, Powered by AI",
    excerpt:
      "At the CFSEI Expo, Chu Ding demoed an open-source package for elastic buckling analysis — plus AI agents using the Model Context Protocol (MCP) to run it reliably.",
    date: "1mo",
    reactions: 78,
    href: "https://github.com/runtosolve",
  },
  {
    category: "Conference",
    icon: Mic,
    title: "Designing with Data at NASCC",
    excerpt:
      "We led the “Designing with Data” session at the North American Steel Construction Conference in Atlanta — recent wins and open challenges in data-driven design.",
    date: "2mo",
    reactions: 21,
    href: site.linkedin,
  },
  {
    category: "Open Source",
    icon: Github,
    title: "TriShellFiniteElement.jl",
    excerpt:
      "An open-source Mindlin triangular shell finite element for Ferrite.jl — targeting thin-walled analysis, benchmarked against Abaqus S4R/S3R.",
    date: "2mo",
    reactions: 10,
    href: "https://github.com/runtosolve/TriShellFiniteElement.jl",
  },
  {
    category: "Open Source",
    icon: Code2,
    title: "Beyond Spreadsheets: AISIS100.cs",
    excerpt:
      "The AISI S100 spec as callable, open-source .NET methods — tension, compression, flexure, shear, connections, and distortional buckling across editions.",
    date: "3mo",
    reactions: 29,
    href: "https://github.com/runtosolve",
  },
  {
    category: "Open Source",
    icon: Boxes,
    title: "ACI216.jl Released",
    excerpt:
      "A Julia package for concrete fire-resistance checks per ACI/TMS 216.1M-14 — temperature interpolation, strength reduction, and prescriptive checks.",
    date: "3mo",
    reactions: 9,
    href: "https://github.com/runtosolve/ACI216.jl",
  },
  {
    category: "Award",
    icon: Award,
    title: "Most Impactful Hack — AEC Tech",
    excerpt:
      "Chu Ding and team won Most Impactful Hack at the AEC Tech Hackathon (CORE studio, Thornton Tomasetti) for an LLM-powered contract & scope tool.",
    date: "7mo",
    reactions: 23,
    href: site.linkedin,
  },
];

export const socials: SocialLink[] = [
  { label: "Email", href: `mailto:${site.email}`, icon: Mail },
  { label: "LinkedIn", href: site.linkedin, icon: Linkedin },
  { label: "GitHub", href: site.github, icon: Github },
];
