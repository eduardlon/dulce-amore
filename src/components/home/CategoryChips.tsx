'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { categories } from '@/data/categories';
import styles from './CategoryChips.module.css';

interface CategoryChipsProps {
  activeSlug?: string;
}

export default function CategoryChips({ activeSlug }: CategoryChipsProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.scrollWrap} hide-scrollbar`}>
        {categories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <Link
              href={`/categoria/${cat.slug}`}
              className={`${styles.chip} ${activeSlug === cat.slug ? styles.active : ''}`}
            >
              <span className={styles.icon}>{cat.icon}</span>
              <span className={styles.label}>{cat.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
