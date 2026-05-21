'use client';

import { useEffect, useState, useCallback } from 'react';
import styles from './PWAInstall.module.css';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('Service Worker registered:', reg.scope);
        })
        .catch((err) => {
          console.log('Service Worker registration failed:', err);
        });
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if user dismissed the banner before (respect for 7 days)
    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedAt < sevenDays) {
        return;
      }
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Detect if app was installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowBanner(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setShowBanner(false);
    localStorage.setItem('pwa-banner-dismissed', Date.now().toString());
  }, []);

  if (!mounted || isInstalled || !showBanner) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <img
          src="/images/logo/logo-96.png"
          alt="Dolce Amore"
          className={styles.icon}
          width={48}
          height={48}
        />
        <div className={styles.text}>
          <strong className={styles.title}>Instalar Dolce Amore</strong>
          <span className={styles.subtitle}>Acceso directo desde tu pantalla</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.dismissBtn} onClick={handleDismiss}>
          Ahora no
        </button>
        <button className={styles.installBtn} onClick={handleInstall}>
          Instalar
        </button>
      </div>
    </div>
  );
}
