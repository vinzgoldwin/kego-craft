"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Project = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  className: string;
  video?: string;
  poster?: string;
  image?: string;
};

function ProjectMedia({
  project,
  active,
}: {
  project: Project;
  active: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    function syncPlayback() {
      if (!active || document.hidden || reduced.matches || userPaused.current) {
        video!.pause();
      } else {
        void video!
          .play()
          .then(() => {
            if (disposed || document.hidden) video!.pause();
          })
          .catch(() => {});
      }
    }
    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    reduced.addEventListener("change", syncPlayback);
    return () => {
      disposed = true;
      video.pause();
      document.removeEventListener("visibilitychange", syncPlayback);
      reduced.removeEventListener("change", syncPlayback);
    };
  }, [active]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const syncControls = () => {
      video.controls = document.fullscreenElement === video;
    };
    document.addEventListener("fullscreenchange", syncControls);
    return () => document.removeEventListener("fullscreenchange", syncControls);
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    userPaused.current = !video.paused;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  }

  async function expand() {
    const video = videoRef.current;
    if (!video) return;
    video.controls = true;
    try {
      if (video.requestFullscreen) await video.requestFullscreen();
      else
        (
          video as HTMLVideoElement & { webkitEnterFullscreen?: () => void }
        ).webkitEnterFullscreen?.();
    } catch {
      video.controls = false;
    }
  }

  return (
    <div className={`work-media ${project.className}`}>
      <div className="work-screen">
        {project.video ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={project.poster}
            aria-label={`${project.title} product demo`}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src={project.video} type="video/mp4" />
          </video>
        ) : (
          <div
            className="work-image"
            role="img"
            aria-label={project.title}
            style={{ backgroundImage: `url(${project.image})` }}
          />
        )}
      </div>
      <div className="work-media-actions">
        <a
          className="work-product-link"
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.linkLabel}
          <span aria-hidden="true">↗</span>
        </a>
        {project.video && (
          <div className="work-video-controls">
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={`${playing ? "Pause" : "Play"} ${project.title} demo`}
            >
              <svg viewBox="0 0 20 20" aria-hidden="true">
                {playing ? (
                  <path
                    d="M6 4v12M14 4v12"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                ) : (
                  <path d="m6 3 10 7-10 7Z" fill="currentColor" />
                )}
              </svg>
            </button>
            <button
              type="button"
              onClick={expand}
              aria-label={`Expand ${project.title} demo`}
            >
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path
                  d="M7 3H3v4m10-4h4v4M3 13v4h4m10-4v4h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WorkSlider({ projects }: { projects: Project[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const position = useRef(0);
  const animation = useRef<number | null>(null);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drag = useRef<{ x: number; position: number; moved: boolean } | null>(
    null,
  );
  const suppressClick = useRef(false);
  const targetIndex = useRef(0);
  const [selected, setSelected] = useState(0);
  const [inView, setInView] = useState(false);

  const paint = useCallback((value: number) => {
    position.current = value;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const cards = stage.current?.querySelectorAll<HTMLElement>(".work-slide");
    cards?.forEach((card, index) => {
      const distance = index - value;
      const side = Math.max(-1, Math.min(1, distance));
      const depth = Math.abs(distance);
      card.style.transform = reduced
        ? "none"
        : `translateX(${side * 25}%) translateZ(${-depth * 200}px) rotateY(${-side * 25}deg)`;
      card.style.opacity = String(
        reduced
          ? index === Math.round(value)
            ? 1
            : 0
          : Math.max(0, Math.min(1, 2 - depth)),
      );
      card.style.zIndex = String(100 - Math.round(depth * 10));
      card.style.visibility = depth >= 2 ? "hidden" : "visible";
      const front = index === Math.round(value);
      card.inert = !front;
      card.setAttribute("aria-hidden", String(!front));
      card.dataset.front = String(front);
    });
  }, []);

  const settle = useCallback(
    (index: number) => {
      const target = Math.max(0, Math.min(projects.length - 1, index));
      targetIndex.current = target;
      setSelected(target);
      if (animation.current !== null) cancelAnimationFrame(animation.current);
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      const from = position.current;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animation.current = null;
        paint(target);
        return;
      }
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - started) / 600);
        paint(from + (target - from) * (1 - Math.pow(1 - progress, 4)));
        animation.current = progress < 1 ? requestAnimationFrame(tick) : null;
      };
      animation.current = requestAnimationFrame(tick);
    },
    [paint, projects.length],
  );

  useEffect(() => {
    const element = stage.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reset = () => {
      if (animation.current !== null) cancelAnimationFrame(animation.current);
      animation.current = null;
      drag.current = null;
      delete element.dataset.dragging;
      paint(targetIndex.current);
    };
    reset();
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.intersectionRatio > 0.35);
      },
      { threshold: [0, 0.35, 1] },
    );
    observer.observe(element);

    // Only horizontal wheel input turns the deck. Vertical gestures keep scrolling the page.
    const wheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      if (animation.current !== null) cancelAnimationFrame(animation.current);
      animation.current = null;
      const unit =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? element.clientWidth
            : 1;
      paint(
        Math.max(
          0,
          Math.min(
            projects.length - 1,
            position.current +
              (event.deltaX * unit) / (element.clientWidth * 0.6),
          ),
        ),
      );
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(
        () => settle(Math.round(position.current)),
        140,
      );
    };
    element.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("resize", reset);
    reduced.addEventListener("change", reset);
    return () => {
      observer.disconnect();
      element.removeEventListener("wheel", wheel);
      window.removeEventListener("resize", reset);
      reduced.removeEventListener("change", reset);
      if (animation.current !== null) cancelAnimationFrame(animation.current);
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
    };
  }, [paint, settle, projects.length]);

  const endDrag = () => {
    const start = drag.current;
    drag.current = null;
    if (stage.current) delete stage.current.dataset.dragging;
    if (!start?.moved) return;
    const change = position.current - start.position;
    settle(
      Math.abs(change) > 0.15
        ? Math.round(start.position) + Math.sign(change)
        : Math.round(start.position),
    );
  };

  const project = projects[selected];
  return (
    <div className="work-slider" data-reveal="media">
      <div
        className="work-stage"
        ref={stage}
        role="group"
        aria-label="Project card stack"
        aria-roledescription="carousel"
        onPointerDown={(event) => {
          suppressClick.current = false;
          if (
            event.button !== 0 ||
            (event.target as Element).closest("a,button")
          )
            return;
          if (animation.current !== null)
            cancelAnimationFrame(animation.current);
          animation.current = null;
          if (wheelTimer.current) clearTimeout(wheelTimer.current);
          event.currentTarget.setPointerCapture(event.pointerId);
          drag.current = {
            x: event.clientX,
            position: position.current,
            moved: false,
          };
        }}
        onPointerMove={(event) => {
          const start = drag.current;
          if (!start) return;
          const change =
            (start.x - event.clientX) / (event.currentTarget.clientWidth * 0.6);
          if (!start.moved && Math.abs(event.clientX - start.x) < 6) return;
          start.moved = true;
          suppressClick.current = true;
          event.currentTarget.dataset.dragging = "true";
          paint(
            Math.max(0, Math.min(projects.length - 1, start.position + change)),
          );
        }}
        onPointerUp={endDrag}
        onPointerCancel={() => {
          const start = drag.current;
          drag.current = null;
          if (stage.current) delete stage.current.dataset.dragging;
          if (start) settle(Math.round(start.position));
        }}
        onClickCapture={(event) => {
          if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
      >
        {projects.map((item, index) => (
          <article
            className="work-slide"
            key={item.title}
            aria-label={item.title}
            style={{ visibility: index === 0 ? "visible" : "hidden" }}
          >
            <ProjectMedia
              project={item}
              active={inView && selected === index}
            />
          </article>
        ))}
      </div>
      <div className="work-copy" aria-live="polite" aria-atomic="true">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </div>
  );
}
