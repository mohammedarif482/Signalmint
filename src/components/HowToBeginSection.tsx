import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface HowToBeginSectionProps {
  onOpenDemoModal?: () => void;
}

export function HowToBeginSection({ onOpenDemoModal }: HowToBeginSectionProps) {
  const runwayRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const bottomCalloutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    const card3 = card3Ref.current;
    const card4 = card4Ref.current;
    const titleContainer = titleContainerRef.current;
    const titleText = titleTextRef.current;
    const cardsContainer = cardsContainerRef.current;
    const bottomCallout = bottomCalloutRef.current;

    if (!runway || !card1 || !card2 || !card3 || !card4 || !titleContainer || !titleText || !cardsContainer) return;

    const mm = gsap.matchMedia();

    // -------------------------------------------------------------------------
    // RESPONSIVE GSAP SCROLLTRIGGER (4 Cards Peeling Sequence)
    // -------------------------------------------------------------------------
    mm.add(
      {
        isMobile: "(max-width: 639px)",
        isDesktop: "(min-width: 640px)",
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean; isDesktop: boolean };

        const startTitleY = isMobile ? -175 : -270;
        const startCardsY = isMobile ? 185 : 260;
        const titleScaleStart = isMobile ? 0.52 : 0.44;
        const titleScaleEnd = isMobile ? 0.95 : 1.0;
        const scrollDistance = isMobile ? "+=280%" : "+=380%";
        const exitYPercent = isMobile ? -140 : -150;

        // 1. Natural physical card stack hierarchy:
        // Card 1 (zIndex 40) -> Card 2 (zIndex 30) -> Card 3 (zIndex 20) -> Card 4 (zIndex 10)
        gsap.set(card1, {
          scale: 1,
          yPercent: 0,
          y: 0,
          rotation: -3.5,
          opacity: 1,
          zIndex: 40,
          pointerEvents: "auto",
        });

        gsap.set(card2, {
          scale: 0.94,
          yPercent: 0,
          y: isMobile ? 15 : 20,
          rotation: 3.5,
          opacity: 0.85,
          zIndex: 30,
          pointerEvents: "auto",
        });

        gsap.set(card3, {
          scale: 0.88,
          yPercent: 0,
          y: isMobile ? 30 : 40,
          rotation: -1.5,
          opacity: 0.7,
          zIndex: 20,
          pointerEvents: "auto",
        });

        gsap.set(card4, {
          scale: 0.82,
          yPercent: 0,
          y: isMobile ? 45 : 60,
          rotation: 2,
          opacity: 0.5,
          zIndex: 10,
          pointerEvents: "auto",
        });

        // Title and Cards initial coordinates
        gsap.set(titleContainer, {
          y: startTitleY,
        });

        gsap.set(titleText, {
          scale: titleScaleStart,
          color: "#1A0042",
          opacity: 1,
        });

        gsap.set(cardsContainer, {
          y: startCardsY,
        });

        if (bottomCallout) {
          gsap.set(bottomCallout, {
            opacity: 0,
            y: 15,
          });
        }

        // 2. Master Scrub Timeline with Pinning
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: runway,
            start: "top top",
            end: scrollDistance,
            pin: true,
            scrub: isMobile ? 0.6 : 0.8,
            invalidateOnRefresh: true,
          },
        });

        // =====================================================================
        // PHASE 0 (0.0 -> 0.8s):
        // "WHY US" glides from top down into the center behind the cards
        // Cards container smoothly rises from below into the vertical center.
        // Bottom methodology statement fades in.
        // =====================================================================
        scrubTl.to(
          titleContainer,
          {
            y: 0,
            ease: "power2.out",
            duration: 0.8,
          },
          0
        );

        scrubTl.to(
          titleText,
          {
            scale: titleScaleEnd,
            color: "#CBD5E1",
            opacity: isMobile ? 0.55 : 0.65,
            ease: "power2.out",
            duration: 0.8,
          },
          0
        );

        scrubTl.to(
          cardsContainer,
          {
            y: 0,
            ease: "power2.out",
            duration: 0.8,
          },
          0
        );

        if (bottomCallout) {
          scrubTl.to(
            bottomCallout,
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.8,
            },
            0
          );
        }

        // =====================================================================
        // PHASE 1 (0.8 -> 1.2s):
        // Hold Card 1 in primary focus
        // =====================================================================
        scrubTl.to({}, { duration: 0.4 }, 0.8);

        // =====================================================================
        // TRANSITION 1 -> 2 (1.2 -> 2.0s):
        // Card 1 rotates and peels UP & OUT over Card 2
        // Card 2 moves into full center focus
        // Card 3 & 4 step forward
        // =====================================================================
        scrubTl.to(
          card1,
          {
            yPercent: exitYPercent,
            rotation: -18,
            opacity: 0,
            scale: 0.9,
            ease: "power2.inOut",
            duration: 0.8,
          },
          1.2
        );

        scrubTl.to(
          card2,
          {
            scale: 1,
            y: 0,
            rotation: 3.5,
            opacity: 1,
            ease: "power2.out",
            duration: 0.8,
          },
          1.2
        );

        scrubTl.to(
          card3,
          {
            scale: 0.94,
            y: isMobile ? 15 : 20,
            rotation: -1.5,
            opacity: 0.85,
            ease: "power2.out",
            duration: 0.8,
          },
          1.2
        );

        scrubTl.to(
          card4,
          {
            scale: 0.88,
            y: isMobile ? 30 : 40,
            rotation: 2,
            opacity: 0.7,
            ease: "power2.out",
            duration: 0.8,
          },
          1.2
        );

        // =====================================================================
        // PHASE 2 (2.0 -> 2.4s):
        // Hold Card 2 in primary focus
        // =====================================================================
        scrubTl.to({}, { duration: 0.4 }, 2.0);

        // =====================================================================
        // TRANSITION 2 -> 3 (2.4 -> 3.2s):
        // Card 2 rotates and peels UP & OUT over Card 3
        // Card 3 moves into full center focus
        // Card 4 steps forward
        // =====================================================================
        scrubTl.to(
          card2,
          {
            yPercent: exitYPercent,
            rotation: 18,
            opacity: 0,
            scale: 0.9,
            ease: "power2.inOut",
            duration: 0.8,
          },
          2.4
        );

        scrubTl.to(
          card3,
          {
            scale: 1,
            y: 0,
            rotation: -2.5,
            opacity: 1,
            ease: "power2.out",
            duration: 0.8,
          },
          2.4
        );

        scrubTl.to(
          card4,
          {
            scale: 0.94,
            y: isMobile ? 15 : 20,
            rotation: 1.5,
            opacity: 0.85,
            ease: "power2.out",
            duration: 0.8,
          },
          2.4
        );

        // =====================================================================
        // PHASE 3 (3.2 -> 3.6s):
        // Hold Card 3 in primary focus
        // =====================================================================
        scrubTl.to({}, { duration: 0.4 }, 3.2);

        // =====================================================================
        // TRANSITION 3 -> 4 (3.6 -> 4.4s):
        // Card 3 rotates and peels UP & OUT over Card 4
        // Card 4 moves into full center focus
        // =====================================================================
        scrubTl.to(
          card3,
          {
            yPercent: exitYPercent,
            rotation: -16,
            opacity: 0,
            scale: 0.9,
            ease: "power2.inOut",
            duration: 0.8,
          },
          3.6
        );

        scrubTl.to(
          card4,
          {
            scale: 1,
            y: 0,
            rotation: -2,
            opacity: 1,
            ease: "power2.out",
            duration: 0.8,
          },
          3.6
        );

        // =====================================================================
        // PHASE 4 (4.4 -> 5.0s):
        // Hold Card 4 in primary focus with CTA ready to interact
        // =====================================================================
        scrubTl.to(
          titleText,
          {
            scale: titleScaleEnd * 1.04,
            y: -12,
            ease: "none",
            duration: 0.6,
          },
          4.4
        );
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="why-us"
      ref={runwayRef}
      className="relative w-full bg-fading-dot-grid text-[#1A0042] select-none border-t border-[#1A0042]/10 overflow-hidden"
    >
      {/* Pinned Viewport (100dvh for mobile dynamic viewport bar stability) */}
      <div
        ref={viewportRef}
        className="h-[100dvh] min-h-[540px] w-full relative bg-fading-dot-grid flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
      >
        {/* Ambient background glow */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(87,54,129,0.06)_0%,transparent_70%)]" />

        {/* Dynamic Title Container:
            Starts at the top as a dark, prominent section header, then moves down into the vertical
            center of the screen behind the card as a light-colored watermark on scroll! */}
        <div
          ref={titleContainerRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-[1] px-4 will-change-transform"
        >
          <h2
            ref={titleTextRef}
            className="font-display font-black text-[13vw] sm:text-8xl md:text-9xl lg:text-[13vw] tracking-tight uppercase leading-none whitespace-nowrap will-change-transform origin-center"
          >
            Why Us
          </h2>
        </div>

        {/* Interactive Stacked Cards Container: 4 Cards Stack */}
        <div
          ref={cardsContainerRef}
          className="relative w-full max-w-[315px] xs:max-w-[340px] sm:max-w-[420px] h-[415px] xs:h-[435px] sm:h-[515px] flex items-center justify-center z-20 will-change-transform"
        >
          {/* ========================================================================= */}
          {/* CARD 01: Audit First, Always (zIndex 40 - Top card)                       */}
          {/* ========================================================================= */}
          <div
            ref={card1Ref}
            className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] p-5 xs:p-6 sm:p-8 bg-gradient-to-br from-[#6366F1]/75 via-[#573681]/70 to-[#3B1F69]/80 backdrop-blur-xl sm:backdrop-blur-2xl text-white shadow-[0_25px_50px_-12px_rgba(87,54,129,0.35),inset_0_1px_1px_0_rgba(255,255,255,0.35)] border border-white/35 flex flex-col justify-between overflow-hidden will-change-transform"
          >
            {/* Top Text Content */}
            <div className="relative z-10 space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/15 text-white/90 font-mono text-[8.5px] sm:text-[10px] font-bold tracking-widest uppercase border border-white/20">
                  01 // METHODOLOGY
                </span>
                <span className="font-mono text-[9.5px] sm:text-[10px] text-white/60 font-bold">AUDIT-FIRST</span>
              </div>

              <h3 className="font-display font-bold text-xl xs:text-2xl sm:text-3xl text-white tracking-tight leading-snug pt-0.5">
                Audit First, Always
              </h3>

              <p className="font-sans text-[11px] xs:text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
                Every recommendation comes from YOUR account data, not best practices. We look at what's actually broken before we fix anything.
              </p>
            </div>

            {/* 3D-styled Vector Illustration (Audit Dossier & Telemetry Ring) */}
            <div className="relative w-full h-34 xs:h-38 sm:h-48 flex items-center justify-center my-auto">
              <svg
                viewBox="0 0 320 220"
                className="w-full h-full select-none filter drop-shadow-xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="160" cy="150" rx="110" ry="30" fill="#FFFFFF" fillOpacity="0.12" />
                <ellipse
                  cx="160"
                  cy="120"
                  rx="135"
                  ry="45"
                  stroke="#FFFFFF"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                <g transform="translate(160, 115) scale(0.95)">
                  <path d="M-60 -40 L30 -75 L70 -35 L-20 0 Z" fill="#311956" fillOpacity="0.6" />
                  <path d="M-55 -35 L35 -70 L65 -30 L-25 5 Z" fill="#E0E7FF" />
                  <path d="M-50 -30 L40 -65 L60 -25 L-30 10 Z" fill="#FFFFFF" stroke="#C7D2FE" strokeWidth="2" />
                  <line x1="-30" y1="-30" x2="20" y2="-50" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
                  <line x1="-25" y1="-20" x2="35" y2="-44" stroke="#A5B4FC" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="-20" y1="-10" x2="25" y2="-28" stroke="#A5B4FC" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="-15" y1="0" x2="10" y2="-10" stroke="#C7D2FE" strokeWidth="2" strokeLinecap="round" />
                  <path d="M-10 -55 L10 -63 L25 -52 L5 -44 Z" fill="#6366F1" />
                  <circle cx="25" cy="5" r="26" fill="#4F46E5" fillOpacity="0.3" stroke="#FFFFFF" strokeWidth="3" />
                  <circle cx="25" cy="5" r="19" fill="#FFFFFF" fillOpacity="0.2" />
                  <line x1="44" y1="24" x2="68" y2="48" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
                </g>

                <g transform="translate(65, 95)">
                  <circle cx="0" cy="0" r="14" fill="#FFFFFF" fillOpacity="0.9" />
                  <circle cx="0" cy="0" r="14" stroke="#573681" strokeWidth="2" strokeOpacity="0.3" />
                  <line x1="0" y1="0" x2="0" y2="-6" stroke="#573681" strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="0" x2="5" y2="0" stroke="#573681" strokeWidth="2" strokeLinecap="round" />
                </g>

                <g transform="translate(255, 135)">
                  <rect x="-14" y="-14" width="28" height="28" rx="6" fill="#FFFFFF" fillOpacity="0.95" />
                  <path d="M-7 0 L-2 5 L8 -5" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                <rect x="24" y="175" width="105" height="22" rx="4" fill="#FFFFFF" fillOpacity="0.15" stroke="#FFFFFF" strokeOpacity="0.3" />
                <text x="76" y="190" fill="#FFFFFF" fontSize="9" fontFamily="'Montserrat', sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.08em">
                  [AUDIT READY]
                </text>
              </svg>
            </div>

            {/* Footer Text (No check icon) */}
            <div className="pt-1.5 sm:pt-2 border-t border-white/15 text-[10.5px] sm:text-[11.5px] font-mono uppercase tracking-wider text-white/90 font-semibold">
              No guessing. No templates.
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 02: Real-Time Account Health (zIndex 30 - Second card)               */}
          {/* ========================================================================= */}
          <div
            ref={card2Ref}
            className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] p-5 xs:p-6 sm:p-8 bg-gradient-to-br from-[#2563EB]/75 via-[#4338CA]/70 to-[#573681]/80 backdrop-blur-xl sm:backdrop-blur-2xl text-white shadow-[0_25px_50px_-12px_rgba(37,99,235,0.35),inset_0_1px_1px_0_rgba(255,255,255,0.35)] border border-white/35 flex flex-col justify-between overflow-hidden will-change-transform"
          >
            {/* Top Text Content */}
            <div className="relative z-10 space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/15 text-white/90 font-mono text-[8.5px] sm:text-[10px] font-bold tracking-widest uppercase border border-white/20">
                  02 // TELEMETRY
                </span>
                <span className="font-mono text-[9.5px] sm:text-[10px] text-cyan-300 font-bold">12-MIN SLA</span>
              </div>

              <h3 className="font-display font-bold text-xl xs:text-2xl sm:text-3xl text-white tracking-tight leading-snug pt-0.5">
                Real-Time Account Health
              </h3>

              <p className="font-sans text-[11px] xs:text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
                We catch budget bleed in 12 minutes. You'd find it tomorrow morning after losing ₹20,000+. We stop it before it gets expensive.
              </p>
            </div>

            {/* 3D-styled Vector Illustration (Cinema Camera, Film Reel & Waveform) */}
            <div className="relative w-full h-34 xs:h-38 sm:h-48 flex items-center justify-center my-auto">
              <svg
                viewBox="0 0 320 220"
                className="w-full h-full select-none filter drop-shadow-xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="160" cy="150" rx="110" ry="30" fill="#FFFFFF" fillOpacity="0.12" />

                <g transform="translate(145, 105)">
                  <rect x="-45" y="-25" width="90" height="60" rx="14" fill="#1E1B4B" fillOpacity="0.85" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="-20" cy="-35" r="18" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="-20" cy="-35" r="8" fill="#1E1B4B" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="20" cy="-35" r="18" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="20" cy="-35" r="8" fill="#1E1B4B" stroke="#FFFFFF" strokeWidth="1.5" />

                  <path d="M45 -12 L75 -24 L75 34 L45 22 Z" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                  <ellipse cx="75" cy="5" rx="8" ry="29" fill="#60A5FA" stroke="#FFFFFF" strokeWidth="2" />
                  <ellipse cx="75" cy="5" rx="4" ry="16" fill="#93C5FD" />

                  <rect x="-35" y="-15" width="38" height="16" rx="4" fill="#EF4444" />
                  <circle cx="-26" cy="-7" r="3" fill="#FFFFFF" />
                  <text x="-16" y="-3" fill="#FFFFFF" fontSize="8" fontFamily="'Montserrat', sans-serif" fontWeight="bold">
                    REC
                  </text>

                  <path
                    d="M-35 15 Q-20 2, -10 15 T10 15 T30 15"
                    stroke="#60A5FA"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>

                <path
                  d="M40 160 C90 190, 180 180, 280 140"
                  stroke="#FFFFFF"
                  strokeOpacity="0.4"
                  strokeWidth="10"
                  strokeDasharray="4 6"
                  fill="none"
                />

                <rect x="180" y="165" width="115" height="24" rx="6" fill="#FFFFFF" fillOpacity="0.15" stroke="#FFFFFF" strokeOpacity="0.3" />
                <text x="237" y="181" fill="#FFFFFF" fontSize="9" fontFamily="'Montserrat', sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.08em">
                  [BLEED STOPPED]
                </text>
              </svg>
            </div>

            {/* Footer Text (No check icon) */}
            <div className="pt-1.5 sm:pt-2 border-t border-white/15 text-[10.5px] sm:text-[11.5px] font-mono uppercase tracking-wider text-white/90 font-semibold">
              Daily checks. Live monitoring.
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 03: Data-Backed Creative Briefs (zIndex 20 - Third card)              */}
          {/* ========================================================================= */}
          <div
            ref={card3Ref}
            className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] p-5 xs:p-6 sm:p-8 bg-gradient-to-br from-[#7C3AED]/75 via-[#573681]/70 to-[#43236B]/80 backdrop-blur-xl sm:backdrop-blur-2xl text-white shadow-[0_25px_50px_-12px_rgba(124,58,237,0.35),inset_0_1px_1px_0_rgba(255,255,255,0.35)] border border-white/35 flex flex-col justify-between overflow-hidden will-change-transform"
          >
            {/* Top Text Content */}
            <div className="relative z-10 space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/15 text-white/90 font-mono text-[8.5px] sm:text-[10px] font-bold tracking-widest uppercase border border-white/20">
                  03 // CREATIVE INTEL
                </span>
                <span className="font-mono text-[9.5px] sm:text-[10px] text-purple-200 font-bold">SCRIPT DNA</span>
              </div>

              <h3 className="font-display font-bold text-xl xs:text-2xl sm:text-3xl text-white tracking-tight leading-snug pt-0.5">
                Data-Backed Creative Briefs
              </h3>

              <p className="font-sans text-[11px] xs:text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
                No mood boards. No hunches. We show producers exactly which hook angles scaled, which formats lasted longest, which audiences need different creative.
              </p>
            </div>

            {/* 3D-styled Vector Illustration (Hook Angles & Creative Vectors) */}
            <div className="relative w-full h-34 xs:h-38 sm:h-48 flex items-center justify-center my-auto">
              <svg
                viewBox="0 0 320 220"
                className="w-full h-full select-none filter drop-shadow-xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="160" cy="150" rx="110" ry="30" fill="#FFFFFF" fillOpacity="0.12" />

                {/* Concentric brief nodes */}
                <circle cx="160" cy="110" r="50" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="160" cy="110" r="28" fill="#573681" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="160" cy="110" r="14" fill="#A855F7" />

                {/* Satellite Vector Nodes */}
                <g transform="translate(100, 75)">
                  <rect x="-16" y="-12" width="32" height="24" rx="6" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="0" y="4" fill="#FFFFFF" fontSize="8" fontFamily="'Montserrat', sans-serif" fontWeight="bold" textAnchor="middle">HOOK</text>
                </g>

                <g transform="translate(220, 80)">
                  <rect x="-16" y="-12" width="32" height="24" rx="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="0" y="4" fill="#FFFFFF" fontSize="8" fontFamily="'Montserrat', sans-serif" fontWeight="bold" textAnchor="middle">RET</text>
                </g>

                <g transform="translate(160, 175)">
                  <rect x="-18" y="-12" width="36" height="24" rx="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="0" y="4" fill="#FFFFFF" fontSize="8" fontFamily="'Montserrat', sans-serif" fontWeight="bold" textAnchor="middle">SCALE</text>
                </g>

                {/* Connecting Rays */}
                <line x1="116" y1="83" x2="140" y2="98" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="204" y1="87" x2="180" y2="102" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="160" y1="163" x2="160" y2="138" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />

                {/* Floating Metric Badge */}
                <rect x="25" y="170" width="105" height="24" rx="6" fill="#FFFFFF" fillOpacity="0.15" stroke="#FFFFFF" strokeOpacity="0.3" />
                <text x="77" y="186" fill="#FDE047" fontSize="9" fontFamily="'Montserrat', sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.08em">
                  [HOOK LIFT: +44%]
                </text>
              </svg>
            </div>

            {/* Footer Text (No check icon) */}
            <div className="pt-1.5 sm:pt-2 border-t border-white/15 text-[10.5px] sm:text-[11.5px] font-mono uppercase tracking-wider text-white/90 font-semibold">
              Strategy from your performance.
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 04: One System. Applied Everywhere. (zIndex 10 - Bottom card)        */}
          {/* ========================================================================= */}
          <div
            ref={card4Ref}
            className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] p-5 xs:p-6 sm:p-8 bg-gradient-to-br from-[#8B5CF6]/75 via-[#573681]/70 to-[#1A0042]/80 backdrop-blur-xl sm:backdrop-blur-2xl text-white shadow-[0_25px_50px_-12px_rgba(139,92,246,0.35),inset_0_1px_1px_0_rgba(255,255,255,0.35)] border border-white/35 flex flex-col justify-between overflow-hidden will-change-transform"
          >
            {/* Top Text Content */}
            <div className="relative z-10 space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/15 text-white/90 font-mono text-[8.5px] sm:text-[10px] font-bold tracking-widest uppercase border border-white/20">
                  04 // UNIFIED SYSTEM
                </span>
                <span className="font-mono text-[9.5px] sm:text-[10px] text-emerald-300 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  SYSTEMATIC
                </span>
              </div>

              <h3 className="font-display font-bold text-xl xs:text-2xl sm:text-3xl text-white tracking-tight leading-snug pt-0.5">
                One System. Applied Everywhere.
              </h3>

              <p className="font-sans text-[11px] xs:text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
                Same diagnostic framework. Same checkpoints. Same standard. Whether you're spending ₹10k/mo or ₹500k/mo, the findings hold. It's systematic. Not subjective.
              </p>
            </div>

            {/* 3D-styled Vector Illustration (Ascending Rocket & Scaling Trajectory) */}
            <div className="relative w-full h-34 xs:h-38 sm:h-48 flex items-center justify-center my-auto">
              <svg
                viewBox="0 0 320 220"
                className="w-full h-full select-none filter drop-shadow-xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="160" cy="160" rx="100" ry="25" fill="#C084FC" fillOpacity="0.2" />
                <path
                  d="M50 180 C120 170, 180 120, 240 30"
                  stroke="#A855F7"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />

                <g transform="translate(175, 95) rotate(-35)">
                  <path d="M-12 50 Q0 85 12 50 Z" fill="#F59E0B" />
                  <path d="M-6 50 Q0 70 6 50 Z" fill="#FBBF24" />
                  <path d="M-22 30 L-32 45 L-12 40 Z" fill="#6B21A8" stroke="#FFFFFF" strokeWidth="1.5" />
                  <path d="M22 30 L32 45 L12 40 Z" fill="#6B21A8" stroke="#FFFFFF" strokeWidth="1.5" />
                  <ellipse cx="0" cy="10" rx="20" ry="38" fill="#FFFFFF" />
                  <path d="M-20 10 Q0 -40 20 10 Z" fill="#A855F7" />
                  <path d="M0 -30 Q12 -10 12 25" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="0" cy="5" r="9" fill="#1E1B4B" stroke="#A855F7" strokeWidth="2.5" />
                  <circle cx="0" cy="5" r="5" fill="#60A5FA" />
                </g>

                <path d="M70 60 L73 70 L83 73 L73 76 L70 86 L67 76 L57 73 L67 70 Z" fill="#FFFFFF" fillOpacity="0.8" />
                <path d="M260 50 L262 56 L268 58 L262 60 L260 66 L258 60 L252 58 L258 56 Z" fill="#FDE047" />

                <rect x="25" y="160" width="105" height="24" rx="6" fill="#FFFFFF" fillOpacity="0.15" stroke="#FFFFFF" strokeOpacity="0.3" />
                <text x="77" y="176" fill="#A7F3D0" fontSize="10" fontFamily="'Montserrat', sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.08em">
                  ROAS: 5.4x ↑
                </text>
              </svg>
            </div>

            {/* Action CTA Button */}
            <div className="pt-1 sm:pt-2">
              <button
                onClick={onOpenDemoModal}
                className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-white text-[#573681] hover:text-[#1A0042] hover:bg-white/95 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95 touch-manipulation group"
              >
                <span>Book a 30-Min Audit</span>
                <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Center Methodology Statement (Matching DualAgentPinned / Why Us Section) */}
        <div
          ref={bottomCalloutRef}
          className="absolute bottom-2.5 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center px-4 w-full max-w-lg will-change-transform"
        >
          <div className="font-display font-black text-xs sm:text-sm lg:text-base text-[#573681] uppercase tracking-tight leading-tight">
            MOST AGENCIES GUESS, WE RUN THE DIAGNOSTIC FIRST.
          </div>
          <div className="font-sans text-[10.5px] sm:text-xs text-[#1A0042] font-semibold mt-1 max-w-md mx-auto leading-relaxed">
            Every strategic recommendation is anchored in your account’s unit economics, not agency hubris.
          </div>
        </div>
      </div>
    </section>
  );
}
