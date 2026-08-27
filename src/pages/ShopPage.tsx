import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters, { FilterState } from "@/components/products/ProductFilters";
import PageHero from "@/components/shared/PageHero";

const DEFAULT_FILTERS: FilterState = {
  category: "",
  minPrice: 0,
  maxPrice: 100,
  minRating: 0,
  onlyDiscounted: false,
  sortBy: "default",
};

const PAGE_SIZE = 12;

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (filters.category) {
      result = result.filter((p) => p.categorySlug === filters.category);
    }

    if (filters.maxPrice < 100) {
      result = result.filter((p) => p.price <= filters.maxPrice);
    }

    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    if (filters.onlyDiscounted) {
      result = result.filter((p) => !!p.oldPrice);
    }

    if (filters.sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (filters.sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (filters.sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [filters, searchQuery]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  function handleFiltersChange(f: FilterState) {
    setFilters(f);
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-[#f8f8f4]">
      <PageHero
        title={searchQuery ? `Search: "${searchQuery}"` : "Shop Fresh Groceries"}
        subtitle="Browse our full range of fresh produce, pantry staples, dairy, beverages, and more."
        breadcrumbs={[{ label: "Shop" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Sidebar filters — desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <ProductFilters
              filters={filters}
              onChange={handleFiltersChange}
              totalResults={filtered.length}
            />
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter toggle */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <p className="text-sm font-body text-gray-500">{filtered.length} products</p>
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-2.5 font-body text-sm font-medium text-gray-700"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-display text-2xl text-gray-900 mb-2">No products found</p>
                <p className="text-gray-500 font-body">Try adjusting your filters or search term.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                  <AnimatePresence>
                    {paginated.map((product, i) => (
                      <ProductCard key={product.id} product={product} index={i % PAGE_SIZE} />
                    ))}
                  </AnimatePresence>
                </div>

                {hasMore && (
                  <div className="mt-10 text-center">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setPage((p) => p + 1)}
                      className="bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-xl font-body font-medium text-sm hover:border-[#2a7d4f] hover:text-[#2a7d4f] transition-colors shadow-sm"
                    >
                      Load More Products
                    </motion.button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[90]"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-80 bg-white z-[100] shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <p className="font-body font-semibold text-gray-900">Filters</p>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5">
                <ProductFilters
                  filters={filters}
                  onChange={(f) => {
                    handleFiltersChange(f);
                    setMobileFiltersOpen(false);
                  }}
                  totalResults={filtered.length}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
