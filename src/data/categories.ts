import { Category } from '@/types/category';

export const categories: Category[] = [
  {
    slug: 'fresas-con-crema',
    name: 'Fresas con crema',
    icon: '🍓',
    heroImage: '/images/heroes/fresas-con-crema.webp',
    heroTitle: 'Fresas con crema',
    heroEmoji: '🍓',
    heroDescription: 'Fresas frescas, crema de la casa y combinaciones irresistibles.',
    heroPhrase: 'El clásico que nunca falla. 🍓',
    bgColor: '#FFE4EC',
  },
  {
    slug: 'merengon',
    name: 'Merengón',
    icon: '🍰',
    heroImage: '/images/heroes/merengon.webp',
    heroTitle: 'Merengón',
    heroEmoji: '🍰',
    heroDescription: 'Merengue crujiente, crema suave y frutas frescas en combinaciones irresistibles.',
    heroPhrase: 'Ligero, fresco y hecho con amor. 💖',
    bgColor: '#FFF0E8',
  },
  {
    slug: 'obleas',
    name: 'Obleas',
    icon: '🧇',
    heroImage: '/images/heroes/obleas.webp',
    heroTitle: 'Obleas',
    heroEmoji: '🧇',
    heroDescription: 'Crujientes obleas con crema, frutas frescas y salsas irresistibles.',
    heroPhrase: '¡Capas de felicidad en cada bocado! 💖',
    bgColor: '#FFF5EB',
  },
  {
    slug: 'shakes',
    name: 'Shakes',
    icon: '🥤',
    heroImage: '/images/heroes/shakes.webp',
    heroTitle: 'Shakes',
    heroEmoji: '🥤',
    heroDescription: 'Batidos cremosos, sabores únicos y hechos para ti.',
    heroPhrase: '¡El shake perfecto para cada antojo! 💖',
    bgColor: '#FFE8F0',
  },
  {
    slug: 'bowls',
    name: 'Bowls',
    icon: '🍨',
    heroImage: '/images/heroes/bowls.webp',
    heroTitle: 'Bowls',
    heroEmoji: '🍨',
    heroDescription: 'Capas de frescura, cremosidad y toppings irresistibles.',
    heroPhrase: '¡El equilibrio perfecto en cada cucharada! 💖',
    bgColor: '#FFE0E8',
  },
  {
    slug: 'chocolate',
    name: 'Chocolate',
    icon: '🍫',
    heroImage: '/images/heroes/chocolate.webp',
    heroTitle: 'Chocolate',
    heroEmoji: '🍫',
    heroDescription: 'El placer del chocolate en sus combinaciones más irresistibles.',
    heroPhrase: 'Intenso, cremoso y hecho para enamorar. 💖',
    bgColor: '#F5E6E0',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
