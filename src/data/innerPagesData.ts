import {
  FileText,
  Cpu,
  Sparkles,
  Activity,
  Terminal,
  ShieldCheck,
  Lock,
  type LucideIcon
} from "lucide-react";

export type InnerPageKey =
  | "script-dna"
  | "hook-cadence"
  | "creative-xray"
  | "fatigue-index"
  | "zero-data"
  | "soc2"
  | "api-docs"
  | "terms"
  | "sla-security"
  | "responsible-ai"
  | "cookie-settings";

export interface PageContent {
  key: InnerPageKey;
  title: string;
  category: string;
  badge: string;
  icon: LucideIcon;
  summary: string;
  lastUpdated: string;
  telemetryStatus: string;
  sections: {
    heading: string;
    body: string;
    bullets?: string[];
  }[];
  specifications: { label: string; value: string }[];
  relatedKeys: InnerPageKey[];
}

export const INNER_PAGES_DATA: Record<InnerPageKey, PageContent> = {
  "script-dna": {
    key: "script-dna",
    title: "Script DNA & Hook Reverse-Engineering",
    category: "INTELLIGENCE LAB // METHODOLOGY",
    badge: "DIAGNOSTIC PROTOCOL",
    icon: Cpu,
    summary: "How SignalMint systematically isolates, catalogs, and translates historical winning creative vectors into scalable production briefs.",
    lastUpdated: "SEPTEMBER 2026",
    telemetryStatus: "LIVE PROTOCOL // META GRAPH v21.0",
    sections: [
      {
        heading: "01. The 0–3s Hook Decomposition",
        body: "Over 78% of ad budget waste in Meta auction environments occurs before the 3-second sensory threshold. Our Script DNA engine dissects winning assets frame-by-frame across three critical inflection points:",
        bullets: [
          "Acoustic Break: Decibel drops and audio-first patterns that interrupt passive scrolling.",
          "Visual Contrast Shock: Kinetic grading and unexpected subject positioning that halts thumb motion.",
          "Contrarian Value Drop: Immediate proposition statement delivered within the first 1.8 seconds."
        ]
      },
      {
        heading: "02. Hook Taxonomy Matrix",
        body: "Every creative asset is categorized into tested psychological buckets (Sensory Shock, Us vs. Them, Diagnostic Teardown, Immediate Social Proof). This prevents brands from continually repeating the same exhausted storytelling angle."
      },
      {
        heading: "03. Translation to Production Briefs",
        body: "Data without execution is useless. Script DNA automatically maps winning hook retention patterns directly into Creator Production Briefs with exact timing cues, line-by-line scripts, and B-roll instructions."
      }
    ],
    specifications: [
      { label: "Sampling Cadence", value: "Real-time Ad Account Feed" },
      { label: "Hook Retention Benchmark", value: "> 42% @ 3.00s" },
      { label: "Angle Diversity Index", value: "Min. 4 Angles / Cycle" },
      { label: "Production Turnaround", value: "5 Business Days" }
    ],
    relatedKeys: ["hook-cadence", "creative-xray", "fatigue-index"]
  },

  "hook-cadence": {
    key: "hook-cadence",
    title: "Hook Cadence & Pacing Architecture",
    category: "INTELLIGENCE LAB // RETENTION",
    badge: "RETENTION MATRIX",
    icon: Sparkles,
    summary: "The science of pacing, auditory anchors, and retention milestones that prevent CPA inflation across Meta and TikTok ads.",
    lastUpdated: "SEPTEMBER 2026",
    telemetryStatus: "CONTINUOUS RETENTION SAMPLING",
    sections: [
      {
        heading: "01. Overcoming the Sensory Cliff",
        body: "Audience attention is non-linear. The drop-off from 0:00 to 0:03 is exponential, followed by secondary drop-off cliffs at 0:08 and 0:15. Our creative directors architect videos to deliver micro-rehooks every 4.2 seconds."
      },
      {
        heading: "02. Retention Wave Modeling",
        body: "Instead of flat pacing, top-performing D2C assets follow a wave cadence: High shock hook → rapid proof point → problem agitation → product demonstration → irresistible guarantee."
      },
      {
        heading: "03. Format-Specific Tuning",
        body: "What scales on ASC+ Broad reels fails on Feed placements. Hook Cadence dictates aspect ratio, captions density, and text placement safeguards to maximize watch time across every Meta inventory slot."
      }
    ],
    specifications: [
      { label: "Target 3s Watch Time", value: "+120% vs Baseline" },
      { label: "Average Rehook Interval", value: "3.8 – 4.5 Seconds" },
      { label: "Supported Formats", value: "9:16, 4:5, 1:1 Omnichannel" },
      { label: "Optimization Target", value: "Hold Rate & Blended CPA" }
    ],
    relatedKeys: ["script-dna", "creative-xray", "fatigue-index"]
  },

  "creative-xray": {
    key: "creative-xray",
    title: "Creative X-Ray Diagnostic Framework",
    category: "INTELLIGENCE LAB // DIAGNOSTICS",
    badge: "AUDIT SPECIFICATION",
    icon: Activity,
    summary: "Our proprietary 6-point creative diagnostic audit that reveals why high-spend ads fatigue, underdeliver, or bleed margin.",
    lastUpdated: "SEPTEMBER 2026",
    telemetryStatus: "32-POINT AUDIT BENCHMARK ACTIVE",
    sections: [
      {
        heading: "01. Angle Cannibalization Audit",
        body: "Most scaling accounts suffer from unintentional creative overlap—running 10 ads that all pitch the same benefit to the same buyer persona. Creative X-Ray maps your creative portfolio across customer awareness levels to uncover blank spots."
      },
      {
        heading: "02. Offer & Friction Analysis",
        body: "We evaluate the exact landing page hand-off. An ad with a 50% hook rate that drops visitors onto a disconnected offer burns money just as fast as a poor video."
      },
      {
        heading: "03. Concrete Action Matrix",
        body: "Every X-Ray diagnostic produces a single priority-ranked action plan: Kill (spend leaks), Scale (undervalued winners), and Iterate (winning hooks that need fresh B-roll)."
      }
    ],
    specifications: [
      { label: "Audit Depth", value: "100% of Active & Historical Spend" },
      { label: "Checkpoints Evaluated", value: "6 Core Performance Vectors" },
      { label: "Deliverable Format", value: "Interactive Diagnostic Scorecard" },
      { label: "Typical Recovery", value: "₹50k – ₹2L / mo Waste Eliminated" }
    ],
    relatedKeys: ["script-dna", "fatigue-index", "zero-data"]
  },

  "fatigue-index": {
    key: "fatigue-index",
    title: "Fatigue Index & Predictive Creative Refresh",
    category: "INTELLIGENCE LAB // AUTOMATION",
    badge: "PREDICTIVE SIGNALS",
    icon: Terminal,
    summary: "Predicting the exact moment creative ad fatigue will compromise your blended CPA—before the budget burns.",
    lastUpdated: "SEPTEMBER 2026",
    telemetryStatus: "TELEMETRY COOLDOWN Δt ≤ 12min",
    sections: [
      {
        heading: "01. The Fatigue Mathematics",
        body: "Ad fatigue does not occur overnight. It begins with micro-increases in Frequency alongside subtle decreases in First-Time Impression Ratio and 3-Second Hook Rates. SignalMint models this decay curve in real-time."
      },
      {
        heading: "02. Proactive 5-Day Refresh Cadence",
        body: "Traditional agencies wait for CPA to double before ordering new creatives. SignalMint detects early fatigue inflection points 5 to 7 days before performance collapse, deploying fresh creative iterations into testing sets seamlessly."
      },
      {
        heading: "03. Longevity Tiers",
        body: "Assets are managed according to their longevity bracket: Sprint Tests (0–7 days), Scaling Horses (8–30 days), and Evergreen Heroes (30+ days)."
      }
    ],
    specifications: [
      { label: "Detection Lead Time", value: "5 – 7 Days Prior to Spike" },
      { label: "Key Telemetry Metrics", value: "FTIR, Frequency, 3s Hook Decay" },
      { label: "Automated Alerting", value: "Daily In-House Slack / WhatsApp" },
      { label: "CPA Protection", value: "Prevents Cliff Degradation" }
    ],
    relatedKeys: ["hook-cadence", "creative-xray", "api-docs"]
  },

  "zero-data": {
    key: "zero-data",
    title: "Zero-Data Privacy Architecture & Security SLA",
    category: "PROTOCOLS // PRIVACY",
    badge: "ZERO RETENTION",
    icon: Lock,
    summary: "Our uncompromising commitment to brand data privacy. Your unit economics, creative IP, and customer lists remain strictly yours.",
    lastUpdated: "SEPTEMBER 2026",
    telemetryStatus: "CLIENT-SIDE TRANSIENT PROCESSING",
    sections: [
      {
        heading: "01. Client-Side Only Processing",
        body: "SignalMint connects directly to your Meta Ads Manager, Google Ads, and Shopify APIs via scoped OAuth tokens. Telemetry and diagnostic calculations are computed client-side in transient sessions."
      },
      {
        heading: "02. No LLM or Cross-Brand Model Training",
        body: "We never train public or multi-tenant machine learning models on your proprietary creative copy, ROAS figures, conversion events, or customer data. Your commercial competitive advantage is isolated and protected."
      },
      {
        heading: "03. Instant Revocation & Token Shredding",
        body: "You maintain 100% control over access permissions at all times. Upon conclusion of an engagement or audit, all API tokens and temporary diagnostic caches are cryptographically shredded within 60 minutes."
      }
    ],
    specifications: [
      { label: "Data Retention Policy", value: "Zero Persistent Storage" },
      { label: "Encryption in Transit", value: "TLS 1.3 Strict" },
      { label: "Encryption at Rest", value: "AES-256 GCM" },
      { label: "Access Revocation SLA", value: "Instantaneous / < 60 Min Shred" }
    ],
    relatedKeys: ["soc2", "terms", "sla-security"]
  },

  "soc2": {
    key: "soc2",
    title: "SOC-2 Type II Compliance & Audit Verification",
    category: "PROTOCOLS // COMPLIANCE",
    badge: "AICPA AUDITED",
    icon: ShieldCheck,
    summary: "Enterprise-grade operational rigor, verified annually by independent third-party cybersecurity and compliance auditors.",
    lastUpdated: "SEPTEMBER 2026",
    telemetryStatus: "SOC-2 TYPE II AUDIT COMPLIANT",
    sections: [
      {
        heading: "01. Trust Services Criteria",
        body: "SignalMint adheres to the AICPA Trust Services Criteria across Security, Availability, and Confidentiality. Our internal agency processes and proprietary diagnostic tooling are audited for complete operational integrity."
      },
      {
        heading: "02. Continuous Vulnerability Management",
        body: "All systems undergo weekly automated dependency scanning, monthly penetration reviews, and continuous access-control enforcement with multi-factor biometric authentication required across all team endpoints."
      },
      {
        heading: "03. Access to Audit Package",
        body: "Prospective enterprise clients and scaling brands spending ₹15M+/mo ($180k+) can request our full SOC-2 Type II auditor report under mutual NDA."
      }
    ],
    specifications: [
      { label: "Audit Standard", value: "AICPA SOC-2 Type II" },
      { label: "Audit Frequency", value: "Annual Third-Party Recertification" },
      { label: "MFA Enforcement", value: "100% Hardware/Biometric FIDO2" },
      { label: "Auditor Report", value: "Available Under Mutual NDA" }
    ],
    relatedKeys: ["zero-data", "sla-security", "terms"]
  },

  "api-docs": {
    key: "api-docs",
    title: "Marketing API & Infrastructure Protocols",
    category: "PROTOCOLS // INTEGRATION",
    badge: "OFFICIAL APIS",
    icon: Terminal,
    summary: "Official Marketing API integrations with sub-12 minute automated intervention cooldowns.",
    lastUpdated: "SEPTEMBER 2026",
    telemetryStatus: "META GRAPH v21.0 // TIKTOK v1.3 // GOOGLE ADS v17",
    sections: [
      {
        heading: "01. Official Platform Partner APIs",
        body: "SignalMint operates exclusively through official, certified APIs: Meta Marketing API (v21.0+), Google Ads API (v17+), TikTok Marketing API, and Amazon Advertising DSP API. We never scrape or use unauthorized scraping proxies."
      },
      {
        heading: "02. Sub-12min Intervention Cooldown",
        body: "Our in-house monitoring engines poll account spend velocity and attribution discrepancies in 12-minute synchronized epochs, flagging runaway spend anomalies before they compound over a billing cycle."
      },
      {
        heading: "03. Conversion API (CAPI) Health",
        body: "We audit and implement server-side event deduplication, Shopify webhooks, and advanced matching parameters to recover 15–25% of purchases obscured by client-side browser ad-blockers."
      }
    ],
    specifications: [
      { label: "Meta Graph API", value: "v21.0 Production Partner" },
      { label: "Polling Interval", value: "Δt ≤ 12 Minutes" },
      { label: "Event Deduplication", value: "100% Verified CAPI Match" },
      { label: "Uptime SLA", value: "99.9% Telemetry Uptime" }
    ],
    relatedKeys: ["fatigue-index", "zero-data", "sla-security"]
  },

  "terms": {
    key: "terms",
    title: "Terms of Telemetry & Engagement Guarantee",
    category: "LEGAL // ENGAGEMENT TERMS",
    badge: "LEGAL SPECIFICATION",
    icon: FileText,
    summary: "Transparent, founder-first agency terms. No 6-month handcuffs. Structured milestones designed for mutual alignment.",
    lastUpdated: "SEPTEMBER 2026",
    telemetryStatus: "MUTUAL 60-DAY SPRINT STANDARD",
    sections: [
      {
        heading: "01. The 60-Day Mutual Trial",
        body: "We do not believe in locking founders into rigid 6-month or 12-month agency retainers without proof. All engagements begin with a structured 60-day sprint (Phases 1 through 3). If we don't deliver verified positive ROAS lift, either party can exit with 14 days notice."
      },
      {
        heading: "02. The ₹0 Unmonitored Bleed Guarantee",
        body: "Every live ad campaign under SignalMint management is monitored under our daily intervention standard. If a rogue campaign or duplicated ad set causes unmonitored budget leakage due to agency negligence, we credit that management fee."
      },
      {
        heading: "03. IP & Asset Ownership",
        body: "You own 100% of all creative briefs, script templates, custom video edits, and ad accounts. We never hold your pixels, domain verifications, or ad history hostage."
      }
    ],
    specifications: [
      { label: "Initial Term", value: "60 Days (Phase 1–3 Roadmap)" },
      { label: "Exit Notice", value: "14 Days Flexible" },
      { label: "Asset Ownership", value: "100% Client Intellectual Property" },
      { label: "Billing Cadence", value: "Bi-Weekly or Monthly Transparent Retainer" }
    ],
    relatedKeys: ["sla-security", "responsible-ai", "zero-data"]
  },

  "sla-security": {
    key: "sla-security",
    title: "Service Level Agreement (SLA) & Incident Response",
    category: "LEGAL // SERVICE LEVELS",
    badge: "UPTIME & RESPONSE",
    icon: ShieldCheck,
    summary: "Guaranteed communication cadences, emergency spend hotline response times, and production deliverables.",
    lastUpdated: "SEPTEMBER 2026",
    telemetryStatus: "HOTLINE ACTIVE: +91 70454 51951",
    sections: [
      {
        heading: "01. Dedicated Slack / WhatsApp Bridge",
        body: "Every client gets a dedicated private communication bridge with their lead media buyer, creative strategist, and data analyst. Questions are answered within 2 hours during market operational hours."
      },
      {
        heading: "02. Emergency Spend Escalation",
        body: "In the event of an account restriction, pixel failure, or sudden attribution anomaly, our direct emergency line (+91 70454 51951) connects you to an on-duty strategist within 15 minutes."
      },
      {
        heading: "03. Weekly Diagnostic Cadence",
        body: "Every Tuesday, your team receives our proprietary Diagnostic Status Report detailing true unit economics, top-performing hook angles, and creative pipeline deployments for the week."
      }
    ],
    specifications: [
      { label: "Emergency Response", value: "< 15 Min Direct Hotline" },
      { label: "Standard Inquiries", value: "< 2 Hours Dedicated Slack" },
      { label: "Diagnostic Cadence", value: "Weekly Tuesday Written Deep-Dive" },
      { label: "Hotline Desk", value: "+91 70454 51951" }
    ],
    relatedKeys: ["terms", "soc2", "api-docs"]
  },

  "responsible-ai": {
    key: "responsible-ai",
    title: "Responsible AI & Human-in-the-Loop Standard",
    category: "LEGAL // ETHICAL FRAMEWORK",
    badge: "HUMAN-LED RIGOR",
    icon: Cpu,
    summary: "Why SignalMint uses automated telemetry as an instrument, never as an unsupervised pilot.",
    lastUpdated: "SEPTEMBER 2026",
    telemetryStatus: "100% HUMAN-VERIFIED MEDIA BUYING",
    sections: [
      {
        heading: "01. Human Review on All Spend Decisions",
        body: "Algorithms cannot understand product margins, supply-chain inventory delays, or brand tone. No automated script at SignalMint adjusts client budget thresholds above 15% without a verified media buyer signature."
      },
      {
        heading: "02. Ethical Creative Standards",
        body: "We do not produce deceptive deepfakes, unauthorized celebrity likenesses, or manipulative synthetic claims. Every creative asset built by our team is ethically verified and complies with Meta and FTC advertising guidelines."
      },
      {
        heading: "03. Transparent Attribution Reconciling",
        body: "We do not claim 100% algorithmic accuracy. We constantly cross-check Meta Ads Manager reported ROAS against true bank-settled Shopify revenue and blended MER to prevent agency self-attribution inflation."
      }
    ],
    specifications: [
      { label: "Execution Model", value: "Human-Led, Data-Informed" },
      { label: "Budget Shift Limit", value: "Max 15% without Human Review" },
      { label: "Policy Compliance", value: "100% Meta / FTC Advertising Standards" },
      { label: "Reconciliation", value: "Triple-Layer Attribution (Meta + Shopify + Bank)" }
    ],
    relatedKeys: ["terms", "zero-data", "cookie-settings"]
  },

  "cookie-settings": {
    key: "cookie-settings",
    title: "Cookie & Tracking Telemetry Preferences",
    category: "LEGAL // PRIVACY CONTROLS",
    badge: "PRIVACY FIRST",
    icon: Lock,
    summary: "Manage client-side telemetry preferences for the SignalMint website.",
    lastUpdated: "SEPTEMBER 2026",
    telemetryStatus: "ZERO THIRD-PARTY BROKER DATA",
    sections: [
      {
        heading: "01. Essential Telemetry",
        body: "We use strictly necessary local storage cookies to remember your navigation state, selected service tabs, and diagnostic calculator inputs. These do not track personal identifying information across external websites."
      },
      {
        heading: "02. Zero Third-Party Advertising Trackers",
        body: "SignalMint does not sell or syndicate visitor session data to third-party data brokers. We practice the exact same privacy hygiene on our own site that we mandate for our client brands."
      },
      {
        heading: "03. Consent Revocation",
        body: "You can clear your local session cache or reset interactive simulation states at any time using your browser settings or by contacting our data privacy desk."
      }
    ],
    specifications: [
      { label: "Cookie Classification", value: "Strictly Necessary Transient Caching" },
      { label: "Data Broker Sales", value: "0% / Never Sold or Shared" },
      { label: "Local Storage Scope", value: "Isolated to signalmint.com Domain" },
      { label: "Privacy Inquiries", value: "+91 70454 51951" }
    ],
    relatedKeys: ["zero-data", "terms", "sla-security"]
  }
};
