import { m } from "framer-motion";
// My imports.
import styles from "./DrinkItemList.module.css";
import type Drink from "../../../models/Drink";
import {
  drinkItemAnimation,
  drinkItemListAnimation,
} from "../../../utils/animations/animation";
// My component.
import DrinkItem from "./DrinkItem";

type DrinkItemListProps = {
  drinks: Drink[];
};

export default function DrinkItemList(props: DrinkItemListProps) {
  // Get the Drink item list.
  const drinkList = props.drinks.map((drink) => (
    <DrinkItem key={drink.id} drink={drink} variants={drinkItemAnimation} />
  ));

  return (
    <m.ul
      initial="in"
      animate="animate"
      variants={drinkItemListAnimation}
      className={styles.drinkList}
    >
      {drinkList}
    </m.ul>
  );
}
