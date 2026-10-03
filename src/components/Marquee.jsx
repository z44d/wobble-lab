import { motion, useReducedMotion } from 'framer-motion';

const WORDS = [
  'click',
  'pop',
  'wobble',
  'sparkle',
  'float',
  'glow',
  'bounce-free easing',
  'tap',
  'drift',
  'unmount cleanly',
];

/** Endless candy strip — a low, steady heartbeat between sections. */
export default function Marquee() {
  const reduced = useReducedMotion();
  const row = [...WORDS, ...WORDS];

  return (
    <div className="relative overflow-hidden border-y border-cream/10 bg-ink/50 py-4">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={reduced ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {row.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex items-center gap-10 font-display text-sm uppercase tracking-[0.32em] text-cream-dim"
          >
            {word}
            <span className="text-butter">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
