'use client';

import styles from './Greeting.module.css';

export default function Greeting() {
  const hour = new Date().getHours();
  let greeting = '¡Hola!';
  if (hour < 12) greeting = '¡Buenos días!';
  else if (hour < 18) greeting = '¡Buenas tardes!';
  else greeting = '¡Buenas noches!';

  return (
    <div className={styles.container}>
      <h1 className={styles.greeting}>{greeting} 👋</h1>
      <p className={styles.subtitle}>¿Qué dulce antojo vamos a preparar hoy?</p>
    </div>
  );
}
