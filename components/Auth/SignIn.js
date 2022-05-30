import React, { useRef, Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
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
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

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
    // log user
    if (!result.error) {
      // set some auth state
      router.replace('/profile');
    }
    setInvalidCredentials(result.error);
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
          <button>Login</button>
          <button type='button' className={styles.toggle} onClick={switchToSignUpHandler}>
            Create a new account
          </button>
        </div>
      </form>
    </Fragment>
  );
}
