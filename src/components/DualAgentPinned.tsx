import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, ArrowRight } from "lucide-react";
import heroBgImage from "../assets/herobg.jpeg";

gsap.registerPlugin(ScrollTrigger);

interface DualAgentPinnedProps {
  onOpenDemoModal?: () => void;
}

export function DualAgentPinned({ onOpenDemoModal }: DualAgentPinnedProps) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // 2 Pure Service Panels refs
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const rightBadgeRef = useRef<HTMLDivElement>(null);

  const scrollToScreen = (screenIndex: 1 | 2) => {
    const st = ScrollTrigger.getById("services-pinned");
    if (!st) return;
    const targetProgress = screenIndex === 1 ? 0.05 : 0.90;
    const targetY = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  useEffect(() => {
    const runway = runwayRef.current;
    const panel1 = panel1Ref.current;
    const panel2 = panel2Ref.current;
    if (!runway || !panel1 || !panel2) return;

    const ctx = gsap.context(() => {
      // Pinned scrub timeline tracking 2 pure offerings
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "services-pinned",
          trigger: runway,
          pin: true,
          start: "top top",
          end: "+=160%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Initial states
      gsap.set(panel1, { opacity: 1, y: 0, pointerEvents: "auto" });
      gsap.set(panel2, { opacity: 0, y: 30, pointerEvents: "none" });

      // Screen 1 hold
      tl.to({}, { duration: 0.35 });

      // Screen 1 transitions out
      tl.to(
        panel1,
        {
          opacity: 0,
          y: -25,
          pointerEvents: "none",
          duration: 0.35,
          ease: "power2.inOut",
        },
        0.35
      );

      // Screen 2 transitions in
      tl.fromTo(
        panel2,
        { opacity: 0, y: 30, pointerEvents: "none" },
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.35,
          ease: "power2.inOut",
        },
        0.50
      );

      // Settle and hold Screen 2 through rest of runway
      tl.to({}, { duration: 0.45 }, 0.85);
    }, runway);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={runwayRef} className="relative w-full bg-[#FAFAFD] text-[#1A0042]">
      <div
        ref={viewportRef}
        className="h-[100dvh] min-h-[560px] w-full overflow-hidden relative select-none flex items-center justify-center sm:block"
      >
        {/* Ambient Photographic Background (Clean, pure daylight landscape - no dark overlays) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#EAE8FC]">
          <img
            src={heroBgImage}
            alt="SignalMint Pure Landscape Environment"
            className="w-full h-full object-cover object-center select-none opacity-90 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/10 to-transparent pointer-events-none" />
        </div>

        {/* Top Centered Floating Pill: WHAT WE DO */}
        <div className="absolute top-[64px] xs:top-[68px] sm:top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="px-3 py-1 xs:px-3.5 xs:py-1.5 rounded-full bg-white/90 sm:bg-white/80 backdrop-blur-md border border-[#1A0042]/15 text-[#1A0042] text-[9.5px] xs:text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-xs">
            <Layers className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-[#573681]" />
            <span>WHAT WE DO</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Left Frosted Glass Card Container                                         */}
        {/* ========================================================================= */}
        <div className="absolute left-3 right-3 sm:left-0 sm:right-auto top-[84px] xs:top-[90px] sm:top-0 h-[375px] xs:h-[395px] sm:h-full max-w-[340px] xs:max-w-[370px] sm:max-w-none mx-auto sm:mx-0 sm:w-[430px] lg:w-[490px] xl:w-[510px] z-20 pointer-events-none flex items-center justify-center sm:block">
          {/* Frosted Backdrop Panel */}
          <div className="absolute inset-0 bg-white/85 sm:bg-white/50 backdrop-blur-xl sm:backdrop-blur-2xl rounded-2xl xs:rounded-3xl sm:rounded-none sm:rounded-r-3xl border border-white/70 sm:border-0 sm:border-r sm:border-white/50 shadow-xl sm:shadow-[8px_0_35px_rgba(87,54,129,0.08)]" />

          {/* ----------------------------------------------------------------------- */}
          {/* SCREEN 01: META AD MANAGEMENT                                           */}
          {/* ----------------------------------------------------------------------- */}
          <div
            ref={panel1Ref}
            className="relative h-full w-full p-3.5 xs:p-4.5 sm:p-8 lg:p-10 flex flex-col justify-between will-change-transform text-[#1A0042] overflow-hidden pointer-events-auto"
          >
            {/* Top to Bottom Content Body with Balanced Distribution */}
            <div className="flex-1 flex flex-col justify-between sm:pt-16 lg:pt-20 sm:pb-4 lg:pb-6">
              {/* 1. Header Block: Badge + Kicker + Title + Description */}
              <div className="space-y-1.5 xs:space-y-2 sm:space-y-3.5 lg:space-y-4">
                <div className="flex items-center">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#573681]/10 text-[#573681] font-mono text-[8.5px] xs:text-[9px] sm:text-[10px] font-bold tracking-wider uppercase border border-[#573681]/20 shadow-2xs">
                    01 // META AD MANAGEMENT
                  </span>
                </div>

                <div className="space-y-0.5 sm:space-y-1.5">
                  <h4 className="font-mono font-bold text-[8.5px] xs:text-[9.5px] sm:text-xs uppercase tracking-[0.16em] text-[#573681] flex items-center gap-1.5">
                    <span>CAMPAIGN ARCHITECTURE</span>
                    <span className="text-[#1A0042]/30">//</span>
                    <span>SCALE DISCIPLINE</span>
                  </h4>
                  <h3 className="font-display font-black text-base xs:text-lg sm:text-3xl lg:text-[2.1rem] uppercase tracking-tight text-[#1A0042] leading-[1.12]">
                    Meta Ad Management
                  </h3>
                </div>

                <p className="font-sans text-[11px] xs:text-xs sm:text-[14px] lg:text-[15px] text-[#1A0042]/80 leading-snug xs:leading-relaxed max-w-[440px]">
                  Full-funnel campaign architectures built to compound. Every ad set is engineered with clear attribution windows, so you scale spend without algorithm bid inflation.
                </p>
              </div>

              {/* 2. Deliverables Block: 3 Distinct Rows with Generous Breathing Room */}
              <div className="space-y-2 xs:space-y-2.5 sm:space-y-4 lg:space-y-5 py-1.5 xs:py-2.5 sm:py-5 lg:py-6">
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <span className="w-2 h-2 rounded-full bg-[#573681] shrink-0 mt-1" />
                  <div className="font-sans text-[10px] xs:text-[11px] sm:text-[13.5px] lg:text-[14.5px] leading-snug">
                    <strong className="text-[#1A0042] font-bold">Attribution Modeling:</strong>{" "}
                    <span className="text-[#1A0042]/80">30+ day delayed conversion windows</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <span className="w-2 h-2 rounded-full bg-[#573681] shrink-0 mt-1" />
                  <div className="font-sans text-[10px] xs:text-[11px] sm:text-[13.5px] lg:text-[14.5px] leading-snug">
                    <strong className="text-[#1A0042] font-bold">Account Architecture:</strong>{" "}
                    <span className="text-[#1A0042]/80">Unit economics &amp; ASC+ segment targets</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <span className="w-2 h-2 rounded-full bg-[#573681] shrink-0 mt-1" />
                  <div className="font-sans text-[10px] xs:text-[11px] sm:text-[13.5px] lg:text-[14.5px] leading-snug">
                    <strong className="text-[#1A0042] font-bold">Pacing Discipline:</strong>{" "}
                    <span className="text-[#1A0042]/80">Daily bid retuning &amp; budget bleed protection</span>
                  </div>
                </div>
              </div>

              {/* 3. Action Block: Stat Card + CTA Row with Substantial Height */}
              <div className="flex items-stretch gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
                <div className="px-3 py-1.5 sm:px-4 sm:py-3 rounded-2xl bg-white/95 border border-[#1A0042]/12 shadow-xs shrink-0 flex flex-col justify-center">
                  <div className="font-mono text-[7.5px] xs:text-[8px] sm:text-[9px] text-[#1A0042]/60 uppercase font-semibold tracking-wider">VERIFIED LIFT</div>
                  <div className="font-display font-extrabold text-xs xs:text-sm sm:text-lg lg:text-xl text-[#573681] leading-none mt-1">2.1x Avg ROAS</div>
                </div>

                <button
                  type="button"
                  onClick={onOpenDemoModal}
                  className="flex-1 inline-flex items-center justify-center gap-2 min-h-[40px] px-3.5 py-2 sm:py-3.5 rounded-2xl bg-[#573681] hover:bg-[#1A0042] text-white font-mono text-[9.5px] xs:text-[10.5px] sm:text-xs lg:text-[13px] font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:scale-[1.02] cursor-pointer"
                >
                  <span>Audit My Meta Ads</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bottom Service Switcher Bar */}
            <div className="space-y-1.5 pt-2 sm:pt-4 sm:pb-6 lg:pb-8">
              <div className="hidden sm:block w-[50%] border-b border-dotted border-[#1A0042]/25" />
              <div className="flex items-center justify-between font-mono text-[8.5px] xs:text-[9.5px] sm:text-[10.5px]">
                <div className="flex items-center gap-2 font-bold tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#573681]" />
                  <span className="text-[#573681]">01 META</span>
                  <button
                    type="button"
                    onClick={() => scrollToScreen(2)}
                    className="text-[#1A0042]/45 hover:text-[#573681] transition-colors cursor-pointer"
                  >
                    / 02 WINNING ADS
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToScreen(2)}
                  className="sm:hidden text-[#573681] font-bold underline cursor-pointer"
                >
                  SCROLL TO SWITCH ↓
                </button>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* SCREEN 02: WINNING ADS                                                  */}
          {/* ----------------------------------------------------------------------- */}
          <div
            ref={panel2Ref}
            className="absolute inset-0 p-3.5 xs:p-4.5 sm:p-8 lg:p-10 flex flex-col justify-between opacity-0 will-change-transform text-[#1A0042] overflow-hidden pointer-events-none"
          >
            {/* Top to Bottom Content Body with Balanced Distribution */}
            <div className="flex-1 flex flex-col justify-between sm:pt-16 lg:pt-20 sm:pb-4 lg:pb-6">
              {/* 1. Header Block: Badge + Kicker + Title + Description */}
              <div className="space-y-1.5 xs:space-y-2 sm:space-y-3.5 lg:space-y-4">
                <div className="flex items-center">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#573681]/10 text-[#573681] font-mono text-[8.5px] xs:text-[9px] sm:text-[10px] font-bold tracking-wider uppercase border border-[#573681]/20 shadow-2xs">
                    02 // WINNING ADS
                  </span>
                </div>

                <div className="space-y-0.5 sm:space-y-1.5">
                  <h4 className="font-mono font-bold text-[8.5px] xs:text-[9.5px] sm:text-xs uppercase tracking-[0.16em] text-[#573681] flex items-center gap-1.5">
                    <span>PERFORMANCE CREATIVE</span>
                    <span className="text-[#1A0042]/30">//</span>
                    <span>SCRIPT DNA</span>
                  </h4>
                  <h3 className="font-display font-black text-base xs:text-lg sm:text-3xl lg:text-[2.1rem] uppercase tracking-tight text-[#1A0042] leading-[1.12]">
                    Winning Ads
                  </h3>
                </div>

                <p className="font-sans text-[11px] xs:text-xs sm:text-[14px] lg:text-[15px] text-[#1A0042]/80 leading-snug xs:leading-relaxed max-w-[440px]">
                  Performance-engineered creative briefs built strictly from conversion telemetry. We deconstruct winning hook angles and fatigue curves before creator production begins.
                </p>
              </div>

              {/* 2. Deliverables Block: 3 Distinct Rows with Generous Breathing Room */}
              <div className="space-y-2 xs:space-y-2.5 sm:space-y-4 lg:space-y-5 py-1.5 xs:py-2.5 sm:py-5 lg:py-6">
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <span className="w-2 h-2 rounded-full bg-[#573681] shrink-0 mt-1" />
                  <div className="font-sans text-[10px] xs:text-[11px] sm:text-[13.5px] lg:text-[14.5px] leading-snug">
                    <strong className="text-[#1A0042] font-bold">Hook Engineering:</strong>{" "}
                    <span className="text-[#1A0042]/80">0–3s sensory shock and contrarian hooks</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <span className="w-2 h-2 rounded-full bg-[#573681] shrink-0 mt-1" />
                  <div className="font-sans text-[10px] xs:text-[11px] sm:text-[13.5px] lg:text-[14.5px] leading-snug">
                    <strong className="text-[#1A0042] font-bold">Production Briefs:</strong>{" "}
                    <span className="text-[#1A0042]/80">Shot-by-shot creator scripts ready to film</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 sm:gap-3.5">
                  <span className="w-2 h-2 rounded-full bg-[#573681] shrink-0 mt-1" />
                  <div className="font-sans text-[10px] xs:text-[11px] sm:text-[13.5px] lg:text-[14.5px] leading-snug">
                    <strong className="text-[#1A0042] font-bold">Creative Longevity:</strong>{" "}
                    <span className="text-[#1A0042]/80">Fatigue-proof weekly creative rotation cycle</span>
                  </div>
                </div>
              </div>

              {/* 3. Action Block: Stat Card + CTA Row with Substantial Height */}
              <div className="flex items-stretch gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
                <div className="px-3 py-1.5 sm:px-4 sm:py-3 rounded-2xl bg-white/95 border border-[#1A0042]/12 shadow-xs shrink-0 flex flex-col justify-center">
                  <div className="font-mono text-[7.5px] xs:text-[8px] sm:text-[9px] text-[#1A0042]/60 uppercase font-semibold tracking-wider">HOOK VELOCITY</div>
                  <div className="font-display font-extrabold text-xs xs:text-sm sm:text-lg lg:text-xl text-[#573681] leading-none mt-1">+44% Hook Lift</div>
                </div>

                <button
                  type="button"
                  onClick={onOpenDemoModal}
                  className="flex-1 inline-flex items-center justify-center gap-2 min-h-[40px] px-3.5 py-2 sm:py-3.5 rounded-2xl bg-[#573681] hover:bg-[#1A0042] text-white font-mono text-[9.5px] xs:text-[10.5px] sm:text-xs lg:text-[13px] font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:scale-[1.02] cursor-pointer"
                >
                  <span>Order Winning Briefs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bottom Service Switcher Bar */}
            <div className="space-y-1.5 pt-2 sm:pt-4 sm:pb-6 lg:pb-8">
              <div className="hidden sm:block w-[50%] border-b border-dotted border-[#1A0042]/25" />
              <div className="flex items-center justify-between font-mono text-[8.5px] xs:text-[9.5px] sm:text-[10.5px]">
                <div className="flex items-center gap-2 font-bold tracking-wider">
                  <button
                    type="button"
                    onClick={() => scrollToScreen(1)}
                    className="text-[#1A0042]/45 hover:text-[#573681] transition-colors cursor-pointer"
                  >
                    01 META /
                  </button>
                  <span className="w-2 h-2 rounded-full bg-[#573681]" />
                  <span className="text-[#573681]">02 WINNING ADS</span>
                </div>
                <span className="hidden sm:inline text-[#573681] font-bold">2 OF 2 ✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Bottom Philosophy Copy (Right-bottom on desktop, centered bottom on mobile) */}
        {/* ========================================================================= */}
        <div
          ref={rightBadgeRef}
          className="absolute bottom-2 xs:bottom-3 sm:bottom-10 lg:bottom-12 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-10 lg:right-14 z-20 pointer-events-none text-center sm:text-right flex flex-col items-center sm:items-end gap-1 sm:gap-2.5 w-full sm:w-auto max-w-[340px] xs:max-w-md lg:max-w-lg px-3 sm:px-0"
        >
          <div className="space-y-0.5 sm:space-y-1.5">
            <div className="font-mono font-bold text-[8px] xs:text-[9px] sm:text-[11px] tracking-[0.16em] uppercase text-[#573681]">
              DUAL PERFORMANCE ENGINE
            </div>

            <h2 className="font-display font-black text-xl xs:text-2xl sm:text-2xl lg:text-[1.85rem] text-[#1A0042] uppercase tracking-tight leading-tight sm:leading-[1.08]">
              MEDIA BUYING &amp; CREATIVE. <span className="hidden sm:inline"><br /></span>
              <span className="text-[#573681]">UNITED UNDER ONE ROOF.</span>
            </h2>

            <p className="font-sans text-xs xs:text-sm sm:text-[15px] text-[#1A0042]/80 font-normal leading-snug sm:leading-relaxed pt-0.5 max-w-[310px] xs:max-w-sm sm:max-w-none mx-auto sm:mx-0">
              Media buying without performance creative is dead spend. Creative without attribution is pure guesswork. We combine both under one roof.
            </p>
          </div>

          <div className="hidden xs:flex items-center gap-2 sm:gap-2.5 pt-1 sm:pt-2.5 border-t border-[#1A0042]/15 font-mono text-[8px] sm:text-[10.5px] text-[#1A0042]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#573681] animate-pulse" />
            <span className="tracking-wider uppercase font-semibold">2 CORE ENGINES · 1 UNIFIED PLAYBOOK</span>
          </div>
        </div>
      </div>
    </section>
  );
}

