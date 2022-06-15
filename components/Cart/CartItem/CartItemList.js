import { AnimatePresence } from 'framer-motion';
import React from 'react';
// My import.
import CartItem from './CartItem';
// CSS import.
import styles from './CartItemList.module.css';

export default function CartItemList({ items }) {
  // Get the list of all items the user selected.
  const cartList = items.map((item) => <CartItem key={item.id} item={item} />);

  return (
    <ul className={styles['cart-items']}>
      <AnimatePresence>{cartList}</AnimatePresence>
    </ul>
  );
}
