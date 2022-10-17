import dynamic from "next/dynamic";
import { useState, Suspense } from "react";
import type { Session } from "next-auth";
// CSS import.
import styles from "./UserProfile.module.css";
// My dynamic import.
const PasswordForm = dynamic(() => import("./PasswordForm"), { ssr: false });

type UserProfileProps = {
  session: Session;
};

function UserProfile({ session }: UserProfileProps) {
  const [statusMessage, setStatusMessage] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const userName = session.user.name;
  const userEmail = session.user.email; // To make the create-new-password assessable

  const toggleShowPasswordFormHandler = () => {
    setStatusMessage("");
    setChangePassword((prevState) => !prevState);
  };

  const successfulPasswordChangeHandler = (message: string) => {
    setStatusMessage(message);
    setChangePassword(false);
  };

  return (
    <section className={styles.profile}>
      <h1>{userName}</h1>
      <label className={styles.successfulStatus}>{statusMessage}</label>
      <div
        onClick={toggleShowPasswordFormHandler}
        className={styles.changePassword}
        role="button"
      >
        <h2>{changePassword ? "Close Password Form" : "Change Password"}</h2>
      </div>
      {changePassword && (
        <Suspense fallback="Loading Password Form...">
          <PasswordForm
            userEmail={userEmail}
            onSuccess={successfulPasswordChangeHandler}
          />
        </Suspense>
      )}
    </section>
  );
}

export default UserProfile;
