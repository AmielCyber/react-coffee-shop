import React, { useState } from 'react';
// My import.
import PasswordForm from './PasswordForm';
// CSS import.
import styles from './UserProfile.module.css';

export default function UserProfile(props) {
  const [changePassword, setChangePassword] = useState(false);
  const userName = props.session.user.name;

  const toggleShowPasswordFormHandler = () => {
    setChangePassword((prevState) => !prevState);
  };

  return (
    <section className={styles.profile}>
      <h1>{userName}</h1>
      <div onClick={toggleShowPasswordFormHandler} className={styles.changePassword}>
        <h2>{changePassword ? 'Close Password Form' : 'Change Password'}</h2>
      </div>
      {changePassword && <PasswordForm />}
    </section>
  );
}
