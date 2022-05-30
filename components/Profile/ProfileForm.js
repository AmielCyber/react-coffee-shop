import React, { useRef } from 'react';
// CSS import.
import styles from './ProfileForm.module.css';

export default function ProfileForm(props) {
  // React refs.
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // Add validation

    props.onChangePassword({
      oldPassowrd: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={styles.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordRef} />
      </div>
      <div className={styles.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}
