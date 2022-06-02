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
        <span className={styles.newUserMessage}>
          <p>
            {serverMessage}
            <br />
            Please login using your newly created credentials.
          </p>
        </span>
      )}
      {isLogin ? <SignIn switchToSignUp={switchAuthModeHandler} /> : <SignUp switchToSignIn={switchAuthModeHandler} />}
    </div>
  );
}
