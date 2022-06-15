import React, { useState } from 'react';
// My imports.
import SignIn from './SignIn';
import SignUp from './SignUp';
// CSS import.
import styles from './AuthForm.module.css';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [newUserCreated, setNewUserCreated] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  const formId = isLogin ? 'sign-in' : 'sign-up';

  // Toggle Sign/Signup
  const switchAuthModeHandler = (isNewUser, message) => {
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
