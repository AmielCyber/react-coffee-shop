import React, { useState } from 'react';
// My imports.
import SignIn from './SignIn';
import SignUp from './SignUp';
// CSS import.
import styles from './AuthForm.module.css';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [newUserCreated, setNewUserCreated] = useState(false);

  const switchAuthModeHandler = (isNewUser) => {
    if (isNewUser) {
      setNewUserCreated(true);
    }
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={styles.auth}>
      {newUserCreated && (
        <p>
          New User Created!
          <br />
          Please login using your newly created credentials.
        </p>
      )}
      {isLogin ? <SignIn switchToSignUp={switchAuthModeHandler} /> : <SignUp switchToSignIn={switchAuthModeHandler} />}
    </section>
  );
}
