'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ShoppingCart,
  Trash2,
  MapPin,
  Clock,
  Utensils,
  CreditCard,
  MessageSquare,
  ArrowRight,
  Gift
} from 'lucide-react';
import Header from '@/components/layout/Header';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/formatPrice';
import { OrderType, PaymentMethod } from '@/types/cart';
import styles from './page.module.css';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    orderInfo,
    updateQuantity,
    removeItem,
    clearCart,
    setOrderType,
    setTableNumber,
    setDeliveryAddress,
    setDeliveryReference,
    setPickupTime,
    setPaymentMethod,
    setNotes,
    subtotal,
    deliveryFee,
    total,
  } = useCartStore();

  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);

  // Avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleSendOrder = () => {
    setLoading(true);
    // Build WhatsApp Message
    const emojiMap: Record<OrderType, string> = {
      'en-el-local': '🍽️ En el local',
      'domicilio': '🛵 Domicilio',
      'para-llevar': '🛍️ Para llevar',
    };

    let orderDetails = `*🍓 DOLCE AMORE - NUEVO PEDIDO 🍓*\n`;
    orderDetails += `-----------------------------------------\n`;
    orderDetails += `*Tipo de Entrega:* ${emojiMap[orderInfo.orderType]}\n`;

    if (orderInfo.orderType === 'en-el-local') {
      orderDetails += `*Mesa:* ${orderInfo.tableNumber || 'No especificada'}\n`;
    } else if (orderInfo.orderType === 'domicilio') {
      orderDetails += `*Dirección:* ${orderInfo.deliveryAddress}\n`;
      if (orderInfo.deliveryReference) {
        orderDetails += `*Referencia:* ${orderInfo.deliveryReference}\n`;
      }
    } else if (orderInfo.orderType === 'para-llevar') {
      orderDetails += `*Hora de recogida:* ${orderInfo.pickupTime || 'Pronto'}\n`;
    }

    orderDetails += `*Método de Pago:* ${orderInfo.paymentMethod === 'efectivo' ? '💵 Efectivo' : '💳 Transferencia'}\n`;
    if (orderInfo.notes) {
      orderDetails += `*Notas:* ${orderInfo.notes}\n`;
    }
    orderDetails += `-----------------------------------------\n`;
    orderDetails += `*PRODUCTOS:*\n`;

    items.forEach((item) => {
      orderDetails += `• ${item.quantity}x ${item.name}`;
      if (item.size) {
        orderDetails += ` (${item.size.label})`;
      }
      orderDetails += ` - *${formatPrice(item.totalPrice)}*\n`;
      if (item.toppings.length > 0) {
        orderDetails += `   _Toppings: ${item.toppings.map((t) => t.name).join(', ')}_\n`;
      }
    });

    orderDetails += `-----------------------------------------\n`;
    orderDetails += `*Subtotal:* ${formatPrice(subtotal())}\n`;
    if (orderInfo.orderType === 'domicilio') {
      orderDetails += `*Costo de envío:* ${formatPrice(deliveryFee())}\n`;
    }
    orderDetails += `*TOTAL A PAGAR: ${formatPrice(total())}*\n\n`;
    orderDetails += `¡Muchas gracias por elegir Dolce Amore! 💖`;

    // Encode URI
    const encodedText = encodeURIComponent(orderDetails);
    // WhatsApp link (Dolce Amore official number placeholder)
    const whatsappUrl = `https://wa.me/573219876543?text=${encodedText}`;

    // Trigger confetti if library allows or just redirect
    import('canvas-confetti').then((confetti) => {
      confetti.default({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E8567F', '#FFC1CC', '#5C1A32', '#FFF5F7'],
      });
    });

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      clearCart();
      setLoading(false);
      router.push('/perfil'); // Go to orders/profile area
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="page-container">
        <Header showBack />
        <div className={styles.emptyContainer}>
          <motion.div
            className={styles.emptyIconWrap}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <ShoppingCart size={64} className={styles.emptyIcon} />
          </motion.div>
          <h2 className={styles.emptyTitle}>Tu carrito está vacío</h2>
          <p className={styles.emptySubtitle}>Agrega las más deliciosas fresas con crema, merengones o shakes para empezar.</p>
          <button className={styles.emptyBtn} onClick={() => router.push('/')}>
            Ver Menú 🍓
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header showBack />

      <div className={styles.container}>
        <div className={styles.titleRow}>
          <h1 className={styles.pageTitle}>🛒 Tu Carrito</h1>
          <button className={styles.clearBtn} onClick={clearCart}>
            <Trash2 size={16} /> Vaciar
          </button>
        </div>

        {/* Cart Items List */}
        <div className={styles.itemsList}>
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                className={styles.itemCard}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                layout
              >
                <div className={styles.itemEmoji}>🍓</div>
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  {item.size && <span className={styles.itemMeta}>Tamaño: {item.size.label}</span>}
                  {item.toppings.length > 0 && (
                    <p className={styles.itemToppings}>
                      Toppings: {item.toppings.map((t) => t.name).join(', ')}
                    </p>
                  )}
                  <span className={styles.itemPrice}>{formatPrice(item.totalPrice)}</span>
                </div>
                <div className={styles.qtyControls}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className={styles.qtyVal}>{item.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Delivery Type Selection */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🛵 ¿Cómo quieres tu pedido?</h2>
          <div className={styles.typeGrid}>
            <button
              className={`${styles.typeCard} ${orderInfo.orderType === 'en-el-local' ? styles.typeActive : ''}`}
              onClick={() => setOrderType('en-el-local')}
            >
              <Utensils size={20} />
              <span>En el local</span>
            </button>
            <button
              className={`${styles.typeCard} ${orderInfo.orderType === 'domicilio' ? styles.typeActive : ''}`}
              onClick={() => setOrderType('domicilio')}
            >
              <MapPin size={20} />
              <span>Domicilio</span>
            </button>
            <button
              className={`${styles.typeCard} ${orderInfo.orderType === 'para-llevar' ? styles.typeActive : ''}`}
              onClick={() => setOrderType('para-llevar')}
            >
              <Clock size={20} />
              <span>Para llevar</span>
            </button>
          </div>

          {/* Dynamic input sections based on order type */}
          <div className={styles.deliveryDetails}>
            {orderInfo.orderType === 'en-el-local' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.inputGroup}
              >
                <label className={styles.label}>Número de Mesa</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Ej. Mesa 4, Barra, Terraza..."
                  value={orderInfo.tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                />
              </motion.div>
            )}

            {orderInfo.orderType === 'domicilio' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.domicilioFields}
              >
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Dirección de Entrega *</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Ej. Calle 10 # 5-20, Apto 302..."
                    value={orderInfo.deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Indicaciones / Punto de Referencia</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Ej. Al frente del parque principal, puerta rosada..."
                    value={orderInfo.deliveryReference}
                    onChange={(e) => setDeliveryReference(e.target.value)}
                  />
                </div>
                <div className={styles.promoAlert}>
                  <Gift size={14} />
                  <span>Costo de envío fijo a toda la zona: {formatPrice(5000)}</span>
                </div>
              </motion.div>
            )}

            {orderInfo.orderType === 'para-llevar' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.inputGroup}
              >
                <label className={styles.label}>Hora de Recogida aproximada</label>
                <input
                  type="time"
                  className={styles.input}
                  value={orderInfo.pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                />
              </motion.div>
            )}
          </div>
        </section>

        {/* Payment Method */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>💵 Método de Pago</h2>
          <div className={styles.paymentGrid}>
            <button
              className={`${styles.payCard} ${orderInfo.paymentMethod === 'efectivo' ? styles.payActive : ''}`}
              onClick={() => setPaymentMethod('efectivo')}
            >
              <div className={styles.payDot}>
                {orderInfo.paymentMethod === 'efectivo' && <div className={styles.payDotInner} />}
              </div>
              <span className={styles.payLabel}>Efectivo</span>
            </button>
            <button
              className={`${styles.payCard} ${orderInfo.paymentMethod === 'transferencia' ? styles.payActive : ''}`}
              onClick={() => setPaymentMethod('transferencia')}
            >
              <div className={styles.payDot}>
                {orderInfo.paymentMethod === 'transferencia' && <div className={styles.payDotInner} />}
              </div>
              <span className={styles.payLabel}>Nequi / Bancolombia</span>
            </button>
          </div>
        </section>

        {/* Additional Notes */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>✍️ Notas adicionales</h2>
          <div className={styles.notesGroup}>
            <textarea
              className={styles.textarea}
              placeholder="Ej. Crema extra, sin lechera, empacar por separado..."
              value={orderInfo.notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </section>

        {/* Order Summary */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📊 Resumen de tu pedido</h2>
          <div className={styles.summaryTable}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span className={styles.summaryValue}>{formatPrice(subtotal())}</span>
            </div>
            {orderInfo.orderType === 'domicilio' && (
              <div className={styles.summaryRow}>
                <span>Envío</span>
                <span className={styles.summaryValue}>{formatPrice(deliveryFee())}</span>
              </div>
            )}
            <div className={`${styles.summaryRow} ${styles.summaryTotalRow}`}>
              <span>Total a Pagar</span>
              <span className={styles.totalValue}>{formatPrice(total())}</span>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Bottom Send Button */}
      <div className={styles.actionBlock}>
        <button
          className={styles.sendBtn}
          onClick={handleSendOrder}
          disabled={loading || (orderInfo.orderType === 'domicilio' && !orderInfo.deliveryAddress)}
        >
          {loading ? (
            <span>Procesando...</span>
          ) : (
            <>
              <span>Enviar Pedido a WhatsApp</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
