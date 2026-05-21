export type BadgeType = 'mas-pedido' | 'popular' | 'nuevo';

export interface Size {
  label: string;
  oz: number;
  price: number;
}

export interface Topping {
  id: string;
  name: string;
  image: string;
  extraPrice: number;
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  image: string;
  basePrice: number;
  sizes?: Size[];
  allowsToppings: boolean;
  badge?: BadgeType;
  featured?: boolean;
}
