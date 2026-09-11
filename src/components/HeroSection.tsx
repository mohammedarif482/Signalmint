import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";
import { Play } from "lucide-react";
import heroBgImage from "../assets/herobg.jpeg";
import demoThumbnailImage from "../assets/demothumbnail.jpeg";

gsap.registerPlugin(ScrollTrigger, Observer, SplitText);

interface HeroSectionProps {
  onOpenDemoModal?: () => void;
}

const PROOF_METRICS = [
  { text: "Audited 200+ D2C Accounts", highlight: false },
  { text: "₹5Cr+ Ad Spend Under Management", highlight: false },
  { text: "3.2x Avg ROAS Improvement", highlight: true },
  { text: "40+ Active DTC Brands", highlight: false },
  { text: "24hrs Audit", highlight: false },
  { text: "Zero Estimation // Data Driven Results", highlight: true },
];

export function HeroSection({ onOpenDemoModal }: HeroSectionProps) {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const runwayRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const narrativeInnerRef = useRef<HTMLDivElement>(null);
  const narrativeTextRef = useRef<HTMLParagraphElement>(null);
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

      // Master ScrollTrigger Scrub Timeline with GSAP pinning & calibrated holding buffer
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: runway,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Immediately position brand logo in its hero state at scroll=0
      gsap.set(brandLogo, {
        x: heroX,
        y: heroY,
        scale: heroScale,
        transformOrigin: "left top",
      });

      // Align eyebrow width and origin to match logo right edge
      const alignEyebrow = () => {
        if (!eyebrow || !brandLogo) return;
        if (window.innerWidth < 640) {
          eyebrow.style.left = "1.5rem";
          eyebrow.style.width = "calc(100vw - 3rem)";
          return;
        }
        const rect = brandLogo.getBoundingClientRect();
        if (rect.width > 0) {
          eyebrow.style.left = `${rect.left}px`;
          eyebrow.style.width = `${Math.max(rect.width, 320)}px`;
        }
      };
      alignEyebrow();
      window.addEventListener("resize", alignEyebrow);

      // 1. INITIAL REST / HOLD BUFFER (0% to 10% scroll holds hero stable)
      scrubTl.to({}, { duration: 0.10 }, 0);

      // 2. BRAND LOGO: Starts enlarged in Hero, glides smoothly into navbar as user scrolls (10% to 85%)
      scrubTl.fromTo(
        brandLogo,
        {
          x: heroX,
          y: heroY,
          scale: heroScale,
          transformOrigin: "left top",
          immediateRender: true,
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          transformOrigin: "left top",
          ease: "power1.inOut",
          duration: 0.75,
        },
        0.10
      );

      // 3. EYEBROW TRANSLATES UPWARDS & FADES OUT (10% to 38% scroll)
      if (eyebrow) {
        scrubTl.to(
          eyebrow,
          {
            y: -30,
            opacity: 0,
            duration: 0.28,
            ease: "power2.out",
          },
          0.10
        );
      }

      // 4. NARRATIVE EXITS (10% to 35% scroll)
      if (narrativeRef.current) {
        scrubTl.to(
          narrativeRef.current,
          {
            opacity: 0,
            y: -18,
            duration: 0.25,
            ease: "power2.out",
          },
          0.10
        );
      }

      // 5. BOTTOM CARDS & SCROLL PILL DISSOLVE DOWNWARD (12% to 50% scroll)
      const cardElements = [
        cardLeftRef.current,
        videoCardRef.current,
        scrollPillRef.current,
      ].filter(Boolean);

      scrubTl.to(
        cardElements,
        {
          opacity: 0,
          y: 26,
          stagger: 0.04,
          duration: 0.38,
          ease: "power2.out",
        },
        0.12
      );

      // 6. BACKGROUND WORKSPACE IMAGE PARALLAX SCRUB (10% to 100%)
      if (bg) {
        scrubTl.to(
          bg,
          {
            scale: 1.08,
            filter: "blur(4px)",
            ease: "none",
            duration: 0.9,
          },
          0.10
        );
      }

      // 4. GSAP OBSERVER: High-Performance Anti-Gravity Pointer & Touch Physics
      if (bgInnerRef.current && cardLeftInnerRef.current) {
        const xBg = gsap.quickTo(bgInnerRef.current, "x", { duration: 0.9, ease: "power2.out" });
        const yBg = gsap.quickTo(bgInnerRef.current, "y", { duration: 0.9, ease: "power2.out" });

        const xCard = gsap.quickTo(cardLeftInnerRef.current, "x", { duration: 0.7, ease: "power2.out" });
        const yCard = gsap.quickTo(cardLeftInnerRef.current, "y", { duration: 0.7, ease: "power2.out" });
        const rotXCard = gsap.quickTo(cardLeftInnerRef.current, "rotationX", { duration: 0.7, ease: "power2.out" });
        const rotYCard = gsap.quickTo(cardLeftInnerRef.current, "rotationY", { duration: 0.7, ease: "power2.out" });

        const xVideo = videoCardInnerRef.current
          ? gsap.quickTo(videoCardInnerRef.current, "x", { duration: 0.65, ease: "power2.out" })
          : null;
        const yVideo = videoCardInnerRef.current
          ? gsap.quickTo(videoCardInnerRef.current, "y", { duration: 0.65, ease: "power2.out" })
          : null;
        const rotXVideo = videoCardInnerRef.current
          ? gsap.quickTo(videoCardInnerRef.current, "rotationX", { duration: 0.65, ease: "power2.out" })
          : null;
        const rotYVideo = videoCardInnerRef.current
          ? gsap.quickTo(videoCardInnerRef.current, "rotationY", { duration: 0.65, ease: "power2.out" })
          : null;

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
            if (xVideo && yVideo && rotXVideo && rotYVideo) {
              xVideo(normX * -20);
              yVideo(normY * -15);
              rotXVideo(normY * -6);
              rotYVideo(normX * 8);
            }

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

            if (xVideo && yVideo && rotXVideo && rotYVideo) {
              xVideo(0);
              yVideo(0);
              rotXVideo(0);
              rotYVideo(0);
            }

            if (xNarrative && yNarrative) {
              xNarrative(0);
              yNarrative(0);
            }

            xBg(0);
            yBg(0);
          },
        });
      }

      // Responsive Line Splits on Load/Scroll (GSAP SplitText autoSplit + onSplit)
      if (narrativeTextRef.current) {
        new SplitText(narrativeTextRef.current, {
          type: "lines",
          autoSplit: true,
          mask: "lines",
          onSplit: (instance) => {
            return gsap.from(instance.lines, {
              yPercent: 110,
              opacity: 0,
              duration: 0.85,
              stagger: 0.08,
              ease: "power3.out",
              delay: 0.2,
            });
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
    <section id="hero-runway" ref={runwayRef} className="relative w-full bg-[#E7E6FB]">
      {/* PINNED INNER VIEWPORT (100vh Viewport pinned via GSAP) */}
      <div
        ref={viewportRef}
        className="h-screen w-full overflow-hidden relative select-none"
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

        {/* Eyebrow: AI NATIVE-PERFORMANCE MARKETING */}
        <div
          ref={eyebrowRef}
          id="hero-eyebrow"
          className="absolute top-11 sm:top-20 lg:top-[5.5rem] left-6 sm:left-11 lg:left-14 w-[calc(100vw-3rem)] sm:w-[532px] lg:w-[662px] flex justify-end z-20 pointer-events-none"
        >
          <span className="font-mono font-bold tracking-[0.11em] sm:tracking-[0.14em] text-[9.5px] sm:text-xs lg:text-[13px] text-[#1A0042] uppercase inline-block text-right whitespace-nowrap">
            AI NATIVE-PERFORMANCE MARKETING
          </span>
        </div>

        {/* ========================================================================= */}
        {/* NARRATIVE TEXT: Right below wordmark on mobile, right quadrant on desktop */}
        {/* ========================================================================= */}
        <div
          ref={narrativeRef}
          id="hero-narrative"
          className="absolute top-[22%] sm:top-[52%] sm:-translate-y-1/2 right-4 sm:right-10 lg:right-16 xl:right-24 z-20 max-w-[280px] sm:max-w-md lg:max-w-lg xl:max-w-xl text-right sm:text-left"
        >
          <div ref={narrativeInnerRef} className="will-change-transform">
            <p
              ref={narrativeTextRef}
              className="font-display font-semibold text-sm xs:text-base sm:text-2xl lg:text-[1.85rem] text-[#1A0042] leading-[1.3] tracking-tight"
            >
              Catching the Signal in your ads that Mint you money.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM-LEFT EDITORIAL TRANSLUCENT GLASS CARD (Wider with lesser height)  */}
        {/* ========================================================================= */}
        <div
          ref={cardLeftRef}
          id="hero-glass-card"
          className="absolute bottom-3 sm:bottom-10 lg:bottom-12 left-3 sm:left-10 lg:left-14 z-20 [perspective:1000px]"
        >
          <div
            ref={cardLeftInnerRef}
            className="w-[calc(100vw-2rem)] max-w-[240px] xs:max-w-[260px] sm:max-w-none sm:w-[13.5rem] lg:w-[14.5rem] min-h-[210px] sm:min-h-[260px] lg:min-h-[285px] p-4 sm:p-5 lg:p-6 rounded-2xl bg-white/[0.28] hover:bg-white/[0.38] backdrop-blur-md shadow-none flex flex-col justify-between overflow-hidden will-change-transform transition-colors duration-300 border-t border-l border-white/30 sm:border-none"
          >
            {/* Top Bold Grotesque Header */}
            <div>
              <div className="font-display font-bold text-[10px] xs:text-[11px] sm:text-[12.5px] lg:text-[13.5px] uppercase tracking-tight text-[#1A0042] leading-[1.25]">
                For brands that<br />
                measure in revenue,<br />
                not reach.
              </div>
            </div>

            {/* Editorial Dotted Separator */}
            <div className="w-[50%] border-b border-dotted border-[#1A0042]/35 my-2" />

            {/* Subtext */}
            <div className="text-[9px] xs:text-[9.5px] sm:text-[11px] lg:text-[11.5px] text-[#1A0042]/85 font-sans leading-[1.45] text-left">
              We audit first. Every recommendation is proven by your data.
            </div>

            {/* Instant Audit CTA */}
            <button
              onClick={onOpenDemoModal}
              className="self-start inline-flex items-center gap-1.5 font-mono text-[9px] xs:text-[9.5px] sm:text-[10.5px] font-bold text-[#573681] hover:text-[#1A0042] uppercase tracking-wider transition-colors cursor-pointer group pt-2"
            >
              <span className="border-b border-[#573681]/40 pb-0.5 group-hover:border-[#1A0042]">Book a 30-Min Audit</span>
              <span className="group-hover:translate-x-0.5 transition-transform text-[#573681]">→</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM-RIGHT FLOATING VIDEO CARD (Commented out per request)             */}
        {/* ========================================================================= */}
        {/*
        <div
          ref={videoCardRef}
          id="hero-video-card"
          onClick={() => setShowVideoModal(true)}
          className="absolute bottom-8 sm:bottom-8 lg:bottom-10 right-3 sm:right-10 lg:right-14 z-20 [perspective:1000px] cursor-pointer group"
        >
          <div
            ref={videoCardInnerRef}
            className="w-[42vw] max-w-[165px] sm:max-w-none sm:w-48 lg:w-52 h-[195px] sm:h-auto bg-white/85 backdrop-blur-xl p-1 rounded-2xl border-2 border-[#f59e0b]/70 sm:border-[#1A0042]/10 shadow-[0_8px_24px_rgba(245,158,11,0.2)] sm:shadow-[0_12px_30px_rgba(26,0,66,0.06)] transition-transform duration-300 hover:scale-[1.03] will-change-transform flex flex-col overflow-hidden"
          >
            <div className="relative flex-1 sm:aspect-video rounded-xl overflow-hidden bg-[#1A0042] shadow-inner group-hover:shadow-md transition-shadow">
              <img
                src={demoThumbnailImage}
                alt="See How We Audit Walkthrough Preview"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

              <div className="hidden sm:flex absolute top-1.5 left-1.5 items-center gap-1 px-1.5 py-0.5 rounded bg-white/90 backdrop-blur-sm text-[8px] font-mono font-bold text-[#1A0042] uppercase shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>HOW WE AUDIT</span>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <div className="w-8 h-8 rounded-full bg-white/95 text-[#573681] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-3.5 h-3.5 fill-[#573681] ml-0.5" />
                </div>
                <span className="font-sans font-black text-[9.5px] tracking-wider text-white uppercase drop-shadow-md">
                  PLAY
                </span>
              </div>
            </div>

            <div className="hidden sm:flex p-1.5 pt-2 items-center justify-between font-mono text-[9px] text-[#1A0042]">
              <span className="font-bold uppercase tracking-wider">AUDIT DEEP-DIVE</span>
              <span className="text-[#573681] font-bold flex items-center gap-0.5">
                PLAY <span>▶</span>
              </span>
            </div>
          </div>
        </div>
        */}

        {/* ========================================================================= */}
        {/* BOTTOM SCROLL INDICATOR: ⌄ SCROLL TO CONTINUE (Desktop only)               */}
        {/* ========================================================================= */}
        <div
          ref={scrollPillRef}
          id="hero-scroll-pill"
          className="hidden sm:flex absolute sm:bottom-9 sm:left-1/2 sm:-translate-x-1/2 z-20 items-center gap-2 font-mono text-[10px] sm:text-[10.5px] tracking-[0.2em] text-[#1A0042]/75 uppercase font-bold select-none pointer-events-none"
        >
          <svg
            className="w-4 h-4 text-[#1A0042]/70 shrink-0"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="10"
              cy="10"
              r="8.5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeDasharray="1.3 1.3"
            />
            <path
              d="M7 8.75L10 11.75L13 8.75"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>SCROLL TO CONTINUE</span>
        </div>
      </div>

      {/* Hero Proof Ticker Ribbon (Continuous Horizontal Scroll like TELEMETRY STREAM) */}
      <div className="w-full bg-[#573681] text-white py-2.5 sm:py-3 border-y border-white/15 overflow-hidden select-none shadow-xs">
        <div className="flex items-center w-full overflow-hidden select-none">
          {/* Pinned Static Badge: AGENCY PROOF METRICS */}
          <div className="shrink-0 flex items-center gap-2 pl-4 sm:pl-8 pr-3 sm:pr-4 py-0.5 border-r border-white/20 bg-[#573681] z-10 text-[9.5px] xs:text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase text-emerald-300 shadow-[6px_0_16px_rgba(87,54,129,0.95)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="whitespace-nowrap">AGENCY PROOF METRICS</span>
          </div>

          {/* Marquee Track: Moving metrics */}
          <div className="flex-1 relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]">
            <div
              className="flex items-center whitespace-nowrap animate-telemetry-marquee text-[10px] sm:text-[11.5px] font-mono pl-4"
              style={{ animationDuration: "24s" }}
            >
              {/* Duplicated track for continuous seamless loop */}
              {[0, 1].map((copyIdx) => (
                <div key={copyIdx} className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
                  {PROOF_METRICS.map((metric, idx) => (
                    <div key={`${copyIdx}-${idx}`} className="flex items-center gap-6 sm:gap-8">
                      <span
                        className={`${
                          metric.highlight
                            ? "text-emerald-300 font-bold bg-white/10 px-2.5 py-0.5 rounded-full border border-emerald-400/30"
                            : "text-white/85 font-medium"
                        }`}
                      >
                        {metric.text}
                      </span>
                      <span className="text-white/30 font-bold">//</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2-Min Demo Video Modal Walkthrough */}
      {showVideoModal && (
        <div
          onClick={() => setShowVideoModal(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/15 backdrop-blur-xs animate-in fade-in duration-200"
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
              <span className="w-2 h-2 rounded-full bg-[#573681] animate-pulse"></span>
              <span className="font-mono text-xs font-bold text-[#573681] uppercase">
                SEE HOW WE AUDIT (2:04)
              </span>
            </div>
            <h3 className="font-display font-bold text-xl text-[#1A0042] mb-3">
              How we diagnose account bleed &amp; creative fatigue before spending a dollar
            </h3>
            <div className="aspect-video bg-[#E7E6FB] rounded-xl border border-[#1A0042]/10 flex flex-col items-center justify-center p-6 text-center mb-4 relative overflow-hidden group">
              <img
                src={demoThumbnailImage}
                alt="Walkthrough Video Frame"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#1A0042]/35" />
              <div className="w-14 h-14 rounded-full bg-[#573681] text-white flex items-center justify-center shadow-lg mb-3 z-10 hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </div>
              <p className="font-mono text-xs text-white font-medium z-10 drop-shadow-sm">
                Watch our analysts break down a real D2C account architecture, uncover hidden audience cannibalization, and isolate winning hooks.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  onOpenDemoModal?.();
                }}
                className="flex-1 py-3 rounded-xl bg-[#573681] text-white font-mono text-xs font-bold uppercase hover:bg-[#1A0042] transition-colors cursor-pointer"
              >
                Book a 30-Min Audit
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
    </section>
  );
}
