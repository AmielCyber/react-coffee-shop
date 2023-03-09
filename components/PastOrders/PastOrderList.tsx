import { memo } from "react";
import { m } from "framer-motion";
// My imports.
import type Order from "../../models/Order";
import styles from "./PastOrderList.module.css";
import {
  pastOrdersAnimationItem,
  pastOrdersAnimationList,
} from "../../utils/animations/animation";
// My component.
import Receipt from "../Receipt/Receipt";

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

function PastOrderList(props: PastOrderListProps) {
  // Handlers.
  const showDetailedReceipt = (order: Order) => {
    props.onShowReceipt(order);
  };
  const pastOrders = props.orders.map((order: Order) => {
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
