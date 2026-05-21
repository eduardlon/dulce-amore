'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, OrderType, PaymentMethod, OrderInfo } from '@/types/cart';
import { Topping } from '@/types/product';

interface CartStore {
  items: CartItem[];
  orderInfo: OrderInfo;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setOrderType: (type: OrderType) => void;
  setTableNumber: (table: string) => void;
  setDeliveryAddress: (address: string) => void;
  setDeliveryReference: (ref: string) => void;
  setPickupTime: (time: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setNotes: (notes: string) => void;
  totalItems: () => number;
  subtotal: () => number;
  deliveryFee: () => number;
  total: () => number;
}

const defaultOrderInfo: OrderInfo = {
  orderType: 'en-el-local',
  tableNumber: '',
  deliveryAddress: '',
  deliveryReference: '',
  pickupTime: '',
  paymentMethod: 'efectivo',
  notes: '',
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      orderInfo: { ...defaultOrderInfo },

      addItem: (item) => {
        const id = `${item.productId}-${item.size?.label || 'default'}-${item.toppings.map(t => t.id).join(',')}-${Date.now()}`;
        set((state) => ({
          items: [...state.items, { ...item, id }],
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity, totalPrice: item.unitPrice * quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], orderInfo: { ...defaultOrderInfo } });
      },

      setOrderType: (type) => set((state) => ({ orderInfo: { ...state.orderInfo, orderType: type } })),
      setTableNumber: (table) => set((state) => ({ orderInfo: { ...state.orderInfo, tableNumber: table } })),
      setDeliveryAddress: (address) => set((state) => ({ orderInfo: { ...state.orderInfo, deliveryAddress: address } })),
      setDeliveryReference: (ref) => set((state) => ({ orderInfo: { ...state.orderInfo, deliveryReference: ref } })),
      setPickupTime: (time) => set((state) => ({ orderInfo: { ...state.orderInfo, pickupTime: time } })),
      setPaymentMethod: (method) => set((state) => ({ orderInfo: { ...state.orderInfo, paymentMethod: method } })),
      setNotes: (notes) => set((state) => ({ orderInfo: { ...state.orderInfo, notes: notes } })),

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: () => get().items.reduce((sum, item) => sum + item.totalPrice, 0),
      deliveryFee: () => (get().orderInfo.orderType === 'domicilio' ? 5000 : 0),
      total: () => get().subtotal() + get().deliveryFee(),
    }),
    {
      name: 'dolce-amore-cart',
    }
  )
);
