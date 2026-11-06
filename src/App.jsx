import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import InfiniteMarquee from './components/InfiniteMarquee';
import ProjectGrid from './components/ProjectGrid';
import ToolsIReachFor from './components/ToolsIReachFor';
import GitHistory from './components/GitHistory';
import About from './components/About';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 1. Initialize Lenis Smooth Inertia Scroll (Butter-smooth 120fps)
  useEffect(() => {
    // Respect user reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);

  // 2. Scroll Progress calculation for top tracer bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const marqueeKeywords = [
    'FLUTTER & DART MOBILE',
    'FASTAPI & PYTHON BACKENDS',
    'GOOGLE GEMINI 1.5 VISION',
    'GROQ LPU INFERENCE APIS',
    'REACT.JS ECOSYSTEM',
    'SUPABASE & FIREBASE CLOUD',
    'CROSS-PLATFORM ENGINEERING',
    'CLEAN RIVERPOD ARCHITECTURE',
  ];

  const secondaryKeywords = [
    'GOOGLE SOLUTION CHALLENGE (SDGS 2 & 3)',
    '8+ SHIPPED PRODUCTION APPS',
    '3+ YEARS CODE & BUILDING',
    'REST APIS & GEOLOCATION',
    'STATE LEVEL COMPETITION AWARDEE',
    'TURNING IDEAS INTO DEPLOYABLE PRODUCTS',
  ];

  return (
    <div className="portfolio-app">
      {/* Scroll Progress Bar at very top */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '2.5px',
          backgroundColor: 'var(--accent)',
          zIndex: 9999,
          transition: 'width 0.05s ease-out',
          boxShadow: '0 0 10px var(--accent)',
        }}
      />

      {/* Main Header with Theme Switcher, Sound & CV trigger */}
      <Header onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Landmark Sections */}
      <main>
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* 2026 Kinetic Infinite Text Marquee 01 */}
        <InfiniteMarquee items={marqueeKeywords} direction="left" speed={30} />

        {/* Tools I Reach For (Interactive Skills Matrix from Image 1) */}
        <ToolsIReachFor />

        {/* Selected Projects */}
        <ProjectGrid />

        {/* Live Git Repository History & 52-Week Contribution Matrix (from Image 2) */}
        <GitHistory />

        <About />

        {/* 2026 Kinetic Infinite Text Marquee 02 (Reverse Direction) */}
        <InfiniteMarquee items={secondaryKeywords} direction="right" speed={25} />

        <Experience />

        <Contact />
      </main>

      {/* Footer with India Live Clock */}
      <Footer />

      {/* Printable / Downloadable CV Modal */}
      {isResumeOpen && (
        <ResumeModal onClose={() => setIsResumeOpen(false)} />
      )}
    </div>
  );
}
