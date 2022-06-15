import React, { useEffect, Fragment } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
// My imports.
import coffeeImage from '../../assets/coffeeWhiteBackground.jpg';
import Card from '../../components/UI/Card';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import AuthForm from '../../components/Auth/AuthForm';
// CSS import.
import styles from './AuthPage.module.css';

export default function AuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === 'loading';

  useEffect(() => {
    if (session) {
      // If there is a session, then just redirect user to the home page.
      router.replace('/');
    }
  }, [router, session]);

  // There is no session, hence we prompt the user to sign in.
  return (
    <Fragment>
      <div className={styles.authPageImage}>
        <Image
          alt='Latte on top of a white table'
          title='Image by @heftiba from Unsplash'
          src={coffeeImage}
          layout='fill'
          objectFit='cover'
          quality={80}
          objectPosition='center'
          placeholder='blur'
        />
      </div>
      {isLoading && (
        <section className={styles.container}>
          <Card>
            <p>Loading...</p>
            <LoadingSpinner />
          </Card>
        </section>
      )}
      {!isLoading && (
        <Card style='slim'>
          <AuthForm />
        </Card>
      )}
    </Fragment>
  );
}
