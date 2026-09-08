import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Client Brand Logos from assets/trustedby/
import aainaLogo from "../assets/trustedby/Aaina Logo.png";
import bircklesLogo from "../assets/trustedby/Birckles Logo.svg";
import boldEdgeLogo from "../assets/trustedby/Bold Edge Logo.png";
import casorroLogo from "../assets/trustedby/Casorro Logo.png";
import drewknotLogo from "../assets/trustedby/Drewknot Logo.avif";
import ecosysLogo from "../assets/trustedby/Ecosys Logo.avif";
import farmzenLogo from "../assets/trustedby/FarmZen Logo.png";
import gettoLogo from "../assets/trustedby/Getto Logo.png";
import gut2goLogo from "../assets/trustedby/Gut2Go Logo.png";
import happyCystersLogo from "../assets/trustedby/HappyCysters Logo.webp";
import humaraPanditLogo from "../assets/trustedby/Humara Pandit Logo.png";
import imsafeLogo from "../assets/trustedby/Imsafe Logo.png";
import inayaLogo from "../assets/trustedby/Inaya Logo.webp";
import km20Logo from "../assets/trustedby/KM20 Logo.png";
import kuhlteenLogo from "../assets/trustedby/Kuhlteen logo.svg";
import loanpaarLogo from "../assets/trustedby/LoanPaar Logo.png";
import lovedkLogo from "../assets/trustedby/LoveDK Logo.avif";
import oszeaLogo from "../assets/trustedby/Oszea Logo.webp";
import pureWiffLogo from "../assets/trustedby/Pure Wiff Logo.avif";
import sugarKnockerLogo from "../assets/trustedby/Sugar Knocker Logo.png";
import teaquilaLogo from "../assets/trustedby/Teaquila Logo.png";
import theartLogo from "../assets/trustedby/The ArtFlex Logo.png";
import truSenseLogo from "../assets/trustedby/TruSense Logo.png";
import tulipsLogo from "../assets/trustedby/Tulips Logo.png";
import ultraMileLogo from "../assets/trustedby/UltraMile Logo.png";
import v2EdiblesLogo from "../assets/trustedby/V2 Edibles Logo.svg";
import zociLogo from "../assets/trustedby/Zoci Logo.jpg";

gsap.registerPlugin(ScrollTrigger);

interface TrustedByProps {
  onOpenDemoModal?: () => void;
}

export interface BrandPartner {
  id: string;
  name: string;
  category: string;
  metric: string;
  logo: string;
  hasTilt?: boolean;
}

export interface BrandColumn {
  id: string;
  offsetClass: string;
  brands: BrandPartner[];
}

