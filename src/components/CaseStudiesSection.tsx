import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Clock, 
  Building2, 
  Quote 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface CaseStudiesSectionProps {
  onOpenDemoModal?: () => void;
}

interface CaseStudy {
  id: string;
  brand: string;
  category: string;
  engagement: string;
  problemHeadline: string;
  problemBody: string;
  whatWeDid: string[];
  metrics: {
    roasBefore: string;
    roasAfter: string;
    cpaBefore: string;
    cpaAfter: string;
    scale: string;
    timeToResult: string;
  };
  quote: string;
  author: string;
  title: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "aerosleep",
    brand: "Aerosleep Labs",
    category: "DTC Wellness // Sleep Tech",
    engagement: "3 Months Engagement",
    problemHeadline: "Budget was burning on creative fatigue. Couldn't scale past ₹500k/mo without a 35% CPA spike.",
    problemBody: "Every new ad fatigued within 7 days. Customer acquisition cost skyrocketed on broad Meta targeting, and the client was trapped in an endless production cycle of guessing which creative would hit next.",
    whatWeDid: [
      "Audited account structure → Found 3 core audiences cannibalizing each other in broad targeting.",
      "Refreshed creative strategy → Mapped top 2 hook patterns (Sensory Shock ASMR + thermal layer proof).",
      "Re-tuned bid strategy → Tightened pacing and shifted to dynamic cost-cap stabilization."
    ],
    metrics: {
      roasBefore: "1.8x",
      roasAfter: "5.4x",
      cpaBefore: "₹410",
      cpaAfter: "₹192",
      scale: "₹120k → ₹750k/mo",
      timeToResult: "38 Days"
    },
    quote: "SignalMint didn't just run ads. They understood why our old approach was failing within 48 hours, restructured our entire account, and gave us briefs that actually convert. The speed of the result surprised us.",
    author: "Rohit V.",
    title: "Founder & CEO, Aerosleep Labs"
  },
  {
    id: "methodiq",
    brand: "MethodIQ",
    category: "Clean Skincare // DTC Beauty",
    engagement: "4 Months Engagement",
    problemHeadline: "Top-of-funnel acquisition bleeding money. Retinol ads skipped in under 2 seconds.",
    problemBody: "Strong customer retention, but cold prospecting on Meta had collapsed to 1.4x ROAS. Standard lifestyle shoots were failing to overcome consumer skepticism in a saturated beauty market.",
    whatWeDid: [
      "Pixel & CAPI audit → Identified 22% dropped purchase events on custom checkout.",
      "Creative re-engineering → Deployed 'Contrarian Tear-Down' script ('Stop using retinol like it's 2019').",
      "Fatigue prevention cadence → Pre-built 8 variant hooks before primary creative hit frequency 2.4."
    ],
    metrics: {
      roasBefore: "1.4x",
      roasAfter: "4.1x",
      cpaBefore: "₹560",
      cpaAfter: "₹230",
      scale: "₹140k/mo bleed stopped",
      timeToResult: "42 Days"
    },
    quote: "The audit uncovered ₹1.4L of monthly spend that was essentially paying for customers who were already in our email flow. That insight alone paid for their engagement 10x over.",
    author: "Ananya S.",
    title: "Head of Growth, MethodIQ"
  },
  {
    id: "monolith",
    brand: "Monolith Apparel",
    category: "Performance Athleisure // Apparel",
    engagement: "60 Days Engagement",
    problemHeadline: "Scaling plateaued at 2.1x ROAS. Previous agency pushed lifestyle shoots that bombed in 72 hours.",
    problemBody: "Over-fragmented account structure with 14 competing ad sets. Budget was spread so thin that Meta's machine learning couldn't exit the learning phase on any single ad.",
    whatWeDid: [
      "Account consolidation → Condensed 14 fragmented ad sets into 3 clean compound tiers.",
      "Format winner mapping → Swapped generic lifestyle photos for macro-tensile tear-down video tests.",
      "Retention curve optimization → Front-loaded proof in seconds 0–3, locking scroll retention."
    ],
    metrics: {
      roasBefore: "2.1x",
      roasAfter: "4.9x",
      cpaBefore: "₹380",
      cpaAfter: "₹210",
      scale: "+185% Net Profit",
      timeToResult: "45 Days"
    },
    quote: "Every other agency gave us fancy slide decks and excuses about algorithm updates. SignalMint gave us a systematic audit report on day 7, fixed the leak on day 12, and scaled our revenue.",
    author: "Vikram M.",
    title: "Co-Founder, Monolith Apparel"
  }
];

