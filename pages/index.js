import React, { Fragment } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { m } from 'framer-motion';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
// My Imports.
import coffeeShopImage from '../assets/coffee-shop.jpg';
import { pageAnimation } from '../utils/animations/animation';
// CSS styles.
import styles from './HomePage.module.css';

export default function Home(props) {
  let userGreetingMsg = props.userName;
  if (userGreetingMsg !== '') {
    userGreetingMsg = `back ${userGreetingMsg}, `;
  }

  return (
    <Fragment>
      <Head>
        <title>React Coffee</title>
        <meta name='description' content='Welcome to React Coffee order now from our store!' title='title' />
      </Head>
      <div className={styles.homeImage}>
        <Image
          alt='Coffee Shop Interior'
          title='Image by @pinchebesu from Unsplash'
          src={coffeeShopImage}
          layout='fill'
          objectFit='cover'
          quality={70}
          objectPosition='center'
          placeholder='blur'
        />
      </div>
      <m.div className={styles.pageOverlay} initial='in' animate='animate' variants={pageAnimation}>
        <section className={styles.message}>
          <h2>{`Welcome ${userGreetingMsg}to React Coffee!`}</h2>
          <p>
            <Link href='/menu' passHref>
              <a>Order fresh coffee to go now!</a>
            </Link>
          </p>
        </section>
      </m.div>
    </Fragment>
  );
}

// Welcome user if there is a session.
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      props: {
        userName: '',
      },
    };
  }
  return {
    props: {
      userName: session.user.name,
    },
  };
}
