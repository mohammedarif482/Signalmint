import React from "react";
import { useHeroAnimation } from "../hooks/useHeroAnimation";
import { Play, TrendingUp, Activity } from "lucide-react";

interface HeroSectionProps {
  onOpenDemoModal?: () => void;
}

export function HeroSection({ onOpenDemoModal }: HeroSectionProps) {
  const containerRef = useHeroAnimation();

  return (
    <section
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="h-screen w-full flex flex-col justify-between pt-20 lg:pt-24 pb-8 lg:pb-12 px-6 sm:px-8 lg:px-16 bg-[#E7E6FB] overflow-hidden relative select-none"
    >
      {/* Ambient background glows for soft light-theme depth */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#FAFAFD]/60 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#6495EB]/10 filter blur-3xl pointer-events-none" />

      {/* Main 2-Column Asymmetric Grid */}
      <div className="flex-1 flex items-center w-full max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* LEFT COLUMN (Cols 1 to 7) — Editorial Kinetic Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Top Pill Tag */}
            <div className="hero-pill inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#4D0181] mb-4 sm:mb-5">
              <span>[ AI CREATIVE INTELLIGENCE & BUDGET GUARDIAN ]</span>
            </div>

            {/* The Main Headline (Inter Black / ExtraBold) */}
            <h1 className="font-extrabold tracking-[-0.04em] leading-[0.92] text-[#1A0042] text-4xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] uppercase">
              <div className="overflow-hidden">
                <div className="hero-headline-line">
                  FOR BRANDS THAT RUN ADS ON
                </div>
              </div>
              <div className="overflow-hidden py-1">
                <div className="hero-headline-line">
                  <span className="text-[#4D0181] italic font-serif">INTELLIGENCE,</span>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="hero-headline-line">
                  NOT INSTINCT.
                </div>
              </div>
            </h1>

            {/* Supporting Paragraph (Max 2 lines) */}
            <p className="hero-subtext text-[#1A0042]/80 font-normal text-base lg:text-lg max-w-xl mt-5 sm:mt-6 leading-relaxed">
              SignalMint audits 25+ competitors and deploys 24/7 automated budget stop-losses in real time.
            </p>

            {/* Direct CTA Row (Immediately visible, zero scroll needed) */}
            <div className="hero-cta-group flex flex-wrap items-center gap-4 mt-7 sm:mt-8">
              {/* Primary Button */}
              <button
                onClick={onOpenDemoModal}
                className="bg-[#1516A8] hover:bg-[#1A0042] text-white font-medium px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 shadow-lg shadow-[#1516A8]/20 active:scale-95 cursor-pointer text-sm sm:text-base group"
              >
                <span>Start Free Trial</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>

              {/* Secondary Button */}
              <a
                href="#agents"
                className="border border-[#1A0042]/20 hover:border-[#1A0042] hover:bg-[#1A0042]/5 text-[#1A0042] px-6 py-4 rounded-full font-medium transition-all flex items-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                <Play className="w-3.5 h-3.5 fill-[#1A0042] text-[#1A0042]" />
                <span>Watch 2-Min Demo</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN (Cols 8 to 12) — Floating Interactive Glass Telemetry Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="hero-telemetry-card bg-white/90 backdrop-blur-xl border border-white/60 shadow-2xl rounded-2xl p-6 relative w-full max-w-[420px]">
              
              {/* Card Header: Live Status Dot + SCOUT REAL-TIME RADAR */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1A0042]/8 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="font-mono text-xs font-bold text-[#1A0042] tracking-wider uppercase">
                    SCOUT REAL-TIME RADAR
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#1516A8] bg-[#E7E6FB] px-2 py-0.5 rounded">
                  25 Rivals Live
                </span>
              </div>

              {/* Card Stat: Giant bold stat 12.4x + label */}
              <div className="mb-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-extrabold text-5xl sm:text-6xl text-[#1A0042] tracking-tight leading-none">
                    12.4x
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    +48.2% HOOK
                  </span>
                </div>
                <div className="font-mono text-xs text-[#1A0042]/70 uppercase tracking-wide font-medium mt-1">
                  Crown Winner ROAS benchmark
                </div>
              </div>

              {/* Micro Telemetry Chart: Clean SVG sparkline/curve graph with gradient fill (#4D0181 to #6495EB) */}
              <div className="bg-[#E7E6FB]/40 rounded-xl p-3.5 border border-[#1A0042]/6 mb-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#1A0042]/70 mb-2">
                  <span className="font-semibold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#4D0181]" />
                    Retention Velocity Curve
                  </span>
                  <span className="text-[#1516A8] font-bold">P99 Velocity</span>
                </div>

                <div className="h-20 w-full relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 320 70" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="heroCardSparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4D0181" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#6495EB" stopOpacity="0.05" />
                      </linearGradient>
                      <linearGradient id="heroCardStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4D0181" />
                        <stop offset="100%" stopColor="#1516A8" />
                      </linearGradient>
                    </defs>

                    {/* Area fill */}
                    <path
                      d="M 0 52 Q 50 48, 100 38 T 200 24 T 270 14 T 320 8 L 320 70 L 0 70 Z"
                      fill="url(#heroCardSparkGrad)"
                    />

                    {/* Gradient Stroke Line */}
                    <path
                      d="M 0 52 Q 50 48, 100 38 T 200 24 T 270 14 T 320 8"
                      fill="none"
                      stroke="url(#heroCardStrokeGrad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Key focal points */}
                    <circle cx="100" cy="38" r="3.5" fill="#4D0181" />
                    <circle cx="200" cy="24" r="3.5" fill="#1516A8" />
                    <circle cx="320" cy="8" r="4.5" fill="#1516A8" />
                    <circle cx="320" cy="8" r="8" fill="#1516A8" opacity="0.25" className="animate-ping" />
                  </svg>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-[#1A0042]/60 mt-1 pt-1 border-t border-[#1A0042]/6">
                  <span>0:00 (Hook Launch)</span>
                  <span>0:03 (Pain Disruption)</span>
                  <span className="text-[#1516A8] font-bold">0:15 (Checkout)</span>
                </div>
              </div>

              {/* Bottom Card Summary Telemetry */}
              <div className="flex items-center justify-between text-xs font-mono text-[#1A0042]/80 pt-1">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#1516A8]" />
                  Ad fatigue index:
                </span>
                <span className="font-bold text-emerald-600">3.2% (Ultra-Low)</span>
              </div>

              {/* Interactive Floating Chip pinned on card edge (offset by -20px) */}
              <div className="absolute -bottom-5 sm:-bottom-6 -left-3 sm:-left-6 bg-white/95 border border-[#1A0042]/10 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-2.5 z-20">
                <div className="w-7 h-7 rounded-lg bg-[#E7E6FB] flex items-center justify-center text-sm shrink-0">
                  🛡️
                </div>
                <div className="flex flex-col text-left">
                  <div className="font-mono text-xs font-bold text-[#1A0042] tracking-tight">
                    ATLAS: ₹45,000 Budget Bleed Stopped
                  </div>
                  <div className="font-mono text-[10px] text-[#4D0181] font-semibold">
                    Automated Intervention (Just Now)
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Subtle bottom hairline indicator */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between pt-2 border-t border-[#1A0042]/8 text-[11px] font-mono text-[#1A0042]/60 z-10">
        <span>01 // HERO TELEMETRY FOLD</span>
        <span className="hidden sm:inline">100% LIGHT THEME // CODAPRESS & ODDITY BENCHMARK</span>
        <a href="#agents" className="text-[#1516A8] hover:underline font-semibold flex items-center gap-1">
          Scroll Down to Inspect Agents ↓
        </a>
      </div>
    </section>
  );
}
