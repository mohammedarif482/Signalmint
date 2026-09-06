import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface FinalCTASectionProps {
  onOpenDemoModal?: () => void;
}

export function FinalCTASection({ onOpenDemoModal }: FinalCTASectionProps) {
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
      id="contact" 
      ref={sectionRef} 
      className="relative w-full py-24 sm:py-32 lg:py-44 bg-[#1A0042] text-white overflow-hidden select-none"
    >
      {/* Ambient background glow and grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FAFAFD_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1516A8]/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10 space-y-8 sm:space-y-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#6495EB] border border-white/15 font-mono text-xs font-bold uppercase tracking-widest shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>06 // READY TO AUDIT YOUR SPEND?</span>
        </div>

        <h2
          ref={headingRef}
          className="font-display font-black text-3xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-[1.04]"
        >
          Bring us the account. <br />
          <span className="text-emerald-400">We'll bring the signal.</span>
        </h2>

        <p className="font-sans text-base sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-normal">
          A 30-minute call. We'll look at your account together and tell you exactly what we'd fix first, whether or not you hire us.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenDemoModal}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-[#1516A8] hover:bg-emerald-500 hover:text-black text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-2xl hover:scale-105 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>Book a 30-Min Audit</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Friction Removers / Status Lines */}
        <div className="pt-6 border-t border-white/10 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-mono text-xs text-white/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Working with 40+ brands across DTC</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Typically start in 2–3 weeks</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>No long-term contract for first 60 days</span>
          </div>
        </div>
      </div>
    </section>
  );
}
