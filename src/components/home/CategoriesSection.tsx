import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import SectionHeading from "@/components/ui/SectionHeading";

function CategoryCard({
  category,
  index,
}: {
  category: (typeof categories)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
    >
      <Link
        to={`/shop/${category.slug}`}
        className="group block text-center"
      >
        {/* Category Image */}
        <div className="w-full aspect-square bg-white rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:shadow-md">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Category Name */}
        <p className="mt-3 text-gray-800 font-body text-base font-medium group-hover:text-[#2a7d4f] transition-colors duration-200">
          {category.name}
        </p>
      </Link>
    </motion.div>
  );
}
export default function CategoriesSection() {
  return (
    <section className="py-20 bg-[#f8f7f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Browse by Category"
          title="Everything You Need"
          subtitle="From farm-fresh produce to household essentials — organized for easy shopping."
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-8">
          {categories.slice(0, 4).map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
