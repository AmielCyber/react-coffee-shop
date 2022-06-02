import React from 'react';
// My import.
import PasswordForm from './PasswordForm';
// CSS import.
import styles from './UserProfile.module.css';

export default function UserProfile(props) {
  const userName = props.session.user.name;

  return (
    <section className={styles.profile}>
      <h1>{userName}</h1>
      <PasswordForm />
    </section>
  );
}
