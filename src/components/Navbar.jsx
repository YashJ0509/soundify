import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, Headphones } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onOpenCart, onOpenWishlist }) {
  const { cart, wishlist } = useShop();
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Collection" },
    { path: "/about", label: "About" },
    { path: "/account", label: "Account" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#07080b]/80 backdrop-blur-xl border-b border-zinc-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] group-hover:scale-105 transition-transform">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-black tracking-wider text-white uppercase block leading-none font-heading">
              SOUND<span className="text-purple-400">IFY</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">
              Studio Acoustics
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition-colors hover:text-white ${
                location.pathname === item.path ? "text-purple-400 font-black" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenWishlist}
            className="relative p-2.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          <Link
            to="/account"
            className="flex items-center gap-2 p-1.5 pl-2.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <span className="text-xs font-bold text-zinc-200 hidden sm:inline max-w-[90px] truncate">
              {user?.name || "Account"}
            </span>
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"} 
              alt="Profile" 
              className="w-7 h-7 rounded-xl object-cover border border-zinc-700"
            />
          </Link>
        </div>

      </div>
    </header>
  );
}