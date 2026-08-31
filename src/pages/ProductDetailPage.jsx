import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Star, ShieldCheck, Truck, RotateCcw, ShoppingBag, Heart, ArrowLeft } from "lucide-react";

export default function ProductDetailPage({ product, onBack }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);

  const wishlisted = isWishlisted(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="h-96 sm:h-[480px] bg-zinc-950 border border-zinc-900 rounded-3xl p-8 flex items-center justify-center">
            <img src={selectedImage} alt={product.name} className="max-h-80 object-contain drop-shadow-2xl" />
          </div>
          <div className="flex gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-2xl border p-2 bg-zinc-950 transition-all ${
                  selectedImage === img ? "border-zinc-200" : "border-zinc-900 opacity-60"
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Purchase Configuration */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">{product.brand}</span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Star className="w-4 h-4 fill-zinc-200 text-zinc-200" />
              <span className="text-xs font-bold text-zinc-200">{product.rating}</span>
              <span className="text-xs text-zinc-500">({product.reviewsCount} customer audits)</span>
            </div>
          </div>

          <div className="text-2xl font-extrabold text-white">
            ${product.price.toFixed(2)}
            {product.originalPrice && (
              <span className="text-sm font-normal text-zinc-500 line-through ml-3">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">{product.tagline}</p>

          {/* Color Variants */}
          <div>
            <label className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold block mb-2">Acoustic Finish</label>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-7 h-7 rounded-full border-2 transition-transform ${
                    selectedColor === c ? "border-white scale-110" : "border-zinc-800"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => addToCart(product, selectedColor, qty)}
              className="flex-1 bg-zinc-100 hover:bg-white text-zinc-950 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className="p-3.5 rounded-xl border border-zinc-800 hover:border-zinc-600 text-zinc-300 transition-colors"
            >
              <Heart className={`w-4 h-4 ${wishlisted ? "fill-white text-white" : ""}`} />
            </button>
          </div>

          {/* Technical Specs Table */}
          <div className="border-t border-zinc-900 pt-6 space-y-2">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-3">Acoustic Specifications</h4>
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex justify-between text-xs py-1 border-b border-zinc-900/60">
                <span className="text-zinc-500 capitalize">{key}</span>
                <span className="text-zinc-200 font-medium">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}