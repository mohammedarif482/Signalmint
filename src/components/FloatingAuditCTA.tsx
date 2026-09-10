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
        className="group relative flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#573681] focus-visible:ring-offset-2 transition-transform duration-200 hover:scale-[1.03] active:scale-95 filter drop-shadow-[0_12px_28px_rgba(26,0,66,0.18)]"
      >
        {/* ========================================================================= */}
        {/* 1. MAIN TEXT PILL (Ageeva-style: Smooth Rounded Skew, Zero Sharp Knives)   */}
        {/* ========================================================================= */}
        <div 
          className="relative h-11 sm:h-12 px-6 sm:px-7 flex items-center justify-center bg-white/80 hover:bg-white/95 backdrop-blur-xl text-[#573681] border border-white/80 shadow-xs transition-all duration-200 rounded-[15px] sm:rounded-[17px] select-none"
          style={{
            transform: "skewX(9deg)",
          }}
        >
          {/* Counter-skewed text container so letters remain perfectly vertical */}
          <div style={{ transform: "skewX(-9deg)" }}>
            <span className="font-mono font-bold text-[11px] sm:text-xs tracking-[0.16em] uppercase whitespace-nowrap pt-0.5">
              BOOK AUDIT
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. ARROW PEBBLE (Ageeva-style: Smooth Rounded Skew, #573681 Violet)        */}
        {/* ========================================================================= */}
        <div 
          className="relative w-11 h-11 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center bg-[#573681] group-hover:bg-[#482878] text-white shadow-xs transition-all duration-200 rounded-[13px] sm:rounded-[15px]"
          style={{
            transform: "skewX(9deg)",
          }}
        >
          {/* Counter-skewed arrow container so arrow points strictly horizontal */}
          <div 
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            style={{ transform: "skewX(-9deg)" }}
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </button>
    </aside>
  );
}
