import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingCart, Menu, X, Leaf } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/offers", label: "Offers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  // Filter top 4 matching products for suggestions
  const suggestions = searchQuery.trim()
    ? products
        .filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
        )
        .slice(0, 4)
    : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShowSuggestions(false);
    setSearchQuery("");
  }, [pathname]);

  // Close desktop suggestion dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setShowSuggestions(false);
      setSearchQuery("");
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`sticky top-0 z-[80] transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3"
            : "bg-white/90 backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-[#2a7d4f] flex items-center justify-center shadow-sm">
                <Leaf className="w-5 h-5 text-white fill-white/30" />
              </div>
              <span className="font-display text-xl text-gray-900">
                Lina Store
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-3.5 py-2 rounded-lg font-body text-sm font-medium transition-colors ${
                    pathname === to
                      ? "bg-[#e8f5ee] text-[#2a7d4f]"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Actions Area */}
            <div className="flex items-center gap-2">
              {/* Desktop Search Input (Positioned right beside Cart) */}
              <div
                ref={desktopSearchRef}
                className="hidden lg:block relative w-56 xl:w-64"
              >
                <form onSubmit={handleSearch} className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search products..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-10 py-2 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#2a7d4f] focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 p-1 text-gray-500 hover:text-[#2a7d4f] transition-colors"
                    aria-label="Submit search"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </form>

                {/* Desktop Suggestions Dropdown */}
                <AnimatePresence>
                  {showSuggestions && searchQuery.trim().length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      {suggestions.length > 0 ? (
                        <div className="py-2">
                          {suggestions.map((item) => (
                            <Link
                              key={item.id}
                              to={`/product/${item.id}`}
                              onClick={() => setShowSuggestions(false)}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                            >
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-8 h-8 object-cover rounded-lg bg-gray-100"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate font-body">
                                  {item.name}
                                </p>
                                {item.price && (
                                  <p className="text-xs text-[#2a7d4f] font-semibold font-body">
                                    ৳{item.price}
                                  </p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-xs text-gray-500 font-body">
                          No products found for "{searchQuery}"
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Search Icon Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Button */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 bg-[#2a7d4f] text-white px-4 py-2 rounded-xl font-body text-sm font-medium hover:bg-[#1e5c39] transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 1.4 }}
                    animate={{ scale: 1 }}
                    className="bg-amber-400 text-gray-900 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors ml-1"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Overlay for Mobile */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24 px-4 lg:hidden"
            onClick={(e) =>
              e.target === e.currentTarget && setSearchOpen(false)
            }
          >
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="font-display text-lg text-gray-900">
                  Search products
                </p>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSearch} className="flex gap-3">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for fresh produce, dairy, snacks..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#2a7d4f] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-[#2a7d4f] text-white px-5 py-3 rounded-xl font-body text-sm font-medium hover:bg-[#1e5c39] transition-colors"
                >
                  Search
                </button>
              </form>

              {/* Mobile Search Suggestions */}
              {searchQuery.trim().length > 0 && (
                <div className="mt-4 max-h-60 overflow-y-auto border-t border-gray-100 pt-2">
                  {suggestions.length > 0 ? (
                    suggestions.map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3 py-2.5 px-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-9 h-9 object-cover rounded-lg bg-gray-100"
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-800 font-body">
                            {item.name}
                          </p>
                          {item.price && (
                            <p className="text-xs text-[#2a7d4f] font-semibold font-body">
                              ৳{item.price}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 font-body py-2">
                      No matching products found.
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}