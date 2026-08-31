import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Headphones } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { setToast } = useShop();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setToast({ message: "Please enter a valid email address", type: "wishlist" });
      return;
    }
    setToast({ message: "Subscribed successfully!", type: "cart" });
    setEmail("");
  };

  return (
    <footer className="bg-[#050608] border-t border-zinc-900 pt-16 pb-12 text-zinc-400 text-xs relative z-10 mt-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-zinc-900">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                <Headphones className="w-4 h-4" />
              </div>
              <span className="text-sm font-black text-white tracking-wider uppercase font-heading">SOUNDIFY</span>
            </div>
            <p className="text-zinc-500 max-w-sm leading-relaxed">
              Engineering high-fidelity studio acoustics and precision active noise-cancelling hardware for uncompromising audiophiles.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-widest font-heading">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Home Stage</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Acoustic Collection</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Client Vault</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-widest font-heading">Acoustic Bulletin</h4>
            <p className="text-zinc-500 text-[11px]">Subscribe for limited drop alerts and hardware updates.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 flex-1"
              />
              <button type="submit" className="bg-white text-zinc-950 font-bold px-4 py-2.5 rounded-xl uppercase text-[10px] tracking-wider hover:bg-zinc-200 transition-all">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600">
          <p>© 2026 SOUNDIFY SYSTEMS INC. All acoustic specifications reserved.</p>
          <div className="flex gap-6">
            <Link to="/policy/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
            <Link to="/policy/terms" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
            <Link to="/policy/warranty" className="hover:text-zinc-400 transition-colors">Hardware Warranty</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}