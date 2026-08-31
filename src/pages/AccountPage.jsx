import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Package, Heart, MapPin, Settings, ShieldCheck, Headphones } from "lucide-react";

export default function AccountPage() {
  const { wishlist, cart } = useShop();
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen bg-[#07080b] text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* User Profile Header Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-purple-950/30 border border-zinc-800 p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-1 shadow-lg shadow-purple-900/40">
              <div className="w-full h-full bg-[#0b0c12] rounded-[14px] flex items-center justify-center text-2xl font-black font-heading text-white">
                U
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black font-heading tracking-wide text-white">
                  My Account
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> VIP Member
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400">Welcome back to your studio dashboard</p>
            </div>
          </div>
        </div>

        {/* Account Quick Navigation Tabs - Responsive Grid Fix */}
        <div className="grid grid-cols-2 gap-3 w-full">
          
          {/* Orders Button */}
          <button 
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all shadow-lg text-left ${activeTab === "orders" ? 'bg-purple-600/10 border-purple-500/50 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'}`}
          >
            <div className="p-2 rounded-xl bg-purple-600/10 text-purple-400 shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-bold truncate">Activity</span>
              <span className="text-xs font-extrabold font-heading truncate block">Orders (1)</span>
            </div>
          </button>

          {/* Wishlist Button */}
          <button 
            onClick={() => setActiveTab("wishlist")}
            className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all shadow-lg text-left ${activeTab === "wishlist" ? 'bg-red-600/10 border-red-500/50 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'}`}
          >
            <div className="p-2 rounded-xl bg-red-600/10 text-red-400 shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-bold truncate">Saved</span>
              <span className="text-xs font-extrabold font-heading truncate block">Wishlist ({wishlist?.length || 0})</span>
            </div>
          </button>

          {/* Addresses Button */}
          <button 
            onClick={() => setActiveTab("addresses")}
            className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all shadow-lg text-left ${activeTab === "addresses" ? 'bg-cyan-600/10 border-cyan-500/50 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'}`}
          >
            <div className="p-2 rounded-xl bg-cyan-600/10 text-cyan-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-bold truncate">Location</span>
              <span className="text-xs font-extrabold font-heading truncate block">Addresses</span>
            </div>
          </button>

          {/* Settings Button */}
          <button 
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all shadow-lg text-left ${activeTab === "settings" ? 'bg-zinc-800 border-zinc-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'}`}
          >
            <div className="p-2 rounded-xl bg-zinc-800 text-zinc-300 shrink-0">
              <Settings className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 block font-bold truncate">System</span>
              <span className="text-xs font-extrabold font-heading truncate block">Settings</span>
            </div>
          </button>

        </div>

        {/* Tab Content Display Area */}
        <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800/80 p-6 shadow-xl backdrop-blur-md">
          {activeTab === "orders" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Recent Order History</h3>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-400">
                    <Headphones className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Apple AirPods Max Space Gray</h4>
                    <span className="text-xs text-zinc-500">Order ID: #SND-84920 • Delivered</span>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs font-bold text-emerald-400 block">Completed</span>
                  <span className="text-xs text-zinc-400">₹59,900</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Saved Wishlist Items</h3>
              {wishlist?.length === 0 ? (
                <p className="text-xs text-zinc-500 py-6 text-center">Your wishlist is currently empty.</p>
              ) : (
                <div className="space-y-2">
                  {wishlist?.map((item, index) => (
                    <div key={index} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{item.name || item.title}</span>
                      <span className="text-purple-400 font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Saved Delivery Addresses</h3>
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs space-y-1">
                <span className="font-bold text-white block">Primary Shipping Address</span>
                <p className="text-zinc-400">Default Studio Location</p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Account Preferences</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-zinc-300 font-medium">Dark Mode Acoustic Theme</span>
                  <span className="text-purple-400 font-bold">Enabled</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}