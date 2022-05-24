import { AnimatePresence } from 'framer-motion';
import React from 'react';
// My import.
import CartItem from './CartItem';
// CSS import.
import styles from './CartItemList.module.css';

export default function CartItemList(props) {
  // Get the list of all items the user selected.
  const cartList = props.items.map((item) => (
    <CartItem
      key={item.id}
      item={{
        id: item.id,
        name: item.name,
        amount: item.amount,
        price: item.price,
      }}
    />
  ));

  return (
    <ul className={styles['cart-items']}>
      <AnimatePresence>{cartList}</AnimatePresence>
    </ul>
  );
}
