import dynamic from 'next/dynamic';
import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { useAnimation, m } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
// My imports.
import { fetchCartData, sendCartData } from '../../../store/cart/cart-actions';
import { cartBumpAnimation } from '../../../utils/animations/animation';
import CartIcon from '../Icons/CartIcon';
// CSS import.
import styles from './HeaderCartButton.module.css';
// My dynamic import.
// Turn off ssr render for this component since it uses client side functions.
const CartModal = dynamic(() => import('./CartModal'), { ssr: false });

function HeaderCartButton({ onSignIn }) {
  const [cartIsShown, setCartIsShown] = useState(false); // Show Cart overlay.
  const cart = useSelector((state) => state.cart);
  const fetchCartCompleted = useSelector((state) => state.ui.fetchCartCompleted);
  const dispatch = useDispatch();
  const animateButton = useAnimation();

  useEffect(() => {
    // On initial startup/session, get the cart from previous session if there's one
    // from either guest or authenticated user session.
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    // If we just started the program ignore sending data since we may be fetching.
    if (fetchCartCompleted) {
      // Send the cart state to the database if the cart state changed
      dispatch(sendCartData(cart));
      if (cart.items.length > 0) {
        // Animate cart button if an item was added or removed.
        animateButton.start(cartBumpAnimation);
      }
    }
  }, [fetchCartCompleted, dispatch, cart, animateButton]);

  // Handlers.
  const showCartHandler = useCallback(() => {
    setCartIsShown(true);
  }, [setCartIsShown]);

  const hideCartHandler = useCallback(() => {
    setCartIsShown(false);
  }, [setCartIsShown]);

  const signInHandler = useCallback(() => {
    setCartIsShown(false);
    onSignIn();
  }, [setCartIsShown, onSignIn]);

  return (
    <Fragment>
      <m.button className={styles.button} onClick={showCartHandler} animate={animateButton}>
        <span className={styles.cartIcon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>{cart.numberOfCartItems}</span>
      </m.button>
      <CartModal cartIsShown={cartIsShown} onClose={hideCartHandler} onToSignIn={signInHandler} />
    </Fragment>
  );
}

export default React.memo(HeaderCartButton);
