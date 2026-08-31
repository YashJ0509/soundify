import React from "react";
import { useShop } from "../context/ShopContext";
import { X, Heart, Trash2, ShoppingBag } from "lucide-react";

export default function WishlistDrawer({ isOpen, onClose }) {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0b0c12] border-l border-zinc-800 text-white flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
          
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h2 className="text-sm font-black uppercase tracking-widest text-zinc-100 font-heading">
                Saved Hardware ({wishlist?.length || 0})
              </h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close Wishlist"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-zinc-900">
            {!wishlist || wishlist.length === 0 ? (
              <div className="text-center py-24 space-y-3">
                <Heart className="w-12 h-12 text-zinc-700 mx-auto opacity-40" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Your wishlist is empty</h3>
                <p className="text-xs text-zinc-600">Save your favorite studio hardware items here.</p>
              </div>
            ) : (
              wishlist.map((item, index) => {
                const validPrice = Number(item?.price || item?.originalPrice || 2999);
                const validImage = item?.images?.[0] || item?.image || "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400";
                const itemKey = item?.id || `wishlist-${index}`;

                return (
                  <div key={itemKey} className="pt-4 first:pt-0 flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 p-2 flex items-center justify-center shrink-0">
                      <img 
                        src={validImage} 
                        alt={item?.name || "Product"} 
                        className="max-h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400";
                        }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider block">
                        {item?.brand || "Studio Audio"}
                      </span>
                      <h4 className="text-xs font-bold text-zinc-200 truncate font-heading">
                        {item?.name || "Flagship Acoustic"}
                      </h4>
                      <div className="text-xs font-black text-white mt-1 font-heading">
                        ₹{validPrice.toLocaleString("en-IN")}
                      </div>

                      <div className="flex items-center gap-3 mt-2.5">
                        <button
                          onClick={() => {
                            addToCart(item);
                            toggleWishlist(item);
                          }}
                          className="text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 px-3 py-1.5 rounded-lg text-white shadow-md transition-all flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" /> Move to Cart
                        </button>
                        
                        <button 
                          onClick={() => toggleWishlist(item)} 
                          className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>
    </div>
  );
}