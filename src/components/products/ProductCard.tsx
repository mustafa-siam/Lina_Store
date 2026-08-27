import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import Rating from "@/components/ui/Rating";
import Badge from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const discountPct = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    showToast(`${product.name} added to cart`);
  }

  function handleToggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggleItem(product);
    showToast(
      inWishlist ? `Removed from wishlist` : `${product.name} added to wishlist`,
      inWishlist ? "error" : "success"
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -3 }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
      >
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <Badge
                label={product.badge === "bestseller" ? "Best Seller" : product.badge}
                variant={product.badge}
              />
            )}
            {discountPct && (
              <Badge label={`-${discountPct}%`} variant="sale" />
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors ${
              inWishlist
                ? "bg-red-500 text-white"
                : "bg-white text-gray-400 hover:text-red-500"
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? "fill-white" : ""}`} />
          </button>

          {/* Add to cart on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-body text-sm font-medium transition-colors ${
                inCart
                  ? "bg-[#2a7d4f] text-white"
                  : "bg-white text-gray-900 hover:bg-[#2a7d4f] hover:text-white"
              } shadow-lg`}
            >
              {inCart ? (
                <>
                  <ShoppingCart className="w-4 h-4" /> In Cart
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-[#2a7d4f] font-body font-medium mb-1">{product.category}</p>
          <h3 className="font-body font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-2">
            {product.name}
          </h3>
          <Rating value={product.rating} count={product.reviews} />
          <div className="flex items-center gap-2 mt-2.5">
            <span className="font-body font-bold text-gray-900 text-base">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="font-body text-gray-400 text-sm line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.weight && (
            <p className="text-xs text-gray-400 font-body mt-1">{product.weight}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
