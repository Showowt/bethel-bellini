import { Navigation } from "@/components/sections/Navigation";
import { HeroLuxury } from "@/components/sections/HeroLuxury";
import { About } from "@/components/sections/About";
import { MenuLuxury } from "@/components/sections/MenuLuxury";
import { GalleryLuxury } from "@/components/sections/GalleryLuxury";
import { ReservationLuxury } from "@/components/sections/ReservationLuxury";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroLuxury />
      <About />
      <MenuLuxury />
      <GalleryLuxury />
      <ReservationLuxury />
      <Footer />
    </main>
  );
}
