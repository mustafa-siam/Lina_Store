import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f0faf4] min-h-[88vh] flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#2a7d4f]/8 blur-3xl" />
        <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-[#2a7d4f]/5 blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Text side */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white border border-[#2a7d4f]/20 text-[#2a7d4f] text-sm font-body font-medium px-4 py-2 rounded-full shadow-sm mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Fresh. Natural. Delivered.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight"
          >
            Fresh Groceries,
            <span className="text-[#2a7d4f] block">Delivered to</span>
            Your Door.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-gray-500 font-body text-lg leading-relaxed max-w-md"
          >
            Shop fresh produce, everyday essentials, snacks, beverages and more — all in one place,
            with same-day delivery.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#2a7d4f] text-white px-7 py-3.5 rounded-xl font-body font-medium text-base hover:bg-[#1e5c39] transition-colors shadow-md shadow-[#2a7d4f]/25"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/offers"
              className="inline-flex items-center gap-2 border-2 border-[#2a7d4f] text-[#2a7d4f] px-7 py-3.5 rounded-xl font-body font-medium text-base hover:bg-[#2a7d4f] hover:text-white transition-colors"
            >
              Explore Offers
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex items-center gap-6"
          >
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "500+", label: "Products" },
              { value: "4.9★", label: "Rating" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-2xl text-gray-900">{value}</p>
                <p className="text-gray-500 text-xs font-body">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-200">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop&auto=format"
              alt="Fresh groceries including fruits and vegetables"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>

          {/* Floating cards */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-[#e8f5ee] flex items-center justify-center text-xl">
              🥬
            </div>
            <div>
              <p className="font-body font-semibold text-gray-900 text-sm">100% Organic</p>
              <p className="text-gray-500 text-xs font-body">Hand-picked daily</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-5 py-4"
          >
            <p className="font-body font-semibold text-gray-900 text-sm">🚚 Same-day delivery</p>
            <p className="text-gray-500 text-xs font-body mt-0.5">Order before 2pm</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
