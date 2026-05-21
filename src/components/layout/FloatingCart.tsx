'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import styles from './FloatingCart.module.css';

export default function FloatingCart() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide on cart page, when cart is empty, or during SSR
  if (!mounted || pathname === '/carrito' || totalItems === 0) return null;


  return (
    <AnimatePresence>
      <motion.div
        className={styles.container}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Link href="/carrito" className={styles.button}>
          <ShoppingCart size={24} color="white" />
          <motion.span
            key={totalItems}
            className={styles.badge}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            {totalItems > 9 ? '9+' : totalItems}
          </motion.span>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
