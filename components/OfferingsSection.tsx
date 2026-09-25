import { offerings } from "@/lib/content";
import Photo from "./Photo";

export default function OfferingsSection() {
  return (
    <section id="nabidka" className="section section--offer">
      <h2 className="display display--offer">Na co máte <em className="serif">chuť?</em></h2>
      <div className="offerings">
        {offerings.map((o, n) => (
          <article key={o.n} className={`offer offer--${n + 1}`}>
            <div className="offer__photo"><Photo photo={o.photo} /></div>
            <div className="offer__head">
              <h3 className="offer__title">{o.title}</h3>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="offer__icon" src={o.icon} alt="" />
            </div>
            <p className="offer__text">{o.text[0]}<br />{o.text[1]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
