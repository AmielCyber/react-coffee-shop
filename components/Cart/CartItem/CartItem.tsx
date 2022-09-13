import { memo } from "react";
import { m } from "framer-motion";
// My imports.
import { useAppDispatch } from "../../../store/hooks";
import { cartActions } from "../../../store/cart/cart-slice";
import { cartItemAnimation } from "../../../utils/animations/animation";
import type DrinkItem from "../../../models/DrinkItem";
// My CSS import.
import styles from "./CartItem.module.css";

const sameAmount = (prevProps: CartItemProps, nextProps: CartItemProps) => {
  // Only render if amount changed for the item.
  return prevProps.item.amount === nextProps.item.amount;
};

type CartItemProps = {
  item: DrinkItem;
};

const CartItem = ({ item }: CartItemProps) => {
  const { id, name, amount, price } = item;
  const dispatch = useAppDispatch();
  // Format the price to always show two decimal points.
  const priceF = `$${price.toFixed(2)}`;

  // Handlers for item buttons(empty/trash, subtract, add).
  const removeItemCompletelyHandler = (id: string) => {
    dispatch(cartActions.removeItemCompletelyFromCart(id));
  };
  const removeItemFromCartHandler = (id: string) => {
    dispatch(cartActions.removeItemFromCart(id));
  };
  const addItemToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        name,
        amount: 1,
        price,
      })
    );
  };

  return (
    <m.li
      className={styles["cart-item"]}
      exit="out"
      variants={cartItemAnimation}
    >
      <div className={styles.description}>
        <h2>{name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{priceF}</span>
          <span className={styles.amount}>x {amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          onClick={removeItemCompletelyHandler.bind(null, id)}
          title="Remove this item"
        >
          <span className={styles.iconContainer}>
            <span className={styles["gg-trash"]}></span>
          </span>
        </button>
        <button onClick={removeItemFromCartHandler.bind(null, id)}>−</button>
        <button onClick={addItemToCartHandler.bind(null, item)}>+</button>
      </div>
    </m.li>
  );
};

export default memo(CartItem, sameAmount);
