# RunToSolve — Website

A modern, accessible, SEO-optimized marketing site for **RunToSolve, LLC** — an
engineering technology company advancing the steel construction industry with
software, simulation, design, and research.

Rebuilt from scratch in **React + TypeScript + Vite + Tailwind CSS**, with
**Framer Motion** animations throughout.

## Tech stack

| Concern        | Choice                          |
| -------------- | ------------------------------- |
| Build tool     | Vite 5                          |
| UI             | React 18 + TypeScript           |
| Styling        | Tailwind CSS 3 (design tokens)  |
| Animation      | Framer Motion                   |
| Icons          | lucide-react                    |
| SEO / meta     | react-helmet-async + JSON-LD    |

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## Project structure

```
src/
├─ components/
│  ├─ layout/        # Navbar, Footer
│  ├─ sections/      # Hero, About, WhatWeOffer, Resources, News, LinkedInCarousel, Contact
│  └─ ui/            # Button, Card, Dialog, Container, Section, Reveal, SEO, Logo, ThemeToggle
├─ data/             # site.ts, heroImages.ts, teamImages.ts
├─ hooks/            # useScrolled, useActiveSection (scroll-spy)
├─ lib/              # cn.ts, scrollToSection.ts
├─ theme/            # ThemeProvider (light/dark)
├─ App.tsx           # Page composition + skip link
├─ index.css         # Tailwind layers, tokens, reduced-motion support
└─ main.tsx          # Entry (HelmetProvider)
```

## Customization

- **Content** — edit `src/data/site.ts` (nav, hero, offerings, news, resources, socials).
- **Theme** — brand/accent colors and fonts live in `tailwind.config.js`.
- **Hero images** — drop landscape images (≈2560px wide) into `src/assets/hero/`.
  They're auto-loaded into the hero slideshow (Ken Burns + crossfade) via
  `src/data/heroImages.ts` — no code changes needed.
- **Video** — set `resources.youtubeId` in `src/data/site.ts` to embed a real video.

## Accessibility & SEO

- Semantic landmarks, `aria-*` labels, keyboard-visible focus rings, skip link.
- Scroll-spy nav with `aria-current`, reduced-motion support.
- Per-page meta via `SEO` component, Open Graph/Twitter tags + Organization JSON-LD.
