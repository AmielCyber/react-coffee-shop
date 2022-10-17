import { memo } from "react";
import { m } from "framer-motion";
// My imports.
import {
  pastOrdersAnimationItem,
  pastOrdersAnimationList,
} from "../../utils/animations/animation";
import Receipt from "../Receipt/Receipt";
import type Order from "../../models/Order";
// CSS import.
import styles from "./PastOrderList.module.css";

type PastOrderListProps = {
  orders: Order[];
  onShowReceipt: (order: Order) => void;
};

function ordersAreTheSame(
  prevProps: PastOrderListProps,
  currProps: PastOrderListProps
) {
  // If the orders array are the same, then do not rerender.
  return prevProps.orders === currProps.orders;
}

function PastOrderList({ orders, onShowReceipt }: PastOrderListProps) {
  // Handlers.
  const showDetailedReceipt = (order: Order) => {
    onShowReceipt(order);
  };
  const pastOrders = orders.map((order: Order) => {
    // Create new order object.
    const orderObj = {
      ...order,
    };
    // Overwrite orderDate since when we get it from MongoDB it will be a string instead of Date object.
    orderObj.orderDate = new Date(order.orderDate);
    return (
      <m.li
        variants={pastOrdersAnimationItem}
        className={styles.orderContainer}
        key={order.orderDate.toString()}
        onClick={showDetailedReceipt.bind(null, orderObj)}
        role="button"
      >
        <Receipt order={orderObj} showReceiptItems={false} />
      </m.li>
    );
  });

  return (
    <m.ul
      initial="hidden"
      animate="visible"
      variants={pastOrdersAnimationList}
      className={styles.orderList}
    >
      {pastOrders}
    </m.ul>
  );
}

// Memoized component since the parent changes states frequently.
export default memo(PastOrderList, ordersAreTheSame);
