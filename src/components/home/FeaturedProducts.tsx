'use client';

import Link from 'next/link';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import styles from './FeaturedProducts.module.css';

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>✨ Destacados</h2>
        <Link href="/categoria/fresas-con-crema" className={styles.seeAll}>
          Ver todo →
        </Link>
      </div>
      <div className={styles.grid}>
        {featured.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
