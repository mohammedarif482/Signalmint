import { useState, useEffect } from "react";
import { useLenis } from "./hooks/useLenis";
import { CustomCursor } from "./components/CustomCursor";
import { HeaderHUD } from "./components/HeaderHUD";
import { HeroSection } from "./components/HeroSection";
import { DualAgentPinned } from "./components/DualAgentPinned";
import { ServicesSection } from "./components/ServicesSection";
import { TrustedBySection } from "./components/TrustedBySection";
import { CaseStudiesSection } from "./components/CaseStudiesSection";
import { EngagementModelSection } from "./components/EngagementModelSection";
import { FAQSection } from "./components/FAQSection";
import { FinalCTASection } from "./components/FinalCTASection";
import { FooterKinetic } from "./components/FooterKinetic";
import { DemoModal } from "./components/DemoModal";
import { InnerPageView } from "./components/InnerPageView";
import { type InnerPageKey, INNER_PAGES_DATA } from "./data/innerPagesData";

const VALID_KEYS = new Set<string>(Object.keys(INNER_PAGES_DATA));

function getPageKeyFromLocation(): InnerPageKey | null {
  if (typeof window === "undefined") return null;
  const path = window.location.pathname.replace(/^\/+/, "").replace(/\/+$/, "").toLowerCase();
  if (VALID_KEYS.has(path)) {
    return path as InnerPageKey;
  }
  const hash = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  if (VALID_KEYS.has(hash)) {
    return hash as InnerPageKey;
  }
  return null;
}

export function App() {
  // Initialize Lenis smooth scrolling synchronized with GSAP ScrollTrigger
  useLenis();

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeInnerPage, setActiveInnerPage] = useState<InnerPageKey | null>(() => getPageKeyFromLocation());

  const handleOpenDemoModal = () => setIsDemoModalOpen(true);
  const handleCloseDemoModal = () => setIsDemoModalOpen(false);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setActiveInnerPage(getPageKeyFromLocation());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Central client-side navigation handler
  const handleNavigate = (key: InnerPageKey | null, hash?: string) => {
    if (key) {
      window.history.pushState({ pageKey: key }, "", `/${key}`);
      setActiveInnerPage(key);
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      window.history.pushState({ pageKey: null }, "", hash ? `/${hash}` : "/");
      setActiveInnerPage(null);
      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFD] text-[#1A0042] selection:bg-[#573681] selection:text-white relative overflow-x-hidden">
      {/* Magnetic Custom Cursor */}
      <CustomCursor />

      {/* RENDER DEDICATED SEPARATE INNER PAGE OR MAIN LANDING PAGE */}
      {activeInnerPage ? (
        <InnerPageView
          pageKey={activeInnerPage}
          onNavigate={handleNavigate}
          onOpenDemoModal={handleOpenDemoModal}
        />
      ) : (
        <>
          {/* 1. Sticky Kinetic HUD Header */}
          <HeaderHUD onOpenDemoModal={handleOpenDemoModal} />

          {/* Main Page Flow */}
          <main className="relative">
            {/* Section 01: Hero Section */}
            <HeroSection onOpenDemoModal={handleOpenDemoModal} />

            {/* Section 02: Why We're Different (The Audit-First Approach) */}
            <DualAgentPinned />

            {/* Section 03: What We Do (Meta Ads + Creative Strategy + Audit Diagnostics) */}
            <ServicesSection onOpenDemoModal={handleOpenDemoModal} />

            {/* Section 04: Social Proof Canopy (Trusted by leaders from various industries) */}
            <TrustedBySection onOpenDemoModal={handleOpenDemoModal} />

            {/* Section 05: Proof (Case Studies / Client Transformations) */}
            <CaseStudiesSection onOpenDemoModal={handleOpenDemoModal} />

            {/* Section 05: How We Work (The 4-Phase Engagement Model) */}
            <EngagementModelSection onOpenDemoModal={handleOpenDemoModal} />

            {/* Section 06: Frequently Asked Questions */}
            <FAQSection onOpenDemoModal={handleOpenDemoModal} />

            {/* Section 07: Final CTA (Bring Us the Account) */}
            <FinalCTASection onOpenDemoModal={handleOpenDemoModal} />
          </main>

          {/* Kinetic Footer */}
          <FooterKinetic 
            onOpenDemoModal={handleOpenDemoModal} 
            onOpenInnerPage={(key) => handleNavigate(key)}
            onNavigateHomeAnchor={(hash) => handleNavigate(null, hash)}
          />
        </>
      )}

      {/* 30-Minute Account Audit Booking Modal */}
      <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemoModal} />
    </div>
  );
}

export default App;
