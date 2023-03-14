import dynamic from "next/dynamic";
import { useState } from "react";
// My imports.
import styles from "./AuthForm.module.css";
import LoadingSpinner from "components/UI/LoadingSpinner";
// My dynamic imports.
const SignIn = dynamic(() => import("./SignIn"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
const SignUp = dynamic(() => import("./SignUp"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [newUserCreated, setNewUserCreated] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const formId = isLogin ? "sign-in" : "sign-up";

  // Toggle Sign/SignUp
  const switchAuthModeHandler = (isNewUser: boolean, message: string) => {
    if (isNewUser) {
      setNewUserCreated(true);
      setServerMessage(message);
    }
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className={styles.auth}>
      {newUserCreated && (
        <label className={styles.newUserMessage} htmlFor={formId}>
          {serverMessage}
          <br />
          Please login using your newly created credentials.
        </label>
      )}
      {isLogin ? (
        <SignIn switchToSignUp={switchAuthModeHandler} formId={formId} />
      ) : (
        <SignUp switchToSignIn={switchAuthModeHandler} formId={formId} />
      )}
    </div>
  );
}
