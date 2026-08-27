import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { CalendarCheck, BadgeDollarSign, Clock3, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: CalendarCheck,
    title: "Fresh Every Day",
    description:
      "Our team sources new stock every morning from trusted local farmers and suppliers. If we wouldn't eat it ourselves, we won't sell it.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: BadgeDollarSign,
    title: "Fair Prices",
    description:
      "We work directly with producers to cut out the middlemen, passing the savings directly to you. Great quality at prices that make sense.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Clock3,
    title: "Reliable Delivery",
    description:
      "Order before 2pm for same-day delivery. We're punctual because your meals depend on it.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: ShieldCheck,
    title: "Quality You Can Trust",
    description:
      "Every product is inspected before dispatch. Not satisfied? We'll replace or refund — no questions asked.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 bg-[#f8f8f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            label="Why Lina Store"
            title="More Than a Grocery Store"
            subtitle="We believe grocery shopping should be joyful, not a chore. Here's what makes us different."
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm"
              >
                <div
                  className={`w-12 h-12 ${reason.bg} ${reason.color} rounded-xl flex items-center justify-center mb-5`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-500 font-body text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
