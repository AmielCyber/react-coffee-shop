import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
// My imports.
import styles from "./CartContent.module.css";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { cartActions } from "../../store/cart/cart-slice";
import type Cart from "../../models/Cart";
import type User from "../../models/User";
// My components.
import ClearCart from "../Layout/Icons/ClearCart";
import LoadingSpinner from "../UI/LoadingSpinner";
const CartItemList = dynamic(() => import("./CartItem/CartItemList"), {
  loading: () => <LoadingSpinner />,
});
const Checkout = dynamic(() => import("./Checkout/Checkout"), {
  loading: () => <LoadingSpinner />,
});

type CartContentProps = {
  onToSignIn: () => void;
  onClose: () => void;
  setIsSubmitting: (submitting: boolean) => void;
  setDidSubmit: (
    successful: boolean,
    resultMessage: string,
    cart: Cart | null
  ) => void;
};

export default function CartContent(props: CartContentProps) {
  const [isCheckout, setIsCheckout] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const totalPriceFormatted = `$${cart.totalPrice.toFixed(2)}`;
  const hasItems = cart.items.length > 0;

  // Submission Handler for Checkout.
  const submitHandler = async (userData: User) => {
    // Set is submitting so our cart content can display a loading message.
    props.setIsSubmitting(true);
    const orderData = {
      user: userData,
      cart: cart,
    };
    // Send the order data form to our server.
    let result;
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await response.json();
      props.setDidSubmit(response.ok, result.message, cart);
    } catch (error) {
      // Let the user know that their order was not submitted.
      props.setDidSubmit(false, "Something went wrong...", null);
    }
    // Database is done receiving the order form.
    props.setIsSubmitting(false);
    dispatch(cartActions.clearCart());
  };
  // Order handler when user clicks the checkout button.
  const orderHandler = useCallback(() => {
    setIsCheckout(true);
  }, []);
  // Go back to current page.
  const cancelHandler = useCallback(() => {
    setIsCheckout(false);
  }, []);
  // Handler for clear cart button.
  const clearCartHandler = useCallback(() => {
    dispatch(cartActions.clearCart());
  }, [dispatch]);

  if (!hasItems) {
    // Cart is empty.
    return (
      <div className={styles.emptyCart}>
        <h3>Your cart is empty.</h3>
        <div className={styles.actions}>
          <button className={styles.close} onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
  // Cart has items.
  return (
    <>
      <CartItemList items={cart.items} />
      <div className={styles.total}>
        <span>Total Amount</span>
        <span className={styles.price}>{totalPriceFormatted}</span>
      </div>
      {isCheckout && (
        <Checkout
          onToSignIn={props.onToSignIn}
          onClose={props.onClose}
          onCancel={cancelHandler}
          onConfirm={submitHandler}
        />
      )}
      {!isCheckout && (
        <div className={styles.actions}>
          <button
            className={styles.clearCart}
            title="Remove all items"
            onClick={clearCartHandler}
          >
            <span>
              <ClearCart />
            </span>{" "}
            Clear Cart
          </button>
          <button className={styles.close} onClick={props.onClose}>
            Close
          </button>
          <button className={styles.order} onClick={orderHandler}>
            Order
          </button>
        </div>
      )}
    </>
  );
}
