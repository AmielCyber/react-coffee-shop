import React from 'react';
import { motion } from 'framer-motion';
// My imports.
import DrinkItem from './DrinkItem';
import { drinkItemListAnimation, drinkItemAnimation } from '../../../utils/animations/animation';
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
      title={drink.originalSource}
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
