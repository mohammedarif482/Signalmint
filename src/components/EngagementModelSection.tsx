import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { 
  FileSearch, 
  Workflow, 
  Rocket, 
  Repeat, 
  ArrowRight, 
  Clock 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface EngagementModelProps {
  onOpenDemoModal?: () => void;
}

interface Phase {
  number: string;
  title: string;
  timeframe: string;
  duration: string;
  summary: string;
  whatYouGet: string;
  whyItMatters: string;
  icon: typeof FileSearch;
  badge: string;
}

const PHASES: Phase[] = [
  {
    number: "01",
    title: "ACCOUNT AUDIT",
    timeframe: "WEEK 1–2",
    duration: "14 DAYS",
    summary: "30-minute kickoff call. We map your account structure, find what's broken, and send you a prioritized list of fixes.",
    whatYouGet: "A written audit identifying structural issues, tracking problems, and creative fatigue patterns. Prioritized by impact and ease of fix.",
    whyItMatters: "You know exactly what's broken and what to fix first. No guessing.",
    icon: FileSearch,
    badge: "PHASE 01 // AUDIT"
  },
  {
    number: "02",
    title: "REBUILD & BRIEF",
    timeframe: "WEEK 3–4",
    duration: "14 DAYS",
    summary: "We rebuild your campaign setup. New audience structure. First creative brief coming out of your actual data, not templates.",
    whatYouGet: "New campaign structure. Rebuilt audience mapping. Your first creative brief, sourced from what actually converts in your account.",
    whyItMatters: "Your account is now built for scale, not for best practices. Creative briefs are data-backed, not template-based.",
    icon: Workflow,
    badge: "PHASE 02 // REBUILD"
  },
  {
    number: "03",
    title: "LAUNCH & OPTIMIZE",
    timeframe: "WEEK 5–8",
    duration: "28 DAYS",
    summary: "Campaigns go live. We monitor daily. You get weekly calls on what's working, what's not, and what to test next.",
    whatYouGet: "Daily account monitoring. Weekly optimization calls. Monthly performance breakdowns showing what's working and what to test next.",
    whyItMatters: "You catch problems before they become expensive. You scale knowing exactly why something works.",
    icon: Rocket,
    badge: "PHASE 03 // SCALE"
  },
  {
    number: "04",
    title: "HAND-OFF OR RETAIN",
    timeframe: "WEEK 9+",
    duration: "ONGOING",
    summary: "Your account is now self-sustaining. You can run it solo or keep us on for continuous optimization.",
    whatYouGet: "A documented playbook of all systems, creative strategies, and optimization rules. You can run it with your team, or we stay on retainer for continuous work.",
    whyItMatters: "You own the playbook. You're not locked in. Growth doesn't stop when the engagement ends.",
    icon: Repeat,
    badge: "PHASE 04 // COMPOUND"
  }
];

export function EngagementModelSection({ onOpenDemoModal }: EngagementModelProps) {
  const [activePhase, setActivePhase] = useState<number>(0);
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

  return (
    <section 
      id="how-we-work" 
      ref={sectionRef} 
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-[#FAFAFD] text-[#1A0042] border-t border-[#1A0042]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#573681] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#573681]" />
              <span>THE ENGAGEMENT MODEL</span>
            </div>
            <h2
              ref={headingRef}
              className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase"
            >
              From "Just Hired" <br />
              <span className="text-[#573681]">To Running Optimally.</span>
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#1A0042]/75 max-w-md leading-relaxed">
            No 6-month lock-ins. No 40-page onboarding decks. A structured 4-phase roadmap that gets your account stabilized and scaling in under 45 days.
          </p>
        </div>

        {/* 4-Phase Interactive Timeline Grid (Oddity & Codapress inspired) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {PHASES.map((phase, idx) => {
            const Icon = phase.icon;
            const isSelected = activePhase === idx;

            return (
              <div
                key={phase.number}
                onClick={() => setActivePhase(idx)}
                className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between select-none ${
                  isSelected
                    ? "bg-[#1A0042] text-white border-[#1A0042] shadow-2xl scale-[1.02]"
                    : "bg-white text-[#1A0042] border-[#1A0042]/15 hover:border-[#573681]/50 hover:shadow-md"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-full ${
                      isSelected ? "bg-white/10 text-emerald-400" : "bg-[#573681]/10 text-[#573681]"
                    }`}>
                      {phase.timeframe}
                    </span>
                    <span className="font-display font-black text-2xl opacity-40">
                      {phase.number}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center border shadow-xs">
                    <Icon className={`w-5 h-5 ${isSelected ? "text-emerald-400" : "text-[#573681]"}`} />
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg leading-tight uppercase mb-2">
                      {phase.title}
                    </h3>
                    <p className={`font-sans text-xs leading-relaxed ${
                      isSelected ? "text-white/80" : "text-[#1A0042]/75"
                    }`}>
                      {phase.summary}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t mt-6 border-current/10 flex items-center justify-between font-mono text-[11px]">
                  <span className="opacity-70">DURATION:</span>
                  <span className="font-bold">{phase.duration}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Phase Deep-Dive Console */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#E7E6FB]/60 border border-[#1A0042]/15 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#573681]">
                <Clock className="w-4 h-4" />
                <span>{PHASES[activePhase].badge} &middot; {PHASES[activePhase].timeframe} ({PHASES[activePhase].duration})</span>
              </div>

              <div className="space-y-1">
                <div className="font-mono text-[11px] font-bold text-[#1A0042]/60 uppercase">WHAT YOU GET:</div>
                <p className="font-sans text-sm sm:text-base text-[#1A0042] font-semibold leading-relaxed">
                  {PHASES[activePhase].whatYouGet}
                </p>
              </div>

              <div className="space-y-1 pt-1">
                <div className="font-mono text-[11px] font-bold text-emerald-700 uppercase">WHY IT MATTERS:</div>
                <p className="font-sans text-sm text-[#1A0042]/85 leading-relaxed">
                  {PHASES[activePhase].whyItMatters}
                </p>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col justify-center items-start md:items-end gap-3 pt-4 md:pt-0">
              <button
                onClick={onOpenDemoModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#573681] hover:bg-[#1A0042] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Phase 1 Kickoff</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="font-mono text-[10px] text-[#1A0042]/60">
                ● 30-min audit precedes Phase 1
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
