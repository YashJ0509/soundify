import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";
import { Package, Heart, MapPin, Settings } from "lucide-react";

export default function AccountPage() {
  const { user } = useAuth();
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const [activeTab, setActiveTab] = useState("orders");

  const orders = [
    {
      id: "SND-333228",
      date: "2026-08-30",
      total: 89890,
      status: "Ordered",
      items: [
        {
          id: 1,
          name: "Apple AirPods Max Space Gray",
          brand: "Apple",
          price: 59900,
          quantity: 1,
          images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800"]
        },
        {
          id: 2,
          name: "Sony WH-1000XM5 Studio ANC",
          brand: "Sony",
          price: 29990,
          quantity: 1,
          images: ["https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800"]
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      
      {/* Profile Header Card */}
      <div className="bg-[#0b0c12] border border-zinc-800/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-5">
          <img 
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"} 
            alt="Profile" 
            className="w-20 h-20 rounded-2xl object-cover border-2 border-purple-500/50 shadow-xl"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white">{user?.name || "Alexander Vancel"}</h1>
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                VERIFIED
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">{user?.email || "alexander.vance@soundify.io"}</p>
            <p className="text-[11px] text-zinc-500 mt-1">742 Studio Sound Boulevard, Suite 100, San Francisco, CA 94107</p>
          </div>
        </div>

        <button className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all">
          Edit Profile
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-4 overflow-x-auto">
        {[
          { id: "orders", label: "Orders", icon: Package, count: orders.length },
          { id: "wishlist", label: "Wishlist", icon: Heart, count: wishlist?.length || 0 },
          { id: "addresses", label: "Addresses", icon: MapPin },
          { id: "settings", label: "Settings", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800/80"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label} {tab.count !== undefined && `(${tab.count})`}
            </button>
          );
        })}
      </div>

      {/* Tab Content: Orders */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-[#0b0c12] border border-zinc-800/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-4">
                <div>
                  <span className="text-xs font-black text-purple-400">{order.id}</span>
                  <p className="text-[11px] text-zinc-500">Placed on {order.date}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 block">Total Paid</span>
                  <span className="text-base font-black text-white">₹{Number(order.total || 0).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Included Products</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order.items?.map((prod, idx) => (
                    <div key={prod.id || idx} className="flex items-center gap-4 bg-zinc-950/60 border border-zinc-900 p-3.5 rounded-2xl">
                      <div className="w-14 h-14 bg-zinc-900 rounded-xl p-1.5 flex items-center justify-center shrink-0">
                        <img 
                          src={prod.images?.[0] || "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400"} 
                          alt={prod.name} 
                          className="max-h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] uppercase font-bold text-zinc-500 block">{prod.brand}</span>
                        <h4 className="text-xs font-bold text-zinc-200 truncate">{prod.name}</h4>
                        <div className="text-xs font-black text-white mt-0.5">
                          ₹{Number(prod.price || 0).toLocaleString("en-IN")} <span className="text-[10px] text-zinc-500 font-normal">({prod.quantity}x)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Wishlist */}
      {activeTab === "wishlist" && (
        <div>
          {!wishlist || wishlist.length === 0 ? (
            <div className="text-center py-20 bg-[#0b0c12] border border-zinc-800 rounded-3xl">
              <Heart className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Your wishlist is empty</h3>
              <p className="text-xs text-zinc-500 mt-1">Save your favorite studio hardware items here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item, index) => {
                const validPrice = Number(item?.price || item?.originalPrice || 2999);
                const validImage = item?.images?.[0] || item?.image || "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400";
                const cardKey = item?.id || `wishlist-item-${index}`;

                return (
                  <div key={cardKey} className="bg-[#0b0c12] border border-zinc-800 rounded-3xl p-5 flex flex-col justify-between">
                    <div className="h-44 flex items-center justify-center relative my-2">
                      <img 
                        src={validImage} 
                        alt={item?.name || "Product"} 
                        className="max-h-36 object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400";
                        }}
                      />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider block">{item?.brand || "Studio Audio"}</span>
                      <h4 className="text-xs font-bold text-white truncate">{item?.name || "Flagship Acoustic"}</h4>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-900">
                        <span className="text-sm font-black text-white">
                          ₹{validPrice.toLocaleString("en-IN")}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleWishlist(item)}
                            className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-red-400 border border-zinc-800"
                            title="Remove"
                          >
                            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                          </button>
                          <button
                            onClick={() => addToCart(item)}
                            className="px-3.5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold uppercase shadow-md"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Addresses & Settings */}
      {activeTab === "addresses" && (
        <div className="bg-[#0b0c12] border border-zinc-800 rounded-3xl p-6 text-xs text-zinc-400">
          <p className="font-bold text-white mb-2">Primary Shipping Address</p>
          <p>742 Studio Sound Boulevard, Suite 100, San Francisco, CA 94107</p>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-[#0b0c12] border border-zinc-800 rounded-3xl p-6 space-y-4 text-xs">
          <p className="font-bold text-white">Account Preferences</p>
          <div className="flex items-center justify-between py-2 border-t border-zinc-900">
            <span>Two-Factor Authentication</span>
            <span className="text-emerald-400 font-bold">Enabled</span>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-zinc-900">
            <span>Email Acoustic Bulletins</span>
            <span className="text-purple-400 font-bold">Subscribed</span>
          </div>
        </div>
      )}

    </div>
  );
}