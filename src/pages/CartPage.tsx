import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import EmptyState from "@/components/shared/EmptyState";
import PageHero from "@/components/shared/PageHero";

const DELIVERY_FEE = 3.99;
const FREE_DELIVERY_THRESHOLD = 40;

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart();

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f8f4]">
        <PageHero title="Shopping Cart" breadcrumbs={[{ label: "Cart" }]} />
        <EmptyState
          icon={<ShoppingBag className="w-10 h-10" />}
          title="Your cart is waiting for something fresh"
          description="Add products from our shop and they'll appear here, ready for checkout."
          ctaLabel="Start Shopping"
          ctaTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f4]">
      <PageHero
        title="Shopping Cart"
        subtitle={`${items.length} item${items.length > 1 ? "s" : ""} in your cart`}
        breadcrumbs={[{ label: "Cart" }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4 items-center"
                >
                  <Link to={`/product/${item.product.slug}`}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover bg-gray-100 shrink-0"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#2a7d4f] font-body mb-0.5">{item.product.category}</p>
                    <Link to={`/product/${item.product.slug}`}>
                      <h3 className="font-body font-semibold text-gray-900 text-sm leading-snug hover:text-[#2a7d4f] transition-colors line-clamp-2">
                        {item.product.name}
                      </h3>
                    </Link>
                    {item.product.weight && (
                      <p className="text-xs text-gray-400 font-body mt-0.5">{item.product.weight}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center border border-gray-200 rounded-xl">
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-body font-semibold text-gray-900 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="w-20 text-right">
                      <p className="font-body font-bold text-gray-900 text-sm">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400 font-body">${item.product.price.toFixed(2)} each</p>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="w-9 h-9 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="font-display text-xl text-gray-900 mb-5">Order Summary</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm font-body text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-body text-gray-600">
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? "text-emerald-600 font-medium" : ""}>
                    {deliveryFee === 0 ? "FREE" : `$${DELIVERY_FEE.toFixed(2)}`}
                  </span>
                </div>
                {subtotal < FREE_DELIVERY_THRESHOLD && (
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
                    <Tag className="w-4 h-4 text-amber-500 shrink-0" />
                    <p className="text-xs text-amber-700 font-body">
                      Add ${(FREE_DELIVERY_THRESHOLD - subtotal).toFixed(2)} more for free delivery
                    </p>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between font-body font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-[#2a7d4f] text-white py-3.5 rounded-xl font-body font-medium text-sm hover:bg-[#1e5c39] transition-colors shadow-md shadow-[#2a7d4f]/25"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/shop"
                className="w-full flex items-center justify-center gap-2 mt-3 border border-gray-200 text-gray-600 py-3 rounded-xl font-body text-sm hover:border-[#2a7d4f] hover:text-[#2a7d4f] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
