import React from "react";
import { X, Star, ShoppingBag } from "lucide-react";
import { useShop } from "../context/ShopContext";
import HeadphoneCanvas3D from "./HeadphoneCanvas3D";

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useShop();

  if (!quickViewProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative bg-[#0b0c12] border border-zinc-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 z-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors z-20"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-6 bg-zinc-950/60 rounded-2xl border border-zinc-900 overflow-hidden relative flex items-center justify-center h-80">
            <div className="absolute top-3 left-3 z-10 bg-zinc-900/90 border border-purple-500/30 px-3 py-1 rounded-full text-[10px] font-bold text-purple-300 uppercase tracking-widest backdrop-blur-md">
              Live 3D Studio Inspection
            </div>
            
            <div className="w-full h-full scale-90">
              <HeadphoneCanvas3D color={quickViewProduct.colors?.[0] || "#383b47"} isSpinning={true} />
            </div>
          </div>

          <div className="md:col-span-6 space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-md">
              {quickViewProduct.badge || quickViewProduct.brand}
            </span>
            <h2 className="text-xl font-black text-white uppercase font-heading tracking-wide">{quickViewProduct.name}</h2>
            
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-zinc-200">{quickViewProduct.rating}</span>
              <span>({quickViewProduct.reviewsCount} reviews)</span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">{quickViewProduct.tagline}</p>

            <div className="flex items-center gap-4 text-xs text-zinc-300 pt-1">
              <div className="bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
                <span className="text-[9px] uppercase font-bold text-zinc-500 block">Battery</span>
                <span className="font-bold text-purple-400">{quickViewProduct.specs?.battery || "30 Hours"}</span>
              </div>
              <div className="bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
                <span className="text-[9px] uppercase font-bold text-zinc-500 block">Driver</span>
                <span className="font-bold text-cyan-400">{quickViewProduct.specs?.driver || "40mm Beryllium"}</span>
              </div>
            </div>

            <div className="text-lg font-black text-white pt-2 font-heading">
              ₹{Number(quickViewProduct.price || 0).toLocaleString("en-IN")}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  addToCart(quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all font-heading"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}