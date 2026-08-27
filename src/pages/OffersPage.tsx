import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Tag, Clock, ArrowRight } from "lucide-react";
import { offers } from "@/data/offers";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import PageHero from "@/components/shared/PageHero";

const tabs = [
  { id: "all", label: "All Deals" },
  { id: "today", label: "Today's Deals" },
  { id: "weekly", label: "Weekly Deals" },
  { id: "bogo", label: "Buy 1 Get 1" },
  { id: "seasonal", label: "Seasonal" },
] as const;

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState<"all" | "today" | "weekly" | "bogo" | "seasonal">("all");

  const discountedProducts = products.filter((p) => p.oldPrice);
  const filteredOffers = activeTab === "all" ? offers : offers.filter((o) => o.type === activeTab);

  return (
    <div className="min-h-screen bg-[#f8f8f4]">
      <PageHero
        title="Fresh Deals Every Day"
        subtitle="Handpicked savings on the freshest groceries. New deals added daily."
        breadcrumbs={[{ label: "Offers" }]}
        image="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop&auto=format"
      />

      {/* Hero offer banner */}
      <div className="bg-amber-400 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-3 text-gray-900">
          <Tag className="w-4 h-4" />
          <p className="font-body font-semibold text-sm">
            Weekend Sale — Up to 40% OFF selected groceries!
          </p>
          <Clock className="w-4 h-4 ml-2" />
          <span className="font-body text-sm font-medium">Ends Sunday</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tabs */}
        <div className="flex gap-3 flex-wrap mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-body text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-[#2a7d4f] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#2a7d4f] hover:text-[#2a7d4f]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Offer cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {filteredOffers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="relative rounded-2xl overflow-hidden bg-gray-900 text-white"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative p-8">
                <span className="inline-block bg-amber-400 text-gray-900 text-xs font-body font-semibold px-3 py-1 rounded-full mb-4">
                  {offer.badge}
                </span>
                <h3 className="font-display text-2xl mb-2">{offer.title}</h3>
                <p className="text-white/70 font-body text-sm mb-4">{offer.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-4xl text-amber-400">{offer.discount}</p>
                    <p className="text-white/50 text-xs font-body mt-1">{offer.validUntil}</p>
                  </div>
                  <Link
                    to="/shop"
                    className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-xl font-body text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Shop Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* On-sale products */}
        <div>
          <h2 className="font-display text-2xl md:text-3xl text-gray-900 mb-6">
            Products on Sale
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {discountedProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
