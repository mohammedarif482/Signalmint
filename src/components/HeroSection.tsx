import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";
import heroBgImage from "../assets/herobg.png";

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
  const runwayRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const narrativeInnerRef = useRef<HTMLDivElement>(null);
  const narrativeTextRef = useRef<HTMLParagraphElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardLeftInnerRef = useRef<HTMLDivElement>(null);
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
    <section id="hero-runway" ref={runwayRef} className="relative w-full bg-[#0a0c1f]">
      {/* PINNED INNER VIEWPORT (100vh Viewport pinned via GSAP) */}
      <div
        ref={viewportRef}
        className="h-screen h-[100dvh] w-full overflow-hidden relative select-none"
      >
        {/* ========================================================================= */}
        {/* BACKGROUND LAYER: Full-screen Editorial Visual (herobg.png)               */}
        {/* ========================================================================= */}
        <div
          ref={bgRef}
          className="absolute inset-0 z-0 origin-center pointer-events-none overflow-hidden bg-[#0a0c1f]"
        >
          <div ref={bgInnerRef} className="w-full h-full will-change-transform">
            <img
              src={heroBgImage}
              alt="SignalMint Hero Background"
              className="w-full h-full object-fill object-center select-none"
            />
          </div>
        </div>

        {/* Eyebrow: AI NATIVE, PERFORMANCE MARKETING */}
        <div
          ref={eyebrowRef}
          id="hero-eyebrow"
          className="absolute top-11 sm:top-20 lg:top-[5.5rem] left-6 sm:left-11 lg:left-14 w-[calc(100vw-3rem)] sm:w-[532px] lg:w-[662px] flex justify-end z-20 pointer-events-none"
        >
          <span className="font-mono font-bold tracking-[0.12em] sm:tracking-[0.15em] text-[9.5px] sm:text-xs lg:text-[12.5px] text-white/80 uppercase inline-block text-right whitespace-nowrap drop-shadow-sm">
            AI NATIVE, PERFORMANCE MARKETING
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
              className="font-display font-medium text-sm xs:text-base sm:text-2xl lg:text-[1.85rem] text-white leading-[1.3] tracking-tight"
            >
              Catching the <span className="text-[#C084FC] font-semibold">Signal</span> in your ads to <span className="text-[#C084FC] font-semibold">Mint</span> you money.
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
            className="w-[calc(100vw-2rem)] max-w-[240px] xs:max-w-[260px] sm:max-w-none sm:w-[13.5rem] lg:w-[14.5rem] min-h-[210px] sm:min-h-[260px] lg:min-h-[285px] p-4 sm:p-5 lg:p-6 rounded-2xl bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.37)] flex flex-col justify-between overflow-hidden will-change-transform transition-colors duration-300"
          >
            {/* Top Bold Grotesque Header */}
            <div>
              <div className="font-display font-bold text-[10px] xs:text-[11px] sm:text-[12.5px] lg:text-[13.5px] uppercase tracking-tight text-white leading-[1.25]">
                For performance-first<br />
                founders &amp;<br />
                marketers.
              </div>
            </div>

            {/* Editorial Dotted Separator */}
            <div className="w-[50%] border-b border-dotted border-white/25 my-2" />

            {/* Subtext */}
            <div className="text-[9px] xs:text-[9.5px] sm:text-[11px] lg:text-[11.5px] text-white/75 font-sans leading-[1.45] text-left">
              We audit first. Every recommendation is proven by your data.
            </div>

            {/* Instant Audit CTA */}
            <button
              onClick={onOpenDemoModal}
              className="self-start inline-flex items-center gap-1.5 font-mono text-[9px] xs:text-[9.5px] sm:text-[10.5px] font-bold text-[#C084FC] hover:text-white uppercase tracking-wider transition-colors cursor-pointer group pt-2"
            >
              <span className="border-b border-[#C084FC]/40 pb-0.5 group-hover:border-white">Book a 30-Min Audit</span>
              <span className="group-hover:translate-x-0.5 transition-transform text-[#C084FC] group-hover:text-white">→</span>
            </button>
          </div>
        </div>


        {/* ========================================================================= */}
        {/* BOTTOM SCROLL INDICATOR: ⌄ SCROLL TO CONTINUE (Desktop only)               */}
        {/* ========================================================================= */}
        <div
          ref={scrollPillRef}
          id="hero-scroll-pill"
          className="hidden sm:flex absolute sm:bottom-9 sm:left-1/2 sm:-translate-x-1/2 z-20 items-center gap-2 font-mono text-[10px] sm:text-[10.5px] tracking-[0.2em] text-white/80 uppercase font-bold select-none pointer-events-none drop-shadow-sm"
        >
          <svg
            className="w-4 h-4 text-white/80 shrink-0"
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

    </section>
  );
}
