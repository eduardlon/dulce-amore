'use client';

import { useState, useMemo, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Heart, ShoppingCart, Minus, Plus, Gift, Check } from 'lucide-react';
import { getProductById } from '@/data/products';
import { toppings as allToppings, FREE_TOPPINGS_COUNT, EXTRA_TOPPING_PRICE } from '@/data/toppings';
import { getCategoryBySlug } from '@/data/categories';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { formatPrice } from '@/lib/formatPrice';
import { Topping } from '@/types/product';
import styles from './page.module.css';

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params);
  const product = getProductById(id);
  if (!product) notFound();

  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const totalItems = useCartStore((s) => s.totalItems());
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const fav = isFavorite(product.id);
  const category = getCategoryBySlug(product.category);

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentSize = product.sizes?.[selectedSizeIndex];
  const basePrice = currentSize?.price || product.basePrice;

  const extraToppingsCount = Math.max(0, selectedToppings.length - FREE_TOPPINGS_COUNT);
  const toppingsPrice = extraToppingsCount * EXTRA_TOPPING_PRICE;
  const unitPrice = basePrice + toppingsPrice;
  const totalPrice = unitPrice * quantity;

  const selectedToppingObjects = useMemo(() =>
    allToppings.filter(t => selectedToppings.includes(t.id)),
    [selectedToppings]
  );

  const handleToggleTopping = (toppingId: string) => {
    setSelectedToppings(prev =>
      prev.includes(toppingId)
        ? prev.filter(id => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      size: currentSize ? { label: currentSize.label, price: currentSize.price } : undefined,
      toppings: selectedToppingObjects,
      quantity,
      unitPrice,
      totalPrice,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
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
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <button className={styles.iconBtn} onClick={() => router.back()}>
          <ChevronLeft size={24} />
        </button>
        <img src="/images/logo/logodolce.webp" alt="Dolce Amore" className={styles.logo} />
        <div className={styles.headerRight}>
          <motion.button
            className={`${styles.iconBtn} ${fav ? styles.favActive : ''}`}
            onClick={() => toggleFavorite(product.id)}
            whileTap={{ scale: 0.8 }}
          >
            <Heart size={20} fill={fav ? '#E8567F' : 'none'} stroke={fav ? '#E8567F' : 'currentColor'} />
          </motion.button>
          <button className={styles.iconBtn} onClick={() => router.push('/carrito')}>
            <ShoppingCart size={20} />
            {mounted && totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </button>
        </div>
      </header>

      {/* Product Hero */}
      <motion.div
        className={styles.hero}
        style={{ background: category?.bgColor || '#FFE4EC' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={styles.heroInfo}>
          <h1 className={styles.productName}>
            {product.name} {categoryEmojis[product.category]}
          </h1>
          <p className={styles.productDesc}>{product.description}</p>
          {product.allowsToppings && (
            <div className={styles.freeBadge}>
              <Gift size={14} />
              <span>Incluye salsa gratis + 1 topping gratis</span>
            </div>
          )}
          <div className={styles.priceArea}>
            <span className={styles.priceLabel}>Desde</span>
            <span className={styles.priceValue}>{formatPrice(product.basePrice)}</span>
          </div>
        </div>
        <div className={styles.heroImage}>
          <motion.div
            initial={{ scale: 0.85, rotate: -6 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <img src={product.image} alt={product.name} className={styles.productHeroImg} />
          </motion.div>
          <div className={styles.floatDecor1}>💖</div>
          <div className={styles.floatDecor2}>✨</div>
        </div>
      </motion.div>


      {/* Customization Area */}
      <div className={styles.customization}>
        {/* Size Selector */}
        {product.sizes && product.sizes.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>🧃 Elige el tamaño</h2>
            <div className={styles.sizeGrid}>
              {product.sizes.map((size, i) => (
                <motion.button
                  key={size.label}
                  className={`${styles.sizeCard} ${selectedSizeIndex === i ? styles.sizeActive : ''}`}
                  onClick={() => setSelectedSizeIndex(i)}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={styles.sizeIcon}>🥤</div>
                  <span className={styles.sizeLabel}>{size.label}</span>
                  <span className={styles.sizePrice}>{formatPrice(size.price)}</span>
                  <div className={`${styles.radioCircle} ${selectedSizeIndex === i ? styles.radioActive : ''}`}>
                    {selectedSizeIndex === i && <Check size={12} color="white" strokeWidth={3} />}
                  </div>
                </motion.button>
              ))}
            </div>
          </section>
        )}

        {/* Topping Selector */}
        {product.allowsToppings && (
          <section className={styles.section}>
            <div className={styles.toppingHeader}>
              <h2 className={styles.sectionTitle}>🍰 Elige tu topping <span className={styles.toppingHint}>({FREE_TOPPINGS_COUNT} incluido)</span></h2>
              <span className={styles.freeTag}><Gift size={12} /> 1 topping gratis</span>
            </div>
            <div className={styles.toppingGrid}>
              {allToppings.map((topping) => {
                const isSelected = selectedToppings.includes(topping.id);
                return (
                  <motion.button
                    key={topping.id}
                    className={`${styles.toppingCard} ${isSelected ? styles.toppingActive : ''}`}
                    onClick={() => handleToggleTopping(topping.id)}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={styles.toppingImg}>
                      {topping.id === 'zucaritas' && '🥣'}
                      {topping.id === 'chocokrispy' && '🍫'}
                      {topping.id === 'salsa-de-fresa' && '🍓'}
                      {topping.id === 'arequipe' && '🍯'}
                      {topping.id === 'salsa-de-mora' && '🫐'}
                      {topping.id === 'lechera' && '🥛'}
                    </div>
                    <span className={styles.toppingName}>{topping.name}</span>
                    <div className={`${styles.radioCircle} ${isSelected ? styles.radioActive : ''}`}>
                      {isSelected && <Check size={12} color="white" strokeWidth={3} />}
                    </div>
                  </motion.button>
                );
              })}
            </div>
            <div className={styles.extraInfo}>
              <span>➕ Extra topping</span>
              <span className={styles.extraPrice}>{formatPrice(EXTRA_TOPPING_PRICE)}</span>
            </div>
          </section>
        )}

        {/* Quantity */}
        <section className={styles.quantitySection}>
          <span className={styles.quantityLabel}>Cantidad</span>
          <div className={styles.quantityControls}>
            <motion.button
              className={styles.qtyBtn}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              whileTap={{ scale: 0.85 }}
            >
              <Minus size={18} />
            </motion.button>
            <motion.span
              key={quantity}
              className={styles.qtyValue}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
            >
              {quantity}
            </motion.span>
            <motion.button
              className={styles.qtyBtn}
              onClick={() => setQuantity(quantity + 1)}
              whileTap={{ scale: 0.85 }}
            >
              <Plus size={18} />
            </motion.button>
          </div>
        </section>
      </div>

      {/* Add to Cart Bar */}
      <div className={styles.cartBar}>
        <motion.button
          className={styles.addToCartBtn}
          onClick={handleAddToCart}
          whileTap={{ scale: 0.97 }}
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={styles.addedText}
              >
                ✅ ¡Agregado al carrito!
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={styles.cartBtnContent}
              >
                <ShoppingCart size={20} />
                <span>Agregar al carrito</span>
                <span className={styles.cartBtnPrice}>{formatPrice(totalPrice)}</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        <p className={styles.freshNote}>✅ Producto fresco • Hecho al momento</p>
      </div>
    </div>
  );
}
