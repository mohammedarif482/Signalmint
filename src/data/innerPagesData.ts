import {
  FileText,
  Cpu,
  Sparkles,
  Activity,
  Terminal,
  ShieldCheck,
  Lock,
  Building2,
  TrendingUp,
  LineChart,
  Target,
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
  | "cookie-settings"
  | "case-aerosleep"
  | "case-methodiq"
  | "case-monolith"
  | "case-boldedge";

export interface CaseStudyData {
  brand: string;
  engagement: string;
  problemHeadline: string;
  problemBody: string;
  whatWeDid: string[];
  metrics: {
    roasBefore: string;
    roasAfter: string;
    cpaBefore: string;
    cpaAfter: string;
    scale: string;
    timeToResult: string;
  };
  quote: string;
  author: string;
  authorTitle: string;
  architecturalBleed: {
    title: string;
    description: string;
  }[];
  winningHooks: {
    pattern: string;
    retentionScore: string;
    breakdown: string;
  }[];
}

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
  isCaseStudy?: boolean;
  caseData?: CaseStudyData;
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
  },

  "case-aerosleep": {
    key: "case-aerosleep",
    title: "Aerosleep Labs: The 38-Day ROAS Recovery",
    category: "CLIENT TRANSFORMATION // DTC SLEEP TECH",
    badge: "VERIFIED AUDIT TRANSFORMATION",
    icon: TrendingUp,
    summary: "How SignalMint dismantled audience cannibalization, engineered sensory-shock video hooks, and scaled ad spend from ₹120k to ₹750k/mo at 5.4x blended ROAS.",
    lastUpdated: "SEPTEMBER 2026",
    telemetryStatus: "VERIFIED META GRAPH TELEMETRY // +200% ROAS",
    isCaseStudy: true,
    caseData: {
      brand: "Aerosleep Labs",
      engagement: "3 Months Engagement",
      problemHeadline: "Budget was burning on creative fatigue. Couldn't scale past ₹500k/mo without a 35% CPA spike.",
      problemBody: "Every new ad fatigued within 7 days. Customer acquisition cost skyrocketed on broad Meta targeting, and the client was trapped in an endless production cycle of guessing which creative would hit next.",
      whatWeDid: [
        "Audited account structure → Found 3 core audiences cannibalizing each other in broad targeting.",
        "Refreshed creative strategy → Mapped top 2 hook patterns (Sensory Shock ASMR + thermal layer proof).",
        "Re-tuned bid strategy → Tightened pacing and shifted to dynamic cost-cap stabilization."
      ],
      metrics: {
        roasBefore: "1.8x",
        roasAfter: "5.4x",
        cpaBefore: "₹410",
        cpaAfter: "₹192",
        scale: "₹120k → ₹750k/mo",
        timeToResult: "38 Days"
      },
      quote: "SignalMint didn't just run ads. They understood why our old approach was failing within 48 hours, restructured our entire account, and gave us briefs that actually convert. The speed of the result surprised us.",
      author: "Rohit V.",
      authorTitle: "Founder & CEO, Aerosleep Labs",
      architecturalBleed: [
        {
          title: "Audience Cannibalization",
          description: "3 broad ad sets competing against each other in the auction, inflating internal CPMs by 42%."
        },
        {
          title: "Delayed Signal Feedback",
          description: "Purchase events were not passing CAPI enriched customer parameters, causing Meta ML misattribution."
        },
        {
          title: "Creative Monoculture",
          description: "90% of assets relied on identical founder talk-head formats with zero sensory hooks."
        }
      ],
      winningHooks: [
        {
          pattern: "Sensory Shock ASMR (Thermal Layer Proof)",
          retentionScore: "54% 3s Hook Rate",
          breakdown: "Macro close-up sound design of air-channel membrane with thermal camera overlay proving breathability."
        },
        {
          pattern: "Contrarian Unboxing Teardown",
          retentionScore: "48% 3s Hook Rate",
          breakdown: "Addressing why traditional memory foam traps body heat and disrupts REM sleep."
        }
      ]
    },
    sections: [
      {
        heading: "01. Pre-Audit Diagnostic Teardown",
        body: "Aerosleep Labs came to SignalMint after spending months hitting an insurmountable ceiling at ₹500k/mo. Every budget increase led to exponential CPA degradation.",
        bullets: [
          "Ad set overlap reached 48% across competing cold interest and lookalike buckets.",
          "Creative fatigue hit within 72 hours because Meta's auction prioritized one winner and starved variant angles.",
          "Blended ROAS fell to 1.8x, eroding net contribution margins."
        ]
      },
      {
        heading: "02. The Account Restructuring Trajectory",
        body: "We collapsed 11 scattered campaigns into a single unified Advantage+ Shopping Campaign (ASC) backed by dynamic testing sandboxes with strictly capped pacing."
      },
      {
        heading: "03. Performance Creative Engineering",
        body: "Rather than shooting generic aesthetic lifestyle b-roll, our creative directors authored precision briefs focusing on the sensory friction point: heat dissipation."
      }
    ],
    specifications: [
      { label: "Client Category", value: "DTC Wellness // Sleep Tech" },
      { label: "Starting Blended ROAS", value: "1.8x" },
      { label: "Scaled Blended ROAS", value: "5.4x (Verified)" },
      { label: "CPA Reduction", value: "53.1% (₹410 → ₹192)" },
      { label: "Monthly Revenue Run-Rate", value: "₹750k/mo" }
    ],
    relatedKeys: ["case-methodiq", "case-monolith", "case-boldedge"]
  },

  "case-methodiq": {
    key: "case-methodiq",
    title: "MethodIQ: Halting the CAC Bleed",
    category: "CLIENT TRANSFORMATION // DTC BEAUTY & SKINCARE",
    badge: "VERIFIED AUDIT TRANSFORMATION",
    icon: Target,
    summary: "Eliminated ₹1.4L/mo ad budget bleed, repaired 22% dropped checkout signals, and restored blended ROAS to 4.1x.",
    lastUpdated: "SEPTEMBER 2026",
    telemetryStatus: "VERIFIED META GRAPH TELEMETRY // +192% ROAS",
    isCaseStudy: true,
    caseData: {
      brand: "MethodIQ",
      engagement: "4 Months Engagement",
      problemHeadline: "Top-of-funnel acquisition bleeding money. Retinol ads skipped in under 2 seconds.",
      problemBody: "Strong customer retention, but cold prospecting on Meta had collapsed to 1.4x ROAS. Standard lifestyle shoots were failing to overcome consumer skepticism in a saturated beauty market.",
      whatWeDid: [
        "Pixel & CAPI audit → Identified 22% dropped purchase events on custom checkout.",
        "Creative re-engineering → Deployed 'Contrarian Tear-Down' script ('Stop using retinol like it's 2019').",
        "Fatigue prevention cadence → Pre-built 8 variant hooks before primary creative hit frequency 2.4."
      ],
      metrics: {
        roasBefore: "1.4x",
        roasAfter: "4.1x",
        cpaBefore: "₹560",
        cpaAfter: "₹230",
        scale: "₹140k/mo Bleed Stopped",
        timeToResult: "42 Days"
      },
      quote: "The audit uncovered ₹1.4L of monthly spend that was essentially paying for customers who were already in our email flow. That insight alone paid for their engagement 10x over.",
      author: "Ananya S.",
      authorTitle: "Head of Growth, MethodIQ",
      architecturalBleed: [
        {
          title: "Leaky Funnel Attribution",
          description: "Brand campaign retargeting past purchasers who had already subscribed to re-orders."
        },
        {
          title: "Drop in Server-Side Tracking",
          description: "22% of custom checkout events failing deduplication across iOS14+ users."
        },
        {
          title: "Weak 0-2s Hook Velocity",
          description: "High-cost production video ads taking 4.8 seconds before mentioning the core value."
        }
      ],
      winningHooks: [
        {
          pattern: "'Stop Using Retinol Like It's 2019' Teardown",
          retentionScore: "58% 3s Hook Rate",
          breakdown: "Contrarian dermatological myth-busting hook that established immediate clinical authority."
        },
        {
          pattern: "Micro-Dosing Visual Proof (Split Screen)",
          retentionScore: "51% 3s Hook Rate",
          breakdown: "Split-screen micro-viscosity comparison demonstrating barrier protection vs irritation."
        }
      ]
    },
    sections: [
      {
        heading: "01. The Silent Bleed",
        body: "MethodIQ had high brand loyalty, but cold prospecting campaigns were hemorrhaging budget by bidding against organic customer repeat purchases.",
        bullets: [
          "Attribution cannibalization masked true cold CAC by blending 60% repeat customer purchases into TOFU figures.",
          "First-time buyer blended CPA stood at an unviable ₹560 against a ₹850 AOV.",
          "Checkout dropouts were unmonitored due to outdated CAPI integrations."
        ]
      },
      {
        heading: "02. Server-Side Infrastructure Overhaul",
        body: "We implemented custom webhook telemetry directly from Shopify checkout, achieving 99.4% event match quality on Meta Graph API."
      },
      {
        heading: "03. Contrarian Hook Engineering",
        body: "Swapped standard aesthetic beauty routines for scientific teardowns that stopped high-intent shoppers mid-scroll."
      }
    ],
    specifications: [
      { label: "Client Category", value: "Clean Skincare // DTC Beauty" },
      { label: "Starting Blended ROAS", value: "1.4x" },
      { label: "Scaled Blended ROAS", value: "4.1x (Verified)" },
      { label: "CPA Reduction", value: "58.9% (₹560 → ₹230)" },
      { label: "Monthly Bleed Recovered", value: "₹140,000 / month" }
    ],
    relatedKeys: ["case-aerosleep", "case-monolith", "case-boldedge"]
  },

  "case-monolith": {
    key: "case-monolith",
    title: "Monolith Apparel: The +185% Profit Scale",
    category: "CLIENT TRANSFORMATION // PERFORMANCE ATHLEISURE",
    badge: "VERIFIED AUDIT TRANSFORMATION",
    icon: LineChart,
    summary: "Consolidated 14 fragmented ad sets into 3 compound tiers, driving +185% net profit and scaling ROAS to 4.9x.",
    lastUpdated: "SEPTEMBER 2026",
    telemetryStatus: "VERIFIED META GRAPH TELEMETRY // +133% ROAS",
    isCaseStudy: true,
    caseData: {
      brand: "Monolith Apparel",
      engagement: "60 Days Engagement",
      problemHeadline: "Scaling plateaued at 2.1x ROAS. Previous agency pushed lifestyle shoots that bombed in 72 hours.",
      problemBody: "Over-fragmented account structure with 14 competing ad sets. Budget was spread so thin that Meta's machine learning couldn't exit the learning phase on any single ad.",
      whatWeDid: [
        "Account consolidation → Condensed 14 fragmented ad sets into 3 clean compound tiers.",
        "Format winner mapping → Swapped generic lifestyle photos for macro-tensile tear-down video tests.",
        "Retention curve optimization → Front-loaded proof in seconds 0–3, locking scroll retention."
      ],
      metrics: {
        roasBefore: "2.1x",
        roasAfter: "4.9x",
        cpaBefore: "₹380",
        cpaAfter: "₹210",
        scale: "+185% Net Profit",
        timeToResult: "45 Days"
      },
      quote: "Every other agency gave us fancy slide decks and excuses about algorithm updates. SignalMint gave us a systematic audit report on day 7, fixed the leak on day 12, and scaled our revenue.",
      author: "Vikram M.",
      authorTitle: "Co-Founder, Monolith Apparel",
      architecturalBleed: [
        {
          title: "Severe Learning Phase Gridlock",
          description: "14 fragmented ad sets each getting less than 15 conversions/week."
        },
        {
          title: "High-Cost Lifestyle Photo Ads",
          description: "Zero dynamic motion or stretch demonstration in feed environments."
        },
        {
          title: "Lack of Bid Floor Controls",
          description: "Uncapped bidding causing auction bidding wars during peak weekend hours."
        }
      ],
      winningHooks: [
        {
          pattern: "Tensile Friction Stress-Test",
          retentionScore: "62% 3s Hook Rate",
          breakdown: "Subject performing heavy deadlifts while macro camera films extreme fabric stress without seam distortion."
        },
        {
          pattern: "'Why We Threw Out Our 2024 Design'",
          retentionScore: "53% 3s Hook Rate",
          breakdown: "Engineering-led redesign narrative explaining the breathable squat-proof micro-mesh structure."
        }
      ]
    },
    sections: [
      {
        heading: "01. The Fragmented Learning Phase Trap",
        body: "Monolith was advised by a prior agency to split budgets across micro-audiences, resulting in permanent learning phase stagnation.",
        bullets: [
          "Average budget per ad set was only ₹1,200/day—far below Meta's algorithmic threshold.",
          "Creative assets were high production cost but lacked thumb-stopping hooks.",
          "Profit margins eroded as CAC rose faster than revenue."
        ]
      },
      {
        heading: "02. The 3-Tier Consolidation Model",
        body: "We restructured the account into 3 core tiers: Dynamic Creative Sandbox (Testing), Consolidated Broad ASC (Scaling), and First-Party VIP Re-engagement."
      },
      {
        heading: "03. Real-World Macro Proof",
        body: "Replaced photoshoots with extreme physical stress tests, increasing video hold rates by 3.2x."
      }
    ],
    specifications: [
      { label: "Client Category", value: "Performance Athleisure // Apparel" },
      { label: "Starting Blended ROAS", value: "2.1x" },
      { label: "Scaled Blended ROAS", value: "4.9x (Verified)" },
      { label: "CPA Reduction", value: "44.7% (₹380 → ₹210)" },
      { label: "Net Profit Impact", value: "+185% Year-Over-Year" }
    ],
    relatedKeys: ["case-aerosleep", "case-methodiq", "case-boldedge"]
  },

  "case-boldedge": {
    key: "case-boldedge",
    title: "Bold Edge: Scaling to ₹1.4M/mo with Telemetry",
    category: "CLIENT TRANSFORMATION // CONSUMER TECH & AUDIO",
    badge: "VERIFIED AUDIT TRANSFORMATION",
    icon: Building2,
    summary: "Scaled from ₹280k to ₹1.4M/mo profitably while dropping blended CPA by 44% using real-time automated spend telemetry.",
    lastUpdated: "SEPTEMBER 2026",
    telemetryStatus: "VERIFIED META GRAPH TELEMETRY // 5x REVENUE SCALE",
    isCaseStudy: true,
    caseData: {
      brand: "Bold Edge",
      engagement: "60 Days Engagement",
      problemHeadline: "High click-through rate, but checkout abandonment was masking an underlying audience mismatch.",
      problemBody: "Spending heavily on tech enthusiasts who loved the product specs but had low purchasing intent for premium audio. Ad sets were rapidly cycling through budget without achieving sustained positive contribution margins.",
      whatWeDid: [
        "Audience intent alignment → Shifted from tech spec lookalikes to daily commute problem angles.",
        "Automated margin-aware kill switches → Synced inventory telemetry to pause fatigued ad sets automatically.",
        "Binaural audio hook production → Created realistic noise-cancellation comparison tests."
      ],
      metrics: {
        roasBefore: "1.9x",
        roasAfter: "3.8x",
        cpaBefore: "₹490",
        cpaAfter: "₹275",
        scale: "₹280k → ₹1.4M/mo",
        timeToResult: "60 Days"
      },
      quote: "SignalMint connected our real-time inventory and margin telemetry directly into the ad spend pacing. We scaled 5x in 2 months with absolute confidence that every rupee was net-profitable.",
      author: "Aditya R.",
      authorTitle: "Managing Director, Bold Edge",
      architecturalBleed: [
        {
          title: "Audience Intent Mismatch",
          description: "Broad targeting was optimizing for speculative clicks rather than high-AOV checkout completions."
        },
        {
          title: "Static Bidding during Inventory Stockouts",
          description: "Ads running at full budget even when primary colorways were backordered."
        },
        {
          title: "Creative Lack of Acoustic Demonstration",
          description: "Product visuals showed hardware without demonstrating active noise cancellation."
        }
      ],
      winningHooks: [
        {
          pattern: "Subway Noise Isolation Binaural Test",
          retentionScore: "66% 3s Hook Rate",
          breakdown: "Binaural headphone audio switching instantaneously from deafening train roar to silence."
        },
        {
          pattern: "Teardown vs Industry Giant",
          retentionScore: "55% 3s Hook Rate",
          breakdown: "Component-by-component driver comparison with a ₹25,000 legacy competitor at 1/3 the price."
        }
      ]
    },
    sections: [
      {
        heading: "01. High Traffic, Low Margin Conundrum",
        body: "Bold Edge possessed an exceptional ANC audio product, but ad accounts were hemorrhaging money on curiosity clicks rather than converting buyers.",
        bullets: [
          "Click-to-checkout drop-off reached 82% on high-spend tech enthusiast ad sets.",
          "Stockouts on bestsellers occurred while ad spend kept pacing at maximum rate.",
          "ROAS hovered at 1.9x, insufficient to support fast inventory cycles."
        ]
      },
      {
        heading: "02. Telemetry-Linked Pacing Infrastructure",
        body: "We integrated inventory API telemetry directly with our custom Meta pacing rules. As soon as SKU stock fell below safety thresholds, budgets shifted automatically."
      },
      {
        heading: "03. The Audio-First Demonstration Creative",
        body: "Replaced beauty product renders with immersive binaural sound tests that demonstrated the ANC contrast in the first 1.5 seconds."
      }
    ],
    specifications: [
      { label: "Client Category", value: "Consumer Tech // Audio Accessories" },
      { label: "Starting Blended ROAS", value: "1.9x" },
      { label: "Scaled Blended ROAS", value: "3.8x (Verified)" },
      { label: "CPA Reduction", value: "43.8% (₹490 → ₹275)" },
      { label: "Monthly Revenue Scale", value: "₹280k → ₹1.4M / month" }
    ],
    relatedKeys: ["case-aerosleep", "case-methodiq", "case-monolith"]
  }
};
