import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

interface HowToBeginSectionProps {
  onOpenDemoModal?: () => void;
}

interface TiltCardProps {
  badge: string;
  badgeSub: React.ReactNode;
  title: string;
  description: string;
  gradientClass: string;
  radialClass: string;
  artwork: React.ReactNode;
  footer: React.ReactNode;
}

function TiltCard({
  badge,
  badgeSub,
  title,
  description,
  gradientClass,
  radialClass,
  artwork,
  footer,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const artworkEl = artworkRef.current;
    const glare = glareRef.current;
    if (!card) return;

    // Check if user has mouse hover support
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / centerX; // -1 to 1
      const deltaY = (y - centerY) / centerY; // -1 to 1

      // 3D tilt perspective matching Codapress article cards
      gsap.to(card, {
        rotateY: deltaX * 10,
        rotateX: -deltaY * 10,
        transformPerspective: 900,
        scale: 1.025,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Subtle parallax shift on inner artwork
      if (artworkEl) {
        gsap.to(artworkEl, {
          x: deltaX * 12,
          y: deltaY * 12,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Cursor-following specular glare spotlight
      if (glare) {
        gsap.to(glare, {
          opacity: 0.35,
          x: x - 150,
          y: y - 150,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      // Smooth reset to neutral position
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.65,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (artworkEl) {
        gsap.to(artworkEl, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (glare) {
        gsap.to(glare, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(card);
      if (artworkEl) gsap.killTweensOf(artworkEl);
      if (glare) gsap.killTweensOf(glare);
    };
  }, []);

  return (
    <div className="relative w-full h-full" style={{ perspective: "1000px" }}>
      <div
        ref={cardRef}
        className={`w-full h-full rounded-[1.75rem] sm:rounded-[2rem] p-4 sm:p-5 backdrop-blur-xl sm:backdrop-blur-2xl text-white border border-white/30 hover:border-white/40 shadow-[0_20px_45px_-12px_rgba(87,54,129,0.28),inset_0_1.5px_2px_0_rgba(255,255,255,0.45),inset_0_-1px_1px_0_rgba(255,255,255,0.12)] flex flex-col justify-between overflow-hidden relative transition-colors duration-500 ease-out hover:shadow-[0_28px_60px_-15px_rgba(87,54,129,0.4)] group will-change-transform ${gradientClass}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Cursor specular glare */}
        <div
          ref={glareRef}
          className="absolute pointer-events-none rounded-full w-[260px] h-[260px] bg-radial from-white/40 via-purple-300/15 to-transparent blur-xl opacity-0 z-30 will-change-transform"
          style={{ top: 0, left: 0 }}
        />

        {/* Frosted glass top sheen & ambient radial highlight */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 via-white/[0.04] to-transparent pointer-events-none rounded-t-[1.75rem] sm:rounded-t-[2rem]" />
        <div className={`absolute inset-0 ${radialClass} pointer-events-none`} />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.12] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[1.75rem] sm:rounded-[2rem]" />

        {/* Top Text Content */}
        <div className="relative z-10 space-y-1 sm:space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-mono text-[8.5px] sm:text-[9.5px] font-bold tracking-widest uppercase border border-white/30 backdrop-blur-md shadow-2xs">
              {badge}
            </span>
            {badgeSub}
          </div>

          <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight leading-snug pt-0.5 drop-shadow-xs">
            {title}
          </h3>

          <p className="font-sans text-xs sm:text-[12.5px] text-white/95 leading-relaxed font-normal drop-shadow-2xs">
            {description}
          </p>
        </div>

        {/* 3D Parallax Illustration Container */}
        <div
          ref={artworkRef}
          className="relative w-full h-28 sm:h-32 flex items-center justify-center my-1 sm:my-1.5 z-10 will-change-transform"
        >
          {artwork}
        </div>

        {/* Footer Text / CTA */}
        <div className="pt-2 border-t border-white/20 min-h-[38px] flex items-center relative z-10">
          {footer}
        </div>
      </div>
    </div>
  );
}

export function HowToBeginSection({ onOpenDemoModal }: HowToBeginSectionProps) {
  return (
    <section
      id="why-us"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-textured-wash text-[#1A0042] border-t border-[#1A0042]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-[#1A0042]/10 mb-8 sm:mb-10">
          <div>
            <div className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#573681] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#573681] animate-pulse" />
              <span>WHY US // THE DIAGNOSTIC FRAMEWORK</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1A0042] uppercase leading-[1.05]">
              Why Us
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#1A0042]/75 max-w-md leading-relaxed">
            We diagnose before we prescribe. Every recommendation is anchored in unit economics, not agency hubris.
          </p>
        </div>

        {/* 4 Cards Horizontally Listed Side by Side with GSAP 3D Hover Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {/* ========================================================================= */}
          {/* CARD 01: Audit First, Always                                              */}
          {/* ========================================================================= */}
          <TiltCard
            badge="METHODOLOGY"
            badgeSub={
              <span className="font-mono text-[9.5px] sm:text-[10px] text-purple-200 font-bold drop-shadow-xs">
                AUDIT-FIRST
              </span>
            }
            title="Audit First, Always"
            description="Every recommendation comes from your account data. We fix what's actually broken first."
            gradientClass="bg-gradient-to-br from-[#240D4A]/52 via-[#1A0042]/46 to-[#3B1F69]/42"
            radialClass="bg-[radial-gradient(circle_at_20%_20%,rgba(176,139,224,0.18)_0%,transparent_60%)]"
            artwork={
              <svg
                viewBox="0 0 320 220"
                className="w-full h-full select-none filter drop-shadow-xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="160" cy="150" rx="110" ry="30" fill="#FFFFFF" fillOpacity="0.15" />
                <ellipse
                  cx="160"
                  cy="120"
                  rx="135"
                  ry="45"
                  stroke="#FFFFFF"
                  strokeOpacity="0.4"
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

                <rect x="24" y="175" width="105" height="22" rx="4" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeOpacity="0.35" />
                <text x="76" y="190" fill="#FFFFFF" fontSize="9" fontFamily="'Montserrat', sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.08em">
                  [AUDIT READY]
                </text>
              </svg>
            }
            footer={
              <span className="text-[10.5px] sm:text-[11.5px] font-mono uppercase tracking-wider text-white/95 font-semibold drop-shadow-2xs">
                No guessing. No templates.
              </span>
            }
          />

          {/* ========================================================================= */}
          {/* CARD 02: Real-Time Account Health                                         */}
          {/* ========================================================================= */}
          <TiltCard
            badge="TELEMETRY"
            badgeSub={
              <span className="font-mono text-[9.5px] sm:text-[10px] text-purple-200 font-bold drop-shadow-xs">
                REAL-TIME
              </span>
            }
            title="Real-Time Account Health"
            description="We catch budget bleed in minutes before it gets expensive. Daily checks, zero lag."
            gradientClass="bg-gradient-to-b from-[#1F0842]/56 via-[#452273]/42 to-[#1A0042]/48"
            radialClass="bg-[radial-gradient(circle_at_50%_12%,rgba(147,105,210,0.22)_0%,transparent_65%)]"
            artwork={
              <svg
                viewBox="0 0 320 220"
                className="w-full h-full select-none filter drop-shadow-xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="160" cy="150" rx="110" ry="30" fill="#FFFFFF" fillOpacity="0.15" />

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

                <rect x="180" y="165" width="115" height="24" rx="6" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeOpacity="0.35" />
                <text x="237" y="181" fill="#FFFFFF" fontSize="9" fontFamily="'Montserrat', sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.08em">
                  [BLEED STOPPED]
                </text>
              </svg>
            }
            footer={
              <span className="text-[10.5px] sm:text-[11.5px] font-mono uppercase tracking-wider text-white/95 font-semibold drop-shadow-2xs">
                Daily checks. Live monitoring.
              </span>
            }
          />

          {/* ========================================================================= */}
          {/* CARD 03: Data-Backed Creative Briefs                                      */}
          {/* ========================================================================= */}
          <TiltCard
            badge="CREATIVE INTEL"
            badgeSub={
              <span className="font-mono text-[9.5px] sm:text-[10px] text-purple-200 font-bold drop-shadow-xs">
                SCRIPT DNA
              </span>
            }
            title="Data-Backed Creative Briefs"
            description="No mood boards or hunches. Data-backed briefs showing exact hook angles that scale."
            gradientClass="bg-gradient-to-bl from-[#31145C]/52 via-[#1A0042]/48 to-[#43236B]/42"
            radialClass="bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.18)_0%,transparent_60%)]"
            artwork={
              <svg
                viewBox="0 0 320 220"
                className="w-full h-full select-none filter drop-shadow-xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="160" cy="150" rx="110" ry="30" fill="#FFFFFF" fillOpacity="0.15" />

                {/* Concentric brief nodes */}
                <circle cx="160" cy="110" r="50" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 4" />
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
                <rect x="25" y="170" width="105" height="24" rx="6" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeOpacity="0.35" />
                <text x="77" y="186" fill="#FDE047" fontSize="9" fontFamily="'Montserrat', sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.08em">
                  [HOOK LIFT: +44%]
                </text>
              </svg>
            }
            footer={
              <span className="text-[10.5px] sm:text-[11.5px] font-mono uppercase tracking-wider text-white/95 font-semibold drop-shadow-2xs">
                Strategy from your performance.
              </span>
            }
          />

          {/* ========================================================================= */}
          {/* CARD 04: One System. Applied Everywhere.                                  */}
          {/* ========================================================================= */}
          <TiltCard
            badge="UNIFIED SYSTEM"
            badgeSub={
              <span className="font-mono text-[9.5px] sm:text-[10px] text-purple-200 font-bold flex items-center gap-1.5 drop-shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B08BE0] animate-ping" />
                SYSTEMATIC
              </span>
            }
            title="One System. Applied Everywhere."
            description="Same diagnostic framework whether spending ₹10k or ₹500k/mo. Systematic, not subjective."
            gradientClass="bg-gradient-to-tr from-[#1A0042]/56 via-[#573681]/45 to-[#2A0E52]/44"
            radialClass="bg-[radial-gradient(circle_at_50%_80%,rgba(192,132,252,0.20)_0%,transparent_70%)]"
            artwork={
              <svg
                viewBox="0 0 320 220"
                className="w-full h-full select-none filter drop-shadow-xl"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Foundation Ground Radar */}
                <ellipse cx="160" cy="155" rx="115" ry="32" fill="#573681" fillOpacity="0.25" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 4" />
                <ellipse cx="160" cy="155" rx="75" ry="20" fill="#7C3AED" fillOpacity="0.2" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1" />

                {/* Vertical Central Telemetry Beam */}
                <line x1="160" y1="40" x2="160" y2="155" stroke="#B08BE0" strokeWidth="2" strokeDasharray="3 3" strokeOpacity="0.7" />

                {/* Tier 1: Base Execution Layer (Audit Foundation) */}
                <path d="M90 140 L160 168 L230 140 L160 112 Z" fill="#311956" fillOpacity="0.85" stroke="#A855F7" strokeWidth="1.5" />
                <path d="M90 140 L90 148 L160 176 L160 168 Z" fill="#1A0042" stroke="#A855F7" strokeWidth="1" />
                <path d="M230 140 L230 148 L160 176 L160 168 Z" fill="#240D4A" stroke="#A855F7" strokeWidth="1" />

                {/* Tier 2: Middle Diagnostic Layer (Telemetry Engine) */}
                <path d="M106 114 L160 136 L214 114 L160 92 Z" fill="#573681" fillOpacity="0.8" stroke="#C084FC" strokeWidth="1.5" />
                <path d="M106 114 L106 120 L160 142 L160 136 Z" fill="#3B1F69" stroke="#C084FC" strokeWidth="1" />
                <path d="M214 114 L214 120 L160 142 L160 136 Z" fill="#43236B" stroke="#C084FC" strokeWidth="1" />

                {/* Tier 3: Top Unit Economics Core */}
                <path d="M122 88 L160 104 L198 88 L160 72 Z" fill="#7C3AED" fillOpacity="0.9" stroke="#E9D5FF" strokeWidth="2" />

                {/* Core Top Beacon Ring */}
                <g transform="translate(160, 50)">
                  <circle cx="0" cy="0" r="16" fill="#573681" fillOpacity="0.35" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="0" cy="0" r="8" fill="#B08BE0" />
                  <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
                  <line x1="-22" y1="0" x2="-16" y2="0" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
                  <line x1="16" y1="0" x2="22" y2="0" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
                  <line x1="0" y1="-22" x2="0" y2="-16" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
                </g>

                {/* Satellite Benchmark Nodes */}
                <g transform="translate(48, 75)">
                  <rect x="-32" y="-12" width="64" height="24" rx="6" fill="#1A0042" fillOpacity="0.85" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.5" />
                  <text x="0" y="4" fill="#FFFFFF" fontSize="8.5" fontFamily="'Montserrat', sans-serif" fontWeight="bold" textAnchor="middle">
                    ₹10K / MO
                  </text>
                  <line x1="32" y1="0" x2="65" y2="15" stroke="#B08BE0" strokeWidth="1.5" strokeDasharray="2 2" strokeOpacity="0.6" />
                </g>

                {/* Satellite Benchmark Nodes */}
                <g transform="translate(272, 75)">
                  <rect x="-36" y="-12" width="72" height="24" rx="6" fill="#1A0042" fillOpacity="0.85" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.5" />
                  <text x="0" y="4" fill="#FFFFFF" fontSize="8.5" fontFamily="'Montserrat', sans-serif" fontWeight="bold" textAnchor="middle">
                    ₹500K+ / MO
                  </text>
                  <line x1="-36" y1="0" x2="-68" y2="15" stroke="#B08BE0" strokeWidth="1.5" strokeDasharray="2 2" strokeOpacity="0.6" />
                </g>

                {/* System Telemetry Metric Tag */}
                <rect x="50" y="174" width="220" height="24" rx="6" fill="#1A0042" fillOpacity="0.75" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.3" />
                <text x="160" y="190" fill="#E9D5FF" fontSize="9" fontFamily="'Montserrat', sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.09em">
                  [ STANDARDIZED DIAGNOSTIC CODES ]
                </text>
              </svg>
            }
            footer={
              <button
                onClick={onOpenDemoModal}
                className="w-full py-2.5 px-4 rounded-xl sm:rounded-2xl bg-white text-[#573681] hover:text-[#1A0042] hover:bg-white/95 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 touch-manipulation group/btn"
              >
                <span>Book a 30-Min Audit</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            }
          />
        </div>
      </div>
    </section>
  );
}

