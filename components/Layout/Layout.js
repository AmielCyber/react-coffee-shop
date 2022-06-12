import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import ReactDOM from 'react-dom';
import { AnimatePresence } from 'framer-motion';
// My imports.
import { fetchCartData } from '../../store/cart/cart-actions';
import MainNavigation from './NavBar/MainNavigation';
import Modal from '../UI/Modal';
import Cart from '../Cart/Cart';
// CSS import.
import styles from './Layout.module.css';

// To check if we rendered the application for the first time so we only fetch a previous session once
// and we make sure to call ReactDOM only when we are in window and not server.
let isInitial = true;
function disableInitial() {
  isInitial = false;
}

// The layout of the web page.
export default function Layout(props) {
  const [cartIsShown, setCartIsShown] = useState(false); // Show Cart overlay.
  const dispatch = useDispatch();
  const router = useRouter(); // To highlight the current navigation link the navbar.

  useEffect(() => {
    // On initial startup/session, get the cart from previous session if there's one.
    dispatch(fetchCartData());
  }, [dispatch]);

  // Handlers.
  const showCartHandler = useCallback(() => {
    setCartIsShown(true);
  }, [setCartIsShown]);

  const hideCartHandler = useCallback(() => {
    setCartIsShown(false);
  }, [setCartIsShown]);

  const goToLoginHandler = useCallback(() => {
    setCartIsShown(false);
    router.replace('/auth');
  }, [setCartIsShown, router]);

  console.count('Layout');
  return (
    <Fragment>
      <MainNavigation
        onSelectCart={showCartHandler}
        isInitial={isInitial}
        disableInitial={disableInitial}
        currentPath={router.asPath}
      />
      {!isInitial &&
        ReactDOM.createPortal(
          <AnimatePresence>
            {cartIsShown && (
              <Modal onClose={hideCartHandler}>
                <Cart onClose={hideCartHandler} onToLogin={goToLoginHandler} />
              </Modal>
            )}
          </AnimatePresence>,
          document.querySelector('#overlays')
        )}
      <main className={styles.main}>{props.children}</main>
    </Fragment>
  );
}
