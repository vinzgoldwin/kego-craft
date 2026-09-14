"use client";

import { useEffect, useRef } from "react";
import { processSteps } from "./portfolio-data";

export default function ProcessTimeline() {
  const timeline = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = timeline.current!;
    const steps = Array.from(list.querySelectorAll<HTMLElement>("li"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    // Read positions together, then update only the decorative rail and markers.
    const update = () => {
      frame = 0;
      const positions = steps.map((step) => step.getBoundingClientRect().top + 8);
      const readingLine = window.innerHeight * 0.75;

      steps.forEach((step, index) => {
        const start = positions[index];
        const end = positions[index + 1] ?? start;
        const progress = reducedMotion.matches ? 1 : end > start
          ? Math.max(0, Math.min(1, (readingLine - start) / (end - start)))
          : Number(readingLine >= start);
        step.style.setProperty("--step-progress", String(progress));
        step.dataset.reached = String(reducedMotion.matches || readingLine >= start);
      });
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
    };
  }, []);

  return (
    <ol className="process-timeline" ref={timeline}>
      {processSteps.map((step, index) => (
        <li className="process-step" key={step.label}>
          <span className="process-rail" aria-hidden="true" />
          <span className="process-dot" aria-hidden="true" />
          <div className="process-marker">
            <span>Phase {index + 1}</span>
            <strong>{step.label}</strong>
          </div>
          <p>{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
