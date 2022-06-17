import React from 'react';
import { m } from 'framer-motion';
// My imports.
import DrinkItem from './DrinkItem';
import { drinkItemAnimation, drinkItemListAnimation } from '../../../utils/animations/animation';
// CSS import.
import styles from './DrinkItemList.module.css';

function DrinkItemList({ drinks }) {
  // Get the Drink item list.
  const drinkList = drinks.map((drink) => (
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
    <m.ul initial='in' animate='animate' variants={drinkItemListAnimation} className={styles.drinkList}>
      {drinkList}
    </m.ul>
  );
}
export default DrinkItemList;
