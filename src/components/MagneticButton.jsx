import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const SPRING = { stiffness: 170, damping: 15, mass: 0.5 };

/**
 * Button that leans toward the cursor; the label leans a little further so
 * the type feels like it's on its own spring.
 */
export default function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  ...props
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lx = useMotionValue(0);
  const ly = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);
  const lsx = useSpring(lx, SPRING);
  const lsy = useSpring(ly, SPRING);

  const handleMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - (rect.left + rect.width / 2);
    const py = e.clientY - (rect.top + rect.height / 2);
    x.set(px * 0.32);
    y.set(py * 0.42);
    lx.set(px * 0.1);
    ly.set(py * 0.14);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    lx.set(0);
    ly.set(0);
  };

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-[0.95rem] font-semibold transition-colors duration-200';
  const variants = {
    primary: 'bg-pink text-ink-deep hover:bg-[#ffb0de]',
    ghost: 'border border-cream/25 text-cream hover:border-cream/60 hover:bg-cream/5',
    mint: 'bg-mint text-ink-deep hover:bg-[#96f4dc]',
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
      whileTap={reduced ? undefined : { scale: 0.96 }}
      {...props}
    >
      <motion.span style={{ x: lsx, y: lsy }} className="flex items-center gap-2">
        {children}
      </motion.span>
    </motion.button>
  );
}
