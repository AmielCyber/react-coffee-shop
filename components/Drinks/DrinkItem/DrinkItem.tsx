import { memo } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import type { Variants } from "framer-motion";
// My imports.
import { useAppDispatch } from "../../../store/hooks";
import { cartActions } from "../../../store/cart/cart-slice";
import DrinkItemForm from "./DrinkItemForm";
import type Drink from "../../../models/Drink";
import type DrinkItemInterface from "../../../models/DrinkItem";
// CSS import.
import styles from "./DrinkItem.module.css";

type DrinkItemProps = {
  drink: Drink;
  variants: Variants;
};

// Only re-render if drink id changed.
const drinksAreSame = (
  prevProps: DrinkItemProps,
  currProps: DrinkItemProps
) => {
  return prevProps.drink.id === currProps.drink.id;
};

const DrinkItem = ({ drink, variants }: DrinkItemProps) => {
  const dispatch = useAppDispatch();
  const formattedPrice = `$${drink.price.toFixed(2)}`;

  const onAddToCartHandler = (amount: number) => {
    const newDrinkItem: DrinkItemInterface = {
      id: drink.id,
      name: drink.name,
      amount: amount,
      price: drink.price,
    };
    dispatch(cartActions.addItemToCart(newDrinkItem));
  };

  return (
    <m.li className={styles.drink} variants={variants}>
      <div className={styles.itemImage}>
        <Image
          src={drink.imgSrc}
          alt={`${drink.name} drink`}
          layout="responsive"
          width={250}
          height={250}
          quality={80}
          title={drink.originalSource}
        />
      </div>
      <div className={styles.itemDescription}>
        <h3>{drink.name}</h3>
        <div className={styles.description}>{drink.description}</div>
        <div className={styles.price}>{formattedPrice}</div>
      </div>
      <div className={styles.form}>
        <DrinkItemForm onAddToCart={onAddToCartHandler} name={drink.name} />
      </div>
    </m.li>
  );
};

export default memo(DrinkItem, drinksAreSame);
