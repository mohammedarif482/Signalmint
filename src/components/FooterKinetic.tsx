import { useState, useEffect, useRef } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import footerTunnelImg from "../assets/footer-tunnel.jpg";
import footerMapImg from "../assets/footer-map.png";

interface FooterKineticProps {
  onOpenDemoModal?: () => void;
}

// Data for Category Filter Ticker
const TICKER_DATA = {
  verticals: [
    "Meta Ads Scaling",
    "Google Performance Max",
    "TikTok Commerce",
    "Amazon DSP & Ads",
    "Retention Telemetry",
    "D2C Apparel & Footwear",
    "Health & Wellness",
    "SaaS & Enterprise B2B",
    "High-Ticket DTC",
    "Consumer Electronics",
    "Fintech & Crypto",
    "Beauty & Skincare",
  ],
  capabilities: [
    "Autonomous Kill Switches",
    "Sub-12min CPA Alerts",
    "Script DNA Reverse Engineering",
    "Hook Retention Curves",
    "0–3s Acoustic Analysis",
    "Competitor Ad Archaeology",
    "Creative Fatigue Predictor",
    "Zero Data Training Protocol",
    "SOC-2 Type II Certified",
    "24/7 Spend Guardrails",
    "Multi-Account Telemetry",
    "Automated Creative X-Ray",
  ],
};

// Map Pin Nodes
const MAP_PINS = [
  { id: "sf", x: "18.5%", y: "37%", label: "San Francisco" },
  { id: "nyc", x: "28.5%", y: "35%", label: "New York" },
  { id: "lon", x: "48.2%", y: "27%", label: "London" },
  { id: "hk", x: "77.5%", y: "46%", label: "Hong Kong" },
  { id: "sg", x: "75.0%", y: "58%", label: "Singapore" },
  { id: "syd", x: "87.5%", y: "81%", label: "Sydney" },
];

