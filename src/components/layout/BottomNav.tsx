'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import styles from './BottomNav.module.css';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/favoritos', label: 'Favoritos', icon: Heart },
  { href: '/carrito', label: 'Carrito', icon: ShoppingCart, showBadge: true },
  { href: '/perfil', label: 'Perfil', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {navItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={`${styles.item} ${isActive ? styles.active : ''}`}>
              <div className={styles.iconWrap}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                {item.showBadge && mounted && totalItems > 0 && (
                  <span className={styles.badge}>{totalItems > 9 ? '9+' : totalItems}</span>
                )}
              </div>
              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

