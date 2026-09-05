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
                VIP ONBOARDING // ATLAS + SCOUT
              </span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#1A0042] mb-2 uppercase">
              ACTIVATE CREATIVE TELEMETRY
            </h3>
            <p className="font-body text-sm text-[#1A0042]/75 mb-6">
              Connect your ad accounts to start tracking your top 25 competitors and enforce 30-min budget protection within 24 hours.
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
                  Brand Website or Ad Account URL
                </label>
                <input
                  required
                  type="text"
                  placeholder="https://brand.com"
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
                  <option>$20k - $50k / mo</option>
                  <option>$50k - $150k / mo</option>
                  <option>$150k - $500k / mo</option>
                  <option>$500k+ / mo (Enterprise Cluster)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl bg-[#1516A8] hover:bg-[#4D0181] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Telemetry Access Key</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-display font-black text-2xl text-[#1A0042] uppercase mb-2">
              TELEMETRY ACCESS QUEUED
            </h3>
            <p className="font-body text-sm text-[#1A0042]/80 max-w-sm mx-auto mb-6">
              Thank you, <strong>{formData.name}</strong>. Our solutions engineer will provision your SCOUT & ATLAS agent cluster and reach out at <strong>{formData.email}</strong> within 2 business hours.
            </p>
            <div className="bg-[#E7E6FB]/50 p-4 rounded-xl border border-[#1A0042]/10 text-xs font-mono text-left max-w-xs mx-auto mb-6 space-y-1">
              <div>// SCOUT: Standby for competitor list</div>
              <div>// ATLAS: Webhook listener registered</div>
              <div className="text-emerald-700 font-bold">// STATUS: PROVISIONING CONFIRMED</div>
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
