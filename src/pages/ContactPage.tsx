import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Clock, CheckCircle, Send } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-[#f8f8f4]">
      <PageHero
        title="Contact Us"
        subtitle="Have a question or feedback? We'd love to hear from you."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Left: contact info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <h3 className="font-display text-xl text-gray-900 mb-5">Get in Touch</h3>
              <div className="space-y-5">
                {[
                  { icon: Mail, label: "Email", value: "hello@linastore.com" },
                  { icon: Phone, label: "Phone", value: "+1 (555) 234-5678" },
                  { icon: MapPin, label: "Address", value: "123 Fresh Lane, Garden District, NY 10001" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-[#e8f5ee] rounded-xl flex items-center justify-center text-[#2a7d4f] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-body uppercase tracking-wide mb-0.5">{label}</p>
                      <p className="text-gray-900 font-body text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#2a7d4f]" />
                <h3 className="font-display text-lg text-gray-900">Opening Hours</h3>
              </div>
              {[
                { day: "Monday – Friday", hours: "8:00 am – 9:00 pm" },
                { day: "Saturday", hours: "8:00 am – 8:00 pm" },
                { day: "Sunday", hours: "10:00 am – 6:00 pm" },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between text-sm font-body text-gray-600 py-2 border-b border-gray-50 last:border-0">
                  <span>{day}</span>
                  <span className="font-medium text-gray-900">{hours}</span>
                </div>
              ))}
            </div>

            {/* Map style visual */}
            <div className="bg-[#e8f5ee] rounded-2xl overflow-hidden h-48 flex items-center justify-center border border-[#2a7d4f]/10">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-[#2a7d4f] mx-auto mb-2" />
                <p className="font-body text-[#2a7d4f] font-medium text-sm">Garden District, NY</p>
                <p className="font-body text-[#2a7d4f]/60 text-xs">123 Fresh Lane</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h3 className="font-display text-xl text-gray-900 mb-6">Send a Message</h3>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-[#e8f5ee] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[#2a7d4f]" />
                  </div>
                  <h4 className="font-display text-2xl text-gray-900 mb-2">Message Sent!</h4>
                  <p className="text-gray-500 font-body text-sm">
                    We'll get back to you within 24 hours. Thank you for reaching out.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { name: "name", label: "Your Name", type: "text", placeholder: "Sarah Ahmed" },
                      { name: "email", label: "Your Email", type: "email", placeholder: "sarah@email.com" },
                    ].map(({ name, label, type, placeholder }) => (
                      <div key={name}>
                        <label className="block text-xs font-body font-semibold text-gray-700 uppercase tracking-wide mb-1.5">{label}</label>
                        <input
                          type={type}
                          name={name}
                          value={(form as Record<string, string>)[name]}
                          onChange={handleChange}
                          placeholder={placeholder}
                          required
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#2a7d4f] focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-body font-semibold text-gray-700 uppercase tracking-wide mb-1.5">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Order enquiry / Product question / Feedback"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#2a7d4f] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body font-semibold text-gray-700 uppercase tracking-wide mb-1.5">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      required
                      rows={6}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-[#2a7d4f] focus:border-transparent resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 bg-[#2a7d4f] text-white py-3.5 rounded-xl font-body font-medium hover:bg-[#1e5c39] transition-colors shadow-md shadow-[#2a7d4f]/25"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
