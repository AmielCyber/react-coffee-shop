import React from 'react';
import styles from './ReceiptItem.module.css';

export default function ReceiptItem(props) {
  const { name, price, qty } = props;
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
