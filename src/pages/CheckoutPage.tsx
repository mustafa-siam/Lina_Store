import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Truck, Zap, CreditCard, Smartphone, Banknote, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import PageHero from "@/components/shared/PageHero";

type DeliveryMethod = "standard" | "express";
type PaymentMethod = "cod" | "card" | "mobile";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [delivery, setDelivery] = useState<DeliveryMethod>("standard");
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const deliveryFee = delivery === "express" ? 7.99 : subtotal >= 40 ? 0 : 3.99;
  const total = subtotal + deliveryFee;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearCart();
    navigate("/order-success");
  }

  return (
    <div className="min-h-screen bg-[#f8f8f4]">
      <PageHero
        title="Checkout"
        subtitle="Almost there — complete your delivery details below."
        breadcrumbs={[{ label: "Cart", to: "/cart" }, { label: "Checkout" }]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-8">
          {/* Left form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Delivery Info */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <h2 className="font-display text-xl text-gray-900 mb-5">Delivery Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "fullName", label: "Full Name", type: "text", placeholder: "Sarah Ahmed" },
                  { name: "email", label: "Email", type: "email", placeholder: "sarah@email.com" },
                  { name: "phone", label: "Phone", type: "tel", placeholder: "+1 555 234 5678" },
                  { name: "address", label: "Street Address", type: "text", placeholder: "123 Fresh Lane" },
                  { name: "city", label: "City", type: "text", placeholder: "New York" },
                  { name: "postalCode", label: "Postal Code", type: "text", placeholder: "10001" },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name} className={name === "address" ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-body font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">
                      {label}
                    </label>
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
            </section>

            {/* Delivery method */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <h2 className="font-display text-xl text-gray-900 mb-5">Delivery Method</h2>
              <div className="space-y-3">
                {[
                  {
                    id: "standard" as DeliveryMethod,
                    icon: Truck,
                    label: "Standard Delivery",
                    sub: "2-3 business days",
                    price: subtotal >= 40 ? "FREE" : "$3.99",
                  },
                  {
                    id: "express" as DeliveryMethod,
                    icon: Zap,
                    label: "Express Delivery",
                    sub: "Same day (order before 2pm)",
                    price: "$7.99",
                  },
                ].map(({ id, icon: Icon, label, sub, price }) => (
                  <label
                    key={id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      delivery === id
                        ? "border-[#2a7d4f] bg-[#f0faf4]"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={id}
                      checked={delivery === id}
                      onChange={() => setDelivery(id)}
                      className="sr-only"
                    />
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${delivery === id ? "bg-[#2a7d4f] text-white" : "bg-gray-100 text-gray-500"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-body font-semibold text-gray-900 text-sm">{label}</p>
                      <p className="text-gray-500 text-xs font-body">{sub}</p>
                    </div>
                    <p className="font-body font-bold text-gray-900 text-sm">{price}</p>
                  </label>
                ))}
              </div>
            </section>

            {/* Payment method */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
              <h2 className="font-display text-xl text-gray-900 mb-5">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { id: "cod" as PaymentMethod, icon: Banknote, label: "Cash on Delivery", sub: "Pay when your order arrives" },
                  { id: "card" as PaymentMethod, icon: CreditCard, label: "Credit / Debit Card", sub: "Visa, Mastercard, Amex" },
                  { id: "mobile" as PaymentMethod, icon: Smartphone, label: "Mobile Payment", sub: "Apple Pay, Google Pay" },
                ].map(({ id, icon: Icon, label, sub }) => (
                  <label
                    key={id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      payment === id ? "border-[#2a7d4f] bg-[#f0faf4]" : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={id}
                      checked={payment === id}
                      onChange={() => setPayment(id)}
                      className="sr-only"
                    />
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${payment === id ? "bg-[#2a7d4f] text-white" : "bg-gray-100 text-gray-500"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-body font-semibold text-gray-900 text-sm">{label}</p>
                      <p className="text-gray-500 text-xs font-body">{sub}</p>
                    </div>
                    {payment === id && <ChevronRight className="w-4 h-4 text-[#2a7d4f]" />}
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <h2 className="font-display text-xl text-gray-900 mb-5">Order Summary</h2>

              <div className="space-y-3 mb-5 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover bg-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-medium text-gray-900 text-xs line-clamp-1">{item.product.name}</p>
                      <p className="text-gray-400 text-xs font-body">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-body font-semibold text-gray-900 text-sm shrink-0">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 border-t border-gray-100 pt-4 mb-5">
                <div className="flex justify-between text-sm font-body text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-body text-gray-600">
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? "text-emerald-600 font-medium" : ""}>
                    {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-body font-bold text-gray-900 border-t border-gray-100 pt-2.5">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#2a7d4f] text-white py-4 rounded-xl font-body font-semibold hover:bg-[#1e5c39] transition-colors shadow-md shadow-[#2a7d4f]/25"
              >
                Place Order — ${total.toFixed(2)}
              </motion.button>

              <p className="text-xs text-gray-400 font-body text-center mt-3">
                By placing your order you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
