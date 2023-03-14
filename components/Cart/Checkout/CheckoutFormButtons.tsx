import { useState } from "react";
import styles from "./CheckoutFormButtons.module.css";
// My component
import CartCheck from "../../Layout/Icons/CartCheck";

type CheckoutFormButtonsProps = {
  onClose: () => void;
  onCancel: () => void;
};

export default function CheckoutFormButtons(props: CheckoutFormButtonsProps) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prevCheck) => !prevCheck);
  };

  const submitButtonStyles = `${styles.submit} ${
    checked ? styles.enabledButton : styles.disabledButton
  }`;

  return (
    <>
      <div>
        <label htmlFor="acknowledge">
          <input type="checkbox" id="acknowledge" onChange={handleChange} />I
          understand this is a demo application; therefore, no actual order will
          be placed.
        </label>
      </div>
      <div className={styles.actions}>
        <button className={styles.close} type="button" onClick={props.onClose}>
          Close
        </button>
        <button
          className={`${styles.cancel} ${styles.enabledButton}`}
          type="button"
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button
          className={submitButtonStyles}
          type="submit"
          disabled={!checked}
        >
          <span>
            <CartCheck />
          </span>
          {" Confirm"}
        </button>
      </div>
    </>
  );
}
