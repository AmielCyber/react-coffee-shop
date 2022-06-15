import React from 'react';
// My import.
import CartCheck from '../../Layout/Icons/CartCheck';
// CSS import.
import styles from './Checkout.module.css';

export default function RegisteredCheckout({ firstName, lastName, email, onCancel, onClose, onConfirm }) {
  const confirmHandler = (event) => {
    event.preventDefault();

    // Save user info data to send to database.
    const userInfo = {
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    onConfirm(userInfo);
  };

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={styles.user}>
        <h2>
          <span>Name:</span>
          {`${firstName} ${lastName}`}
        </h2>
        <h2>
          <span>Email:</span>
          {`${email}`}
        </h2>
      </div>
      <div className={styles.actions}>
        <button className={styles.close} type='button' onClick={onClose}>
          Close
        </button>
        <button className={styles.cancel} type='button' onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.submit} type='submit'>
          <span>
            <CartCheck />
          </span>
          {' Confirm'}
        </button>
      </div>
    </form>
  );
}
