import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Play, ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onOpenDemoModal?: () => void;
}

interface VerticalData {
  name: string;
  competitorBrand: string;
  adTitle: string;
  hookRate: string;
  spend: string;
  daysActive: string;
  roas: string;
  bleedStopped: string;
  adSet: string;
}

const VERTICALS: Record<string, VerticalData> = {
  "DTC Apparel": {
    name: "DTC Apparel",
    competitorBrand: "AeroWear Studio",
    adTitle: "Seamless Compression Drop-Test",
    hookRate: "48.2%",
    spend: "₹94,200 Spend",
    daysActive: "28 Days Active",
    roas: "6.4x ROAS",
    bleedStopped: "₹3,400/hr bleed stopped on Ad Set #204 (2 mins ago)",
    adSet: "#204",
  },
  "Beauty & Skincare": {
    name: "Beauty & Skincare",
    competitorBrand: "LumiSkin Lab",
    adTitle: "3-Second Ice-Plunge Peptide Serum",
    hookRate: "52.7%",
    spend: "₹1,48,000 Spend",
    daysActive: "35 Days Active",
    roas: "7.1x ROAS",
    bleedStopped: "₹5,200/hr bleed stopped on Ad Set #819 (4 mins ago)",
    adSet: "#819",
  },
  "B2B SaaS": {
    name: "B2B SaaS",
    competitorBrand: "SaaSFlow Tech",
    adTitle: "3D Motion Pipeline Wire-Tangle",
    hookRate: "44.9%",
    spend: "₹82,500 Spend",
    daysActive: "22 Days Active",
    roas: "5.8x ROAS",
    bleedStopped: "₹2,800/hr bleed stopped on Ad Set #107 (1 min ago)",
    adSet: "#107",
  },
  "Supplements": {
    name: "Supplements",
    competitorBrand: "BiomeNutrition",
    adTitle: "Contrarian PubMed Paper Teardown",
    hookRate: "49.6%",
    spend: "₹1,12,000 Spend",
    daysActive: "41 Days Active",
    roas: "6.9x ROAS",
    bleedStopped: "₹4,100/hr bleed stopped on Ad Set #332 (3 mins ago)",
    adSet: "#332",
  },
};

