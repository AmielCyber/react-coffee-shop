import { useState, useRef } from "react";
import { signOut } from "next-auth/react";
// My imports.
import styles from "./PasswordForm.module.css";
// My component.
import ConfirmDeletionModal from "./ConfirmDeletionModal";

async function deleteAccount(password: string) {
  const response = await fetch("/api/user/user", {
    method: "DELETE",
    body: JSON.stringify({
      password: password,
    }),
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

export default function DeleteAccountMenu() {
  const [statusMessage, setStatusMessage] = useState("");
  const [successfulDeletion, setSuccessfulDeletion] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [beginDeletion, setBeginDeletion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);

  const confirmDeletionHandler = async () => {
    setIsLoading(true);
    const enteredCurrentPassword = currentPasswordRef.current
      ? currentPasswordRef.current.value
      : "";

    try {
      const result = await deleteAccount(enteredCurrentPassword);
      setStatusMessage(result.message);
      setSuccessfulDeletion(true);
      setInvalidPassword(false);
    } catch (error) {
      setStatusMessage(
        error instanceof Error ? error.message : "Something went wrong..."
      );
      setInvalidPassword(true);
      formRef.current?.reset();
    }
    setIsLoading(false);
  };

  const submissionHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setBeginDeletion(true);
  };

  const confirmStatusHandler = () => {
    if (successfulDeletion) {
      signOut();
    } else {
      setBeginDeletion(false);
      setStatusMessage("");
    }
  };

  const passwordStyle = `${styles.control} ${
    invalidPassword ? styles.invalid : ""
  }`;

  return (
    <>
      <form
        className={styles.form}
        onSubmit={submissionHandler}
        id="delete-account"
        ref={formRef}
        autoComplete="off"
      >
        <div className={passwordStyle}>
          <label htmlFor="password">Current Password</label>
          <input type="password" id="password" ref={currentPasswordRef} />
        </div>
        <div className={styles.action}>
          <button>Delete Account</button>
        </div>
      </form>

      <ConfirmDeletionModal
        showModal={beginDeletion}
        onClose={confirmStatusHandler}
        onConfirm={confirmDeletionHandler}
        isLoading={isLoading}
        success={successfulDeletion}
        statusMessage={statusMessage}
        onOkButton={confirmStatusHandler}
      />
    </>
  );
}
