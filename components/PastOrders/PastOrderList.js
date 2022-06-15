import React from 'react';
import { motion } from 'framer-motion';
// My imports.
import { pastOrdersAnimationItem, pastOrdersAnimationList } from '../../utils/animations/animation';
import Receipt from '../Receipt/Receipt';
// CSS import.
import styles from './PastOrderList.module.css';

function ordersAreTheSame(prevProps, currProps) {
  // If the orders array are the same, then do not rerender.
  return prevProps.orders === currProps.orders;
}

function PastOrderList({ orders, onShowReceipt }) {
  // Handlers.
  const showDetailedReceipt = (order) => {
    onShowReceipt(order);
  };
  const pastOrders = orders.map((order) => {
    // Create new order object.
    const orderObj = {
      ...order,
    };
    // Overwrite orderDate since when we get it from MongoDB it will be a string instead of Date object.
    orderObj.orderDate = new Date(order.orderDate);
    return (
      <motion.li
        variants={pastOrdersAnimationItem}
        className={styles.orderContainer}
        key={order.orderDate}
        onClick={showDetailedReceipt.bind(null, orderObj)}
        role='button'
      >
        <Receipt {...orderObj} showReceiptItems={false} />
      </motion.li>
    );
  });

  return (
    <motion.ul initial='hidden' animate='visible' variants={pastOrdersAnimationList} className={styles.orderList}>
      {pastOrders}
    </motion.ul>
  );
}

// Memoized component since the parent changes states frequently.
export default React.memo(PastOrderList, ordersAreTheSame);
