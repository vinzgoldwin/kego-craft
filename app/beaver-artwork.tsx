"use client";

import { useEffect, useRef, useState } from "react";

export default function BeaverArtwork({ pose = "standing" }: { pose?: "standing" | "celebrating" }) {
  const standing = pose === "standing";
  const scene = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => setPlaying(visible && !document.hidden && !reducedMotion.matches);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return (
    <div ref={scene} className="beaver-scene" data-playing={playing}>
      <svg
        viewBox={standing ? "0 0 374 410" : "0 0 340 296"}
        width={standing ? 374 : 340}
        height={standing ? 410 : 296}
        role="img"
        aria-label={standing ? "The lilac beaver proudly holding a website" : "The lilac beaver smiling beside a completed website"}
      >
        <g className={standing ? undefined : "beaver-celebrate"}>
          <image href="/mascot/beaver-approved-source.png"
            x={standing ? -736 : -1108} y={standing ? -624 : -726}
            width="1448" height="1086" />
        </g>
      </svg>
      {/* Unmount the film when idle so offscreen and reduced-motion views use the original still. */}
      {standing && playing && (
        // Keep the pre-encoded animation intact; image optimization is unnecessary.
        // eslint-disable-next-line @next/next/no-img-element
        <img className="beaver-film" src="/mascot/beaver-proud-loop.webp"
          width="374" height="410" alt="" decoding="async" />
      )}
    </div>
  );
}
