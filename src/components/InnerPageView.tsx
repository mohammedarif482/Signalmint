import { useEffect } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Layers,
  Sparkles
} from "lucide-react";
import signalMintLogo from "../assets/signalmintlogo.svg";
import { INNER_PAGES_DATA, type InnerPageKey } from "../data/innerPagesData";
import { FooterKinetic } from "./FooterKinetic";

interface InnerPageViewProps {
  pageKey: InnerPageKey;
  onNavigate: (key: InnerPageKey | null, hash?: string) => void;
  onOpenDemoModal: () => void;
}

export function InnerPageView({ pageKey, onNavigate, onOpenDemoModal }: InnerPageViewProps) {
  const page = INNER_PAGES_DATA[pageKey] || INNER_PAGES_DATA["script-dna"];
  const IconComponent = page.icon;

  useEffect(() => {
    // Scroll directly to top on navigation to inner page
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pageKey]);

  return (
    <div className="min-h-screen inner-page-hero-mesh text-[#1A0042] selection:bg-[#573681] selection:text-white flex flex-col justify-between">
      {/* --------------------------------------------------------------------- */}
      {/* 1. DEDICATED INNER PAGE HUD HEADER                                    */}
      {/* --------------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-[#1A0042]/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo & Breadcrumb */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => onNavigate(null)}
              className="flex items-center gap-2.5 group cursor-pointer"
              aria-label="Return to SignalMint Home"
            >
              <img
                src={signalMintLogo}
                alt="SignalMint"
                className="h-6 sm:h-7 w-auto transition-transform group-hover:scale-105"
              />
            </button>

            {/* Breadcrumb path */}
            <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#1A0042]/60">
              <span className="text-[#1A0042]/30">/</span>
              <button 
                onClick={() => onNavigate(null)} 
                className="hover:text-[#573681] transition-colors cursor-pointer"
              >
                OVERVIEW
              </button>
              <span className="text-[#1A0042]/30">/</span>
              <span className="text-[#573681] font-bold uppercase truncate max-w-[200px] md:max-w-[300px]">
                {page.category.split("//")[0]?.trim() || "INTELLIGENCE"}
              </span>
              <span className="text-[#1A0042]/30">/</span>
              <span className="text-[#1A0042] font-semibold truncate max-w-[180px]">
                {page.title.split("&")[0]?.trim() || page.title}
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Back button */}
            <button
              onClick={() => onNavigate(null)}
              className="px-3 sm:px-3.5 py-1.5 rounded-full border border-[#1A0042]/15 bg-white/70 hover:bg-[#573681]/10 hover:border-[#573681]/40 text-[#1A0042] text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#573681]" />
              <span className="hidden sm:inline">Back to Overview</span>
              <span className="sm:hidden">Back</span>
            </button>

            {/* Book Audit Button */}
            <button
              onClick={onOpenDemoModal}
              className="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#573681] text-white hover:bg-[#1A0042] text-xs font-mono font-bold tracking-wide transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex items-center gap-1.5"
            >
              <span>Book Audit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* --------------------------------------------------------------------- */}
      {/* 2. INNER PAGE MAIN HERO & CONTENT                                     */}
      {/* --------------------------------------------------------------------- */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 w-full">
        
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-[#1A0042]/10 text-[11px] font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#573681]/10 text-[#573681] font-bold border border-[#573681]/25 uppercase tracking-wider">
              {page.badge}
            </span>
            <span className="text-[#1A0042]/60 uppercase tracking-wider font-semibold">
              {page.category}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#1A0042]/60">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-emerald-700">{page.telemetryStatus}</span>
            </div>
            <span className="hidden md:inline text-[#1A0042]/20">|</span>
            <span className="hidden md:inline font-mono text-[10px]">UPDATED: {page.lastUpdated}</span>
          </div>
        </div>

        {/* Page Title & Summary */}
        <div className="max-w-4xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#573681] text-white flex items-center justify-center shadow-xs">
              <IconComponent className="w-4 h-4" />
            </div>
            <span className="font-mono text-xs font-bold text-[#573681] uppercase tracking-widest">
              SIGNALMINT SPECIFICATION DOSSIER
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A0042] tracking-tight leading-[1.15] mb-5 font-sans">
            {page.title}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#1A0042]/80 font-sans leading-relaxed">
            {page.summary}
          </p>
        </div>

        {/* Two-Column Structured Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Content Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            {page.sections.map((section, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-[#1A0042]/10 shadow-xs hover:border-[#573681]/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full bg-[#573681]/10 text-[#573681] font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1A0042] font-sans">
                    {section.heading}
                  </h2>
                </div>

                <p className="text-[#1A0042]/80 leading-relaxed font-sans text-sm sm:text-base mb-4">
                  {section.body}
                </p>

                {section.bullets && section.bullets.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#1A0042]/10 space-y-2.5">
                    {section.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3 text-sm text-[#1A0042]/85 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-[#573681] shrink-0 mt-0.5" />
                        <span className="leading-snug">{bullet}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* In-Page Strategic Callout Box */}
            <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#573681]/10 via-[#573681]/5 to-transparent border border-[#573681]/25 relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#573681] mb-2">
                <Sparkles className="w-4 h-4" />
                <span>AGENCY EXECUTION DIRECTIVE</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A0042] mb-2 font-sans">
                Deploy this framework directly into your ad accounts
              </h3>
              <p className="text-xs sm:text-sm text-[#1A0042]/75 mb-5 font-sans leading-relaxed max-w-2xl">
                SignalMint audits, executes, and scales Meta and omnichannel ad spend with zero algorithmic hallucination and sub-12min intervention cooldowns.
              </p>
              <button
                onClick={onOpenDemoModal}
                className="px-5 py-2.5 rounded-full bg-[#573681] text-white hover:bg-[#1A0042] font-mono text-xs font-bold uppercase tracking-wide transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Request 30-Min Diagnostic Account Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Sidebar / Specs Column (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* 1. Specifications Table */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#1A0042]/12 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#1A0042]/10 font-mono text-[11px] font-bold uppercase text-[#1A0042]/60 tracking-wider">
                <Layers className="w-3.5 h-3.5 text-[#573681]" />
                <span>SYSTEM SPECIFICATIONS</span>
              </div>

              <div className="space-y-3 font-sans text-xs">
                {page.specifications.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-center justify-between gap-3 pb-2.5 border-b border-[#1A0042]/5 last:border-0 last:pb-0">
                    <span className="text-[#1A0042]/60 font-mono text-[11px]">{spec.label}</span>
                    <span className="font-semibold text-[#1A0042] text-right font-mono text-[11.5px] text-[#573681]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Direct Advisory Hotline Card (Highlight colored container + white button) */}
            <div className="bg-[#573681] text-white rounded-2xl p-5 sm:p-6 shadow-md border border-[#573681]/30">
              <div className="flex items-center gap-2 text-white/80 font-mono text-[10px] font-bold uppercase tracking-widest mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>DIRECT ADVISORY DESK</span>
              </div>

              <h4 className="text-base font-bold font-sans text-white mb-1.5">
                Speak directly with an agency partner
              </h4>
              <p className="text-xs text-white/80 font-sans mb-4 leading-relaxed">
                Have specific telemetry or procurement requirements? Reach our strategic media desk directly.
              </p>

              <a
                href="tel:+917045451951"
                className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-xs font-mono font-bold text-white mb-3 group"
              >
                <Phone className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
                <span>+91 70454 51951</span>
              </a>

              <button
                onClick={onOpenDemoModal}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-white/90 text-[#573681] hover:text-[#1A0042] font-mono text-xs font-bold uppercase tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer text-center"
              >
                Book 30-Min Audit
              </button>
            </div>

            {/* 3. Related Inner Pages Directory */}
            {page.relatedKeys && page.relatedKeys.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-[#1A0042]/10 shadow-xs">
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1A0042]/50 mb-3">
                  RELATED DIRECTORY SPECIFICATIONS
                </div>
                <div className="space-y-2">
                  {page.relatedKeys.map((relKey) => {
                    const relPage = INNER_PAGES_DATA[relKey];
                    if (!relPage) return null;
                    return (
                      <button
                        key={relKey}
                        type="button"
                        onClick={() => onNavigate(relKey)}
                        className="w-full text-left p-2.5 rounded-xl bg-[#FAFAFD] hover:bg-[#573681]/10 border border-[#1A0042]/5 hover:border-[#573681]/30 transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="font-mono text-[9px] uppercase text-[#573681] font-bold">
                            {relPage.badge}
                          </div>
                          <div className="font-sans text-xs font-semibold text-[#1A0042] group-hover:text-[#573681] transition-colors line-clamp-1">
                            {relPage.title}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#1A0042]/40 group-hover:text-[#573681] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* --------------------------------------------------------------------- */}
      {/* 3. FULL KINETIC FOOTER ON INNER PAGE (WITH SEPARATED BG & TRANSITION) */}
      {/* --------------------------------------------------------------------- */}
      <FooterKinetic
        onOpenDemoModal={onOpenDemoModal}
        onOpenInnerPage={(key) => onNavigate(key)}
        onNavigateHomeAnchor={(hash) => onNavigate(null, hash)}
      />
    </div>
  );
}
