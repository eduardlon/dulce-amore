'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Header from '@/components/layout/Header';
import SearchBar from '@/components/home/SearchBar';
import ProductCard from '@/components/product/ProductCard';
import { searchProducts } from '@/data/products';
import styles from './page.module.css';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (query) {
      setResults(searchProducts(query));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {query ? `🔍 Resultados para "${query}"` : '🔍 Buscar'}
      </h1>

      {results.length === 0 ? (
        <div className={styles.noResults}>
          <span className={styles.noResultsEmoji}>🍓👀</span>
          <p className={styles.noResultsText}>No encontramos resultados para tu búsqueda.</p>
          <p className={styles.noResultsHint}>Intenta buscando "fresas", "merengon", "oblea" o "shakes".</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {results.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="page-container">
      <Header showBack />
      <SearchBar />
      <Suspense fallback={
        <div className={styles.container}>
          <h1 className={styles.title}>Cargando búsqueda...</h1>
        </div>
      }>
        <SearchResults />
      </Suspense>
    </div>
  );
}
