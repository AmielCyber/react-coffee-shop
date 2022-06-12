import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
// My import.
import RegisteredCheckout from './RegisteredCheckout';
import GuestCheckout from './GuestCheckout';
// CSS import.
import styles from './Checkout.module.css';

export default function Checkout(props) {
  const [guestInitial, setGuestInitial] = useState(true);
  const { data: session } = useSession();

  if (session) {
    // If there is a register user about to checkout.
    const fullName = session.user.name;
    const nameDividerPos = fullName.indexOf(' ');

    const firstName = fullName.slice(0, nameDividerPos);
    const lastName = fullName.slice(nameDividerPos);
    const email = session.user.email;

    return (
      <RegisteredCheckout
        firstName={firstName}
        lastName={lastName}
        email={email}
        onCancel={props.onCancel}
        onClose={props.onClose}
        onConfirm={props.onConfirm}
      />
    );
  }

  const handleContinueAsGuest = () => {
    // User agreed to continue as guest.
    setGuestInitial(false);
  };

  if (guestInitial) {
    // Prompt if a guest user wants to continue as guest.
    return (
      <div className={styles.guestPrompt}>
        <h2>Continue as guest?</h2>
        <div className={styles.actions}>
          <button onClick={handleContinueAsGuest}>Yes</button>
          <button onClick={props.onToLogin}>Login/Signup</button>
        </div>
      </div>
    );
  }

  // Guest user agreed to continue as guest.
  return <GuestCheckout onCancel={props.onCancel} onClose={props.onClose} onConfirm={props.onConfirm} />;
}
