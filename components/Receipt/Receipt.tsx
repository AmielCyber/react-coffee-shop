import React from "react";
// My import.
import type DrinkItem from "../../models/DrinkItem";
import type Order from "../../models/Order";
import ReceiptItem from "./ReceiptItem";
// CSS import.
import styles from "./Receipt.module.css";

/**
 * Gets the list of Receipt Item components.
 * @param {DrinkItem[]} items
 * @param {string} date local date string.
 * @returns An array of ReceiptItem components.
 */
const getReceiptItems = (items: DrinkItem[], date: string) => {
  const itemList = items.map((item: DrinkItem) => {
    return (
      <ReceiptItem
        key={item.name + ":" + date}
        name={item.name}
        price={item.price}
        qty={item.amount}
      />
    );
  });
  return itemList;
};

type ReceiptProps = {
  order: Order;
  showReceiptItems: boolean;
};

const Receipt = ({ order, showReceiptItems }: ReceiptProps) => {
  console.log(order);
  const formattedTotalPrice = `$${order.totalPrice.toFixed(2)}`;
  const localDate =
    order.orderDate === null
      ? new Date().toLocaleString()
      : order.orderDate.toLocaleString();
  const summaryStyles = `${styles.summary} ${
    showReceiptItems ? styles.divider : ""
  }`;

  return (
    <div className={styles.receipt}>
      <div className={styles.date}>
        <h3>Order Date</h3>
        <span>{localDate}</span>
      </div>
      {showReceiptItems && (
        <div className={styles.receiptItems}>
          <ul>{getReceiptItems(order.items, localDate)}</ul>
        </div>
      )}
      <div className={summaryStyles}>
        <div className={styles.totalItems}>
          <h3>Total Items</h3>
          <span>{order.totalItems}</span>
        </div>
        <div className={styles.totalPrice}>
          <h3>Total Price</h3>
          <span className={styles.price}>{formattedTotalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
