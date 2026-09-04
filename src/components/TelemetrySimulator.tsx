import { useState } from "react";
import confetti from "canvas-confetti";
import {
  AlertOctagon,
  ShieldCheck,
  RefreshCw,
  Zap,
  ArrowRight
} from "lucide-react";

export function TelemetrySimulator() {
  const [monthlySpend, setMonthlySpend] = useState<number>(65000);
  const [niche, setNiche] = useState<string>("DTC Wellness & Health");
  const [simulatedIncident, setSimulatedIncident] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [logHistory, setLogHistory] = useState<string[]>([
    "12:44:02 // SCOUT: Tracked 28 competitors in " + niche + " niche",
    "12:44:05 // SCOUT: Crown Winner detected (#CW-884, 5.8x ROAS, 44% Hook Rate)",
    "12:44:18 // ATLAS: 30-min health check executed across 14 ad sets (Avg CPA: $24.20)",
  ]);

  // Projected savings calculation based on spend
  const estimatedSavings = Math.round(monthlySpend * 0.185);
  const projectedRevenueLift = Math.round(monthlySpend * 0.42);

  const triggerBleedSimulation = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setSimulatedIncident(true);

    // Simulate Atlas detection steps
    setTimeout(() => {
      setLogHistory((prev) => [
        "12:45:01 // ⚠️ ATLAS BLEED DETECTED: Ad Set #9102 CPA spiked +168% over 30 mins",
        ...prev,
      ]);
    }, 600);

    setTimeout(() => {
      setLogHistory((prev) => [
        "12:45:02 // 🛡️ ATLAS AUTONOMOUS ACTION: Budget cut $4,200/day on Ad Set #9102",
        "12:45:03 // 🚀 ATLAS CAPITAL REALLOCATION: Shifting $4,200 to Crown Winner #CW-884",
        ...prev,
      ]);
      setIsProcessing(false);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#1516A8", "#4D0181", "#6495EB", "#E7E6FB"],
      });
    }, 1500);
  };

  const resetSimulation = () => {
    setSimulatedIncident(false);
    setLogHistory([
      "12:44:02 // SCOUT: Tracked 28 competitors in " + niche + " niche",
      "12:44:05 // SCOUT: Crown Winner detected (#CW-884, 5.8x ROAS, 44% Hook Rate)",
      "12:44:18 // ATLAS: 30-min health check executed across 14 ad sets (Avg CPA: $24.20)",
    ]);
  };

  return (
    <section
      id="simulator"
      className="relative w-full py-20 sm:py-28 bg-[#FAFAFD] border-b border-[#1A0042]/8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#1516A8] tracking-widest uppercase bg-[#E7E6FB] px-2.5 py-1 rounded-full">
                05 // INTERACTIVE SANDBOX
              </span>
              <span className="font-mono text-xs text-[#1A0042]/60">REAL-TIME ATLAS & SCOUT SIMULATOR</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#1A0042] tracking-tight uppercase">
              TEST AUTONOMOUS INTERVENTION
            </h2>
          </div>
          <p className="font-body text-sm text-[#1A0042]/70 max-w-md">
            Model your ad spend to calculate capital saved from 30-min bleed cuts and see how ATLAS handles sudden CPA spikes.
          </p>
        </div>

        {/* Simulator Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAFAFD] border border-[#1A0042]/12 rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(26,0,66,0.03)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold text-[#1516A8] uppercase tracking-wider">
                  PARAMETER CONFIGURATION
                </span>
                <span className="font-mono text-xs text-[#1A0042]/60">LIVE MODEL</span>
              </div>

              {/* Monthly Ad Spend Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-display font-bold text-sm text-[#1A0042]">
                    Monthly Paid Ad Spend
                  </label>
                  <span className="font-mono text-lg font-black text-[#1516A8]">
                    ${monthlySpend.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full h-2 bg-[#E7E6FB] rounded-lg appearance-none cursor-pointer accent-[#1516A8]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#1A0042]/50 mt-1">
                  <span>$10k/mo</span>
                  <span>$250k/mo</span>
                  <span>$500k/mo</span>
                </div>
              </div>

              {/* Industry Niche Selector */}
              <div className="mb-8">
                <label className="font-display font-bold text-sm text-[#1A0042] block mb-2">
                  Target Competitor Vertical
                </label>
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  {[
                    "DTC Wellness & Health",
                    "Apparel & Footwear",
                    "B2B SaaS & Tech",
                    "Consumer Electronics",
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setNiche(cat)}
                      className={`p-2.5 rounded-xl border text-left font-bold transition-all ${
                        niche === cat
                          ? "bg-[#1516A8] text-white border-[#1516A8]"
                          : "bg-[#E7E6FB]/50 text-[#1A0042] border-[#1A0042]/10 hover:bg-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bleed Simulator Action Trigger */}
              <div className="p-4 rounded-xl bg-[#E7E6FB]/60 border border-[#1A0042]/10 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono text-xs font-bold text-[#1A0042] flex items-center gap-1.5">
                    <AlertOctagon className="w-4 h-4 text-rose-600" />
                    <span>SIMULATE BUDGET BLEED SPIKE</span>
                  </div>
                  {simulatedIncident && (
                    <button
                      onClick={resetSimulation}
                      className="text-[10px] font-mono text-[#1516A8] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" /> Reset
                    </button>
                  )}
                </div>
                <p className="font-body text-xs text-[#1A0042]/70 mb-3 leading-snug">
                  Trigger an unpredicted CPA spike to verify ATLAS autonomous stop-loss logic in real time.
                </p>
                <button
                  onClick={triggerBleedSimulation}
                  disabled={isProcessing || simulatedIncident}
                  className={`w-full py-3 rounded-xl font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    simulatedIncident
                      ? "bg-emerald-600 text-white cursor-default"
                      : "bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>ATLAS INTERCEPTING CPA SPIKE...</span>
                    </>
                  ) : simulatedIncident ? (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>BLEED INTERCEPTED // CAPITAL PROTECTED</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>TRIGGER LIVE BLEED SCENARIO</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Guaranteed Impact Strip */}
            <div className="pt-4 border-t border-[#1A0042]/8 grid grid-cols-2 gap-3 text-center font-mono">
              <div className="bg-[#FAFAFD] p-3 rounded-lg border border-[#1A0042]/8">
                <div className="text-[10px] text-[#1A0042]/60">EST. BLEED SAVED / MO</div>
                <div className="text-xl font-black text-emerald-600">${estimatedSavings.toLocaleString()}</div>
              </div>
              <div className="bg-[#FAFAFD] p-3 rounded-lg border border-[#1A0042]/8">
                <div className="text-[10px] text-[#1A0042]/60">PROJECTED ROAS LIFT</div>
                <div className="text-xl font-black text-[#1516A8]">+${projectedRevenueLift.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Real-time Telemetry Terminal (7 cols) */}
          <div className="lg:col-span-7 bg-[#E7E6FB]/30 border border-[#1A0042]/12 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1A0042]/10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#1A0042] ml-2">
                    SIGNALMINT-OS // KINETIC TELEMETRY FEED
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] text-[#1516A8] font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>SYNCED WITH META & TIKTOK AD APIS</span>
                </div>
              </div>

              {/* Live Terminal Log Screen */}
              <div className="bg-[#FAFAFD] rounded-xl border border-[#1A0042]/10 p-4 font-mono text-xs text-[#1A0042] h-64 overflow-y-auto space-y-2 shadow-inner">
                {logHistory.map((log, index) => {
                  const isAlert = log.includes("⚠️") || log.includes("BLEED DETECTED");
                  const isSuccess = log.includes("🛡️") || log.includes("🚀");
                  return (
                    <div
                      key={index}
                      className={`p-2 rounded-md transition-all ${
                        isAlert
                          ? "bg-rose-50 text-rose-900 border border-rose-200 font-bold"
                          : isSuccess
                          ? "bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold"
                          : "bg-transparent text-[#1A0042]/80 hover:bg-[#E7E6FB]/40"
                      }`}
                    >
                      {log}
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Telemetry Graph Box */}
              <div className="mt-4 bg-[#FAFAFD] rounded-xl border border-[#1A0042]/10 p-4">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#1A0042]/70 font-bold">PORTFOLIO ROAS TELEMETRY (PRE VS POST SIGNALMINT)</span>
                  <span className="text-emerald-600 font-extrabold">+41.4% EFFICIENCY</span>
                </div>
                <div className="h-20 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 500 70" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="liftGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1516A8" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#1516A8" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Pre-SignalMint baseline */}
                    <path
                      d="M 0 50 Q 120 52, 240 48 T 500 55"
                      fill="none"
                      stroke="#1A0042"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      opacity="0.25"
                    />
                    {/* Post-SignalMint uplift */}
                    <path
                      d="M 0 50 Q 120 45, 240 25 T 380 18 T 500 12 L 500 70 L 0 70 Z"
                      fill="url(#liftGradient)"
                    />
                    <path
                      d="M 0 50 Q 120 45, 240 25 T 380 18 T 500 12"
                      fill="none"
                      stroke="#1516A8"
                      strokeWidth="2.5"
                    />
                    <circle cx="500" cy="12" r="4" fill="#1516A8" />
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#1A0042]/60 mt-1">
                  <span>Day 1 (Unmanaged Bleed)</span>
                  <span>Day 7 (Scout Identification)</span>
                  <span className="text-[#1516A8] font-bold">Day 14 (Atlas Capital Shift: Peak ROAS)</span>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="pt-4 mt-4 border-t border-[#1A0042]/10 flex items-center justify-between font-mono text-xs">
              <span className="text-[#1A0042]/60">Integration: Read & Write Meta API</span>
              <span className="text-[#1516A8] font-bold flex items-center gap-1">
                Zero Human Delay <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
