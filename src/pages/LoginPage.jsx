import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Headphones, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication delay for high-end feel
    setTimeout(() => {
      setLoading(false);
      // Successful login redirect to account or home
      navigate("/account");
    }, 1000);
  };

  const handleQuickDemoLogin = () => {
    setEmail("alex.morgan@soundify.studio");
    setPassword("soundify2026");
  };

  return (
    <div className="min-h-screen bg-[#07080b] text-zinc-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        
        {/* Brand Logo & Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-xl shadow-purple-900/40">
              <div className="w-full h-full bg-[#0b0c12] rounded-[14px] flex items-center justify-center">
                <Headphones className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </Link>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-wider uppercase text-white">
              Welcome to <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Soundify</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Enter the portal of high-fidelity studio acoustics
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-zinc-900/80 border border-zinc-800/80 p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Studio Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.morgan@soundify.studio"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#07080b] border border-zinc-800 text-white placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                  Security Passkey
                </label>
                <a href="#" className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot passkey?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#07080b] border border-zinc-800 text-white placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:border-purple-500 transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-extrabold text-xs uppercase tracking-widest hover:opacity-95 transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Option for Testing */}
          <div className="mt-6 pt-6 border-t border-zinc-800/80 text-center">
            <button
              onClick={handleQuickDemoLogin}
              type="button"
              className="text-xs text-zinc-400 hover:text-purple-400 transition-colors inline-flex items-center gap-1.5 bg-zinc-800/50 px-3 py-2 rounded-xl border border-zinc-800"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Fill Demo Credentials
            </button>
          </div>
        </div>

        {/* Footer Security Badge */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500 uppercase tracking-widest font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> End-to-End Encrypted Acoustic Vault
          </div>
          <p className="text-xs text-zinc-500">
            Don't have a studio badge?{" "}
            <Link to="/shop" className="text-purple-400 hover:underline font-bold">
              Explore Collection
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
