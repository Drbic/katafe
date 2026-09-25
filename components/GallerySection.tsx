"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gallery } from "@/lib/content";
import Photo from "./Photo";

export default function GallerySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  }, []);

  const open = (i: number, el: HTMLButtonElement) => {
    triggerRef.current = el;
    setOpenIndex(i);
  };

  const step = useCallback((dir: 1 | -1) => {
    setOpenIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length));
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, step]);

  return (
    <section id="galerie" className="gallery">
      <div className="gallery__grid">
        {gallery.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            className="gallery__tile"
            onClick={(e) => open(i, e.currentTarget)}
            aria-label={`Zobrazit fotografii na celou obrazovku: ${photo.alt}`}
          >
            <Photo photo={photo} />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Prohlížeč fotografií">
          <button type="button" className="lightbox__backdrop" aria-label="Zavřít prohlížeč" onClick={close} />
          <button type="button" ref={closeBtnRef} className="lightbox__close" aria-label="Zavřít prohlížeč" onClick={close}>
            ✕
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--prev" aria-label="Předchozí fotografie" onClick={() => step(-1)}>
            ←
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lightbox__img"
            src={gallery[openIndex].src}
            alt={gallery[openIndex].alt}
            style={{ objectPosition: gallery[openIndex].position }}
          />
          <button type="button" className="lightbox__nav lightbox__nav--next" aria-label="Další fotografie" onClick={() => step(1)}>
            →
          </button>
          <p className="lightbox__count" aria-live="polite">
            {openIndex + 1} / {gallery.length}
          </p>
        </div>
      )}
    </section>
  );
}
