import React from 'react';
// CSS import.
import styles from './ReceiptItem.module.css';

export default function ReceiptItem({ name, price, qty }) {
  const formattedPrice = `$${price.toFixed(2)}`;

  return (
    <li className={styles.receiptItem}>
      <div className={styles.item}>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.qty}>x {qty}</span>
      </div>
      <span className={styles.price}>{formattedPrice}</span>
    </li>
  );
}
