import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
// My imports.
import { sendCartData } from '../../../store/cart/cart-actions';
import { cartBumpAnimation } from '../../../utils/animations/animation';
import CartIcon from '../Icons/CartIcon';
// CSS import.
import styles from './HeaderCartButton.module.css';

function HeaderCartButton({ isInitial, disableInitial, onSelectCart }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const animateButton = useAnimation();

  // Update cart DB if cart state changed.
  useEffect(() => {
    // If we just started the program ignore sending data since we may be fetching.
    if (isInitial) {
      disableInitial();
      return;
    } else {
      // Send the cart state to the database if the cart state changed
      dispatch(
        sendCartData({
          items: cart.items,
          numberOfCartItems: cart.numberOfCartItems,
          totalPrice: cart.totalPrice,
        })
      );
    }
  }, [isInitial, disableInitial, dispatch, cart]);

  // Animate cart button if an item was added or removed.
  useEffect(() => {
    if (cart.items.length === 0) {
      return;
    } else {
      animateButton.start(cartBumpAnimation);
    }
  }, [cart, animateButton]);

  console.count('HeaderCartButton');
  return (
    <motion.button className={styles.button} onClick={onSelectCart} animate={animateButton}>
      <span className={styles.cartIcon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{cart.numberOfCartItems}</span>
    </motion.button>
  );
}

export default React.memo(HeaderCartButton);
