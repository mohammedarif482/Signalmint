import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import heroBgImage from "../assets/herobg.jpeg";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface FinalCTASectionProps {
  onOpenDemoModal?: () => void;
}

export function FinalCTASection({ onOpenDemoModal }: FinalCTASectionProps) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bgInnerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway) return;

    const ctx = gsap.context(() => {
      // Pinned scrub timeline with calibrated holding buffer (like Section 02)
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: runway,
          start: "top top",
          end: "+=130%",
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // 1. Parallax scrub on the background image
      if (bgInnerRef.current) {
        scrubTl.fromTo(
          bgInnerRef.current,
          { scale: 1.05, yPercent: 0 },
          { scale: 1.18, yPercent: -6, ease: "none", duration: 2.0 },
          0
        );
      }

      // 2. Subtle elevation & glow on the CTA container during scrub
      if (contentRef.current) {
        scrubTl.fromTo(
          contentRef.current,
          { y: 20, opacity: 0.92 },
          { y: 0, opacity: 1, ease: "power2.out", duration: 0.5 },
          0
        );

        // Hold stable and centered from 0.5 to 1.7
        scrubTl.to({}, { duration: 1.2 }, 0.5);

        // Smooth handoff fade as user scrolls towards the unpin
        scrubTl.to(
          contentRef.current,
          { opacity: 0.85, y: -15, ease: "power2.inOut", duration: 0.3 },
          1.7
        );
      }

      // Responsive Line Splits on Load/Scroll (SplitText autoSplit)
      if (headingRef.current) {
        new SplitText(headingRef.current, {
          type: "lines",
          autoSplit: true,
          mask: "lines",
          onSplit: (instance) => {
            return gsap.from(instance.lines, {
              yPercent: 110,
              opacity: 0,
              duration: 0.9,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: runway,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            });
          },
        });
      }
    }, runway);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={runwayRef} 
      className="relative w-full bg-[#E7E6FB] text-[#1A0042] select-none"
    >
      {/* PINNED INNER VIEWPORT (100vh pinned sticky scroll like Section 02) */}
      <div
        ref={viewportRef}
        className="h-screen w-full overflow-hidden relative flex items-center justify-center p-4 sm:p-8"
      >
        {/* ========================================================================= */}
        {/* BACKGROUND IMAGE LAYER: herobg.jpeg with white overlay (lesser opacity)   */}
        {/* ========================================================================= */}
        <div
          ref={bgRef}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#E7E6FB]"
        >
          <div ref={bgInnerRef} className="w-full h-full will-change-transform scale-105">
            <img
              src={heroBgImage}
              alt="SignalMint Closing Telemetry Environment"
              className="w-full h-full object-cover object-center select-none opacity-90"
            />
            {/* White overlay with lesser opacity (NO blue overlay) */}
            <div className="absolute inset-0 bg-white/20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-white/40 pointer-events-none" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FOREGROUND HERO CONTENT (Liquid Frosted Glass Container)                  */}
        {/* ========================================================================= */}
        <div 
          ref={contentRef}
          className="max-w-4xl mx-auto px-6 sm:px-12 py-10 sm:py-14 rounded-3xl bg-white/[0.30] hover:bg-white/[0.40] backdrop-blur-md border border-white/50 text-center relative z-10 space-y-6 sm:space-y-8 will-change-transform text-[#1A0042] shadow-[0_8px_32px_rgba(26,0,66,0.06)] transition-colors duration-300"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 text-[#573681] border border-[#1A0042]/15 font-mono text-xs font-bold uppercase tracking-widest shadow-2xs backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#573681]" />
            <span>READY TO AUDIT YOUR SPEND?</span>
          </div>

          {/* Master Headline */}
          <h2
            ref={headingRef}
            className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-[1.06] text-[#1A0042]"
          >
            Bring us the account. <br />
            <span className="text-[#573681]">We'll bring the signal.</span>
          </h2>

          {/* Narrative Subhead */}
          <p className="font-sans text-sm sm:text-base lg:text-lg text-[#1A0042]/80 max-w-2xl mx-auto leading-relaxed font-normal">
            A 30-minute call. We'll look at your account together and tell you exactly what we'd fix first, whether or not you hire us.
          </p>

          {/* CTA Action */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              ref={ctaBtnRef}
              onClick={onOpenDemoModal}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl bg-[#573681] hover:bg-[#1A0042] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>Book a 30-Min Audit</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Friction Removers / Status Lines */}
          <div 
            ref={statusRef}
            className="pt-6 border-t border-[#1A0042]/15 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-mono text-[11px] sm:text-xs text-[#1A0042]/75"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#573681]" />
              <span>Working with 40+ brands across DTC</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#573681]" />
              <span>Typically start in 2–3 weeks</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#573681]" />
              <span>No long-term contract for first 60 days</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
