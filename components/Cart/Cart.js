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
  const [error, setError] = useState(false); // Error sending form to the database.
  const [statusMessage, setStatusMessage] = useState(''); // Database result messsage after attempt for order submission.

  // Handlers.
  const submittingHandler = (submitting) => {
    setIsSubmitting(submitting);
  };
  const didSubmitHandler = (successful, resultMessage) => {
    if (!successful) {
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
    const primaryErrorMessage = 'Error! Order was not sent.';
    const messageStyle = error ? styles.errorMessage : styles.message;
    return (
      <Fragment>
        {error && <h3 className={styles.errorMessage}>{primaryErrorMessage}</h3>}
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
  return (
    <CartContent
      onToLogin={props.onToLogin}
      onClose={props.onClose}
      setIsSubmitting={submittingHandler}
      setDidSubmit={didSubmitHandler}
    />
  );
}
