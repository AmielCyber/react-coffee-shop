import React, { Fragment, useRef, useState } from 'react';
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
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
  return data;
}

export default function SignUp(props) {
  // Invalidation react states.
  const [formInuptIsValid, setFormInputIsValid] = useState({
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
      const result = await createUser(userInfo);
      props.switchToSignIn(true);
      console.log(result);
    } catch (error) {
      setInvalidCredentials(error.message);
    }
  };

  const switchToSignInHandler = () => {
    props.switchToSignIn(false);
  };

  // Get the input classes depending on the input validity.
  const firstNameClasses = `${styles.control} ${formInuptIsValid.firstName ? '' : styles.invalid}`;
  const lastNameClasses = `${styles.control} ${formInuptIsValid.lastName ? '' : styles.invalid}`;

  return (
    <Fragment>
      <h1>Sign Up</h1>
      {invalidCredentials && <p className={styles.errorMessage}>{invalidCredentials}</p>}
      <form onSubmit={submitHandler}>
        <div className={firstNameClasses}>
          <label htmlFor='firstName'>Your First Name</label>
          <input type='text' id='firstName' ref={firstNameInputRef} />
          {!formInuptIsValid.firstName && <p>Please enter a first name.</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='lastName'>Your Last Name</label>
          <input type='text' id='lastName' ref={lastNameInputRef} />
          {!formInuptIsValid.lastName && <p>Please enter a last name.</p>}
        </div>
        <div className={styles.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordInputRef} required minLength='7' />
        </div>
        <div className={styles.actions}>
          <button>Create Account</button>
          <button type='button' className={styles.toggle} onClick={switchToSignInHandler}>
            Login with existing account
          </button>
        </div>
      </form>
    </Fragment>
  );
}
