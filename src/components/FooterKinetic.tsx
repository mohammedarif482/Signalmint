import { Magnetic } from "./MagneticButton";
import { ArrowRight, Play } from "lucide-react";
import signalMintLogo from "../assets/signalmintlogo.svg";

interface FooterKineticProps {
  onOpenDemoModal?: () => void;
}

export function FooterKinetic({ onOpenDemoModal }: FooterKineticProps) {
  return (
    <footer className="relative w-full bg-[#DCDAFD] text-[#1A0042] pt-20 sm:pt-28 pb-12 overflow-hidden border-t border-[#1A0042]/10">
      {/* Ambient background light gradients */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#E7E6FB] filter blur-[100px] pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* 1. CLOSING HERO BOX */}
        <div className="mb-16 sm:mb-24 max-w-5xl">
          {/* Eyebrow: FINAL CALL // YOUR MOVE */}
          <div className="mb-4">
            <span className="font-mono text-xs font-semibold text-[#4D0181] bg-[#4D0181]/10 px-3 py-1 rounded-full border border-[#4D0181]/20 inline-block uppercase tracking-widest">
              FINAL CALL // YOUR MOVE
            </span>
          </div>

          {/* H1 */}
          <h2 className="font-black tracking-tight uppercase leading-[1.05] text-3xl sm:text-5xl lg:text-6xl text-[#1A0042] select-none">
            THE COMPETITOR YOU&apos;RE ABOUT TO LOSE TO IS ALREADY USING THIS.
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-serif italic mt-2.5 opacity-80 normal-case tracking-normal text-[#4D0181]">
              (Or they will be, in 6 weeks.)
            </span>
          </h2>

          {/* Subhead */}
          <p className="font-montserrat text-sm sm:text-base text-[#1A0042]/80 max-w-2xl mt-5 leading-relaxed">
            Every day you spend on manual audits, they&apos;re compounding Crown Winner insights. Every night you sleep, ATLAS is protecting their spend. Competitive advantage doesn&apos;t wait.
          </p>

          {/* Status Ticker */}
          <div className="mt-5 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-[#1A0042]/10 text-xs font-mono text-[#1A0042] shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold">
              ATLAS is running 24/7 for 340+ brands. It&apos;s ready for yours. In 6 weeks, your competitor will join.
            </span>
          </div>

          {/* 2. CALL-TO-ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-8">
            {/* Primary Action Button */}
            <Magnetic strength={0.35} cursorLabel="GAP">
              <button
                onClick={onOpenDemoModal}
                className="bg-[#1516A8] hover:bg-[#1A0042] text-white font-bold px-8 py-5 rounded-full text-base shadow-2xl transition-all active:scale-98 cursor-pointer flex items-center gap-2.5 group"
              >
                <span>See YOUR Competitive Gap (Takes 2 mins)</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </Magnetic>

            {/* Secondary Action Link */}
            <button
              onClick={onOpenDemoModal}
              className="text-[#1A0042] hover:text-[#4D0181] font-semibold text-sm sm:text-base flex items-center gap-2 px-2 py-3 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-[#1A0042] text-[#1A0042]" />
              <span>Or: Book a 15-Min Walkthrough of YOUR Data</span>
            </button>
          </div>
        </div>

        {/* 3. MINIMAL CLEAN LIGHT-MODE FOOTER */}
        <div className="pt-10 border-t border-[#1A0042]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Left: SignalMint Logo + Description */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <a href="#" className="flex items-center select-none group">
              <img
                src={signalMintLogo}
                alt="SignalMint"
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </a>
            <span className="hidden sm:inline text-[#1A0042]/30 font-mono">|</span>
            <span className="font-mono text-xs text-[#1A0042]/70">
              AI Creative Performance &amp; Budget Protection Engine
            </span>
          </div>

          {/* Right: Quick Links */}
          <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-[#1A0042]/80">
            <a href="#agents" className="hover:text-[#1516A8] transition-colors">
              How It Works
            </a>
            <a href="#" className="hover:text-[#1516A8] transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-[#1516A8] transition-colors">
              Privacy
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1516A8] transition-colors">
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1516A8] transition-colors">
              Twitter
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-[#1A0042]/8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#1A0042]/50 gap-2">
          <span>&copy; 2026 SignalMint. All rights reserved.</span>
          <span>Built for High-Growth Performance Brands &amp; Media Buyers</span>
        </div>

      </div>
    </footer>
  );
}
