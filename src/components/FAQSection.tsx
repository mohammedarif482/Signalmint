import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Plus, 
  Minus, 
  HelpCircle, 
  ArrowUpRight, 
  Phone, 
  ShieldCheck, 
  Sparkles,
  MessageCircleQuestion
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface FAQSectionProps {
  onOpenDemoModal?: () => void;
}

interface FAQItem {
  id: string;
  category: "audit" | "media" | "creative" | "contracts";
  question: string;
  answer: string;
  points?: string[];
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "01",
    category: "audit",
    question: "What actually happens during the 30-minute Diagnostic Account Audit?",
    answer: "We connect via temporary read-only access (or live screenshare). Our lead media buyer and creative strategist dissect your active campaign architecture, identify CPA bleed vectors, evaluate 0–3s hook retention drop-offs, and deliver a prioritized 32-point recovery scorecard.",
    points: [
      "Zero sales pressure, no generic pitch decks.",
      "Identification of 3–5 immediate spend leaks draining budget.",
      "A concrete, ranked action matrix you can implement immediately."
    ]
  },
  {
    id: "02",
    category: "contracts",
    question: "Do you require long-term contracts or 6-month lock-ins?",
    answer: "No. We do not believe in locking founders into rigid 6-month or 12-month agency retainers without proof. All engagements begin with a structured 60-day sprint (Phases 1 through 3). If we don't deliver verified positive ROAS lift and margin expansion, either party can exit with 14 days written notice.",
    points: [
      "60-day structured mutual sprint with measurable milestones.",
      "14 days flexible exit notice anytime after the initial trial.",
      "You retain 100% intellectual property ownership of all scripts, briefs, and ad accounts."
    ]
  },
  {
    id: "03",
    category: "media",
    question: "What monthly ad spend is required to partner with SignalMint?",
    answer: "We typically partner with performance-first D2C brands, B2B SaaS companies, and omnichannel founders spending between ₹3,00,000/mo ($3.5k) to ₹50,00,000+/mo ($60k+) across Meta (Instagram/Facebook) and secondary ad networks (Google PMax, TikTok, Amazon DSP).",
    points: [
      "Built for scaling brands with existing product-market fit.",
      "Focus on unit economics, contribution margin, and true blended MER.",
      "Accounts under ₹2L/mo are eligible for standalone diagnostic audits."
    ]
  },
  {
    id: "04",
    category: "creative",
    question: "How does your Creative Strategy and Script DNA process work?",
    answer: "We don't guess what creative concepts to test. Using our proprietary Script DNA framework, we systematically reverse-engineer winning creative vectors in your category, evaluate drop-off cliffs, and generate complete creator production briefs.",
    points: [
      "0–3s sensory shock hooks engineered frame-by-frame.",
      "Shot-by-shot creator guidelines with B-roll cues and on-screen copy.",
      "Proactive 5-day creative refresh cadence to eliminate ad fatigue."
    ]
  },
  {
    id: "05",
    category: "media",
    question: "What is the sub-12 minute intervention cooldown?",
    answer: "Traditional agencies check accounts once a day or once a week. SignalMint's monitoring telemetry polls your Meta Marketing API endpoints in synchronized 12-minute cycles. If an ad set suffers an unexpected CPA spike or attribution anomaly, our team intervenes immediately before budget burns.",
    points: [
      "Automated CPA spike detection and anomaly alerting.",
      "Human-in-the-loop verification on all spend shifts over 15%.",
      "Protection against algorithmic budget runaways on volatile weekends."
    ]
  },
  {
    id: "06",
    category: "audit",
    question: "Will you touch or disrupt our existing winning campaigns?",
    answer: "Never blindly. Phase 1 is strictly diagnostic observation. In Phase 2, we construct clean, parallel sandbox campaigns alongside your baseline winners. We validate new angles and consolidated ASC+ structures without jeopardizing your baseline cash flow.",
    points: [
      "Safe, parallel testing architectures with isolated budgets.",
      "No sudden pause of active historical top-revenue earners.",
      "Systematic transition only after new creative winners beat baseline CPA."
    ]
  },
  {
    id: "07",
    category: "contracts",
    question: "How do you protect our brand data, customer lists, and proprietary numbers?",
    answer: "We operate under a strict Zero-Data SLA. All telemetry calculations and analytics are processed client-side in transient sessions. We never train public or multi-tenant machine learning models on your proprietary creative copy, conversion events, or customer lists.",
    points: [
      "SOC-2 Type II audit compliant security and strict access controls.",
      "Instant OAuth token shredding within 60 minutes upon request.",
      "Mutual Non-Disclosure Agreement (NDA) executed prior to account access."
    ]
  },
  {
    id: "08",
    category: "audit",
    question: "How quickly can we kick off after our audit session?",
    answer: "Once the 30-minute diagnostic session is complete and we both agree there is a strong strategic fit, onboarding takes less than 48 hours. Phase 1 kick-off begins immediately with dedicated Slack/WhatsApp bridge provisioning.",
    points: [
      "48-hour frictionless onboarding with scoped OAuth tokens.",
      "Direct communication channel with lead media buyer and creative strategist.",
      "First structural audit document delivered within 7 business days."
    ]
  }
];

const CATEGORIES = [
  { key: "all", label: "All Questions" },
  { key: "audit", label: "Audit & Process" },
  { key: "media", label: "Media Buying & Spends" },
  { key: "creative", label: "Creative Strategy" },
  { key: "contracts", label: "Contracts & SLA" }
];

