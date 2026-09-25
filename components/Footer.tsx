import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wordmark footer__inner">
        {/* Kruh v logu nechává nad písmeny volné místo – texty footeru leží v něm (od 1100 px). */}
        <div className="footer__logo">
          <div className="footer__top">
            <div>
              <p className="footer__blurb">
                Káva, brunch a chvíle jen pro vás. Zastavte se u nás v {site.cityLocative}.
              </p>
              {/* PLACEHOLDER: odkazy na sociální sítě – doplnit, až budou k dispozici skutečné profily. */}
              <div className="footer__social">
                <a href={site.instagramHref}>Instagram</a>
                <a href={site.facebookHref}>Facebook</a>
              </div>
            </div>
            <div>
              <p className="footer__label">Otevírací doba</p>
              {site.hours.map((line) => (
                <span key={line} className="footer__value">{line}</span>
              ))}
            </div>
            <div>
              <p className="footer__label">Kontaktní údaje</p>
              <div className="footer__value">
                <a className="footer__link" href={`tel:${site.phone.replace(/\s+/g, "")}`}>
                  {site.phone}
                </a>
                {", "}
                <a className="footer__link" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </div>
              <a className="footer__value footer__link" href={site.routeHref} target="_blank" rel="noopener noreferrer">
                {site.address}
              </a>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/footer-logo.png" alt="KATAFE — Kavárna &amp; brunch" width={1466} height={253} />
        </div>
      </div>

      <div className="footer__bottom footer__inner">
        <span>© {site.name}</span>
        <a className="footer__credit" href="https://www.rezit.cz" target="_blank" rel="noopener noreferrer" aria-label="Vytvořil rezit">
          <span className="footer__credit-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="footer__credit-logo-img footer__credit-logo-img--normal"
              src="/rezit-sign1.webp"
              alt=""
              width={2000}
              height={393}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="footer__credit-logo-img footer__credit-logo-img--hover"
              src="/rezit-sign2.webp"
              alt=""
              width={2000}
              height={393}
            />
          </span>
        </a>
      </div>
    </footer>
  );
}
