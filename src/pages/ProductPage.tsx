import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ShoppingCart,
  Heart,
  Star,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import Rating from "@/components/ui/Rating";
import Badge from "@/components/ui/Badge";
import ProductCard from "@/components/products/ProductCard";
import NotFoundPage from "./NotFoundPage";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug ?? "");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "info" | "reviews">("description");

  const { addItem, isInCart } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  if (!product) return <NotFoundPage />;

  const related = getRelatedProducts(product);
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const discountPct = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  function handleAddToCart() {
    addItem(product!, qty);
    showToast(`${product!.name} added to cart`);
  }

  function handleToggleWishlist() {
    toggleItem(product!);
    showToast(inWishlist ? "Removed from wishlist" : `${product!.name} saved to wishlist`);
  }

  return (
    <div className="min-h-screen bg-[#f8f8f4]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2 text-sm font-body text-gray-500">
          <Link to="/" className="hover:text-[#2a7d4f] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-[#2a7d4f] transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/shop/${product.categorySlug}`} className="hover:text-[#2a7d4f] transition-colors">{product.category}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-square bg-white shadow-sm border border-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-5 left-5">
                  <Badge
                    label={product.badge === "bestseller" ? "Best Seller" : product.badge}
                    variant={product.badge}
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <Link
              to={`/shop/${product.categorySlug}`}
              className="text-sm text-[#2a7d4f] font-body font-medium hover:underline mb-2 inline-block"
            >
              {product.category}
            </Link>
            <h1 className="font-display text-3xl md:text-4xl text-gray-900 mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              <Rating value={product.rating} count={product.reviews} size="md" />
              <span className="text-sm text-gray-500 font-body">
                {product.stock > 10 ? "In stock" : `Only ${product.stock} left`}
              </span>
            </div>

            {product.weight && (
              <p className="text-sm text-gray-400 font-body mb-4">{product.weight}</p>
            )}

            <div className="flex items-center gap-3 mb-5">
              <span className="font-display text-4xl text-gray-900">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="font-body text-lg text-gray-400 line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
              {discountPct && (
                <span className="bg-red-100 text-red-600 text-sm font-body font-semibold px-3 py-1 rounded-full">
                  {discountPct}% OFF
                </span>
              )}
            </div>

            <p className="text-gray-500 font-body text-base leading-relaxed mb-7">
              {product.description}
            </p>

            {/* Qty & Add to cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-gray-200 rounded-xl bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-body font-semibold text-gray-900">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="w-11 h-11 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-body font-medium text-sm transition-colors shadow-sm ${
                  inCart
                    ? "bg-[#2a7d4f] text-white"
                    : "bg-[#2a7d4f] text-white hover:bg-[#1e5c39]"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {inCart ? "Add More to Cart" : "Add to Cart"}
              </motion.button>
            </div>

            <div className="flex gap-3 mb-8">
              <Link
                to="/checkout"
                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-body font-medium text-sm hover:bg-gray-800 transition-colors"
              >
                Buy Now
              </Link>
              <button
                onClick={handleToggleWishlist}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                  inWishlist
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500"
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-red-500" : ""}`} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gray-100">
              {[
                { icon: Truck, label: "Same-day delivery" },
                { icon: Shield, label: "Quality guaranteed" },
                { icon: RotateCcw, label: "Easy returns" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="text-center">
                  <Icon className="w-5 h-5 text-[#2a7d4f] mx-auto mb-1.5" />
                  <p className="text-xs text-gray-500 font-body">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-12">
          <div className="border-b border-gray-100 px-6">
            <div className="flex gap-6">
              {(["description", "info", "reviews"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`py-4 font-body text-sm font-medium border-b-2 transition-colors capitalize ${
                    tab === t
                      ? "border-[#2a7d4f] text-[#2a7d4f]"
                      : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {t === "info" ? "Product Info" : t}
                </button>
              ))}
            </div>
          </div>
          <div className="p-8">
            {tab === "description" && (
              <p className="text-gray-600 font-body leading-relaxed max-w-2xl">
                {product.longDescription}
              </p>
            )}
            {tab === "info" && (
              <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
                {[
                  { label: "Weight / Size", value: product.weight || "—" },
                  { label: "Origin", value: product.origin || "—" },
                  { label: "Category", value: product.category },
                  { label: "Stock", value: `${product.stock} units` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-xs text-gray-400 font-body uppercase tracking-wide">{label}</span>
                    <span className="text-gray-900 font-body font-medium">{value}</span>
                  </div>
                ))}
                {product.nutrition && product.nutrition.length > 0 && (
                  <div className="sm:col-span-2 mt-2">
                    <p className="text-xs text-gray-400 font-body uppercase tracking-wide mb-2">Nutrition (per 100g)</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {product.nutrition.map((n) => (
                        <div key={n.label} className="bg-[#f8f8f4] rounded-xl px-3 py-3">
                          <p className="text-xs text-gray-500 font-body">{n.label}</p>
                          <p className="font-body font-semibold text-gray-900 text-sm mt-0.5">{n.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {tab === "reviews" && (
              <div>
                <div className="flex items-center gap-6 mb-8">
                  <div className="text-center">
                    <p className="font-display text-5xl text-gray-900">{product.rating}</p>
                    <div className="flex justify-center my-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-5 h-5 ${s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm font-body">Based on {product.reviews} reviews</p>
                  </div>
                </div>
                <div className="space-y-5">
                  {[
                    { name: "Maria K.", date: "3 days ago", text: "Absolutely fresh and delicious. Will order again!", rating: 5 },
                    { name: "Tom H.", date: "1 week ago", text: "Good quality, arrived well-packaged. Happy with my purchase.", rating: 4 },
                    { name: "Anita P.", date: "2 weeks ago", text: "Exceeded my expectations. Fresher than what I get at the supermarket.", rating: 5 },
                  ].map((r) => (
                    <div key={r.name} className="border-b border-gray-100 pb-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-[#e8f5ee] flex items-center justify-center text-sm font-bold text-[#2a7d4f] font-body">
                          {r.name[0]}
                        </div>
                        <div>
                          <p className="font-body font-semibold text-gray-900 text-sm">{r.name}</p>
                          <p className="text-gray-400 text-xs font-body">{r.date}</p>
                        </div>
                        <Rating value={r.rating} />
                      </div>
                      <p className="text-gray-600 font-body text-sm ml-12">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-2xl md:text-3xl text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
