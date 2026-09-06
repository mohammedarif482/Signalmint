import { useState } from "react";
import { useLenis } from "./hooks/useLenis";
import { CustomCursor } from "./components/CustomCursor";
import { HeaderHUD } from "./components/HeaderHUD";
import { HeroSection } from "./components/HeroSection";
import { DualAgentPinned } from "./components/DualAgentPinned";
import { HorizontalShowcase } from "./components/HorizontalShowcase";
// 04 // THE COST OF GUESSING
// import { ComparisonMatrix } from "./components/ComparisonMatrix";
// 05 // TRY IT (WITH YOUR NUMBERS)
// import { TelemetrySimulator } from "./components/TelemetrySimulator";
// FINAL CALL // YOUR MOVE
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
      {/* Trionn benchmark: Magnetic Custom Cursor */}
      <CustomCursor />

      {/* 1. Sticky Kinetic HUD Header */}
      <HeaderHUD onOpenDemoModal={handleOpenDemoModal} />

      {/* Main Page Flow */}
      <main className="relative">
        {/* 2. Hero Section: Kinetic Typographic Explosion (Codapress Style) */}
        <HeroSection onOpenDemoModal={handleOpenDemoModal} />

        {/* 3. Viewport Pinned Slide: The Two AI Agents (Oddity Pinned Split 200vh) */}
        <DualAgentPinned />

        {/* 4. Kinetic Horizontal Showcase: Crown Winners & Trends (GSAP ScrollTrigger scrub) */}
        <HorizontalShowcase />

        {/* 5. 04 // THE COST OF GUESSING */}
        {/* <ComparisonMatrix /> */}

        {/* 6. 05 // TRY IT (WITH YOUR NUMBERS) */}
        {/* <TelemetrySimulator onOpenDemoModal={handleOpenDemoModal} /> */}
      </main>

      {/* 7. FINAL CALL // YOUR MOVE */}
      <FooterKinetic onOpenDemoModal={handleOpenDemoModal} />

      {/* Interactive VIP Demo Booking Modal */}
      <DemoModal isOpen={isDemoModalOpen} onClose={handleCloseDemoModal} />
    </div>
  );
}

export default App;
