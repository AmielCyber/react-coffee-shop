import React, { Fragment, useState } from 'react';
// My import.
import LoadingSpinner from '../UI/LoadingSpinner';
import CartContent from './CartContent';
// CSS import
import styles from './Cart.module.css';

export default function Cart(props) {
  // Cart state hooks for the status of the form submission..
  const [isSubmitting, setIsSubmitting] = useState(false); // Form is being submitted.
  const [didSubmit, setDidSubmit] = useState(false); // Form was submitted.
  const [error, setError] = useState(null); // Error sending form to the database.

  // Handlers.
  const submittingHandler = (submitting) => {
    setIsSubmitting(submitting);
  };
  const didSubmitHandler = (successful) => {
    if (!successful) {
      setError('Order failed to send.');
    }
    setDidSubmit(true);
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
    const statusMessage = error ? error : 'Successfully sent the order';
    const messageStyle = error ? styles.errorMessage : styles.message;
    return (
      <Fragment>
        <h3 className={messageStyle}>{statusMessage}</h3>
        <div className={styles.actions}>
          <button className={styles.actions} onClick={props.onClose}>
            Close
          </button>
        </div>
      </Fragment>
    );
  }
  // User is looking at items ordered.
  return <CartContent onClose={props.onClose} setIsSubmitting={submittingHandler} setDidSubmit={didSubmitHandler} />;
}
