import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Clock
} from "lucide-react";

interface TelemetrySimulatorProps {
  onOpenDemoModal?: () => void;
}

interface PhaseLog {
  phase: number;
  time: string;
  badge: string;
  badgeColor: string;
  message: string;
}

const VERTICAL_WINNERS_COUNT: Record<string, number> = {
  "DTC Apparel": 47,
  "Beauty & Skincare": 62,
  "B2B SaaS": 38,
  "Supplements": 51,
  "Consumer Tech": 44,
};

export function TelemetrySimulator({ onOpenDemoModal }: TelemetrySimulatorProps) {
  // Monthly spend in INR (Default: ₹1,200,000)
  const [monthlySpend, setMonthlySpend] = useState<number>(1200000);
  const [selectedVertical, setSelectedVertical] = useState<string>("DTC Apparel");
  const [currentPhase, setCurrentPhase] = useState<number>(0); // 0 = idle, 1..4 = phases
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Dynamic calculations
  const usdEquivalent = Math.round(monthlySpend / 83);
  const projectedMonthlySave = Math.round(monthlySpend * 0.08); // 8% of spend
  const estimatedDailyBleedWithoutAtlas = Math.round(projectedMonthlySave / 30);

  const phases: PhaseLog[] = [
    {
      phase: 1,
      time: "12:44:02 UTC",
      badge: "⚠️ ATLAS DETECTION",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      message: "CPA spiked to ₹479 (+168%) on Ad Set #9102",
    },
    {
      phase: 2,
      time: "12:44:45 UTC",
      badge: "⏱️ ANALYSIS",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      message: "Inaction cost calculated: ₹3,400/hr bleed rate",
    },
    {
      phase: 3,
      time: "12:45:01 UTC",
      badge: "✂️ AUTO-CUT EXECUTED",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      message: "Budget paused. Saved ₹4,200 in 12-min window",
    },
    {
      phase: 4,
      time: "12:45:03 UTC",
      badge: "🚀 REALLOCATION",
      badgeColor: "bg-[#E7E6FB] text-[#1516A8] border-[#1516A8]/20",
      message: "Capital reallocated to Crown Winner #CW-884 (5.8x ROAS)",
    },
  ];

  const triggerBleedSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentPhase(1);

    setTimeout(() => {
      setCurrentPhase(2);
    }, 700);

    setTimeout(() => {
      setCurrentPhase(3);
    }, 1400);

    setTimeout(() => {
      setCurrentPhase(4);
      setIsRunning(false);
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#1516A8", "#4D0181", "#6495EB", "#E7E6FB"],
      });
    }, 2100);
  };

  const resetSimulation = () => {
    setCurrentPhase(0);
    setIsRunning(false);
  };

  return (
    <section
      id="simulator"
      className="relative w-full py-20 sm:py-28 bg-[#FAFAFD] border-b border-[#E7E6FB]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* 1. SECTION HEADER */}
        <div className="max-w-3xl mb-12">
          {/* Eyebrow: 05 // TRY IT (WITH YOUR NUMBERS) */}
          <div className="mb-3.5">
            <span className="font-mono text-xs font-semibold text-[#4D0181] bg-[#4D0181]/10 px-3 py-1 rounded-full border border-[#4D0181]/20 inline-block uppercase tracking-widest">
              05 // TRY IT (WITH YOUR NUMBERS)
            </span>
          </div>

          {/* H2 */}
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1A0042] leading-[1.08] uppercase">
            PUT YOUR BUDGET AT RISK. ATLAS PROTECTS IT.
          </h2>

          {/* Subhead */}
          <p className="font-montserrat text-sm sm:text-base text-[#1A0042]/80 mt-4 leading-relaxed max-w-2xl">
            Enter your monthly spend and vertical. Simulate a bleed spike (we&apos;ll trigger it). Watch ATLAS stop the bleeding in real time. Then calculate your monthly save.
          </p>
        </div>

        {/* 2. TWO-COLUMN INTERACTIVE SIMULATOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT PANEL (Input Parameters - Cols 1 to 5) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#1A0042]/10 shadow-[0_12px_40px_rgba(26,0,66,0.04)] flex flex-col justify-between">
            <div>
              <h3 className="font-display font-extrabold text-xl text-[#1A0042] mb-1">
                Let&apos;s get specific. What&apos;s your reality right now?
              </h3>
              <p className="font-mono text-xs text-[#1A0042]/60 mb-6">
                CONFIGURE SIMULATION PARAMETERS
              </p>

              {/* Spend Slider */}
              <div className="mb-6 p-4 rounded-2xl bg-[#FAFAFD] border border-[#E7E6FB]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-[#1A0042] uppercase">
                    Monthly Paid Spend:
                  </span>
                  <span className="font-mono text-base sm:text-lg font-black text-[#1516A8]">
                    ₹{monthlySpend.toLocaleString("en-IN")}{" "}
                    <span className="text-xs text-[#1A0042]/60 font-semibold">
                      / ${usdEquivalent.toLocaleString()}
                    </span>
                  </span>
                </div>

                <input
                  type="range"
                  min={200000}
                  max={10000000}
                  step={50000}
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full h-2 bg-[#E7E6FB] rounded-lg appearance-none cursor-pointer accent-[#1516A8] my-3"
                />

                <div className="flex justify-between font-mono text-[10px] text-[#1A0042]/50 mb-2">
                  <span>₹200k/mo</span>
                  <span>₹5M/mo</span>
                  <span>₹10M/mo</span>
                </div>

                <p className="font-body text-xs text-[#1A0042]/70 italic leading-snug">
                  (ATLAS protects every rupee. Typical bleed: 5–12% of spend. Let&apos;s calculate yours.)
                </p>
              </div>

              {/* Vertical Selector */}
              <div className="mb-6">
                <label className="font-mono text-xs font-bold text-[#1A0042] uppercase block mb-2.5">
                  Select Your Vertical:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "DTC Apparel",
                    "Beauty & Skincare",
                    "B2B SaaS",
                    "Supplements",
                    "Consumer Tech",
                  ].map((vert) => (
                    <button
                      key={vert}
                      onClick={() => setSelectedVertical(vert)}
                      className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer border ${
                        selectedVertical === vert
                          ? "bg-[#1516A8] text-white border-[#1516A8] shadow-xs"
                          : "bg-[#FAFAFD] text-[#1A0042]/80 hover:bg-white border-[#E7E6FB]"
                      }`}
                    >
                      {vert}
                    </button>
                  ))}
                </div>

                {/* Active Feedback Note */}
                <div className="mt-3.5 p-3 rounded-xl bg-[#E7E6FB]/50 border border-[#1A0042]/8 font-mono text-xs text-[#1A0042]/80 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                  <span>
                    Found <strong>{VERTICAL_WINNERS_COUNT[selectedVertical] || 47} Crown Winners</strong> in this vertical this week. SCOUT monitors them 24/7.
                  </span>
                </div>
              </div>
            </div>

            {/* Trigger Button */}
            <div className="pt-2">
              <button
                onClick={triggerBleedSimulation}
                disabled={isRunning}
                className="w-full bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm uppercase font-mono tracking-wider"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>
                  {isRunning
                    ? "ATLAS INTERCEPTING SPIKE..."
                    : "⚠️ SIMULATE BLEED SPIKE (What happens to YOUR budget?)"}
                </span>
              </button>

              {currentPhase > 0 && !isRunning && (
                <button
                  onClick={resetSimulation}
                  className="w-full text-center mt-2 font-mono text-xs text-[#1516A8] font-bold hover:underline flex items-center justify-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Reset Simulation
                </button>
              )}
            </div>
          </div>

          {/* RIGHT PANEL (Real-Time Terminal & Dynamic Outcome - Cols 6 to 12) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* Terminal Response Screen */}
            <div className="bg-[#1A0042] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-[#1A0042] relative overflow-hidden flex-1 flex flex-col justify-between">
              
              {/* Terminal Titlebar */}
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    </div>
                    <span className="font-mono text-xs font-bold text-white/90 ml-2">
                      ATLAS TELEMETRY DAEMON // REAL-TIME LOG
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    ACTIVE
                  </span>
                </div>

                {/* 4-Phase Terminal Sequence Animated */}
                <div className="space-y-3 font-mono text-xs min-h-[220px]">
                  {currentPhase === 0 ? (
                    <div className="h-44 flex flex-col items-center justify-center text-center text-white/50 space-y-2">
                      <Clock className="w-8 h-8 text-white/30" />
                      <p className="max-w-xs">
                        Click the red button on the left to simulate a sudden CPA spike on your {selectedVertical} account.
                      </p>
                    </div>
                  ) : (
                    phases.slice(0, currentPhase).map((p) => (
                      <motion.div
                        key={p.phase}
                        initial={{ opacity: 0, x: -16, scale: 0.96 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-white/40 text-[11px]">{p.time} //</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${p.badgeColor}`}>
                            {p.badge}
                          </span>
                        </div>
                        <div className="text-white/90 font-medium text-xs">
                          {p.message}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>

              {/* Terminal Bottom Indicator */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/60">
                <span>Autonomous Stop-Loss Engine v2.6.4</span>
                <span className="text-emerald-400 font-bold">Intervention Latency: 12 minutes</span>
              </div>
            </div>

            {/* Dynamic Outcome Summary Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#1A0042]/10 shadow-[0_12px_40px_rgba(26,0,66,0.04)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#E7E6FB]">
                
                {/* Without ATLAS */}
                <div className="font-mono">
                  <span className="text-[10px] text-[#1A0042]/60 uppercase font-bold block mb-0.5">
                    WITHOUT ATLAS
                  </span>
                  <span className="text-base sm:text-lg font-black text-rose-700">
                    -₹{estimatedDailyBleedWithoutAtlas.toLocaleString("en-IN")}/day bleed
                  </span>
                </div>

                {/* With ATLAS */}
                <div className="font-mono">
                  <span className="text-[10px] text-[#1A0042]/60 uppercase font-bold block mb-0.5">
                    WITH ATLAS
                  </span>
                  <span className="text-base sm:text-lg font-black text-emerald-600">
                    ₹0 wasted
                  </span>
                </div>

                {/* Projected Monthly Capital Saved (8% of spend) */}
                <div className="font-mono sm:text-right">
                  <span className="text-[10px] text-[#4D0181] uppercase font-bold block mb-0.5">
                    PROJECTED MONTHLY CAPITAL SAVED (8%)
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-[#1516A8]">
                    ₹{projectedMonthlySave.toLocaleString("en-IN")}/mo
                  </span>
                </div>
              </div>

              {/* Direct CTA */}
              <button
                onClick={onOpenDemoModal}
                className="w-full py-4 rounded-2xl bg-[#1516A8] hover:bg-[#1A0042] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>
                  Your Save: ₹{projectedMonthlySave.toLocaleString("en-IN")}/mo. Ready to automate this?
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
