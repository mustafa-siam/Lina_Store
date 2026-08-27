import Hero from "@/components/home/Hero";
import Benefits from "@/components/home/Benefits";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import BestSellers from "@/components/home/BestSellers";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import SpecialOffer from "@/components/home/SpecialOffer";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import ShowingAllCategory from "@/components/home/showingAllCategory";

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* <Benefits /> */}
      <CategoriesSection />
      <BestSellers />
     
      <PromoBanner />
       <FeaturedProducts />
      {/* <WhyChooseUs /> */}
      <SpecialOffer />
      <ShowingAllCategory categoryLimit={4} productsPerCategory={4} />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
