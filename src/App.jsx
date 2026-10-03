import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown,
  MousePointerClick,
  Sparkle,
  Volume2,
  VolumeX,
} from 'lucide-react';

import MeshBackground from './components/MeshBackground.jsx';
import CursorOrb from './components/CursorOrb.jsx';
import ClickBursts from './components/ClickBursts.jsx';
import MagneticButton from './components/MagneticButton.jsx';
import InteractiveCard from './components/InteractiveCard.jsx';
import ThemeSwitcher from './components/ThemeSwitcher.jsx';
import Marquee from './components/Marquee.jsx';
import { PACKS, getPack } from './data/packs.js';
import { usePopSound } from './hooks/usePopSound.js';

const EASE = [0.16, 1, 0.3, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const CRAFT = [
  {
    accent: '#ff9ad5',
    eyebrow: '01 · follower',
    title: 'A spring, not a timer',
    body: 'The glow chases your pointer on a critically-tuned spring, so it lags, leans, and settles instead of snapping. Every frame is one transform write — no layout thrash, no jank.',
    span: 'md:col-span-7',
    visual: 'spring',
  },
  {
    accent: '#ffd97e',
    eyebrow: '02 · pop',
    title: 'Born, tumbling, gone in 1.3s',
    body: 'Five stickers, two rings and a handful of sparks per click. Each spawn schedules its own unmount, and the list is hard-capped at 64 — the DOM never clogs.',
    span: 'md:col-span-5',
    visual: 'burst',
  },
  {
    accent: '#79efcf',
    eyebrow: '03 · everywhere',
    title: 'Warm under a finger, polite to your CPU',
    body: 'Touch drags paint the same trails as mouse flicks, keyboard activation pops at the button, and prefers-reduced-motion swaps the whole playground for quiet, gentle fades.',
    span: 'md:col-span-12',
    visual: 'touch',
  },
];

function SectionTitle({ kicker, title, children }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-display text-xs uppercase tracking-[0.3em] text-butter">{kicker}</p>
        <h2 className="mt-3 max-w-xl font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-tight">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function CraftVisual({ kind, accent }) {
  if (kind === 'spring') {
    return (
      <div className="relative mt-6 h-28 overflow-hidden rounded-2xl border border-cream/10 bg-ink-deep/60">
        <motion.span
          className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: accent }}
          animate={{ x: [0, 190, 214, 150, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: EASE }}
        />
        <motion.span
          className="absolute left-4 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full opacity-60 blur-md"
          style={{ backgroundColor: accent }}
          animate={{ x: [0, 236, 268, 176, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: EASE }}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-display text-xs uppercase tracking-[0.25em] text-cream-dim">
          lag ≈ 120ms
        </span>
      </div>
    );
  }

  if (kind === 'burst') {
    return (
      <div className="relative mt-6 flex h-28 items-center justify-center overflow-hidden rounded-2xl border border-cream/10 bg-ink-deep/60">
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i / 5) * Math.PI * 2;
          return (
            <motion.span
              key={i}
              className="absolute h-3 w-3 rounded-full"
              style={{ backgroundColor: accent }}
              animate={{
                x: [0, Math.cos(angle) * 62],
                y: [0, Math.sin(angle) * 44 - 14],
                opacity: [1, 0],
                scale: [0.4, 1.3, 0.4],
              }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.14, ease: EASE }}
            />
          );
        })}
        <span className="font-display text-xs uppercase tracking-[0.25em] text-cream-dim">
          auto-cleanup
        </span>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {['pointerdown', 'pointermove', 'touch', 'keydown · enter'].map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-cream/12 px-3 py-1 font-display text-xs tracking-wide text-cream-dim"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [packId, setPackId] = useState(PACKS[0].id);
  const [sound, setSound] = useState(false);
  const reduced = useReducedMotion();
  const playPop = usePopSound(sound);
  const pack = getPack(packId);

  return (
    <div className="relative min-h-screen" id="top">
      <MeshBackground />
      <CursorOrb />
      <ClickBursts packId={packId} onPop={playPop} />

      <div className="relative z-10">
        <header className="fixed inset-x-0 top-0 z-30 border-b border-cream/10 bg-ink-deep/75 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
            <a href="#top" className="flex items-center gap-2.5 font-display text-lg font-semibold">
              <motion.span
                className="text-butter"
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkle size={17} fill="currentColor" />
              </motion.span>
              Wobble&nbsp;Lab
            </a>

            <nav className="hidden items-center gap-7 text-sm text-cream-dim md:flex">
              <a className="transition-colors hover:text-cream" href="#packs">
                Sticker packs
              </a>
              <a className="transition-colors hover:text-cream" href="#craft">
                The craft
              </a>
            </nav>

            <button
              type="button"
              onClick={() => setSound((s) => !s)}
              aria-pressed={sound}
              className="flex items-center gap-2 rounded-full border border-cream/15 px-3.5 py-1.5 font-display text-xs font-medium text-cream-dim transition-colors hover:border-cream/45 hover:text-cream"
            >
              {sound ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span className="hidden sm:inline">{sound ? 'Pop sounds on' : 'Pop sounds off'}</span>
            </button>
          </div>
        </header>

        {/* ——— Hero ——— */}
        <section className="relative mx-auto max-w-6xl px-5 pb-20 pt-36 md:pb-28 md:pt-48">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p
              variants={rise}
              className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.22em] text-cream-dim"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              interactive playground · no two visits alike
            </motion.p>

            <h1 className="mt-7 max-w-4xl font-display text-[clamp(2.6rem,8.6vw,6.4rem)] font-semibold leading-[0.96] tracking-tight">
              <motion.span variants={rise} className="block">
                Move your cursor.
              </motion.span>
              <motion.span variants={rise} className="block text-pink">
                Click anywhere
                <span className="text-butter"> ✦</span>
              </motion.span>
            </h1>

            <motion.p
              variants={rise}
              className="mt-7 max-w-xl text-lg leading-relaxed text-cream-dim"
            >
              A pocket-sized playground of spring physics, sticker bursts and pastel glow —
              built with React and far too much affection.
            </motion.p>

            <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton
                variant="primary"
                onClick={() => document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MousePointerClick size={17} />
                Pop some stickers
              </MagneticButton>
              <MagneticButton
                variant="ghost"
                onClick={() => document.getElementById('craft')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <ArrowDown size={16} />
                See how it wobbles
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* floating side notes — the asymmetry that keeps the hero from centering itself */}
          <div className="pointer-events-none absolute right-8 top-44 hidden gap-4 lg:flex lg:flex-col">
            {[
              { text: '60 fps, no drops', tone: 'text-mint', rot: '5deg', x: 0 },
              { text: 'zero DOM leaks', tone: 'text-lilac', rot: '-4deg', x: 34 },
              { text: 'touch friendly', tone: 'text-butter', rot: '3deg', x: -12 },
            ].map((chip, i) => (
              <motion.span
                key={chip.text}
                initial={{ opacity: 0, x: 40, rotate: 0 }}
                animate={{ opacity: 1, x: chip.x, rotate: chip.rot }}
                transition={{ delay: 0.7 + i * 0.14, duration: 0.7, ease: EASE }}
                className={`w-fit rounded-2xl border border-cream/12 bg-ink-soft/70 px-4 py-2 font-display text-sm ${chip.tone}`}
              >
                {chip.text}
              </motion.span>
            ))}
          </div>
        </section>

        <Marquee />

        {/* ——— Sticker packs ——— */}
        <section id="packs" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <SectionTitle kicker="sticker packs" title="Pick a pack. Every burst on the page changes with it.">
            <ThemeSwitcher value={packId} onChange={setPackId} />
          </SectionTitle>

          <div className="mt-10 flex flex-wrap gap-3.5">
            {pack.icons.map(({ Icon, color }, i) => (
              <motion.button
                key={`${pack.id}-${i}`}
                type="button"
                aria-label={`Sticker ${i + 1} from the ${pack.label} pack`}
                initial={{ opacity: 0, y: 18, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: i % 2 ? 3 : -3 }}
                transition={{ delay: i * 0.06, duration: 0.55, ease: EASE }}
                whileHover={reduced ? undefined : { y: -8, rotate: i % 2 ? -5 : 5 }}
                whileTap={{ scale: 0.88 }}
                className="grid h-16 w-16 place-items-center rounded-2xl border border-cream/10 bg-ink-soft/75 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9)]"
              >
                <Icon size={26} strokeWidth={2.1} style={{ color }} fill="currentColor" />
              </motion.button>
            ))}

            <div className="flex max-w-xs items-center pl-2 text-sm leading-relaxed text-cream-dim">
              Currently wearing{' '}
              <span className="mx-1 font-display font-semibold" style={{ color: pack.tint }}>
                {pack.label}
              </span>
              — poke a sticker, or just keep clicking things.
            </div>
          </div>
        </section>

        {/* ——— Craft ——— */}
        <section id="craft" className="mx-auto max-w-6xl px-5 pb-24 pt-4 md:pb-32">
          <SectionTitle kicker="the craft" title="Three tricks, tuned until they feel inevitable." />

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-12">
            {CRAFT.map((card) => (
              <InteractiveCard
                key={card.eyebrow}
                accent={card.accent}
                className={card.span}
              >
                <p className="font-display text-xs uppercase tracking-[0.28em]" style={{ color: card.accent }}>
                  {card.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-snug">{card.title}</h3>
                <p className="mt-3 max-w-prose leading-relaxed text-cream-dim">{card.body}</p>
                <CraftVisual kind={card.visual} accent={card.accent} />
              </InteractiveCard>
            ))}
          </div>
        </section>

        <Marquee />

        {/* ——— Footer CTA ——— */}
        <footer className="mx-auto max-w-6xl px-5 py-24 text-center md:py-32">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mx-auto max-w-2xl font-display text-[clamp(2.1rem,6vw,4.2rem)] font-semibold leading-[1.02]"
          >
            Okay — <span className="text-pink">one more click</span>, then go build something
            that wobbles.
          </motion.h2>

          <div className="mt-9 flex justify-center">
            <MagneticButton variant="mint" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Back to the top
            </MagneticButton>
          </div>

          <p className="mt-14 text-sm text-cream-dim">
            Wobble Lab · React + Vite + Tailwind + Framer Motion + Lucide — nothing left behind
            in the DOM.
          </p>
        </footer>
      </div>
    </div>
  );
}
