// My import.
import type DrinkItem from "./DrinkItem";

type Order = {
  name: string;
  email: string;
  items: DrinkItem[];
  totalItems: number;
  totalPrice: number;
  orderDate: Date;
};

export default Order;
