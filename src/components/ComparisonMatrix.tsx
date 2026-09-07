import { useState } from "react";
import { ShieldCheck } from "lucide-react";

interface ComparisonRow {
  dimension: string;
  dimensionSubtitle: string;
  oldWay: {
    primary: string;
    detail: string;
  };
  betterWay: {
    primary: string;
    detail: string;
  };
  signalMint: {
    primary: string;
    detail: string;
    badge: string;
  };
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    dimension: "Speed to Crown Winner",
    dimensionSubtitle: "Detection latency from ad launch",
    oldWay: {
      primary: "14+ days",
      detail: "Email alert after 2 weeks of scroll in Ad Library",
    },
    betterWay: {
      primary: "24–48 hrs",
      detail: "Scraped data, lagging behind real scale",
    },
    signalMint: {
      primary: "12 mins",
      detail: "SCOUT flags 0–3 sec hook in real time. You see it before they've spent ₹50k.",
      badge: "Real-Time Stream",
    },
  },
  {
    dimension: "Cost of Bleed (Per Hour)",
    dimensionSubtitle: "Wasted capital during CPA spikes",
    oldWay: {
      primary: "₹850–2,400/hr",
      detail: "Discovered next morning after budget burned",
    },
    betterWay: {
      primary: "₹200–600/hr",
      detail: "Passive monitoring only; zero automated action",
    },
    signalMint: {
      primary: "₹0 Bleed",
      detail: "ATLAS auto-cuts within 12 mins. Typical save: ₹3,400 per intervention.",
      badge: "Auto Stop-Loss",
    },
  },
  {
    dimension: "Creative Pattern Recognition",
    dimensionSubtitle: "Hook dissection methodology",
    oldWay: {
      primary: "Subjective",
      detail: "Team meeting gut-feel votes and opinions",
    },
    betterWay: {
      primary: "Pattern extraction",
      detail: "Static screenshots and download rips only",
    },
    signalMint: {
      primary: "Algorithmic X-Ray",
      detail: "Computer vision traces the exact pixel, sound, and timing that caused +40% retention. Reproducible.",
      badge: "Computer Vision",
    },
  },
  {
    dimension: "Your Competitive Advantage",
    dimensionSubtitle: "Market positioning & agility",
    oldWay: {
      primary: "None",
      detail: "Using same manual tool as 50,000 other brands",
    },
    betterWay: {
      primary: "Marginal",
      detail: "Seeing what competitors already scaled 24h ago",
    },
    signalMint: {
      primary: "Information Asymmetry",
      detail: "You see their move 48h before they scale it. You counter before they commit budget.",
      badge: "48h Lead Time",
    },
  },
  {
    dimension: "ROI of Switching",
    dimensionSubtitle: "Timeframe to 10x payback",
    oldWay: {
      primary: "3–6 months",
      detail: "Break-even on expensive legacy SaaS tools",
    },
    betterWay: {
      primary: "N/A",
      detail: "Spy tools don't generate direct cost ROI",
    },
    signalMint: {
      primary: "2 weeks",
      detail: "Average save of ₹68,000/mo from bleed prevention alone + 2-3x creative win velocity.",
      badge: "Immediate Payback",
    },
  },
];

