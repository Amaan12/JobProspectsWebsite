import React from 'react';

/**
 * ShinyText component inspired by reactbits.dev
 * Subtle animated shimmering metallic text effect.
 */
export default function ShinyText({ text, disabled = false, speed = 3, className = "" }) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-emerald-300 to-slate-200 bg-[length:200%_auto] ${
        disabled ? "" : "animate-shimmer"
      } ${className}`}
      style={{
        animationDuration,
      }}
    >
      {text}
    </span>
  );
}
