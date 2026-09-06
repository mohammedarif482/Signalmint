import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { 
  Layers, 
  Sparkles, 
  Activity, 
  Target
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface ServicesSectionProps {
  onOpenDemoModal?: () => void;
}

export function ServicesSection({ onOpenDemoModal }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
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
      id="services" 
      ref={sectionRef} 
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-[#FAFAFD] text-[#1A0042] border-t border-[#1A0042]/10 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#1A0042_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 sm:mb-20">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#1516A8] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1516A8]" />
              <span>03 // WHAT WE DO (THE THREE SERVICES)</span>
            </div>
            <h2
              ref={headingRef}
              className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] uppercase"
            >
              Full-Funnel Execution. <br />
              <span className="text-[#1516A8]">One Diagnostic Philosophy.</span>
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#1A0042]/75 max-w-md leading-relaxed">
            Most agencies separate media buying from creative and guess on attribution. We audit first, engineer briefs from your historical winners, and re-tune pacing weekly.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-1.5 rounded-2xl bg-[#E7E6FB]/70 border border-[#1A0042]/10 max-w-3xl mb-12 select-none shadow-xs">
          <button
            onClick={() => setActiveTab(0)}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 0
                ? "bg-[#1A0042] text-white shadow-md scale-[1.01]"
                : "text-[#1A0042]/70 hover:text-[#1A0042] hover:bg-white/40"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>01. Meta Ads</span>
          </button>

          <button
            onClick={() => setActiveTab(1)}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 1
                ? "bg-[#1A0042] text-white shadow-md scale-[1.01]"
                : "text-[#1A0042]/70 hover:text-[#1A0042] hover:bg-white/40"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>02. Creative Strategy</span>
          </button>

          <button
            onClick={() => setActiveTab(2)}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 2
                ? "bg-[#1A0042] text-white shadow-md scale-[1.01]"
                : "text-[#1A0042]/70 hover:text-[#1A0042] hover:bg-white/40"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>03. Audit Diagnostics</span>
          </button>
        </div>

        {/* TAB 01: META ADS */}
        {activeTab === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1516A8]/10 text-[#1516A8] border border-[#1516A8]/20 font-mono text-xs font-bold uppercase">
                <Target className="w-3 h-3" />
                <span>CAMPAIGN ARCHITECTURE BUILT FOR SCALE</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#1A0042] leading-tight">
                Full-Funnel Campaign Management Built for Scale, Not Vanity.
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#1A0042]/80 leading-relaxed">
                We structure campaigns to compound over time. Every layer is engineered to pass performance data forward to the next, so you can test at scale without guessing.
              </p>

              <div className="space-y-3 pt-2 font-sans text-sm text-[#1A0042]/90">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                  <span><strong>30+ Day Attribution Windows:</strong> Campaign architecture structured for delayed conversion cycles and post-iOS tracking reality.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                  <span><strong>Unit Economics-Tied Audience Modeling:</strong> Broad and segment targets mapped directly to your blended CPA and contribution margin.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                  <span><strong>Fatigue-Based Creative Rotation:</strong> Systematic swap cadence driven by hook frequency saturation, not intuition.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                  <span><strong>Weekly Bid Strategy Re-Tuning:</strong> Live pacing adjustments that prevent algorithm bid inflation and budget burn.</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#1A0042]/15 shadow-sm">
                  <div className="font-mono text-xs text-[#1A0042]/60 uppercase font-semibold">VERIFIED CLIENT IMPACT</div>
                  <div className="font-display font-extrabold text-2xl text-[#1516A8]">2.1x Avg ROAS Lift</div>
                  <div className="text-xs text-[#1A0042]/75">Within first 60 days of restructure</div>
                </div>
                <button
                  onClick={onOpenDemoModal}
                  className="px-6 py-4 rounded-xl bg-[#1A0042] hover:bg-[#1516A8] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.02] cursor-pointer"
                >
                  Audit My Meta Ads →
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#1A0042] text-white border border-white/10 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-60 h-60 bg-[#1516A8]/40 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>LIVE ACCOUNT ARCHITECTURE // COMPOUND ENGINE</span>
                  </div>
                  <span className="font-mono text-[10px] text-white/50">Δt ≤ 12m PACING</span>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-[#6495EB]">LAYER 01 // PROSPECTING &amp; SENSORY HOOKS</span>
                    <span className="text-emerald-400 font-bold">4.2x ROAS</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#1516A8] to-[#6495EB] h-full w-[72%]" />
                  </div>
                  <div className="flex justify-between font-mono text-[10.5px] text-white/70">
                    <span>Broad ASC+ // 3s Hook Rate: 48%</span>
                    <span>CPA: ₹210 (Target: ₹280)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-purple-300">LAYER 02 // MECHANISM-OF-ACTION PROOF</span>
                    <span className="text-emerald-400 font-bold">5.8x ROAS</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#4D0181] to-purple-400 h-full w-[84%]" />
                  </div>
                  <div className="flex justify-between font-mono text-[10.5px] text-white/70">
                    <span>High-Intent Video Viewers // Retention: 54%</span>
                    <span>CPA: ₹165</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-white/5 text-center">
                    <div className="font-mono text-[10px] text-white/50 uppercase">Blended ROAS</div>
                    <div className="font-display font-extrabold text-xl text-emerald-400">4.82x</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 text-center">
                    <div className="font-mono text-[10px] text-white/50 uppercase">Spend Pacing</div>
                    <div className="font-display font-extrabold text-xl text-white">99.4%</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 text-center">
                    <div className="font-mono text-[10px] text-white/50 uppercase">Bleed Neutralized</div>
                    <div className="font-display font-extrabold text-xl text-[#6495EB]">₹0.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 02: CREATIVE STRATEGY */}
        {activeTab === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1516A8]/10 text-[#1516A8] border border-[#1516A8]/20 font-mono text-xs font-bold uppercase">
                <Sparkles className="w-3 h-3" />
                <span>DATA-INFORMED PRODUCTION BRIEFS</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#1A0042] leading-tight">
                Creative Briefs Driven By What Your Data Says Converts.
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#1A0042]/80 leading-relaxed">
                Most creative briefs start with a mood board and a hunch. Ours start with your performance data. We analyze top-converting hooks, format lifecycles, and retention drop-offs before production moves a single frame.
              </p>

              <div className="space-y-3 pt-2 font-sans text-sm text-[#1A0042]/90">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                  <span><strong>Creative Lifecycle Analysis:</strong> Mapped per format across 0–7 days, 8–30 days, and 30+ day longevity windows.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                  <span><strong>Hook Type Reverse-Engineering:</strong> Sensory shock, contrarian teardowns, and immediate proof cadences extracted from historical winners.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                  <span><strong>Audience-Specific Variation:</strong> Separate creative architectures for net-new cold traffic versus high-LTV repeat buyers.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                  <span><strong>Proactive Refresh Pipeline:</strong> Replacement assets deployed before fatigue sets in, eliminating ROAS cliff drops.</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#1A0042]/15 shadow-sm">
                  <div className="font-mono text-xs text-[#1A0042]/60 uppercase font-semibold">HOOK VELOCITY</div>
                  <div className="font-display font-extrabold text-2xl text-emerald-600">+44% Hook Rate Lift</div>
                  <div className="text-xs text-[#1A0042]/75">Across first 3 production cycles</div>
                </div>
                <button
                  onClick={onOpenDemoModal}
                  className="px-6 py-4 rounded-xl bg-[#1A0042] hover:bg-[#1516A8] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.02] cursor-pointer"
                >
                  Audit My Creatives →
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/60 border border-red-500/20 text-[#1A0042] space-y-3 opacity-75">
                  <div className="font-mono text-[10px] font-bold text-rose-600 uppercase flex items-center gap-1.5">
                    <span>✕ INTUITION-LED BRIEF</span>
                  </div>
                  <div className="h-32 rounded-xl bg-red-50/70 border border-dashed border-red-200 flex flex-col items-center justify-center text-center p-3">
                    <span className="font-sans text-xs text-[#1A0042]/60">Standard Lifestyle Shoot</span>
                    <span className="font-mono text-rose-600 font-bold text-xs mt-1">21% Hook Retention</span>
                    <span className="text-[10px] text-rose-500">Fatigues in 6 days</span>
                  </div>
                  <div className="text-xs font-mono text-[#1A0042]/70 space-y-1">
                    <div>CPA: ₹420 (High)</div>
                    <div>ROAS: 1.4x</div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#1A0042] border-2 border-[#1516A8] text-white space-y-3 shadow-xl relative">
                  <div className="absolute -top-3 right-4 px-2 py-0.5 rounded bg-emerald-500 text-black font-mono text-[9px] font-extrabold uppercase">
                    PROVEN WINNER
                  </div>
                  <div className="font-mono text-[10px] font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                    <span>✓ DATA-BACKED BRIEF</span>
                  </div>
                  <div className="h-32 rounded-xl bg-white/10 border border-emerald-500/40 flex flex-col items-center justify-center text-center p-3">
                    <span className="font-sans text-xs text-white/90">Sensory Shock + Proof</span>
                    <span className="font-mono text-emerald-400 font-bold text-xs mt-1">68% Hook Retention</span>
                    <span className="text-[10px] text-emerald-300">Scales for 45+ days</span>
                  </div>
                  <div className="text-xs font-mono text-white/85 space-y-1">
                    <div className="text-emerald-400 font-bold">CPA: ₹195 (-53%)</div>
                    <div className="text-emerald-400 font-bold">ROAS: 5.2x</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#E7E6FB]/70 border border-[#1A0042]/15 font-mono text-xs flex items-center justify-between">
                <span className="text-[#1A0042]/70 font-bold">HOOK RETENTION OVERLAY:</span>
                <span className="text-[#1516A8] font-bold">0:00–0:03 Sensory Cliff Overcome (+120% Watch Time)</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 03: AUDIT DIAGNOSTICS */}
        {activeTab === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1516A8]/10 text-[#1516A8] border border-[#1516A8]/20 font-mono text-xs font-bold uppercase">
                <Activity className="w-3 h-3" />
                <span>SYSTEMATIC DIAGNOSTIC RIGOR</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#1A0042] leading-tight">
                One Diagnostic Framework Applied to Every Account, Every Time.
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#1A0042]/80 leading-relaxed">
                We run the exact same diagnostic framework on every account we touch. The findings hold regardless of category, scale, or platform nuances. It is not subjective. It is systematic and auditable.
              </p>

              <div className="space-y-3 pt-2 font-sans text-sm text-[#1A0042]/90">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                  <span><strong>Campaign Architecture Audit:</strong> Layering integrity, broad vs. lookalike cannibalization, and budget distribution checks.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                  <span><strong>Pixel &amp; CAPI Health:</strong> Event deduplication, consent mode firing, and checkout drop-off attribution verification.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                  <span><strong>Creative Fatigue Scoring:</strong> Hook saturation curves per audience to calculate exact days until CPA degradation.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#1516A8]/10 text-[#1516A8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                  <span><strong>Attribution Integrity Check:</strong> Reconciling Meta Ads Manager reporting against true Shopify bank-settled revenue.</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#1A0042]/15 shadow-sm">
                  <div className="font-mono text-xs text-[#1A0042]/60 uppercase font-semibold">AVERAGE AUDIT FINDING</div>
                  <div className="font-display font-extrabold text-2xl text-emerald-600">₹8,400/mo Bleed</div>
                  <div className="text-xs text-[#1A0042]/75">Directly identifiable &amp; recoverable per account</div>
                </div>
                <button
                  onClick={onOpenDemoModal}
                  className="px-6 py-4 rounded-xl bg-[#1A0042] hover:bg-[#1516A8] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.02] cursor-pointer"
                >
                  Request Diagnostic Audit →
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#1A0042]/15 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#1A0042]/10 pb-3 font-mono text-xs">
                  <span className="font-bold text-[#1A0042] uppercase">DIAGNOSTIC AUDIT MATRIX (6 CHECKPOINTS)</span>
                  <span className="text-[#1516A8] font-bold">STATUS REPORT</span>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-[#E7E6FB]/40 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#1A0042]">01 // CAMPAIGN LAYERING &amp; ASC+</div>
                      <div className="text-[11px] text-[#1A0042]/70 font-sans">Over-fragmentation detected in retargeting</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">WARN // REBUILD</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#E7E6FB]/40 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#1A0042]">02 // CAPI &amp; SERVER-SIDE EVENT FIRING</div>
                      <div className="text-[11px] text-[#1A0042]/70 font-sans">Purchase event deduplication rate: 99.1%</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">PASS // OPTIMAL</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#E7E6FB]/40 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#1A0042]">03 // AUDIENCE OVERLAP &amp; CANNIBALIZATION</div>
                      <div className="text-[11px] text-[#1A0042]/70 font-sans">3 core ad sets competing for identical bidder pool</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-[10px]">FAIL // ₹4.2K BLEED</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#E7E6FB]/40 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#1A0042]">04 // HOOK RETENTION &amp; CREATIVE FATIGUE</div>
                      <div className="text-[11px] text-[#1A0042]/70 font-sans">Hero asset at 2.8 frequency; fatigue slope active</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">WARN // ROTATE</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#E7E6FB]/40 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#1A0042]">05 // BID STRATEGY &amp; PACING STABILITY</div>
                      <div className="text-[11px] text-[#1A0042]/70 font-sans">Cost caps calibrated against 45-day LTV margin</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">PASS // LOCKED</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <a
                    href="#proof"
                    className="font-mono text-xs text-[#1516A8] hover:underline font-bold"
                  >
                    See how we solved this for clients in Section 04 ↓
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
