import { useState, useEffect } from "react";
import { X, ArrowUpRight } from "lucide-react";
import signalMintLogo from "../assets/signalmintlogo.svg";

interface HeaderHUDProps {
  onOpenDemoModal?: () => void;
}

export function HeaderHUD({ onOpenDemoModal }: HeaderHUDProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"intro" | "why-us" | "services" | "proof" | "how-we-work" | "contact">("intro");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 120);

      // Active nav section tracker
      if (scrollY < 600) {
        setActiveSection("intro");
      } else if (scrollY < 1600) {
        setActiveSection("why-us");
      } else if (scrollY < 2600) {
        setActiveSection("services");
      } else if (scrollY < 3800) {
        setActiveSection("proof");
      } else if (scrollY < 4800) {
        setActiveSection("how-we-work");
      } else {
        setActiveSection("contact");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top blur backdrop fading down with no bottom border, no color, and no shadow */}
      <div
        className={`fixed top-0 left-0 right-0 h-24 pointer-events-none z-40 backdrop-blur-md transition-opacity duration-300 [mask-image:linear-gradient(to_bottom,black_0px,black_60px,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0px,black_60px,transparent_100%)] ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* 1. FIXED TOP HEADER BAR (Oryzo Style) */}
      <header
        className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-8 py-5 flex items-center justify-between pointer-events-none transition-all duration-300 ${
          isScrolled ? "py-4" : ""
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
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-sans tracking-[0.06em] uppercase">
            <a
              href="#hero-runway"
              className={`transition-colors duration-200 hover:text-[#1516A8] ${
                activeSection === "intro"
                  ? "text-[#1A0042] font-bold border-b border-dotted border-[#1A0042] pb-0.5"
                  : "text-[#1A0042]/70 font-semibold"
              }`}
            >
              INTRO
            </a>
            <a
              href="#agents"
              className={`transition-colors duration-200 hover:text-[#1516A8] ${
                activeSection === "why-us"
                  ? "text-[#1A0042] font-bold border-b border-dotted border-[#1A0042] pb-0.5"
                  : "text-[#1A0042]/70 font-semibold"
              }`}
            >
              WHY US
            </a>
            <a
              href="#services"
              className={`transition-colors duration-200 hover:text-[#1516A8] ${
                activeSection === "services"
                  ? "text-[#1A0042] font-bold border-b border-dotted border-[#1A0042] pb-0.5"
                  : "text-[#1A0042]/70 font-semibold"
              }`}
            >
              SERVICES
            </a>
            <a
              href="#proof"
              className={`transition-colors duration-200 hover:text-[#1516A8] ${
                activeSection === "proof"
                  ? "text-[#1A0042] font-bold border-b border-dotted border-[#1A0042] pb-0.5"
                  : "text-[#1A0042]/70 font-semibold"
              }`}
            >
              PROOF
            </a>
            <a
              href="#how-we-work"
              className={`transition-colors duration-200 hover:text-[#1516A8] ${
                activeSection === "how-we-work"
                  ? "text-[#1A0042] font-bold border-b border-dotted border-[#1A0042] pb-0.5"
                  : "text-[#1A0042]/70 font-semibold"
              }`}
            >
              HOW WE WORK
            </a>
            <button
              onClick={onOpenDemoModal}
              className="transition-colors duration-200 hover:text-[#1516A8] cursor-pointer text-[#1A0042]/70 font-semibold"
            >
              CONTACT
            </button>
          </nav>

          {/* Quick Book Audit button on larger screens */}
          <button
            onClick={onOpenDemoModal}
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A0042] hover:bg-[#1516A8] text-white text-[11px] font-sans font-bold tracking-[0.04em] uppercase transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <span>Book Audit</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>

          {/* Mobile menu toggle: Oryzo reference dashed border • MENU pill */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden px-3.5 py-1.5 rounded-full border border-dashed border-[#1A0042]/35 bg-white/40 backdrop-blur-md text-[#1A0042] font-mono text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <>
                <X className="w-3 h-3" />
                <span>CLOSE</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A0042]" />
                <span>MENU</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-50 md:hidden border-b border-[#1A0042]/10 bg-[#FAFAFD]/95 backdrop-blur-xl px-6 py-5 flex flex-col gap-3 shadow-xl font-sans">
          <a
            href="#hero-runway"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-semibold tracking-[0.06em] uppercase text-[#1A0042] py-2 border-b border-[#1A0042]/8"
          >
            INTRO
          </a>
          <a
            href="#agents"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-semibold tracking-[0.06em] uppercase text-[#1A0042] py-2 border-b border-[#1A0042]/8"
          >
            WHY US
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-semibold tracking-[0.06em] uppercase text-[#1A0042] py-2 border-b border-[#1A0042]/8"
          >
            SERVICES
          </a>
          <a
            href="#proof"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-semibold tracking-[0.06em] uppercase text-[#1A0042] py-2 border-b border-[#1A0042]/8"
          >
            PROOF (CASE STUDIES)
          </a>
          <a
            href="#how-we-work"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs font-semibold tracking-[0.06em] uppercase text-[#1A0042] py-2 border-b border-[#1A0042]/8"
          >
            HOW WE WORK
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDemoModal?.();
            }}
            className="mt-2 w-full py-2.5 rounded-full bg-[#1516A8] hover:bg-[#1A0042] text-white text-xs font-sans font-bold uppercase tracking-[0.04em] text-center cursor-pointer shadow-md transition-all"
          >
            BOOK 30-MIN AUDIT
          </button>
        </div>
      )}

      {/* 2. RIGHT EDGE VERTICAL SPINE BADGE */}
      <aside
        className="fixed right-0 top-16 sm:top-20 z-40 bg-[#FAF7F2] px-2.5 sm:px-3 py-4 sm:py-6 rounded-none border-l border-y border-[#1A0042]/15 shadow-sm pointer-events-auto select-none transition-transform duration-200 hover:-translate-x-0.5 group"
        title="SignalMint Performance Marketing Agency"
      >
        <div className="[writing-mode:vertical-rl] text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.08em] text-[#1A0042] flex items-center gap-2 font-black cursor-default">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1516A8] mb-0.5"></span>
          <span>AUDIT-FIRST AGENCY</span>
        </div>
      </aside>
    </>
  );
}
