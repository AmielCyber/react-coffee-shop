import React, { useState, Fragment } from 'react';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
// My imports.
import coffeeLove from '../../assets/coffeeLove.jpg';
import Card from '../../components/UI/Card';
import UserProfile from '../../components/Profile/UserProfile';
import PastOrders from '../../components/PastOrders/PastOrders';
// CSS import.
import styles from './AccountPage.module.css';

export default function AccountPage(props) {
  const [showPastOrders, setShowPastOrders] = useState(false);

  const toggleShowPastOrdersHandler = () => {
    setShowPastOrders((prevState) => !prevState);
  };

  return (
    <Fragment>
      <div className={styles.accountPageImage}>
        <Image
          alt='A coffee cup in a white background and letters spelling LOVE'
          src={coffeeLove}
          title='Image by @inchristalone from Unsplash'
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
      <div className={styles.toggleShowOrders} onClick={toggleShowPastOrdersHandler} role='button'>
        <Card style='displayContainer'>
          <h2>{showPastOrders ? 'Hide Past Orders' : 'Show Past Orders'}</h2>
        </Card>
      </div>
      {showPastOrders && <PastOrders />}
    </Fragment>
  );
}

// Protect API Route.
export async function getServerSideProps(context) {
  // Get current session if there is one.
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
