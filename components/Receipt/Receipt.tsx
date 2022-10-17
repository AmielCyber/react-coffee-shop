// My import.
import ReceiptItem from "./ReceiptItem";
import type DrinkItem from "../../models/DrinkItem";
import type Order from "../../models/Order";
// CSS import.
import styles from "./Receipt.module.css";

/**
 * Gets the list of Receipt Item components.
 * @param {DrinkItem[]} items
 * @param {string} date local date string.
 * @returns An array of ReceiptItem components.
 */
function getReceiptItems(items: DrinkItem[], date: string): JSX.Element[] {
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
}

type ReceiptProps = {
  order: Order;
  showReceiptItems: boolean;
};

function Receipt({ order, showReceiptItems }: ReceiptProps) {
  const formattedTotalPrice = `$${order.totalPrice.toFixed(2)}`;
  const localDate = order.orderDate.toLocaleString();
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
        <section className={styles.receiptItems} title="Receipt Items">
          <ul>{getReceiptItems(order.items, localDate)}</ul>
        </section>
      )}
      <section className={summaryStyles} title="Total">
        <div className={styles.totalItems}>
          <h3>Total Items</h3>
          <span>{order.totalItems}</span>
        </div>
        <div className={styles.totalPrice}>
          <h3>Total Price</h3>
          <span className={styles.price}>{formattedTotalPrice}</span>
        </div>
      </section>
    </div>
  );
}

export default Receipt;
