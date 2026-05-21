'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/formatPrice';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const badgeLabels: Record<string, string> = {
  'mas-pedido': '⭐ Más pedido',
  'popular': '🔥 Popular',
  'nuevo': '✨ Nuevo',
};

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const addItem = useCartStore((s) => s.addItem);
  const fav = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      size: product.sizes ? { label: product.sizes[0].label, price: product.sizes[0].price } : undefined,
      toppings: [],
      quantity: 1,
      unitPrice: product.basePrice,
      totalPrice: product.basePrice,
    });
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const categoryEmojis: Record<string, string> = {
    'fresas-con-crema': '🍓',
    'merengon': '🍰',
    'obleas': '🧇',
    'shakes': '🥤',
    'bowls': '🍨',
    'chocolate': '🍫',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
    >
      <Link href={`/producto/${product.id}`} className={styles.card}>
        <div className={styles.imageWrap}>
          <div className={styles.imagePlaceholder}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImg}
              loading="lazy"
            />
          </div>
          {product.badge && (
            <span className={`${styles.badge} ${styles[`badge-${product.badge}`]}`}>
              {badgeLabels[product.badge]}
            </span>
          )}
          <motion.button
            className={`${styles.favBtn} ${fav ? styles.favActive : ''}`}
            onClick={handleFavorite}
            whileTap={{ scale: 0.8 }}
            aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <Heart size={16} fill={fav ? '#E8567F' : 'none'} stroke={fav ? '#E8567F' : '#9B8A8A'} />
          </motion.button>
        </div>

        <div className={styles.info}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.desc}>{product.shortDescription}</p>
          <div className={styles.bottom}>
            <span className={styles.price}>{formatPrice(product.basePrice)}</span>
            <motion.button
              className={styles.addBtn}
              onClick={handleAddToCart}
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.1 }}
              aria-label="Agregar al carrito"
            >
              <Plus size={18} color="white" strokeWidth={3} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
