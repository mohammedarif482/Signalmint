import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Clock,
  Zap,
  ArrowRight,
  Sparkles,
  Check
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface CrownCard {
  id: string;
  patternTitle: string;
  brand: string;
  roas: string;
  spend: string;
  scalingDuration: string;
  hookHumanTerms: string;
  whyItWorks: string;
  actionText: string;
  hasCategoryDropdown?: boolean;
  scriptDNA: string[];
}

const CROWN_CARDS: CrownCard[] = [
  {
    id: "card-1",
    patternTitle: "The \"Sensory Shock\" Pattern",
    brand: "Aerosleep Labs",
    roas: "6.4x ROAS",
    spend: "₹320,000+ Spend",
    scalingDuration: "28 Days Scaling",
    hookHumanTerms: "Opens with ice fracture + ASMR crackle (0:00–0:03). Brain stops. Contrarian myth debunked in 2.2 seconds. Solution revealed before 0:05 (retention cliff prevented). By 0:08, sleep science credibility = established.",
    whyItWorks: "Hook Type: Sensory Overload (disrupts scroll inertia). Execution: Budget spent on production quality, not influencer names. Replicability: HIGH across beauty, wellness, supplements.",
    actionText: "View Full Creative X-Ray →",
    hasCategoryDropdown: true,
    scriptDNA: [
      "0:00–0:03 // Acoustic burst: High-frequency ice break forces micro-attention",
      "0:03–0:05 // Contrarian myth punch: Debunks standard foam pillow misconception",
      "0:05–0:09 // Mechanism-of-action visual: Thermal airflow layer revealed",
      "0:10–0:15 // Frictionless social proof + Batch 08 reservation CTA"
    ],
  },
  {
    id: "card-2",
    patternTitle: "The \"Contrarian Tear-Down\" Pattern",
    brand: "MethodIQ",
    roas: "5.2x ROAS",
    spend: "₹180,000+ Spend",
    scalingDuration: "34 Days Scaling",
    hookHumanTerms: "Direct camera close-up: \x27Stop using retinol like it\x27s 2019.\x27 Immediate objection raised and solved with proprietary lipid study.",
    whyItWorks: "Hook Type: Belief Disruption. Replicability: High for B2B SaaS and high-ticket DTC.",
    actionText: "View Script DNA →",
    hasCategoryDropdown: false,
    scriptDNA: [
      "0:00–0:02 // Shock statement: Stop using retinol like it\x27s 2019",
      "0:03–0:06 // Evidence anchor: Green screen showing medical publication header",
      "0:07–0:11 // Formulation contrast: Lipid suspension vs alcoholic base",
      "0:12–0:15 // Direct risk reversal: 30-day empty bottle guarantee"
    ],
  },
  {
    id: "card-3",
    patternTitle: "The \"Split-Screen Teardown\" Pattern",
    brand: "FinTech / SaaS",
    roas: "4.8x ROAS",
    spend: "₹410,000+ Spend",
    scalingDuration: "42 Days Scaling",
    hookHumanTerms: "Left side shows chaotic Excel budget sheet, right side shows 1-click automated API dashboard.",
    whyItWorks: "Hook Type: Visual Contrast. Replicability: Immediate for tech, productivity, tools.",
    actionText: "Steal Blueprint →",
    hasCategoryDropdown: false,
    scriptDNA: [
      "0:00–0:03 // Visual friction: Tangled spreadsheet errors + red cell warnings",
      "0:04–0:07 // Instant relief: 1-click webhook sync demo playing at 1.5x speed",
      "0:08–0:12 // Financial proof: 14 hours saved per finance manager per week",
      "0:13–0:15 // Free trial trigger: No credit card required checkout"
    ],
  },
];