export function CaseStudiesSection({ onOpenDemoModal }: CaseStudiesSectionProps) {
  const [selectedStudy, setSelectedStudy] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        new SplitText(headingRef.current, {
          type: "lines",
          autoSplit: true,
          mask: "lines",
          onSplit: (instance) => {
            return gsap.from(instance.lines, {
              yPercent: 110,
              opacity: 0,
              duration: 0.85,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headingRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            });
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const active = CASE_STUDIES[selectedStudy];

  return (
    <section 
      id="proof" 
      ref={sectionRef} 
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-[#E7E6FB]/40 text-[#1A0042] border-t border-[#1A0042]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#573681] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#573681]" />
              <span>PROOF &amp; CLIENT TRANSFORMATIONS</span>
            </div>
            <h2
              ref={headingRef}
              className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase"
            >
              Audited Accounts. <br />
              <span className="text-[#573681]">Quantified Results.</span>
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#1A0042]/75 max-w-md leading-relaxed">
            Every case follows the same audit trajectory: identify the root architectural bleed, re-engineer the creative brief from performance data, and scale without margin collapse.
          </p>
        </div>

        {/* Case Study Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {CASE_STUDIES.map((study, idx) => (
            <button
              key={study.id}
              onClick={() => setSelectedStudy(idx)}
              className={`px-4 sm:px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                selectedStudy === idx
                  ? "bg-[#1A0042] text-white border-[#1A0042] shadow-sm"
                  : "bg-white/80 text-[#1A0042]/70 border-[#1A0042]/15 hover:bg-white hover:text-[#1A0042]"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{study.brand}</span>
              <span className="text-[10px] opacity-70 hidden sm:inline">({study.category.split("//")[0].trim()})</span>
            </button>
          ))}
        </div>

        {/* Detailed Case Study Card (Oryzo & Moonshot Media style) */}
        <div className="bg-white rounded-3xl border border-[#1A0042]/15 shadow-xl p-6 sm:p-10 lg:p-12 transition-all duration-300">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1A0042]/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-2xl sm:text-3xl text-[#1A0042]">{active.brand}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#573681]/10 text-[#573681] font-mono text-[10px] font-bold uppercase">
                  {active.category}
                </span>
              </div>
              <div className="font-mono text-xs text-[#1A0042]/60 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{active.engagement}</span>
              </div>
            </div>

            <div className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-xs font-bold flex items-center gap-1.5 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>VERIFIED AUDIT TRANSFORMATION</span>
            </div>
          </div>

          {/* Main Grid: Problem & Solution vs Quantified Results */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-8 items-start">
            {/* Left: Problem & What We Did */}
            <div className="lg:col-span-7 space-y-6">
              {/* The Problem */}
              <div className="space-y-2">
                <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>THE PROBLEM // WHAT WAS BURNING SPEND</span>
                </div>
                <h4 className="font-display font-bold text-lg sm:text-xl text-[#1A0042] leading-snug">
                  "{active.problemHeadline}"
                </h4>
                <p className="font-sans text-sm text-[#1A0042]/80 leading-relaxed">
                  {active.problemBody}
                </p>
              </div>

              {/* What We Did */}
              <div className="space-y-3 pt-2">
                <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#573681] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>THE AUDIT-FIRST SOLUTION</span>
                </div>
                <div className="space-y-2">
                  {active.whatWeDid.map((step, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-xl bg-[#E7E6FB]/40 border border-[#1A0042]/8 flex items-start gap-3 text-xs sm:text-sm text-[#1A0042]">
                      <span className="w-5 h-5 rounded-full bg-[#573681] text-white flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="p-5 rounded-2xl bg-[#1A0042]/5 border-l-4 border-[#573681] space-y-2">
                <Quote className="w-5 h-5 text-[#573681]/50" />
                <p className="font-sans italic text-xs sm:text-sm text-[#1A0042]/90 leading-relaxed">
                  "{active.quote}"
                </p>
                <div className="font-mono text-xs font-bold text-[#1A0042] pt-1">
                  — {active.author}, <span className="text-[#1A0042]/70 font-normal">{active.title}</span>
                </div>
              </div>
            </div>

            {/* Right: Quantified Results Dashboard */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 sm:p-7 rounded-2xl bg-[#1A0042] text-white space-y-5 shadow-lg">
                <div className="font-mono text-xs font-bold text-[#6495EB] uppercase tracking-wider flex items-center justify-between">
                  <span>AUDIT SCORECARD</span>
                  <span className="text-emerald-400">● VERIFIED ROI</span>
                </div>

                {/* Primary Metric: ROAS */}
                <div className="p-4 rounded-xl bg-white/10 space-y-1">
                  <div className="font-mono text-[10.5px] text-white/60 uppercase">BLENDED ROAS PROGRESSION</div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display font-semibold text-2xl text-white/50 line-through">{active.metrics.roasBefore}</span>
                    <span className="text-white/40 text-lg">→</span>
                    <span className="font-display font-black text-4xl text-emerald-400">{active.metrics.roasAfter}</span>
                  </div>
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="text-[10px] text-white/60 uppercase">BLENDED CPA</div>
                    <div className="font-bold text-base text-white mt-0.5">{active.metrics.cpaBefore} → <span className="text-emerald-400">{active.metrics.cpaAfter}</span></div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="text-[10px] text-white/60 uppercase">TIME TO RESULT</div>
                    <div className="font-bold text-base text-white mt-0.5">{active.metrics.timeToResult}</div>
                  </div>
                </div>

                {/* Scale Metric */}
                <div className="p-3 rounded-xl bg-white/5 font-mono">
                  <div className="text-[10px] text-white/60 uppercase">SCALE / BLEED RECOVERY</div>
                  <div className="font-bold text-base text-[#6495EB] mt-0.5">{active.metrics.scale}</div>
                </div>

                {/* Audit Action */}
                <button
                  onClick={onOpenDemoModal}
                  className="w-full py-3.5 rounded-xl bg-[#573681] hover:bg-[#1A0042] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Audit My Account Like This</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
