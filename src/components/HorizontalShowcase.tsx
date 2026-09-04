import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Clock,
  Zap,
  ChevronRight
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface AdCard {
  id: string;
  badge: string;
  title: string;
  brand: string;
  format: string;
  hookRate: string;
  roas: string;
  spend: string;
  daysActive: string;
  hookType: string;
  scriptBreakdown: string;
  visualCue: string;
}

const CARDS_DATA: AdCard[] = [
  {
    id: "cw-01",
    badge: "👑 CROWN WINNER #1",
    title: "3-Second Pattern Interrupt",
    brand: "AeroSleep Labs",
    format: "9:16 Kinetic UGC + ASMR",
    hookRate: "48.2%",
    roas: "6.4x",
    spend: "$320,000+",
    daysActive: "42 Days",
    hookType: "Sensory Shockwave",
    scriptBreakdown: "Opens with ice fracture acoustic trigger -> Contrarian myth debunked in 2.2s -> Solution revealed before 0:05.",
    visualCue: "Macro condensation + rapid cuts",
  },
  {
    id: "cw-02",
    badge: "👑 CROWN WINNER #2",
    title: "Split-Screen Chemical Dismantle",
    brand: "VoltHydrate",
    format: "Side-by-Side Dual Reel",
    hookRate: "42.9%",
    roas: "5.1x",
    spend: "$195,000+",
    daysActive: "31 Days",
    hookType: "Visual Proof Overclaim",
    scriptBreakdown: "Left side shows cloudy rival dilution vs right side instant cellular osmosis dispersion in clear glass.",
    visualCue: "Split-screen side-by-side timer",
  },
  {
    id: "cw-03",
    badge: "👑 CROWN WINNER #3",
    title: "Contrarian Founder Teardown",
    brand: "BiomeNutrition",
    format: "Lo-Fi Green Screen POV",
    hookRate: "39.7%",
    roas: "7.2x",
    spend: "$480,000+",
    daysActive: "58 Days",
    hookType: "Authority Disruption",
    scriptBreakdown: "Stop taking magnesium in powder form. Founder points to clinical paper screenshot on screen while walking.",
    visualCue: "Paper citation + casual microphone",
  },
  {
    id: "cw-04",
    badge: "👑 CROWN WINNER #4",
    title: "Motion Infographic Velocity",
    brand: "SaaSFlow Tech",
    format: "3D Isometric Explainer",
    hookRate: "51.3%",
    roas: "8.8x",
    spend: "$240,000+",
    daysActive: "24 Days",
    hookType: "Pain-Vector Compression",
    scriptBreakdown: "Chaotic tangled wires animate into a unified laser beam in 1.8s. High CTR across B2B SaaS verticals.",
    visualCue: "Kinetic typography & smooth line physics",
  },
  {
    id: "cw-05",
    badge: "👑 CROWN WINNER #5",
    title: "Macro Camera Problem-Agitate",
    brand: "Lumino Enamel",
    format: "Macro Lens 4K Demonstration",
    hookRate: "46.5%",
    roas: "5.9x",
    spend: "$175,000+",
    daysActive: "36 Days",
    hookType: "Hyper-Real Discovery",
    scriptBreakdown: "Ultra close-up of micro-cracks treated with bioactive foam. Instant optical shade shift visible on camera.",
    visualCue: "4K microscope view + before/after split",
  },
];

