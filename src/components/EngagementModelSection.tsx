import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { 
  FileSearch, 
  Workflow, 
  Rocket, 
  Repeat, 
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldCheck
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
  deliverables: string[];
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
    whatYouGet: "A written diagnostic audit identifying structural inefficiencies, tracking anomalies, and creative fatigue curves.",
    deliverables: [
      "Full Account Architecture & Tracking Diagnostics",
      "Pixel / CAPI / UTM Attribution Integrity Check",
      "Creative Fatigue & Funnel Drop-off Analysis",
      "Prioritized Fix Roadmap (Impact vs. Effort)"
    ],
    whyItMatters: "You know exactly what's broken and what to fix first. No guesswork, no wasted spend.",
    icon: FileSearch,
    badge: "PHASE 01 // AUDIT"
  },
  {
    number: "02",
    title: "REBUILD & BRIEF",
    timeframe: "WEEK 3–4",
    duration: "14 DAYS",
    summary: "We rebuild your campaign setup. New audience structure. First creative brief coming out of your actual data, not generic templates.",
    whatYouGet: "New campaign structure, rebuilt audience mapping, and your first creative briefs sourced from your actual converting data.",
    deliverables: [
      "Restructured Campaign Setup & Naming Taxonomy",
      "Custom Audiences & Strict Exclusion Mapping",
      "First Data-Backed Creative Brief (No Templates)",
      "Initial High-Velocity Angle Variations"
    ],
    whyItMatters: "Your account is now built for scale, not generic best practices. Creative briefs are data-backed.",
    icon: Workflow,
    badge: "PHASE 02 // REBUILD"
  },
  {
    number: "03",
    title: "LAUNCH & OPTIMIZE",
    timeframe: "WEEK 5–8",
    duration: "28 DAYS",
    summary: "Campaigns go live. We monitor daily. You get weekly calls on what's working, what's not, and what to test next.",
    whatYouGet: "Daily account monitoring, weekly optimization calls, and performance breakdowns showing exactly what to iterate.",
    deliverables: [
      "Daily Budget Allocation & Bid Guardrails",
      "Weekly Live Strategy & Performance Calls",
      "Continuous Creative Fatigue & Iteration Cycles",
      "Dedicated Real-Time Slack/WhatsApp Channel"
    ],
    whyItMatters: "You catch problems before they become expensive. You scale knowing exactly why something works.",
    icon: Rocket,
    badge: "PHASE 03 // SCALE"
  },
  {
    number: "04",
    title: "HAND-OFF OR RETAIN",
    timeframe: "WEEK 9+",
    duration: "ONGOING",
    summary: "Your account is now self-sustaining. You can run it solo with our documented systems or keep us on for continuous optimization.",
    whatYouGet: "A documented playbook of all systems, creative strategies, and optimization rules for your in-house team or ongoing retainer.",
    deliverables: [
      "Complete Custom Operating System Playbook",
      "In-House Creative & Media Team Hand-off Training",
      "Retainer Scaling Option (Month-to-Month, No Lock-In)",
      "Bi-Weekly Diagnostic Architecture Refreshes"
    ],
    whyItMatters: "You own the playbook. You're not locked in. Growth compounds whether you retain us or execute internally.",
    icon: Repeat,
    badge: "PHASE 04 // COMPOUND"
  }
];

