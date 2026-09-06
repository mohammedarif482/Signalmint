import { useState, useEffect, useRef } from "react";
import { ArrowUp, ArrowUpRight, ShieldCheck, Activity, Terminal } from "lucide-react";
import signalMintLogo from "../assets/signalmintlogo.svg";
import footerTunnelImg from "../assets/footer-tunnel.jpg";
import footerMapImg from "../assets/footer-map.png";
import genericTechnoFontUrl from "../assets/font/GenericTechno.otf";

interface FooterKineticProps {
  onOpenDemoModal?: () => void;
}

// Data for Category Filter Ticker strictly in SignalMint Context
const TICKER_DATA = {
  verticals: [
    "Health & Performance DTC",
    "High-Ticket B2B SaaS",
    "Skincare & Biomimetic Formulations",
    "Apparel & High-Velocity Fashion",
    "Mobile Apps & Subscription Gaming",
    "Consumer Hardware & Tech",
    "Fintech & Automated Trading",
    "Functional Energy Beverages",
    "EdTech & Masterclasses",
    "Home & Ergonomic Sleep Labs",
    "Pet Wellness & Supplements",
    "Direct-Response Performance Media",
  ],
  protocols: [
    "Sub-12min CPA Spike Auto-Kill",
    "0–3s Sensory Shock Audio Detection",
    "Hook Retention Cliff Prevention",
    "Script DNA Reverse Engineering",
    "Mechanism-of-Action Visual Classifier",
    "Contrarian Tear-Down Cadence Parser",
    "Split-Screen Dashboard Contrast Audit",
    "24/7 Autonomous Budget Bodyguard",
    "Cross-Account Creative Fatigue Predictor",
    "Zero-Data Training Client-Side Protocol",
    "Multi-Account Webhook Intervention",
    "Live ROAS Bleed Neutralization",
  ],
  patterns: [
    "The \"Sensory Shock\" ASMR Pattern (6.4x ROAS)",
    "The \"Contrarian Tear-Down\" Pattern (5.2x ROAS)",
    "The \"Split-Screen Teardown\" Pattern (4.8x ROAS)",
    "The \"Mechanism-of-Action\" Thermal Layer",
    "The \"Immediate Objection Raised & Solved\" Hook",
    "The \"Frictionless Social Proof\" Cadence",
    "The \"Acoustic Fracture\" Attention Lock",
  ],
};

// Global Telemetry Nodes
const TELEMETRY_NODES = [
  { id: "bom", x: "69.0%", y: "48%", label: "Primary HQ (Mumbai, IN)", ping: "2ms", active: true },
  { id: "sf", x: "18.5%", y: "37%", label: "US-West Core (San Francisco)", ping: "4ms", active: true },
  { id: "nyc", x: "28.5%", y: "35%", label: "US-East Ingestion (New York)", ping: "11ms", active: true },
  { id: "lon", x: "48.2%", y: "27%", label: "EU-Central Engine (London)", ping: "16ms", active: true },
  { id: "hk", x: "77.5%", y: "46%", label: "APAC Hardware Relay (Hong Kong)", ping: "28ms", active: true },
  { id: "sg", x: "75.0%", y: "58%", label: "Southeast Asia Gateway (Singapore)", ping: "32ms", active: true },
  { id: "syd", x: "87.5%", y: "81%", label: "Oceania Edge Monitor (Sydney)", ping: "41ms", active: true },
];

