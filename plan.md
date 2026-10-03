Build a highly interactive, modern, and visually stunning Front-End only website using Vite + React, Tailwind CSS, and Framer Motion (or Lucide Icons + Canvas/GSAP if needed).

### Core Concept & Aesthetics:
- A minimalist, clean, yet playful single-page landing showcase.
- Dark theme background (e.g., slate-950 or zinc-900) to make colors, glows, and animations pop smoothly.

### Key Interactive Features:

1. Mouse Cursor Trail & Dynamic Color Follower:
   - Implement an ambient, smooth glowing color orb/gradient that follows the mouse cursor with a slight delay (lag/spring physics effect).
   - The background should subtly shift or react to the cursor position with soft multi-color mesh gradients (e.g., pastel neon pinks, purples, cyans, and warm yellows).

2. Click Spawner / Burst Effect (Cute Icons):
   - Whenever the user clicks ANYWHERE on the screen, spawn floating/bursting cute animated icons at the exact cursor coordinates.
   - Use cute icons like hearts, stars, sparklers, smiles, coffee cups, flowers, and boba (using `lucide-react` or SVG icons).
   - The spawned icons should scale up, float upwards/outwards, rotate slightly, fade out, and automatically unmount from the DOM after 1 to 1.5 seconds.
   - Include soft click ripples or particle bursts around the click point.

3. Hero & Content Section:
   - Centered interactive Hero Card or Title (e.g., "Move Your Cursor & Click Anywhere ✨").
   - Include interactive UI elements: buttons with magnetic hover effects, hoverable cards that tilt subtly toward the cursor, and glowing borders.
   - A toggle or sound button (optional aesthetic touch) to switch between different icon themes (e.g., "Cute Space", "Pastel Magic", "Sweet Treats").

### Technical Constraints & Guidelines:
- Tech Stack: React (Functional Components + Hooks), Vite, Tailwind CSS, Framer Motion,rst Effect (CuteBuild a highly inte(or custom Lucide icon particle component).
- Performance First: Ensure smooth 60fps animations. Optimize state management for spawned cursor icons so memory/DOM isn't clogged (use auto-cleanup timers).
- Mobile Fallback: Touch events (`onTouchStart` / move) should trigger the same particle bursts and glowing effects for mobile screens.
- Clean Code: Modular structure with well-named components (e.g.,ures:

1. MousBuild a highly inter `InteractiveCard`).

Please generate the complete, fully functional React project setup with all required components, hooks, and clean Tailwind styling.
