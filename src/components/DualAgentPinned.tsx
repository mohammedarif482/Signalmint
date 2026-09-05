import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Radar, ShieldAlert, ArrowUp } from "lucide-react";
import heroBgImage from "../assets/herobg.jpeg";
import heroBg1Image from "../assets/herobg1.jpeg";
import heroDiskImage from "../assets/hero.png";

gsap.registerPlugin(ScrollTrigger);

export function DualAgentPinned() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scoutPanelRef = useRef<HTMLDivElement>(null);
  const atlasPanelRef = useRef<HTMLDivElement>(null);
  const bgScoutRef = useRef<HTMLDivElement>(null);
  const bgAtlasRef = useRef<HTMLDivElement>(null);
  const diskRef = useRef<HTMLDivElement>(null);
  const rightBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway) return;

    const ctx = gsap.context(() => {
      // Pin viewportRef for smooth scroll scrub through both agent states (0 to 100%)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: runway,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // 1. Cross-fade Background from Scout Ambient to Atlas Infrared
      tl.to(
        bgAtlasRef.current,
        {
          opacity: 1,
          ease: "power1.inOut",
          duration: 0.5,
        },
        0.3
      );

      // 2. Scout panel glides up and dissolves
      tl.to(
        scoutPanelRef.current,
        {
          opacity: 0,
          y: -32,
          ease: "power1.inOut",
          duration: 0.35,
        },
        0.2
      );

      // 3. Atlas panel glides up from bottom into view
      tl.fromTo(
        atlasPanelRef.current,
        {
          opacity: 0,
          y: 32,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power1.inOut",
          duration: 0.45,
        },
        0.4
      );

      // 4. Central 3D visual tilts and transforms into active defense mode
      if (diskRef.current) {
        tl.to(
          diskRef.current,
          {
            rotationY: 28,
            rotationX: -14,
            scale: 1.08,
            y: -20,
            ease: "power1.inOut",
            duration: 0.8,
          },
          0.1
        );
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

        {/* Top Centered Floating Pill: ↑ 02 // THE TWINS (matching Oryzo mobile reference Image 1) */}
        <div className="absolute top-18 sm:top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="px-3.5 py-1.5 rounded-full bg-white/40 sm:bg-[#1A0042]/10 backdrop-blur-md border border-[#1A0042]/15 text-[#1A0042] text-[10px] sm:text-xs font-sans font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-2xs">
            <ArrowUp className="w-3 h-3 text-[#1516A8]" />
            <span>02 // THE TWINS</span>
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
              alt="SignalMint Telemetry Core"
              className="w-full h-full object-contain drop-shadow-[0_24px_48px_rgba(26,0,66,0.18)]"
            />
          </div>
        </div>

        {/* Dynamic Card Container: Bottom Card on Mobile (Image 1 reference), Left Pinned Column on Desktop */}
        <div className="absolute left-3 right-3 bottom-6 sm:bottom-0 sm:left-0 sm:top-0 sm:right-auto sm:w-[380px] lg:w-[440px] sm:h-full z-20 pointer-events-none">
          {/* Frosted Backdrop: Dark glass on mobile (exact Oryzo reference), light glass on desktop */}
          <div className="absolute inset-0 bg-[#121216]/92 sm:bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-none border border-white/10 sm:border-0 sm:border-r sm:border-white/40 shadow-2xl sm:shadow-[4px_0_24px_rgba(26,0,66,0.03)]" />

          {/* SCOUT STATE */}
          <div
            ref={scoutPanelRef}
            className="relative h-full w-full p-5 sm:p-10 lg:p-14 flex flex-col justify-between will-change-transform text-white sm:text-[#1A0042]"
          >
            <div className="space-y-2.5 sm:space-y-6 sm:pt-20">
              <div className="flex items-center justify-between sm:block">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/10 sm:bg-[#1A0042]/8 border border-white/15 sm:border-[#1A0042]/12 flex items-center justify-center text-[#93c5fd] sm:text-[#1516A8] shadow-2xs">
                  <Radar className="w-4.5 h-4.5 sm:w-6 sm:h-6 animate-spin-slow" />
                </div>

                {/* Mobile Pagination Dots matching Image 1 */}
                <div className="flex sm:hidden items-center gap-1.5">
                  <span className="w-2.5 h-1 rounded-full bg-white transition-all" />
                  <span className="w-1.5 h-1 rounded-full bg-white/30" />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2.5 max-w-[320px]">
                <h4 className="font-sans font-bold text-[10.5px] sm:text-[13px] uppercase tracking-[0.12em] text-white/80 sm:text-[#1A0042]">
                  01 // THE COMPETITIVE ARCHAEOLOGIST
                </h4>
                <p className="font-sans text-xs sm:text-[13px] text-white/80 sm:text-[#1A0042]/80 leading-[1.45]">
                  Detects Crown Winners before they’re obvious. Traces 0–3s hook cadence, visual momentum, and script DNA in real time.
                </p>
              </div>
            </div>

            <div className="space-y-2.5 sm:space-y-6 pt-3 sm:pb-12">
              <div className="hidden sm:block w-[45%] border-b border-dotted border-[#1A0042]/35" />

              <h3 className="font-sans font-extrabold text-lg sm:text-3xl lg:text-[2rem] uppercase tracking-tight text-white sm:text-[#1A0042] leading-[1.1] max-w-[300px]">
                REVERSE-ENGINEER COMPETITORS
              </h3>

              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1516A8]"></span>
                <span className="font-mono text-[9.5px] sm:text-[10px] font-bold text-white/60 sm:text-[#1A0042]/60 uppercase tracking-widest">
                  SCOUT ACTIVE // STREAM 1
                </span>
              </div>
            </div>
          </div>

          {/* ATLAS STATE */}
          <div
            ref={atlasPanelRef}
            className="absolute inset-0 p-5 sm:p-10 lg:p-14 flex flex-col justify-between opacity-0 will-change-transform pointer-events-none text-white sm:text-[#1A0042]"
          >
            <div className="space-y-2.5 sm:space-y-6 sm:pt-20">
              <div className="flex items-center justify-between sm:block">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-purple-500/20 sm:bg-[#4D0181]/15 border border-purple-400/30 sm:border-[#4D0181]/25 flex items-center justify-center text-purple-300 sm:text-[#4D0181] shadow-2xs">
                  <ShieldAlert className="w-4.5 h-4.5 sm:w-6 sm:h-6" />
                </div>

                {/* Mobile Pagination Dots matching Image 1 */}
                <div className="flex sm:hidden items-center gap-1.5">
                  <span className="w-1.5 h-1 rounded-full bg-white/30" />
                  <span className="w-2.5 h-1 rounded-full bg-white transition-all" />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2.5 max-w-[320px]">
                <h4 className="font-sans font-bold text-[10.5px] sm:text-[13px] uppercase tracking-[0.12em] text-white/80 sm:text-[#1A0042]">
                  02 // THE BUDGET BODYGUARD
                </h4>
                <p className="font-sans text-xs sm:text-[13px] text-white/85 sm:text-[#1A0042]/85 leading-[1.45]">
                  Stops spend bleed before you notice. Runs health checks every 30 mins across live ad sets. Detects CPA spikes +25% and auto-cuts within 12 mins.
                </p>
              </div>
            </div>

            <div className="space-y-2.5 sm:space-y-6 pt-3 sm:pb-12">
              <div className="hidden sm:block w-[45%] border-b border-dotted border-[#1A0042]/35" />

              <h3 className="font-sans font-extrabold text-lg sm:text-3xl lg:text-[2rem] uppercase tracking-tight text-white sm:text-[#1A0042] leading-[1.1] max-w-[300px]">
                AUTONOMOUS BUDGET GUARDIAN
              </h3>

              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4D0181]"></span>
                <span className="font-mono text-[9.5px] sm:text-[10px] font-bold text-white/60 sm:text-[#1A0042]/60 uppercase tracking-widest">
                  ATLAS ACTIVE // INTERVENTION ENGINE
                </span>
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
              THE TWINS (NOT TRAINED ON YOUR DATA)
            </div>

            <div className="font-sans font-black text-sm sm:text-base lg:text-lg text-[#1A0042] uppercase tracking-tight leading-tight">
              ONE FINDS WINNERS. ONE STOPS THE BLEEDING.
            </div>

            <div className="font-sans text-xs sm:text-[13px] text-[#1A0042]/75 font-medium mt-1">
              (Both run 24/7. You never touch them.)
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-[#1A0042]/15 font-mono text-[11px] text-[#1A0042]/65">
            <span className="tracking-widest uppercase text-[10px]">AUTONOMOUS COOLDOWN:</span>
            <span className="font-sans font-serif italic font-bold text-sm text-[#1A0042]">
              &Delta;t &le; 12 min
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