export function EngagementModelSection({ onOpenDemoModal: _onOpenDemoModal }: EngagementModelProps) {
  const [activePhase, setActivePhase] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    if (!section || !leftCol || !rightCol) return;

    const ctx = gsap.context(() => {
      // SplitText heading reveal
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
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          },
        });
      }

      // Desktop Pin: Pin right headlines column until left column completes scrolling
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: rightCol,
          start: "top 96px",
          endTrigger: leftCol,
          end: () => `bottom ${rightCol.offsetHeight + 96}px`,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });

      // ScrollTrigger spy for left cards to update activePhase on right
      PHASES.forEach((_, idx) => {
        const card = document.getElementById(`phase-card-${idx}`);
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => setActivePhase(idx),
          onEnterBack: () => setActivePhase(idx),
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToPhase = (index: number) => {
    setActivePhase(index);
    const element = document.getElementById(`phase-card-${index}`);
    if (element) {
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section 
      id="how-we-work" 
      ref={sectionRef} 
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-[#FAFAFD] text-[#1A0042] border-t border-[#1A0042]/10 overflow-x-clip selection:bg-[#573681] selection:text-white"
    >
      {/* Ambient background vertical grid lines */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <div className="max-w-7xl h-full mx-auto grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 px-6 sm:px-8 lg:px-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-full border-r border-[#1A0042]/5 relative"
            >
              {i === 6 && (
                <div className="absolute top-1/4 right-[-1px] w-[2px] h-12 bg-[#573681]/25" />
              )}
            </div>
          ))}
        </div>
        {/* Soft Organic Blob Wash on Background */}
        {/* Blob 1: Top-left lavender/violet wash under Cards 01 & 02 */}
        <div className="absolute -top-16 -left-20 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] bg-gradient-to-br from-[#E7E6FB] via-[#DDD6FE]/70 to-[#C4B5FD]/45 rounded-[42%_58%_70%_30%/45%_45%_55%_55%] filter blur-[90px] sm:blur-[130px] opacity-90 pointer-events-none" />

        {/* Blob 2: Central spine highlight purple aura weaving between columns */}
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 w-[480px] sm:w-[650px] h-[650px] sm:h-[850px] bg-gradient-to-tr from-[#573681]/15 via-[#B08BE0]/30 to-[#E7E6FB]/40 rounded-[60%_40%_35%_65%/55%_35%_65%_45%] filter blur-[100px] sm:blur-[140px] opacity-75 pointer-events-none" />

        {/* Blob 3: Bottom-left lilac & faint mint whisper under Cards 03 & 04 */}
        <div className="absolute bottom-12 -left-16 w-[520px] sm:w-[700px] h-[520px] sm:h-[700px] bg-gradient-to-tr from-[#E7E6FB] via-[#C4B5FD]/40 to-[#A7F3D0]/25 rounded-[48%_52%_45%_55%/42%_58%_48%_52%] filter blur-[95px] sm:blur-[135px] opacity-85 pointer-events-none" />

        {/* Blob 4: Top-right soft celestial wash behind pinned headlines */}
        <div className="absolute top-20 right-0 w-[420px] sm:w-[580px] h-[480px] sm:h-[620px] bg-gradient-to-bl from-[#E7E6FB] via-[#DDD6FE]/50 to-transparent rounded-[50%_50%_62%_38%/48%_45%_55%_52%] filter blur-[85px] sm:blur-[120px] opacity-80 pointer-events-none" />

        {/* Blob 5: Bottom-right grounding amethyst glow */}
        <div className="absolute -bottom-10 right-1/6 w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] bg-[#B08BE0]/20 rounded-full filter blur-[110px] sm:blur-[140px] opacity-60 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* 2-Column Split: Left Scrolls, Right Stays Fixed (Pinned) */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start">
          
          {/* ================================================================= */}
          {/* 1. LEFT COLUMN: SCROLLING DETAILED PHASE CARDS                     */}
          {/* ================================================================= */}
          <div 
            ref={leftColRef}
            className="order-2 lg:order-1 w-full lg:col-span-7 flex flex-col divide-y divide-[#1A0042]/15 pt-8 lg:pt-0 pb-12 sm:pb-16 lg:pb-24"
          >
            {PHASES.map((phase, idx) => {
              const Icon = phase.icon;
              const isActive = activePhase === idx;

              return (
                <div
                  key={phase.number}
                  id={`phase-card-${idx}`}
                  data-phase-index={idx}
                  className={`py-10 sm:py-14 first:pt-0 last:pb-0 transition-opacity duration-300 relative ${
                    isActive ? "opacity-100" : "opacity-75 hover:opacity-95"
                  }`}
                >
                  {/* Watermark Number */}
                  <div className="absolute top-0 right-2 sm:top-2 sm:right-4 font-display font-black text-5xl sm:text-6xl text-[#1A0042]/5 select-none pointer-events-none">
                    {phase.number}
                  </div>

                  {/* Card Header Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        isActive ? "bg-emerald-500 animate-pulse" : "bg-[#573681]/40"
                      }`} />
                      <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#573681]">
                        {phase.badge}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 font-mono text-[10.5px] sm:text-[11px] font-bold text-[#1A0042]/75">
                      <Clock className="w-3.5 h-3.5 text-[#573681]" />
                      <span>{phase.timeframe} &middot; {phase.duration}</span>
                    </div>
                  </div>

                  {/* Icon & Title Row */}
                  <div className="flex items-start gap-4 mb-4 relative z-10">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      isActive 
                        ? "bg-[#573681] text-white shadow-md shadow-[#573681]/25" 
                        : "bg-[#573681]/10 text-[#573681]"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <h3 className="font-display font-black text-xl sm:text-2xl lg:text-3xl uppercase tracking-tight text-[#1A0042] leading-tight">
                        {phase.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#1A0042]/70 mt-1 leading-relaxed">
                        {phase.summary}
                      </p>
                    </div>
                  </div>

                  {/* What You Get & Deliverables Breakdown */}
                  <div className="mt-6 pt-6 border-t border-[#1A0042]/10 space-y-4 relative z-10">
                    <div>
                      <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#1A0042]/55 mb-1.5 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#573681]" />
                        <span>WHAT YOU GET</span>
                      </div>
                      <p className="font-sans text-sm sm:text-base font-medium text-[#1A0042] leading-relaxed">
                        {phase.whatYouGet}
                      </p>
                    </div>

                    {/* Key Deliverables Checklist */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {phase.deliverables.map((item, dIdx) => (
                        <div 
                          key={dIdx}
                          className="flex items-start gap-2.5 text-xs text-[#1A0042]/85 font-medium leading-snug"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why It Matters Callout */}
                  <div className="mt-5 pl-4 border-l-2 border-[#573681]/40 py-1 space-y-1 relative z-10">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#573681] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#573681]" />
                      <span>WHY IT MATTERS</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#1A0042]/90 leading-relaxed font-normal">
                      {phase.whyItMatters}
                    </p>
                  </div>

                  {/* Bottom Milestone Progress Bar */}
                  <div className="mt-6 pt-4 border-t border-[#1A0042]/5 flex items-center justify-between text-[11px] font-mono text-[#1A0042]/50">
                    <span>ROADMAP STEP 0{idx + 1} OF 04</span>
                    <span className="font-bold text-[#573681]">{phase.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================================================================= */}
          {/* 2. RIGHT COLUMN: PINNED HEADLINES & QUICK NAVIGATION               */}
          {/* ================================================================= */}
          <div className="order-1 lg:order-2 w-full lg:col-span-5 relative">
            <div 
              ref={rightColRef}
              className="w-full flex flex-col pt-0 sm:pt-4 z-20 will-change-transform"
            >
              {/* Tag / Eyebrow */}
              <div className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#573681] mb-3 sm:mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#573681] animate-pulse" />
                <span>HOW WE WORK</span>
              </div>

              {/* Main Display Headline */}
              <h2
                ref={headingRef}
                className="font-display font-black text-3xl sm:text-4xl xl:text-5xl tracking-tight leading-[1.08] uppercase text-[#1A0042]"
              >
                From Day One <br />
                <span className="text-[#573681]">To Steady Scale.</span>
              </h2>

              {/* Subtitle / Philosophy */}
              <p className="font-sans text-sm sm:text-base text-[#1A0042]/75 leading-relaxed mt-4 sm:mt-5 mb-6 lg:mb-8 max-w-lg">
                We audit what's broken, test fresh creative, and scale what works. Clear weekly milestones with no guesswork.
              </p>

              {/* Desktop Interactive Phase Navigation Track (Inspired by CipherDigital & Cheese & Pixels) */}
              <div className="hidden lg:flex flex-col gap-1.5 mb-6">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1A0042]/45 px-2 pt-1 pb-1">
                  PHASES &middot; CLICK TO JUMP
                </div>
                {PHASES.map((phase, idx) => {
                  const isActive = activePhase === idx;

                  return (
                    <button
                      key={`nav-${phase.number}`}
                      onClick={() => scrollToPhase(idx)}
                      className={`group w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-300 text-left cursor-pointer ${
                        isActive
                          ? "bg-[#573681] text-white shadow-md shadow-[#573681]/20 scale-[1.01]"
                          : "hover:bg-[#E7E6FB]/50 text-[#1A0042]/70 hover:text-[#1A0042]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[11px] font-black transition-colors ${
                          isActive 
                            ? "bg-white/20 text-white" 
                            : "bg-[#1A0042]/5 text-[#1A0042]/60 group-hover:bg-[#573681]/15 group-hover:text-[#573681]"
                        }`}>
                          {phase.number}
                        </span>
                        <div>
                          <div className={`font-sans font-bold text-xs uppercase tracking-tight transition-colors ${
                            isActive ? "text-white" : "text-[#1A0042] group-hover:text-[#573681]"
                          }`}>
                            {phase.title}
                          </div>
                          <div className={`font-mono text-[9.5px] transition-colors ${
                            isActive ? "text-white/80" : "text-[#1A0042]/40"
                          }`}>
                            {phase.timeframe} &middot; {phase.duration}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isActive ? "translate-x-0.5 text-white" : "text-[#1A0042]/30 group-hover:translate-x-0.5 group-hover:text-[#573681]"
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
