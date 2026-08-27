import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";

interface FeaturedCategoryProductsProps {
  /** Number of categories to display (default: 4) */
  categoryLimit?: number;
  /** Number of products to show per category (default: 4) */
  productsPerCategory?: number;
}

function CategoryProductGroup({
  category,
  productsPerCategory,
}: {
  category: (typeof categories)[0];
  productsPerCategory: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const products = getProductsByCategory(category.slug).slice(
    0,
    productsPerCategory
  );

  // Skip rendering this category block if it has no products
  if (products.length === 0) return null;

  return (
    <div ref={ref} className="space-y-6">
      {/* Category Header */}
      <div className="flex items-center justify-between border-b border-gray-200/80 pb-4">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-gray-900">
            {category.name}
          </h3>
          {category.description && (
            <p className="text-sm text-gray-500 font-body mt-0.5 hidden sm:block">
              {category.description}
            </p>
          )}
        </div>

        <Link
          to={`/shop/${category.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium font-body text-[#2a7d4f] hover:text-[#1a4731] hover:underline group transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <ProductCard product={product} index={index} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ShowingAllCategory({
  categoryLimit = 4,
  productsPerCategory = 4,
}: FeaturedCategoryProductsProps) {
  const selectedCategories = categories.slice(0, categoryLimit);

  return (
    <section className="py-20 bg-[#f8f8f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          label="Featured Products"
          title="Explore Our Popular Categories"
          subtitle="Handpicked items from our top categories — freshly sourced and delivered to your doorstep."
        />

        {/* Render each category block */}
        <div className="space-y-16">
          {selectedCategories.map((category) => (
            <CategoryProductGroup
              key={category.id}
              category={category}
              productsPerCategory={productsPerCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
}