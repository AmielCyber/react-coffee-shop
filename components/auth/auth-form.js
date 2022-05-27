import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import styles from './auth-form.module.css';

async function createUser(email, password) {
  const response = await fetch('api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Add validation.
    if (isLogin) {
      // Call the provider and pass the configuration
      // Redirect false: Does not redirect to an error page, which returns a promise.
      // Pass credential data too for the backend.
      // If there is an error then result will containt that error.
      const result = await signIn('credentials', { redirect: false, email: enteredEmail, password: enteredPassword });
      // log user
      if (!result.error) {
        // set some auth state
        // Replase
        router.replace('/profile');
      }
      console.log(result);
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={styles.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button type='button' className={styles.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}
