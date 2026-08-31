import React, { useEffect } from "react";
import { CheckCircle2, ShoppingBag, Heart, X } from "lucide-react";
import gsap from "gsap";

export default function Toast({ message, type = "cart", onClose }) {
  useEffect(() => {
    gsap.fromTo(
      ".toast-notification",
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" }
    );
    const timer = setTimeout(() => {
      gsap.to(".toast-notification", {
        y: 30,
        opacity: 0,
        duration: 0.3,
        onComplete: onClose,
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-notification fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-zinc-950/95 border border-zinc-800 text-white px-5 py-3.5 rounded-2xl shadow-luxury backdrop-blur-xl">
      {type === "cart" ? (
        <ShoppingBag className="w-4 h-4 text-purple-400" />
      ) : (
        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
      )}
      <span className="text-xs font-bold tracking-wide">{message}</span>
      <button onClick={onClose} className="ml-2 text-zinc-500 hover:text-white">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}