import React from 'react';
// My import.
import ReceiptItem from './ReceiptItem';
// CSS import.
import styles from './Receipt.module.css';

/**
 * Gets the list of Receipt Item components.
 * @param {CartItems} items
 * @param {string} date local date string.
 * @returns An array of ReceiptItem components.
 */
function getReceiptItems(items, date) {
  const itemList = items.map((item) => {
    return <ReceiptItem key={item.name + ':' + date} name={item.name} price={item.price} qty={item.amount} />;
  });
  return itemList;
}

export default function Receipt({ items, totalItems, totalPrice, orderDate, showReceiptItems }) {
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;
  const localDate = orderDate.toLocaleString();
  const summaryStyles = `${styles.summary} ${showReceiptItems ? styles.divider : ''}`;

  return (
    <div className={styles.receipt}>
      <div className={styles.date}>
        <h3>Order Date</h3>
        <span>{localDate}</span>
      </div>
      {showReceiptItems && (
        <div className={styles.receiptItems}>
          <ul>{getReceiptItems(items, localDate)}</ul>
        </div>
      )}
      <div className={summaryStyles}>
        <div className={styles.totalItems}>
          <h3>Total Items</h3>
          <span>{totalItems}</span>
        </div>
        <div className={styles.totalPrice}>
          <h3>Total Price</h3>
          <span className={styles.price}>{formattedTotalPrice}</span>
        </div>
      </div>
    </div>
  );
}
