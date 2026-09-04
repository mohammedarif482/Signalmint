import { useState } from "react";
import { Check, X, Sparkles, AlertCircle } from "lucide-react";

interface MatrixRow {
  dimension: string;
  category: string;
  manual: string;
  manualGood: boolean;
  spyTools: string;
  spyToolsGood: boolean;
  signalMint: string;
  signalMintHighlight: string;
}

const MATRIX_DATA: MatrixRow[] = [
  {
    category: "DETECTION VELOCITY",
    dimension: "Competitor Ad Discovery",
    manual: "Manual weekly scrolling through Ad Library",
    manualGood: false,
    spyTools: "Scraped once every 24-48h, laggy updates",
    spyToolsGood: false,
    signalMint: "Real-time continuous webhook stream (< 12 mins)",
    signalMintHighlight: "Live streaming",
  },
  {
    category: "CREATIVE DNA",
    dimension: "Hook & Script Dissection",
    manual: "Subjective gut-feel guessing in team meetings",
    manualGood: false,
    spyTools: "Static screenshots & raw video download only",
    spyToolsGood: false,
    signalMint: "Computer vision 3-sec hook drop curve + script breakdown",
    signalMintHighlight: "Algorithmic X-Ray",
  },
  {
    category: "CAPITAL PROTECTION",
    dimension: "Budget Bleed Interception",
    manual: "Discovered next morning after $2k-$10k wasted",
    manualGood: false,
    spyTools: "Zero budget connection; passive monitoring only",
    spyToolsGood: false,
    signalMint: "ATLAS 30-min automated check + stop-loss cut",
    signalMintHighlight: "Autonomous Stop-Loss",
  },
  {
    category: "DECISION AUTOMATION",
    dimension: "Winning Creative Flagging",
    manual: "Blended spreadsheet math with 3-day attribution lag",
    manualGood: false,
    spyTools: "Ad duration proxy (assumes older = winning)",
    spyToolsGood: false,
    signalMint: "Crown Winner engine isolates spend scale + retention spikes",
    signalMintHighlight: "Crown Winner Scoring",
  },
  {
    category: "CAPITAL EFFICIENCY",
    dimension: "Budget Redistribution",
    manual: "Manual campaign adjustments 2-3x per week",
    manualGood: false,
    spyTools: "No bid management capability",
    spyToolsGood: false,
    signalMint: "Automated capital shift from decaying ads to Crown Winners",
    signalMintHighlight: "Dynamic Shift",
  },
  {
    category: "HEALTH TELEMETRY",
    dimension: "Ad Fatigue Forecasting",
    manual: "Only noticed after CPA explodes 200%",
    manualGood: false,
    spyTools: "No fatigue telemetry",
    spyToolsGood: false,
    signalMint: "Predictive 0-100 Health Score triggers 48h before exhaustion",
    signalMintHighlight: "Predictive 0-100 Score",
  },
];

export function ComparisonMatrix() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section
      id="matrix"
      className="relative w-full py-20 sm:py-28 bg-[#FAFAFD] border-b border-[#1A0042]/8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs font-bold text-[#1516A8] tracking-widest uppercase bg-[#E7E6FB] px-2.5 py-1 rounded-full">
              04 // BENCHMARK MATRIX
            </span>
            <span className="font-mono text-xs text-[#1A0042]/60">TRIONN HOVER ILLUMINATION</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#1A0042] tracking-tight uppercase">
            THE UNFAIR ADVANTAGE
          </h2>
          <p className="font-body text-base sm:text-lg text-[#1A0042]/75 mt-3 leading-relaxed">
            Why high-growth DTC & consumer brands are replacing fragmented spy tools and manual media buying guesswork with SignalMint’s autonomous dual engine.
          </p>
        </div>

        {/* 3-Column Matrix Table */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[820px] bg-[#FAFAFD] rounded-2xl border border-[#1A0042]/12 overflow-hidden shadow-[0_8px_30px_rgba(26,0,66,0.03)]">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-[#E7E6FB]/70 border-b border-[#1A0042]/10 py-4 px-6 font-mono text-xs font-bold uppercase tracking-wider text-[#1A0042]">
              <div className="col-span-4 text-[#1A0042]/70">CAPABILITY // DIMENSION</div>
              <div className="col-span-2 text-center text-[#1A0042]/70">MANUAL GUESSWORK</div>
              <div className="col-span-3 text-center text-[#1A0042]/70">TRADITIONAL SPY TOOLS</div>
              <div className="col-span-3 text-center text-[#1516A8] bg-[#FAFAFD] py-1 rounded-lg border border-[#1516A8]/20 flex items-center justify-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#1516A8]" />
                <span>SIGNALMINT OS</span>
              </div>
            </div>

            {/* Matrix Rows with soft #6495EB/15 hover fill */}
            <div className="divide-y divide-[#1A0042]/8">
              {MATRIX_DATA.map((row, idx) => {
                const isHovered = hoveredRow === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredRow(idx)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`grid grid-cols-12 items-center py-5 px-6 transition-colors duration-200 cursor-default ${
                      isHovered ? "bg-[#6495EB]/15" : "bg-transparent"
                    }`}
                  >
                    {/* Dimension */}
                    <div className="col-span-4 pr-4">
                      <span className="font-mono text-[10px] text-[#1516A8] font-bold block mb-0.5">
                        {row.category}
                      </span>
                      <h4 className="font-display font-bold text-base text-[#1A0042]">
                        {row.dimension}
                      </h4>
                    </div>

                    {/* Manual Guesswork */}
                    <div className="col-span-2 text-center px-3">
                      <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-100 text-rose-700 mb-1.5">
                        <X className="w-4 h-4" />
                      </div>
                      <p className="font-body text-xs text-[#1A0042]/70 leading-snug">
                        {row.manual}
                      </p>
                    </div>

                    {/* Traditional Spy Tools */}
                    <div className="col-span-3 text-center px-4 border-x border-[#1A0042]/8">
                      <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-800 mb-1.5">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                      <p className="font-body text-xs text-[#1A0042]/70 leading-snug">
                        {row.spyTools}
                      </p>
                    </div>

                    {/* SignalMint */}
                    <div className="col-span-3 text-left pl-6">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1516A8] text-white">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="font-mono text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#1516A8]/10 text-[#1516A8]">
                          {row.signalMintHighlight}
                        </span>
                      </div>
                      <p className="font-body text-xs text-[#1A0042] font-semibold leading-snug">
                        {row.signalMint}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom highlight footer */}
            <div className="bg-[#E7E6FB]/40 px-6 py-4 border-t border-[#1A0042]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <span className="text-[#1A0042]/70">
                Average SignalMint customer reports <strong className="text-[#1A0042]">+41% ROAS uplift</strong> in 14 days.
              </span>
              <a
                href="#agents"
                className="text-[#1516A8] font-bold hover:underline flex items-center gap-1"
              >
                Inspect Agent Architecture &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
