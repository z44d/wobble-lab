import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * A crisp dot pinned to the real pointer, plus a big soft glow that lags
 * behind it on a spring — the "trail" effect. Touch devices get the same
 * treatment while a finger is on screen.
 */
export default function CursorOrb() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const ox = useSpring(mx, { stiffness: 110, damping: 20, mass: 0.9 });
  const oy = useSpring(my, { stiffness: 110, damping: 20, mass: 0.9 });

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [mx, my]);

  if (reduced) return null;

  return (
    <>
      {/* lagging glow */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-40 h-[26rem] w-[26rem]"
        style={{ x: ox, y: oy, opacity: visible ? 1 : 0 }}
        aria-hidden="true"
      >
        <div
          className="h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 154, 213, 0.42) 0%, rgba(201, 169, 255, 0.26) 42%, rgba(121, 239, 207, 0.12) 62%, transparent 74%)',
            filter: 'blur(34px)',
          }}
        />
      </motion.div>

      {/* crisp follower dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50"
        style={{ x: mx, y: my, opacity: visible ? 1 : 0 }}
        aria-hidden="true"
      >
        <div className="h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream shadow-[0_0_14px_rgba(255,154,213,0.9)]" />
      </motion.div>
    </>
  );
}
