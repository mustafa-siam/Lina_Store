import { useState } from "react";
import { motion } from "motion/react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  }

  return (
    <section className="py-16 bg-[#f0faf4]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-14 h-14 bg-[#2a7d4f] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-3">
            Get Fresh Deals in Your Inbox
          </h2>
          <p className="text-gray-500 font-body max-w-lg mx-auto mb-8">
            Subscribe to receive exclusive offers, grocery tips, seasonal recipe ideas, and new
            product updates. Unsubscribe anytime.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 bg-white border border-emerald-200 text-emerald-700 rounded-2xl px-8 py-5 font-body"
            >
              <CheckCircle className="w-6 h-6" />
              <span className="font-medium">You're subscribed! Welcome to the Lina Store family.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-white border border-gray-200 rounded-xl px-5 py-3.5 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#2a7d4f] focus:border-transparent"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#2a7d4f] text-white px-6 py-3.5 rounded-xl font-body font-medium text-sm hover:bg-[#1e5c39] transition-colors whitespace-nowrap"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
          <p className="text-xs text-gray-400 font-body mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
