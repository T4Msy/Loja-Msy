import { Hero } from "@/components/home/hero";
import { MarqueeStrip } from "@/components/home/marquee-strip";
import { DropFeature } from "@/components/home/drop-feature";
import { Manifesto } from "@/components/home/manifesto";
import { Pillars } from "@/components/home/pillars";
import { FeaturedProducts } from "@/components/home/featured-products";
import { LookbookTeaser } from "@/components/home/lookbook-teaser";
import { mockProducts } from "@/lib/mock/products";

export default function HomePage() {
  const featured = mockProducts.filter((p) => p.status === "active").slice(0, 4);

  return (
    <>
      <Hero />
      <MarqueeStrip />
      <DropFeature />
      <FeaturedProducts products={featured} />
      <Manifesto />
      <Pillars />
      <LookbookTeaser />
    </>
  );
}
