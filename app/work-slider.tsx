"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Project = {
  title: string;
  category: string;
  status?: string;
  description: string;
  href: string;
  linkLabel: string;
  className: string;
  video?: string;
  poster?: string;
  image?: string;
};

function Arrow({ direction }: { direction: "left" | "right" }) {
  const path = direction === "left" ? "M12.5 4.5 7 10l5.5 5.5" : "m7.5 4.5 5.5 5.5-5.5 5.5";

  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d={path} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  return (
    <div className={`work-media ${project.className}`}>
      {project.video ? (
        <video controls muted playsInline preload="none" poster={project.poster} aria-label={`${project.title} product demo`}>
          <source src={project.video} type="video/mp4" />
        </video>
      ) : (
        <a
          className="work-image-link"
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.title}`}
        >
          <span className="work-image" style={{ backgroundImage: `url(${project.image})` }} />
        </a>
      )}
    </div>
  );
}

export default function WorkSlider({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const indexRef = useRef(0);
  const [controls, setControls] = useState({ canGoBack: false, canGoForward: true });

  const syncPosition = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.querySelectorAll<HTMLElement>(".work-slide"));
    const origin = slides[0]?.offsetLeft ?? 0;
    const nearest = slides.reduce(
      (best, slide, index) => {
        const distance = Math.abs(slide.offsetLeft - origin - track.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    );

    indexRef.current = nearest.index;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const nextControls = {
      canGoBack: track.scrollLeft > 2,
      canGoForward: track.scrollLeft < maxScroll - 2,
    };
    setControls((current) => (
      current.canGoBack === nextControls.canGoBack && current.canGoForward === nextControls.canGoForward
        ? current
        : nextControls
    ));
  }, []);

  const move = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.querySelectorAll<HTMLElement>(".work-slide"));
    if (!slides.length) return;

    const nextIndex = Math.max(0, Math.min(slides.length - 1, indexRef.current + direction));
    const maxScroll = track.scrollWidth - track.clientWidth;
    const target = Math.min(maxScroll, slides[nextIndex].offsetLeft - slides[0].offsetLeft);
    const start = track.scrollLeft;
    const distance = target - start;

    indexRef.current = nextIndex;
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.style.scrollSnapType = "";
      track.scrollLeft = target;
      syncPosition();
      return;
    }

    // Scroll snapping can round each animation frame to a slide and make the
    // transition jump. Restore it once the track reaches the exact target.
    track.style.scrollSnapType = "none";
    const startedAt = performance.now();
    const duration = 440;
    const animate = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 5);
      track.scrollLeft = start + distance * eased;

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
        track.style.scrollSnapType = "";
        syncPosition();
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [syncPosition]);

  useEffect(() => {
    const track = trackRef.current;
    syncPosition();
    window.addEventListener("resize", syncPosition);

    return () => {
      window.removeEventListener("resize", syncPosition);
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
      if (track) track.style.scrollSnapType = "";
    };
  }, [syncPosition]);

  const handleScroll = () => {
    if (animationRef.current !== null || scrollFrameRef.current !== null) return;

    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      syncPosition();
    });
  };

  return (
    <div className="work-slider" data-reveal="media">
      <div
        className="work-track"
        ref={trackRef}
        role="list"
        aria-label="Selected work"
        onScroll={handleScroll}
      >
        {projects.map((project, index) => (
          <article className="work-slide" role="listitem" key={project.title}>
            <ProjectMedia project={project} />
            <div className="work-copy">
              <div className="work-index">
                <span>{String(index + 1).padStart(2, "0")} {project.category}</span>
                {project.status && <span>{project.status}</span>}
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">
                <span>{project.linkLabel}</span><span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="work-controls" role="group" aria-label="Project slider controls">
        <button type="button" onClick={() => move(-1)} disabled={!controls.canGoBack} aria-label="Previous project">
          <Arrow direction="left" />
        </button>
        <button type="button" onClick={() => move(1)} disabled={!controls.canGoForward} aria-label="Next project">
          <Arrow direction="right" />
        </button>
      </div>
    </div>
  );
}
