import { ExternalLink } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CALENDLY_URL = "https://calendly.com/signalmint-work/signalmint-demo-call?hide_gdpr_banner=1&primary_color=573681&text_color=1a0042";

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  if (!isOpen) return null;

  const handleOpenCalendlyNewTab = () => {
    window.open("https://calendly.com/signalmint-work/signalmint-demo-call?month=2026-09", "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-white/30 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAFAFD] border border-[#1A0042]/15 rounded-3xl w-full max-w-4xl h-[92vh] sm:h-[86vh] shadow-2xl relative overflow-hidden flex flex-col transition-all duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#E7E6FB] text-[#1A0042] font-mono text-sm font-bold flex items-center justify-center hover:bg-[#1A0042] hover:text-white transition-colors cursor-pointer shadow-xs"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Top Header */}
        <div className="border-b border-[#1A0042]/10 bg-[#E7E6FB]/40 p-4 sm:p-6 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pr-8">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] sm:text-xs font-bold text-[#573681] bg-[#573681]/10 border border-[#573681]/20 px-2.5 py-0.5 rounded-full uppercase">
                30-MIN ACCOUNT AUDIT // DIRECT STRATEGY DESK
              </span>
            </div>

            {/* Quick Open in Calendly link */}
            <button
              onClick={handleOpenCalendlyNewTab}
              className="hidden sm:inline-flex items-center gap-1 font-mono text-[10.5px] font-bold text-[#573681] hover:underline cursor-pointer"
            >
              <span>Open in Calendly</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mt-2">
            <div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-[#1A0042] uppercase tracking-tight">
                BOOK YOUR ACCOUNT AUDIT
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#1A0042]/75 mt-0.5">
                Select an open time slot directly below. We'll run a screen-share audit of your real ad accounts.
              </p>
            </div>
          </div>
        </div>

        {/* Embedded Calendly Live Scheduling Widget */}
        <div className="flex-1 w-full relative overflow-hidden bg-white">
          <iframe
            src={CALENDLY_URL}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Select a Date & Time - Calendly"
            className="w-full h-full min-h-[460px] border-none"
          />
        </div>
      </div>
    </div>
  );
}
