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
      setIsScrolled(scrollY > 60);

      // Section mapping by exact DOM ID in visual order
      const sectionIds: Array<{ id: string; key: "intro" | "why-us" | "services" | "proof" | "how-we-work" | "contact" }> = [
        { id: "hero-runway", key: "intro" },
        { id: "agents", key: "why-us" },
        { id: "services", key: "services" },
        { id: "proof", key: "proof" },
        { id: "how-we-work", key: "how-we-work" },
        { id: "contact", key: "contact" },
      ];

      // Check if user is near bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection("contact");
        return;
      }

      // Check if at the very top of the page
      if (scrollY < 80) {
        setActiveSection("intro");
        return;
      }

      // Focal threshold: when section top reaches upper 35% of the viewport
      const focalZone = window.innerHeight * 0.35;
      let currentSection: "intro" | "why-us" | "services" | "proof" | "how-we-work" | "contact" = "intro";

      for (const { id, key } of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // The last section that has reached or passed the focal line is active
          if (rect.top <= focalZone) {
            currentSection = key;
          }
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, key: "intro" | "why-us" | "services" | "proof" | "how-we-work" | "contact") => {
    e.preventDefault();
    setActiveSection(key);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

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
            onClick={(e) => handleNavClick(e, "hero-runway", "intro")}
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
              onClick={(e) => handleNavClick(e, "hero-runway", "intro")}
              className={`transition-colors duration-200 hover:text-[#573681] ${
                activeSection === "intro"
                  ? "text-[#1A0042] font-bold border-b border-dotted border-[#1A0042] pb-0.5"
                  : "text-[#1A0042]/70 font-semibold"
              }`}
            >
              INTRO
            </a>
            <a
              href="#agents"
              onClick={(e) => handleNavClick(e, "agents", "why-us")}
              className={`transition-colors duration-200 hover:text-[#573681] ${
                activeSection === "why-us"
                  ? "text-[#1A0042] font-bold border-b border-dotted border-[#1A0042] pb-0.5"
                  : "text-[#1A0042]/70 font-semibold"
              }`}
            >
              WHY US
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, "services", "services")}
              className={`transition-colors duration-200 hover:text-[#573681] ${
                activeSection === "services"
                  ? "text-[#1A0042] font-bold border-b border-dotted border-[#1A0042] pb-0.5"
                  : "text-[#1A0042]/70 font-semibold"
              }`}
            >
              SERVICES
            </a>
            <a
              href="#proof"
              onClick={(e) => handleNavClick(e, "proof", "proof")}
              className={`transition-colors duration-200 hover:text-[#573681] ${
                activeSection === "proof"
                  ? "text-[#1A0042] font-bold border-b border-dotted border-[#1A0042] pb-0.5"
                  : "text-[#1A0042]/70 font-semibold"
              }`}
            >
              PROOF
            </a>
            <a
              href="#how-we-work"
              onClick={(e) => handleNavClick(e, "how-we-work", "how-we-work")}
              className={`transition-colors duration-200 hover:text-[#573681] ${
                activeSection === "how-we-work"
                  ? "text-[#1A0042] font-bold border-b border-dotted border-[#1A0042] pb-0.5"
                  : "text-[#1A0042]/70 font-semibold"
              }`}
            >
              HOW WE WORK
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact", "contact")}
              className={`transition-colors duration-200 hover:text-[#573681] ${
                activeSection === "contact"
                  ? "text-[#1A0042] font-bold border-b border-dotted border-[#1A0042] pb-0.5"
                  : "text-[#1A0042]/70 font-semibold"
              }`}
            >
              CONTACT
            </a>
          </nav>

          {/* Quick Book Audit button on larger screens */}
          <button
            onClick={onOpenDemoModal}
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#573681] hover:bg-[#1A0042] text-white text-[11px] font-sans font-bold tracking-[0.04em] uppercase transition-all duration-200 shadow-xs active:scale-95 cursor-pointer"
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

      {/* Mobile Full-Screen Menu Overlay with Backdrop Filter / Blur */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 md:hidden bg-[#FAFAFD]/25 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 animate-in fade-in duration-200"
          style={{ overscrollBehavior: "contain" }}
        >
          {/* Top Bar inside Fullscreen overlay */}
          <div className="flex items-center justify-between pt-2 pb-6 border-b border-[#1A0042]/10">
            <a
              href="#hero-runway"
              onClick={(e) => handleNavClick(e, "hero-runway", "intro")}
              className="flex items-center"
            >
              <img
                src={signalMintLogo}
                alt="SignalMint"
                className="h-6 w-auto object-contain block"
              />
            </a>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-1.5 rounded-full border border-[#1A0042]/20 bg-white/70 backdrop-blur-md text-[#1A0042] font-mono text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
              aria-label="Close menu"
            >
              <X className="w-3.5 h-3.5" />
              <span>CLOSE</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center py-6 space-y-3 sm:space-y-5">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#573681] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#573681]" />
              <span>NAVIGATION DIRECTORY</span>
            </div>

            <a
              href="#hero-runway"
              onClick={(e) => handleNavClick(e, "hero-runway", "intro")}
              className={`font-headline font-semibold text-2xl sm:text-3xl uppercase tracking-tight hover:text-[#573681] transition-colors py-1 flex items-center justify-between group ${
                activeSection === "intro" ? "text-[#573681]" : "text-[#1A0042]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                {activeSection === "intro" && <span className="w-2 h-2 rounded-full bg-[#573681]" />}
                <span>Intro</span>
              </span>
              <span className="text-xs font-mono text-[#1A0042]/40 group-hover:text-[#573681] group-hover:translate-x-1 transition-all">↗</span>
            </a>

            <a
              href="#agents"
              onClick={(e) => handleNavClick(e, "agents", "why-us")}
              className={`font-headline font-semibold text-2xl sm:text-3xl uppercase tracking-tight hover:text-[#573681] transition-colors py-1 flex items-center justify-between group ${
                activeSection === "why-us" ? "text-[#573681]" : "text-[#1A0042]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                {activeSection === "why-us" && <span className="w-2 h-2 rounded-full bg-[#573681]" />}
                <span>Why Us</span>
              </span>
              <span className="text-xs font-mono text-[#1A0042]/40 group-hover:text-[#573681] group-hover:translate-x-1 transition-all">↗</span>
            </a>

            <a
              href="#services"
              onClick={(e) => handleNavClick(e, "services", "services")}
              className={`font-headline font-semibold text-2xl sm:text-3xl uppercase tracking-tight hover:text-[#573681] transition-colors py-1 flex items-center justify-between group ${
                activeSection === "services" ? "text-[#573681]" : "text-[#1A0042]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                {activeSection === "services" && <span className="w-2 h-2 rounded-full bg-[#573681]" />}
                <span>Services</span>
              </span>
              <span className="text-xs font-mono text-[#1A0042]/40 group-hover:text-[#573681] group-hover:translate-x-1 transition-all">↗</span>
            </a>

            <a
              href="#proof"
              onClick={(e) => handleNavClick(e, "proof", "proof")}
              className={`font-headline font-semibold text-2xl sm:text-3xl uppercase tracking-tight hover:text-[#573681] transition-colors py-1 flex items-center justify-between group ${
                activeSection === "proof" ? "text-[#573681]" : "text-[#1A0042]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                {activeSection === "proof" && <span className="w-2 h-2 rounded-full bg-[#573681]" />}
                <span>Proof</span>
              </span>
              <span className="text-xs font-mono text-[#1A0042]/40 group-hover:text-[#573681] group-hover:translate-x-1 transition-all">↗</span>
            </a>

            <a
              href="#how-we-work"
              onClick={(e) => handleNavClick(e, "how-we-work", "how-we-work")}
              className={`font-headline font-semibold text-2xl sm:text-3xl uppercase tracking-tight hover:text-[#573681] transition-colors py-1 flex items-center justify-between group ${
                activeSection === "how-we-work" ? "text-[#573681]" : "text-[#1A0042]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                {activeSection === "how-we-work" && <span className="w-2 h-2 rounded-full bg-[#573681]" />}
                <span>How We Work</span>
              </span>
              <span className="text-xs font-mono text-[#1A0042]/40 group-hover:text-[#573681] group-hover:translate-x-1 transition-all">↗</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact", "contact")}
              className={`font-headline font-semibold text-2xl sm:text-3xl uppercase tracking-tight hover:text-[#573681] transition-colors py-1 flex items-center justify-between group ${
                activeSection === "contact" ? "text-[#573681]" : "text-[#1A0042]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                {activeSection === "contact" && <span className="w-2 h-2 rounded-full bg-[#573681]" />}
                <span>Contact</span>
              </span>
              <span className="text-xs font-mono text-[#1A0042]/40 group-hover:text-[#573681] group-hover:translate-x-1 transition-all">↗</span>
            </a>
          </div>

          {/* Bottom Action & Footer Meta in Full-Screen Menu */}
          <div className="pt-6 border-t border-[#1A0042]/10 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal?.();
              }}
              className="w-full py-4 rounded-2xl bg-[#573681] hover:bg-[#1A0042] text-white text-xs font-mono font-bold uppercase tracking-wider text-center cursor-pointer shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>BOOK 30-MIN AUDIT</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#1A0042]/60 px-1">
              <span>BOM-01 // AUDIT PIPELINE</span>
              <span>AI NATIVE, PERFORMANCE MARKETING</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. RIGHT EDGE VERTICAL SPINE BADGE */}
      <aside
        className="fixed right-0 top-16 sm:top-20 z-40 bg-[#FAF7F2] px-2.5 sm:px-3 py-4 sm:py-6 rounded-none border-l border-y border-[#1A0042]/15 shadow-sm pointer-events-auto select-none transition-transform duration-200 hover:-translate-x-0.5 group"
        title="SignalMint Performance Marketing Agency"
      >
        <div className="[writing-mode:vertical-rl] text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.08em] text-[#1A0042] flex items-center gap-2 font-black cursor-default">
          <span className="w-1.5 h-1.5 rounded-full bg-[#573681] mb-0.5"></span>
          <span>AUDIT-FIRST AGENCY</span>
        </div>
      </aside>
    </>
  );
}
