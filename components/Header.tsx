"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { Symbol } from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="header">
      <a className="header__logo" href="#top" aria-label="KATAFE – nahoru">
        <Symbol />
      </a>
      <nav className="header__nav" aria-label="Hlavní navigace">
        {nav.map((i) => (
          <a key={i.label} className="navlink" href={i.href}>{i.label}</a>
        ))}
      </nav>
      <div className="header__actions">
        <a className="btn-cta" href={site.reservationHref}>Rezervace</a>
        <button className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
          {open ? "Zavřít" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobilní navigace">
          {nav.map((i) => (
            <a key={i.label} href={i.href} onClick={() => setOpen(false)}>{i.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}
