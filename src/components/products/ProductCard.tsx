import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({
  product,
  index = 0,
}: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const { showToast } = useToast();

  const inCart = isInCart(product.id);

  const savings = product.oldPrice
    ? product.oldPrice - product.price
    : 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();

    addItem(product);
    showToast(`${product.name} added to cart`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="p-3">
          {/* Product Name */}
          <h3 className="font-body font-medium text-gray-900 text-sm leading-snug line-clamp-2 mb-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-body font-semibold text-gray-900 text-base">
              ৳{product.price.toLocaleString()}
            </span>

            {product.oldPrice && (
              <span className="font-body text-gray-400 text-sm line-through">
                ৳{product.oldPrice.toLocaleString()}
              </span>
            )}

            {savings > 0 && (
              <span className="bg-lime-200 text-green-800 text-[10px] font-medium px-1.5 py-0.5 rounded-md whitespace-nowrap">
                Save ৳{savings.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add To Cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm font-body font-medium transition-colors ${
              inCart
               ? "bg-[#2a7d4f] text-white"
                  : "bg-white text-gray-900 hover:bg-[#2a7d4f] hover:text-white"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />

            {inCart ? "In Cart" : "Add To Cart"}
          </button>
        </div>
      </Link>
    </motion.div>
  );
}