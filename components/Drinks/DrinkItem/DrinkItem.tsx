import { m } from "framer-motion";
import Image from "next/image";
import { memo } from "react";
import type { Variants } from "framer-motion";
// My imports.
import styles from "./DrinkItem.module.css";
import { useAppDispatch } from "../../../store/hooks";
import { cartActions } from "../../../store/cart/cart-slice";
import type Drink from "../../../models/Drink";
import type DrinkItemInterface from "../../../models/DrinkItem";
// My component.
import DrinkItemForm from "./DrinkItemForm";

type DrinkItemProps = {
  drink: Drink;
  variants: Variants;
};

// Only re-render if drink id changed.
function drinksAreSame(prevProps: DrinkItemProps, currProps: DrinkItemProps) {
  return prevProps.drink.id === currProps.drink.id;
}

function DrinkItem(props: DrinkItemProps) {
  const dispatch = useAppDispatch();
  const formattedPrice = `$${props.drink.price.toFixed(2)}`;

  const onAddToCartHandler = (amount: number) => {
    const newDrinkItem: DrinkItemInterface = {
      id: props.drink.id,
      name: props.drink.name,
      amount: amount,
      price: props.drink.price,
    };
    dispatch(cartActions.addItemToCart(newDrinkItem));
  };

  return (
    <m.li className={styles.drink} variants={props.variants}>
      <div className={styles.itemImage}>
        <Image
          src={props.drink.imgSrc}
          alt={`${props.drink.name} drink`}
          quality={80}
          fill
          title={props.drink.originalSource}
          sizes="(min-width: 250px, min-height: 250px) 100vw, (min-width: 150px, min-height: 150px) 50vw"
        />
      </div>
      <div className={styles.itemDescription}>
        <h3>{props.drink.name}</h3>
        <div className={styles.description}>{props.drink.description}</div>
        <div className={styles.price}>{formattedPrice}</div>
      </div>
      <div className={styles.form}>
        <DrinkItemForm
          onAddToCart={onAddToCartHandler}
          name={props.drink.name}
        />
      </div>
    </m.li>
  );
}

export default memo(DrinkItem, drinksAreSame);
