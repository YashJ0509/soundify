import React from "react";
import { Headphones, ShieldCheck, Zap, Award } from "lucide-react";

export default function AboutPage({ setRoute }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20 relative">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 rounded-full">
          The Soundify Philosophy
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          Engineered for <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Pure Acoustic</span> Perfection
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
          Soundify is an elite audio storefront dedicated to delivering studio-grade acoustic hardware, high-fidelity wireless monitors, and immersive ANC systems for uncompromising audiophiles.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#0b0c12] border border-zinc-800 p-8 rounded-3xl space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Headphones className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white uppercase">Beryllium Drivers</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Every transducer we curate meets strict harmonic distortion limits, ensuring pristine highs and deep punchy sub-bass.
          </p>
        </div>

        <div className="bg-[#0b0c12] border border-zinc-800 p-8 rounded-3xl space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white uppercase">2-Year Authorized Warranty</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Direct brand manufacturer backing with fast replacement transit across India. No questions asked.
          </p>
        </div>

        <div className="bg-[#0b0c12] border border-zinc-800 p-8 rounded-3xl space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white uppercase">Studio Calibrated</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Tested in simulated acoustic chambers to deliver spatial audio accuracy optimized for high-res streaming codecs.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-purple-900/20 via-zinc-900/60 to-indigo-900/20 border border-zinc-800 p-12 rounded-3xl space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">Ready to Upgrade Your Soundstage?</h2>
        <button
          onClick={() => setRoute("shop")}
          className="bg-zinc-100 hover:bg-white text-zinc-950 font-black px-8 py-4 rounded-full text-xs uppercase tracking-widest transition-all shadow-xl"
        >
          Explore Collection
        </button>
      </div>

    </div>
  );
}