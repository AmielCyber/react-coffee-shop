import React, { useState, useCallback, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// My imports.
import { cartActions } from '../../store/cart/cart-slice';
import CartItemList from './CartItem/CartItemList';
import Checkout from './Checkout/Checkout';
import ClearCart from '../Layout/Icons/ClearCart';
// CSS import.
import styles from './CartContent.module.css';

export default function CartContent({ onToSignIn, onClose, setIsSubmitting, setDidSubmit }) {
  const [isCheckout, setIsCheckout] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPriceFormatted = `$${cart.totalPrice.toFixed(2)}`;
  const hasItems = cart.items.length > 0;

  // Submission Handler for Checkout.
  const submitHandler = async (userData) => {
    // Set is submitting so our cart content can display a loading message.
    setIsSubmitting(true);
    const orderData = {
      user: userData,
      cart: cart,
    };
    // Send the order data form to our server.
    let result;
    try {
      const response = await fetch('/api/order/order', {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      result = await response.json();
      setDidSubmit(response.ok, result.message, cart);
    } catch (error) {
      // Let the user know that their order was not submitted.
      setDidSubmit(false, 'Something went wrong...', null);
    }
    // Database is done receiving the order form.
    setIsSubmitting(false);
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
          <button className={styles.close} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
  // Cart has items.
  return (
    <Fragment>
      <CartItemList items={cart.items} />
      <div className={styles.total}>
        <span>Total Amount</span>
        <span className={styles.price}>{totalPriceFormatted}</span>
      </div>
      {isCheckout && (
        <Checkout onToSignIn={onToSignIn} onClose={onClose} onCancel={cancelHandler} onConfirm={submitHandler} />
      )}
      {!isCheckout && (
        <div className={styles.actions}>
          <button className={styles.clearCart} title='Remove all items' onClick={clearCartHandler}>
            <span>
              <ClearCart />
            </span>{' '}
            Clear Cart
          </button>
          <button className={styles.close} onClick={onClose}>
            Close
          </button>
          <button className={styles.order} onClick={orderHandler}>
            Order
          </button>
        </div>
      )}
    </Fragment>
  );
}