// 27 Verified Client Brands Structured into 15 Masonry Columns (Pinterest "one-up, one-down" arch layout)
export const BRAND_COLUMNS: BrandColumn[] = [
  // Col 1: Down offset
  {
    id: "col-1",
    offsetClass: "translate-y-1.5 sm:translate-y-3",
    brands: [
      { id: "b1", name: "Gut2Go", category: "Nutrition", metric: "4.6x ROAS", logo: gut2goLogo },
      { id: "b2", name: "Birckles", category: "D2C Apparel", metric: "5.4x ROAS", logo: bircklesLogo },
    ],
  },
  // Col 2: Up offset
  {
    id: "col-2",
    offsetClass: "-translate-y-1.5 sm:-translate-y-3",
    brands: [
      { id: "b3", name: "Kuhlteen", category: "Gen-Z Brand", metric: "-36% CPA", logo: kuhlteenLogo },
      { id: "b4", name: "Sugar Knocker", category: "Ayurvedic Care", metric: "₹1.1Cr Vol", logo: sugarKnockerLogo },
    ],
  },
  // Col 3: Down offset
  {
    id: "col-3",
    offsetClass: "translate-y-1 sm:translate-y-2",
    brands: [
      { id: "b5", name: "Teaquila", category: "Energy Drinks", metric: "+128% Hold", logo: teaquilaLogo },
      { id: "b6", name: "The ArtFlex", category: "Design Living", metric: "12m SLA", logo: theartLogo },
    ],
  },
  // Col 4: Up offset
  {
    id: "col-4",
    offsetClass: "-translate-y-2 sm:-translate-y-3.5",
    brands: [
      { id: "b7", name: "HappyCysters", category: "Hormonal Health", metric: "₹48L/mo", logo: happyCystersLogo },
      { id: "b8", name: "Bold Edge", category: "Media Scaling", metric: "₹92L/mo", logo: boldEdgeLogo },
    ],
  },
  // Col 5: Centerpiece Single Card
  {
    id: "col-5",
    offsetClass: "translate-y-0",
    brands: [
      { id: "b9", name: "Inaya", category: "Skincare DTC", metric: "5.1x ROAS", logo: inayaLogo },
    ],
  },
  // Col 6: Up offset
  {
    id: "col-6",
    offsetClass: "-translate-y-1.5 sm:-translate-y-3",
    brands: [
      { id: "b10", name: "LoveDK", category: "Personal Care", metric: "3.9x MER", logo: lovedkLogo },
      { id: "b11", name: "Imsafe", category: "Hygiene Tech", metric: "Audited SLA", logo: imsafeLogo, hasTilt: true },
    ],
  },
  // Col 7: Down offset
  {
    id: "col-7",
    offsetClass: "translate-y-2 sm:translate-y-3.5",
    brands: [
      { id: "b12", name: "Ecosys Cleaners", category: "Eco Solutions", metric: "6.2x Angle", logo: ecosysLogo },
      { id: "b13", name: "Pure Wiff", category: "Fragrance DTC", metric: "₹35L/mo", logo: pureWiffLogo },
    ],
  },
  // Col 8: Up offset
  {
    id: "col-8",
    offsetClass: "-translate-y-2 sm:-translate-y-3",
    brands: [
      { id: "b14", name: "Casorro", category: "Luxury Living", metric: "4.8x ROAS", logo: casorroLogo },
      { id: "b15", name: "Drewknot", category: "Fashion DTC", metric: "3.7x MER", logo: drewknotLogo },
    ],
  },
  // Col 9: Down offset
  {
    id: "col-9",
    offsetClass: "translate-y-1.5 sm:translate-y-3",
    brands: [
      { id: "b16", name: "FarmZen", category: "Organic Agri", metric: "₹65L/mo", logo: farmzenLogo },
      { id: "b17", name: "Getto", category: "Urban Mobility", metric: "-42% CAC", logo: gettoLogo },
    ],
  },
  // Col 10: Up offset
  {
    id: "col-10",
    offsetClass: "-translate-y-1.5 sm:-translate-y-2.5",
    brands: [
      { id: "b18", name: "Humara Pandit", category: "Spiritual Tech", metric: "₹80L/mo", logo: humaraPanditLogo },
      { id: "b19", name: "KM20", category: "Active Gear", metric: "5.8x ROAS", logo: km20Logo },
    ],
  },
  // Col 11: Single Centerpiece
  {
    id: "col-11",
    offsetClass: "translate-y-0",
    brands: [
      { id: "b20", name: "LoanPaar", category: "FinTech Scale", metric: "₹2.4Cr Vol", logo: loanpaarLogo },
    ],
  },
  // Col 12: Up offset
  {
    id: "col-12",
    offsetClass: "-translate-y-2 sm:-translate-y-3.5",
    brands: [
      { id: "b21", name: "Oszea", category: "Wellness DTC", metric: "4.2x ROAS", logo: oszeaLogo },
      { id: "b22", name: "TruSense", category: "Diagnostics", metric: "+95% Ret.", logo: truSenseLogo },
    ],
  },
  // Col 13: Down offset
  {
    id: "col-13",
    offsetClass: "translate-y-2 sm:translate-y-3",
    brands: [
      { id: "b23", name: "Tulips", category: "Personal Hygiene", metric: "₹1.8Cr Vol", logo: tulipsLogo },
      { id: "b24", name: "UltraMile", category: "Auto & Tires", metric: "3.4x MER", logo: ultraMileLogo },
    ],
  },
  // Col 14: Up offset
  {
    id: "col-14",
    offsetClass: "-translate-y-1.5 sm:-translate-y-3",
    brands: [
      { id: "b25", name: "V2 Edibles", category: "FMCG Nutrition", metric: "+140% LTV", logo: v2EdiblesLogo },
      { id: "b26", name: "Zoci", category: "Modern Retail", metric: "4.5x ROAS", logo: zociLogo },
    ],
  },
  // Col 15: Clean anchor
  {
    id: "col-15",
    offsetClass: "translate-y-1 sm:translate-y-2",
    brands: [
      { id: "b27", name: "Aaina", category: "Ethnic Apparel", metric: "5.2x ROAS", logo: aainaLogo },
    ],
  },
];

