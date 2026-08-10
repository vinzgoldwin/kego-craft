"use client";

import { useRef } from "react";

type Project = {
  title: string;
  category: string;
  description: string;
  href: string;
  linkLabel: string;
  video?: string;
  poster?: string;
  image?: string;
};

const projects: Project[] = [
  {
    title: "Alkemy Chat",
    category: "AI PRODUCT",
    description: "Multi-model chat with search, files, images, and fast streaming responses.",
    href: "https://alkemychat.com/",
    linkLabel: "VIEW PRODUCT",
    video: "https://videos.kego.online/alkemy-chat/v2/demo.mp4",
    poster: "https://videos.kego.online/alkemy-chat/v2/poster.webp",
  },
  {
    title: "Biawak KOL",
    category: "WEB APP",
    description: "Game tracking, player rankings, win rates, history, and monthly MVP cards.",
    href: "https://biawakkol.pages.dev/",
    linkLabel: "OPEN APP",
    video: "https://videos.kego.online/biawak-kol/v2/demo.mp4",
    poster: "https://videos.kego.online/biawak-kol/v2/poster.webp",
  },
  {
    title: "Better Watch",
    category: "SMALL TOOL",
    description: "A cheerful watchlist that keeps films and shows out of the endless scroll.",
    href: "https://github.com/vinzgoldwin/better-watch",
    linkLabel: "VIEW SOURCE",
    video: "https://videos.kego.online/better-watch/v1/demo.mp4",
    poster: "https://videos.kego.online/better-watch/v1/poster.webp",
  },
  {
    title: "Asia Mega Pasifik",
    category: "CLIENT WEBSITE",
    description: "Corporate website for an industrial procurement and services company.",
    href: "https://asiamegapasifik.com/",
    linkLabel: "VISIT WEBSITE",
    image: "https://asiamegapasifik.com/wp-content/uploads/2021/05/amp-2.png",
  },
];

export default function SelectedWork() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direction: -1 | 1) {
    const track = trackRef.current;

    if (!track) return;

    track.scrollBy({ left: direction * track.clientWidth * 0.86, behavior: "smooth" });
  }

  return (
    <div className="selected-work-inner">
      <div className="selected-work-header">
        <div>
          <p className="eyebrow">SELECTED WORK / {String(projects.length).padStart(2, "0")}</p>
          <h2>SHIPPED<br /><span>WORK.</span></h2>
        </div>
        <div className="selected-work-intro">
          <div className={`work-controls ${projects.length > 3 ? "show-desktop" : ""}`}>
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous projects">←</button>
            <button type="button" onClick={() => scroll(1)} aria-label="Next projects">→</button>
          </div>
        </div>
      </div>

      <div className="work-track" ref={trackRef} aria-label="Selected projects">
        {projects.map((project, index) => (
          <article className="work-project" key={project.title}>
            {project.video ? (
              <video controls muted playsInline preload="none" poster={project.poster} aria-label={`${project.title} product demo`}>
                <source src={project.video} type="video/mp4" />
              </video>
            ) : (
              <a className="work-project-preview" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`}>
                <span className="work-project-preview-image" style={{ backgroundImage: `url(${project.image})` }} />
              </a>
            )}
            <div className="work-meta">
              <span>{String(index + 1).padStart(2, "0")} / {project.category}</span>
              <span>LIVE</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a className="work-project-link" href={project.href} target="_blank" rel="noopener noreferrer">{project.linkLabel} ↗</a>
          </article>
        ))}
      </div>

      <div className="selected-work-footer">
        <span>WEB / IOS / ANDROID</span>
        <a href="https://kego-personal.pages.dev/" target="_blank" rel="noopener noreferrer">SEE ALL PERSONAL WORK ↗</a>
      </div>
    </div>
  );
}
