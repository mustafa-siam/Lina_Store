import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import Rating from "@/components/ui/Rating";
import EmptyState from "@/components/shared/EmptyState";
import PageHero from "@/components/shared/PageHero";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f8f4]">
        <PageHero title="My Wishlist" breadcrumbs={[{ label: "Wishlist" }]} />
        <EmptyState
          icon={<Heart className="w-10 h-10" />}
          title="Your wishlist is empty"
          description="Save products you love and come back to them anytime."
          ctaLabel="Explore Products"
          ctaTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f4]">
      <PageHero
        title="My Wishlist"
        subtitle={`${items.length} saved item${items.length > 1 ? "s" : ""}`}
        breadcrumbs={[{ label: "Wishlist" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {items.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group"
              >
                <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-4">
                  <p className="text-xs text-[#2a7d4f] font-body mb-1">{product.category}</p>
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-body font-semibold text-gray-900 text-sm leading-snug hover:text-[#2a7d4f] transition-colors line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                  </Link>
                  <Rating value={product.rating} count={product.reviews} />
                  <div className="flex items-center gap-2 mt-2 mb-4">
                    <span className="font-body font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="text-gray-400 text-sm font-body line-through">${product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        addItem(product);
                        showToast(`${product.name} added to cart`);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-[#2a7d4f] text-white py-2.5 rounded-xl font-body text-sm font-medium hover:bg-[#1e5c39] transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
