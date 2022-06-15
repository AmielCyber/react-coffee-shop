import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
// My imports.
import { menuPageAnimation } from '../../utils/animations/animation';
import drinksImage from '../../assets/coffee-drinks.jpg';
import DrinksSummary from '../../components/Drinks/DrinksSummary';
import AvailableDrinks from '../../components/Drinks/AvailableDrinks';
// CSS styles.
import styles from './MenuPage.module.css';

export default function Menu() {
  return (
    <Fragment>
      <Head>
        <title>Order Drinks</title>
        <meta name='description' content='Order React Coffe drinks to go!' title='title' />
      </Head>
      <motion.div
        className={styles.menuPageImage}
        key='menu'
        initial='in'
        animate='animate'
        exit='out'
        variants={menuPageAnimation}
        transition={menuPageAnimation.transition}
      >
        <Image
          src={drinksImage}
          title='Image by @c_reel from Unsplash'
          alt='A table full of coffee drinks'
          layout='fill'
          objectFit='cover'
          quality={80}
          placeholder='blur'
        />
      </motion.div>
      <motion.div
        className={styles.container}
        key='menuContents'
        initial='in'
        animate='animate'
        variants={menuPageAnimation}
        transition={menuPageAnimation.transition}
        exit={{ display: 'none' }}
      >
        <DrinksSummary />
        <AvailableDrinks />
      </motion.div>
    </Fragment>
  );
}
