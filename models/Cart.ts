// My import.
import type DrinkItem from "./DrinkItem";

interface Cart {
  items: DrinkItem[];
  numberOfCartItems: number;
  totalPrice: number;
}

export default Cart;