export function HorizontalShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedCard, setSelectedCard] = useState<AdCard | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth + 120);
    };

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + (track.scrollWidth - window.innerWidth + 400),
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#FAFAFD] overflow-hidden flex flex-col justify-center border-b border-[#1A0042]/8 py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#1516A8] tracking-widest uppercase bg-[#E7E6FB] px-2.5 py-1 rounded-full">
                03 // COMPETITIVE VAULT
              </span>
              <span className="font-mono text-xs text-[#1A0042]/60">GSAP HORIZONTAL SCRUB REEL</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#1A0042] tracking-tight uppercase">
              CROWN WINNERS & HOOK TELEMETRY
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#1A0042]/70 bg-[#E7E6FB]/60 px-4 py-2 rounded-full border border-[#1A0042]/10">
            <span className="w-2 h-2 rounded-full bg-[#1516A8] animate-pulse"></span>
            <span>SCRUB HORIZONTALLY TO EXPLORE WINNING CREATIVE DNA</span>
          </div>
        </div>
      </div>

      <div className="w-full relative overflow-visible">
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 px-4 sm:px-8 md:px-16 w-max items-stretch select-none"
        >
          {CARDS_DATA.map((card) => (
            <div
              key={card.id}
              data-cursor="INSPECT"
              onClick={() => setSelectedCard(card)}
              className="w-[330px] sm:w-[390px] md:w-[420px] bg-[#FAFAFD] rounded-2xl border border-[#1A0042]/12 p-6 sm:p-7 shadow-[0_8px_28px_rgba(26,0,66,0.04)] hover:shadow-[0_16px_40px_rgba(21,22,168,0.12)] hover:border-[#1516A8]/40 transition-all duration-300 flex flex-col justify-between shrink-0 group cursor-pointer relative overflow-hidden transform hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1516A8] to-[#4D0181] opacity-80" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    {card.badge}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-xs text-[#1A0042]/60">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{card.daysActive} scaling</span>
                  </div>
                </div>

                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#1A0042] group-hover:text-[#1516A8] transition-colors mb-1">
                  {card.title}
                </h3>
                <div className="font-mono text-xs text-[#1516A8] font-bold uppercase tracking-wider mb-4">
                  Brand: {card.brand} // {card.format}
                </div>

                <div className="grid grid-cols-3 gap-2.5 mb-5 p-3 rounded-xl bg-[#E7E6FB]/50 border border-[#1A0042]/8">
                  <div className="text-center">
                    <div className="font-mono text-[10px] text-[#1A0042]/60 font-semibold">HOOK RATE</div>
                    <div className="font-mono font-black text-lg text-[#1516A8]">{card.hookRate}</div>
                  </div>
                  <div className="text-center border-x border-[#1A0042]/8">
                    <div className="font-mono text-[10px] text-[#1A0042]/60 font-semibold">ROAS</div>
                    <div className="font-mono font-black text-lg text-[#4D0181]">{card.roas}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-[10px] text-[#1A0042]/60 font-semibold">EST. SPEND</div>
                    <div className="font-mono font-black text-lg text-emerald-700">{card.spend}</div>
                  </div>
                </div>

                <div className="space-y-2.5 font-mono text-xs mb-5">
                  <div className="bg-[#FAFAFD] p-2.5 rounded-lg border border-[#1A0042]/8">
                    <span className="text-[#1A0042]/60 font-bold">HOOK TRIGGER: </span>
                    <span className="font-bold text-[#1A0042]">{card.hookType}</span>
                  </div>
                  <div className="bg-[#FAFAFD] p-2.5 rounded-lg border border-[#1A0042]/8 text-[#1A0042]/80 leading-relaxed font-body text-xs">
                    <span className="font-mono font-bold text-[#1516A8]">SCRIPT DNA: </span>
                    {card.scriptBreakdown}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1A0042]/8 flex items-center justify-between font-mono text-xs">
                <span className="text-[#1A0042]/60">Telemetry verified</span>
                <span className="text-[#1516A8] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Full X-Ray <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}

          <div className="w-[320px] bg-[#E7E6FB]/80 rounded-2xl border border-[#1516A8]/30 p-6 flex flex-col justify-center items-center text-center shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-[#1516A8] text-white flex items-center justify-center mb-4 shadow-md">
              <Zap className="w-7 h-7" />
            </div>
            <h4 className="font-display font-extrabold text-xl text-[#1A0042] mb-2 uppercase">
              YOUR COMPETITORS ARE TESTING 100+ ADS RIGHT NOW
            </h4>
            <p className="font-body text-xs text-[#1A0042]/75 mb-6">
              Track their winning hooks automatically before your budget burns on stale creatives.
            </p>
            <a
              href="#simulator"
              data-cursor="TEST"
              className="px-5 py-2.5 rounded-full bg-[#1516A8] text-white font-mono text-xs font-bold uppercase hover:bg-[#4D0181] transition-colors"
            >
              Test Telemetry Sim
            </a>
          </div>
        </div>
      </div>

      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A0042]/30 backdrop-blur-sm">
          <div className="bg-[#FAFAFD] border border-[#1A0042]/20 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#E7E6FB] text-[#1A0042] font-mono text-sm font-bold flex items-center justify-center hover:bg-[#1A0042] hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#1516A8] bg-[#E7E6FB] px-2.5 py-0.5 rounded-full">
                {selectedCard.badge}
              </span>
              <span className="font-mono text-xs text-[#1A0042]/60">{selectedCard.daysActive} in active flight</span>
            </div>

            <h3 className="font-display font-black text-2xl text-[#1A0042] mb-1">
              {selectedCard.title}
            </h3>
            <p className="font-mono text-xs text-[#1516A8] font-bold mb-4">
              Brand: {selectedCard.brand} | Format: {selectedCard.format}
            </p>

            <div className="grid grid-cols-3 gap-3 p-3 bg-[#E7E6FB]/50 rounded-xl mb-4 font-mono text-center">
              <div>
                <div className="text-[10px] text-[#1A0042]/60">HOOK RATE</div>
                <div className="text-xl font-black text-[#1516A8]">{selectedCard.hookRate}</div>
              </div>
              <div className="border-x border-[#1A0042]/10">
                <div className="text-[10px] text-[#1A0042]/60">CONFIRMED ROAS</div>
                <div className="text-xl font-black text-[#4D0181]">{selectedCard.roas}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#1A0042]/60">ESTIMATED SPEND</div>
                <div className="text-xl font-black text-emerald-700">{selectedCard.spend}</div>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs text-[#1A0042] mb-6">
              <div className="p-3 bg-white rounded-lg border border-[#1A0042]/10">
                <div className="text-[#1516A8] font-bold mb-1">DETAILED SCRIPT TELEMETRY:</div>
                <p className="font-body text-sm text-[#1A0042]/85 leading-relaxed">{selectedCard.scriptBreakdown}</p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-[#1A0042]/10">
                <div className="text-[#4D0181] font-bold mb-1">VISUAL & AUDIO TRIGGER:</div>
                <p className="font-body text-sm text-[#1A0042]/85">{selectedCard.visualCue}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCard(null)}
              className="w-full py-3 rounded-xl bg-[#1516A8] text-white font-mono text-xs font-bold uppercase hover:bg-[#4D0181] transition-colors cursor-pointer"
            >
              Close Telemetry Inspector
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
