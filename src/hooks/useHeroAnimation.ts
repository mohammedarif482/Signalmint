import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useHeroAnimation() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

      // 1. Tag & Status Pill Fade In
      tl.from(".hero-pill", {
        y: -20,
        opacity: 0,
        duration: 0.8,
      });

      // 2. Editorial Headline Staggered Reveal from bottom clip
      tl.from(
        ".hero-headline-line",
        {
          y: 80,
          skewY: 4,
          opacity: 0,
          stagger: 0.15,
        },
        "-=0.5"
      );

      // 3. Supporting Copy & CTA Buttons
      tl.from(
        ".hero-subtext, .hero-cta-group",
        {
          y: 25,
          opacity: 0,
          stagger: 0.1,
          duration: 0.9,
        },
        "-=0.8"
      );

      // 4. Floating Telemetry Card Spring-Up
      tl.from(
        ".hero-telemetry-card",
        {
          scale: 0.92,
          y: 40,
          opacity: 0,
          duration: 1.4,
          ease: "elastic.out(1, 0.75)",
        },
        "-=1.0"
      );

      // 5. Continuous subtle floating bob for the card
      gsap.to(".hero-telemetry-card", {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
