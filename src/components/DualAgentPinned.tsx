import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Sparkles, Activity, Target, ArrowRight } from "lucide-react";
import heroBgImage from "../assets/herobg.jpeg";
import heroBg1Image from "../assets/herobg1.jpeg";

gsap.registerPlugin(ScrollTrigger);

interface DualAgentPinnedProps {
  onOpenDemoModal?: () => void;
}

export function DualAgentPinned({ onOpenDemoModal }: DualAgentPinnedProps) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // 3 Service Panels refs
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);

  const bgScoutRef = useRef<HTMLDivElement>(null);
  const bgAtlasRef = useRef<HTMLDivElement>(null);
  const rightBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway) return;

    const ctx = gsap.context(() => {
      // Pinned scrub timeline tracking 3 distinct service phases
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: runway,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Total timeline duration = 3.0
      // 0.00 to 0.80: Phase 1 (Meta Ads Hold)
      // 0.80 to 1.15: Transition 1 -> 2
      // 1.15 to 1.95: Phase 2 (Creative Strategy Hold)
      // 1.95 to 2.30: Transition 2 -> 3
      // 2.30 to 3.00: Phase 3 (Audit Diagnostics Hold)

      // Set initial states
      gsap.set(panel1Ref.current, { opacity: 1, y: 0, pointerEvents: "auto" });
      gsap.set(panel2Ref.current, { opacity: 0, y: 30, pointerEvents: "none" });
      gsap.set(panel3Ref.current, { opacity: 0, y: 30, pointerEvents: "none" });

      // 1. Panel 1 fades up and out
      tl.to(
        panel1Ref.current,
        {
          opacity: 0,
          y: -25,
          pointerEvents: "none",
          duration: 0.35,
          ease: "power2.inOut",
        },
        0.80
      );

      // 2. Panel 2 fades up into view
      tl.fromTo(
        panel2Ref.current,
        { opacity: 0, y: 30, pointerEvents: "none" },
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.35,
          ease: "power2.inOut",
        },
        0.95
      );

      // Subtle atmospheric crossfade on background
      tl.to(
        bgAtlasRef.current,
        {
          opacity: 0.5,
          duration: 0.5,
          ease: "power1.inOut",
        },
        0.90
      );

      // 3. Panel 2 fades up and out
      tl.to(
        panel2Ref.current,
        {
          opacity: 0,
          y: -25,
          pointerEvents: "none",
          duration: 0.35,
          ease: "power2.inOut",
        },
        1.95
      );

      // 4. Panel 3 fades up into view
      tl.fromTo(
        panel3Ref.current,
        { opacity: 0, y: 30, pointerEvents: "none" },
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.35,
          ease: "power2.inOut",
        },
        2.10
      );

      // Hold phase 3 through duration
      tl.to({}, { duration: 0.7 }, 2.30);
    }, runway);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={runwayRef} className="relative w-full bg-[#FAFAFD] text-[#1A0042]">
      <div
        ref={viewportRef}
        className="h-screen w-full overflow-hidden relative select-none flex items-center"
      >
        {/* Ambient Photographic Background Layer 1 (Scout Intelligence Rolling Hills) */}
        <div
          ref={bgScoutRef}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#E7E6FB]"
        >
          <img
            src={heroBgImage}
            alt="SignalMint Services Landscape Environment"
            className="w-full h-full object-cover object-center select-none opacity-90 scale-105"
          />
          <div className="absolute inset-0 bg-[#1A0042]/5 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent pointer-events-none" />
        </div>

        {/* Ambient Photographic Background Layer 2 (Cross-fades on scroll) */}
        <div
          ref={bgAtlasRef}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#1A0042] opacity-0 will-change-opacity"
        >
          <img
            src={heroBg1Image}
            alt="SignalMint Diagnostic Depth Environment"
            className="w-full h-full object-cover object-center select-none mix-blend-screen opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1A0042]/60 via-[#573681]/25 to-transparent mix-blend-color-burn pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent pointer-events-none" />
        </div>

        {/* Top Centered Floating Pill: ↑ WHAT WE DO */}
        <div className="absolute top-18 sm:top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="px-3.5 py-1.5 rounded-full bg-white/70 sm:bg-white/80 backdrop-blur-md border border-[#1A0042]/15 text-[#1A0042] text-[10px] sm:text-xs font-sans font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-[#573681]" />
            <span>WHAT WE DO</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Left Frosted Glass Card Container (Hosts the 3 Service Offerings)         */}
        {/* ========================================================================= */}
        <div className="absolute left-3 right-3 bottom-4 top-20 sm:top-0 sm:bottom-0 sm:left-0 sm:right-auto sm:w-[420px] lg:w-[480px] xl:w-[500px] sm:h-full z-20 pointer-events-none flex items-center justify-center sm:block">
          {/* Frosted Backdrop Panel */}
          <div className="absolute inset-0 bg-white/85 sm:bg-white/70 backdrop-blur-2xl rounded-2xl sm:rounded-r-3xl border border-white/60 sm:border-0 sm:border-r sm:border-white/60 shadow-2xl sm:shadow-[6px_0_35px_rgba(26,0,66,0.06)]" />

          {/* ----------------------------------------------------------------------- */}
          {/* SERVICE 01: META ADS                                                    */}
          {/* ----------------------------------------------------------------------- */}
          <div
            ref={panel1Ref}
            className="relative h-full w-full p-5 sm:p-8 lg:p-10 flex flex-col justify-between will-change-transform text-[#1A0042] overflow-y-auto sm:overflow-visible pointer-events-auto"
          >
            <div className="space-y-3 sm:space-y-4 sm:pt-16 lg:pt-20">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#573681]/10 border border-[#573681]/20 flex items-center justify-center text-[#573681] shadow-2xs">
                  <Target className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-[#573681]/10 text-[#573681] font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase border border-[#573681]/20">
                  01 // META ADS
                </span>
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <h4 className="font-mono font-bold text-[9.5px] sm:text-xs uppercase tracking-[0.14em] text-[#573681] flex items-center gap-1.5">
                  <span>CAMPAIGN ARCHITECTURE</span>
                  <span className="text-[#1A0042]/30">//</span>
                  <span>BUILT FOR SCALE</span>
                </h4>
                <h3 className="font-display font-black text-lg sm:text-2xl lg:text-[1.65rem] uppercase tracking-tight text-[#1A0042] leading-[1.12]">
                  Full-Funnel Campaign Management Built for Scale, Not Vanity.
                </h3>
              </div>

              <p className="font-sans text-[11.5px] sm:text-[13px] text-[#1A0042]/75 leading-relaxed">
                We structure campaigns to compound over time. Every layer is engineered to pass performance data forward to the next, so you test at scale without guessing.
              </p>

              {/* Key Deliverables Bullet Points */}
              <div className="space-y-1.5 sm:space-y-2 pt-1 font-sans text-[11px] sm:text-xs text-[#1A0042]/85 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-[#573681] font-bold shrink-0">✓</span>
                  <span><strong>30+ Day Attribution Windows:</strong> Structured for delayed conversion cycles and post-iOS tracking.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#573681] font-bold shrink-0">✓</span>
                  <span><strong>Unit Economics Audience Modeling:</strong> Broad &amp; segment targets mapped directly to contribution margin.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#573681] font-bold shrink-0">✓</span>
                  <span><strong>Fatigue-Based Creative Rotation:</strong> Systematic swap cadence driven by hook frequency saturation.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#573681] font-bold shrink-0">✓</span>
                  <span><strong>Weekly Bid Strategy Re-Tuning:</strong> Live pacing adjustments stopping algorithm bid inflation.</span>
                </div>
              </div>

              {/* Stat Card + CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="px-3.5 py-2 rounded-xl bg-white/90 border border-[#1A0042]/10 shadow-2xs">
                  <div className="font-mono text-[9px] text-[#1A0042]/60 uppercase font-semibold">VERIFIED IMPACT</div>
                  <div className="font-display font-extrabold text-base sm:text-lg text-[#573681] leading-tight">2.1x Avg ROAS Lift</div>
                </div>

                <button
                  type="button"
                  onClick={onOpenDemoModal}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#573681] hover:bg-[#1A0042] text-white font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:scale-[1.02] cursor-pointer"
                >
                  <span>Audit My Meta Ads</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Bottom Service Switcher Bar */}
            <div className="space-y-2 pt-3 sm:pb-6 lg:pb-8">
              <div className="hidden sm:block w-[50%] border-b border-dotted border-[#1A0042]/25" />
              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-[#1A0042]/60">
                <div className="flex items-center gap-2 font-bold tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#573681]" />
                  <span className="text-[#573681]">01 META ADS</span>
                  <span className="opacity-40">/ 02 CREATIVE / 03 AUDIT</span>
                </div>
                <span className="hidden sm:inline opacity-70">SCROLL DOWN →</span>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* SERVICE 02: CREATIVE STRATEGY                                           */}
          {/* ----------------------------------------------------------------------- */}
          <div
            ref={panel2Ref}
            className="absolute inset-0 p-5 sm:p-8 lg:p-10 flex flex-col justify-between opacity-0 will-change-transform text-[#1A0042] overflow-y-auto sm:overflow-visible pointer-events-none"
          >
            <div className="space-y-3 sm:space-y-4 sm:pt-16 lg:pt-20">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#573681]/10 border border-[#573681]/20 flex items-center justify-center text-[#573681] shadow-2xs">
                  <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-[#573681]/10 text-[#573681] font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase border border-[#573681]/20">
                  02 // CREATIVE STRATEGY
                </span>
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <h4 className="font-mono font-bold text-[9.5px] sm:text-xs uppercase tracking-[0.14em] text-[#573681] flex items-center gap-1.5">
                  <span>DATA-INFORMED BRIEFS</span>
                  <span className="text-[#1A0042]/30">//</span>
                  <span>NO HUNCHES</span>
                </h4>
                <h3 className="font-display font-black text-lg sm:text-2xl lg:text-[1.65rem] uppercase tracking-tight text-[#1A0042] leading-[1.12]">
                  Creative Briefs Driven By What Your Data Says Converts.
                </h3>
              </div>

              <p className="font-sans text-[11.5px] sm:text-[13px] text-[#1A0042]/75 leading-relaxed">
                Most creative briefs start with a mood board and a hunch. Ours start with performance data. We analyze winning hook angles, lifecycles, and retention before production starts.
              </p>

              {/* Key Deliverables Bullet Points */}
              <div className="space-y-1.5 sm:space-y-2 pt-1 font-sans text-[11px] sm:text-xs text-[#1A0042]/85 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-[#573681] font-bold shrink-0">✓</span>
                  <span><strong>Creative Lifecycle Analysis:</strong> Mapped across 0–7d, 8–30d, and 30d+ longevity windows.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#573681] font-bold shrink-0">✓</span>
                  <span><strong>Hook Type Reverse-Engineering:</strong> Sensory shock, contrarian teardowns, and proof cadences.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#573681] font-bold shrink-0">✓</span>
                  <span><strong>Audience-Specific Variation:</strong> Dedicated architectures for net-new cold traffic vs. repeat buyers.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#573681] font-bold shrink-0">✓</span>
                  <span><strong>Proactive Refresh Pipeline:</strong> Replacement assets deployed before fatigue cliffs occur.</span>
                </div>
              </div>

              {/* Stat Card + CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="px-3.5 py-2 rounded-xl bg-white/90 border border-[#1A0042]/10 shadow-2xs">
                  <div className="font-mono text-[9px] text-[#1A0042]/60 uppercase font-semibold">HOOK VELOCITY</div>
                  <div className="font-display font-extrabold text-base sm:text-lg text-[#573681] leading-tight">+44% Hook Rate Lift</div>
                </div>

                <button
                  type="button"
                  onClick={onOpenDemoModal}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#573681] hover:bg-[#1A0042] text-white font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:scale-[1.02] cursor-pointer"
                >
                  <span>Audit My Creatives</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Bottom Service Switcher Bar */}
            <div className="space-y-2 pt-3 sm:pb-6 lg:pb-8">
              <div className="hidden sm:block w-[50%] border-b border-dotted border-[#1A0042]/25" />
              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-[#1A0042]/60">
                <div className="flex items-center gap-2 font-bold tracking-wider">
                  <span className="opacity-40">01 META /</span>
                  <span className="w-2 h-2 rounded-full bg-[#573681]" />
                  <span className="text-[#573681]">02 CREATIVE STRATEGY</span>
                  <span className="opacity-40">/ 03 AUDIT</span>
                </div>
                <span className="hidden sm:inline opacity-70">SCROLL DOWN →</span>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* SERVICE 03: AUDIT DIAGNOSTICS                                           */}
          {/* ----------------------------------------------------------------------- */}
          <div
            ref={panel3Ref}
            className="absolute inset-0 p-5 sm:p-8 lg:p-10 flex flex-col justify-between opacity-0 will-change-transform text-[#1A0042] overflow-y-auto sm:overflow-visible pointer-events-none"
          >
            <div className="space-y-3 sm:space-y-4 sm:pt-16 lg:pt-20">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-700 shadow-2xs">
                  <Activity className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase border border-emerald-500/20">
                  03 // AUDIT DIAGNOSTICS
                </span>
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <h4 className="font-mono font-bold text-[9.5px] sm:text-xs uppercase tracking-[0.14em] text-emerald-700 flex items-center gap-1.5">
                  <span>SYSTEMATIC RIGOR</span>
                  <span className="text-[#1A0042]/30">//</span>
                  <span>ONE STANDARD</span>
                </h4>
                <h3 className="font-display font-black text-lg sm:text-2xl lg:text-[1.65rem] uppercase tracking-tight text-[#1A0042] leading-[1.12]">
                  One Diagnostic Framework Applied to Every Account.
                </h3>
              </div>

              <p className="font-sans text-[11.5px] sm:text-[13px] text-[#1A0042]/75 leading-relaxed">
                Proprietary diagnostic checkpoints that catch spend bleed before it gets expensive. Same rigor applied whether spending ₹10k/mo or ₹500k/mo.
              </p>

              {/* Key Deliverables Bullet Points */}
              <div className="space-y-1.5 sm:space-y-2 pt-1 font-sans text-[11px] sm:text-xs text-[#1A0042]/85 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span><strong>6-Point Diagnostic Audit:</strong> Exposing what's actually broken before fixing anything.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span><strong>Real-Time Budget Bleed Isolation:</strong> Live alerts catch runaway bleed in 12 minutes.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span><strong>Unit Economics Anchoring:</strong> Strategic fixes tied to true gross margin, not vanity ROAS.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span><strong>Daily Checks &amp; Weekly Re-tunes:</strong> Continuous monitoring so performance never drifts.</span>
                </div>
              </div>

              {/* Stat Card + CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="px-3.5 py-2 rounded-xl bg-white/90 border border-emerald-500/20 shadow-2xs">
                  <div className="font-mono text-[9px] text-[#1A0042]/60 uppercase font-semibold">RESPONSE LATENCY</div>
                  <div className="font-display font-extrabold text-base sm:text-lg text-emerald-700 leading-tight">Δt ≤ 12 min Catch</div>
                </div>

                <button
                  type="button"
                  onClick={onOpenDemoModal}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#573681] hover:bg-[#1A0042] text-white font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:scale-[1.02] cursor-pointer"
                >
                  <span>Book a 30-Min Audit</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Bottom Service Switcher Bar */}
            <div className="space-y-2 pt-3 sm:pb-6 lg:pb-8">
              <div className="hidden sm:block w-[50%] border-b border-dotted border-[#1A0042]/25" />
              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-[#1A0042]/60">
                <div className="flex items-center gap-2 font-bold tracking-wider">
                  <span className="opacity-40">01 META / 02 CREATIVE /</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-700">03 AUDIT DIAGNOSTICS</span>
                </div>
                <span className="hidden sm:inline text-emerald-700 font-bold">ALL 3 ACTIVE ✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Right Bottom Badge (Desktop Only) — Requested Copy & Philosophy           */}
        {/* ========================================================================= */}
        <div
          ref={rightBadgeRef}
          className="hidden sm:flex absolute bottom-6 sm:bottom-10 lg:bottom-12 right-6 sm:right-10 lg:right-14 z-20 pointer-events-none text-right flex-col items-end gap-3 max-w-sm sm:max-w-md lg:max-w-lg"
        >
          <div className="space-y-1.5">
            <div className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#573681]">
              FULL-FUNNEL ARCHITECTURE
            </div>

            <h2 className="font-display font-black text-xl sm:text-2xl lg:text-[1.85rem] text-[#1A0042] uppercase tracking-tight leading-[1.08]">
              Full-Funnel Execution. <br />
              <span className="text-[#573681]">One Diagnostic Philosophy.</span>
            </h2>

            <p className="font-sans text-xs sm:text-[13.5px] text-[#1A0042]/80 font-normal leading-relaxed pt-1">
              Most agencies separate media buying from creative and guess on attribution. We audit first, engineer briefs from your historical winners, and re-tune pacing weekly.
            </p>
          </div>

          <div className="flex items-center gap-2.5 pt-2.5 border-t border-[#1A0042]/15 font-mono text-[10.5px] text-[#1A0042]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#573681] animate-pulse" />
            <span className="tracking-wider uppercase font-semibold">3 CORE CAPABILITIES · 1 UNIFIED PLAYBOOK</span>
          </div>
        </div>
      </div>
    </section>
  );
}
