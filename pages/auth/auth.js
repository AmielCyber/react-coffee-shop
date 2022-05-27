import { Fragment, useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import AuthForm from '../../components/auth/auth-form';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return (
      <Fragment>
        <p>Loading...</p>
        <LoadingSpinner />
      </Fragment>
    );
  }

  return <AuthForm />;
}
