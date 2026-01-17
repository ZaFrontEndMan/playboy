import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductSection from "@/components/ProductSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main className="relative">
      <Hero />

      <ProductSection />
      <Marquee text="FUTURE WEAR — PREMIUM STREETWEAR — " />
      <div className="rotate-180 invert">      <Marquee  text="FUTURE WEAR — PREMIUM STREETWEAR — " />
      </div>
      <FeaturesSection />
      <CTASection />
    </main>
  );
}
