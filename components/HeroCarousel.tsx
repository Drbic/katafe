"use client";

import { useRef, useState } from "react";
import { slides, site } from "@/lib/content";
import Photo from "./Photo";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === "left" ? "M7.5 1.5 1.5 8l6 6.5" : "M1.5 1.5 7.5 8l-6 6.5"} />
    </svg>
  );
}

export default function HeroCarousel() {
  const [i, setI] = useState(0);
  const touchX = useRef<number | null>(null);
  const go = (d: number) => setI((c) => (c + d + slides.length) % slides.length);

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Fotografie kavárny"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      <div
        className="carousel__stage"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {slides.map((s, n) => (
          <div key={n} className="carousel__slide" data-active={n === i} aria-hidden={n !== i}>
            <Photo photo={s} priority={n === 0} />
          </div>
        ))}
        <p className="carousel__claim">
          Na chvíli<br /><em className="serif">vypnout.</em>
        </p>
        <div className="carousel__arrows">
          <button className="round-btn" aria-label="Předchozí fotografie" onClick={() => go(-1)}><Chevron dir="left" /></button>
          <button className="round-btn" aria-label="Další fotografie" onClick={() => go(1)}><Chevron dir="right" /></button>
        </div>
      </div>
      <div className="carousel__meta">
        <span>{site.address}</span>
        <div className="carousel__dots">
          {slides.map((_, n) => (
            <button key={n} className="dot" data-active={n === i} aria-label={`Fotografie ${n + 1}`} aria-current={n === i} onClick={() => setI(n)} />
          ))}
        </div>
        <span>{site.hoursHero}</span>
      </div>
    </div>
  );
}
