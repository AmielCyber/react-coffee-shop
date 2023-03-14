import { Session } from "next-auth";
// My imports.
import styles from "./RegisteredCheckout.module.css";
import type User from "../../../models/User";
// My component.
import CheckoutFormButtons from "./CheckoutFormButtons";

type RegisteredCheckoutProps = {
  session: Session;
  onCancel: () => void;
  onClose: () => void;
  onConfirm: (userData: User) => Promise<void>;
};

export default function RegisteredCheckout(props: RegisteredCheckoutProps) {
  // If there is a register user about to checkout.
  const fullName = props.session.user.name;
  const nameDividerPos = fullName.indexOf(" ");

  const firstName = fullName.slice(0, nameDividerPos);
  const lastName = fullName.slice(nameDividerPos);
  const email = props.session.user.email;

  const confirmHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // Save user info data to send to database.
    const userInfo: User = {
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    props.onConfirm(userInfo);
  };

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <section className={styles.user} title="User Information">
        <h2>
          <span>Name:</span>
          {`${firstName} ${lastName}`}
        </h2>
        <h2>
          <span>Email:</span>
          {`${email}`}
        </h2>
      </section>
      <CheckoutFormButtons onCancel={props.onCancel} onClose={props.onClose} />
    </form>
  );
}
