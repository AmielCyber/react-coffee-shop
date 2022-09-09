import React, { useState, Fragment } from "react";
// My imports.
import LoadingSpinner from "../UI/LoadingSpinner";
import Receipt from "../Receipt/Receipt";
import CartContent from "./CartContent";
import type Order from "../../models/Order";
import type CartInterface from "../../models/Cart";
// CSS import
import styles from "./Cart.module.css";

type CartProps = {
  onClose: () => void;
  onToSignIn: () => void;
};

const initialOrderObject: Order = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  orderDate: null,
};

const Cart = ({ onClose, onToSignIn }: CartProps) => {
  // Cart state hooks for the status of the form submission..
  const [isSubmitting, setIsSubmitting] = useState(false); // Form is being submitted.
  const [didSubmit, setDidSubmit] = useState(false); // Form was submitted.
  const [error, setError] = useState(false); // Error sending form to the database.
  const [statusMessage, setStatusMessage] = useState(""); // Database result message after attempt for order submission.
  const [orderData, setOrderData] = useState(initialOrderObject);

  // Handlers.
  const submittingHandler = (submitting: boolean) => {
    setIsSubmitting(submitting);
  };

  const didSubmitHandler = (
    successful: boolean,
    resultMessage: string,
    cart: CartInterface
  ) => {
    if (successful) {
      const newOrder: Order = {
        items: cart.items,
        totalItems: cart.numberOfCartItems,
        totalPrice: cart.totalPrice,
        orderDate: new Date(),
      };
      setOrderData(newOrder);
    } else {
      setError(true);
    }
    setDidSubmit(true);
    setStatusMessage(resultMessage);
  };

  if (isSubmitting) {
    // Form is being submitted to the order database.
    return (
      <div className={styles.loading}>
        <h3 className={styles.message}>Sending order data...</h3>
        <LoadingSpinner />
      </div>
    );
  }
  if (didSubmit) {
    // Form has been submitted and has been accepted/rejected by our database.
    const primaryErrorMessage = "Error! Order failed to send.";
    const messageStyle = error ? styles.errorMessage : styles.message;
    return (
      <Fragment>
        {error && (
          <h3 className={styles.errorMessage}>{primaryErrorMessage}</h3>
        )}
        <h3 className={messageStyle}>{statusMessage}</h3>
        {!error && (
          <Receipt
            items={orderData.items}
            totalItems={orderData.totalItems}
            totalPrice={orderData.totalPrice}
            orderDate={orderData.orderDate}
            showReceiptItems={true}
          />
        )}
        <div className={styles.actions}>
          <button className={styles.actions} onClick={onClose}>
            Close
          </button>
        </div>
      </Fragment>
    );
  }
  // User is looking at items ordered.
  return (
    <CartContent
      onToSignIn={onToSignIn}
      onClose={onClose}
      setIsSubmitting={submittingHandler}
      setDidSubmit={didSubmitHandler}
    />
  );
};

export default Cart;
