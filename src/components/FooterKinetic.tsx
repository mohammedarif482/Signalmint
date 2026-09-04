import { Magnetic } from "./MagneticButton";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface FooterKineticProps {
  onOpenDemoModal?: () => void;
}

export function FooterKinetic({ onOpenDemoModal }: FooterKineticProps) {
  return (
    <footer className="relative w-full bg-[#DCDAFD] text-[#1A0042] pt-20 sm:pt-28 pb-12 overflow-hidden border-t border-[#1A0042]/10">
      {/* Ambient background light gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#E7E6FB] filter blur-[100px] pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Outro Kinetic Section */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-xs font-bold text-[#1516A8] tracking-widest uppercase bg-[#E7E6FB] px-3 py-1 rounded-full border border-[#1A0042]/10">
              FINAL CALL // AD EXCELLENCE
            </span>
            <span className="font-mono text-xs text-[#1A0042]/60">ZERO BLEEDING SPEND GUARANTEE</span>
          </div>

          {/* Giant Bold Outro Typography */}
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-[#1A0042] leading-[1.04] uppercase max-w-6xl select-none mb-10">
            LAUNCH ADS THAT WIN —{" "}
            <span className="bg-gradient-to-r from-[#1516A8] via-[#4D0181] to-[#1516A8] bg-clip-text text-transparent underline decoration-[#1516A8]/30 decoration-wavy decoration-2">
              BECAUSE THEY ALREADY HAVE.
            </span>
          </h2>

          {/* Magnetic CTA Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Magnetic strength={0.4} cursorLabel="BOOK">
              <button
                onClick={onOpenDemoModal}
                className="px-8 py-5 rounded-full bg-[#1516A8] hover:bg-[#4D0181] text-white font-mono text-sm sm:text-base font-black tracking-widest uppercase transition-all shadow-[0_8px_30px_rgba(21,22,168,0.25)] hover:shadow-[0_12px_40px_rgba(77,1,129,0.35)] flex items-center gap-3 group cursor-pointer"
              >
                <span>Book Telemetry Demo</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </Magnetic>

            <div className="flex items-center gap-3 text-xs font-mono text-[#1A0042]/70">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <span>Atlas Engine 24/7 Bleed Protection ready to deploy</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation & Systems Grid */}
        <div className="pt-12 border-t border-[#1A0042]/12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#1A0042] flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-[#6495EB]" />
              </div>
              <span className="font-display font-black text-xl tracking-tight text-[#1A0042]">
                SIGNAL<span className="text-[#1516A8]">MINT</span>
              </span>
            </div>
            <p className="font-body text-xs text-[#1A0042]/75 max-w-sm leading-relaxed mb-4">
              The autonomous AI creative intelligence and budget optimization system. Built for performance marketers, media buyers, and hyper-growth brands.
            </p>
            <div className="font-mono text-[11px] text-[#1A0042]/60">
              SYSTEM ARCHITECTURE: DUAL-AGENT REALTIME TELEMETRY
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-3">
            <div className="font-mono text-xs font-bold text-[#1A0042] uppercase tracking-wider mb-3">
              PLATFORM ARSENAL
            </div>
            <ul className="space-y-2 font-mono text-xs text-[#1A0042]/80">
              <li>
                <a href="#agents" className="hover:text-[#1516A8] transition-colors">
                  Agent 01: SCOUT (Radar Engine)
                </a>
              </li>
              <li>
                <a href="#agents" className="hover:text-[#1516A8] transition-colors">
                  Agent 02: ATLAS (Budget Guardian)
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-[#1516A8] transition-colors">
                  Crown Winners Reel
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-[#1516A8] transition-colors">
                  Bleed Telemetry Sandbox
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-3">
            <div className="font-mono text-xs font-bold text-[#1A0042] uppercase tracking-wider mb-3">
              INFRASTRUCTURE
            </div>
            <ul className="space-y-2 font-mono text-xs text-[#1A0042]/80">
              <li>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Meta Graph API v21.0
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  TikTok Commercial API
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Computer Vision Hook Dissector
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  30-Min Stop-Loss Daemon
                </span>
              </li>
            </ul>
          </div>

          {/* Status Column */}
          <div className="md:col-span-2">
            <div className="font-mono text-xs font-bold text-[#1A0042] uppercase tracking-wider mb-3">
              TELEMETRY STATUS
            </div>
            <div className="p-3 rounded-xl bg-[#FAFAFD] border border-[#1A0042]/10 font-mono text-xs">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                ALL ENGINES LIVE
              </div>
              <div className="text-[10px] text-[#1A0042]/60">UPTIME: 99.98%</div>
              <div className="text-[10px] text-[#1A0042]/60">LATENCY: &lt;140ms</div>
            </div>
          </div>
        </div>

        {/* Hairline Sub-Footer */}
        <div className="mt-12 pt-6 border-t border-[#1A0042]/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#1A0042]/60 gap-4">
          <div>
            &copy; {new Date().getFullYear()} SIGNALMINT INC. ALL RIGHTS RESERVED. 100% LIGHT-THEME TELEMETRY OS.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#1516A8]">Privacy Policy</a>
            <a href="#" className="hover:text-[#1516A8]">Security Architecture</a>
            <a href="#" className="hover:text-[#1516A8]">API Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
