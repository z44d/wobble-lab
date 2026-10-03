# Wobble Lab ✦

A single-page interactive cursor playground: spring-lagged glow orb, cursor-reactive mesh
background, and sticker bursts that spawn wherever you click — anywhere on the page.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run preview
```

## What's inside

| Feature | Where |
| --- | --- |
| Spring-lagged cursor orb + crisp follower dot | `src/components/CursorOrb.jsx` |
| Cursor-reactive mesh gradient background | `src/components/MeshBackground.jsx` |
| Click / touch / keyboard sticker bursts with ripples & auto-cleanup | `src/components/ClickBursts.jsx` |
| Magnetic hover buttons | `src/components/MagneticButton.jsx` |
| Cards that tilt toward the pointer | `src/components/InteractiveCard.jsx` |
| Swappable sticker packs (Cute Space / Pastel Magic / Sweet Treats) | `src/data/packs.js`, `src/components/ThemeSwitcher.jsx` |
| Optional Web Audio "pop" on click | `src/hooks/usePopSound.js` |

## Performance & accessibility notes

- Every spawn unmounts itself on a timer; the burst list is hard-capped at 64 entries.
- Pointer listeners are passive; animations only touch `transform` / `opacity`.
- `prefers-reduced-motion` disables the orb, trails, marquee and tilt, and reduces bursts
  to quiet fades.
- Buttons and links are keyboard reachable with a visible focus ring; keyboard activation
  pops a burst at the focused element.

Stack: React 19 · Vite 7 · Tailwind CSS 4 · Framer Motion · Lucide.
