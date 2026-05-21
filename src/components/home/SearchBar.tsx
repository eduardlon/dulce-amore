'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.inputWrap}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="text"
          className={styles.input}
          placeholder="Buscar postres, helados, shakes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar productos"
        />
        <button type="button" className={styles.filterBtn} aria-label="Filtros">
          <SlidersHorizontal size={18} />
        </button>
      </div>
    </form>
  );
}
