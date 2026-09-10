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
const BRAND_COLUMNS: BrandColumn[] = [
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

// Partition the 27 client brands into 3 balanced rows for mobile streaming canopy (9 brands per row)
const ALL_BRANDS = BRAND_COLUMNS.flatMap((col) => col.brands);
const ROW_1 = ALL_BRANDS.slice(0, 9);
const ROW_2 = ALL_BRANDS.slice(9, 18);
const ROW_3 = ALL_BRANDS.slice(18, 27);

interface BrandLogoCardProps {
  brand: BrandPartner;
  isActive: boolean;
  onToggleActive: (brand: BrandPartner) => void;
  onHoverBrand: (brand: BrandPartner | null) => void;
  extraClasses?: string;
}

function BrandLogoCard({
  brand,
  isActive,
  onToggleActive,
  onHoverBrand,
  extraClasses = "",
}: BrandLogoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const logoEl = logoRef.current;
    const glare = glareRef.current;
    if (!card) return;

    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / centerX; // -1 to 1
      const deltaY = (y - centerY) / centerY; // -1 to 1

      // 3D perspective tilt matching Why Us cards
      gsap.to(card, {
        rotateY: deltaX * 14,
        rotateX: -deltaY * 14,
        transformPerspective: 700,
        scale: 1.06,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Subtle parallax shift on brand logo
      if (logoEl) {
        gsap.to(logoEl, {
          x: deltaX * 8,
          y: deltaY * 8,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Cursor-following specular glare spotlight
      if (glare) {
        gsap.to(glare, {
          opacity: 0.45,
          x: x - 80,
          y: y - 80,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      // Smooth reset back to neutral rest position
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (logoEl) {
        gsap.to(logoEl, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (glare) {
        gsap.to(glare, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(card);
      if (logoEl) gsap.killTweensOf(logoEl);
      if (glare) gsap.killTweensOf(glare);
    };
  }, []);

  return (
    <div className="relative w-full aspect-square" style={{ perspective: "800px" }}>
      <div
        ref={cardRef}
        onClick={() => onToggleActive(brand)}
        onMouseEnter={() => onHoverBrand(brand)}
        onMouseLeave={() => onHoverBrand(null)}
        className={`group relative rounded-full aspect-square p-1.5 xs:p-2 sm:p-3.5 lg:p-4 bg-white/45 sm:bg-white/40 hover:bg-white/60 backdrop-blur-xl sm:backdrop-blur-2xl border ${
          isActive
            ? "border-[#573681]/40 shadow-[0_16px_36px_-6px_rgba(87,54,129,0.22),inset_0_2px_2.5px_0_rgba(255,255,255,0.95),inset_0_-1px_1.5px_0_rgba(87,54,129,0.1)] ring-2 ring-[#573681]/20"
            : "border-white/35 hover:border-white/45 shadow-[0_10px_28px_-8px_rgba(26,0,66,0.06),inset_0_1.5px_2px_0_rgba(255,255,255,0.85),inset_0_-1px_1.5px_0_rgba(87,54,129,0.05)] hover:shadow-[0_18px_40px_-8px_rgba(87,54,129,0.16),inset_0_2px_2.5px_0_rgba(255,255,255,0.95)]"
        } transition-colors duration-300 flex flex-col items-center justify-between cursor-pointer w-full select-none overflow-hidden will-change-transform ${extraClasses}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Dynamic Specular Glare */}
        <div
          ref={glareRef}
          className="absolute pointer-events-none rounded-full w-[100px] h-[100px] sm:w-[160px] sm:h-[160px] bg-radial from-white/50 via-purple-300/15 to-transparent blur-lg opacity-0 z-30 will-change-transform"
          style={{ top: 0, left: 0 }}
        />

        {/* Frosted glass top dome specular sheen */}
        <div className="absolute inset-x-0 top-0 h-[52%] bg-gradient-to-b from-white/75 via-white/20 to-transparent rounded-t-full pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.85)_0%,transparent_60%)] rounded-full pointer-events-none" />

        {/* Subtle internal radial highlight on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E7E6FB]/60 via-transparent to-[#573681]/15 opacity-0 group-hover:opacity-100 transition-opacity rounded-full pointer-events-none" />

        {/* Top subtle category pill */}
        <div className="w-full flex items-center justify-center z-10 pt-0.5 sm:pt-1 px-1">
          <span className="font-mono text-[5.5px] xs:text-[6.5px] sm:text-[7.5px] uppercase font-bold text-[#1A0042]/55 tracking-wider group-hover:text-[#573681] transition-colors truncate max-w-[88%] text-center">
            {brand.category}
          </span>
        </div>

        {/* Centered Brand Logo with GSAP parallax */}
        <div
          ref={logoRef}
          className="flex-1 w-full flex items-center justify-center py-0.5 sm:py-1 z-10 px-1.5 sm:px-2.5 will-change-transform"
        >
          <img
            src={brand.logo}
            alt={brand.name}
            className="max-h-5 xs:max-h-6 sm:max-h-9 lg:max-h-11 w-auto max-w-[80%] object-contain filter drop-shadow-2xs"
          />
        </div>

        {/* Verified Result Metric Pill at Bottom */}
        <div className="w-full pb-0.5 sm:pb-1 flex items-center justify-center z-10">
          <span className="px-1.5 xs:px-2 py-0.5 rounded-full bg-white/65 backdrop-blur-md text-[#573681] font-mono text-[5.5px] xs:text-[6.5px] sm:text-[8px] font-bold shrink-0 tracking-tight border border-white/60 shadow-2xs group-hover:bg-[#573681] group-hover:text-white group-hover:border-[#573681]/30 transition-all">
            {brand.metric}
          </span>
        </div>
      </div>
    </div>
  );
}

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

  const renderLogoCard = (brand: BrandPartner, keyPrefix = "") => (
    <BrandLogoCard
      key={`${keyPrefix}${brand.id}`}
      brand={brand}
      isActive={activeBrand?.id === brand.id}
      onToggleActive={(b) => setActiveBrand(activeBrand?.id === b.id ? null : b)}
      onHoverBrand={(b) => setActiveBrand(b)}
    />
  );

  return (
    <section
      ref={runwayRef}
      id="trusted-by"
      className="relative w-full bg-[#FAFAFD] text-[#1A0042] selection:bg-[#573681] selection:text-white"
    >
      {/* Pinned Full-Viewport Stage */}
      <div
        ref={stickyRef}
        className="relative h-[100dvh] min-h-[520px] sm:min-h-0 w-full overflow-hidden flex flex-col justify-center items-center py-6 sm:py-8 lg:py-10 select-none"
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

          {/* Soft ambient violet & obsidian wash radials for glass depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[900px] h-[350px] sm:h-[520px] bg-gradient-to-tr from-[#E7E6FB]/70 via-[#F1EDFD]/45 to-[#E0D7FA]/60 rounded-full filter blur-[80px] sm:blur-[120px] opacity-75 pointer-events-none" />
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* 1. TITLE ON TOP                                                     */}
        {/* ------------------------------------------------------------------- */}
        <div
          ref={textBlockRef}
          className="relative z-20 max-w-4xl mx-auto px-4 text-center w-full shrink-0 mb-3 sm:mb-4 lg:mb-6"
        >
          <div className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#573681] flex items-center justify-center gap-2 mb-2 sm:mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#573681] animate-pulse" />
            <span>PORTFOLIO // 27+ D2C &amp; ENTERPRISE BRANDS</span>
          </div>
          <h2 className="font-display font-black text-xl xs:text-2xl sm:text-2xl lg:text-[1.85rem] text-[#1A0042] uppercase tracking-tight leading-tight sm:leading-[1.08]">
            TRUSTED BY BRANDS FROM VARIOUS INDUSTRIES
          </h2>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* 2. MASONRY PINTEREST "ONE UP, ONE DOWN" HORIZONTAL CANOPY           */}
        {/* ------------------------------------------------------------------- */}
        <div className="relative z-10 w-full flex items-center overflow-hidden py-2 sm:py-3 [mask-image:linear-gradient(to_right,transparent_0px,black_28px,black_calc(100%-28px),transparent_100%)]">
          {/* ================================================================= */}
          {/* A. MOBILE 3-ROW STREAMING CANOPY (Screens < sm: 9 Brands Per Row) */}
          {/* ================================================================= */}
          <div className="sm:hidden w-full overflow-hidden select-none py-1 space-y-2 xs:space-y-2.5">
            {/* Row 1: Flowing Left */}
            <div className="w-full overflow-hidden">
              <div
                className="flex items-center gap-2 xs:gap-2.5 animate-brand-marquee w-max"
                style={{ animationDuration: "34s" }}
              >
                {[...ROW_1, ...ROW_1].map((brand, idx) => (
                  <div key={`mob-r1-${brand.id}-${idx}`} className="w-[82px] xs:w-[92px] shrink-0">
                    {renderLogoCard(brand, `mob-r1-${idx}-`)}
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Flowing Right (Reverse) */}
            <div className="w-full overflow-hidden">
              <div
                className="flex items-center gap-2 xs:gap-2.5 animate-brand-marquee-reverse w-max"
                style={{ animationDuration: "38s" }}
              >
                {[...ROW_2, ...ROW_2].map((brand, idx) => (
                  <div key={`mob-r2-${brand.id}-${idx}`} className="w-[82px] xs:w-[92px] shrink-0">
                    {renderLogoCard(brand, `mob-r2-${idx}-`)}
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3: Flowing Left */}
            <div className="w-full overflow-hidden">
              <div
                className="flex items-center gap-2 xs:gap-2.5 animate-brand-marquee w-max"
                style={{ animationDuration: "32s" }}
              >
                {[...ROW_3, ...ROW_3].map((brand, idx) => (
                  <div key={`mob-r3-${brand.id}-${idx}`} className="w-[82px] xs:w-[92px] shrink-0">
                    {renderLogoCard(brand, `mob-r3-${idx}-`)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* B. DESKTOP & TABLET MASONRY HORIZONTAL SCROLL (Screens >= sm)     */}
          {/* ================================================================= */}
          <div
            ref={trackRef}
            className="hidden sm:flex items-center gap-3 sm:gap-3.5 lg:gap-4 will-change-transform w-max px-8 sm:px-12 lg:px-16 py-2"
          >
            {BRAND_COLUMNS.map((col) => (
              <div
                key={col.id}
                className={`w-[130px] sm:w-[146px] lg:w-[162px] flex flex-col justify-center gap-2.5 sm:gap-3 lg:gap-3.5 shrink-0 will-change-transform ${col.offsetClass}`}
              >
                {col.brands.map((brand) => renderLogoCard(brand, "desk-"))}
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* 3. INTERACTIVE TELEMETRY HOVER / TAP PILL (Below the canopy)        */}
        {/* ------------------------------------------------------------------- */}
        <div className="h-8 sm:h-9 flex items-center justify-center relative z-20 px-4 shrink-0 mt-6 sm:mt-8 lg:mt-10">
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
