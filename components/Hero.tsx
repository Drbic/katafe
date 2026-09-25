import { Wordmark } from "./Logo";
import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <h1 className="hero__wordmark"><Wordmark className="hero__wordmark-svg" /></h1>
      <HeroCarousel />
    </section>
  );
}
