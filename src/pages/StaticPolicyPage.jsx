import React from "react";
import { useParams } from "react-router-dom";

export default function StaticPolicyPage() {
  const { type } = useParams();

  const titles = {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    warranty: "Hardware Warranty"
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 space-y-6 font-sans">
      <h1 className="text-3xl font-black text-white uppercase tracking-tight font-heading">
        {titles[type] || "Legal Documentation"}
      </h1>
      <p className="text-sm text-zinc-400 leading-relaxed">
        At Soundify Systems Inc., we maintain uncompromising transparency regarding our studio calibration metrics, user data protection protocols, and 2-year hardware replacement guarantees. All specifications comply with high-resolution industry criteria.
      </p>
    </div>
  );
}