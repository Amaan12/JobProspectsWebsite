import React, { useRef, useEffect } from 'react';

/**
 * ClickSpark component from reactbits.dev
 * Spawns subtle micro-spark particle bursts on mouse click.
 */
export default function ClickSpark({
  sparkColor = "#10b981",
  sparkSize = 10,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 400,
  children
}) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = now - spark.startTime;
        if (elapsed > duration) return false;

        const progress = elapsed / duration;
        const currentDistance = spark.distance * (1 - Math.pow(1 - progress, 3));
        const currentSize = spark.size * (1 - progress);

        const x = spark.x + Math.cos(spark.angle) * currentDistance;
        const y = spark.y + Math.sin(spark.angle) * currentDistance;

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = sparkColor;
        ctx.globalAlpha = 1 - progress;
        ctx.fill();
        ctx.restore();

        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, duration]);

  const handleClick = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const now = performance.now();

    for (let i = 0; i < sparkCount; i++) {
      const angle = (i * 2 * Math.PI) / sparkCount + (Math.random() - 0.5) * 0.4;
      sparksRef.current.push({
        x,
        y,
        angle,
        distance: sparkRadius + Math.random() * 12,
        size: sparkSize * (0.6 + Math.random() * 0.4),
        startTime: now,
      });
    }
  };

  return (
    <div onClick={handleClick} className="relative w-full min-h-screen">
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 w-full h-full"
      />
      {children}
    </div>
  );
}
