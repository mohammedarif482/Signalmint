import { useState, useEffect, useRef } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import signalMintLogo from "../assets/signalmintlogo.svg";
import footerMapImg from "../assets/footer-map.png";
import genericTechnoFontUrl from "../assets/font/GenericTechno.otf";
import type { InnerPageKey } from "../data/innerPagesData";
import { AnimatedSocialIcon } from "./AnimatedSocialIcon";

interface FooterKineticProps {
  onOpenDemoModal?: () => void;
  onOpenInnerPage?: (key: InnerPageKey) => void;
  onNavigateHomeAnchor?: (hash: string) => void;
}

// Data for Category Filter Ticker strictly in SignalMint Context
const TICKER_DATA = {
  verticals: [
    "Wellness & Supplements",
    "Jewellery & Accessories",
    "Fashion & Apparel",
    "Footwear",
    "Personal Care",
    "Hygiene & FMCG",
    "Agri-Tech B2B",
    "Fintech & Lending",
  ],
  protocols: [
    "Attribution Gap Analysis",
    "Campaign Structure Teardown",
    "Pixel & CAPI Verification",
    "Hook Retention Diagnostics",
    "Unit Economics Mapping",
    "Creative Fatigue Detection",
    "Checkout Friction Audit",
    "Breakeven ROAS Modelling",
  ],
  patterns: [
    "The Problem-First Hook",
    "The Before/After Reveal",
    "The Villain POV Script",
    "The Stat-Led Opener",
    "The Founder Authority Cut",
    "The Comparison Teardown",
    "The Price-Stack Overlay",
    "The Proxy-Buyer Gift Angle",
  ],
};

// Global Telemetry Nodes
const TELEMETRY_NODES = [
  { id: "bom", x: "69.0%", y: "48%", label: "Primary Headquarters (Mumbai, IN)", ping: "2ms", active: true },
];

