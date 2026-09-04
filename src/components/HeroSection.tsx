import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { Play } from "lucide-react";
import signalMintLogo from "../assets/signalmintlogo.svg";
import heroBgImage from "../assets/herobg.jpeg";

gsap.registerPlugin(ScrollTrigger, Observer);

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
  const narrativeInnerRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardLeftInnerRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const videoCardInnerRef = useRef<HTMLDivElement>(null);
  const scrollPillRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bgInnerRef = useRef<HTMLDivElement>(null);

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

      // 4. GSAP OBSERVER: High-Performance Anti-Gravity Pointer & Touch Physics
      if (bgInnerRef.current && cardLeftInnerRef.current && videoCardInnerRef.current) {
        const xBg = gsap.quickTo(bgInnerRef.current, "x", { duration: 0.9, ease: "power2.out" });
        const yBg = gsap.quickTo(bgInnerRef.current, "y", { duration: 0.9, ease: "power2.out" });

        const xCard = gsap.quickTo(cardLeftInnerRef.current, "x", { duration: 0.7, ease: "power2.out" });
        const yCard = gsap.quickTo(cardLeftInnerRef.current, "y", { duration: 0.7, ease: "power2.out" });
        const rotXCard = gsap.quickTo(cardLeftInnerRef.current, "rotationX", { duration: 0.7, ease: "power2.out" });
        const rotYCard = gsap.quickTo(cardLeftInnerRef.current, "rotationY", { duration: 0.7, ease: "power2.out" });

        const xVideo = gsap.quickTo(videoCardInnerRef.current, "x", { duration: 0.65, ease: "power2.out" });
        const yVideo = gsap.quickTo(videoCardInnerRef.current, "y", { duration: 0.65, ease: "power2.out" });
        const rotXVideo = gsap.quickTo(videoCardInnerRef.current, "rotationX", { duration: 0.65, ease: "power2.out" });
        const rotYVideo = gsap.quickTo(videoCardInnerRef.current, "rotationY", { duration: 0.65, ease: "power2.out" });

        const xNarrative = narrativeInnerRef.current
          ? gsap.quickTo(narrativeInnerRef.current, "x", { duration: 0.8, ease: "power2.out" })
          : null;
        const yNarrative = narrativeInnerRef.current
          ? gsap.quickTo(narrativeInnerRef.current, "y", { duration: 0.8, ease: "power2.out" })
          : null;

        Observer.create({
          target: window,
          type: "pointer,touch",
          onMove: (self) => {
            if (self.x == null || self.y == null) return;
            // Only apply while hero fold is visible
            if (window.scrollY > window.innerHeight * 0.75) return;

            const normX = (self.x / window.innerWidth - 0.5) * 2;
            const normY = (self.y / window.innerHeight - 0.5) * 2;

            // Deep spatial plane separation:
            // Background drifts softly opposite for depth
            xBg(normX * 18);
            yBg(normY * 14);

            // Left card floats forward with subtle 3D perspective tilt
            xCard(normX * -14);
            yCard(normY * -10);
            rotXCard(normY * -5);
            rotYCard(normX * 6);

            // Floating video card floats with heightened responsiveness
            xVideo(normX * -20);
            yVideo(normY * -15);
            rotXVideo(normY * -6);
            rotYVideo(normX * 8);

            // Editorial narrative shifts gently
            if (xNarrative && yNarrative) {
              xNarrative(normX * -9);
              yNarrative(normY * -7);
            }
          },
          onStop: () => {
            // Smoothly glide back to neutral rest position
            xCard(0);
            yCard(0);
            rotXCard(0);
            rotYCard(0);

            xVideo(0);
            yVideo(0);
            rotXVideo(0);
            rotYVideo(0);

            if (xNarrative && yNarrative) {
              xNarrative(0);
              yNarrative(0);
            }

            xBg(0);
            yBg(0);
          },
        });
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
      {/* PINNED INNER VIEWPORT (100vh Sticky Viewport with Absolute Spatial HUD) */}
      <div
        ref={viewportRef}
        className="sticky top-0 h-screen w-full overflow-hidden relative select-none"
      >
        {/* ========================================================================= */}
        {/* BACKGROUND LAYER: Full-screen Editorial Visual (herobg.jpeg)              */}
        {/* ========================================================================= */}
        <div
          ref={bgRef}
          className="absolute inset-0 z-0 origin-center pointer-events-none overflow-hidden bg-[#E7E6FB]"
        >
          <div ref={bgInnerRef} className="w-full h-full will-change-transform scale-[1.06]">
            <img
              src={heroBgImage}
              alt="SignalMint Hero Background"
              className="w-full h-full object-cover object-center select-none"
            />

            {/* Faint ambient atmospheric tint ensuring text readability */}
            <div className="absolute inset-0 bg-[#1A0042]/5 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#E7E6FB]/30 via-transparent to-[#E7E6FB]/20 pointer-events-none" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TOP-LEFT DISPLAY BRAND SECTION                                           */}
        {/* ========================================================================= */}
        <div className="absolute top-16 sm:top-20 lg:top-24 left-6 sm:left-10 lg:left-14 z-20 w-fit flex flex-col items-end">
          {/* Micro-eyebrow: THE AI CREATIVE THAT THINKS LIKE A CMO. (Right-aligned to end of logo) */}
          <div ref={eyebrowRef} id="hero-eyebrow" className="mb-2 sm:mb-2.5 w-full text-right">
            <span className="font-mono tracking-[0.16em] sm:tracking-[0.2em] text-[10px] sm:text-[11px] lg:text-xs font-bold text-[#1A0042]/75 uppercase inline-block">
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
              className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 w-auto max-w-[85vw] sm:max-w-none object-contain block"
            />
          </div>

          {/* Mobile narrative text fallback */}
          <p className="md:hidden text-xs sm:text-sm text-[#1A0042]/80 mt-4 leading-relaxed max-w-sm self-start text-left">
            SignalMint audits your competitors, isolates winning hooks, and protects your spend in real time.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CENTER-RIGHT NARRATIVE TEXT (Vertically Centered in Right Quadrant)       */}
        {/* ========================================================================= */}
        <div
          ref={narrativeRef}
          id="hero-narrative"
          className="hidden md:block absolute top-1/2 -translate-y-1/2 right-6 sm:right-10 lg:right-16 z-20 max-w-sm lg:max-w-md xl:max-w-lg text-left"
        >
          <div ref={narrativeInnerRef} className="will-change-transform">
            <p className="text-xl sm:text-2xl lg:text-[1.65rem] font-medium text-[#1A0042] leading-[1.3] tracking-tight">
              SignalMint audits your competitors, isolates winning hooks, and protects your spend in real time. Designed to make every dollar convert.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM-LEFT EDITORIAL TRANSLUCENT GLASS CARD (Oryzo.ai style)            */}
        {/* ========================================================================= */}
        <div
          ref={cardLeftRef}
          id="hero-glass-card"
          className="absolute bottom-6 sm:bottom-8 lg:bottom-12 left-6 sm:left-10 lg:left-14 z-20 [perspective:1000px]"
        >
          <div
            ref={cardLeftInnerRef}
            className="w-72 sm:w-80 lg:w-[21.5rem] h-64 sm:h-72 lg:h-[19.5rem] p-6 sm:p-7 lg:p-8 rounded-none bg-white/[0.16] hover:bg-white/[0.22] backdrop-blur-md border border-white/25 shadow-[0_12px_32px_rgba(26,0,66,0.04)] flex flex-col justify-between overflow-hidden will-change-transform transition-colors duration-300"
          >
            {/* Top Bold Grotesque Header (Oryzo Style) */}
            <div className="font-sans font-extrabold text-sm sm:text-[15px] lg:text-base uppercase tracking-tight text-[#1A0042] leading-[1.25] max-w-[240px]">
              DESIGNED FOR PERFORMANCE-FIRST FOUNDERS &amp; MARKETERS.
            </div>

            {/* Editorial Dotted Separator */}
            <div className="w-full border-b border-dotted border-[#1A0042]/25 my-auto" />

            {/* Bottom Right-Aligned Subtext */}
            <div className="text-xs sm:text-[13px] text-[#1A0042]/85 font-sans leading-relaxed text-right max-w-[210px] ml-auto">
              The autonomous intelligence system that eliminates ad guesswork.
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM-CENTER SCROLL INDICATOR: ⌄ SCROLL TO EXPLORE                       */}
        {/* ========================================================================= */}
        <div
          ref={scrollPillRef}
          id="hero-scroll-pill"
          className="hidden md:flex absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#1A0042]/70 uppercase font-semibold select-none animate-pulse"
        >
          <span className="w-5 h-5 rounded-full border border-[#1A0042]/35 flex items-center justify-center text-[9px] font-bold">
            ⌄
          </span>
          <span>SCROLL TO EXPLORE</span>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM-RIGHT FLOATING VIDEO CARD                                         */}
        {/* ========================================================================= */}
        <div
          ref={videoCardRef}
          id="hero-video-card"
          onClick={() => setShowVideoModal(true)}
          className="absolute bottom-6 sm:bottom-8 lg:bottom-10 right-6 sm:right-10 lg:right-16 z-20 [perspective:1000px] cursor-pointer group"
        >
          <div
            ref={videoCardInnerRef}
            className="w-52 sm:w-60 lg:w-64 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-white/80 ring-1 ring-amber-400/40 shadow-2xl transition-transform duration-300 hover:scale-[1.03] will-change-transform"
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
