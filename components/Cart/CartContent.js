import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// My imports.
import { cartActions } from '../../store/cart/cart-slice';
import CartItemList from './CartItem/CartItemList';
import Checkout from './Checkout/Checkout';
// CSS import.
import styles from './CartContent.module.css';
import ClearCart from '../Layout/Icons/ClearCart';

export default function CartContent(props) {
  // React state hook.
  const [isCheckout, setIsCheckout] = useState(false);
  // Redux state.
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // Regular constants.
  const totalPriceFormatted = `$${cart.totalPrice.toFixed(2)}`;
  const hasItems = cart.items.length > 0;

  // Submission Handler for Checkout.
  const submitHandler = async (userData) => {
    // Set is submitting so our cart content can display a loading message.
    props.setIsSubmitting(true);
    const orderData = {
      user: userData,
      cart: cart,
    };
    // Send the order data form to our server.
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json().then((status) => console.log(status));
      props.setDidSubmit(true);
    } catch (error) {
      // Let the user know that their order was not submitted.
      console.log(error);
      props.setDidSubmit(false);
    }
    // Database is done recieving the order form.
    props.setIsSubmitting(false);
    dispatch(cartActions.clearCart());
  };
  // Order handler when user clicks the checkout button.
  const orderHandler = () => {
    setIsCheckout(true);
  };
  // Handler for clear cart button.
  const clearCartHandler = () => {
    dispatch(cartActions.clearCart());
  };
  // Go back to current page.
  const cancelHandler = () => {
    setIsCheckout(false);
  };

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
    <Fragment>
      <CartItemList items={cart.items} />
      <div className={styles.total}>
        <span>Total Amount</span>
        <span className={styles.price}>{totalPriceFormatted}</span>
      </div>
      {isCheckout && <Checkout onClose={props.onClose} onCancel={cancelHandler} onConfirm={submitHandler} />}
      {!isCheckout && (
        <div className={styles.actions}>
          <button className={styles.clearCart} title='Remove all items' onClick={clearCartHandler}>
            <span>
              <ClearCart />
            </span>{' '}
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
    </Fragment>
  );
}
