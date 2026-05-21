'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Heart, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import styles from './Header.module.css';

interface HeaderProps {
  showBack?: boolean;
  transparent?: boolean;
}

export default function Header({ showBack = false, transparent = false }: HeaderProps) {
  const router = useRouter();
  const totalItems = useCartStore((s) => s.totalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className={`${styles.header} ${transparent ? styles.transparent : ''}`}>
      <div className={styles.left}>
        {showBack && (
          <button className={styles.iconBtn} onClick={() => router.back()} aria-label="Volver">
            <ChevronLeft size={24} />
          </button>
        )}
      </div>

      <Link href="/" className={styles.logoWrap}>
        <img src="/images/logo/logodolce.webp" alt="Dolce Amore" className={styles.logoImg} />
      </Link>

      <div className={styles.right}>
        <Link href="/favoritos" className={styles.iconBtn} aria-label="Favoritos">
          <Heart size={22} />
        </Link>
        <Link href="/carrito" className={styles.iconBtn} aria-label="Carrito">
          <ShoppingCart size={22} />
          {mounted && totalItems > 0 && (
            <span className={styles.badge}>{totalItems > 9 ? '9+' : totalItems}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

