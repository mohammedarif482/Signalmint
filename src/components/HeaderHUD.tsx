import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import signalMintLogo from "../assets/signalmintlogo.svg";

interface HeaderHUDProps {
  onOpenDemoModal?: () => void;
}

export function HeaderHUD({ onOpenDemoModal }: HeaderHUDProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"intro" | "features" | "agents" | "contact">("intro");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 120);

      // Simple active nav tracker
      if (scrollY < 600) {
        setActiveSection("intro");
      } else if (scrollY < 1800) {
        setActiveSection("features");
      } else if (scrollY < 3000) {
        setActiveSection("agents");
      } else {
        setActiveSection("contact");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 1. FIXED TOP HEADER BAR (Oryzo Style) */}
      <header
        className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-8 py-5 flex items-center justify-between pointer-events-none transition-all duration-300 ${
          isScrolled
            ? "bg-[#E7E6FB]/75 backdrop-blur-md border-b border-[#1A0042]/8 py-4 shadow-xs"
            : ""
        }`}
      >
        {/* Left: The Brand Wordmark (Origin in navbar, scaled/translated to Hero at scroll=0) */}
        <div id="nav-logo-slot" className="flex items-center pointer-events-auto relative z-20">
          <a
            href="#hero-runway"
            id="brand-unified-logo"
            className="block origin-top-left will-change-transform cursor-pointer select-none"
            title="SignalMint Home"
          >
            <img
              src={signalMintLogo}
              alt="SignalMint"
              className="h-6 sm:h-7 w-auto object-contain block"
            />
          </a>
        </div>

        {/* Right Nav Links: pointer-events-auto flex items-center gap-6 lg:gap-8 font-sans uppercase */}
        <div className="pointer-events-auto flex items-center gap-6 lg:gap-8">
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-sans tracking-[0.14em] uppercase">
            <a
              href="#hero-runway"
              className={`transition-colors duration-200 hover:text-[#4D0181] ${
                activeSection === "intro"
                  ? "text-[#1A0042] font-bold border-b border-dotted border-[#1A0042] pb-0.5"
                  : "text-[#1A0042]/70 font-semibold"
              }`}
            >
              INTRO
            </a>
            <a
              href="#showcase"
              className={`transition-colors duration-200 hover:text-[#4D0181] ${
                activeSection === "features"
                  ? "text-[#1A0042] font-bold border-b border-dotted border-[#1A0042] pb-0.5"
                  : "text-[#1A0042]/70 font-semibold"
              }`}
            >
              FEATURES
            </a>
            <a
              href="#agents"
              className={`transition-colors duration-200 hover:text-[#4D0181] ${
                activeSection === "agents"
                  ? "text-[#1A0042] font-bold border-b border-dotted border-[#1A0042] pb-0.5"
                  : "text-[#1A0042]/70 font-semibold"
              }`}
            >
              AGENTS
            </a>
            <button
              onClick={onOpenDemoModal}
              className={`transition-colors duration-200 hover:text-[#4D0181] cursor-pointer ${
                activeSection === "contact"
                  ? "text-[#1A0042] font-bold border-b border-dotted border-[#1A0042] pb-0.5"
                  : "text-[#1A0042]/70 font-semibold"
              }`}
            >
              CONTACT
            </button>
          </nav>

          {/* Quick Book Demo button on larger screens */}
          <button
            onClick={onOpenDemoModal}
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1516A8] hover:bg-[#1A0042] text-white text-[11px] font-sans font-bold tracking-wider uppercase transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <span>Demo</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-[#1A0042]/15 bg-white/85 backdrop-blur-md text-[#1A0042] cursor-pointer shadow-xs"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-50 md:hidden border-b border-[#1A0042]/10 bg-[#FAFAFD]/95 backdrop-blur-xl px-6 py-5 flex flex-col gap-3 shadow-xl">
          <a
            href="#hero-runway"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-sans font-semibold tracking-[0.14em] uppercase text-[#1A0042] py-2 border-b border-[#1A0042]/8"
          >
            INTRO
          </a>
          <a
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-sans font-semibold tracking-[0.14em] uppercase text-[#1A0042] py-2 border-b border-[#1A0042]/8"
          >
            FEATURES
          </a>
          <a
            href="#agents"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-sans font-semibold tracking-[0.14em] uppercase text-[#1A0042] py-2 border-b border-[#1A0042]/8"
          >
            AGENTS
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDemoModal?.();
            }}
            className="mt-2 w-full py-2.5 rounded-full bg-[#1516A8] text-white text-xs font-sans font-bold uppercase tracking-wider text-center cursor-pointer shadow-md"
          >
            BOOK DEMO
          </button>
        </div>
      )}

      {/* 2. RIGHT EDGE VERTICAL SPINE BADGE (Exact Oryzo Style) */}
      <aside
        className="fixed right-0 top-16 sm:top-20 z-40 bg-[#FAF7F2] px-2.5 sm:px-3 py-4 sm:py-6 rounded-none border-l border-y border-[#1A0042]/15 shadow-sm pointer-events-auto select-none transition-transform duration-200 hover:-translate-x-0.5 group"
        title="SignalMint System Active"
      >
        <div className="[writing-mode:vertical-rl] text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#1A0042] flex items-center gap-2 font-bold cursor-default">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1A0042] mb-0.5"></span>
          <span>SIGNALMINT-1 MODEL</span>
        </div>
      </aside>
    </>
  );
}