export function FooterKinetic({ onOpenDemoModal }: FooterKineticProps) {
  const [activeTab, setActiveTab] = useState<"verticals" | "capabilities">("verticals");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
      radius: 80 * dpr,
      actualRadius: 80 * dpr,
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
        this.targetEase = 0.2 + Math.random() * 0.15;
        this.friction = 0.82 + Math.random() * 0.1;
        this.size = 1.9 * dpr;
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
            const force = -((mouse.actualRadius - dist) / mouse.actualRadius) * 65 * (0.6 + Math.random() * 0.4);
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

      // Dynamically size font to fit container width exactly
      const text = "SIGNALMINT";
      let fontSize = Math.floor(offscreen.width / 7.2);
      offCtx.font = `900 ${fontSize}px 'Syne', 'Inter', -apple-system, sans-serif`;
      let textWidth = offCtx.measureText(text).width;

      if (textWidth > offscreen.width * 0.96) {
        fontSize = Math.floor(fontSize * ((offscreen.width * 0.96) / textWidth));
        offCtx.font = `900 ${fontSize}px 'Syne', 'Inter', -apple-system, sans-serif`;
        textWidth = offCtx.measureText(text).width;
      }

      const textX = (offscreen.width - textWidth) / 2;
      const textY = offscreen.height * 0.76;

      // Draw stroked outline + filled glyphs for solid dotted density
      offCtx.lineWidth = 1.5 * dpr;
      offCtx.strokeText(text, textX, textY);
      offCtx.fillText(text, textX, textY);

      const imgData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
      const data = imgData.data;

      particles = [];
      const gap = Math.round(4.5 * dpr);

      for (let y = 0; y < offscreen.height; y += gap) {
        for (let x = 0; x < offscreen.width; x += gap) {
          const index = (y * offscreen.width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 35) {
            // Subtle tonal dot shading matching United Carriers monochrome
            const dotColor = "rgba(26, 0, 66, 0.45)";
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
    <footer className="relative w-full bg-[#FAFAFD] text-[#1A0042] pt-16 sm:pt-24 pb-8 overflow-hidden border-t border-[#1A0042]/10 selection:bg-[#1516A8] selection:text-white">
      {/* Outer Max Container */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* ========================================================================= */}
        {/* 1. TOP EDITORIAL TAGLINE & NAVIGATION GRID                                */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-[#1A0042]/10">
          
          {/* Top Left: Editorial Tagline */}
          <div className="lg:col-span-3">
            <p className="font-sans font-medium text-base sm:text-lg text-[#1A0042] leading-[1.35] tracking-tight">
              One system.<br />
              Every dollar accountable.
            </p>
          </div>

          {/* Column 2: Socials */}
          <div className="lg:col-span-2">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#1A0042]/50 mb-3 sm:mb-4">
              Socials
            </div>
            <div className="flex items-center gap-2.5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#1A0042]/20 flex items-center justify-center text-[#1A0042] hover:bg-[#1516A8] hover:text-white hover:border-[#1516A8] transition-all duration-200 group"
                aria-label="SignalMint on LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 40 40" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.2847 17.978H20.7607V19.2114C21.1174 18.502 22.032 17.8647 23.406 17.8647C26.04 17.8647 26.6654 19.2767 26.6654 21.8674V26.6654H23.9987V22.4574C23.9987 20.982 23.642 20.15 22.734 20.15C21.4747 20.15 20.9514 21.0467 20.9514 22.4567V26.6654H18.2847V17.978ZM13.712 26.552H16.3787V17.8647H13.712V26.552ZM16.7607 15.032C16.7608 15.2555 16.7165 15.4769 16.6303 15.6831C16.5441 15.8893 16.4178 16.0764 16.2587 16.2334C15.9363 16.5538 15.4999 16.7331 15.0454 16.732C14.5916 16.7317 14.1562 16.5528 13.8334 16.234C13.6748 16.0765 13.549 15.8892 13.4629 15.683C13.3769 15.4767 13.3324 15.2555 13.332 15.032C13.332 14.5807 13.512 14.1487 13.834 13.83C14.1566 13.5108 14.5922 13.3318 15.046 13.332C15.5007 13.332 15.9367 13.5114 16.2587 13.83C16.58 14.1487 16.7607 14.5807 16.7607 15.032Z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#1A0042]/20 flex items-center justify-center text-[#1A0042] hover:bg-[#1516A8] hover:text-white hover:border-[#1516A8] transition-all duration-200 group"
                aria-label="SignalMint on Twitter"
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#1A0042]/20 flex items-center justify-center text-[#1A0042] hover:bg-[#1516A8] hover:text-white hover:border-[#1516A8] transition-all duration-200 group"
                aria-label="SignalMint on GitHub"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 3: Company Navigation (3 Sub-Columns) */}
          <div className="lg:col-span-4">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#1A0042]/50 mb-3 sm:mb-4">
              Company
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm font-sans">
              <div className="flex flex-col gap-2.5">
                <a href="#" className="font-semibold text-[#1516A8] hover:underline flex items-center gap-1 group">
                  <span>Home</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#agents" className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>About us</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" onClick={onOpenDemoModal} className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>Careers</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              <div className="flex flex-col gap-2.5">
                <a href="#showcase" className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>Insights</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" onClick={onOpenDemoModal} className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>Docs</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>Community</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              <div className="flex flex-col gap-2.5">
                <a href="#showcase" className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>Verticals</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#agents" className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>Services</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" onClick={onOpenDemoModal} className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>Contact us</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Secure Payments & Infrastructure Badges */}
          <div className="lg:col-span-3">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#1A0042]/50 mb-2">
              Secure Payments
            </div>
            <p className="font-sans text-xs text-[#1A0042]/70 leading-relaxed mb-3">
              Payments secured via PCI-DSS compliant gateway.<br />
              Card details are not stored.
            </p>

            {/* Authentic Payment & Infrastructure Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {/* Visa */}
              <div className="h-6 w-9 rounded bg-white border border-[#1A0042]/15 flex items-center justify-center shadow-2xs">
                <span className="font-sans font-black italic text-[9px] tracking-tight text-[#1A0042]">VISA</span>
              </div>
              {/* Mastercard */}
              <div className="h-6 w-9 rounded bg-white border border-[#1A0042]/15 flex items-center justify-center shadow-2xs">
                <div className="flex items-center -space-x-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B] opacity-90" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90" />
                </div>
              </div>
              {/* Amex */}
              <div className="h-6 w-9 rounded bg-[#006FCF] flex items-center justify-center shadow-2xs">
                <span className="font-mono font-extrabold text-[8px] tracking-tighter text-white">AMEX</span>
              </div>
              {/* Discover */}
              <div className="h-6 w-9 rounded bg-white border border-[#1A0042]/15 flex items-center justify-center shadow-2xs">
                <span className="font-sans font-bold text-[7.5px] text-[#FF6000]">DISCOVER</span>
              </div>
              {/* Diners Club */}
              <div className="h-6 w-9 rounded bg-white border border-[#1A0042]/15 flex items-center justify-center shadow-2xs">
                <span className="font-mono font-bold text-[7.5px] text-[#0079BE]">DINERS</span>
              </div>
              {/* UnionPay */}
              <div className="h-6 w-9 rounded bg-white border border-[#1A0042]/15 flex items-center justify-center shadow-2xs">
                <div className="flex items-center space-x-0.5">
                  <div className="w-1.5 h-3 bg-[#E21836] rounded-2xs" />
                  <div className="w-1.5 h-3 bg-[#00447C] rounded-2xs" />
                  <div className="w-1.5 h-3 bg-[#007B84] rounded-2xs" />
                </div>
              </div>
              {/* Apple Pay */}
              <div className="h-6 w-9 rounded bg-white border border-[#1A0042]/15 flex items-center justify-center shadow-2xs">
                <span className="font-sans font-bold text-[8px] text-black">Pay</span>
              </div>
              {/* PCI-DSS */}
              <div className="h-6 w-9 rounded bg-white border border-[#1A0042]/15 flex items-center justify-center shadow-2xs">
                <span className="font-mono font-bold text-[7px] text-[#1516A8]">PCI-DSS</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. INTERACTIVE FILTERABLE TICKER MARQUEE (footer-info)                     */}
        {/* ========================================================================= */}
        <div className="py-6 sm:py-8 border-b border-[#1A0042]/10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 overflow-hidden">
          
          {/* Pill Switch Filter */}
          <div className="flex-shrink-0 flex items-center bg-[#E7E6FB]/60 p-1 rounded-full border border-[#1A0042]/10">
            <button
              onClick={() => setActiveTab("verticals")}
              className={`px-3.5 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === "verticals"
                  ? "bg-white text-[#1A0042] shadow-xs"
                  : "text-[#1A0042]/60 hover:text-[#1A0042]"
              }`}
            >
              Verticals
            </button>
            <button
              onClick={() => setActiveTab("capabilities")}
              className={`px-3.5 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === "capabilities"
                  ? "bg-white text-[#1A0042] shadow-xs"
                  : "text-[#1A0042]/60 hover:text-[#1A0042]"
              }`}
            >
              Capabilities
            </button>
          </div>

          {/* Marquee Ticker Track */}
          <div className="relative overflow-hidden w-full select-none [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
            <div className="flex items-center gap-6 whitespace-nowrap animate-marquee">
              {TICKER_DATA[activeTab].concat(TICKER_DATA[activeTab]).map((item, idx) => (
                <div
                  key={idx}
                  className="font-sans font-medium text-lg sm:text-2xl text-[#1A0042]/70 hover:text-[#1516A8] transition-colors flex items-center gap-5 cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1516A8]/40" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. LOWER GRID: CINEMATIC IMAGE, ADDRESS, CONTACT & DOTTED WORLD MAP      */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 py-12 sm:py-16 border-b border-[#1A0042]/10 items-center">
          
          {/* Left: Cinematic Tunnel Image */}
          <div className="md:col-span-3">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#1A0042]/15 shadow-sm group">
              <img
                src={footerTunnelImg}
                alt="SignalMint Autonomous Telemetry Tunnel"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#1A0042]/10 mix-blend-multiply pointer-events-none" />
            </div>
          </div>

          {/* Column 2: Head Office & Operating Regions */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#1A0042]/50 mb-2">
                Head Office
              </div>
              <p className="font-sans font-medium text-sm text-[#1A0042] leading-snug">
                2A International Square,<br />
                San Francisco, CA 94105, USA.
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-sans text-xs text-[#1516A8] hover:underline mt-2 font-semibold"
              >
                <span>↳ Direction on Google</span>
              </a>
            </div>

            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#1A0042]/50 mb-1.5">
                Operating Across
              </div>
              <p className="font-sans text-xs font-semibold text-[#1A0042]/80">
                North America <span className="text-[#1A0042]/30">/</span> Europe <span className="text-[#1A0042]/30">/</span> Asia-Pacific <span className="text-[#1A0042]/30">/</span> LATAM
              </p>
            </div>
          </div>

          {/* Column 3: Contact Details & Telemetry Hours */}
          <div className="md:col-span-2 space-y-5">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#1A0042]/50 mb-1">
                Email
              </div>
              <a
                href="mailto:intel@signalmint.com"
                className="font-sans font-medium text-xs sm:text-sm text-[#1A0042] hover:text-[#1516A8] transition-colors"
              >
                intel@signalmint.com
              </a>
            </div>

            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#1A0042]/50 mb-1">
                Hotline
              </div>
              <a
                href="tel:1800744625"
                className="font-sans font-bold text-sm text-[#1A0042] hover:text-[#1516A8] transition-colors"
              >
                +1 (800) SIGNAL-M
              </a>
            </div>

            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#1A0042]/50 mb-1">
                Office Hours
              </div>
              <p className="font-sans text-xs text-[#1A0042]/80 font-medium">
                24/7/365 Autonomous Telemetry
              </p>
            </div>
          </div>

          {/* Column 4: Dotted World Map with Glowing Signal Hubs */}
          <div className="md:col-span-4 relative flex items-center justify-center">
            <div className="relative w-full max-w-[360px] aspect-[662/340] select-none">
              <img
                src={footerMapImg}
                alt="SignalMint Global Telemetry Coverage Map"
                className="w-full h-full object-contain opacity-75"
              />

              {/* Pulsing Active Blue Hub Nodes */}
              {MAP_PINS.map((pin) => (
                <div
                  key={pin.id}
                  style={{ left: pin.x, top: pin.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1516A8] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1516A8] shadow-[0_0_8px_#1516A8]"></span>
                  </span>

                  {/* Tooltip on Hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block px-2 py-0.5 rounded bg-[#1A0042] text-white text-[9px] font-mono whitespace-nowrap shadow-md pointer-events-none z-30">
                    {pin.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. SUB-FOOTER LEGAL & METADATA BAR (footer-bot)                           */}
        {/* ========================================================================= */}
        <div className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[10px] sm:text-[11px] font-mono text-[#1A0042]/60">
          <div>
            &copy; 2026 SignalMint Inc. Built for Autonomous Performance.
          </div>

          {/* Legal Menu Links */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 uppercase tracking-wider font-semibold">
            <a href="#" className="hover:text-[#1516A8] transition-colors">QHSE</a>
            <a href="#" className="hover:text-[#1516A8] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#1516A8] transition-colors">Terms &amp; Conditions</a>
            <a href="#" className="hover:text-[#1516A8] transition-colors">Payment Policy</a>
            <a href="#" className="hover:text-[#1516A8] transition-colors">Delivery Policy</a>
            <a href="#" className="hover:text-[#1516A8] transition-colors">Cookie Settings</a>
          </div>

          <div className="text-[#1A0042]/50">
            All telemetry computed client-side. Powered by Stripe.
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. GIANT BOTTOM DOTTED WORDMARK WITH INTERACTIVE PARTICLE CANVAS          */}
        {/* ========================================================================= */}
        <div
          ref={containerRef}
          className="relative w-full h-32 sm:h-44 lg:h-56 mt-4 flex items-center justify-center select-none overflow-hidden"
          data-cursor="repel"
        >
          {/* Interactive Particle Canvas on top (disperse on hover/touch) */}
          <canvas
            ref={canvasRef}
            id="footer-particle-canvas"
            className="absolute inset-0 w-full h-full cursor-crosshair z-10"
          />

          {/* Circular Scroll-to-Top Button on Bottom-Left */}
          <button
            onClick={handleScrollToTop}
            className="absolute bottom-2 left-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#1A0042]/25 bg-white/80 hover:bg-[#1516A8] hover:text-white hover:border-[#1516A8] text-[#1A0042] flex items-center justify-center shadow-sm transition-all duration-300 z-20 cursor-pointer group"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
