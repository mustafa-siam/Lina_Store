import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { X, Home, ShoppingBag, Grid3X3, Tag, Info, Phone } from "lucide-react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/shop", label: "Shop", icon: ShoppingBag },
  { to: "/categories", label: "Categories", icon: Grid3X3 },
  { to: "/offers", label: "Offers", icon: Tag },
  { to: "/about", label: "About", icon: Info },
  { to: "/contact", label: "Contact", icon: Phone },
];

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { pathname } = useLocation();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 left-0 h-full w-72 bg-white z-[100] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <Link to="/" onClick={onClose} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#2a7d4f] flex items-center justify-center">
                  <span className="text-white font-display text-sm font-bold">L</span>
                </div>
                <span className="font-display text-xl text-gray-900">Lina Store</span>
              </Link>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <div className="space-y-1">
                {navLinks.map(({ to, label, icon: Icon }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
                  >
                    <Link
                      to={to}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body font-medium text-sm transition-colors ${
                        pathname === to
                          ? "bg-[#e8f5ee] text-[#2a7d4f]"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            <div className="px-6 py-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-body text-center">
                © 2026 Lina Store. Fresh & Natural.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
