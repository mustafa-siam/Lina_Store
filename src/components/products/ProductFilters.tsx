import { X, SlidersHorizontal } from "lucide-react";
import { categories } from "@/data/categories";

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  onlyDiscounted: boolean;
  sortBy: "default" | "price-asc" | "price-desc" | "rating" | "newest";
}

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalResults: number;
}

const sortOptions: { value: FilterState["sortBy"]; label: string }[] = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export default function ProductFilters({ filters, onChange, totalResults }: ProductFiltersProps) {
  function reset() {
    onChange({
      category: "",
      minPrice: 0,
      maxPrice: 100,
      minRating: 0,
      onlyDiscounted: false,
      sortBy: "default",
    });
  }

  const hasActiveFilters =
    filters.category ||
    filters.minPrice > 0 ||
    filters.maxPrice < 100 ||
    filters.minRating > 0 ||
    filters.onlyDiscounted;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 font-body font-semibold text-gray-900 text-sm">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </div>
        {hasActiveFilters && (
          <button
            onClick={reset}
            className="text-xs text-[#2a7d4f] font-body font-medium hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      <p className="text-xs text-gray-400 font-body mb-6">{totalResults} products</p>

      {/* Sort */}
      <div className="mb-6">
        <label className="block text-xs font-body font-semibold text-gray-700 uppercase tracking-wide mb-2.5">
          Sort by
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value as FilterState["sortBy"] })}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#2a7d4f] bg-white text-gray-700"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-xs font-body font-semibold text-gray-700 uppercase tracking-wide mb-2.5">
          Category
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="radio"
              name="category"
              value=""
              checked={filters.category === ""}
              onChange={() => onChange({ ...filters, category: "" })}
              className="accent-[#2a7d4f]"
            />
            <span className="text-sm font-body text-gray-700">All Categories</span>
          </label>
          {categories.map((cat) => (
            <label key={cat.slug} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat.slug}
                checked={filters.category === cat.slug}
                onChange={() => onChange({ ...filters, category: cat.slug })}
                className="accent-[#2a7d4f]"
              />
              <span className="text-sm font-body text-gray-700">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div className="mb-6">
        <label className="block text-xs font-body font-semibold text-gray-700 uppercase tracking-wide mb-2.5">
          Max Price: <span className="text-[#2a7d4f]">${filters.maxPrice}</span>
        </label>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-[#2a7d4f]"
        />
        <div className="flex justify-between text-xs text-gray-400 font-body mt-1">
          <span>$0</span>
          <span>$100+</span>
        </div>
      </div>

      {/* Min Rating */}
      <div className="mb-6">
        <label className="block text-xs font-body font-semibold text-gray-700 uppercase tracking-wide mb-2.5">
          Min Rating
        </label>
        <div className="space-y-1.5">
          {[0, 3, 4, 4.5].map((r) => (
            <label key={r} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={r}
                checked={filters.minRating === r}
                onChange={() => onChange({ ...filters, minRating: r })}
                className="accent-[#2a7d4f]"
              />
              <span className="text-sm font-body text-gray-700">
                {r === 0 ? "All ratings" : `${r}★ & above`}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Discounted */}
      <div>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.onlyDiscounted}
            onChange={(e) => onChange({ ...filters, onlyDiscounted: e.target.checked })}
            className="accent-[#2a7d4f] w-4 h-4 rounded"
          />
          <span className="text-sm font-body text-gray-700">On sale only</span>
        </label>
      </div>
    </div>
  );
}
