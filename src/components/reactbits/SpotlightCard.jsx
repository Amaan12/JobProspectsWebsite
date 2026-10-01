import React, { useRef, useState } from 'react';

/**
 * SpotlightCard component inspired by reactbits.dev
 * Emits a subtle radial gradient spotlight following the user's cursor.
 * Adapts to Dark and Light modes.
 */
export default function SpotlightCard({ 
  children, 
  className = "", 
  spotlightColor = "rgba(16, 185, 129, 0.12)",
  isDark = true
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border transition-all duration-300 ${
        isDark 
          ? 'bg-[#0c0f19]/45 backdrop-blur-2xl border-white/[0.12] text-white hover:border-white/20 hover:shadow-2xl hover:shadow-black/50' 
          : 'bg-white/55 backdrop-blur-2xl border-slate-200/80 text-slate-900 shadow-xl shadow-slate-200/40 hover:border-slate-300'
      } ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 65%)`,
        }}
      />
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  );
}
