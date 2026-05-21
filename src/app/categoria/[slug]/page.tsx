'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';
import Header from '@/components/layout/Header';
import SearchBar from '@/components/home/SearchBar';
import CategoryChips from '@/components/home/CategoryChips';
import CategoryHero from '@/components/category/CategoryHero';
import ProductCard from '@/components/product/ProductCard';
import { getCategoryBySlug } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: Props) {
  const { slug } = use(params);
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return (
    <div className="page-container">
      <Header showBack />
      <SearchBar />
      <CategoryChips activeSlug={slug} />
      <CategoryHero category={category} />

      <section className={styles.productsSection}>
        <div className={styles.grid}>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
