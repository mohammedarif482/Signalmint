import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface FloatingAuditCTAProps {
  onOpenDemoModal: () => void;
  isVisible?: boolean;
}

export function FloatingAuditCTA({ onOpenDemoModal, isVisible = true }: FloatingAuditCTAProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Subtle delayed entrance for a smooth, high-end feel
    const timer = setTimeout(() => setMounted(true), 400);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Floating Action"
      className={`fixed bottom-5 xs:bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out select-none ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={onOpenDemoModal}
        aria-label="Book 30-minute diagnostic audit"
        className="group relative flex items-stretch gap-1.5 xs:gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#573681] focus-visible:ring-offset-2 transition-transform duration-200 hover:scale-[1.03] active:scale-95 filter drop-shadow-[0_12px_28px_rgba(26,0,66,0.28)]"
      >
        {/* ========================================================================= */}
        {/* 1. MAIN TEXT PILL (Angled Right Seam with SignalMint Obsidian Purple)     */}
        {/* ========================================================================= */}
        <div className="relative h-11 xs:h-12 sm:h-13 pl-5 pr-7 xs:pl-6 xs:pr-8 sm:pl-7 sm:pr-9 flex items-center justify-center text-white select-none">
          {/* Vector SVG Background (Pill Left + Angled Rounded Right) */}
          <svg
            className="absolute inset-0 w-full h-full text-[#1A0042] group-hover:text-[#250B4E] transition-colors duration-200 filter drop-shadow-sm"
            viewBox="0 0 100 48"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M 22 0 L 93 0 C 97.5 0 99.5 3 98.5 7.5 L 92.5 40.5 C 91.5 45 88.5 48 84 48 L 22 48 C 9.8 48 0 38.2 0 24 C 0 9.8 9.8 0 22 0 Z" />
          </svg>

          {/* Frosted Specular Sheen */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/18 via-transparent to-transparent pointer-events-none rounded-l-full" />

          {/* Text Content with Monospace Tracking */}
          <div className="relative z-10 flex items-center gap-2 font-mono font-bold text-[11px] xs:text-xs sm:text-[13px] tracking-[0.18em] uppercase text-white whitespace-nowrap pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)] shrink-0" />
            <span>BOOK AUDIT</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. ARROW PEBBLE (Angled Left Seam with SignalMint Lavender / Violet)       */}
        {/* ========================================================================= */}
        <div className="relative w-11 h-11 xs:w-12 xs:h-12 sm:w-13 sm:h-13 shrink-0 flex items-center justify-center select-none">
          {/* Vector SVG Background (Angled Left + Pill Right) */}
          <svg
            className="absolute inset-0 w-full h-full text-[#E7E6FB] group-hover:text-[#573681] transition-colors duration-200 filter drop-shadow-sm"
            viewBox="0 0 48 48"
            fill="currentColor"
          >
            <path d="M 12 0 L 24 0 C 37.3 0 48 10.7 48 24 C 48 37.3 37.3 48 24 48 L 4 48 C 0 48 -1.5 45 -0.5 40.5 L 5.5 7.5 C 6.5 3 9.5 0 14 0 Z" />
          </svg>

          {/* Frosted Specular Sheen */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent pointer-events-none rounded-r-full" />

          {/* Centered Dynamic Arrow Icon */}
          <ArrowRight className="relative z-10 w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#1A0042] group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5" />
        </div>
      </button>
    </aside>
  );
}
