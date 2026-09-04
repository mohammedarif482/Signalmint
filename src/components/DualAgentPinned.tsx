import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Radar,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Activity,
  Play,
  Pause,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export function DualAgentPinned() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const [activeAgent, setActiveAgent] = useState<"scout" | "atlas">("scout");
  const [isBleedingPaused, setIsBleedingPaused] = useState(false);
  const [activeCompetitor, setActiveCompetitor] = useState("HexaGlow");
  const [manualOverride, setManualOverride] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    const pinEl = pinTargetRef.current;
    if (!el || !pinEl) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "+=120%",
      pin: pinEl,
      pinSpacing: true,
      scrub: 0.8,
      onUpdate: (self) => {
        if (!manualOverride) {
          if (self.progress >= 0.5 && activeAgent !== "atlas") {
            setActiveAgent("atlas");
          } else if (self.progress < 0.5 && activeAgent !== "scout") {
            setActiveAgent("scout");
          }
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [activeAgent, manualOverride]);

  const handleTabClick = (agent: "scout" | "atlas") => {
    setActiveAgent(agent);
    setManualOverride(true);
    // Reset manual override lock after 3 seconds so scroll remains responsive
    setTimeout(() => setManualOverride(false), 3000);
  };

  return (
    <section
      id="agents"
      ref={containerRef}
      className="relative w-full bg-[#FAFAFD] border-b border-[#1A0042]/8"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinTargetRef}
        className="w-full min-h-screen py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center"
      >
        {/* Section Header with Telemetry Sub-Tracker */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#1A0042]/8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#1516A8] tracking-widest uppercase bg-[#E7E6FB] px-2.5 py-1 rounded-full">
                02 // AUTONOMOUS ARSENAL
              </span>
              <span className="font-mono text-xs text-[#1A0042]/60">ODDITY PINNED TELEMETRY</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#1A0042] tracking-tight uppercase">
              THE TWO AI AGENTS GOVERNING YOUR AD SPEND
            </h2>
          </div>

          {/* Interactive Agent Toggle Pills */}
          <div className="inline-flex p-1 rounded-full bg-[#E7E6FB] border border-[#1A0042]/10 self-start sm:self-auto">
            <button
              onClick={() => handleTabClick("scout")}
              data-cursor="SCOUT"
              className={`px-5 py-2 rounded-full font-mono text-xs font-bold transition-all ${
                activeAgent === "scout"
                  ? "bg-[#1516A8] text-white shadow-sm"
                  : "text-[#1A0042]/70 hover:text-[#1A0042]"
              }`}
            >
              01 // SCOUT (CREATIVE INTEL)
            </button>
            <button
              onClick={() => handleTabClick("atlas")}
              data-cursor="ATLAS"
              className={`px-5 py-2 rounded-full font-mono text-xs font-bold transition-all ${
                activeAgent === "atlas"
                  ? "bg-[#4D0181] text-white shadow-sm"
                  : "text-[#1A0042]/70 hover:text-[#1A0042]"
              }`}
            >
              02 // ATLAS (BUDGET GUARDIAN)
            </button>
          </div>
        </div>

        {/* The Split Viewport (45% Left Solid Studio White Card / 55% Right Interactive Visual Canvas) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[580px]">
          
          {/* Left 45% (Solid Studio White Card with fine shadow) */}
          <div className="lg:col-span-5 bg-[#FAFAFD] border border-[#1A0042]/10 rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(26,0,66,0.04)] flex flex-col justify-between relative overflow-hidden">
            {/* Background watermark badge */}
            <div className="absolute top-4 right-4 font-mono font-black text-7xl text-[#1A0042]/[0.03] select-none pointer-events-none">
              {activeAgent === "scout" ? "01" : "02"}
            </div>

            <AnimatePresence mode="wait">
              {activeAgent === "scout" ? (
                <motion.div
                  key="scout-text"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center font-bold">
                        <Radar className="w-6 h-6 animate-spin-slow" />
                      </div>
                      <div>
                        <div className="font-mono text-xs text-[#1516A8] font-bold uppercase tracking-wider">
                          AGENT 01 // RADAR ENGINE
                        </div>
                        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1A0042]">
                          SCOUT
                        </h3>
                      </div>
                    </div>

                    <p className="font-mono text-xs text-[#1516A8] font-semibold mb-3">
                      COMPETITIVE CREATIVE INTELLIGENCE
                    </p>

                    <p className="font-body text-sm sm:text-base text-[#1A0042]/80 leading-relaxed mb-6">
                      SCOUT reverse-engineers the creative strategy of 25+ direct rivals simultaneously. It decodes retention drops, script structures, visual hook rhythms, and isolates Crown Winners before they saturate the market.
                    </p>

                    {/* Telemetry Feature List */}
                    <div className="space-y-3 font-mono text-xs text-[#1A0042]">
                      <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#E7E6FB]/50 border border-[#1A0042]/6">
                        <CheckCircle2 className="w-4 h-4 text-[#1516A8] mt-0.5 shrink-0" />
                        <div>
                          <strong className="text-[#1A0042]">25+ Competitor Tracker:</strong> Real-time ad library harvesting and spend velocity indexing.
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#E7E6FB]/50 border border-[#1A0042]/6">
                        <CheckCircle2 className="w-4 h-4 text-[#1516A8] mt-0.5 shrink-0" />
                        <div>
                          <strong className="text-[#1A0042]">Crown Winner Ad Detector:</strong> Automatically flags creatives driving 3x+ longevity & volume.
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#E7E6FB]/50 border border-[#1A0042]/6">
                        <CheckCircle2 className="w-4 h-4 text-[#1516A8] mt-0.5 shrink-0" />
                        <div>
                          <strong className="text-[#1A0042]">3-Sec Hook Rate X-Ray:</strong> Dissects the exact visual catalyst causing users to stop scrolling.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Telemetry Status */}
                  <div className="pt-6 mt-6 border-t border-[#1A0042]/8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1516A8] animate-pulse"></span>
                      <span className="font-mono text-xs font-bold text-[#1A0042]/80">
                        MONITORING 28 AD ACCOUNTS
                      </span>
                    </div>
                    <span className="font-mono text-xs font-extrabold text-[#1516A8]">
                      +34 WINNERS LOGGED TODAY
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="atlas-text"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-[#4D0181]/10 text-[#4D0181] flex items-center justify-center font-bold">
                        <ShieldAlert className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-mono text-xs text-[#4D0181] font-bold uppercase tracking-wider">
                          AGENT 02 // FINANCIAL STOP-LOSS
                        </div>
                        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1A0042]">
                          ATLAS
                        </h3>
                      </div>
                    </div>

                    <p className="font-mono text-xs text-[#4D0181] font-semibold mb-3">
                      24/7 AUTONOMOUS BUDGET GUARDIAN
                    </p>

                    <p className="font-body text-sm sm:text-base text-[#1A0042]/80 leading-relaxed mb-6">
                      Human ad managers sleep; ATLAS never does. Running micro-telemetry checks every 30 minutes, ATLAS cuts spend on decaying ads before costly morning regret and shifts budget into high-yield Crown Winners.
                    </p>

                    {/* Telemetry Feature List */}
                    <div className="space-y-3 font-mono text-xs text-[#1A0042]">
                      <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#E7E6FB]/50 border border-[#1A0042]/6">
                        <CheckCircle2 className="w-4 h-4 text-[#4D0181] mt-0.5 shrink-0" />
                        <div>
                          <strong className="text-[#1A0042]">30-Min Bleed Protection:</strong> Intercepts CPA spikes and cuts sub-par ad sets in real-time.
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#E7E6FB]/50 border border-[#1A0042]/6">
                        <CheckCircle2 className="w-4 h-4 text-[#4D0181] mt-0.5 shrink-0" />
                        <div>
                          <strong className="text-[#1A0042]">Automated Health Scores (0-100):</strong> Algorithmic grading of conversion probability and fatigue.
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#E7E6FB]/50 border border-[#1A0042]/6">
                        <CheckCircle2 className="w-4 h-4 text-[#4D0181] mt-0.5 shrink-0" />
                        <div>
                          <strong className="text-[#1A0042]">Dynamic Capital Redistribution:</strong> Siphons capital directly to top performing creatives.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Telemetry Status */}
                  <div className="pt-6 mt-6 border-t border-[#1A0042]/8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4D0181] animate-pulse"></span>
                      <span className="font-mono text-xs font-bold text-[#1A0042]/80">
                        CHECKS RUN: EVERY 30 MINS
                      </span>
                    </div>
                    <span className="font-mono text-xs font-extrabold text-[#4D0181]">
                      $148,400 SAVED THIS MO
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right 55% (Interactive Visual Canvas) */}
          <div className="lg:col-span-7 bg-[#E7E6FB]/40 border border-[#1A0042]/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden backdrop-blur-sm">
            
            <AnimatePresence mode="wait">
              {activeAgent === "scout" ? (
                /* SCOUT VISUAL CANVAS */
                <motion.div
                  key="scout-visual"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  {/* Top Bar: Competitor Feed Selection */}
                  <div className="flex items-center justify-between bg-[#FAFAFD] p-3 rounded-xl border border-[#1A0042]/10">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#1516A8]" />
                      <span className="font-mono text-xs font-bold text-[#1A0042]">LIVE COMPETITOR RADAR</span>
                    </div>
                    <div className="flex gap-1.5 overflow-x-auto">
                      {["HexaGlow", "LumiSkin", "ApexGear"].map((comp) => (
                        <button
                          key={comp}
                          onClick={() => setActiveCompetitor(comp)}
                          data-cursor="SELECT"
                          className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                            activeCompetitor === comp
                              ? "bg-[#1516A8] text-white"
                              : "bg-[#E7E6FB] text-[#1A0042] hover:bg-white"
                          }`}
                        >
                          {comp}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Crown Winner Inspector Card */}
                  <div className="bg-[#FAFAFD] rounded-xl border border-[#1A0042]/10 p-5 shadow-xs relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                              CROWN WINNER DETECTED
                            </span>
                            <span className="font-mono text-xs text-[#1A0042]/60">Active 28 Days</span>
                          </div>
                          <h4 className="font-display font-bold text-base text-[#1A0042]">
                            "{activeCompetitor}: 3-Second Sensory Ice Splash"
                          </h4>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-xl font-black text-[#1516A8]">8.4x ROAS</span>
                        <div className="font-mono text-[10px] text-emerald-600 font-bold">EST. $94k SPEND</div>
                      </div>
                    </div>

                    {/* Simulated Creative Hook Curve (SVG) */}
                    <div className="mt-4 pt-4 border-t border-[#1A0042]/8">
                      <div className="flex items-center justify-between text-xs font-mono text-[#1A0042]/70 mb-1">
                        <span>RETENTION DROP CURVE</span>
                        <span className="text-[#1516A8] font-bold">48.2% Hook Rate (Industry Avg: 18%)</span>
                      </div>
                      <div className="h-24 w-full bg-[#E7E6FB]/30 rounded-lg p-2 relative overflow-hidden">
                        <svg className="w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="scoutCurveGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#1516A8" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="#1516A8" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          {/* Baseline curve */}
                          <path
                            d="M 0 60 Q 60 70, 150 72 T 400 75"
                            fill="none"
                            stroke="#1A0042"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            opacity="0.3"
                          />
                          {/* Crown winner trajectory */}
                          <path
                            d="M 0 10 Q 50 15, 120 22 T 250 28 T 400 35 L 400 80 L 0 80 Z"
                            fill="url(#scoutCurveGrad)"
                          />
                          <path
                            d="M 0 10 Q 50 15, 120 22 T 250 28 T 400 35"
                            fill="none"
                            stroke="#1516A8"
                            strokeWidth="2.5"
                          />
                          {/* Pulse node at 3-second hook marker */}
                          <circle cx="50" cy="15" r="4" fill="#1516A8" />
                          <circle cx="50" cy="15" r="8" fill="#1516A8" opacity="0.3" className="animate-ping" />
                        </svg>
                        <div className="absolute top-2 left-14 font-mono text-[9px] bg-[#1516A8] text-white px-1.5 py-0.5 rounded">
                          0:03 Key Hook Point
                        </div>
                      </div>
                    </div>

                    {/* Creative Breakdown Attributes */}
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono text-xs">
                      <div className="bg-[#E7E6FB]/60 p-2 rounded-lg border border-[#1A0042]/6">
                        <div className="text-[10px] text-[#1A0042]/60">HOOK TYPE</div>
                        <div className="font-bold text-[#1A0042]">Sensory Shock</div>
                      </div>
                      <div className="bg-[#E7E6FB]/60 p-2 rounded-lg border border-[#1A0042]/6">
                        <div className="text-[10px] text-[#1A0042]/60">SCRIPT ANGLE</div>
                        <div className="font-bold text-[#1A0042]">Pain Agitation</div>
                      </div>
                      <div className="bg-[#E7E6FB]/60 p-2 rounded-lg border border-[#1A0042]/6">
                        <div className="text-[10px] text-[#1A0042]/60">FORMAT</div>
                        <div className="font-bold text-[#1A0042]">9:16 UGC + B-Roll</div>
                      </div>
                    </div>
                  </div>

                  {/* Competitor Radar Mini Strip */}
                  <div className="bg-[#FAFAFD] p-3.5 rounded-xl border border-[#1A0042]/10 flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span className="text-[#1A0042]">Top 25 Competitor Velocity:</span>
                      <span className="font-bold text-[#1516A8]">+18 New Creatives Detected in 6h</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      LIVE STREAM
                    </span>
                  </div>
                </motion.div>
              ) : (
                /* ATLAS VISUAL CANVAS */
                <motion.div
                  key="atlas-visual"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  {/* Real-time Health Score Gauge & Bleed Intercept */}
                  <div className="bg-[#FAFAFD] p-5 rounded-xl border border-[#1A0042]/10 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#4D0181]/10 text-[#4D0181]">
                          PORTFOLIO HEALTH TELEMETRY
                        </span>
                        <h4 className="font-display font-bold text-base text-[#1A0042] mt-1">
                          Live 30-Minute Spend Audit
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#1A0042]/60">Cycle in:</span>
                        <span className="font-mono text-xs font-extrabold text-[#4D0181] bg-[#E7E6FB] px-2 py-1 rounded">
                          08m : 42s
                        </span>
                      </div>
                    </div>

                    {/* 2-Column Gauge & Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Health Score Dial */}
                      <div className="bg-[#E7E6FB]/40 p-4 rounded-xl border border-[#1A0042]/8 flex items-center gap-4">
                        <div className="relative w-18 h-18 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path
                              className="text-[#1A0042]/10"
                              strokeWidth="3.5"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-[#4D0181]"
                              strokeDasharray="94, 100"
                              strokeWidth="3.5"
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                            <span className="text-lg font-black text-[#1A0042]">94</span>
                            <span className="text-[8px] text-[#1A0042]/60 font-bold">/100</span>
                          </div>
                        </div>
                        <div>
                          <div className="font-mono text-xs font-bold text-[#1A0042]">HEALTH SCORE</div>
                          <div className="font-mono text-[11px] text-emerald-600 font-bold">OPTIMAL ZONE</div>
                          <div className="font-mono text-[10px] text-[#1A0042]/60 mt-1">
                            0 Ad Sets Burning &gt; 1.8x CPA
                          </div>
                        </div>
                      </div>

                      {/* Spend Shield Status */}
                      <div className="bg-[#E7E6FB]/40 p-4 rounded-xl border border-[#1A0042]/8 flex flex-col justify-between">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="text-[#1A0042]/70">BLEED DEFENSE:</span>
                          <span className="font-bold text-emerald-600 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ACTIVE
                          </span>
                        </div>
                        <div className="font-mono text-xl font-black text-[#4D0181] mt-2">
                          $1,240 <span className="text-xs font-normal text-[#1A0042]/70">Bleed Stopped Today</span>
                        </div>
                        <div className="font-mono text-[10px] text-[#1A0042]/60 mt-1">
                          Automated stop-loss triggered on 3 dead angles
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Action Trigger Demonstration */}
                  <div className="bg-[#FAFAFD] p-5 rounded-xl border border-red-200/80 shadow-xs relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span className="font-mono text-xs font-bold text-rose-700 uppercase">
                          BLEED INCIDENT DETECTED // AD #0492-B
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-bold">
                        CPA +142% SPIKE
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 bg-rose-50/50 rounded-lg border border-rose-100 font-mono text-xs">
                      <div>
                        <div className="font-bold text-[#1A0042]">Creative: "Static Feature Comparison 2"</div>
                        <div className="text-[11px] text-[#1A0042]/70">
                          ROAS dropped to 0.72x | Spend velocity: $85/hr
                        </div>
                      </div>

                      {/* Interactive Button to Pause/Resume */}
                      <button
                        onClick={() => setIsBleedingPaused(!isBleedingPaused)}
                        data-cursor="TRIGGER"
                        className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                          isBleedingPaused
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
                        }`}
                      >
                        {isBleedingPaused ? (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>RESUME AD SET</span>
                          </>
                        ) : (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>CUT BUDGET (AUTONOMOUS)</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#1A0042]/70">
                      <span>Status: <strong className={isBleedingPaused ? "text-emerald-700" : "text-rose-600"}>{isBleedingPaused ? "BUDGET REALLOCATED TO CROWN WINNER" : "PENDING MANUAL OR AUTO INTERVENTION"}</strong></span>
                      <span className="text-[#4D0181] font-bold">Atlas latency: &lt; 840ms</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