export function FooterKinetic({ onOpenDemoModal: _onOpenDemoModal, onOpenInnerPage: _onOpenInnerPage, onNavigateHomeAnchor }: FooterKineticProps) {
  const [activeTab, setActiveTab] = useState<"verticals" | "protocols" | "patterns">("verticals");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Live dynamic telemetry counter states
  const [savedBudget, setSavedBudget] = useState(1842910);
  const [cooldownSec, setCooldownSec] = useState(708); // 11m 48s
  const [latency, setLatency] = useState("1.8");
  const [justTicked, setJustTicked] = useState(false);

  useEffect(() => {
    // 1. Live Countdown timer (ticks down second by second, resets at sub-12m sweep)
    const countdownTimer = setInterval(() => {
      setCooldownSec((prev) => (prev <= 1 ? 720 : prev - 1));
    }, 1000);

    // 2. Live Dynamic Wasted Spend Prevented Counter
    const budgetTimer = setInterval(() => {
      const increment = Math.floor(Math.random() * 260) + 85;
      setSavedBudget((prev) => prev + increment);
      setJustTicked(true);
      setTimeout(() => setJustTicked(false), 550);
    }, 2200);

    // 3. Realistic Mumbai BOM-01 network latency jitter
    const latencyTimer = setInterval(() => {
      const pings = ["1.4", "1.7", "1.9", "2.1", "1.8", "2.3", "1.6"];
      const nextPing = pings[Math.floor(Math.random() * pings.length)];
      setLatency(nextPing);
    }, 3100);

    return () => {
      clearInterval(countdownTimer);
      clearInterval(budgetTimer);
      clearInterval(latencyTimer);
    };
  }, []);

  const cooldownMin = Math.floor(cooldownSec / 60);
  const cooldownRemSec = cooldownSec % 60;
  const cooldownStr = `${cooldownMin}:${cooldownRemSec.toString().padStart(2, "0")}`;

  const handleAnchorLink = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (onNavigateHomeAnchor) {
      e.preventDefault();
      onNavigateHomeAnchor(hash);
    }
  };

  // Smooth scroll to top handler
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --------------------------------------------------------------------------
  // Interactive Dot-Matrix Particle Wordmark Engine (United Carriers Physics)
  // --------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 85 * dpr,
      actualRadius: 85 * dpr,
      isActive: false,
      timeout: 0,
    };

    class Particle {
      originX: number;
      originY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      ease: number;
      targetEase: number;
      friction: number;
      size: number;
      color: string;

      constructor(x: number, y: number, color: string) {
        this.originX = x;
        this.originY = y;
        this.x = x + (Math.random() - 0.5) * 8;
        this.y = y + (Math.random() - 0.5) * 8;
        this.vx = 0;
        this.vy = 0;
        this.ease = 0.05 + Math.random() * 0.04;
        this.targetEase = 0.22 + Math.random() * 0.15;
        this.friction = 0.82 + Math.random() * 0.1;
        this.size = 2.0 * dpr;
        this.color = color;
      }

      update() {
        if (mouse.isActive) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouse.radius * mouse.radius) {
            this.ease = this.targetEase;
            const dist = Math.sqrt(distSq) || 1;
            const force = -((mouse.actualRadius - dist) / mouse.actualRadius) * 70 * (0.6 + Math.random() * 0.4);
            this.vx += (dx / dist) * force;
            this.vy += (dy / dist) * force;
          }
        }

        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx + (this.originX - this.x) * this.ease;
        this.y += this.vy + (this.originY - this.y) * this.ease;

        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const initParticles = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = Math.max(rect.height, 140);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Offscreen rasterization of "SIGNALMINT" for dot sampling
      const offscreen = document.createElement("canvas");
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
      offCtx.fillStyle = "#1A0042";

      // Use GenericTechno font for "SIGNALMINT"
      const text = "SIGNALMINT";
      let fontSize = Math.floor(offscreen.width / 7.0);
      offCtx.font = `900 ${fontSize}px 'GenericTechno', 'Syne', sans-serif`;
      let textWidth = offCtx.measureText(text).width;

      if (textWidth > offscreen.width * 0.96) {
        fontSize = Math.floor(fontSize * ((offscreen.width * 0.96) / textWidth));
        offCtx.font = `900 ${fontSize}px 'GenericTechno', 'Syne', sans-serif`;
        textWidth = offCtx.measureText(text).width;
      }

      const textX = (offscreen.width - textWidth) / 2;
      const textY = offscreen.height * 0.72;

      // Draw stroked outline + filled glyphs for solid dotted density
      offCtx.lineWidth = 1.2 * dpr;
      offCtx.strokeText(text, textX, textY);
      offCtx.fillText(text, textX, textY);

      const imgData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
      const data = imgData.data;

      particles = [];
      const gap = Math.round(4.4 * dpr);

      for (let y = 0; y < offscreen.height; y += gap) {
        for (let x = 0; x < offscreen.width; x += gap) {
          const index = (y * offscreen.width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 35) {
            // SignalMint Signature Deep Ink dot color with slight transparency
            const dotColor = "rgba(26, 0, 66, 0.48)";
            particles.push(new Particle(x, y, dotColor));
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(render);
    };

    initParticles();
    render();

    // Ensure GenericTechno font is fully parsed and re-rasterize once loaded
    if (typeof FontFace !== "undefined") {
      const font = new FontFace("GenericTechno", `url(${genericTechnoFontUrl})`);
      font.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
        initParticles();
      }).catch(() => {
        initParticles();
      });
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        initParticles();
      });
    }

    // Mouse & Touch interaction handlers
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      mouse.x = (clientX - rect.left) * dpr;
      mouse.y = (clientY - rect.top) * dpr;
      mouse.isActive = true;

      window.clearTimeout(mouse.timeout);
      mouse.timeout = window.setTimeout(() => {
        mouse.isActive = false;
      }, 150);
    };

    const handlePointerLeave = () => {
      mouse.isActive = false;
    };

    window.addEventListener("resize", initParticles);
    canvas.addEventListener("mousemove", handlePointerMove);
    canvas.addEventListener("mouseleave", handlePointerLeave);
    canvas.addEventListener("touchmove", handlePointerMove, { passive: true });
    canvas.addEventListener("touchend", handlePointerLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", initParticles);
      canvas.removeEventListener("mousemove", handlePointerMove);
      canvas.removeEventListener("mouseleave", handlePointerLeave);
      canvas.removeEventListener("touchmove", handlePointerMove);
      canvas.removeEventListener("touchend", handlePointerLeave);
      window.clearTimeout(mouse.timeout);
    };
  }, []);

  return (
    <footer className="relative w-full footer-separated-bg text-[#1A0042] pt-0 pb-0 overflow-hidden border-t-2 border-[#573681]/25 selection:bg-[#573681] selection:text-white shadow-[0_-12px_40px_rgba(87,54,129,0.05)]">
      {/* 0. ARCHITECTURAL TELEMETRY SEPARATOR HEADER BAND (LIVE DYNAMIC METRICS) */}
      <div className="w-full border-y border-[#573681]/20 bg-white py-2.5 px-0 sm:px-8 mb-12 sm:mb-16 shadow-xs overflow-hidden">
        {/* Mobile View: Fixed "TELEMETRY STREAM" badge + Horizontally looping metrics ticker */}
        <div className="sm:hidden flex items-center w-full overflow-hidden select-none">
          {/* Pinned Static Badge: TELEMETRY STREAM */}
          <div className="shrink-0 flex items-center gap-1.5 pl-3.5 pr-2.5 py-0.5 border-r border-[#573681]/20 bg-white z-10 text-[9.5px] font-mono text-[#573681] font-bold tracking-wider uppercase shadow-[4px_0_12px_rgba(255,255,255,0.9)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#573681] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#573681]"></span>
            </span>
            <span className="whitespace-nowrap">TELEMETRY STREAM</span>
          </div>

          {/* Marquee Track: Moving metrics */}
          <div className="flex-1 relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_94%,transparent)]">
            <div className="flex items-center gap-5 whitespace-nowrap animate-telemetry-marquee text-[9.5px] font-mono pl-3">
              {/* Duplicated track for continuous seamless loop */}
              {[0, 1].map((copyIdx) => (
                <div key={copyIdx} className="flex items-center gap-4 shrink-0">
                  {/* 24H Bleed Prevented */}
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border transition-all duration-300 ${justTicked ? "bg-emerald-50 border-emerald-400 text-emerald-900" : "bg-white border-[#573681]/20 text-[#1A0042] shadow-2xs"}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="text-[#1A0042]/45 uppercase text-[8.5px] font-bold">24H BLEED PREVENTED:</span>
                    <span className="font-bold text-[#573681] tabular-nums tracking-tight">
                      ₹{savedBudget.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <span className="text-[#1A0042]/20 font-bold">//</span>

                  {/* Next sweep */}
                  <div className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded border border-[#573681]/20 shadow-2xs">
                    <span className="text-[#1A0042]/45 uppercase text-[8.5px] font-bold">SWEEP:</span>
                    <span className="font-bold text-[#1A0042] tabular-nums">
                      {cooldownStr}s
                    </span>
                  </div>

                  <span className="text-[#1A0042]/20 font-bold">//</span>

                  {/* Node Latency */}
                  <div className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded border border-[#573681]/20 shadow-2xs">
                    <span className="text-[#1A0042]/45 uppercase text-[8.5px] font-bold">BOM-01:</span>
                    <span className="font-bold text-emerald-700 tabular-nums">
                      {latency}ms
                    </span>
                  </div>

                  <span className="text-[#1A0042]/20 font-bold">//</span>

                  {/* Security */}
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5 bg-white px-2 py-0.5 rounded border border-[#573681]/20 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    100% ENCRYPTED
                  </span>

                  <span className="text-[#1A0042]/20 font-bold pr-2">//</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop / Tablet View: Fixed space-between telemetry console */}
        <div className="hidden sm:flex max-w-[1440px] mx-auto items-center justify-between gap-3 text-[10px] font-mono">
          <div className="flex items-center gap-2 text-[#573681] font-bold tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#573681] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#573681]"></span>
            </span>
            <span>TELEMETRY STREAM</span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 text-[#1A0042]/70 font-mono text-[10px]">
            {/* Live dynamic counter: Wasted Spend Prevented */}
            <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border transition-all duration-300 ${justTicked ? "bg-emerald-50 border-emerald-400 text-emerald-900" : "bg-white border-[#573681]/20 text-[#1A0042] shadow-2xs"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-[#1A0042]/45 uppercase text-[9px] font-bold">24H BLEED PREVENTED:</span>
              <span className="font-bold text-[#573681] tabular-nums tracking-tight">
                ₹{savedBudget.toLocaleString("en-IN")}
              </span>
            </div>

            <span className="text-[#1A0042]/20 hidden md:inline">|</span>

            {/* Live Sub-12min Cooldown Countdown */}
            <div className="hidden md:flex items-center gap-1.5 bg-white px-2 py-0.5 rounded border border-[#573681]/20 shadow-2xs">
              <span className="text-[#1A0042]/45 uppercase text-[9px] font-bold">NEXT KILL-SWITCH SWEEP:</span>
              <span className="font-bold text-[#1A0042] tabular-nums">
                {cooldownStr}s
              </span>
            </div>

            <span className="text-[#1A0042]/20 hidden lg:inline">|</span>

            {/* Live Dynamic Node Latency */}
            <div className="hidden lg:flex items-center gap-1.5 bg-white px-2 py-0.5 rounded border border-[#573681]/20 shadow-2xs">
              <span className="text-[#1A0042]/45 uppercase text-[9px] font-bold">BOM-01 LATENCY:</span>
              <span className="font-bold text-emerald-700 tabular-nums">
                {latency}ms
              </span>
            </div>

            <span className="text-[#1A0042]/20 hidden xl:inline">|</span>

            <span className="text-emerald-700 font-bold hidden xl:flex items-center gap-1.5 bg-white px-2 py-0.5 rounded border border-[#573681]/20 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              100% ENCRYPTED
            </span>
          </div>
        </div>
      </div>

      {/* Ambient background light gradients */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#E7E6FB]/40 filter blur-[120px] pointer-events-none opacity-40" />

      {/* Outer Max Container */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-3 sm:pb-5 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. TOP EDITORIAL TAGLINE & NAVIGATION GRID                                */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 pb-12 sm:pb-16 border-b border-[#1A0042]/10">
          
          {/* Top Left: Brand Mark + Tagline */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-3 flex flex-col justify-between">
            <div>
              {/* Brand Logo Header */}
              <div className="flex items-center gap-3 mb-5">
                <img
                  src={signalMintLogo}
                  alt="SignalMint"
                  className="h-6 sm:h-7 w-auto object-contain"
                />
              </div>

              {/* Commanding Grotesque Headline in SignalMint Syne Font */}
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#1A0042] leading-[1.08] uppercase tracking-tight">
                TWO AGENTS.<br />
                ONE FINDS WINNERS.<br />
                <span className="text-[#573681]">ONE STOPS THE BLEEDING.</span>
              </h3>

              {/* Subtext in brand font */}
              <p className="font-sans italic text-sm sm:text-base text-[#573681] mt-2.5 opacity-90">
                Both run 24/7. You never touch them.
              </p>
            </div>

            {/* Social Channels Row */}
            <div className="pt-6">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A0042]/50 mb-3">
                INTELLIGENCE FEEDS &amp; REPO
              </div>
              <div className="flex items-center gap-3 pt-1">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/signalmint.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/90 border border-[#1A0042]/15 text-[#1A0042] hover:text-white hover:bg-gradient-to-tr hover:from-[#FA7E1E] hover:via-[#D62976] hover:to-[#962FBF] hover:border-transparent transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center group cursor-pointer"
                  aria-label="SignalMint on Instagram"
                >
                  <AnimatedSocialIcon
                    brandName="instagram"
                    animation="bounce"
                    width="19px"
                    defaultColor="currentColor"
                  />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/signalmint/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/90 border border-[#1A0042]/15 text-[#1A0042] hover:text-white hover:bg-[#0A66C2] hover:border-transparent transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center group cursor-pointer"
                  aria-label="SignalMint on LinkedIn"
                >
                  <AnimatedSocialIcon
                    brandName="linkedin"
                    animation="bounce"
                    width="18px"
                    defaultColor="currentColor"
                  />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/917045451951"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/90 border border-[#1A0042]/15 text-[#1A0042] hover:text-white hover:bg-[#25D366] hover:border-transparent transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center group cursor-pointer"
                  aria-label="SignalMint on WhatsApp"
                >
                  <AnimatedSocialIcon
                    brandName="whatsapp"
                    animation="bounce"
                    width="19px"
                    defaultColor="currentColor"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Platform Directory */}
          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A0042]/50 mb-4">
              SERVICES
            </div>
            <div className="flex flex-col gap-2.5 text-xs font-sans">
              <a 
                href="#why-us" 
                onClick={(e) => handleAnchorLink(e, "#why-us")}
                className="font-semibold text-[#1A0042] hover:text-[#573681] transition-colors flex items-center gap-1 group"
              >
                <span>Why Us</span>
                <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a 
                href="#services" 
                onClick={(e) => handleAnchorLink(e, "#services")}
                className="font-semibold text-[#1A0042] hover:text-[#573681] transition-colors flex items-center gap-1 group"
              >
                <span>Meta Ads Execution</span>
                <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a 
                href="#services" 
                onClick={(e) => handleAnchorLink(e, "#services")}
                className="font-semibold text-[#1A0042] hover:text-[#573681] transition-colors flex items-center gap-1 group"
              >
                <span>Creative Strategy</span>
                <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a 
                href="#services" 
                onClick={(e) => handleAnchorLink(e, "#services")}
                className="font-semibold text-[#1A0042] hover:text-[#573681] transition-colors flex items-center gap-1 group"
              >
                <span>Diagnostic Audits</span>
                <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a 
                href="#proof" 
                onClick={(e) => handleAnchorLink(e, "#proof")}
                className="text-[#1A0042]/80 hover:text-[#573681] transition-colors flex items-center gap-1 group"
              >
                <span>Proof &amp; Case Studies</span>
                <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a 
                href="#faq" 
                onClick={(e) => handleAnchorLink(e, "#faq")}
                className="text-[#1A0042]/80 hover:text-[#573681] transition-colors flex items-center gap-1 group"
              >
                <span>Frequently Asked Questions</span>
                <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Column 3: Ad Network Integrations */}
          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A0042]/50 mb-3">
              <span>AD NETWORK INTEGRATIONS</span>
            </div>

            <div className="flex flex-col gap-2">
              {/* Meta Partner */}
              <div className="h-7 px-3 rounded-lg bg-white border border-[#1A0042]/15 flex items-center gap-2 text-[9px] font-mono font-bold text-[#1A0042] shadow-2xs hover:border-[#573681]/40 transition-colors w-fit">
                <svg className="w-3.5 h-3.5 shrink-0 text-[#0081FB]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a7 7 0 0 0 .265.86a5.3 5.3 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927c1.497 0 2.633-.671 3.965-2.444c.76-1.012 1.144-1.626 2.663-4.32l.756-1.339l.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314c1.046.987 1.992 1.22 3.06 1.22c1.075 0 1.876-.355 2.455-.843a3.7 3.7 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745c0-2.72-.681-5.357-2.084-7.45c-1.282-1.912-2.957-2.93-4.716-2.93c-1.047 0-2.088.467-3.053 1.308c-.652.57-1.257 1.29-1.82 2.05c-.69-.875-1.335-1.547-1.958-2.056c-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999c1.132 1.748 1.647 4.195 1.647 6.4c0 1.548-.368 2.9-1.839 2.9c-.58 0-1.027-.23-1.664-1.004c-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a45 45 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327c1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446c.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338c-1.191 1.649-1.81 1.817-2.486 1.817c-.524 0-1.038-.237-1.383-.794c-.263-.426-.464-1.13-.464-2.046c0-2.221.63-4.535 1.66-6.088c.454-.687.964-1.226 1.533-1.533a2.26 2.26 0 0 1 1.088-.285" />
                </svg>
                <span>META API</span>
              </div>

              {/* Google Ads */}
              <div className="h-7 px-3 rounded-lg bg-white border border-[#1A0042]/15 flex items-center gap-2 text-[9px] font-mono font-bold text-[#1A0042] shadow-2xs hover:border-[#573681]/40 transition-colors w-fit">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.67v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.16z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.24v3.15C3.26 21.4 7.34 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.59H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.41l4.04-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.6 1.24 6.59l4.04 3.15c.95-2.84 3.6-4.99 6.72-4.99z" />
                </svg>
                <span>GOOGLE PMAX</span>
              </div>

              {/* TikTok Partner */}
              <div className="h-7 px-3 rounded-lg bg-white border border-[#1A0042]/15 flex items-center gap-2 text-[9px] font-mono font-bold text-[#1A0042] shadow-2xs hover:border-[#573681]/40 transition-colors w-fit">
                <svg className="w-3.5 h-3.5 shrink-0 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07" />
                </svg>
                <span>TIKTOK</span>
              </div>

              {/* Amazon DSP */}
              <div className="h-7 px-3 rounded-lg bg-white border border-[#1A0042]/15 flex items-center gap-2 text-[9px] font-mono font-bold text-[#1A0042] shadow-2xs hover:border-[#573681]/40 transition-colors w-fit">
                <svg className="w-3.5 h-3.5 shrink-0 text-[#FF9900]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.045 18.02q.107-.174.348-.022q5.455 3.165 11.87 3.166q4.278-.001 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13c.226-.088.39-.046.525.13c.12.174.09.336-.12.48c-.256.19-.6.41-1.006.654q-1.867 1.113-4.185 1.726a17.6 17.6 0 0 1-10.951-.577a17.9 17.9 0 0 1-5.43-3.35q-.15-.113-.151-.22c0-.047.021-.09.051-.13zm6.565-6.218q0-1.507.743-2.577c.495-.71 1.17-1.25 2.04-1.615c.796-.335 1.756-.575 2.912-.72c.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875c-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46c-.35.27-.575.63-.675 1.096c-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39c0-.046.007-.09.022-.15q.372-1.935 1.82-2.88c.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29c.135.15.27.3.405.48c.12.165.224.314.283.45c.075.134.15.33.195.57c.06.254.105.42.135.51c.03.104.062.3.076.615c.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036q.157.471.315.674l.51.674q.136.204.136.36q0 .181-.18.314c-1.2 1.05-1.86 1.62-1.963 1.71q-.247.203-.63.045a6 6 0 0 1-.526-.496l-.31-.347a9 9 0 0 1-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665c-.494.15-1.093.227-1.83.227c-1.11 0-2.04-.343-2.76-1.034c-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438q-.001.848.425 1.364c.285.34.675.512 1.155.512c.045 0 .106-.007.195-.02c.09-.016.134-.023.166-.023c.614-.16 1.08-.553 1.424-1.178c.165-.28.285-.58.36-.91c.09-.32.12-.59.135-.8c.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18c-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17q.544-.365 1.05-.5a8 8 0 0 1 1.612-.24c.14-.012.28 0 .41.03c.65.06 1.05.168 1.172.33c.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8q-.418 1.034-1.156 1.68q-.11.09-.197.09c-.03 0-.06 0-.09-.012c-.09-.044-.107-.12-.064-.24c.54-1.26.806-2.143.806-2.64c0-.15-.03-.27-.087-.344c-.145-.166-.55-.257-1.224-.257q-.364 0-.87.046c-.363.045-.7.09-1 .135q-.134 0-.18-.044c-.03-.03-.036-.047-.02-.077c0-.017.006-.03.02-.063v-.06z" />
                </svg>
                <span>AMAZON DSP</span>
              </div>
            </div>
          </div>

          {/* Column 4: Locations & Contact */}
          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 space-y-5">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A0042]/50 mb-2.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#573681]"></span>
                <span>LOCATIONS (1)</span>
              </div>
              
              <div className="space-y-0.5">
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#573681]">
                  Primary
                </div>
                <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1A0042]/60">
                  Headquarters
                </div>
                <p className="font-display font-extrabold text-xl text-[#1A0042] tracking-tight pt-0.5">
                  Mumbai, IN
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A0042]/50 mb-1">
                  E-Mail
                </div>
                <a
                  href="mailto:signalmint.work@gmail.com"
                  className="font-sans font-bold text-xs text-[#573681] hover:underline block truncate"
                  title="signalmint.work@gmail.com"
                >
                  signalmint.work@gmail.com
                </a>
              </div>

              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A0042]/50 mb-1">
                  DIRECT CONTACT
                </div>
                <a
                  href="tel:+917045451951"
                  className="font-mono font-bold text-xs sm:text-sm text-[#1A0042] hover:text-[#573681] transition-colors"
                >
                  +91 70454 51951
                </a>
              </div>
            </div>
          </div>

          {/* Column 5: Global Ingestion Map */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-start">
            <div className="relative w-full max-w-[340px] aspect-[662/340] select-none mx-auto lg:mx-0">
              <img
                src={footerMapImg}
                alt="SignalMint Global Telemetry Coverage Map"
                className="w-full h-full object-contain opacity-75"
              />

              {/* Pulsing Active Blue & Purple Hub Nodes */}
              {TELEMETRY_NODES.map((node) => (
                <div
                  key={node.id}
                  style={{ left: node.x, top: node.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                >
                  <span className="relative flex h-3 w-3">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        node.id === "bom" ? "bg-emerald-500" : "bg-[#573681]"
                      }`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-3 w-3 ${
                        node.id === "bom"
                          ? "bg-emerald-500 shadow-[0_0_12px_#10b981]"
                          : "bg-[#573681] shadow-[0_0_10px_#573681]"
                      }`}
                    ></span>
                  </span>

                  {/* High-Tech Telemetry Tooltip on Hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex flex-col gap-0.5 px-2.5 py-1 rounded-md bg-white text-[#1A0042] text-[9.5px] font-mono whitespace-nowrap shadow-xl border border-black/15 pointer-events-none z-30">
                    <span className="font-bold text-[#1A0042]">{node.label}</span>
                    <span className="text-[#573681] font-semibold text-[8.5px]">LATENCY: {node.ping} // ZERO PACKET LOSS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. INTERACTIVE FILTERABLE TICKER MARQUEE (SignalMint Context)              */}
        {/* ========================================================================= */}
        <div className="py-6 sm:py-8 border-b border-[#1A0042]/10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 overflow-hidden">
          
          {/* Pill Switch Filter in SignalMint Styling */}
          <div className="flex-shrink-0 flex items-center bg-[#E7E6FB]/70 p-1 rounded-full border border-[#1A0042]/10">
            <button
              onClick={() => setActiveTab("verticals")}
              className={`px-3.5 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === "verticals"
                  ? "bg-[#1A0042] text-white shadow-xs"
                  : "text-[#1A0042]/60 hover:text-[#1A0042]"
              }`}
            >
              Verticals
            </button>
            <button
              onClick={() => setActiveTab("protocols")}
              className={`px-3.5 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === "protocols"
                  ? "bg-[#1A0042] text-white shadow-xs"
                  : "text-[#1A0042]/60 hover:text-[#1A0042]"
              }`}
            >
              Protocols
            </button>
            <button
              onClick={() => setActiveTab("patterns")}
              className={`px-3.5 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === "patterns"
                  ? "bg-[#1A0042] text-white shadow-xs"
                  : "text-[#1A0042]/60 hover:text-[#1A0042]"
              }`}
            >
              Winning Patterns
            </button>
          </div>

          {/* Marquee Ticker Track with SignalMint Syne Font */}
          <div className="relative overflow-hidden w-full select-none [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
            <div className="flex items-center gap-6 whitespace-nowrap animate-marquee">
              {((TICKER_DATA[activeTab] || TICKER_DATA.verticals) as string[]).concat(
                (TICKER_DATA[activeTab] || TICKER_DATA.verticals) as string[]
              ).map((item, idx) => (
                <div
                  key={idx}
                  className="font-display font-semibold text-base sm:text-xl text-[#1A0042]/80 hover:text-[#573681] transition-colors flex items-center gap-4 cursor-default uppercase tracking-tight"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#573681]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ========================================================================= */}
        {/* 3. SUB-FOOTER LEGAL & METADATA BAR                                        */}
        {/* ========================================================================= */}
        <div className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] font-sans text-[#1A0042]/65">
          <div>
            &copy; 2026 SignalMint. Built for performance-first founders &amp; media buyers.
          </div>

          <div className="text-[#1A0042]/55 text-[10.5px]">
            SignalMint is an entity under <span className="font-semibold text-[#1A0042]/75">Apexway Technologies Pvt. Ltd.</span>
          </div>

          <div className="text-[#1A0042]/50 font-mono text-[9.5px]">
            SignalMint Performance Marketing. All rights reserved.
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. GIANT BOTTOM DOTTED WORDMARK WITH INTERACTIVE PARTICLE CANVAS          */}
        {/* ========================================================================= */}
        <div
          ref={containerRef}
          className="relative w-full h-32 sm:h-44 lg:h-56 mt-4 flex items-center justify-center select-none overflow-hidden"
          data-cursor=""
        >
          {/* Interactive Particle Canvas on top (disperse on hover/touch) */}
          <canvas
            ref={canvasRef}
            id="footer-particle-canvas"
            className="absolute inset-0 w-full h-full cursor-crosshair z-10 touch-pan-y"
          />

          {/* Circular Scroll-to-Top Button on Bottom-Left in SignalMint styling */}
          <button
            onClick={handleScrollToTop}
            className="absolute bottom-2 left-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#1A0042]/25 bg-white/85 hover:bg-[#573681] hover:text-white hover:border-[#573681] text-[#1A0042] flex items-center justify-center shadow-md transition-all duration-300 z-20 cursor-pointer group"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>

      {/* End of Website Accent Line (#573681) */}
      <div 
        className="w-full h-3.5 sm:h-4 lg:h-5 bg-[#573681]"
        style={{ backgroundColor: "#573681" }}
        role="separator"
        aria-hidden="true"
      />
    </footer>
  );
}
