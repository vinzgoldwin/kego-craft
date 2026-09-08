"use client";

import { useEffect, useRef } from "react";
import "./brand-entrance.css";

const navigation = [
  ["Work", "#work"],
  ["Services", "#services"],
  ["Process", "#process"],
  ["Pricing", "#pricing"],
] as const;

export default function BrandEntrance() {
  const header = useRef<HTMLElement>(null);
  const logo = useRef<HTMLAnchorElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const finishIntro = useRef<() => void>(() => {});

  useEffect(() => {
    const nav = header.current!;
    let previousY = window.scrollY;
    let travel = 0;

    function onScroll() {
      // Clamp overscroll so bouncing at either end cannot reverse the navbar.
      const y = Math.max(0, Math.min(window.scrollY,
        document.documentElement.scrollHeight - window.innerHeight));
      const delta = y - previousY;
      previousY = y;

      if (y <= 80) {
        delete nav.dataset.scrollHidden;
        travel = 0;
        return;
      }
      if (delta === 0) return;
      travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;
      if (Math.abs(travel) < 12) return;

      if (travel > 0) nav.dataset.scrollHidden = "true";
      else delete nav.dataset.scrollHidden;
      travel = 0;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nav = header.current!;
    const mark = logo.current!;
    const cover = curtain.current!;
    const skipButton = skip.current!;
    const main = document.querySelector<HTMLElement>(".site-shell")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    let finished = false;

    function finish() {
      finished = true;
      animations.forEach((animation) => animation.cancel());
      cover.hidden = true;
      skipButton.hidden = true;
      nav.dataset.ready = "true";
      nav.inert = false;
      main.inert = false;
      delete document.documentElement.dataset.intro;
    }
    finishIntro.current = finish;

    function animate(
      element: Element,
      frames: Keyframe[],
      duration: number,
      delay = 0,
    ) {
      const animation = element.animate(frames, {
        duration,
        delay,
        fill: "both",
        easing: "cubic-bezier(.76,0,.24,1)",
      });
      animations.push(animation);
      return animation;
    }

    async function start() {
      if (reduced.matches || window.location.hash || window.scrollY > 0) {
        finish();
        return;
      }
      document.documentElement.dataset.intro = "playing";
      cover.hidden = false;
      skipButton.hidden = false;
      nav.inert = true;
      main.inert = true;
      await Promise.all([
        document.fonts.ready,
        ...[
          ...nav.querySelectorAll("img"),
          ...cover.querySelectorAll("img"),
        ].map((image) => image.decode()),
      ]);
      if (finished) return;

      // Measure the final layout once. The real navbar wordmark travels from the centre into its own slot.
      const navBox = nav.getBoundingClientRect();
      const logoBox = mark.getBoundingClientRect();
      const centreOffset = (window.innerWidth - navBox.width) / 2 - navBox.left;
      const x =
        window.innerWidth / 2 -
        (logoBox.left + centreOffset + logoBox.width / 2);
      const y = window.innerHeight * 0.45 - (logoBox.top + logoBox.height / 2);
      const scale = Math.min(6, (window.innerWidth * 0.56) / logoBox.width);
      const centre = `translate(${x}px, ${y}px) scale(${scale})`;

      const travel = animate(
        nav,
        [
          { transform: `translateX(${centreOffset}px)` },
          { transform: "translateX(0)" },
        ],
        850,
        3300,
      );
      const markTravel = animate(
        mark,
        [
          { transform: centre, opacity: 0, offset: 0 },
          { transform: centre, opacity: 1, offset: 0.08 },
          { transform: centre, opacity: 1, offset: 0.57, easing: "cubic-bezier(.76,0,.24,1)" },
          { transform: "translate(0, 0) scale(1)", opacity: 1, offset: 1 },
        ],
        1850,
        1450,
      );
      markTravel.effect!.updateTiming({ easing: "linear" });
      // Hold the assembled white mark, reverse the colors, then start its journey upward.
      animate(
        cover,
        [{ backgroundColor: "#73779b" }, { backgroundColor: "#fff" }],
        350,
        2050,
      );
      animate(
        mark.querySelector("img")!,
        [{ filter: "brightness(0) invert(1)" }, { filter: "brightness(1) invert(0)" }],
        350,
        2050,
      );
      animate(
        skipButton,
        [{ color: "#fff" }, { color: "#17191c" }],
        350,
        2050,
      );
      animate(
        nav.querySelector(".header-surface")!,
        [{ opacity: 0 }, { opacity: 1 }],
        400,
        2900,
      );
      nav.querySelectorAll(".header-links a").forEach((link, i) => {
        animate(
          link,
          [
            { opacity: 0, transform: "translateX(12px)" },
            { opacity: 1, transform: "none" },
          ],
          380,
          3050 + i * 45,
        );
      });
      cover.querySelectorAll(".intro-letter").forEach((letter, i) => {
        animate(
          letter,
          [
            {
              opacity: 0,
              transform: "rotateX(90deg) translateY(-12px)",
              offset: 0,
            },
            { opacity: 1, transform: "rotateX(0) translateY(0)", offset: 0.24 },
            { opacity: 1, transform: "rotateX(0) translateY(0)", offset: 0.66 },
            {
              opacity: 0,
              transform: "rotateX(-90deg) translateY(12px)",
              offset: 1,
            },
          ],
          440,
          i * 380,
        );
      });
      animate(cover, [{ opacity: 1 }, { opacity: 0 }], 650, 2750);
      for (const [i, element] of [
        ...main.querySelectorAll(".hero-copy, .studio-statement"),
      ].entries()) {
        animate(
          element,
          [
            { opacity: 0, transform: "translateY(30px)" },
            { opacity: 1, transform: "none" },
          ],
          800,
          3250 + i * 100,
        );
      }
      nav.dataset.ready = "true";
      void travel.finished.then(finish, () => {});
    }

    // Resizing or choosing reduced motion completes the intro immediately, preserving usable navigation.
    window.addEventListener("resize", finish);
    reduced.addEventListener("change", finish);
    void start().catch(finish);
    return () => {
      finish();
      window.removeEventListener("resize", finish);
      reduced.removeEventListener("change", finish);
    };
  }, []);

  return (
    <>
      <div className="brand-curtain" ref={curtain} aria-hidden="true">
        <div className="intro-letters">
          {"kego".split("").map((letter) => (
            <span className="intro-letter" key={letter}>
              {/* SVG assets retain their native paths and fixed dimensions. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/brand/letter-${letter}.svg`}
                width={160}
                height={200}
                alt=""
              />
            </span>
          ))}
        </div>
      </div>
      <button
        ref={skip}
        className="intro-skip"
        onClick={() => finishIntro.current()}
      >
        Skip intro ↗
      </button>
      <header className="site-header" ref={header}>
        <div className="header-surface" aria-hidden="true" />
        <a
          className="brand-wordmark"
          href="#top"
          aria-label="Kego Works home"
          ref={logo}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/kego.svg" width={480} height={300} alt="" />
        </a>
        <nav className="header-links" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          <a
            className="header-contact"
            href="mailto:kegoo.gg@gmail.com?subject=Start%20a%20project"
          >
            Let&apos;s talk ↗
          </a>
        </nav>
      </header>
      <noscript>
        <style>
          {
            ".brand-curtain,.intro-skip{display:none!important}.site-header{visibility:visible!important}"
          }
        </style>
      </noscript>
    </>
  );
}