export function FAQSection({ onOpenDemoModal }: FAQSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ "01": true });
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleFAQ = (id: string) => {
    setOpenIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredItems = selectedCategory === "all" 
    ? FAQ_ITEMS 
    : FAQ_ITEMS.filter(item => item.category === selectedCategory);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".faq-item-card"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="faq" 
      ref={containerRef}
      className="py-20 sm:py-28 lg:py-32 bg-[#FAFAFD] text-[#1A0042] relative border-t border-[#1A0042]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#573681]/10 text-[#573681] text-[11px] font-mono font-bold tracking-widest uppercase mb-4 border border-[#573681]/25">
            <MessageCircleQuestion className="w-3.5 h-3.5 text-[#573681]" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans text-[#1A0042] leading-[1.15] mb-5">
            Everything you need to know before bringing us your ad account.
          </h2>

          <p className="text-base sm:text-lg text-[#1A0042]/75 font-sans leading-relaxed">
            Honest, transparent answers regarding our 30-minute diagnostic audit, contract terms, performance creative production, and automated spend telemetry.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10 pb-4 border-b border-[#1A0042]/10 overflow-x-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.key
                  ? "bg-[#573681] text-white shadow-xs"
                  : "bg-white/80 hover:bg-[#573681]/10 text-[#1A0042]/70 border border-[#1A0042]/10 hover:border-[#573681]/30 hover:text-[#1A0042]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Grid: FAQ Accordions (8 cols) + Support/Direct Desk Card (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* FAQ Accordions List */}
          <div className="lg:col-span-8 space-y-4">
            {filteredItems.map(item => {
              const isOpen = !!openIds[item.id];
              return (
                <div
                  key={item.id}
                  className={`faq-item-card rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? "bg-white border-[#573681]/35 shadow-sm" 
                      : "bg-white/60 hover:bg-white border-[#1A0042]/10 hover:border-[#573681]/25 shadow-2xs"
                  }`}
                >
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3.5 sm:gap-4">
                      <span className="font-mono text-xs font-extrabold text-[#573681] pt-0.5">
                        {item.id}
                      </span>
                      <h3 className="font-sans font-bold text-base sm:text-lg text-[#1A0042] group-hover:text-[#573681] transition-colors leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? "bg-[#573681] text-white border-[#573681]"
                        : "bg-white text-[#1A0042] border-[#1A0042]/20 group-hover:border-[#573681] group-hover:text-[#573681]"
                    }`}>
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#1A0042]/80 font-sans border-t border-[#1A0042]/5">
                          <p className="leading-relaxed mb-4">
                            {item.answer}
                          </p>

                          {item.points && item.points.length > 0 && (
                            <div className="space-y-2 pt-3 border-t border-[#1A0042]/8">
                              {item.points.map((pt, pIdx) => (
                                <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-[#1A0042]/90">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#573681] mt-2 shrink-0" />
                                  <span className="leading-snug">{pt}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Sticky Sidebar Advisory Box */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Quick Teardown Booking Card */}
            <div className="rounded-2xl p-6 sm:p-7 bg-[#1A0042] text-white border border-[#573681]/30 shadow-md">
              <div className="inline-flex items-center gap-2 text-[#573681] font-mono text-[10px] font-bold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span className="text-white/80">DIRECT ACCOUNT AUDIT</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-sans mb-2 leading-tight text-white">
                Have an ad account spending ₹3L+/mo?
              </h3>

              <p className="text-xs sm:text-sm text-white/70 font-sans mb-5 leading-relaxed">
                Skip the generic Q&amp;A. Let our lead media buyers and creative directors inspect your live ad account for 30 minutes and give you the exact diagnosis.
              </p>

              <button
                onClick={onOpenDemoModal}
                className="w-full py-3 px-4 rounded-xl bg-[#573681] hover:bg-[#573681]/80 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex items-center justify-center gap-2 mb-4"
              >
                <span>Book 30-Min Diagnostic Audit</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[11px] font-mono text-white/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero pitch deck. 100% data findings.</span>
              </div>
            </div>

            {/* Direct Phone Support Card */}
            <div className="rounded-2xl p-5 sm:p-6 bg-white border border-[#1A0042]/12 shadow-xs">
              <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase text-[#1A0042]/60 tracking-wider mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-[#573681]" />
                <span>UNANSWERED QUESTION?</span>
              </div>

              <h4 className="font-sans text-sm sm:text-base font-bold text-[#1A0042] mb-1.5">
                Speak directly with an Agency Partner
              </h4>

              <p className="text-xs text-[#1A0042]/70 font-sans mb-4 leading-relaxed">
                Our strategic advisory desk is available to discuss custom spend arrangements, procurement, and enterprise SLAs.
              </p>

              <a
                href="tel:+917045451951"
                className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-xl bg-[#FAFAFD] hover:bg-[#573681]/10 border border-[#1A0042]/10 hover:border-[#573681]/30 transition-all text-xs font-mono font-bold text-[#1A0042] hover:text-[#573681] group"
              >
                <Phone className="w-3.5 h-3.5 text-[#573681] group-hover:scale-110 transition-transform" />
                <span>+91 70454 51951</span>
              </a>
            </div>

          </aside>
        </div>

      </div>
    </section>
  );
}
