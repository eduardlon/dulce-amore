'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User,
  Heart,
  ShoppingCart,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  Share2,
  ChevronRight,
  Info
} from 'lucide-react';
import Header from '@/components/layout/Header';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useCartStore } from '@/store/cartStore';
import styles from './page.module.css';

export default function ProfilePage() {
  const router = useRouter();
  const favoritesCount = useFavoritesStore((s) => s.favorites.length);
  const cartItemsCount = useCartStore((s) => s.totalItems());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Dolce Amore – Fresas y Crema',
        text: '¡Mira los deliciosos postres y fresas con crema de Dolce Amore! 🍓🍦',
        url: window.location.origin,
      });
    }
  };

  return (
    <div className="page-container">
      <Header showBack />

      <div className={styles.container}>
        {/* User Card */}
        <div className={styles.profileCard}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>🍓</div>
            <div className={styles.avatarBadge}>✨</div>
          </div>
          <div className={styles.profileInfo}>
            <h2 className={styles.profileName}>Dulce Invitado</h2>
            <span className={styles.profileTag}>Socio Dolce Premium</span>
          </div>
        </div>

        {/* Loyalty Points */}
        <div className={styles.pointsCard}>
          <div className={styles.pointsHeader}>
            <span className={styles.pointsTitle}>🍦 Dolce Puntos</span>
            <span className={styles.pointsValue}>250 pts</span>
          </div>
          <div className={styles.progressBg}>
            <div className={styles.progressBar} style={{ width: '50%' }} />
          </div>
          <p className={styles.pointsNote}>Te faltan 250 puntos para tu próximo postre gratis 🎁</p>
        </div>

        {/* Quick Stats Grid */}
        <div className={styles.statsGrid}>
          <button className={styles.statCard} onClick={() => router.push('/favoritos')}>
            <Heart size={22} className={styles.statIconFav} />
            <span className={styles.statVal}>{favoritesCount}</span>
            <span className={styles.statLabel}>Favoritos</span>
          </button>
          <button className={styles.statCard} onClick={() => router.push('/carrito')}>
            <ShoppingCart size={22} className={styles.statIconCart} />
            <span className={styles.statVal}>{cartItemsCount}</span>
            <span className={styles.statLabel}>En Carrito</span>
          </button>
        </div>

        {/* Store Information */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>📍 Información del Local</h3>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <MapPin size={18} className={styles.infoIcon} />
              <div className={styles.infoText}>
                <span className={styles.infoLabel}>Dirección</span>
                <span className={styles.infoValue}>Calle Rosas 123, Barrio Dulce</span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <Clock size={18} className={styles.infoIcon} />
              <div className={styles.infoText}>
                <span className={styles.infoLabel}>Horario</span>
                <span className={styles.infoValue}>Lun - Dom: 1:00 PM - 10:00 PM</span>
              </div>
            </div>
            <a href="tel:+573219876543" className={styles.infoItem}>
              <Phone size={18} className={styles.infoIcon} />
              <div className={styles.infoText}>
                <span className={styles.infoLabel}>Teléfono / WhatsApp</span>
                <span className={styles.infoValue}>+57 321 987 6543</span>
              </div>
              <ChevronRight size={16} className={styles.chevron} />
            </a>
          </div>
        </section>

        {/* Social / Sharing */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>✨ Comunidad</h3>
          <div className={styles.infoList}>
            <a href="https://instagram.com/dolceamore.fresas" target="_blank" rel="noopener noreferrer" className={styles.infoItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.infoIconInsta}
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <div className={styles.infoText}>
                <span className={styles.infoLabel}>Síguenos en Instagram</span>
                <span className={styles.infoValue}>@dolceamore.fresas</span>
              </div>
              <ChevronRight size={16} className={styles.chevron} />
            </a>
            <button className={styles.infoItem} onClick={handleShare}>
              <Share2 size={18} className={styles.infoIconShare} />
              <div className={styles.infoText}>
                <span className={styles.infoLabel}>Comparte con tus amigos</span>
                <span className={styles.infoValue}>Recomienda nuestra app web</span>
              </div>
              <ChevronRight size={16} className={styles.chevron} />
            </button>
          </div>
        </section>

        {/* Footer info */}
        <div className={styles.footer}>
          <div className={styles.footerLogo}>Dolce Amore 🍓</div>
          <p className={styles.footerText}>v1.0.0 • Hecho con Amor 💖</p>
        </div>
      </div>
    </div>
  );
}
