import { useState, useRef } from "react";
// My imports.
import styles from "./PasswordForm.module.css";
import { isValidPassword } from "../../../utils/validation/input_validation";

type PasswordManager = {
  currentPassword: string;
  newPassword: string;
};

/**
 * Calls our change-password api to change user's password.
 * @param {string} passwordData
 */
async function changePassword(passwordData: PasswordManager) {
  const response = await fetch("/api/user/change-password", {
    method: "PATCH",
    body: JSON.stringify(passwordData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();

  if (!response.ok) {
    // Something went wrong in our server.
    throw new Error(responseData.message || "Something went wrong!");
  }
  return responseData;
}

type PasswordFormProps = {
  userEmail: string;
};

export default function PasswordForm(props: PasswordFormProps) {
  const [statusMessage, setStatusMessage] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const enteredCurrentPassword = currentPasswordRef.current
      ? currentPasswordRef.current.value
      : "";
    const enteredConfirmPassword = confirmPasswordRef.current
      ? confirmPasswordRef.current.value
      : "";
    const enteredNewPassword = newPasswordRef.current
      ? newPasswordRef.current.value
      : "";

    // Front-end validation
    if (!isValidPassword(enteredNewPassword)) {
      setInvalidPassword(true);
      setStatusMessage(
        "Invalid new password. Password must be at least 7 characters long."
      );
      formRef.current?.reset();
    } else if (enteredNewPassword !== enteredConfirmPassword) {
      setInvalidPassword(true);
      setStatusMessage(
        "New password and confirmation password must be identical."
      );
      formRef.current?.reset();
    } else {
      try {
        const result = await changePassword({
          currentPassword: enteredCurrentPassword,
          newPassword: enteredNewPassword,
        });
        setStatusMessage(result.message);
        formRef.current?.reset();
      } catch (error) {
        setStatusMessage(
          error instanceof Error ? error.message : "Something went wrong..."
        );
        setInvalidPassword(true);
        formRef.current?.reset();
      }
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
        id="change-password-form"
        ref={formRef}
      >
        <div className={styles.hidden}>
          <label htmlFor="username">Email</label>
          <input
            type="text"
            id="username"
            value={props.userEmail}
            readOnly
            autoComplete="username"
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="current-password">Current Password</label>
          <input
            type="password"
            id="current-password"
            ref={currentPasswordRef}
            autoComplete="current-password"
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            ref={newPasswordRef}
            autoComplete="new-password"
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            ref={confirmPasswordRef}
          />
        </div>
        <div className={styles.action}>
          <button>Submit Password Change</button>
        </div>
      </form>
    </>
  );
}
