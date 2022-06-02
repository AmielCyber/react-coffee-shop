import React, { Fragment } from 'react';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
// My imports.
import Card from '../../components/UI/Card';
import coffeeImage from '../../assets/coffeeWhiteBackground.jpg';
import UserProfile from '../../components/Profile/UserProfile';
// CSS import.
import styles from './AccountPage.module.css';

// TO DO:
// Hello _user
// Add past orders.

export default function AccountPage(props) {
  return (
    <Fragment>
      <div className={styles.accountPageImage}>
        <Image
          alt='Latte on top of a white table'
          src={coffeeImage}
          layout='fill'
          objectFit='cover'
          quality={80}
          objectPosition='center'
          placeholder='blur'
        />
      </div>
      <Card style='container'>
        <UserProfile session={props.session} />
      </Card>
    </Fragment>
  );
}

// Protect API Route.
export async function getServerSideProps(context) {
  // Get current sesssion if there is one.
  const session = await getSession({ req: context.req });

  if (!session) {
    // If there is no session prompt user to sign in.
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
