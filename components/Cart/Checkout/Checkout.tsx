import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
// My imports.
import type User from "../../../models/User";
// CSS import.
import styles from "./Checkout.module.css";
// My dynamic imports.
const RegisteredCheckout = dynamic(() => import("./RegisteredCheckout"));
const GuestCheckout = dynamic(() => import("./GuestCheckout"));

type CheckoutProps = {
  onToSignIn: () => void;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: (userData: User) => Promise<void>;
};

const Checkout = ({
  onToSignIn,
  onClose,
  onCancel,
  onConfirm,
}: CheckoutProps) => {
  const [guestInitial, setGuestInitial] = useState(true);
  const { data: session } = useSession();

  if (session) {
    // If there is a register user about to checkout.
    const fullName = session.user.name;
    const nameDividerPos = fullName.indexOf(" ");

    const firstName = fullName.slice(0, nameDividerPos);
    const lastName = fullName.slice(nameDividerPos);
    const email = session.user.email;

    return (
      <RegisteredCheckout
        firstName={firstName}
        lastName={lastName}
        email={email}
        onCancel={onCancel}
        onClose={onClose}
        onConfirm={onConfirm}
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
          <button onClick={onToSignIn}>Sign in/Create Account</button>
        </div>
      </div>
    );
  }

  // Guest user agreed to continue as guest.
  return (
    <GuestCheckout
      onCancel={onCancel}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
};

export default Checkout;
