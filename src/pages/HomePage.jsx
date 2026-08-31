import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useShop } from "../context/ShopContext";
import { BRANDS } from "../data/products";
import HeadphoneCanvas3D from "../components/HeadphoneCanvas3D";
import { 
  ArrowRight, ShieldCheck, Truck, RotateCcw, 
  Headphones, Sparkles, Volume2, Cpu, Zap, 
  Play, Pause, Activity, Move3d
} from "lucide-react";

export default function HomePage({ setRoute, onSelectProduct }) {
  const { products } = useShop();
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Selected Model
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const activeProduct = products[activeHeroIndex] || products[0];

  const [isPlayingBass, setIsPlayingBass] = useState(false);
  const audioContextRef = useRef(null);
  const oscRef = useRef(null);

  // Model Colors for Real 3D Renderer
  const brandColors = {
    Apple: "#383b47",
    Sony: "#b4b8c5",
    boAt: "#0284c7",
    Boult: "#1e293b",
    Noise: "#10b981",
    realme: "#d97706",
    Motorola: "#475569",
    Poco: "#eab308",
    JBL: "#0ea5e9",
    Sennheiser: "#18181b",
  };

  const current3DColor = brandColors[activeProduct.brand] || "#383b47";

  // Switch Brand with GSAP micro-animation
  const switchProduct = (index) => {
    if (index === activeHeroIndex) return;
    setActiveHeroIndex(index);

    gsap.fromTo(
      ".spec-anim", 
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.05 }
    );
  };

  // Particle Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha * 0.6})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#8b5cf6";
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Web Audio Sub-Bass Generator
  const handleToggleSound = () => {
    if (isPlayingBass) {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
      }
      setIsPlayingBass(false);
    } else {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = audioContextRef.current || new AudioContext();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(55, ctx.currentTime);
      gain.gain.setValueAtTime(0.09, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      oscRef.current = osc;
      setIsPlayingBass(true);
    }
  };

  useEffect(() => {
    return () => {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".brand-track", {
        xPercent: -50,
        repeat: -1,
        duration: 22,
        ease: "none",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="space-y-28 pb-24 overflow-hidden bg-[#07080b] relative">
      
      {/* Background Particles & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-[20%] right-[-5%] w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1f293720_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
      </div>

      {/* ================= 1. REAL 3D HERO STAGE ================= */}
      <section className="relative pt-10 pb-16 border-b border-zinc-900/80 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-purple-500/30 text-[11px] font-bold text-zinc-200 tracking-widest uppercase backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> {activeProduct.brand} Interactive 3D Model
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.05] uppercase">
              {activeProduct.name.split(" ")[0]} <br />
              <span className="bg-gradient-to-r from-purple-400 via-zinc-100 to-cyan-400 bg-clip-text text-transparent">
                {activeProduct.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <p className="spec-anim text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
              {activeProduct.tagline}
            </p>

            {/* Price & Technical Specs */}
            <div className="spec-anim flex flex-wrap items-center gap-4 text-sm text-zinc-300">
              <div className="bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-2xl shadow-md">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">Direct Price</span>
                <span className="text-xl font-black text-white">₹{Number(activeProduct.price).toLocaleString("en-IN")}</span>
              </div>
              <div className="bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-2xl shadow-md">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">Driver Spec</span>
                <span className="text-sm font-bold text-cyan-400">{activeProduct.specs.driver}</span>
              </div>
              <div className="bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-2xl shadow-md">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">Battery Life</span>
                <span className="text-sm font-bold text-purple-400">{activeProduct.specs.battery}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => { onSelectProduct(activeProduct); setRoute("product-detail"); }}
                className="bg-zinc-100 hover:bg-white text-zinc-950 font-extrabold px-8 py-3.5 rounded-full text-xs uppercase tracking-widest flex items-center gap-2.5 shadow-[0_0_35px_rgba(255,255,255,0.25)] transition-all hover:scale-105 active:scale-95"
              >
                Inspect {activeProduct.brand} <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleToggleSound}
                className={`px-6 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold border transition-all flex items-center gap-2.5 backdrop-blur-md ${
                  isPlayingBass
                    ? "bg-purple-600/25 border-purple-400 text-purple-300 shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-pulse"
                    : "bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                {isPlayingBass ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlayingBass ? "Stop 55Hz Pulse" : "Audit 55Hz Sub-Bass"}
              </button>
            </div>

            {/* Model Switcher */}
            <div className="pt-4 border-t border-zinc-900/80">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-2.5">
                Select 3D Brand Model:
              </span>
              <div className="flex flex-wrap gap-2">
                {products.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => switchProduct(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeHeroIndex === idx
                        ? "bg-white text-zinc-950 shadow-lg scale-105"
                        : "bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
                    }`}
                  >
                    {item.brand}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Real 3D Headphone Canvas */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative select-none">
            {/* Glowing 3D Pedestal Platform */}
            <div className="absolute bottom-4 w-72 h-16 bg-gradient-to-t from-purple-600/30 to-transparent rounded-[100%] border border-purple-500/40 blur-[2px] shadow-[0_0_60px_rgba(168,85,247,0.4)] pointer-events-none" />

            {/* Floating 3D Drag Guide Badge */}
            <div className="absolute top-2 right-4 bg-zinc-900/90 border border-cyan-500/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xl z-20 pointer-events-none">
              <Move3d className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-200">
                Drag to Rotate 360°
              </span>
            </div>

            {/* Real Three.js Canvas */}
            <HeadphoneCanvas3D 
              color={current3DColor} 
              isSpinning={isPlayingBass} 
            />

            {/* Soundwave Equalizer Indicator */}
            <div className="flex items-center gap-2.5 mt-2 px-5 py-2.5 bg-zinc-950/90 border border-zinc-800/90 rounded-2xl backdrop-blur-md z-10 shadow-2xl">
              <Volume2 className="w-4 h-4 text-purple-400" />
              <div className="flex items-end gap-1.5 h-5">
                {[40, 80, 25, 95, 55, 100, 45, 70, 85, 35].map((height, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlayingBass ? "bg-gradient-to-t from-purple-500 to-cyan-400 animate-pulse" : "bg-zinc-700"
                    }`}
                    style={{ height: isPlayingBass ? `${height}%` : "30%" }}
                  />
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-wider font-black text-zinc-400 ml-2">
                {isPlayingBass ? "Sub-Woofer Active (55Hz)" : "3D Spatial Engine Ready"}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Infinite Brands Marquee */}
      <section className="py-4 border-y border-zinc-900 bg-[#090a10]/60 overflow-hidden relative z-10 backdrop-blur-sm">
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#07080b] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#07080b] to-transparent z-10 pointer-events-none" />

        <div className="brand-track flex items-center gap-20 whitespace-nowrap min-w-max">
          {[...BRANDS, ...BRANDS].map((brand, idx) => (
            <span
              key={`${brand}-${idx}`}
              onClick={() => setRoute("shop")}
              className="text-sm font-black uppercase tracking-[0.25em] text-zinc-500 hover:text-white transition-colors cursor-pointer"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* Bento Engineering Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 relative z-10">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Hardware Architecture</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider mt-1">
            Engineered Without Compromise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-gradient-to-br from-zinc-900/60 to-[#0c0d14] border border-zinc-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-xl hover:border-zinc-700 transition-all">
            <div className="max-w-md z-10 space-y-3">
              <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-md">
                Transducer Matrix
              </span>
              <h3 className="text-2xl font-black text-white uppercase">40mm Custom Carbon Diaphragms</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Minimizes harmonic distortion across the entire audible frequency spectrum. Delivers deep, punchy sub-bass without muddying mid-range vocals.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-zinc-400 border-t border-zinc-800/80 pt-6">
              <div><strong className="text-white text-lg block">0.02%</strong> THD Distortion</div>
              <div><strong className="text-white text-lg block">4Hz - 48kHz</strong> Extended Range</div>
              <div><strong className="text-white text-lg block">LDAC 990kbps</strong> Hi-Res Certified</div>
            </div>
          </div>

          <div className="md:col-span-4 bg-[#0c0d14] border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between shadow-xl hover:border-zinc-700 transition-all">
            <div className="space-y-3">
              <Cpu className="w-8 h-8 text-cyan-400" />
              <h3 className="text-lg font-bold text-white uppercase">Dual Acoustic Processors</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Over 700,000 real-time noise cancellations per second, adapting dynamically to ear cushion seal and ambient air pressure.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
              <span className="text-zinc-500">Latency Profile</span>
              <span className="text-emerald-400 font-bold">Ultra-low 28ms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, title: "Same-Day Dispatch", desc: "Express air transit nationwide in India" },
            { icon: ShieldCheck, title: "2-Year Warranty", desc: "100% Brand authorized replacement" },
            { icon: RotateCcw, title: "7-Day Studio Trial", desc: "100% money back evaluation" },
            { icon: Headphones, title: "Acoustic Support", desc: "Direct hardware engineer line" },
          ].map((item, idx) => (
            <div key={idx} className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-5 flex items-center gap-3.5">
              <item.icon className="w-5 h-5 text-zinc-300 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-zinc-100">{item.title}</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}