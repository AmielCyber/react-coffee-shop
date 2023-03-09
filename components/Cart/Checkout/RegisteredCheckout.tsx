// My imports.
import styles from "./Checkout.module.css";
import type User from "../../../models/User";
// My component.
import CartCheck from "../../Layout/Icons/CartCheck";

type RegisteredCheckoutProps = {
  firstName: string;
  lastName: string;
  email: string;
  onCancel: () => void;
  onClose: () => void;
  onConfirm: (userData: User) => Promise<void>;
};

export default function RegisteredCheckout(props: RegisteredCheckoutProps) {
  const confirmHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // Save user info data to send to database.
    const userInfo: User = {
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
    };

    props.onConfirm(userInfo);
  };

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <section className={styles.user} title="User Information">
        <h2>
          <span>Name:</span>
          {`${props.firstName} ${props.lastName}`}
        </h2>
        <h2>
          <span>Email:</span>
          {`${props.email}`}
        </h2>
      </section>
      <section className={styles.actions} title="buttons">
        <button className={styles.close} type="button" onClick={props.onClose}>
          Close
        </button>
        <button
          className={styles.cancel}
          type="button"
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button className={styles.submit} type="submit">
          <span>
            <CartCheck />
          </span>
          {" Confirm"}
        </button>
      </section>
    </form>
  );
}
