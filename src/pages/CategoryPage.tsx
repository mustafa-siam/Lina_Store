import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import PageHero from "@/components/shared/PageHero";
import NotFoundPage from "./NotFoundPage";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);

  if (!category) return <NotFoundPage />;

  const categoryProducts = getProductsByCategory(category.slug);

  return (
    <div className="min-h-screen bg-[#f8f8f4]">
      <PageHero
        title={category.name}
        subtitle={category.description}
        breadcrumbs={[{ label: "Shop", to: "/shop" }, { label: category.name }]}
        image={category.image}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Related categories */}
        <div className="flex gap-3 flex-wrap mb-8">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop/${cat.slug}`}
              className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-colors ${
                cat.slug === slug
                  ? "bg-[#2a7d4f] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#2a7d4f] hover:text-[#2a7d4f]"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl text-gray-900 mb-2">No products in this category</p>
            <p className="text-gray-500 font-body mb-6">Check back soon — we're always adding new products.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 text-[#2a7d4f] font-body font-medium hover:underline">
              Browse all products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 font-body">{categoryProducts.length} products</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {categoryProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <ProductCard product={product} index={i} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
