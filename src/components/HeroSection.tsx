import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { Play } from "lucide-react";
import heroBgImage from "../assets/herobg.jpeg";

gsap.registerPlugin(ScrollTrigger, Observer);

interface HeroSectionProps {
  onOpenDemoModal?: () => void;
}

export function HeroSection({ onOpenDemoModal }: HeroSectionProps) {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const runwayRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
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
    const bg = bgRef.current;
    const eyebrow = eyebrowRef.current;
    if (!runway) return;

    const brandLogo = document.getElementById("brand-unified-logo");
    if (!brandLogo) return;

    // Calculate hero offset relative to navbar origin
    const getHeroTransform = () => {
      const isDesktop = window.innerWidth >= 1024;
      const isTablet = window.innerWidth >= 640;
      // High-impact commanding hero wordmark (matching Oryzo typography scale)
      const heroY = isDesktop ? 96 : isTablet ? 82 : 68;
      const heroX = isDesktop ? 24 : isTablet ? 12 : 0;
      const heroScale = isDesktop ? 2.55 : isTablet ? 2.05 : 1.65;
      return { heroX, heroY, heroScale };
    };

    const ctx = gsap.context(() => {
      const { heroX, heroY, heroScale } = getHeroTransform();

      // Master ScrollTrigger Scrub Timeline bound to the 200vh runway
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: runway,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // 1. BRAND LOGO: Starts enlarged in Hero, glides up into navbar as user scrolls (0% to 50%)
      scrubTl.fromTo(
        brandLogo,
        {
          x: heroX,
          y: heroY,
          scale: heroScale,
          transformOrigin: "left top",
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          transformOrigin: "left top",
          ease: "power1.inOut",
          duration: 0.5,
        },
        0
      );

      // 2. EYEBROW TRANSLATES UPWARDS & FADES OUT (0% to 22% scroll)
      if (eyebrow) {
        scrubTl.to(
          eyebrow,
          {
            y: -32,
            opacity: 0,
            duration: 0.22,
            ease: "power2.out",
          },
          0
        );
      }

      // 3. CENTER-RIGHT NARRATIVE EXITS EARLIEST (Frame 1: cleared by ~18% scroll)
      if (narrativeRef.current) {
        scrubTl.to(
          narrativeRef.current,
          {
            opacity: 0,
            y: -16,
            duration: 0.18,
            ease: "power2.out",
          },
          0
        );
      }

      // 4. BOTTOM CARDS & SCROLL PILL DISSOLVE DOWNWARD (0.05 to 0.38 scroll)
      const cardElements = [
        cardLeftRef.current,
        videoCardRef.current,
        scrollPillRef.current,
      ].filter(Boolean);

      scrubTl.to(
        cardElements,
        {
          opacity: 0,
          y: 20,
          stagger: 0.03,
          duration: 0.35,
          ease: "power2.out",
        },
        0.05
      );

      // 5. BACKGROUND WORKSPACE IMAGE PARALLAX SCRUB (0% to 100%)
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

        {/* Eyebrow: THE AI CREATIVE THAT THINKS LIKE A CMO. (Right-aligned to the enlarged wordmark) */}
        <div
          ref={eyebrowRef}
          id="hero-eyebrow"
          className="absolute top-12 sm:top-14 lg:top-16 left-6 sm:left-10 lg:left-14 w-[280px] sm:w-[480px] lg:w-[650px] flex justify-end z-20 pointer-events-none"
        >
          <span className="font-sans font-bold tracking-[0.14em] text-[10px] sm:text-[11px] lg:text-xs text-[#1A0042] uppercase inline-block text-right">
            THE AI CREATIVE THAT THINKS LIKE A CMO.
          </span>
        </div>

        {/* Mobile narrative text fallback */}
        <div className="md:hidden absolute top-48 left-6 z-20 max-w-sm">
          <p className="text-xs sm:text-sm text-[#1A0042]/80 leading-relaxed text-left">
            SignalMint audits your competitors, isolates winning hooks, and protects your spend in real time.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CENTER-RIGHT NARRATIVE TEXT (Vertically Centered in Right Quadrant)       */}
        {/* ========================================================================= */}
        <div
          ref={narrativeRef}
          id="hero-narrative"
          className="hidden md:block absolute top-[52%] -translate-y-1/2 right-6 sm:right-10 lg:right-16 xl:right-24 z-20 max-w-md lg:max-w-lg xl:max-w-xl text-left"
        >
          <div ref={narrativeInnerRef} className="will-change-transform">
            <p className="text-xl sm:text-2xl lg:text-[1.85rem] font-semibold text-[#1A0042] leading-[1.3] tracking-[-0.02em]">
              SignalMint audits your competitors, isolates winning hooks, and protects your spend in real time. Designed to make every dollar convert.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM-LEFT EDITORIAL TRANSLUCENT GLASS CARD (Exact Oryzo.ai layout)     */}
        {/* ========================================================================= */}
        <div
          ref={cardLeftRef}
          id="hero-glass-card"
          className="absolute bottom-6 sm:bottom-10 lg:bottom-12 left-6 sm:left-10 lg:left-14 z-20 [perspective:1000px]"
        >
          <div
            ref={cardLeftInnerRef}
            className="w-72 sm:w-80 lg:w-[22rem] h-72 sm:h-80 lg:h-[22rem] p-6 sm:p-7 lg:p-8 rounded-none bg-[#1A0042]/[0.08] hover:bg-[#1A0042]/[0.12] backdrop-blur-md border border-[#1A0042]/12 shadow-[0_12px_32px_rgba(26,0,66,0.04)] flex flex-col justify-between overflow-hidden will-change-transform transition-colors duration-300"
          >
            {/* Top Bold Grotesque Header (Exact Oryzo 4-line editorial styling) */}
            <div className="font-sans font-bold text-[15px] sm:text-base lg:text-[17px] uppercase tracking-[-0.01em] text-[#1A0042] leading-[1.2] max-w-[240px]">
              DESIGNED FOR<br />
              PERFORMANCE-FIRST<br />
              FOUNDERS &amp;<br />
              MARKETERS.
            </div>

            {/* Editorial Dotted Separator */}
            <div className="w-full border-b border-dotted border-[#1A0042]/30 my-auto" />

            {/* Bottom Right-Aligned Subtext (Exact Oryzo 3-line sentence-case styling) */}
            <div className="text-xs sm:text-[13px] text-[#1A0042]/85 font-sans leading-[1.4] text-right max-w-[210px] ml-auto">
              The autonomous<br />
              intelligence system that<br />
              eliminates ad guesswork.
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM-CENTER SCROLL INDICATOR: ⌄ SCROLL TO CONTINUE (Oryzo Style)        */}
        {/* ========================================================================= */}
        <div
          ref={scrollPillRef}
          id="hero-scroll-pill"
          className="hidden md:flex absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#1A0042]/70 uppercase font-semibold select-none animate-pulse"
        >
          <span className="w-5 h-5 rounded-full border border-[#1A0042]/35 flex items-center justify-center text-[9px] font-bold">
            ⌄
          </span>
          <span>SCROLL TO CONTINUE</span>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM-RIGHT FLOATING VIDEO CARD                                         */}
        {/* ========================================================================= */}
        <div
          ref={videoCardRef}
          id="hero-video-card"
          onClick={() => setShowVideoModal(true)}
          className="absolute bottom-6 sm:bottom-8 lg:bottom-10 right-6 sm:right-10 lg:right-14 z-20 [perspective:1000px] cursor-pointer group"
        >
          <div
            ref={videoCardInnerRef}
            className="w-44 sm:w-48 lg:w-52 bg-white/85 backdrop-blur-xl p-1 rounded-xl border border-[#1A0042]/10 shadow-[0_12px_30px_rgba(26,0,66,0.06)] transition-transform duration-300 hover:scale-[1.03] will-change-transform"
          >
            {/* Video preview thumbnail box */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-[#1A0042] shadow-inner group-hover:shadow-md transition-shadow">
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
              <div className="absolute top-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/90 backdrop-blur-sm text-[8px] font-mono font-bold text-[#1A0042] uppercase shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>LIVE RADAR</span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-white text-[#1516A8] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-3 h-3 fill-[#1516A8] ml-0.5" />
                </div>
              </div>
            </div>

            {/* Bottom mini label */}
            <div className="p-1.5 pt-2 flex items-center justify-between font-mono text-[9px] text-[#1A0042]">
              <span className="font-bold uppercase tracking-wider">WALKTHROUGH</span>
              <span className="text-[#1516A8] font-bold flex items-center gap-0.5">
                PLAY <span>▶</span>
              </span>
            </div>
          </div>
        </div>
    </div>

      {/* 2-Min Demo Video Modal Walkthrough */}
      {showVideoModal && (
        <div
          onClick={() => setShowVideoModal(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1A0042]/60 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAFAFD] border border-[#1A0042]/20 rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative"
          >
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
