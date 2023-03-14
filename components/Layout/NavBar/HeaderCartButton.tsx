import { useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import { useAnimation, m } from "framer-motion";
// My imports.
import styles from "./HeaderCartButton.module.css";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { fetchCartData, sendCartData } from "../../../store/cart/cart-actions";
import { cartBumpAnimation } from "../../../utils/animations/animation";
// My components.
import CartIcon from "../Icons/CartIcon";
import LoadingSpinner from "../../UI/LoadingSpinner";
// Turn off ssr render for this component since it uses client side functions.
const CartModal = dynamic(() => import("./CartModal"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

type HeaderCartButtonProps = {
  onSignIn: () => void;
};

function HeaderCartButton(props: HeaderCartButtonProps) {
  const [cartIsShown, setCartIsShown] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  const fetchCartCompleted = useAppSelector(
    (state) => state.ui.fetchCartCompleted
  );
  const dispatch = useAppDispatch();
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
    // Clean up animation.
    return () => animateButton.stop();
  }, [fetchCartCompleted, dispatch, cart, animateButton]);

  // Handlers.
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const signInHandler = () => {
    setCartIsShown(false);
    props.onSignIn();
  };

  return (
    <>
      <m.button
        id="cartButton"
        className={styles.button}
        onClick={showCartHandler}
        animate={animateButton}
      >
        <span className={styles.cartIcon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>{cart.numberOfCartItems}</span>
      </m.button>
      <CartModal
        cartIsShown={cartIsShown}
        onClose={hideCartHandler}
        onToSignIn={signInHandler}
      />
    </>
  );
}

export default memo(HeaderCartButton);
