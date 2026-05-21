'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './PromoBanner.module.css';

interface PromoSlide {
  id: string;
  frames: string[];
  link: string;
  alt: string;
}

const slides: PromoSlide[] = [
  {
    id: 'fresas-con-crema',
    frames: [
      '/images/products/fresas-frame1.png',
      '/images/products/fresas-frame2.png',
      '/images/products/fresas-frame3.png',
    ],
    link: '/producto/fresas-con-crema-14oz',
    alt: 'Fresas con Crema',
  },
  {
    id: 'merengon',
    frames: [
      '/images/products/merengon-frame1.png',
      '/images/products/merengon-frame2.png',
      '/images/products/merengon-frame3.png',
    ],
    link: '/producto/merengon-deluxe',
    alt: 'Merengón Deluxe',
  },
  {
    id: 'shakes',
    frames: [
      '/images/products/strawberry-kiss.png',
      '/images/products/strawberry-kiss.png',
      '/images/products/strawberry-kiss.png',
    ],
    link: '/producto/strawberry-kiss',
    alt: 'Strawberry Kiss',
  },
  {
    id: 'bowls',
    frames: [
      '/images/products/dolce-bowl.png',
      '/images/products/dolce-bowl.png',
      '/images/products/dolce-bowl.png',
    ],
    link: '/producto/dolce-bowl',
    alt: 'Dolce Bowl',
  },
  {
    id: 'chocolate',
    frames: [
      '/images/products/choco-amore.png',
      '/images/products/choco-amore.png',
      '/images/products/choco-amore.png',
    ],
    link: '/producto/choco-amore',
    alt: 'Choco Amore',
  },
];

export default function PromoBanner() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [frameIndices, setFrameIndices] = useState<number[]>(
    slides.map(() => 0)
  );
  const [hasAnimated, setHasAnimated] = useState<boolean[]>(
    slides.map(() => false)
  );

  // Observe which slide is currently visible
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const slideEls = container.querySelectorAll(`.${styles.slide}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActiveSlide(idx);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );
    slideEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Animate frames when a slide becomes active (only once)
  useEffect(() => {
    if (hasAnimated[activeSlide]) return;
    const totalFrames = slides[activeSlide].frames.length;
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        clearInterval(interval);
        setHasAnimated((prev) => {
          const next = [...prev];
          next[activeSlide] = true;
          return next;
        });
        return;
      }
      setFrameIndices((prev) => {
        const next = [...prev];
        next[activeSlide] = frame;
        return next;
      });
    }, 350);
    return () => clearInterval(interval);
  }, [activeSlide, hasAnimated]);

  // Scroll-driven frame advancement as a secondary mechanism
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const slideWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;

    slides.forEach((slide, i) => {
      const slideStart = i * slideWidth;
      const offset = scrollLeft - slideStart;
      const progress = Math.max(0, Math.min(1, offset / (slideWidth * 0.5)));
      const frameIdx = Math.min(
        slide.frames.length - 1,
        Math.floor(progress * slide.frames.length)
      );
      if (frameIdx > 0) {
        setFrameIndices((prev) => {
          if (prev[i] >= frameIdx) return prev;
          const next = [...prev];
          next[i] = frameIdx;
          return next;
        });
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.scrollWrap} hide-scrollbar`}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {slides.map((slide, i) => (
          <Link
            key={slide.id}
            href={slide.link}
            className={styles.slide}
            data-index={i}
          >
            <div className={styles.imageWrapper}>
              {slide.frames.map((frame, fi) => (
                <img
                  key={fi}
                  src={frame}
                  alt={`${slide.alt} frame ${fi + 1}`}
                  className={`${styles.frameImg} ${
                    fi === frameIndices[i] ? styles.frameVisible : ''
                  }`}
                  loading={fi === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              activeSlide === index ? styles.dotActive : ''
            }`}
            onClick={() => {
              const container = scrollRef.current;
              if (container) {
                container.scrollTo({
                  left: index * container.clientWidth,
                  behavior: 'smooth',
                });
              }
            }}
            aria-label={`Ir al banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
