import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


// Client Brand Logos from assets/trustedby/
import bircklesLogo from "../assets/trustedby/birckles.svg";
import kuhlteenLogo from "../assets/trustedby/Kuhlteen logo.svg";
import gut2goLogo from "../assets/trustedby/Gut2go-logo.png";
import ecosysLogo from "../assets/trustedby/Ecosys-Cleaners-Logo.avif";
import happyCystersLogo from "../assets/trustedby/HappyCysters.webp";
import imsafeLogo from "../assets/trustedby/imsafe-logo.png";
import inayaLogo from "../assets/trustedby/inaya logo.webp";
import lovedkLogo from "../assets/trustedby/lovedk_transparent_bg.avif";
import sugarKnockerLogo from "../assets/trustedby/sugar knocker -white-bg-02.png";
import teaquilaLogo from "../assets/trustedby/teaquila.png";
import theartLogo from "../assets/trustedby/theart-logo.png";
import roseplumLogo from "../assets/trustedby/Roseplum_1.avif";
import boldEdgeLogo from "../assets/trustedby/Bold Edge Logo Final-06.png";

gsap.registerPlugin(ScrollTrigger);

interface TrustedByProps {
  onOpenDemoModal?: () => void;
}

interface BrandPartner {
  id: string;
  name: string;
  category: string;
  metric: string;
  logo: string;
  hasTilt?: boolean;
}

const BRAND_PARTNERS: BrandPartner[] = [
  // Col 1 (Left)
  {
    id: "b1",
    name: "Gut2Go",
    category: "Nutrition",
    metric: "4.6x ROAS",
    logo: gut2goLogo,
  },
  {
    id: "b2",
    name: "Birckles",
    category: "D2C Apparel",
    metric: "5.4x ROAS",
    logo: bircklesLogo,
  },

  // Col 2
  {
    id: "b3",
    name: "Kuhlteen",
    category: "Gen-Z Brand",
    metric: "-36% CPA",
    logo: kuhlteenLogo,
  },
  {
    id: "b4",
    name: "Sugar Knocker",
    category: "Ayurvedic Care",
    metric: "₹1.1Cr Vol",
    logo: sugarKnockerLogo,
  },

  // Col 3
  {
    id: "b5",
    name: "Teaquila",
    category: "Energy Drinks",
    metric: "+128% Hold",
    logo: teaquilaLogo,
  },

  // Col 4 (Center)
  {
    id: "b6",
    name: "HappyCysters",
    category: "Hormonal Health",
    metric: "₹48L/mo",
    logo: happyCystersLogo,
  },
  {
    id: "b7",
    name: "Bold Edge",
    category: "Media Scaling",
    metric: "₹92L/mo",
    logo: boldEdgeLogo,
  },

  // Col 5
  {
    id: "b8",
    name: "Inaya",
    category: "Skincare DTC",
    metric: "5.1x ROAS",
    logo: inayaLogo,
  },

  // Col 6
  {
    id: "b9",
    name: "Lovedk",
    category: "Personal Care",
    metric: "3.9x MER",
    logo: lovedkLogo,
  },
  {
    id: "b10",
    name: "Imsafe",
    category: "Hygiene Tech",
    metric: "Audited SLA",
    logo: imsafeLogo,
    hasTilt: true,
  },

  // Col 7 (Right)
  {
    id: "b11",
    name: "Ecosys Cleaners",
    category: "Eco Solutions",
    metric: "6.2x Angle",
    logo: ecosysLogo,
  },
  {
    id: "b12",
    name: "Roseplum",
    category: "Lifestyle DTC",
    metric: "₹35L/mo",
    logo: roseplumLogo,
  },
  {
    id: "b13",
    name: "The Art",
    category: "Design Living",
    metric: "12m SLA",
    logo: theartLogo,
  }
];

