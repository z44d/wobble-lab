import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getPack } from '../data/packs.js';

const EASE = [0.16, 1, 0.3, 1];
const MAX_BURSTS = 64;
const rand = (a, b) => a + Math.random() * (b - a);

let uid = 0;

function pickIcons(pack, n) {
  const pool = [...pack.icons];
  const out = [];
  while (out.length < n && pool.length) {
    out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  return out;
}

/** One spawn event: ripple rings + icons that fly out, tumble, and wink out. */
function Burst({ burst, reduced }) {
  const rings = burst.kind === 'trail' || reduced ? 0 : 2;
  const dots = burst.kind === 'trail' || reduced ? 0 : 7;

  return (
    <div
      className="pointer-events-none fixed z-50"
      style={{ left: burst.x, top: burst.y }}
      aria-hidden="true"
    >
      {Array.from({ length: rings }).map((_, i) => (
        <motion.span
          key={`r${i}`}
          className="absolute -left-7 -top-7 h-14 w-14 rounded-full border-2"
          style={{ borderColor: burst.tint }}
          initial={{ scale: 0.15, opacity: 0.85 }}
          animate={{ scale: 4.2 + i * 2.4, opacity: 0 }}
          transition={{ duration: 0.7 + i * 0.28, ease: EASE }}
        />
      ))}

      {Array.from({ length: dots }).map((_, i) => (
        <motion.span
          key={`d${i}`}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: burst.dotColors[i % burst.dotColors.length] }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: burst.dots[i].dx,
            y: burst.dots[i].dy,
            opacity: 0,
            scale: 0.2,
          }}
          transition={{ duration: 0.62, ease: EASE }}
        />
      ))}

      {burst.icons.map((it, i) => {
        const Icon = it.Icon;
        const anim = reduced
          ? { opacity: [0, 1, 0], scale: [0.5, 1, 0.4] }
          : {
              x: [0, it.dx * 0.55, it.dx],
              y: [0, it.dy * 0.4, it.dy],
              rotate: [0, it.rot * 0.35, it.rot],
              opacity: [0, 1, 1, 0],
              scale: [0.1, 1.18, 1, 0.85],
            };

        return (
          <motion.span
            key={`i${i}`}
            className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.1, rotate: 0 }}
            animate={anim}
            transition={{
              duration: reduced ? 0.55 : burst.life,
              times: reduced ? [0, 0.3, 1] : [0, 0.16, 0.62, 1],
              delay: it.delay,
              ease: EASE,
            }}
            style={{ width: it.size, height: it.size }}
          >
            <Icon
              size={it.size}
              strokeWidth={2.1}
              color={it.color}
              fill={reduced ? 'none' : 'currentColor'}
              style={{ opacity: 0.95 }}
            />
          </motion.span>
        );
      })}
    </div>
  );
}

/**
 * Global spawner: pointerdown anywhere, fast pointer flicks (mouse trail),
 * finger drags (touch trail), and keyboard activation of buttons all pop
 * stickers at the exact coordinates. Every spawn unmounts itself via timer
 * and the list is hard-capped so the DOM never clogs.
 */
export default function ClickBursts({ packId, onPop }) {
  const reduced = useReducedMotion();
  const [bursts, setBursts] = useState([]);
  const aliveRef = useRef(true);
  const packRef = useRef(packId);
  const popRef = useRef(onPop);
  packRef.current = packId;
  popRef.current = onPop;

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  useEffect(() => {
    const spawn = (x, y, kind) => {
      const pack = getPack(packRef.current);
      const count = kind === 'trail' ? 1 : reduced ? 3 : 5;
      const life = kind === 'trail' ? 0.9 : 1.25;

      const icons = pickIcons(pack, count).map((it, i) => {
        const angle = rand(0, Math.PI * 2);
        const dist = kind === 'trail' ? rand(8, 20) : rand(46, 132);
        return {
          ...it,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - (kind === 'trail' ? 12 : 54),
          rot: rand(-60, 60),
          delay: i * 0.05,
          size: kind === 'trail' ? rand(13, 20) : rand(26, 42),
        };
      });

      const dots = Array.from({ length: 7 }, () => {
        const a = rand(0, Math.PI * 2);
        const d = rand(26, 74);
        return { dx: Math.cos(a) * d, dy: Math.sin(a) * d };
      });

      const id = ++uid;
      const burst = {
        id,
        x,
        y,
        kind,
        life,
        icons,
        dots,
        tint: pack.tint,
        dotColors: pack.icons.map((entry) => entry.color),
      };

      if (kind === 'click') popRef.current?.();

      setBursts((prev) => [...prev.slice(-(MAX_BURSTS - 1)), burst]);
      window.setTimeout(
        () => {
          if (aliveRef.current) setBursts((prev) => prev.filter((b) => b.id !== id));
        },
        (reduced ? 0.7 : life + 0.2) * 1000,
      );
    };

    let lastMove = 0;
    let lastX = -1e4;
    let lastY = -1e4;

    const onPointerDown = (e) => spawn(e.clientX, e.clientY, 'click');

    const onPointerMove = (e) => {
      const now = performance.now();
      const isTouch = e.pointerType === 'touch';
      const gap = isTouch ? 95 : 80;
      if (now - lastMove < gap) return;
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (!isTouch && dist < 75) return;
      lastMove = now;
      lastX = e.clientX;
      lastY = e.clientY;
      spawn(e.clientX, e.clientY, 'trail');
    };

    // Keyboard users: activating a button/link pops at its center.
    const onKeyDown = (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const el = e.target;
      if (!el || typeof el.closest !== 'function') return;
      const target = el.closest('button, a[href], [role="button"]');
      if (!target) return;
      const rect = target.getBoundingClientRect();
      spawn(rect.left + rect.width / 2, rect.top + rect.height / 2, 'click');
    };

    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [reduced]);

  // Each burst unmounts itself via its cleanup timer; icons fade to zero
  // before then, so nothing lingers visually or in the DOM.
  return bursts.map((b) => <Burst key={b.id} burst={b} reduced={reduced} />);
}
