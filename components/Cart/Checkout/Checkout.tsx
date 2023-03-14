import dynamic from "next/dynamic";
import { useState } from "react";
import { useSession } from "next-auth/react";
// My imports.
import type User from "../../../models/User";
// My components.
import GuestPrompt from "./GuestPrompt";
import LoadingSpinner from "../../UI/LoadingSpinner";
const RegisteredCheckout = dynamic(() => import("./RegisteredCheckout"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
const GuestCheckout = dynamic(() => import("./GuestCheckout"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

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
    return (
      <RegisteredCheckout
        session={session}
        onCancel={props.onCancel}
        onClose={props.onClose}
        onConfirm={props.onConfirm}
      />
    );
  }

  if (guestInitial) {
    // Prompt if a guest user wants to continue as guest.
    return (
      <GuestPrompt
        onContinue={() => setGuestInitial(false)}
        onToSignIn={props.onToSignIn}
      />
    );
  }

  // Guest user agreed to continue as guest.
  return (
    <GuestCheckout
      onCancel={props.onCancel}
      onClose={props.onClose}
      onConfirm={props.onConfirm}
    />
  );
}