export function TrustedBySection({ onOpenDemoModal: _onOpenDemoModal }: TrustedByProps = {}) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canopyRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const [activeBrand, setActiveBrand] = useState<BrandPartner | null>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    const sticky = stickyRef.current;
    const canopy = canopyRef.current;
    const textBlock = textBlockRef.current;
    if (!runway || !sticky || !canopy || !textBlock) return;

    const ctx = gsap.context(() => {
      // Pin runway with smooth scrub
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: runway,
          start: "top top",
          end: "+=60%",
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        }
      });

      // Desktop & Tablet: Staggered Column Parallax
      const col1 = canopy.querySelector(".trusted-col-1");
      const col2 = canopy.querySelector(".trusted-col-2");
      const col3 = canopy.querySelector(".trusted-col-3");
      const col4 = canopy.querySelector(".trusted-col-4");
      const col5 = canopy.querySelector(".trusted-col-5");
      const col6 = canopy.querySelector(".trusted-col-6");
      const col7 = canopy.querySelector(".trusted-col-7");

      if (col1) scrubTl.fromTo(col1, { y: 25 }, { y: -30, ease: "none", duration: 1 }, 0);
      if (col2) scrubTl.fromTo(col2, { y: -15 }, { y: 25, ease: "none", duration: 1 }, 0);
      if (col3) scrubTl.fromTo(col3, { y: 35 }, { y: -25, ease: "none", duration: 1 }, 0);
      if (col4) scrubTl.fromTo(col4, { y: -20 }, { y: 20, ease: "none", duration: 1 }, 0);
      if (col5) scrubTl.fromTo(col5, { y: 30 }, { y: -25, ease: "none", duration: 1 }, 0);
      if (col6) scrubTl.fromTo(col6, { y: -15 }, { y: 30, ease: "none", duration: 1 }, 0);
      if (col7) scrubTl.fromTo(col7, { y: 25 }, { y: -25, ease: "none", duration: 1 }, 0);

      // Mobile Grid Parallax
      const mobileCol1 = canopy.querySelector(".trusted-mob-1");
      const mobileCol2 = canopy.querySelector(".trusted-mob-2");
      const mobileCol3 = canopy.querySelector(".trusted-mob-3");

      if (mobileCol1) scrubTl.fromTo(mobileCol1, { y: 20 }, { y: -20, ease: "none", duration: 1 }, 0);
      if (mobileCol2) scrubTl.fromTo(mobileCol2, { y: -20 }, { y: 15, ease: "none", duration: 1 }, 0);
      if (mobileCol3) scrubTl.fromTo(mobileCol3, { y: 15 }, { y: -15, ease: "none", duration: 1 }, 0);

      // Gentle title block settle
      scrubTl.fromTo(
        textBlock,
        { opacity: 0.85, y: -8 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.5 },
        0
      );
    }, runway);

    return () => ctx.revert();
  }, []);

  // Brand Logo Card Component (Strictly brand logos, NO human/people photos)
  const renderLogoCard = (brand: BrandPartner, extraClasses = "") => {
    return (
      <div 
        key={brand.id}
        onClick={() => setActiveBrand(activeBrand?.id === brand.id ? null : brand)}
        onMouseEnter={() => setActiveBrand(brand)}
        onMouseLeave={() => setActiveBrand(null)}
        className={`group relative rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-5 bg-white/95 backdrop-blur-md border border-[#1A0042]/10 hover:border-[#573681]/45 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between cursor-pointer min-h-[116px] sm:min-h-[148px] lg:min-h-[164px] w-full aspect-[3.8/5] sm:aspect-[3.6/5] ${brand.hasTilt ? "[transform:perspective(800px)_rotateY(-6deg)] hover:[transform:perspective(800px)_rotateY(0deg)]" : ""} ${extraClasses}`}
      >
        {/* Subtle internal radial highlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#E7E6FB]/30 via-transparent to-[#573681]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl sm:rounded-3xl pointer-events-none" />

        {/* Top subtle category pill */}
        <div className="w-full flex items-center justify-between z-10">
          <span className="font-mono text-[8px] sm:text-[9.5px] uppercase font-bold text-[#1A0042]/45 tracking-wider group-hover:text-[#573681] transition-colors line-clamp-1">
            {brand.category}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#573681]/30 group-hover:bg-[#573681] group-hover:animate-ping transition-colors shrink-0" />
        </div>

        {/* Centered Brand Logo */}
        <div className="flex-1 w-full flex items-center justify-center py-2 sm:py-3 z-10 px-1 sm:px-2">
          <img 
            src={brand.logo} 
            alt={brand.name} 
            className="max-h-9 sm:max-h-12 lg:max-h-14 w-auto max-w-[85%] object-contain filter drop-shadow-2xs group-hover:scale-108 transition-transform duration-300" 
          />
        </div>

        {/* Verified Result Metric Pill at Bottom */}
        <div className="w-full pt-1.5 sm:pt-2 border-t border-[#1A0042]/5 flex items-center justify-between z-10 gap-1">
          <span className="font-sans font-bold text-[9.5px] sm:text-[11px] text-[#1A0042] truncate">
            {brand.name}
          </span>
          <span className="px-1.5 sm:px-2 py-0.5 rounded bg-[#573681]/10 text-[#573681] font-mono text-[8px] sm:text-[9px] font-bold shrink-0">
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
        className="relative h-screen w-full overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 lg:pt-22 pb-4 sm:pb-6"
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
          className="relative z-20 max-w-4xl mx-auto px-4 text-center w-full shrink-0 mb-2 sm:mb-4"
        >
          {/* Primary Dual-Tone Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight font-sans text-[#1A0042] leading-[1.12]">
            Trusted by Brands{" "}
            <span className="text-[#1A0042]/50 font-normal block sm:inline">from various industries</span>
          </h2>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* 2. CANOPY OF FLOATING CLIENT BRAND LOGO CARDS                       */}
        {/* ------------------------------------------------------------------- */}
        <div 
          ref={canopyRef}
          className="relative z-10 w-full max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 flex-1 flex items-center justify-center"
        >
          {/* ================================================================= */}
          {/* A. MOBILE CANOPY LAYOUT (Screens < sm: Continuous loop marquee)   */}
          {/* ================================================================= */}
          <div className="sm:hidden w-full flex flex-col gap-3 py-1 overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
            {/* Mobile Row 1: Leftward infinite scroll */}
            <div className="flex items-center gap-3 animate-brand-marquee w-max">
              {[...BRAND_PARTNERS.slice(0, 7), ...BRAND_PARTNERS.slice(0, 7)].map((brand, idx) => (
                <div key={`m1-${brand.id}-${idx}`} className="w-[145px] shrink-0">
                  {renderLogoCard(brand)}
                </div>
              ))}
            </div>

            {/* Mobile Row 2: Rightward / reversed infinite scroll */}
            <div className="flex items-center gap-3 animate-brand-marquee-reverse w-max">
              {[...BRAND_PARTNERS.slice(6), ...BRAND_PARTNERS.slice(6)].map((brand, idx) => (
                <div key={`m2-${brand.id}-${idx}`} className="w-[145px] shrink-0">
                  {renderLogoCard(brand)}
                </div>
              ))}
            </div>
          </div>

          {/* ================================================================= */}
          {/* B. DESKTOP & TABLET CANOPY LAYOUT (Screens >= sm: 7-column arch)  */}
          {/* ================================================================= */}
          <div className="hidden sm:grid w-full grid-cols-7 gap-3 sm:gap-3.5 lg:gap-4.5 items-center">
            {/* Col 1 */}
            <div className="trusted-col-1 flex flex-col gap-3 sm:gap-3.5 translate-y-2">
              {renderLogoCard(BRAND_PARTNERS[0])}
              {renderLogoCard(BRAND_PARTNERS[1])}
            </div>

            {/* Col 2 */}
            <div className="trusted-col-2 flex flex-col gap-3 sm:gap-3.5 -translate-y-2">
              {renderLogoCard(BRAND_PARTNERS[2])}
              {renderLogoCard(BRAND_PARTNERS[3])}
            </div>

            {/* Col 3 */}
            <div className="trusted-col-3 flex flex-col gap-3 sm:gap-3.5 translate-y-1">
              {renderLogoCard(BRAND_PARTNERS[4])}
              {renderLogoCard(BRAND_PARTNERS[12])}
            </div>

            {/* Col 4 (Center) */}
            <div className="trusted-col-4 flex flex-col gap-3 sm:gap-3.5 -translate-y-3">
              {renderLogoCard(BRAND_PARTNERS[5])}
              {renderLogoCard(BRAND_PARTNERS[6])}
            </div>

            {/* Col 5 */}
            <div className="trusted-col-5 flex flex-col gap-3 sm:gap-3.5 translate-y-1">
              {renderLogoCard(BRAND_PARTNERS[7])}
            </div>

            {/* Col 6 */}
            <div className="trusted-col-6 flex flex-col gap-3 sm:gap-3.5 -translate-y-2">
              {renderLogoCard(BRAND_PARTNERS[8])}
              {renderLogoCard(BRAND_PARTNERS[9])}
            </div>

            {/* Col 7 */}
            <div className="trusted-col-7 flex flex-col gap-3 sm:gap-3.5 translate-y-2">
              {renderLogoCard(BRAND_PARTNERS[10])}
              {renderLogoCard(BRAND_PARTNERS[11])}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* 3. INTERACTIVE TELEMETRY HOVER / TAP PILL (Below the canopy)        */}
        {/* ------------------------------------------------------------------- */}
        <div className="h-8 sm:h-9 flex items-center justify-center relative z-20 px-4 shrink-0 mt-2 sm:mt-4">
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
