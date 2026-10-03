import { useCallback, useRef } from 'react';

/**
 * Tiny Web Audio "pop" for click bursts. Created lazily on first use so the
 * AudioContext only ever exists after a user gesture.
 */
export function usePopSound(enabled) {
  const ctxRef = useRef(null);

  return useCallback(() => {
    if (!enabled || typeof window === 'undefined') return;
    try {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return;
      if (!ctxRef.current) ctxRef.current = new Ctor();
      const ctx = ctxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(560 + Math.random() * 520, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.14);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.07, t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    } catch {
      /* audio is a garnish, never a requirement */
    }
  }, [enabled]);
}
