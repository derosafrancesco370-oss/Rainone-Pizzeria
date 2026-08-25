import { useState } from "react";
import "@/App.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { IntroLoader } from "@/components/IntroLoader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Philosophy } from "@/components/Philosophy";
import { MenuSection } from "@/components/MenuSection";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { Delivery } from "@/components/Delivery";
import { SocialHub } from "@/components/SocialHub";
import { Footer } from "@/components/Footer";
import { ReservationModal } from "@/components/ReservationModal";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Concierge } from "@/components/Concierge";
import { scrollToId } from "@/components/SmoothScroll";

function App() {
  const [resOpen, setResOpen] = useState(false);
  const openReserve = () => setResOpen(true);
  const goDelivery = () => scrollToId("delivery");

  return (
    <div className="App grain">
      <SmoothScroll>
        <IntroLoader />
        <Navbar onReserve={openReserve} />
        <main>
          <Hero onReserve={openReserve} onOrder={goDelivery} />
          <Marquee />
          <Philosophy />
          <MenuSection />
          <Gallery />
          <Reviews />
          <Delivery />
          <SocialHub />
        </main>
        <Footer onReserve={openReserve} />
        <FloatingWhatsApp />
        <Concierge />
        <ReservationModal open={resOpen} onClose={() => setResOpen(false)} />
      </SmoothScroll>
    </div>
  );
}

export default App;
