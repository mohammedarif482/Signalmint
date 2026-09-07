import { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle, ArrowRight, Calendar, ExternalLink } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CALENDLY_URL = "https://calendly.com/signalmint-work/signalmint-demo-call?hide_gdpr_banner=1&primary_color=573681&text_color=1a0042";

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [activeTab, setActiveTab] = useState<"calendar" | "quick-request">("calendar");
  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    brandUrl: "",
    monthlySpend: "₹2M – ₹5M / mo ($25k – $60k)",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmed");
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#573681", "#1A0042", "#6495EB", "#E7E6FB"],
    });
  };

  const handleClose = () => {
    setStep("form");
    onClose();
  };

  const handleOpenCalendlyNewTab = () => {
    window.open("https://calendly.com/signalmint-work/signalmint-demo-call?month=2026-09", "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-white/30 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#FAFAFD] border border-[#1A0042]/15 rounded-3xl w-full shadow-2xl relative overflow-hidden flex flex-col transition-all duration-300 ${
          activeTab === "calendar" ? "max-w-4xl h-[92vh] sm:h-[86vh]" : "max-w-lg p-6 sm:p-8"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#E7E6FB] text-[#1A0042] font-mono text-sm font-bold flex items-center justify-center hover:bg-[#1A0042] hover:text-white transition-colors cursor-pointer shadow-xs"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Top Header with Switcher Tabs */}
        <div className={`border-b border-[#1A0042]/10 bg-[#E7E6FB]/40 ${activeTab === "calendar" ? "p-4 sm:p-6 pb-4" : "p-0 border-none bg-transparent mb-4"}`}>
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
              <p className="font-body text-xs sm:text-sm text-[#1A0042]/75 mt-0.5">
                Select an open time slot directly below. We'll run a screen-share audit of your real ad accounts.
              </p>
            </div>

            {/* View Mode Switcher: Live Calendar vs Quick Form */}
            <div className="flex items-center p-1 rounded-xl bg-white border border-[#1A0042]/10 shrink-0 select-none shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveTab("calendar")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "calendar"
                    ? "bg-[#573681] text-white shadow-xs"
                    : "text-[#1A0042]/70 hover:text-[#1A0042]"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Live Calendar</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("quick-request")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeTab === "quick-request"
                    ? "bg-[#573681] text-white shadow-xs"
                    : "text-[#1A0042]/70 hover:text-[#1A0042]"
                }`}
              >
                <span>Request Callback</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Embedded Calendly Live Scheduling Widget */}
        {activeTab === "calendar" && (
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
        )}

        {/* Tab 2: Quick Form Request Alternative */}
        {activeTab === "quick-request" && (
          <div className="pt-2">
            {step === "form" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-mono text-xs font-bold text-[#1A0042] uppercase block mb-1">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#1A0042]/15 bg-white text-[#1A0042] focus:outline-none focus:border-[#573681] font-body text-sm"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs font-bold text-[#1A0042] uppercase block mb-1">
                    Work Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="alex@brand.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#1A0042]/15 bg-white text-[#1A0042] focus:outline-none focus:border-[#573681] font-body text-sm"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs font-bold text-[#1A0042] uppercase block mb-1">
                    Brand Website or Ad Account Handle
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="https://yourbrand.com"
                    value={formData.brandUrl}
                    onChange={(e) => setFormData({ ...formData, brandUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#1A0042]/15 bg-white text-[#1A0042] focus:outline-none focus:border-[#573681] font-body text-sm"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs font-bold text-[#1A0042] uppercase block mb-1">
                    Monthly Ad Spend Bracket
                  </label>
                  <select
                    value={formData.monthlySpend}
                    onChange={(e) => setFormData({ ...formData, monthlySpend: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#1A0042]/15 bg-white text-[#1A0042] focus:outline-none focus:border-[#573681] font-body text-sm"
                  >
                    <option>₹500k – ₹2M / mo ($10k – $25k)</option>
                    <option>₹2M – ₹5M / mo ($25k – $60k)</option>
                    <option>₹5M – ₹15M / mo ($60k – $180k)</option>
                    <option>₹15M+ / mo ($180k+ Scale)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3.5 rounded-xl bg-[#573681] hover:bg-[#1A0042] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Audit Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 text-center font-mono text-[10.5px] text-[#1A0042]/60">
                  ● 100% confidential &middot; Direct desk: <a href="tel:+917045451951" className="text-[#573681] font-bold hover:underline">+91 70454 51951</a>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display font-black text-2xl text-[#1A0042] uppercase mb-2">
                  AUDIT CALL REQUESTED
                </h3>
                <p className="font-body text-sm text-[#1A0042]/80 max-w-sm mx-auto mb-6">
                  Thank you, <strong>{formData.name}</strong>. Our lead strategist will review <strong>{formData.brandUrl}</strong> and send your confirmation to <strong>{formData.email}</strong>.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setActiveTab("calendar")}
                    className="px-5 py-2 rounded-full bg-[#573681] text-white font-mono text-xs font-bold uppercase cursor-pointer"
                  >
                    Pick Exact Time Now
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-5 py-2 rounded-full bg-[#1A0042]/10 text-[#1A0042] font-mono text-xs font-bold uppercase cursor-pointer hover:bg-[#1A0042]/20"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
