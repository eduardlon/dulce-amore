import type { Metadata, Viewport } from 'next';
import './globals.css';
import BottomNav from '@/components/layout/BottomNav';
import FloatingCart from '@/components/layout/FloatingCart';
import PWAInstall from '@/components/layout/PWAInstall';

export const metadata: Metadata = {
  title: 'Dolce Amore – Fresas y Crema',
  description: 'Dulcería artesanal especializada en postres fríos, fresas con crema, helados, merengones, obleas, shakes, bowls y productos con chocolate.',
  keywords: 'dolce amore, fresas con crema, postres, helados, merengón, obleas, shakes, bowls, chocolate, dulcería',
  openGraph: {
    title: 'Dolce Amore – Fresas y Crema',
    description: 'Frescura y dulzura en cada antojo. Pide tus postres favoritos.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#E8567F',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" href="/images/logo/logo-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Dolce Amore" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <main>
          {children}
        </main>
        <BottomNav />
        <FloatingCart />
        <PWAInstall />
      </body>
    </html>
  );
}
