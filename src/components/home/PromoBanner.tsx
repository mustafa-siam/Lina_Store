import { motion } from "motion/react";

export default function PromoBanner() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden shadow-md"
        >
          <img
            src="https://i.ibb.co.com/xqys3GcK/poster2.jpg"
            alt="Special Offer Poster"
            className="w-full h-auto object-cover block"
          />
        </motion.div>
      </div>
    </section>
  );
}