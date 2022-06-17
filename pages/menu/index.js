import React, { Fragment } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { m } from 'framer-motion';
// My imports.
import drinksImage from '../../assets/coffee-drinks.jpg';
import DrinksSummary from '../../components/Drinks/DrinksSummary';
import AvailableDrinks from '../../components/Drinks/AvailableDrinks';
import { pageAnimation } from '../../utils/animations/animation';
// CSS styles.
import styles from './MenuPage.module.css';

export default function Menu() {
  return (
    <Fragment>
      <Head>
        <title>Order Drinks</title>
        <meta name='description' content='Order React Coffee drinks to go!' title='title' />
      </Head>
      <div className={styles.menuPageImage}>
        <Image
          src={drinksImage}
          title='Image by @c_reel from Unsplash'
          alt='A table full of coffee drinks'
          layout='fill'
          objectFit='cover'
          quality={80}
          placeholder='blur'
        />
      </div>
      <m.div className={styles.container} initial='in' animate='animate' variants={pageAnimation}>
        <DrinksSummary />
      </m.div>
      <AvailableDrinks />
    </Fragment>
  );
}
