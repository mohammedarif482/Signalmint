import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface FloatingAuditCTAProps {
  onOpenDemoModal: () => void;
  isVisible?: boolean;
}

export function FloatingAuditCTA({ onOpenDemoModal, isVisible = true }: FloatingAuditCTAProps) {
  const [mounted, setMounted] = useState(false);
  const [isHero, setIsHero] = useState(true);
  const [isPastFAQ, setIsPastFAQ] = useState(false);

  useEffect(() => {
    // Smooth entrance after initial render
    const timer = setTimeout(() => setMounted(true), 350);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let faqResizeObserver: ResizeObserver | null = null;

    const checkPosition = () => {
      // In hero section if scrolled less than 160px; glides to bottom-center past it
      const inHero = window.scrollY < 160;
      setIsHero(inHero);

      // Check if scrolled past FAQ section
      const faqEl = document.getElementById("faq");
      if (faqEl) {
        if (!faqResizeObserver && typeof ResizeObserver !== "undefined") {
          faqResizeObserver = new ResizeObserver(() => checkPosition());
          faqResizeObserver.observe(faqEl);
        }
        const rect = faqEl.getBoundingClientRect();
        // Dissolve/disappear once the bottom of the FAQ section reaches or scrolls past the viewport bottom
        const past = rect.bottom <= window.innerHeight;
        setIsPastFAQ(past);
      } else {
        if (faqResizeObserver) {
          faqResizeObserver.disconnect();
          faqResizeObserver = null;
        }
        setIsPastFAQ(false);
      }
    };

    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition, { passive: true });
    checkPosition();

    return () => {
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
      if (faqResizeObserver) {
        faqResizeObserver.disconnect();
      }
    };
  }, []);

  if (!isVisible) return null;

  const shouldShow = mounted && !isPastFAQ;

  return (
    <aside
      aria-label="Floating Action"
      aria-hidden={!shouldShow}
      style={{
        left: isHero ? "calc(100% - var(--hero-right-inset, 1.25rem))" : "50%",
        transform: `${isHero ? "translateX(-100%)" : "translateX(-50%)"} translateY(${shouldShow ? "0px" : "20px"}) scale(${shouldShow ? 1 : 0.94})`,
        opacity: shouldShow ? 1 : 0,
        pointerEvents: shouldShow ? "auto" : "none",
        transition: "left 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out",
      }}
      className="fixed bottom-5 xs:bottom-6 sm:bottom-8 z-50 select-none [--hero-right-inset:1rem] xs:[--hero-right-inset:1.5rem] sm:[--hero-right-inset:2.5rem]"
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
