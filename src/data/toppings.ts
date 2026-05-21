import { Topping } from '@/types/product';

export const toppings: Topping[] = [
  { id: 'zucaritas', name: 'Zucaritas', image: '/images/toppings/zucaritas.webp', extraPrice: 2000 },
  { id: 'chocokrispy', name: 'Chocokrispy', image: '/images/toppings/chocokrispy.webp', extraPrice: 2000 },
  { id: 'salsa-de-fresa', name: 'Salsa de fresa', image: '/images/toppings/salsa-de-fresa.webp', extraPrice: 2000 },
  { id: 'arequipe', name: 'Arequipe', image: '/images/toppings/arequipe.webp', extraPrice: 2000 },
  { id: 'salsa-de-mora', name: 'Salsa de mora', image: '/images/toppings/salsa-de-mora.webp', extraPrice: 2000 },
  { id: 'lechera', name: 'Lechera', image: '/images/toppings/lechera.webp', extraPrice: 2000 },
];

export const FREE_TOPPINGS_COUNT = 1;
export const EXTRA_TOPPING_PRICE = 2000;
