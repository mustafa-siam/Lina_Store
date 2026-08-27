import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Truck, Leaf, Shield, Heart } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    emoji: "🚚",
    title: "Fast Delivery",
    description: "Today and next-day delivery options. Fresh to your door in hours.",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Leaf,
    emoji: "🥬",
    title: "Fresh Products",
    description: "Every item hand-selected for freshness. If it isn't perfect, we don't sell it.",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Shield,
    emoji: "🔒",
    title: "Secure Shopping",
    description: "Your data is safe with us. Encrypted checkout and trusted payment methods.",
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Heart,
    emoji: "❤️",
    title: "Quality Guaranteed",
    description: "Not happy? We'll replace or refund. Your satisfaction is our promise.",
    bg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
];

function BenefitCard({
  benefit,
  index,
}: {
  benefit: (typeof benefits)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 group cursor-default"
    >
      <div className={`w-12 h-12 ${benefit.bg} rounded-xl flex items-center justify-center mb-5 text-xl group-hover:scale-110 transition-transform duration-200`}>
        {benefit.emoji}
      </div>
      <h3 className="font-display text-xl text-gray-900 mb-2">{benefit.title}</h3>
      <p className="text-gray-500 font-body text-sm leading-relaxed">{benefit.description}</p>
    </motion.div>
  );
}

export default function Benefits() {
  return (
    <section className="py-16 bg-[#f8f8f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <BenefitCard key={b.title} benefit={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
