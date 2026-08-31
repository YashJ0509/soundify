import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";
import { Check, ShieldCheck } from "lucide-react";

export default function CheckoutPage({ onOrderComplete }) {
  const { cart, cartSubtotal, clearCart } = useShop();
  const { addOrder } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "Alexander Vance",
    email: "alexander.vance@soundify.io",
    address: "742 Studio Sound Boulevard",
    city: "San Francisco",
    postalCode: "94107",
    paymentMethod: "card"
  });

  const handleSubmitOrder = () => {
    const order = addOrder({
      items: cart,
      total: cartSubtotal,
      shippingAddress: `${formData.address}, ${formData.city} ${formData.postalCode}`
    });
    clearCart();
    onOrderComplete(order);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Stepper Progress */}
      <div className="flex items-center justify-between max-w-sm mx-auto">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= s ? "bg-zinc-100 text-zinc-950" : "bg-zinc-900 text-zinc-600"
              }`}
            >
              {step > s ? <Check className="w-3.5 h-3.5" /> : s}
            </div>
            {s < 3 && <div className="w-10 h-[1px] bg-zinc-800" />}
          </div>
        ))}
      </div>

      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-base uppercase tracking-widest font-bold text-white">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white"
              />
            </div>
            <input
              type="text"
              placeholder="Street Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white"
            />
            <button
              onClick={() => setStep(2)}
              className="w-full bg-zinc-100 text-zinc-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-base uppercase tracking-widest font-bold text-white">Payment Selection</h2>
            <div className="space-y-2">
              {[
                { id: "card", label: "Credit / Debit Card (Universal)" },
                { id: "upi", label: "Direct Instant Transfer / UPI" },
                { id: "cod", label: "Cash on Delivery / Studio Inspection" }
              ].map((m) => (
                <label
                  key={m.id}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer text-xs transition-colors ${
                    formData.paymentMethod === m.id ? "border-zinc-200 bg-zinc-900" : "border-zinc-900 text-zinc-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === m.id}
                    onChange={() => setFormData({ ...formData, paymentMethod: m.id })}
                    className="accent-zinc-100"
                  />
                  {m.label}
                </label>
              ))}
            </div>
            <button
              onClick={() => setStep(3)}
              className="w-full bg-zinc-100 text-zinc-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest"
            >
              Review Verification
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-base uppercase tracking-widest font-bold text-white">Order Review</h2>
            <div className="text-xs space-y-2 text-zinc-400 border-b border-zinc-900 pb-4">
              <div className="flex justify-between"><span>Recipient:</span><span className="text-white">{formData.name}</span></div>
              <div className="flex justify-between"><span>Destination:</span><span className="text-white">{formData.address}</span></div>
              <div className="flex justify-between"><span>Payment Mode:</span><span className="text-white uppercase">{formData.paymentMethod}</span></div>
              <div className="flex justify-between font-bold text-white pt-2"><span>Total Payable:</span><span>${cartSubtotal.toFixed(2)}</span></div>
            </div>
            <button
              onClick={handleSubmitOrder}
              className="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest"
            >
              Authorize Transaction
            </button>
          </div>
        )}
      </div>
    </div>
  );
}