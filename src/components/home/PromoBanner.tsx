import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden bg-[#1a4731] text-white"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=500&fit=crop&auto=format)",
            }}
          />
          <div className="relative grid md:grid-cols-2 gap-8 items-center px-8 py-12 md:px-16 md:py-16">
            <div>
              <p className="text-amber-400 font-body font-semibold text-sm uppercase tracking-widest mb-3">
                Limited Time
              </p>
              <h2 className="font-display text-3xl md:text-5xl leading-tight mb-4">
                Fresh Deals,
                <br />
                Better Prices
              </h2>
              <p className="text-white/70 font-body text-base mb-8 max-w-sm">
                Save up to 30% on seasonal produce, dairy essentials, and pantry staples. Fresh
                every day — at prices that feel great.
              </p>
              <Link
                to="/offers"
                className="inline-flex items-center gap-2 bg-amber-400 text-gray-900 px-7 py-3.5 rounded-xl font-body font-semibold hover:bg-amber-300 transition-colors"
              >
                Shop Offers
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="hidden md:flex justify-end items-center">
              <div className="text-center">
                <p className="font-display text-8xl text-amber-400 leading-none">30%</p>
                <p className="font-body text-2xl text-white/80 mt-2">OFF Selected Items</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
