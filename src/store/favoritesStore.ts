'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (productId) => {
        set((state) => ({
          favorites: state.favorites.includes(productId)
            ? state.favorites.filter((id) => id !== productId)
            : [...state.favorites, productId],
        }));
      },

      isFavorite: (productId) => get().favorites.includes(productId),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'dolce-amore-favorites',
    }
  )
);
