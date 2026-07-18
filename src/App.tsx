import { useEffect } from "react";
import { SEO } from "@/components/ui/SEO";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhatWeOffer } from "@/components/sections/WhatWeOffer";
import { About } from "@/components/sections/About";
import { Resources } from "@/components/sections/Resources";
import { News } from "@/components/sections/News";
import { LinkedInCarousel } from "@/components/sections/LinkedInCarousel";
import { Contact } from "@/components/sections/Contact";
import { scrollToSection } from "@/lib/scrollToSection";

export default function App() {
  // Deep links (#about, etc.) land below the fixed header without clipping.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === "#top") return;
    const id = window.setTimeout(() => scrollToSection(hash, true), 50);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <SEO />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main
        id="main"
        tabIndex={-1}
        className="focus:outline-none focus-visible:ring-0"
      >
        <Hero />
        <WhatWeOffer />
        <About />
        <Resources />
        <News />
        <LinkedInCarousel />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
