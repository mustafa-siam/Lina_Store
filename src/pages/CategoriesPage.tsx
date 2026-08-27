import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import PageHero from "@/components/shared/PageHero";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f4]">
      <PageHero
        title="All Categories"
        subtitle="Explore our full range of grocery categories — from farm-fresh produce to household essentials."
        breadcrumbs={[{ label: "Categories" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <Link
                to={`/shop/${category.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div
                    className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: category.color }}
                  >
                    <span className="text-lg">
                      {["🥦", "🥩", "🥛", "🍞", "🧃", "🍿", "🫙", "❄️", "🧹"][i] || "🛒"}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl text-gray-900">{category.name}</h3>
                    <p className="text-gray-500 font-body text-sm mt-1 line-clamp-2">
                      {category.description}
                    </p>
                    <p className="text-[#2a7d4f] font-body text-xs font-medium mt-2">
                      {category.productCount} products
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-[#2a7d4f] group-hover:border-[#2a7d4f] group-hover:text-white transition-colors ml-4 shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
