import React, { useState, useRef, Fragment } from 'react';
// CSS import.
import styles from './PasswordForm.module.css';

// Verifies at the front end if password is valid.
const passwordIsValid = (password) => {
  return password.trim() !== '' && password.length >= 7;
};
/**
 * Calls our change-password api to change user's password.
 * @param {string} passwordData
 */
export async function changePassword(passwordData) {
  const response = await fetch('/api/user/change-password', {
    method: 'PATCH',
    body: JSON.stringify(passwordData),
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

export default function PasswordForm({ userEmail }) {
  const [statusMessage, setStatusMessage] = useState('');
  const [invalidPassword, setInvalidPassword] = useState(false);
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredCurrentPassword = currentPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // Front-end validation
    if (passwordIsValid(enteredNewPassword)) {
      try {
        const result = await changePassword({
          currentPassword: enteredCurrentPassword,
          newPassword: enteredNewPassword,
        });
        setStatusMessage(result.message);
        setInvalidPassword(false);
      } catch (error) {
        setStatusMessage(error.message);
        setInvalidPassword(true);
      }
    } else {
      setInvalidPassword(true);
      setStatusMessage('Invalid password. Password must be at least 7 characters long.');
    }
  };

  const statusMessageStyle = invalidPassword ? styles.errorStatus : styles.successfulStatus;

  return (
    <Fragment>
      <label className={statusMessageStyle}>{statusMessage}</label>
      <form className={styles.form} onSubmit={submitHandler} id='change-password'>
        <div className={styles.hidden}>
          <label htmlFor='username'>Email</label>
          <input type='text' id='username' value={userEmail} readOnly autoComplete='username' />
        </div>
        <div className={styles.control}>
          <label htmlFor='current-password'>Current Password</label>
          <input type='password' id='current-password' ref={currentPasswordRef} autoComplete='current-password' />
        </div>
        <div className={styles.control}>
          <label htmlFor='new-password'>New Password</label>
          <input type='password' id='new-password' ref={newPasswordRef} autoComplete='new-password' />
        </div>
        <div className={styles.action}>
          <button>Submit Password Change</button>
        </div>
      </form>
    </Fragment>
  );
}
