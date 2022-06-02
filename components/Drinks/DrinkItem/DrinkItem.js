import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Image from 'next/image';
// My imports.
import { cartActions } from '../../../store/cart/cart-slice';
import DrinkItemForm from './DrinkItemForm';
// CSS import.
import styles from './DrinkItem.module.css';

function drinksAreSame(prevProps, currProps) {
  return prevProps.id === currProps.id;
}

function DrinkItem(props) {
  const dispatch = useDispatch();
  const formattedPrice = `$${props.price.toFixed(2)}`;

  const onAddToCartHandler = (amount) => {
    dispatch(
      cartActions.addItemToCart({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      }),
    );
  };

  return (
    <motion.li className={styles.drink} variants={props.variants}>
      <div className={styles.itemImage}>
        <Image
          src={props.imgSrc}
          alt={`${props.name} drink`}
          layout='responsive'
          width={250}
          height={250}
          quality={80}
          title={props.title}
        />
      </div>
      <div className={styles.itemDescription}>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{formattedPrice}</div>
      </div>
      <div className={styles.form}>
        <DrinkItemForm onAddToCart={onAddToCartHandler} id={props.id} />
      </div>
    </motion.li>
  );
}

export default React.memo(DrinkItem, drinksAreSame);