export function HeroSection({ onOpenDemoModal }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [selectedVertical, setSelectedVertical] = useState<string>("DTC Apparel");
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  const currentData = VERTICALS[selectedVertical] || VERTICALS["DTC Apparel"];

  // GSAP Entrance & Continuous Floating Choreography
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Eyebrow Tag Entrance
      tl.fromTo(
        ".hero-eyebrow",
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      );

      // 2. Split Headline staggered reveal from translateY 60px
      tl.fromTo(
        ".hero-headline-item",
        { y: 60, opacity: 0, skewY: 2 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.0, stagger: 0.12 },
        "-=0.4"
      );

      // 3. Subhead & CTA Cluster
      tl.fromTo(
        ".hero-subhead, .hero-cta-cluster, .hero-personalization",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        "-=0.6"
      );

      // 4. Right Telemetry Card Entrance
      tl.fromTo(
        cardRef.current,
        { scale: 0.94, y: 35, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.7"
      );

      // 5. Continuous subtle floating bob for the card (y: -8, duration: 3.5, repeat: -1, ease: sine.inOut)
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          y: -8,
          repeat: -1,
          yoyo: true,
          duration: 3.5,
          ease: "sine.inOut",
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen lg:h-screen w-full flex flex-col justify-between pt-20 lg:pt-24 pb-8 px-4 sm:px-6 lg:px-12 bg-[#E7E6FB] overflow-x-hidden lg:overflow-hidden relative select-none"
    >
      {/* Subtle background: Faint SVG coordinate grid (1px solid rgba(26,0,66,0.06)) with low-opacity pulse nodes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full opacity-70" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="coordGrid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path
                d="M 64 0 L 0 0 0 64"
                fill="none"
                stroke="rgba(26, 0, 66, 0.06)"
                strokeWidth="1"
              />
              <circle cx="64" cy="64" r="1.5" fill="#1516A8" fillOpacity="0.18" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#coordGrid)" />
          {/* Subtle pulse nodes positioned across the coordinate grid */}
          <circle cx="15%" cy="30%" r="3" fill="#4D0181" fillOpacity="0.25" className="animate-pulse" />
          <circle cx="85%" cy="20%" r="4" fill="#1516A8" fillOpacity="0.2" className="animate-ping" />
          <circle cx="70%" cy="75%" r="3" fill="#6495EB" fillOpacity="0.3" className="animate-pulse" />
        </svg>

        {/* Ambient atmospheric glows */}
        <div className="absolute -top-12 -left-12 w-96 h-96 rounded-full bg-[#FAFAFD]/70 filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-4 right-1/4 w-[460px] h-[460px] rounded-full bg-[#6495EB]/10 filter blur-3xl pointer-events-none" />
      </div>

      {/* Main 12-Column Split Layout */}
      <div className="flex-1 flex items-center w-full max-w-7xl mx-auto z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full">
          
          {/* LEFT COLUMN (Cols 1 to 7) — Editorial Kinetic Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Eyebrow Tag: 01 // WHILE YOU SLEPT */}
            <div className="hero-eyebrow mb-3.5">
              <span className="font-mono text-xs font-semibold text-[#4D0181] bg-[#4D0181]/10 px-3 py-1 rounded-full border border-[#4D0181]/20 inline-block uppercase tracking-widest">
                01 // WHILE YOU SLEPT
              </span>
            </div>

            {/* Headline (H1): Inter Black uppercase tracking-[-0.04em] leading-[0.92] */}
            <h1 className="font-black tracking-[-0.04em] leading-[0.92] text-[#1A0042] text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.75rem] uppercase">
              <div className="overflow-hidden">
                <div className="hero-headline-item">
                  YOUR COMPETITOR SCALED
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="hero-headline-item">
                  A WINNER. YOU JUST
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="hero-headline-item">
                  FOUND OUT.
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="hero-headline-item">
                  <span className="block text-[#4D0181] font-serif italic font-normal text-2xl sm:text-3xl lg:text-4xl mt-1.5 sm:mt-2 normal-case tracking-normal">
                    (But SCOUT knew 48 hours ago.)
                  </span>
                </div>
              </div>
            </h1>

            {/* Subhead: Font Montserrat, regular, text-[#1A0042]/80 text-sm lg:text-base max-w-xl mt-4 leading-relaxed */}
            <p className="hero-subhead font-montserrat font-normal text-[#1A0042]/80 text-sm lg:text-base max-w-xl mt-4 leading-relaxed">
              Every hour your team is manual-auditing old competitors, 12 new Crown Winners are being detected by algorithms that never sleep. SCOUT finds them. ATLAS cuts the waste. That&apos;s it.
            </p>

            {/* Interactive Micro-Conversion & CTA Cluster */}
            <div className="hero-cta-cluster flex flex-wrap items-center gap-3.5 sm:gap-4 mt-6">
              {/* Primary Button */}
              <button
                onClick={onOpenDemoModal}
                className="bg-[#1516A8] hover:bg-[#1A0042] text-white font-medium px-6 py-3.5 rounded-full flex items-center gap-2 shadow-lg shadow-[#1516A8]/25 transition-all text-sm cursor-pointer active:scale-95 group"
              >
                <span>See This Competitor&apos;s Full X-Ray</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1 font-bold">→</span>
              </button>

              {/* Secondary Video Trigger */}
              <button
                onClick={() => setShowVideoModal(true)}
                className="text-[#1A0042] hover:text-[#4D0181] font-medium text-sm flex items-center gap-2 px-4 py-3 transition-colors cursor-pointer"
              >
                <span className="text-xs">▶</span>
                <span>Watch How SCOUT Detected This (2 min)</span>
              </button>
            </div>

            {/* Inline Personalization Dropdown */}
            <div className="hero-personalization mt-5 pt-4 border-t border-[#1A0042]/10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs text-[#1A0042]/85 font-mono">
              <span className="text-[#1A0042]/70">
                25,000+ competitors tracked. 340 Crown Winners detected this week alone.
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="font-semibold text-[#4D0181]">Vertical:</span>
                <div className="relative inline-block">
                  <select
                    value={selectedVertical}
                    onChange={(e) => setSelectedVertical(e.target.value)}
                    className="appearance-none bg-white/80 hover:bg-white border border-[#1A0042]/15 text-[#1A0042] font-semibold rounded-md py-1 pl-2.5 pr-6 cursor-pointer focus:outline-none focus:border-[#1516A8] text-xs transition-colors"
                  >
                    {Object.keys(VERTICALS).map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-1.5 top-1/2 -translate-y-1/2 text-[#1A0042]/60 pointer-events-none" />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Cols 8 to 12) — Live Telemetry Widget */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-2 lg:mt-0">
            <div
              ref={cardRef}
              className="bg-white/95 backdrop-blur-xl border border-white shadow-2xl rounded-2xl p-6 sm:p-7 relative w-full max-w-[430px]"
            >
              
              {/* Top Header: Green pulsing indicator ● LIVE RADAR + COMPETITOR AD X-RAY */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1A0042]/8 mb-5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-600 tracking-wider">
                    LIVE RADAR
                  </span>
                  <span className="text-[#1A0042]/20 font-mono">|</span>
                  <span className="font-mono text-xs font-bold text-[#1A0042] uppercase tracking-wider">
                    COMPETITOR AD X-RAY
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#4D0181] bg-[#4D0181]/10 px-2 py-0.5 rounded">
                  {selectedVertical}
                </span>
              </div>

              {/* Competitor Ad Detail Headline */}
              <div className="mb-4">
                <div className="text-[11px] font-mono text-[#1516A8] font-bold uppercase tracking-wide">
                  {currentData.competitorBrand}
                </div>
                <div className="font-display font-bold text-base text-[#1A0042] line-clamp-1">
                  &ldquo;{currentData.adTitle}&rdquo;
                </div>
              </div>

              {/* Delta Metric: 48.2% HOOK RATE (large bold in #1A0042) + Industry Avg: 18% green pill */}
              <div className="mb-5 bg-[#E7E6FB]/40 p-4 rounded-xl border border-[#1A0042]/6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-extrabold text-4xl sm:text-5xl text-[#1A0042] tracking-tight leading-none">
                      {currentData.hookRate}
                    </div>
                    <div className="font-mono text-[11px] font-bold text-[#1A0042]/70 uppercase tracking-wider mt-1">
                      HOOK RETENTION RATE
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full shadow-xs inline-block">
                      Industry Avg: 18%
                    </span>
                    <div className="font-mono text-[10px] text-emerald-700 font-semibold mt-1">
                      +168% Above Benchmark
                    </div>
                  </div>
                </div>

                {/* Mini SVG Telemetry Curve */}
                <div className="h-14 w-full relative mt-3 pt-2 border-t border-[#1A0042]/8">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 50" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="hookGradArea" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#1516A8" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#1516A8" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Industry avg dashed line */}
                    <path
                      d="M 0 42 Q 60 44, 150 45 T 300 46"
                      fill="none"
                      stroke="#1A0042"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                      opacity="0.3"
                    />
                    {/* Winner Hook Retention Waveform */}
                    <path
                      d="M 0 8 Q 50 12, 100 16 T 200 20 T 300 24 L 300 50 L 0 50 Z"
                      fill="url(#hookGradArea)"
                    />
                    <path
                      d="M 0 8 Q 50 12, 100 16 T 200 20 T 300 24"
                      fill="none"
                      stroke="#1516A8"
                      strokeWidth="2.5"
                    />
                    <circle cx="50" cy="12" r="3.5" fill="#1516A8" />
                    <circle cx="50" cy="12" r="7" fill="#1516A8" opacity="0.25" className="animate-ping" />
                  </svg>
                </div>
              </div>

              {/* Secondary Metrics Row */}
              {/* Left: Spend · Days Active | Right: ROAS · Scaling */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-3 rounded-xl bg-[#FAFAFD] border border-[#1A0042]/8 font-mono text-xs">
                <div className="border-r border-[#1A0042]/8 pr-2">
                  <div className="font-bold text-[#1A0042] text-sm sm:text-base">
                    {currentData.spend}
                  </div>
                  <div className="text-[11px] text-[#1A0042]/60 mt-0.5">
                    {currentData.daysActive}
                  </div>
                </div>
                <div className="pl-2">
                  <div className="font-bold text-[#4D0181] text-sm sm:text-base">
                    {currentData.roas}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Scaling (Not Paused)
                  </div>
                </div>
              </div>

              {/* Kinetic Toast Alert pinned to the card bottom (Lavender pill with purple border) */}
              <div className="absolute -bottom-5 sm:-bottom-6 left-4 right-4 bg-[#E7E6FB]/95 backdrop-blur-md border border-[#4D0181]/40 rounded-full py-2.5 px-4 shadow-xl flex items-center gap-2 text-xs font-mono z-20">
                <span className="text-base shrink-0">🛡️</span>
                <span className="font-bold text-[#1A0042] truncate">
                  <strong className="text-[#4D0181]">ATLAS Auto-Cut:</strong> {currentData.bleedStopped}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Viewport Anchor Bar */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between pt-2 border-t border-[#1A0042]/8 text-[11px] font-mono text-[#1A0042]/60 z-10">
        <span>01 // HERO & TELEMETRY FOLD</span>
        <span className="hidden sm:inline">AUTONOMOUS AD ARSENAL // SCOUT 48H DETECTION PROTOCOL</span>
        <a href="#agents" className="text-[#1516A8] hover:underline font-semibold flex items-center gap-1">
          Scroll to Dual-Agent Engine ↓
        </a>
      </div>

      {/* 2-Min Demo Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A0042]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAFAFD] border border-[#1A0042]/20 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#E7E6FB] text-[#1A0042] font-mono text-sm font-bold flex items-center justify-center hover:bg-[#1A0042] hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#1516A8] animate-pulse"></span>
              <span className="font-mono text-xs font-bold text-[#1516A8] uppercase">
                SCOUT DETECTION WALKTHROUGH (2:04)
              </span>
            </div>
            <h3 className="font-display font-bold text-xl text-[#1A0042] mb-3">
              How SCOUT reverse-engineers Crown Winners 48 hours before saturation
            </h3>
            <div className="aspect-video bg-[#E7E6FB] rounded-xl border border-[#1A0042]/10 flex flex-col items-center justify-center p-6 text-center mb-4">
              <div className="w-14 h-14 rounded-full bg-[#1516A8] text-white flex items-center justify-center shadow-lg mb-3">
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </div>
              <p className="font-mono text-xs text-[#1A0042]/80 font-medium">
                Live simulation stream: Tracking {selectedVertical} ad velocity & hook drop curve in real time.
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
                Request Full Platform Access
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
