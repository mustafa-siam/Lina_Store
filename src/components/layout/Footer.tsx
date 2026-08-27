import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin, Globe, Rss, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#2a7d4f] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white fill-white/30" />
              </div>
              <span className="font-display text-xl text-white">Lina Store</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs font-body">
              Your neighbourhood grocery store, reimagined. Fresh produce, quality pantry staples,
              and everyday essentials delivered with care.
            </p>
            <div className="flex gap-3 mt-6">
              {[Globe, Rss, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#2a7d4f] transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "Shop", to: "/shop" },
                { label: "Categories", to: "/categories" },
                { label: "Offers", to: "/offers" },
                { label: "About", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-white transition-colors font-body"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-body font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Customer Service
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Contact Us", to: "/contact" },
                { label: "Shipping Info", to: "/contact" },
                { label: "Returns Policy", to: "/contact" },
                { label: "FAQ", to: "/contact" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-white transition-colors font-body"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-gray-400 font-body">
                <Mail className="w-4 h-4 mt-0.5 text-[#3a9d65] shrink-0" />
                hello@linastore.com
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-400 font-body">
                <Phone className="w-4 h-4 mt-0.5 text-[#3a9d65] shrink-0" />
                +1 (555) 234-5678
              </li>
              <li className="flex items-start gap-2.5 text-sm text-gray-400 font-body">
                <MapPin className="w-4 h-4 mt-0.5 text-[#3a9d65] shrink-0" />
                123 Fresh Lane, Garden District, NY 10001
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-body">
            © 2026 Lina Store. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 font-body">
            Fresh groceries. Real quality. Every day.
          </p>
        </div>
      </div>
    </footer>
  );
}
