import React from 'react';
import { motion } from 'framer-motion';
// My imports.
import { pastOrdersAnimationList, pastOrdersAnimationItem } from '../../utils/animations/animation';
import Receipt from '../Receipt/Receipt';
// CSS import.
import styles from './PastOrderList.module.css';

function ordersAreTheSame(prevProps, currProps) {
  // If the orders array are the same do not rerender.
  return prevProps.orders === currProps.orders;
}

function PastOrderList({ orders, onShowReceipt }) {
  const showDetailedReceipt = (order) => {
    onShowReceipt(order);
  };

  const pastOrders = orders.map((order) => {
    return (
      <motion.li
        variants={pastOrdersAnimationItem}
        className={styles.orderContainer}
        key={order.orderDate}
        onClick={showDetailedReceipt.bind(null, order)}
      >
        <Receipt
          items={order.items}
          totalItems={order.totalItems}
          totalPrice={order.totalPrice}
          orderDate={new Date(order.orderDate)}
          showRecieptItems={false}
        />
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
