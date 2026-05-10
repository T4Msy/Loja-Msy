import { Hero } from "@/components/home/hero";
import { DropFeature } from "@/components/home/drop-feature";
import { Manifesto } from "@/components/home/manifesto";
import { FeaturedProducts } from "@/components/home/featured-products";
import { LookbookTeaser } from "@/components/home/lookbook-teaser";
import { SocialProof } from "@/components/home/social-proof";
import { Testimonials } from "@/components/home/testimonials";
import { HomeFAQ } from "@/components/home/home-faq";
import { FinalCTA } from "@/components/home/final-cta";
import { mockProducts } from "@/lib/mock/products";

export default function HomePage() {
  const featured = mockProducts.filter((p) => p.status === "active").slice(0, 4);

  return (
    <>
      <Hero />
      <SocialProof />
      <DropFeature />
      <FeaturedProducts products={featured} />
      <Manifesto />
      <Testimonials />
      <LookbookTeaser />
      <HomeFAQ />
      <FinalCTA />
    </>
  );
}
