'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { useFavoritesStore } from '@/store/favoritesStore';
import { products as allProducts } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import styles from './page.module.css';

export default function FavoritesPage() {
  const router = useRouter();
  const { favorites } = useFavoritesStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const favoriteProducts = allProducts.filter((p) => favorites.includes(p.id));

  return (
    <div className="page-container">
      <Header showBack />

      <div className={styles.container}>
        <h1 className={styles.pageTitle}>💖 Tus Favoritos</h1>

        {favoriteProducts.length === 0 ? (
          <div className={styles.emptyContainer}>
            <motion.div
              className={styles.emptyIconWrap}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <Heart size={64} className={styles.emptyIcon} />
            </motion.div>
            <h2 className={styles.emptyTitle}>Aún no tienes favoritos</h2>
            <p className={styles.emptySubtitle}>
              Guarda tus fresas con crema y postres favoritos para encontrarlos al instante en tu próxima visita.
            </p>
            <button className={styles.emptyBtn} onClick={() => router.push('/')}>
              Explorar Menú 🍓
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {favoriteProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
