import React, { useEffect, useState } from "react";

export default function GlitterBackground() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number; color: string }[]>([]);

  useEffect(() => {
    // Generate static-positioned, dynamic-shimmering stable coordinates for 34 particles representing professional fine glitter
    const items = Array.from({ length: 34 }).map((_, i) => {
      const pRandom = Math.sin(i * 92837.283) * 0.5 + 0.5; // deterministic pseudo-random to prevent hydration issues
      
      // Professional sustainable color spectrum: emerald green, pure mint, and solar gold
      let color = "rgba(52, 211, 153, 0.45)"; // emerald-400
      if (pRandom > 0.7) {
        color = "rgba(245, 158, 11, 0.35)"; // solar bio-energy amber-500
      } else if (pRandom > 0.4) {
        color = "rgba(16, 185, 129, 0.45)"; // pure mint/green-500
      }
      
      return {
        id: i,
        x: pRandom * 100, // percentage left
        y: (Math.sin(i * 12345.67) * 0.5 + 0.5) * 100, // percentage top
        size: (Math.sin(i * 543.21) * 0.5 + 0.5) * 2.8 + 1.2, // 1.2px to 4px for tiny, highly professional micro-particles
        delay: (Math.sin(i * 987.65) * 0.5 + 0.5) * 8, // animation delay in seconds
        duration: (Math.sin(i * 135.79) * 0.5 + 0.5) * 14 + 12, // 12s to 26s for ultra-slow luxury tempo
        color
      };
    });
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none" style={{ zIndex: -10 }}>
      {/* Background rich gradient combining deep forest moss, spruce, and carbon charcoal */}
      <div className="absolute inset-0 bg-radial-[circle_at_center] from-[#022415] via-[#01170d] to-[#010d07]"></div>
      
      {/* Animated abstract subtle organic gradient blobs to blend the green and gold elegantly */}
      <div className="absolute top-[8%] left-[15%] w-[60vw] h-[60vh] rounded-full bg-emerald-600/8 blur-[130px] animate-pulse" style={{ animationDuration: "16s" }}></div>
      <div className="absolute bottom-[15%] right-[10%] w-[55vw] h-[55vh] rounded-full bg-green-600/6 blur-[150px] animate-pulse" style={{ animationDuration: "20s" }}></div>
      <div className="absolute top-[35%] right-[25%] w-[50vw] h-[50vh] rounded-full bg-teal-600/8 blur-[125px] animate-pulse" style={{ animationDuration: "18s" }}></div>

      {/* Glitter particles overlay */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 1.5}px ${p.color}, 0 0 ${p.size * 3.5}px rgba(255, 255, 255, 0.45)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
