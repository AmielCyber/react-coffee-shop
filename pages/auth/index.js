import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
// My imports.
import Card from '../../components/UI/Card';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import AuthForm from '../../components/Auth/AuthForm';
// CSS import.
import styles from './AuthPage.module.css';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        // If there is a session then just redirect user to the home page.
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    // If we are loading the session status.
    return (
      <section className={styles.container}>
        <Card>
          <p>Loading...</p>
          <LoadingSpinner />
        </Card>
      </section>
    );
  }

  // There is no session, hence we prompt the user to sign in.
  return (
    <section className={styles.container}>
      <AuthForm />
    </section>
  );
}
