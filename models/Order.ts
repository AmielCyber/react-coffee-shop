// My import.
import type DrinkItem from "./DrinkItem";

interface Order {
  items: DrinkItem[];
  totalItems: number;
  totalPrice: number;
  orderDate: Date | null;
}

export default Order;