export function ComparisonMatrix() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section
      id="matrix"
      className="relative w-full py-20 sm:py-28 bg-[#FAFAFD] border-b border-[#E7E6FB]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* 1. SECTION HEADER */}
        <div className="max-w-3xl mb-14">
          {/* Eyebrow: 04 // THE COST OF GUESSING */}
          <div className="mb-3.5">
            <span className="font-mono text-xs font-semibold text-[#573681] bg-[#573681]/10 px-3 py-1 rounded-full border border-[#573681]/20 inline-block uppercase tracking-widest">
              04 // THE COST OF GUESSING
            </span>
          </div>

          {/* H2: EVERY HOUR WITHOUT SCOUT & ATLAS COSTS YOU */}
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1A0042] leading-[1.08] uppercase">
            EVERY HOUR WITHOUT SCOUT &amp; ATLAS COSTS YOU
          </h2>

          {/* Subhead */}
          <p className="font-montserrat text-sm sm:text-base text-[#1A0042]/80 mt-4 leading-relaxed max-w-2xl">
            Here&apos;s what happens when you rely on Ad Library scrolling, gut-feel audits, and next-morning bleed discovery. Then here&apos;s what SignalMint changes.
          </p>
        </div>

        {/* Mobile horizontal scroll hint */}
        <div className="lg:hidden text-xs font-mono text-[#1A0042]/75 mb-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/80 border border-[#1A0042]/10 shadow-2xs">
          <span>👉 Swipe horizontally to view all 4 loops</span>
        </div>

        {/* 2. COMPARISON TABLE */}
        <div className="w-full overflow-x-auto pb-2">
          <div className="min-w-[900px] bg-white rounded-3xl border border-[#1A0042]/10 shadow-[0_12px_40px_rgba(26,0,66,0.04)] overflow-hidden">
            
            {/* Table Header: 4 Columns */}
            <div className="grid grid-cols-12 border-b border-[#1A0042]/10 bg-[#FAFAFD]">
              <div className="col-span-3 p-5 font-mono text-xs font-bold uppercase tracking-wider text-[#1A0042]/70 flex items-center">
                Dimension
              </div>
              
              <div className="col-span-3 p-5 font-mono text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-50/50 border-l border-[#1A0042]/8 flex items-center gap-1.5">
                <span>❌ OLD LOOP (You&apos;re Behind)</span>
              </div>
              
              <div className="col-span-3 p-5 font-mono text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50/50 border-l border-[#1A0042]/8 flex items-center gap-1.5">
                <span>⚠️ BETTER LOOP (Still Reactive)</span>
              </div>
              
              <div className="col-span-3 p-5 font-mono text-xs font-bold uppercase tracking-wider text-[#573681] bg-[#E7E6FB]/60 border-l border-[#573681]/30 border-t-4 border-t-[#573681] flex items-center justify-between">
                <span>✅ SIGNALMINT LOOP (You Lead)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
            </div>

            {/* Table Data Rows */}
            <div className="divide-y divide-[#1A0042]/8">
              {COMPARISON_ROWS.map((row, idx) => {
                const isHovered = hoveredRow === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredRow(idx)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`grid grid-cols-12 items-stretch transition-colors duration-150 ${
                      isHovered ? "bg-[#6495EB]/5" : "bg-white"
                    }`}
                  >
                    {/* Col 1: Dimension */}
                    <div className="col-span-3 p-5 flex flex-col justify-center">
                      <h4 className="font-display font-bold text-base text-[#1A0042] mb-0.5">
                        {row.dimension}
                      </h4>
                      <span className="font-mono text-[11px] text-[#1A0042]/60">
                        {row.dimensionSubtitle}
                      </span>
                    </div>

                    {/* Col 2: Old Loop */}
                    <div className="col-span-3 p-5 border-l border-[#1A0042]/8 flex flex-col justify-center bg-rose-50/20">
                      <div className="font-mono font-bold text-sm text-rose-900 mb-1">
                        {row.oldWay.primary}
                      </div>
                      <p className="font-body text-xs text-[#1A0042]/75 leading-relaxed">
                        {row.oldWay.detail}
                      </p>
                    </div>

                    {/* Col 3: Better Loop */}
                    <div className="col-span-3 p-5 border-l border-[#1A0042]/8 flex flex-col justify-center bg-amber-50/20">
                      <div className="font-mono font-bold text-sm text-amber-900 mb-1">
                        {row.betterWay.primary}
                      </div>
                      <p className="font-body text-xs text-[#1A0042]/75 leading-relaxed">
                        {row.betterWay.detail}
                      </p>
                    </div>

                    {/* Col 4: SignalMint Loop (Highlighted in #E7E6FB/60) */}
                    <div className="col-span-3 p-5 border-l border-[#573681]/20 bg-[#E7E6FB]/50 flex flex-col justify-center relative">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono font-black text-sm sm:text-base text-[#573681]">
                          {row.signalMint.primary}
                        </span>
                        <span className="font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white text-[#573681] border border-[#573681]/20 shadow-2xs">
                          {row.signalMint.badge}
                        </span>
                      </div>
                      <p className="font-body text-xs text-[#1A0042] font-medium leading-relaxed">
                        {row.signalMint.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Table Footer Bottom Banner */}
            <div className="bg-[#E7E6FB]/40 px-6 py-4 border-t border-[#1A0042]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#1A0042]">
                <ShieldCheck className="w-4 h-4 text-[#573681]" />
                <span>
                  Guaranteed Stop-Loss: <strong>₹0 bleed policy</strong> with autonomous budget cuts in &lt; 12 minutes.
                </span>
              </div>
              <a
                href="#simulator"
                className="text-[#573681] font-bold hover:underline flex items-center gap-1 shrink-0"
              >
                Simulate Your Monthly Bleed Savings &rarr;
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
