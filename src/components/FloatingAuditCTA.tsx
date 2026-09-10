import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface FloatingAuditCTAProps {
  onOpenDemoModal: () => void;
  isVisible?: boolean;
}

export function FloatingAuditCTA({ onOpenDemoModal, isVisible = true }: FloatingAuditCTAProps) {
  const [mounted, setMounted] = useState(false);
  const [isHero, setIsHero] = useState(true);

  useEffect(() => {
    // Smooth entrance after initial render
    const timer = setTimeout(() => setMounted(true), 350);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // In hero section if scrolled less than 160px; glides to bottom-center past it
      const inHero = window.scrollY < 160;
      setIsHero(inHero);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Floating Action"
      style={{
        left: isHero ? "calc(100% - var(--hero-right-inset, 1.25rem))" : "50%",
        transform: isHero ? "translateX(-100%)" : "translateX(-50%)",
        transition: "left 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out",
      }}
      className={`fixed bottom-5 xs:bottom-6 sm:bottom-8 z-50 select-none [--hero-right-inset:1rem] xs:[--hero-right-inset:1.5rem] sm:[--hero-right-inset:2.5rem] ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={onOpenDemoModal}
        aria-label="Book 30-minute diagnostic audit"
        className="group relative flex items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#573681] focus-visible:ring-offset-2 transition-transform duration-200 hover:scale-[1.03] active:scale-95 filter drop-shadow-[0_12px_28px_rgba(26,0,66,0.22)]"
      >
        {/* ========================================================================= */}
        {/* 1. MAIN TEXT PILL (#573681 Signature Violet with White Text, No Dot)      */}
        {/* ========================================================================= */}
        <div className="relative h-11 sm:h-12 flex items-stretch">
          {/* Main Body in #573681 with 18px rounded-left corners */}
          <div className="h-full pl-5 sm:pl-6 pr-1.5 flex items-center bg-[#573681] group-hover:bg-[#482878] transition-colors duration-200 rounded-l-[16px] sm:rounded-l-[18px]">
            <span className="font-mono font-bold text-[11px] sm:text-xs tracking-[0.16em] uppercase text-white whitespace-nowrap pt-0.5">
              BOOK AUDIT
            </span>
          </div>

          {/* Precision Slanted Vector Cap in #573681 (Fixed 16px width) */}
          <svg
            className="w-4 h-full shrink-0 text-[#573681] group-hover:text-[#482878] transition-colors duration-200 -ml-[1px]"
            viewBox="0 0 16 48"
            fill="currentColor"
            preserveAspectRatio="none"
          >
            <path d="M 0 0 L 9 0 C 13 0 15.5 2.5 15 6.5 L 9.5 41.5 C 9 45.5 6.5 48 2.5 48 L 0 48 Z" />
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* 2. ARROW PEBBLE (Frosted Glass Background with #573681 Arrow)              */}
        {/* ========================================================================= */}
        <div 
          className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center bg-white/70 hover:bg-[#573681] text-[#573681] hover:text-white backdrop-blur-xl border border-white/80 hover:border-[#573681] shadow-xs transition-all duration-200"
          style={{
            borderRadius: "10px 18px 18px 10px",
            clipPath: "polygon(14% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        >
          {/* Centered Dynamic Arrow Icon */}
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </div>
      </button>
    </aside>
  );
}
