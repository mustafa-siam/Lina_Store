import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { CheckCircle, ShoppingBag, Home, Truck } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[#f0faf4] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center py-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.1 }}
          className="w-24 h-24 bg-[#2a7d4f] rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#2a7d4f]/30"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className="font-display text-4xl text-gray-900 mb-3">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-500 font-body text-base leading-relaxed mb-8">
            Thank you for shopping with Lina Store. Your fresh groceries are being
            prepared and will be on their way to you shortly.
          </p>

          {/* Steps */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 text-left">
            <p className="font-body font-semibold text-gray-900 text-sm mb-4">What happens next?</p>
            <div className="space-y-4">
              {[
                { icon: CheckCircle, label: "Order confirmed", done: true },
                { icon: ShoppingBag, label: "Order being prepared", done: false },
                { icon: Truck, label: "Out for delivery", done: false },
              ].map(({ icon: Icon, label, done }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${done ? "bg-[#2a7d4f] text-white" : "bg-gray-100 text-gray-400"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`font-body text-sm ${done ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 bg-[#2a7d4f] text-white px-7 py-3.5 rounded-xl font-body font-medium hover:bg-[#1e5c39] transition-colors shadow-md shadow-[#2a7d4f]/25"
            >
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-white text-gray-700 px-7 py-3.5 rounded-xl font-body font-medium hover:border-[#2a7d4f] hover:text-[#2a7d4f] transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
