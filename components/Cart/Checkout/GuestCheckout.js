import React, { useRef, useState } from 'react';
// My import.
import CartCheck from '../../Layout/Icons/CartCheck';
// CSS import.
import styles from './Checkout.module.css';

// Front-end validation constants.
const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');

export default function GuestCheckout(props) {
  const [formInuptValid, setFormInputValid] = useState({
    firstName: true,
    lastName: true,
    email: true,
  });

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // Get user inputs.
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    // Validate user inputs.
    const enteredFirstNameIsValid = isNotEmpty(enteredFirstName);
    const enteredLastNameIsValid = isNotEmpty(enteredLastName);
    const enteredEmailIsValid = isNotEmpty(enteredEmail) && isEmail;

    // Save validation for user validation feedback.
    setFormInputValid({
      firstName: enteredFirstNameIsValid,
      lastName: enteredLastNameIsValid,
      email: enteredEmailIsValid,
    });
    const formIsValid = enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid;
    if (!formIsValid) {
      // Do not submit form if inputs are invalid.
      return;
    }

    // Save user info data to send to database.
    const userInfo = {
      email: enteredEmail,
      firstName: enteredFirstName,
      lastName: enteredLastName,
    };

    props.onConfirm(userInfo);
  };

  // Get the input classes depending on the input validity.
  const firstNameClasses = `${styles.control} ${formInuptValid.firstName ? '' : styles.invalid}`;
  const lastNameClasses = `${styles.control} ${formInuptValid.lastName ? '' : styles.invalid}`;
  const emailClasses = `${styles.control} ${formInuptValid.email ? '' : styles.invalid}`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={firstNameClasses}>
        <label htmlFor='firstName'>First Name</label>
        <input type='text' id='firstName' ref={firstNameInputRef} />
        {!formInuptValid.firstName && <p>Please enter a valid first name</p>}
      </div>
      <div className={lastNameClasses}>
        <label htmlFor='lastName'>Last Name</label>
        <input type='text' id='lastName' ref={lastNameInputRef} />
        {!formInuptValid.lastName && <p>Please enter a valid last name</p>}
      </div>
      <div className={emailClasses}>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' ref={emailInputRef} />
        {!formInuptValid.email && <p>Please enter a valid email(@).</p>}
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
