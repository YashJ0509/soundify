import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="rounded-3xl bg-[#0b0c12]/60 border border-zinc-800/50 p-5 flex flex-col justify-between h-80 animate-pulse font-sans">
      <div className="flex justify-between items-center">
        <div className="w-16 h-5 bg-zinc-800 rounded-full" />
        <div className="w-7 h-7 bg-zinc-800 rounded-full" />
      </div>
      <div className="w-32 h-32 bg-zinc-900/80 rounded-2xl mx-auto my-auto" />
      <div className="space-y-2">
        <div className="w-20 h-3 bg-zinc-800 rounded" />
        <div className="w-full h-4 bg-zinc-800 rounded" />
      </div>
    </div>
  );
}