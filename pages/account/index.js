import dynamic from 'next/dynamic';
import React, { Fragment, useState } from 'react';
import { getSession } from 'next-auth/react';
import { m } from 'framer-motion';
import Image from 'next/image';
// My imports.
import { pageAnimation } from '../../utils/animations/animation';
import coffeeLove from '../../assets/coffeeLove.jpg';
import Card from '../../components/UI/Card';
import UserProfile from '../../components/Profile/UserProfile';
// CSS import.
import styles from './AccountPage.module.css';
// My dynamic import.
const PastOrders = dynamic(() => import('../../components/PastOrders/PastOrders'));

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
          quality={30}
          objectPosition='center'
          placeholder='blur'
        />
      </div>
      <m.div initial='in' animate='animate' variants={pageAnimation}>
        <Card style='container'>
          <UserProfile session={props.session} />
        </Card>
        <div className={styles.toggleShowOrders} onClick={toggleShowPastOrdersHandler} role='button'>
          <Card style='displayContainer'>
            <h2>{showPastOrders ? 'Hide Past Orders' : 'Show Past Orders'}</h2>
          </Card>
        </div>
        {showPastOrders && <PastOrders />}
      </m.div>
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