export function TrustedBySection({ onOpenDemoModal: _onOpenDemoModal }: TrustedByProps = {}) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const [activeBrand, setActiveBrand] = useState<BrandPartner | null>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    const textBlock = textBlockRef.current;
    if (!runway || !sticky || !track || !textBlock) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP & TABLET: Pinned Horizontal Masonry Scroll
      mm.add("(min-width: 640px)", () => {
        const getScrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 140);

        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: runway,
            start: "top top",
            end: () => `+=${getScrollDistance() * 0.95}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // Horizontal scrub of the entire staggered masonry canopy
        scrubTl.to(
          track,
          {
            x: () => -getScrollDistance(),
            ease: "none",
            duration: 1,
          },
          0
        );

        // Subtly sharpen title block as user scrolls in
        scrubTl.fromTo(
          textBlock,
          { opacity: 0.9, y: -6 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 },
          0
        );
      });

      // Refresh ScrollTrigger when window resizes
      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, runway);

    return () => ctx.revert();
  }, []);

  // Brand Logo Card Component
  const renderLogoCard = (brand: BrandPartner, extraClasses = "") => {
    const isActive = activeBrand?.id === brand.id;

    return (
      <div
        key={brand.id}
        onClick={() => setActiveBrand(isActive ? null : brand)}
        onMouseEnter={() => setActiveBrand(brand)}
        onMouseLeave={() => setActiveBrand(null)}
        className={`group relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 lg:p-3.5 bg-white/95 backdrop-blur-md border ${
          isActive
            ? "border-[#573681] shadow-lg scale-[1.03]"
            : "border-[#1A0042]/10 hover:border-[#573681]/45 shadow-xs hover:shadow-xl hover:scale-[1.03]"
        } transition-all duration-300 flex flex-col items-center justify-between cursor-pointer w-full h-[110px] xs:h-[118px] sm:h-[128px] lg:h-[138px] select-none ${
          brand.hasTilt ? "[transform:perspective(800px)_rotateY(-5deg)] hover:[transform:perspective(800px)_rotateY(0deg)]" : ""
        } ${extraClasses}`}
      >
        {/* Subtle internal radial highlight on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E7E6FB]/35 via-transparent to-[#573681]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl sm:rounded-3xl pointer-events-none" />

        {/* Top subtle category pill */}
        <div className="w-full flex items-center justify-between z-10">
          <span className="font-mono text-[7px] sm:text-[8px] uppercase font-bold text-[#1A0042]/45 tracking-wider group-hover:text-[#573681] transition-colors line-clamp-1">
            {brand.category}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#573681]/30 group-hover:bg-[#573681] group-hover:animate-ping transition-colors shrink-0" />
        </div>

        {/* Centered Brand Logo */}
        <div className="flex-1 w-full flex items-center justify-center py-1 z-10 px-1 sm:px-2">
          <img
            src={brand.logo}
            alt={brand.name}
            className="max-h-7 sm:max-h-8.5 lg:max-h-9.5 w-auto max-w-[85%] object-contain filter drop-shadow-2xs group-hover:scale-108 transition-transform duration-300"
          />
        </div>

        {/* Verified Result Metric Pill at Bottom */}
        <div className="w-full pt-1 border-t border-[#1A0042]/5 flex items-center justify-between z-10 gap-1">
          <span className="font-sans font-bold text-[8.5px] sm:text-[9.5px] text-[#1A0042] truncate">
            {brand.name}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-[#573681]/10 text-[#573681] font-mono text-[7px] sm:text-[7.5px] font-bold shrink-0">
            {brand.metric}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={runwayRef}
      id="trusted-by"
      className="relative w-full bg-[#FAFAFD] text-[#1A0042] selection:bg-[#573681] selection:text-white"
    >
      {/* Pinned Full-Viewport Stage */}
      <div
        ref={stickyRef}
        className="relative h-screen w-full overflow-hidden flex flex-col justify-between pt-12 sm:pt-14 lg:pt-16 pb-2 sm:pb-3 select-none"
      >
        {/* Ambient background vertical technical grid lines */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          <div className="max-w-[1440px] h-full mx-auto grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 px-4 sm:px-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-full border-r border-[#1A0042]/5 relative"
              >
                {(i === 2 || i === 5 || i === 8 || i === 10) && (
                  <div className="absolute top-1/3 right-[-1px] w-[2px] h-6 bg-[#573681]/30" />
                )}
                {(i === 1 || i === 7) && (
                  <div className="absolute top-2/3 right-[-1px] w-[2px] h-6 bg-[#573681]/30" />
                )}
              </div>
            ))}
          </div>

          {/* Soft ambient violet radial */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[500px] bg-[#E7E6FB]/45 rounded-full filter blur-[90px] sm:blur-[130px] opacity-60 pointer-events-none" />
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* 1. TITLE ON TOP                                                     */}
        {/* ------------------------------------------------------------------- */}
        <div
          ref={textBlockRef}
          className="relative z-20 max-w-4xl mx-auto px-4 text-center w-full shrink-0 mb-1 sm:mb-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#573681]/10 text-[#573681] font-mono text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider mb-1 sm:mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>PORTFOLIO ROSTER · 27+ D2C &amp; ENTERPRISE BRANDS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight font-sans text-[#1A0042] leading-[1.12]">
            Trusted by Brands{" "}
            <span className="text-[#1A0042]/50 font-normal block sm:inline">from various industries</span>
          </h2>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* 2. MASONRY PINTEREST "ONE UP, ONE DOWN" HORIZONTAL CANOPY           */}
        {/* ------------------------------------------------------------------- */}
        <div className="relative z-10 w-full flex-1 flex items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]">
          {/* ================================================================= */}
          {/* A. MOBILE MASONRY CAROUSEL (Screens < sm: Continuous Marquee)     */}
          {/* ================================================================= */}
          <div className="sm:hidden w-full overflow-hidden select-none py-2">
            <div className="flex items-center gap-2.5 xs:gap-3 animate-brand-marquee w-max pl-4">
              {[...BRAND_COLUMNS, ...BRAND_COLUMNS].map((col, idx) => (
                <div
                  key={`mob-col-${col.id}-${idx}`}
                  className={`w-[130px] xs:w-[138px] flex flex-col gap-2 xs:gap-2.5 shrink-0 will-change-transform ${col.offsetClass}`}
                >
                  {col.brands.map((brand) => renderLogoCard(brand))}
                </div>
              ))}
            </div>
          </div>

          {/* ================================================================= */}
          {/* B. DESKTOP & TABLET MASONRY HORIZONTAL SCROLL (Screens >= sm)     */}
          {/* ================================================================= */}
          <div
            ref={trackRef}
            className="hidden sm:flex items-center gap-3 sm:gap-3.5 lg:gap-4.5 will-change-transform w-max px-8 sm:px-12 lg:px-16"
          >
            {BRAND_COLUMNS.map((col) => (
              <div
                key={col.id}
                className={`w-[142px] sm:w-[158px] lg:w-[172px] flex flex-col gap-2.5 sm:gap-3 lg:gap-3.5 shrink-0 will-change-transform ${col.offsetClass}`}
              >
                {col.brands.map((brand) => renderLogoCard(brand))}
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* 3. INTERACTIVE TELEMETRY HOVER / TAP PILL (Below the canopy)        */}
        {/* ------------------------------------------------------------------- */}
        <div className="h-8 sm:h-9 flex items-center justify-center relative z-20 px-4 shrink-0 mt-1 sm:mt-2">
          {activeBrand ? (
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#573681]/30 shadow-md animate-fade-in max-w-full truncate">
              <img
                src={activeBrand.logo}
                alt={activeBrand.name}
                className="h-3 sm:h-3.5 w-auto max-w-[50px] object-contain shrink-0"
              />
              <span className="font-sans font-bold text-[11px] sm:text-xs text-[#1A0042] truncate">
                {activeBrand.name}
              </span>
              <span className="text-[10px] font-mono text-[#1A0042]/50 hidden sm:inline">
                // {activeBrand.category}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#573681]/10 text-[#573681] font-mono text-[9.5px] sm:text-[10px] font-bold shrink-0">
                {activeBrand.metric}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center text-[9.5px] sm:text-[10.5px] font-mono text-[#1A0042]/45 tracking-wider text-center">
              <span>TAP OR HOVER ANY BRAND TO INSPECT VERIFIED SCALE METRICS</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
