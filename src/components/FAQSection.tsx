import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface FAQSectionProps {
  onOpenDemoModal?: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "01",
    question: "What actually happens during the 30-minute Diagnostic Audit?",
    answer: "We connect via temporary read-only access or live screenshare. We dissect your active campaign architecture, identify CPA bleed vectors, evaluate 0–3s hook retention drop-offs, and deliver a concrete fix matrix you can implement immediately."
  },
  {
    id: "02",
    question: "Do you require long-term contracts or lock-ins?",
    answer: "No. All engagements begin with a structured 60-day sprint. If we don't deliver verified positive ROAS lift and margin expansion, either party can exit with 14 days written notice. You retain 100% intellectual property ownership of all ad accounts, scripts, and briefs."
  },
  {
    id: "03",
    question: "What monthly ad spend is required to partner?",
    answer: "We typically partner with scaling brands spending between ₹3,00,000/mo ($3.5k) to ₹50,00,000+/mo ($60k+) across Meta and secondary ad networks. Accounts under ₹2L/mo are eligible for standalone diagnostic audits."
  },
  {
    id: "04",
    question: "How does your Creative Strategy & Script DNA work?",
    answer: "We don't guess what concepts to test. Using our Script DNA framework, we systematically reverse-engineer winning creative vectors in your category and generate frame-by-frame creator briefs engineered around 0–3s sensory shock hooks."
  },
  {
    id: "05",
    question: "Will you disrupt our existing winning campaigns?",
    answer: "Never blindly. We test new concepts in isolated parallel sandboxes and ASC+ structures alongside your baseline winners, migrating budget only after new winners beat baseline CPA."
  },
  {
    id: "06",
    question: "How do you protect our brand data and customer lists?",
    answer: "We operate under a strict Zero-Data SLA with SOC-2 compliant access controls. All telemetry calculations are transient, client-side, and covered by a mutual NDA executed prior to account access."
  },
  {
    id: "07",
    question: "How quickly can we kick off after our audit?",
    answer: "Once agreed, onboarding takes under 48 hours with dedicated Slack and WhatsApp bridge provisioning. Your prioritized structural audit roadmap is delivered within 7 business days."
  }
];

export function FAQSection({ onOpenDemoModal }: FAQSectionProps = {}) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ "01": true });
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFAQ = (id: string) => {
    setOpenIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".faq-row"),
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.45,
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
      className="py-16 sm:py-20 lg:py-24 bg-[#FAFAFD] text-[#1A0042] relative border-t border-[#1A0042]/10 overflow-hidden"
    >
      {/* Signal lines background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-40">
        <svg 
          viewBox="0 0 400 340" 
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="340" x2="400" y2="0" stroke="#B08BE0" strokeWidth="1" opacity="0.12" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="280" x2="340" y2="0" stroke="#B08BE0" strokeWidth="1" opacity="0.09" vectorEffect="non-scaling-stroke" />
          <line x1="60" y1="340" x2="400" y2="60" stroke="#482878" strokeWidth="1" opacity="0.08" vectorEffect="non-scaling-stroke" />
          <circle cx="200" cy="170" r="110" fill="none" stroke="#B08BE0" strokeWidth="1" opacity="0.1" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Editorial Heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-3.5">
            <div className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#573681] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#573681] animate-pulse" />
              <span>FAQ // KNOWLEDGE BASE</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1A0042] uppercase leading-[1.05]">
              Frequently Asked Questions
            </h2>

            <p className="font-sans text-sm sm:text-[15px] text-[#1A0042]/75 max-w-md leading-relaxed">
              Everything you need to know about our diagnostic audit, billing, and operational SLA before getting started.
            </p>

            <div className="pt-3">
              <button
                onClick={onOpenDemoModal}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#573681] hover:text-[#1A0042] uppercase tracking-wider group cursor-pointer transition-colors"
              >
                <span className="border-b border-[#573681]/40 group-hover:border-[#1A0042] pb-0.5">
                  Have a specific question? Book an audit
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Lean Line-Divided Accordion List */}
          <div className="lg:col-span-7 divide-y divide-[#1A0042]/10 border-t border-b border-[#1A0042]/10">
            {FAQ_ITEMS.map(item => {
              const isOpen = !!openIds[item.id];
              return (
                <div key={item.id} className="faq-row transition-colors">
                  {/* Trigger */}
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full py-4.5 sm:py-5 flex items-start justify-between gap-5 text-left cursor-pointer select-none group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3.5 sm:gap-4.5 pt-0.5">
                      <span className="font-mono text-xs font-bold text-[#573681]/70 group-hover:text-[#573681] transition-colors pt-0.5">
                        {item.id}
                      </span>
                      <h3 className="font-sans font-bold text-[15px] sm:text-base text-[#1A0042] group-hover:text-[#573681] transition-colors leading-snug">
                        {item.question}
                      </h3>
                    </div>

                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5 ${
                      isOpen
                        ? "bg-[#573681] text-white border-[#573681]"
                        : "bg-white text-[#1A0042]/60 border-[#1A0042]/15 group-hover:border-[#573681] group-hover:text-[#573681]"
                    }`}>
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  {/* Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pl-7 sm:pl-9 pr-4 pb-5 pt-0.5 text-xs sm:text-[13.5px] text-[#1A0042]/80 font-sans leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
