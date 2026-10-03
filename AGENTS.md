# AGENTS.md

## Design Context

### Users
Front-end developers, designers, and creative-coding curious visitors who land on a portfolio showcase. They're casually exploring, ready to be delighted — the job is "prove that interaction design can feel joyful and technically excellent within a few seconds of moving the mouse."

### Brand Personality
Playful, tactile, charming. Three words: **toy-like, warm, precise**. The site should feel like a collectible vinyl toy — soft candy colors, chunky forms, but engineered with exacting polish. Emotional goal: delight, then a tug of "how did they build this?"

### Aesthetic Direction
Playful-toy / kawaii on a deep tinted ink background (not pure black — a warm-violet-leaning near-black). Pastel-neon accents: bubblegum pink, soft lilac, mint-cyan, buttery yellow. Soft mesh-gradient glows that react to cursor position. Chunky, characterful display type paired with a clean, friendly body face. Custom-feeling SVG/Lucide icon particles (hearts, stars, sparkles, flowers, boba, coffee, smiles).

**Anti-references:** generic AI dark SaaS (purple→blue gradient text, glass card grids, cyan-on-black neon, emoji-topped feature columns); corporate/stock-clean layouts; centered-everything hero templates.

### Design Principles
1. **Interaction is the product** — every pointer movement and click must produce visible, well-tuned feedback (cursor orb spring, click bursts, ripples).
2. **Motion decelerates, never bounces** — ease-out curves, spring physics for lag; no elastic/bounce easings.
3. **Warm dark, never pure black or pure white** — tinted ink background, tinted off-white text, candy accents used sparingly for hierarchy.
4. **Anti-template layout** — asymmetric composition, varied rhythm, no identical card grids, no icon+heading+paragraph repetition.
5. **Delight with restraint** — effects auto-clean (no DOM buildup), respect `prefers-reduced-motion`, keep everything keyboard-reachable with visible focus.
