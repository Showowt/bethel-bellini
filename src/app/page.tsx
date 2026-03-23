import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Menu } from "@/components/sections/Menu";
import { Gallery } from "@/components/sections/Gallery";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Menu />
      <Gallery />
      <Footer />
    </main>
  );
}