export function HorizontalShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<CrownCard | null>(null);
  const [userCategory, setUserCategory] = useState<string>("Supplements");
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth + 140);
    };

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + (track.scrollWidth - window.innerWidth + 450),
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCopyScript = (scriptLines: string[]) => {
    navigator.clipboard.writeText(scriptLines.join("\n"));
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#FAFAFD] overflow-hidden flex flex-col justify-center border-b border-[#E7E6FB] py-16 lg:py-20"
    >
      {/* 1. SECTION HEADER */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full mb-10">
        <div className="max-w-3xl">
          {/* Eyebrow: 03 // CROWN WINNERS (THIS WEEK) */}
          <div className="mb-3.5">
            <span className="font-mono text-xs font-semibold text-[#4D0181] bg-[#4D0181]/10 px-3 py-1 rounded-full border border-[#4D0181]/20 inline-block uppercase tracking-widest">
              03 // CROWN WINNERS (THIS WEEK)
            </span>
          </div>

          {/* H2 */}
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1A0042] leading-[1.08] uppercase">
            WATCH: EXACTLY HOW THEY DID IT
            <span className="block text-2xl sm:text-3xl font-serif italic text-[#1516A8] mt-1 normal-case tracking-normal">
              (Then steal the pattern.)
            </span>
          </h2>

          {/* Instruction */}
          <p className="font-montserrat text-sm sm:text-base text-[#1A0042]/75 mt-4 leading-relaxed max-w-2xl">
            Scroll to see what&apos;s scaling this week. Note the pattern. SCOUT will flag the exact moment your competitors try it in your vertical.
          </p>
        </div>
      </div>

      {/* 2. HORIZONTAL CARDS TRACK */}
      <div className="w-full relative overflow-visible">
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 px-6 sm:px-12 lg:px-16 w-max items-stretch select-none"
        >
          {CROWN_CARDS.map((card, idx) => (
            <div
              key={card.id}
              className="w-[86vw] max-w-[420px] sm:w-[380px] lg:w-[420px] bg-white rounded-2xl p-6 lg:p-7 border border-[#1A0042]/10 shadow-xl flex-shrink-0 flex flex-col justify-between hover:border-[#1516A8]/40 transition-all duration-300 relative group"
            >
              {/* Card Accent Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1516A8] via-[#4D0181] to-[#1516A8] rounded-t-2xl opacity-90" />

              <div>
                {/* Pattern Title & Brand Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#E7E6FB] text-[#4D0181] border border-[#4D0181]/20">
                    PATTERN #{idx + 1}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-xs text-[#1A0042]/60">
                    <Clock className="w-3.5 h-3.5 text-[#1516A8]" />
                    <span>{card.scalingDuration}</span>
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#1A0042] mb-1 group-hover:text-[#1516A8] transition-colors">
                  {card.patternTitle}
                </h3>
                <div className="font-mono text-xs text-[#1516A8] font-bold uppercase tracking-wider mb-4">
                  Brand: {card.brand}
                </div>

                {/* Outcome Metrics Row: ROAS in #1516A8, Spend, Days Scaling */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#FAFAFD] border border-[#E7E6FB] mb-5 text-center font-mono">
                  <div>
                    <div className="text-[10px] text-[#1A0042]/60 font-semibold">ROAS</div>
                    <div className="font-black text-lg text-[#1516A8]">{card.roas}</div>
                  </div>
                  <div className="border-x border-[#E7E6FB]">
                    <div className="text-[10px] text-[#1A0042]/60 font-semibold">SPEND</div>
                    <div className="font-black text-sm sm:text-base text-[#1A0042] mt-0.5">{card.spend}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#1A0042]/60 font-semibold">DURATION</div>
                    <div className="font-bold text-xs text-emerald-700 mt-1">{card.scalingDuration}</div>
                  </div>
                </div>

                {/* The Hook (In Human Terms) */}
                <div className="mb-4 p-3.5 rounded-xl bg-[#E7E6FB]/40 border border-[#1A0042]/8">
                  <div className="font-mono text-[11px] font-bold text-[#1516A8] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#1516A8]" />
                    <span>THE HOOK (IN HUMAN TERMS)</span>
                  </div>
                  <p className="font-body text-xs text-[#1A0042]/85 leading-relaxed">
                    &ldquo;{card.hookHumanTerms}&rdquo;
                  </p>
                </div>

                {/* Why It Works */}
                <div className="mb-5 p-3.5 rounded-xl bg-white border border-[#1A0042]/10 text-xs">
                  <div className="font-mono text-[11px] font-bold text-[#4D0181] uppercase tracking-wider mb-1">
                    WHY IT WORKS // TELEMETRY
                  </div>
                  <p className="font-body text-xs text-[#1A0042]/80 leading-relaxed">
                    {card.whyItWorks}
                  </p>
                </div>
              </div>

              {/* Action Trigger Row */}
              <div className="pt-4 border-t border-[#E7E6FB] flex flex-col gap-2.5">
                {card.hasCategoryDropdown && (
                  <div className="flex items-center justify-between text-xs font-mono bg-[#FAFAFD] p-2 rounded-lg border border-[#E7E6FB]">
                    <span className="text-[#1A0042]/70 font-semibold">Your Category:</span>
                    <select
                      value={userCategory}
                      onChange={(e) => setUserCategory(e.target.value)}
                      className="bg-white border border-[#1A0042]/15 text-[#1A0042] font-semibold rounded px-2 py-0.5 text-xs cursor-pointer focus:outline-none"
                    >
                      <option>Supplements</option>
                      <option>Beauty & Skincare</option>
                      <option>DTC Apparel</option>
                      <option>Wellness Devices</option>
                    </select>
                  </div>
                )}

                <button
                  onClick={() => setSelectedCard(card)}
                  className="w-full py-3 rounded-xl bg-[#1516A8] hover:bg-[#1A0042] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
                >
                  <span>{card.actionText}</span>
                </button>
              </div>
            </div>
          ))}

          {/* End Reel CTA Card */}
          <div className="w-[340px] lg:w-[380px] bg-[#E7E6FB]/90 rounded-2xl p-7 border border-[#1516A8]/20 shadow-lg flex-shrink-0 flex flex-col justify-between text-center">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1516A8] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#1A0042] uppercase mb-2">
                STEAL COMPETITOR BLUEPRINTS 48H EARLY
              </h3>
              <p className="font-body text-xs text-[#1A0042]/75 leading-relaxed mb-6">
                SCOUT runs 24/7 across Meta, TikTok, and YouTube Ad Libraries. You never miss a newly scaling hook.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="#simulator"
                className="w-full py-3 rounded-xl bg-[#1516A8] hover:bg-[#4D0181] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm block"
              >
                <span>Launch Telemetry Sandbox</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="block font-mono text-[10px] text-[#1A0042]/60">
                Live streaming 25,000+ creative trajectories
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Blueprint / Script DNA Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A0042]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAFAFD] border border-[#1A0042]/20 rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#E7E6FB] text-[#1A0042] font-mono text-sm font-bold flex items-center justify-center hover:bg-[#1A0042] hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#1516A8] animate-pulse"></span>
              <span className="font-mono text-xs font-bold text-[#1516A8] uppercase">
                SCOUT CREATIVE BLUEPRINT // {selectedCard.brand}
              </span>
            </div>

            <h3 className="font-display font-black text-2xl text-[#1A0042] mb-1">
              {selectedCard.patternTitle}
            </h3>
            <p className="font-mono text-xs text-[#4D0181] font-semibold mb-4">
              {selectedCard.roas} | {selectedCard.spend} | {selectedCard.scalingDuration}
            </p>

            <div className="bg-white rounded-xl border border-[#1A0042]/10 p-4 mb-4 font-mono text-xs space-y-2.5">
              <div className="font-bold text-[#1A0042] mb-2 flex items-center justify-between">
                <span>CADENCE TIMELINE (0–15s):</span>
                <button
                  onClick={() => handleCopyScript(selectedCard.scriptDNA)}
                  className="text-[11px] text-[#1516A8] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedScript ? <><Check className="w-3 h-3 text-emerald-600 inline mr-1" /> Copied</> : "Copy Blueprint"}
                </button>
              </div>

              {selectedCard.scriptDNA.map((line, i) => (
                <div key={i} className="p-2 rounded bg-[#FAFAFD] border border-[#E7E6FB] text-[#1A0042]/85 text-xs font-mono">
                  {line}
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#E7E6FB]/50 rounded-xl border border-[#1A0042]/10 font-mono text-xs text-[#1A0042]/80 mb-5">
              <strong className="text-[#1516A8] block mb-0.5">SCOUT RECOMMENDATION:</strong>
              Adapt this hook for <strong className="text-[#1A0042]">{userCategory}</strong> by replicating the acoustic break in the first 1.8s.
            </div>

            <button
              onClick={() => setSelectedCard(null)}
              className="w-full py-3 rounded-xl bg-[#1516A8] text-white font-mono text-xs font-bold uppercase hover:bg-[#1A0042] transition-colors cursor-pointer"
            >
              Close Telemetry Inspector
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
