import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Radar, ShieldAlert, ArrowUp } from "lucide-react";
import heroBgImage from "../assets/herobg.jpeg";
import heroBg1Image from "../assets/herobg1.jpeg";
import heroDiskImage from "../assets/hero.png";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function DualAgentPinned() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scoutPanelRef = useRef<HTMLDivElement>(null);
  const atlasPanelRef = useRef<HTMLDivElement>(null);
  const scoutHeadingRef = useRef<HTMLHeadingElement>(null);
  const atlasHeadingRef = useRef<HTMLHeadingElement>(null);
  const rightHeadlineRef = useRef<HTMLDivElement>(null);
  const bgScoutRef = useRef<HTMLDivElement>(null);
  const bgAtlasRef = useRef<HTMLDivElement>(null);
  const diskRef = useRef<HTMLDivElement>(null);
  const rightBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway) return;

    const ctx = gsap.context(() => {
      // Pinned scrub timeline with deliberate holding intervals (Scout Hold -> Morph -> Atlas Hold)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: runway,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Total timeline duration = 3.0
      // -------------------------------------------------------------
      // 0.00 to 0.85: HOLD 1 (Scout Active & completely readable)
      // 0.85 to 1.85: TRANSITION (Scout glides away, Atlas arrives, 3D core tilts)
      // 1.85 to 2.80: HOLD 2 (Atlas Active & completely readable)
      // 2.80 to 3.00: Smooth unpin handoff into Section 3
      // -------------------------------------------------------------

      // 1. Scout Panel: Holds until 0.85, then glides up and dissolves
      tl.to(
        scoutPanelRef.current,
        {
          opacity: 0,
          y: -30,
          ease: "power2.inOut",
          duration: 0.65,
        },
        0.85
      );

      // 2. Background: Cross-fades from Scout Ambient to Atlas Infrared
      tl.to(
        bgAtlasRef.current,
        {
          opacity: 1,
          ease: "power1.inOut",
          duration: 0.75,
        },
        0.95
      );

      // 3. Central 3D Disk: Tilts from Scout observation into active Atlas defense mode
      if (diskRef.current) {
        tl.to(
          diskRef.current,
          {
            rotationY: 28,
            rotationX: -14,
            scale: 1.08,
            y: -20,
            ease: "power2.inOut",
            duration: 0.9,
          },
          0.90
        );
      }

      // 4. Atlas Panel: Glides up into view and locks in by 1.85
      tl.fromTo(
        atlasPanelRef.current,
        {
          opacity: 0,
          y: 32,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.inOut",
          duration: 0.7,
        },
        1.15
      );

      // 5. Hold Atlas active through 2.80 - 3.00 before releasing
      tl.to({}, { duration: 1.15 }, 1.85);

      // Responsive Line Splits on Scroll (GSAP SplitText autoSplit + onSplit)
      if (scoutHeadingRef.current) {
        new SplitText(scoutHeadingRef.current, {
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
                trigger: runway,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            });
          },
        });
      }

      if (atlasHeadingRef.current) {
        new SplitText(atlasHeadingRef.current, {
          type: "lines",
          autoSplit: true,
          mask: "lines",
          onSplit: (instance) => {
            return gsap.from(instance.lines, {
              yPercent: 110,
              opacity: 0,
              duration: 0.75,
              stagger: 0.07,
              ease: "power3.out",
              scrollTrigger: {
                trigger: runway,
                start: "top top",
                toggleActions: "play none none reverse",
              },
            });
          },
        });
      }

      if (rightHeadlineRef.current) {
        new SplitText(rightHeadlineRef.current, {
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
    <section id="agents" ref={runwayRef} className="relative w-full bg-[#FAFAFD]">
      <div
        ref={viewportRef}
        className="h-screen w-full overflow-hidden relative select-none flex items-center"
      >
        <div
          ref={bgScoutRef}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#E7E6FB]"
        >
          <img
            src={heroBgImage}
            alt="SignalMint Scout Intelligence Environment"
            className="w-full h-full object-cover object-center select-none opacity-90 scale-105"
          />
          <div className="absolute inset-0 bg-[#1A0042]/5 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent pointer-events-none" />
        </div>

        <div
          ref={bgAtlasRef}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#1A0042] opacity-0 will-change-opacity"
        >
          <img
            src={heroBg1Image}
            alt="SignalMint Atlas Budget Guardian Environment"
            className="w-full h-full object-cover object-center select-none mix-blend-screen opacity-70 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1A0042]/90 via-[#4D0181]/40 to-[#1516A8]/50 mix-blend-color-burn pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A0042]/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Top Centered Floating Pill: ↑ 02 // THE DIFFERENCE */}
        <div className="absolute top-18 sm:top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="px-3.5 py-1.5 rounded-full bg-white/40 sm:bg-[#1A0042]/10 backdrop-blur-md border border-[#1A0042]/15 text-[#1A0042] text-[10px] sm:text-xs font-sans font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-2xs">
            <ArrowUp className="w-3 h-3 text-[#1516A8]" />
            <span>02 // THE DIFFERENCE</span>
          </div>
        </div>

        {/* Central 3D Visual */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div
            ref={diskRef}
            className="w-52 sm:w-80 lg:w-[26rem] aspect-square flex items-center justify-center relative [perspective:1000px] will-change-transform -translate-y-16 sm:translate-y-0"
          >
            <div className="absolute inset-0 bg-[#1516A8]/15 rounded-full blur-3xl" />
            <img
              src={heroDiskImage}
              alt="SignalMint Diagnostic Core"
              className="w-full h-full object-contain drop-shadow-[0_24px_48px_rgba(26,0,66,0.18)]"
            />
          </div>
        </div>

        {/* Dynamic Card Container: Bottom Card on Mobile, Left Pinned Column on Desktop */}
        <div className="absolute left-3 right-3 bottom-6 sm:bottom-0 sm:left-0 sm:top-0 sm:right-auto sm:w-[380px] lg:w-[460px] sm:h-full z-20 pointer-events-none">
          {/* Frosted Backdrop */}
          <div className="absolute inset-0 bg-[#121216]/95 sm:bg-white/50 backdrop-blur-xl rounded-2xl sm:rounded-none border border-white/10 sm:border-0 sm:border-r sm:border-white/40 shadow-2xl sm:shadow-[4px_0_24px_rgba(26,0,66,0.03)]" />

          {/* PANEL 1: HOW MOST AGENCIES OPERATE (THE WRONG WAY) */}
          <div
            ref={scoutPanelRef}
            className="relative h-full w-full p-5 sm:p-10 lg:p-12 flex flex-col justify-between will-change-transform text-white sm:text-[#1A0042]"
          >
            <div className="space-y-2 sm:space-y-5 sm:pt-20">
              <div className="flex items-center justify-between sm:block">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-red-500/15 sm:bg-rose-500/10 border border-red-500/25 sm:border-rose-500/20 flex items-center justify-center text-rose-400 sm:text-rose-600 shadow-2xs">
                  <Radar className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </div>

                {/* Mobile Pagination Dots */}
                <div className="flex sm:hidden items-center gap-1.5">
                  <span className="w-2.5 h-1 rounded-full bg-white transition-all" />
                  <span className="w-1.5 h-1 rounded-full bg-white/30" />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <h4 className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.12em] text-rose-400 sm:text-rose-700 flex items-center gap-1.5">
                  <span>THE WRONG WAY</span>
                  <span className="text-white/40 sm:text-[#1A0042]/30">//</span>
                  <span>OPINION-FIRST</span>
                </h4>
                <div
                  ref={scoutHeadingRef}
                  className="font-display font-extrabold text-base sm:text-2xl lg:text-[1.7rem] uppercase tracking-tight text-white sm:text-[#1A0042] leading-[1.15]"
                >
                  "Form opinion → Defend it with data"
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-1.5 sm:space-y-2 pt-1 font-sans text-[11px] sm:text-xs text-white/85 sm:text-[#1A0042]/85 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Strategy starts with "best practices"</strong> — one-size-fits-all playbook recycled across brands.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Brief sent to production on hunches</strong> — wasting weeks confirming what data could have ruled out.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Health checked monthly</strong> — budget burned before ad fatigue is even discovered.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span><strong>Recommendations arrive in monthly reports</strong> — weeks too late to stop the spend bleed.</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-3 sm:pb-10">
              <div className="hidden sm:block w-[45%] border-b border-dotted border-[#1A0042]/35" />
              <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] font-bold text-white/60 sm:text-[#1A0042]/60 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>SCROLL DOWN TO REVEAL AUDIT-FIRST →</span>
              </div>
            </div>
          </div>

          {/* PANEL 2: HOW SIGNALMINT OPERATES (OUR WAY) */}
          <div
            ref={atlasPanelRef}
            className="absolute inset-0 p-5 sm:p-10 lg:p-12 flex flex-col justify-between opacity-0 will-change-transform pointer-events-none text-white sm:text-[#1A0042]"
          >
            <div className="space-y-2 sm:space-y-5 sm:pt-20">
              <div className="flex items-center justify-between sm:block">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-emerald-500/20 sm:bg-emerald-500/15 border border-emerald-400/30 sm:border-emerald-500/25 flex items-center justify-center text-emerald-300 sm:text-emerald-700 shadow-2xs">
                  <ShieldAlert className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </div>

                {/* Mobile Pagination Dots */}
                <div className="flex sm:hidden items-center gap-1.5">
                  <span className="w-1.5 h-1 rounded-full bg-white/30" />
                  <span className="w-2.5 h-1 rounded-full bg-emerald-400 transition-all" />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <h4 className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.12em] text-emerald-400 sm:text-emerald-700 flex items-center gap-1.5">
                  <span>OUR WAY</span>
                  <span className="text-white/40 sm:text-[#1A0042]/30">//</span>
                  <span>AUDIT-FIRST</span>
                </h4>
                <div
                  ref={atlasHeadingRef}
                  className="font-display font-extrabold text-base sm:text-2xl lg:text-[1.7rem] uppercase tracking-tight text-white sm:text-[#1A0042] leading-[1.15]"
                >
                  "Audit the data → Form opinion → Defend it"
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-1.5 sm:space-y-2 pt-1 font-sans text-[11px] sm:text-xs text-white/90 sm:text-[#1A0042]/90 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span><strong>Audit YOUR account architecture first</strong> — every brand has unique attribution windows &amp; margins.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span><strong>Identify creative fatigue signals early</strong> — hook saturation mapped before production begins.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span><strong>Daily performance checks</strong> — in-house telemetry monitors CPA deviations same-day.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span><strong>Recommendations arrive before the bleed</strong> — live human interventions protect your spend.</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-3 sm:pb-10">
              <div className="hidden sm:block w-[45%] border-b border-dotted border-[#1A0042]/35" />
              <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] font-bold text-emerald-400 sm:text-emerald-700 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>SIGNALMINT AUDIT STANDARD // VERIFIED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Bottom Badge (Desktop Only) */}
        <div
          ref={rightBadgeRef}
          className="hidden sm:flex absolute bottom-6 sm:bottom-10 lg:bottom-12 right-6 sm:right-10 lg:right-14 z-20 pointer-events-none text-right flex-col items-end gap-3"
        >
          <div className="max-w-sm sm:max-w-md">
            <div className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[#1A0042]/70 mb-1">
              THE METHODOLOGY MOAT (AUDIT-FIRST)
            </div>

            <div
              ref={rightHeadlineRef}
              className="font-display font-black text-sm sm:text-base lg:text-lg text-[#1A0042] uppercase tracking-tight leading-tight"
            >
              MOST AGENCIES GUESS. WE RUN THE DIAGNOSTIC FIRST.
            </div>

            <div className="font-sans text-xs sm:text-[13px] text-[#1A0042]/75 font-medium mt-1">
              Every strategic recommendation is anchored in your account’s unit economics, not agency hubris.
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-[#1A0042]/15 font-mono text-[11px] text-[#1A0042]/65">
            <span className="tracking-widest uppercase text-[10px]">DIAGNOSTIC CADENCE:</span>
            <span className="font-sans font-serif italic font-bold text-sm text-[#1516A8]">
              Daily Checks &middot; Weekly Re-tunes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
