import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Leaf, Heart, Users, MapPin, Award, Star } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Products" },
  { value: "20+", label: "Delivery Areas" },
  { value: "4.9", label: "Average Rating" },
];

const values = [
  {
    icon: Leaf,
    title: "Sourced with Care",
    description:
      "Every product is chosen with purpose — from the farmers we partner with to the standards we hold every supplier to. Quality isn't a feature; it's our foundation.",
  },
  {
    icon: Heart,
    title: "Community First",
    description:
      "We're not just a store — we're neighbours. We support local growers, reduce food waste, and invest in the communities we deliver to.",
  },
  {
    icon: Award,
    title: "Uncompromising Freshness",
    description:
      "Our supply chain is designed around one idea: you should get groceries as fresh as if you'd just picked them yourself.",
  },
];

function StatCard({ value, label, i }: { value: string; label: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.5 }}
      className="text-center"
    >
      <p className="font-display text-5xl text-[#2a7d4f] mb-2">{value}</p>
      <p className="text-gray-500 font-body text-sm">{label}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f4]">
      <PageHero
        title="Our Story"
        subtitle="Lina Store was born from a simple belief: everyone deserves access to truly fresh, quality food at honest prices."
        breadcrumbs={[{ label: "About" }]}
        image="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop&auto=format"
      />

      {/* Story section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop&auto=format"
                  alt="Fresh market produce"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-[#2a7d4f] font-body font-semibold text-sm uppercase tracking-widest mb-3">
                How it started
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-5">
                From a Market Stall to Your Doorstep
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-4">
                Lina Store started in 2019 as a small farmers' market stall in New York's Lower East Side.
                Our founder, Lina Mariam, was frustrated by the gap between what was available at local
                farms and what most people could actually access. She believed that quality, fresh food
                shouldn't be a privilege.
              </p>
              <p className="text-gray-600 font-body leading-relaxed">
                What began as a Saturday stall quickly grew into a community institution. Customers kept
                coming back — not just for the produce, but for the experience of being genuinely cared for
                as a customer. In 2022, we launched online delivery to bring that same warmth and quality
                to your home.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#f0faf4]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <StatCard key={s.label} value={s.value} label={s.label} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#2a7d4f] font-body font-semibold text-sm uppercase tracking-widest mb-3">Our Mission</p>
              <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-5">
                Fresh Food for Every Kitchen
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-4">
                Our mission is simple: make it easy, affordable, and joyful for every household to eat
                well. We do this by maintaining direct relationships with farmers and producers, keeping
                our margins honest, and obsessing over freshness.
              </p>
              <p className="text-gray-600 font-body leading-relaxed">
                We believe in radical transparency about where food comes from. Every product page tells
                you its origin, and we only work with suppliers whose practices we'd be proud to show you.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-1 gap-5">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-[#f8f8f4] rounded-2xl p-5 flex gap-4"
                  >
                    <div className="w-10 h-10 bg-[#e8f5ee] rounded-xl flex items-center justify-center text-[#2a7d4f] shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-body font-semibold text-gray-900 mb-1">{v.title}</h3>
                      <p className="text-gray-500 font-body text-sm leading-relaxed">{v.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Promise section */}
      <section className="py-16 bg-[#1a4731] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Star className="w-10 h-10 text-amber-400 mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl mb-4">Our Freshness Promise</h2>
            <p className="text-white/70 font-body text-base leading-relaxed">
              Every order is packed fresh the morning of your delivery. If any item isn't up to your
              standards — or ours — we'll replace it or refund you. No questions, no fuss. That's our
              promise to you, every single order.
            </p>
            <div className="mt-8 flex justify-center gap-8">
              <div className="flex items-center gap-2 text-sm font-body text-white/80">
                <MapPin className="w-4 h-4 text-amber-400" />
                20+ Delivery Areas
              </div>
              <div className="flex items-center gap-2 text-sm font-body text-white/80">
                <Users className="w-4 h-4 text-amber-400" />
                10,000+ Happy Customers
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
