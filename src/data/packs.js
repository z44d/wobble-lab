import {
  Candy,
  Cherry,
  Coffee,
  Cookie,
  Donut,
  Flower2,
  Globe,
  Heart,
  IceCreamCone,
  Moon,
  Orbit,
  Rocket,
  Smile,
  Sparkle,
  Sparkles,
  Star,
  CupSoda,
  Wand2,
} from 'lucide-react';

/**
 * Sticker packs: each one reskins every burst spawned anywhere on the page.
 */
export const PACKS = [
  {
    id: 'space',
    label: 'Cute Space',
    tint: '#c9a9ff',
    icons: [
      { Icon: Rocket, color: '#ff9ad5' },
      { Icon: Moon, color: '#ffd97e' },
      { Icon: Star, color: '#79efcf' },
      { Icon: Orbit, color: '#c9a9ff' },
      { Icon: Globe, color: '#a9d8ff' },
      { Icon: Sparkle, color: '#fff1a8' },
    ],
  },
  {
    id: 'magic',
    label: 'Pastel Magic',
    tint: '#ff9ad5',
    icons: [
      { Icon: Wand2, color: '#c9a9ff' },
      { Icon: Sparkles, color: '#ffd97e' },
      { Icon: Flower2, color: '#ff9ad5' },
      { Icon: Heart, color: '#ff9ad5' },
      { Icon: Smile, color: '#ffd97e' },
      { Icon: Coffee, color: '#a9d8ff' },
    ],
  },
  {
    id: 'sweets',
    label: 'Sweet Treats',
    tint: '#ffd97e',
    icons: [
      { Icon: IceCreamCone, color: '#ff9ad5' },
      { Icon: Donut, color: '#ffd97e' },
      { Icon: Candy, color: '#c9a9ff' },
      { Icon: Cookie, color: '#ffd97e' },
      { Icon: Cherry, color: '#ff9ad5' },
      { Icon: CupSoda, color: '#79efcf' },
    ],
  },
];

export const getPack = (id) => PACKS.find((pack) => pack.id === id) ?? PACKS[0];
