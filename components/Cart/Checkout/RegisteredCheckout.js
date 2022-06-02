import React from 'react';
// My import.
import CartCheck from '../../Layout/Icons/CartCheck';
// CSS import.
import styles from './Checkout.module.css';

export default function RegisteredCheckout(props) {
  const confirmHandler = (event) => {
    event.preventDefault();

    // Save user info data to send to database.
    const userInfo = {
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
    };

    props.onConfirm(userInfo);
  };

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={styles.user}>
        <h2>{`${props.firstName} ${props.lastName}`}</h2>
        <h2>{`${props.email}`}</h2>
      </div>
      <div className={styles.actions}>
        <button className={styles.close} type='button' onClick={props.onClose}>
          Close
        </button>
        <button className={styles.cancel} type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>
          <span>
            <CartCheck />
          </span>
          {' Confirm'}
        </button>
      </div>
    </form>
  );
}
