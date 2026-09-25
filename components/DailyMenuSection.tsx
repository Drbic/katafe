"use client";

import { useState } from "react";
import { menu, menuCategoryPhotos } from "@/lib/content";
import Photo from "./Photo";

// Decentní, ale pokaždé trochu jiné natočení fotky u položek menu (ne čistě náhodné,
// aby se výsledek neměnil při každém překreslení).
const THUMB_ROTATIONS = [-4, 3, -2, 0, 4, -3, 2, -1];

export default function DailyMenuSection() {
  const [active, setActive] = useState(menu[0].id);
  const current = menu.find((c) => c.id === active) ?? menu[0];
  const photo = menuCategoryPhotos[current.id];

  return (
    <section id="dnes" className="section section--menu">
      <h2 className="display display--offer">Co si dáte <em className="serif">dnes?</em></h2>
      <div className="menu">
        <div className="menu__tabs" role="tablist" aria-label="Kategorie menu">
          {menu.map((c) => (
            <button
              key={c.id}
              id={`tab-${c.id}`}
              role="tab"
              className="menu__tab"
              aria-selected={c.id === active}
              aria-controls="menu-panel"
              onClick={() => setActive(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <ul key={current.id} id="menu-panel" className="menu__list" role="tabpanel" aria-labelledby={`tab-${current.id}`}>
          {current.items.map((i, idx) => (
            <li key={i.name} className="menu__row" tabIndex={photo ? 0 : undefined}>
              <div>
                <h3 className="menu__name">{i.name}</h3>
                {i.desc && <p className="menu__desc">{i.desc}</p>}
              </div>
              {photo && (
                <span
                  className="menu__thumb"
                  style={{ "--rot": `${THUMB_ROTATIONS[idx % THUMB_ROTATIONS.length]}deg` } as React.CSSProperties}
                >
                  <Photo photo={photo} />
                </span>
              )}
              <span className="menu__price">{i.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
