import { useState } from "react";
import {
  Radar,
  ShieldAlert,
  Award,
  Zap,
  TrendingDown,
  TrendingUp,
  Clock,
  Sparkles,
  ShieldCheck,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BleedLogItem {
  id: string;
  timestamp: string;
  campaign: string;
  adSet: string;
  cpaSpike: string;
  capitalPreserved: string;
  reallocatedTo: string;
}

const INITIAL_LOGS: BleedLogItem[] = [
  {
    id: "log-1",
    timestamp: "2 mins ago",
    campaign: "DTC Scale // Lookalikes 3%",
    adSet: "Ad Set #204 (Static Angle B)",
    cpaSpike: "+148% CPA Spike",
    capitalPreserved: "₹3,400/hr bleed cut",
    reallocatedTo: "Crown Winner #CW-01",
  },
  {
    id: "log-2",
    timestamp: "18 mins ago",
    campaign: "Retargeting Tier 1 // Cart Drop",
    adSet: "Ad Set #412 (UGC Testimonial 04)",
    cpaSpike: "+84% CPA Fatigue",
    capitalPreserved: "₹1,850/hr bleed cut",
    reallocatedTo: "Crown Winner #CW-03",
  },
  {
    id: "log-3",
    timestamp: "44 mins ago",
    campaign: "Broad Interest // US & UK",
    adSet: "Ad Set #109 (Feature Carousel)",
    cpaSpike: "+162% CPA Bleed",
    capitalPreserved: "₹4,200/hr bleed cut",
    reallocatedTo: "Crown Winner #CW-04",
  },
];

export function DualAgentPinned() {
  const [activeTab, setActiveTab] = useState<"scout" | "atlas">("scout");
  const [activeMarker, setActiveMarker] = useState<number>(3); // 3, 8, 14 seconds
  const [bleedLogs, setBleedLogs] = useState<BleedLogItem[]>(INITIAL_LOGS);
  const [totalSaved, setTotalSaved] = useState<number>(2418000);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const simulateNewBleedCut = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    setTimeout(() => {
      const newId = "log-" + Date.now();
      const newCut: BleedLogItem = {
        id: newId,
        timestamp: "Just Now",
        campaign: "Advantage+ Shopping // Top Funnel",
        adSet: `Ad Set #${Math.floor(100 + Math.random() * 900)} (Dead Angle)`,
        cpaSpike: "+174% Sudden Bleed",
        capitalPreserved: "₹5,200/hr bleed cut",
        reallocatedTo: "Crown Winner #CW-02",
      };
      setBleedLogs((prev) => [newCut, ...prev.slice(0, 3)]);
      setTotalSaved((prev) => prev + 5200);
      setIsSimulating(false);
    }, 450);
  };

  return (
    <section
      id="agents"
      className="relative w-full bg-[#FAFAFD] py-20 lg:py-28 border-b border-[#E7E6FB]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* 1. SECTION HEADER */}
        <div className="max-w-3xl mb-12">
          {/* Eyebrow: 02 // THE TWINS (NOT TRAINED ON YOUR DATA) */}
          <div className="mb-3.5">
            <span className="font-mono text-xs font-semibold text-[#4D0181] bg-[#4D0181]/10 px-3 py-1 rounded-full border border-[#4D0181]/20 inline-block uppercase tracking-widest">
              02 // THE TWINS (NOT TRAINED ON YOUR DATA)
            </span>
          </div>

          {/* H2: ONE FINDS WINNERS. ONE STOPS THE BLEEDING. */}
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1A0042] leading-[1.08] uppercase">
            ONE FINDS WINNERS. ONE STOPS THE BLEEDING.
            <span className="block text-xl sm:text-2xl font-serif italic text-[#1A0042]/70 mt-2 normal-case tracking-normal">
              (Both run 24/7. You never touch them.)
            </span>
          </h2>
        </div>

        {/* 2. DUAL-AGENT INTERACTIVE ENGINE (Two Tabs: SCOUT & ATLAS) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab("scout")}
            className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
              activeTab === "scout"
                ? "bg-[#1516A8] text-white border-[#1516A8] shadow-md shadow-[#1516A8]/20"
                : "bg-[#FAFAFD] text-[#1A0042]/75 hover:text-[#1A0042] border-[#E7E6FB] hover:border-[#1516A8]/30"
            }`}
          >
            <Radar className={`w-4 h-4 ${activeTab === "scout" ? "animate-spin-slow text-white" : "text-[#1516A8]"}`} />
            <span>01 // SCOUT — THE COMPETITIVE ARCHAEOLOGIST</span>
          </button>

          <button
            onClick={() => setActiveTab("atlas")}
            className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
              activeTab === "atlas"
                ? "bg-[#4D0181] text-white border-[#4D0181] shadow-md shadow-[#4D0181]/20"
                : "bg-[#FAFAFD] text-[#1A0042]/75 hover:text-[#1A0042] border-[#E7E6FB] hover:border-[#4D0181]/30"
            }`}
          >
            <ShieldAlert className={`w-4 h-4 ${activeTab === "atlas" ? "text-white" : "text-[#4D0181]"}`} />
            <span>02 // ATLAS — THE BUDGET BODYGUARD</span>
          </button>
        </div>

        {/* Split Card Container (#FAFAFD card surface with #E7E6FB borders) */}
        <div className="bg-[#FAFAFD] border border-[#E7E6FB] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_12px_40px_rgba(26,0,66,0.04)]">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: SCOUT CONTENT & VISUAL */}
            {activeTab === "scout" ? (
              <motion.div
                key="tab-scout"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
              >
                {/* Left Narrative Block (Cols 1 to 6) */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1516A8] animate-pulse"></span>
                      <span className="font-mono text-xs font-bold text-[#1516A8] uppercase tracking-wider">
                        AUTONOMOUS REVERSE-ENGINEERING ENGINE
                      </span>
                    </div>

                    {/* Lead Hook */}
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1A0042] tracking-tight leading-snug mb-4">
                      In the 3 seconds a user sees a competitor&apos;s ad, SCOUT reverse-engineers: (a) which visual moment made them stop, (b) why, (c) how many people it stopped.
                    </h3>

                    {/* 3 Action Bullets */}
                    <div className="space-y-4 my-6">
                      
                      {/* Bullet 1 */}
                      <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-[#E7E6FB] shadow-xs">
                        <div className="w-8 h-8 rounded-lg bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center shrink-0 mt-0.5">
                          <Award className="w-4 h-4" />
                        </div>
                        <div className="text-xs sm:text-sm text-[#1A0042]/85 leading-relaxed">
                          <strong className="text-[#1A0042] font-bold block mb-0.5">
                            Detects Crown Winners before they&apos;re obvious:
                          </strong>
                          Flags ads driving 3x+ longevity on first 72 hours of spend. Most tools wait 14 days.
                        </div>
                      </div>

                      {/* Bullet 2 */}
                      <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-[#E7E6FB] shadow-xs">
                        <div className="w-8 h-8 rounded-lg bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center shrink-0 mt-0.5">
                          <Eye className="w-4 h-4" />
                        </div>
                        <div className="text-xs sm:text-sm text-[#1A0042]/85 leading-relaxed">
                          <strong className="text-[#1A0042] font-bold block mb-0.5">
                            Isolates the 0–3 second hook:
                          </strong>
                          Computer vision traces which pixel, sound, or text motion caused +40% retention lift. Not subjective. Algorithmic.
                        </div>
                      </div>

                      {/* Bullet 3 */}
                      <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-[#E7E6FB] shadow-xs">
                        <div className="w-8 h-8 rounded-lg bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="text-xs sm:text-sm text-[#1A0042]/85 leading-relaxed">
                          <strong className="text-[#1A0042] font-bold block mb-0.5">
                            Reverse-engineers script DNA:
                          </strong>
                          Pain point triggered at 0:03. Solution teased at 0:08. CTA appears at 0:14. SCOUT maps the exact cadence.
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Real-Time Ticker */}
                  <div className="pt-4 border-t border-[#E7E6FB] flex items-center gap-2 text-xs font-mono text-[#1A0042]/75">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0"></span>
                    <span className="truncate">
                      340 Crown Winners detected this week | 28 active competitors streamed | 12 new patterns cataloged this hour
                    </span>
                  </div>
                </div>

                {/* Right Visual: Interactive Retention Curve Graph (Cols 7 to 12) */}
                <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E7E6FB] p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E7E6FB] mb-5">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-[#1516A8] uppercase tracking-wider bg-[#E7E6FB] px-2 py-0.5 rounded">
                        COMPUTER VISION RETENTION DECODER
                      </span>
                      <h4 className="font-display font-bold text-base text-[#1A0042] mt-1">
                        Competitor: AeroSleep Labs // 0–15s Drop Curve
                      </h4>
                    </div>
                    <span className="font-mono text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                      48.2% Hook Rate
                    </span>
                  </div>

                  {/* Interactive Cue Markers Selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 bg-[#FAFAFD] p-2.5 sm:p-2 rounded-xl border border-[#E7E6FB]">
                    <span className="font-mono text-xs font-bold text-[#1A0042]/70 pl-0.5">
                      Inspect Cadence Marker:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { sec: 3, label: "0:03 Hook" },
                        { sec: 8, label: "0:08 Solution" },
                        { sec: 14, label: "0:14 CTA" },
                      ].map((m) => (
                        <button
                          key={m.sec}
                          onClick={() => setActiveMarker(m.sec)}
                          className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                            activeMarker === m.sec
                              ? "bg-[#1516A8] text-white shadow-xs"
                              : "bg-white text-[#1A0042]/80 hover:bg-[#E7E6FB] border border-[#E7E6FB]"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive SVG Retention Graph */}
                  <div className="h-44 w-full relative bg-[#FAFAFD] rounded-xl p-3 border border-[#E7E6FB] overflow-hidden mb-4">
                    <svg className="w-full h-full" viewBox="0 0 450 140" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="scoutRetentionGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1516A8" stopOpacity="0.28" />
                          <stop offset="100%" stopColor="#1516A8" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Industry Average Trajectory (steep drop) */}
                      <path
                        d="M 0 40 Q 60 110, 150 120 T 450 130"
                        fill="none"
                        stroke="#1A0042"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        opacity="0.25"
                      />

                      {/* Crown Winner Retention Curve */}
                      <path
                        d="M 0 20 Q 90 32, 180 48 T 350 62 T 450 72 L 450 140 L 0 140 Z"
                        fill="url(#scoutRetentionGrad)"
                      />
                      <path
                        d="M 0 20 Q 90 32, 180 48 T 350 62 T 450 72"
                        fill="none"
                        stroke="#1516A8"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Marker 0:03 (x: 90) */}
                      <line x1="90" y1="10" x2="90" y2="135" stroke={activeMarker === 3 ? "#1516A8" : "#1A0042"} strokeWidth={activeMarker === 3 ? "2" : "1"} strokeDasharray="3 3" opacity={activeMarker === 3 ? "1" : "0.3"} />
                      <circle cx="90" cy="32" r={activeMarker === 3 ? "6" : "4"} fill="#1516A8" />
                      {activeMarker === 3 && <circle cx="90" cy="32" r="12" fill="#1516A8" opacity="0.2" className="animate-ping" />}

                      {/* Marker 0:08 (x: 240) */}
                      <line x1="240" y1="10" x2="240" y2="135" stroke={activeMarker === 8 ? "#1516A8" : "#1A0042"} strokeWidth={activeMarker === 8 ? "2" : "1"} strokeDasharray="3 3" opacity={activeMarker === 8 ? "1" : "0.3"} />
                      <circle cx="240" cy="54" r={activeMarker === 8 ? "6" : "4"} fill="#4D0181" />
                      {activeMarker === 8 && <circle cx="240" cy="54" r="12" fill="#4D0181" opacity="0.2" className="animate-ping" />}

                      {/* Marker 0:14 (x: 420) */}
                      <line x1="420" y1="10" x2="420" y2="135" stroke={activeMarker === 14 ? "#1516A8" : "#1A0042"} strokeWidth={activeMarker === 14 ? "2" : "1"} strokeDasharray="3 3" opacity={activeMarker === 14 ? "1" : "0.3"} />
                      <circle cx="420" cy="70" r={activeMarker === 14 ? "6" : "4"} fill="#1516A8" />
                      {activeMarker === 14 && <circle cx="420" cy="70" r="12" fill="#1516A8" opacity="0.2" className="animate-ping" />}
                    </svg>
                  </div>

                  {/* Dynamic Marker Explainer Card */}
                  <div className="bg-[#E7E6FB]/50 rounded-xl p-3.5 border border-[#1A0042]/10 font-mono text-xs">
                    {activeMarker === 3 && (
                      <div>
                        <div className="flex items-center justify-between text-[#1516A8] font-bold mb-1">
                          <span>⏱️ 0:03 // THE CATALYST HOOK</span>
                          <span className="text-emerald-700">+48.2% Retention Hold</span>
                        </div>
                        <p className="font-body text-xs text-[#1A0042]/85 leading-snug">
                          Ice fracture acoustic burst paired with a contrarian caption (&ldquo;Stop stacking pillows like this&rdquo;). Stops thumb inertia in 420ms.
                        </p>
                      </div>
                    )}
                    {activeMarker === 8 && (
                      <div>
                        <div className="flex items-center justify-between text-[#4D0181] font-bold mb-1">
                          <span>⏱️ 0:08 // SOLUTION REVEAL</span>
                          <span>Retention 41.5%</span>
                        </div>
                        <p className="font-body text-xs text-[#1A0042]/85 leading-snug">
                          Side-by-side split screen showing cervical spine alignment using thermal pressure mapping. Validates product claim visually without voiceover delay.
                        </p>
                      </div>
                    )}
                    {activeMarker === 14 && (
                      <div>
                        <div className="flex items-center justify-between text-[#1516A8] font-bold mb-1">
                          <span>⏱️ 0:14 // FRICTIONLESS CALL-TO-ACTION</span>
                          <span className="text-emerald-700">6.4x Direct ROAS</span>
                        </div>
                        <p className="font-body text-xs text-[#1A0042]/85 leading-snug">
                          Micro-urgency ticker overlay (&ldquo;Batch 08 Ships Today&rdquo;). High CTR conversion velocity with direct click-through to product bundle page.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Summary Metric Footer */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#E7E6FB] text-center font-mono text-xs">
                    <div>
                      <div className="text-[10px] text-[#1A0042]/60">CONFIRMED ROAS</div>
                      <div className="font-black text-[#1516A8] text-base">6.4x</div>
                    </div>
                    <div className="border-x border-[#E7E6FB]">
                      <div className="text-[10px] text-[#1A0042]/60">DETECTED AT</div>
                      <div className="font-black text-[#1A0042] text-base">Hour 18</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#1A0042]/60">CONFIDENCE</div>
                      <div className="font-black text-emerald-600 text-base">99.4%</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              
              /* TAB 2: ATLAS CONTENT & VISUAL */
              <motion.div
                key="tab-atlas"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
              >
                {/* Left Narrative Block (Cols 1 to 6) */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4D0181] animate-pulse"></span>
                      <span className="font-mono text-xs font-bold text-[#4D0181] uppercase tracking-wider">
                        24/7 AUTONOMOUS BUDGET GUARDIAN
                      </span>
                    </div>

                    {/* Lead Hook */}
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1A0042] tracking-tight leading-snug mb-4">
                      Your ad is bleeding ₹850/hour. ATLAS caught it in 12 minutes. You would have noticed tomorrow morning (when you&apos;ve burned ₹20,400).
                    </h3>

                    {/* 3 Action Bullets */}
                    <div className="space-y-4 my-6">
                      
                      {/* Bullet 1 */}
                      <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-[#E7E6FB] shadow-xs">
                        <div className="w-8 h-8 rounded-lg bg-[#4D0181]/10 text-[#4D0181] flex items-center justify-center shrink-0 mt-0.5">
                          <TrendingDown className="w-4 h-4" />
                        </div>
                        <div className="text-xs sm:text-sm text-[#1A0042]/85 leading-relaxed">
                          <strong className="text-[#1A0042] font-bold block mb-0.5">
                            Stops spend bleed before you notice:
                          </strong>
                          Runs a health check every 30 mins across all live ad sets. Detects CPA spikes +25% above 7-day rolling average. Auto-cuts within 12 mins of threshold breach.
                        </div>
                      </div>

                      {/* Bullet 2 */}
                      <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-[#E7E6FB] shadow-xs">
                        <div className="w-8 h-8 rounded-lg bg-[#4D0181]/10 text-[#4D0181] flex items-center justify-center shrink-0 mt-0.5">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div className="text-xs sm:text-sm text-[#1A0042]/85 leading-relaxed">
                          <strong className="text-[#1A0042] font-bold block mb-0.5">
                            Reallocates saved capital to winners:
                          </strong>
                          Instead of just pausing bleeding sets, ATLAS automatically shifts budget to Crown Winners flagged by SCOUT. Compounding growth, not just cost-cutting.
                        </div>
                      </div>

                      {/* Bullet 3 */}
                      <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-[#E7E6FB] shadow-xs">
                        <div className="w-8 h-8 rounded-lg bg-[#4D0181]/10 text-[#4D0181] flex items-center justify-center shrink-0 mt-0.5">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="text-xs sm:text-sm text-[#1A0042]/85 leading-relaxed">
                          <strong className="text-[#1A0042] font-bold block mb-0.5">
                            Keeps spending even while you sleep:
                          </strong>
                          ATLAS runs 24/7. Weekends. Holidays. While you&apos;re in a Slack call. Never pauses unless you pause it.
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Real-Time Ticker */}
                  <div className="pt-4 border-t border-[#E7E6FB] flex items-center gap-2 text-xs font-mono text-[#1A0042]/75">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0"></span>
                    <span className="truncate">
                      ₹{(totalSaved / 1000000).toFixed(2)}M capital preserved this month | 848 interventions executed | ₹4,200 avg saved
                    </span>
                  </div>
                </div>

                {/* Right Visual: Live Bleed Log Feed (Cols 7 to 12) */}
                <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E7E6FB] p-6 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E7E6FB] mb-5">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-[#4D0181] uppercase tracking-wider bg-[#E7E6FB] px-2 py-0.5 rounded">
                        24/7 FINANCIAL STOP-LOSS FEED
                      </span>
                      <h4 className="font-display font-bold text-base text-[#1A0042] mt-1">
                        Live Bleed Log & Budget Interventions
                      </h4>
                    </div>
                    <button
                      onClick={simulateNewBleedCut}
                      disabled={isSimulating}
                      className="font-mono text-xs font-bold text-white bg-[#4D0181] hover:bg-[#1A0042] px-3 py-1.5 rounded-lg transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{isSimulating ? "Detecting..." : "Simulate CPA Spike"}</span>
                    </button>
                  </div>

                  {/* Animated Toast Feed */}
                  <div className="space-y-3 mb-5">
                    <AnimatePresence>
                      {bleedLogs.map((log) => (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, x: 20, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.25 }}
                          className="bg-[#FAFAFD] rounded-xl border border-[#E7E6FB] p-3.5 shadow-xs hover:border-[#4D0181]/30 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] uppercase font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                                {log.cpaSpike}
                              </span>
                              <span className="font-mono text-xs font-bold text-[#1A0042]">
                                {log.adSet}
                              </span>
                            </div>
                            <span className="font-mono text-[10px] text-[#1A0042]/60">
                              {log.timestamp}
                            </span>
                          </div>

                          <div className="text-xs font-mono text-[#1A0042]/70 mb-2 truncate">
                            Campaign: {log.campaign}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-[#E7E6FB] text-xs font-mono">
                            <span className="text-emerald-700 font-bold flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              {log.capitalPreserved}
                            </span>
                            <span className="text-[#1516A8] font-semibold flex items-center gap-1">
                              Reallocated &rarr; {log.reallocatedTo}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Bottom Cumulative Status Card */}
                  <div className="p-4 rounded-xl bg-[#E7E6FB]/40 border border-[#1A0042]/10 flex items-center justify-between font-mono text-xs">
                    <div>
                      <div className="text-[10px] text-[#1A0042]/60">TOTAL CAPITAL DEFENDED (30D)</div>
                      <div className="font-black text-lg sm:text-xl text-[#4D0181]">
                        ₹{totalSaved.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-[#1A0042]/60">AVERAGE RESPONSE TIME</div>
                      <div className="font-bold text-emerald-700 text-sm sm:text-base">
                        &lt; 12 Minutes
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
