'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './HomeHeader.module.css';

export default function HomeHeader() {
  const [greetingName, setGreetingName] = useState('¡Hola, Valeria! 👋');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreetingName('¡Buenos días, Valeria! 👋');
    else if (hour < 18) setGreetingName('¡Buenas tardes, Valeria! 👋');
    else setGreetingName('¡Buenas noches, Valeria! 👋');
  }, []);

  return (
    <header className={styles.header}>
      {/* User Greeting (Left) */}
      <div className={styles.greetingWrap}>
        <span className={styles.greetingText}>{greetingName}</span>
        <span className={styles.subtitleText}>¿Qué dulce antojo vamos a preparar hoy?</span>
      </div>

      {/* Brand Logo (Center) */}
      <Link href="/" className={styles.logoLink}>
        <motion.div
          className={styles.logoContainer}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/images/logo/logodolce.webp" alt="Dolce Amore" className={styles.logoImg} />
        </motion.div>
      </Link>

      {/* Notification Bell (Right) */}
      <div className={styles.actionsWrap}>
        <button className={styles.bellBtn} aria-label="Notificaciones">
          <Bell size={22} className={styles.bellIcon} />
          <span className={styles.bellBadge}>3</span>
        </button>
      </div>
    </header>
  );
}

