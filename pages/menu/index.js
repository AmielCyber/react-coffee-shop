import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Head from 'next/head';
// My imports.
import { menuPageAnimation } from '../../utils/animations/animation';
import drinksImage from '../../assets/coffee-drinks.jpg';
import DrinksSummary from '../../components/Drinks/DrinksSummary';
import AvailableDrinks from '../../components/Drinks/AvailableDrinks';
// CSS styles.
import styles from './index.module.css';

export default function Menu() {
  return (
    <Fragment>
      <Head>
        <title>Order Drinks</title>
        <meta name='description' content='Order React Coffe drinks to go!' title='title' />
      </Head>
      <motion.div
        key='menu'
        initial='in'
        animate='animate'
        exit='out'
        variants={menuPageAnimation}
        transition={menuPageAnimation.transition}
      >
        <div className={styles['main-image']}>
          <Image
            src={drinksImage}
            alt='A table full of coffee drinks'
            layout='fill'
            objectFit='cover'
            quality={80}
            placeholder='blur'
          />
        </div>
      </motion.div>
      <motion.div
        key='menuContents'
        initial='in'
        animate='animate'
        exit={{ display: 'none' }}
        variants={menuPageAnimation}
        transition={menuPageAnimation.transition}
      >
        <DrinksSummary />
        <AvailableDrinks />
      </motion.div>
    </Fragment>
  );
}