export function FooterKinetic({ onOpenDemoModal }: FooterKineticProps) {
  const [activeTab, setActiveTab] = useState<"verticals" | "protocols" | "patterns">("verticals");
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
    <footer className="relative w-full bg-[#FAFAFD] text-[#1A0042] pt-16 sm:pt-24 pb-8 overflow-hidden border-t border-[#1A0042]/10 selection:bg-[#1516A8] selection:text-white">
      {/* Ambient background light gradients */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#E7E6FB] filter blur-[120px] pointer-events-none opacity-50" />

      {/* Outer Max Container */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. TOP EDITORIAL TAGLINE & NAVIGATION GRID                                */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-[#1A0042]/10">
          
          {/* Top Left: Brand Mark + Tagline */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Brand Logo Header */}
              <div className="flex items-center gap-3 mb-5">
                <img
                  src={signalMintLogo}
                  alt="SignalMint"
                  className="h-6 sm:h-7 w-auto object-contain"
                />
                <span className="font-mono text-[9px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#1516A8]/10 text-[#1516A8] border border-[#1516A8]/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1516A8] animate-pulse"></span>
                  AUTONOMOUS V2.4
                </span>
              </div>

              {/* Commanding Grotesque Headline in SignalMint Syne Font */}
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#1A0042] leading-[1.08] uppercase tracking-tight">
                TWO AGENTS.<br />
                ONE FINDS WINNERS.<br />
                <span className="text-[#1516A8]">ONE STOPS THE BLEEDING.</span>
              </h3>

              {/* Subtext in Playfair Display serif italic */}
              <p className="font-serif italic text-sm sm:text-base text-[#4D0181] mt-2.5 opacity-90">
                (Both run 24/7. You never touch them.)
              </p>
            </div>

            {/* Social Channels Row */}
            <div className="pt-6">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A0042]/50 mb-3">
                INTELLIGENCE FEEDS &amp; REPO
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-[#1A0042]/20 bg-white/50 flex items-center justify-center text-[#1A0042] hover:bg-[#1516A8] hover:text-white hover:border-[#1516A8] transition-all duration-200 group shadow-2xs"
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
                  className="w-9 h-9 rounded-full border border-[#1A0042]/20 bg-white/50 flex items-center justify-center text-[#1A0042] hover:bg-[#1516A8] hover:text-white hover:border-[#1516A8] transition-all duration-200 group shadow-2xs"
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
                  className="w-9 h-9 rounded-full border border-[#1A0042]/20 bg-white/50 flex items-center justify-center text-[#1A0042] hover:bg-[#1516A8] hover:text-white hover:border-[#1516A8] transition-all duration-200 group shadow-2xs"
                  aria-label="SignalMint on GitHub"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Platform Directory (3 Sub-Columns in SignalMint Context) */}
          <div className="lg:col-span-5">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A0042]/50 mb-4">
              PLATFORM DIRECTORY
            </div>
            <div className="grid grid-cols-3 gap-4 text-xs font-sans">
              
              {/* Sub-Col 1: Agents & Radar */}
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-[9px] font-extrabold uppercase text-[#1516A8] tracking-widest pb-1 border-b border-[#1A0042]/10">
                  AGENTS
                </span>
                <a href="#agents" className="font-semibold text-[#1A0042] hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>01 // Scout</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#agents" className="font-semibold text-[#1A0042] hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>02 // Atlas</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#showcase" className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>03 // Crown</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" onClick={onOpenDemoModal} className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>Live Radar</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* Sub-Col 2: Workflows & Intelligence */}
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-[9px] font-extrabold uppercase text-[#4D0181] tracking-widest pb-1 border-b border-[#1A0042]/10">
                  INTELLIGENCE
                </span>
                <a href="#showcase" className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>Script DNA</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#showcase" className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>Hook Cadence</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" onClick={onOpenDemoModal} className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>Creative X-Ray</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" onClick={onOpenDemoModal} className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>Fatigue Index</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* Sub-Col 3: Enterprise & Protocols */}
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-[9px] font-extrabold uppercase text-[#1A0042]/60 tracking-widest pb-1 border-b border-[#1A0042]/10">
                  PROTOCOLS
                </span>
                <a href="#" onClick={onOpenDemoModal} className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>Zero-Data SLA</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" onClick={onOpenDemoModal} className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>API Docs</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" onClick={onOpenDemoModal} className="text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-1 group">
                  <span>SOC-2 Report</span>
                  <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#" onClick={onOpenDemoModal} className="font-bold text-[#1516A8] hover:underline flex items-center gap-1 group">
                  <span>VIP Audit ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: API Infrastructure, Ad Networks & Security Badges */}
          <div className="lg:col-span-3">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A0042]/50 mb-2.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1516A8]" />
              <span>SECURITY &amp; INTEGRITY</span>
            </div>
            
            <p className="font-sans text-xs text-[#1A0042]/75 leading-relaxed mb-3.5">
              Official Marketing API integrations. Sub-12min intervention cooldown. Your ad account data is strictly client-side and never trained on.
            </p>

            {/* Authentic Ad Network & Security Compliance Badges */}
            <div className="space-y-2">
              {/* Ad Partner Integrations Row */}
              <div className="flex flex-wrap items-center gap-1.5">
                {/* Meta Partner */}
                <div className="h-6 px-2 rounded bg-white border border-[#1A0042]/15 flex items-center gap-1 text-[8.5px] font-mono font-bold text-[#1A0042] shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>META API</span>
                </div>
                {/* Google Ads */}
                <div className="h-6 px-2 rounded bg-white border border-[#1A0042]/15 flex items-center gap-1 text-[8.5px] font-mono font-bold text-[#1A0042] shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>GOOGLE PMAX</span>
                </div>
                {/* TikTok Partner */}
                <div className="h-6 px-2 rounded bg-white border border-[#1A0042]/15 flex items-center gap-1 text-[8.5px] font-mono font-bold text-[#1A0042] shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-black" />
                  <span>TIKTOK</span>
                </div>
                {/* Amazon DSP */}
                <div className="h-6 px-2 rounded bg-white border border-[#1A0042]/15 flex items-center gap-1 text-[8.5px] font-mono font-bold text-[#1A0042] shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>AMAZON DSP</span>
                </div>
              </div>

              {/* Compliance & Payment Badges Row */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {/* SOC-2 */}
                <div className="h-6 px-2 rounded bg-[#1516A8]/10 border border-[#1516A8]/25 flex items-center gap-1 text-[8px] font-mono font-extrabold text-[#1516A8]">
                  <span className="w-1 h-1 rounded-full bg-emerald-600" />
                  <span>SOC-2 TYPE II</span>
                </div>
                {/* TLS 1.3 */}
                <div className="h-6 px-1.5 rounded bg-white border border-[#1A0042]/15 flex items-center text-[8px] font-mono font-bold text-[#1A0042]">
                  <span>TLS 1.3</span>
                </div>
                {/* Apple Pay */}
                <div className="h-6 w-9 rounded bg-white border border-[#1A0042]/15 flex items-center justify-center shadow-2xs">
                  <span className="font-sans font-bold text-[8px] text-black">Pay</span>
                </div>
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
              </div>
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
                  className="font-display font-semibold text-base sm:text-xl text-[#1A0042]/80 hover:text-[#1516A8] transition-colors flex items-center gap-4 cursor-default uppercase tracking-tight"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1516A8]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. LOWER GRID: TELEMETRY LAB, COMMAND DESK & GLOBAL INGESTION MAP        */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 py-12 sm:py-16 border-b border-[#1A0042]/10 items-center">
          
          {/* Left: SignalMint Optical Telemetry Corridor (HUD Frame) */}
          <div className="md:col-span-3">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#1A0042]/20 shadow-md group bg-[#1A0042]">
              <img
                src={footerTunnelImg}
                alt="SignalMint Autonomous Telemetry Corridor"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-[#1A0042]/25 mix-blend-multiply pointer-events-none" />
              
              {/* HUD Frame Elements */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-[8.5px] font-mono text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SCOUT OPTICAL // CAM 08</span>
              </div>

              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 py-1 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-[8px] font-mono text-white/80">
                <span className="flex items-center gap-1">
                  <Terminal className="w-2.5 h-2.5 text-[#6495EB]" />
                  <span>FRAME // 0:02.40 PEAK</span>
                </span>
                <span className="text-emerald-400 font-bold">ROAS 6.4x</span>
              </div>
            </div>
          </div>

          {/* Column 2: Locations & Headquarters */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A0042]/50 mb-3 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1516A8]"></span>
                <span>LOCATIONS (1)</span>
              </div>
              
              <div className="space-y-0.5">
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1516A8]">
                  Primary
                </div>
                <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1A0042]/60">
                  Headquarters
                </div>
                <p className="font-display font-extrabold text-xl sm:text-2xl text-[#1A0042] tracking-tight pt-0.5">
                  Mumbai, IN
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=Mumbai,India"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-sans text-xs text-[#1516A8] hover:underline mt-2.5 font-semibold"
              >
                <span>↳ Telemetry Command Center ↗</span>
              </a>
            </div>

            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A0042]/50 mb-1.5">
                PRIMARY INGESTION NODES
              </div>
              <p className="font-sans text-xs font-semibold text-[#1A0042]/80 leading-relaxed">
                IN-West (Mumbai) <span className="text-[#1A0042]/30">/</span> US-West (SF) <span className="text-[#1A0042]/30">/</span> US-East (NYC) <span className="text-[#1A0042]/30">/</span> EU-Central (LON) <span className="text-[#1A0042]/30">/</span> SG Gateway
              </p>
            </div>
          </div>

          {/* Column 3: Contact Details & Telemetry Hours */}
          <div className="md:col-span-2 space-y-5">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A0042]/50 mb-1">
                INTEL DESK
              </div>
              <a
                href="mailto:intel@signalmint.com"
                className="font-mono font-bold text-xs sm:text-[13px] text-[#1516A8] hover:underline"
              >
                intel@signalmint.com
              </a>
            </div>

            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A0042]/50 mb-1">
                EMERGENCY SPEND HOTLINE
              </div>
              <a
                href="tel:1800744625"
                className="font-mono font-bold text-xs sm:text-sm text-[#1A0042] hover:text-[#1516A8] transition-colors"
              >
                +1 (800) SIGNAL-M
              </a>
            </div>

            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A0042]/50 mb-1 flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-600" />
                <span>ENGINE STATUS</span>
              </div>
              <p className="font-sans text-xs text-[#1A0042]/80 font-semibold">
                ● 24/7/365 Autonomous Guardrails Active (Δt ≤ 12 min)
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
                        node.id === "bom" ? "bg-emerald-500" : "bg-[#1516A8]"
                      }`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-3 w-3 ${
                        node.id === "bom"
                          ? "bg-emerald-500 shadow-[0_0_12px_#10b981]"
                          : "bg-[#1516A8] shadow-[0_0_10px_#1516A8]"
                      }`}
                    ></span>
                  </span>

                  {/* High-Tech Telemetry Tooltip on Hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex flex-col gap-0.5 px-2.5 py-1 rounded-md bg-[#1A0042] text-white text-[9.5px] font-mono whitespace-nowrap shadow-xl border border-white/10 pointer-events-none z-30">
                    <span className="font-bold text-white">{node.label}</span>
                    <span className="text-[#6495EB] text-[8.5px]">LATENCY: {node.ping} // ZERO PACKET LOSS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. SUB-FOOTER LEGAL & METADATA BAR (SignalMint Protocol)                  */}
        {/* ========================================================================= */}
        <div className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[10.5px] font-mono text-[#1A0042]/65">
          <div>
            &copy; 2026 SignalMint Inc. Built for performance-first founders &amp; media buyers.
          </div>

          {/* Legal Menu Links */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 uppercase tracking-wider font-semibold">
            <a href="#" className="hover:text-[#1516A8] transition-colors">SOC-2 TYPE II</a>
            <a href="#" className="hover:text-[#1516A8] transition-colors">ZERO-DATA PRIVACY</a>
            <a href="#" className="hover:text-[#1516A8] transition-colors">TERMS OF TELEMETRY</a>
            <a href="#" className="hover:text-[#1516A8] transition-colors">SLA &amp; SECURITY</a>
            <a href="#" className="hover:text-[#1516A8] transition-colors">RESPONSIBLE AI</a>
            <a href="#" className="hover:text-[#1516A8] transition-colors">COOKIE SETTINGS</a>
          </div>

          <div className="text-[#1A0042]/50 font-mono text-[10px]">
            Autonomous cooldown Δt ≤ 12 min. Powered by Scout &amp; Atlas.
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. GIANT BOTTOM DOTTED WORDMARK WITH INTERACTIVE PARTICLE CANVAS          */}
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
            className="absolute inset-0 w-full h-full cursor-crosshair z-10"
          />

          {/* Circular Scroll-to-Top Button on Bottom-Left in SignalMint styling */}
          <button
            onClick={handleScrollToTop}
            className="absolute bottom-2 left-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#1A0042]/25 bg-white/85 hover:bg-[#1516A8] hover:text-white hover:border-[#1516A8] text-[#1A0042] flex items-center justify-center shadow-md transition-all duration-300 z-20 cursor-pointer group"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
