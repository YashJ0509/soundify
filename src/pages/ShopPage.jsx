import React, { useState, useMemo, useEffect, useRef } from "react";
import gsap from "gsap";
import { useShop } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { CATEGORIES, BRANDS } from "../data/products";
import { SlidersHorizontal, ArrowUpDown, Sparkles, Layers, Search, RefreshCw } from "lucide-react";

export default function ShopPage({ onSelectProduct }) {
  const { products } = useShop();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(70000);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedBrand, sortBy, maxPrice, searchQuery]);

  const filtered = useMemo(() => {
    return products
      .filter((p) => (selectedCategory === "all" ? true : p.category === selectedCategory))
      .filter((p) => (selectedBrand === "all" ? true : p.brand === selectedBrand))
      .filter((p) => p.price <= maxPrice)
      .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [products, selectedCategory, selectedBrand, maxPrice, searchQuery, sortBy]);

  useEffect(() => {
    if (isLoading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".shop-header-anim",
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(
        ".product-card-item",
        { y: 25, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading, filtered]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("all");
    setMaxPrice(70000);
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative min-h-screen font-sans">
      
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-96 right-10 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="shop-header-anim flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/80 pb-6 relative z-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-purple-500/30 text-[10px] font-extrabold text-purple-400 tracking-widest uppercase shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-3 h-3 text-purple-400" /> Acoustic Vault 2026 Edition
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-heading">
            Precision <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">Collection</span>
          </h1>
          <p className="text-xs text-zinc-400 uppercase tracking-widest">
            Studio Monitors, Beryllium Transducers & Flagship ANC Hardware
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search studio models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-purple-500 transition-colors shadow-inner"
            />
          </div>

          <div className="flex items-center gap-2 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl px-4 py-2.5 backdrop-blur-md">
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-zinc-300 font-bold">
              <strong className="text-white">{filtered.length}</strong> Systems
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-start">
        
        <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-28">
          <div className="bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-2xl rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs uppercase tracking-widest font-black text-white font-heading">
                  Filters
                </h3>
              </div>
              <button
                onClick={resetFilters}
                className="text-[10px] text-zinc-500 hover:text-purple-400 flex items-center gap-1 font-bold uppercase transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-extrabold block">
                Category
              </label>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      selectedCategory === cat.id
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.35)]"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-extrabold block">
                Brand Matrix
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-3.5 py-3 text-xs text-zinc-200 focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
              >
                <option value="all">All Brands (Apple, Sony, boAt...)</option>
                {BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3 pt-2 border-t border-zinc-900">
              <div className="flex justify-between text-xs text-zinc-400">
                <span className="text-[10px] uppercase font-bold text-zinc-500">Max Budget</span>
                <span className="font-black text-fuchsia-400">₹{maxPrice.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="70000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-fuchsia-500 cursor-pointer h-1.5 bg-zinc-900 rounded-lg"
              />
            </div>
          </div>
        </aside>

        <section className="lg:col-span-9 space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4 bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-2xl rounded-2xl p-4 shadow-xl">
            <span className="text-xs text-zinc-400">
              Express Air Transit Ready • <strong className="text-emerald-400">In Stock</strong>
            </span>
            <div className="flex items-center gap-2.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-purple-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs font-bold text-zinc-200 focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="featured">Curated / Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated Systems</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <ProductSkeleton key={n} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-28 border border-zinc-800/80 rounded-3xl bg-zinc-950/60 backdrop-blur-md space-y-4">
              <Layers className="w-12 h-12 text-zinc-700 mx-auto opacity-50" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300 font-heading">
                No matching acoustic hardware found
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Try adjusting your budget slider or clearing specific brand/category filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 inline-flex items-center gap-2 bg-zinc-100 text-zinc-950 text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-white transition-all shadow-lg"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <div key={product.id} className="product-card-item">
                  <ProductCard product={product} onSelect={onSelectProduct} />
                </div>
              ))}
            </div>
          )}

        </section>

      </div>
    </div>
  );
}