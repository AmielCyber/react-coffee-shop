import { connectDataBase, insertAndReplaceDocument } from '../../utils/db/db-util';
import { getDrinksFromServer, userDataIsValid } from '../../utils/db/db-drinks-util';

// URI address to connect to the MongoDB client.
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME}.hsycr.mongodb.net/${process.env.COFFEE_DB}?${process.env.OPTIONS}`;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Expected: user:{fName, lName, email}, cart:{items, numOfItems, totalPrice}
    const { user, cart } = req.body;
    // Backend Validation
    // Validate user data.
    const invalidUserMessage = userDataIsValid(user);
    if (invalidUserMessage !== '') {
      res.status(422).json({ message: invalidUserMessage });
      return;
    }

    // Get available drink list from the server.
    // drink: Map(key- id:string, value- {name:string, price:Number}), errorMessage: string
    const { drinks, errorMessage } = await getDrinksFromServer();
    if (errorMessage !== '') {
      // Connecting to the server failed.
      res.status(422).json({ message: errorMessage });
      return;
    }
    // Reciept.
    const reciept = {
      user: user.firstName + ' ' + user.lastName,
      email: user.email,
      items: [],
      totalItems: 0,
      totalPrice: 0,
      orderDate: null,
    };
    // Check if each item in the list is valid.
    const items = cart.items;
    for (const item of items) {
      if (drinks.has(item.id)) {
        // If the item exists.
        if (item.amount < 1) {
          // Amount was modified below 1, hence return.
          res.status(422).json({ message: 'Invalid order quantity entered' });
          return;
        }
        // Enter the item purchased info.
        const drinkItem = drinks.get(item.id);
        reciept.items.push({
          name: drinkItem.name,
          price: drinkItem.price,
          quantity: item.amount,
        });
        reciept.totalItems += item.amount;
        reciept.totalPrice += item.amount * drinkItem.price;
      } else {
        // Invalid cart item was found or out of stock.
        res.status(422).json({ message: `Invalid cart item entered in order: ${item.id}` });
      }
    }
    // Create date ordered.
    reciept.orderDate = new Date().toISOString();

    // Connect to the order database.
    let client;
    try {
      client = await connectDataBase(uri);
    } catch (error) {
      res.status(500).json({ message: 'Failed to connect to the order database!' });
      return;
    }
    // Add document to the database.
    try {
      await insertAndReplaceDocument(client, process.env.ORDER_COLLECTION, reciept);
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting order data failed!' });
      client.close();
      return;
    }
    res.status(201).json({ message: 'Order created!' });
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
}
