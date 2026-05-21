'use client';

import { motion } from 'framer-motion';
import { Category } from '@/types/category';
import styles from './CategoryHero.module.css';

interface CategoryHeroProps {
  category: Category;
}

export default function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <motion.div
      className={styles.hero}
      style={{ background: `linear-gradient(135deg, ${category.bgColor}, ${category.bgColor}dd)` }}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      key={category.slug}
    >
      <div className={styles.content}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {category.heroTitle} {category.heroEmoji}
        </motion.h1>
        <motion.p
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {category.heroDescription}
        </motion.p>
        <motion.p
          className={styles.phrase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {category.heroPhrase}
        </motion.p>
      </div>
      <div className={styles.imageArea}>
        <motion.div
          className={styles.mainEmoji}
          initial={{ scale: 0.85 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        >
          <span>{category.heroEmoji}</span>
        </motion.div>
        <div className={styles.floatingHeart}>💖</div>
        <div className={styles.floatingHeart2}>✨</div>
      </div>

      <div className={styles.dots}>
        <span className={`${styles.dot} ${styles.dotActive}`} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </motion.div>
  );
}
