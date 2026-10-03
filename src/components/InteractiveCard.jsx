import { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';

/**
 * Card that tilts toward the cursor with a soft spring, plus a glow that
 * tracks the pointer inside the card.
 */
export default function InteractiveCard({
  children,
  accent = '#ff9ad5',
  className = '',
  tilt = 9,
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18, mass: 0.6 });

  const gx = useMotionValue(200);
  const gy = useMotionValue(200);
  const glow = useMotionValue(0);
  const sglow = useSpring(glow, { stiffness: 140, damping: 22 });

  const glowBg = useMotionTemplate`radial-gradient(340px circle at ${gx}px ${gy}px, color-mix(in srgb, ${accent} 26%, transparent), transparent 68%)`;

  const handleMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((0.5 - py) * tilt);
    ry.set((px - 0.5) * tilt);
    gx.set(px * rect.width);
    gy.set(py * rect.height);
    glow.set(1);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    glow.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 1100,
      }}
      className={`group relative overflow-hidden rounded-[1.75rem] border border-cream/10 bg-ink-soft/75 p-7 will-change-transform ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: glowBg, opacity: sglow }}
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </motion.article>
  );
}
