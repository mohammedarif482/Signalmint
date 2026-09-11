import {
  Building2,
  TrendingUp,
  LineChart,
  Target,
  type LucideIcon
} from "lucide-react";

export type InnerPageKey =
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
