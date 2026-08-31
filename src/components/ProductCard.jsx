import React, { useRef, useState } from "react";
import { useShop } from "../context/ShopContext";
import { Star, Heart, Eye, ShoppingBag, Loader2 } from "lucide-react";

export default function ProductCard({ product, onSelect }) {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } = useShop();
  const cardRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  
  const frames = product?.images && product.images.length > 0 
    ? product.images 
    : [product?.image || "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800"];
  
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  if (!product) return null;

  const wishlisted = isWishlisted(product.id);
  const discountPercent = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleMouseMoveCard = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    if (isDragging && frames.length > 1) {
      const deltaX = e.clientX - startX;
      const sensitivity = 15;
      if (Math.abs(deltaX) > sensitivity) {
        const frameShift = Math.floor(deltaX / sensitivity);
        let newIndex = (currentFrameIndex + frameShift) % frames.length;
        if (newIndex < 0) newIndex = frames.length + 1;
        setCurrentFrameIndex(newIndex);
        setStartX(e.clientX);
      }
    }
  };

  const handleMouseMoveImageArea = (e) => {
    if (frames.length <= 1 || isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const frameIndex = Math.min(
      Math.floor(relX * frames.length),
      frames.length - 1
    );
    setCurrentFrameIndex(frameIndex);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMoveCard}
      className="relative group rounded-3xl bg-[#0b0c12]/90 border border-zinc-800/80 p-5 flex flex-col justify-between transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden select-none font-sans"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(168,85,247,0.1), transparent 80%)`,
        }}
      />

      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-extrabold tracking-widest uppercase bg-zinc-900/90 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full backdrop-blur-md">
            {product.badge || product.brand}
          </span>
          {discountPercent > 0 && (
            <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product)}
          className="p-2.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white transition-transform active:scale-90"
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </div>

      <div
        onClick={() => onSelect(product)}
        onMouseMove={handleMouseMoveImageArea}
        className="h-52 flex items-center justify-center relative cursor-grab active:cursor-grabbing my-3 z-10 overflow-hidden"
      >
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
          </div>
        )}

        <img
          src={frames[currentFrameIndex] || frames[0]}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800";
            setImgLoaded(true);
          }}
          className={`max-h-44 object-contain transition-opacity duration-150 ease-out group-hover:scale-105 drop-shadow-[0_20px_30px_rgba(0,0,0,0.95)] ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute bottom-2 bg-zinc-100 text-zinc-950 text-[11px] font-black tracking-wider uppercase px-4 py-2.5 rounded-xl flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all translate-y-3 group-hover:translate-y-0 shadow-2xl hover:bg-white"
        >
          <Eye className="w-3.5 h-3.5" /> Quick View
        </button>
      </div>

      <div className="z-10 mt-1">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-extrabold block">
          {product.brand}
        </span>
        <h3
          onClick={() => onSelect(product)}
          className="text-sm font-bold text-zinc-100 hover:text-white cursor-pointer truncate mt-0.5 font-heading tracking-wide"
        >
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mt-2 text-xs text-zinc-400">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-zinc-200">{product.rating}</span>
          <span className="text-[11px] text-zinc-500">({product.reviewsCount})</span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-zinc-800/80">
          <div>
            <span className="text-base font-black text-white font-heading">
              ₹{Number(product.price || 0).toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-zinc-500 line-through block font-medium">
                ₹{Number(product.originalPrice).toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(147,51,234,0.4)]"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}