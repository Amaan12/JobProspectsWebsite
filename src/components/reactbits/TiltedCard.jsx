import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * TiltedCard component inspired by reactbits.dev
 * Smooth 3D tilt perspective based on mouse movement.
 */
export default function TiltedCard({ children, className = "", maxTilt = 12 }) {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-3xl transition-shadow duration-300 ${className}`}
    >
      <div style={{ transform: "translateZ(25px)" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
}
