import { useState, useRef } from "react";
// My imports.
import styles from "./GuestCheckout.module.css";
import type User from "../../../models/User";
import { isValidEmail, isValidName } from "utils/validation/input_validation";
// My component.
import CheckoutFormButtons from "./CheckoutFormButtons";

type GuestCheckoutProps = {
  onCancel: () => void;
  onClose: () => void;
  onConfirm: (userData: User) => Promise<void>;
};

export default function GuestCheckout(props: GuestCheckoutProps) {
  const [formInputValid, setFormInputValid] = useState({
    firstName: true,
    lastName: true,
    email: true,
  });

  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const confirmHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // Get user inputs.
    const enteredFirstName = firstNameInputRef.current
      ? firstNameInputRef.current.value
      : "";
    const enteredLastName = lastNameInputRef.current
      ? lastNameInputRef.current.value
      : "";
    const enteredEmail = emailInputRef.current
      ? emailInputRef.current.value
      : "";

    // Validate user inputs.
    const enteredFirstNameIsValid = isValidName(enteredFirstName);
    const enteredLastNameIsValid = isValidName(enteredLastName);
    const enteredEmailIsValid = isValidEmail(enteredEmail);

    // Save validation for user validation feedback.
    setFormInputValid({
      firstName: enteredFirstNameIsValid,
      lastName: enteredLastNameIsValid,
      email: enteredEmailIsValid,
    });
    const formIsValid =
      enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid;
    if (!formIsValid) {
      // Do not submit form if inputs are invalid.
      return;
    }

    // Save user info data to send to database.
    const userInfo: User = {
      email: enteredEmail,
      firstName: enteredFirstName,
      lastName: enteredLastName,
    };

    props.onConfirm(userInfo);
  };

  // Get the input classes depending on the input validity.
  const firstNameClasses = `${styles.control} ${
    formInputValid.firstName ? "" : styles.invalid
  }`;
  const lastNameClasses = `${styles.control} ${
    formInputValid.lastName ? "" : styles.invalid
  }`;
  const emailClasses = `${styles.control} ${
    formInputValid.email ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={firstNameClasses}>
        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" ref={firstNameInputRef} />
        {!formInputValid.firstName && <p>Please enter a valid first name</p>}
      </div>
      <div className={lastNameClasses}>
        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" ref={lastNameInputRef} />
        {!formInputValid.lastName && <p>Please enter a valid last name</p>}
      </div>
      <div className={emailClasses}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          ref={emailInputRef}
          placeholder="name@gmail.com"
        />
        {!formInputValid.email && <p>Please enter a valid email(@).</p>}
      </div>
      <CheckoutFormButtons onClose={props.onClose} onCancel={props.onCancel} />
    </form>
  );
}
