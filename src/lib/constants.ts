import type { FeatureItem, GalleryItem } from "@/types";

export const ORNAMENT_IMAGE = "/images/Ornament.webp";

export const EVENT = {
  brideName: "Даяна",
  eventType: "Қыз Ұзату",
  dateISO: "2026-08-29T17:00:00+05:00",
  dateDisplay: {
    ru: "29 августа 2026",
    kz: "2026 жылдың 29 тамызы",
  },
  time: "17:00",
  venue: {
    name: "Алтын Шаңырақ",
    address: "ул. Ерлепесова, 36",
    city: "с. Алмалыбак",
  },
  mapUrl: "https://2gis.kz/almaty/geo/70000001052033082",
  footerDate: "29 · VIII · 2026",
  langSub: "Даяна · 29 Тамыз 2026",
} as const;

export const FEATURES: FeatureItem[] = [
  { icon: "🏮", titleKey: "f1", descKey: "f1d" },
  { icon: "🎋", titleKey: "f2", descKey: "f2d" },
  { icon: "💌", titleKey: "f3", descKey: "f3d" },
  { icon: "🍽", titleKey: "f4", descKey: "f4d" },
  { icon: "🎶", titleKey: "f5", descKey: "f5d" },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "1", emoji: "🌸", aspectRatio: "3/4" },
  { id: "2", emoji: "🌷", aspectRatio: "1/1" },
  { id: "3", emoji: "✨", aspectRatio: "3/4" },
  { id: "4", emoji: "🌺", aspectRatio: "3/2" },
  { id: "5", emoji: "💐", aspectRatio: "1/1" },
  { id: "6", emoji: "🌹", aspectRatio: "3/4" },
];

export const PETALS = [
  { left: "10%", duration: 7, delay: 0 },
  { left: "25%", duration: 9, delay: 2 },
  { left: "50%", duration: 6, delay: 1 },
  { left: "70%", duration: 8, delay: 3 },
  { left: "85%", duration: 10, delay: 0.5 },
] as const;
