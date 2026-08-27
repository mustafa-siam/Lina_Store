import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Home, ShoppingBag } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#f0faf4] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-8xl mb-6">🥦</div>
          <h1 className="font-display text-4xl text-gray-900 mb-3">Page Not Found</h1>
          <p className="text-gray-500 font-body text-base leading-relaxed mb-8">
            Looks like this page wandered off the shelf. Don't worry — there's still plenty of great
            groceries to discover.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-[#2a7d4f] text-white px-7 py-3.5 rounded-xl font-body font-medium hover:bg-[#1e5c39] transition-colors shadow-md shadow-[#2a7d4f]/25"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-white text-gray-700 px-7 py-3.5 rounded-xl font-body font-medium hover:border-[#2a7d4f] hover:text-[#2a7d4f] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop Now
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
