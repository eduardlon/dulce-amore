export function formatPrice(price: number): string {
  return '$' + price.toLocaleString('es-CO');
}

export function formatPriceShort(price: number): string {
  if (price >= 1000) {
    const k = price / 1000;
    return '$' + (Number.isInteger(k) ? k.toFixed(0) : k.toFixed(1)) + '.000';
  }
  return '$' + price.toString();
}
