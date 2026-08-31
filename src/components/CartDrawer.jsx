import React from "react";
import { useShop } from "../context/ShopContext";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";

export default function CartDrawer({ isOpen, onClose, setRoute }) {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useShop();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0b0c12] border-l border-zinc-800 text-white flex flex-col shadow-2xl">
          
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-purple-400" />
              <h2 className="text-sm font-black uppercase tracking-widest text-zinc-100">
                Studio Acoustic Cart ({cart.length})
              </h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-zinc-900">
            {cart.length === 0 ? (
              <div className="text-center py-24 space-y-3">
                <ShoppingBag className="w-12 h-12 text-zinc-700 mx-auto opacity-40" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Your Cart is Empty</h3>
                <button
                  onClick={() => {
                    onClose();
                    setRoute("shop");
                  }}
                  className="mt-4 inline-flex items-center gap-2 bg-zinc-100 text-zinc-950 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-white"
                >
                  Explore Shop <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemImg = item.images?.[0] || "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400";
                const itemPrice = Number(item.price) || 0;
                const itemQty = Number(item.quantity) || 1;

                return (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 p-2 flex items-center justify-center shrink-0">
                      <img src={itemImg} alt={item.name} className="max-h-full object-contain" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider block">{item.brand}</span>
                      <h4 className="text-xs font-bold text-zinc-200 truncate">{item.name}</h4>
                      <div className="text-xs font-black text-white mt-1">₹{(itemPrice * itemQty).toLocaleString("en-IN")}</div>

                      <div className="flex items-center gap-2.5 mt-2">
                        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg">
                          <button onClick={() => updateQuantity(item.id, itemQty - 1)} className="p-1 text-zinc-400 hover:text-white">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-2 text-zinc-200">{itemQty}</span>
                          <button onClick={() => updateQuantity(item.id, itemQty + 1)} className="p-1 text-zinc-400 hover:text-white">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button onClick={() => removeFromCart(item.id)} className="text-zinc-600 hover:text-red-400 p-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-800/80 bg-zinc-950/60 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-zinc-200">₹{Number(cartTotal).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Express Transit</span>
                  <span className="text-emerald-400 font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-zinc-800 font-bold text-white">
                  <span>Grand Total</span>
                  <span className="text-base font-black text-purple-400">₹{Number(cartTotal).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  setRoute("checkout");
                }}
                className="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-black py-3.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" /> 256-Bit Encrypted Secure Checkout
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}