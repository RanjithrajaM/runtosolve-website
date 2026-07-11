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

export default function App() {
  return (
    <>
      <SEO />

      {/* Skip link for keyboard & screen-reader users. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
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
