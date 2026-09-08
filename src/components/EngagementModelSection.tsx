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

export function EngagementModelSection({ onOpenDemoModal }: EngagementModelProps) {
  const [activePhase, setActivePhase] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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

      // ScrollTrigger spy for left cards to update activePhase on right
      PHASES.forEach((_, idx) => {
        const card = document.getElementById(`phase-card-${idx}`);
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top 45%",
          end: "bottom 45%",
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
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-[#FAFAFD] text-[#1A0042] border-t border-[#1A0042]/10 overflow-hidden selection:bg-[#573681] selection:text-white"
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
        {/* Soft violet radial highlight */}
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#E7E6FB]/40 rounded-full filter blur-[120px] opacity-70 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* 2-Column Split: Left Scrolls, Right Stays Fixed (Sticky) */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-start">
          
          {/* ================================================================= */}
          {/* 1. LEFT COLUMN: SCROLLING DETAILED PHASE CARDS                     */}
          {/* ================================================================= */}
          <div className="order-2 lg:order-1 w-full lg:col-span-7 flex flex-col gap-8 sm:gap-10 pt-10 lg:pt-0 pb-12 sm:pb-16 lg:pb-24">
            {PHASES.map((phase, idx) => {
              const Icon = phase.icon;
              const isActive = activePhase === idx;

              return (
                <div
                  key={phase.number}
                  id={`phase-card-${idx}`}
                  data-phase-index={idx}
                  className={`p-6 sm:p-8 lg:p-10 rounded-3xl border transition-all duration-500 relative overflow-hidden ${
                    isActive
                      ? "bg-white/95 border-[#573681]/40 shadow-xl shadow-[#573681]/10 ring-1 ring-[#573681]/20"
                      : "bg-white/80 hover:bg-white/95 border-[#1A0042]/10 hover:border-[#573681]/30 shadow-xs hover:shadow-md"
                  }`}
                >
                  {/* Subtle top indicator bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 transition-colors duration-500 ${
                    isActive ? "bg-gradient-to-r from-[#573681] to-[#7C3AED]" : "bg-transparent"
                  }`} />

                  {/* Watermark Number */}
                  <div className="absolute top-4 right-6 sm:top-6 sm:right-8 font-display font-black text-5xl sm:text-6xl text-[#1A0042]/5 select-none pointer-events-none">
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

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0042]/5 font-mono text-[10.5px] sm:text-[11px] font-bold text-[#1A0042]/75">
                      <Clock className="w-3.5 h-3.5 text-[#573681]" />
                      <span>{phase.timeframe} &middot; {phase.duration}</span>
                    </div>
                  </div>

                  {/* Icon & Title Row */}
                  <div className="flex items-start gap-4 mb-4 relative z-10">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 transition-colors duration-300 ${
                      isActive 
                        ? "bg-[#573681] text-white border-[#573681] shadow-md shadow-[#573681]/25" 
                        : "bg-[#573681]/10 text-[#573681] border-[#573681]/20"
                    }`}>
                      <Icon className="w-6 h-6" />
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {phase.deliverables.map((item, dIdx) => (
                        <div 
                          key={dIdx}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-[#FAFAFD] border border-[#1A0042]/5 text-xs text-[#1A0042]/85 font-medium leading-snug"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why It Matters Callout Box */}
                  <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-[#E7E6FB]/50 border border-[#573681]/20 space-y-1 relative z-10">
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
          {/* 2. RIGHT COLUMN: STICKY / FIXED HEADLINES & QUICK NAVIGATION      */}
          {/* ================================================================= */}
          <div className="order-1 lg:order-2 w-full lg:col-span-5 lg:sticky lg:top-24 xl:top-28 lg:self-start flex flex-col pt-0 sm:pt-4 z-20">
            
            {/* Tag / Eyebrow */}
            <div className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#573681] mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#573681] animate-pulse" />
              <span>THE ENGAGEMENT MODEL</span>
            </div>

            {/* Main Display Headline */}
            <h2
              ref={headingRef}
              className="font-display font-black text-3xl sm:text-4xl xl:text-5xl tracking-tight leading-[1.08] uppercase text-[#1A0042]"
            >
              From "Just Hired" <br />
              <span className="text-[#573681]">To Running Optimally.</span>
            </h2>

            {/* Subtitle / Philosophy */}
            <p className="font-sans text-sm sm:text-base text-[#1A0042]/75 leading-relaxed mt-4 sm:mt-5 mb-6 lg:mb-8 max-w-lg">
              No 6-month lock-ins. No 40-page onboarding decks. A structured 4-phase roadmap that gets your account stabilized and scaling in under 45 days.
            </p>

            {/* Desktop Interactive Phase Navigation Track (Inspired by CipherDigital & Cheese & Pixels) */}
            <div className="hidden lg:flex flex-col gap-2 p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#1A0042]/10 shadow-xs mb-6">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1A0042]/45 px-3 pt-1 pb-0.5">
                ENGAGEMENT PHASES &middot; CLICK TO INSPECT
              </div>
              {PHASES.map((phase, idx) => {
                const isActive = activePhase === idx;

                return (
                  <button
                    key={`nav-${phase.number}`}
                    onClick={() => scrollToPhase(idx)}
                    className={`group w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-300 text-left cursor-pointer ${
                      isActive
                        ? "bg-[#1A0042] text-white shadow-md scale-[1.01]"
                        : "hover:bg-[#E7E6FB]/50 text-[#1A0042]/70 hover:text-[#1A0042]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[11px] font-black transition-colors ${
                        isActive 
                          ? "bg-[#573681] text-white" 
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
                          isActive ? "text-white/60" : "text-[#1A0042]/40"
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

            {/* Action CTA Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#1A0042] to-[#311956] text-white shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  DIAGNOSTIC FIRST SLA
                </span>
                <span className="font-mono text-[10px] text-white/50">45-DAY RAMP</span>
              </div>
              <p className="font-sans text-xs text-white/85 leading-relaxed">
                Ready to stabilize account architecture and build creative briefs sourced from your actual data?
              </p>
              <button
                onClick={onOpenDemoModal}
                className="w-full mt-1 px-5 py-3 rounded-xl bg-white hover:bg-white/95 text-[#1A0042] font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Book Phase 1 Kickoff</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="text-center font-mono text-[9.5px] text-white/50">
                ● 30-min audit precedes Phase 1 &middot; No long-term lock-in
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
