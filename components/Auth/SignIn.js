import React, { useRef, Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useDispatch } from 'react-redux';
// My import
import { CART_STORAGE_NAME } from '../../store/cart/cart-actions';
import { sendCartData, fetchCartData } from '../../store/cart/cart-actions';
// CSS import.
import styles from './AuthForm.module.css';

// Front-end validation constants.
const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');

export default function SignIn(props) {
  const [formInuptIsValid, setFormInputIsValid] = useState({
    email: true,
    password: true,
  });
  const [invalidCredentials, setInvalidCredentials] = useState(null);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  // Submission handler for signin form.
  const submitHandler = async (event) => {
    event.preventDefault();

    // Get user input.
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Validate user input.
    const enteredEmailIsValid = isNotEmpty(enteredEmail) && isEmail(enteredEmail);
    const enteredPasswordIsValid = isNotEmpty(enteredPassword);

    // Save validation for user validation feedback.
    setFormInputIsValid({
      email: enteredEmailIsValid,
      password: enteredPasswordIsValid,
    });

    const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;
    if (!formIsValid) {
      // Do not submit form since inputs are invalid.
      return;
    }

    // Form inputs are valid, now check if the credentials are valid.

    // Call the provider and pass the configuration
    // Redirect false: Does not redirect to an error page, which returns a promise.
    // Pass credential data too for the backend.
    // Result will have an error if there is an error
    const result = await signIn('credentials', { redirect: false, email: enteredEmail, password: enteredPassword });

    if (!result.error) {
      // Successful signIn

      // Check if we have any guest cart session.
      const guestCartSessionStorage = window.localStorage.getItem(CART_STORAGE_NAME);
      const cart = guestCartSessionStorage ? JSON.parse(guestCartSessionStorage) : null;
      if (cart && cart.numberOfCartItems > 0) {
        // If we had a guest cart session then save that session into our server with the signin user.
        // Send the cart session to our database if we had items during our guest session.
        dispatch(
          sendCartData({
            items: cart.items,
            numberOfCartItems: cart.numberOfCartItems,
            totalPrice: cart.totalPrice,
          })
        );
      } else {
        // Fetch cart session from our server if there is one.
        dispatch(fetchCartData());
      }
      // clear the local storage from our guest session
      window.localStorage.removeItem(CART_STORAGE_NAME);
      // Redirect user to the home page.
      router.replace('/');
    } else {
      setInvalidCredentials(result.error);
    }
  };

  const switchToSignUpHandler = () => {
    props.switchToSignUp(false);
  };

  // Get the input classes depending on the input validity.
  const emailClasses = `${styles.control} ${formInuptIsValid.email ? '' : styles.invalid}`;
  const passwordClasses = `${styles.control} ${formInuptIsValid.password ? '' : styles.invalid}`;

  return (
    <Fragment>
      <h1>Login</h1>
      {invalidCredentials && <p className={styles.errorMessage}>{invalidCredentials}</p>}
      <form onSubmit={submitHandler}>
        <div className={emailClasses}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} />
          {!formInuptIsValid.email && <p>Please enter a valid email</p>}
        </div>
        <div className={passwordClasses}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordInputRef} />
          {!formInuptIsValid.password && <p>Please enter a password</p>}
        </div>
        <div className={styles.actions}>
          <button className={styles.submitButton}>Login</button>
          <button type='button' className={styles.toggle} onClick={switchToSignUpHandler}>
            Create a new account
          </button>
        </div>
      </form>
    </Fragment>
  );
}
