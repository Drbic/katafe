import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OfferingsSection from "@/components/OfferingsSection";
import DailyMenuSection from "@/components/DailyMenuSection";
import ReservationSection from "@/components/ReservationSection";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <OfferingsSection />
        <DailyMenuSection />
        <ReservationSection />
        <GallerySection />
      </main>
      <Footer />
    </>
  );
}
