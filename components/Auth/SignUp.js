import React, { useState, useRef, useCallback, Fragment } from 'react';
// CSS import.
import styles from './AuthForm.module.css';

// Front-end validation constants.
const isNotEmpty = (value) => value.trim() !== '';

/**
 * Calls our signup API which creates a new user.
 * @param {User Object{firstName:string, lastName:string, email:string, password:string }} userInfo
 * @returns string result message.
 */
export async function createUser(userInfo) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseData = await response.json();

  if (!response.ok) {
    // Something went wrong in our server.
    throw new Error(responseData.message || 'Something went wrong!');
  }
  return responseData;
}

export default function SignUp({ switchToSignIn, formId }) {
  // Invalidation react states.
  const [formInputIsValid, setFormInputIsValid] = useState({
    firstName: true,
    lastName: true,
  });
  const [invalidCredentials, setInvalidCredentials] = useState(null);
  // React DOM object references.
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();

  /**
   * Validates user input in the front end and sends the new user credentials
   * to our database, only if the inputs are valid.
   * @param {Object} event
   */
  const submitHandler = async (event) => {
    event.preventDefault();

    // Get user input.
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;

    // Validate user input name.
    // Let email and password get handled by input HTML object.
    const enteredFirstNameIsValid = isNotEmpty(enteredFirstName);
    const enteredLastNameIsValid = isNotEmpty(enteredLastName);

    // Save validation for user validation feedback.
    setFormInputIsValid({
      firstName: enteredFirstNameIsValid,
      lastName: enteredLastNameIsValid,
    });

    if (!(enteredFirstNameIsValid && enteredLastNameIsValid)) {
      // Do not submit form since inputs are invalid.
      return;
    }

    const userInfo = {
      email: enteredEmail,
      password: enteredPassword,
      firstName: enteredFirstName,
      lastName: enteredLastName,
    };

    try {
      const result = await createUser(userInfo); // Get reuslt from our database when creating a user.
      switchToSignIn(true, result.message); // Redirect user to sign in with new credentials and let the user know their account was created
    } catch (error) {
      setInvalidCredentials(error.message);
    }
  };

  const switchToSignInHandler = useCallback(() => {
    switchToSignIn(false);
  }, [switchToSignIn]);

  // Get the input classes depending on the input validity.
  const firstNameClasses = `${styles.control} ${formInputIsValid.firstName ? '' : styles.invalid}`;
  const lastNameClasses = `${styles.control} ${formInputIsValid.lastName ? '' : styles.invalid}`;

  return (
    <Fragment>
      <h1>Create Account</h1>
      {invalidCredentials && <p className={styles.errorMessage}>{invalidCredentials}</p>}
      <form onSubmit={submitHandler} id={formId}>
        <div className={firstNameClasses}>
          <label htmlFor='first-name'>Your First Name</label>
          <input type='text' id='first-name' ref={firstNameInputRef} autoComplete='given-name' />
          {!formInputIsValid.firstName && <p>Please enter a first name.</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='last-name'>Your Last Name</label>
          <input type='text' id='last-name' ref={lastNameInputRef} autoComplete='family-name' />
          {!formInputIsValid.lastName && <p>Please enter a last name.</p>}
        </div>
        <div className={styles.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} autoComplete='email' />
        </div>
        <div className={styles.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={passwordInputRef}
            required
            minLength='7'
            autoComplete='new-password'
          />
        </div>
        <div className={styles.actions}>
          <button className={styles.submitButton} type='submit'>
            Create Account
          </button>
          <button type='button' className={styles.toggle} onClick={switchToSignInHandler}>
            Sign in with existing account
          </button>
        </div>
      </form>
    </Fragment>
  );
}
