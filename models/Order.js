export default class Order {
  constructor(name, email, items, totalItems, totalPrice, orderDate) {
    this.name = name; // String
    this.email = email; // String
    this.items = items; // DrinkItem[]
    this.totalItems = totalItems; // Number
    this.totalPrice = totalPrice; // Number
    this.orderDate = orderDate; // Date
  }
}
