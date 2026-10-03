import { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Warm ink backdrop with drifting pastel blobs, plus two heavier blobs that
 * lean toward the cursor with a very slow spring — the whole page breathes
 * with the pointer.
 */
export default function MeshBackground() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 26, damping: 24, mass: 1.4 });
  const sy = useSpring(my, { stiffness: 26, damping: 24, mass: 1.4 });

  useEffect(() => {
    const onMove = (e) => {
      mx.set((e.clientX - window.innerWidth / 2) * 0.34);
      my.set((e.clientY - window.innerHeight / 2) * 0.34);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-ink-deep" aria-hidden="true">
      {/* drifting base blobs */}
      <div
        className="blob-drift absolute -left-40 top-[-10%] h-[46vh] w-[46vh] rounded-full opacity-45 blur-[110px]"
        style={{ background: 'radial-gradient(circle, #ff9ad5 0%, transparent 70%)' }}
      />
      <div
        className="blob-drift-slow absolute right-[-15%] top-[35%] h-[52vh] w-[52vh] rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #79efcf 0%, transparent 70%)' }}
      />
      <div
        className="blob-drift absolute bottom-[-15%] left-[25%] h-[40vh] w-[40vh] rounded-full opacity-35 blur-[110px]"
        style={{ background: 'radial-gradient(circle, #ffd97e 0%, transparent 70%)' }}
      />

      {/* cursor-reactive blobs */}
      {!reduced && (
        <motion.div
          className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[130px]"
          style={{
            x: sx,
            y: sy,
            background: 'radial-gradient(circle, #c9a9ff 0%, transparent 68%)',
          }}
        />
      )}
      {!reduced && (
        <motion.div
          className="absolute left-1/2 top-1/2 h-[45vh] w-[45vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-[120px]"
          style={{
            x: sx,
            y: sy,
            background: 'radial-gradient(circle at 70% 30%, #ff9ad5 0%, transparent 65%)',
          }}
        />
      )}

      <div className="dot-grid absolute inset-0" />
      {/* keep the edges deep so content stays legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 45%, transparent 40%, rgba(15, 13, 21, 0.72) 100%)',
        }}
      />
    </div>
  );
}
