import { useRef, useEffect, useState, type ReactElement } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { InnerPageKey } from "../data/innerPagesData";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudiesSectionProps {
  onOpenDemoModal?: () => void;
  onNavigate?: (key: InnerPageKey | null, hash?: string) => void;
}

interface CaseStudyCardItem {
  id: string;
  pageKey: InnerPageKey;
  brand: string;
  category: string;
  headline: string;
  summary: string;
  metricBadge: string;
  renderSvg: () => ReactElement;
}

const CASE_STUDY_CARDS: CaseStudyCardItem[] = [
  {
    id: "aerosleep",
    pageKey: "case-aerosleep",
    brand: "Aerosleep Labs",
    category: "DTC Sleep Tech",
    headline: "Aerosleep Labs: The 38-Day ROAS Recovery",
    summary: "Dismantled 3 cannibalizing broad audiences, mapped sensory-shock video hooks, and scaled spend to ₹750k/mo at 5.4x blended ROAS.",
    metricBadge: "1.8x → 5.4x ROAS",
    renderSvg: () => (
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full text-[#1A0042] stroke-current select-none" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="400" height="400" fill="#E7E6FB" fillOpacity="0.45" />
        <g stroke="#1A0042" strokeWidth="1" strokeOpacity="0.12">
          <line x1="0" y1="200" x2="400" y2="200" />
          <line x1="200" y1="0" x2="200" y2="400" />
          <line x1="0" y1="100" x2="400" y2="100" strokeDasharray="4 4" />
          <line x1="0" y1="300" x2="400" y2="300" strokeDasharray="4 4" />
          <line x1="100" y1="0" x2="100" y2="400" strokeDasharray="4 4" />
          <line x1="300" y1="0" x2="300" y2="400" strokeDasharray="4 4" />
        </g>
        <g stroke="#1A0042" strokeWidth="2" strokeOpacity="0.85">
          <path d="M 0 200 A 200 200 0 0 1 400 200" />
          <path d="M 50 200 A 150 150 0 0 1 350 200" strokeWidth="1.5" strokeOpacity="0.6" />
          <path d="M 100 200 A 100 100 0 0 1 300 200" strokeWidth="1.5" strokeOpacity="0.4" />
        </g>
        <path 
          d="M 0 200 Q 50 80, 100 200 T 200 200 T 300 200 T 400 200" 
          stroke="#573681" 
          strokeWidth="3" 
        />
        <g stroke="#1A0042" strokeWidth="1.5" strokeOpacity="0.5">
          <line x1="200" y1="200" x2="60" y2="60" />
          <line x1="200" y1="200" x2="340" y2="60" />
          <line x1="200" y1="200" x2="200" y2="40" />
        </g>
        <line x1="0" y1="350" x2="350" y2="0" stroke="#573681" strokeWidth="1.5" strokeDasharray="6 6" strokeOpacity="0.7" />
        <line x1="0" y1="400" x2="400" y2="0" stroke="#1A0042" strokeWidth="1.5" strokeOpacity="0.7" />
        <circle cx="200" cy="200" r="6" fill="#573681" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="340" cy="60" r="4.5" fill="#6495EB" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="4.5" fill="#6495EB" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="24" y="380" fill="#1A0042" fillOpacity="0.45" stroke="none" fontSize="10" fontFamily="'Montserrat', sans-serif" letterSpacing="0.1em">
          [FREQ // 432Hz]
        </text>
        <text x="270" y="380" fill="#573681" stroke="none" fontSize="10.5" fontFamily="'Montserrat', sans-serif" fontWeight="bold" letterSpacing="0.08em">
          ROAS 5.4x
        </text>
        <rect x="0.75" y="0.75" width="398.5" height="398.5" stroke="#1A0042" strokeOpacity="0.1" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: "methodiq",
    pageKey: "case-methodiq",
    brand: "MethodIQ",
    category: "DTC Skincare",
    headline: "MethodIQ: Halting the CAC Bleed",
    summary: "Eliminated ₹1.4L/mo budget bleed on organic retargeting, repaired 22% dropped checkout CAPI signals, and restored blended ROAS to 4.1x.",
    metricBadge: "₹140k/mo Bleed Stopped",
    renderSvg: () => (
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full text-[#1A0042] stroke-current select-none" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="400" height="400" fill="#E7E6FB" fillOpacity="0.45" />
        <g stroke="#1A0042" strokeWidth="1.5" strokeOpacity="0.2">
          <line x1="200" y1="40" x2="350" y2="130" />
          <line x1="350" y1="130" x2="350" y2="280" />
          <line x1="350" y1="280" x2="200" y2="370" />
          <line x1="200" y1="370" x2="50" y2="280" />
          <line x1="50" y1="280" x2="50" y2="130" />
          <line x1="50" y1="130" x2="200" y2="40" />
          <line x1="200" y1="40" x2="200" y2="370" />
          <line x1="50" y1="130" x2="350" y2="130" />
          <line x1="50" y1="280" x2="350" y2="280" />
        </g>
        <g stroke="#573681" strokeWidth="2">
          <path d="M 50 130 Q 200 240, 350 130" />
          <path d="M 80 150 Q 200 250, 320 150" strokeWidth="1.5" strokeOpacity="0.75" />
          <path d="M 110 170 Q 200 260, 290 170" strokeWidth="1.5" strokeOpacity="0.5" />
        </g>
        <g stroke="#1A0042" strokeWidth="1.5">
          <line x1="50" y1="50" x2="350" y2="350" stroke="#573681" strokeWidth="2.5" />
          <line x1="200" y1="40" x2="350" y2="350" strokeDasharray="4 4" strokeOpacity="0.4" />
          <line x1="200" y1="40" x2="50" y2="350" strokeDasharray="4 4" strokeOpacity="0.4" />
        </g>
        <circle cx="200" cy="200" r="6" fill="#573681" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="200" cy="130" r="4.5" fill="#6495EB" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="200" cy="280" r="4.5" fill="#6495EB" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="24" y="380" fill="#1A0042" fillOpacity="0.45" stroke="none" fontSize="10" fontFamily="'Montserrat', sans-serif" letterSpacing="0.1em">
          [CAPI v21.0 // 99.4%]
        </text>
        <text x="270" y="380" fill="#573681" stroke="none" fontSize="10.5" fontFamily="'Montserrat', sans-serif" fontWeight="bold" letterSpacing="0.08em">
          ROAS 4.1x
        </text>
        <rect x="0.75" y="0.75" width="398.5" height="398.5" stroke="#1A0042" strokeOpacity="0.1" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: "monolith",
    pageKey: "case-monolith",
    brand: "Monolith Apparel",
    category: "Performance Apparel",
    headline: "Monolith Apparel: The +185% Profit Scale",
    summary: "Consolidated 14 fragmented ad sets into 3 compound tiers, unlocking machine learning liquidity and scaling net contribution margins by +185%.",
    metricBadge: "+185% Net Profit",
    renderSvg: () => (
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full text-[#1A0042] stroke-current select-none" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="400" height="400" fill="#E7E6FB" fillOpacity="0.45" />
        <g stroke="#1A0042" strokeWidth="1.5" strokeOpacity="0.3">
          <rect x="0" y="0" width="400" height="400" strokeWidth="1.5" />
          <line x1="247" y1="0" x2="247" y2="400" strokeWidth="1.5" />
          <line x1="247" y1="247" x2="0" y2="247" strokeWidth="1.5" />
          <line x1="94" y1="247" x2="94" y2="400" strokeWidth="1.5" />
          <line x1="94" y1="342" x2="247" y2="342" strokeWidth="1.5" />
        </g>
        <path 
          d="M 0 0 A 247 247 0 0 1 247 247 A 153 153 0 0 1 94 400" 
          stroke="#573681" 
          strokeWidth="3" 
        />
        <g stroke="#1A0042" strokeWidth="1.5" strokeOpacity="0.3">
          <line x1="0" y1="0" x2="400" y2="400" />
          <line x1="0" y1="400" x2="400" y2="0" strokeDasharray="5 5" />
          <line x1="247" y1="0" x2="0" y2="247" stroke="#6495EB" strokeWidth="2" />
          <line x1="400" y1="247" x2="247" y2="400" stroke="#6495EB" strokeWidth="2" />
        </g>
        <line x1="247" y1="80" x2="400" y2="80" stroke="#1A0042" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="247" y1="140" x2="400" y2="140" stroke="#1A0042" strokeWidth="1" strokeOpacity="0.25" />
        <line x1="247" y1="200" x2="400" y2="200" stroke="#1A0042" strokeWidth="1" strokeOpacity="0.25" />
        <circle cx="247" cy="247" r="6" fill="#573681" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="94" cy="342" r="4.5" fill="#6495EB" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="24" y="380" fill="#1A0042" fillOpacity="0.45" stroke="none" fontSize="10" fontFamily="'Montserrat', sans-serif" letterSpacing="0.1em">
          [TENSILE // 3-TIER]
        </text>
        <text x="260" y="380" fill="#573681" stroke="none" fontSize="10.5" fontFamily="'Montserrat', sans-serif" fontWeight="bold" letterSpacing="0.08em">
          PROFIT +185%
        </text>
        <rect x="0.75" y="0.75" width="398.5" height="398.5" stroke="#1A0042" strokeOpacity="0.1" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: "boldedge",
    pageKey: "case-boldedge",
    brand: "Bold Edge",
    category: "Consumer Tech // Audio",
    headline: "Bold Edge: Scaling to ₹1.4M/mo with Telemetry",
    summary: "Connected inventory and margin telemetry directly into spend pacing, scaling 5x in 60 days while reducing blended CPA by 44%.",
    metricBadge: "5x Revenue Scale",
    renderSvg: () => (
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full text-[#1A0042] stroke-current select-none" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="400" height="400" fill="#E7E6FB" fillOpacity="0.45" />
        <g stroke="#1A0042" strokeWidth="1.5" strokeOpacity="0.4">
          <line x1="40" y1="360" x2="380" y2="360" />
          <line x1="40" y1="20" x2="40" y2="360" />
          <polyline points="370,355 380,360 370,365" fill="#1A0042" stroke="none" />
          <polyline points="35,30 40,20 45,30" fill="#1A0042" stroke="none" />
        </g>
        <path 
          d="M 40 340 Q 220 320, 360 40" 
          stroke="#573681" 
          strokeWidth="3.5" 
        />
        <g stroke="#6495EB" strokeWidth="1.5" strokeOpacity="0.8">
          <path d="M 40 180 Q 90 120, 140 180 T 240 180 T 340 180" />
          <path d="M 40 180 Q 90 240, 140 180 T 240 180 T 340 180" strokeDasharray="3 3" />
        </g>
        <line x1="40" y1="40" x2="360" y2="360" stroke="#1A0042" strokeWidth="1" strokeOpacity="0.15" />
        <line x1="40" y1="200" x2="380" y2="200" stroke="#1A0042" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.25" />
        <line x1="200" y1="20" x2="200" y2="360" stroke="#1A0042" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.25" />
        <circle cx="360" cy="40" r="6" fill="#573681" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="200" cy="180" r="4.5" fill="#6495EB" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="24" y="380" fill="#1A0042" fillOpacity="0.45" stroke="none" fontSize="10" fontFamily="'Montserrat', sans-serif" letterSpacing="0.1em">
          [ANC // AUTO-PACE]
        </text>
        <text x="270" y="380" fill="#573681" stroke="none" fontSize="10.5" fontFamily="'Montserrat', sans-serif" fontWeight="bold" letterSpacing="0.08em">
          SCALE 5.0x
        </text>
        <rect x="0.75" y="0.75" width="398.5" height="398.5" stroke="#1A0042" strokeOpacity="0.1" strokeWidth="1.5" />
      </svg>
    )
  }
];

interface CaseStudyCardProps {
  study: CaseStudyCardItem;
  onNavigate?: (key: InnerPageKey | null, hash?: string) => void;
}

function CaseStudyCard({ study, onNavigate }: CaseStudyCardProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const zone = zoneRef.current;
    const card = cardRef.current;
    const artwork = artworkRef.current;
    const glare = glareRef.current;
    if (!zone || !card) return;

    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = zone.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / centerX; // -1 to 1
      const deltaY = (y - centerY) / centerY; // -1 to 1

      // 3D perspective tilt matching Why Us and Codapress
      gsap.to(card, {
        rotateY: deltaX * 12,
        rotateX: -deltaY * 12,
        transformPerspective: 800,
        scale: 1.03,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Subtle parallax on inner SVG blueprint
      if (artwork) {
        gsap.to(artwork, {
          x: deltaX * 10,
          y: deltaY * 10,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Cursor-tracking specular glare spotlight
      if (glare) {
        gsap.to(glare, {
          opacity: 0.35,
          x: x - 120,
          y: y - 120,
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
        duration: 0.65,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (artwork) {
        gsap.to(artwork, {
          x: 0,
          y: 0,
          duration: 0.65,
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

    zone.addEventListener("mousemove", handleMouseMove);
    zone.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      zone.removeEventListener("mousemove", handleMouseMove);
      zone.removeEventListener("mouseleave", handleMouseLeave);
      gsap.killTweensOf(card);
      if (artwork) gsap.killTweensOf(artwork);
      if (glare) gsap.killTweensOf(glare);
    };
  }, []);

  return (
    <article 
      className="flex flex-col gap-4 group cursor-pointer shrink-0 w-[82vw] xs:w-[76vw] max-w-[320px] snap-start sm:w-auto sm:max-w-none sm:shrink"
      onClick={() => onNavigate?.(study.pageKey)}
    >
      {/* Zone frame with 3D perspective context */}
      <div 
        ref={zoneRef}
        className="relative aspect-square w-full"
        style={{ perspective: "900px" }}
        data-cursor="READ"
      >
        {/* Geometric Wireframe Visual in Frosted Glass Container */}
        <div 
          ref={cardRef}
          className="w-full h-full rounded-2xl overflow-hidden border border-white/40 hover:border-white/55 bg-gradient-to-b from-white/60 via-white/35 to-[#E7E6FB]/30 backdrop-blur-xl sm:backdrop-blur-2xl shadow-[0_12px_32px_-8px_rgba(26,0,66,0.08),inset_0_1.5px_2px_0_rgba(255,255,255,0.9),inset_0_-1px_1.5px_0_rgba(87,54,129,0.05)] hover:shadow-[0_20px_45px_-8px_rgba(87,54,129,0.22),inset_0_2px_2.5px_0_rgba(255,255,255,1)] transition-colors duration-300 will-change-transform relative z-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Dynamic Specular Glare Spotlight */}
          <div
            ref={glareRef}
            className="absolute pointer-events-none rounded-full w-[240px] h-[240px] bg-radial from-white/50 via-purple-300/15 to-transparent blur-xl opacity-0 z-30 will-change-transform"
            style={{ top: 0, left: 0 }}
          />

          {/* Frosted glass top sheen & ambient radial highlight */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 via-white/20 to-transparent rounded-t-2xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.75)_0%,transparent_60%)] pointer-events-none" />

          {/* SVG Blueprint Artwork with 3D parallax */}
          <div 
            ref={artworkRef}
            className="w-full h-full scale-[1.08] will-change-transform"
          >
            {study.renderSvg()}
          </div>

          {/* Top Category Tag */}
          <div className="absolute top-3 left-3 pointer-events-none z-10">
            <span className="px-2.5 py-1 rounded-md bg-white/75 backdrop-blur-md text-[#573681] font-mono text-[9px] font-bold uppercase tracking-wider border border-white/80 shadow-2xs">
              {study.category}
            </span>
          </div>

          {/* Metric Badge in Bottom-Right */}
          <div className="absolute bottom-3 right-3 pointer-events-none z-10">
            <span className="px-2.5 py-1 rounded-md bg-white/80 backdrop-blur-md text-[#573681] font-mono text-[10px] font-bold border border-white/85 shadow-2xs">
              {study.metricBadge}
            </span>
          </div>
        </div>
      </div>

      {/* Card Narrative Text & Action */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#573681]">
          {study.brand}
        </div>

        <h3 className="font-display font-bold text-base sm:text-[17px] text-[#1A0042] group-hover:text-[#573681] transition-colors leading-snug tracking-tight">
          {study.headline}
        </h3>

        <p className="font-sans text-xs text-[#1A0042]/75 leading-relaxed line-clamp-3">
          {study.summary}
        </p>

        {/* Underlined Interactive Link */}
        <div className="pt-1.5 flex items-center gap-1 font-mono text-xs font-bold text-[#1A0042] group-hover:text-[#573681] transition-colors">
          <span className="underline underline-offset-4 decoration-[#1A0042]/30 group-hover:decoration-[#573681]">
            Read case study
          </span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}

export function CaseStudiesSection({ onOpenDemoModal, onNavigate }: CaseStudiesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollWidth <= el.clientWidth) return;
    const cardWidth = el.scrollWidth / CASE_STUDY_CARDS.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveCardIndex(Math.min(Math.max(index, 0), CASE_STUDY_CARDS.length - 1));
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="proof" 
      ref={sectionRef} 
      className="relative w-full py-20 sm:py-28 lg:py-36 bg-textured-wash text-[#1A0042] border-t border-[#1A0042]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 sm:pb-14 border-b border-[#1A0042]/10 mb-8 sm:mb-14">
          <div>
            <div className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#573681] mb-2 sm:mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#573681] animate-pulse" />
              <span>CASE STUDIES // VERIFIED SCALE &amp; IMPACT</span>
            </div>
            <h2 className="font-display font-black text-xl xs:text-2xl sm:text-2xl lg:text-[1.85rem] tracking-tight text-[#1A0042] uppercase leading-tight sm:leading-[1.08]">
              PROOF &amp; TRANSFORMATIONS
            </h2>
            <p className="sm:hidden font-mono text-[10px] text-[#573681] font-bold tracking-wider uppercase pt-2 flex items-center gap-1.5">
              <span>SWIPE TO EXPLORE</span>
              <ArrowRight className="w-3 h-3 animate-pulse" />
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenDemoModal}
              className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl bg-[#573681] hover:bg-[#1A0042] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer flex items-center gap-2 active:scale-95"
            >
              <span>Audit Your Account</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4-Column Technical Wireframe Cards (Horizontal scroll on mobile, 4-col on desktop) */}
        <div 
          ref={gridRef} 
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 pt-1 -mx-4 px-4 xs:-mx-6 xs:px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 items-start"
        >
          {CASE_STUDY_CARDS.map((study) => (
            <CaseStudyCard 
              key={study.id} 
              study={study} 
              onNavigate={onNavigate} 
            />
          ))}
        </div>

        {/* Mobile Carousel Progress Dots */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 pt-3 pb-1">
          {CASE_STUDY_CARDS.map((study, idx) => (
            <button
              key={study.id}
              type="button"
              aria-label={`Go to case study ${idx + 1}`}
              onClick={() => {
                if (gridRef.current) {
                  const card = gridRef.current.children[idx] as HTMLElement;
                  if (card) {
                    card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
                  }
                }
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCardIndex === idx
                  ? "w-6 bg-[#573681]"
                  : "w-1.5 bg-[#573681]/25 hover:bg-[#573681]/40"
              }`}
            />
          ))}
        </div>

        {/* Bottom Banner Callout */}
        <div className="mt-16 sm:mt-20 p-5 xs:p-6 sm:p-8 rounded-2xl bg-[#E7E6FB]/50 border border-[#1A0042]/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-mono text-[11px] font-bold uppercase text-[#573681] tracking-wider">
              ZERO ESTIMATION // AUDITED DATA ONLY
            </div>
            <p className="font-sans text-sm sm:text-base text-[#1A0042] font-semibold">
              Every metric above is verified through Shopify settled revenue and Meta Graph API telemetry.
            </p>
          </div>

          <button
            onClick={onOpenDemoModal}
            className="w-full sm:w-auto justify-center shrink-0 px-6 py-3 rounded-xl bg-[#573681] hover:bg-[#1A0042] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95"
          >
            <span>Bring Us Your Ad Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
