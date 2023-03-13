import dynamic from "next/dynamic";
import { useState, Suspense } from "react";
import { useSession } from "next-auth/react";
// My imports.
import styles from "./Checkout.module.css";
import type User from "../../../models/User";
// My components.
import LoadingSpinner from "../../UI/LoadingSpinner";
const RegisteredCheckout = dynamic(() => import("./RegisteredCheckout"), {
  ssr: false,
});
const GuestCheckout = dynamic(() => import("./GuestCheckout"), { ssr: false });

type CheckoutProps = {
  onToSignIn: () => void;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: (userData: User) => Promise<void>;
};

export default function Checkout(props: CheckoutProps) {
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
      <Suspense fallback={<LoadingSpinner />}>
        <RegisteredCheckout
          firstName={firstName}
          lastName={lastName}
          email={email}
          onCancel={props.onCancel}
          onClose={props.onClose}
          onConfirm={props.onConfirm}
        />
      </Suspense>
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
          <button onClick={props.onToSignIn}>Sign in/Create Account</button>
        </div>
      </div>
    );
  }

  // Guest user agreed to continue as guest.
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <GuestCheckout
        onCancel={props.onCancel}
        onClose={props.onClose}
        onConfirm={props.onConfirm}
      />
    </Suspense>
  );
}
