import React, { Fragment } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
// My Imports.
import { homePageAnimation } from '../utils/animations/animation';
import coffeeShopImage from '../assets/coffee-shop.jpg';
// CSS styles.
import styles from './index.module.css';

export default function Home(props) {
  let displayName = props.userName;

  if (displayName !== '') {
    displayName = `back ${displayName},`;
  }
  return (
    <Fragment>
      <Head>
        <title>React Coffee</title>
        <meta name='description' content='Welcome to React Coffee order now from our store!' title='title' />
      </Head>
      <motion.div
        key='home'
        initial='in'
        animate='animate'
        exit='out'
        variants={homePageAnimation}
        transition={homePageAnimation.transition}
      >
        <div className={styles.homeImage}>
          <Image
            alt='Coffee Shop Interior'
            src={coffeeShopImage}
            layout='fill'
            objectFit='cover'
            quality={80}
            objectPosition='center'
            placeholder='blur'
          />
        </div>
        <motion.div className={styles.pageOverlay} exit={{ display: 'none' }} transition={homePageAnimation.transition}>
          <section className={styles.message}>
            <h2>{`Welcome ${displayName} to React Coffee!`}</h2>
            <p>
              <Link href='/menu' passHref>
                <a>Order now to get fresh tasting coffee.</a>
              </Link>
            </p>
          </section>
        </motion.div>
      </motion.div>
    </Fragment>
  );
}

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
