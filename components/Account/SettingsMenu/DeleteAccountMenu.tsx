import { useState, useRef } from "react";
import styles from "./PasswordForm.module.css";

function deleteAccount(password: string) {
  new Promise(() => setTimeout(() => console.log(password), 3000));
}

type DeleteAccountMenuProps = {
  userEmail: string;
};
export default function DeleteAccountMenu(props: DeleteAccountMenuProps) {
  const [statusMessage, setStatusMessage] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const enteredCurrentPassword = currentPasswordRef.current
      ? currentPasswordRef.current.value
      : "";

    try {
      deleteAccount(enteredCurrentPassword);
      setStatusMessage(`Deleted Account: ${props.userEmail}`);
      formRef.current?.reset();
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Something went wrong..."
      );
      setInvalidPassword(true);
      formRef.current?.reset();
    }
  };

  const statusMessageStyle = invalidPassword
    ? styles.errorStatus
    : styles.otherStatus;

  return (
    <>
      <label className={statusMessageStyle}>{statusMessage}</label>
      <form
        className={styles.form}
        onSubmit={submitHandler}
        id="delete-account"
        ref={formRef}
        autoComplete="off"
      >
        <div className={styles.hidden}>
          <label htmlFor="username">Email</label>
          <input type="text" id="username" value={props.userEmail} readOnly />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Current Password</label>
          <input type="password" id="password" ref={currentPasswordRef} />
        </div>
        <div className={styles.action}>
          <button>Delete Account</button>
        </div>
      </form>
    </>
  );
}
