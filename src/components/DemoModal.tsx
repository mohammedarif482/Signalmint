import { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle, ArrowRight } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    brandUrl: "",
    monthlySpend: "$50k - $150k",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmed");
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#1516A8", "#4D0181", "#6495EB", "#E7E6FB"],
    });
  };

  const handleClose = () => {
    setStep("form");
    onClose();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/15 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAFAFD] border border-[#1A0042]/15 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#E7E6FB] text-[#1A0042] font-mono text-sm font-bold flex items-center justify-center hover:bg-[#1A0042] hover:text-white transition-colors cursor-pointer"
        >
          ✕
        </button>

        {step === "form" ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#1516A8] bg-[#E7E6FB] px-2.5 py-0.5 rounded-full uppercase">
                30-MINUTE ACCOUNT AUDIT // ZERO PRESSURE
              </span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#1A0042] mb-2 uppercase">
              BOOK YOUR ACCOUNT AUDIT
            </h3>
            <p className="font-body text-sm text-[#1A0042]/75 mb-6">
              We'll look at your real ad accounts together and tell you exactly what we'd fix first, whether or not you hire us.
            </p>

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
                  className="w-full px-4 py-2.5 rounded-xl border border-[#1A0042]/15 bg-white text-[#1A0042] focus:outline-none focus:border-[#1516A8] font-body text-sm"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-[#1A0042]/15 bg-white text-[#1A0042] focus:outline-none focus:border-[#1516A8] font-body text-sm"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-[#1A0042]/15 bg-white text-[#1A0042] focus:outline-none focus:border-[#1516A8] font-body text-sm"
                />
              </div>

              <div>
                <label className="font-mono text-xs font-bold text-[#1A0042] uppercase block mb-1">
                  Monthly Ad Spend Bracket
                </label>
                <select
                  value={formData.monthlySpend}
                  onChange={(e) => setFormData({ ...formData, monthlySpend: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#1A0042]/15 bg-white text-[#1A0042] focus:outline-none focus:border-[#1516A8] font-body text-sm"
                >
                  <option>₹500k – ₹2M / mo ($10k – $25k)</option>
                  <option>₹2M – ₹5M / mo ($25k – $60k)</option>
                  <option>₹5M – ₹15M / mo ($60k – $180k)</option>
                  <option>₹15M+ / mo ($180k+ Scale)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl bg-[#1516A8] hover:bg-[#1A0042] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reserve 30-Min Audit Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center font-mono text-[10.5px] text-[#1A0042]/60">
                ● 100% confidential &middot; Zero sales pressure &middot; Written diagnostic notes included
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-display font-black text-2xl text-[#1A0042] uppercase mb-2">
              AUDIT CALL REQUESTED
            </h3>
            <p className="font-body text-sm text-[#1A0042]/80 max-w-sm mx-auto mb-6">
              Thank you, <strong>{formData.name}</strong>. Our lead growth strategist will review <strong>{formData.brandUrl}</strong> and send your calendar confirmation to <strong>{formData.email}</strong> within 2 business hours.
            </p>
            <div className="bg-[#E7E6FB]/50 p-4 rounded-xl border border-[#1A0042]/10 text-xs font-mono text-left max-w-xs mx-auto mb-6 space-y-1">
              <div>// PRE-AUDIT: Architecture scan initiated</div>
              <div>// TIME ALLOTMENT: 30 minutes screen-share</div>
              <div className="text-emerald-700 font-bold">// STATUS: AUDIT SLOT RESERVED</div>
            </div>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-full bg-[#1A0042] text-white font-mono text-xs font-bold uppercase cursor-pointer"
            >
              Back to SignalMint
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
