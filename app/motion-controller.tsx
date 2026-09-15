"use client";

import { useEffect } from "react";

export default function MotionController() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timeline = document.querySelector<HTMLOListElement>(".experience-timeline")!;
    const entries = Array.from(timeline.querySelectorAll<HTMLElement>(".experience-entry"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        timeline.removeAttribute("data-motion");
        return;
      }

      // Batch layout reads; only the rail, years and illustrations change.
      const bounds = entries.map((entry) => entry.getBoundingClientRect());
      const readingLine = window.innerHeight * 0.7;
      entries.forEach((entry, index) => {
        const start = bounds[index].top + 46;
        const end = bounds[index].bottom - 12;
        const progress = Math.max(0, Math.min(1, (readingLine - start) / Math.max(1, end - start)));
        entry.style.setProperty("--experience-progress", String(progress));
        if (bounds[index].top + 18 <= readingLine) entry.classList.add("is-reached");
      });
      timeline.dataset.motion = "true";
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      resizeObserver.disconnect();
      timeline.removeAttribute("data-motion");
    };
  }, []);

  return null;
}
