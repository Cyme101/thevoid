import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, Observer, ScrollTrigger, SplitText);

export { gsap, useGSAP, Observer, ScrollTrigger, SplitText };

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Fades the children of `scope` up into place as they scroll into view.
// Skipped entirely for visitors who prefer reduced motion.
export const useScrollReveal = (scope, { y = 40, stagger = 0.1 } = {}) =>
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray(scope.current.children);
        gsap.set(items, { autoAlpha: 0, y });
        ScrollTrigger.batch(items, {
          start: "top 85%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger,
              overwrite: true,
            }),
        });
      });
    },
    { scope }
  );
