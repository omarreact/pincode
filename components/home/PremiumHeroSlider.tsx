"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { photos } from "@/lib/stock-photos";
import "./premium-hero-slider.css";

type Slide = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  image: { src: string; alt: string };
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  imageLabel: string;
};

const slides: readonly Slide[] = [
  {
    eyebrow: "PINCODE IT / INFORMATION TECHNOLOGY",
    title: "Technology that moves",
    accent: "business forward.",
    description: "We design, build and improve digital experiences that make technology genuinely useful for business.",
    image: photos.laptop,
    primary: { label: "Start a project", href: "/contact" },
    secondary: { label: "Explore services", href: "/services" },
    imageLabel: "DIGITAL EXPERIENCES",
  },
  {
    eyebrow: "DOMAINS / WEB HOSTING / ONLINE PRESENCE",
    title: "Every great idea needs",
    accent: "a place to grow.",
    description: "Find the right domain, compare trusted hosting providers and take the next step toward a stronger digital presence.",
    image: photos.connected,
    primary: { label: "Search domains", href: "/domains" },
    secondary: { label: "Compare hosting", href: "/hosting" },
    imageLabel: "YOUR DIGITAL FOUNDATION",
  },
  {
    eyebrow: "DESIGN / DEVELOPMENT / LONG-TERM SUPPORT",
    title: "Designed for people.",
    accent: "Built for what's next.",
    description: "Thoughtful interfaces, maintainable engineering and practical support, shaped around the goals behind every project.",
    image: photos.programming,
    primary: { label: "See our approach", href: "/work" },
    secondary: { label: "Explore solutions", href: "/solutions" },
    imageLabel: "FROM IDEA TO IMPACT",
  },
];

const ROTATION_MS = 8000;

/** Small carousel; no third-party sliders or layout-shifting animations. */
export function PremiumHeroSlider() {
  const [active, setActive] = useState(0);
  // Only fetch images after their slide has been opened.
  const [visited, setVisited] = useState<number[]>([0]);
  const [manualPause, setManualPause] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const [announcement, setAnnouncement] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  const navigate = useCallback((next: number, announce = false) => {
    const index = (next + slides.length) % slides.length;
    setVisited(prev => prev.includes(index) ? prev : [...prev, index]);
    setActive(index);
    if (announce) setAnnouncement(`Slide ${index + 1} of ${slides.length}: ${slides[index].title} ${slides[index].accent}`);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? true), { threshold: 0.12 })
      : null;
    if (sectionRef.current) observer?.observe(sectionRef.current);
    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (manualPause || interacting || reducedMotion || !pageVisible || !inView) return;
    const timeout = window.setTimeout(() => navigate(active + 1), ROTATION_MS);
    return () => window.clearTimeout(timeout);
  }, [active, inView, interacting, manualPause, navigate, pageVisible, reducedMotion]);

  return (
    <section
      className="hero premium-hero"
      aria-label="PINCODE IT featured services"
      aria-roledescription="carousel"
      ref={sectionRef}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false);
      }}
    >
      <div className="premium-hero-viewport" aria-live="off">
        {slides.map((slide, index) => {
          const isActive = index === active;
          return (
            <div
              className={`premium-hero-slide${isActive ? " is-active" : ""}`}
              key={slide.eyebrow}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              <div className="container premium-hero-grid">
                <div className="premium-hero-copy hero-copy reveal">
                  <span className="premium-hero-eyebrow">
                    <span className="premium-hero-spark" aria-hidden="true" />
                    {slide.eyebrow}
                  </span>
                  <h1>{slide.title} <span>{slide.accent}</span></h1>
                  <p className="premium-hero-description">{slide.description}</p>
                  <div className="premium-hero-actions">
                    <Link href={slide.primary.href} tabIndex={isActive ? 0 : -1} className="premium-hero-button premium-hero-button-primary">
                      {slide.primary.label} <span aria-hidden="true">↗</span>
                    </Link>
                    <Link href={slide.secondary.href} tabIndex={isActive ? 0 : -1} className="premium-hero-button premium-hero-button-secondary">
                      {slide.secondary.label} <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                  <span className="premium-hero-subnote">DESIGN · ENGINEERING · SUPPORT</span>
                </div>
                <div className="premium-hero-art" aria-hidden="true">
                  <div className="premium-hero-art-frame">
                    {visited.includes(index) ? (
                      <Image
                        src={slide.image.src}
                        alt=""
                        fill
                        sizes="(max-width:760px) 88vw, (max-width:1200px) 43vw, 560px"
                        quality={68}
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    ) : null}
                    <div className="premium-hero-art-tint" />
                    <div className="premium-hero-art-caption">
                      <span className="premium-hero-art-symbol" aria-hidden="true">✳</span>
                      <span>{slide.imageLabel}</span>
                      <span>{String(index + 1).padStart(2, "0")} / 03</span>
                    </div>
                  </div>
                  <span className="premium-hero-art-halo" />
                  <span className="premium-hero-art-dot" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="container premium-hero-bottom">
        <div className="premium-hero-progress" role="group" aria-label="Select featured slide">
          {slides.map((slide, index) => (
            <button
              className={`premium-hero-indicator${active === index ? " is-active" : ""}`}
              type="button"
              key={slide.eyebrow}
              aria-label={`Go to slide ${index + 1}: ${slide.title} ${slide.accent}`}
              aria-current={active === index ? "true" : undefined}
              onClick={() => navigate(index, true)}
            ><span>{String(index + 1).padStart(2, "0")}</span><i aria-hidden="true" /></button>
          ))}
        </div>
        <div className="premium-hero-controls" role="group" aria-label="Carousel controls">
          <button type="button" className="premium-hero-control" aria-label="Previous slide" onClick={() => navigate(active - 1, true)}>←</button>
          <button
            type="button"
            className="premium-hero-control premium-hero-pause"
            aria-label={manualPause || reducedMotion ? "Resume automatic slides" : "Pause automatic slides"}
            aria-pressed={manualPause || reducedMotion}
            onClick={() => {
              if (reducedMotion) return;
              setManualPause(p => !p);
            }}
            disabled={reducedMotion}
            title={reducedMotion ? "Automatic sliding disabled by reduced-motion preference" : undefined}
          >{manualPause || reducedMotion ? "▶" : "Ⅱ"}</button>
          <button type="button" className="premium-hero-control" aria-label="Next slide" onClick={() => navigate(active + 1, true)}>→</button>
        </div>
      </div>
      <span className="premium-hero-screenreader" aria-live="polite" aria-atomic="true">{announcement}</span>
    </section>
  );
}
