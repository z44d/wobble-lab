import { motion } from 'framer-motion';
import { PACKS } from '../data/packs.js';

/** Segmented pill that swaps the sticker pack used by every burst. */
export default function ThemeSwitcher({ value, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label="Sticker pack"
      className="inline-flex flex-wrap gap-1 rounded-full border border-cream/12 bg-ink-soft/70 p-1.5"
    >
      {PACKS.map((pack) => {
        const active = pack.id === value;
        return (
          <button
            key={pack.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(pack.id)}
            className="relative rounded-full px-4 py-2 font-display text-sm font-medium text-cream/70 transition-colors duration-200 hover:text-cream"
          >
            {active && (
              <motion.span
                layoutId="pack-pill"
                className="absolute inset-0 rounded-full bg-cream"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span
              className={`relative z-10 ${active ? 'text-ink-deep' : ''}`}
            >
              {pack.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
