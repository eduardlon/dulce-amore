import { Topping } from './product';

export type OrderType = 'en-el-local' | 'domicilio' | 'para-llevar';

export type PaymentMethod = 'efectivo' | 'nequi' | 'daviplata' | 'tarjeta' | 'transferencia';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  size?: { label: string; price: number };
  toppings: Topping[];
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderInfo {
  orderType: OrderType;
  tableNumber?: string;
  deliveryAddress?: string;
  deliveryReference?: string;
  pickupTime?: string;
  paymentMethod: PaymentMethod;
  notes: string;
}
