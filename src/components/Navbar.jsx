import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { ShoppingBag, Heart, User, Menu, X, Headphones, LogIn } from "lucide-react";

export default function Navbar({ onOpenCart, onOpenWishlist }) {
  const { cart, wishlist } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart?.reduce((acc, item) => acc + (item.quantity || 1), 0) || 0;
  const wishlistCount = wishlist?.length || 0;

  return (
    <header className="sticky top-0 z-40 bg-[#07080b]/80 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg shadow-purple-900/30">
            <div className="w-full h-full bg-[#0b0c12] rounded-[10px] flex items-center justify-center">
              <Headphones className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <span className="font-black text-sm tracking-widest text-white uppercase block font-heading">Soundify</span>
            <span className="text-[9px] tracking-widest text-zinc-400 uppercase block">Studio Acoustics</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-300">
          <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-purple-400 transition-colors">Collection</Link>
          <Link to="/about" className="hover:text-purple-400 transition-colors">About</Link>
        </nav>

        {/* Action Icons (Cart, Wishlist, Login & Mobile Hamburger) */}
        <div className="flex items-center gap-3">
          {/* Wishlist Button */}
          <button 
            onClick={onOpenWishlist}
            className="relative p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4 text-red-500" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] font-black text-white flex items-center justify-center shadow-md">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button 
            onClick={onOpenCart}
            className="relative p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4 text-purple-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 text-[9px] font-black text-white flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Desktop Login / Account Button */}
          <Link 
            to="/login"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600/10 border border-purple-500/30 text-purple-400 hover:bg-purple-600/20 text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <LogIn className="w-3.5 h-3.5" /> Login
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#07080b] border-b border-zinc-800 p-5 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 text-sm font-bold uppercase tracking-wider text-zinc-300">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-zinc-900/50 hover:text-purple-400 transition-colors">Home</Link>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-zinc-900/50 hover:text-purple-400 transition-colors">Collection</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-zinc-900/50 hover:text-purple-400 transition-colors">About</Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-purple-600/10 border border-purple-500/30 text-purple-400 flex items-center gap-2">
              <LogIn className="w-4 h-4" /> Studio Login
            </Link>
            <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl bg-zinc-900/50 hover:text-purple-400 transition-colors flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" /> Account Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}