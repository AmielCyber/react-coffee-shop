import dynamic from "next/dynamic";
import { useState, Suspense } from "react";
// My imports.
// CSS import.
import styles from "./AuthForm.module.css";
// My dynamic imports.
const SignIn = dynamic(() => import("./SignIn"), { ssr: false });
const SignUp = dynamic(() => import("./SignUp"), { ssr: false });

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [newUserCreated, setNewUserCreated] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const formId = isLogin ? "sign-in" : "sign-up";

  // Toggle Sign/Signup
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
        <Suspense fallback={`Loading...`}>
          <SignIn switchToSignUp={switchAuthModeHandler} formId={formId} />
        </Suspense>
      ) : (
        <Suspense fallback={`Loading...`}>
          <SignUp switchToSignIn={switchAuthModeHandler} formId={formId} />
        </Suspense>
      )}
    </div>
  );
};

export default AuthForm;
