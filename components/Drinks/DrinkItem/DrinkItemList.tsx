import { m } from "framer-motion";
// My imports.
import DrinkItem from "./DrinkItem";
import {
  drinkItemAnimation,
  drinkItemListAnimation,
} from "../../../utils/animations/animation";
import type Drink from "../../../models/Drink";
// CSS import.
import styles from "./DrinkItemList.module.css";

type DrinkItemListProps = {
  drinks: Drink[];
};

function DrinkItemList({ drinks }: DrinkItemListProps) {
  // Get the Drink item list.
  const drinkList = drinks.map((drink) => (
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
export default DrinkItemList;
