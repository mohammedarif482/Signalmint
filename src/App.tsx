import { useState } from "react";
import { useLenis } from "./hooks/useLenis";
import { CustomCursor } from "./components/CustomCursor";
import { HeaderHUD } from "./components/HeaderHUD";
import { HeroSection } from "./components/HeroSection";
import { DualAgentPinned } from "./components/DualAgentPinned";
import { ServicesSection } from "./components/ServicesSection";
import { CaseStudiesSection } from "./components/CaseStudiesSection";
import { EngagementModelSection } from "./components/EngagementModelSection";
import { FinalCTASection } from "./components/FinalCTASection";
import { FooterKinetic } from "./components/FooterKinetic";
import { DemoModal } from "./components/DemoModal";

export function App() {
  // Initialize Lenis smooth scrolling synchronized with GSAP ScrollTrigger
  useLenis();

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleOpenDemoModal = () => setIsDemoModalOpen(true);
  const handleCloseDemoModal = () => setIsDemoModalOpen(false);

  return (
    <div className="min-h-screen bg-[#FAFAFD] text-[#1A0042] selection:bg-[#1516A8] selection:text-white relative overflow-x-hidden">
      {/* Magnetic Custom Cursor */}
      <CustomCursor />

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

        {/* Section 04: Proof (Case Studies / Client Transformations) */}
        <CaseStudiesSection onOpenDemoModal={handleOpenDemoModal} />

        {/* Section 05: How We Work (The 4-Phase Engagement Model) */}
        <EngagementModelSection onOpenDemoModal={handleOpenDemoModal} />

        {/* Section 06: Final CTA (Bring Us the Account) */}
        <FinalCTASection onOpenDemoModal={handleOpenDemoModal} />
      </main>

      {/* Kinetic Footer */}
      <FooterKinetic onOpenDemoModal={handleOpenDemoModal} />

      {/* 30-Minute Account Audit Booking Modal */}
      <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemoModal} />
    </div>
  );
}

export default App;
