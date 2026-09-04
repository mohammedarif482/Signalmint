import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import signalMintLogo from "../assets/signalmintlogo.svg";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenDemoModal?: () => void;
}

export function HeroSection({ onOpenDemoModal }: HeroSectionProps) {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const runwayRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const scrollPillRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    const floatingLogo = logoRef.current;
    const bg = bgRef.current;
    if (!runway || !floatingLogo) return;

    // Helper: Calculate exact vector offset and scale from hero logo to nav-logo-slot
    const getDockOffsets = () => {
      const navSlot = document.getElementById("nav-logo-slot");
      if (!navSlot || !floatingLogo) return { deltaX: -32, deltaY: -50, targetScale: 0.2 };

      // Temporarily clear inline transform to calculate true geometry
      gsap.set(floatingLogo, { clearProps: "transform" });
      const navRect = navSlot.getBoundingClientRect();
      const logoRect = floatingLogo.getBoundingClientRect();

      const deltaX = navRect.left - logoRect.left;
      const deltaY = navRect.top - logoRect.top;
      // Target nav font is ~28px, floating logo height is measured dynamically
      const targetScale = logoRect.height > 0 ? (navRect.height * 0.95) / logoRect.height : 0.2;

      return { deltaX, deltaY, targetScale };
    };

    const ctx = gsap.context(() => {
      const { deltaX, deltaY, targetScale } = getDockOffsets();

      // Master ScrollTrigger Scrub Timeline bound to the 200vh runway
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: runway,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const navDockedLogo = document.getElementById("nav-docked-logo");

            // When user scrolls past 58%, seamlessly reveal docked nav wordmark
            if (progress >= 0.58) {
              if (navDockedLogo) navDockedLogo.style.opacity = "1";
              if (floatingLogo) floatingLogo.style.opacity = "0";
            } else {
              if (navDockedLogo) navDockedLogo.style.opacity = "0";
              if (floatingLogo) floatingLogo.style.opacity = "1";
            }
          },
        },
      });

      // 1. BRAND LOGO TRANSITION (Shrink & Dock into #nav-logo-slot by 60% scroll)
      scrubTl.to(
        floatingLogo,
        {
          x: deltaX,
          y: deltaY,
          scale: targetScale,
          transformOrigin: "left top",
          ease: "power1.inOut",
        },
        0
      );

      // 2. FADE & DISPERSE SECONDARY ELEMENTS (0% to 38% scroll)
      const secondaryElements = [
        eyebrowRef.current,
        narrativeRef.current,
        cardLeftRef.current,
        videoCardRef.current,
        scrollPillRef.current,
      ].filter(Boolean);

      scrubTl.to(
        secondaryElements,
        {
          opacity: 0,
          y: 28,
          stagger: 0.03,
          duration: 0.38,
          ease: "power2.out",
        },
        0
      );

      // 3. BACKGROUND WORKSPACE IMAGE / CANVAS PARALLAX SCRUB (0% to 100%)
      if (bg) {
        scrubTl.to(
          bg,
          {
            scale: 1.08,
            filter: "blur(4px)",
            ease: "none",
          },
          0
        );
      }

      // Refresh ScrollTrigger when window resizes
      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, runway);

    return () => ctx.revert();
  }, []);

  return (
    <div id="hero-runway" ref={runwayRef} className="relative w-full h-[200vh]">
      {/* PINNED INNER VIEWPORT (100vh Sticky Viewport) */}
      <div
        ref={viewportRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-8 lg:p-12 select-none"
      >
        {/* ========================================================================= */}
        {/* BACKGROUND LAYER: Editorial Tactile Telemetry Workspace Canvas (Oryzo)   */}
        {/* ========================================================================= */}
        <div
          ref={bgRef}
          className="absolute inset-0 z-0 origin-center pointer-events-none overflow-hidden bg-gradient-to-br from-[#EAE8FB] via-[#E2E0F9] to-[#D5D2F5]"
        >
          {/* Subtle paper/workspace tactile texture */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1A0042_0.75px,transparent_0.75px)] [background-size:24px_24px]" />

          {/* Centered Precision Telemetry Cutting Mat (Oryzo style studio mat) */}
          <div className="absolute inset-4 sm:inset-10 rounded-3xl bg-[#E2E0F9]/85 border border-[#1A0042]/12 shadow-[0_25px_60px_rgba(26,0,66,0.06)] overflow-hidden">
            {/* Coordinate Ruler Grid */}
            <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="oryzoMatGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path
                    d="M 60 0 L 0 0 0 60"
                    fill="none"
                    stroke="rgba(26, 0, 66, 0.08)"
                    strokeWidth="1"
                  />
                  <circle cx="60" cy="60" r="1.5" fill="#1516A8" fillOpacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#oryzoMatGrid)" />
            </svg>

            {/* Top & Bottom Centimeter Coordinate Rulers (0 10 20 30 40 50... 260) */}
            <div className="absolute bottom-2 left-6 right-6 flex justify-between font-mono text-[9px] text-[#1A0042]/35 select-none tracking-widest">
              <span>0</span>
              <span>10</span>
              <span>20</span>
              <span>30</span>
              <span>40</span>
              <span>50</span>
              <span>60</span>
              <span>70</span>
              <span>80</span>
              <span>90</span>
              <span>100</span>
              <span>110</span>
              <span>120</span>
              <span>130</span>
              <span>140</span>
              <span>150</span>
              <span>160</span>
              <span>170</span>
              <span>180</span>
              <span>190</span>
              <span>200</span>
              <span>210</span>
              <span>220</span>
              <span>230</span>
              <span>240</span>
              <span>250</span>
              <span>260</span>
            </div>

            {/* Left Centimeter Coordinate Ruler (10 20 30 ... 150) */}
            <div className="absolute left-2.5 top-12 bottom-12 flex flex-col justify-between font-mono text-[9px] text-[#1A0042]/35 select-none">
              <span>10</span>
              <span>20</span>
              <span>30</span>
              <span>40</span>
              <span>50</span>
              <span>60</span>
              <span>70</span>
              <span>80</span>
              <span>90</span>
              <span>100</span>
              <span>110</span>
              <span>120</span>
              <span>130</span>
              <span>140</span>
              <span>150</span>
            </div>

            {/* CENTRAL TACTILE FOCAL OBJECT (Analogous to Oryzo's circular cork coaster) */}
            {/* Precision Circular Telemetry Lens / Sensor Dial */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 rounded-full bg-gradient-to-br from-[#D9D6F8] to-[#C9C5F4] border-8 border-white/60 shadow-[0_30px_70px_rgba(26,0,66,0.14)] flex items-center justify-center pointer-events-none">
              {/* Concentric etched brass/titanium rings */}
              <div className="w-[85%] h-[85%] rounded-full border border-[#1A0042]/15 flex items-center justify-center relative">
                {/* Degree indicator marks */}
                <span className="absolute -top-3 font-mono text-[9px] text-[#1A0042]/50 font-bold">0°</span>
                <span className="absolute -right-4 font-mono text-[9px] text-[#1A0042]/50 font-bold">90°</span>
                <span className="absolute -bottom-3 font-mono text-[9px] text-[#1A0042]/50 font-bold">180°</span>
                <span className="absolute -left-5 font-mono text-[9px] text-[#1A0042]/50 font-bold">270°</span>

                {/* Inner tactile lens core with soft telemetry pulse */}
                <div className="w-[70%] h-[70%] rounded-full bg-white/40 backdrop-blur-md border border-white/80 shadow-inner flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1516A8] animate-ping mb-2" />
                  <span className="font-mono text-[10px] font-black text-[#1A0042] tracking-wider uppercase">
                    AUTONOMOUS RADAR
                  </span>
                  <span className="font-mono text-[8px] text-[#4D0181] font-bold mt-0.5">
                    ● ACTIVE STREAM
                  </span>
                </div>
              </div>
            </div>

            {/* EDITORIAL STATIONERY PROPS (Replicating Oryzo's pencil, paperclip & craft tools) */}
            {/* 1. Top-Right Matte Drafting Stylus / Pencil resting at 35deg */}
            <div className="absolute top-10 sm:top-14 right-16 sm:right-28 w-44 sm:w-60 h-3.5 bg-gradient-to-r from-[#FAFAFD] via-[#E7E6FB] to-[#B0ADDE] rounded-full shadow-[12px_18px_25px_rgba(26,0,66,0.12)] -rotate-[32deg] pointer-events-none border border-white/50 hidden sm:block">
              {/* Stylus tip */}
              <div className="absolute -left-3 top-0.5 w-3 h-2.5 bg-[#4D0181] rounded-l-xs clip-triangle" />
              {/* Metallic grip band */}
              <div className="absolute right-6 top-0 bottom-0 w-8 border-x border-[#1A0042]/20 bg-[#1A0042]/5" />
            </div>

            {/* 2. Top-Left Tactile Chrome Wire Paperclip & Specimen Card */}
            <div className="absolute top-20 left-16 sm:left-24 -rotate-12 pointer-events-none hidden sm:block">
              <div className="w-20 h-28 rounded-lg bg-white/70 backdrop-blur-md border border-white p-2 shadow-lg">
                <div className="w-full h-1.5 bg-[#1516A8]/40 rounded mb-1.5" />
                <div className="space-y-1">
                  <div className="w-3/4 h-1 bg-[#1A0042]/15 rounded" />
                  <div className="w-1/2 h-1 bg-[#1A0042]/15 rounded" />
                </div>
                <div className="mt-6 font-mono text-[7px] text-[#4D0181] font-bold">CW-01 #48.2%</div>
              </div>
              {/* Paperclip */}
              <div className="absolute -top-3 left-4 w-4 h-10 rounded-full border-2 border-[#1A0042]/40 shadow-xs" />
            </div>

            {/* 3. Bottom-Right Precision Craft Utility Cutter */}
            <div className="absolute bottom-12 sm:bottom-16 right-8 sm:right-20 w-48 sm:w-64 h-7 bg-gradient-to-r from-[#DCDAFD] via-white to-[#FAFAFD] rounded-xl border border-white/80 shadow-[10px_20px_30px_rgba(26,0,66,0.1)] rotate-[18deg] pointer-events-none hidden sm:flex items-center px-3 justify-between">
              <div className="w-6 h-3 bg-[#1516A8] rounded-md shadow-xs" />
              <div className="font-mono text-[8px] text-[#1A0042]/40 tracking-widest font-bold">SIGNALMINT CUTTER</div>
              <div className="w-2 h-2 rounded-full bg-[#1A0042]/20" />
            </div>
          </div>

          {/* Atmospheric ambient studio lighting highlights */}
          <div className="absolute -top-24 -left-24 w-[600px] h-[600px] rounded-full bg-white/40 filter blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full bg-[#6495EB]/15 filter blur-3xl pointer-events-none" />
        </div>

        {/* ========================================================================= */}
        {/* TOP-LEFT DISPLAY BRAND SECTION                                           */}
        {/* ========================================================================= */}
        <div className="z-10 pt-16 sm:pt-20 lg:pt-20 max-w-5xl">
          {/* Micro-eyebrow: THE AI CREATIVE THAT THINKS LIKE A CMO. */}
          <div ref={eyebrowRef} id="hero-eyebrow" className="mb-2 sm:mb-3">
            <span className="font-mono tracking-widest text-xs sm:text-sm font-bold text-[#1A0042]/80 uppercase inline-block">
              THE AI CREATIVE THAT THINKS LIKE A CMO.
            </span>
          </div>

          {/* Giant Brand Wordmark (#hero-floating-logo): Uses signalmintlogo.svg */}
          <div
            id="hero-floating-logo"
            ref={logoRef}
            className="origin-top-left inline-block select-none cursor-default max-w-full"
          >
            <img
              src={signalMintLogo}
              alt="SignalMint"
              className="h-12 sm:h-16 md:h-20 lg:h-24 xl:h-28 w-auto max-w-[88vw] sm:max-w-none object-contain"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTER-RIGHT NARRATIVE TEXT                                              */}
        {/* ========================================================================= */}
        <div
          ref={narrativeRef}
          id="hero-narrative"
          className="max-w-md ml-auto z-10 pr-2 lg:pr-12 my-auto text-right md:text-left"
        >
          <p className="text-lg sm:text-xl lg:text-2xl font-medium text-[#1A0042] leading-snug">
            SignalMint audits your competitors, isolates winning hooks, and protects your spend in real time. Designed to make every dollar convert.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM ROW: Left Glass Card | Center Scroll Indicator | Right Video Card */}
        {/* ========================================================================= */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6 z-10 pb-2 sm:pb-4">
          
          {/* Bottom-Left Editorial Glass Card */}
          <div
            ref={cardLeftRef}
            id="hero-glass-card"
            className="w-72 sm:w-80 bg-white/70 backdrop-blur-xl border border-white/60 p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col justify-between"
          >
            <div className="font-bold uppercase text-xs tracking-wider text-[#1A0042] leading-snug">
              DESIGNED FOR PERFORMANCE-FIRST FOUNDERS &amp; MARKETERS.
            </div>
            <div className="my-3.5 sm:my-4 border-t border-dotted border-[#1A0042]/20" />
            <div className="text-xs text-[#1A0042]/75 font-sans leading-relaxed">
              The autonomous intelligence system that eliminates ad guesswork.
            </div>
          </div>

          {/* Bottom-Center Minimal Pill: ⌄ SCROLL TO EXPLORE */}
          <div
            ref={scrollPillRef}
            id="hero-scroll-pill"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/75 backdrop-blur-md border border-white/80 shadow-xs font-mono text-xs tracking-widest text-[#1A0042]/70 uppercase animate-pulse select-none"
          >
            <span className="w-4 h-4 rounded-full bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center text-[10px] font-bold">
              ⌄
            </span>
            <span>SCROLL TO EXPLORE</span>
          </div>

          {/* Bottom-Right Interactive Floating Video Card */}
          <div
            ref={videoCardRef}
            id="hero-video-card"
            onClick={() => setShowVideoModal(true)}
            className="w-56 sm:w-64 bg-white/90 backdrop-blur-md p-2 rounded-2xl border border-white/80 shadow-2xl z-20 cursor-pointer group transition-transform duration-300 hover:scale-[1.03]"
          >
            {/* Video preview thumbnail box */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#1A0042] shadow-inner group-hover:shadow-md transition-shadow">
              {/* Abstract telemetry radar thumbnail preview */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1A0042] via-[#1516A8] to-[#4D0181] opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full opacity-40" viewBox="0 0 160 90">
                  <path
                    d="M 10 70 Q 40 20, 80 45 T 150 15"
                    fill="none"
                    stroke="#E7E6FB"
                    strokeWidth="2"
                  />
                  <circle cx="80" cy="45" r="3" fill="#E7E6FB" />
                </svg>
              </div>

              {/* Top Badge: ● LIVE RADAR */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[9px] font-mono font-bold text-[#1A0042] uppercase shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>LIVE RADAR</span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-white text-[#1516A8] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-4 h-4 fill-[#1516A8] ml-0.5" />
                </div>
              </div>
            </div>

            {/* Bottom mini label */}
            <div className="p-2 pt-2.5 flex items-center justify-between font-mono text-[10px] text-[#1A0042]">
              <span className="font-bold uppercase tracking-wider">PRODUCT WALKTHROUGH</span>
              <span className="text-[#1516A8] font-bold flex items-center gap-0.5">
                PLAY <span>▶</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 2-Min Demo Video Modal Walkthrough */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A0042]/50 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#FAFAFD] border border-[#1A0042]/20 rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#E7E6FB] text-[#1A0042] font-mono text-sm font-bold flex items-center justify-center hover:bg-[#1A0042] hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#1516A8] animate-pulse"></span>
              <span className="font-mono text-xs font-bold text-[#1516A8] uppercase">
                SIGNALMINT RADAR WALKTHROUGH (2:04)
              </span>
            </div>
            <h3 className="font-display font-bold text-xl text-[#1A0042] mb-3">
              How SCOUT reverse-engineers Crown Winners in real time
            </h3>
            <div className="aspect-video bg-[#E7E6FB] rounded-xl border border-[#1A0042]/10 flex flex-col items-center justify-center p-6 text-center mb-4 relative overflow-hidden">
              <div className="w-14 h-14 rounded-full bg-[#1516A8] text-white flex items-center justify-center shadow-lg mb-3">
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </div>
              <p className="font-mono text-xs text-[#1A0042]/80 font-medium z-10">
                Live simulation stream: Autonomous hook recognition &amp; real-time bleed stop engine.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  onOpenDemoModal?.();
                }}
                className="flex-1 py-3 rounded-xl bg-[#1516A8] text-white font-mono text-xs font-bold uppercase hover:bg-[#4D0181] transition-colors cursor-pointer"
              >
                Request Platform Access
              </button>
              <button
                onClick={() => setShowVideoModal(false)}
                className="px-4 py-3 rounded-xl border border-[#1A0042]/15 text-[#1A0042] font-mono text-xs font-bold hover:bg-[#E7E6FB] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
