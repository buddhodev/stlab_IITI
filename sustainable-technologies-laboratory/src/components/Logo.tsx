import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "motion/react";

interface LogoProps {
  className?: string;
  size?: number;
  interactive?: boolean;
}

export default function Logo({ className = "", size = 64, interactive = true }: LogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilting
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for buttery smooth return transitions
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { damping: 15, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { damping: 15, stiffness: 150 });
  const scale = useSpring(isHovered ? 1.08 : 1, { damping: 15, stiffness: 180 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates from -0.5 to 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const logoSVG = (
    <img
      src="/assets/stl_logo.svg"
      alt="STLab Logo"
      width={size}
      height={size}
      className={`drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] ${className}`}
      style={{ objectFit: "contain" }}
      referrerPolicy="no-referrer"
    />
  );

  if (!interactive) {
    return <div className={`inline-block ${className}`}>{logoSVG}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`relative inline-block cursor-pointer select-none ${className}`}
    >
      {logoSVG}
      {/* Dynamic 3D specular glare overlay */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none mix-blend-color-dodge opacity-25 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
          style={{
            transform: "translateZ(30px)",
          }}
        />
      )}
    </motion.div>
  );
}
