import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Timer } from "lucide-react";

const timeBlocks = [
  { value: "02", label: "Days" },
  { value: "14", label: "Hours" },
  { value: "36", label: "Mins" },
  { value: "09", label: "Secs" },
];

export default function SpecialOffer() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-[#1a4731] to-[#2a7d4f] rounded-3xl overflow-hidden text-white"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&h=600&fit=crop&auto=format)",
            }}
          />
          <div className="relative px-8 py-12 md:px-16 md:py-16 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-body font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                <Timer className="w-3.5 h-3.5" />
                Weekend Sale
              </div>
              <h2 className="font-display text-3xl md:text-5xl leading-tight mb-3">
                Weekend Grocery Sale
              </h2>
              <p className="text-white/70 font-body mb-8 max-w-sm">
                Save up to 40% on selected products this weekend. Fresh produce, dairy, pantry
                essentials — stocked up for the week ahead.
              </p>
              <Link
                to="/offers"
                className="inline-flex items-center gap-2 bg-amber-400 text-gray-900 px-7 py-3.5 rounded-xl font-body font-semibold hover:bg-amber-300 transition-colors"
              >
                Explore Deals
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div>
              <p className="text-white/60 font-body text-sm mb-4 text-center">Sale ends in:</p>
              <div className="flex justify-center gap-4">
                {timeBlocks.map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl w-16 h-16 flex items-center justify-center mb-2">
                      <span className="font-display text-2xl text-white">{value}</span>
                    </div>
                    <p className="text-white/60 text-xs font-body uppercase tracking-wide">{label}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-white/40 text-xs font-body mt-5">
                * Display only — for illustration purposes
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
