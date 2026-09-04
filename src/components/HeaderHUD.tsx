import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface HeaderHUDProps {
  onOpenDemoModal?: () => void;
}

export function HeaderHUD({ onOpenDemoModal }: HeaderHUDProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 backdrop-blur-md ${
        isScrolled
          ? "bg-[#E7E6FB]/90 py-2.5 shadow-sm border-b border-[#1A0042]/10"
          : "bg-[#E7E6FB]/80 py-3.5 border-b border-[#1A0042]/8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Left: SignalMint Logo (Nodal icon + clean text) */}
        <a href="#" className="flex items-center gap-2.5 group select-none">
          <div className="w-7 h-7 rounded-md bg-[#1A0042] flex items-center justify-center overflow-hidden shadow-xs transition-transform duration-200 group-hover:scale-105">
            <svg
              viewBox="0 0 40 40"
              className="w-5 h-5 text-[#E7E6FB]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="14" stroke="#6495EB" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              <path
                d="M10 20C13 14 17 14 20 20C23 26 27 26 30 20"
                stroke="#E7E6FB"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="20" cy="20" r="3.5" fill="#1516A8" stroke="#E7E6FB" strokeWidth="1.5" />
            </svg>
          </div>
          <span className="font-extrabold text-lg tracking-tight text-[#1A0042]">
            Signal<span className="text-[#1516A8]">Mint</span>
          </span>
        </a>

        {/* Right: Clean text links + compact Book Demo pill */}
        <div className="flex items-center gap-6 sm:gap-8">
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#1A0042]/80">
            <a href="#agents" className="hover:text-[#1516A8] transition-colors">
              Scout
            </a>
            <a href="#agents" className="hover:text-[#1516A8] transition-colors">
              Atlas
            </a>
            <a href="#matrix" className="hover:text-[#1516A8] transition-colors">
              Pricing
            </a>
          </nav>

          <button
            onClick={onOpenDemoModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1516A8] hover:bg-[#1A0042] text-white text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <span>Book Demo</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg border border-[#1A0042]/10 bg-white/70 text-[#1A0042]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1A0042]/10 bg-[#E7E6FB]/95 px-6 py-4 flex flex-col gap-3">
          <a
            href="#agents"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#1A0042] hover:text-[#1516A8]"
          >
            Scout
          </a>
          <a
            href="#agents"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#1A0042] hover:text-[#1516A8]"
          >
            Atlas
          </a>
          <a
            href="#matrix"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-[#1A0042] hover:text-[#1516A8]"
          >
            Pricing
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDemoModal?.();
            }}
            className="mt-2 w-full py-2.5 rounded-full bg-[#1516A8] text-white text-xs font-semibold text-center"
          >
            Book Demo
          </button>
        </div>
      )}
    </header>
  );
}
