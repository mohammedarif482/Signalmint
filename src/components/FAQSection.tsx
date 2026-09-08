import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Plus, 
  Minus 
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

export function FAQSection({ onOpenDemoModal: _onOpenDemoModal }: FAQSectionProps = {}) {
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
      className="py-20 sm:py-28 lg:py-32 bg-[#F9F7FC] text-[#1A0042] relative border-t border-[#1A0042]/10 overflow-hidden"
    >
      {/* 3. Signal lines background (Diagonal signal lines + concentric rings) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <svg 
          viewBox="0 0 400 340" 
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="340" x2="400" y2="0" stroke="#B08BE0" strokeWidth="1" opacity="0.15" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="280" x2="340" y2="0" stroke="#B08BE0" strokeWidth="1" opacity="0.12" vectorEffect="non-scaling-stroke" />
          <line x1="60" y1="340" x2="400" y2="60" stroke="#482878" strokeWidth="1" opacity="0.1" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="200" x2="240" y2="0" stroke="#B08BE0" strokeWidth="1" opacity="0.1" vectorEffect="non-scaling-stroke" />
          <line x1="160" y1="340" x2="400" y2="160" stroke="#482878" strokeWidth="1" opacity="0.08" vectorEffect="non-scaling-stroke" />
          <circle cx="200" cy="170" r="90" fill="none" stroke="#B08BE0" strokeWidth="1" opacity="0.15" vectorEffect="non-scaling-stroke" />
          <circle cx="200" cy="170" r="140" fill="none" stroke="#B08BE0" strokeWidth="1" opacity="0.08" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans text-[#1A0042] leading-[1.15] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#1A0042]/75 max-w-2xl leading-relaxed">
            Everything you need to know before bringing us your ad account.
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

        {/* FAQ Accordions List */}
        <div className="space-y-4 w-full">
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

      </div>
    </section>
  );
}
