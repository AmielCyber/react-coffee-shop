import React from 'react';
// My imports.
import { drinkItemListAnimation, drinkItemAnimation } from '../../../utils/animations/animation';
import DrinkItem from './DrinkItem';
import { motion } from 'framer-motion';
// CSS import.
import styles from './DrinkItemList.module.css';

function DrinkItemList(props) {
  // Get the Drink item list.
  const drinkList = props.drinks.map((drink) => (
    <DrinkItem
      key={drink.id}
      id={drink.id}
      name={drink.name}
      description={drink.description}
      price={drink.price}
      imgSrc={drink.imgSrc}
      variants={drinkItemAnimation}
    />
  ));

  return (
    <motion.ul initial='in' animate='animate' variants={drinkItemListAnimation} className={styles.drinkList}>
      {drinkList}
    </motion.ul>
  );
}
export default DrinkItemList;
